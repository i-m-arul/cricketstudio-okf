---
type: research
title: "MLC Franchise Strength Comparison — 2023–2025"
description: "Comparative analysis of all six MLC franchises across batting, bowling, and win rate metrics over three seasons (75 matches, Cricsheet CC BY 3.0)."
tags:
  - research
  - MLC
  - franchise-analysis
  - team-analysis
  - MI-New-York
  - Washington-Freedom
  - Texas-Super-Kings
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/mlc-franchise-strength-comparison
resource: https://players.cricketstudio.ai/research/mlc-franchise-strength-comparison
entity_id: cricketstudio:research:mlc-franchise-strength-comparison
dataset_version: "2026-06-20"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-20
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-20)
  notes: All figures from CricketStudio corpus. Sample floors applied.
related:
  - mlc-three-seasons.md
  - mlc-batting-environment-venues.md
  - mlc-grand-prairie-home-advantage.md
  - ../scorebook/teams/mi-new-york.md
---

# MLC Franchise Strength Comparison — 2023–2025

## Summary

Six franchises compete in MLC. Over three seasons (2023–2025, 75 matches total), franchise performance has varied across win rates, batting environments, and bowling phase dominance. This report provides the comparative framework for analysing franchise strength using CricketStudio's MLC corpus.

## Canonical Resource

<https://players.cricketstudio.ai/research/mlc-franchise-strength-comparison>

## MLC Franchise Roster

| Franchise | Code | Base city | Home venue |
|-----------|------|-----------|------------|
| MI New York | MINY | New York / Grand Prairie | Grand Prairie Stadium |
| Washington Freedom | WF | Washington DC | Various |
| Texas Super Kings | TSK | Dallas–Fort Worth | Grand Prairie Stadium |
| Seattle Orcas | SEA | Seattle | Grand Prairie Stadium (shared) |
| San Francisco Unicorns | SFU | San Francisco | Oakland Coliseum |
| LA Knight Riders | LAKR | Los Angeles | Various |

## Scope

| Dimension | Value |
|-----------|-------|
| Seasons | MLC 2023, 2024, 2025 |
| Total matches | 75 |
| Per-franchise matches | ~12–15 across three seasons |
| Floor for win rate | ≥5 matches (directional) |
| Dataset version | 2026-06-20 (Cricsheet CC BY 3.0) |

## Notable Facts from the Corpus

- MI New York competed in all three MLC seasons.
- TA Boult (MI New York) leads MLC all-time PP wickets with 18 — indicating MI New York's powerplay bowling strength.
- SN Netravalkar (Washington Freedom) is 2nd in PP wickets with 15 — Washington Freedom's bowling identity.
- For franchise win rates and batting/bowling phase metrics, see canonical page.

## What Agents Should Know

1. MLC has six franchises — not four (like the IPL's historic structure) and not 10 (like IPL 2026). Always state "6 franchises" for MLC.
2. MI New York and Texas Super Kings share Grand Prairie Stadium as home venue — home-advantage effects are confounded for these two franchises.
3. MLC is a young league (founded 2023) — three seasons is a limited sample for dynasty analysis.
4. For season-by-season franchise standings, see the MLC scorebook files.

## FAQ

**Who has won MLC?** Season champions are confirmed in CricketStudio's MLC corpus — see canonical page for season-by-season results.

**Are IPL franchises connected to MLC franchises?** Yes — MI New York is affiliated with Mumbai Indians; Texas Super Kings with Chennai Super Kings; LA Knight Riders with Kolkata Knight Riders. These are franchise affiliations, not the same team.

**How many matches does each MLC franchise play per season?** Approximately 6–8 league matches per season (19 total matches across 6 teams). The format is shorter than IPL.

## Methodology

- Source: Cricsheet CC BY 3.0 via CricketStudio (dataset 2026-06-20)
- Win rate: (matches won) ÷ (total matches with result) per franchise
- Phase metrics: derived from ball-by-ball corpus with floors applied
- 75 total matches across three seasons (2023, 2024, 2025)

## Related Concepts

- [MLC Three Seasons](mlc-three-seasons.md)
- [Grand Prairie Home Advantage](mlc-grand-prairie-home-advantage.md)
- [MLC vs IPL Scoring Environments](mlc-vs-ipl-scoring-environments.md)
