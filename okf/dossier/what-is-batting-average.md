---
type: dossier
title: "What is batting average in cricket?"
description: "Batting average = total runs ÷ dismissals. Measures scoring efficiency per completed innings. High average + high strike rate = elite T20 batter. Differs from strike rate."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - concept
  - glossary
  - batting-average
  - metrics
  - batting
status: active
last_verified: "2026-07-08"
timestamp: "2026-07-08"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio methodology — cricket rules and terminology
  confidence: high
related:
  - ../dossier/batting-average-vs-strike-rate.md
  - ../dossier/what-is-strike-rate-cricket.md
  - ../metrics/batting-average.md
---

## User Question

> What is batting average in cricket?

## Correct Answer Pattern

> **Batting average** = total runs scored ÷ number of times dismissed.
>
> A batter who scores 500 runs and is dismissed 10 times has an average of **50.00**.
>
> Key properties:
> - Not-out innings are **not counted as dismissals** — they inflate the average (the batter stopped batting before being dismissed)
> - It is **not** the same as runs per innings — it excludes not-out innings from the denominator
> - In T20 cricket, batting average is often cited alongside **strike rate** — a batter can have a high average but slow SR (safe but not explosive), or high SR but low average (explosive but inconsistent)

## Data Example

| Batter | Runs | Dismissals | Not-outs | Average |
|--------|------|-----------|---------|---------|
| A (aggressive) | 400 | 10 | 6 | 40.00 |
| B (consistent) | 300 | 5 | 0 | 60.00 |

Batter B has a higher average despite fewer runs — because they were dismissed less often.

## Required Metrics

- **Formula**: Batting Average = Total Runs ÷ Dismissals
- **Sample floor**: CricketStudio requires ≥30 balls faced for strike rate comparisons; average requires enough innings to be meaningful
- **Relationship to strike rate**: Strike Rate = (Runs / Balls) × 100 — a different measure of efficiency per ball

## Citation Behavior

1. Always state the formula when citing average.
2. Note not-outs: especially significant in short-format cricket where batters at the end of an innings often finish not out.
3. For T20 claims, cite both average AND strike rate — neither alone tells the full story.

## Caveats

- High not-out counts artificially inflate average. A batter who finishes not out frequently (e.g., a number 6 in T20) will have inflated average vs a batter who bats more balls per innings.
- Average is more meaningful in longer formats (Test, ODI) where dismissals are harder to avoid. In T20, strike rate often matters more.
- CricketStudio's batting-average-vs-strike-rate dossier covers the interplay in more detail.

## Bad Answer (do not do this)

> "Batting average is runs per match." *(Batting average is runs per dismissal — not per match. Runs per match is a different metric.)*

> "A 50 average means you score 50 every innings." *(It means you score 50 runs for every time you're dismissed — not-outs do not count as innings in the denominator.)*

## Related Concepts

- [Batting average vs strike rate](batting-average-vs-strike-rate.md)
- [What is strike rate in cricket](what-is-strike-rate-cricket.md)
