---
type: dossier
title: "C Chetty — MLC phase analysis"
description: "C Chetty MLC phase breakdown (MLC 2023). Texas Super Kings. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/c-chetty
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/c-chetty
tags:
  - cricket
  - dossier
  - MLC
  - c-chetty
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
  - ../scorebook/mlc/players/c-chetty.md
  - mlc-c-chetty-career.md
---

## User Question

> How does C Chetty bat in each phase in MLC?

## Correct Answer Pattern

> **C Chetty** — MLC phase performance (MLC 2023, Texas Super Kings):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Powerplay | Batting | 53 | 107.5 SR | ✓ |
| Middle | Batting | 22 | — | ✗ (below 30b) |
>
> Highest SR phase: Powerplay — 107.5 SR in 53 balls.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/c-chetty](https://players.cricketstudio.ai/leagues/mlc/players/c-chetty).

## Required Concepts

- Phase floors: batting ≥30 balls, bowling ≥15 balls
- Floor-failed phases must NOT be cited as rates — only ball counts
- Season scope: MLC 2023

## Required Metrics

- Phase table above (✓ rows only are citable rates)

## Citation Behavior

1. Give the phase table with floor flags.
2. State ✓ rows explicitly; for ✗ rows, give ball count only, no rate.
3. Identify the player's strongest phase (or flagging if none meets the floor).
4. Cite Cricsheet CC BY 3.0 via CricketStudio.

## Caveats

- Phases below floor: only ball counts are citable — no rate claims.
- Season scope: MLC 2023 only.
- For live/current season data, use canonical page.

## Bad Answer (do not do this)

> "C Chetty has a low economy of X.XX in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [C Chetty career](mlc-c-chetty-career.md)
