import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

export const metadata = {
  alternates: { canonical: '/evals/leaderboard' },
  title: 'LLM Cricket Accuracy Leaderboard',
  description:
    'CricketStudio runs 1,000 verified cricket Q&A pairs against GPT-4o, Claude, Gemini, and Perplexity — with and without CricketStudio data as context. See which LLM knows cricket best, and how much CricketStudio data improves accuracy.',
}

// ── Types ────────────────────────────────────────────────────────────────────

interface CategoryScore {
  correct_raw: number
  correct_with_cs?: number
  total: number
}

interface ModelRun {
  id: string
  label: string
  provider: string
  // v2 schema
  score_raw: number
  score_with_cs: number | null
  delta: number | null
  correct_raw: number
  correct_with_cs?: number
  total: number
  byCategory?: Record<string, CategoryScore>
}

interface Run {
  date: string
  questions: number
  judge: string
  with_context?: boolean
  context_source?: string
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
    return { version: 2, benchmark: 'cricket-qa-v1', benchmark_url: '', judge: '', scoring: '', runs: [] }
  }
  return JSON.parse(readFileSync(p, 'utf8')) as Leaderboard
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: 'text-purple-400 bg-purple-950',
  OpenAI:    'text-emerald-400 bg-emerald-950',
  Google:    'text-indigo-400 bg-indigo-950',
  Perplexity:'text-blue-400 bg-blue-950',
}

const RANK_COLORS = ['text-yellow-400', 'text-gray-300', 'text-amber-600', 'text-gray-500']

const BAR_COLORS = ['bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-red-400']

function pct(score: number) {
  return (score * 100).toFixed(1) + '%'
}

function lift(delta: number | null) {
  if (delta === null) return null
  const v = (delta * 100).toFixed(1)
  // "pts" = accuracy points — plain English, no jargon
  return delta >= 0 ? `+${v} pts` : `${v} pts`
}

