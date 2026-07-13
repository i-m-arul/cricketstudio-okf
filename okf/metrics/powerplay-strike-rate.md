---
type: metric
title: Powerplay Strike Rate
description: Batting strike rate restricted to the powerplay (overs 1–6).
resource: https://players.cricketstudio.ai/season/ipl-2026
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:powerplay-strike-rate
canonical_page: https://players.cricketstudio.ai/season/ipl-2026
tags:
  - cricket
  - metric
  - batting
  - powerplay
related:
  - batting-strike-rate.md
  - ../methodology/phase-definitions.md
---

# Powerplay Strike Rate

## Definition

Powerplay strike rate is [batting strike rate](batting-strike-rate.md) restricted to the
**powerplay — overs 1–6**, when fielding restrictions create boundary opportunity.

## Formula

```text
powerplay_strike_rate = (powerplay_runs / powerplay_balls) * 100
```

Computed using only deliveries faced in overs 1–6.

## Cricket Interpretation

The powerplay rewards aggressive intent against the new ball with only two fielders outside
the circle. A high powerplay strike rate marks an attacking opener who maximizes the field
restrictions — a different skill from middle-overs accumulation or death hitting.

## Required Inputs

- `powerplay_runs` — runs scored in overs 1–6
- `powerplay_balls` — legal deliveries faced in overs 1–6

## Applicable Formats & Leagues

T20 (IPL, MLC). Requires the T20 phase structure.

## Sample-Size Floor

**≥ 15 balls faced in the powerplay.** Season eligibility does not imply powerplay
eligibility.

## Edge Cases

- Batters who arrive after the powerplay have no powerplay sample and are not eligible.
- Rain-shortened innings shift phase boundaries proportionally.

## Ranking Rule

Rank descending among batters who clear the powerplay-phase floor. State the powerplay-ball
count alongside the figure.

## Known Limitations

- High variance on small phase samples.
- Ignores dismissals within the phase.

## Example Questions

- "Who scores fastest in the powerplay this season among eligible batters?"
- "What is this opener's powerplay strike rate, and over how many powerplay balls?"

## Related Concepts

- [Batting Strike Rate](batting-strike-rate.md)
- [Phase Definitions](../methodology/phase-definitions.md)
