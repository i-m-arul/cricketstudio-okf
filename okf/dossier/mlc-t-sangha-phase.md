---
type: dossier
title: "T Sangha — MLC phase analysis"
description: "T Sangha MLC phase breakdown (MLC 2025). Los Angeles Knight Riders. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/t-sangha
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/t-sangha
tags:
  - cricket
  - dossier
  - MLC
  - t-sangha
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
  confidence: medium
  snapshot: CricketStudio MLC dataset (2026-06-20)
related:
  - ../scorebook/mlc/players/t-sangha.md
  - mlc-t-sangha-career.md
---

## User Question

> How does T Sangha perform in each phase in MLC?

## Correct Answer Pattern

> **T Sangha** — MLC phase performance (MLC 2025, Los Angeles Knight Riders):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Death | Batting | 3 | — | ✗ (below 30b) |
| Middle | Bowling | 132 | 9W / 9.09 econ | ✓ |
>
> Best phase (economy): Middle — 9 wkts, 9.09 econ in 132 balls.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/t-sangha](https://players.cricketstudio.ai/leagues/mlc/players/t-sangha).

## Required Concepts

- Phase floors: batting ≥30 balls, bowling ≥15 balls
- Floor-failed phases must NOT be cited as rates — only ball counts
- Season scope: MLC 2025

## Required Metrics

- Phase table above (✓ rows only are citable rates)

## Citation Behavior

1. Give the phase table with floor flags.
2. State ✓ rows explicitly; for ✗ rows, give ball count only, no rate.
3. Identify the player's strongest phase (or flagging if none meets the floor).
4. Cite Cricsheet CC BY 3.0 via CricketStudio.

## Caveats

- Phases below floor: only ball counts are citable — no rate claims.
- Season scope: MLC 2025 only.
- For live/current season data, use canonical page.

## Bad Answer (do not do this)

> "T Sangha has a low economy of 9.09 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [T Sangha career](mlc-t-sangha-career.md)
