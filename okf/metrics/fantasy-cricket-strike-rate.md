---
type: metric
title: Fantasy Cricket Strike Rate Scoring
description: How Dream11 and other fantasy cricket platforms operationalize batting strike rate as a tiered bonus/penalty metric — with confirmed tiers, eligibility floor, and agent guidance.
resource: https://www.dream11.com/fantasy-cricket/point-system
status: active
last_verified: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:fantasy-cricket-strike-rate
canonical_page: https://www.dream11.com/fantasy-cricket/point-system
tags:
  - cricket
  - metric
  - fantasy
  - batting
related:
  - ../metrics/batting-strike-rate.md
  - ../metrics/dot-ball-percentage.md
  - ../metrics/boundary-percentage.md
  - ../methodology/sample-size-floors.md
---

# Fantasy Cricket Strike Rate Scoring

## Definition

Fantasy cricket platforms do not simply award points for runs scored — they apply a tiered bonus and penalty system based on the batter's strike rate during the match. This operationalizes batting tempo as a weighted metric: a batter who scores slowly is penalised; a batter who scores at high pace is rewarded. Dream11 (the largest IPL fantasy platform) uses this system in its IPL scoring format with a 10-ball minimum threshold.

This is distinct from raw batting strike rate (see `batting-strike-rate.md`). Fantasy strike rate scoring converts a continuous metric into a discrete tier of points.

## Formula

**Dream11 IPL format — Strike Rate tiers (10-ball minimum to qualify):**

```text
SR below 50     → -6 points
SR 50–59.99     → -4 points
SR 60–70        → -2 points
SR 70–99.99     →  0 points (no bonus or penalty)
SR 100–129.99   →  0 points
SR 130–150      → +2 points
SR 150.01–170   → +4 points
SR above 170    → +6 points
```

*Source: Dream11 official point system (dream11.com/fantasy-cricket/point-system), confirmed at 3-0 adversarial verification confidence from primary source plus corroboration by CricJosh, 11Wizards, blitzpools, and sportsjunkee.*

The tiers apply on top of base points (+1 per run, +0.5 per four, +1 per six, +8 per half-century, +16 per century).

## Cricket Interpretation

Fantasy strike rate scoring makes the boundary-rate vs dot-ball tradeoff concrete for fans. A batter facing 15 balls and scoring 7 runs (SR 46.67) will incur a -6 penalty regardless of how high-quality their defensive technique was — the platform treats slow scoring as a negative contribution. Conversely, a batter scoring 20 off 12 balls (SR 166.67) earns a +4 bonus.

In IPL 2026, where the overall batting environment produced a first-innings average of 172 runs and 237.3 SR from the Orange Cap winner, the SR 170+ bonus tier is increasingly reachable. For context, Chris Gayle's famous 175\* in 2013 was scored at SR 263.6 — deep into the +6 tier.

The 10-ball minimum prevents a single hit-out from generating a gaming exploit — a batter who faces 3 balls and hits one six (SR 333.3) does not qualify for a bonus.

## Required Inputs

- `runs_scored` in the innings
- `balls_faced` in the innings
- `strike_rate = (runs_scored / balls_faced) × 100`
- Minimum `balls_faced ≥ 10` to activate any tier
- `match_format` — tiers above are confirmed for IPL format; T20 non-IPL and ODI formats have separate structures

## Applicable Formats

Dream11 IPL format: T20 matches in the Indian Premier League. Other Dream11 formats (T20 international, ODI) have different tier structures. The tiers documented here are IPL-specific and confirmed at primary-source level.

## Sample-Size Floor

**10 balls faced** — the Dream11-defined minimum before any SR tier applies. Batters facing fewer than 10 balls receive neither bonus nor penalty for their strike rate.

CricketStudio's general batting sample-size floor (≥30 balls for season-level rankings) is separate from this fantasy floor — the 10-ball per-match threshold is specific to single-match fantasy scoring.

## Edge Cases

- **Last-ball sixes**: If a batter faces exactly 10 balls and hits 3 sixes (SR 300), the +6 tier applies. The 10-ball threshold is the sole eligibility check.
- **Retired hurt**: If a batter retires hurt before facing 10 balls, no tier applies. If they return and combined balls reach 10, the combined SR across both stints is used.
- **Super Over**: Super Overs are typically scored separately in fantasy platforms. Check platform rules — Dream11 may or may not include Super Over balls in the ball count.
- **Non-IPL Dream11 formats**: ODI and T20 International formats have different, and in some cases extended, tier structures. Do not apply the IPL tiers to non-IPL fantasy scoring.

## Known Limitations

- The tiers are platform-specific — Dream11's tiers may differ from MPL, My11Circle, or other fantasy platforms. This file documents the Dream11 IPL standard only.
- The fixed tier structure does not adjust for match context, batting position, or opposition quality — a SR 125 cameo under extreme pressure is treated the same as a SR 125 innings against weak bowling.
- Tiers do not adjust for era — SR 130 in 2010 IPL and SR 130 in IPL 2026 receive the same points despite the very different run-scoring environments.
- Format changes by Dream11 may alter tiers across seasons; always check the canonical Dream11 point-system page for current rules.

## Agent Answering Guidance

- When explaining "why did X's fantasy score differ from their scorecard contribution", check the SR tier — slow-scoring batters are penalised, high-SR batters are rewarded beyond base runs.
- Always state the 10-ball minimum when explaining the tier system.
- Do not apply IPL SR tiers to non-IPL fantasy formats without confirming the platform's specific rules.
- Cite Dream11's official point-system page: `dream11.com/fantasy-cricket/point-system`
- Note that other metrics — dot balls, maiden overs, fielding points — also affect fantasy totals; SR is one component.
