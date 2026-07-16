import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { lookupUsc } from './usc-registry'

const OKF_ROOT = path.join(process.cwd(), '..', 'okf')

// Paths excluded from the public viewer (match gitignored OKF content)
const EXCLUDED_SLUGS = new Set([
  'runbooks',
  'methodology/data-refresh-policy',
  'methodology/correction-policy',
  'sources/licensed-feed-boundaries',
])

function isExcluded(slug: string): boolean {
  if (EXCLUDED_SLUGS.has(slug)) return true
  if (slug.startsWith('runbooks/')) return true
  return false
}

export interface OKFFile {
  slug: string
  urlPath: string
  filePath: string
  type: string
  title: string
  description: string
  status?: string
  canonical_page?: string
  usc?: string
  claimUrl?: string
  resource?: string
  entity_id?: string
  tags?: string[]
  related?: string[]
  source_boundary?: string
  confidence?: string
  last_verified?: string
  dataset_version?: string
  provenance?: Record<string, string>
  nationality?: string
  role?: string
  same_as?: Record<string, string>
  contentHtml: string
}

export interface SearchEntry {
  slug: string
  urlPath: string
  type: string
  title: string
  description: string
  tags: string[]
}

function slugFromPath(filePath: string): string {
  const rel = path.relative(OKF_ROOT, filePath)
  return rel.replace(/\\/g, '/').replace(/\.md$/, '')
}

function urlFromSlug(slug: string, type: string): string {
  // index files → parent directory
  if (slug.endsWith('/index') || slug === 'index') {
    const base = slug.replace(/\/index$/, '').replace(/^index$/, '')
    return base ? '/' + base + '/' : '/'
  }
  return '/' + slug + '/'
}

function safeStr(val: unknown): string | undefined {
  if (val == null) return undefined
  if (val instanceof Date) return val.toISOString().slice(0, 10)
  return String(val)
}

// Rewrite relative .md links → clean viewer URLs at the current slug's level.
// e.g. from slug 'scorebook/records/ipl-most-runs':
//   ./ipl-most-wickets.md  → /scorebook/records/ipl-most-wickets
//   ../players/virat-kohli.md → /scorebook/players/virat-kohli
//   ../../metrics/batting-strike-rate.md → /metrics/batting-strike-rate
function rewriteLinks(html: string, slug: string): string {
  const dir = slug.split('/').slice(0, -1) // directory segments of current file
  return html.replace(/href="([^"]+)"/g, (match, href: string) => {
    // Skip absolute URLs and anchor-only links
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('/')) return match
    // Resolve relative path against current file's directory
    const parts = [...dir, ...href.split('/')]
    const resolved: string[] = []
    for (const p of parts) {
      if (p === '..') resolved.pop()
      else if (p !== '.') resolved.push(p)
    }
    // Strip .md and trailing /index
    let clean = resolved.join('/').replace(/\.md$/, '')
    if (clean.endsWith('/index')) clean = clean.slice(0, -6)
    return `href="/${clean}/"`
  })
}

async function mdToHtml(markdown: string, slug: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown)
  return rewriteLinks(result.toString(), slug)
}

function collectMdFiles(dir: string): string[] {
  const results: string[] = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...collectMdFiles(full))
    else if (entry.name.endsWith('.md')) results.push(full)
  }
  return results
}

let _cache: OKFFile[] | null = null

export async function getAllFiles(): Promise<OKFFile[]> {
  if (_cache) return _cache
  const allPaths = collectMdFiles(OKF_ROOT)
  const filePaths = allPaths.filter((fp) => {
    const slug = path.relative(OKF_ROOT, fp).replace(/\\/g, '/').replace(/\.md$/, '')
    return !isExcluded(slug)
  })
  const files = await Promise.all(
    filePaths.map(async (fp) => {
      const raw = fs.readFileSync(fp, 'utf-8')
      const { data, content } = matter(raw)
      const slug = slugFromPath(fp)
      const contentHtml = await mdToHtml(content, slug)
      return {
        slug,
        urlPath: urlFromSlug(slug, data.type || 'unknown'),
        filePath: fp,
        type: data.type || 'unknown',
        title: data.title || slug,
        description: data.description || '',
        status: safeStr(data.status),
        canonical_page: safeStr(data.canonical_page),
        ...(() => { const u = lookupUsc(safeStr(data.canonical_page)); return u ? u : {} })(),
        resource: safeStr(data.resource),
        entity_id: safeStr(data.entity_id),
        tags: (data.tags || []).map(safeStr).filter(Boolean) as string[],
        related: (data.related || []).map(safeStr).filter(Boolean) as string[],
        source_boundary: safeStr(data.source_boundary),
        confidence: safeStr(data.provenance?.confidence),
        last_verified: safeStr(data.last_verified),
        dataset_version: safeStr(data.dataset_version),
        provenance: data.provenance
          ? Object.fromEntries(Object.entries(data.provenance).map(([k, v]) => [k, safeStr(v) ?? '']))
          : undefined,
        nationality: safeStr(data.nationality),
        role: safeStr(data.role),
        same_as: data.same_as && typeof data.same_as === 'object'
          ? Object.fromEntries(Object.entries(data.same_as).map(([k, v]) => [k, safeStr(v) ?? '']))
          : undefined,
        contentHtml,
      } as OKFFile
    })
  )
  _cache = files
  return files
}

export async function getFilesByType(type: string): Promise<OKFFile[]> {
  const all = await getAllFiles()
  return all.filter((f) => f.type === type && !f.slug.endsWith('/index') && f.slug !== 'index')
}

export async function getFileBySlug(slug: string): Promise<OKFFile | null> {
  const all = await getAllFiles()
  return all.find((f) => f.slug === slug || f.slug === slug + '/index') ?? null
}

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const all = await getAllFiles()
  return all
    .filter((f) => !f.slug.endsWith('/index') && f.slug !== 'index')
    .map((f) => ({
      slug: f.slug,
      urlPath: f.urlPath,
      type: f.type,
      title: f.title,
      description: f.description,
      tags: f.tags || [],
    }))
}

export { TYPE_LABELS, SOURCE_BOUNDARY_LABELS } from './constants'
