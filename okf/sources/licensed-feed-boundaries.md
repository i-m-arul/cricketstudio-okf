---
type: source
title: Licensed Feed Boundaries (Sportmonks)
description: The proprietary IPL 2026 live feed — referenced but never redistributed.
resource: https://players.cricketstudio.ai
status: active
last_verified: 2026-06-18
license: Proprietary (Sportmonks) — not redistributed
source_system: Sportmonks
source_boundary: proprietary_source_not_redistributed
entity_id: cricketstudio:source:sportmonks
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - source
  - licensing
related:
  - cricketstudio-derived-claims.md
  - cricsheet.md
---

# Licensed Feed Boundaries (Sportmonks)

## Summary

CricketStudio's **live IPL 2026** data is licensed from **Sportmonks**, a commercial cricket
data provider. This source defines the boundary: CricketStudio may compute and publish
**derived claims**, but the **raw feed must never be redistributed**.

## License

Proprietary, under CricketStudio's commercial agreement with Sportmonks.

- **Allowed:** CricketStudio-computed derived claims and aggregate summaries, published
  under `source_boundary: derived_claims_only`.
- **Disallowed:** redistributing the raw Sportmonks feed, raw fixture payloads, or raw
  ball-by-ball deliveries.

## Why It Is Not in the Bundle

The OKF generator reads `cricketstudio-mcp/data/snapshot/*.json`, which by design
**excludes live match state** (`docs/match/*`). The snapshot is the derived layer only, so
no raw Sportmonks data ever reaches this bundle.

## Allowed Use in OKF

- IPL 2026 concept files cite derived claims with provenance and link to the canonical page.
- For raw ball-by-ball detail, agents link to the canonical CricketStudio match page rather
  than reproducing data.

## Disallowed Use

- Do not paste raw fixture JSON, delivery arrays, or feed payloads into any OKF file.
- The validator (`validate_okf.py`) fails the build if raw-feed patterns are detected — see
  `DATA_LICENSE_BOUNDARIES.md`.

## Related Concepts

- [CricketStudio Derived Claims](cricketstudio-derived-claims.md)
- [Cricsheet](cricsheet.md)
