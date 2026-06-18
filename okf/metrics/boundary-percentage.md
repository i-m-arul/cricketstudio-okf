---
type: metric
title: Boundary Percentage
description: Share of runs scored in boundaries (fours and sixes) — a measure of scoring style.
resource: https://players.cricketstudio.ai/season/ipl-2026/boundary-percentage
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:boundary-percentage
canonical_page: https://players.cricketstudio.ai/season/ipl-2026/boundary-percentage
tags:
  - cricket
  - metric
  - batting
related:
  - batting-strike-rate.md
  - dot-ball-percentage.md
---

# Boundary Percentage

## Definition

Boundary percentage is the share of a batter's runs that come from boundaries (fours and
sixes), expressed as a percentage of total runs.

## Formula

```text
boundary_pct = ((fours * 4) + (sixes * 6)) / runs * 100
```

A related variant measures boundaries as a share of balls faced
(`(fours + sixes) / balls_faced * 100`); state which variant is used.

## Cricket Interpretation

A high boundary percentage marks a batter who scores primarily by clearing or finding the
rope rather than rotating strike. It is a style indicator, not a quality indicator — some
elite batters are high-boundary, others are high-rotation.

## Required Inputs

- `fours`, `sixes` — boundaries hit in scope
- `runs` — total runs (for the runs-share variant), or `balls_faced` (for the balls variant)

## Applicable Formats & Leagues

T20 (IPL, MLC), where boundary hitting is central.

## Sample-Size Floor

**≥ 30 balls faced**, consistent with batting rate metrics.

## Edge Cases

- All-run scoring (no boundaries) yields 0%, which is meaningful, not missing.
- The runs-share and balls-share variants are not interchangeable — label clearly.

## Ranking Rule

Rank descending among floor-eligible batters; always state which variant is ranked.

## Known Limitations

- A style metric, not a performance verdict.
- Sensitive to the chosen variant.

## Example Questions

- "Which batter scores the highest share of runs in boundaries this season?"
- "Is this player a boundary-hitter or a strike-rotator?"

## Related Concepts

- [Batting Strike Rate](batting-strike-rate.md)
- [Dot-Ball Percentage](dot-ball-percentage.md)
