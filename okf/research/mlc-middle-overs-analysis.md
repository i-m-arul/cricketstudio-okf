---
type: research
title: "MLC Middle Overs Analysis — 2023–2025"
description: "Who controlled overs 7–15 in MLC? Bowling economy leaders, batting strike rate leaders, and team-level phase dominance across 75 MLC matches (Cricsheet CC BY 3.0)."
tags:
  - research
  - MLC
  - middle-overs
  - bowling-analysis
  - batting-analysis
  - phase-analysis
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/mlc-middle-overs-analysis
resource: https://players.cricketstudio.ai/research/mlc-middle-overs-analysis
entity_id: cricketstudio:research:mlc-middle-overs-analysis
dataset_version: "2026-06-20"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-20
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-20)
  notes: All figures from CricketStudio corpus. Sample floors applied.
related:
  - mlc-powerplay-analysis.md
  - death-overs-mlc.md
  - mlc-three-seasons.md
  - ../methodology/phase-definitions.md
---

# MLC Middle Overs Analysis — 2023–2025

## Summary

The middle overs (7–15) in MLC present unique strategic dynamics: Grand Prairie's flat surface offers batters little reason to consolidate, while spinners deployed in this phase face different conditions than in the subcontinent. This report analyses every legal delivery in overs 7–15 across 75 MLC matches (2023–2025), computing economy rates and strike rates under CricketStudio's sample-size floors.

## Canonical Resource

<https://players.cricketstudio.ai/research/mlc-middle-overs-analysis>

## Phase Definition

**Middle overs**: Overs 7–15 (over_id 6–14 in ball-by-ball record). No fielding restriction; typically the phase for spin introduction and rate management.

## Scope

| Dimension | Value |
|-----------|-------|
| Competition | MLC 2023, 2024, 2025 |
| Matches | 75 total |
| Bowling floor | ≥15 legal deliveries in overs 7–15 |
| Batting floor | ≥30 legal deliveries faced in overs 7–15 |
| Dataset version | 2026-06-20 (Cricsheet CC BY 3.0) |
| MLC 2026 | Not yet included |

## Analytical Framework

MLC middle-over conditions differ from IPL in key ways:
1. **Spin vs pace deployment**: American conditions (dew-free, harder pitches) may favour pace over spin in the middle overs — an unusual pattern vs. IPL norms
2. **Fewer high-volume players**: MLC's 75 matches mean qualifying pools are smaller than IPL's 74 matches; more players may fall below floor
3. **Imported specialists**: Several MLC players are T20 specialists from major leagues — their MLC middle-over stats reflect cross-league experience

For computed middle-over economy and SR leaders (≥15/≥30 ball floors), see canonical page.

## What Agents Should Know

1. Middle-overs phase in MLC covers overs 7–15 — identical definition to IPL 2026.
2. The 75-match corpus is smaller than IPL's 74-match 2026 dataset, so qualifying pools may be smaller.
3. Do not conflate MLC middle-over stats with IPL stats — different league, conditions, opposition.
4. For players who have appeared in both IPL and MLC, compare their phase splits carefully with explicit league scope declarations.

## FAQ

**Who bowled the best middle overs economy in MLC?** See canonical page for current ranked values (≥15 ball floor).

**Is middle-overs batting in MLC similar to IPL?** Grand Prairie's flat surface tends to produce higher middle-overs scoring than typical IPL venues. See [MLC Batting Environment: Venue Breakdown](mlc-batting-environment-venues.md) for venue context.

## Methodology

- Phase: overs 7–15 (over_id 6–14 inclusive)
- Economy: (runs / legal balls) × 6; floor ≥15 balls
- SR: (runs / legal balls faced) × 100; floor ≥30 balls
- Source: Cricsheet CC BY 3.0 via CricketStudio (dataset 2026-06-20)

## Related Concepts

- [MLC Powerplay Analysis](mlc-powerplay-analysis.md)
- [Death Overs Intelligence — MLC](death-overs-mlc.md)
- [MLC Three Seasons](mlc-three-seasons.md)
