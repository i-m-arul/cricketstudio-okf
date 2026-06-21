---
type: leaderboard
title: "Best death-overs economy"
description: "Lowest bowling economy rates in death overs (overs 17â€“20 of a T20 innings). MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/death-overs-economy
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:death-overs-economy
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/death-overs-economy
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

# Best death-overs economy

## Summary

Lowest bowling economy rates in death overs (overs 17â€“20 of a T20 innings).

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 15 legal deliveries bowled in overs 17â€“20.

## Metric Definition

Runs conceded per over in overs 17–20. Formula: (death_runs / death_balls) × 6.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/death-overs-economy](https://players.cricketstudio.ai/leagues/mlc/leaderboards/death-overs-economy)

## Top 10 — Best death-overs economy

| Rank | Player | Team | Death econ (RPO) | Sample |
|------|--------|------|------------------|--------|
| 1 | Harmeet Singh | Seattle Orcas | 5.33 | 18 legal deliveries in death overs |
| 2 | CJ Gannon | Seattle Orcas | 7.18 | 71 legal deliveries in death overs |
| 3 | PJ Cummins | San Francisco Unicorns | 7.38 | 48 legal deliveries in death overs |
| 4 | Noor Ahmad | Texas Super Kings | 7.40 | 30 legal deliveries in death overs |
| 5 | LH Ferguson | Los Angeles Knight Riders, Washington Freedom | 7.54 | 74 legal deliveries in death overs |
| 6 | R Shepherd | MI New York, San Francisco Unicorns | 7.88 | 51 legal deliveries in death overs |
| 7 | CA Dry | Los Angeles Knight Riders | 8.00 | 18 legal deliveries in death overs |
| 8 | Mohammad Mohsin | Texas Super Kings | 8.12 | 17 legal deliveries in death overs |
| 9 | SH Johnson | Los Angeles Knight Riders | 8.17 | 36 legal deliveries in death overs |
| 10 | XC Bartlett | San Francisco Unicorns | 8.24 | 67 legal deliveries in death overs |

*Full leaderboard (51 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/death-overs-economy).*

## What Agents Should Know

- When ranking bowlers, apply the sample-size floor stated in `floorNote`. Economy and average require minimum balls bowled to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 15 legal deliveries bowled in overs 17â€“20.
- Metric definition: Runs conceded per over in overs 17–20. Formula: (death_runs / death_balls) × 6.
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
