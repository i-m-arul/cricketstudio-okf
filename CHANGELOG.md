# Changelog

All notable changes to CricketStudio OKF are documented here. This project follows
[Semantic Versioning](https://semver.org/).

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
