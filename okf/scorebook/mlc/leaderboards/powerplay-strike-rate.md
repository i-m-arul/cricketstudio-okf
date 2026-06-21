---
type: leaderboard
title: "Highest powerplay strike rates"
description: "Best batting strike rates in the powerplay (overs 1â€“6 of a T20 innings). MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-strike-rate
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:powerplay-strike-rate
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-strike-rate
dataset_version: "2026-06-20"
tags:
  - cricket
  - leaderboard
  - MLC
  - T20
  - batting
provenance:
  source: Cricsheet CC BY 3.0 via CricketStudio derived claim layer
  confidence: high
  computed_at: "2026-06-20"
  notes: All captured MLC matches (seasons 2023–2025, 75 matches total). Attribution required per CC BY 3.0.
---

# Highest powerplay strike rates

## Summary

Best batting strike rates in the powerplay (overs 1â€“6 of a T20 innings).

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 30 balls faced in overs 1â€“6.

## Metric Definition

Runs scored per 100 balls faced in overs 1–6. Formula: (pp_runs / pp_balls) × 100.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-strike-rate](https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-strike-rate)

## Top 10 — Highest powerplay strike rates

| Rank | Player | Team | PP strike rate | Sample |
|------|--------|------|----------------|--------|
| 1 | MJ Owen | Washington Freedom | 194.3 | 123 balls faced in powerplay |
| 2 | MS Wade | San Francisco Unicorns | 190.3 | 72 balls faced in powerplay |
| 3 | FH Allen | San Francisco Unicorns | 188.0 | 225 balls faced in powerplay |
| 4 | R Ravindra | Washington Freedom | 187.6 | 129 balls faced in powerplay |
| 5 | TM Head | Washington Freedom | 176.2 | 126 balls faced in powerplay |
| 6 | Shubham Ranjane | Seattle Orcas, Texas Super Kings | 173.3 | 30 balls faced in powerplay |
| 7 | F du Plessis | Texas Super Kings | 165.8 | 348 balls faced in powerplay |
| 8 | N Pooran | MI New York | 160.9 | 169 balls faced in powerplay |
| 9 | J Edwards | Washington Freedom | 150.0 | 40 balls faced in powerplay |
| 10 | SPD Smith | Washington Freedom | 148.2 | 114 balls faced in powerplay |

*Full leaderboard (41 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-strike-rate).*

## What Agents Should Know

- When ranking batters, apply the sample-size floor stated in `floorNote`. Rate metrics (SR, average) require minimum balls/innings to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 30 balls faced in overs 1â€“6.
- Metric definition: Runs scored per 100 balls faced in overs 1–6. Formula: (pp_runs / pp_balls) × 100.
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
