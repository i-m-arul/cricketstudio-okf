import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllFiles, getFileBySlug, TYPE_LABELS } from '@/lib/okf'
import OKFFilePageContent, { buildPageMetadata } from '@/components/OKFFilePageContent'
import OKFCard from '@/components/OKFCard'

interface Props {
  params: { slug: string[] }
}

// Next.js pages that have their own dedicated handler — don't let the catch-all
// shadow them with an index-file variant.
const DEDICATED_PAGES = new Set([
  '', 'dossier', 'scorebook', 'metrics', 'research',
  'methodology', 'stories', 'agents', 'about',
  'conformance', 'releases', 'spec', 'search', 'sources',
  'evals',
])

/** Collect every intermediate directory path that has descendant files. */
async function collectDirPaths(): Promise<Set<string>> {
  const files = await getAllFiles()
  const indexSlugs = new Set(
    files.filter(f => f.slug.endsWith('/index')).map(f => f.slug.replace(/\/index$/, ''))
  )
  const dirs = new Set<string>()
  for (const f of files) {
    if (f.slug === 'index' || f.slug.endsWith('/index')) continue
    const parts = f.slug.split('/')
    for (let i = 1; i < parts.length; i++) {
      const dir = parts.slice(0, i).join('/')
      if (!DEDICATED_PAGES.has(dir) && !indexSlugs.has(dir)) {
        dirs.add(dir)
      }
    }
  }
  return dirs
}

export async function generateStaticParams() {
  const files = await getAllFiles()
  const dirPaths = await collectDirPaths()

  const fileParams = files.flatMap((f) => {
    if (f.slug === 'index') return []
    if (f.slug.endsWith('/index')) {
      const parent = f.slug.replace(/\/index$/, '')
      if (DEDICATED_PAGES.has(parent)) return []
      return [{ slug: parent.split('/') }]
    }
    return [{ slug: f.slug.split('/') }]
  })

  const dirParams = Array.from(dirPaths).map((dir) => ({ slug: dir.split('/') }))
  return [...fileParams, ...dirParams]
}

export async function generateMetadata({ params }: Props) {
  const slug = params.slug.join('/')
  const file = await getFileBySlug(slug)
  if (!file) {
    const label = slug.split('/').pop()?.replace(/-/g, ' ') ?? slug
    return { title: label.charAt(0).toUpperCase() + label.slice(1) }
  }
  return buildPageMetadata(file)
}

function resolveRelated(file: Awaited<ReturnType<typeof getFileBySlug>>, allFiles: Awaited<ReturnType<typeof getAllFiles>>) {
  if (!file) return []
  return (file.related || [])
    .map((rel) => {
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
}

/** Minimal breadcrumb nav shared by both the file page and the listing page. */
function BreadcrumbNav({ slug }: { slug: string }) {
  const parts = slug.split('/')
  const crumbs = parts.slice(0, -1).map((part, i) => ({
    label: part.replace(/-/g, ' '),
    href: '/' + parts.slice(0, i + 1).join('/') + '/',
  }))
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap">
      <Link href="/" className="hover:text-gray-300">Home</Link>
      {crumbs.map((c) => (
        <span key={c.href} className="flex items-center gap-1">
          <span>/</span>
          <Link href={c.href} className="hover:text-gray-300 capitalize">{c.label}</Link>
        </span>
      ))}
      <span>/</span>
      <span className="text-gray-300 capitalize">{parts[parts.length - 1].replace(/-/g, ' ')}</span>
    </nav>
  )
}

export default async function OKFFilePage({ params }: Props) {
  const slug = params.slug.join('/')
  const allFiles = await getAllFiles()

  // Try exact file match (getFileBySlug also tries slug + '/index')
  const file = await getFileBySlug(slug)
  if (file) {
    const relatedFiles = resolveRelated(file, allFiles)
    return <OKFFilePageContent file={file} relatedFiles={relatedFiles} />
  }

  // Directory listing fallback — find all direct and nested children
  const prefix = slug + '/'
  const children = allFiles.filter(
    (f) => f.slug.startsWith(prefix) && !f.slug.endsWith('/index')
  )
  if (children.length === 0) notFound()

  const label = slug.split('/').pop()?.replace(/-/g, ' ') ?? slug
  const title = label.charAt(0).toUpperCase() + label.slice(1)

  // Group by type for a nicer layout
  const byType: Record<string, typeof children> = {}
  for (const f of children) {
    byType[f.type] = byType[f.type] ?? []
    byType[f.type].push(f)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <BreadcrumbNav slug={slug} />
      <h1 className="text-3xl font-bold text-white mb-2 capitalize">{title}</h1>
      <p className="text-gray-400 mb-8">{children.length} entries</p>

      {Object.entries(byType).map(([type, items]) => (
        <section key={type} className="mb-10">
          {Object.keys(byType).length > 1 && (
            <h2 className="text-lg font-semibold text-gray-300 mb-3 capitalize flex items-center gap-2">
              {TYPE_LABELS[type] || type}
              <span className="text-xs font-normal text-gray-600">{items.length}</span>
            </h2>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((f) => <OKFCard key={f.slug} {...f} />)}
          </div>
        </section>
      ))}
    </div>
  )
}
