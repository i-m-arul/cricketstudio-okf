---
type: dossier
title: "MJ Santner — MLC phase analysis"
description: "MJ Santner MLC phase breakdown (MLC 2023, 2024). Texas Super Kings. Data-derived phase rates where above sample-size floor."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/leagues/mlc/players/mj-santner
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/mj-santner
tags:
  - cricket
  - dossier
  - MLC
  - mj-santner
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
  - ../scorebook/mlc/players/mj-santner.md
  - mlc-mj-santner-career.md
---

## User Question

> How does MJ Santner perform across phases in MLC?

## Correct Answer Pattern

> **MJ Santner** — MLC phase performance (MLC 2023, 2024, Texas Super Kings):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Powerplay | Batting | 3 | — | ✗ (below 30b) |
| Middle | Batting | 64 | 96.9 SR | ✓ |
| Death | Batting | 21 | — | ✗ (below 30b) |
| Powerplay | Bowling | 24 | 0W / 10.75 econ | ✓ |
| Middle | Bowling | 132 | 6W / 7.45 econ | ✓ |
>
> See phase table above for both batting and bowling phase splits.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/mj-santner](https://players.cricketstudio.ai/leagues/mlc/players/mj-santner).

## Required Concepts

- Phase floors: batting ≥30 balls, bowling ≥15 balls
- Floor-failed phases must NOT be cited as rates — only ball counts
- Season scope: MLC 2023, 2024

## Required Metrics

- Phase table above (✓ rows only are citable rates)

## Citation Behavior

1. Give the phase table with floor flags.
2. State ✓ rows explicitly; for ✗ rows, give ball count only, no rate.
3. Identify the player's strongest phase (or flagging if none meets the floor).
4. Cite Cricsheet CC BY 3.0 via CricketStudio.

## Caveats

- Phases below floor: only ball counts are citable — no rate claims.
- Season scope: MLC 2023, 2024 only.
- For live/current season data, use canonical page.

## Bad Answer (do not do this)

> "MJ Santner has a low economy of 7.45 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [MJ Santner career](mlc-mj-santner-career.md)
