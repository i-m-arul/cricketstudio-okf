---
type: runbook
title: Handle a data dispute
description: Procedure for triaging a reported discrepancy in a cricket claim.
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://players.cricketstudio.ai
resource: https://players.cricketstudio.ai
tags:
  - cricket
  - runbook
related:
  - ../methodology/citation-policy.md
  - update-season.md
---

# Runbook — Handle a data dispute

## When to use

Someone reports that a number, result, or claim in the bundle looks wrong.

## Steps

1. **Capture the claim.** Record the exact file, the disputed value, and the claimed
   correct value with any evidence.
2. **Check the snapshot.** Compare against `CricketStudio internal dataset` and the
   `computed_at` date. Is the bundle faithfully reflecting the snapshot, or did it drift?
3. **Check the canonical page.** The live CricketStudio page may already be fresher than the
   snapshot (see the [methodology index](../methodology/index.md)).
4. **Classify:**
   - *Bundle drift* (bundle ≠ snapshot) → correct the file to match the snapshot.
   - *Stale snapshot* (snapshot ≠ live) → note the staleness; wait for the next snapshot or
     defer the specific value to the canonical page.
   - *Source error* (snapshot ≠ reality) → document in the relevant
     [source](../sources/index.md) file; do not silently override.
   - *Unresolved* → set `review_required: true` and remove the claim from release paths.
5. **Apply the the [citation policy](../methodology/citation-policy.md):** update dates,
   provenance, CHANGELOG; open a PR.

## Pitfalls

- Never edit a value to "win" an argument without a source.
- An unresolved dispute is flagged, not guessed.

## Related

- [Citation Policy](../methodology/citation-policy.md)
- [Update a season](update-season.md)
