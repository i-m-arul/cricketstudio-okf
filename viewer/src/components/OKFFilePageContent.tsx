import Link from 'next/link'
import Script from 'next/script'
import OKFCard from '@/components/OKFCard'
import ForLLMsAndAgents from '@/components/ForLLMsAndAgents'
import { OKFFile, TYPE_LABELS, SOURCE_BOUNDARY_LABELS } from '@/lib/okf'

const BASE = 'https://okf.cricketstudio.ai'

export function buildJsonLd(file: OKFFile) {
  const url = `${BASE}${file.urlPath}`
  const base = {
    '@context': 'https://schema.org',
    name: file.title,
    description: file.description,
    url,
    ...(file.last_verified ? { dateModified: file.last_verified } : {}),
    publisher: { '@type': 'Organization', name: 'CricketStudio', url: 'https://cricketstudio.ai' },
  }
  if (file.type === 'player') return { '@type': 'Person', ...base, ...(file.canonical_page ? { sameAs: [file.canonical_page] } : {}) }
  if (file.type === 'team') return { '@type': 'SportsTeam', sport: 'Cricket', ...base, ...(file.canonical_page ? { sameAs: [file.canonical_page] } : {}) }
  if (file.type === 'league') return { '@type': 'SportsOrganization', sport: 'Cricket', ...base }
  if (file.type === 'match') return { '@type': 'SportsEvent', sport: 'Cricket', ...base }
  if (file.type === 'venue') return { '@type': 'StadiumOrArena', ...base }
  if (file.type === 'metric' || file.type === 'methodology' || file.type === 'research')
    return { '@type': 'Article', ...base, articleSection: TYPE_LABELS[file.type] ?? file.type }
  return { '@type': 'WebPage', ...base }
}

export function buildPageMetadata(file: OKFFile) {
  const url = `${BASE}${file.urlPath}`
  const ogImage = `${BASE}/og-image.png`
  return {
    title: file.title,
    description: file.description,
    alternates: { canonical: url },
    openGraph: {
      title: file.title,
      description: file.description,
      url,
      siteName: 'CricketStudio OKF',
      type: 'article' as const,
      images: [{ url: ogImage, width: 1200, height: 630, alt: file.title }],
      ...(file.last_verified ? { modifiedTime: file.last_verified } : {}),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: file.title,
      description: file.description,
      site: '@cricketstudio',
      images: [ogImage],
    },
  }
}

interface Props {
  file: OKFFile
  relatedFiles: OKFFile[]
}

export default function OKFFilePageContent({ file, relatedFiles }: Props) {
  const typeLabel = TYPE_LABELS[file.type] || file.type
  const boundary = file.source_boundary ? SOURCE_BOUNDARY_LABELS[file.source_boundary] : null
  const crumbs = file.slug.split('/')
  const breadcrumbs = crumbs.slice(0, -1).map((part, i) => ({
    label: part.replace(/-/g, ' '),
    href: '/' + crumbs.slice(0, i + 1).join('/') + '/',
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
        <div>
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-medium bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                {typeLabel}
              </span>
              {boundary && <span className="text-xs text-gray-500">{boundary.label}</span>}
              {file.last_verified && <span className="text-xs text-gray-600">Verified {file.last_verified}</span>}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{file.title}</h1>
            <p className="text-gray-400">{file.description}</p>
          </div>

          {file.canonical_page && (
            <div className="mb-6 p-3 bg-green-950/30 border border-green-900 rounded-lg flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-green-600 font-medium mb-0.5">Canonical CricketStudio resource</div>
                <a href={file.canonical_page} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 text-sm break-all">
                  {file.canonical_page}
                </a>
              </div>
              <a href={file.canonical_page} target="_blank" rel="noopener noreferrer" className="shrink-0 bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded transition-colors">
                View live ↗
              </a>
            </div>
          )}

          <article className="prose-okf" dangerouslySetInnerHTML={{ __html: file.contentHtml }} />

          {['metric', 'methodology', 'research', 'dossier'].includes(file.type) && (
            <ForLLMsAndAgents type={file.type} urlPath={file.urlPath} />
          )}

          {file.tags && file.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {file.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="mt-10 lg:mt-0">
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

          {relatedFiles.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Related</h3>
              <div className="space-y-2">
                {relatedFiles.map((rf) => <OKFCard key={rf.slug} {...rf} />)}
              </div>
            </div>
          )}

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
