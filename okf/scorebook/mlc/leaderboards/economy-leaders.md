---
type: leaderboard
title: "Best bowling economy rates"
description: "Lowest bowling economy rates with a minimum sample floor. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/economy-leaders
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:economy-leaders
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/economy-leaders
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

# Best bowling economy rates

## Summary

Lowest bowling economy rates with a minimum sample floor.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Minimum 15 legal deliveries bowled.

## Metric Definition

Runs conceded per over bowled. Formula: (runs / balls) × 6.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/economy-leaders](https://players.cricketstudio.ai/leagues/mlc/leaderboards/economy-leaders)

## Top 10 — Best bowling economy rates

| Rank | Player | Team | Economy (RPO) | Sample |
|------|--------|------|---------------|--------|
| 1 | Imad Wasim | Seattle Orcas | 6.41 | 247 legal deliveries bowled |
| 2 | Rashid Khan | MI New York | 6.48 | 300 legal deliveries bowled |
| 3 | SP Narine | Los Angeles Knight Riders | 6.56 | 408 legal deliveries bowled |
| 4 | LH Ferguson | Los Angeles Knight Riders, Washington Freedom | 6.65 | 248 legal deliveries bowled |
| 5 | DL Piedt | Washington Freedom | 6.69 | 78 legal deliveries bowled |
| 6 | BC Fortuin | Seattle Orcas | 6.75 | 24 legal deliveries bowled |
| 7 | AJ Hosein | Texas Super Kings, Washington Freedom | 6.93 | 264 legal deliveries bowled |
| 8 | Tajinder Singh | MI New York, San Francisco Unicorns | 7.00 | 60 legal deliveries bowled |
| 9 | AF Milne | Texas Super Kings | 7.10 | 125 legal deliveries bowled |
| 10 | J Theron | Texas Super Kings | 7.11 | 108 legal deliveries bowled |

*Full leaderboard (100 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/economy-leaders).*

## What Agents Should Know

- When ranking bowlers, apply the sample-size floor stated in `floorNote`. Economy and average require minimum balls bowled to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Minimum 15 legal deliveries bowled.
- Metric definition: Runs conceded per over bowled. Formula: (runs / balls) × 6.
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
