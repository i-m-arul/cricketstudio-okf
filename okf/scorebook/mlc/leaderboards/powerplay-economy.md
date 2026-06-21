---
type: leaderboard
title: "Best powerplay economy"
description: "Lowest bowling economy rates in the powerplay (overs 1â€“6). MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-economy
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:powerplay-economy
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-economy
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

# Best powerplay economy

## Summary

Lowest bowling economy rates in the powerplay (overs 1â€“6).

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 18 legal deliveries bowled in overs 1â€“6.

## Metric Definition

Runs conceded per over in overs 1–6. Formula: (pp_runs / pp_balls) × 6.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-economy](https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-economy)

## Top 10 — Best powerplay economy

| Rank | Player | Team | PP econ (RPO) | Sample |
|------|--------|------|---------------|--------|
| 1 | Rashid Khan | MI New York | 4.31 | 78 legal deliveries in powerplay |
| 2 | MW Short | San Francisco Unicorns, Washington Freedom | 5.22 | 54 legal deliveries in powerplay |
| 3 | AJ Hosein | Texas Super Kings, Washington Freedom | 5.57 | 84 legal deliveries in powerplay |
| 4 | LH Ferguson | Los Angeles Knight Riders, Washington Freedom | 5.73 | 66 legal deliveries in powerplay |
| 5 | NP Kenjige | MI New York | 5.94 | 108 legal deliveries in powerplay |
| 6 | K Rabada | MI New York | 6.00 | 48 legal deliveries in powerplay |
| 7 | AF Milne | Texas Super Kings | 6.18 | 66 legal deliveries in powerplay |
| 8 | DR Sams | Texas Super Kings | 6.22 | 54 legal deliveries in powerplay |
| 9 | M Jansen | Washington Freedom | 6.44 | 192 legal deliveries in powerplay |
| 10 | Harmeet Singh | Seattle Orcas | 6.67 | 72 legal deliveries in powerplay |

*Full leaderboard (66 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-economy).*

## What Agents Should Know

- When ranking bowlers, apply the sample-size floor stated in `floorNote`. Economy and average require minimum balls bowled to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 18 legal deliveries bowled in overs 1â€“6.
- Metric definition: Runs conceded per over in overs 1–6. Formula: (pp_runs / pp_balls) × 6.
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
