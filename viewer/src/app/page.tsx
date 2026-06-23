import Link from 'next/link'
import { getAllFiles, getFilesByType } from '@/lib/okf'
import OKFCard from '@/components/OKFCard'
import { Globe, BarChart2, BookOpen, FlaskConical, MessageSquare, Bot, FileText, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'CricketStudio OKF — Open Cricket Knowledge',
  description: 'A curated, open knowledge catalog for cricket. IPL, MLC, metrics, methodology, and dossier — built by CricketStudio.',
}

const SECTIONS = [
  {
    href: '/spec/',
    label: 'Specification',
    Icon: FileText,
    desc: 'Cricket OKF type vocabulary, provenance, metrics, claims, identity, sample-size',
  },
  {
    href: '/scorebook/',
    label: 'Scorebook',
    Icon: Globe,
    desc: 'Players, teams, leagues, seasons, venues, and matches',
  },
  {
    href: '/metrics/',
    label: 'Metrics',
    Icon: BarChart2,
    desc: 'Batting SR, economy, death-overs economy, Orange/Purple Cap',
  },
  {
    href: '/methodology/',
    label: 'Methodology',
    Icon: BookOpen,
    desc: 'Sample-size floors, ranking eligibility, citation policy',
  },
  {
    href: '/research/',
    label: 'Research',
    Icon: FlaskConical,
    desc: 'IPL 2026 season, MLC seasons, toss effects, death overs',
  },
  {
    href: '/dossier/',
    label: 'Dossier',
    Icon: MessageSquare,
    desc: 'Verified Q&A patterns with citations and scope',
  },
  {
    href: '/conformance/',
    label: 'Conformance',
    Icon: ShieldCheck,
    desc: 'Conformance levels 0–4 and self-certification checklist',
  },
  {
    href: '/agents/',
    label: 'AI Agents',
    Icon: Bot,
    desc: 'Use OKF with ChatGPT, Claude, Gemini, or RAG pipelines',
  },
]

export default async function HomePage() {
  const allFiles = await getAllFiles()
  const nonIndex = allFiles.filter((f) => !f.slug.endsWith('/index') && f.slug !== 'index')

  const counts = {
    total: nonIndex.length,
    metrics: nonIndex.filter((f) => f.type === 'metric').length,
    examples: nonIndex.filter((f) => f.type === 'dossier').length,
    research: nonIndex.filter((f) => f.type === 'research').length,
    methodology: nonIndex.filter((f) => f.type === 'methodology').length,
  }

  const featured = await getFilesByType('research')
  const recentResearch = featured.slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'CricketStudio OKF — Open Cricket Knowledge Catalog',
    description:
      'A curated, open knowledge catalog for cricket. 174+ files covering all 10 IPL 2026 franchises, 65 players with phase splits and pillar claims, 11 IPL venues, MLC teams, metric definitions, methodology, and research. Every claim carries provenance, sample size, source boundary, and canonical CricketStudio links.',
    url: 'https://okf.cricketstudio.ai',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    creator: {
      '@type': 'Organization',
      name: 'CricketStudio',
      url: 'https://cricketstudio.ai',
    },
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/zip',
        contentUrl: 'https://github.com/i-m-arul/cricketstudio-okf/archive/refs/heads/main.zip',
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/plain',
        contentUrl: 'https://okf.cricketstudio.ai/llms-full.txt',
        name: 'Full OKF bundle for LLM ingestion',
      },
    ],
    keywords: ['cricket', 'IPL', 'MLC', 'IPL 2026', 'cricket stats', 'cricket metrics', 'open data', 'knowledge graph', 'player profiles', 'cricket OKF'],
    isAccessibleForFree: true,
    inLanguage: 'en',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="pt-10 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-800 text-green-400 text-xs font-medium px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          v0.3 · Open
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Open Knowledge Framework<br />for Cricket Data
        </h1>
        <p className="text-green-400 text-xl font-medium mb-6 tracking-wide">
          Every claim. Every source. Open.
        </p>
        <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
          CricketStudio OKF is a versioned open standard for representing cricket entities,
          metrics, claims, provenance, and methodology — built on{' '}
          <a href="https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md" className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">Google OKF v0.1</a>.
          Portable, citable, and agent-readable.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/scorebook/"
            className="bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            Scorebook
          </Link>
          <Link
            href="/search/"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            Search
          </Link>
          <a
            href="https://github.com/i-m-arul/cricketstudio-okf/archive/refs/heads/main.zip"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            Download Bundle ↓
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
        {[
          { label: 'Total files', value: counts.total, href: '/scorebook/' },
          { label: 'Metrics', value: counts.metrics, href: '/metrics/' },
          { label: 'Methodology', value: counts.methodology, href: '/methodology/' },
          { label: 'Research', value: counts.research, href: '/research/' },
          { label: 'Dossier', value: counts.examples, href: '/dossier/' },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center hover:border-green-700 hover:bg-gray-800/50 transition-all">
            <div className="text-2xl font-bold text-green-400">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </Link>
        ))}
      </section>

      {/* Section grid */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-white mb-4">Browse by category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="bg-gray-900 border border-gray-800 hover:border-green-700 rounded-lg p-5 transition-all group"
            >
              <s.Icon className="w-5 h-5 text-green-500 mb-3" strokeWidth={1.5} />
              <h3 className="font-semibold text-white group-hover:text-green-300 mb-1">{s.label}</h3>
              <p className="text-sm text-gray-400">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest research */}
      {recentResearch.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Latest research</h2>
            <Link href="/research/" className="text-sm text-green-500 hover:text-green-400">
              All reports →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {recentResearch.map((f) => (
              <OKFCard key={f.slug} {...f} />
            ))}
          </div>
        </section>
      )}

      {/* About strip */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
        <h2 className="font-semibold text-white mb-2">What is CricketStudio OKF?</h2>
        <p className="text-gray-400 text-sm mb-4">
          CricketStudio OKF is the Open Knowledge Framework for Cricket Data — a versioned standard
          and reference bundle for representing cricket knowledge with formulas, scope, provenance,
          and canonical links. Built on Google OKF v0.1. Every file is readable by humans and
          parseable by tools. No invented facts, no raw data dumps.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/about/" className="text-sm text-green-400 hover:underline">Full story →</Link>
          <Link href="/methodology/citation-policy/" className="text-sm text-green-400 hover:underline">Citation policy →</Link>
          <a href="https://github.com/i-m-arul/cricketstudio-okf" target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:underline">GitHub →</a>
          <a href="https://github.com/i-m-arul/cricketstudio-okf/archive/refs/heads/main.zip" className="text-sm text-green-400 hover:underline">Download bundle ↓</a>
        </div>
      </section>
    </>
  )
}
