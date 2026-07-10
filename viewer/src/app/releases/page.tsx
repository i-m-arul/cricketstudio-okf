import Link from 'next/link'
import { Tag } from 'lucide-react'

export const metadata = {
  title: 'Cricket OKF Releases — CricketStudio OKF',
  description: 'Version history for CricketStudio OKF. v0.5 — Trust OS v1, Level 3 Agent-Safe; v0.3 — Cricket OKF Standards layer; v0.2 — MLC enrichment; v0.1 — initial bundle.',
}

const releases = [
  {
    version: 'v0.5',
    date: '2026-07-08',
    slug: 'releases/v0.5',
    title: 'Trust OS v1 — Agent-Safe',
    status: 'current',
    conformance: 'Level 3 — Agent-Safe',
    summary: 'Adds Trust OS v1: machine-readable claim ledger, JSON Schema, 1,000-row eval benchmark, and trust manifest. Self-certified Level 3 (Agent-Safe) 2026-07-08. 2,200+ files total.',
    highlights: [
      '/claims.jsonl — machine-readable claim ledger (Trust OS v1)',
      'schema/claim-object.schema.json — JSON Schema for claim objects',
      '/evals/cricket-qa-v1.jsonl — 1,000-row eval benchmark',
      '/trust-manifest.json — machine-readable trust declaration',
      '6 adversarially verified dossier files (3-vote majority per claim)',
      '4 advanced metric files: xR, xW, win-probability, fantasy-cricket-SR',
      'Per-page OG images (135 unique), FAQPage/BreadcrumbList/Article JSON-LD',
      '.well-known/ai-plugin.json — OpenAI plugin manifest for agent discovery',
    ],
  },
  {
    version: 'v0.3',
    date: '2026-06-22',
    slug: 'releases/v0.3',
    title: 'Cricket OKF Standards Layer',
    status: 'previous',
    conformance: 'Level 2 — Evidence-Backed',
    summary: 'Adds the formal Cricket OKF specification (/spec), conformance levels, releases, Google OKF alignment, and a standalone contribution bundle for GoogleCloudPlatform/knowledge-catalog.',
    highlights: [
      'okf/spec/ — 8 specification files (types, provenance, metrics, claims, identity, sample-size, conformance)',
      'okf/releases/ — versioned release notes (v0.1, v0.2, v0.3)',
      'okf/sources/google-okf-alignment.md — field-level alignment with Google OKF v0.1',
      'examples/cricket/ — 13-file standalone contribution bundle',
      '/conformance and /releases viewer pages',
      'Added "spec" type to frontmatter schema',
      'Soft warnings for missing Google OKF recommended fields (resource, timestamp)',
    ],
  },
  {
    version: 'v0.2',
    date: '2026-06-21',
    slug: 'releases/v0.2',
    title: 'MLC Enrichment',
    status: 'previous',
    conformance: 'Level 2 — Evidence-Backed',
    summary: 'Adds full Major League Cricket knowledge: 166 player profiles, 47 leaderboards, 5 venues, 6 enriched teams, and 10 dossier entries. Fixes dossier heading display and validator.',
    highlights: [
      '166 MLC player profiles with career batting/bowling + phase splits',
      '47 MLC leaderboard files (batting, bowling, phase, appearances)',
      '5 MLC venue files with match-data stats',
      '6 enriched MLC team files with season-by-season and H2H records',
      '10 MLC dossier Q&A patterns',
      'Fixed dossier # Example — heading display',
      'Added leaderboard type to schema',
    ],
  },
  {
    version: 'v0.1',
    date: '2026-06-18',
    slug: 'releases/v0.1',
    title: 'Initial Release',
    status: 'previous',
    conformance: 'Level 1 — Citable',
    summary: 'First public release. Curated IPL knowledge bundle with player profiles, team files, venues, metrics, methodology, sources, research reports, and dossier patterns.',
    highlights: [
      '65 IPL player profiles with phase splits and pillar claims',
      '10 IPL 2026 team files with H2H and season records',
      '13 IPL venue files',
      '10 metric definitions',
      '6 methodology files',
      '27 dossier Q&A patterns',
      'Validator pipeline and CI (validate_okf.py, pytest, GitHub Actions)',
    ],
  },
]

const statusColors: Record<string, string> = {
  current: 'bg-green-900 text-green-300 border-green-700',
  previous: 'bg-gray-800 text-gray-400 border-gray-700',
}

export default function ReleasesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <span>/</span>
          <span className="text-gray-300">Releases</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">CricketStudio OKF Releases</h1>
        <p className="text-gray-400 text-base leading-relaxed">
          Versioned release history for the CricketStudio OKF bundle and Cricket OKF specification.
          Each release includes a conformance level declaration.
        </p>
      </div>

      {/* Roadmap note */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-8 text-sm text-gray-400">
        <strong className="text-gray-200">Roadmap:</strong>{' '}
        v1.0 — Auditable standard with versioned schema, automated conformance reports, and certified eval results (Level 4 target)
      </div>

      {/* Releases */}
      <div className="space-y-6 mb-10">
        {releases.map((r) => (
          <div
            key={r.version}
            className={`border rounded-xl p-6 ${
              r.status === 'current'
                ? 'border-green-700 bg-green-900/10'
                : 'border-gray-800 bg-gray-900'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <Tag className={`w-5 h-5 ${r.status === 'current' ? 'text-green-400' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-mono border px-2 py-0.5 rounded-full ${statusColors[r.status]}`}>
                    {r.version}
                  </span>
                  {r.status === 'current' && (
                    <span className="text-xs bg-green-900 text-green-300 border border-green-700 px-2 py-0.5 rounded-full">
                      current
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{r.date}</span>
                  <span className="text-xs text-gray-500">· {r.conformance}</span>
                </div>

                <h2 className={`text-lg font-semibold mb-2 ${r.status === 'current' ? 'text-white' : 'text-gray-200'}`}>
                  {r.title}
                </h2>

                <p className="text-sm text-gray-400 mb-4">{r.summary}</p>

                <ul className="space-y-1 mb-4">
                  {r.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-gray-600 flex-shrink-0">·</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/${r.slug}/`}
                  className="text-sm text-green-400 hover:text-green-300 hover:underline"
                >
                  Full release notes →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        <p className="mb-2">
          All releases follow <Link href="/spec/conformance/" className="text-green-400 hover:underline">Cricket OKF conformance levels</Link>.
          Versioning uses semantic versioning (major.minor.patch).
        </p>
        <p>
          <a href="https://github.com/i-m-arul/cricketstudio-okf/blob/main/CHANGELOG.md" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">
            Full CHANGELOG on GitHub →
          </a>
        </p>
      </div>
    </div>
  )
}
