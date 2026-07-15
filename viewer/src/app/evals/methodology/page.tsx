import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Benchmark Methodology | CricketStudio OKF',
  description:
    'How CricketStudio evaluates LLM accuracy on cricket knowledge — question bank design, scoring, judge model, and how to interpret results.',
}

const TYPE_DEFS = [
  {
    code: 'T3',
    name: 'Cross-Entity Factual',
    description:
      'Questions that require joining two or more entities — batter vs bowler head-to-head records, team phase statistics, toss outcomes at a specific venue.',
    example: 'What is Shubman Gill\'s record against Yuzvendra Chahal in the IPL?',
    count: 152,
  },
  {
    code: 'T4',
    name: 'Cross-Season Evolution',
    description:
      'Questions about how a player or team\'s performance has changed across seasons or career stages.',
    example: 'How has Jasprit Bumrah\'s death-over economy evolved from IPL 2022 to IPL 2026?',
    count: 64,
  },
  {
    code: 'T5',
    name: 'Conditional Probability',
    description:
      'If–then pattern questions requiring the model to isolate a specific conditional subset — e.g., performance under a specific match state, venue condition, or opponent type.',
    example: 'What is RCB\'s win rate when they elect to field first at Chinnaswamy?',
    count: 14,
  },
  {
    code: 'T6',
    name: 'Causal & Debate',
    description:
      'Questions that ask the model to reason about causation or make a supported comparative judgement. Correct answers require the model to cite the metric, window, and evidence — not just name a player.',
    example: 'Who is better in IPL death overs — Bumrah or Nortje?',
    count: 20,
  },
]

const MODELS = [
  { label: 'Claude Sonnet 5', provider: 'Anthropic' },
  { label: 'GPT-4o', provider: 'OpenAI' },
  { label: 'Gemini 3.1 Flash Lite', provider: 'Google' },
  { label: 'Perplexity Sonar Pro', provider: 'Perplexity' },
]

