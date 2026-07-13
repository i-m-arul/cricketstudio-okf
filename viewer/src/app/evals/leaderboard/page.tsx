import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

export const metadata = {
  alternates: { canonical: '/evals/leaderboard' },
  title: 'LLM Accuracy Leaderboard',
  description:
    'Which LLM knows cricket best? CricketStudio runs 1,000 verified Q&A pairs against leading AI models — no context, raw knowledge only. Updated weekly.',
}

// ── Types ────────────────────────────────────────────────────────────────────

interface CategoryScore { correct: number; total: number }

interface ModelRun {
  id: string
  label: string
  provider: string
  score: number
  correct: number
  total: number
  byCategory?: Record<string, CategoryScore>
}

interface Run {
  date: string
  questions: number
  judge: string
  models: ModelRun[]
}

interface Leaderboard {
  version: number
  benchmark: string
  benchmark_url: string
  judge: string
  scoring: string
  runs: Run[]
}

// ── Data ─────────────────────────────────────────────────────────────────────

function getData(): Leaderboard {
  const p = join(process.cwd(), 'public', 'evals', 'leaderboard.json')
  if (!existsSync(p)) {
    return { version: 1, benchmark: 'cricket-qa-v1', benchmark_url: '', judge: '', scoring: '', runs: [] }
  }
  return JSON.parse(readFileSync(p, 'utf8')) as Leaderboard
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: 'text-purple-400 bg-purple-950',
  OpenAI: 'text-emerald-400 bg-emerald-950',
  Google: 'text-indigo-400 bg-indigo-950',
  Perplexity: 'text-blue-400 bg-blue-950',
}

const RANK_COLORS = ['text-yellow-400', 'text-gray-300', 'text-amber-600', 'text-gray-500']

const BAR_COLORS = [
  'bg-green-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-red-400',
]

function pct(score: number) {
  return (score * 100).toFixed(1) + '%'
}

function deltaLabel(score: number, baseline: number) {
  if (score === baseline) return { label: 'baseline', cls: 'text-gray-500 italic' }
  const diff = ((score - baseline) * 100).toFixed(1)
  return score > baseline
    ? { label: `+${diff}pp`, cls: 'text-green-400' }
    : { label: `${diff}pp`, cls: 'text-red-400' }
}

