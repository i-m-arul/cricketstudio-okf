import Link from 'next/link'
import { getFilesByType } from '@/lib/okf'

export const metadata = {
  alternates: { canonical: 'https://okf.cricketstudio.ai/spec/' },
  title: 'Cricket OKF Specification',
  description: 'The Cricket OKF domain profile — type vocabulary, provenance convention, metric standard, claim discipline, identity rules, sample-size doctrine, and conformance levels.',
}

const SPEC_PAGES = [
  { slug: 'spec/types', label: 'Type vocabulary', desc: '19 cricket type values — player, team, venue, metric, dossier, leaderboard, spec, and more' },
  { slug: 'spec/provenance', label: 'Provenance convention', desc: 'source_boundary enum, confidence, last_verified, dataset_version — what every citable file must carry' },
  { slug: 'spec/metrics', label: 'Metric standard', desc: '10 required sections for every metric file: formula, floor, edge cases, limitations, citation guidance' },
  { slug: 'spec/claims', label: 'Claim discipline', desc: 'What makes a verifiable cricket assertion — scope, sample size, claim types, non-negotiables' },
  { slug: 'spec/identity', label: 'Identity rules', desc: 'Slug conventions, aliases, same_as external IDs, same-name player disambiguation' },
  { slug: 'spec/sample-size', label: 'Sample-size doctrine', desc: 'Floors — ≥30 balls batting, ≥15 bowling, ≥60 phase, ≥5 H2H, ≥3 venue — and sub-floor disclosure' },
  { slug: 'spec/conformance', label: 'Conformance levels', desc: 'Level 0 (Cataloged) through Level 4 (Auditable) — self-certification rules and checklist' },
]

export default async function SpecPage() {
  const specFiles = await getFilesByType('spec')

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Cricket OKF Specification</h1>
      <p className="text-gray-400 mb-2">
        The Cricket OKF domain profile — built on{' '}
        <a
          href="https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md"
          className="text-green-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google OKF v0.1
        </a>
        .
      </p>
      <p className="text-gray-500 text-sm mb-8">
        These documents define the type vocabulary, provenance convention, metric standard, claim
        discipline, identity rules, sample-size doctrine, and conformance levels for cricket knowledge
        published in OKF format. The{' '}
        <a href="https://github.com/i-m-arul/cricketstudio-okf" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">
          cricketstudio-okf
        </a>{' '}
        bundle is the reference implementation — self-certified{' '}
        <Link href="/conformance/" className="text-green-400 hover:underline">Level 3 (Agent-Safe)</Link>.
      </p>

      {/* Layer diagram */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8 text-sm">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">How the layers relate</h2>
        <div className="space-y-2">
          {[
            { label: 'Google OKF v0.1', sub: 'Base format — type, title, description, resource, tags, timestamp', color: 'border-blue-800 bg-blue-950/20' },
            { label: 'Cricket OKF profile', sub: 'This spec — cricket types, provenance, metrics, claims, identity, sample-size', color: 'border-green-800 bg-green-950/20' },
            { label: 'cricketstudio-okf bundle', sub: 'Reference implementation — 2,500+ files, CI-validated, Level 3 (Agent-Safe)', color: 'border-green-700 bg-green-900/20' },
            { label: 'CricketStudio.ai', sub: 'Independent product — links to and cites OKF; not an OKF implementation', color: 'border-gray-700 bg-gray-800/20' },
          ].map((row) => (
            <div key={row.label} className={`border rounded-lg px-4 py-2.5 ${row.color}`}>
              <div className="font-medium text-gray-200 text-sm">{row.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{row.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spec pages */}
      <h2 className="text-base font-semibold text-white mb-3">Specification documents</h2>
      <div className="space-y-2 mb-10">
        {SPEC_PAGES.map((s) => (
          <Link
            key={s.slug}
            href={`/${s.slug}/`}
            className="flex items-start gap-4 bg-gray-900 border border-gray-800 hover:border-green-700 rounded-lg p-4 transition-all group"
          >
            <div>
              <div className="font-medium text-gray-200 group-hover:text-green-300 mb-0.5">{s.label}</div>
              <div className="text-sm text-gray-500">{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/conformance/" className="text-green-400 hover:underline">Conformance page →</Link>
        <Link href="/releases/" className="text-green-400 hover:underline">Release notes →</Link>
        <a href="https://github.com/i-m-arul/cricketstudio-okf/tree/main/okf/spec" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Source on GitHub ↗</a>
        <a href="https://github.com/GoogleCloudPlatform/knowledge-catalog" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Google OKF upstream ↗</a>
      </div>
    </div>
  )
}
