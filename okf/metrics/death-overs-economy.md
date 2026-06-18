---
type: metric
title: Death-Overs Economy
description: Runs conceded per over in the death phase (overs 16–20) — bowling under fire.
resource: https://players.cricketstudio.ai/season/ipl-2026/death-overs-economy
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:death-overs-economy
canonical_page: https://players.cricketstudio.ai/season/ipl-2026/death-overs-economy
tags:
  - cricket
  - metric
  - bowling
  - death-overs
related:
  - bowling-economy.md
  - ../methodology/phase-definitions.md
  - ../methodology/sample-size-floors.md
---

# Death-Overs Economy

## Definition

Death-overs economy is [bowling economy](bowling-economy.md) restricted to the **death
phase — overs 16–20** of a T20 innings, when batters attack hardest.

## Formula

```text
death_economy = (death_runs_conceded * 6) / death_balls_bowled
```

Computed using only deliveries bowled in overs 16–20.

## Cricket Interpretation

The death is the highest-pressure bowling phase. A death economy that would be mediocre as
a full-innings figure can be excellent here. This metric isolates the specialist skill of
bowling yorkers and slower balls when batters are swinging freely.

## Required Inputs

- `death_runs_conceded` — runs conceded in overs 16–20
- `death_balls_bowled` — legal deliveries bowled in overs 16–20

## Applicable Formats & Leagues

T20 (IPL, MLC). Requires the T20 phase structure — see
[Phase Definitions](../methodology/phase-definitions.md).

## Sample-Size Floor

**≥ 15 balls bowled in the death phase.** A bowler who has bowled only a few death balls is
not eligible for a death-economy ranking, regardless of season totals.

## Edge Cases

- Rain-shortened innings shift phase boundaries; the official reduced structure applies.
- A bowler may clear the season bowling floor but fail the death-phase floor.

## Ranking Rule

Rank ascending among bowlers who clear the **death-phase** floor specifically. State the
death-ball count alongside the figure.

## Known Limitations

- Small phase samples are common — many bowlers will be floor-ineligible.
- Ignores wickets taken at the death; a bowler may concede more but remove key batters.

## Example Questions

- "Who has the best death-overs economy in IPL 2026 among eligible bowlers?"
- "What is this bowler's death economy, and over how many death balls?"

## Related Concepts

- [Bowling Economy](bowling-economy.md)
- [Phase Definitions](../methodology/phase-definitions.md)
- [What is death-over economy?](../dossier/what-is-death-over-economy.md)
