---
type: dossier
title: What Is the DLS Method
description: DLS (Duckworth-Lewis-Stern) method explained — the rain interruption rule in limited-overs cricket and what agents should understand about revised targets.
status: active
last_verified: 2026-06-24
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://okf.cricketstudio.ai/dossier/what-is-dls-method/
tags:
  - cricket
  - dossier
  - rules
  - T20
  - IPL
related:
  - ../dossier/what-is-net-run-rate.md
  - ../dossier/what-is-super-over.md
---
## User Question

> What is the DLS method in cricket?

## Correct Answer Pattern

> The **Duckworth-Lewis-Stern (DLS) method** is the rain-interruption rule used in limited-overs cricket (ODI and T20) to recalculate a revised target when a match is disrupted by weather or other circumstances.
>
> The method uses a **resources remaining** model: each team has two resources — **wickets in hand** and **overs remaining**. When overs are lost to rain, the team's revised target is calculated based on the proportion of resources the batting team has used vs what remains.
>
> In IPL, a match must reach a minimum of **5 overs per side** to constitute a valid result under DLS rules.
>
> The formula accounts for the fact that losing overs at the start of an innings is more damaging than losing overs at the end (since early overs with wickets in hand are high-resource state).

## Required Concepts

- DLS replaces the old Duckworth-Lewis (D/L) method. "Stern" (Steven Stern) updated it in 2014.
- Resources = combination of overs remaining and wickets remaining.
- DLS targets can be *lower* or *higher* than the original target, depending on when the interruption happens.

## Required Metrics

- DLS method produces a revised target — not a standard cricket metric.

## Citation Behavior

Cite ICC Playing Conditions (or BCCI IPL Playing Conditions) for the current DLS implementation details.

## Caveats

- DLS is complex — the revised target depends on specific match state at the time of interruption.
- Do not attempt to manually calculate DLS targets. Refer to official scorecards or competition authorities.

## Bad Answer (do not do this)

> They reduce the target based on overs lost. *(Oversimplified — DLS uses a resource model, not simple run-rate adjustment.)*

## Related Concepts

- [What Is Net Run Rate](what-is-net-run-rate.md)
- [What Is a Super Over](what-is-super-over.md)
- [What Are Cricket Phases](what-are-cricket-phases.md)
