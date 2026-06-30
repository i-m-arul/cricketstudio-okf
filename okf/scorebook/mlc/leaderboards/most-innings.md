---
type: leaderboard
title: "Most innings batted"
description: "Most innings batted across all captured MLC matches. A volume metric for high-frequency batters. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/most-innings
status: active
last_verified: 2026-06-21
timestamp: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:most-innings
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/most-innings
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

# Most innings batted

## Summary

Most innings batted across all captured MLC matches. A volume metric for high-frequency batters.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Counting stat â€” no minimum sample floor.

## Metric Definition

Count of batting innings across all MLC matches.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/most-innings](https://players.cricketstudio.ai/leagues/mlc/leaderboards/most-innings)

## Top 10 — Most innings batted

| Rank | Player | Team | Innings | Sample |
|------|--------|------|---------|--------|
| 1 | N Pooran | MI New York | 28 | 640 balls faced |
| 2 | MD Patel | MI New York | 26 | 523 balls faced |
| 3 | Q de Kock | MI New York, Seattle Orcas | 26 | 569 balls faced |
| 4 | F du Plessis | Texas Super Kings | 25 | 571 balls faced |
| 5 | AGS Gous | Washington Freedom | 24 | 389 balls faced |
| 6 | KA Pollard | MI New York | 24 | 309 balls faced |
| 7 | FH Allen | San Francisco Unicorns | 23 | 354 balls faced |
| 8 | H Klaasen | Seattle Orcas | 22 | 305 balls faced |
| 9 | MP Stoinis | San Francisco Unicorns, Texas Super Kings | 20 | 230 balls faced |
| 10 | AD Russell | Los Angeles Knight Riders | 19 | 297 balls faced |

*Full leaderboard (100 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/most-innings).*

## What Agents Should Know

- When ranking batters, apply the sample-size floor stated in `floorNote`. Rate metrics (SR, average) require minimum balls/innings to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Counting stat â€” no minimum sample floor.
- Metric definition: Count of batting innings across all MLC matches.
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
