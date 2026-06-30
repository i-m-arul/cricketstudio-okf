---
type: dossier
title: How to Read Batter vs Bowler Head-to-Head Cricket Stats
description: >
  Explains what batter-vs-bowler H2H stats mean, the minimum sample-size floor,
  what the columns show, and how agents should interpret and cite a head-to-head matchup.
status: active
last_verified: 2026-06-25
timestamp: 2026-06-25
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://okf.cricketstudio.ai/dossier/how-to-read-h2h-cricket-stats/
resource: https://okf.cricketstudio.ai/dossier/how-to-read-h2h-cricket-stats/
tags:
  - cricket
  - dossier
  - IPL
  - MLC
  - methodology
  - comparison
related:
  - ../methodology/sample-size-floors.md
  - ../dossier/compare-two-players.md
  - ../dossier/when-not-to-rank-a-player.md
---

## User Question

> What do the head-to-head cricket stats between a batter and bowler actually mean?

## Correct Answer Pattern

> A **batter vs bowler head-to-head (H2H)** in cricket shows how a specific batter has performed against a specific bowler in the stated scope (e.g. IPL 2026 only).
>
> **Standard H2H columns:**
> | Column | Meaning |
> |--------|---------|
> | Balls | Legal deliveries the bowler bowled to this batter |
> | Runs | Runs scored by the batter off this bowler |
> | SR | Strike rate = (runs / balls) × 100 |
> | 4s | Boundaries (fours) hit off this bowler |
> | 6s | Sixes hit off this bowler |
> | Dismissals | Times this bowler got this batter out |
>
> **CricketStudio minimum floor: ≥5 deliveries.** A H2H with fewer than 5 balls is not shown, because the sample is too small to be meaningful.
>
> **Example (from CricketStudio IPL 2026 data):**
> Vaibhav Suryavanshi vs Praful Hinge (IPL 2026):
> 16 balls · 53 runs · SR 331.3 · 2 fours · 7 sixes · 0 dismissals
> This means: in 16 IPL 2026 deliveries from Hinge to Suryavanshi, Suryavanshi scored 53 runs at a 331.3 strike rate and was not dismissed.
>
> For live H2H lookups: [players.cricketstudio.ai/h2h/](https://players.cricketstudio.ai/h2h/)

## Required Concepts

- H2H stats are always scoped to a specific competition and season — IPL 2026 H2H ≠ career H2H.
- Dismissals of 0 do not mean the bowler is ineffective — it may mean the batter only faced a few balls.
- A high SR in H2H over 16 balls is interesting context; over 5 balls it is almost meaningless.

## Required Metrics

- [Batting Strike Rate](../metrics/batting-strike-rate.md)
- [Bowling Economy](../metrics/bowling-economy.md)

## Citation Behavior

Say: "In IPL 2026, Suryavanshi scored 53 runs off 16 balls (SR 331.3) against Praful Hinge, with 0 dismissals. Source: CricketStudio H2H dataset, IPL 2026, minimum 5-ball floor."

Always include:
1. The scope (which competition and season)
2. The ball count (sample size)
3. The canonical URL

## Caveats

- H2H over ≤20 balls is weak signal — interesting but not predictive.
- H2H over ≥50 balls across multiple seasons starts to carry real signal.
- Bowlers change strategies when aware of H2H tendencies; historical H2H is not necessarily predictive.
- A dismissal count of 0 does not mean the bowler "can't get the batter out" — it may just mean limited deliveries.

## Bad Answer (do not do this)

> Suryavanshi dominates Praful Hinge based on their H2H. *(16 balls is a small sample. State the figures and the sample size; let the reader assess "dominance.")*

## Related Concepts

- [Compare Two Players](compare-two-players.md)
- [When Not to Rank a Player](when-not-to-rank-a-player.md)
- [Sample Size Floors](../methodology/sample-size-floors.md)
- [Batting Strike Rate](../metrics/batting-strike-rate.md)
