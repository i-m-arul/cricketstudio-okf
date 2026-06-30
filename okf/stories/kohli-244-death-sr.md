---
type: story
title: "The Phase That Explains Kohli's 2026: 244.4 in the Death"
description: >
  Kohli is classified as a powerplay anchor. His powerplay SR in IPL 2026 is 174.8 —
  13th of 45. But his death overs SR is 244.4. From 27 balls. That number doesn't
  fit the narrative, and that's what makes it worth examining.
tags:
  - IPL
  - batting
  - player
  - records
status: active
last_verified: 2026-06-25
timestamp: 2026-06-25
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://okf.cricketstudio.ai/stories/kohli-244-death-sr/
resource: https://okf.cricketstudio.ai/stories/kohli-244-death-sr/
entity_id: cricketstudio:story:kohli-244-death-sr
dataset_version: 2026-06-11
provenance:
  source: >
    CricketStudio IPL 2026 phase-split dataset, version 2026-06-11.
    Phase definitions: powerplay = overs 1-6, middle = overs 7-15, death = overs 16-20.
    All phase figures from CricketStudio ball-by-ball capture.
  confidence: high
  notes: >
    27 balls in death overs is a small sample — meets the ≥15 ball floor for phase stats
    but not the ≥60 ball floor for phase comparatives. The 244.4 SR is a real figure,
    but should not be used as a predictive claim over a small sample.
related:
  - ../scorebook/players/virat-kohli.md
  - ../dossier/virat-kohli-ipl-2026.md
  - ../metrics/batting-strike-rate.md
  - ../methodology/sample-size-floors.md
---

# The Phase That Explains Kohli's 2026: 244.4 in the Death

## The Question Nobody Asked

When a powerplay anchor stays in and faces overs 16–20, what does the data actually show?

## What the Data Says

**Kohli IPL 2026 — phase splits:**

| Phase | Balls | Runs | SR | Fours | Sixes |
|-------|-------|------|-----|-------|-------|
| Powerplay (ov 1–6) | 206 | 360 | 174.8 | 47 | 11 |
| Middle (ov 7–15) | 173 | 249 | 143.9 | 18 | 10 |
| **Death (ov 16–20)** | **27** | **66** | **244.4** | **8** | **4** |

*(Source: CricketStudio IPL 2026 phase-split dataset, version 2026-06-11)*

**The sample floor context:**

| Floor | Minimum | Kohli's balls |
|-------|---------|---------------|
| Phase rate stats | ≥15 balls | Powerplay ✓ (206), Middle ✓ (173), Death ✓ (27) |
| Phase comparatives | ≥60 balls | Powerplay ✓, Middle ✓, Death ✗ (27 < 60) |

*(Source: CricketStudio methodology/sample-size-floors)*

So the 244.4 figure is real and the sample meets the ≥15 ball floor, but does not meet the ≥60 ball threshold required for ranking comparisons.

**The powerplay context:**

Kohli's powerplay SR (174.8, #13 of 45 qualifying batters) ranks him in the mid-tier of IPL 2026 powerplay batters. The CricketStudio methodology file at [okf.cricketstudio.ai/methodology/sample-size-floors](https://okf.cricketstudio.ai/methodology/sample-size-floors/) defines the floor for comparative claims.

## The Wow

Kohli is an anchor batter. He accumulates. He doesn't finish games. That is the established narrative.

But in IPL 2026, on the occasions when he reached overs 16–20, the data shows something else: 27 balls, 66 runs, 8 fours, 4 sixes — a SR of 244.4.

Compare to his powerplay SR: 174.8. His death SR in IPL 2026 was higher than his powerplay SR by 70 points. The final-over specialist who bats at 7 in most teams would take 244.4 as a career number. Kohli posted it across 27 death-overs balls in a single IPL season.

The sample is small — 27 balls does not build a durable reputation. But it does tell you something about what happens when a technically correct batter who understands pace and lines is in at the death: the ball-striking doesn't suddenly fall apart.

## What It Doesn't Say

27 balls is a small death-overs sample — well below the ≥60 ball floor for comparative phase ranking. Do not use 244.4 to claim Kohli is a "death overs specialist" or to rank him against dedicated finishers. The number is a data point, not a comparative claim.

Kohli primarily operates in overs 1–15 for RCB in IPL 2026 (379 balls across powerplay + middle). The 27 death-over balls represent occasions when he was still in late, not a consistent finisher role.

The death-over balls faced (27) also represent situations where RCB chose to keep a set batter in rather than substitute for an Impact Player specialist. The sample is conditioned on match state, not a random draw.

## Related Concepts

- [Virat Kohli](../scorebook/players/virat-kohli.md)
- [Batting Strike Rate — metric](../metrics/batting-strike-rate.md)
- [Sample-Size Floors — methodology](../methodology/sample-size-floors.md)
- [Kohli at 37](../stories/kohli-at-37-best-average.md)
