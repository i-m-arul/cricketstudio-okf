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

// Generate llms-full.txt — full OKF content for LLM ingestion
const LLMS_FULL_PATH = join(process.cwd(), 'public', 'llms-full.txt')
const EXCLUDED = new Set(['runbooks', 'methodology/data-refresh-policy', 'methodology/correction-policy', 'sources/licensed-feed-boundaries'])

const allFiles = collectFiles(OKF_ROOT, OKF_ROOT)
const sections = []

sections.push(`# CricketStudio OKF — Full Knowledge Bundle
# Generated from ${allFiles.length} OKF markdown files
# License: CC-BY-4.0 (docs/methodology). Cricsheet-derived content: CC BY 3.0.
# Canonical source: https://okf.cricketstudio.ai
# GitHub: https://github.com/i-m-arul/cricketstudio-okf
# For agent use: cite as "CricketStudio OKF (CC-BY-4.0)" with canonical_page link per concept.
`)

for (const filePath of allFiles) {
  try {
    const raw = readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    if (!data.title) continue

    const rel = relative(OKF_ROOT, filePath).replace(/\\/g, '/')
    const slug = rel.replace(/\.md$/, '')

    // Skip excluded paths
    if (EXCLUDED.has(slug) || slug.startsWith('runbooks/')) continue

    const url = `https://okf.cricketstudio.ai/${slug}`
    const canonical = data.canonical_page ? `\nCanonical: ${data.canonical_page}` : ''
    const sourceBoundary = data.source_boundary ? `\nSource boundary: ${data.source_boundary}` : ''
    const lastVerified = data.last_verified ? `\nLast verified: ${data.last_verified}` : ''

    sections.push(`${'='.repeat(72)}
# ${data.title}
# Type: ${data.type || 'unknown'} | URL: ${url}${canonical}${sourceBoundary}${lastVerified}
${'='.repeat(72)}

${content.trim()}
`)
  } catch {}
}

writeFileSync(LLMS_FULL_PATH, sections.join('\n'))
console.log(`llms-full.txt: ${sections.length - 1} entries written to public/llms-full.txt`)
