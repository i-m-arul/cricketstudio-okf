import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { getAllFiles, getFileBySlug, TYPE_LABELS, SOURCE_BOUNDARY_LABELS } from '@/lib/okf'
import OKFCard from '@/components/OKFCard'
import ForLLMsAndAgents from '@/components/ForLLMsAndAgents'

const BASE = 'https://okf.cricketstudio.ai'

interface Props {
  params: { slug: string[] }
}

export async function generateStaticParams() {
  const files = await getAllFiles()
  return files.map((f) => ({ slug: f.slug.split('/') }))
}

export async function generateMetadata({ params }: Props) {
  const slug = params.slug.join('/')
  const file = await getFileBySlug(slug)
  if (!file) return {}
  const url = `${BASE}${file.urlPath}`
  return {
    title: file.title,
    description: file.description,
    alternates: { canonical: url },
    openGraph: {
      title: file.title,
      description: file.description,
      url,
      siteName: 'CricketStudio OKF',
      type: 'article',
      ...(file.last_verified ? { modifiedTime: file.last_verified } : {}),
    },
    twitter: {
      card: 'summary',
      title: file.title,
      description: file.description,
      site: '@cricketstudio',
    },
  }
}

function buildJsonLd(file: Awaited<ReturnType<typeof getFileBySlug>>) {
  if (!file) return null
  const url = `${BASE}${file.urlPath}`
  const base = {
    '@context': 'https://schema.org',
    name: file.title,
    description: file.description,
    url,
    ...(file.last_verified ? { dateModified: file.last_verified } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'CricketStudio',
      url: 'https://cricketstudio.ai',
    },
  }

  if (file.type === 'player') {
    return { '@type': 'Person', ...base, ...(file.canonical_page ? { sameAs: [file.canonical_page] } : {}) }
  }
  if (file.type === 'team') {
    return { '@type': 'SportsTeam', sport: 'Cricket', ...base, ...(file.canonical_page ? { sameAs: [file.canonical_page] } : {}) }
  }
  if (file.type === 'league') {
    return { '@type': 'SportsOrganization', sport: 'Cricket', ...base }
  }
  if (file.type === 'match') {
    return { '@type': 'SportsEvent', sport: 'Cricket', ...base }
  }
  if (file.type === 'venue') {
    return { '@type': 'StadiumOrArena', ...base }
  }
  if (file.type === 'metric' || file.type === 'methodology' || file.type === 'research') {
    return { '@type': 'Article', ...base, articleSection: TYPE_LABELS[file.type] ?? file.type }
  }
  return { '@type': 'WebPage', ...base }
}

export default async function OKFFilePage({ params }: Props) {
  const slug = params.slug.join('/')
  const file = await getFileBySlug(slug)
  if (!file) notFound()

  const allFiles = await getAllFiles()

  // Resolve related files
  const relatedFiles = (file.related || [])
    .map((rel) => {
      // rel is a relative path like '../players/virat-kohli.md'
      // compute slug from the file's directory + rel
      const fileDir = file.slug.split('/').slice(0, -1).join('/')
      const parts = (fileDir + '/' + rel).split('/')
      const resolved: string[] = []
      for (const p of parts) {
        if (p === '..') resolved.pop()
        else if (p !== '.') resolved.push(p)
      }
      const relSlug = resolved.join('/').replace(/\.md$/, '')
      return allFiles.find((f) => f.slug === relSlug)
    })
    .filter(Boolean) as typeof allFiles

  const typeLabel = TYPE_LABELS[file.type] || file.type
  const boundary = file.source_boundary ? SOURCE_BOUNDARY_LABELS[file.source_boundary] : null

  // Breadcrumb from slug
  const crumbs = file.slug.split('/')
  const breadcrumbs = crumbs.slice(0, -1).map((part, i) => ({
    label: part.replace(/-/g, ' '),
    href: '/' + crumbs.slice(0, i + 1).join('/'),
  }))

  const jsonLd = buildJsonLd(file)

  return (
    <div className="max-w-5xl mx-auto">
      {jsonLd && (
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      )}
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.href} className="flex items-center gap-1">
            <span>/</span>
            <Link href={crumb.href} className="hover:text-gray-300 capitalize">{crumb.label}</Link>
          </span>
        ))}
        <span>/</span>
        <span className="text-gray-300 truncate">{crumbs[crumbs.length - 1].replace(/-/g, ' ')}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
        {/* Main content */}
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-medium bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                {typeLabel}
              </span>
              {boundary && (
                <span className="text-xs text-gray-500">{boundary.label}</span>
              )}
              {file.last_verified && (
                <span className="text-xs text-gray-600">Verified {file.last_verified}</span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{file.title}</h1>
            <p className="text-gray-400">{file.description}</p>
          </div>

          {/* Canonical link */}
          {file.canonical_page && (
            <div className="mb-6 p-3 bg-green-950/30 border border-green-900 rounded-lg flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-green-600 font-medium mb-0.5">Canonical CricketStudio resource</div>
                <a
                  href={file.canonical_page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm break-all"
                >
                  {file.canonical_page}
                </a>
              </div>
              <a
                href={file.canonical_page}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                View live ↗
              </a>
            </div>
          )}

          {/* Rendered markdown */}
          <article
            className="prose-okf"
            dangerouslySetInnerHTML={{ __html: file.contentHtml }}
          />

          {/* For LLMs and Agents block — shown on methodology, metric, research, dossier pages */}
          {['metric', 'methodology', 'research', 'dossier'].includes(file.type) && (
            <ForLLMsAndAgents type={file.type} urlPath={file.urlPath} />
          )}

          {/* Tags */}
          {file.tags && file.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {file.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="mt-10 lg:mt-0">
          {/* Provenance */}
          {file.provenance && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Provenance</h3>
              <dl className="space-y-2 text-sm">
                {Object.entries(file.provenance).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-gray-500 text-xs">{k}</dt>
                    <dd className="text-gray-300">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Related */}
          {relatedFiles.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Related</h3>
              <div className="space-y-2">
                {relatedFiles.map((rf) => (
                  <OKFCard key={rf.slug} {...rf} />
                ))}
              </div>
            </div>
          )}

          {/* Dataset info */}
          {file.dataset_version && (
            <div className="mt-4 p-3 bg-gray-900 border border-gray-800 rounded-lg text-xs text-gray-500">
              <span className="font-medium text-gray-400">Dataset version:</span> {file.dataset_version}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
