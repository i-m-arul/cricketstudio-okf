---
type: dossier
title: "Shadab Khan — MLC phase analysis"
description: "Shadab Khan MLC phase breakdown (MLC 2023). San Francisco Unicorns. Data-derived phase rates where above sample-size floor."
resource: https://players.cricketstudio.ai/leagues/mlc/players/shadab-khan
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/shadab-khan
tags:
  - cricket
  - dossier
  - MLC
  - shadab-khan
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
  - ../scorebook/mlc/players/shadab-khan.md
  - mlc-shadab-khan-career.md
---

## User Question

> How does Shadab Khan perform across phases in MLC?

## Correct Answer Pattern

> **Shadab Khan** — MLC phase performance (MLC 2023, San Francisco Unicorns):
>
| Phase | Domain | Balls | Key Stat | Floor? |
|-------|--------|-------|----------|--------|
| Powerplay | Batting | 7 | — | ✗ (below 30b) |
| Middle | Batting | 71 | 156.3 SR | ✓ |
| Death | Batting | 11 | — | ✗ (below 30b) |
| Powerplay | Bowling | 12 | — | ✗ (below 15b) |
| Middle | Bowling | 84 | 5W / 8.29 econ | ✓ |
| Death | Bowling | 6 | — | ✗ (below 15b) |
>
> See phase table above for both batting and bowling phase splits.
>
> ✓ = above sample-size floor; ✗ = below floor, rate not citable.
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [https://players.cricketstudio.ai/leagues/mlc/players/shadab-khan](https://players.cricketstudio.ai/leagues/mlc/players/shadab-khan).

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

> "Shadab Khan has a low economy of 8.29 in all phases equally." *(Economy and SR vary by phase. Always cite phase-specific figures and include ball counts.)*

## Related Concepts

- [MLC corpus overview](mlc-corpus-overview.md)
- [MLC leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
- [Shadab Khan career](mlc-shadab-khan-career.md)