const CATEGORY_LABELS: Record<string, string> = {
  player_stats: 'Player stats',
  ipl_history:  'IPL history',
  rules:        'Rules / laws',
  venue:        'Venue facts',
  recent_ipl:   'Recent IPL',
  general:      'General',
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const data     = getData()
  const latestRun = data.runs[0] ?? null
  // Sort by score_with_cs if the run has it, else score_raw
  const sortedModels = latestRun
    ? [...latestRun.models].sort((a, b) =>
        ((b.score_with_cs ?? b.score_raw)) - ((a.score_with_cs ?? a.score_raw))
      )
    : []
  const winner     = sortedModels[0] ?? null
  const hasContext = latestRun?.with_context === true

  // Gather categories
  const allCategories = latestRun
    ? Array.from(
        new Set(latestRun.models.flatMap(m => Object.keys(m.byCategory ?? {})))
      ).filter(c => c !== 'general')
    : []

  return (
    <div className="max-w-4xl mx-auto">
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
          Which LLM knows cricket{' '}
          <span className="text-green-400">best?</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          We test each AI model twice on 1,000 cricket questions.{' '}
          <strong className="text-gray-300">First: no data provided</strong> — the model answers from
          its training knowledge alone.{' '}
          <strong className="text-green-400">Second: CricketStudio&apos;s verified cricket stats injected as context.</strong>{' '}
          The score difference shows exactly how much accurate, structured cricket data improves AI answers.
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
          <span><strong className="text-gray-400">1,000</strong> questions</span>
          <span><strong className="text-gray-400">4</strong> models tested</span>
          <span><strong className="text-gray-400">2 rounds</strong> — without data, then with CricketStudio</span>
          <span><strong className="text-gray-400">Claude Haiku</strong> judge</span>
          <span><strong className="text-gray-400">Weekly</strong> · Mon 06:00 UTC</span>
          <span>
            Benchmark:{' '}
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
            <div className="bg-gradient-to-r from-green-950/60 to-gray-900 border border-green-900 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-5">
                <span className="text-4xl mt-0.5">🏆</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold tracking-wider text-green-700 uppercase mb-1">
                    Highest accuracy · {latestRun.date}
                  </div>
                  <div className="text-xl font-bold text-green-400">{winner.label}</div>
                  {hasContext && winner.score_with_cs !== null ? (
                    <div className="text-sm text-gray-400 mt-1 leading-relaxed">
                      Without CricketStudio data:{' '}
                      <strong className="text-gray-300 font-mono">{pct(winner.score_raw)}</strong>
                      {' '}({winner.correct_raw}/{winner.total} correct)
                      <br />
                      With CricketStudio data:{' '}
                      <strong className="text-green-300 font-mono">{pct(winner.score_with_cs)}</strong>
                      {winner.correct_with_cs !== undefined && (
                        <> ({winner.correct_with_cs}/{winner.total} correct)</>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 mt-0.5">
                      <strong className="text-gray-200 font-mono">{winner.correct_raw}</strong> /{' '}
                      {winner.total} questions correct
                    </div>
                  )}
                </div>
                {/* Score display */}
                <div className="text-right shrink-0">
                  {hasContext && winner.score_with_cs !== null ? (
                    <>
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="text-sm text-gray-500 font-mono">{pct(winner.score_raw)}</span>
                        <span className="text-gray-600">→</span>
                        <span className="text-4xl font-extrabold text-green-400 font-mono leading-none tracking-tight">
                          {pct(winner.score_with_cs)}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-end">
                        <span className="text-xs bg-green-900/60 text-green-300 px-2.5 py-1 rounded-full font-semibold">
                          {lift(winner.delta)} accuracy improvement
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-extrabold text-green-400 font-mono leading-none tracking-tight">
                        {pct(winner.score_raw)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">cricket accuracy</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Column legend when both passes present */}
          {hasContext && (
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs mb-3 pl-1">
              <span className="flex items-center gap-1.5 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-gray-600 inline-block" />
                Without data — AI&apos;s own training knowledge
              </span>
              <span className="flex items-center gap-1.5 text-green-500">
                <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
                With CricketStudio — verified stats provided as context
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                Improvement — how many accuracy points CricketStudio adds
              </span>
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
                  <th className="text-right py-3 px-4 text-gray-600 font-medium text-xs tracking-wide">Without data</th>
                  {hasContext && (
                    <>
                      <th className="text-right py-3 px-4 text-gray-600 font-medium text-xs tracking-wide hidden sm:table-cell">
                        With CricketStudio
                      </th>
                      <th className="text-right py-3 px-4 text-gray-600 font-medium text-xs tracking-wide hidden md:table-cell">
                        Improvement
                      </th>
                    </>
                  )}
                  <th className="py-3 px-4 text-gray-600 font-medium text-xs tracking-wide w-32 hidden lg:table-cell">
                    {hasContext ? 'With CS' : 'Accuracy'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedModels.map((model, i) => {
                  const providerCls = PROVIDER_COLORS[model.provider] ?? 'text-gray-400 bg-gray-800'
                  const deltaStr    = lift(model.delta)
                  const deltaPos    = model.delta !== null && model.delta > 0
                  // bar fills based on with-CS score if available, else raw
                  const barPct      = ((model.score_with_cs ?? model.score_raw) * 100).toFixed(1)
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
                      <td className="py-4 px-4 text-right">
                        <span className="text-gray-400 font-mono text-sm">
                          {pct(model.score_raw)}
                        </span>
                      </td>
                      {hasContext && (
                        <>
                          <td className="py-4 px-4 text-right hidden sm:table-cell">
                            <span className={`font-bold font-mono text-sm ${i === 0 ? 'text-green-400' : 'text-gray-200'}`}>
                              {model.score_with_cs !== null ? pct(model.score_with_cs) : '—'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right hidden md:table-cell">
                            {deltaStr ? (
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${deltaPos ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
                                {deltaStr}
                              </span>
                            ) : (
                              <span className="text-gray-600 text-xs">—</span>
                            )}
                          </td>
                        </>
                      )}
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden w-full">
                          <div
                            className={`h-full rounded-full ${BAR_COLORS[i] ?? 'bg-gray-500'}`}
                            style={{ width: `${barPct}%` }}
                          />
                        </div>
                      </td>
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
                <span className="text-gray-700 font-normal normal-case tracking-normal">(raw accuracy)</span>
                <span className="flex-1 h-px bg-gray-800" />
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-800 mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2.5 px-4 text-gray-600 font-medium text-xs tracking-wide">
                        Category
                      </th>
                      {sortedModels.map((m) => (
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
                        {sortedModels.map((m, mi) => {
                          const cs = m.byCategory?.[cat]
                          const catPct = cs
                            ? (cs.correct_raw / cs.total * 100).toFixed(0) + '%'
                            : '—'
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
            {data.runs.map((run, ri) => {
              const leader     = run.models[0]
              const hasCtx     = run.with_context === true
              return (
                <div
                  key={run.date}
                  className={`flex items-center gap-4 px-4 py-3 text-xs ${ri < data.runs.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  <span className="font-mono text-gray-500 w-24 shrink-0">{run.date}</span>
                  <span className="text-green-400 font-semibold flex-1 truncate">
                    🥇 {leader?.label}
                  </span>
                  <span className="text-gray-600">{run.questions} Q</span>
                  {hasCtx && leader?.delta !== null && leader?.delta !== undefined ? (
                    <span className="text-green-500 font-mono hidden sm:inline">
                      {pct(leader.score_raw)} → {pct(leader.score_with_cs!)} ({lift(leader.delta)})
                    </span>
                  ) : (
                    <div className="hidden sm:flex gap-3">
                      {run.models.slice(0, 4).map((m, mi) => (
                        <span key={m.id} className={`font-mono ${mi === 0 ? 'text-green-400' : 'text-gray-500'}`}>
                          {pct(m.score_raw)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* How it works */}
      <div className="mb-2 text-xs font-bold tracking-wider text-gray-600 uppercase flex items-center gap-3">
        How it works
        <span className="flex-1 h-px bg-gray-800" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-3">Pass A — Raw knowledge</div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Question sent with no context — model answers from training data alone</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>1,000 Q&amp;A pairs from <strong className="text-gray-300">OKF cricket-qa-v1</strong></li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Categories: player stats, IPL history, rules, venues, recent seasons</li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>This score reflects what the model &quot;knows&quot; about cricket without any help</li>
          </ul>
        </div>
        <div className="bg-gray-900 border border-green-900/40 rounded-lg p-4">
          <div className="text-xs font-bold text-green-500 uppercase tracking-wide mb-3">Pass B — With CricketStudio OKF</div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2"><span className="text-green-600 mt-0.5">▸</span>Same question, but CricketStudio&apos;s OKF knowledge bundle injected as context</li>
            <li className="flex gap-2"><span className="text-green-600 mt-0.5">▸</span>Context source: <a href="https://okf.cricketstudio.ai/llms.txt" className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">okf.cricketstudio.ai/llms.txt</a></li>
            <li className="flex gap-2"><span className="text-green-600 mt-0.5">▸</span>All OKF facts derived from ball-by-ball data with explicit provenance</li>
            <li className="flex gap-2"><span className="text-green-600 mt-0.5">▸</span>The &quot;Improvement&quot; column shows how many accuracy points CricketStudio adds per model</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
        <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-3">Scoring</div>
        <ul className="space-y-2 text-xs text-gray-400">
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Judge: <strong className="text-gray-300">Claude Haiku</strong> — scores each response binary 0 or 1</li>
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Partial answers counted correct when the core fact is accurate</li>
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Models run in parallel batches, rate-limited to avoid throttling</li>
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Run weekly · Mon 06:00 UTC · results committed to this repo</li>
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
