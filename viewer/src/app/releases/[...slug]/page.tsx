import { notFound } from 'next/navigation'
import { getAllFiles, getFileBySlug } from '@/lib/okf'
import OKFFilePageContent, { buildPageMetadata } from '@/components/OKFFilePageContent'

interface Props {
  params: { slug: string[] }
}

export async function generateStaticParams() {
  const files = await getAllFiles()
  return files
    .filter((f) => f.slug.startsWith('releases/') && !f.slug.endsWith('/index'))
    .map((f) => ({ slug: f.slug.replace('releases/', '').split('/') }))
}

export async function generateMetadata({ params }: Props) {
  const slug = 'releases/' + params.slug.join('/')
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

export default async function ReleaseNotePage({ params }: Props) {
  const slug = 'releases/' + params.slug.join('/')
  const file = await getFileBySlug(slug)
  if (!file) notFound()

  const allFiles = await getAllFiles()
  const relatedFiles = resolveRelated(file, allFiles)

  return <OKFFilePageContent file={file} relatedFiles={relatedFiles} />
}
