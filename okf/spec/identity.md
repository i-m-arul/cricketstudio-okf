---
type: spec
title: Cricket OKF Entity Identity Rules
description: How to uniquely and stably identify cricket entities in an OKF bundle. Defines slug conventions, alias handling, same-name player disambiguation, external ID fields, team name scoping, and venue disambiguation. Warns AI agents not to infer identity from name alone.
status: active
last_verified: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:identity
tags:
  - cricket
  - okf
  - specification
  - identity
  - entities
---

## Why Identity Matters

Cricket has a name collision problem. There are multiple players named "Mohammad Amir." "Deccan Chargers" became "Sunrisers Hyderabad." "Brabourne Stadium" is in Mumbai and is different from "Wankhede Stadium" — also in Mumbai. "Rajasthan Royals" was suspended for two seasons and reinstated.

A cricket data system that relies on display names for identity will collide, merge, and confuse. Every entity in an OKF bundle must have a **stable, unique, machine-resolvable identifier** that is decoupled from its display name.

---

## Entity ID Convention

### Format

```
cricketstudio:<type>:<slug>
```

Examples:

```
cricketstudio:player:virat-kohli
cricketstudio:team:mi-new-york
cricketstudio:venue:wankhede-stadium
cricketstudio:league:ipl
cricketstudio:metric:batting-strike-rate
cricketstudio:dossier:mlc-ta-boult-all-time
```

### Rules

1. `type` matches the file's frontmatter `type` field.
2. `slug` is kebab-case, lowercase, ASCII only.
3. `entity_id` is **immutable once published**. Do not rename slugs after a file is live.
4. `entity_id` must be globally unique within the bundle. The validator fails on duplicates.
5. Index files (`index.md`) do not require `entity_id`.

---

## Slug Conventions

Slugs are derived from the Cricsheet or ESPNcricinfo player identifier where one exists — this gives a stable external anchor.

```
ta-boult          →  TA Boult
sn-netravalkar    →  SN Netravalkar
fh-allen          →  FH Allen
```

For entities without a Cricsheet/ESPNcricinfo anchor (venues, league-level entities):

```
grand-prairie-stadium          →  Grand Prairie Stadium
wankhede-stadium               →  Wankhede Stadium, Mumbai
church-street-park-morrisville →  Church Street Park, Morrisville, NC
```

For teams: use the current official franchise name slug:

```
mi-new-york         →  MI New York
texas-super-kings   →  Texas Super Kings
washington-freedom  →  Washington Freedom
```

---

## Aliases

Use the `aliases` field to list all name variants that should resolve to this entity:

```yaml
aliases:
  - Trent Boult
  - T Boult
  - T.A. Boult
  - Boult
```

Aliases are for **lookup and disambiguation** — they do not affect the slug or entity_id. An alias must not create a false merge between two different players who share a common short name.

### Same-Name Player Rule

If two different players share a name (or common alias), they **must not be merged**. Each gets a unique slug that includes a differentiating element:

```
mohammad-amir-pak   →  Mohammad Amir (Pakistan)
mohammad-amir-bd    →  Mohammad Amir (Bangladesh)
```

Merge only when canonical external IDs (Cricsheet, ESPNcricinfo, Wikidata) confirm the same person.

---

## External IDs (`same_as`)

Use `same_as` to link to external identity systems:

```yaml
same_as:
  cricsheet: ta_boult
  espncricinfo: "374226"
  wikidata: Q7688649
  wikipedia: https://en.wikipedia.org/wiki/Trent_Boult
```

External IDs are the authoritative source for resolving ambiguity. If two player files have the same `same_as.cricsheet` ID, they are the same person — resolve the merge.

---

## Team Name Scoping

Teams rename, rebrand, relocate, and merge. OKF team files should scope the `title` to the current name and use `aliases` for historical names:

```yaml
title: Sunrisers Hyderabad
aliases:
  - SRH
  - Deccan Chargers    # historical name, same franchise
```

Do not create a separate file for "Deccan Chargers" — use aliases. Do create a separate file when a franchise is dissolved and a genuinely new franchise takes its slot.

Season-specific records belong in `season` files scoped to that year, not in the team file.

---

## Venue Disambiguation

Venue names are ambiguous — the same city has multiple grounds, and the same ground has had multiple names. Always include the city and, for similarly named grounds, a differentiating geographic qualifier in the slug:

```
wankhede-stadium          →  Wankhede Stadium, Mumbai
brabourne-stadium         →  Brabourne Stadium, Mumbai
eden-gardens              →  Eden Gardens, Kolkata
grand-prairie-stadium     →  Grand Prairie Stadium, Grand Prairie, TX
church-street-park-morrisville →  Church Street Park, Morrisville, NC
```

For multi-ground cities in MLC (Dallas, New York, etc.), always append the city:

```yaml
title: Grand Prairie Stadium
description: MLC home venue in Grand Prairie, TX (Dallas metro area).
aliases:
  - Grand Prairie Stadium, Dallas
  - Grand Prairie, TX
```

---

## Match Identity

Match files must include at minimum:

```yaml
entity_id: cricketstudio:match:<slug>   # e.g. ipl-2026-final
title: <Team A> vs <Team B>, <Competition> <Season>
# plus in frontmatter or body:
# teams, date (ISO 8601), venue, result, season
```

Do not publish a match file without the date and teams — they are the minimum disambiguation fields.

---

## Agent Guidance

**Do not infer identity from display names alone.**

- "Kohli" could be Virat Kohli, Anuj Rawat (nicknamed Kohli by commentators), or a stadium named in his honour.
- "Pollard" could be Kieron Pollard or Keemo Paul (who sometimes appears in the same dataset).
- "Mumbai Indians" could refer to the IPL franchise or the Rangpur Riders (which Pollard has captained as a "Mumbai Indians" ambassador).

Always resolve to a canonical `entity_id` or `same_as.cricsheet` ID before making a claim about a player. If the entity cannot be resolved, state "entity not confirmed" rather than guessing.

---

## Related

- [Type Vocabulary](./types.md)
- [Provenance Convention](./provenance.md)
- [Sample-Size Doctrine](./sample-size.md)
- [Claim Discipline](./claims.md)
