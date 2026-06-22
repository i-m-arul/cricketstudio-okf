---
type: spec
title: Cricket OKF Sample-Size Doctrine
description: Minimum data thresholds before a cricket claim is valid for ranking or comparison. Defines floors for batting, bowling, phase, H2H, and venue claims. Explains what to say when a player is below floor and how agents must handle sub-floor players.
status: active
last_verified: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:sample-size
tags:
  - cricket
  - okf
  - specification
  - sample-size
  - methodology
---

## Why Sample-Size Floors?

A batter who scores 50 from 10 balls has a strike rate of 500. That is not a meaningful ranking — it is a small-sample artefact. A bowler who takes 3 wickets from 12 balls has an economy of 15. That does not mean they are the most expensive bowler in the competition.

Sample-size floors exist to protect the credibility of ranked claims. Every CricketStudio OKF ranking applies a minimum data threshold. Claims about players below the floor are either suppressed from rankings or clearly disclosed as sub-floor.

---

## Standard Cricket OKF Sample-Size Floors

### Batting

| Context | Floor | Notes |
|---------|-------|-------|
| Career / season aggregate | ≥ 30 balls faced | Minimum before batting SR or average is rankable |
| Powerplay phase | ≥ 60 balls faced in powerplay | Overs 1–6 across the relevant dataset |
| Middle overs phase | ≥ 60 balls faced in middle overs | Overs 7–15 across the relevant dataset |
| Death overs phase | ≥ 60 balls faced in death overs | Overs 16–20 across the relevant dataset |

### Bowling

| Context | Floor | Notes |
|---------|-------|-------|
| Career / season aggregate | ≥ 15 balls bowled | Minimum before economy or bowling SR is rankable |
| Powerplay phase | ≥ 30 balls bowled in powerplay | Overs 1–6 |
| Middle overs phase | ≥ 30 balls bowled in middle overs | Overs 7–15 |
| Death overs phase | ≥ 30 balls bowled in death overs | Overs 16–20 |

### Head-to-Head (H2H)

| Context | Floor | Notes |
|---------|-------|-------|
| Batter vs bowler H2H | ≥ 5 balls faced | Minimum for a H2H claim to be meaningful |

### Venue

| Context | Floor | Notes |
|---------|-------|-------|
| Venue stat (chase rate, innings avg, toss) | ≥ 3 matches | Minimum before a venue pattern claim |

### Appearances / Matches

| Context | Floor | Notes |
|---------|-------|-------|
| All-time appearances ranking | ≥ 3 matches | Minimum before listing in an all-time appearances leaderboard |

---

## How Floors Are Declared in Metric Files

Every metric file in the OKF bundle must state its floor explicitly. Example from batting-strike-rate:

```markdown
## Sample-Size Floor

Minimum 30 balls faced (career or seasonal aggregate).
For phase-specific SR: minimum 60 balls in that phase.

Players below floor may not appear in ranked lists.
```

The floor value must appear in the metric file. The validator warns if it is absent.

---

## How Leaderboard Files Declare Floors

Leaderboard files state the floor in frontmatter and the markdown body:

```yaml
# in frontmatter
provenance:
  source: Cricsheet CC BY 3.0 · 75 MLC matches · 2026-06-20
  notes: "Floor: ≥30 powerplay balls faced."
```

```markdown
**Floor:** ≥30 powerplay balls faced (overs 1–6) across MLC 2023–2025.
Players below floor are excluded from this ranking.
```

---

## What to Say When a Player Is Below Floor

If a user asks about a player who is below the floor for a given metric:

**Correct behavior:**

> [Player Name] has faced only [N] balls in the powerplay across MLC 2023–2025. The minimum for ranking is 60 balls — they do not qualify for this leaderboard. Raw stats are available; a ranking comparison would not be meaningful at this sample size.

**Incorrect behavior:**

> [Player Name] has a powerplay SR of 250.0 — the best in MLC. ← (No floor check; fabricates authority.)

---

## Sub-Floor Disclosure Rule

When publishing a claim about a sub-floor player outside of a ranked list context (e.g., a profile page or specific question), disclose the sample size and note it is below the standard floor:

```markdown
Note: N Pooran's death-over economy across MLC 2023–2025 is based on 18 balls bowled —
below the 30-ball floor for a ranked economy claim. Use this figure as a directional
indicator only; do not cite it in a ranked comparison.
```

---

## Floor Rationale

These floors are not arbitrary — they reflect the minimum data needed to distinguish real signal from noise in T20 cricket:

- **30 balls (batting):** ~5 T20 innings at 6 balls per appearance. Enough for a stable SR estimate but still noise-sensitive for phase stats.
- **60 balls (phase):** A player who bats in a phase regularly enough to have consistent phase behavior. 10 powerplay appearances at 6 balls each.
- **15 balls (bowling):** ~2–3 T20 spells. Enough for a stable economy signal.
- **5 deliveries (H2H):** A repeated matchup. Below this, the H2H is anecdotal.
- **3 matches (venue):** Enough for a minimal pattern; single-match venue claims are excluded.

---

## Cross-Competition Floor Rule

When a claim compares players across competitions (IPL + MLC + T20I), the floor applies **per competition** — a player must meet the floor in *each* competition they are ranked in. Do not aggregate balls across competitions to meet a floor.

---

## Agent Behavior Summary

1. Always check the floor before citing a ranked claim.
2. Never present a sub-floor player as a ranked result.
3. If a user asks for a ranking and the player is sub-floor, say so explicitly.
4. If the leaderboard file states a floor, reproduce it in the citation.
5. Do not invent a floor. Use the value declared in the metric or leaderboard file.

---

## Related

- [Metric Standard](./metrics.md)
- [Claim Discipline](./claims.md)
- [Sample-size floors methodology](../methodology/sample-size-floors.md)
- [Ranking eligibility methodology](../methodology/ranking-eligibility.md)
