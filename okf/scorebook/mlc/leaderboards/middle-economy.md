---
type: leaderboard
title: "Best middle-overs economy"
description: "Fewest runs conceded per over in the middle overs (overs 6â€“15). Lower is better. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/middle-economy
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:middle-economy
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/middle-economy
dataset_version: "2026-06-20"
tags:
  - cricket
  - leaderboard
  - MLC
  - T20
  - bowling
provenance:
  source: Cricsheet CC BY 3.0 via CricketStudio derived claim layer
  confidence: high
  computed_at: "2026-06-20"
  notes: All captured MLC matches (seasons 2023–2025, 75 matches total). Attribution required per CC BY 3.0.
---

# Best middle-overs economy

## Summary

Fewest runs conceded per over in the middle overs (overs 6â€“15). Lower is better.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 18 legal deliveries in middle overs.

## Metric Definition

Runs conceded per over in middle overs (7–16). Formula: (mid_runs / mid_balls) × 6.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/middle-economy](https://players.cricketstudio.ai/leagues/mlc/leaderboards/middle-economy)

## Top 10 — Best middle-overs economy

| Rank | Player | Team | Middle econ | Sample |
|------|--------|------|-------------|--------|
| 1 | DR Sams | Texas Super Kings | 4.00 | 18 balls in middle overs |
| 2 | Imad Wasim | Seattle Orcas | 5.40 | 120 balls in middle overs |
| 3 | A Nortje | MI New York, Washington Freedom | 5.67 | 72 balls in middle overs |
| 4 | AF Milne | Texas Super Kings | 5.80 | 30 balls in middle overs |
| 5 | SP Narine | Los Angeles Knight Riders | 6.30 | 336 balls in middle overs |
| 6 | DL Piedt | Washington Freedom | 6.33 | 72 balls in middle overs |
| 7 | Zaman Khan | Seattle Orcas | 6.41 | 44 balls in middle overs |
| 8 | Tajinder Singh | MI New York, San Francisco Unicorns | 6.43 | 42 balls in middle overs |
| 9 | LH Ferguson | Los Angeles Knight Riders, Washington Freedom | 6.61 | 108 balls in middle overs |
| 10 | KMA Paul | Seattle Orcas | 6.80 | 30 balls in middle overs |

*Full leaderboard (90 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/middle-economy).*

## What Agents Should Know

- When ranking bowlers, apply the sample-size floor stated in `floorNote`. Economy and average require minimum balls bowled to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 18 legal deliveries in middle overs.
- Metric definition: Runs conceded per over in middle overs (7–16). Formula: (mid_runs / mid_balls) × 6.
- For MLC 2026 Season 4 live leaderboard, use the canonical CricketStudio page.
- Source: Cricsheet CC BY 3.0 open data via CricketStudio derived claim layer.

## Provenance and Data Notes

- **Dataset:** Cricsheet CC BY 3.0 ball-by-ball data, processed by CricketStudio.
- **Scope:** MLC seasons 2023, 2024, 2025. Season 4 (2026) is in progress; this snapshot does not include it.
- **Attribution:** Cricsheet (<https://cricsheet.org>) — required per CC BY 3.0.
- **Snapshot:** 2026-06-20

## Related Concepts

- [Major League Cricket](../../leagues/major-league-cricket.md)
- [MLC Orange Cap](./orange-cap.md)
- [MLC Purple Cap](./purple-cap.md)
- [MLC Players](../players/)
