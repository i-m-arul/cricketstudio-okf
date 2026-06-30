---
type: leaderboard
title: "Highest individual scores"
description: "Highest individual innings scores across captured MLC matches. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/top-knocks
status: active
last_verified: 2026-06-21
timestamp: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:top-knocks
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/top-knocks
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

# Highest individual scores

## Summary

Highest individual innings scores across captured MLC matches.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Counting stat â€” no minimum sample floor; all qualifying appearances included.

## Metric Definition

Highest individual scores in a single MLC innings.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/top-knocks](https://players.cricketstudio.ai/leagues/mlc/leaderboards/top-knocks)

## Top 10 — Highest individual scores

| Rank | Player | Team | High score | Sample |
|------|--------|------|------------|--------|
| 1 | FH Allen | San Francisco Unicorns | 151 | 354 balls faced |
| 2 | N Pooran | MI New York | 137 | 640 balls faced |
| 3 | ADS Fletcher | Los Angeles Knight Riders | 118 | 178 balls faced |
| 4 | H Klaasen | Seattle Orcas | 110 | 305 balls faced |
| 5 | GJ Maxwell | Washington Freedom | 106 | 233 balls faced |
| 6 | F du Plessis | Texas Super Kings | 103 | 571 balls faced |
| 7 | RD Rickelton | Seattle Orcas | 103 | 152 balls faced |
| 8 | SO Hetmyer | Seattle Orcas | 97 | 207 balls faced |
| 9 | Tajinder Singh | MI New York, San Francisco Unicorns | 95 | 128 balls faced |
| 10 | MD Patel | MI New York | 93 | 523 balls faced |

*Full leaderboard (100 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/top-knocks).*

## What Agents Should Know

- When ranking batters, apply the sample-size floor stated in `floorNote`. Rate metrics (SR, average) require minimum balls/innings to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Counting stat â€” no minimum sample floor; all qualifying appearances included.
- Metric definition: Highest individual scores in a single MLC innings.
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
