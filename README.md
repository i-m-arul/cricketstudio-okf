# CricketStudio OKF

**The open, agent-readable knowledge layer for cricket.**

[![License: CC-BY-4.0](https://img.shields.io/badge/License-CC--BY--4.0-lightgrey.svg)](LICENSE.md)
[![OKF v0.1](https://img.shields.io/badge/OKF-v0.1-green.svg)](CHANGELOG.md)
[![Cricsheet CC BY 3.0](https://img.shields.io/badge/data-Cricsheet%20CC%20BY%203.0-blue.svg)](ATTRIBUTION.md)

Browse the live catalog → **[okf.cricketstudio.ai](https://okf.cricketstudio.ai)**

---

CricketStudio OKF is a curated bundle of Markdown + YAML files that describes cricket
entities — players, teams, leagues, seasons, matches, venues — plus the **metrics**,
**methodology**, **sources**, and **examples** needed to use them correctly. It is a
*knowledge catalog*, not a raw data dump: a trusted semantic layer over
[CricketStudio](https://players.cricketstudio.ai)'s canonical data.

```yaml
# Every OKF file looks like this
type: player
title: Virat Kohli
entity_id: cricketstudio:player:virat-kohli
canonical_page: https://players.cricketstudio.ai/players/virat-kohli
source_boundary: derived_claims_only
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  computed_at: "2026-05-29"
```

Four audiences:

| Audience | What they get |
|----------|--------------|
| **AI agents** | Context that reduces hallucination and improves citation quality |
| **Developers** | Portable, versioned, schema-validated bundle — index, query, embed |
| **Analysts & journalists** | Clean metric definitions, provenance, sample-size rules |
| **Fans** | Explainable cricket, not just numbers |

---

## What's in the bundle

```
okf/
  index.md               # start here
  concepts/
    leagues/             # IPL, MLC
    seasons/             # IPL 2026, IPL 2026 Champions
    teams/               # RCB, Mumbai Indians, Rajasthan Royals
    players/             # Virat Kohli, Jasprit Bumrah, Vaibhav Suryavanshi
    venues/              # Narendra Modi Stadium, Wankhede
    matches/             # IPL 2026 Final
  metrics/               # 10 definitions: batting SR, economy, death-overs, Orange/Purple Cap ...
  methodology/           # sample-size floors, ranking eligibility, citation policy
  sources/               # data provenance and license boundaries
  examples/              # 22 verified Q&A patterns for agents
  research/              # 7 reports: IPL 2026 season, MLC seasons, toss effects, death overs
schema/
  frontmatter.schema.json
  okf.schema.json
llms.txt                 # LLM crawler entry point
datapackage.json         # OKFN Frictionless Data Package
```

## How to use it

**Clone and browse locally:**
```bash
git clone https://github.com/i-m-arul/cricketstudio-okf.git
# open okf/index.md — every file links to related concepts
```

**Embed in an AI agent:**
```python
# Point your RAG pipeline at okf/
# Every file has structured frontmatter + readable body
# Start at okf/index.md, follow related: links
# Canonical CricketStudio URLs are in every file for live lookups
```

**As a dataset (OKFN-compatible):**
```bash
# datapackage.json describes the bundle per Frictionless Data spec
# LLM crawlers read llms.txt for entry points and scope
```

## Core principles

1. **Trust before coverage** — a smaller trusted bundle beats a larger noisy one.
2. **No invented facts** — every cricket claim traces to CricketStudio source data.
3. **Provenance is mandatory** — all data-bearing claims carry source, confidence, and date.
4. **Metric definitions are first-class** — formula, scope, eligibility, edge cases, limits.
5. **Date window & sample size always visible** — no rankings without eligibility rules.
6. **License boundaries respected** — derived claims yes; raw proprietary feeds never.

## Licensing

Documentation, metrics, methodology: **CC-BY-4.0**.  
IPL historical and MLC data via Cricsheet: **CC BY 3.0** (attribution required — see [`ATTRIBUTION.md`](ATTRIBUTION.md)).  
IPL 2026 content: CricketStudio derived claims (raw licensed feed not redistributed).  
Full terms: [`LICENSE.md`](LICENSE.md) · [`DATA_LICENSE_BOUNDARIES.md`](DATA_LICENSE_BOUNDARIES.md)

## Status

**v0.1** — curated MVP: 80 files · 10 metrics · 4 methodology · 7 research · 22 examples · 0 invented facts.  
See [`CHANGELOG.md`](CHANGELOG.md) for what's in this release.

## Viewer (`okf.cricketstudio.ai`)

The `viewer/` directory is a Next.js 14 static-export site that serves this bundle at **[okf.cricketstudio.ai](https://okf.cricketstudio.ai)**.

```bash
cd viewer
npm install
npm run build     # generates viewer/out/ (static HTML)
```

**Deploy to AWS (S3 + CloudFront):**

1. Build: `npm run build` — outputs static site to `viewer/out/`
2. Sync to S3: `aws s3 sync out/ s3://okf.cricketstudio.ai --delete`
3. CloudFront distribution pointing at the S3 bucket (SPA error pages redirect to `index.html`)
4. Route 53: `okf.cricketstudio.ai` alias record → CloudFront distribution

**Or use AWS Amplify (simplest):**

1. Connect `cricketstudio-okf` repo in Amplify Console
2. Build command: `cd viewer && npm install && npm run build`
3. Output directory: `viewer/out`
4. Amplify handles CloudFront + subdomain automatically

The search index (`viewer/public/search-index.json`) is generated by the prebuild script on every build.
