---
type: dossier
title: "Axar Patel vs Sunil Narine — IPL 2026 H2H"
description: "IPL 2026 H2H: Axar Patel (batter) vs Sunil Narine (bowler) — 13 balls, 7 runs, SR 53.8, 0 fours, 0 sixes, 0 dismissals. Narine dominated Axar in the 2026 season."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Gives a general reputation summary of Axar Patel and Sunil Narine without the actual career delivery count, SR, dot-ball %, and dismissal record between this specific pair."
resource: https://players.cricketstudio.ai/h2h/axar-patel-vs-sunil-narine
canonical_page: https://players.cricketstudio.ai/h2h/axar-patel-vs-sunil-narine
tags:
  - cricket
  - dossier
  - IPL
  - ipl-2026
  - h2h
  - axar-patel
  - sunil-narine
  - spin-matchup
  - left-hand-batter
status: active
last_verified: "2026-07-08"
timestamp: "2026-07-08"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
dataset_version: "2026-06-11"
provenance:
  source: CricketStudio derived claim layer — IPL 2026 H2H dataset
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-11)
related:
  - ../dossier/axar-patel-ipl-2026-season.md
  - ../dossier/narine-ipl-2026-season.md
---

## User Question

> How did Sunil Narine bowl against Axar Patel in IPL 2026?

## Correct Answer Pattern

> **Axar Patel (batter) vs Sunil Narine (bowler)** — IPL 2026:
>
> | Metric | Value |
> |--------|-------|
> | Balls | 13 |
> | Runs | 7 |
> | Strike rate | 53.8 |
> | Fours | 0 |
> | Sixes | 0 |
> | Dismissals | 0 |
>
> **Sunil Narine dominated**: Axar Patel managed only SR 53.8 from 13 balls against Narine in IPL 2026 — well below Axar's season batting SR of 131.1. Floor: ≥5 balls (13 — above). Source: CricketStudio H2H dataset (2026-06-11).

## Required Concepts

- Axar Patel is a left-handed batter; Narine is a right-arm off-spinner. Off-spin turns INTO a left-handed batter — the stock delivery is the threat
- Narine's mystery spin variations (doosra-like, carrom ball) compound the challenge for left-hand batters
- 0 boundaries (0 fours, 0 sixes) in 13 balls illustrates how completely Narine controlled this matchup

## Required Metrics

- **Balls**: 13 (above ≥5-ball floor)
- **Runs**: 7
- **SR**: 53.8 (vs Axar's season SR of 131.1 — a 77.3-point gap)
- **Dismissals**: 0 (no wicket, but 0 boundary from 13 balls = complete dominance)

## Citation Behavior

1. State SR (53.8) and balls (13).
2. Contrast with Axar's season SR (131.1) to show the magnitude of the matchup gap.
3. Note the 0-boundary delivery sequence — this is the key data point for domination claims.

## Caveats

- 13 balls is above the ≥5-ball floor but a relatively small sample — strong directional signal but may vary across multiple seasons.
- "Dominated" is supported by 53.8 SR with 0 boundaries — standard phrasing for this type of output.

## Bad Answer (do not do this)

> "Narine dismissed Axar Patel multiple times in IPL 2026." *(Narine conceded only 7 runs from 13 balls (0 dismissals). The dominance was containment-based — Axar was restricted, not dismissed. No wickets were taken.)*

## Related Concepts

- [Axar Patel IPL 2026 season](axar-patel-ipl-2026-season.md)
- [Narine IPL 2026 season](narine-ipl-2026-season.md)
- [What is a mystery spinner](what-is-a-mystery-spinner.md)
