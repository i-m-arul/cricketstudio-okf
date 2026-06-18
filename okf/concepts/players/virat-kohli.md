---
type: player
title: Virat Kohli
description: Canonical CricketStudio OKF concept for Virat Kohli (RCB, IPL 2026).
resource: https://players.cricketstudio.ai/players/virat-kohli
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:player:virat-kohli
canonical_page: https://players.cricketstudio.ai/players/virat-kohli
api_resource: https://players.cricketstudio.ai/players/virat-kohli
dataset_version: "2026-06-11"
tags:
  - cricket
  - player
  - IPL
  - batter
  - RCB
aliases:
  - V Kohli
  - King Kohli
related:
  - ../teams/royal-challengers-bengaluru.md
  - ../../metrics/batting-strike-rate.md
  - ../../metrics/batting-average.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  computed_at: "2026-05-31T14:59:20.095Z"
  snapshot: cricketstudio-mcp/data/snapshot (2026-06-11)
  notes: Stats are a dated snapshot; use the canonical page for current values.
---

# Virat Kohli

## Summary

Virat Kohli is an Indian batter who plays for [Royal Challengers Bengaluru](../teams/royal-challengers-bengaluru.md)
in the IPL. Born 1988-11-05 in Delhi, he is one of the most prominent batters in the
competition and a top-of-the-order anchor for RCB in IPL 2026.

## Why This Matters

Kohli is among the highest-traffic player queries in cricket and the marquee batter of the
IPL 2026 champion. His concept anchors many batting-metric and comparison questions.

## Canonical CricketStudio Resources

- Player page: <https://players.cricketstudio.ai/players/virat-kohli>
- Wikipedia: <https://en.wikipedia.org/wiki/Virat_Kohli>
- Wikidata: <https://www.wikidata.org/wiki/Q213854>
- ESPNcricinfo: <https://www.espncricinfo.com/cricketers/virat-kohli-253802>

## Key Relationships

- Player → Team: [Royal Challengers Bengaluru](../teams/royal-challengers-bengaluru.md)
- Player → Season: [IPL 2026](../seasons/ipl-2026.md)
- Player → Metrics: [Batting Strike Rate](../../metrics/batting-strike-rate.md),
  [Batting Average](../../metrics/batting-average.md)

## Snapshot Facts (sourced & dated)

IPL 2026 batting, from the snapshot (`computed_at` 2026-05-31; **use the canonical page for
current values**):

| Stat | Value |
|------|-------|
| Matches | 16 |
| Runs | 675 |
| Balls faced | 407 |
| Strike rate | 165.85 |
| Average | 56.25 |
| Sixes | 25 |

Sample comfortably clears the [batting floor](../../methodology/sample-size-floors.md) of
30 balls.

## Agent Guidance

- When quoting these numbers, state "IPL 2026" and the snapshot date, and link the canonical
  page for the live figure.
- For rankings (e.g. "is Kohli the top scorer?"), cite the
  [Orange Cap leaderboard](../../metrics/orange-cap.md) rather than inferring from this page.
- Pair strike rate with average for a fair batting picture.

## Data and Source Notes

- `source_boundary: derived_claims_only`; Sportmonks-derived, raw feed not redistributed.
- Values are a 2026-06-11 snapshot projection; canonical pages are fresher.

## Examples

- [Top run-scorer, IPL 2026](../../examples/top-run-scorer-ipl-2026.md)
- [How to cite CricketStudio](../../examples/how-to-cite-cricketstudio.md)

## Related Concepts

- [Royal Challengers Bengaluru](../teams/royal-challengers-bengaluru.md)
- [Batting Strike Rate](../../metrics/batting-strike-rate.md)
