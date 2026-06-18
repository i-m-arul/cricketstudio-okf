# CricketStudio OKF

**The open, agent-readable knowledge layer for cricket.**

CricketStudio OKF is a curated bundle of Markdown files with YAML frontmatter that
describes cricket concepts — players, teams, leagues, seasons, matches, venues — plus
the **metrics**, **methodology**, **sources**, and **examples** needed to use them
responsibly. It is a *knowledge catalog*, not a raw data dump: a trusted semantic layer
over [CricketStudio](https://players.cricketstudio.ai)'s canonical cricket data.

It serves four audiences:

- **AI agents** — context that reduces hallucination and improves citation quality.
- **Developers** — a portable, versioned bundle that can be indexed, queried, and embedded.
- **Analysts & journalists** — clean metric definitions, provenance, and sample-size rules.
- **Fans** — explainable cricket, not just numbers.

> CricketStudio is not just a cricket stats website. It is cricket's agent-ready
> knowledge infrastructure.

---

## What's in here

```text
okf/
  index.md                 # bundle entry point
  concepts/
    leagues/   seasons/   teams/   players/   venues/   matches/
  metrics/                 # batting SR, economy, death-overs economy, orange/purple cap, ...
  methodology/             # sample-size floors, ranking eligibility, citation policy
  sources/                 # Cricsheet attribution, CricketStudio derived claims
  examples/                # verified Q&A patterns that teach agents how to answer
  research/                # season analysis, toss effects, phase intelligence reports
schema/                    # JSON Schema for frontmatter + manifest
.github/workflows/         # validation CI
```

## Core principles

1. **Trust before coverage** — a smaller trusted bundle beats a larger noisy one.
2. **No invented facts** — every cricket claim traces to CricketStudio source data or is
   explicitly marked pending review.
3. **Provenance is mandatory** — data-dependent claims carry source, confidence, and date.
4. **Metric definitions are first-class** — formula, scope, eligibility, edge cases, limits.
5. **Date window & sample size are always visible** — no rankings without eligibility rules.
6. **License boundaries are respected** — derived claims yes; raw proprietary feeds never.

## Licensing

Documentation and metric/methodology text: **CC-BY-4.0**. Cricket data follows the
boundaries of its origin — Cricsheet (CC BY 3.0) and CricketStudio-derived claims. See
[`LICENSE.md`](LICENSE.md), [`ATTRIBUTION.md`](ATTRIBUTION.md), and
[`DATA_LICENSE_BOUNDARIES.md`](DATA_LICENSE_BOUNDARIES.md).

## Status

**v0.1 — curated MVP.** This release is a credible reference bundle, not full corpus
coverage. See [`CHANGELOG.md`](CHANGELOG.md).
