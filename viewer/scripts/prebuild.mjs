// Generates public/search-index.json from all OKF markdown files before Next.js build.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
import { join, relative } from 'path'
import matter from 'gray-matter'

const OKF_ROOT = join(process.cwd(), '..', 'okf')
const OUT_PATH = join(process.cwd(), 'public', 'search-index.json')

function collectFiles(dir, baseDir) {
  const entries = []
  try {
    const items = readdirSync(dir, { withFileTypes: true })
    for (const item of items) {
      const fullPath = join(dir, item.name)
      if (item.isDirectory()) {
        entries.push(...collectFiles(fullPath, baseDir))
      } else if (item.name.endsWith('.md')) {
        entries.push(fullPath)
      }
    }
  } catch {}
  return entries
}

const files = collectFiles(OKF_ROOT, OKF_ROOT)
const index = []

for (const filePath of files) {
  try {
    const raw = readFileSync(filePath, 'utf8')
    const { data } = matter(raw)
    if (!data.title) continue

    const rel = relative(OKF_ROOT, filePath)
    const slug = rel.replace(/\\/g, '/').replace(/\.md$/, '')
    const urlPath = '/' + slug

    index.push({
      slug,
      urlPath,
      type: data.type || 'unknown',
      title: data.title,
      description: data.description || '',
      tags: data.tags || [],
    })
  } catch {}
}

if (!existsSync(join(process.cwd(), 'public'))) {
  mkdirSync(join(process.cwd(), 'public'), { recursive: true })
}

writeFileSync(OUT_PATH, JSON.stringify(index, null, 2))
console.log(`search-index.json: ${index.length} entries written to public/search-index.json`)
