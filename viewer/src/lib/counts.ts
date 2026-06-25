import { getAllFiles } from './okf'

export interface OKFCounts {
  total: number
  byType: Record<string, number>
}

export async function getOKFCounts(): Promise<OKFCounts> {
  const all = await getAllFiles()
  const byType: Record<string, number> = {}
  for (const f of all) {
    if (f.slug !== 'index' && !f.slug.endsWith('/index')) {
      byType[f.type] = (byType[f.type] || 0) + 1
    }
  }
  return { total: all.length, byType }
}
