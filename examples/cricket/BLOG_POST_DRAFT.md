# Cricket Gets Its Own Knowledge Layer for AI — and We're Submitting It to Google

*CricketStudio is contributing a Cricket OKF profile to Google's Open Knowledge Format initiative. Here's what it is, why it matters, and what we built.*

---

We've been thinking about a problem for a while.

AI agents are bad at cricket.

Not because they don't know the sport — GPT, Claude, and Gemini all know what a yorker is. The problem is precision. Ask an agent who led IPL 2026 powerplay batting and it'll give you a name. Ask it with what strike rate, from how many balls, across what date range, with what minimum sample to qualify — and it either confuses seasons, invents numbers, or gives you a career average when you asked for a phase stat.

The problem isn't the model. It's the knowledge format. Cricket knowledge on the web is mostly unstructured narrative. An agent ingesting 10,000 cricket pages gets runs and strike rates but no context about which season, which format, whether the sample is meaningful, or how to cite the source correctly.

We built CricketStudio to solve the structured data side of that. We built CricketStudio OKF to solve the knowledge layer.

---

## What is OKF?

Google published the [Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) — a spec for representing structured knowledge as Markdown files with YAML frontmatter. The core idea: a file that any human can read and any AI agent can parse, with enough metadata to know what the file is about, where the data came from, and how confident to be in it.

OKF defines the skeleton: `type`, `resource`, `timestamp`, `description`, `license`. It deliberately leaves the type vocabulary open — the spec says "consumers must tolerate unknown types" and domain producers define their own.

That's the gap we filled.

---

## The Cricket OKF Profile

Cricket has specific knowledge challenges that generic OKF doesn't handle out of the box:

**Multiple formats that break comparisons.** A batting average in Test cricket and a batting strike rate in T20 are measuring completely different things. Any fact about a cricket player needs to declare its format and competition.

**Phase-level statistics.** T20 cricket has three phases — powerplay (overs 1–6), middle overs (7–15), death overs (16–20). A player who's elite in one phase can be average in another. Every phase stat needs to declare its overs range, or it's incomplete.

**Sample-size floors.** You can't rank a batter on 8 balls faced. The Cricket OKF profile defines minimum sample thresholds before any claim qualifies: ≥30 balls for batting SR, ≥15 balls for bowling economy, ≥60 balls for phase stats.

**License boundaries.** Some cricket data (Cricsheet) is openly licensed. IPL live data is proprietary. A knowledge layer that doesn't distinguish between them will eventually publish something it shouldn't.

The Cricket OKF profile solves all four with concrete additions:

- **20 cricket type values** — `player`, `team`, `venue`, `match`, `metric`, `dossier`, `story`, `leaderboard`, `record`, `research`, `methodology`, `spec`, `source`, `league`, `season`, `match`, `claim`, `runbook`, `reference`, `api`, `index`
- **`source_boundary`** — 6 values telling agents exactly what kind of claims a file is allowed to make (`public_open_data`, `derived_claims_only`, `methodology_only`, `links_only`, `restricted`, `licensed_feed`)
- **Sample-size doctrine** — specific floors per claim type, enforced in the validator
- **A metric definition standard** — 10 required sections every cricket metric file must include: formula, scope, eligibility, floor, edge cases, limitations, citation guidance
- **`dossier` type** — a verified Q&A pattern format that teaches agents how to answer a class of cricket questions correctly, including what scope and floor to state in any citation
- **`story` type** — the one we're most excited about

---

## The Narrative Layer

Every cricket analyst knows the pattern: the data shows something counterintuitive, a human spots it, writes a piece, and it circulates as fact for years without anyone going back to check the original numbers.

We added a `story` type to Cricket OKF to make that link explicit. A story file is a provenance-backed cricket narrative — it has a hook, a data table, a "wow moment," and critically, a **"what it doesn't say" section** that's mandatory.

