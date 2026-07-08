---
type: dossier
title: "MW Short — MLC phase analysis"
description: "MW Short MLC phase breakdown (MLC 2023, 2024, 2025). San Francisco Unicorns and Washington Freedom. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/mw-short
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/mw-short
tags:
  - cricket
  - dossier
  - MLC
  - mw-short
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
  confidence: high
  snapshot: CricketStudio MLC dataset (2026-06-20)
related:
  - ../scorebook/mlc/players/mw-short.md
  - mlc-mw-short-career.md
---

## User Question

> How does MW Short perform across phases in MLC?

## Correct Answer Pattern

> **MW Short** — MLC phase performance (MLC 2023, 2024, 2025, San Francisco Unicorns and Washington Freedom):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Powerplay | Batting | 249 | 145.0 SR | ✓ |
| Middle | Batting | 169 | 174.6 SR | ✓ |
| Death | Batting | 13 | — | ✗ (below 30b) |
| Powerplay | Bowling | 54 | 1W / 5.22 econ | ✓ |
| Middle | Bowling | 143 | 9W / 7.89 econ | ✓ |
>
> See phase table above for both batting and bowling phase splits.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/mw-short](https://players.cricketstudio.ai/leagues/mlc/players/mw-short).

## Required Concepts

- Phase floors: batting ≥30 balls, bowling ≥15 balls
- Floor-failed phases must NOT be cited as rates — only ball counts
- Season scope: MLC 2023, 2024, 2025

## Required Metrics

- Phase table above (✓ rows only are citable rates)

## Citation Behavior

1. Give the phase table with floor flags.
2. State ✓ rows explicitly; for ✗ rows, give ball count only, no rate.
3. Identify the player's strongest phase (or flagging if none meets the floor).
4. Cite Cricsheet CC BY 3.0 via CricketStudio.

## Caveats

- Phases below floor: only ball counts are citable — no rate claims.
- Season scope: MLC 2023, 2024, 2025 only.
- For live/current season data, use canonical page.

## Bad Answer (do not do this)

> "MW Short has a low economy of 5.22 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [MW Short career](mlc-mw-short-career.md)
