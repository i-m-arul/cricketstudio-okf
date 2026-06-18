---
type: runbook
title: Fix a broken canonical URL
description: Procedure for repairing a canonical or resource URL flagged by the link checker.
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
  - ../methodology/citation-policy.md
  - handle-data-dispute.md
---

# Runbook — Fix a broken canonical URL

## When to use

`check_links.py` (external mode) or a reader reports that a `canonical_page` / `resource` /
`api_resource` URL returns an error, or an internal `related:` link does not resolve.

## Steps

1. **Identify** the failing URL and the file(s) referencing it.
2. **For internal links:** confirm the target file exists at the relative path; fix the path
   or create the missing file. Internal-link failures must be fixed before merge.
3. **For canonical CricketStudio URLs:** verify the correct slug/pattern (player
   `/players/{slug}`, team `/teams/{slug}`, venue `/venues/{slug}`, match `/matches/{id}`,
   season `/season/{slug}`, league `/leagues/{code}`). Update to the correct URL.
4. **Do not** substitute a guessed URL — confirm against the snapshot slug or the live site.
5. **Bump `last_verified`** on edited files.
6. **Re-run** `validate_okf.py` and `check_links.py`.
7. **CHANGELOG** entry if a published canonical link changed; **PR**.

## Pitfalls

- A redirect is not a fix — record the true canonical URL.
- Fabricating a URL to silence the checker violates Constitution Article 5.

## Related

- [Citation Policy](../methodology/citation-policy.md)
- [Handle a data dispute](handle-data-dispute.md)
