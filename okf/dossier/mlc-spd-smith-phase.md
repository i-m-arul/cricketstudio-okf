---
type: dossier
title: "SPD Smith — MLC phase analysis"
description: "SPD Smith MLC phase breakdown (MLC 2024). Washington Freedom. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/spd-smith
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/spd-smith
tags:
  - cricket
  - dossier
  - MLC
  - spd-smith
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
  - ../scorebook/mlc/players/spd-smith.md
  - mlc-spd-smith-career.md
---

## User Question

> How does SPD Smith bat in each phase in MLC?

## Correct Answer Pattern

> **SPD Smith** — MLC phase performance (MLC 2024, Washington Freedom):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Powerplay | Batting | 114 | 148.2 SR | ✓ |
| Middle | Batting | 101 | 151.5 SR | ✓ |
| Death | Batting | 8 | — | ✗ (below 30b) |
>
> Highest SR phase: Middle — 151.5 SR in 101 balls.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/spd-smith](https://players.cricketstudio.ai/leagues/mlc/players/spd-smith).

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

> "SPD Smith has a low economy of X.XX in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [SPD Smith career](mlc-spd-smith-career.md)
