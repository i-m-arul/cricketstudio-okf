#!/usr/bin/env python3
"""
build_llms_full.py — regenerate viewer/public/llms-full.txt and viewer/public/llms.txt
from all OKF markdown files in okf/.

Usage:
    python scripts/build_llms_full.py

Outputs:
    viewer/public/llms-full.txt   — flat text dump of every OKF file for LLM ingestion
    viewer/public/llms.txt        — structured index (section headings + key links)
"""
import pathlib
import re
import sys
from datetime import date

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML required — pip install pyyaml", file=sys.stderr)
    sys.exit(1)

ROOT = pathlib.Path(__file__).parent.parent
OKF_DIR = ROOT / "okf"
PUBLIC_DIR = ROOT / "viewer" / "public"
BASE_URL = "https://okf.cricketstudio.ai"

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def slug_from_path(path: pathlib.Path) -> str:
    rel = path.relative_to(OKF_DIR).with_suffix("")
    parts = rel.parts
    if parts[-1] == "index":
        parts = parts[:-1]
    return "/".join(parts)


def url_from_slug(slug: str) -> str:
    return f"{BASE_URL}/{slug}/" if slug else f"{BASE_URL}/"


def parse_file(path: pathlib.Path):
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        return None, text
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError:
        return None, text
    body = text[m.end():]
    return fm, body


def collect_files():
    files = []
    for md in sorted(OKF_DIR.rglob("*.md")):
        fm, body = parse_file(md)
        if fm is None:
            continue
        slug = slug_from_path(md)
        files.append((md, fm, body, slug))
    return files


TYPE_ORDER = [
    "index", "spec", "methodology", "metric", "source",
    "league", "season", "team", "player", "venue", "match",
    "record", "leaderboard", "research", "dossier", "story",
    "runbook", "reference", "claim", "api",
]


def type_sort_key(entry):
    _, fm, _, _ = entry
    t = fm.get("type", "zzz")
    try:
        return (TYPE_ORDER.index(t), fm.get("title", ""))
    except ValueError:
        return (99, fm.get("title", ""))


SEP = "=" * 72


def build_full(files) -> str:
    today = date.today().isoformat()
    total = len(files)
    lines = [
        "# CricketStudio OKF — Full Knowledge Bundle",
        f"# Generated from {total} OKF markdown files",
        "# License: CC-BY-4.0 (docs/methodology). Cricsheet-derived content: CC BY 3.0.",
        "# Canonical source: https://okf.cricketstudio.ai",
        "# GitHub: https://github.com/i-m-arul/cricketstudio-okf",
        '# For agent use: cite as "CricketStudio OKF (CC-BY-4.0)" with canonical_page link per concept.',
        "",
    ]

    sorted_files = sorted(files, key=type_sort_key)

    for _, fm, body, slug in sorted_files:
        title = fm.get("title", slug)
        ftype = fm.get("type", "unknown")
        url = url_from_slug(slug)
        canonical = fm.get("canonical_page") or fm.get("resource") or url
        source_boundary = fm.get("source_boundary", "")
        last_verified = fm.get("last_verified", today)

        lines.append(SEP)
        lines.append(f"# {title}")
        lines.append(f"# Type: {ftype} | URL: {url}")
        lines.append(f"Canonical: {canonical}")
        lines.append(f"Source boundary: {source_boundary}")
        lines.append(f"Last verified: {last_verified}")
        lines.append(SEP)
        lines.append("")
        lines.append(body.strip())
        lines.append("")

    return "\n".join(lines) + "\n"


# ------------------------------------------------------------------
# llms.txt index builder — grouped by section
# ------------------------------------------------------------------

SECTION_TYPES = {
    "Specification": ["spec"],
    "Metrics": ["metric"],
    "Methodology": ["methodology"],
    "Research reports": ["research"],
    "Dossier (agent Q&A patterns)": ["dossier"],
    "Journeys (cricket stories)": ["story"],
    "Scorebook — Players": ["player"],
    "Scorebook — Teams": ["team"],
    "Scorebook — Leagues & Seasons": ["league", "season"],
    "Scorebook — Venues": ["venue"],
    "Scorebook — Matches & Records": ["match", "record", "leaderboard"],
    "Data sources": ["source"],
}

