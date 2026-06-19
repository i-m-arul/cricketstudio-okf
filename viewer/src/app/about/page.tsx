import Link from 'next/link'
import { BarChart2, BookOpen, Globe, ShieldCheck, GitBranch } from 'lucide-react'

export const metadata = {
  alternates: { canonical: '/about' },
  title: 'About',
  description: 'What CricketStudio OKF is, why it exists, and how to use it.',
}

const PRINCIPLES = [
  {
    Icon: ShieldCheck,
    title: 'Trust before coverage',
    desc: 'A smaller trusted bundle beats a larger noisy one. Every claim in this catalog traces to a source.',
  },
  {
    Icon: BarChart2,
    title: 'Metric definitions matter',
    desc: 'Formula, scope, eligibility rules, sample-size floors, and limitations — all spelled out, not assumed.',
  },
  {
    Icon: BookOpen,
    title: 'Date window always stated',
    desc: 'Cricket claims must state league, season, format, or date range. "Best ever" without context is noise.',
  },
  {
    Icon: Globe,
    title: 'Canonical links over copies',
    desc: 'Every concept points to the live CricketStudio page. The OKF defines and contextualises; the canonical page holds current computed data.',
  },
  {
    Icon: GitBranch,
    title: 'Open and reviewable',
    desc: 'All changes go through Git. Schema, methodology, and content are diffable, forkable, and citable.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">About CricketStudio OKF</h1>
      <p className="text-gray-400 mb-10">
        A curated, open knowledge catalog for cricket — built by{' '}
        <a href="https://cricketstudio.ai" className="text-green-400 hover:underline">CricketStudio</a>.
      </p>

      {/* What */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">What is OKF?</h2>
        <div className="text-gray-400 space-y-3 text-sm leading-relaxed">
          <p>
            OKF stands for <strong className="text-gray-200">Open Knowledge Format</strong> — a structured bundle of
            Markdown files with YAML frontmatter that describes cricket entities: players, teams, leagues, seasons,
            venues, and matches, alongside the metrics and methodology needed to understand them correctly.
          </p>
          <p>
            Each file is plain text. It reads cleanly as a web page, embeds neatly into a developer pipeline, and
            parses reliably as structured data. Every file declares its type, provenance, source boundary, and a
            canonical link back to CricketStudio's live data.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">How is this different from CricketStudio.ai?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium w-1/3"></th>
                <th className="text-left py-2 pr-4 text-green-400 font-semibold">CricketStudio.ai</th>
                <th className="text-left py-2 text-green-400 font-semibold">OKF</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {[
                ['What it is', 'Live stats, player profiles, match data', 'Open methodology, metric definitions, provenance'],
                ['Updates', 'Every match, real-time', 'Versioned releases'],
                ['Format', 'Web app', 'Markdown + YAML — readable by humans and machines'],
                ['Use when', 'You want the answer', 'You want to understand, cite, or build on the answer'],
                ['Audience', 'Fans, fantasy players, analysts', 'Developers, journalists, data tools'],
              ].map(([label, a, b]) => (
                <tr key={label} className="border-b border-gray-800">
                  <td className="py-3 pr-4 text-gray-500 font-medium">{label}</td>
                  <td className="py-3 pr-4">{a}</td>
                  <td className="py-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-xs mt-3">
          Every OKF file links back to its canonical CricketStudio resource for current computed data.
          The two surfaces are complementary, not competing.
        </p>
      </section>

      {/* Why */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">Why does it exist?</h2>
        <div className="text-gray-400 space-y-3 text-sm leading-relaxed">
          <p>
            Cricket statistics are frequently misquoted, stripped of context, or compared across incompatible
            scopes. A strike rate cited without a sample-size floor, a "best bowler" ranking without eligibility
            rules, a career average that conflates formats — these are the common failures.
          </p>
          <p>
            CricketStudio OKF exists to set the standard for how cricket knowledge should be cited, scoped, and
            attributed. By publishing metric definitions, sample-size rules, and methodology openly, we make it
            easier for analysts, journalists, developers, and tools to get cricket right.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Core principles</h2>
        <div className="space-y-4">
          {PRINCIPLES.map(({ Icon, title, desc }) => (
            <div key={title} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-lg p-4">
              <Icon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <div className="font-medium text-white mb-0.5">{title}</div>
                <div className="text-sm text-gray-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's in it */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">What's in the bundle</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { label: 'Scorebook', desc: 'Players, teams, leagues, seasons, venues, matches' },
            { label: 'Metrics', desc: '10 definitions — batting SR, economy, death-overs, Orange/Purple Cap' },
            { label: 'Methodology', desc: 'Sample-size floors, ranking eligibility, citation policy' },
            { label: 'Research', desc: '7 reports — IPL 2026, MLC seasons, toss effects, death overs' },
            { label: 'Dossier', desc: '22 verified Q&A patterns showing correct citation and scope' },
            { label: 'Sources', desc: 'Data provenance and license boundaries for every source used' },
          ].map((item) => (
            <div key={item.label} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <div className="font-medium text-gray-200 mb-0.5">{item.label}</div>
              <div className="text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Licensing */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">Licensing</h2>
        <div className="text-gray-400 text-sm space-y-2">
          <p>
            Documentation, metrics, and methodology files: <strong className="text-gray-200">CC-BY-4.0</strong> — free
            to use, share, and adapt with attribution.
          </p>
          <p>
            IPL historical and MLC data is sourced from{' '}
            <a href="https://cricsheet.org" className="text-green-400 hover:underline">Cricsheet</a> under{' '}
            <strong className="text-gray-200">CC BY 3.0</strong>. See{' '}
            <Link href="/sources/cricsheet" className="text-green-400 hover:underline">attribution</Link>.
          </p>
          <p>
            IPL 2026 content is based on CricketStudio derived claims. Raw licensed feed data is not redistributed.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="font-semibold text-white mb-2">Get started</h2>
        <div className="flex flex-wrap gap-3 mt-3">
          <Link href="/scorebook" className="text-sm bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Browse Scorebook
          </Link>
          <Link href="/metrics" className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-colors">
            Read metrics
          </Link>
          <a
            href="https://github.com/i-m-arul/cricketstudio-okf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://cricketstudio.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-400 hover:underline self-center"
          >
            CricketStudio.ai ↗
          </a>
        </div>
      </section>
    </div>
  )
}
