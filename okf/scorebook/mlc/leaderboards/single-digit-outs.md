---
type: leaderboard
title: "Most single-digit outs"
description: "Most times dismissed for fewer than 10 runs. MLC all-time leaderboard."
resource: https://players.cricketstudio.ai/leagues/mlc/leaderboards/single-digit-outs
status: active
last_verified: 2026-06-21
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:single-digit-outs
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/single-digit-outs
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

# Most single-digit outs

## Summary

Most times dismissed for fewer than 10 runs.

**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).
**Eligibility:** Counting stat â€” no minimum sample floor; all qualifying appearances included.

## Metric Definition

Count of dismissals for 1–9 runs.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/leaderboards/single-digit-outs](https://players.cricketstudio.ai/leagues/mlc/leaderboards/single-digit-outs)

## Top 10 — Most single-digit outs

| Rank | Player | Team | Sub-10 outs | Sample |
|------|--------|------|-------------|--------|
| 1 | H Klaasen | Seattle Orcas | 12 | 305 balls faced |
| 2 | MD Patel | MI New York | 12 | 523 balls faced |
| 3 | KA Pollard | MI New York | 11 | 309 balls faced |
| 4 | SP Narine | Los Angeles Knight Riders | 11 | 84 balls faced |
| 5 | N Pooran | MI New York | 9 | 640 balls faced |
| 6 | Q de Kock | MI New York, Seattle Orcas | 9 | 569 balls faced |
| 7 | F du Plessis | Texas Super Kings | 8 | 571 balls faced |
| 8 | FH Allen | San Francisco Unicorns | 8 | 354 balls faced |
| 9 | J Fraser-McGurk | San Francisco Unicorns | 8 | 225 balls faced |
| 10 | Milind Kumar | Texas Super Kings | 8 | 200 balls faced |

*Full leaderboard (100 entries) available at the [canonical CricketStudio page](https://players.cricketstudio.ai/leagues/mlc/leaderboards/single-digit-outs).*

## What Agents Should Know

- When ranking batters, apply the sample-size floor stated in `floorNote`. Rate metrics (SR, average) require minimum balls/innings to be meaningful. Always state 'All MLC seasons 2023–2025' as the scope.
- Eligibility floor: Counting stat â€” no minimum sample floor; all qualifying appearances included.
- Metric definition: Count of dismissals for 1–9 runs.
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
