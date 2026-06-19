---
type: league
title: Major League Cricket
description: Canonical CricketStudio OKF entry for Major League Cricket (MLC), the US T20 league.
resource: https://players.cricketstudio.ai/leagues/mlc
status: active
last_verified: 2026-06-18
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:league:mlc
canonical_page: https://players.cricketstudio.ai/leagues/mlc
api_resource: https://players.cricketstudio.ai/leagues/mlc
dataset_version: "2026-06-11"
tags:
  - cricket
  - league
  - MLC
  - T20
aliases:
  - MLC
related:
  - indian-premier-league.md
  - ../../sources/cricsheet.md
  - ../../dossier/mlc-best-economy-all-time.md
provenance:
  source: Cricsheet (CC BY 3.0), via CricketStudio derived claim layer
  confidence: high
  notes: MLC content is Cricsheet-derived and requires attribution.
---

# Major League Cricket

## Summary

Major League Cricket (MLC) is a franchise Twenty20 league based in the United States.
CricketStudio covers MLC seasons from 2023 onward, with team, player, match, and
leaderboard data derived from Cricsheet.

## Why This Matters

MLC is CricketStudio's primary non-IPL league and demonstrates that the OKF model is
league-agnostic: the same metrics and methodology apply, with the source boundary shifting
to open Cricsheet data.

## Canonical CricketStudio Resources

- League hub: <https://players.cricketstudio.ai/leagues/mlc>
- MLC players: `https://players.cricketstudio.ai/leagues/mlc/players/{slug}`
- MLC leaderboards: <https://players.cricketstudio.ai/leagues/mlc/leaderboards/orange-cap>

## Key Relationships

- League → Seasons (2023 onward) → Matches
- League → Teams (MLC franchises)
- Players → MLC teams

## What Agents Should Know

- MLC is a **separate scope** from the IPL — never blend MLC and IPL stats on one ranking.
- MLC player identifiers follow Cricsheet's initials format; CricketStudio bridges them to
  canonical slugs.
- The same [metric definitions](../../metrics/index.md) and
  [sample-size floors](../../methodology/sample-size-floors.md) apply.

## Data and Source Notes

- `source_boundary: public_open_data` — derived from **Cricsheet (CC BY 3.0)**. Attribution
  required (see [Cricsheet](../../sources/cricsheet.md) and `ATTRIBUTION.md`).
- Snapshot `dataset_version`: 2026-06-11.

## Coverage Scope

| Season | Matches | Deliveries | Source |
|--------|---------|------------|--------|
| MLC 2023 | 19 | — | Cricsheet CC BY 3.0 |
| MLC 2024 | 23 | — | Cricsheet CC BY 3.0 |
| MLC 2025 | 33 | 7,736 | Cricsheet CC BY 3.0 |
| **All-time** | **75** | **17,413** | **Cricsheet CC BY 3.0** |

**MLC 2026 (Season 4)** starts 2026-06-18. Pre-season rosters are live at the canonical hub.

## MLC Champions

| Season | Champion | Runner-up |
|--------|----------|-----------|
| MLC 2023 | MI New York | Texas Super Kings |
| MLC 2024 | Washington Freedom | — |
| MLC 2025 | MI New York | Washington Freedom |

## MLC All-Time Leaders

| Category | Leader | Value | Sample |
|----------|--------|-------|--------|
| Most runs | F du Plessis (TSK) | 934 runs | 571 balls · 25 matches |
| Most wickets | TA Boult (MINY) | 46 wkts | 629 balls · 27 matches |
| Best economy | Imad Wasim (SEA) | 6.41 RPO | 247 balls · floor ≥15 |
| Best SR | D Ferreira (TSK) | 213.8 | 116 balls · floor ≥30 |

Source: CricketStudio internal dataset/2026-06-11 · Cricsheet CC BY 3.0.

## Franchises

MI New York · Washington Freedom · San Francisco Unicorns · Seattle Orcas · Texas Super Kings · Los Angeles Knight Riders

## Research Reports

- [The State of MLC 2025](../../research/state-of-mlc-2025.md)
- [Three Seasons of MLC](../../research/mlc-three-seasons.md)
- [The Toss Effect in MLC](../../research/toss-effect-mlc.md)
- [Death Overs Intelligence: MLC](../../research/death-overs-mlc.md)

## Examples

- [Who won MLC 2025?](../../dossier/who-won-mlc-2025.md)
- [MLC all-time run-scorer](../../dossier/mlc-all-time-run-scorer.md)
- [MLC all-time wicket-taker](../../dossier/mlc-all-time-wicket-taker.md)
- [When does MLC 2026 start?](../../dossier/when-does-mlc-2026-start.md)
- [MLC franchises](../../dossier/mlc-franchises.md)

## Related Concepts

- [Indian Premier League](indian-premier-league.md)
- [Cricsheet](../../sources/cricsheet.md)
