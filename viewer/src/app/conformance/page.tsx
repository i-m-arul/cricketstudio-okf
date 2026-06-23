import Link from 'next/link'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

export const metadata = {
  title: 'Cricket OKF Conformance Levels — CricketStudio OKF',
  description: 'Five conformance levels (0–4) for cricket OKF bundles. What each level requires, how to self-certify, and the CricketStudio OKF reference bundle self-certification at Level 2 — Evidence-Backed.',
}

const levels = [
  {
    level: 0,
    name: 'Cataloged',
    description: 'Cricket data in OKF markdown files with type, title, and description. No provenance, metric definitions, or citation rules.',
    requirements: [
      'Every .md file has valid YAML frontmatter',
      'Every file has a non-empty type field (cricket OKF vocabulary)',
      'Every file has title and description',
    ],
    status: 'achieved',
  },
  {
    level: 1,
    name: 'Citable',
    description: 'Every file has a canonical URL and declared source boundary. Claims can be independently cited.',
    requirements: [
      'Every data-bearing file has canonical_page or resource (citable URL)',
      'Every file declares source_boundary',
      'Every file declares license',
      'Every file declares source_system',
    ],
    status: 'achieved',
  },
  {
    level: 2,
    name: 'Evidence-Backed',
    description: 'Every data-bearing claim has traceable evidence, freshness date, metric definitions, and sample-size rules.',
    requirements: [
      'Every data-bearing file has provenance.source and provenance.confidence',
      'Every file has last_verified (ISO date)',
      'Metric files exist for every cited metric',
      'Each metric file has: formula, floor, limitations, ranking rule',
      'Methodology files exist for: sample-size floors, phase definitions, ranking eligibility',
      'Ranking files declare floor and scope',
    ],
    status: 'achieved',
    selfCert: true,
  },
  {
    level: 3,
    name: 'Agent-Safe',
    description: 'Machine-readable claim objects with structured evidence, eval cases, and agent usage rules.',
    requirements: [
      'Machine-readable claim objects (claim_id, entity_refs, metric_refs, evidence_refs, scope, sample_size, confidence)',
      'JSON Schema for claim objects published',
      'Evaluation cases published at /evals',
      'Agent usage spec with machine-parseable rules',
    ],
    status: 'roadmap',
    roadmapVersion: 'v0.4',
  },
  {
    level: 4,
    name: 'Auditable',
    description: 'Versioned releases with regression tests, published conformance reports, and external implementations.',
    requirements: [
      'Versioned schema releases with breaking-change documentation',
      'Published conformance reports per release',
      'Automated regression test suite',
      'Eval results published per release',
      'External implementation or community validation',
    ],
    status: 'roadmap',
    roadmapVersion: 'v1.0',
  },
]

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'achieved') return <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
  return <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
}

export default function ConformancePage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-green-400">Home</Link>
          <span>/</span>
          <Link href="/spec/" className="hover:text-green-400">Spec</Link>
          <span>/</span>
          <span className="text-gray-300">Conformance</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Cricket OKF Conformance Levels</h1>
        <p className="text-gray-400 text-base leading-relaxed">
          Five levels (0–4) for cricket OKF bundles. Each level includes all requirements of levels below it.
          Self-certification is honest — a bundle claims only the level it can demonstrate.
        </p>
      </div>

      {/* Self-certification banner */}
      <div className="bg-green-900/20 border border-green-700 rounded-xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-green-300 mb-1">CricketStudio OKF self-certification</h2>
            <p className="text-green-200/80 text-sm">
              The <span className="font-mono text-green-300">cricketstudio-okf</span> reference bundle
              is self-certified at <strong className="text-green-300">Level 2 — Evidence-Backed</strong> (June 2026).
              CI-validated on every PR via <span className="font-mono text-xs">python scripts/validate_okf.py &amp;&amp; pytest</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-5 mb-12">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className={`border rounded-xl p-6 ${
              lvl.selfCert
                ? 'border-green-700 bg-green-900/10'
                : lvl.status === 'achieved'
                ? 'border-gray-700 bg-gray-900'
                : 'border-gray-800 bg-gray-900/50 opacity-75'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <StatusIcon status={lvl.status} />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-gray-500">Level {lvl.level}</span>
                  <h3 className={`font-semibold ${lvl.status === 'achieved' ? 'text-white' : 'text-gray-400'}`}>
                    {lvl.name}
                  </h3>
                  {lvl.selfCert && (
                    <span className="text-xs bg-green-900 text-green-300 border border-green-700 px-2 py-0.5 rounded-full">
                      ✓ self-certified
                    </span>
                  )}
                  {lvl.roadmapVersion && (
                    <span className="text-xs bg-gray-800 text-gray-400 border border-gray-700 px-2 py-0.5 rounded-full">
                      roadmap {lvl.roadmapVersion}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">{lvl.description}</p>
                <ul className="space-y-1">
                  {lvl.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {lvl.status === 'achieved' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={lvl.status === 'achieved' ? 'text-gray-300' : 'text-gray-500'}>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation guide */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-white mb-3">How another provider uses this</h2>
        <p className="text-gray-400 text-sm mb-4">
          Any cricket data provider can implement the cricket OKF profile — no license fee,
          no registration, no approval required.
        </p>
        <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
          <li>Use <a href="https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Google OKF v0.1</a> as the base format</li>
          <li>Follow the <Link href="/spec/types/" className="text-green-400 hover:underline">cricket type vocabulary</Link></li>
          <li>Declare provenance per the <Link href="/spec/provenance/" className="text-green-400 hover:underline">provenance convention</Link></li>
          <li>Write metric files per the <Link href="/spec/metrics/" className="text-green-400 hover:underline">metric standard</Link></li>
          <li>Apply floors from the <Link href="/spec/sample-size/" className="text-green-400 hover:underline">sample-size doctrine</Link></li>
          <li>Self-certify at the level you achieve using the checklist above</li>
        </ol>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/spec/" className="text-green-400 hover:text-green-300 hover:underline">← Spec index</Link>
        <Link href="/spec/conformance/" className="text-gray-400 hover:text-gray-300 hover:underline">Full conformance spec →</Link>
        <Link href="/releases/" className="text-gray-400 hover:text-gray-300 hover:underline">Releases →</Link>
      </div>
    </div>
  )
}
