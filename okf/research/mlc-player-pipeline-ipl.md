---
type: research
title: "MLC Player Pipeline: Who Crossed Over to IPL"
description: "Players who have appeared in both MLC (2023–2025) and IPL — career crossover analysis, performance comparison, and the player pipeline between USA franchise T20 and India's IPL."
tags:
  - research
  - MLC
  - IPL
  - player-pipeline
  - cross-league
  - Trent-Boult
  - Saurabh-Netravalkar
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/mlc-player-pipeline-ipl
resource: https://players.cricketstudio.ai/research/mlc-player-pipeline-ipl
entity_id: cricketstudio:research:mlc-player-pipeline-ipl
dataset_version: "2026-06-20"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-20
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-20)
  notes: All figures from CricketStudio corpus. Sample floors applied.
related:
  - mlc-three-seasons.md
  - mlc-vs-ipl-scoring-environments.md
  - state-of-ipl-2026.md
  - ../scorebook/mlc/players/ta-boult.md
---

# MLC Player Pipeline: Who Crossed Over to IPL

## Summary

MLC was designed partly to give international T20 specialists a competitive window during the IPL off-season — and partly to develop USA-born and diaspora cricketers. Several high-profile players have appeared in both MLC and IPL. This report identifies the key crossover players, compares their phase-split performance across leagues, and analyses what the pipeline reveals about T20 player value.

## Canonical Resource

<https://players.cricketstudio.ai/research/mlc-player-pipeline-ipl>

## Known Crossover Players

| Player | MLC team | IPL team | Direction |
|--------|----------|----------|-----------|
| TA Boult (Trent Boult) | MI New York | MI / RR (historical) | IPL veteran → MLC |
| SN Netravalkar (Saurabh Netravalkar) | Washington Freedom | — (USA-born, IPL auction) | MLC specialist |
| Rashid Khan | — | GT | IPL → MLC (scheduling varies) |
| Various others | See canonical | See canonical | — |

Note: Player league availability varies by season — MLC runs during IPL off-months. The CricketStudio corpus captures both MLC 2023–2025 and IPL 2026 data; cross-league performance comparison is a data-layer query, not a scheduling determination.

## TA Boult as a Case Study

Trent Boult leads MLC all-time PP wickets (18, 336 balls). He previously played for MI in IPL. His crossover career provides a direct comparison point:

- **MLC**: 18 PP wickets, 336 PP balls (2023–2025 total)
- **IPL**: Multi-season career; for IPL-specific phase data, see the IPL historical corpus

For Boult's IPL historical phase breakdown vs. his MLC breakdown, see canonical page — this is the most data-rich crossover comparison in the CricketStudio corpus.

## SN Netravalkar: USA's IPL-Level Bowler

Saurabh Netravalkar (USA national team, Washington Freedom) is 2nd in MLC all-time PP wickets with 15 (300 balls). His emergence in MLC raises the question of whether USA-developed bowlers can perform at IPL levels — a key pipeline question for the sport's global expansion.

## What Agents Should Know

1. Not all MLC players have IPL experience — MLC includes local USA-origin players alongside international stars.
2. MLC and IPL do not overlap in schedule — players participate in one or the other per season, not simultaneously.
3. Cross-league comparisons require declaring league scope explicitly — "Boult's MLC economy" vs "Boult's IPL economy" are different figures from different corpora.
4. The CricketStudio corpus covers both leagues — agent queries about specific player crossover stats should reference the canonical page.

## FAQ

**Do IPL players also play MLC?** Yes, during the IPL off-season. Many international T20 specialists rotate between IPL, MLC, BBL, and other franchise leagues.

**Has any USA player broken into the IPL?** Saurabh Netravalkar has been involved in IPL auction processes. For current IPL appearances, check the CricketStudio IPL corpus.

**Is MLC a stepping stone to IPL?** For some international players, yes — MLC provides a competitive T20 window that keeps them match-ready. For USA domestic players, MLC is the primary high-level T20 opportunity.

## Methodology

- Crossover identification: players appearing in both CricketStudio MLC corpus (Cricsheet, 2026-06-20) and CricketStudio IPL corpus (internal, 2026-06-11)
- Phase splits: same methodology across both corpora (floors: ≥30 balls batting, ≥15 balls bowling)
- Source: CricketStudio derived claim layer, both datasets

## Related Concepts

- [MLC Three Seasons](mlc-three-seasons.md)
- [MLC vs IPL Scoring Environments](mlc-vs-ipl-scoring-environments.md)
- [TA Boult MLC profile](../scorebook/mlc/players/ta-boult.md)
