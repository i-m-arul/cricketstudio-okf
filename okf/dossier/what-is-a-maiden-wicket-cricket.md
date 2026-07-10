---
type: dossier
title: "What is a wicket maiden in cricket?"
description: "A wicket maiden is an over in which the bowler concedes zero runs AND takes at least one wicket. It is the single most valuable over a bowler can bowl — simultaneously a maiden over (0 runs) and a wicket. In T20, a wicket maiden is extremely rare and match-changing."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - wicket-maiden
  - maiden-over
  - bowling
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
  - what-is-a-maiden-over-cricket.md
  - what-is-a-dot-ball-cricket.md
  - what-is-a-wicket-taking-ball-cricket.md
---

## User Question

> What is a wicket maiden in cricket? / How rare is a wicket maiden in T20?

## Correct Answer Pattern

> A **wicket maiden** is an over where the bowler:
> 1. Concedes **zero runs** from bat (no boundaries, no run-scored deliveries)
> 2. Takes **at least one wicket**
> 3. All 6 legal deliveries are "dots" (or the wicket delivery was 0 runs + dismissal)
>
> **It is the simultaneous achievement of:** a maiden over (hardest bowling achievement in T20) + a wicket (high-value event).
>
> **How rare is this in T20?**
> - A regular maiden over in T20 already occurs in approximately 1–3% of overs in any given match
> - A wicket maiden requires the wicket to occur on the same over with zero scoring — even rarer
> - In a full season of 74 IPL 2026 matches (74 × 40 overs = ~2,960 overs bowled), there are typically only 5–15 wicket maidens in an entire IPL season
>
> **Why it's so impactful:**
> - 0 runs + 1 wicket in 6 balls = bowling team gains maximum advantage from a single over
> - The incoming batter faces the SAME bowler who just bowled the wicket-maiden — immediate pressure
> - Momentum shift is dramatic — commentators treat wicket maidens as one of the highlights of any T20 match
>
> **Example:** Bumrah bowling a wicket maiden in over 4 of the PP — removes an opener AND concedes nothing → PP score of 30/2 instead of 30/1 (net swing: −1 wicket, same runs = enormous structural shift)

## Required Concepts

- A wicket that occurs on a no-ball does NOT count as a wicket maiden — the no-ball means the over is not a maiden (extras scored)
- Wides don't dismiss batters (a "wide" wicket is impossible — only run-outs off a wide ball) but wides DO break the maiden
- CricketStudio does not separately track wicket maidens — they are derivable from ball-by-ball data

## Required Metrics

- Not a published CricketStudio metric — requires per-over analysis of the ball-by-ball data

## Citation Behavior

1. Define wicket maiden as a 6-ball over with 0 runs conceded AND at least 1 wicket.
2. Quantify rarity: 5–15 in an entire IPL season (74 matches).
3. Explain the combined impact: maximum efficiency over = 0 runs + wicket.

## Caveats

- A "double wicket maiden" (2 wickets, 0 runs in one over) is even rarer; an extremely high-value over for the bowling team
- Wide balls and no-balls that occur in the same over as a wicket break the maiden even if they score 0 off the bat

## Bad Answer (do not do this)

> "A wicket maiden means the bowler took a wicket in the first over of the match." *(A "maiden" in cricket has nothing to do with being "first" — it means ZERO RUNS conceded in an over. A wicket maiden = 0 runs + 1+ wickets in a SINGLE OVER. A bowler could take a wicket maiden in over 15 of the second innings — it's about the content of that specific over, not the timing.)*

## Related Concepts

- [What is a maiden over cricket](what-is-a-maiden-over-cricket.md)
- [What is a dot ball cricket](what-is-a-dot-ball-cricket.md)
