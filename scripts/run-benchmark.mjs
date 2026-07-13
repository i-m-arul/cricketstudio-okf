#!/usr/bin/env node
/**
 * CricketStudio LLM Accuracy Benchmark runner
 *
 * Fetches 1,000 cricket Q&A pairs from the Trust OS endpoint, sends each question
 * to configured LLMs with NO context (raw knowledge only), then judges each
 * response with Claude Haiku. Writes:
 *   viewer/public/evals/leaderboard.json  — aggregated scores (committed)
 *   viewer/public/evals/results/YYYY-MM-DD.jsonl  — raw per-question results
 *
 * Usage:
 *   node scripts/run-benchmark.mjs              # full 1,000-question run
 *   node scripts/run-benchmark.mjs --sample 50  # validation run
 *   node scripts/run-benchmark.mjs --dry-run    # print config, fetch Q&A, exit
 *
 * Required env:
 *   ANTHROPIC_API_KEY   — for Claude Sonnet (model) + Claude Haiku (judge)
 *
 * Optional env (missing keys skip that model):
 *   OPENAI_API_KEY      — GPT-4o
 *   GEMINI_API_KEY      — Gemini 2.0 Pro
 *   PERPLEXITY_API_KEY  — Perplexity Sonar Pro
 *
 *   BENCHMARK_COST_CAP  — hard stop in USD (default 50)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── Config ────────────────────────────────────────────────────────────────────

const BENCHMARK_URL = 'https://players.cricketstudio.ai/evals/cricket-qa-v1.jsonl'
const LEADERBOARD_PATH = join(ROOT, 'viewer', 'public', 'evals', 'leaderboard.json')
const RESULTS_DIR = join(ROOT, 'viewer', 'public', 'evals', 'results')

const JUDGE_MODEL = 'claude-haiku-4-5-20251001'
const BATCH_SIZE = 5        // concurrent questions per model (keeps rate limits happy)
const BATCH_PAUSE_MS = 600  // ms between batches
const MAX_TOKENS = 512
const COST_CAP = parseFloat(process.env.BENCHMARK_COST_CAP ?? '50')

// Rough cost per 1K tokens (input / output) in USD
const COST_PER_1K = {
  'claude-sonnet-5':         { in: 0.003,   out: 0.015 },
  'gpt-4o':                  { in: 0.0025,  out: 0.01  },
  'gemini-2.0-pro-exp':      { in: 0.00125, out: 0.005 },
  'sonar-pro':               { in: 0.003,   out: 0.015 },
  [JUDGE_MODEL]:             { in: 0.00025, out: 0.00125 },
}

const MODELS = [
  {
    id: 'claude-sonnet-5',
    label: 'Claude Sonnet 5',
    provider: 'Anthropic',
    apiId: 'claude-sonnet-5',
    keyVar: 'ANTHROPIC_API_KEY',
  },
  {
    id: 'gpt-4o',
    label: 'GPT-4o',
    provider: 'OpenAI',
    apiId: 'gpt-4o',
    keyVar: 'OPENAI_API_KEY',
  },
  {
    id: 'gemini-2.0-pro-exp',
    label: 'Gemini 2.0 Pro',
    provider: 'Google',
    apiId: 'gemini-2.0-pro-exp',
    keyVar: 'GEMINI_API_KEY',
  },
  {
    id: 'sonar-pro',
    label: 'Perplexity Sonar Pro',
    provider: 'Perplexity',
    apiId: 'sonar-pro',
    keyVar: 'PERPLEXITY_API_KEY',
  },
]

// ── Arg parsing ───────────────────────────────────────────────────────────────

const argv = process.argv.slice(2)
const sampleIdx = argv.indexOf('--sample')
const SAMPLE = sampleIdx !== -1 ? parseInt(argv[sampleIdx + 1]) : null
const DRY_RUN = argv.includes('--dry-run')

// ── Cost tracking ─────────────────────────────────────────────────────────────

let totalCostUsd = 0

function estimateCost(modelId, inputTokens, outputTokens) {
  const rates = COST_PER_1K[modelId]
  if (!rates) return 0
  return (inputTokens / 1000) * rates.in + (outputTokens / 1000) * rates.out
}

function addCost(modelId, inputTokens, outputTokens) {
  const c = estimateCost(modelId, inputTokens, outputTokens)
  totalCostUsd += c
  if (totalCostUsd > COST_CAP) {
    throw new Error(`Cost cap $${COST_CAP} exceeded (current: $${totalCostUsd.toFixed(2)})`)
  }
  return c
}

// ── API callers ───────────────────────────────────────────────────────────────

async function callAnthropic(modelId, userContent, apiKey) {
  const body = {
    model: modelId,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: userContent }],
  }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const text = data.content?.[0]?.text ?? ''
  addCost(modelId, data.usage?.input_tokens ?? 300, data.usage?.output_tokens ?? 80)
  return text
}

async function callOpenAICompat(modelId, userContent, apiKey, baseUrl) {
  const body = {
    model: modelId,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: userContent }],
  }
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${baseUrl} ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content ?? ''
  addCost(modelId, data.usage?.prompt_tokens ?? 300, data.usage?.completion_tokens ?? 80)
  return text
}

async function askModel(model, question) {
  const key = process.env[model.keyVar]
  switch (model.provider) {
    case 'Anthropic':
      return callAnthropic(model.apiId, question, key)
    case 'OpenAI':
      return callOpenAICompat(model.apiId, question, key, 'https://api.openai.com/v1')
    case 'Google':
      // Gemini OpenAI-compatible endpoint
      return callOpenAICompat(
        model.apiId, question, key,
        'https://generativelanguage.googleapis.com/v1beta/openai'
      )
    case 'Perplexity':
      return callOpenAICompat(model.apiId, question, key, 'https://api.perplexity.ai')
    default:
      throw new Error(`Unknown provider: ${model.provider}`)
  }
}

// ── Judge ─────────────────────────────────────────────────────────────────────

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

async function judge(question, expected, response) {
  const prompt = `You are judging whether an AI model answered a cricket question correctly.

Question: ${question}
Expected answer: ${expected}
Model response: ${response}

Is the model response factually correct and consistent with the expected answer?
Consider partial answers: if the core fact is accurate, score it as correct.
Respond with JSON only — no prose before or after:
{"correct": true, "reason": "one brief sentence"}`

  let text
  try {
    text = await callAnthropic(JUDGE_MODEL, prompt, ANTHROPIC_KEY)
  } catch {
    return { correct: false, reason: 'judge api error' }
  }

  const match = text.match(/\{[\s\S]*?\}/)
  if (!match) return { correct: false, reason: 'judge parse error' }
  try {
    return JSON.parse(match[0])
  } catch {
    return { correct: false, reason: 'judge json error' }
  }
}

// ── Batch runner ──────────────────────────────────────────────────────────────

async function runBatches(items, fn) {
  const results = []
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE)
    const batchResults = await Promise.all(batch.map(fn))
    results.push(...batchResults)
    if (i + BATCH_SIZE < items.length) {
      await new Promise(r => setTimeout(r, BATCH_PAUSE_MS))
    }
  }
  return results
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Validate judge key
  if (!ANTHROPIC_KEY) {
    console.error('ANTHROPIC_API_KEY is required (used as judge and for Claude Sonnet)')
    process.exit(1)
  }

  // Resolve active models
  const activeModels = MODELS.filter(m => {
    const key = process.env[m.keyVar]
    if (!key) console.warn(`⚠  ${m.keyVar} not set — skipping ${m.label}`)
    return !!key
  })
  if (activeModels.length === 0) {
    console.error('No model API keys set. Set at least OPENAI_API_KEY or GEMINI_API_KEY.')
    process.exit(1)
  }

  // Fetch questions
  console.log(`Fetching benchmark from ${BENCHMARK_URL} ...`)
  const res = await fetch(BENCHMARK_URL)
  if (!res.ok) throw new Error(`Failed to fetch Q&A: ${res.status} ${res.statusText}`)
  const raw = await res.text()
  let questions = raw.trim().split('\n').map(l => JSON.parse(l))
  console.log(`  Loaded ${questions.length} questions`)

  if (SAMPLE) {
    questions = questions.slice(0, SAMPLE)
    console.log(`  Sampling first ${SAMPLE}`)
  }

  if (DRY_RUN) {
    console.log('\nDry run — config:')
    console.log('  Models:', activeModels.map(m => m.label).join(', '))
    console.log('  Questions:', questions.length)
    console.log('  Judge:', JUDGE_MODEL)
    console.log('  Cost cap: $' + COST_CAP)
    console.log('\nSample question:', questions[0])
    return
  }

  const date = new Date().toISOString().slice(0, 10)
  const allRawResults = []
  const modelScores = {}

  for (const model of activeModels) {
    console.log(`\n▶  ${model.label}`)
    modelScores[model.id] = { correct: 0, total: 0, byCategory: {} }

    const modelResults = await runBatches(questions, async (q) => {
      let response = null
      let correct = false
      let reason = ''

      try {
        response = await askModel(model, q.question)
        const verdict = await judge(q.question, q.answer ?? q.expected, response)
        correct = verdict.correct ?? false
        reason = verdict.reason ?? ''
      } catch (err) {
        reason = `error: ${err.message}`
        process.stdout.write('E')
      }

      if (correct) {
        modelScores[model.id].correct++
        process.stdout.write('.')
      } else {
        process.stdout.write('x')
      }
      modelScores[model.id].total++

      const category = q.category ?? 'general'
      if (!modelScores[model.id].byCategory[category]) {
        modelScores[model.id].byCategory[category] = { correct: 0, total: 0 }
      }
      modelScores[model.id].byCategory[category].total++
      if (correct) modelScores[model.id].byCategory[category].correct++

      return {
        qid: q.id ?? null,
        category,
        question: q.question,
        expected: q.answer ?? q.expected ?? '',
        response,
        correct,
        reason,
        model: model.id,
      }
    })

    allRawResults.push(...modelResults)
    const sc = modelScores[model.id]
    console.log(`\n  ${model.label}: ${(sc.correct / sc.total * 100).toFixed(1)}% (${sc.correct}/${sc.total})`)
  }

  // Write raw results
  mkdirSync(RESULTS_DIR, { recursive: true })
  const resultsPath = join(RESULTS_DIR, `${date}.jsonl`)
  writeFileSync(resultsPath, allRawResults.map(r => JSON.stringify(r)).join('\n') + '\n')
  console.log(`\n✓  Raw results → ${resultsPath}`)

  // Build run summary
  const runSummary = {
    date,
    questions: questions.length,
    judge: JUDGE_MODEL,
    models: activeModels
      .map(m => ({
        id: m.id,
        label: m.label,
        provider: m.provider,
        score: parseFloat((modelScores[m.id].correct / modelScores[m.id].total).toFixed(4)),
        correct: modelScores[m.id].correct,
        total: modelScores[m.id].total,
        byCategory: modelScores[m.id].byCategory,
      }))
      .sort((a, b) => b.score - a.score),
  }

  // Update leaderboard.json — prepend latest run, deduplicate by date
  let leaderboard = {
    version: 1,
    benchmark: 'cricket-qa-v1',
    benchmark_url: BENCHMARK_URL,
    judge: JUDGE_MODEL,
    scoring: 'binary — 1 if correct, 0 if incorrect (per question)',
    runs: [],
  }
  if (existsSync(LEADERBOARD_PATH)) {
    try {
      leaderboard = JSON.parse(readFileSync(LEADERBOARD_PATH, 'utf8'))
    } catch {}
  }
  leaderboard.runs = [runSummary, ...leaderboard.runs.filter(r => r.date !== date)]

  mkdirSync(dirname(LEADERBOARD_PATH), { recursive: true })
  writeFileSync(LEADERBOARD_PATH, JSON.stringify(leaderboard, null, 2) + '\n')
  console.log(`✓  Leaderboard → ${LEADERBOARD_PATH}`)

  // Summary
  console.log('\n── Final scores ──────────────────────────────────────')
  runSummary.models.forEach((m, i) => {
    const medals = ['🥇', '🥈', '🥉', '  ']
    console.log(`${medals[i] ?? '  '} ${m.label.padEnd(22)} ${(m.score * 100).toFixed(1)}% (${m.correct}/${m.total})`)
  })
  console.log(`\n   Estimated cost: $${totalCostUsd.toFixed(2)} / cap $${COST_CAP}`)
}

main().catch(err => {
  console.error('\n✗ Benchmark failed:', err.message)
  process.exit(1)
})
