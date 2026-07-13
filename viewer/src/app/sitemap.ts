import { getAllFiles } from '@/lib/okf'
import type { MetadataRoute } from 'next'

const BASE = 'https://okf.cricketstudio.ai'

const SECTION_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE}/scorebook/`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE}/metrics/`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/methodology/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/research/`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE}/dossier/`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE}/stories/`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE}/spec/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/conformance/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/releases/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/agents/`, changeFrequency: 'monthly', priority: 0.75 },
  { url: `${BASE}/search/`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/about/`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/evals/leaderboard/`, changeFrequency: 'weekly', priority: 0.85 },
]

const CHANGE_FREQ_BY_TYPE: Record<string, 'weekly' | 'monthly'> = {
  story:    'weekly',
  research: 'weekly',
}

const PRIORITY_BY_TYPE: Record<string, number> = {
  player: 0.8,
  team: 0.8,
  league: 0.8,
  season: 0.8,
  record: 0.75,
  metric: 0.85,
  research: 0.8,
  methodology: 0.75,
  match: 0.7,
  venue: 0.7,
  dossier: 0.8,
  story: 0.85,
  source: 0.5,
  spec: 0.7,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const files = await getAllFiles()
  const fileEntries: MetadataRoute.Sitemap = files
    .filter((f) => !f.slug.endsWith('/index') && f.slug !== 'index')
    .map((f) => ({
      url: `${BASE}${f.urlPath}`,
      lastModified: f.last_verified ? new Date(f.last_verified) : undefined,
      changeFrequency: (CHANGE_FREQ_BY_TYPE[f.type] ?? 'monthly') as 'weekly' | 'monthly',
      priority: PRIORITY_BY_TYPE[f.type] ?? 0.6,
    }))

  return [...SECTION_PAGES, ...fileEntries]
}
