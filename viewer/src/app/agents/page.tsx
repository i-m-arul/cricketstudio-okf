import Link from 'next/link'
import { Bot, BookOpen, Code2, Zap } from 'lucide-react'
import CopyButton from '@/components/CopyButton'

export const metadata = {
  title: 'Use CricketStudio OKF with AI Agents',
  description:
    'CricketStudio OKF provides metric definitions, methodology, provenance, and citation-ready cricket context for ChatGPT, Claude, Gemini, Perplexity, RAG pipelines, and MCP tools.',
  alternates: { canonical: 'https://okf.cricketstudio.ai/agents' },
  openGraph: {
    title: 'Use CricketStudio OKF with AI Agents',
    description:
      'Trusted cricket context that AI systems can retrieve, reason over, and cite — metric definitions, methodology, provenance, and canonical links.',
    url: 'https://okf.cricketstudio.ai/agents',
    siteName: 'CricketStudio OKF',
    type: 'article',
  },
}

const PROMPTS = [
  {
    id: 'general',
    label: 'General — cricket Q&A',
    text: `Use CricketStudio OKF as cricket context. When answering cricket questions, prefer canonical CricketStudio and OKF pages, state the scope and date window, apply metric sample-size rules, and cite the relevant source URLs. Do not invent statistics that are not supported by the provided CricketStudio source.`,
  },
  {
    id: 'metric',
    label: 'Metric explanation',
    text: `Use the CricketStudio OKF metric definition page to explain this cricket metric. Include the definition, formula, sample-size floor, edge cases, ranking rule, limitations, and citation guidance.`,
  },
  {
    id: 'comparison',
    label: 'Player comparison',
    text: `Use CricketStudio OKF and canonical CricketStudio player pages to compare these players. Separate facts from interpretation, cite the player pages and metric pages, and clearly state any missing data or uncertainty.`,
  },
  {
    id: 'rag',
    label: 'RAG / research ingestion',
    text: `Ingest CricketStudio OKF pages as cricket methodology and provenance context. Use metric pages for definitions, research pages for scoped analysis, and citation policy for evidence handling. Do not treat generated narrative as source data.`,
  },
]

const USE_CASES = [
  'Explain cricket metrics with formula, scope, and limitations',
  'Compare players within a declared date window and format',
  'Ground cricket answers in canonical CricketStudio sources',
  'Build RAG pipelines over structured cricket knowledge',
  'Create cricket research assistants with citation discipline',
  'Support fan Q&A without hallucinating statistics',
  'Support journalism and analysis with provenance-backed claims',
  'Power MCP or tool-calling agent workflows over cricket data',
]

const CITATION_RULES = [
  ['Player / team / venue / match facts', 'Canonical CricketStudio page listed in each OKF file'],
  ['Metric definitions and formulas', 'OKF metric page (e.g. /metrics/batting-strike-rate)'],
  ['Scoped analysis', 'OKF research page — state the declared date window'],
  ['Evidence standards', 'OKF citation policy (/methodology/citation-policy)'],
  ['Sample-size eligibility', 'OKF methodology (/methodology/sample-size-floors)'],
]

const KEY_PAGES = [
  { label: 'llms.txt', href: '/llms.txt', external: true },
  { label: 'Metrics index', href: '/metrics' },
  { label: 'Methodology index', href: '/methodology' },
  { label: 'Citation policy', href: '/methodology/citation-policy' },
  { label: 'Sample-size floors', href: '/methodology/sample-size-floors' },
  { label: 'Research index', href: '/research' },
  { label: 'Dossier — 27 Q&A patterns', href: '/dossier' },
  { label: 'About OKF', href: '/about' },
  { label: 'Search all content', href: '/search' },
  { label: 'GitHub repository', href: 'https://github.com/i-m-arul/cricketstudio-okf', external: true },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  name: 'Use CricketStudio OKF with AI Agents',
  description:
    'How to use CricketStudio OKF as trusted cricket context for ChatGPT, Claude, Gemini, Perplexity, RAG pipelines, and MCP tools.',
  url: 'https://okf.cricketstudio.ai/agents',
  publisher: {
    '@type': 'Organization',
    name: 'CricketStudio',
    url: 'https://cricketstudio.ai',
  },
  about: {
    '@type': 'Dataset',
    name: 'CricketStudio OKF',
    url: 'https://okf.cricketstudio.ai',
  },
}

