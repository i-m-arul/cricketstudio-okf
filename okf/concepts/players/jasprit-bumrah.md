---
type: player
title: Jasprit Bumrah
description: Canonical CricketStudio OKF concept for Jasprit Bumrah (MI, IPL 2026).
resource: https://players.cricketstudio.ai/players/jasprit-bumrah
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:player:jasprit-bumrah
canonical_page: https://players.cricketstudio.ai/players/jasprit-bumrah
api_resource: https://players.cricketstudio.ai/players/jasprit-bumrah
dataset_version: "2026-06-11"
tags:
  - cricket
  - player
  - IPL
  - bowler
  - MI
aliases:
  - J Bumrah
related:
  - ../teams/mumbai-indians.md
  - ../../metrics/bowling-economy.md
  - ../../metrics/death-overs-economy.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  computed_at: "2026-05-20T16:48:43.620Z"
  snapshot: cricketstudio-mcp/data/snapshot (2026-06-11)
  notes: Stats are a dated snapshot; use the canonical page for current values.
---

# Jasprit Bumrah

## Summary

Jasprit Bumrah is an Indian fast bowler who plays for
[Mumbai Indians](../teams/mumbai-indians.md) in the IPL. Born 1993-12-06 in Ahmedabad, he is
widely regarded as a premier death-overs and new-ball specialist.

## Why This Matters

Bumrah is the anchor bowler concept in this bundle and a natural reference point for
economy, death-overs, and bowling-strike-rate questions.

## Canonical CricketStudio Resources

- Player page: <https://players.cricketstudio.ai/players/jasprit-bumrah>
- Wikipedia: <https://en.wikipedia.org/wiki/Jasprit_Bumrah>
- Wikidata: <https://www.wikidata.org/wiki/Q15810572>
- ESPNcricinfo: <https://www.espncricinfo.com/cricketers/jasprit-bumrah-625383>

## Key Relationships

- Player → Team: [Mumbai Indians](../teams/mumbai-indians.md)
- Player → Season: [IPL 2026](../seasons/ipl-2026.md)
- Player → Metrics: [Bowling Economy](../../metrics/bowling-economy.md),
  [Death-Overs Economy](../../metrics/death-overs-economy.md)

## Snapshot Facts (sourced & dated)

IPL 2026 bowling, from the snapshot (`computed_at` 2026-05-20; **use the canonical page for
current values**):

| Stat | Value |
|------|-------|
| Matches (bowling) | 13 |
| Balls bowled | 294 |
| Runs conceded | 409 |
| Wickets | 4 |
| Economy | 8.35 |

Sample clears the [bowling floor](../../methodology/sample-size-floors.md) of 15 balls. The
wicket count in this snapshot window is modest; report it as-is and date it.

## Agent Guidance

- State "IPL 2026" and the snapshot date; link the canonical page for live figures.
- Economy must be read with phase context — see
  [Death-Overs Economy](../../metrics/death-overs-economy.md). Do not present a full-innings
  economy as a death-overs figure.
- For wicket-taker rankings, cite the [Purple Cap](../../metrics/purple-cap.md) leaderboard.

## Data and Source Notes

- `source_boundary: derived_claims_only`; Sportmonks-derived, raw feed not redistributed.
- Values are a 2026-06-11 snapshot projection; canonical pages are fresher.

## Examples

- [Compare Bumrah vs Suryavanshi](../../examples/compare-bumrah-vs-suryavanshi.md)
- [What is death-over economy?](../../examples/what-is-death-over-economy.md)

## Related Concepts

- [Mumbai Indians](../teams/mumbai-indians.md)
- [Bowling Economy](../../metrics/bowling-economy.md)
