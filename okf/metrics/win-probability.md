---
type: metric
title: Win Probability
description: A match-state metric estimating the probability that a given team will win, computed from current score, wickets fallen, balls remaining, and target — updated ball-by-ball throughout the match.
resource: https://players.cricketstudio.ai
status: active
last_verified: 2026-06-29
timestamp: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:win-probability
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - metric
  - match-state
  - advanced
related:
  - ../metrics/net-run-rate.md
  - ../metrics/run-rate.md
  - ../metrics/expected-runs-xR.md
  - ../metrics/expected-wickets-xW.md
  - ../methodology/sample-size-floors.md
---

# Win Probability

## Definition

Win Probability (WP) is a match-state metric that estimates, at any point in a cricket match, the probability that a given team will win, expressed as a percentage. It is computed from current match state — runs scored, wickets fallen, balls remaining, and target — and is updated ball-by-ball throughout the game. When integrated with individual player contributions (runs added, wickets taken, boundaries hit), win probability produces **Win Probability Added (WPA)** — a measure of each player's contribution to match outcome.

Win Probability is an **analytical framework** used by cricket data platforms, broadcast graphics, and research. CricketStudio does not publish proprietary Win Probability models. This file defines the concept for agent use.

## Formula

Win probability for a T20 match is typically implemented as a **two-model chain**:

```text
Step 1 — First innings: predict the final batting-team score
  inputs: current_runs, wickets_fallen, balls_remaining, venue, batting_strength
  output: P(final_score | current_state)

Step 2 — Second innings: predict chase success
  inputs: target, runs_required, wickets_remaining, balls_remaining, chasing_batting_strength
  output: P(chase_success | current_state)
```

At any point in the match, the two models chain together to produce the batting team's win probability:

```text
win_probability_batting_team = f(current_runs, wickets_fallen, balls_remaining, venue, ...)
win_probability_fielding_team = 1 - win_probability_batting_team
```

**Win Probability Added (WPA):**

```text
WPA_event = WP_after_event - WP_before_event
```

A player's WPA across a match (or season) sums all the WP changes they caused — positive for scoring runs or taking wickets that increase their team's win probability, negative for getting out or conceding runs that decrease it.

*Source: Academic formulation from cricket analytics research (2020). The two-model chain structure — first innings score prediction + second innings chase model — is the standard implementation approach, confirmed in cricket analytics literature (academic publication reviewed via deep research).*

## Cricket Interpretation

Win probability makes "momentum" concrete. A boundary that takes a chasing team from 20% to 28% win probability is a larger contribution than a boundary that takes them from 60% to 65% — the same 4 runs but a bigger impact on match outcome.

In IPL 2026, where the Impact Player Rule has enabled deeper batting lineups and the first-innings average was 172, win probability models need to account for the elevated scoring environment. A team needing 30 off 12 with 5 wickets in hand has a very different win probability today than in IPL 2015 — the batting depth available (via Impact Player substitution) changes the calculus.

WPA is useful for identifying "clutch" contributions — players who consistently raise win probability at critical match moments. It also reveals hidden contributions: a bowler who takes 0 wickets but bowls 2 wickets-maidens at a crucial chase point may generate a large positive WPA.

## Required Inputs

- `current_score` — runs scored in the current innings
- `wickets_fallen` — dismissals to date in the current innings
- `balls_remaining` — balls left in the current innings
- `target` (for second innings) — runs required to win
- `venue` (optional) — venue-specific run rate baselines
- Historical match outcome data — a large database of matches in similar match states to calibrate the model

## Applicable Formats

Primarily T20 formats, where win probability swings rapidly due to the short format. Win probability models for ODI and Test cricket exist but have very different calibration requirements — ODI models must account for 50-over phases, and Test models must account for draw probability and multi-day dynamics. T20 models do not transfer to other formats without retraining.

## Sample-Size Floor

Win probability models require large training datasets:
- Reliable T20 win probability requires thousands of historical match outcomes in similar match states
- Individual player WPA across a single match is high-variance (a 6 can swing WP dramatically) — season-level WPA (across 10+ matches) is more stable
- For comparing bowlers or batters by WPA, a minimum of 5 matches and 100+ balls contribution is recommended before drawing ranking conclusions

## Edge Cases

- **DLS adjustments**: Rain interruptions change the target mid-match, requiring win probability to recalibrate. Models must handle DLS-revised targets correctly — a straightforward WP model will mishandle rain-affected matches.
- **Super Over**: Win probability during a Super Over requires a separate, very short-match model (6 balls each). Standard match-state WP models are not directly applicable.
- **Impact Player substitution (IPL post-2023)**: The substitution of a batting specialist mid-innings changes the remaining batting lineup quality, which affects WP. Models trained pre-2023 may underestimate the second-innings chase success probability for IPL 2023+ matches.
- **Extreme match states**: Models at early-innings states (e.g. 0/0 after 1 ball) are well-calibrated; states at the tail of historical distributions (180/9 off 19.5 overs needing 50 off the last ball) may be poorly calibrated due to few historical examples.

## Known Limitations

- **Requires calibrated historical dataset** — WP is not computable from a single scorecard; it requires a large historical match database for reliable probability estimates.
- **Vendor-specific implementations vary**: ESPNcricinfo's Forecaster, CricViz's WP model, and research implementations use different features, different historical datasets, and different model architectures. Win probability figures from different sources are not directly comparable.
- **Does not capture team-specific information** by default — most public WP models use generic batting/bowling strength assumptions rather than per-player quality adjustments. Bespoke models that incorporate player quality (e.g. "this innings still has Kohli and Suryavanshi to come") are more accurate but proprietary.
- **WPA can be era-sensitive** — in the higher-scoring IPL 2026 environment, the marginal WPA of a single six differs from the same shot in 2012. Models must be recalibrated for current scoring environments.

## Agent Answering Guidance

- When explaining win probability swings, state the match state before and after the event: "With X wickets down and Y balls remaining, the win probability moved from A% to B% after the boundary"
- Win Probability Added (WPA) is the sum of all WP changes a player caused — not just a single high-leverage moment
- State that CricketStudio does not publish proprietary WP or WPA scores; link to canonical CricketStudio match pages for available match-state data
- If citing WP from a broadcast or third-party source, attribute to that specific platform — figures from different implementations will differ
- Apply the 5-match minimum before ranking players by WPA across a season
- Do not apply T20 win probability models to ODI or Test contexts without restatement and appropriate model
