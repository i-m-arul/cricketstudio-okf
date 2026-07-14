#!/usr/bin/env node
/**
 * CricketStudio LLM Accuracy Benchmark runner
 *
 * Fetches 1,000 cricket Q&A pairs from the Trust OS endpoint and runs TWO passes
 * against each configured LLM:
 *   Pass A — raw knowledge (no context)
 *   Pass B — with CricketStudio OKF context injected (llms.txt)
 *
 * Both scores are committed so the leaderboard can show the accuracy delta:
 *   "GPT-4o: 71% raw → 89% with CricketStudio. +18pp"
 *
 * Writes:
 *   viewer/public/evals/leaderboard.json   — aggregated scores (committed)
 *   viewer/public/evals/results/YYYY-MM-DD.jsonl  — raw per-question results
 *
 * Usage:
 *   node scripts/run-benchmark.mjs               # full v1 run: raw + OKF context
 *   node scripts/run-benchmark.mjs --v2          # v2 run: T3-T6 cricket knowledge Qs
 *   node scripts/run-benchmark.mjs --raw-only    # raw pass only (faster / cheaper)
 *   node scripts/run-benchmark.mjs --sample 250  # sample 250 questions (quick test)
 *   node scripts/run-benchmark.mjs --dry-run    # print config, fetch Q&A, exit
 *
 * Env (loaded from .env / .env.local in repo root, or set directly):
 *   ANTHROPIC_API_KEY   — for Claude Sonnet (model) + Claude Haiku (judge)
 *
 * Optional env (missing keys skip that model):
 *   OPENAI_API_KEY      — GPT-4o
 *   GEMINI_API_KEY      — Gemini 2.0 Pro
 *   PERPLEXITY_API_KEY  — Perplexity Sonar Pro
 *
 *   BENCHMARK_COST_CAP  — hard stop in USD (default 100; both passes ~2× a raw-only run)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── Dotenv loader (no package dependency) ────────────────────────────────────
// Loads .env then .env.local from the repo root so local runs work without
// manually exporting keys. CI/GHA sets env vars directly — these files won't
// exist there and the loader silently skips them.
function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return
  const lines = readFileSync(filePath, 'utf8').split('\n')
  for (const raw of lines) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (key && !(key in process.env)) process.env[key] = val
  }
}
loadEnvFile(join(ROOT, '.env'))
loadEnvFile(join(ROOT, '.env.local'))

// ── Config ────────────────────────────────────────────────────────────────────

const BENCHMARK_URL_V1 = 'https://players.cricketstudio.ai/evals/cricket-qa-v1.jsonl'
const BENCHMARK_URL_V2 = 'https://okf.cricketstudio.ai/evals/cricket-qa-v2.jsonl'
const OKF_LLMS_URL  = 'https://okf.cricketstudio.ai/llms.txt'
const LEADERBOARD_PATH = join(ROOT, 'viewer', 'public', 'evals', 'leaderboard.json')
const RESULTS_DIR = join(ROOT, 'viewer', 'public', 'evals', 'results')

// Context is capped at 50K chars to keep token costs predictable
const CONTEXT_CHAR_LIMIT = 50_000

const JUDGE_MODEL = 'claude-haiku-4-5-20251001'
const BATCH_SIZE = 5        // concurrent questions per model (keeps rate limits happy)
const BATCH_PAUSE_MS = 600  // ms between batches
const MAX_TOKENS = 512
// Default cap is $100 — a full 2-pass run (raw + OKF context) costs roughly 2× raw-only
const COST_CAP = parseFloat(process.env.BENCHMARK_COST_CAP ?? '100')

// Rough cost per 1K tokens (input / output) in USD
const COST_PER_1K = {
  'claude-sonnet-5':         { in: 0.003,   out: 0.015 },
  'gpt-4o':                  { in: 0.0025,  out: 0.01  },
  'gemini-2.5-pro':          { in: 0.00125, out: 0.01  },
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
    id: 'gemini-2.5-pro',
    label: 'Gemini 2.5 Pro',
    provider: 'Google',
    apiId: 'gemini-2.5-pro',
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
const SAMPLE    = sampleIdx !== -1 ? parseInt(argv[sampleIdx + 1]) : null
const DRY_RUN   = argv.includes('--dry-run')
const RAW_ONLY  = argv.includes('--raw-only')
const USE_V2    = argv.includes('--v2')

const BENCHMARK_URL = USE_V2 ? BENCHMARK_URL_V2 : BENCHMARK_URL_V1

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
  return dispatch(model, question, key)
}

async function askModelWithContext(model, question, context) {
  const key = process.env[model.keyVar]
  const prompt = `You are answering a cricket question. Below is reference data from the CricketStudio Open Knowledge Framework (OKF) — verified, ball-by-ball-derived cricket statistics:

${context}

---
Use the reference data above where relevant, then answer the following question accurately and concisely.

Question: ${question}`
  return dispatch(model, prompt, key)
}

async function dispatch(model, content, key) {
  switch (model.provider) {
    case 'Anthropic':
      return callAnthropic(model.apiId, content, key)
    case 'OpenAI':
      return callOpenAICompat(model.apiId, content, key, 'https://api.openai.com/v1')
    case 'Google':
      return callOpenAICompat(
        model.apiId, content, key,
        'https://generativelanguage.googleapis.com/v1beta/openai'
      )
    case 'Perplexity':
      return callOpenAICompat(model.apiId, content, key, 'https://api.perplexity.ai')
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
  const qRes = await fetch(BENCHMARK_URL)
  if (!qRes.ok) throw new Error(`Failed to fetch Q&A: ${qRes.status} ${qRes.statusText}`)
  const raw = await qRes.text()
  let questions = raw.trim().split('\n').map(l => JSON.parse(l))
  console.log(`  Loaded ${questions.length} questions`)

  if (SAMPLE) {
    questions = questions.slice(0, SAMPLE)
    console.log(`  Sampling first ${SAMPLE}`)
  }

  // Fetch OKF context (used for the "+CS" pass)
  let okfContext = null
  if (!RAW_ONLY) {
    console.log(`Fetching OKF context from ${OKF_LLMS_URL} ...`)
    try {
      const ctxRes = await fetch(OKF_LLMS_URL)
      if (ctxRes.ok) {
        const full = await ctxRes.text()
        okfContext = full.length > CONTEXT_CHAR_LIMIT ? full.slice(0, CONTEXT_CHAR_LIMIT) + '\n[truncated]' : full
        console.log(`  Context: ${okfContext.length.toLocaleString()} chars`)
      } else {
        console.warn(`  ⚠  Failed to fetch OKF context (${ctxRes.status}) — falling back to raw-only`)
      }
    } catch (err) {
      console.warn(`  ⚠  OKF context fetch error: ${err.message} — falling back to raw-only`)
    }
  }

  const withContext = !RAW_ONLY && okfContext !== null

  if (DRY_RUN) {
    console.log('\nDry run — config:')
    console.log('  Models:', activeModels.map(m => m.label).join(', '))
    console.log('  Questions:', questions.length)
    console.log('  Judge:', JUDGE_MODEL)
    console.log('  Cost cap: $' + COST_CAP)
    console.log('  Passes:', withContext ? 'raw + with OKF context' : 'raw only')
    console.log('\nSample question:', questions[0])
    return
  }

  const date = new Date().toISOString().slice(0, 10)
  const allRawResults = []

  // modelScores tracks both raw and with-context accuracy
  const modelScores = {}

  for (const model of activeModels) {
    console.log(`\n▶  ${model.label}`)
    modelScores[model.id] = {
      correct_raw: 0,
      correct_with_cs: 0,
      total: 0,
      byCategory: {},
    }

    const modelResults = await runBatches(questions, async (q) => {
      let responseRaw = null
      let responseWithCs = null
      let correctRaw = false
      let correctWithCs = false
      let reasonRaw = ''
      let reasonWithCs = ''

      // Pass A: raw knowledge, no context
      try {
        responseRaw = await askModel(model, q.question)
        const verdict = await judge(q.question, q.answer ?? q.expected, responseRaw)
        correctRaw = verdict.correct ?? false
        reasonRaw = verdict.reason ?? ''
      } catch (err) {
        reasonRaw = `error: ${err.message}`
        process.stdout.write('E')
      }

      // Pass B: with OKF context
      // v2 questions carry a per-question context block (dossier stats).
      // v1 questions fall back to the global llms.txt context.
      if (withContext) {
        const questionContext = q.context ?? okfContext
        try {
          responseWithCs = await askModelWithContext(model, q.question, questionContext)
          const verdict = await judge(q.question, q.answer ?? q.expected, responseWithCs)
          correctWithCs = verdict.correct ?? false
          reasonWithCs = verdict.reason ?? ''
        } catch (err) {
          reasonWithCs = `error: ${err.message}`
        }
      }

      // Accumulate scores
      const scores = modelScores[model.id]
      if (correctRaw) scores.correct_raw++
      if (correctWithCs) scores.correct_with_cs++
      scores.total++

      const category = q.category ?? 'general'
      if (!scores.byCategory[category]) {
        scores.byCategory[category] = { correct_raw: 0, correct_with_cs: 0, total: 0 }
      }
      scores.byCategory[category].total++
      if (correctRaw)   scores.byCategory[category].correct_raw++
      if (correctWithCs) scores.byCategory[category].correct_with_cs++

      // Progress indicator: raw correct = '.', raw wrong = 'x', error = 'E'
      process.stdout.write(correctRaw ? '.' : reasonRaw.startsWith('error') ? 'E' : 'x')

      return {
        qid: q.id ?? null,
        category,
        question: q.question,
        expected: q.answer ?? q.expected ?? '',
        response_raw: responseRaw,
        response_with_cs: withContext ? responseWithCs : undefined,
        correct_raw: correctRaw,
        correct_with_cs: withContext ? correctWithCs : undefined,
        reason_raw: reasonRaw,
        reason_with_cs: withContext ? reasonWithCs : undefined,
        model: model.id,
      }
    })

    allRawResults.push(...modelResults)

    const sc = modelScores[model.id]
    const rawPct  = (sc.correct_raw / sc.total * 100).toFixed(1)
    const csPct   = withContext ? (sc.correct_with_cs / sc.total * 100).toFixed(1) : null
    const deltaPp = withContext
      ? ((sc.correct_with_cs - sc.correct_raw) / sc.total * 100).toFixed(1)
      : null
    const deltaStr = deltaPp !== null ? ` → ${csPct}% (+${deltaPp}pp with OKF)` : ''
    console.log(`\n  ${model.label}: ${rawPct}%${deltaStr}  (${sc.correct_raw}/${sc.total} raw)`)
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
    with_context: withContext,
    context_source: withContext ? OKF_LLMS_URL : undefined,
    models: activeModels
      .map(m => {
        const sc = modelScores[m.id]
        const scoreRaw    = parseFloat((sc.correct_raw / sc.total).toFixed(4))
        const scoreWithCs = withContext
          ? parseFloat((sc.correct_with_cs / sc.total).toFixed(4))
          : null
        const delta = withContext
          ? parseFloat((scoreWithCs - scoreRaw).toFixed(4))
          : null

        // byCategory: per-category raw score (+ with_cs if available)
        const byCategory = {}
        for (const [cat, cs] of Object.entries(sc.byCategory)) {
          byCategory[cat] = {
            correct_raw: cs.correct_raw,
            correct_with_cs: withContext ? cs.correct_with_cs : undefined,
            total: cs.total,
          }
        }

        return {
          id: m.id,
          label: m.label,
          provider: m.provider,
          score_raw: scoreRaw,
          score_with_cs: scoreWithCs,
          delta,
          correct_raw: sc.correct_raw,
          correct_with_cs: withContext ? sc.correct_with_cs : undefined,
          total: sc.total,
          byCategory,
        }
      })
      // Sort by score_with_cs if available, else score_raw
      .sort((a, b) =>
        (b.score_with_cs ?? b.score_raw) - (a.score_with_cs ?? a.score_raw)
      ),
  }

  // Update leaderboard.json — prepend latest run, deduplicate by date
  let leaderboard = {
    version: 2,
    benchmark: USE_V2 ? 'cricket-qa-v2' : 'cricket-qa-v1',
    benchmark_url: BENCHMARK_URL,
    judge: JUDGE_MODEL,
    scoring: 'binary — 1 if correct, 0 if incorrect (per question)',
    runs: [],
  }
  if (existsSync(LEADERBOARD_PATH)) {
    try {
      leaderboard = JSON.parse(readFileSync(LEADERBOARD_PATH, 'utf8'))
      leaderboard.version = 2  // upgrade on write
    } catch {}
  }
  leaderboard.runs = [runSummary, ...leaderboard.runs.filter(r => r.date !== date)]

  mkdirSync(dirname(LEADERBOARD_PATH), { recursive: true })
  writeFileSync(LEADERBOARD_PATH, JSON.stringify(leaderboard, null, 2) + '\n')
  console.log(`✓  Leaderboard → ${LEADERBOARD_PATH}`)

  // Summary
  console.log('\n── Final scores ──────────────────────────────────────')
  if (withContext) {
    console.log('   ' + 'Model'.padEnd(24) + 'Raw     +OKF    Delta')
    console.log('   ' + '─'.repeat(50))
  }
  runSummary.models.forEach((m, i) => {
    const medals = ['🥇', '🥈', '🥉', '  ']
    const rawStr = (m.score_raw * 100).toFixed(1).padEnd(7) + '%'
    if (withContext && m.score_with_cs !== null) {
      const csStr   = (m.score_with_cs * 100).toFixed(1).padEnd(7) + '%'
      const deltaStr = `+${(m.delta * 100).toFixed(1)}pp`
      console.log(`${medals[i] ?? '  '} ${m.label.padEnd(22)} ${rawStr} ${csStr} ${deltaStr}`)
    } else {
      console.log(`${medals[i] ?? '  '} ${m.label.padEnd(22)} ${rawStr}`)
    }
  })
  console.log(`\n   Estimated cost: $${totalCostUsd.toFixed(2)} / cap $${COST_CAP}`)
}

main().catch(err => {
  console.error('\n✗ Benchmark failed:', err.message)
  process.exit(1)
})
