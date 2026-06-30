'use client'

import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import OKFCard from './OKFCard'

interface FileEntry {
  slug: string
  urlPath: string
  type: string
  title: string
  description: string
  tags?: string[]
  canonical_page?: string
  source_boundary?: string
}

interface Props {
  files: FileEntry[]
  /** Tags to always show first in the chip bar, in order */
  pinnedTags?: string[]
  /** Minimum number of files a tag must appear in to show as a chip */
  minCount?: number
  /** Max total chips to display (default 12); prevents chip-bar overflow */
  maxChips?: number
  /**
   * Optional: pre-grouped map for scorebook-style grouped default view.
   * When active filters are empty AND this is provided, renders grouped sections.
   * When filters are active, always renders a flat filtered grid.
   */
  groupByType?: Record<string, FileEntry[]>
  typeLabels?: Record<string, string>
  /** Rendered above the tag chips inside the shared sticky bar */
  topSlot?: ReactNode
}

// Tags that are structural/meta — never useful as chips
const HIDDEN = new Set([
  'cricket', 'player', 'team', 'venue', 'league', 'season',
  'match', 'metric', 'methodology', 'dossier', 'research', 'index', 'placeholder',
])

// Detect entity-name tags: proper nouns like Virat-Kohli, Gujarat-Titans,
// Royal-Challengers-Bengaluru. Pattern: starts uppercase, contains a lowercase
// letter, and has a hyphen — distinguishes them from IPL, MLC, RHB, IPL-2026.
function isEntityTag(tag: string): boolean {
  return /^[A-Z]/.test(tag) && /[a-z]/.test(tag) && tag.includes('-')
}

export default function TagFilter({
  files,
  pinnedTags = [],
  minCount = 1,
  maxChips = 12,
  groupByType,
  typeLabels = {},
  topSlot,
}: Props) {
  const [active, setActive] = useState<Set<string>>(new Set())

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const f of files) {
      for (const t of f.tags ?? []) {
        counts[t] = (counts[t] ?? 0) + 1
      }
    }
    return counts
  }, [files])

  const chips = useMemo(() => {
    const pinned = pinnedTags.filter((t) => (tagCounts[t] ?? 0) >= minCount)
    const rest = Object.entries(tagCounts)
      .filter(([t, n]) =>
        n >= minCount &&
        !HIDDEN.has(t) &&
        !pinnedTags.includes(t) &&
        !isEntityTag(t)
      )
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t)
    return [...pinned, ...rest].slice(0, maxChips)
  }, [tagCounts, pinnedTags, minCount, maxChips])

  const filtered = useMemo(() => {
    if (active.size === 0) return files
    const activeArr = Array.from(active)
    return files.filter((f) => activeArr.some((t) => f.tags?.includes(t)))
  }, [files, active])

  function toggle(tag: string) {
    setActive((prev) => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isFiltering = active.size > 0

  const hasChips = chips.length > 0 || !!topSlot

  return (
    <div>
      {/* Sticky bar — section jumps (topSlot) + tag filter chips */}
      {hasChips && (
        <div className="sticky top-14 z-40 bg-[#0a0f1a]/95 backdrop-blur -mx-4 px-4 pt-3 pb-2 mb-4 border-b border-gray-800/50">
          {topSlot && <div className="mb-2">{topSlot}</div>}
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chips.map((tag) => {
                const on = active.has(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggle(tag)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                      on
                        ? 'bg-green-700 border-green-600 text-white'
                        : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-green-700 hover:text-gray-200'
                    }`}
                  >
                    {tag}
                    <span className={`text-xs ${on ? 'text-green-200' : 'text-gray-600'}`}>
                      {tagCounts[tag]}
                    </span>
                  </button>
                )
              })}
              {isFiltering && (
                <button
                  onClick={() => setActive(new Set())}
                  className="px-3 py-1 rounded-full text-sm text-gray-500 hover:text-gray-300 border border-transparent hover:border-gray-700 transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Result count while filtering */}
      {isFiltering && (
        <p className="text-xs text-gray-600 mb-4">
          {filtered.length} of {files.length} entries
        </p>
      )}

      {/* Grouped view (scorebook default, no active filters) */}
      {!isFiltering && groupByType ? (
        Object.entries(groupByType)
          .filter(([, items]) => items.length > 0)
          .map(([type, items]) => (
            <section key={type} id={`section-${type}`} className="mb-10 scroll-mt-40">
              <h2 className="text-lg font-semibold text-gray-300 mb-3 capitalize flex items-center gap-2">
                {typeLabels[type] || type}
                <span className="text-xs font-normal text-gray-600">{items.length} entries</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((f) => <OKFCard key={f.slug} {...f} />)}
              </div>
            </section>
          ))
      ) : filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((f) => <OKFCard key={f.slug} {...f} />)}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No entries match the selected filters.</p>
      )}
    </div>
  )
}
