---
type: player
title: Vaibhav Suryavanshi
description: Canonical CricketStudio OKF concept for Vaibhav Suryavanshi (RR, IPL 2026).
resource: https://players.cricketstudio.ai/players/vaibhav-suryavanshi
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:player:vaibhav-suryavanshi
canonical_page: https://players.cricketstudio.ai/players/vaibhav-suryavanshi
api_resource: https://players.cricketstudio.ai/players/vaibhav-suryavanshi
dataset_version: "2026-06-11"
tags:
  - cricket
  - player
  - IPL
  - batter
  - RR
aliases:
  - Vaibhav Sooryavanshi
related:
  - ../teams/rajasthan-royals.md
  - ../../metrics/batting-strike-rate.md
  - ../../metrics/boundary-percentage.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  computed_at: "2026-05-29T14:17:58.285Z"
  snapshot: cricketstudio-mcp/data/snapshot (2026-06-11)
  notes: Stats are a dated snapshot; use the canonical page for current values.
---

# Vaibhav Suryavanshi

## Summary

Vaibhav Suryavanshi is an Indian batter who plays for
[Rajasthan Royals](../teams/rajasthan-royals.md) in the IPL. Born 2011-03-27, he is a young
batting talent noted for an exceptionally high strike rate in IPL 2026.

## Why This Matters

Suryavanshi is a high-interest young-player concept and a useful teaching case for why
**sample size and date window matter** when a player posts spectacular rate stats.

## Canonical CricketStudio Resources

- Player page: <https://players.cricketstudio.ai/players/vaibhav-suryavanshi>
- Wikipedia: <https://en.wikipedia.org/wiki/Vaibhav_Sooryavanshi>
- Wikidata: <https://www.wikidata.org/wiki/Q130390376>
- ESPNcricinfo: <https://www.espncricinfo.com/cricketers/vaibhav-suryavanshi-1408688>

## Key Relationships

- Player → Team: [Rajasthan Royals](../teams/rajasthan-royals.md)
- Player → Season: [IPL 2026](../seasons/ipl-2026.md)
- Player → Metrics: [Batting Strike Rate](../../metrics/batting-strike-rate.md),
  [Boundary Percentage](../../metrics/boundary-percentage.md)

## Snapshot Facts (sourced & dated)

IPL 2026 batting, from the snapshot (`computed_at` 2026-05-29; **use the canonical page for
current values**):

| Stat | Value |
|------|-------|
| Matches | 16 |
| Runs | 776 |
| Balls faced | 327 |
| Strike rate | 237.31 |
| Average | 48.50 |
| Sixes | 72 |

Sample clears the [batting floor](../../methodology/sample-size-floors.md). The 237.31
strike rate is exceptional and should always be reported with the ball count and date.

## Agent Guidance

- Note "IPL 2026" and the snapshot date; link the canonical page for live figures.
- His name is also spelled **Sooryavanshi** (Wikipedia) — treat as an alias.
- A high strike rate over a season clears the floor, but resist extrapolating to "best
  ever" without scope and comparison rules — see
  [When NOT to rank a player](../../examples/when-not-to-rank-a-player.md).

## Data and Source Notes

- `source_boundary: derived_claims_only`; Sportmonks-derived, raw feed not redistributed.
- Values are a 2026-06-11 snapshot projection; canonical pages are fresher.

## Examples

- [Compare Bumrah vs Suryavanshi](../../examples/compare-bumrah-vs-suryavanshi.md)
- [When NOT to rank a player](../../examples/when-not-to-rank-a-player.md)

## Related Concepts

- [Rajasthan Royals](../teams/rajasthan-royals.md)
- [Batting Strike Rate](../../metrics/batting-strike-rate.md)
