# CricketStudio OKF

**The open, agent-readable knowledge layer for cricket.**

CricketStudio OKF is a curated bundle of Markdown files with YAML frontmatter that
describes cricket concepts — players, teams, leagues, seasons, matches, venues — plus
the **metrics**, **methodology**, **sources**, **examples**, and **runbooks** needed to
use them responsibly. It is a *knowledge catalog*, not a raw data dump: a trusted
semantic layer over [CricketStudio](https://players.cricketstudio.ai)'s canonical
cricket data.

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
  methodology/             # sample-size floors, ranking eligibility, citation & correction policy
  sources/                 # Cricsheet, Sportmonks boundaries, CricketStudio derived claims
  examples/                # verified Q&A patterns that teach agents how to answer
  runbooks/                # add a player, update a season, handle a data dispute, ...
schema/                    # JSON Schema for frontmatter + manifest
scripts/                   # validate_okf.py, check_links.py, generate_okf.py (v0.2)
tests/                     # pytest suite (no network)
docs/                      # generator, viewer, and MCP design notes
.github/workflows/         # validation + publish CI
```

## How the bundle is built (the short version)

Both the CricketStudio website and the `cricketstudio-mcp` server run off
**pre-computed, git-committed JSON snapshots** — the *permitted derived-claims layer* —
not live scraping of the 24K canonical pages. CricketStudio OKF consumes the **same
snapshot** (`cricketstudio-mcp/data/snapshot/*.json`) and renders it into curated OKF
markdown. This keeps every fact traceable and every licensing boundary intact.

See [`docs/GENERATOR_DESIGN.md`](docs/GENERATOR_DESIGN.md) for the pipeline.

## Core principles

1. **Trust before coverage** — a smaller trusted bundle beats a larger noisy one.
2. **No invented facts** — every cricket claim traces to CricketStudio source data or is
   explicitly marked pending review.
3. **Provenance is mandatory** — data-dependent claims carry source, confidence, and date.
4. **Metric definitions are first-class** — formula, scope, eligibility, edge cases, limits.
5. **Date window & sample size are always visible** — no rankings without eligibility rules.
6. **License boundaries are respected** — derived claims yes; raw proprietary feeds never.

Full rules: [`CONSTITUTION.md`](CONSTITUTION.md). How the project runs:
[`OPERATING_SYSTEM.md`](OPERATING_SYSTEM.md).

## Validate the bundle

```bash
python scripts/validate_okf.py      # schema, links, provenance, license boundaries
python scripts/check_links.py       # internal links (+ optional external liveness)
pytest                              # validator unit tests
```

## Licensing

Documentation and metric/methodology text: **CC-BY-4.0**. Cricket data follows the
boundaries of its origin — Cricsheet (CC BY 3.0) and CricketStudio-derived claims. See
[`LICENSE.md`](LICENSE.md), [`ATTRIBUTION.md`](ATTRIBUTION.md), and
[`DATA_LICENSE_BOUNDARIES.md`](DATA_LICENSE_BOUNDARIES.md).

## Status

**v0.1 — curated MVP.** This release is a credible reference bundle, not full corpus
coverage. See [`CHANGELOG.md`](CHANGELOG.md) and the roadmap in `OPERATING_SYSTEM.md`.