const CATEGORY_LABELS: Record<string, string> = {
  player_stats: 'Player stats',
  ipl_history: 'IPL history',
  rules: 'Rules / laws',
  venue: 'Venue facts',
  recent_ipl: 'Recent IPL',
  general: 'General',
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const data = getData()
  const latestRun = data.runs[0] ?? null
  const winner = latestRun?.models[0] ?? null

  // Gather all categories across all models in latest run
  const allCategories = latestRun
    ? Array.from(
        new Set(latestRun.models.flatMap(m => Object.keys(m.byCategory ?? {})))
      ).filter(c => c !== 'general')
    : []

  // Baseline = GPT-4o if present, else second model
  const baseline = latestRun?.models.find(m => m.id === 'gpt-4o') ?? latestRun?.models[1]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-600 mb-6 flex gap-1.5 items-center">
        <Link href="/" className="hover:text-gray-400">OKF</Link>
        <span>›</span>
        <span className="text-gray-400">LLM Leaderboard</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-bold tracking-widest text-green-600 uppercase mb-3 flex items-center gap-2">
          <span className="inline-block w-4 h-0.5 bg-green-600 rounded" />
          LLM Accuracy Evals
        </div>
        <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
          Which LLM knows cricket <span className="text-green-400">best?</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
          CricketStudio runs 1,000 verified cricket Q&amp;A pairs against leading AI models — no
          context injected, raw knowledge only. Each response scored by Claude Haiku. Updated weekly.
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
          <span><strong className="text-gray-400">1,000</strong> questions</span>
          <span><strong className="text-gray-400">4</strong> models</span>
          <span><strong className="text-gray-400">Claude Haiku</strong> judge</span>
          <span><strong className="text-gray-400">Weekly</strong> · Mon 06:00 UTC</span>
          <span>
            Source:{' '}
            <a
              href="https://players.cricketstudio.ai/evals/cricket-qa-v1.jsonl"
              className="text-green-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              cricket-qa-v1
            </a>
          </span>
        </div>
      </div>

      {/* ── No runs yet ────────────────────────────────────────────────────── */}
      {!latestRun && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
          <div className="text-4xl mb-4">🏏</div>
          <h2 className="text-lg font-semibold text-white mb-2">First run pending</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            The benchmark runner fires every Monday at 06:00 UTC. Results will appear here after the
            first successful run.
          </p>
          <div className="mt-5 text-xs text-gray-600">
            Operators: run{' '}
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">
              node scripts/run-benchmark.mjs --sample 50
            </code>{' '}
            for a quick validation run.
          </div>
        </div>
      )}

      {/* ── Results ────────────────────────────────────────────────────────── */}
      {latestRun && (
        <>
          {/* Winner card */}
          {winner && (
            <div className="bg-gradient-to-r from-green-950/60 to-gray-900 border border-green-900 rounded-xl p-5 mb-6 flex items-center gap-5">
              <span className="text-4xl">🏆</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold tracking-wider text-green-700 uppercase mb-1">
                  Current leader · {latestRun.date}
                </div>
                <div className="text-xl font-bold text-green-400">{winner.label}</div>
                <div className="text-sm text-gray-400 mt-0.5">
                  <strong className="text-gray-200 font-mono">{winner.correct}</strong> /{' '}
                  {winner.total} questions correct
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-5xl font-extrabold text-green-400 font-mono leading-none tracking-tight">
                  {pct(winner.score)}
                </div>
                <div className="text-xs text-gray-500 mt-1">cricket accuracy</div>
              </div>
            </div>
          )}

          {/* Leaderboard table */}
          <div className="mb-2 text-xs font-bold tracking-wider text-gray-600 uppercase flex items-center gap-3">
            Rankings
            <span className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-800 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium text-xs tracking-wide w-8">#</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium text-xs tracking-wide">Model</th>
                  <th className="py-3 px-4 text-gray-600 font-medium text-xs tracking-wide w-40 hidden sm:table-cell">Accuracy</th>
                  <th className="text-right py-3 px-4 text-gray-600 font-medium text-xs tracking-wide">Score</th>
                  <th className="text-right py-3 px-4 text-gray-600 font-medium text-xs tracking-wide hidden sm:table-cell">
                    Correct
                  </th>
                  {baseline && (
                    <th className="text-right py-3 px-4 text-gray-600 font-medium text-xs tracking-wide hidden md:table-cell">
                      vs GPT-4o
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {latestRun.models.map((model, i) => {
                  const delta = baseline && model.id !== baseline.id
                    ? deltaLabel(model.score, baseline.score)
                    : null
                  const providerCls = PROVIDER_COLORS[model.provider] ?? 'text-gray-400 bg-gray-800'
                  return (
                    <tr key={model.id} className="border-b border-gray-800/60 hover:bg-gray-900/50">
                      <td className="py-4 px-4">
                        <span className={`text-base font-extrabold font-mono ${RANK_COLORS[i] ?? 'text-gray-500'}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${providerCls}`}>
                            {model.provider[0]}
                          </span>
                          <div>
                            <div className="font-semibold text-gray-100">{model.label}</div>
                            <div className="text-xs text-gray-600">{model.provider} · {model.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden sm:table-cell">
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden w-full">
                          <div
                            className={`h-full rounded-full ${BAR_COLORS[i] ?? 'bg-gray-500'}`}
                            style={{ width: `${(model.score * 100).toFixed(1)}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`text-lg font-bold font-mono ${i === 0 ? 'text-green-400' : 'text-gray-300'}`}>
                          {pct(model.score)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-xs text-gray-500 font-mono hidden sm:table-cell">
                        {model.correct} / {model.total}
                      </td>
                      {baseline && (
                        <td className="py-4 px-4 text-right text-xs font-semibold hidden md:table-cell">
                          {model.id === baseline.id ? (
                            <span className="text-gray-600 italic">baseline</span>
                          ) : delta ? (
                            <span className={delta.cls}>{delta.label}</span>
                          ) : null}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Category breakdown */}
          {allCategories.length > 0 && (
            <>
              <div className="mb-2 text-xs font-bold tracking-wider text-gray-600 uppercase flex items-center gap-3">
                By category
                <span className="flex-1 h-px bg-gray-800" />
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-800 mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2.5 px-4 text-gray-600 font-medium text-xs tracking-wide">
                        Category
                      </th>
                      {latestRun.models.map((m) => (
                        <th key={m.id} className="text-right py-2.5 px-4 text-gray-600 font-medium text-xs tracking-wide">
                          {m.label.split(' ')[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allCategories.map((cat) => (
                      <tr key={cat} className="border-b border-gray-800/50 hover:bg-gray-900/40">
                        <td className="py-3 px-4 text-gray-400 text-xs">
                          {CATEGORY_LABELS[cat] ?? cat}
                        </td>
                        {latestRun.models.map((m, mi) => {
                          const cs = m.byCategory?.[cat]
                          const catPct = cs ? (cs.correct / cs.total * 100).toFixed(0) + '%' : '—'
                          return (
                            <td
                              key={m.id}
                              className={`py-3 px-4 text-right text-xs font-mono font-semibold ${mi === 0 ? 'text-green-400' : 'text-gray-400'}`}
                            >
                              {catPct}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Run history */}
          <div className="mb-2 text-xs font-bold tracking-wider text-gray-600 uppercase flex items-center gap-3">
            Run history
            <span className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="rounded-lg border border-gray-800 overflow-hidden mb-8">
            {data.runs.map((run, ri) => (
              <div
                key={run.date}
                className={`flex items-center gap-4 px-4 py-3 text-xs ${ri < data.runs.length - 1 ? 'border-b border-gray-800' : ''}`}
              >
                <span className="font-mono text-gray-500 w-24 shrink-0">{run.date}</span>
                <span className="text-green-400 font-semibold flex-1 truncate">
                  🥇 {run.models[0]?.label}
                </span>
                <span className="text-gray-600">{run.questions} Q</span>
                <div className="hidden sm:flex gap-3">
                  {run.models.slice(0, 4).map((m, mi) => (
                    <span key={m.id} className={`font-mono ${mi === 0 ? 'text-green-400' : 'text-gray-500'}`}>
                      {pct(m.score)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Methodology */}
      <div className="mb-2 text-xs font-bold tracking-wider text-gray-600 uppercase flex items-center gap-3">
        How it works
        <span className="flex-1 h-px bg-gray-800" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-3">Test set</div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>1,000 Q&amp;A pairs from <strong className="text-gray-300">OKF cricket-qa-v1</strong></li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Categories: player stats, IPL history, rules, venues, recent seasons</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>All answers derived from ball-by-ball data with explicit provenance</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Questions span IPL 2026, IPL historical (2007/08–2025), MLC 2023–2026</li>
            <li className="flex gap-2">
              <span className="text-green-800 mt-0.5">▸</span>
              Benchmark is public —{' '}
              <a
                href="https://players.cricketstudio.ai/evals/cricket-qa-v1.jsonl"
                className="text-green-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                /evals/cricket-qa-v1.jsonl
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-3">Scoring</div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>No context provided to models — raw cricket knowledge only</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Judge: <strong className="text-gray-300">Claude Haiku</strong> — scores each response 0 or 1</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Partial answers: counted correct if core fact is accurate</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Models run in parallel batches, rate-limited to avoid throttling</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Run weekly · Mon 06:00 UTC · results committed to this repo</li>
          </ul>
        </div>
      </div>

      {/* Coming next — Thing A */}
      <div className="bg-green-950/20 border border-green-900/40 rounded-xl p-5 flex items-start gap-4 mb-8">
        <span className="text-2xl mt-0.5">⚗️</span>
        <div className="flex-1">
          <div className="font-semibold text-white mb-1">Coming next: Does CricketStudio data make LLMs more accurate?</div>
          <div className="text-sm text-gray-500">
            Same 1,000 questions — but with CricketStudio OKF context injected. We&apos;ll publish the accuracy
            delta per model. &quot;Claude goes from 84% → 97% with CricketStudio context.&quot;
          </div>
        </div>
        <Link
          href="/about"
          className="shrink-0 text-xs text-green-400 border border-green-900 px-3 py-1.5 rounded-md hover:border-green-700 transition-colors"
        >
          Learn more →
        </Link>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-600 leading-relaxed">
        Benchmark: OKF <code className="text-gray-500">cricket-qa-v1</code> (CC-BY-4.0) · Judge:{' '}
        <code className="text-gray-500">claude-haiku-4-5-20251001</code> · Raw results committed to{' '}
        <a
          href="https://github.com/i-m-arul/cricketstudio-okf/tree/main/viewer/public/evals/results"
          className="text-green-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/i-m-arul/cricketstudio-okf
        </a>{' '}
        · <Link href="/methodology/citation-policy" className="text-green-600 hover:underline">Methodology</Link>
      </p>
    </div>
  )
}
