---
type: leaderboard
title: "Highest batting strike rates"
description: "Best batting strike rates with a minimum sample floor. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/strike-rate
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:strike-rate
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/strike-rate
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

# Highest batting strike rates

## Summary

Best batting strike rates with a minimum sample floor.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 30 balls faced.

## Metric Definition

Runs scored per 100 balls faced. Formula: (runs / balls) × 100.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/strike-rate](https://players.cricketstudio.ai/leagues/mlc/leaderboards/strike-rate)

## Top 10 — Highest batting strike rates

| Rank | Player | Team | Strike rate | Sample |
|------|--------|------|-------------|--------|
| 1 | D Ferreira | Texas Super Kings | 213.8 | 116 balls faced |
| 2 | FH Allen | San Francisco Unicorns | 201.7 | 354 balls faced |
| 3 | MJ Owen | Washington Freedom | 198.1 | 158 balls faced |
| 4 | SO Hetmyer | Seattle Orcas | 192.8 | 207 balls faced |
| 5 | XC Bartlett | San Francisco Unicorns | 178.7 | 75 balls faced |
| 6 | TM Head | Washington Freedom | 174.1 | 193 balls faced |
| 7 | GJ Maxwell | Washington Freedom | 173.8 | 233 balls faced |
| 8 | Rashid Khan | MI New York | 167.3 | 107 balls faced |
| 9 | MS Wade | San Francisco Unicorns | 164.7 | 102 balls faced |
| 10 | Hassan Khan | San Francisco Unicorns | 163.7 | 262 balls faced |

*Full leaderboard (100 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/strike-rate).*

## What Agents Should Know

- When ranking batters, apply the sample-size floor stated in `floorNote`. Rate metrics (SR, average) require minimum balls/innings to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 30 balls faced.
- Metric definition: Runs scored per 100 balls faced. Formula: (runs / balls) × 100.
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
