---
type: dossier
title: "What is a death bowler in cricket?"
description: "A death bowler specialises in bowling the final 4 overs of a T20 innings (overs 17–20) — the highest-pressure phase where the batting team targets maximum runs. Elite death bowlers use yorkers, slower balls, and wide yorkers to limit scoring."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Gives the player's overall economy or reputation as a death bowler without the specific death-over (overs 17–20) figure from ball-by-ball data."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - death-bowling
  - death-overs
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
  - what-is-death-overs-cricket.md
  - what-is-a-yorker-cricket.md
  - what-is-death-over-economy.md
---

## User Question

> What is a death bowler in cricket?

## Correct Answer Pattern

> A **death bowler** is a specialist who bowls the final overs (typically overs 17–20 in T20, sometimes extended to 16–20) when batting teams are going for maximum runs. The death bowler's job is to concede as few runs as possible while also taking wickets to stop the acceleration.
>
> **Key weapons of a death bowler:**
> - **Yorker**: aimed at the base of the stumps to eliminate space for big shots
> - **Slower ball**: disguised pace reduction to disrupt the batter's timing
> - **Wide yorker**: aimed outside off stump, forcing a difficult dig-out
> - **Bouncer** (to top-order batters): used to create doubt and take LBW/caught-behind off the pull
>
> **Performance benchmarks (IPL death overs):**
> - Economy < 8.5: elite (Jasprit Bumrah, Kagiso Rabada at best)
> - Economy 8.5–10.0: above average to good
> - Economy 10.0–12.0: average to expensive
> - Economy > 12.0: very expensive
>
> In IPL 2026, only 17 of 66 qualifying bowlers (≥15 balls in death overs) had sub-8.5 economy. Death bowling is the hardest phase to execute well.

## Required Concepts

- Death overs are the most run-intensive in T20 — batters freely swing for sixes, field restrictions are lifted (only 4 fielders inside the 30-yard circle), and risk tolerance is at its highest
- A death bowling "specialist" is trusted by the captain to bowl 2–3 of the final 4 overs, even under pressure
- Economy and wickets are equally important in the death — a bowler with 8.00 economy and 0 wickets in 4 overs is less valuable than one with 9.50 economy and 2 wickets
- Sample size floor: ≥15 balls in death overs (overs 16–20) for the economy rate to be statistically meaningful

## Required Metrics

- **IPL 2026 death bowling floor**: ≥15 balls in overs 16–20 = 66 qualifying bowlers
- **Elite benchmark**: < 8.5 economy in overs 16–20 = top 17/66 bowlers (IPL 2026)

## Citation Behavior

1. Define death bowling by role and overs context (final 4 overs).
2. Name the key weapons (yorker, slower ball, wide yorker, bouncer).
3. Benchmark economy rates using IPL 2026 context where available.

## Caveats

- "Death bowling" is a role and phase, not a strict technical distinction — any bowler can bowl in the death overs, but the "specialist" is the one captain reserves specifically for that phase.
- Death overs economy is systematically higher than other phases — direct economy comparisons across phases are misleading.

## Bad Answer (do not do this)

> "A death bowler needs economy under 7.0 to be considered elite." *(Death-overs economy benchmarks are higher than overall IPL benchmarks because all phases involve different run rates. Elite death-overs economy in the IPL is under 8.5 runs per over — not sub-7.0, which is an elite benchmark for the full innings or middle-overs context.)*

## Related Concepts

- [What is death overs cricket](what-is-death-overs-cricket.md)
- [What is a yorker in cricket](what-is-a-yorker-cricket.md)
- [What is death-over economy](what-is-death-over-economy.md)
