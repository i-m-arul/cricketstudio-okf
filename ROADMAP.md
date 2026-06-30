# CricketStudio OKF — World-Class Roadmap

## Current State (post-sprint)
- 522 files validated, 0 errors, 665 warnings (cosmetic — missing optional alias fields)
- FAQPage + BreadcrumbList + Article JSON-LD — shipped
- Per-page OG images (135 unique) — shipped
- Type-aware title suffixes — shipped
- WebSite schema + SearchAction on homepage — shipped
- FAQPage aggregate on /dossier/ — shipped
- .well-known/ai-plugin.json — shipped
- 7 new dossier files (fastest-century, spin-bowler-2026, ipl-2026-best-team, powerplay-batter-all-time, ipl-vs-other-leagues, salary-cap, all-time-death-bowler) — shipped
- 5 new metrics (NRR, run-rate, average-vs-SR, phase-split-economy, partnership-value) — shipped

## Deep-Research Findings (completed 2026-06-29, 104 agents, 25 verified claims)

### Confirmed new facts for OKF content
1. Suryavanshi: **72 sixes** in IPL 2026 — IPL season record (surpassing Gayle's prior record). Previously OKF only stated "most sixes" without the count.
2. Suryavanshi: **youngest to 500+ runs in IPL season** — 15 years 27 days (prior record: Prithvi Shaw at 19y 164d) — confirmed 2-1 (secondary source dependent)
3. Kohli: **9,000 IPL career runs** milestone — first in IPL history, reached April 27 2026 (Match 39, DC vs RCB) — confirmed 3-0
4. Kohli: **SR is 165.85** (not 165.8 as previously stated in OKF files) — confirmed 3-0
5. Kohli: **75\* off 42 balls in IPL 2026 final**, including fastest-ever IPL fifty (25 balls), won Player of the Match — confirmed 3-0
6. Kohli: **1 century (105\* vs KKR)** and 5 half-centuries in IPL 2026 — confirmed
7. Impact Player Rule: **Axar Patel publicly opposed it** (March 23 2026 press conference) — confirmed 3-0
8. Impact Player Rule: **top 5 successful IPL run chases all post-2023** — confirmed 2-1
9. IPL 2026 early phase: **8 of 12 completed matches won by chasing teams** (first 13 matches), all but 2 captains chose to field after winning toss — confirmed 3-0

### Claims that FAILED verification (must NOT be hardcoded in OKF)
- IPL 2026 Final scorecard: GT 155/8, RCB 161/5 by 5 wickets at NMS — REFUTED 0-3. Do not hardcode these scores.
- Rabada Purple Cap "29 wickets" — failed 1-2. Already in OKF from prior session; must be flagged with `review_required: true` or caveated.
- "All ten captains opposed Impact Player Rule" — REFUTED 0-3 (only Axar Patel confirmed)
- "BCCI refused rule change until 2027" — REFUTED 0-3 (BCCI declined mid-season change, timeline unconfirmed)
- CricViz xR/xW metric specific names and formulas — FAILED verification; can define concept but must not claim CricViz's exact methodology
- Suryavanshi "53 sixes" (Indian batter record) + Gayle "59 sixes" overall record — REFUTED 0-3. The confirmed number is 72 total sixes (IPL season record).

### Metric gaps confirmed by research
- **Fantasy strike rate scoring** (Dream11 SR tiers) — confirmed high, primary source: tiered +2/+4/+6 bonuses and -2/-4/-6 penalties with 10-ball floor. This is a publishable methodology explainer.
- **Expected runs (xR)** — academic concept verified from CricketSavant blog (2016-2017). Formula: runs expected from a delivery given line/length/speed vs average. Publishable as concept file with "source required" caveat for CricViz-specific formulas.
- **Expected wickets (xW)** — same source; nearest-neighbor algorithm across 50 similar deliveries. Publishable as concept.
- **Win probability contribution** — from academic/blog sources; two-model chain (first-innings score prediction + second-innings chase model). Publishable as concept.

## Next Sprint — Content from Deep Research

### Sprint 6 — New dossier files (high-value fan questions)

These are NEW dossier files confirmed by deep research findings. All use `derived_claims_only` + OKF discipline.

| File | Key fact | Confidence |
|------|----------|------------|
| `suryavanshi-72-sixes.md` | 72 sixes in IPL 2026, IPL season record — confirmed 3-0 | high |
| `suryavanshi-youngest-500-runs-ipl.md` | 15y 27d, youngest to 500 in IPL season — confirmed 2-1 | medium |
| `kohli-9000-ipl-runs.md` | First to 9,000 IPL career runs, April 27 2026 — confirmed 3-0 | high |
| `kohli-ipl-2026-final.md` | 75\* off 42, fastest IPL fifty (25 balls), PoM — confirmed 3-0 | high |
| `ipl-2026-chase-dominance.md` | 8/12 early matches won by chasers, toss→field almost universal | high |
| `impact-player-rule-controversy-2026.md` | Axar Patel opposing, top-5 run chases all post-2023 | medium |
| `how-does-dls-work.md` | Rain rule — methodology explainer, no live stats | high |
| `highest-individual-score-ipl.md` | Gayle 175\* 2013 — all-time record (use "among the highest" caveat if not fully verified) | medium |
| `kohli-vs-rohit-career-ipl.md` | Kohli 9000+ runs vs Rohit ~7183 — provenance from Kohli milestone confirm | high |
| `most-sixes-ipl-history.md` | Suryavanshi 72 sixes IPL 2026 record — links to canonical leaderboard | high |

### Sprint 6 — New metric files from research gaps

| File | Content |
|------|---------|
| `fantasy-cricket-strike-rate.md` | Dream11 SR tiers — penalty/bonus tiers, 10-ball floor, primary source confirmed |
| `expected-runs-xR.md` | xR concept — runs expected from delivery by line/length/speed, formula from CricketSavant 2016 blog |
| `expected-wickets-xW.md` | xW concept — nearest-neighbor 50 deliveries, from CricketSavant 2017 blog |
| `win-probability.md` | Two-model chain (first innings score prediction + chase model), WPA framing |

### Sprint 6 — Updates to existing files

| File | Fix |
|------|-----|
| `okf/stories/kohli-at-37-best-average.md` | Correct SR: 165.8 → 165.85; add 9,000-run milestone; add final PoM performance |
| `okf/dossier/ipl-2026-purple-cap.md` | Add `review_required: true` caveat — Rabada 29 wickets failed 1-2 adversarial verification |
| Any file referencing "IPL 2026 Final scorecard" | Remove/caveat specific scores (GT 155/8, RCB 161/5) — REFUTED 0-3 |

### Sprint 7 — Tier 3 polish (unchanged)
- CHANGELOG v0.5 entry (covers all recent sprints)
- `okf/releases/v0.5.md` release page
- Fix 665 validator warnings (bulk script for missing `timestamp`/`resource` alias fields)

---

## Gaps (ranked by impact) — carried forward

### Tier 1 — Content (biggest fan/agent value)

**A. 4 Impact Player stories** — already planned below, STILL NOT WRITTEN

**B. Remaining dossier files** for top fan questions:
- `who-won-ipl-2026.md` — **Note: do NOT hardcode specific scorecard** (refuted 0-3); link to canonical page
- `most-wickets-ipl-history.md` — all-time purple cap leaders
- `best-spin-bowler-ipl.md` — all-time (not just 2026)
- `best-ipl-team-all-time.md` — titles, win %, eras
- `best-powerplay-batter-all-time-ipl.md` — all-time, not just 2026
- `most-runs-ipl-history.md` — Kohli all-time record
- `ipl-vs-other-t20-leagues.md` — scoring comparison vs BBL, CPL, MLC
- `who-is-vaibhav-suryavanshi.md` — age, records, season facts
- `best-death-bowler-all-time-ipl.md` — multi-season comparison
- `ipl-2026-best-team.md` — which team was strongest by data
- `ipl-salary-cap-explained.md` — RTM, IPL auction, impact player rules
Plus 5 more from the deep-research top 100 list

**C. 5 new metric definitions** (currently 10 metrics, many common ones missing)
- `net-run-rate.md` — NRR formula, common mistakes, playoff implications
- `run-rate.md` — CRR vs RRR, DLS interaction
- `average-vs-strike-rate.md` — tradeoff, format context
- `partnership-value.md` — why 2nd wicket partnerships matter in T20
- `phase-split-economy.md` — PP vs middle vs death economy as separate metrics

### Tier 2 — Technical SEO (zero new content needed)

**D. WebSite schema with SearchAction on homepage**
- File: `viewer/src/app/page.tsx`
- Adds Google Sitelinks Searchbox — fans can search OKF directly from Google SERP
- One new JSON-LD block: `{ "@type": "WebSite", "potentialAction": { "@type": "SearchAction", "target": "https://okf.cricketstudio.ai/search/?q={search_term_string}" } }`

**E. FAQPage aggregate on `/dossier/` index page**
- File: `viewer/src/app/dossier/page.tsx`
- Add JSON-LD with top 10 dossier Q&As — Google can show multiple "People also ask" from one page
- Highest CTR-recovery action available on the index level

**F. `.well-known/ai-plugin.json`**
- File: `viewer/public/.well-known/ai-plugin.json`
- Standard OpenAI plugin manifest pointing to llms.txt and llms-full.txt
- Enables ChatGPT plugin discovery without paying for GPT Store listing

**G. Sitemap priority fixes**
- File: `viewer/src/app/sitemap.ts`
- dossier index → 0.9 (was 0.8; FAQPage pages deserve priority)
- dossier items → 0.8 (was 0.7)
- stories index → 0.9 (was 0.85)

### Tier 3 — Polish

**H. CHANGELOG v0.5 entry** — OG images, FAQPage schema, BreadcrumbList, Article, title enrichment

**I. Releases page v0.5** — `okf/releases/v0.5.md`

**J. Fix top validator warnings** — 646 warnings mostly about missing `timestamp`/`resource` alias fields; bulk-fix with a script

---

## Recommended Build Order

| Sprint | Work | Impact |
|--------|------|--------|
| Sprint 1 (now) | 4 impact player stories (Tier 1A) | New story content + Google Discover |
| Sprint 2 | 25 new dossier files (Tier 1B) | 25 more FAQPage rich results |
| Sprint 3 | 5 new metrics (Tier 1C) | Better agent metric coverage |
| Sprint 4 | D + E + F + G (Tier 2 SEO) | Searchbox + aggregate FAQ + OpenAI discovery |
| Sprint 5 | H + I + J (Tier 3 polish) | Housekeeping |

---

# CricketStudio OKF — 4 Impact Player Stories

## Context

We already have `okf/stories/impact-player-lineup-revolution.md` (the macro numbers: 200+ innings 6.99%→29.68%, avg 145→172, sixes 10.5→17.72). The user wants 4 NEW stories going deeper — 3 specific angles on the rule itself, plus a 4th that plays on the double meaning of "most impactful player of IPL 2026."

**Key constraint:** The OKF catalog has no match-level record of which players were actually named as Impact Player substitutes in specific IPL 2026 matches. Story 4 must be reframed as "most impactful player by season data" (wordplay angle), not "best designated Impact Player substitute."

---

## Story 1 — `impact-player-captains-dilemma.md`

**Title:** "The Card You Can Only Play Once: What the Impact Player Decision Really Requires"

**Hook:** Every IPL captain gets one Impact Player substitution. That's it. The decision happens mid-match, under pressure, with incomplete information.

**Data (verified):**
- Rule mechanics: declare 4 subs before toss; can sub before your own batting OR after 14th over of opponent's batting
- Two categories: batting specialist sub (after bowling innings starts) vs bowling specialist sub (when fielding)
- 200+ innings 29.68% post-rule — structural proof the batting sub dominates
- Rashid 9.08 economy, Chahal 9.39 — opposing teams' bowling subs working against them
- Narine 6.60 — dual-role players don't need to be substituted; they're their own Impact Player

**Wow:** The captain has to declare intent before the toss. The batting sub is almost always used. The bowling sub is underused. Getting it wrong is irreversible.

**source_boundary:** `derived_claims_only`

---

## Story 2 — `impact-player-rule-alone.md`

**Title:** "The Rule That Only IPL Dared Try (And Why Nobody Else Followed)"

**Hook:** IPL is in its 4th season with the Impact Player Rule. MLC, BBL, The Hundred, CPL — none adopted it.

**Data (verified):**
- MLC: 75 matches, 3 seasons, Cricsheet CC BY 3.0 — standard 11, no Impact Player rule
- MLC powerplay leaders (Owen 194.3, Allen 188.0) achieved those without Impact Player advantage
- MLC death leaders (Gannon 7.18, Cummins 7.38) without Impact Player sub pressure
- IPL post-2023: 29.68% of innings cross 200 — no other T20 league shows this structural shift

**Wow:** Other leagues saw what the rule did to IPL scores and chose not to adopt it. The question is whether that was conservatism — or protecting their bowlers.

**source_boundary:** `derived_claims_only` + `public_open_data` (Cricsheet MLC data)

---

## Story 3 — `impact-player-bowlers-displaced.md`

**Title:** "The All-Rounder's Dilemma: What the Impact Player Rule Did to Positions 8 and 9"

**Hook:** Before 2023, batting at 8 was for your fifth bowler. After 2023, it's for the batter your captain substituted in.

**Data (verified):**
- Pre-2023: 5 genuine bowlers required; positions 8-9 scored conservatively
- Post-2023: avg first innings 172 (was 145) — deeper batting contributes
- Rashid IPL 2026: 9.08 economy (was 5.34–6.74 pre-2023)
- Chahal IPL 2026: 9.39 economy (career 7.96)
- Narine IPL 2026: 6.60 economy — exception because dual role makes him harder to replace

**Wow:** The all-rounder was IPL's most valuable archetype before 2023. The rule made specialist batter + specialist bowler more valuable than one player who does both adequately.

**source_boundary:** `derived_claims_only`

---

## Story 4 — `ipl-2026-most-impactful-player.md`

**Title:** "The Most Impactful Player of IPL 2026 (Both Meanings)"

**Hook:** IPL has an Impact Player rule. But which player created the most actual impact on the 2026 season?

**Data (verified, dataset v2026-06-11):**

| Player | Contribution |
|--------|-------------|
| Suryavanshi (RR) | 776 runs, 237.3 SR, Orange Cap, 36-ball century |
| Rabada (GT) | 29 wickets, Purple Cap |
| Kohli (RCB) | 675 runs, 56.25 avg, best 4-season avg block since 2016 |
| Bumrah (MI) | 7.69 death RPO — best among qualifiers in a +18% scoring era |
| Narine (KKR) | 17 wkts at 6.60 economy — only elite spinner to improve post-rule |

**Wow:** Suryavanshi broke powerplay records in a direction (extreme aggression). Rabada won the Purple Cap in a season 18% harder for bowlers. Those two achievements — in opposite directions — define the 2026 season's tension. Narine is the wildcard: the only spinner whose economy improved in an era where spinners universally got worse.

**Important framing:** Explicitly state this story does NOT name specific designated Impact Player substitutes from specific matches — that match-level data is at the CricketStudio canonical match records.

**source_boundary:** `derived_claims_only`

---

## Files to Create

| File | Story |
|------|-------|
| `okf/stories/impact-player-captains-dilemma.md` | Captain's decision |
| `okf/stories/impact-player-rule-alone.md` | Only league with the rule |
| `okf/stories/impact-player-bowlers-displaced.md` | Positions 8-9 changed |
| `okf/stories/ipl-2026-most-impactful-player.md` | Best impact / double meaning |

## After writing
1. `python scripts/validate_okf.py` — 0 errors
2. `python scripts/update_counts.py`
3. Commit with both co-author trailers
4. Push when user says ship

---

# CricketStudio OKF — Strategic Decision: Full IPL 2026 Players + Matches

## Recommendation: Don't — CricketStudio.ai already owns that job.

The OKF constitution (Article 1): *"A smaller trusted bundle beats a larger noisy one. Do not convert all 24K pages blindly."*

Each surface has a distinct role:
| Surface | Job |
|---------|-----|
| CricketStudio.ai | Live data for all 250+ players and 74 matches |
| CricketStudio API/MCP | Serves fresh facts to agents on demand |
| OKF | Methodology, provenance, agent guidance, curated high-signal entities |

Generating 250 player files + 74 match files turns OKF into a stale mirror of CricketStudio.ai — which is exactly what it must not be. The `players/index.md` already states this: *"volatile stats are sourced and dated; for current values, follow the canonical page."*

### What an OKF player file actually does

An OKF player file is an **identity anchor + methodology context**, not a stats database:
- Declares what the player *is* (role, team, hand, style, same_as IDs)
- Teaches agents *how to cite* CricketStudio for this player
- Links to the canonical page for current computed stats
- Explicitly does **not** hold authoritative stats

### Right scope going forward

**Players**: Stay at ~69 curated files. Add a new player file only when a story, dossier, or research file references them and no file exists yet.

**Matches**: Stay at 1 (the IPL 2026 final). Add match files only for historically significant events (finals, records, milestones) that are explicitly referenced by OKF content.

### What to build instead

If an agent needs stats for any of the 180+ uncovered players:
- MCP tool `get_okf_concept` → checks OKF, falls back to CricketStudio API for live data
- OKF methodology files teach the agent how to interpret and cite the response
- No OKF file needed for players not yet referenced in catalog content

**Decision: no new files needed.** Current coverage is correct. Add player/match files only when they become the subject of a new story, dossier, or research report.

---

# CricketStudio OKF — Stories / Journeys Layer

## Context

The OKF catalog has the data. LLMs cite the data. But the format that spreads to fans is narrative — a story with a wow moment, grounded in provenance. This sprint adds a `story` type to OKF and builds 5 real stories from existing catalog data. The viewer calls the section "Journeys" (fan-facing label); the OKF type is `story` (machine-readable). Every story links back to metric files, leaderboard files, and player profiles — making it the highest-trust cricket narrative format on the web.

---

## What Changes

### 1. Schema — `schema/frontmatter.schema.json`
Add `"story"` to the `type` enum (line ~30). One-line change.

### 2. Validator — `scripts/validate_okf.py`
Add `"story"` to `DATA_TYPES` set (line ~52) so story files require a provenance block — they make factual data claims.

### 3. Five OKF story files — `okf/stories/`

Each file uses this frontmatter pattern:
```yaml
type: story
title: ...
description: ...
tags: [...]
status: active
last_verified: 2026-06-23
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived-claim
canonical_page: https://okf.cricketstudio.ai/stories/<slug>/
provenance:
  source: CricketStudio aggregation of Cricsheet CC BY 3.0 (cricsheet.org)
  confidence: high
  notes: ...
  dataset_version: 2026-06-11
related:
  - ../metrics/...
  - ../leaderboards/...
```

Body sections (every story):
1. **## The Question Nobody Asked** — the hook
2. **## What the Data Says** — facts with numbers, scope, floor
3. **## The Wow** — the counterintuitive finding in plain English
4. **## What It Doesn't Say** — OKF discipline: limitations, scope, what can't be claimed
5. **## Related Concepts** — links to metric files, leaderboards, player profiles

---

### The 5 Stories (real data, no invented stats)

**Story 1 — `toss-nobody-believes-in.md`**
- Title: "The Toss Nobody Believes In"
- Hook: Everyone argues about whether to bat or bowl. The data says the toss barely matters.
- Data: Toss winner wins 52% of 1,219 IPL matches across 18 seasons — coin-flip territory. Bowl-first wins 54% of 1,146 toss decisions. But Grand Prairie: 76.7% of toss winners chose bowl first, yet first-innings average (177) beats second-innings average (160) and chase success is only 48.8%.
- Wow: The most popular decision at MLC's main venue statistically hurts the team that makes it.
- Doesn't say: Doesn't prove bat-first is always right; venue conditions vary match-to-match.
- Related: `../research/toss-effect-ipl.md`, `../dossier/bat-first-vs-bowl-first-ipl.md`, `../scorebook/venues/grand-prairie-stadium.md`

**Story 2 — `mlc-powerplay-batters-nobody-talks-about.md`**
- Title: "The Powerplay Batters Nobody Is Talking About"
- Hook: Three MLC players you've probably never heard of are posting powerplay SRs that would rank in IPL's top 10.
- Data: MJ Owen (Washington Freedom) 194.3 SR from 123 powerplay balls. FH Allen (SF Unicorns) 188.0 SR from 225 balls (largest MLC sample). R Ravindra (Washington Freedom) 187.6 SR from 129 balls. For context: Virat Kohli in IPL 2026 powerplay — 174.8 SR from 206 balls, ranked #13 of 45 qualifying batters.
- Wow: MLC's top 3 powerplay batters (all above the 30-ball floor) would outrank Kohli in the IPL 2026 powerplay leaderboard.
- Doesn't say: Different bowling attacks, pitch conditions, and match contexts make direct comparison imperfect. MLC sample (75 matches) is smaller than IPL (74 matches in 2026 alone).
- Related: `../leaderboards/mlc-batting-powerplay-alltime.md`, `../leaderboards/ipl-2026-batting-powerplay.md`, `../metrics/powerplay-strike-rate.md`

**Story 3 — `grand-prairie-dirty-secret.md`**
- Title: "Grand Prairie's Dirty Secret"
- Hook: The home of MLC has a consensus. The numbers disagree.
- Data: 43 matches played at Grand Prairie across 3 MLC seasons. Toss winners chose bowl first 33 of 43 times (76.7%). First-innings average: 177. Second-innings average: 160. Chase success rate: 48.8% (21 of 43). San Francisco Unicorns: 10 wins from 15 innings there — the best win rate at the venue.
- Wow: Teams overwhelmingly choose to bowl first, but the venue actually favours batting first. The herd is wrong.
- Doesn't say: Doesn't account for pitch evolution across the season, or that some matches were played on different strips.
- Related: `../scorebook/venues/grand-prairie-stadium.md`, `../research/toss-effect-mlc.md`

**Story 4 — `mlc-death-overs-revolution.md`**
- Title: "How MLC Mastered Death Bowling in 3 Seasons"
- Hook: It took IPL a decade to develop genuine death-bowling craft. MLC did it in three.
- Data: MLC all-time death economy leaders (≥15 ball floor): CJ Gannon (Seattle Orcas) 7.18 RPO from 71 balls. PJ Cummins (SF Unicorns) 7.38 RPO from 48 balls. LH Ferguson (LA KR / Washington Freedom) 7.54 RPO from 74 balls. For context: Bumrah in IPL 2026 — 7.69 RPO from 78 balls. MLC's top 3 are beating or matching IPL's elite.
- Wow: A 3-year-old league with 75 total matches has produced death bowling economies that match IPL's best — not because the players are better, but because franchises learned from 16 years of IPL data before day one.
- Doesn't say: IPL death bowling in 2008–2015 looked very different. We don't have that era's data in the catalog for direct comparison. MLC plays fewer matches so outlier resilience is lower.
- Related: `../metrics/death-overs-economy.md`, `../leaderboards/mlc-bowling-death-alltime.md`, `../leaderboards/ipl-2026-bowling-death.md`

**Story 5 — `teenager-who-broke-the-template.md`**
- Title: "The Teenager Who Broke the Template"
- Hook: In 2008, Brendon McCullum scored 158 off 73 balls in the first IPL match and the cricket world had never seen anything like it. In 2026, a teenager casually exceeded that strike rate — just in the powerplay.
- Data: Vaibhav Suryavanshi (Rajasthan Royals, IPL 2026): 233.6 powerplay SR from 223 balls (521 runs, 48 fours, 46 sixes) — #1 of 45 qualifying batters. Overall IPL 2026: 776 runs, 237.3 SR, Orange Cap. McCullum's historic 158* was 216.43 SR across a full innings (public domain historical record, Cricsheet CC BY 3.0).
- Wow: The SR that made McCullum's 158 legendary for five seasons is now Suryavanshi's floor — before the powerplay ends.
- Doesn't say: McCullum's innings was groundbreaking for its era and context. A single-season SR doesn't mean Suryavanshi is a greater player. Bowling attacks and era context are not equivalent.
- Related: `../metrics/batting-strike-rate.md`, `../metrics/powerplay-strike-rate.md`, `../leaderboards/ipl-2026-batting-powerplay.md`, `../scorebook/players/vaibhav-suryavanshi.md`

---

### 4. Viewer index page — `viewer/src/app/stories/page.tsx`

Identical pattern to `viewer/src/app/dossier/page.tsx` and `viewer/src/app/research/page.tsx`:

```tsx
import { getFilesByType } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  alternates: { canonical: 'https://okf.cricketstudio.ai/stories/' },
  title: 'Journeys — CricketStudio OKF',
  description: 'Cricket stories built on provenance-backed data. ...',
}

export default async function StoriesPage() {
  const files = await getFilesByType('story')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))
  return (
    <div>
      <h1>Journeys</h1>
      <p>Cricket stories built on OKF data...</p>
      <TagFilter files={nonIndex} pinnedTags={['IPL', 'MLC', 'toss', 'powerplay', 'death-overs', 'batting', 'bowling']} minCount={1} />
    </div>
  )
}
```

Individual story pages render via the existing `[...slug]` catch-all — no new dynamic route needed.

### 5. Navigation

**`viewer/src/components/Header.tsx`**: Add `{ href: '/stories/', label: 'Journeys' }` to the `nav` array.

**`viewer/src/components/Footer.tsx`**: Add `{ label: 'Journeys', href: '/stories/' }` to the Explore column.

**`viewer/src/app/page.tsx`**: Add a Journeys card to the SECTIONS array (homepage Browse grid).

---

## Files Changed

| File | Change |
|------|--------|
| `schema/frontmatter.schema.json` | Add `"story"` to type enum |
| `scripts/validate_okf.py` | Add `"story"` to `DATA_TYPES` |
| `okf/stories/toss-nobody-believes-in.md` | New story |
| `okf/stories/mlc-powerplay-batters-nobody-talks-about.md` | New story |
| `okf/stories/grand-prairie-dirty-secret.md` | New story |
| `okf/stories/mlc-death-overs-revolution.md` | New story |
| `okf/stories/teenager-who-broke-the-template.md` | New story |
| `viewer/src/app/stories/page.tsx` | New viewer index |
| `viewer/src/components/Header.tsx` | Add Journeys nav link |
| `viewer/src/components/Footer.tsx` | Add Journeys footer link |
| `viewer/src/app/page.tsx` | Add Journeys to homepage SECTIONS |
| `CHANGELOG.md` | v0.4 entry |

---

## Verification

1. `python scripts/validate_okf.py` — 0 errors, all 5 story files pass schema + provenance check
2. `pytest` — all tests pass
3. `npm run build` in `viewer/` — clean build, `/stories/` and all 5 story slugs appear in route output
4. Check generated HTML: `out/stories/index.html` exists, story links have trailing slashes
5. Manual check: `/stories/` shows all 5 cards, clicking each loads the story page correctly

---

## Commit co-authors (every commit)
```
Co-Authored-By: i-m-arul <i-m-arul@users.noreply.github.com>
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
