---
type: leaderboard
title: "Most hundreds"
description: "Most innings scoring â‰¥100 runs across all captured MLC matches. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/most-hundreds
status: active
last_verified: 2026-06-21
timestamp: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:most-hundreds
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/most-hundreds
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

# Most hundreds

## Summary

Most innings scoring â‰¥100 runs across all captured MLC matches.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** All innings included â€” minimum 1 century to appear.

## Metric Definition

Count of innings where batter scored 100+ runs.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/most-hundreds](https://players.cricketstudio.ai/leagues/mlc/leaderboards/most-hundreds)

## Top 7 — Most hundreds

| Rank | Player | Team | Hundreds | Sample |
|------|--------|------|----------|--------|
| 1 | F du Plessis | Texas Super Kings | 3 | 25 innings |
| 2 | ADS Fletcher | Los Angeles Knight Riders | 2 | 7 innings |
| 3 | FH Allen | San Francisco Unicorns | 2 | 23 innings |
| 4 | N Pooran | MI New York | 2 | 28 innings |
| 5 | GJ Maxwell | Washington Freedom | 1 | 15 innings |
| 6 | H Klaasen | Seattle Orcas | 1 | 22 innings |
| 7 | RD Rickelton | Seattle Orcas | 1 | 6 innings |

## What Agents Should Know

- When ranking batters, apply the sample-size floor stated in `floorNote`. Rate metrics (SR, average) require minimum balls/innings to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: All innings included â€” minimum 1 century to appear.
- Metric definition: Count of innings where batter scored 100+ runs.
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
