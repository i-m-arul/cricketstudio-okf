---
type: dossier
title: "J Little — MLC phase analysis"
description: "J Little MLC phase breakdown (MLC 2024). Los Angeles Knight Riders. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/j-little
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/j-little
tags:
  - cricket
  - dossier
  - MLC
  - j-little
  - phase-analysis
status: active
last_verified: "2026-07-07"
timestamp: "2026-07-07"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: public_open_data
dataset_version: "2026-06-20"
provenance:
  source: Cricsheet CC BY 3.0 via CricketStudio derived claim layer
  confidence: low
  snapshot: CricketStudio MLC dataset (2026-06-20)
related:
  - ../scorebook/mlc/players/j-little.md
  - mlc-j-little-career.md
---

## User Question

> How does J Little perform across phases in MLC?

## Correct Answer Pattern

> **J Little** — MLC phase performance (MLC 2024, Los Angeles Knight Riders):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Death | Batting | 6 | — | ✗ (below 30b) |
| Powerplay | Bowling | 6 | — | ✗ (below 15b) |
| Middle | Bowling | 18 | 0W / 7.33 econ | ✓ |
>
> See phase table above for both batting and bowling phase splits.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/j-little](https://players.cricketstudio.ai/leagues/mlc/players/j-little).

## Required Concepts

- Phase floors: batting ≥30 balls, bowling ≥15 balls
- Floor-failed phases must NOT be cited as rates — only ball counts
- Season scope: MLC 2024

## Required Metrics

- Phase table above (✓ rows only are citable rates)

## Citation Behavior

1. Give the phase table with floor flags.
2. State ✓ rows explicitly; for ✗ rows, give ball count only, no rate.
3. Identify the player's strongest phase (or flagging if none meets the floor).
4. Cite Cricsheet CC BY 3.0 via CricketStudio.

## Caveats

- Phases below floor: only ball counts are citable — no rate claims.
- Season scope: MLC 2024 only.
- For live/current season data, use canonical page.

## Bad Answer (do not do this)

> "J Little has a low economy of 7.33 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [J Little career](mlc-j-little-career.md)
