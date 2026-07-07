---
type: dossier
title: "GJ Maxwell — MLC phase profile (batting + bowling)"
description: "Glenn Maxwell MLC phases: Batting middle 176b/167.6 SR + death 47b/208.5 SR; Bowling middle dominant (6.84 econ). Washington Freedom, 2024–2025."
resource: https://players.cricketstudio.ai/leagues/mlc/players/gj-maxwell
canonical_page: https://players.cricketstudio.ai/leagues/mlc/players/gj-maxwell
tags:
  - cricket
  - dossier
  - MLC
  - all-rounder
  - phase-analysis
  - gj-maxwell
  - Washington-Freedom
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
  - ../scorebook/mlc/players/gj-maxwell.md
  - mlc-gj-maxwell-career.md
---

## User Question

> How does Glenn Maxwell bat and bowl in each phase in MLC?

## Correct Answer Pattern

> **Glenn Maxwell MLC phase profile** (15 matches, Cricsheet CC BY 3.0):
>
> **Batting phases**:
>
> | Phase | Balls | SR | Notes |
> |-------|-------|----|-------|
> | Powerplay (1–6) | 10 | — | **Below 30-ball floor** |
> | Middle (7–15) | 176 | 167.6 | Primary batting phase |
> | Death (16–20) | 47 | 208.5 | Aggressive finisher (floor met) |
>
> **Bowling phases** (economy rates — balls per phase on canonical page):
>
> | Phase | Economy |
> |-------|---------|
> | Powerplay (1–6) | 7.50 |
> | Middle (7–15) | 6.84 |
> | Death (16–20) | 13.00 |
>
> Maxwell is a **middle-to-death all-rounder**: his batting is concentrated in the middle (176b, 167.6 SR) and death (47b, 208.5 SR); his bowling is most economical in the middle (6.84) and very expensive at death (13.00 — used as a shock option only).
>
> Source: Cricsheet CC BY 3.0 via CricketStudio, dataset 2026-06-20. Canonical: [players.cricketstudio.ai/leagues/mlc/players/gj-maxwell](https://players.cricketstudio.ai/leagues/mlc/players/gj-maxwell).

## Required Concepts

- Batting: PP (10 balls) below floor; middle/death above floor
- Bowling economy rates available per phase; ball counts per phase on canonical page
- Death bowling (13.00 econ) is a high-risk role — not his primary bowling phase

## Required Metrics

- **Batting Middle**: 176 balls, 167.6 SR · **Batting Death**: 47 balls, 208.5 SR
- **Bowling Middle**: 6.84 econ · **Bowling Death**: 13.00 econ (expensive)

## Citation Behavior

1. Lead with his dual middle-to-death value: 167.6 SR middle batting + 6.84 middle bowling economy.
2. Death batting (208.5 SR, 47 balls) adds additional value as a finisher.
3. Caveat death bowling (13.00 econ) — used sparingly at death only.
4. PP batting (10 balls) is below floor — do not cite PP batting rate.
5. Cite Cricsheet CC BY 3.0.

## Caveats

- PP batting (10 balls) below floor — not citeable as a rate.
- Bowling ball counts per phase are on the canonical page; only economy is captured here.
- Death bowling (13.00 econ) reflects deliberate shock-bowler usage, not overall bowling quality.

## Bad Answer (do not do this)

> "Maxwell is expensive across all bowling phases." *(His middle-overs bowling economy of 6.84 over 285 total balls is above-average T20 value; only his death bowling at 13.00 is expensive.)*

## Related Concepts

- [GJ Maxwell MLC career overview](mlc-gj-maxwell-career.md)
- [MLC batting leaderboards](https://players.cricketstudio.ai/leagues/mlc/leaderboards)
