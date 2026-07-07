---
type: dossier
title: "Aaron Jones — MLC batting phase profile"
description: "Aaron Jones MLC phases: PP 73b/94.5 SR (below average), Middle 109b/133.0 SR (strongest phase), Death 3b (below floor). Seattle Orcas, 2024–2025."
resource: https://players.cricketstudio.ai/leagues/mlc/players/aaron-jones
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/aaron-jones
tags:
  - cricket
  - dossier
  - MLC
  - batting
  - phase-analysis
  - aaron-jones
  - Seattle-Orcas
  - middle-overs
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
  - ../scorebook/mlc/players/aaron-jones.md
  - mlc-aaron-jones-career.md
---

## User Question

> How does Aaron Jones bat in each phase in MLC?

## Correct Answer Pattern

> **Aaron Jones MLC batting phase profile** (12 matches, Cricsheet CC BY 3.0):
>
> | Phase | Balls | SR | Notes |
> |-------|-------|----|-------|
> | Powerplay (1–6) | 73 | 94.5 | Below average PP strike rate |
> | Middle (7–15) | 109 | **133.0** | Strongest phase — best SR |
> | Death (16–20) | 3 | — | **Below 30-ball floor** |
>
> Jones shows a **reverse acceleration pattern**: his PP strike rate (94.5 SR, 73 balls) is below the MLC average, but he improves significantly in the middle overs (133.0 SR, 109 balls). He is rarely used at death (3 balls — well below floor).
>
> Both PP (73 balls) and middle (109 balls) meet the ≥30-ball batting floor.
>
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [players.cricketstudio.ai/leagues/mlc/players/aaron-jones](https://players.cricketstudio.ai/leagues/mlc/players/aaron-jones).

## Required Concepts

- Reverse acceleration: PP 94.5 SR (below average) → Middle 133.0 SR (above average) — the SR improves as the innings deepens
- Death (3 balls) well below the ≥30-ball floor — not citeable
- Both PP and middle above the 30-ball floor and citeable

## Required Metrics

- **PP**: 73 balls, 94.5 SR · **Middle**: 109 balls, 133.0 SR · **Death**: 3 balls (below floor)

## Citation Behavior

1. Lead with the reverse-acceleration pattern (PP 94.5 → Middle 133.0).
2. Both phases above floor — both citeable, but flag the PP 94.5 is below typical T20 PP benchmarks.
3. Death (3 balls) well below floor — state explicitly, no rate claim.
4. Cite Cricsheet CC BY 3.0.

## Caveats

- Death (3 balls) is well below the ≥30-ball floor — do not cite death SR.
- MLC 2026 stats on canonical page only.

## Bad Answer (do not do this)

> "Aaron Jones is a powerplay specialist." *(His PP strike rate of 94.5 is below the MLC average — he is actually a middle-overs batter, not a PP specialist. His 133.0 SR in the middle is his defining phase.)*

## Related Concepts

- [Aaron Jones MLC career overview](mlc-aaron-jones-career.md)
- [MLC batting leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
