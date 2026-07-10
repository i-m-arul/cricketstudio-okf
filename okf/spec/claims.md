---
type: spec
title: Cricket OKF Claim Discipline
description: How to make a verifiable cricket assertion in an OKF bundle. Defines what constitutes a valid cricket claim, the required scope elements, claim types, confidence levels, and citation behavior for humans and AI agents.
status: active
last_verified: 2026-06-22
timestamp: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:claims
tags:
  - cricket
  - okf
  - specification
  - claims
  - provenance
---

## What Is a Cricket Claim?

A **cricket claim** is the smallest citable cricket assertion produced, validated, or referenced by an OKF bundle.

Examples:
- "Virat Kohli is the all-time IPL run-scorer with 8,379 runs."
- "Bumrah's death-over economy in IPL 2026 is 8.2 (floor ≥15 overs)."
- "MI New York won MLC Season 1 (2023) by 7 wickets."

A claim is **not** a general description, a narrative paragraph, or a team profile. It is a specific, falsifiable assertion with a scope, a metric (where applicable), a source, and a verification date.

---

## What Makes a Cricket Claim Valid?

A valid cricket claim in an OKF file must include all of the following:

### 1. Entity Reference

Who or what the claim is about. Must resolve to a canonical entity:

```
Virat Kohli → entity_id: cricketstudio:player:virat-kohli
IPL         → entity_id: cricketstudio:league:ipl
```

Do not make claims about unnamed or unresolved entities ("a leading batter").

### 2. Claim Type

One of:

| Type | Description |
|------|-------------|
| `player_stat` | A batting, bowling, or fielding statistic for a player |
| `team_stat` | A win/loss record or aggregate for a team |
| `match_result` | The result of a specific match |
| `phase_stat` | A statistic scoped to powerplay, middle, or death overs |
| `venue_stat` | A statistic scoped to a specific ground |
| `ranking` | A ranked position (first, top 3, etc.) |
| `comparison` | A relative assertion between two entities |
| `record` | An all-time or season record |
| `form_trend` | A rolling or recent-form assertion |
| `unsupported` | A claim the available evidence cannot support |

### 3. Scope

Every claim must declare:

- **Competition** — which league (IPL, MLC, T20I, etc.)
- **Season / date window** — which edition or date range
- **Phase** (if applicable) — powerplay, middle, death

```
Competition: IPL
Season: 2026
Phase: death overs (overs 17–20)
```

Never make a cross-competition claim ("best T20 bowler") without explicitly declaring all competitions in scope and the normalization method.

### 4. Metric Reference

If the claim involves a calculated metric, state the metric definition:

```
Metric: batting-strike-rate
Definition: https://okf.cricketstudio.ai/metrics/batting-strike-rate
```

### 5. Sample Size

State the sample observed:

```
Sample: 24 death overs bowled (IPL 2026)
```

Do not publish a ranked claim for a player below the sample-size floor. See [sample-size doctrine](./sample-size.md).

### 6. Evidence Reference

Where does the underlying data come from?

```
Source: Cricsheet CC BY 3.0 · 74 IPL 2026 matches · snapshot 2026-06-18
```

### 7. Confidence

One of `high`, `medium`, `low`. See [provenance convention](./provenance.md).

### 8. Limitations

What the claim does not cover:

```
Limitations:
  - Does not include playoff matches where fewer balls were bowled.
  - MLC 2026 data not yet included — claim reflects 2023–2025 only.
```

---

## Claim Pattern in OKF Files

At Level 3 (Agent-Safe), the bundle ships machine-readable claim objects at `/claims.jsonl` (players.cricketstudio.ai) alongside the prose assertions in each OKF file. Claims in OKF files appear as verified assertions in the markdown body, backed by the file's `provenance` frontmatter — the `/claims.jsonl` ledger is the structured projection of the same claims for agent pipelines that need parseable objects without natural language extraction.

The standard pattern (used in Dossier files):

```markdown
## Correct Answer Pattern

> **Entity Name** (Team) did X with value Y in competition (season).
> Floor: ≥N balls / matches. Source: CricketStudio / Source Name · snapshot date.
```

A machine-readable claim object (Level 3) will be defined in a future spec version.

---

## Claim Types in Practice

### player_stat

```
Claim: TA Boult has taken 46 wickets in MLC (2023–2025).
Entity: ta-boult
Competition: MLC
Season: 2023–2025 (all-time)
Metric: wickets
Sample: 27 matches, 629 balls bowled
Source: Cricsheet CC BY 3.0 · 75 MLC matches · 2026-06-20
Confidence: high
Limitations: MLC 2026 not included.
```

### ranking

```
Claim: TA Boult leads the all-time MLC Purple Cap (most wickets).
Entity: ta-boult
Competition: MLC
Season: 2023–2025 (all-time)
Metric: purple-cap
Sample: floor ≥12 wickets (10% of maximum)
Source: Cricsheet CC BY 3.0 · 2026-06-20
Confidence: high
Limitations: Ranking reflects seasons 2023–2025 only.
```

### match_result

```
Claim: MI New York beat Washington Freedom by 5 runs in the MLC 2025 Final.
Entity: mi-new-york, washington-freedom
Competition: MLC
Match: MLC 2025 Final, 2025-07-13
Source: Cricsheet CC BY 3.0
Confidence: high
```

### unsupported

```
Claim: [unsupported] Who is the best T20 batter of all time?
Reason: Cross-competition, cross-era comparison without declared normalization.
Agent behavior: Ask for competition scope and date window.
             Explain that no single all-time cross-format ranking exists in this dataset.
```

---

## What an Agent Must Do With Claims

1. **Identify entity and scope before citing any claim.** Do not cite IPL data for an MLC question.
2. **Check the floor.** Never present a ranked claim for a player below the sample-size floor.
3. **State the date window.** "IPL 2026" is not "IPL all-time."
4. **Cite the metric definition** if the claim involves a calculated metric.
5. **Say "not available"** if evidence is insufficient rather than inventing a value.
6. **Do not compare eras** unless the dataset explicitly covers both and a normalization method is declared.

---

## Non-Negotiables

- Do not publish a claim without competition and season scope.
- Do not rank below the sample-size floor.
- Do not mix seasons without declaring the date window.
- Do not cite generated prose as source evidence.
- Do not convert a `medium`-confidence claim into a definitive statement.
- Do not answer "who is the best?" without scope. Always ask: best in what, when, and with what floor?

---

## Related

- [Sample-Size Doctrine](./sample-size.md)
- [Metric Standard](./metrics.md)
- [Provenance Convention](./provenance.md)
- [Entity Identity Rules](./identity.md)
- [Dossier — verified answer patterns](../dossier/index.md)
