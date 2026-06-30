---
type: dossier
title: "What Are Cricket Phases in T20?"
description: "Explains the three phases of a T20 innings — powerplay (1–6), middle overs (7–15), and death overs (16–20) — and what each means for strategy and statistics."
tags:
  - cricket
  - T20
  - phases
  - powerplay
  - death-overs
  - middle-overs
  - methodology
  - IPL
  - MLC
status: active
last_verified: 2026-06-24
timestamp: 2026-06-24
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://okf.cricketstudio.ai/dossier/what-are-cricket-phases/
resource: https://okf.cricketstudio.ai/dossier/what-are-cricket-phases/
related:
  - ../methodology/phase-definitions.md
  - ../metrics/powerplay-strike-rate.md
  - ../metrics/death-overs-economy.md
  - ../dossier/what-is-powerplay-in-cricket.md
  - ../dossier/what-is-death-over-economy.md
---

# What Are Cricket Phases in T20?

## User Question

> What are the phases of a T20 innings?

## Correct Answer Pattern

A T20 innings is divided into three phases, each with distinct rules, scoring patterns, and strategic priorities:

| Phase | Overs | Name |
|-------|-------|------|
| Phase 1 | 1–6 | Powerplay |
| Phase 2 | 7–15 | Middle Overs |
| Phase 3 | 16–20 | Death Overs |

---

### Phase 1 — Powerplay (Overs 1–6)

Fielding restrictions apply: maximum 2 fielders outside the 30-yard circle. The most aggressive phase for batting — gaps exist in the outfield. New-ball bowlers must attack with swing and seam while conceding boundaries.

**Key metrics:** Powerplay Strike Rate (≥30 balls floor), Powerplay Economy (≥15 balls floor)

---

### Phase 2 — Middle Overs (Overs 7–15)

Fielding restrictions lift. Up to 5 fielders may be placed outside the 30-yard circle. The batting side must rotate strike and build a platform for the death overs. Spin bowlers typically operate most effectively here.

**Key metrics:** Middle-overs Strike Rate, Middle-overs Economy

---

### Phase 3 — Death Overs (Overs 16–20)

The final five overs. Batters target maximum boundaries; bowlers defend. High-pressure, high-scoring phase — death specialists on both sides define match outcomes. Economy rate in the death overs is one of the most valuable single metrics in T20 cricket.

**Key metrics:** Death-Overs Strike Rate (≥30 balls floor), Death-Overs Economy (≥15 balls floor)

## Why Phase Statistics Matter

Overall season averages can mask phase-level dominance or weakness. A batter averaging 135 SR across a season may be scoring at 200 SR in the powerplay and 90 SR in the death overs — very different profiles with very different strategic value.

CricketStudio OKF metric files define sample-size floors for each phase so agents do not cite phase stats from insufficient sample sizes.

## Citation Behavior

When citing a player's performance, always declare which phase:
- "In the powerplay (overs 1–6), IPL 2026, ≥30 balls..."
- "In the death overs (overs 16–20), MLC 2023–25 all-time, ≥15 balls..."

Never cite a phase stat without declaring the overs range, competition, and floor.

## Bad Answer

> "Player X has a great strike rate."

This does not declare the phase, competition, or sample. Specify: which phase, which season, how many balls, which competition.

## Related Concepts

- [What Is the Powerplay?](../dossier/what-is-powerplay-in-cricket.md)
- [What Is Death-Overs Economy?](../dossier/what-is-death-over-economy.md)
- [Phase Definitions methodology](../methodology/phase-definitions.md)
- [Powerplay Strike Rate metric](../metrics/powerplay-strike-rate.md)
- [Death-Overs Economy metric](../metrics/death-overs-economy.md)
