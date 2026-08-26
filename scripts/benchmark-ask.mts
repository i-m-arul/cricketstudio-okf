#!/usr/bin/env tsx
/**
 * scripts/benchmark-ask.mts — /ask pipeline accuracy benchmark
 *
 * Tests the local ask() orchestrator (retriever → composer → verifier) against
 * a stratified sample from data/evals/cricket-qa-v2.jsonl.
 *
 * This is DIFFERENT from run-benchmark.mjs which tests raw LLMs vs OKF context.
 * This script validates that the /ask pipeline:
 *   (a) doesn't refuse on answerable questions
 *   (b) returns factually correct answers (judged by Haiku)
 *
 * Sample: 100 questions, stratified by type
 *   T3 (Single-Entity Facts):    40 of 601
 *   T4 (Career Arcs):            25 of 250
 *   T5 (Compound Conditions):    20 of 49
 *   T6 (Causal & Debate):        15 of 100
 *
 * Usage:
 *   npx tsx scripts/benchmark-ask.mts
 *   npx tsx scripts/benchmark-ask.mts --retriever-only   # skip LLM, just check snippet relevance
 *   npx tsx scripts/benchmark-ask.mts --sample 20        # quick smoke test
 *   npx tsx scripts/benchmark-ask.mts --type T3          # single type only
 *
 * Env: ANTHROPIC_API_KEY (required for composer + judge)
 *
 * Output: data/evals/ask-benchmark-YYYY-MM-DD.jsonl + console summary
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Dotenv ────────────────────────────────────────────────────────────────────
function loadEnv(p: string) {
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
      val = val.slice(1, -1);
    if (key && !(key in process.env)) process.env[key] = val;
  }
}
loadEnv(join(ROOT, '.env'));
loadEnv(join(ROOT, '.env.local'));

// ── Args ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const RETRIEVER_ONLY = argv.includes('--retriever-only');
const sampleIdx = argv.indexOf('--sample');
const typeIdx = argv.indexOf('--type');
const SAMPLE_OVERRIDE = sampleIdx !== -1 ? parseInt(argv[sampleIdx + 1]) : null;
const TYPE_FILTER = typeIdx !== -1 ? argv[typeIdx + 1] : null;

// ── Sample config ─────────────────────────────────────────────────────────────
const STRATA: Record<string, number> = {
  T3: 40,
  T4: 25,
  T5: 20,
  T6: 15,
};
if (TYPE_FILTER && STRATA[TYPE_FILTER] === undefined) {
  console.error(`Unknown type: ${TYPE_FILTER}. Must be one of: ${Object.keys(STRATA).join(', ')}`);
  process.exit(1);
}

// ── Load and stratify questions ───────────────────────────────────────────────
interface QA {
  id: string;
  question: string;
  answer: string;
  question_type: string;
  canonical_url?: string;
}

const QA_PATH = join(ROOT, 'data', 'evals', 'cricket-qa-v2.jsonl');
if (!existsSync(QA_PATH)) {
  console.error(`Q&A file not found: ${QA_PATH}`);
  process.exit(1);
}

const allQuestions: QA[] = readFileSync(QA_PATH, 'utf8')
  .trim().split('\n').map(l => JSON.parse(l));

// Stratified sample — deterministic (slice from front, shuffle per type with fixed seed)
function pseudoShuffle<T>(arr: T[], seed: number): T[] {
  // Simple deterministic shuffle (LCG)
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

let sample: QA[] = [];
const targetTypes = TYPE_FILTER ? [TYPE_FILTER] : Object.keys(STRATA);
for (const t of targetTypes) {
  const pool = pseudoShuffle(allQuestions.filter(q => q.question_type === t), 42);
  const n = SAMPLE_OVERRIDE != null ? SAMPLE_OVERRIDE : (STRATA[t] ?? 10);
  sample.push(...pool.slice(0, Math.min(n, pool.length)));
}

console.log(`\n── CricketStudio /ask benchmark ──────────────────────────────────────`);
console.log(`  Questions: ${sample.length} (stratified across types)`);
const typeDist = Object.fromEntries(
  Object.keys(STRATA).map(t => [t, sample.filter(q => q.question_type === t).length])
);
console.log(`  Distribution:`, typeDist);
console.log(`  Mode: ${RETRIEVER_ONLY ? 'retriever-only (no LLM)' : 'full pipeline'}`);

if (!RETRIEVER_ONLY && !process.env.ANTHROPIC_API_KEY) {
  console.error('\n✗ ANTHROPIC_API_KEY not set — required for composer + judge.');
  process.exit(1);
}

// ── Imports (deferred so we can check args first) ─────────────────────────────
const { retrieve } = await import('../lib/ask/retriever.js');
const { ask } = !RETRIEVER_ONLY ? await import('../lib/ask/orchestrator.js') : { ask: null };

// ── Judge (Haiku) ─────────────────────────────────────────────────────────────
const JUDGE_MODEL = 'claude-haiku-4-5-20251001';
const RETRY_DELAYS_MS = [5000, 15000];
const RATE_LIMIT_STATUSES = new Set([429, 529]);

async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      const status = err._status;
      const isRL = status !== undefined && RATE_LIMIT_STATUSES.has(status);
      if (!isRL || attempt >= RETRY_DELAYS_MS.length) throw err;
      const delay = RETRY_DELAYS_MS[attempt];
      process.stderr.write(`\n  ⏳ ${label} rate-limited — retrying in ${delay / 1000}s\n`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

async function judgeAnswer(question: string, expected: string, response: string): Promise<{ correct: boolean; reason: string }> {
  const prompt = `You are judging whether an AI answer to a cricket question is factually correct.

Question: ${question}
Expected answer (ground truth): ${expected.slice(0, 600)}
AI response: ${response.slice(0, 600)}

Is the AI response factually correct and consistent with the expected answer?
A partial answer that covers the core fact counts as correct.
If the AI says "data not available" or similar refusal, that is INCORRECT.
Respond with JSON only: {"correct": true/false, "reason": "one brief sentence"}`;

  try {
    const res = await withRetry('Judge', async () => {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: JUDGE_MODEL,
          max_tokens: 120,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      if (!r.ok) { const e: any = new Error(`Judge ${r.status}`); e._status = r.status; throw e; }
      return r.json();
    });
    const text: string = (res as any).content?.[0]?.text ?? '';
    const m = text.match(/\{[\s\S]*?\}/);
    if (!m) return { correct: false, reason: 'judge parse error' };
    return JSON.parse(m[0]);
  } catch (err: any) {
    return { correct: false, reason: `judge error: ${err.message?.slice(0, 60)}` };
  }
}

// ── Snippet relevance check ───────────────────────────────────────────────────
function isRelevantSnippet(snippet: { id: string; text: string }, question: string): boolean {
  // A snippet is "relevant" if it mentions one of the main entities in the question
  const qLower = question.toLowerCase();
  const sLower = (snippet.text + ' ' + snippet.id).toLowerCase();
  // Extract key words from question (length > 4, not stopwords)
  const stops = new Set(['what', 'when', 'where', 'which', 'have', 'does', 'their', 'with', 'from', 'that', 'this', 'been', 'were', 'would', 'could', 'should']);
  const queryWords = qLower.split(/\W+/).filter(w => w.length > 4 && !stops.has(w));
  const matchCount = queryWords.filter(w => sLower.includes(w)).length;
  return matchCount >= 2; // at least 2 meaningful query words in snippet
}

// ── Result types ──────────────────────────────────────────────────────────────
type Outcome = 'answered' | 'refused' | 'error' | 'retriever-empty' | 'retriever-ok';

interface Result {
  id: string;
  question_type: string;
  question: string;
  outcome: Outcome;
  refuseReason?: string;
  answerPreview?: string;
  correct?: boolean;
  judgeReason?: string;
  snippetCount?: number;
  relevantSnippets?: number;
  durationMs: number;
}

// ── Run ───────────────────────────────────────────────────────────────────────
const results: Result[] = [];
const BATCH_PAUSE_MS = 800;
const date = new Date().toISOString().slice(0, 10);

let answered = 0, refused = 0, errors = 0, correct = 0;

console.log('\n  Progress (. = answered correct, x = answered wrong, R = refused, E = error, ? = retriever-empty):');
process.stdout.write('  ');

for (let i = 0; i < sample.length; i++) {
  const q = sample[i];
  const t0 = Date.now();

  if (RETRIEVER_ONLY) {
    // ── Retriever-only mode: validate snippet relevance ──
    const snippets = retrieve(q.question, ROOT);
    const relevant = snippets.filter(s => isRelevantSnippet(s, q.question)).length;
    const outcome: Outcome = snippets.length === 0 ? 'retriever-empty' : 'retriever-ok';
    results.push({
      id: q.id,
      question_type: q.question_type,
      question: q.question,
      outcome,
      snippetCount: snippets.length,
      relevantSnippets: relevant,
      durationMs: Date.now() - t0,
    });
    process.stdout.write(snippets.length === 0 ? '?' : relevant >= 2 ? '.' : 'x');
  } else {
    // ── Full pipeline mode ──
    try {
      const response = await ask!({
        query: q.question,
        asker: 'benchmark',
        tier: 'anon',
        cwd: ROOT,
      });

      if (!response.ok) {
        refused++;
        results.push({
          id: q.id,
          question_type: q.question_type,
          question: q.question,
          outcome: 'refused',
          refuseReason: response.reason,
          answerPreview: response.message?.slice(0, 120),
          durationMs: Date.now() - t0,
        });
        process.stdout.write('R');
      } else {
        answered++;
        // Judge the answer
        await new Promise(r => setTimeout(r, 200));
        const verdict = await judgeAnswer(q.question, q.answer, response.answer);
        if (verdict.correct) correct++;
        results.push({
          id: q.id,
          question_type: q.question_type,
          question: q.question,
          outcome: 'answered',
          answerPreview: response.answer.slice(0, 150),
          correct: verdict.correct,
          judgeReason: verdict.reason,
          snippetCount: response.snippets?.length,
          durationMs: Date.now() - t0,
        });
        process.stdout.write(verdict.correct ? '.' : 'x');
      }
    } catch (err: any) {
      errors++;
      results.push({
        id: q.id,
        question_type: q.question_type,
        question: q.question,
        outcome: 'error',
        refuseReason: err.message?.slice(0, 100),
        durationMs: Date.now() - t0,
      });
      process.stdout.write('E');
    }

    // Pace the calls to avoid rate limits
    if (i < sample.length - 1) await new Promise(r => setTimeout(r, BATCH_PAUSE_MS));
  }

  if ((i + 1) % 10 === 0) process.stdout.write(` ${i + 1}\n  `);
}
console.log('\n');

// ── Summary ───────────────────────────────────────────────────────────────────
if (RETRIEVER_ONLY) {
  const empty = results.filter(r => r.outcome === 'retriever-empty').length;
  const ok = results.filter(r => r.outcome === 'retriever-ok').length;
  const highRelevance = results.filter(r => (r.relevantSnippets ?? 0) >= 2).length;

  console.log('── Retriever Summary ──────────────────────────────────────────────────');
  console.log(`  Total questions: ${results.length}`);
  console.log(`  Has snippets:    ${ok} (${(ok / results.length * 100).toFixed(0)}%)`);
  console.log(`  Empty retrieval: ${empty} (${(empty / results.length * 100).toFixed(0)}%)`);
  console.log(`  High relevance:  ${highRelevance} (≥2 matching words in snippets)`);

  console.log('\n  By type:');
  for (const t of Object.keys(STRATA)) {
    const tr = results.filter(r => r.question_type === t);
    if (tr.length === 0) continue;
    const tOk = tr.filter(r => r.outcome === 'retriever-ok').length;
    const tRel = tr.filter(r => (r.relevantSnippets ?? 0) >= 2).length;
    console.log(`    ${t}: ${tr.length} questions | snippets: ${tOk} | relevant: ${tRel}`);
  }

  // Show empty retrievals
  const empties = results.filter(r => r.outcome === 'retriever-empty');
  if (empties.length > 0) {
    console.log('\n  Empty retrievals:');
    empties.forEach(r => console.log(`    [${r.question_type}] ${r.question.slice(0, 80)}`));
  }
} else {
  const total = results.length;
  const answeredPct = (answered / total * 100).toFixed(1);
  const refusedPct = (refused / total * 100).toFixed(1);
  const correctPct = answered > 0 ? (correct / answered * 100).toFixed(1) : '—';
  const overallPct = (correct / total * 100).toFixed(1);

  console.log('── /ask Pipeline Summary ──────────────────────────────────────────────');
  console.log(`  Total questions: ${total}`);
  console.log(`  Answered:        ${answered} (${answeredPct}%)`);
  console.log(`  Refused:         ${refused} (${refusedPct}%)`);
  console.log(`  Errors:          ${errors}`);
  console.log(`  Correct answers: ${correct} / ${answered} answered (${correctPct}% of answered)`);
  console.log(`  Overall accuracy:${correct} / ${total} (${overallPct}%)`);

  console.log('\n  By type:');
  for (const t of Object.keys(STRATA)) {
    const tr = results.filter(r => r.question_type === t);
    if (tr.length === 0) continue;
    const ta = tr.filter(r => r.outcome === 'answered').length;
    const tc = tr.filter(r => r.correct === true).length;
    const tref = tr.filter(r => r.outcome === 'refused').length;
    const tAnsweredPct = (ta / tr.length * 100).toFixed(0);
    const tCorrectPct = ta > 0 ? (tc / ta * 100).toFixed(0) : '—';
    console.log(`    ${t}: ${tr.length} Qs | answered ${ta} (${tAnsweredPct}%) | correct ${tc} (${tCorrectPct}% of answered) | refused ${tref}`);
  }

  // Show refusals grouped by reason
  const refusals = results.filter(r => r.outcome === 'refused');
  if (refusals.length > 0) {
    const byReason: Record<string, number> = {};
    refusals.forEach(r => { const key = r.refuseReason ?? 'unknown'; byReason[key] = (byReason[key] ?? 0) + 1; });
    console.log('\n  Refusal breakdown:');
    Object.entries(byReason).sort((a, b) => b[1] - a[1]).forEach(([r, n]) =>
      console.log(`    ${n}x  ${r.slice(0, 80)}`)
    );
  }

  // Show wrong answers for diagnostics
  const wrong = results.filter(r => r.outcome === 'answered' && r.correct === false);
  if (wrong.length > 0 && wrong.length <= 20) {
    console.log('\n  Wrong answers:');
    wrong.slice(0, 10).forEach(r => {
      console.log(`    [${r.question_type}] ${r.question.slice(0, 70)}`);
      console.log(`      Answer: ${r.answerPreview?.slice(0, 80)}`);
      console.log(`      Judge:  ${r.judgeReason}`);
    });
  }
}

// ── Write results ─────────────────────────────────────────────────────────────
const outPath = join(ROOT, 'data', 'evals', `ask-benchmark-${date}.jsonl`);
writeFileSync(outPath, results.map(r => JSON.stringify(r)).join('\n') + '\n');
console.log(`\n  Results → ${outPath}`);

process.exit(0);
