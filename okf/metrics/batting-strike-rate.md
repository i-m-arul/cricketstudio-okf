---
type: metric
title: Batting Strike Rate
description: Runs scored per 100 balls faced — the core T20 batting tempo metric.
resource: https://players.cricketstudio.ai/season/ipl-2026
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:batting-strike-rate
canonical_page: https://players.cricketstudio.ai/season/ipl-2026
tags:
  - cricket
  - metric
  - batting
related:
  - ../methodology/sample-size-floors.md
  - ../methodology/phase-definitions.md
  - powerplay-strike-rate.md
---

# Batting Strike Rate

## Definition

Batting strike rate measures how many runs a batter scores per 100 balls faced. It is the
primary tempo metric in T20 cricket.

## Formula

```text
strike_rate = (runs / balls_faced) * 100
```

## Cricket Interpretation

A higher strike rate means faster scoring. But tempo only has meaning in context: format,
innings phase, venue, batting role, and bowling quality all change what a "good" strike
rate is. A 150 strike rate at the death is ordinary; the same against the new ball in the
powerplay is excellent.

## Required Inputs

- `runs` — runs scored in the scope
- `balls_faced` — legal deliveries faced in the scope

## Applicable Formats & Leagues

T20 and domestic T20 (IPL, MLC). Less central in ODIs and not used in Tests.

## Sample-Size Floor

**≥ 30 balls faced** in the scope before strike rate is treated as a rankable rate. See
[Sample-Size Floors](../methodology/sample-size-floors.md).

## Edge Cases

- Wides do not count as balls faced; no-ball deliveries that are scored off do.
- A small sample can produce extreme values — apply the floor before ranking.
- Phase-specific strike rate requires the phase floor — see
  [Phase Definitions](../methodology/phase-definitions.md).

## Ranking Rule

Rank descending. Tiebreak by fewer balls faced (a higher rate over fewer balls is the
tiebreaker only among floor-eligible players). Never rank below-floor players.

## Known Limitations

- Strike rate ignores dismissals — pair it with [Batting Average](batting-average.md) for
  a fuller picture.
- It does not capture match situation or bowling quality faced.

## Example Questions

- "Who has the highest strike rate in IPL 2026 among eligible batters?"
- "What is Vaibhav Suryavanshi's IPL 2026 strike rate, and over how many balls?"

## Related Concepts

- [Batting Average](batting-average.md)
- [Powerplay Strike Rate](powerplay-strike-rate.md)
- [Ranking Eligibility](../methodology/ranking-eligibility.md)
