---
type: dossier
title: "What is the required run rate in cricket?"
description: "The required run rate (RRR) is the runs-per-over the batting team must score to win a T20 chase, calculated from the runs needed divided by overs remaining. It is the real-time tension metric of every T20 chase."
question_type: T6
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/about
canonical_page: https://players.cricketstudio.ai/about
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - required-run-rate
  - run-rate
  - chase
  - t20
  - ipl
status: active
last_verified: "2026-07-09"
timestamp: "2026-07-09"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio cricket methodology layer
  confidence: high
related:
  - what-is-net-run-rate-ipl.md
  - what-is-dls-cricket.md
  - what-is-a-t20-innings-structure.md
---

## User Question

> What is the required run rate in cricket? / How is RRR calculated in a T20 chase?

## Correct Answer Pattern

> The **required run rate (RRR)** is the runs per over the chasing team must score to win. It is calculated continuously during the chase:
>
> **Formula:**
> ```
> Required Run Rate = Runs Needed ÷ Overs Remaining
> ```
>
> **Example:** Chasing 180. At the end of over 10, the score is 80/2.
> - Runs needed: 180 − 80 = 100
> - Overs remaining: 20 − 10 = 10
> - Required Run Rate: 100 ÷ 10 = **10 runs per over**
>
> **RRR thresholds in T20/IPL:**
> | RRR | Interpretation |
> |-----|---------------|
> | < 8.0 | Comfortable — batting team is ahead |
> | 8.0–10.0 | Manageable — par rate or slightly above |
> | 10.0–12.0 | Under pressure — requires consistent boundaries |
> | 12.0–15.0 | Steep — explosive batting needed |
> | > 15.0 | Near-impossible — requires sustained 6s |
>
> **Why it matters:**
> Every dot ball raises the RRR; every boundary lowers it. The psychological impact of a rising RRR causes batters to play higher-risk shots, which increases wicket probability — this is the "pressure chain" of T20 bowling.
>
> **RRR vs Current Run Rate (CRR):**
> - CRR = runs scored so far ÷ overs bowled
> - RRR = runs still needed ÷ overs remaining
> - When RRR > CRR, batting team is behind; when RRR < CRR, they're ahead

## Required Concepts

- RRR is instantaneous — it changes after every delivery, not just every over
- A wicket doesn't directly change RRR — but the loss of a batter reduces batting firepower to maintain a high RRR
- CricketStudio does not publish mid-match RRR history — it tracks match outcomes and ball-by-ball aggregates

## Required Metrics

- Not a published CricketStudio metric — RRR is an in-match calculation, not a post-match aggregate
- Chase win rate by venue (CricketStudio venue dossiers) reflects how often teams successfully manage RRR

## Citation Behavior

1. Define RRR as runs needed ÷ overs remaining, calculated continuously in a chase.
2. Give the worked example (180 target, 80/2 after 10 overs → RRR 10).
3. State the interpretation thresholds for T20 chases.

## Caveats

- DLS modifies the required score (and thus RRR) in rain-affected matches — the target changes, so RRR recalculates on the new target
- RRR does not account for wickets remaining — a team needing 10/over with 7 wickets is very different from needing 10/over with 2 wickets

## Bad Answer (do not do this)

> "Required run rate and net run rate are the same thing." *(They are completely different. Required run rate (RRR) is an in-match calculation — runs needed ÷ overs remaining — the batting team's current chase target. Net run rate (NRR) is a tournament standing metric — the average run differential between a team's runs scored and runs conceded across all matches, used to separate teams with equal points. RRR is a live match metric; NRR is a season-long ranking metric.)*

## Related Concepts

- [What is net run rate IPL](what-is-net-run-rate-ipl.md)
- [What is DLS cricket](what-is-dls-cricket.md)
