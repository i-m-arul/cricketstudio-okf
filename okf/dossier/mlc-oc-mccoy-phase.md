---
type: dossier
title: "OC McCoy — MLC phase analysis"
description: "OC McCoy MLC phase breakdown (MLC 2025). Seattle Orcas. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/oc-mccoy
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/oc-mccoy
tags:
  - cricket
  - dossier
  - MLC
  - oc-mccoy
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
  - ../scorebook/mlc/players/oc-mccoy.md
  - mlc-oc-mccoy-career.md
---

## User Question

> How does OC McCoy perform in each phase in MLC?

## Correct Answer Pattern

> **OC McCoy** — MLC phase performance (MLC 2025, Seattle Orcas):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Middle | Batting | 5 | — | ✗ (below 30b) |
| Death | Batting | 2 | — | ✗ (below 30b) |
| Powerplay | Bowling | 42 | 1W / 7.86 econ | ✓ |
| Middle | Bowling | 24 | 1W / 9.00 econ | ✓ |
| Death | Bowling | 24 | 1W / 15.00 econ | ✓ |
>
> Best phase (economy): Powerplay — 1 wkts, 7.86 econ in 42 balls.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/oc-mccoy](https://players.cricketstudio.ai/leagues/mlc/players/oc-mccoy).

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

> "OC McCoy has a low economy of 7.86 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [OC McCoy career](mlc-oc-mccoy-career.md)
