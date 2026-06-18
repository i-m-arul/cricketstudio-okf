import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

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
  resource?: string
  entity_id?: string
  tags?: string[]
  related?: string[]
  source_boundary?: string
  last_verified?: string
  dataset_version?: string
  provenance?: Record<string, string>
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
  // index files → parent
  if (slug.endsWith('/index') || slug === 'index') {
    return '/' + slug.replace(/\/index$/, '').replace(/^index$/, '')
  }
  return '/' + slug
}

function safeStr(val: unknown): string | undefined {
  if (val == null) return undefined
  if (val instanceof Date) return val.toISOString().slice(0, 10)
  return String(val)
}

async function mdToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown)
  return result.toString()
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
      const contentHtml = await mdToHtml(content)
      return {
        slug,
        urlPath: urlFromSlug(slug, data.type || 'unknown'),
        filePath: fp,
        type: data.type || 'unknown',
        title: data.title || slug,
        description: data.description || '',
        status: safeStr(data.status),
        canonical_page: safeStr(data.canonical_page),
        resource: safeStr(data.resource),
        entity_id: safeStr(data.entity_id),
        tags: (data.tags || []).map(safeStr).filter(Boolean) as string[],
        related: (data.related || []).map(safeStr).filter(Boolean) as string[],
        source_boundary: safeStr(data.source_boundary),
        last_verified: safeStr(data.last_verified),
        dataset_version: safeStr(data.dataset_version),
        provenance: data.provenance
          ? Object.fromEntries(Object.entries(data.provenance).map(([k, v]) => [k, safeStr(v) ?? '']))
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
  return all.find((f) => f.slug === slug) ?? null
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

export const TYPE_LABELS: Record<string, string> = {
  player: 'Players',
  team: 'Teams',
  league: 'Leagues',
  season: 'Seasons',
  match: 'Matches',
  venue: 'Venues',
  metric: 'Metrics',
  methodology: 'Methodology',
  source: 'Sources',
  example: 'Examples',
  research: 'Research',
  runbook: 'Runbooks',
  reference: 'References',
  index: 'Index',
}

export const SOURCE_BOUNDARY_LABELS: Record<string, { label: string; color: string }> = {
  derived_claims_only: { label: 'Derived claims', color: 'blue' },
  public_open_data: { label: 'Open data (CC BY 3.0)', color: 'green' },
  manual_curated_knowledge: { label: 'Curated', color: 'purple' },
  methodology_only: { label: 'Methodology', color: 'gray' },
  proprietary_source_not_redistributed: { label: 'Reference only', color: 'red' },
}
