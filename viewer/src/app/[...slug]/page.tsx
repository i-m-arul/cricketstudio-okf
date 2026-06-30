import { notFound } from 'next/navigation'
import { getAllFiles, getFileBySlug } from '@/lib/okf'
import OKFFilePageContent, { buildPageMetadata } from '@/components/OKFFilePageContent'

interface Props {
  params: { slug: string[] }
}

// Next.js pages that have their own dedicated handler — don't let the catch-all
// shadow them with an index-file variant.
const DEDICATED_PAGES = new Set([
  '', 'dossier', 'scorebook', 'metrics', 'research',
  'methodology', 'stories', 'agents', 'about',
  'conformance', 'releases', 'spec', 'search', 'sources',
])

export async function generateStaticParams() {
  const files = await getAllFiles()
  return files.flatMap((f) => {
    // Root index (okf/index.md) → homepage handles it
    if (f.slug === 'index') return []
    // Sub-directory index files: serve at canonical parent URL, not at /parent/index/
    if (f.slug.endsWith('/index')) {
      const parent = f.slug.replace(/\/index$/, '')
      if (DEDICATED_PAGES.has(parent)) return []
      return [{ slug: parent.split('/') }]
    }
    return [{ slug: f.slug.split('/') }]
  })
}

export async function generateMetadata({ params }: Props) {
  const slug = params.slug.join('/')
  const file = await getFileBySlug(slug)
  if (!file) return {}
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

export default async function OKFFilePage({ params }: Props) {
  const slug = params.slug.join('/')
  const file = await getFileBySlug(slug)
  if (!file) notFound()

  const allFiles = await getAllFiles()
  const relatedFiles = resolveRelated(file, allFiles)

  return <OKFFilePageContent file={file} relatedFiles={relatedFiles} />
}