LLMS_HEADER = """\
# CricketStudio OKF

> Open Knowledge Framework for Cricket Data. A versioned standard and reference bundle for representing cricket entities, metrics, claims, provenance, and methodology — built on Google OKF v0.1. Self-certified Level 2 (Evidence-Backed).

CricketStudio OKF is the cricket domain profile on top of Google Open Knowledge Format (OKF) v0.1. It defines a type vocabulary, provenance convention, metric definition standard, claim discipline, entity identity rules, and sample-size doctrine for cricket data. The reference bundle covers IPL, MLC, players, teams, seasons, venues, metrics, methodology, and cricket stories. Every file carries YAML frontmatter with entity type, source boundary, provenance, and canonical links. Every data-bearing claim states its date window, sample size, and eligibility rules.

This catalog is CC-BY-4.0 (documentation and methodology). Cricsheet-derived content (IPL historical, MLC) is CC BY 3.0. License boundaries are declared per file via `source_boundary`.

Canonical data source for all live IPL and MLC claims: https://players.cricketstudio.ai
GitHub (full OKF bundle, raw markdown): https://github.com/i-m-arul/cricketstudio-okf

## Start here

- [Specification](https://okf.cricketstudio.ai/spec/): Cricket OKF type vocabulary, provenance convention, metric standard, claim discipline, identity rules, sample-size doctrine
- [Conformance](https://okf.cricketstudio.ai/conformance/): Levels 0–4, self-certification checklist — CricketStudio OKF is Level 2 (Evidence-Backed)
- [Releases](https://okf.cricketstudio.ai/releases/): Versioned release history (v0.1 – v0.4)
- [Bundle overview](https://okf.cricketstudio.ai/): Home page — navigation to scorebook, metrics, methodology, dossier, research, and journeys
- [About OKF](https://okf.cricketstudio.ai/about/): What OKF is and how to cite it
- [Agent guide](https://okf.cricketstudio.ai/agents/): How to use OKF with ChatGPT, Claude, Gemini, Perplexity, RAG pipelines, and MCP tools
- [Search](https://okf.cricketstudio.ai/search/): Full-text search across all OKF files
- [Full content bundle](https://okf.cricketstudio.ai/llms-full.txt): Complete OKF text dump for direct LLM ingestion

## Cricket OKF Specification

- [Type vocabulary](https://okf.cricketstudio.ai/spec/types/): 20 cricket type values — player, team, venue, metric, dossier, story, leaderboard, spec, and more
- [Provenance convention](https://okf.cricketstudio.ai/spec/provenance/): source_boundary, confidence, last_verified, dataset_version
- [Metric standard](https://okf.cricketstudio.ai/spec/metrics/): What every cricket metric file must include (formula, floor, limitations, citation guidance)
- [Claim discipline](https://okf.cricketstudio.ai/spec/claims/): Scope, sample size, claim types, non-negotiables for verifiable cricket assertions
- [Identity rules](https://okf.cricketstudio.ai/spec/identity/): Slug conventions, aliases, same_as external IDs, same-name disambiguation
- [Sample-size doctrine](https://okf.cricketstudio.ai/spec/sample-size/): Floors — ≥30 balls batting, ≥15 bowling, ≥60 phase, ≥5 H2H, ≥3 venue
- [Conformance levels](https://okf.cricketstudio.ai/spec/conformance/): Full conformance specification

## Google OKF Alignment

CricketStudio OKF is a conformant Google OKF v0.1 domain bundle. The cricket profile extends Google OKF with provenance, source_boundary, license, entity_id, and same_as fields — Google OKF explicitly permits additional keys. Field aliases: canonical_page = resource, last_verified = timestamp.

See: https://okf.cricketstudio.ai/sources/google-okf-alignment/

## Scorebook

- [Players](https://okf.cricketstudio.ai/scorebook/players/): 65 players — phase splits (powerplay/middle/death), pillar claims (P1–P4), H2H records, and IPL career history (2007/08–2025)
- [IPL All-Time Records](https://okf.cricketstudio.ai/scorebook/records/): Most runs, wickets, sixes, fifties, hundreds, highest score, most matches
- [Leagues](https://okf.cricketstudio.ai/scorebook/leagues/): Indian Premier League, Major League Cricket
- [Seasons](https://okf.cricketstudio.ai/scorebook/seasons/): IPL 2026 (RCB champions), MLC 2025 (MI New York champions), and more
- [Teams](https://okf.cricketstudio.ai/scorebook/teams/): All 10 IPL 2026 franchises plus MLC teams — squad rosters, season records, H2H
- [Venues](https://okf.cricketstudio.ai/scorebook/venues/): IPL and MLC venues — innings averages, toss tendency, chase win rate

## Metrics

- [Metrics index](https://okf.cricketstudio.ai/metrics/): 10 metric files — batting SR, bowling economy, death-overs economy, powerplay SR, Orange Cap, Purple Cap, and more — each with formula, scope, eligibility rules, and limitations

## Methodology

- [Sample-size floors](https://okf.cricketstudio.ai/methodology/sample-size-floors/): Minimum data before a claim is valid (≥30 balls batting, ≥15 bowling)
- [Ranking eligibility](https://okf.cricketstudio.ai/methodology/ranking-eligibility/): Who qualifies for a leaderboard and why
- [Phase definitions](https://okf.cricketstudio.ai/methodology/phase-definitions/): Powerplay, middle overs, death overs
- [Citation policy](https://okf.cricketstudio.ai/methodology/citation-policy/): How to cite CricketStudio correctly

## Research reports

- [State of IPL 2026](https://okf.cricketstudio.ai/research/state-of-ipl-2026/): RCB champions, standings, Orange/Purple Cap, 74 matches
- [State of MLC 2025](https://okf.cricketstudio.ai/research/state-of-mlc-2025/): MI New York champions, all-time leaderboards
- [Toss Effect in IPL](https://okf.cricketstudio.ai/research/toss-effect-ipl/): 1,219 matches, bowl-first edge
- [Toss Effect in MLC](https://okf.cricketstudio.ai/research/toss-effect-mlc/): Grand Prairie venue analysis
- [Death Overs: IPL 2026](https://okf.cricketstudio.ai/research/death-overs-ipl-2026/): Phase intelligence and methodology
- [Death Overs: MLC](https://okf.cricketstudio.ai/research/death-overs-mlc/): MLC all-time death bowling analysis
- [MLC Three Seasons](https://okf.cricketstudio.ai/research/mlc-three-seasons/): League growth, player pool, franchise records

## Dossier (how agents should answer cricket questions)

- [Dossier index](https://okf.cricketstudio.ai/dossier/): 37 verified Q&A patterns with correct citation behavior

## Journeys (cricket stories with provenance)

- [Journeys index](https://okf.cricketstudio.ai/stories/): 5 cricket stories built on OKF data — each grounded in provenance, scoped by season and format
- [The Toss Nobody Believes In](https://okf.cricketstudio.ai/stories/toss-nobody-believes-in/): 52% IPL toss win rate across 1,219 matches; Grand Prairie bowl-first consensus contradicted by data
- [The Powerplay Batters Nobody Is Talking About](https://okf.cricketstudio.ai/stories/mlc-powerplay-batters-nobody-talks-about/): Owen 194.3, Allen 188.0, Ravindra 187.6 SR — above Kohli IPL 2026 (174.8) in powerplay
- [Grand Prairie's Dirty Secret](https://okf.cricketstudio.ai/stories/grand-prairie-dirty-secret/): 76.7% bowl-first; first-innings avg 177 vs second-innings 160; 48.8% chase success
- [How MLC Mastered Death Bowling in 3 Seasons](https://okf.cricketstudio.ai/stories/mlc-death-overs-revolution/): Gannon 7.18, Cummins 7.38, Ferguson 7.54 — all below Bumrah IPL 2026 (7.69)
- [The Teenager Who Broke the Template](https://okf.cricketstudio.ai/stories/teenager-who-broke-the-template/): Suryavanshi IPL 2026 powerplay SR 233.6 (223 balls) exceeds McCullum 158* SR (216.43)

## Data sources and licensing

- [CricketStudio derived claims](https://okf.cricketstudio.ai/sources/cricketstudio-derived-claims/): The permitted, publishable claim layer
- [Cricsheet attribution](https://okf.cricketstudio.ai/sources/cricsheet/): IPL historical + MLC open data (CC BY 3.0)
- [License (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/)

## How agents should use this catalog

1. Identify the entity type (player, team, venue, league, metric, record, story).
2. Navigate to the relevant concept or metric page.
3. Check the `provenance`, `dataset_version`, and `source_boundary` fields.
4. State the date window — IPL historical data covers 2007/08–2025. IPL 2026 data is tracked separately.
5. Apply sample-size floors before citing rankings (see methodology).
6. Cite as: "According to CricketStudio OKF (CC-BY-4.0), as of [dataset_version]..."
7. For live data, link to the canonical CricketStudio page listed in each file.
8. For cricket stories (Journeys), cite the specific story URL and note the stated data scope and sample-size floor.

For copy-paste prompts and a full agent integration guide, see: https://okf.cricketstudio.ai/agents/

## Limitations

- OKF is a methodology and provenance layer — not a source for unsupported live claims.
- Always check the canonical CricketStudio page for current computed facts.
- Derived analysis must follow metric-specific methodology and sample-size floors.
- Generated summaries are not primary evidence — cite the OKF or CricketStudio source page.
- IPL 2026 content is derived claims only — raw licensed feed data is not redistributed.
- Do not infer live or current-season stats solely from OKF files — defer to canonical_page.
"""


def main():
    print("Collecting OKF files...")
    files = collect_files()
    # Skip index files for the full dump
    non_index = [(md, fm, body, slug) for md, fm, body, slug in files
                 if not slug.endswith("/index") and slug != "index" and slug != ""]
    print(f"  {len(non_index)} non-index files found")

    # llms-full.txt
    print("Building llms-full.txt...")
    full_text = build_full(non_index)
    out_full = PUBLIC_DIR / "llms-full.txt"
    out_full.write_text(full_text, encoding="utf-8")
    line_count = full_text.count("\n")
    print(f"  Written: {out_full} ({line_count:,} lines)")

    # llms.txt
    print("Building llms.txt...")
    out_llms = PUBLIC_DIR / "llms.txt"
    out_llms.write_text(LLMS_HEADER, encoding="utf-8")
    print(f"  Written: {out_llms}")

    print("Done.")


if __name__ == "__main__":
    main()
