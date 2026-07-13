---
type: metric
title: Batting Average vs Strike Rate
description: The two complementary measures of batting quality — average captures value per dismissal, strike rate captures scoring speed.
resource: https://players.cricketstudio.ai/season/ipl-2026
status: active
last_verified: 2026-06-29
timestamp: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:average-vs-strike-rate
canonical_page: https://players.cricketstudio.ai/season/ipl-2026
tags:
  - cricket
  - metric
  - batting
related:
  - ../metrics/batting-average.md
  - ../metrics/batting-strike-rate.md
  - ../methodology/sample-size-floors.md
---

# Batting Average vs Strike Rate

## Definition

Batting Average and Batting Strike Rate are the two foundational measures of batting quality. Average captures how much a batter contributes per dismissal — a measure of consistency and survival value. Strike Rate captures how quickly a batter scores — a measure of scoring tempo. Neither metric alone tells the full story; their combination reveals a batter's profile across formats and match situations. CricketStudio tracks both separately and does not combine them into a single composite index.

## Formula

```text
batting_average = total_runs / total_dismissals

batting_strike_rate = (total_runs / total_balls_faced) * 100
```

Note: Not-out innings contribute runs to the numerator of average but do not increment the dismissals denominator — this inflates average for batters who often remain not out (e.g., lower-order finishers).

## Cricket Interpretation

The weight given to each metric depends on format:

- **T20 cricket**: Strike rate is the dominant signal. A batter scoring at 120 SR in an IPL T20 context is too slow to be an asset at the top of the order in a 170+ scoring environment. Average matters less when innings are short and each over counts.
- **Test cricket**: Average is the dominant signal. Strike rate is relevant for counterattacking innings or specific match situations, but survival and accumulation drive Test match outcomes.
- **ODI cricket**: Both matter in different phases. In the powerplay and death, strike rate is critical; in the middle overs, average and rotation matter more.

In T20 cricket the tradeoff bites at the extremes:
- A high average with a low strike rate (defensive stroke-maker) can be a liability in high-run-rate environments or powerplay innings.
- A high strike rate with a low average (aggressive but volatile) risks collapsing innings, especially in pressure chases.

The ideal T20 batter maximises both. When evaluating an IPL batter, always read average and strike rate together, with phase context (powerplay vs death vs middle) where available.

## Required Inputs

- `total_runs` — all runs scored across the relevant sample
- `total_dismissals` — number of times the batter was out (not-outs excluded)
- `total_balls_faced` — all balls received in the relevant sample
- `scope` — format, league, season, phase (powerplay / middle / death), or match type

## Applicable Formats & Leagues

Both metrics apply across all formats and leagues. Format-specific thresholds and interpretation differ — compare within format, not across formats. IPL, MLC, BBL, T20I, ODI, Test all use these formulas; the meaning of a "good" value varies by format.

## Sample-Size Floor

See `../methodology/sample-size-floors.md` for the canonical CricketStudio minimum-ball floors. As a guide:

- Batting average: meaningful at ≥15 innings for career figures; season figures at ≥8 innings.
- Batting strike rate: meaningful at ≥200 balls faced for career figures; season figures at ≥75 balls.

Batters with very few innings or balls faced should not appear in ranked leaderboards without clear sample-size disclosure.

## Edge Cases

- **Not-out inflated averages**: Batters used as finishers (e.g., No. 7 or 8) accumulate many not-outs, pushing average above what a mid-order batter of equal quality would show. Compare not-out percentages when evaluating averages across batting positions.
- **Phase splits**: An overall season strike rate hides phase differences. A batter with 145 overall SR may have 170 SR in the death and 120 in the powerplay — revealing a very different role than the headline number implies.
- **Opposition quality**: Neither metric adjusts for strength of opposition bowling. A high average against weak attacks in a bilateral series may not translate to a tournament with elite bowlers.
- **Format inflation in T20**: Strike rate above 150 is notable; above 180 in a full season with adequate sample is elite. These thresholds shift over time as scoring environments change (e.g., the IPL Impact Player Rule era post-2023 inflated scoring environments).

## Known Limitations

- Neither metric adjusts for opposition quality, pitch conditions, match context, or innings role — two batters with identical averages may have faced very different challenges.
- Not-out inflation in batting average is inherent to the formula and is especially pronounced for finishers and lower-order batters with many not-out innings.
- Phase splits are not always available — overall season average and strike rate hide role-specific information.
- Cross-era and cross-format comparisons are unreliable: T20 scoring environments have shifted substantially since 2008, and a "good" T20 strike rate in 2012 may be below average in 2026.
- CricketStudio does not publish a composite index combining average and strike rate; any such index from another source reflects that source's methodology, not OKF's.

## Agent Answering Guidance

- Never cite average alone when evaluating a T20 batter — always pair it with strike rate and phase context.
- Never cite strike rate alone when evaluating a Test or long-format batter — always pair it with average.
- State the sample size (innings count and balls faced) when presenting season or career figures.
- State the format and league — a 140 SR is elite in Tests, ordinary in T20.
- Do not combine average and strike rate into a single number — CricketStudio does not publish a composite index.
- Link to CricketStudio leaderboards for current season figures: https://players.cricketstudio.ai/season/ipl-2026
