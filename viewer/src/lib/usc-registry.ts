/**
 * Loads _query-registry.json from the sibling cricketstudio repo at build time.
 * Returns a map: canonicalUrl → { usc, claimUrl } for entries that have been USC-stamped.
 *
 * The registry is built by scripts/build-query-registry.mjs + enrich-query-registry-usc.mjs
 * in the main repo. This module reads the committed output — no runtime fetch needed.
 */

import fs from 'fs'
import path from 'path'

interface RegistryEntry {
  canonicalUrl?: string
  usc?: string
  claimUrl?: string
}

interface UscRef {
  usc: string
  claimUrl: string
}

let _cache: Map<string, UscRef> | null = null

export function getUscMap(): Map<string, UscRef> {
  if (_cache) return _cache

  const registryPath = path.join(process.cwd(), '..', '..', 'cricketstudio', 'data', '_query-registry.json')

  if (!fs.existsSync(registryPath)) {
    _cache = new Map()
    return _cache
  }

  const entries: RegistryEntry[] = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const map = new Map<string, UscRef>()

  for (const entry of entries) {
    if (entry.usc && entry.claimUrl && entry.canonicalUrl && !map.has(entry.canonicalUrl)) {
      map.set(entry.canonicalUrl, { usc: entry.usc, claimUrl: entry.claimUrl })
    }
  }

  _cache = map
  return _cache
}

export function lookupUsc(canonicalPage: string | undefined): UscRef | null {
  if (!canonicalPage) return null
  return getUscMap().get(canonicalPage) ?? null
}
