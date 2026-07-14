import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import { Trophy, TrendingUp, Database, Star } from 'lucide-react'

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
  score_raw: number
  score_with_cs: number | null
  delta: number | null
  correct_raw: number
  correct_with_cs?: number
  total: number
  byCategory?: Record<string, CategoryScore>
  byType?: Record<string, CategoryScore>
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
  benchmark_url?: string
  judge: string
  scoring: string
  runs: Run[]
}

// ── Data ─────────────────────────────────────────────────────────────────────

function getData(): Leaderboard {
  const p = join(process.cwd(), 'public', 'evals', 'leaderboard.json')
  if (!existsSync(p)) {
    return { version: 2, benchmark: 'cricket-qa-v2', benchmark_url: '', judge: '', scoring: '', runs: [] }
  }
  return JSON.parse(readFileSync(p, 'utf8')) as Leaderboard
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const PROVIDER_COLORS: Record<string, string> = {
  Anthropic:  'text-purple-400 bg-purple-950',
  OpenAI:     'text-emerald-400 bg-emerald-950',
  Google:     'text-indigo-400 bg-indigo-950',
  Perplexity: 'text-blue-400 bg-blue-950',
}

const RANK_COLORS = ['text-yellow-400', 'text-gray-300', 'text-amber-600', 'text-gray-500']
const BAR_COLORS  = ['bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-red-400']

function pct(score: number | null | undefined) {
  if (score === null || score === undefined) return '—'
  return (score * 100).toFixed(1) + '%'
}

function lift(delta: number | null) {
  if (delta === null) return null
  const v = (delta * 100).toFixed(1)
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

const TYPE_META: Record<string, { label: string; shortLabel: string; count: number; desc: string }> = {
  T3: { label: 'Single-entity facts',  shortLabel: 'Single-entity', count: 500, desc: 'One player, team, or venue in a specific context' },
  T4: { label: 'Career arcs',          shortLabel: 'Career arcs',   count: 250, desc: 'Multi-season evolution and peak/decline patterns' },
  T5: { label: 'Compound conditions',  shortLabel: 'Compound',      count: 150, desc: 'Two or more filters applied simultaneously' },
  T6: { label: 'Causal & debate',      shortLabel: 'Causal',        count: 100, desc: 'Why/who-is-better — rewards reasoning, not just recall' },
}

// ── Section divider ───────────────────────────────────────────────────────────

function SectionDivider({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="mb-3 text-xs font-bold tracking-wider text-gray-600 uppercase flex items-center gap-3">
      {label}
      {sub && <span className="text-gray-700 font-normal normal-case tracking-normal">{sub}</span>}
      <span className="flex-1 h-px bg-gray-800" />
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const data       = getData()
  const latestRun  = data.runs[0] ?? null
  const sortedModels = latestRun
    ? [...latestRun.models].sort((a, b) =>
        ((b.score_with_cs ?? b.score_raw)) - ((a.score_with_cs ?? a.score_raw))
      )
    : []
  const winner     = sortedModels[0] ?? null
  const hasContext = latestRun?.with_context === true

  // Biggest lift = model with highest delta (may differ from accuracy winner)
  const biggestLift = hasContext && latestRun
    ? [...latestRun.models]
        .filter(m => m.delta !== null && m.delta > 0)
        .sort((a, b) => (b.delta ?? 0) - (a.delta ?? 0))[0] ?? null
    : null
  const twoCards = biggestLift !== null && winner !== null && biggestLift.id !== winner.id

  const allCategories = latestRun
    ? Array.from(
        new Set(latestRun.models.flatMap(m => Object.keys(m.byCategory ?? {})))
      ).filter(c => c !== 'general')
    : []

  // byType: only show if at least one model has type breakdown data
  const hasTypeData = latestRun?.models.some(
    m => m.byType && Object.keys(m.byType).length > 0
  ) ?? false
  const typeKeys = hasTypeData
    ? Object.keys(TYPE_META).filter(k =>
        sortedModels.some(m => m.byType?.[k] !== undefined)
      )
    : []

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-600 mb-6 flex gap-1.5 items-center">
        <Link href="/" className="hover:text-gray-400">OKF</Link>
        <span>›</span>
        <span className="text-gray-400">LLM Leaderboard</span>
      </nav>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
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
          We test each AI model twice on {latestRun?.questions.toLocaleString() ?? '1,000'} cricket questions.{' '}
          <strong className="text-gray-300">First: no data provided</strong> — the model answers from
          its training knowledge alone.{' '}
          <strong className="text-green-400">Second: CricketStudio&apos;s verified cricket stats injected as context.</strong>{' '}
          The score difference shows exactly how much accurate, structured cricket data improves AI answers.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-xs text-gray-500">
          <span>
            <strong className="text-gray-400">{latestRun?.questions.toLocaleString() ?? '1,000'}</strong> questions
          </span>
          <span>
            <strong className="text-gray-400">{latestRun?.models.length ?? '4'}</strong> models tested
          </span>
          <span><strong className="text-gray-400">2 rounds</strong> — without data, then with CricketStudio</span>
          <span><strong className="text-gray-400">Claude Haiku</strong> judge</span>
          <span><strong className="text-gray-400">Weekly</strong> · Mon 06:00 UTC</span>
          <span>
            Benchmark:{' '}
            <a href="/evals/methodology" className="text-green-500 hover:underline">
              {data.benchmark}
            </a>
          </span>
        </div>
      </div>

      {/* ── No runs yet ─────────────────────────────────────────────────────── */}
      {!latestRun && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
          <Database className="w-10 h-10 text-green-700 mb-4 mx-auto" strokeWidth={1.5} />
          <h2 className="text-lg font-semibold text-white mb-2">First run pending</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            The benchmark runner fires every Monday at 06:00 UTC. Results will appear here after the
            first successful run.
          </p>
          <div className="mt-5 text-xs text-gray-600">
            Operators: trigger via{' '}
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">
              llm-benchmark.yml
            </code>{' '}
            workflow dispatch in the main repo.
          </div>
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────────────────────── */}
      {latestRun && (
        <>
          {/* ── Winner cards ────────────────────────────────────────────────── */}
          {winner && (
            <div className={`grid gap-4 mb-6 ${twoCards ? 'sm:grid-cols-2' : ''}`}>

              {/* Highest accuracy */}
              <div className="bg-gradient-to-br from-green-950/60 to-gray-900 border border-green-900 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                  <span className="text-xs font-bold tracking-wider text-green-700 uppercase">
                    Highest accuracy · {latestRun.date}
                  </span>
                </div>

                {hasContext && winner.score_with_cs !== null ? (
                  <>
                    <div className="flex flex-col items-center text-center py-3">
                      <div className="text-base font-bold text-green-400 mb-2">{winner.label}</div>
                      <div className="text-xs text-gray-600 font-mono tabular-nums mb-1">
                        {pct(winner.score_raw)} <span className="text-gray-700">→</span>
                      </div>
                      <div className="text-5xl font-extrabold text-green-400 font-mono leading-none tracking-tight tabular-nums">
                        {pct(winner.score_with_cs)}
                      </div>
                      <div className="mt-2.5">
                        <span className="text-xs bg-green-900/60 text-green-300 px-2.5 py-1 rounded-full font-semibold">
                          {lift(winner.delta)} improvement
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-center py-3">
                    <div className="text-base font-bold text-green-400 mb-3">{winner.label}</div>
                    <div className="text-5xl font-extrabold text-green-400 font-mono leading-none tracking-tight tabular-nums mb-1">
                      {pct(winner.score_raw)}
                    </div>
                    <div className="text-xs text-gray-500">{winner.correct_raw}/{winner.total} correct</div>
                  </div>
                )}
              </div>

              {/* Biggest lift */}
              {twoCards && biggestLift && (
                <div className="bg-gradient-to-br from-blue-950/50 to-gray-900 border border-blue-900/70 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                    <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                      Biggest lift · {latestRun.date}
                    </span>
                  </div>

                  <>
                    <div className="flex flex-col items-center text-center py-3">
                      <div className="text-base font-bold text-blue-300 mb-3">{biggestLift.label}</div>
                      <div className="text-5xl font-extrabold text-blue-300 font-mono leading-none tracking-tight tabular-nums">
                        {lift(biggestLift.delta)}
                      </div>
                      <div className="mt-2 text-xs text-gray-600">accuracy points gained with CricketStudio</div>
                      <div className="mt-2.5 flex items-baseline justify-center gap-1.5 font-mono tabular-nums text-sm">
                        <span className="text-gray-500">{pct(biggestLift.score_raw)}</span>
                        <span className="text-gray-700 text-xs">→</span>
                        <span className="text-blue-300 font-semibold">{pct(biggestLift.score_with_cs)}</span>
                      </div>
                    </div>
                  </>
                </div>
              )}

            </div>
          )}

          {/* ── Rankings ─────────────────────────────────────────────────────── */}
          <SectionDivider label="Rankings" sub={hasContext ? 'without data vs with CricketStudio context' : undefined} />
          <div className="space-y-2 mb-8">
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] mb-2 pl-1">
              <span className="flex items-center gap-1.5 text-gray-600">
                <span className="w-6 h-1.5 rounded bg-gray-600 inline-block" />
                Without data
              </span>
              {hasContext && (
                <span className="flex items-center gap-1.5 text-green-600">
                  <span className="w-6 h-1.5 rounded bg-green-500 inline-block" />
                  With CricketStudio OKF
                </span>
              )}
            </div>
            {sortedModels.map((model, i) => {
              const pCls      = PROVIDER_COLORS[model.provider] ?? 'text-gray-400 bg-gray-800'
              const rankCls   = RANK_COLORS[i] ?? 'text-gray-500'
              const rawPct    = (model.score_raw * 100).toFixed(1)
              const okfPct    = model.score_with_cs !== null
                ? (model.score_with_cs * 100).toFixed(1)
                : null
              const okfBarCls = i === 0
                ? 'h-full bg-green-500 rounded'
                : 'h-full bg-green-700 rounded'
              const deltaStr  = model.delta !== null
                ? '+' + (model.delta * 100).toFixed(0) + 'pp'
                : null
              return (
                <div key={model.id} className="flex items-center gap-3 py-1">
                  {/* Rank + provider */}
                  <span className={'text-sm font-extrabold font-mono tabular-nums w-5 shrink-0 text-right ' + rankCls}>
                    {i + 1}
                  </span>
                  <div className="w-28 sm:w-40 shrink-0 flex items-center gap-1.5 min-w-0">
                    <span className={['text-[10px] font-bold px-1 py-0.5 rounded shrink-0', pCls].join(' ')}>
                      {model.provider[0]}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-gray-200 truncate leading-tight">{model.label}</div>
                      <div className="text-[9px] text-gray-600 truncate">{model.provider}</div>
                    </div>
                  </div>
                  {/* Bars */}
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="h-5 bg-gray-800 rounded overflow-hidden relative">
                      <div className="h-full bg-gray-600 rounded" style={{ width: rawPct + '%' }} />
                      <span className="absolute inset-0 flex items-center pl-2 text-[10px] text-gray-400 font-mono tabular-nums">
                        {rawPct}%
                      </span>
                    </div>
                    {hasContext && okfPct !== null && (
                      <div className="h-5 bg-gray-800 rounded overflow-hidden relative">
                        <div className={okfBarCls} style={{ width: okfPct + '%' }} />
                        <span className="absolute inset-0 flex items-center pl-2 text-[10px] text-green-200 font-mono font-semibold tabular-nums">
                          {okfPct}%
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Delta badge */}
                  {hasContext && deltaStr && (
                    <span className="text-[10px] bg-green-950 text-green-400 px-1.5 py-0.5 rounded-full font-semibold tabular-nums shrink-0">
                      {deltaStr}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── By question type breakdown ───────────────────────────────────── */}
          <>
            <SectionDivider label="Accuracy by question type" sub="raw knowledge → with CricketStudio" />
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {Object.entries(TYPE_META).map(([qt, meta]) => {
                const hasData = sortedModels.some(m => m.byType?.[qt] !== undefined)
                return (
                  <div key={qt} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold font-mono text-gray-500 bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 shrink-0">
                        {qt}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-gray-300 leading-tight">{meta.label}</div>
                        <div className="text-[10px] text-gray-600">{meta.count} questions · {meta.desc}</div>
                      </div>
                    </div>
                    {hasData ? (
                      <div className="space-y-2.5">
                        {sortedModels.map((m, mi) => {
                          const ts = m.byType?.[qt]
                          if (!ts) return null
                          const rawScore = ts.correct_raw / ts.total
                          const csScore  = ts.correct_with_cs !== undefined ? ts.correct_with_cs / ts.total : null
                          const rawStr   = (rawScore * 100).toFixed(1) + '%'
                          const csStr    = csScore !== null ? (csScore * 100).toFixed(1) + '%' : null
                          const delta    = csScore !== null ? csScore - rawScore : null
                          const pCls     = PROVIDER_COLORS[m.provider] ?? 'text-gray-400 bg-gray-800'
                          const valCls   = ['text-xs font-bold font-mono tabular-nums', mi === 0 ? 'text-green-400' : 'text-gray-200'].join(' ')
                          return (
                            <div key={m.id} className="flex items-center gap-2">
                              <span className={['text-[10px] font-bold px-1 py-0.5 rounded shrink-0', pCls].join(' ')}>
                                {m.provider[0]}
                              </span>
                              <span className="text-[11px] text-gray-500 w-16 shrink-0 truncate">{m.label.split(' ')[0]}</span>
                              {csStr !== null ? (
                                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                  <span className="text-[11px] font-mono text-gray-600 tabular-nums">{rawStr}</span>
                                  <span className="text-gray-700 text-[10px]">→</span>
                                  <span className={valCls}>{csStr}</span>
                                  {delta !== null && (
                                    <span className="ml-auto text-[10px] bg-green-950 text-green-400 px-1 py-0.5 rounded font-semibold tabular-nums shrink-0">
                                      +{(delta * 100).toFixed(0)}pp
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className={valCls}>{rawStr}</span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {sortedModels.map((m) => {
                          const pCls = PROVIDER_COLORS[m.provider] ?? 'text-gray-400 bg-gray-800'
                          return (
                            <div key={m.id} className="flex items-center gap-2">
                              <span className={['text-[10px] font-bold px-1 py-0.5 rounded shrink-0', pCls].join(' ')}>
                                {m.provider[0]}
                              </span>
                              <span className="text-[11px] text-gray-600 w-16 shrink-0 truncate">{m.label.split(' ')[0]}</span>
                              <div className="flex-1 h-1 bg-gray-800 rounded" />
                              <span className="text-[10px] text-gray-700 font-mono shrink-0">pending</span>
                            </div>
                          )
                        })}
                        <p className="text-[10px] text-gray-700 mt-2 leading-relaxed">
                          Per-type breakdown available after the next full benchmark run.
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>

          {/* ── Category breakdown ───────────────────────────────────────────── */}
          {allCategories.length > 1 && (
            <>
              <SectionDivider label="By category" sub="(raw accuracy)" />
              <div className="overflow-x-auto rounded-lg border border-gray-800 mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-900/50">
                      <th className="text-left py-2.5 px-3 text-gray-600 font-medium text-xs tracking-wide">
                        Category
                      </th>
                      {sortedModels.map((m) => (
                        <th key={m.id} className="text-right py-2.5 px-3 text-gray-600 font-medium text-xs tracking-wide">
                          {m.label.split(' ')[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allCategories.map((cat) => (
                      <tr key={cat} className="border-b border-gray-800/50 hover:bg-gray-900/40 last:border-b-0">
                        <td className="py-3 px-3 text-gray-400 text-xs">
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
                              className={`py-3 px-3 text-right text-xs font-mono font-semibold tabular-nums ${mi === 0 ? 'text-green-400' : 'text-gray-400'}`}
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

          {/* ── Run history ──────────────────────────────────────────────────── */}
          <SectionDivider label="Run history" />
          <div className="rounded-lg border border-gray-800 overflow-hidden mb-8">
            {data.runs.map((run, ri) => {
              const leader = run.models[0]
              const hasCtx = run.with_context === true
              return (
                <div
                  key={run.date}
                  className={`flex items-center gap-4 px-4 py-3 text-xs ${ri < data.runs.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  <span className="font-mono text-gray-500 w-24 shrink-0">{run.date}</span>
                  <span className="text-green-400 font-semibold flex-1 truncate flex items-center gap-1.5">
                    <Star className="w-3 h-3 shrink-0" strokeWidth={1.5} />{leader?.label}
                  </span>
                  <span className="text-gray-600">{run.questions} Q</span>
                  {hasCtx && leader?.delta !== null && leader?.delta !== undefined ? (
                    <span className="text-green-500 font-mono hidden sm:inline tabular-nums">
                      {pct(leader.score_raw)} → {pct(leader.score_with_cs)} ({lift(leader.delta)})
                    </span>
                  ) : (
                    <div className="hidden sm:flex gap-3">
                      {run.models.slice(0, 4).map((m, mi) => (
                        <span key={m.id} className={`font-mono tabular-nums ${mi === 0 ? 'text-green-400' : 'text-gray-500'}`}>
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

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <SectionDivider label="How it works" />
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-3">Pass A — Raw knowledge</div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Question sent with no context — model answers from training data alone</li>
            <li className="flex gap-2">
              <span className="text-green-800 mt-0.5">▸</span>
              {latestRun ? latestRun.questions.toLocaleString() : '1,000'} Q&amp;A pairs —{' '}
              <a href="/evals/methodology" className="text-green-600 hover:underline">
                {data.benchmark}
              </a>
            </li>
            <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Four types: single-entity facts, career arcs, compound conditions, causal debate</li>
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

      {/* ── What kinds of questions? ──────────────────────────────────────────── */}
      <SectionDivider label="What kinds of questions?" />
      <p className="text-xs text-gray-500 mb-4">
        The benchmark uses {latestRun?.questions.toLocaleString() ?? '1,000'} questions across four difficulty levels. Even the &ldquo;simple&rdquo; ones stump most LLMs
        without CricketStudio data — they require exact ball-by-ball aggregation that no model carries in training.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {/* T3 */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-bold font-mono text-gray-500 bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5">T3</span>
            <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Single-entity facts</span>
            <span className="text-xs text-gray-700 font-mono ml-auto">500 of {latestRun?.questions.toLocaleString() ?? '1,000'}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Stats about one player, team, or venue in a specific context. Sounds straightforward —
            but requires exact ball-by-ball aggregations that LLMs don&apos;t carry in training.
          </p>
          <div className="space-y-2">
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;What is Shubman Gill&apos;s head-to-head record vs Yuzvendra Chahal across their IPL career?&rdquo;
            </div>
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;When captains win the toss at Dubai International Cricket Stadium, which choice wins more often?&rdquo;
            </div>
          </div>
        </div>

        {/* T4 */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-bold font-mono text-gray-500 bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5">T4</span>
            <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Career arcs</span>
            <span className="text-xs text-gray-700 font-mono ml-auto">250 of {latestRun?.questions.toLocaleString() ?? '1,000'}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            How has a player evolved across multiple IPL seasons? Peak vs decline questions need
            season-by-season breakdowns — impossible without structured time-series data.
          </p>
          <div className="space-y-2">
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;How has Deepak Chahar&apos;s bowling economy changed across his IPL career? Which was his most economical season?&rdquo;
            </div>
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;How has Trent Boult&apos;s wicket-taking evolved across 11 IPL seasons?&rdquo;
            </div>
          </div>
        </div>

        {/* T5 */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-bold font-mono text-gray-500 bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5">T5</span>
            <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Compound conditions</span>
            <span className="text-xs text-gray-700 font-mono ml-auto">150 of {latestRun?.questions.toLocaleString() ?? '1,000'}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Two or more conditions stacked together. Requires filtering the dataset to only the
            matches where both X and Y are true simultaneously.
          </p>
          <div className="space-y-2">
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;What are the win odds when a team wins the toss AND elects to bowl at Ekana Cricket Stadium?&rdquo;
            </div>
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;Has RCB&apos;s powerplay batting strike rate improved since the Impact Player rule was introduced in 2023?&rdquo;
            </div>
          </div>
        </div>

        {/* T6 */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-bold font-mono text-gray-500 bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5">T6</span>
            <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Causal &amp; debate</span>
            <span className="text-xs text-gray-700 font-mono ml-auto">100 of {latestRun?.questions.toLocaleString() ?? '1,000'}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Who is better? Why does X outperform in Y conditions? Good answers define the metric,
            time window, and era before concluding — not just picking a name.
          </p>
          <div className="space-y-2">
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;Who is better in the IPL — Virat Kohli or Rohit Sharma?&rdquo;
            </div>
            <div className="text-xs bg-gray-800/60 rounded p-2.5 text-gray-400 leading-relaxed">
              &ldquo;Which season was Munaf Patel at his bowling peak in the IPL?&rdquo;
            </div>
          </div>
        </div>
      </div>

      {/* ── Scoring ────────────────────────────────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
        <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-3">Scoring</div>
        <ul className="space-y-2 text-xs text-gray-400">
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Judge: <strong className="text-gray-300">Claude Haiku</strong> — scores each response binary 0 or 1</li>
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Partial answers counted correct when the core fact is accurate</li>
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Models run in parallel batches, rate-limited to avoid throttling</li>
          <li className="flex gap-2"><span className="text-green-800 mt-0.5">▸</span>Run weekly · Mon 06:00 UTC · results committed to this repo</li>
          <li className="flex gap-2">
            <span className="text-green-800 mt-0.5">▸</span>
            Methodology published —{' '}
            <a href="/evals/methodology" className="text-green-500 hover:underline">
              see benchmark design
            </a>
          </li>
        </ul>
      </div>

      {/* ── Footer note ────────────────────────────────────────────────────────── */}
      <p className="text-xs text-gray-600 leading-relaxed">
        Benchmark: <code className="text-gray-500">{data.benchmark}</code> · Judge:{' '}
        <code className="text-gray-500">{data.judge || 'claude-haiku-4-5-20251001'}</code>{' '}
        · <Link href="/evals/methodology" className="text-green-600 hover:underline">Benchmark methodology</Link>
        · <Link href="/methodology/citation-policy" className="text-green-600 hover:underline">Citation policy</Link>
      </p>
    </div>
  )
}
