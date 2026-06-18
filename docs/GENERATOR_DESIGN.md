# Generator Design (v0.2)

Status: **design only.** v0.1 ships curated files authored by hand against the snapshot.
`scripts/generate_okf.py` is built in v0.2 once the schema has proven stable against real
curated content.

## Goal

Deterministically transform CricketStudio's pre-computed snapshot into validated OKF
markdown, so the bundle can grow beyond hand-curation without losing trust or provenance.

## Input: the snapshot (not the API, not the 24K pages)

Both the CricketStudio website and `cricketstudio-mcp` run off a pre-computed,
git-committed JSON snapshot — the *permitted derived-claims layer*. The generator consumes
the **same** snapshot:

```
cricketstudio-mcp/data/snapshot/*.json   (path configurable)
  players.json, teams.json, venues.json, matches.json, standings.json,
  season-stats.json, h2h.json, team-h2h.json, trends.json, graph.json,
  ipl-historical.json, mlc-*.json, metadata.json
```

This is license-safe: the snapshot's own `metadata.json` states it excludes live match
state (raw Sportmonks deliveries), so no raw licensed feed ever reaches the bundle. See
[`okf/sources/cricketstudio-derived-claims.md`](../okf/sources/cricketstudio-derived-claims.md)
and `DATA_LICENSE_BOUNDARIES.md`.

## Pipeline (CLAUDE.md §11)

```text
snapshot JSON
   -> normalized entity records   (extraction)
   -> OKF frontmatter + markdown   (transformation / rendering)
   -> schema validation            (scripts/validate_okf.py)
   -> link validation              (scripts/check_links.py)
   -> license / provenance checks  (validate_okf.py)
   -> Git diff review
```

Keep the three stages — **extract**, **transform**, **render** — as separate, testable
functions. (Google's Enterprise Knowledge Solution uses the same staged separation —
ingest → extract → index → retrieve — as prior art for this shape; we deliberately avoid
its heavyweight GCP stack, which is unjustified for a Markdown+YAML bundle.)

## Design principles

- **Deterministic & idempotent.** Same snapshot + same code → byte-identical output. No
  `Date.now()`/random ordering; sort keys; stable slugs.
- **Stable slugs and paths.** Reuse the snapshot's kebab-case, ESPNcricinfo-anchored slugs
  for filenames and canonical URLs. Never re-mint identifiers.
- **Provenance carried through.** Map each snapshot claim's `computedAt`/`sampleSize`/
  `provenance` onto the OKF `provenance` block. Never emit a number without it.
- **Mark generated files.** Emit `generated: true` in frontmatter so generated files are
  distinguishable from curated ones in Git review. Curated files are never overwritten.
- **Respect the floors.** Do not render a rankable rate for a split below its
  [sample-size floor](../okf/methodology/sample-size-floors.md); render "insufficient
  sample" instead.
- **No network in tests.** Tests run against a small fixture snapshot, never the live one.

## Mapping (illustrative)

| Snapshot field | OKF frontmatter / body |
|----------------|------------------------|
| `slug` | filename, `entity_id`, canonical URL |
| `fullName` | `title` |
| `sameAs.{wikipedia,wikidata,espncricinfo}` | identity links, `aliases` |
| `team`, graph edges | `related`, Key Relationships |
| `claims[].{computedAt,sampleSize,provenance}` | `provenance` block + Snapshot Facts |
| `metadata.generatedAt` | `dataset_version` |

## Out of scope for v0.2

- Network scraping of the 24K pages.
- Full corpus conversion (Phase 3 only, and only if generated output stays useful).
