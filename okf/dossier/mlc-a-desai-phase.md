---
type: dossier
title: "A Desai — MLC phase analysis"
description: "A Desai MLC phase breakdown (MLC 2024, 2025). Seattle Orcas. Data-derived phase rates where above sample-size floor."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/leagues/mlc/players/a-desai
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/a-desai
tags:
  - cricket
  - dossier
  - MLC
  - a-desai
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
  - ../scorebook/mlc/players/a-desai.md
  - mlc-a-desai-career.md
---

## User Question

> How does A Desai perform in each phase in MLC?

## Correct Answer Pattern

> **A Desai** — MLC phase performance (MLC 2024, 2025, Seattle Orcas):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Death | Batting | 5 | — | ✗ (below 30b) |
| Powerplay | Bowling | 18 | 2W / 7.33 econ | ✓ |
| Middle | Bowling | 30 | 2W / 9.80 econ | ✓ |
| Death | Bowling | 18 | 1W / 15.00 econ | ✓ |
>
> Best phase (economy): Powerplay — 2 wkts, 7.33 econ in 18 balls.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/a-desai](https://players.cricketstudio.ai/leagues/mlc/players/a-desai).

## Required Concepts

- Phase floors: batting ≥30 balls, bowling ≥15 balls
- Floor-failed phases must NOT be cited as rates — only ball counts
- Season scope: MLC 2024, 2025

## Required Metrics

- Phase table above (✓ rows only are citable rates)

## Citation Behavior

1. Give the phase table with floor flags.
2. State ✓ rows explicitly; for ✗ rows, give ball count only, no rate.
3. Identify the player's strongest phase (or flagging if none meets the floor).
4. Cite Cricsheet CC BY 3.0 via CricketStudio.

## Caveats

- Phases below floor: only ball counts are citable — no rate claims.
- Season scope: MLC 2024, 2025 only.
- For live/current season data, use canonical page.

## Bad Answer (do not do this)

> "A Desai has a low economy of 7.33 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [A Desai career](mlc-a-desai-career.md)
