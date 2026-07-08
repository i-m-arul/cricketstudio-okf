'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'

interface SearchEntry {
  slug: string
  urlPath: string
  type: string
  title: string
  description: string
  tags: string[]
  confidence?: string
  canonical_page?: string
}

const CONF_STYLES: Record<string, { pill: string; dot: string }> = {
  medium: { pill: 'bg-amber-950/50 text-amber-400', dot: 'bg-amber-400' },
  low:    { pill: 'bg-red-950/50 text-red-400',    dot: 'bg-red-400'    },
}

const TYPE_COLORS: Record<string, string> = {
  player:      'bg-blue-900/40 text-blue-300 border-blue-800',
  team:        'bg-purple-900/40 text-purple-300 border-purple-800',
  league:      'bg-yellow-900/40 text-yellow-300 border-yellow-800',
  season:      'bg-orange-900/40 text-orange-300 border-orange-800',
  metric:      'bg-green-900/40 text-green-300 border-green-800',
  methodology: 'bg-gray-700/40 text-gray-300 border-gray-600',
  dossier:     'bg-indigo-900/40 text-indigo-300 border-indigo-800',
  story:       'bg-amber-900/40 text-amber-300 border-amber-800',
  research:    'bg-rose-900/40 text-rose-300 border-rose-800',
  match:       'bg-red-900/40 text-red-300 border-red-800',
  venue:       'bg-teal-900/40 text-teal-300 border-teal-800',
  source:      'bg-slate-700/40 text-slate-300 border-slate-600',
  record:      'bg-cyan-900/40 text-cyan-300 border-cyan-800',
  runbook:     'bg-gray-800/40 text-gray-400 border-gray-700',
}

export default function SearchClient() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [index, setIndex] = useState<SearchEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        setIndex(data)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (!query.trim() || index.length === 0) {
      setResults([])
      return
    }
    const fuse = new Fuse(index, {
      keys: [
        { name: 'title', weight: 0.45 },
        { name: 'description', weight: 0.25 },
        { name: 'tags', weight: 0.3 },
      ],
      threshold: 0.35,
      includeScore: true,
    })
    setResults(fuse.search(query).slice(0, 20).map((r) => r.item))
  }, [query, index])

  return (
    <div className="mt-6">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search concepts, players, metrics…"
        className="w-full bg-gray-900 border border-gray-700 focus:border-green-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none text-lg mb-6"
        autoFocus
      />

      {!loaded && (
        <p className="text-gray-500 text-sm">Loading index…</p>
      )}

      {loaded && query && results.length === 0 && (
        <p className="text-gray-500">No results for <span className="text-gray-300">&ldquo;{query}&rdquo;</span>.</p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={r.urlPath}
              className="block bg-gray-900 border border-gray-800 hover:border-green-700 rounded-lg p-4 transition-all group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded border ${TYPE_COLORS[r.type] || 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                    {r.type}
                  </span>
                  {r.type === 'dossier' && r.confidence && CONF_STYLES[r.confidence] && (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded ${CONF_STYLES[r.confidence].pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${CONF_STYLES[r.confidence].dot}`} aria-hidden="true" />
                      {r.confidence}
                    </span>
                  )}
                </div>
                {r.canonical_page && (
                  <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0">↗ canonical</span>
                )}
              </div>
              <h3 className="font-semibold text-white group-hover:text-green-300 transition-colors">{r.title}</h3>
              <p className="text-sm text-gray-400 mt-0.5 line-clamp-2">{r.description}</p>
            </Link>
          ))}
        </div>
      )}

      {!query && loaded && index.length > 0 && (
        <p className="text-gray-600 text-sm">{index.length} files indexed.</p>
      )}
    </div>
  )
}
