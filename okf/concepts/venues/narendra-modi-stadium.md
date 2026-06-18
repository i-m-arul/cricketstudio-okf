---
type: venue
title: Narendra Modi Stadium
description: Canonical CricketStudio OKF concept for Narendra Modi Stadium, Ahmedabad.
resource: https://players.cricketstudio.ai/venues/narendra-modi-stadium
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:venue:narendra-modi-stadium
canonical_page: https://players.cricketstudio.ai/venues/narendra-modi-stadium
dataset_version: "2026-06-11"
tags:
  - cricket
  - venue
  - IPL
related:
  - ../matches/ipl-2026-rcb-vs-gt-2026-05-31.md
  - ../seasons/ipl-2026.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  snapshot: cricketstudio-mcp/data/snapshot (2026-06-11)
  notes: Fixture count from snapshot; venue effects require a 3-fixture floor.
---

# Narendra Modi Stadium

## Summary

Narendra Modi Stadium is a cricket ground in Ahmedabad and the largest cricket stadium in
the world by capacity. It hosted the **IPL 2026 final** between RCB and GT on 2026-05-31.

## Why This Matters

As the venue of the IPL 2026 final, it anchors the championship match concept and is a
high-traffic venue query.

## Canonical CricketStudio Resources

- Venue page: <https://players.cricketstudio.ai/venues/narendra-modi-stadium>
- Wikidata: <https://www.wikidata.org/wiki/Q379935>

## Key Relationships

- Venue → Matches (including the [IPL 2026 final](../matches/ipl-2026-rcb-vs-gt-2026-05-31.md))
- Venue → Season ([IPL 2026](../seasons/ipl-2026.md))

## Snapshot Facts (sourced & dated)

- City: **Ahmedabad**
- IPL 2026 fixtures captured at this venue: **9**

## What Agents Should Know

- Venue effects (chase bias, par scores) need the **≥3-fixture floor**
  ([Sample-Size Floors](../../methodology/sample-size-floors.md)) before they are treated as
  signal. With 9 fixtures captured, season-level venue claims are eligible but should still
  cite the canonical page.
- Always state the season alongside any venue tendency.

## Data and Source Notes

- `source_boundary: derived_claims_only`; Sportmonks-derived, raw feed not redistributed.

## Related Concepts

- [IPL 2026 Final — RCB vs GT](../matches/ipl-2026-rcb-vs-gt-2026-05-31.md)
- [Wankhede Stadium](wankhede-stadium.md)
