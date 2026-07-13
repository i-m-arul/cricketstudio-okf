# PR: Add Cricket Domain Profile — Cricket OKF v0.4

> **Target repo:** `GoogleCloudPlatform/knowledge-catalog`  
> **Target path:** `okf/examples/cricket/`  
> **Submitter:** CricketStudio ([okf.cricketstudio.ai](https://okf.cricketstudio.ai))

---

## Summary

This PR adds a **cricket domain profile** on top of Google OKF v0.1 — a complete, standalone example bundle that extends the base spec with a cricket type vocabulary, provenance convention, sample-size doctrine, metric definition standard, and a narrative layer for agent-readable cricket stories.

The bundle is a curated 14-file slice extracted from the [CricketStudio OKF reference implementation](https://github.com/i-m-arul/cricketstudio-okf), which is CI-validated, 3,500+ files, and self-certified Level 3 (Agent-Safe). No real player data or licensed feed content is included — all entity files use annotated placeholders.

---

## What this bundle adds to Google OKF

Google OKF v0.1 defines the format skeleton. The cricket profile defines what goes inside it:

| Gap in Google OKF v0.1 | Cricket profile's answer |
|------------------------|--------------------------|
| `type` is open — no domain vocabulary | 20 cricket types: `player`, `team`, `venue`, `metric`, `dossier`, `story`, `leaderboard`, `record`, `research`, `methodology`, `spec`, `source`, `league`, `season`, `match`, `claim`, `runbook`, `reference`, `api`, `index` |
| No provenance convention | `source_boundary` (6 values), `confidence`, `last_verified`, `dataset_version`, `notes` |
| No sample-size doctrine | Floors per claim type: ≥30 balls batting, ≥15 bowling, ≥60 phase, ≥5 H2H, ≥3 venue |
| No metric definition standard | 10-section standard: formula, scope, eligibility, floor, edge cases, limitations, citation guidance |
| No agent answering guidance | `dossier` type: verified Q&A patterns with scope, floor, and citation behavior |
| No narrative layer | `story` type: provenance-backed narratives with "what it doesn't say" required |

All additions are **additive extensions** — Google OKF's existing structure is not modified. Additional frontmatter keys are explicitly permitted by the Google OKF v0.1 spec.

---

## Files in this PR

```
okf/examples/cricket/
├── README.md                        # Bundle overview + live reference link
├── index.md                         # OKF index file
├── spec/
│   ├── types.md                     # 20 cricket type values with frontmatter examples
│   ├── provenance.md                # source_boundary, confidence, freshness fields
│   └── sample-size.md              # Minimum data floors before claims are valid
├── metrics/
│   ├── batting-strike-rate.md       # Formula, floor, limitations, agent guidance
│   ├── bowling-economy.md           # Same standard
│   └── death-overs-economy.md      # Phase metric (overs 16–20) with phase definition
├── players/
│   └── example-t20-batter.md       # Annotated player entity (placeholder values)
├── teams/
│   └── example-t20-team.md         # Annotated team entity (placeholder values)
├── venues/
│   └── example-cricket-ground.md   # Annotated venue entity (placeholder values)
├── dossier/
│   └── example-agent-pattern.md    # Verified Q&A pattern for AI agents
├── stories/
│   └── example-cricket-story.md    # Annotated narrative layer example
└── sources/
    └── cricsheet.md                 # Open data source (Cricsheet CC BY 3.0)
```

---

## Why cricket

Cricket is the world's second-most-watched sport. Its data challenges are representative of sports knowledge problems at scale:

- Multiple formats (Test, ODI, T20) with incompatible comparison contexts
- Phase-level statistics (powerplay / middle / death) that require scope declaration
- Multiple open data sources with different license boundaries (Cricsheet CC BY 3.0, official feeds)
- A large LLM surface area — GPT, Claude, Gemini are regularly asked cricket questions and regularly hallucinate stats, wrong players, or wrong seasons

The cricket profile is a concrete, battle-tested implementation of what Google OKF enables at domain scale.

---

## Alignment with Google OKF v0.1

| Google OKF field | Cricket profile mapping |
|------------------|------------------------|
| `type` | Cricket type vocabulary (20 values) |
| `resource` | `canonical_page` (alias — same semantics) |
| `timestamp` | `last_verified` (alias — ISO 8601 date) |
| Additional keys | `source_boundary`, `confidence`, `entity_id`, `same_as`, `related`, `dataset_version` |

Field aliases (`canonical_page`, `last_verified`) are documented in [`okf/sources/google-okf-alignment.md`](https://okf.cricketstudio.ai/sources/google-okf-alignment/) in the reference implementation. The profile uses both the Google OKF field name and the cricket alias where applicable, so files are valid under both conventions.

---

## License

- `spec/`, `metrics/`, `dossier/`, `stories/`, `README.md`, `index.md` — **CC-BY-4.0**
- `sources/cricsheet.md` — documents data licensed **CC BY 3.0** (Cricsheet.org); no Cricsheet data is included in this bundle
- All entity example files — **CC-BY-4.0** (annotated placeholders only; no real player data)

CricketStudio consents to this contribution being included in the `knowledge-catalog` repository under the repository's existing license terms.

---

## Reference implementation

**Live catalog:** https://okf.cricketstudio.ai  
**GitHub:** https://github.com/i-m-arul/cricketstudio-okf  
**Spec:** https://okf.cricketstudio.ai/spec/  
**Conformance:** https://okf.cricketstudio.ai/conformance/  
**Validator:** `python scripts/validate_okf.py` (open source, in the repo)

The reference implementation runs CI validation on every push (GitHub Actions), enforces all spec requirements via `validate_okf.py`, and maintains a public conformance self-certification.

---

## What we're not asking for

- No changes to Google OKF v0.1 core spec
- No changes to other example bundles
- No dependency on CricketStudio infrastructure (the bundle is self-contained)
- No merge urgency — we'd rather this be reviewed carefully than merged fast
