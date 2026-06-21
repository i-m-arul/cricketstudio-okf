---
type: leaderboard
title: "Best bowling averages"
description: "Lowest bowling averages across captured MLC matches (runs per wicket). MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-average
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:bowling-average
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-average
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

# Best bowling averages

## Summary

Lowest bowling averages across captured MLC matches (runs per wicket).

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 90 legal deliveries bowled.

## Metric Definition

Runs conceded per wicket taken. Formula: runs_conceded / wickets.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-average](https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-average)

## Top 10 — Best bowling averages

| Rank | Player | Team | Bowling avg | Sample |
|------|--------|------|-------------|--------|
| 1 | KS Gattepalli | Los Angeles Knight Riders | 10.33 | 24 legal deliveries bowled |
| 2 | AF Milne | Texas Super Kings | 10.57 | 125 legal deliveries bowled |
| 3 | SV Wiig | Texas Super Kings | 12.50 | 18 legal deliveries bowled |
| 4 | R Ravindra | Washington Freedom | 12.69 | 169 legal deliveries bowled |
| 5 | OEG Baartman | Texas Super Kings | 15.25 | 48 legal deliveries bowled |
| 6 | AJ Hosein | Texas Super Kings, Washington Freedom | 16.05 | 264 legal deliveries bowled |
| 7 | LH Ferguson | Los Angeles Knight Riders, Washington Freedom | 17.19 | 248 legal deliveries bowled |
| 8 | MC Henriques | Washington Freedom | 17.20 | 69 legal deliveries bowled |
| 9 | A Zampa | Los Angeles Knight Riders | 17.44 | 114 legal deliveries bowled |
| 10 | AJ Tye | Seattle Orcas, Washington Freedom | 17.69 | 180 legal deliveries bowled |

*Full leaderboard (91 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-average).*

## What Agents Should Know

- When ranking bowlers, apply the sample-size floor stated in `floorNote`. Economy and average require minimum balls bowled to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 90 legal deliveries bowled.
- Metric definition: Runs conceded per wicket taken. Formula: runs_conceded / wickets.
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
