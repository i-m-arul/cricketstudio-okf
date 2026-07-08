---
type: dossier
title: "DR Sams — MLC phase analysis"
description: "DR Sams MLC phase breakdown (MLC 2023). Texas Super Kings. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/dr-sams
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/dr-sams
tags:
  - cricket
  - dossier
  - MLC
  - dr-sams
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
  - ../scorebook/mlc/players/dr-sams.md
  - mlc-dr-sams-career.md
---

## User Question

> How does DR Sams perform across phases in MLC?

## Correct Answer Pattern

> **DR Sams** — MLC phase performance (MLC 2023, Texas Super Kings):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Middle | Batting | 44 | 136.4 SR | ✓ |
| Death | Batting | 33 | 130.3 SR | ✓ |
| Powerplay | Bowling | 54 | 1W / 6.22 econ | ✓ |
| Middle | Bowling | 18 | 1W / 4.00 econ | ✓ |
| Death | Bowling | 30 | 3W / 11.20 econ | ✓ |
>
> See phase table above for both batting and bowling phase splits.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/dr-sams](https://players.cricketstudio.ai/leagues/mlc/players/dr-sams).

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

> "DR Sams has a low economy of 4.00 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [DR Sams career](mlc-dr-sams-career.md)
