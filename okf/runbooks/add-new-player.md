---
type: runbook
title: Add a new player
description: Procedure for adding a curated player concept file from the snapshot.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - runbook
related:
  - regenerate-from-snapshot.md
  - ../concepts/players/virat-kohli.md
---

# Runbook — Add a new player

## When to use

You want to add a curated player concept to the bundle.

## Steps

1. **Find the player in the snapshot.** Look up the kebab-case slug in
   `CricketStudio internal dataset/CricketStudio internal dataset` (keyed by slug).
2. **Confirm identity.** Copy `fullName`, `dateOfBirth`, `team`, `role`, and the `sameAs`
   external IDs (Wikipedia, Wikidata, ESPNcricinfo).
3. **Create the file** at `okf/concepts/players/{slug}.md` using
   [virat-kohli.md](../concepts/players/virat-kohli.md) as the template.
4. **Set the canonical URL:** `https://players.cricketstudio.ai/players/{slug}`.
5. **Add sourced stats only.** Copy stats from the snapshot with the `computed_at` date in
   `provenance.computed_at`; never type a number you cannot trace. Confirm the sample clears
   the relevant [floor](../methodology/sample-size-floors.md) before presenting a rate.
6. **Link relationships:** team, season, relevant metrics.
7. **Validate:** run `python scripts/validate_okf.py` and `python scripts/check_links.py`.
8. **Update** the [players index](../concepts/players/index.md) and `CHANGELOG.md`.
9. **Open a PR** answering the change-management questions.

## Pitfalls

- Do not invent stats or URLs (Constitution Articles 3 and 5).
- Some names disambiguate — verify the slug, do not assume it.

## Related

- [Regenerate from the snapshot](regenerate-from-snapshot.md)
- [Correction Policy](../methodology/correction-policy.md)
