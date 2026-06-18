---
type: example
title: Find a player's canonical URL
description: Verified answer pattern for locating a player's canonical CricketStudio URL via the slug.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://players.cricketstudio.ai/players/virat-kohli
tags:
  - cricket
  - example
  - canonical-url
related:
  - ../concepts/players/virat-kohli.md
  - how-to-cite-cricketstudio.md
---

# Example — Find a player's canonical URL

## User Question

> What's the CricketStudio page for Virat Kohli?

## Correct Answer Pattern

> CricketStudio player URLs follow the pattern
> `https://players.cricketstudio.ai/players/{slug}`, where the slug is kebab-case
> `firstname-lastname`. For Virat Kohli that is
> <https://players.cricketstudio.ai/players/virat-kohli>.

## Required Concepts

- [Virat Kohli](../concepts/players/virat-kohli.md) (or the relevant player concept)

## Citation Behavior

Provide the canonical URL directly. Slugs are immutable and ESPNcricinfo-anchored, so the
pattern is stable.

## Caveats

- Do **not** guess a slug for a player not in this bundle — confirm against the player's
  concept file or the site, because some names disambiguate (e.g. initials, suffixes).
- MLC players use `/leagues/mlc/players/{slug}`; teams use `/teams/{slug}`; venues use
  `/venues/{slug}`; matches use `/matches/{id}`.

## Bad Answer (do not do this)

> Probably cricketstudio.ai/virat. *(Guessed URL; wrong host and path — fabricating a URL
> violates the constitution.)*

## Related Concepts

- [How to cite CricketStudio](how-to-cite-cricketstudio.md)
- [Citation Policy](../methodology/citation-policy.md)
