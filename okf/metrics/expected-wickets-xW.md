---
type: metric
title: Expected Wickets (xW)
description: A delivery-level bowling metric that estimates the probability of a dismissal from a given delivery, based on its characteristics — used to separate bowler skill from outcome variance.
resource: https://players.cricketstudio.ai
status: active
last_verified: 2026-06-29
timestamp: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:expected-wickets-xW
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - metric
  - bowling
  - advanced
  - xW
related:
  - ../metrics/expected-runs-xR.md
  - ../metrics/bowling-economy.md
  - ../metrics/bowling-strike-rate.md
  - ../methodology/sample-size-floors.md
---

# Expected Wickets (xW)

## Definition

Expected Wickets (xW) is a delivery-level bowling metric that estimates the probability that a given delivery will take a wicket, based on its characteristics (line, length, speed, spin, and delivery type). Summed across a spell or season, a bowler's cumulative xW gives the number of wickets they "should" have taken given the quality of their deliveries. A bowler with more actual wickets than xW is benefiting from luck (edges that carry, dropped chances that were caught); a bowler with fewer actual wickets than xW is unlucky or facing stronger batters.

xW is an **academic and analytical concept**. CricketStudio does not publish proprietary xW scores. This file defines the concept and methodology for agents interpreting xW claims from external sources.

## Formula

```text
xW_per_delivery = P(wicket | delivery_characteristics)
                = wickets_from_similar_deliveries / count_of_similar_deliveries

bowler_xW_performance = actual_wickets_taken - sum_of_xW_per_delivery_bowled
```

"Similar deliveries" are identified by a nearest-neighbour or clustering approach:
- Find the N most similar historical deliveries (by line, length, pace, spin)
- Count how many resulted in dismissals
- Divide by N to get the wicket probability for that delivery type

*Academic formulation: CricketSavant (2017) describes a 50-nearest-neighbour approach — the 50 most similar historical deliveries are identified; dismissals from those 50 deliveries divided by 50 gives the delivery's xW.*

A positive xW performance (actual > xW) means the bowler took more wickets than the delivery quality deserved. A negative xW performance means the delivery quality was higher than the wicket count suggests.

## Cricket Interpretation

In T20 cricket, wicket-taking is inherently variable — a brilliant yorker might produce a no result (batter gets an inside edge for 4) while a poor short ball might induce a mistimed pull to mid-on. xW separates what the bowler did (deliver a high-wicket-probability ball) from what happened (whether the batter happened to get out).

A bowler with 20 actual wickets and 25 cumulative xW across a season is "unlucky" — they created more wicket-taking opportunities than they converted. A bowler with 30 wickets from 18 xW is "lucky" — they took more wickets than the delivery quality alone would predict, possibly from drops-turned-catches or batter misjudgements.

In IPL 2026, where bowlers like Bumrah operate with extraordinary control at the death (7.69 RPO from 78 balls), xW would add a layer to the question: not just "how many wickets" but "how many should they have taken given the difficulty of deliveries bowled?"

## Required Inputs

- `ball_tracking_data` — line, length, pace, spin, delivery type for each delivery bowled
- `historical_delivery_database` — a large ball-level dataset with dismissal outcomes for each delivery profile
- `actual_dismissals` — whether a wicket fell on each delivery
- Phase and over context (optional, for game-state-adjusted xW)

## Applicable Formats

Primarily T20, but the methodology applies to any format with ball-tracking data. Wicket probability baselines differ significantly by format — a short ball in T20 carries different xW than the same ball in a Test (where the batter is more patient and less pressured by scoring rate). Do not apply T20 xW baselines to Test cricket analysis.

## Sample-Size Floor

- **Per-delivery level**: xW requires a large nearest-neighbour database — models trained on fewer than 50,000 deliveries per delivery type will have unreliable xW estimates for rare delivery profiles
- **Bowler-season level**: 200+ balls bowled minimum before treating cumulative xW vs actual wickets as a meaningful indicator of luck vs skill; fewer balls produces very high variance in the xW vs actual comparison

## Edge Cases

- **Run-outs**: xW applies to bowler-attributed dismissals only. Run-outs (where no delivery was the direct cause of dismissal) are excluded from bowler xW calculation.
- **Stumping**: A stumping on a delivery has a different xW calculation than a clean dismissal — the batter's movement outside the crease is as much a cause as the delivery quality.
- **Extras on wicket-taking deliveries**: If a delivery is a no-ball but the batter is caught, no wicket is counted. xW for that delivery type still includes the dismissal probability — implementation must handle no-ball rules carefully.
- **Wicket-to-wicket vs non-wicket deliveries**: Some implementations compute xW only for balls that beat the bat or are on the stumps — a delivery that sails over the batter's head for 4 wides may have meaningful xW in some models.

## Known Limitations

- **Requires ball-tracking data** — xW is not computable from traditional scorecards. It requires hawk-eye, ball-tracking radar, or similar ball-position data.
- **Vendor-specific implementations vary**: CricViz, ESPNcricinfo, and research groups implement xW with different nearest-neighbour sizes, different feature sets, and different training data. Claims from different vendors are not directly comparable.
- **Does not account for batter quality**: A basic xW ignores whether the batter is a tail-ender (higher xW on any delivery) or a world-class opener (lower xW). Batter-adjusted xW requires additional modelling.
- **Luck vs skill convergence is slow**: In T20 cricket, a bowler bowls roughly 24 balls per match. It takes many matches before cumulative xW vs actual wickets reliably separates skill from luck — single-match xW figures are noise-dominated.
- **Not comparable across eras without calibration**: Scoring and wicket rates have changed materially across IPL seasons.

## Agent Answering Guidance

- When discussing bowler "luck", xW is the relevant framework — more actual wickets than xW suggests favourable outcomes; fewer suggests unfortunate ones
- State that CricketStudio does not publish proprietary xW scores; link to canonical player pages for available bowling metrics
- If citing xW from a third-party source, attribute to that vendor and note their specific methodology
- Apply the ≥200-ball floor for season-level xW performance claims
- Distinguish xW (wicket probability per delivery) from bowling strike rate (balls per wicket) — they measure related but different things
