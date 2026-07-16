/**
 * Loads USC lookup data at build time.
 * Primary source: data/usc-lookup.json committed to the OKF repo (works in CI/Amplify).
 * Fallback: _query-registry.json from the sibling cricketstudio repo (local dev).
 */

import fs from 'fs'
import path from 'path'

interface UscRef {
  usc: string
  claimUrl: string
}

let _cache: Map<string, UscRef> | null = null

export function getUscMap(): Map<string, UscRef> {
  if (_cache) return _cache

  // Try committed lookup file first (CI / Amplify)
  const lookupPath = path.join(process.cwd(), '..', 'data', 'usc-lookup.json')
  if (fs.existsSync(lookupPath)) {
    const raw: Record<string, UscRef> = JSON.parse(fs.readFileSync(lookupPath, 'utf-8'))
    _cache = new Map(Object.entries(raw))
    return _cache
  }

  // Fallback: full query registry from sibling repo (local dev)
  const registryPath = path.join(process.cwd(), '..', '..', 'cricketstudio', 'data', '_query-registry.json')
  if (fs.existsSync(registryPath)) {
    interface RegistryEntry { canonicalUrl?: string; usc?: string; claimUrl?: string }
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

  _cache = new Map()
  return _cache
}

export function lookupUsc(canonicalPage: string | undefined): UscRef | null {
  if (!canonicalPage) return null
  return getUscMap().get(canonicalPage) ?? null
}
