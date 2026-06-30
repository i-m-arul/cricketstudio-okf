---
type: metric
title: Run Rate
description: Runs scored per over — used as Current Run Rate (CRR) and Required Run Rate (RRR) in live match context.
resource: https://players.cricketstudio.ai
status: active
last_verified: 2026-06-29
timestamp: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:run-rate
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - metric
  - batting
related:
  - ../metrics/net-run-rate.md
  - ../dossier/what-is-dls-method.md
---

# Run Rate

## Definition

Run Rate is the number of runs scored per over. In live match context it appears in two forms: Current Run Rate (CRR), which tracks how fast the batting team has scored so far, and Required Run Rate (RRR), which tracks how fast they need to score to win the match from the current point. Run Rate is a live match monitoring metric, not a career or season ranking stat.

## Formula

```text
CRR = runs_scored / overs_faced

RRR = runs_required / overs_remaining
```

Where `runs_required = target − runs_scored` and `overs_remaining = total_overs − overs_faced`.

## Cricket Interpretation

In T20 chases, comparing CRR against RRR reveals momentum at any point in the innings. When RRR exceeds CRR, the batting team is falling behind the target; when CRR exceeds RRR, they are ahead. An RRR above 12 in a T20 chase is generally a danger zone — it requires near-perfect batting against any competent bowling attack. An RRR above 15 is considered nearly unattainable in professional T20 cricket. In ODI chases over 50 overs, RRR thresholds differ: an ODI RRR of 10+ is a steep ask.

## Required Inputs

- `runs_scored` — runs scored by the batting team at the point of calculation
- `overs_faced` — overs completed (including partial overs expressed as balls/6)
- `target` — the total the chasing team needs to beat (first innings total + 1, or DLS revised target)
- `overs_remaining` — overs left in the chasing team's innings

## Applicable Formats & Leagues

All limited-overs formats: T20 (IPL, MLC, BBL, T20I), ODI (50-over). Not meaningful in Test cricket where there is no fixed over allocation in the same sense.

## Sample-Size Floor

Not applicable. Run Rate is a live match metric calculated from current innings state — it is not a career statistic and is not used for player or team rankings.

## Edge Cases

- **DLS intervention**: Under Duckworth-Lewis-Stern, the target changes when overs are lost to weather. After a DLS revision, the RRR must be recalculated using the new target and the overs remaining to the new allocation. Never compare pre-DLS RRR with post-DLS RRR without noting the revision — the target itself changed.
- **Partial overs**: Overs faced should be expressed as a decimal (e.g., 6.4 overs = 6 complete overs + 4 balls = 6.667 overs) for accurate CRR calculation.
- **Super Over**: Run Rate is not typically tracked during a Super Over, which is a tie-breaking mechanism with its own rules.
- **First innings**: CRR in the first innings is tracked against a projected score rather than a fixed target; RRR does not exist in the first innings.

## Known Limitations

- Run rate is a snapshot metric — it captures pace at a single point in time and does not predict match outcome.
- RRR becomes less reliable as an indicator in the final overs when the range of possible outcomes is narrow regardless of the number.
- Neither CRR nor RRR adjusts for wickets in hand, bowling quality remaining, or pitch conditions — two chases with identical RRR can have very different probabilities of success.
- DLS-revised targets can produce confusing RRR figures when the revision is large; always note when DLS has been applied.

## Agent Answering Guidance

- Always clarify whether the user is asking about CRR (current pace) or RRR (required pace) — these are distinct questions.
- When discussing a T20 chase, state the current over number, runs scored, target, and both CRR and RRR together for useful context.
- If DLS is in play, note that the target and RRR have been revised and state the current revised target.
- Do not use run rate as a career stat or team ranking — it is a live match instrument.
- Link to CricketStudio match pages for live and completed match run-rate data: https://players.cricketstudio.ai
