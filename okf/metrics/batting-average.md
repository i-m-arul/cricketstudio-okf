---
type: metric
title: Batting Average
description: Runs scored per dismissal — a measure of batting consistency and reliability.
resource: https://players.cricketstudio.ai/season/ipl-2026/average
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:batting-average
canonical_page: https://players.cricketstudio.ai/season/ipl-2026/average
tags:
  - cricket
  - metric
  - batting
related:
  - batting-strike-rate.md
  - ../methodology/sample-size-floors.md
---

# Batting Average

## Definition

Batting average measures how many runs a batter scores per dismissal. It captures
reliability — how long a batter typically lasts — and complements strike rate, which
captures tempo.

## Formula

```text
average = runs / outs
```

## Cricket Interpretation

A high average means a batter is dismissed infrequently relative to runs scored. In T20,
average matters less than strike rate for top-order aggression, but high average + high
strike rate together is the mark of an elite T20 batter.

## Required Inputs

- `runs` — runs scored in the scope
- `outs` — number of times dismissed in the scope

## Applicable Formats & Leagues

All formats; in T20 (IPL, MLC) it is read alongside strike rate.

## Sample-Size Floor

**≥ 30 balls faced**, consistent with other batting rate metrics. A batter with very few
dismissals (e.g. one out) can post an inflated average — apply the floor and report the
dismissal count.

## Edge Cases

- **Not-outs:** an undismissed innings does not increase `outs`; a batter with zero
  dismissals has an undefined average (report as "not yet dismissed", not infinity).
- Average says nothing about scoring rate — never use it alone to judge a T20 batter.

## Ranking Rule

Rank descending among floor-eligible batters. Disclose dismissal counts so readers can see
small-denominator effects. Report undefined averages explicitly.

## Known Limitations

- Sensitive to small numbers of dismissals.
- Ignores tempo and match context.

## Example Questions

- "What is Virat Kohli's IPL 2026 batting average, and over how many innings?"
- "Which batter combines a high average with a high strike rate this season?"

## Related Concepts

- [Batting Strike Rate](batting-strike-rate.md)
- [Sample-Size Floors](../methodology/sample-size-floors.md)
