---
type: leaderboard
title: "Best bowling strike rates"
description: "Fewest balls per wicket (lower is better) across captured MLC matches. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-strike-rate
status: active
last_verified: 2026-06-21
timestamp: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:bowling-strike-rate
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-strike-rate
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

# Best bowling strike rates

## Summary

Fewest balls per wicket (lower is better) across captured MLC matches.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 90 legal deliveries bowled.

## Metric Definition

Balls bowled per wicket taken. Formula: balls_bowled / wickets.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-strike-rate](https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-strike-rate)

## Top 10 — Best bowling strike rates

| Rank | Player | Team | Balls/wkt | Sample |
|------|--------|------|-----------|--------|
| 1 | KS Gattepalli | Los Angeles Knight Riders | 8.0 | 24 legal deliveries bowled |
| 2 | AF Milne | Texas Super Kings | 8.9 | 125 legal deliveries bowled |
| 3 | SV Wiig | Texas Super Kings | 9.0 | 18 legal deliveries bowled |
| 4 | R Ravindra | Washington Freedom | 10.6 | 169 legal deliveries bowled |
| 5 | AJ Tye | Seattle Orcas, Washington Freedom | 11.3 | 180 legal deliveries bowled |
| 6 | D Potgieter | MI New York | 12.0 | 24 legal deliveries bowled |
| 7 | OEG Baartman | Texas Super Kings | 12.0 | 48 legal deliveries bowled |
| 8 | A Zampa | Los Angeles Knight Riders | 12.7 | 114 legal deliveries bowled |
| 9 | AM Hardie | Texas Super Kings | 12.8 | 51 legal deliveries bowled |
| 10 | MJ Owen | Washington Freedom | 12.9 | 180 legal deliveries bowled |

*Full leaderboard (91 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/bowling-strike-rate).*

## What Agents Should Know

- When ranking bowlers, apply the sample-size floor stated in `floorNote`. Economy and average require minimum balls bowled to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 90 legal deliveries bowled.
- Metric definition: Balls bowled per wicket taken. Formula: balls_bowled / wickets.
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
