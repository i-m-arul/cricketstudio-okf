// Generates public/search-index.json, public/llms-full.txt, and public/og-images/*.png
// from all OKF markdown files before Next.js build.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
import { join, relative, dirname } from 'path'
import matter from 'gray-matter'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

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
      confidence: data.provenance?.confidence || '',
      canonical_page: data.canonical_page || '',
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

// ── OG image generation ───────────────────────────────────────────────────────
const OG_TYPES = new Set(['story', 'dossier', 'research', 'metric'])
const OG_OUT = join(process.cwd(), 'public', 'og-images')
const FONT_DIR = join(process.cwd(), 'node_modules', 'geist', 'dist', 'fonts', 'geist-sans')
const ogTargets = index.filter(f => OG_TYPES.has(f.type) && !f.slug.endsWith('/index'))

const TYPE_BADGE = {
  story:    { label: 'Journey',    bg: '#14532d', color: '#4ade80' },
  dossier:  { label: 'Dossier',   bg: '#1e3a5f', color: '#60a5fa' },
  research: { label: 'Research',  bg: '#3b1f5f', color: '#c084fc' },
  metric:   { label: 'Metric',    bg: '#431407', color: '#fb923c' },
}

let fontBold, fontRegular
try {
  fontBold    = readFileSync(join(FONT_DIR, 'Geist-Bold.ttf'))
  fontRegular = readFileSync(join(FONT_DIR, 'Geist-Regular.ttf'))
} catch (e) {
  console.warn('OG image generation skipped: could not load Geist font:', e.message)
  process.exit(0)
}

const fonts = [
  { name: 'Geist', data: fontBold,    weight: 700, style: 'normal' },
  { name: 'Geist', data: fontRegular, weight: 400, style: 'normal' },
]

let ogCount = 0
for (const file of ogTargets) {
  const outPath = join(OG_OUT, `${file.slug}.png`)
  if (existsSync(outPath)) continue   // skip if already generated (dev hot-reload)

  mkdirSync(dirname(outPath), { recursive: true })

  const rawTitle = file.title
  const title = rawTitle.length > 62
    ? rawTitle.slice(0, rawTitle.lastIndexOf(' ', 59) || 59) + '…'
    : rawTitle
  const rawDesc = file.description || ''
  const desc = rawDesc.length > 110
    ? rawDesc.slice(0, rawDesc.lastIndexOf(' ', 107) || 107) + '…'
    : rawDesc
  const badge = TYPE_BADGE[file.type] || { label: file.type, bg: '#1f2937', color: '#9ca3af' }
  const titleSize = title.length > 42 ? 42 : 52

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          background: '#0a0f1a',
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          padding: '56px 72px',
          fontFamily: 'Geist',
          position: 'relative',
        },
        children: [
          // top green accent bar
          { type: 'div', props: { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#4ade80' } } },
          // brand row
          { type: 'div', props: {
            style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'auto' },
            children: [
              { type: 'span', props: { style: { fontSize: 20, color: '#4ade80', fontWeight: 700 }, children: 'CricketStudio OKF' } },
              { type: 'span', props: {
                style: { fontSize: 13, color: badge.color, background: badge.bg,
                  padding: '4px 14px', borderRadius: 20, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: 1 },
                children: badge.label,
              }},
            ],
          }},
          // title
          { type: 'div', props: {
            style: { fontSize: titleSize, fontWeight: 700, color: '#f9fafb',
              lineHeight: 1.2, marginBottom: 20, marginTop: 20, letterSpacing: '-0.5px' },
            children: title,
          }},
          // description
          { type: 'div', props: {
            style: { fontSize: 22, color: '#9ca3af', lineHeight: 1.5, marginBottom: 'auto' },
            children: desc,
          }},
          // bottom bar
          { type: 'div', props: {
            style: { display: 'flex', alignItems: 'center',
              borderTop: '1px solid #1f2937', paddingTop: 22, marginTop: 32 },
            children: [
              { type: 'span', props: { style: { fontSize: 17, color: '#4b5563' }, children: 'okf.cricketstudio.ai' } },
              { type: 'span', props: { style: { marginLeft: 'auto', fontSize: 17, color: '#4ade80' }, children: 'CC-BY-4.0 · Open Knowledge' } },
            ],
          }},
        ],
      },
    },
    { width: 1200, height: 630, fonts }
  )

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  writeFileSync(outPath, resvg.render().asPng())
  ogCount++
}
console.log(`og-images: ${ogCount} new images generated (${ogTargets.length} total targets)`)