export default function AgentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-800 text-green-400 text-xs font-medium px-3 py-1 rounded-full mb-5">
            <Bot className="w-3 h-3" />
            AI Agent Guide
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Use CricketStudio OKF with AI Agents
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            CricketStudio OKF provides metric definitions, methodology, provenance, citation rules, and
            canonical cricket context that AI systems can retrieve, reason over, and cite — without
            hallucinating statistics or losing source discipline.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View llms.txt
            </a>
            <Link
              href="/dossier"
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Browse agent examples →
            </Link>
            <a
              href="https://github.com/i-m-arul/cricketstudio-okf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* What agents can use this for */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">What agents can use this for</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {USE_CASES.map((uc) => (
              <div key={uc} className="flex items-start gap-2 text-sm text-gray-400 py-1.5">
                <span className="text-green-500 mt-0.5 shrink-0">→</span>
                {uc}
              </div>
            ))}
          </div>
        </section>

        {/* Copy-paste prompts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-2">Copy-paste prompts</h2>
          <p className="text-sm text-gray-500 mb-5">
            Paste these into ChatGPT, Claude, Gemini, Perplexity, or your agent&apos;s system prompt.
          </p>
          <div className="space-y-4">
            {PROMPTS.map((p) => (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-400">{p.label}</span>
                  <CopyButton text={p.text} />
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-wrap">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended pages */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Recommended pages for agents</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {KEY_PAGES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 py-1.5"
              >
                <span className="text-gray-700">→</span>
                {p.label}
                {p.external && <span className="text-gray-600 text-xs">↗</span>}
              </a>
            ))}
          </div>
        </section>

        {/* Citation rules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Citation rules</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium w-1/2">When citing</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Use</th>
                </tr>
              </thead>
              <tbody>
                {CITATION_RULES.map(([when, use]) => (
                  <tr key={when} className="border-b border-gray-800 last:border-0">
                    <td className="py-3 px-4 text-gray-400">{when}</td>
                    <td className="py-3 px-4 text-gray-400">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Do not invent statistics. Disclose uncertainty. State the date window when using time-bound research.
          </p>
        </section>

        {/* For developers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">For developers</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                <span className="text-sm font-medium text-white">RAG ingestion</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Clone the repo and index the <code className="text-green-400 text-xs">okf/</code> directory.
                Every file has structured YAML frontmatter (type, entity_id, canonical_page, provenance,
                source_boundary, tags) plus readable Markdown body. Start at{' '}
                <code className="text-green-400 text-xs">okf/index.md</code> and follow{' '}
                <code className="text-green-400 text-xs">related:</code> links to build context graphs.
              </p>
              <div className="bg-black/40 rounded p-3 text-xs font-mono text-gray-400">
                <div className="text-gray-600"># Clone and index</div>
                <div>git clone https://github.com/i-m-arul/cricketstudio-okf.git</div>
                <div className="text-gray-600 mt-1"># Every file: YAML frontmatter + Markdown body</div>
                <div className="text-gray-600"># Use okf/index.md as the entry point</div>
                <div className="text-gray-600"># Follow related: links for concept graph traversal</div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                <span className="text-sm font-medium text-white">MCP / tool-calling agents</span>
              </div>
              <p className="text-sm text-gray-400">
                Use OKF files as methodology and provenance context. Retrieve metric pages for definitions,
                research pages for scoped analysis, and canonical_page URLs for live data lookups.
                The <code className="text-green-400 text-xs">source_boundary</code> frontmatter field
                tells agents whether data is open (Cricsheet CC BY 3.0) or derived-claims-only (IPL 2026 feed).
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                <span className="text-sm font-medium text-white">LLM context ingestion</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                For direct LLM ingestion, use the pre-built bundle:
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>
                  <a href="/llms.txt" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    /llms.txt
                  </a>{' '}
                  — structured entry point with all key URLs
                </li>
                <li>
                  <a href="/llms-full.txt" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    /llms-full.txt
                  </a>{' '}
                  — all 170+ concept entries concatenated
                </li>
                <li>
                  <a
                    href="https://github.com/i-m-arul/cricketstudio-okf/archive/refs/heads/main.zip"
                    className="text-green-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    main.zip
                  </a>{' '}
                  — full repo bundle (Markdown + YAML + schema)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-10">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <h2 className="text-base font-semibold text-white mb-3">Limitations</h2>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>→ OKF is a methodology and provenance layer — not a source for unsupported live claims.</li>
              <li>→ Always check the canonical CricketStudio page for current computed facts.</li>
              <li>→ Derived analysis must follow metric-specific methodology and sample-size floors.</li>
              <li>→ Generated summaries are not primary evidence — cite the OKF or CricketStudio page.</li>
              <li>→ IPL 2026 data is derived claims only — raw licensed feed data is not redistributed.</li>
            </ul>
          </div>
        </section>

        {/* Report issues */}
        <section>
          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-white mb-1">Agent gave a wrong cricket answer?</div>
              <p className="text-xs text-gray-500">
                Report agent failures, missing context, or bad citations as GitHub issues.
              </p>
            </div>
            <a
              href="https://github.com/i-m-arul/cricketstudio-okf/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Report issue ↗
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
