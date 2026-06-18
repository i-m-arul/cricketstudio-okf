---
type: methodology
title: Correction Policy
description: How CricketStudio OKF corrects cricket data and claims after publication.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - methodology
  - correction
related:
  - data-refresh-policy.md
  - ../runbooks/handle-data-dispute.md
  - citation-policy.md
---

# Correction Policy

## Summary

Cricket data changes after the fact: scorecards get amended, a dismissal is reclassified,
a player's identity is disambiguated. This policy defines how the bundle responds.

## Principles

1. **Source-led.** A correction starts from the upstream source (CricketStudio canonical
   page or the snapshot), never from an ad-hoc edit to a markdown file.
2. **Traceable.** Every correction updates the file's `last_verified` date and, where a
   claim changed, its `provenance.computed_at`. Significant corrections get a CHANGELOG entry.
3. **Reviewable.** Corrections flow through Git pull requests so the diff is inspectable
   (Constitution Article 10).

## Workflow

1. A discrepancy is raised (see [Handle a Data Dispute](../runbooks/handle-data-dispute.md)).
2. Confirm the correct value against the snapshot / canonical page.
3. Update the affected file(s); refresh dates and provenance.
4. Run `validate_okf.py` and `check_links.py`.
5. Add a CHANGELOG note if the change affects a published claim.
6. Merge via PR.

## Edge Cases

- If a value is disputed but unresolved, set `review_required: true` and remove the
  specific claim from release paths until confirmed.
- If a source itself is wrong, document the discrepancy in the source file rather than
  silently overriding it.

## Agent Guidance

- Treat any claim with `review_required: true` as not-yet-trustworthy.
- Prefer the canonical page when a snapshot value may be stale.

## Related Concepts

- [Data Refresh Policy](data-refresh-policy.md)
- [Handle a Data Dispute](../runbooks/handle-data-dispute.md)
