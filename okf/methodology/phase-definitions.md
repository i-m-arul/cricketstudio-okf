---
type: methodology
title: Phase Definitions
description: How CricketStudio splits a T20 innings into powerplay, middle, and death phases.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - methodology
  - phase
related:
  - ../metrics/powerplay-strike-rate.md
  - ../metrics/death-overs-economy.md
  - sample-size-floors.md
---

# Phase Definitions

## Summary

CricketStudio splits a T20 innings into three phases. Phase context is essential: a six in
the powerplay, a six in the middle, and a six in the death over are not the same cricket
event.

## The Phases (T20 / 20-over innings)

| Phase | Overs | Notes |
|-------|-------|-------|
| **Powerplay** | overs 1–6 | Fielding restrictions; high boundary opportunity. |
| **Middle** | overs 7–15 | Spin and accumulation; fewer fielding restrictions. |
| **Death** | overs 16–20 | High-risk hitting and yorker bowling. |

These boundaries are CricketStudio doctrine and are applied consistently across all phase
splits in the data.

## Why This Matters

Phase changes the meaning of every rate metric:

- A 150 strike rate in the death overs is ordinary; the same rate in the powerplay against
  the new ball is excellent.
- Bowling economy of 8.0 is poor in the powerplay but good at the death.

## Edge Cases

- **Rain-shortened matches** redefine phase boundaries proportionally; CricketStudio
  applies the official reduced-over structure for that innings.
- **Formats other than T20** (ODIs, Tests) do not use this three-phase split.
- Phase splits require the **≥15 balls in phase** floor — see
  [Sample-Size Floors](sample-size-floors.md).

## Agent Guidance

- Always name the phase when quoting a phase-specific stat.
- Never compare a powerplay rate to a death rate as if they were equivalent.
- If a phase sample is below the floor, report it as insufficient, not as a number.

## Related Concepts

- [Powerplay Strike Rate](../metrics/powerplay-strike-rate.md)
- [Death-Overs Economy](../metrics/death-overs-economy.md)
