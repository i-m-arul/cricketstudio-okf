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
}

export default function SearchPage() {
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
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
      ],
      threshold: 0.4,
      includeScore: true,
    })
    setResults(fuse.search(query).slice(0, 20).map((r) => r.item))
  }, [query, index])

  const TYPE_COLORS: Record<string, string> = {
    player: 'bg-blue-900/40 text-blue-300',
    team: 'bg-purple-900/40 text-purple-300',
    league: 'bg-yellow-900/40 text-yellow-300',
    season: 'bg-orange-900/40 text-orange-300',
    metric: 'bg-green-900/40 text-green-300',
    methodology: 'bg-gray-700/40 text-gray-300',
    scorebook: 'bg-indigo-900/40 text-indigo-300',
    research: 'bg-rose-900/40 text-rose-300',
    match: 'bg-red-900/40 text-red-300',
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Search</h1>
      <p className="text-gray-400 mb-6">Search across all concepts, metrics, methodology, and examples.</p>

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
        <p className="text-gray-500">No results for <span className="text-gray-300">"{query}"</span>.</p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={r.urlPath}
              className="block bg-gray-900 border border-gray-800 hover:border-green-700 rounded-lg p-4 transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${TYPE_COLORS[r.type] || 'bg-gray-800 text-gray-400'}`}>
                  {r.type}
                </span>
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
