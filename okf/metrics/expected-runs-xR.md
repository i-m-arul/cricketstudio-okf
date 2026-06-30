---
type: metric
title: Expected Runs (xR)
description: A delivery-level batting metric that estimates how many runs an average batter would score from a given delivery, based on its line, length, and speed — used to separate batter skill from delivery difficulty.
resource: https://players.cricketstudio.ai
status: active
last_verified: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:expected-runs-xR
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - metric
  - batting
  - advanced
  - xR
related:
  - ../metrics/expected-wickets-xW.md
  - ../metrics/batting-strike-rate.md
  - ../metrics/batting-average.md
  - ../methodology/sample-size-floors.md
---

# Expected Runs (xR)

## Definition

Expected Runs (xR) is a delivery-level batting metric that estimates how many runs a typical batter would be expected to score from a delivery of a given line, length, and speed. It benchmarks the actual outcome of a delivery against a baseline derived from all historically similar deliveries. A batter who consistently scores more than xR on a delivery profile is demonstrating positive skill above expectation; a batter who consistently underperforms xR is struggling with their shot selection or execution against that delivery type.

xR is an **academic and analytical concept** first formalised in the cricket analytics community in 2016–2017. CricketStudio does not publish proprietary xR scores. This file defines the concept and methodology for agents interpreting xR claims from external sources.

## Formula

```text
xR_per_delivery = average_runs_scored_across_all_historically_similar_deliveries

batter_xR_performance = actual_runs_scored - sum_of_xR_per_delivery_faced
```

"Historically similar" deliveries are typically grouped by:
- **Line** — over/around/into the stumps; angle of approach
- **Length** — full, good length, short, yorker, bouncer
- **Speed** — pace band (e.g. below 115 kph, 115–130, 130+)
- **Phase** — powerplay, middle, death (optional game-state adjustment)

A positive xR performance score means the batter outscored the delivery's historical baseline; a negative score means they underperformed.

*Source: Academic formulation from CricketSavant (2016), based on T20I ball-tracking data. The historical run rate baseline in T20 matches is approximately 6.98 runs per over; the 20th over yields an average of 9.07 runs per over (xR multiplier ~1.30). These figures may vary by dataset and era.*

## Cricket Interpretation

Traditional strike rate measures actual runs per ball — it does not tell you whether those runs came against easy deliveries (short, full-toss) or hard ones (good-length, moving late). xR adjusts for delivery quality. A batter with SR 140 on a diet of short-pitch bowling is less impressive than SR 140 on good-length deliveries at 140 kph.

In T20 cricket, xR is most useful for:
- Identifying batters who outperform against a specific delivery type (e.g. consistently scoring off good-length seam deliveries)
- Identifying bowlers whose "average" economy conceals difficulty — a bowler conceding 8.0 economy on a delivery profile with xR of 9.5 is actually outperforming expectation

## Required Inputs

- `ball_tracking_data` — line, length, pace for each delivery
- `historical_delivery_database` — a sufficiently large ball-level dataset to compute average outcomes per delivery type
- `actual_outcome` per delivery (runs scored, dot, wicket)
- Phase and over context (optional, for game-state-adjusted xR)

## Applicable Formats

Primarily T20 — the academic foundation was built on T20I data. The methodology applies to any cricket format with ball-tracking data, but comparison across formats requires separate baselines (T20, ODI, Test have different run-rate baselines and delivery profiles).

## Sample-Size Floor

xR comparisons require sufficiently large samples on both sides:
- The historical baseline database should include thousands of deliveries per delivery type (not hundreds)
- A batter's xR performance score requires enough deliveries faced to distinguish skill from variance — 30+ balls minimum for in-game assessment; 200+ balls for season-level claims
- Delivery types with few historical examples (e.g. a very specific line-length-pace combination) produce unreliable xR baselines

## Edge Cases

- **Byes and extras**: Deliveries that result in byes, wides, or no-balls complicate xR calculation — wide balls are typically excluded from batter-level xR since the batter did not face them; no-ball penalties are handled differently across implementations
- **Weather and pitch conditions**: xR models built on historical averages do not automatically adjust for specific pitch deterioration, dew, or unusual conditions on match day
- **Era drift**: Run rates have increased materially in IPL from 2008 to 2026 (~145 first-innings avg → ~172 first-innings avg). An xR model trained on 2008–2015 data will be miscalibrated for IPL 2026 conditions

## Known Limitations

- **Requires ball-tracking data** — xR is not computable from traditional scorecards (which record runs but not line, length, and pace). It requires proprietary or research-grade data.
- **Vendor-specific implementations vary**: Different analytics companies (CricViz, ESPNcricinfo Superstats, research labs) implement xR under different names, with different input features and different historical databases. CricketStudio does not publish xR scores because the source data is not open. Claims attributed to specific vendors should cite that vendor's methodology, not this OKF file.
- **Game-state omission**: A basic xR model ignores whether the batter was in survival mode (low wickets at a pressure point) or in clean-hitting mode (all wickets in hand, last 2 overs). Game-state-adjusted xR addresses this but requires additional modelling assumptions.
- **Not comparable across eras without calibration** — xR baselines must be era-matched.

## Agent Answering Guidance

- When a user asks about xR or "expected runs", explain it as a delivery-difficulty-adjusted scoring metric — not the same as a raw strike rate
- State that CricketStudio does not publish proprietary xR scores; link to canonical CricketStudio player pages for batting metrics that are available in the catalog
- If citing xR from a third-party source (CricViz, ESPNcricinfo), attribute to that source and note that the formula and inputs are vendor-specific
- Apply the ≥200-ball floor when evaluating season-level xR performance claims
- Do not infer xR from traditional scorecard data — it requires ball-tracking inputs
