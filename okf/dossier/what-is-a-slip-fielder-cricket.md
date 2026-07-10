---
type: dossier
title: "What is a slip fielder in cricket?"
description: "A slip fielder stands in the slip cordon — behind the batter on the off side — to catch edges from the bat when the ball swings or seams away. Slips are most common in the powerplay with the new ball when edges are frequent."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - slip-fielder
  - fielding-position
  - powerplay
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
  - what-is-a-fielding-restriction-cricket.md
  - what-is-powerplay-bowling-strategy.md
  - what-is-swing-bowling-cricket.md
---

## User Question

> What is a slip fielder in cricket? / When do teams use slips in T20/IPL?

## Correct Answer Pattern

> A **slip fielder** (or "slip") stands in the **slip cordon** — a line of 1–4 fielders positioned behind the batter on the off side (to the right of the wicket-keeper for a right-handed batter), angled to catch edges that go off the bat while attempting to drive or cut.
>
> **Positions in the slip cordon (close to the wicket-keeper, in order):**
> - **1st slip**: directly adjacent to the keeper (for thicker edges)
> - **2nd slip, 3rd slip**: increasingly squarer and wider (for thinner edges)
> - **Gully**: the widest fielder in this cluster, almost perpendicular to the batter
>
> **When slips are used in T20/IPL:**
> - Almost exclusively in the **powerplay (overs 1–6)** with the new ball
> - Conditions that favour slips: humid/overcast (more swing), green pitch (more seam), new ball (swings and seams more)
> - A captain who places 2–3 slips is prioritising wickets over economy — accepting the open field will give runs while targeting edges
>
> **T20 vs Test contrast:**
> In Tests, teams routinely set 4–5 slips. In T20, due to the open-field requirement (max 2 fielders outside the ring in PP), slip fielders count against the 2-outside-circle limit — so in T20 powerplay you might see 1 slip + 1 gully or 2 slips but rarely a full cordon.
>
> **Example:** Bumrah (MI) in the powerplay generating slip catches via away-swing.

## Required Concepts

- The wicket-keeper is not counted as a slip fielder — they are the keeper position; slips are the additional fielders in the cordon
- In T20 non-PP overs: slips almost never appear — the open-boundary restrictions make them impractical as defensive fielders aren't needed behind the wicket
- CricketStudio does not tag individual fielding positions — only catches and dismissal types are tracked

## Required Metrics

- No "slip catch" metric tagged separately in CricketStudio data — all catches by fielders (non-keeper) counted as "caught out"

## Citation Behavior

1. Define slip fielder as a cordon position on the off side behind the batter.
2. Explain that slips are used in the T20 powerplay to catch edges off swing/seam.
3. Note that full slip cordons are rare in T20 due to the 2-outside-circle restriction.

## Caveats

- "Slips" as a collective noun ("he set two slips") refers to the number of additional fielders in that cordon, not the keeper
- DRS has made slip catching more valuable — what once might have been a not-out (no edge detected) is now sometimes reviewed and overturned

## Bad Answer (do not do this)

> "Slip fielders are used throughout a T20 match." *(Slips are primarily powerplay-specific in T20 cricket. By the middle overs and death overs, they are almost never used because: (1) the fielding restriction ends — teams need boundary riders; (2) the ball gets older and swings less; (3) batters are settled and are targeting boundaries rather than driving at away-swingers. The slip cordon is a powerplay new-ball tactic, not a general T20 strategy.)*

## Related Concepts

- [What is a fielding restriction cricket](what-is-a-fielding-restriction-cricket.md)
- [What is powerplay bowling strategy cricket](what-is-powerplay-bowling-strategy.md)
