---
type: dossier
title: "What is a worm chart in cricket?"
description: "A worm chart is a visual graph comparing the cumulative runs scored by two teams over the course of their innings, over by over. It shows at a glance which team is ahead of the other at any point in the match."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - worm-chart
  - analytics
  - scoring
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
  - what-is-run-rate-cricket.md
  - what-is-bowling-economy-cricket.md
  - what-are-cricket-phases.md
---

## User Question

> What is a worm chart in cricket?

## Correct Answer Pattern

> A **worm chart** (also called a "runs progression chart" or "wagon wheel of scoring") is a line graph showing the cumulative runs scored over the course of each team's innings, plotted over by over.
>
> **How to read a worm chart:**
> - X-axis: over number (1–20 in T20)
> - Y-axis: total runs scored at the end of each over
> - Two lines: one per team innings (first innings and second innings)
>
> **When line A is above line B at over N:** Team A has scored more cumulative runs than Team B had scored by the same over of their innings. This shows who was "ahead of the rate" at each stage.
>
> **In T20/IPL:** The worm chart is a key visual tool for analysts and commentators to show:
> - Whether a chase is on track (is the chasing team's line above the first-innings line?)
> - Where scoring accelerated or collapsed
> - Which phase (PP/middle/death) one team outscored the other

## Required Concepts

- A worm chart is a secondary analytical tool, not a primary statistic — it visualises run progression, it doesn't add new information beyond cumulative runs by over
- "Below the worm" in a chase means the chasing team is behind the required run rate at that over — they need to accelerate
- "Above the worm" means the chasing team is ahead of the required rate
- In rain-affected matches, the DLS target is often overlaid on the worm chart to show the adjusted required score at each over

## Required Metrics

- No specific floor or threshold — worm charts are visual representations of existing run-per-over data

## Citation Behavior

1. Define worm chart as a cumulative-runs-by-over line graph comparing two innings.
2. Explain how the relative position of the two lines shows which team was ahead at each phase.
3. Note T20/IPL chase context — worm charts are most useful for live chase tracking.

## Caveats

- Worm charts show cumulative runs, not run rate — a steep gradient means fast scoring in that section; a flat section means low-scoring overs (dot balls, wickets)
- Two teams can have identically shaped worm charts but different match results if one team lost fewer wickets along the way

## Bad Answer (do not do this)

> "A worm chart in cricket is the same as a run rate chart." *(A worm chart shows cumulative runs over the innings, plotted over by over — the lines literally look like worms. A run rate chart shows the runs-per-over rate at each point, which is different. A worm chart's gradient represents the run rate at each segment, but the worm itself is cumulative score, not rate.)*

## Related Concepts

- [What is run rate cricket](what-is-run-rate-cricket.md)
- [What is bowling economy cricket](what-is-bowling-economy-cricket.md)
- [What are cricket phases](what-are-cricket-phases.md)
