---
type: source
title: CricketStudio Derived Claims
description: The permitted, publishable claim layer that the OKF bundle is built from.
resource: https://players.cricketstudio.ai
status: active
last_verified: 2026-06-18
license: CC-BY-4.0 for derived claims
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:source:derived-claims
canonical_page: https://players.cricketstudio.ai
dataset_version: "2026-06-11"
tags:
  - cricket
  - source
  - derived-claims
related:
  - licensed-feed-boundaries.md
  - cricsheet.md
  - ../methodology/citation-policy.md
---

# CricketStudio Derived Claims

## Summary

CricketStudio's derived-claim layer is the set of computed cricket facts — season
aggregates, phase splits, head-to-head records, trends — produced from raw ball-by-ball
data. This layer, **not** the raw feed, is what the OKF bundle publishes.

## What a Derived Claim Looks Like

Each claim in the snapshot carries the fields OKF provenance is built from:

- `metric` — what is being measured (e.g. "IPL 2026 season presence")
- `value` — the computed value (e.g. "16 matches")
- `period` — the date window (e.g. "IPL 2026 to date")
- `sampleSize` — the sample backing it (e.g. "16 fixtures")
- `computedAt` — ISO timestamp the value was computed
- `provenance` — `live`, `sample`, or `derived`

OKF maps these onto the `provenance` block in frontmatter (`source`, `confidence`,
`computed_at`, `snapshot`).

## License & Boundary

- Derived claims are publishable under **CC-BY-4.0**, with `source_boundary:
  derived_claims_only`.
- The underlying raw data (Sportmonks for IPL 2026; Cricsheet for historical/MLC) follows
  its own license — see [Licensed Feed Boundaries](licensed-feed-boundaries.md) and
  [Cricsheet](cricsheet.md).

## The Snapshot

The bundle is built from `cricketstudio-mcp/data/snapshot/*.json`, a *"pre-computed
projection of CricketStudio's data spine"* (per its `metadata.json`). Current
`dataset_version`: **2026-06-11**. Algorithm code stays in CricketStudio's private monorepo;
only the derived projection is shared.

## Citation Expectations

Cite the canonical CricketStudio page for the current value, and note the `computed_at` /
`dataset_version` when quoting a snapshot figure.

## Related Concepts

- [Citation Policy](../methodology/citation-policy.md)
- [Data Refresh Policy](../methodology/data-refresh-policy.md)