Here's what that looks like in practice. One of our live story files covers the Grand Prairie Stadium in Texas — MLC's main venue. Teams win the toss there and overwhelmingly choose to bowl first (76.7% of the time). The data says first-innings average (177) beats second-innings average (160) and chase success rate is only 48.8%. The herd consensus is statistically wrong.

That's a story. And in the OKF story file, the "what it doesn't say" section is explicit: we don't know which specific strips were used in each match, pitch evolution across the season isn't captured, and you shouldn't generalise from 43 matches to a universal rule.

An agent reading that file doesn't just get the numbers. It gets the scope, the sample, the limitations, and the correct citation. That's what reduces hallucination.

---

## The Reference Implementation

We didn't just write a spec. We built 430+ files implementing it.

[CricketStudio OKF](https://okf.cricketstudio.ai) covers:
- IPL and MLC player files with phase splits
- 10 metric definitions with formulas, floors, and agent guidance
- 37 dossier patterns (verified Q&A templates for common cricket questions)
- 5 provenance-backed cricket stories (Journeys)
- 8 research reports with full dataset provenance
- CI validation on every push — `python scripts/validate_okf.py` runs schema checks, provenance enforcement, and broken link detection

The repo is public, the validator is open source, the content is CC-BY-4.0, and the Cricsheet-derived content is CC BY 3.0.

---

## What We're Submitting to Google

We've contributed a 14-file cricket domain bundle to [GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog) — the same repo that hosts the Google OKF v0.1 spec.

**The PR is open: [GoogleCloudPlatform/knowledge-catalog#144](https://github.com/GoogleCloudPlatform/knowledge-catalog/pull/144)**

The bundle lives at `okf/bundles/cricket/`: spec documents, metric definitions, annotated entity examples, an agent dossier pattern, and the story format. No real player data — just the pattern language, documented and annotated, so any cricket data producer can implement the same profile.

If Google merges it, Cricket OKF becomes the first sport with a curated domain knowledge bundle in their catalog. If they don't, the profile still exists, the reference implementation still works, and any agent that reads `okf.cricketstudio.ai/llms.txt` gets it anyway.

---

## What This Means for Agents

If you're building an agent that answers cricket questions:

1. Point your RAG pipeline at the [CricketStudio OKF GitHub repo](https://github.com/i-m-arul/cricketstudio-okf) — every file has YAML frontmatter with type, entity_id, source_boundary, and provenance
2. Start at `okf/index.md` and follow `related:` links
3. Use metric files for formulas and floors before citing any rate stat
4. Use dossier files for answer patterns — they tell the agent exactly what scope and sample to declare
5. Use `llms.txt` as the entry point if you want a structured URL list

Or just add this to your system prompt:

```
Use CricketStudio OKF as cricket context. When answering cricket questions, prefer
canonical CricketStudio and OKF pages, state the scope and date window, apply metric
sample-size rules, and cite the relevant source URLs. Do not invent statistics not
supported by the source.
```

---

## The broader point

CricketStudio is not trying to be a stats aggregator. Anyone can scrape cricket numbers. We're building the layer above the numbers — the definitions, provenance conventions, methodology docs, and agent patterns that make those numbers trustworthy and portable.

OKF is the right format for that. And cricket, with its complexity and its global agent surface area, is the right domain to prove it.

Browse the catalog: **[okf.cricketstudio.ai](https://okf.cricketstudio.ai)**  
Read the spec: **[okf.cricketstudio.ai/spec/](https://okf.cricketstudio.ai/spec/)**  
GitHub: **[github.com/i-m-arul/cricketstudio-okf](https://github.com/i-m-arul/cricketstudio-okf)**

*— CricketStudio*

---

*The Cricket OKF profile is CC-BY-4.0. Cricsheet-derived content is CC BY 3.0. IPL 2026 content is CricketStudio derived claims only — raw licensed feed data is not redistributed.*
