# Changelog

All notable changes to CricketStudio OKF are documented here. This project follows
[Semantic Versioning](https://semver.org/).

## [0.5.3] — 2026-06-29

Deep-research sprint + OG images + SEO schemas + alias fix. Bundle grows to 532 files, 45 stories, 19 metrics, 83 dossiers.

### Added

**Viewer — per-page OG images (PR #29):**
- 135 unique OG images for stories, dossier, research, and metrics pages
- Static OG image fallback for X/Twitter cards (PR #28 fix)

**SEO schemas:**
- FAQPage + BreadcrumbList + Article JSON-LD across dossier and story pages
- Type-aware `<title>` suffix enrichment (metric → "Metric · CricketStudio OKF", dossier → "Answer · …", etc.)
- WebSite schema + SearchAction on homepage

**Agent discovery:**
- `.well-known/ai-plugin.json` — OpenAI plugin manifest pointing to `llms.txt` and `llms-full.txt`

**Sprint 6 — deep-research dossier files (adversarially verified):**
- `suryavanshi-72-sixes` — IPL single-season sixes record (72), confidence 3-0
- `suryavanshi-youngest-500-runs-ipl` — youngest to 500+ IPL season runs (15y 27d), confidence 2-1
- `kohli-9000-ipl-runs` — first batter to 9,000 IPL career runs (April 27 2026), confidence 3-0
- `kohli-ipl-2026-final` — 75* off 42 balls, fastest IPL fifty (25 balls), Player of the Match, confidence 3-0
- `ipl-2026-chase-dominance` — 8 of 12 completed early-phase matches won by chasers, confidence 3-0
- `impact-player-rule-controversy-2026` — Axar Patel opposition (3-0) + top-5 run chases all post-2023 (2-1)

**Sprint 6 — new metric files (research gaps confirmed):**
- `fantasy-cricket-strike-rate` — Dream11 IPL SR tiers (-6 to +6), 10-ball floor, primary source confirmed 3-0
- `expected-runs-xR` — delivery-difficulty-adjusted batting metric; academic concept (CricketSavant 2016)
- `expected-wickets-xW` — 50-nearest-neighbour wicket probability; academic concept (CricketSavant 2017)
- `win-probability` — two-model chain (first-innings score prediction + chase model); WPA formulation

**Sprint 6 — world-class sprint dossiers (7 files):**
- `fastest-century-ipl`, `best-spin-bowler-ipl-2026`, `ipl-2026-best-team`
- `best-powerplay-batter-all-time-ipl`, `ipl-vs-other-t20-leagues`, `ipl-salary-cap-explained`
- `best-all-time-death-bowler-ipl`

**Sprint 6 — world-class sprint metrics (5 files):**
- `net-run-rate`, `run-rate`, `average-vs-strike-rate`, `phase-split-economy`, `partnership-value`

**Tooling:**
- `scripts/fix_okf_aliases.py` — deterministic bulk script to add `resource` + `timestamp` alias fields

### Changed

- `okf/stories/kohli-at-37-best-average` — SR corrected 165.8 → 165.85; 9,000-run milestone section added; IPL 2026 final PoM performance added
- `okf/dossier/vaibhav-suryavanshi-ipl-2026` — sixes row added (72, IPL single-season record)
- `okf/dossier/ipl-most-sixes-all-time` — caveat added for Suryavanshi 72-sixes single-season record
- All 532 OKF files — `resource` and `timestamp` alias fields added; validator now reports 0 errors 0 warnings (was 681 warnings)
- `viewer/public/llms.txt` — metric count 10→19, dossier count 70→83

### Removed

- `ROADMAP.md` — internal Claude Code planning document removed from public repo; added to `.gitignore`

### Validation

```
python scripts/validate_okf.py  → 532 files, 0 errors, 0 warnings
pytest                          → 24 passed
```

---

## [0.5.2] — 2026-06-25

Fix: broken OG image route for X/Twitter card previews.

### Changed

- `viewer/src/app/og/route.tsx` replaced with static OG image served from `viewer/public/og-default.png`
- Prevents 404 on X/Twitter card crawlers which reject dynamic Edge routes

### Validation

```
npm run build  → clean build
```

---

## [0.5.1] — 2026-06-25

4 Impact Player narrative journeys added. Bundle grows to 510 files, 45 stories.

### Added

- `okf/stories/impact-player-captains-dilemma` — "The Card You Can Only Play Once": mid-match decision under pressure, batting sub dominance (29.68% of innings post-2023), irreversibility
- `okf/stories/impact-player-rule-alone` — "The Rule That Only IPL Dared Try": MLC/BBL/CPL chose not to adopt; structural 18% scoring uplift unique to IPL
- `okf/stories/impact-player-bowlers-displaced` — "The All-Rounder's Dilemma": how positions 8-9 changed; Rashid 9.08 economy vs 5.34 pre-Impact; Narine 6.60 as the counter-example
- `okf/stories/ipl-2026-most-impactful-player` — "The Most Impactful Player of IPL 2026 (Both Meanings)": five candidates (Suryavanshi, Rabada, Kohli, Bumrah, Narine) examined by season data

### Changed

- `manifest.yaml` — story count synced

### Validation

```
python scripts/validate_okf.py  → 0 errors, 0 warnings
pytest                          → 24 passed
```

---

## [0.5.0] — 2026-06-25

27-story narrative expansion — all 5 tiers shipped. Bundle grows to 506 files, 41 stories.

### Added

**Tier 1 — IPL 2026 season + MLC narratives (10 stories):**
- `rcb-back-to-back` — 18 seasons to a title, then two in a row
- `suryavanshi-powerplay-every-bowler` — 0 dismissals across all H2H bowlers in IPL 2026 dataset
- `bumrah-2026-economy` — 7.69 RPO from 78 death-overs balls vs MLC all-time benchmarks
- `impact-player-lineup-revolution` — 6.99% → 29.68% 200+ innings post-2023
- `ipl-2026-five-defining-moments` — framework for finding pivot matches via NRR/standings
- `mlc-season-4-what-needs-proving` — 3 open questions after 75 MLC matches
- `ipl-alumni-who-built-mlc` — Faf, Cummins, Ferguson, Boult bridging IPL to MLC
- `mlc-seattle-orcas-overperform` — Gannon 7.18 death economy, MLC all-time best
- `ipl-2026-bowling-took-a-beating` — bowling in a +18% run environment
- `mlc-vs-ipl-what-numbers-show` — cross-league death bowling and powerplay comparison

**Tier 2 — Player arc stories (5 stories):**
- `gill-ipl-2026-732-runs` — 732 runs at 45.8 avg (GT, IPL 2026), 3,866 career pre-2026
- `narine-the-batter-who-bowl` — 192 career wickets + 1780 runs; 6.60 economy in IPL 2026
- `chahal-200-wickets-journey` — first to 200 IPL wickets (22 Apr 2024, 153rd match), 9-season table
- `rohit-five-titles-mi-blueprint` — MI 2013/15/17/19/20, structural patterns across dynasties
- `faf-mlc-orange-cap-trailblazer` — 934 runs / 571 balls / SR 163.6, all-time MLC Orange Cap

**Tier 3 — Phase analysis stories (4 stories):**
- `rashid-economy-nine-seasons` — 5.34 (2020) → 9.08 (2026), Impact Player era effect
- `kohli-at-37-best-average` — 56.25 avg in IPL 2026; best sustained block since 2016
- `kohli-244-death-sr` — 244.4 SR from 27 death-over balls; meets ≥15 floor, caveated
- `spin-bowling-after-impact-player` — Chahal +1.43 RPO, Rashid +2.00, Narine 6.60 exception

**Tier 4 — Historical stories (5 stories):**
- `mi-csk-the-decade` — 10 of 14 titles 2010-2023, structural differences between dynasties
- `deccan-chargers-won-then-vanished` — won 2009, terminated 2012; only champion ever erased
- `ipl-2008-vs-2026-eighteen-seasons` — avg runs 145→172, 200+ innings 6.99%→29.68%, McCullum to Suryavanshi
- `mccullum-april-18-2008` — 158* off 73 balls (216.4 SR), Cricsheet CC BY 3.0
- `gt-three-finals-five-seasons` — 2022 won, 2023 runners-up, 2026 runners-up; best expansion franchise start

**Tier 5 — Format/rules stories (3 stories):**
- `dls-why-it-feels-unfair` — resource model vs intuitive fairness; methodology_only
- `super-over-six-balls-everything` — each ball = 40x probability weight, strategy compression
- `nrr-the-heartbreak-number` — bowled-out rule, 1.032-point MI vs GT spread in IPL 2026

### Changed

- `manifest.yaml` — story count updated: 14 → 41
- `viewer/public/llms.txt` — story count synced

---

## [0.4.6] — 2026-06-24

IPL fan Q&A expansion — 20 new dossiers + 3 historical stories. Bundle grows to 474 files.

### Added

- **20 new dossiers** targeting the top IPL fan questions across all-time records, GOAT
  debates, rules/concepts, team history, and batting evolution:
  - All-time records: `ipl-all-time-run-scorer`, `ipl-all-time-wicket-taker`,
    `ipl-highest-individual-innings` (Gayle 175*), `ipl-most-sixes-all-time`,
    `ipl-highest-team-score` (SRH 277/3, May 2024)
  - GOAT framing: `ipl-goat-debate`, `kohli-vs-rohit-ipl-career`,
    `best-ipl-captain-all-time` (Dhoni + Rohit tied at 5 titles),
    `best-overseas-ipl-player-all-time`, `ms-dhoni-ipl-career`
  - Rules/concepts: `what-is-impact-player-rule`, `what-is-super-over`, `what-is-dls-method`
  - Team history: `ipl-most-titles-by-team`, `ipl-champions-history` (2007/08–2026),
    `ipl-defunct-franchises`, `ipl-2022-expansion`
  - Season history: `orange-cap-winners-history`, `purple-cap-winners-history`
  - Batting evolution: `how-has-ipl-batting-changed` (145→172 avg, 6.99%→29.68% 200+ scores)
- **3 new historical stories** using verified Cricsheet CC BY 3.0 data:
  - `ipl-scoring-revolution` — the 200+ innings explosion post-Impact Player Rule
  - `gayle-storm-175` — Gayle 175* (23 April 2013) and what it meant for T20 ceilings
  - `kohli-2016-season` — 973 runs, the single-season record that survived the Impact Player era

### Changed

- `manifest.yaml` — counts updated: dossier 47→67, story 11→14, total 451→474
- `viewer/public/llms.txt` — count lines synced

---

## [0.4.5] — 2026-06-24

Auto-count system — counts are now generated from the catalog, not maintained by hand.

### Added

- `scripts/update_counts.py` — single command syncs `manifest.yaml` counts and
  `viewer/public/llms.txt` count lines from the live OKF file tree. Supports
  `--check` (CI mode, exit 1 if stale) and `--print` (table only).
- `viewer/src/lib/counts.ts` — `getOKFCounts()` async helper for Next.js server
  components; builds per-type counts from `getAllFiles()` at build time.

### Changed

- `viewer/src/app/search/page.tsx` — converted to async server component; Metrics,
  Research, Dossier, and Journeys counts now read from `getOKFCounts()` at build time.
- `viewer/src/app/about/page.tsx` — same pattern; "What's in the bundle" section
  counts are now dynamic.
- `.github/workflows/validate.yml` — added `python scripts/update_counts.py --check`
  step; PRs fail if manifest.yaml or llms.txt counts are stale.
- `manifest.yaml` — counts synced to 451-file catalog reality (player: 235,
  dossier: 47, story: 11, research: 10, metric: 10, leaderboard: 47, …).
- `viewer/public/llms.txt` — count lines updated; Research index bullet added.

### Standard merge checklist (every ship)

sitemap and robots.txt are Next.js dynamic route handlers — auto-updated at build time.
llms.txt is updated by `python scripts/update_counts.py` before commit.
manifest.yaml is updated by the same script.
llms-full.txt is generated at build time, gitignored.

### Validation

451 files validated — 0 errors.

---

## [0.4.4] — 2026-06-24

Rivalry Journeys — batter vs batter, bowler vs bowler, team vs team.

### Added

**Journeys (3 new):**
- `suryavanshi-vs-kohli.md` — "The Metric Decides the Winner": Suryavanshi (776R, 237.3SR, 72 sixes)
  vs Kohli (675R, 165.8SR, 56.25avg). Each metric picks a different winner. Phase splits reveal
  Suryavanshi's middle-overs SR (238.7) exceeds his powerplay SR (233.6); Kohli's death SR (244.4)
  exceeds his own powerplay SR (174.8).
- `rabada-vs-rashid.md` — "270 Balls and 275 Balls": GT teammates Rabada (270 PP balls, 20 wkts,
  9.69 econ) vs Rashid (275 middle balls, 19 wkts, 8.42 econ). Phase-specialised arsenal, not
  true rivals. Career economy inflation: Rashid 7.08→9.08 (+2.0 RPO), Rabada 8.61→9.68 (+1.07).
- `rcb-vs-gt-2026.md` — "GT's Third Final": RCB (#1, NRR +0.684) vs GT (#3, NRR +0.320) —
  identical 9W/5L/18pts in league stage. Kohli vs Rabada H2H: 37 balls / 88R / 237.8 SR / 0
  dismissals. Bhuvneshwar 28 wkts at 7.95 econ vs Rabada 29 at 9.68. RCB won the Final by
  5 wkts (Kohli 75(42), GT 155, RCB 156/5 in 18 ov). GT: 3 finals in 5 seasons, 1 title.

### Changed

- Viewer search and about pages: Journeys count 8→11.
- `llms.txt`: Journeys index 8→11; 3 new story entries added.

### Validation

451 files validated — 0 errors.

---

## [0.4.3] — 2026-06-24

H2H Journey — top performer vs top loser, IPL 2026.

### Added

**Journeys (1 new):**
- `stars-who-finished-last.md` — Gujarat Titans (#3, NRR +0.320) vs Mumbai Indians (#10, NRR -0.712).
  Gill (732) + Sudharsan (722) = 1,454 combined runs; more than MI's top 4 batters (1,408).
  Holder (17 wkts / 7.57 economy / 11 matches) outperformed every MI bowler including
  Bumrah's 2026 overall season line (4 wkts / 8.35 economy / 13 matches).
  NRR gap: 1.032 points. Collective craft vs assembled stardom.

### Changed

- Viewer search and about pages: Journeys count 7→8.
- `llms.txt`: Journeys index updated to 8; new story entry added.

### Validation

448 files validated — 0 errors.

---

## [0.4.2] — 2026-06-24

Scorebook + Journeys expansion — 4 IPL player profiles and 2 new provenance-backed stories.

### Added

**Scorebook — IPL players (4 new):**
- `yashasvi-jaiswal.md` — RR opener, India multi-format batter
- `tilak-varma.md` — MI left-handed middle-order batter
- `rinku-singh.md` — KKR death-overs finisher
- `arshdeep-singh.md` — Punjab Kings left-arm death/powerplay bowler

**Journeys / Stories (2 new):**
- `the-206-balls.md` — Kohli's 206 powerplay balls at #13 of 45: volume vs rate framing, what sustained presence means at 37
- `the-washington-freedom-powerplay.md` — Washington Freedom hold 2 of MLC's top 3 all-time powerplay SR spots (Owen 194.3, Ravindra 187.6); franchise strategy story

### Validation

447 files validated — 0 errors.

---

## [0.4.1] — 2026-06-24

Catalog expansion — 10 new dossiers and 2 new research files targeting high-search-value cricket questions.

### Added

**Dossiers (10 new):**
- `what-is-powerplay-in-cricket.md` — powerplay rules, fielding restrictions, overs 1–6 definition
- `explain-purple-cap.md` — Purple Cap scope, limitations, agent citation guidance (mirrors explain-orange-cap)
- `what-is-net-run-rate.md` — NRR formula, IPL points table tiebreaker, DLS caveats
- `what-are-cricket-phases.md` — powerplay / middle overs / death overs overview with floors
- `vaibhav-suryavanshi-ipl-2026.md` — 776 runs, 237.3 SR, 233.6 powerplay SR from 223 balls, Orange Cap
- `jasprit-bumrah-ipl-2026.md` — death-overs economy 7.69 from 78 balls, cross-league context
- `virat-kohli-ipl-2026.md` — powerplay #13 of 45 (174.8 SR, 206 balls), volume vs rate framing
- `ipl-2026-powerplay-batting-leader.md` — Suryavanshi #1, Kohli #13, 45 qualifying batters
- `how-does-ipl-points-table-work.md` — 2-point system, NRR tiebreaker, playoff bracket
- `mlc-powerplay-vs-ipl-powerplay.md` — Owen/Allen/Ravindra vs IPL 2026 top 15, cross-league scope caveats

**Research (2 new):**
- `ipl-2026-powerplay-analysis.md` — comprehensive powerplay batting/bowling report with citable claims
- `ipl-2026-batting-season-review.md` — Orange Cap season, volume-rate co-existence, agent FAQ

### Validation

441 files validated — 0 errors.

---

## [0.4.0] — 2026-06-23

Stories / Journeys layer — provenance-backed cricket narratives as a new OKF type.

### Added

- `okf/stories/` — 5 curated story files using real OKF catalog data:
  - `toss-nobody-believes-in.md` — IPL toss win rate (52%, 1,219 matches) vs Grand Prairie's
    bowl-first consensus that contradicts 3 seasons of venue data.
  - `mlc-powerplay-batters-nobody-talks-about.md` — MJ Owen (194.3 SR), FH Allen (188.0 SR),
    R Ravindra (187.6 SR) would all rank above Kohli (174.8 SR) in IPL 2026 powerplay leaderboard.
  - `grand-prairie-dirty-secret.md` — 76.7% of toss winners bowl first; first-innings avg (177)
    beats second-innings avg (160); chase success 48.8% across 43 MLC matches.
  - `mlc-death-overs-revolution.md` — Gannon (7.18), Cummins (7.38), Ferguson (7.54) all below
    Bumrah's IPL 2026 death economy (7.69) in a 3-year-old league.
  - `teenager-who-broke-the-template.md` — Suryavanshi's IPL 2026 powerplay SR (233.6 from 223
    balls) exceeds McCullum's historic 158* SR (216.43) — just in the first six overs.
- `viewer/src/app/stories/page.tsx` — `/stories/` viewer route branded as "Journeys".
- `"story"` added to type enum in `schema/frontmatter.schema.json`.
- `"story"` added to `DATA_TYPES` in `scripts/validate_okf.py` (provenance required).
- `story` added to `TOPIC_MAP` in `ForLLMsAndAgents.tsx` for correct agent guidance.

### Changed

- `viewer/src/components/Header.tsx` — "Journeys" nav link added between Dossier and Agents.
- `viewer/src/components/Footer.tsx` — "Journeys" added to Explore column; version bumped to v0.4.
- `viewer/src/app/page.tsx` — "Journeys" section card added to Browse grid with Sparkles icon.

## [0.3.0] — 2026-06-22

Cricket OKF Standards Layer — formal specification, conformance levels, releases, Google OKF alignment, and contribution bundle.

### Added

- `okf/spec/` — 8 specification files: index, types, provenance, metrics, claims,
  identity, sample-size, conformance. Defines the Cricket OKF domain profile on top of
  Google OKF v0.1.
- `okf/releases/` — versioned release notes: v0.1.md, v0.2.md, v0.3.md.
- `okf/sources/google-okf-alignment.md` — field-level alignment with Google OKF v0.1.
- `examples/cricket/` — 13-file standalone contribution bundle for PR to
  GoogleCloudPlatform/knowledge-catalog.
- `viewer/src/app/conformance/page.tsx` — dedicated conformance page with level
  checklist and Level 2 self-certification.
- `viewer/src/app/releases/page.tsx` — dedicated releases page with version history.
- "Spec" nav link in Header.tsx.
- "Specification" and "Conformance" cards on homepage.

### Changed

- Homepage hero copy: updated to "Open Knowledge Framework for Cricket Data".
  Removed overreach language ("OKF gives you the open standard behind them" referring
  to CricketStudio.ai — CricketStudio.ai is an independent product that links to OKF).
- `schema/frontmatter.schema.json`: added "spec" to type enum.
- `scripts/validate_okf.py`: added soft warnings for missing Google OKF recommended
  fields (resource, timestamp) — not blocking errors.
- `viewer/src/lib/constants.ts`: added TYPE_LABELS entries for spec, leaderboard,
  claim, api.
- `manifest.yaml`: bumped to v0.3.0; updated description; added spec and leaderboard
  to counts.
- `viewer/public/llms.txt`: added spec section, Google OKF alignment statement,
  conformance declaration.

### Conformance

Level 2 — Evidence-Backed. Self-certified 2026-06-22.

---

## [0.1.0] — 2026-06-18

Initial curated MVP bundle.

### Added

- Repository scaffold and governance docs: `README.md`, `LICENSE.md`, `ATTRIBUTION.md`,
  `DATA_LICENSE_BOUNDARIES.md`, `manifest.yaml`.
- Frontmatter and manifest JSON Schemas under `schema/`.
- OKF index and per-folder indexes under `okf/`.
- Methodology files: sample-size floors, ranking eligibility, phase definitions,
  citation policy.
- Metric files: batting strike rate, batting average, bowling economy, bowling strike
  rate, death-overs economy, powerplay strike rate, boundary percentage, dot-ball
  percentage, orange cap, purple cap.
- Source files: Cricsheet attribution, CricketStudio derived claims.
- Concept files: leagues (IPL, MLC), seasons (IPL 2026, IPL 2026 Champions), teams (RCB,
  MI, RR), players (Virat Kohli, Jasprit Bumrah, Vaibhav Suryavanshi), venues
  (Narendra Modi Stadium, Wankhede Stadium), and the IPL 2026 final match.
- Research reports: State of IPL 2026, State of MLC 2025, MLC Three Seasons, toss
  effects (IPL + MLC), death-overs intelligence (IPL 2026 + MLC).
- 22 example Q&A files teaching agent answering patterns.

### Data provenance

- IPL 2026 content derived from CricketStudio's claim layer (dataset version 2026-06-11);
  raw licensed feed not redistributed.
- IPL historical and MLC content derived from Cricsheet (CC BY 3.0).
