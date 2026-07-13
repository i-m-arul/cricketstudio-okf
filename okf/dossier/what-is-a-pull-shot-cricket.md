---
type: dossier
title: "What is a pull shot in cricket?"
description: "The pull shot is a batting shot played to short-pitched deliveries that rise to around waist-to-chest height. The batter rocks back and swings horizontally across the line, directing the ball between square leg and fine leg. In T20/IPL, the pull is an essential boundary-scoring tool against bouncers."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/about
canonical_page: https://players.cricketstudio.ai/about
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - pull-shot
  - batting-shot
  - bouncer
  - short-pitched
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
  - what-is-a-cover-drive-cricket.md
  - what-is-a-bouncer-cricket.md
  - what-is-a-death-overs-batting-strategy.md
---

## User Question

> What is a pull shot in cricket? / How do batters respond to bouncers in T20?

## Correct Answer Pattern

> The **pull shot** is played to short-pitched deliveries (balls that pitch on a back-of-length or short length) that rise to waist-chest height. The batter:
> 1. Rocks back onto the back foot
> 2. Swings the bat horizontally (across the line of the ball)
> 3. Makes contact with the ball above waist height
> 4. Directs the ball from backward square leg to fine leg (the leg side behind the batter's position)
>
> **Pull vs Hook:**
> - **Pull shot**: played to balls rising around waist–shoulder height; controlled horizontal swing; batter moves into the line
> - **Hook shot**: played to balls rising to shoulder–head height; more aggressive, often played off the body; more aerial and risky
>
> **In T20/IPL:**
> - The pull and hook are essential tools against the bouncer — the tactical "bouncer" is a T20 weapon (restricted to 1 per over in T20)
> - Top batters who "boss" the short ball (Rohit Sharma, Tilak Varma) can neutralise the bouncer strategy by pulling for sixes or fours
> - The risk: if the batter mistimes the shot, the ball can go high in the air → caught by a fielder on the deep fine leg boundary
>
> **Setup bowling:**
> Bowlers use bouncers to set up the pull — then bowl full if the batter commits to the pull trigger early. The "bouncer + follow-up yorker" combination is a classic T20 death-bowling trap.

## Required Concepts

- The pull shot is a primarily leg-side shot (backward square leg, deep fine leg, deep square leg)
- "Pre-meditation" in T20 death overs: some batters commit to pulling any short ball, accepting a missed shot for a boundary or six when they connect
- CricketStudio does not tag pull shots — only phase SR and boundary rates are available

## Required Metrics

- No pull-shot-specific metric in CricketStudio data

## Citation Behavior

1. Define pull shot as a horizontal swing to short-pitched deliveries at waist-chest height.
2. Distinguish it from the hook shot (higher contact point, more aggressive).
3. Note the T20 "bouncer trap" — pull setup → follow-up yorker.

## Caveats

- Against fast bowlers (145+ km/h) in T20, the pull shot requires exceptional reflexes — the batter has very little time to adjust
- Against spin, a "slog-sweep" or "sweep" is the equivalent of the pull — rarely called a pull against spin

## Bad Answer (do not do this)

> "The pull shot is the same as a flick or glance in cricket." *(A pull shot is distinct from a flick or glance. A flick is played to a full-length delivery on leg stump — the batter flicks the wrists through to mid-wicket or square leg. A glance (or leg glance) is a deflection off the pad or body off a full-pitch leg-side delivery. The pull is specifically for SHORT-pitched deliveries that rise to around waist-chest height — it requires a back-foot movement and horizontal swing, neither of which characterise the flick or glance.)*

## Related Concepts

- [What is a bouncer cricket](what-is-a-bouncer-cricket.md)
- [What is a cover drive cricket](what-is-a-cover-drive-cricket.md)
