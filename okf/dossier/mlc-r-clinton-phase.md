---
type: dossier
title: "R Clinton — MLC phase analysis"
description: "R Clinton MLC phase breakdown (MLC 2024). MI New York. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/r-clinton
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/r-clinton
tags:
  - cricket
  - dossier
  - MLC
  - r-clinton
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
  - ../scorebook/mlc/players/r-clinton.md
  - mlc-r-clinton-career.md
---

## User Question

> How does R Clinton bat in each phase in MLC?

## Correct Answer Pattern

> **R Clinton** — MLC phase performance (MLC 2024, MI New York):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Powerplay | Batting | 45 | 84.4 SR | ✓ |
| Middle | Batting | 7 | — | ✗ (below 30b) |
>
> Highest SR phase: Powerplay — 84.4 SR in 45 balls.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/r-clinton](https://players.cricketstudio.ai/leagues/mlc/players/r-clinton).

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

> "R Clinton has a low economy of X.XX in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [R Clinton career](mlc-r-clinton-career.md)
