---
type: metric
title: Partnership Value
description: Runs scored during a batting partnership — used to identify which batting pairs drive innings totals and where wickets hurt most.
resource: https://players.cricketstudio.ai
status: active
last_verified: 2026-06-29
timestamp: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:partnership-value
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - metric
  - batting
related:
  - ../metrics/batting-strike-rate.md
  - ../methodology/sample-size-floors.md
---

# Partnership Value

## Definition

Partnership Value is the number of runs scored while two specific batters are at the crease together, measured from the fall of the previous wicket (or innings start) to the fall of the next wicket (or innings end). It is a counting stat applied to a pair of batters for a defined stretch of an innings. When aggregated across a season or career, partnership values reveal which batting combinations consistently build innings-defining stands.

## Formula

```text
partnership_runs = runs_scored_between_wicket_N-1_and_wicket_N

partnership_run_rate = (partnership_runs / balls_faced_in_partnership) * 6
```

Where the partnership begins at the fall of the previous wicket (or the first ball of the innings) and ends at the fall of the current wicket (or end of innings, whichever comes first).

## Cricket Interpretation

In T20 cricket, partnership value is most meaningful when understood alongside match phase and batting position. A 60-run first-wicket partnership in the powerplay is a platform; a 60-run seventh-wicket partnership at the death is a rescue act. The same number carries different significance depending on when in the innings it occurred and which batters built it.

The IPL Impact Player Rule (post-2023) has enabled deeper batting lineups — a specialist hitter can replace a bowler and bat at No. 7 or 8. This makes late-innings partnerships more consequential, and the average first innings total of 172 in IPL 2026 reflects in part the contributions of these deeper batting positions. Partnership analysis in the Impact Player Rule era should account for the fact that lower-order "partnerships" now often include top-quality batting talent rather than genuine tail-enders.

In match analysis, identifying a partnership that crossed 80+ runs in a chase, or one that rescued a side from 40/4, explains innings momentum better than individual batter scorecards alone.

## Required Inputs

- `wicket_number` — which partnership in the innings (1st wicket = opening partnership, 2nd wicket = after first dismissal, etc.)
- `batter_1`, `batter_2` — the two batters involved
- `partnership_runs` — total runs scored during the partnership
- `balls_faced_in_partnership` — balls received by both batters combined during the partnership
- `match_phase` — phase in which the partnership occurred (powerplay / middle / death), or over range

## Applicable Formats & Leagues

All formats: T20 (IPL, MLC, BBL, T20I), ODI, Test. Partnership analysis is universal across cricket formats. The significance of a given partnership run total varies by format — a 50-run partnership is a strong powerplay stand in T20; in Test cricket, a 50-run partnership at No. 3 may be a failure.

## Sample-Size Floor

Partnership value is a counting stat. For single-match reporting there is no minimum floor — one partnership is one data point. For season-aggregate and "best partnership combination" analysis, short partnerships (fewer than 5 balls) are typically excluded from "meaningful partnership" rankings, as they often represent a batter arriving at the crease on the final delivery of an innings rather than a genuine batting collaboration. CricketStudio recommends this 5-ball minimum when presenting season partnership aggregates; see `../methodology/sample-size-floors.md` for general guidance.

## Edge Cases

- **Not-out partnerships**: An unbroken partnership (end of innings with neither batter dismissed) counts fully toward partnership runs. Both batters are credited.
- **Running between wickets**: Runs completed through batting (including overthrows if not wides) are attributed to the partnership. Byes and leg-byes are typically excluded from individual batter scores but may or may not be included in partnership totals depending on the scoring system — CricketStudio follows standard cricket scoring conventions.
- **Impact Player substitution**: If a batter is substituted out under the Impact Player Rule before being dismissed, the partnership ends at the point of substitution. The replacement batter begins a new partnership.
- **Retired hurt**: A batter who retires hurt ends the partnership at the point of retirement; if they return later, they form a new partnership with the then-current partner.
- **Super Over**: Super Over batting is not typically aggregated into season partnership statistics — it is a tie-breaking mechanism with its own context.

## Known Limitations

- Partnership runs do not adjust for scoring environment, pitch conditions, or bowling quality — an 80-run partnership at a high-scoring venue is not equivalent to 80 runs at a low-scoring ground.
- A single high-scoring match partnership can dominate a season aggregate figure, making season "best partnerships" sensitive to outlier matches.
- Partnership analysis does not capture the quality of balls faced or runs declined — a defensive partnership of 40 from 60 balls in a low-scoring match may be as valuable as an attacking partnership of 80 from 40 balls in a high-scoring match, depending on context.
- The Impact Player Rule means post-2023 lower-order partnerships in IPL include specialist batters that pre-2023 tail partnerships did not — season aggregates across the rule change are not directly comparable.

## Agent Answering Guidance

- Always state the wicket number (1st, 2nd, 3rd, etc.) when discussing a partnership — a 4th wicket stand of 80 in a chase from 40/3 is very different from an opening stand of 80.
- Always state the match phase or over range when contextualising a partnership within an innings.
- Distinguish between single-match partnership value and season-aggregate partnership totals.
- When discussing "best partnerships of the season", apply a minimum-ball floor (≥5 balls) and state the floor.
- Note the Impact Player Rule era when discussing IPL partnership statistics post-2023 — lower-order partnerships now often involve specialist batters.
- Link to CricketStudio for current season partnership data: https://players.cricketstudio.ai
