import Link from 'next/link'
import SearchClient from './SearchClient'

export const metadata = {
  title: 'Search — CricketStudio OKF',
  description: 'Search cricket metrics, methodology, research, dossiers, players, teams, and venues across the CricketStudio OKF catalog.',
  alternates: { canonical: 'https://okf.cricketstudio.ai/search' },
}

const BROWSE_SECTIONS = [
  { label: 'Metrics', href: '/metrics', desc: '10 definitions — batting SR, economy, death-overs, Orange/Purple Cap' },
  { label: 'Methodology', href: '/methodology', desc: 'Sample-size floors, ranking eligibility, citation policy' },
  { label: 'Research', href: '/research', desc: 'IPL 2026, MLC seasons, toss effects, death overs' },
  { label: 'Dossier', href: '/dossier', desc: '27 verified Q&A patterns for agents and analysts' },
  { label: 'Scorebook', href: '/scorebook', desc: 'Players, teams, leagues, seasons, venues, matches' },
  { label: 'Citation policy', href: '/methodology/citation-policy', desc: 'How to cite CricketStudio OKF correctly' },
  { label: 'Agent guide', href: '/agents', desc: 'Use OKF with ChatGPT, Claude, Gemini, or RAG pipelines' },
]

const AGENT_QUERIES = [
  { label: 'Explain batting strike rate', href: '/metrics/batting-strike-rate' },
  { label: 'Explain bowling economy', href: '/metrics/bowling-economy' },
  { label: 'Find methodology for rankings', href: '/methodology/ranking-eligibility' },
  { label: 'Find sample-size floors', href: '/methodology/sample-size-floors' },
  { label: 'Find citation rules', href: '/methodology/citation-policy' },
  { label: 'Find IPL death-overs research', href: '/research/death-overs-ipl-2026' },
  { label: 'Browse agent Q&A patterns', href: '/dossier' },
  { label: 'Use OKF with an AI agent', href: '/agents' },
]

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Search</h1>
      <p className="text-gray-400 mb-2">
        Search across all concepts, metrics, methodology, and examples.
      </p>

      {/* Interactive search — hydrates on the client */}
      <SearchClient />

      {/* Static fallback for crawlers and agents — always visible in HTML */}
      <div className="mt-12 border-t border-gray-800 pt-10 space-y-10">
        <div>
          <h2 className="text-base font-semibold text-white mb-4">Browse by category</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {BROWSE_SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="bg-gray-900 border border-gray-800 hover:border-green-700 rounded-lg p-3 transition-all group"
              >
                <div className="font-medium text-gray-200 group-hover:text-green-300 text-sm mb-0.5">{s.label}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-4">Common agent queries</h2>
          <ul className="space-y-2">
            {AGENT_QUERIES.map((q) => (
              <li key={q.href}>
                <Link href={q.href} className="text-sm text-green-400 hover:text-green-300 hover:underline">
                  → {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
