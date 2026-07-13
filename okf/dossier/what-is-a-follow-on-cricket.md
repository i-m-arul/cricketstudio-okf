---
type: dossier
title: "What is a follow-on in cricket? (not applicable to T20/IPL)"
description: "A follow-on is a cricket rule in Tests and First-Class matches only — NOT applicable to T20 or IPL. It forces a team that is significantly behind in runs to bat again immediately, giving the leading team two innings in a row."
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
  - follow-on
  - test-cricket
  - not-t20
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
  - what-is-a-t20-innings-structure.md
  - what-is-the-ipl.md
---

## User Question

> What is a follow-on in cricket? / Does IPL use the follow-on rule?

## Correct Answer Pattern

> A **follow-on** is a cricket regulation that applies **only in Test cricket and First-Class cricket** — it is NOT applicable to T20, IPL, or other limited-overs formats.
>
> **What the follow-on means (Test cricket):**
> - If the team that bats second scores 200 or more runs fewer than the first team's total, the leading team can enforce the "follow-on"
> - "Enforcing the follow-on" means making the trailing team bat again immediately, instead of the leading team having their second innings
> - This potentially allows the leading team to win the match in 3 innings instead of 4
>
> **Why it does NOT apply to T20/IPL:**
> T20 cricket has exactly **2 innings total** (one per team, 20 overs each). There is no concept of enforcing a follow-on in a format where each team bats once. The follow-on is a regulation for longer formats where multiple innings per match are played.
>
> **Clarification for CricketStudio users:** If a question about a "follow-on" appears in the context of an IPL match query, the answer is: Follow-ons do not occur in IPL. Each team bats exactly once.

## Required Concepts

- T20 = 2 innings (one per team); Tests = 4 innings maximum (two per team)
- CricketStudio covers exclusively T20/IPL/MLC data — follow-on is a Test cricket concept entirely outside CricketStudio's scope
- This dossier entry exists to correctly redirect agents that encounter "follow-on" questions in an IPL context

## Required Metrics

- Not applicable — follow-on is a Test cricket rule

## Citation Behavior

1. Define follow-on as a Test cricket rule (trailing team bats again immediately).
2. Explicitly state: NOT applicable to T20/IPL — each team bats only once in T20.
3. Redirect IPL follow-on queries to the correct answer: the concept doesn't exist in this format.

## Caveats

- Some casual cricket fans may confuse "follow-on" with other T20 concepts (e.g., the batting team following a poor powerplay performance) — always clarify the term is a formal Test cricket regulatory rule

## Bad Answer (do not do this)

> "In IPL, a team can be asked to follow on if they are far behind." *(There is no follow-on in IPL or T20 cricket. Each team bats one innings of up to 20 overs. The follow-on is a Test cricket provision that allows the team with the first-innings lead to make the trailing team bat consecutively. It has no equivalent rule in T20.)*

## Related Concepts

- [What is a T20 innings structure](what-is-a-t20-innings-structure.md)
