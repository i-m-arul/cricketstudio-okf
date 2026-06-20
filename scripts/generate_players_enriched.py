"""
Enriched player profile generator.

Reads CricketStudio MCP snapshot files and generates rich OKF markdown for each
IPL 2026 player that already has an OKF file.

Sources:
  - players.json      — identity, pillar claims, batting/bowling aggregate (IPL 2026)
  - season-stats.json — phase splits (PP/middle/death), fielding, ducks, 50s, 100s
  - h2h.json          — batter-vs-bowler and bowler-vs-batter records (≥5 ball floor)
  - ipl-historical.json — season-by-season IPL career before 2026 (Cricsheet CC BY 3.0)

Run:
  python scripts/generate_players_enriched.py
  python scripts/generate_players_enriched.py --slug virat-kohli
"""

import json
import os
import sys
import argparse
from datetime import datetime
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO = Path(__file__).parent.parent
SNAPSHOT = Path(r"C:\Git\cricketstudio-mcp\data\snapshot")
PLAYERS_DIR = REPO / "okf" / "scorebook" / "players"

# ---------------------------------------------------------------------------
# Historical slug mapping (modern OKF slug -> ipl-historical.json bySlug key)
# Built from name-matching; extend as new players are added.
# ---------------------------------------------------------------------------
HIST_KEY_MAP = {
    "ajinkya-rahane":       "am-rahane",
    "axar-patel":           "ar-patel",
    "bhuvneshwar-kumar":    "b-kumar",
    "hardik-pandya":        "hh-pandya",
    "heinrich-klaasen":     "h-klaasen",
    "ishan-kishan":         "ishan-kishan",
    "jasprit-bumrah":       "jj-bumrah",
    "jaydev-unadkat":       "jd-unadkat",
    "jos-buttler":          "jc-buttler",
    "kagiso-rabada":        "k-rabada",
    "krunal-pandya":        "kh-pandya",
    "lokesh-rahul":         "kl-rahul",
    "mahendra-singh-dhoni": "ms-dhoni",
    "manish-pandey":        "mk-pandey",
    "mohammed-shami":       "mohammed-shami",
    "mohammed-siraj":       "mohammed-siraj",
    "nicholas-pooran":      "n-pooran",
    "pat-cummins":          "pj-cummins",
    "quinton-de-kock":      "q-de-kock",
    "rashid-khan":          "rashid-khan",
    "ravindra-jadeja":      "ra-jadeja",
    "rishabh-pant":         "rr-pant",
    "rohit-sharma":         "r-sharma",
    "sandeep-sharma":       "sandeep-sharma",
    "sanju-samson":         "sv-samson",
    "shardul-thakur":       "sn-thakur",
    "shreyas-iyer":         "ss-iyer",
    "shubman-gill":         "shubman-gill",
    "sunil-narine":         "sp-narine",
    "suryakumar-yadav":     "sa-yadav",
    "trent-boult":          "ta-boult",
    "vaibhav-suryavanshi":  "v-suryavanshi",
    "virat-kohli":          "v-kohli",
    "yuzvendra-chahal":     "ys-chahal",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_json(name):
    path = SNAPSHOT / name
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def fmt_num(v, decimals=0):
    if v is None:
        return "—"
    if decimals == 0:
        return f"{int(round(v)):,}"
    return f"{v:,.{decimals}f}"


def role_label(role):
    return {
        "batter": "Batter",
        "bowler": "Bowler",
        "all-rounder": "All-rounder",
        "wicket-keeper": "Wicket-keeper",
        "wk-batter": "Wicket-keeper batter",
    }.get(role, role.title() if role else "—")


def hand_label(h):
    return {"right": "Right-hand bat (RHB)", "left": "Left-hand bat (LHB)"}.get(h, h or "—")


def bowling_label(s):
    return s.title() if s else "—"


def pillar_label(p):
    return {
        "P1": "P1 — Recent Match",
        "P2": "P2 — Notable Moments",
        "P3": "P3 — Form & Phase",
        "P4": "P4 — Season Comparatives",
    }.get(p, p)


def is_bowler(role, season_bowling):
    """True if the player is a meaningful bowler (has a bowling role or bowled balls in 2026)."""
    if role in ("bowler", "all-rounder"):
        return True
    if season_bowling and (season_bowling.get("balls") or 0) > 0:
        return True
    return False


def bowling_style_tag(bowling_style):
    if not bowling_style:
        return []
    bs = bowling_style.lower()
    if any(w in bs for w in ("fast", "medium", "seam")):
        return ["pace"]
    if any(w in bs for w in ("spin", "off", "leg", "slow", "left arm orthodox", "chinaman", "googly")):
        return ["spin"]
    return []


def build_tags(player, season_stats):
    """Build the canonical tag list for a player."""
    role = player.get("role", "")
    hand = player.get("battingHandedness", "")
    bowling_style = player.get("bowlingStyle", "")
    season_bowling = (season_stats or {}).get("bowling", {})

    tags = ["cricket", "player", "IPL"]

    # Role tag
    role_tag = {"batter": "batter", "bowler": "bowler",
                "all-rounder": "all-rounder", "wicket-keeper": "wicket-keeper",
                "wk-batter": "wicket-keeper"}.get(role)
    if role_tag:
        tags.append(role_tag)

    # Batting hand
    if hand == "right":
        tags.append("RHB")
    elif hand == "left":
        tags.append("LHB")

    # Bowling style — only if they actually bowl
    if is_bowler(role, season_bowling):
        tags.extend(bowling_style_tag(bowling_style))

    return tags


def phase_table(phase_data, stat_type="batting"):
    """Render a PP/middle/death phase split table."""
    if not phase_data:
        return "_Phase data not available for this player._\n"

    pp = phase_data.get("pp", {})
    md = phase_data.get("md", {})
    dt = phase_data.get("death", {})

    if stat_type == "batting":
        header = "| Phase | Balls | Runs | SR | 4s | 6s |"
        sep =    "|-------|-------|------|-----|-----|-----|"
        rows = []
        for label, ph in [("Powerplay (ov 1–6)", pp), ("Middle (ov 7–15)", md), ("Death (ov 16–20)", dt)]:
            if (ph.get("balls") or 0) == 0:
                continue
            rows.append(
                f"| {label} | {fmt_num(ph.get('balls'))} | {fmt_num(ph.get('runs'))} "
                f"| {fmt_num(ph.get('sr'), 1)} | {fmt_num(ph.get('fours'))} | {fmt_num(ph.get('sixes'))} |"
            )
        if not rows:
            return "_No qualifying phase data (0 balls recorded)._\n"
        return "\n".join([header, sep] + rows) + "\n"

    else:  # bowling
        header = "| Phase | Balls | Runs | Wkts | Econ |"
        sep =    "|-------|-------|------|------|------|"
        rows = []
        for label, ph in [("Powerplay (ov 1–6)", pp), ("Middle (ov 7–15)", md), ("Death (ov 16–20)", dt)]:
            balls_key = "ballsBowled" if "ballsBowled" in ph else "balls"
            runs_key = "runsConceded" if "runsConceded" in ph else "runs"
            if (ph.get(balls_key) or 0) == 0:
                continue
            rows.append(
                f"| {label} | {fmt_num(ph.get(balls_key))} | {fmt_num(ph.get(runs_key))} "
                f"| {fmt_num(ph.get('wickets'))} | {fmt_num(ph.get('econ'), 2)} |"
            )
        if not rows:
            return "_No qualifying phase data (0 balls recorded)._\n"
        return "\n".join([header, sep] + rows) + "\n"


def h2h_table(h2h_records, slug, role):
    """Top 5 H2H records for this player, ≥5 ball floor."""
    if role in ("bowler",):
        # As bowler: find records where this player is the bowler
        recs = [r for r in h2h_records if r.get("bowlerSlug") == slug and r.get("deliveries", 0) >= 5]
        recs.sort(key=lambda r: r.get("deliveries", 0), reverse=True)
        recs = recs[:5]
        if not recs:
            return "_No qualifying head-to-head records (minimum 5 deliveries)._\n"
        header = "| Batter | Balls | Runs | SR | 4s | 6s | Dismissals |"
        sep =    "|--------|-------|------|-----|-----|-----|-----------|"
        rows = [
            f"| {r['batterName']} | {r['deliveries']} | {r['runs']} "
            f"| {fmt_num(r.get('strikeRate'), 1)} | {r.get('fours', 0)} | {r.get('sixes', 0)} | {r.get('dismissals', 0)} |"
            for r in recs
        ]
    else:
        # As batter: find records where this player is the batter
        recs = [r for r in h2h_records if r.get("batterSlug") == slug and r.get("deliveries", 0) >= 5]
        recs.sort(key=lambda r: r.get("deliveries", 0), reverse=True)
        recs = recs[:5]
        if not recs:
            return "_No qualifying head-to-head records (minimum 5 deliveries)._\n"
        header = "| Bowler | Balls | Runs | SR | 4s | 6s | Dismissals |"
        sep =    "|--------|-------|------|-----|-----|-----|-----------|"
        rows = [
            f"| {r['bowlerName']} | {r['deliveries']} | {r['runs']} "
            f"| {fmt_num(r.get('strikeRate'), 1)} | {r.get('fours', 0)} | {r.get('sixes', 0)} | {r.get('dismissals', 0)} |"
            for r in recs
        ]

    return "\n".join([header, sep] + rows) + "\n"


def historical_season_table(hist_data, role):
    """Season-by-season table from ipl-historical."""
    if not hist_data or not hist_data.get("bySeason"):
        return "_Historical season data not available for this player._\n"

    by_season = hist_data["bySeason"]
    seasons = sorted(by_season.keys())

    # Exclude 2026 (covered by IPL 2026 snapshot section)
    seasons = [s for s in seasons if s not in ("2026",)]

    if not seasons:
        return "_No pre-2026 IPL seasons recorded._\n"

    if role == "bowler":
        header = "| Season | Team | M | Wkts | Econ | Avg |"
        sep    = "|--------|------|---|------|------|-----|"
        rows = []
        for s in seasons:
            sd = by_season[s]
            b = sd.get("bowling", {})
            teams = ", ".join(t.upper() for t in sd.get("teamSlugs", []))
            rows.append(
                f"| {s} | {teams} | {b.get('matches', 0)} | {b.get('wickets', 0)} "
                f"| {fmt_num(b.get('econ'), 2)} | {fmt_num(b.get('avg'), 1)} |"
            )
    else:
        header = "| Season | Team | M | Runs | HS | Avg | SR | 50s | 100s |"
        sep    = "|--------|------|---|------|----|-----|-----|-----|------|"
        rows = []
        for s in seasons:
            sd = by_season[s]
            ba = sd.get("batting", {})
            teams = ", ".join(t.upper() for t in sd.get("teamSlugs", []))
            rows.append(
                f"| {s} | {teams} | {ba.get('matches', 0)} | {fmt_num(ba.get('runs', 0))} "
                f"| {ba.get('highScore', '—')} | {fmt_num(ba.get('avg'), 1)} "
                f"| {fmt_num(ba.get('sr'), 1)} | {ba.get('fifties', 0)} | {ba.get('hundreds', 0)} |"
            )

    return "\n".join([header, sep] + rows) + "\n"


def generate_player_md(slug, players_data, season_stats_data, h2h_records, hist_data):
    """Generate enriched OKF markdown for one player."""
    p = players_data.get(slug)
    if not p:
        raise ValueError(f"Player {slug!r} not found in players.json")

    ss = season_stats_data.get(slug)
    hist = hist_data.get(HIST_KEY_MAP.get(slug, ""))

    role = p.get("role", "batter")
    full_name = p.get("fullName", slug.replace("-", " ").title())
    team = p.get("team", "")
    hand = p.get("battingHandedness", "")
    bowling_style = p.get("bowlingStyle", "")
    nationality = p.get("nationality", "")
    dob = p.get("dateOfBirth", "")
    birth_place = p.get("birthPlace", "")
    same_as = p.get("sameAs") or {}
    batting_2026 = p.get("batting", {})
    claims = p.get("claims", [])

    season_batting = (ss or {}).get("batting", {})
    season_bowling = (ss or {}).get("bowling", {})
    season_fielding = (ss or {}).get("fielding", {})

    tags = build_tags(p, ss)
    entity_id = f"cricketstudio:player:{slug}"
    canonical = f"https://players.cricketstudio.ai/players/{slug}"
    dataset_version = "2026-06-11"
    last_verified = "2026-06-19"

    # Career description from historical
    if hist:
        hist_batting = hist.get("batting", {})
        hist_bowling = hist.get("bowling", {})
        if role == "bowler":
            desc_stat = f"{hist_batting.get('runs', 0)} runs and {hist_bowling.get('wickets', 0)} wickets across IPL pre-2026"
        else:
            desc_stat = f"{hist_batting.get('runs', 0):,} runs across IPL pre-2026"
    else:
        desc_stat = "IPL career stats — see canonical CricketStudio page"

    desc = f"CricketStudio OKF entry for {full_name}. {desc_stat}. IPL 2026 with {team}."

    # same_as YAML block
    same_as_lines = ""
    for k, v in same_as.items():
        if v:
            same_as_lines += f'  {k}: "{v}"\n'
    if not same_as_lines:
        same_as_lines = "  {}\n"

    # Build frontmatter
    tags_yaml = "\n".join(f"  - {t}" for t in tags)
    dob_line = f'dob: "{dob}"\n' if dob else ""
    birth_place_line = f'birth_place: "{birth_place}"\n' if birth_place else ""

    frontmatter = f"""---
type: player
title: {full_name}
description: "{desc}"
resource: {canonical}
tags:
{tags_yaml}
status: active
last_verified: {last_verified}
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: public_open_data
canonical_page: {canonical}
entity_id: {entity_id}
dataset_version: {dataset_version}
team: "{team}"
role: "{role}"
batting_handedness: "{hand}"
bowling_style: "{bowling_style}"
nationality: "{nationality}"
{dob_line}{birth_place_line}same_as:
{same_as_lines}provenance:
  source: "CricketStudio IPL 2026 snapshot (derived claims) + Cricsheet CC BY 3.0 (historical)"
  confidence: high
  notes: "IPL 2026 stats from CricketStudio ball-by-ball capture. Pre-2026 career from Cricsheet CC BY 3.0 via ipl-historical dataset. For live current-season stats use the canonical page."
---"""

    # -----------------------------------------------------------------------
    # Body
    # -----------------------------------------------------------------------

    # Summary
    if role == "bowler":
        wkts = fmt_num(season_bowling.get("wickets", 0)) if season_bowling else "—"
        econ = fmt_num(season_bowling.get("econ"), 2) if season_bowling else "—"
        summary_line = (
            f"{full_name} is a {role_label(role).lower()} for {team} in IPL 2026, "
            f"taking {wkts} wickets at {econ} economy. "
            f"Bowling style: {bowling_label(bowling_style)}."
        )
    else:
        runs_2026 = season_batting.get("runs", batting_2026.get("runs", 0))
        avg_2026 = season_batting.get("avg", batting_2026.get("avg"))
        summary_line = (
            f"{full_name} is a {role_label(role).lower()} for {team} in IPL 2026, "
            f"scoring {fmt_num(runs_2026)} runs"
            + (f" at {fmt_num(avg_2026, 1)} average" if avg_2026 else "")
            + f". Batting: {hand_label(hand)}."
        )

    # Player profile table
    profile_table = f"""| Attribute | Value |
|-----------|-------|
| Role | {role_label(role)} |
| Team (IPL 2026) | {team} |
| Batting | {hand_label(hand)} |
| Bowling | {bowling_label(bowling_style)} |
| Nationality | {nationality} |"""
    if dob:
        profile_table += f"\n| Date of birth | {dob} |"
    if birth_place:
        profile_table += f"\n| Born in | {birth_place} |"

    # IPL 2026 batting aggregate
    def batting_agg_section():
        b = season_batting or batting_2026
        if not b:
            return "_IPL 2026 batting data not available._\n"
        return f"""| Stat | Value |
|------|-------|
| Matches | {fmt_num(b.get('matches', b.get('innings', '—')))} |
| Innings | {fmt_num(b.get('innings', '—'))} |
| Runs | {fmt_num(b.get('runs', 0))} |
| Highest score | {b.get('highScore', b.get('hs', '—'))} |
| Average | {fmt_num(b.get('avg'), 2)} |
| Strike rate | {fmt_num(b.get('sr'), 1)} |
| Fifties | {fmt_num(b.get('fifties', 0))} |
| Hundreds | {fmt_num(b.get('hundreds', 0))} |
| Ducks | {fmt_num(b.get('ducks', 0))} |
| Fours | {fmt_num(b.get('fours', 0))} |
| Sixes | {fmt_num(b.get('sixes', 0))} |
"""

    def bowling_agg_section():
        bw = season_bowling
        if not bw or (bw.get("balls") or 0) == 0:
            return "_No IPL 2026 bowling recorded._\n"
        return f"""| Stat | Value |
|------|-------|
| Matches | {fmt_num(bw.get('matches', 0))} |
| Wickets | {fmt_num(bw.get('wickets', 0))} |
| Economy | {fmt_num(bw.get('econ'), 2)} |
| Average | {fmt_num(bw.get('avg'), 2)} |
| Dots | {fmt_num(bw.get('dots', 0))} |
"""

    def fielding_section():
        f = season_fielding
        if not f or (f.get("totalDismissals") or 0) == 0:
            return ""
        return f"""## Fielding — IPL 2026

| Stat | Value |
|------|-------|
| Catches | {fmt_num(f.get('catches', 0))} |
| Run-out assists | {fmt_num(f.get('runOutAssists', 0))} |
| Total dismissals | {fmt_num(f.get('totalDismissals', 0))} |

*Source: CricketStudio IPL 2026 snapshot (2026-06-11).*
"""

    # Claims by pillar
    def claims_section():
        if not claims:
            return "_No pillar claims in current snapshot. See canonical CricketStudio page for current claims._\n"
        by_pillar = {}
        for c in claims:
            pl = c.get("pillar", "P?")
            by_pillar.setdefault(pl, []).append(c)
        lines = []
        for pl in sorted(by_pillar.keys()):
            lines.append(f"### {pillar_label(pl)}\n")
            for c in by_pillar[pl]:
                headline = c.get("headline", c.get("value", ""))
                sample = c.get("sampleSize", "")
                computed = c.get("computedAt", "")
                lines.append(f"- **{c.get('metric', '')}**: {headline}")
                if sample or computed:
                    meta = []
                    if sample:
                        meta.append(f"sample: {sample}")
                    if computed:
                        meta.append(f"computed: {computed[:10]}")
                    lines.append(f"  *(  {'; '.join(meta)}  )*")
                lines.append("")
        return "\n".join(lines)

    # Historical aggregate
    def historical_agg():
        if not hist:
            return ""
        hb = hist.get("batting", {})
        hw = hist.get("bowling", {})
        if role == "bowler":
            return f"""### Career Bowling (pre-2026 IPL)

| Stat | Value |
|------|-------|
| Matches | {fmt_num(hw.get('matches', 0))} |
| Wickets | {fmt_num(hw.get('wickets', 0))} |
| Economy | {fmt_num(hw.get('econ'), 2)} |
| Average | {fmt_num(hw.get('avg'), 2)} |
"""
        else:
            return f"""### Career Batting (pre-2026 IPL)

| Stat | Value |
|------|-------|
| Matches | {fmt_num(hb.get('matches', 0))} |
| Innings | {fmt_num(hb.get('innings', 0))} |
| Runs | {fmt_num(hb.get('runs', 0))} |
| Highest score | {hb.get('highScore', '—')} |
| Average | {fmt_num(hb.get('avg'), 2)} |
| Strike rate | {fmt_num(hb.get('sr'), 1)} |
| Fifties | {fmt_num(hb.get('fifties', 0))} |
| Hundreds | {fmt_num(hb.get('hundreds', 0))} |
| Sixes | {fmt_num(hb.get('sixes', 0))} |
"""

    # Agent guidance — role-aware
    if role == "bowler":
        agent_guidance = f"""- IPL 2026 bowling stats cover fixtures captured ball-by-ball by CricketStudio through 2026-06-11.
- Phase splits (PP/middle/death) are the most informative context for {full_name} — use them when answering phase-specific bowling questions.
- When citing: *"According to CricketStudio OKF (IPL 2026 snapshot, 2026-06-11), {full_name} took X wickets at Y economy in IPL 2026."*
- Pre-2026 career (Cricsheet CC BY 3.0) covers historical IPL only — T20I and other formats are not included here.
- For current-season live stats, use the canonical CricketStudio page."""
    else:
        agent_guidance = f"""- IPL 2026 batting stats cover fixtures captured ball-by-ball by CricketStudio through 2026-06-11.
- Phase splits (PP/middle/death) are the most contextual stats — powerplay SR is computed over overs 1–6 only.
- Pillar claims above are the primary citable facts for {full_name}; each includes its own sample size and `computedAt`.
- When citing: *"According to CricketStudio OKF (IPL 2026 snapshot, 2026-06-11), {full_name} scored X runs at Y average in IPL 2026."*
- Pre-2026 career (Cricsheet CC BY 3.0) covers historical IPL only — Test, ODI, and other T20 formats are not included here.
- For current-season live stats, use the canonical CricketStudio page."""

    body = f"""
# {full_name}

## Summary

{summary_line}

## Canonical Resource

[{canonical}]({canonical})

## Player Profile

{profile_table}

## IPL 2026 Season

*Snapshot: CricketStudio IPL 2026 ball-by-ball capture, dataset version 2026-06-11.*

### Batting — IPL 2026

{batting_agg_section()}
### Bowling — IPL 2026

{bowling_agg_section()}
{fielding_section()}
## Phase Splits — IPL 2026

*Powerplay = overs 1–6 · Middle = overs 7–15 · Death = overs 16–20. Source: CricketStudio IPL 2026 snapshot.*

### Batting by Phase

{phase_table(season_batting, "batting")}
"""

    if is_bowler(role, season_bowling) and season_bowling:
        body += f"""### Bowling by Phase

{phase_table(season_bowling, "bowling")}
"""

    body += f"""
## Claims by Pillar (IPL 2026)

*Pillar claims are the primary citable facts per CricketStudio's P1–P4 framework. Each includes sample size and computation timestamp.*

{claims_section()}

## Head-to-Head Records (IPL 2026, ≥5 deliveries)

*Source: CricketStudio IPL 2026 h2h dataset. Minimum 5 deliveries per matchup.*

{h2h_table(h2h_records, slug, role)}

## IPL Career Before 2026 (Cricsheet CC BY 3.0)

*Source: Cricsheet CC BY 3.0, processed by CricketStudio. Covers IPL seasons through 2025. Raw ball-by-ball data is not redistributed.*

{historical_agg()}

### Season by Season

{historical_season_table(hist, role)}

## What Agents Should Know

{agent_guidance}

## Provenance and Data Notes

- **IPL 2026 stats**: CricketStudio ball-by-ball capture — `source_boundary: public_open_data`, dataset 2026-06-11
- **Pre-2026 career**: Cricsheet CC BY 3.0 — open data, attribution required
- **Scope**: IPL only. Test, ODI, T20I, and other domestic formats are not included in this file.
- **License**: This OKF file is CC-BY-4.0. The underlying Cricsheet data is CC BY 3.0.
- **Live stats**: This file is a snapshot. For current-season live stats, see the [canonical CricketStudio page]({canonical}).

## Related Concepts

- [IPL League](../leagues/indian-premier-league.md)
- [IPL All-Time Records](../records/index.md)
"""

    return frontmatter + "\n" + body


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Generate enriched OKF player profiles")
    parser.add_argument("--slug", help="Generate only this player slug")
    parser.add_argument("--dry-run", action="store_true", help="Print output without writing files")
    args = parser.parse_args()

    print("Loading snapshot data...")
    players_data = load_json("players.json")
    ss_raw = load_json("season-stats.json")
    season_stats = ss_raw.get("bySlug", {})
    h2h_records = load_json("h2h.json")
    hist_raw = load_json("ipl-historical.json")
    hist_by_slug = hist_raw.get("bySlug", {})

    # Find target slugs
    if args.slug:
        slugs = [args.slug]
    else:
        slugs = sorted(
            f.stem for f in PLAYERS_DIR.glob("*.md")
            if f.stem != "index" and f.stem in players_data
        )

    print(f"Processing {len(slugs)} player(s)...")
    ok = 0
    errors = []

    for slug in slugs:
        try:
            hist_key = HIST_KEY_MAP.get(slug)
            hist_data_flat = {hist_key: hist_by_slug[hist_key]} if hist_key and hist_key in hist_by_slug else {}
            md = generate_player_md(slug, players_data, season_stats, h2h_records, hist_data_flat)
            if args.dry_run:
                print(f"\n{'='*60}\n{slug}\n{'='*60}")
                print(md[:2000])
                print("...")
            else:
                out_path = PLAYERS_DIR / f"{slug}.md"
                out_path.write_text(md, encoding="utf-8")
                print(f"  OK {slug}")
            ok += 1
        except Exception as e:
            errors.append((slug, str(e)))
            print(f"  ERR {slug}: {e}")

    print(f"\nDone: {ok} generated, {len(errors)} errors.")
    if errors:
        for slug, err in errors:
            print(f"  ERROR {slug}: {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()