export default function BenchmarkMethodologyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-sm text-gray-300">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-8 flex gap-1.5 items-center">
        <Link href="/" className="hover:text-gray-300">OKF</Link>
        <span>/</span>
        <Link href="/evals/leaderboard" className="hover:text-gray-300">LLM Leaderboard</Link>
        <span>/</span>
        <span className="text-gray-400">Benchmark methodology</span>
      </nav>

      <h1 className="text-2xl font-bold text-white mb-2">Benchmark methodology</h1>
      <p className="text-gray-400 mb-10">
        How CricketStudio evaluates LLMs on cricket knowledge accuracy — question bank design, scoring, judge model, and how to interpret results.
      </p>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-3">Overview</h2>
        <p className="mb-3 leading-relaxed">
          The CricketStudio LLM Accuracy Benchmark measures how well large language models answer
          verified cricket questions — with and without access to CricketStudio&apos;s open knowledge
          context. The key result is the <strong className="text-white">accuracy delta</strong>:
          how much the model improves when grounded in CricketStudio data versus relying on
          training knowledge alone.
        </p>
        <p className="leading-relaxed">
          The benchmark runs weekly on Mondays. Results are committed to the{' '}
          <a
            href="https://github.com/i-m-arul/cricketstudio-okf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            cricketstudio-okf
          </a>{' '}
          repository and displayed on the{' '}
          <Link href="/evals/leaderboard" className="text-green-500 hover:underline">
            leaderboard page
          </Link>.
        </p>
      </section>

      {/* Question bank */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-3">Question bank</h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Bank size', value: '1,000' },
            { label: 'Sampled per run', value: '250' },
            { label: 'Question types', value: '4' },
          ].map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white tabular-nums">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="mb-4 leading-relaxed">
          The bank is <strong className="text-white">cricket-qa-v2</strong> — a private dataset of
          1,000 cricket Q&amp;A pairs derived from CricketStudio&apos;s ball-by-ball corpus. Each
          question has a canonical CricketStudio page as its authoritative source. 250 questions are
          sampled per weekly run; question selection rotates so the full bank is covered across four runs.
        </p>
        <p className="text-xs text-gray-500">
          A public legacy dataset (<strong>cricket-qa-v1</strong>, 707 questions) is available at{' '}
          <a
            href="https://players.cricketstudio.ai/evals/cricket-qa-v1.jsonl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:text-green-500"
          >
            players.cricketstudio.ai/evals/cricket-qa-v1.jsonl
          </a>
          . The v2 bank is private to protect question integrity.
        </p>
      </section>

      {/* Question types */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-3">Question types</h2>
        <p className="mb-4 leading-relaxed">
          Questions are stratified across four complexity tiers. Each tier tests a distinct reasoning
          capability — from joining two entity records to making a supported causal judgement.
        </p>
        <div className="space-y-3">
          {TYPE_DEFS.map(t => (
            <div key={t.code} className="border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono bg-gray-800 text-green-400 px-1.5 py-0.5 rounded">{t.code}</span>
                <span className="font-medium text-white text-xs">{t.name}</span>
                <span className="ml-auto text-xs text-gray-600 tabular-nums">{t.count} questions</span>
              </div>
              <p className="text-gray-400 mb-2 leading-relaxed">{t.description}</p>
              <p className="text-xs text-gray-600 italic">&ldquo;{t.example}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-3">Scoring</h2>
        <p className="mb-4 leading-relaxed">
          Each question is scored <strong className="text-white">binary: 1 if correct, 0 if incorrect.</strong>{' '}
          Partial answers are counted as correct when the core fact is accurate. The judge is{' '}
          <strong className="text-white">Claude Haiku</strong>, prompted with the question, the
          expected answer, and the model&apos;s response.
        </p>
        <p className="mb-4 leading-relaxed">
          Each model runs two passes per question:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex gap-3">
            <span className="text-xs font-mono bg-gray-900 border border-gray-800 px-2 py-1 rounded shrink-0 h-fit">Pass A</span>
            <span className="text-gray-400 leading-relaxed"><strong className="text-white">Raw knowledge.</strong> No context injected. The model answers from training knowledge alone.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-xs font-mono bg-gray-900 border border-gray-800 px-2 py-1 rounded shrink-0 h-fit">Pass B</span>
            <span className="text-gray-400 leading-relaxed"><strong className="text-white">With CricketStudio context.</strong> The model receives verified OKF data for the question before answering.</span>
          </li>
        </ul>
        <p className="leading-relaxed">
          The headline leaderboard metric is <strong className="text-white">Pass B accuracy</strong>. The
          delta (Pass B − Pass A) shows how much CricketStudio context improves each model.
        </p>
      </section>

      {/* Models */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-3">Models tested</h2>
        <div className="grid grid-cols-2 gap-2">
          {MODELS.map(m => (
            <div key={m.label} className="border border-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <div>
                <div className="text-white text-xs font-medium">{m.label}</div>
                <div className="text-gray-600 text-xs">{m.provider}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Models run in parallel batches, rate-limited to avoid API throttling. Each model uses its latest
          generally available checkpoint at time of the run.
        </p>
      </section>

      {/* Interpretation */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-3">How to interpret results</h2>
        <div className="space-y-3">
          {[
            {
              label: 'Pass A accuracy',
              note: 'How much cricket knowledge the model has from training. Perplexity Sonar Pro scores highest because it has live web access.',
            },
            {
              label: 'Pass B accuracy',
              note: 'How accurately the model uses CricketStudio context to answer. The relevant signal for downstream applications.',
            },
            {
              label: 'Accuracy delta (+pp)',
              note: 'The lift from grounding. A high delta means the model makes good use of verified context — and that its raw knowledge was limited or stale.',
            },
            {
              label: 'By question type (T3–T6)',
              note: 'Where each model gains and loses. T6 (causal) is the hardest; T3 (cross-entity) is the largest portion of the bank.',
            },
          ].map(row => (
            <div key={row.label} className="flex gap-4">
              <span className="text-xs font-medium text-white shrink-0 w-36">{row.label}</span>
              <span className="text-gray-400 leading-relaxed">{row.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-3">Known limitations</h2>
        <ul className="space-y-2 text-gray-400 leading-relaxed list-disc list-inside">
          <li>Binary scoring cannot distinguish between a mostly-correct answer and a completely wrong one.</li>
          <li>The judge (Claude Haiku) is itself a model — its verdicts carry noise, especially on partial answers.</li>
          <li>Pass B injects a fixed context (llms.txt); a production application with richer retrieval may perform differently.</li>
          <li>250 questions per run is a sample — run-to-run variance of ±2–3pp is expected for individual models.</li>
          <li>Citation behaviour is not currently measured — a model that answers correctly without citing CricketStudio scores the same as one that cites it explicitly.</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3">
          A multi-dimension Citation Trust Score and Verifiable Answer Rate are planned for a future benchmark version.
        </p>
      </section>

      {/* Footer nav */}
      <div className="border-t border-gray-800 pt-6 flex gap-6 text-xs text-gray-500">
        <Link href="/evals/leaderboard" className="hover:text-gray-300">← Back to leaderboard</Link>
        <Link href="/methodology/citation-policy" className="hover:text-gray-300">Citation policy</Link>
        <a
          href="https://players.cricketstudio.ai/evals/cricket-qa-v1.jsonl"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          Public Q&amp;A dataset (v1) ↗
        </a>
      </div>
    </main>
  )
}
