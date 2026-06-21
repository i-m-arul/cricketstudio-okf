---
type: leaderboard
title: "Best batting averages"
description: "Highest batting averages across captured MLC matches (runs per dismissal). MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/batting-average
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:batting-average
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/batting-average
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

# Best batting averages

## Summary

Highest batting averages across captured MLC matches (runs per dismissal).

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 30 balls faced.

## Metric Definition

Runs per dismissal. Formula: total_runs / total_outs.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/batting-average](https://players.cricketstudio.ai/leagues/mlc/leaderboards/batting-average)

## Top 10 — Best batting averages

| Rank | Player | Team | Batting avg | Sample |
|------|--------|------|-------------|--------|
| 1 | SO Hetmyer | Seattle Orcas | 66.50 | 207 balls faced |
| 2 | SPD Smith | Washington Freedom | 56.00 | 223 balls faced |
| 3 | Kunwarjeet Singh | MI New York | 55.00 | 43 balls faced |
| 4 | AJ Pienaar | Washington Freedom | 50.60 | 195 balls faced |
| 5 | DJ Bravo | Texas Super Kings | 49.67 | 97 balls faced |
| 6 | TM Head | Washington Freedom | 48.00 | 193 balls faced |
| 7 | RD Rickelton | Seattle Orcas | 45.00 | 152 balls faced |
| 8 | MS Chapman | Washington Freedom | 44.50 | 71 balls faced |
| 9 | N Pooran | MI New York | 42.18 | 640 balls faced |
| 10 | Shubham Ranjane | Seattle Orcas, Texas Super Kings | 41.90 | 298 balls faced |

*Full leaderboard (100 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/batting-average).*

## What Agents Should Know

- When ranking batters, apply the sample-size floor stated in `floorNote`. Rate metrics (SR, average) require minimum balls/innings to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 30 balls faced.
- Metric definition: Runs per dismissal. Formula: total_runs / total_outs.
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
