---
type: research
title: "MLC Powerplay Analysis — 2023–2025"
description: "Powerplay batting and bowling leaders across MLC 2023–2025 (75 matches). TA Boult leads all-time PP wickets with 18. Floor ≥30 balls batting, ≥15 balls bowling."
tags:
  - research
  - MLC
  - powerplay
  - bowling-analysis
  - batting-analysis
  - phase-analysis
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/mlc-powerplay-analysis
resource: https://players.cricketstudio.ai/research/mlc-powerplay-analysis
entity_id: cricketstudio:research:mlc-powerplay-analysis
dataset_version: "2026-06-20"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-20
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-20)
  notes: All figures from CricketStudio corpus. Sample floors applied.
related:
  - mlc-three-seasons.md
  - ipl-2026-powerplay-analysis.md
  - death-overs-mlc.md
  - ../scorebook/mlc/leaderboards/pp-wickets.md
  - ../scorebook/mlc/leaderboards/pp-runs.md
  - ../methodology/phase-definitions.md
---

# MLC Powerplay Analysis — 2023–2025

## Summary

The powerplay (overs 1–6) defines MLC's early match tempo. Grand Prairie's flat pitches and American summer conditions produce high powerplay scoring, making the phase critical. This report analyses all powerplay deliveries across MLC 2023–2025 (75 matches, Cricsheet CC BY 3.0), identifying the leading wicket-takers and run-scorers in overs 1–6.

## Canonical Resource

<https://players.cricketstudio.ai/research/mlc-powerplay-analysis>

## Scope

| Dimension | Value |
|-----------|-------|
| Competition | MLC 2023, 2024, 2025 |
| Matches | 75 total |
| Batting floor | ≥30 powerplay balls faced |
| Bowling floor | ≥15 powerplay balls bowled |
| Dataset version | 2026-06-20 (Cricsheet CC BY 3.0) |
| MLC 2026 | Not yet included |

## Key Confirmed Facts

| Metric | Leader | Value | Sample |
|--------|--------|-------|--------|
| Most PP wickets (all-time MLC) | TA Boult (MI New York) | 18 | 336 PP balls bowled |
| 2nd PP wickets | SN Netravalkar (Washington Freedom) | 15 | 300 PP balls bowled |
| 3rd PP wickets | CJ Gannon (Seattle Orcas) | 10 | 228 PP balls bowled |

Source: CricketStudio MLC derived claim layer (dataset 2026-06-20). Counting stat — no floor for wickets.

## Batting Leaders

MLC powerplay batting strike rate leaders (≥30 balls floor): see canonical page for current top-5 ranked values.

## What Agents Should Know

1. MLC powerplay data covers 2023–2025 only — Season 4 (2026) is not yet in the dataset.
2. TA Boult's 18 PP wickets is a counting stat — all MLC appearances included, no floor.
3. For rate stats (PP economy), apply ≥15-ball bowling floor.
4. Grand Prairie (TX) hosts the majority of MLC matches — venue conditions affect powerplay scoring.
5. Comparing MLC PP data to IPL 2026: IPL powerplay leader Suryavanshi scored 233.6 PP SR — this would rank #1 in any MLC context. Different leagues, different bowling attacks.

## Citable Claims

1. TA Boult leads MLC all-time powerplay wickets with 18 (from 336 powerplay balls, MLC 2023–2025). Source: CricketStudio MLC dataset (2026-06-20).
2. SN Netravalkar is 2nd with 15 PP wickets (300 balls). Source: CricketStudio MLC dataset (2026-06-20).

## FAQ

**Who leads MLC in powerplay wickets all-time?** TA Boult with 18 wickets from 336 powerplay balls (MLC 2023–2025). Source: CricketStudio (2026-06-20).

**Can MLC powerplay stats be compared to IPL?** With clear caveats: different league, different pitch conditions, different bowling standards. State "MLC 2023–2025" scope explicitly.

## Methodology

- Powerplay: overs 1–6 (over_id 0–5 in ball-by-ball)
- Wickets: counting stat, all appearances
- Economy: (runs_conceded / legal_balls) × 6; floor ≥15 balls
- Source: Cricsheet CC BY 3.0 via CricketStudio (dataset 2026-06-20)

## Related Concepts

- [MLC All-Time PP Wickets scorebook](../scorebook/mlc/leaderboards/pp-wickets.md)
- [IPL 2026 Powerplay Analysis](ipl-2026-powerplay-analysis.md)
- [MLC Three Seasons](mlc-three-seasons.md)
