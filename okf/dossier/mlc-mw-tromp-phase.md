---
type: dossier
title: "MW Tromp — MLC phase analysis"
description: "MW Tromp MLC phase breakdown (MLC 2025). Los Angeles Knight Riders. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/mw-tromp
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/mw-tromp
tags:
  - cricket
  - dossier
  - MLC
  - mw-tromp
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
  - ../scorebook/mlc/players/mw-tromp.md
  - mlc-mw-tromp-career.md
---

## User Question

> How does MW Tromp bat in each phase in MLC?

## Correct Answer Pattern

> **MW Tromp** — MLC phase performance (MLC 2025, Los Angeles Knight Riders):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Middle | Batting | 45 | 115.6 SR | ✓ |
| Death | Batting | 12 | — | ✗ (below 30b) |
| Middle | Bowling | 6 | — | ✗ (below 15b) |
>
> Highest SR phase: Middle — 115.6 SR in 45 balls.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/mw-tromp](https://players.cricketstudio.ai/leagues/mlc/players/mw-tromp).

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

> "MW Tromp has a low economy of X.XX in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [MW Tromp career](mlc-mw-tromp-career.md)
