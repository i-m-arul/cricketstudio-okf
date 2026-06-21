"""
Generate MLC leaderboard OKF files.

Input:  cricketstudio-mcp/data/snapshot/mlc-leaderboards.json
Output: okf/scorebook/mlc/leaderboards/{slug}.md

Run from repo root:
    python scripts/generate_mlc_leaderboards.py
"""

import json
from pathlib import Path

SNAPSHOT_DIR = Path("C:/Git/cricketstudio-mcp/data/snapshot")
OUT_DIR = Path("okf/scorebook/mlc/leaderboards")
LAST_VERIFIED = "2026-06-21"
DATASET_VERSION = "2026-06-20"

# Human-readable category labels
LEADERBOARD_CATEGORY = {
    "orange-cap": "batting",
    "purple-cap": "bowling",
    "strike-rate": "batting",
    "economy-leaders": "bowling",
    "most-sixes": "batting",
    "most-fours": "batting",
    "top-knocks": "batting",
    "best-bowling": "bowling",
    "most-ducks": "batting",
    "single-digit-outs": "batting",
    "powerplay-strike-rate": "batting",
    "death-overs-economy": "bowling",
    "death-overs-strike-rate": "batting",
    "powerplay-economy": "bowling",
    "batting-average": "batting",
    "bowling-average": "bowling",
    "bowling-strike-rate": "bowling",
    "most-runs-conceded": "bowling",
    "pp-runs": "batting",
    "death-runs": "batting",
    "pp-wickets": "bowling",
    "death-wickets": "bowling",
    "most-sixes-pp": "batting",
    "most-sixes-death": "batting",
    "most-fours-pp": "batting",
    "most-fours-death": "batting",
    "most-not-outs": "batting",
    "most-innings": "batting",
    "most-appearances": "appearances",
    "most-boundaries": "batting",
    "most-boundaries-pp": "batting",
    "most-boundaries-death": "batting",
    "pp-bowling-strike-rate": "bowling",
    "death-bowling-strike-rate": "bowling",
    "most-pp-overs-bowled": "bowling",
    "most-death-overs-bowled": "bowling",
    "most-fifties": "batting",
    "most-hundreds": "batting",
    "most-dot-balls": "bowling",
    "middle-runs": "batting",
    "middle-economy": "bowling",
    "middle-sixes": "batting",
    "middle-wickets": "bowling",
    "fastest-fifty": "batting",
    "fastest-hundred": "batting",
    "most-maidens": "bowling",
    "hat-tricks": "bowling",
}

TEAM_NAMES = {
    "los-angeles-knight-riders": "Los Angeles Knight Riders",
    "mi-new-york": "MI New York",
    "san-francisco-unicorns": "San Francisco Unicorns",
    "seattle-orcas": "Seattle Orcas",
    "texas-super-kings": "Texas Super Kings",
    "washington-freedom": "Washington Freedom",
}

METRIC_FORMULAS = {
    "orange-cap": "Total runs scored across all captured MLC matches.",
    "purple-cap": "Total wickets taken across all captured MLC matches.",
    "strike-rate": "Runs scored per 100 balls faced. Formula: (runs / balls) × 100.",
    "economy-leaders": "Runs conceded per over bowled. Formula: (runs / balls) × 6.",
    "most-sixes": "Count of sixes hit across all captured MLC matches.",
    "most-fours": "Count of fours hit across all captured MLC matches.",
    "top-knocks": "Highest individual scores in a single MLC innings.",
    "best-bowling": "Best bowling figures (most wickets, fewest runs) in a single MLC innings.",
    "most-ducks": "Count of dismissals for zero runs.",
    "single-digit-outs": "Count of dismissals for 1–9 runs.",
    "powerplay-strike-rate": "Runs scored per 100 balls faced in overs 1–6. Formula: (pp_runs / pp_balls) × 100.",
    "death-overs-economy": "Runs conceded per over in overs 17–20. Formula: (death_runs / death_balls) × 6.",
    "death-overs-strike-rate": "Runs scored per 100 balls faced in overs 17–20. Formula: (death_runs / death_balls) × 100.",
    "powerplay-economy": "Runs conceded per over in overs 1–6. Formula: (pp_runs / pp_balls) × 6.",
    "batting-average": "Runs per dismissal. Formula: total_runs / total_outs.",
    "bowling-average": "Runs conceded per wicket taken. Formula: runs_conceded / wickets.",
    "bowling-strike-rate": "Balls bowled per wicket taken. Formula: balls_bowled / wickets.",
    "most-runs-conceded": "Total runs conceded across all MLC matches bowled.",
    "pp-runs": "Total runs scored in powerplay overs (1–6) across all MLC matches.",
    "death-runs": "Total runs scored in death overs (17–20) across all MLC matches.",
    "pp-wickets": "Total wickets taken in powerplay overs (1–6) across all MLC matches.",
    "death-wickets": "Total wickets taken in death overs (17–20) across all MLC matches.",
    "most-sixes-pp": "Count of sixes hit in powerplay overs (1–6).",
    "most-sixes-death": "Count of sixes hit in death overs (17–20).",
    "most-fours-pp": "Count of fours hit in powerplay overs (1–6).",
    "most-fours-death": "Count of fours hit in death overs (17–20).",
    "most-not-outs": "Count of innings where batter was not dismissed.",
    "most-innings": "Count of batting innings across all MLC matches.",
    "most-appearances": "Count of matches played across all MLC seasons.",
    "most-boundaries": "Total fours and sixes hit (boundaries count).",
    "most-boundaries-pp": "Total fours and sixes hit in powerplay overs.",
    "most-boundaries-death": "Total fours and sixes hit in death overs.",
    "pp-bowling-strike-rate": "Balls bowled per wicket taken in powerplay overs.",
    "death-bowling-strike-rate": "Balls bowled per wicket taken in death overs.",
    "most-pp-overs-bowled": "Total overs (converted from balls) bowled in powerplay (overs 1–6).",
    "most-death-overs-bowled": "Total overs (converted from balls) bowled in death (overs 17–20).",
    "most-fifties": "Count of innings where batter scored 50–99 runs.",
    "most-hundreds": "Count of innings where batter scored 100+ runs.",
    "most-dot-balls": "Count of dot deliveries (batter scored 0 runs off ball) bowled.",
    "middle-runs": "Total runs scored in middle overs (7–16).",
    "middle-economy": "Runs conceded per over in middle overs (7–16). Formula: (mid_runs / mid_balls) × 6.",
    "middle-sixes": "Count of sixes hit in middle overs (7–16).",
    "middle-wickets": "Total wickets taken in middle overs (7–16).",
    "fastest-fifty": "Fewest balls taken to reach 50 runs in a single innings.",
    "fastest-hundred": "Fewest balls taken to reach 100 runs in a single innings.",
    "most-maidens": "Count of maiden overs bowled (0 runs in a complete over).",
    "hat-tricks": "Count of hat-tricks (3 wickets in 3 consecutive deliveries) across all MLC matches.",
}

AGENT_GUIDANCE = {
    "batting": (
        "When ranking batters, apply the sample-size floor stated in `floorNote`. "
        "Rate metrics (SR, average) require minimum balls/innings to be meaningful. "
        "Always state 'All MLC seasons 2023–2025' as the scope."
    ),
    "bowling": (
        "When ranking bowlers, apply the sample-size floor stated in `floorNote`. "
        "Economy and average require minimum balls bowled to be meaningful. "
        "Always state 'All MLC seasons 2023–2025' as the scope."
    ),
    "appearances": (
        "Appearance counts are straightforward counting stats with no minimum floor. "
        "All MLC seasons 2023–2025 are captured."
    ),
}


def team_label(team_slugs):
    names = [TEAM_NAMES.get(s, s.replace("-", " ").title()) for s in team_slugs]
    return ", ".join(names) if names else "—"


def generate_leaderboard_file(slug, lb):
    title = lb["title"]
    description = lb.get("description", "")
    metric_label = lb.get("metricLabel", "Value")
    floor_note = lb.get("floorNote", "No minimum floor stated.")
    rows = lb.get("rows", [])
    category = LEADERBOARD_CATEGORY.get(slug, "batting")
    formula = METRIC_FORMULAS.get(slug, "")
    guidance = AGENT_GUIDANCE.get(category, AGENT_GUIDANCE["batting"])

    canon_url = f"https://players.cricketstudio.ai/leagues/mlc/leaderboards/{slug}"

    # Show top 10 (or all if fewer)
    display_rows = rows[:10]
    has_more = len(rows) > 10

    # Frontmatter
    frontmatter = f"""---
type: leaderboard
title: "{title}"
description: "{description} MLC all-time leaderboard."
resource: {canon_url}
status: active
last_verified: {LAST_VERIFIED}
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:leaderboard:{slug}
canonical_page: {canon_url}
dataset_version: "{DATASET_VERSION}"
tags:
  - cricket
  - leaderboard
  - MLC
  - T20
  - {category}
provenance:
  source: Cricsheet CC BY 3.0 via CricketStudio derived claim layer
  confidence: high
  computed_at: "{DATASET_VERSION}"
  notes: All captured MLC matches (seasons 2023–2025, 75 matches total). Attribution required per CC BY 3.0.
---"""

    # Body
    lines = [f"# {title}", "", "## Summary", ""]
    lines.append(description)
    lines.append("")
    lines.append("**Scope:** All captured MLC matches — seasons 2023, 2024, 2025 (75 matches total).")
    lines.append(f"**Eligibility:** {floor_note}")
    lines.append("")

    if formula:
        lines.append("## Metric Definition")
        lines.append("")
        lines.append(formula)
        lines.append("")

    lines.append("## Canonical Resource")
    lines.append("")
    lines.append(f"[players.cricketstudio.ai/leagues/mlc/leaderboards/{slug}]({canon_url})")
    lines.append("")

    # Top 10 table
    top_n = min(10, len(display_rows))
    lines.append(f"## Top {top_n} — {title}")
    lines.append("")
    lines.append(f"| Rank | Player | Team | {metric_label} | Sample |")
    lines.append("|------|--------|------|" + "-" * len(metric_label) + "--|--------|")

    for row in display_rows:
        rank = row.get("rank", "—")
        player_name = row.get("fullName", "—")
        player_slug = row.get("slug", "")
        teams = team_label(row.get("teamSlugs", []))
        value = row.get("formatted", str(row.get("metricValue", "—")))
        sample = row.get("sampleSize", "—")
        lines.append(f"| {rank} | {player_name} | {teams} | {value} | {sample} |")

    if has_more:
        lines.append("")
        lines.append(f"*Full leaderboard ({len(rows)} entries) available at the [canonical CricketStudio page]({canon_url}).*")

    lines.append("")
    lines.append("## What Agents Should Know")
    lines.append("")
    lines.append(f"- {guidance}")
    lines.append(f"- Eligibility floor: {floor_note}")
    lines.append(f"- Metric definition: {formula}" if formula else "")
    lines.append(f"- For MLC 2026 Season 4 live leaderboard, use the canonical CricketStudio page.")
    lines.append("- Source: Cricsheet CC BY 3.0 open data via CricketStudio derived claim layer.")

    lines.append("")
    lines.append("## Provenance and Data Notes")
    lines.append("")
    lines.append("- **Dataset:** Cricsheet CC BY 3.0 ball-by-ball data, processed by CricketStudio.")
    lines.append("- **Scope:** MLC seasons 2023, 2024, 2025. Season 4 (2026) is in progress; this snapshot does not include it.")
    lines.append("- **Attribution:** Cricsheet (<https://cricsheet.org>) — required per CC BY 3.0.")
    lines.append(f"- **Snapshot:** {DATASET_VERSION}")
    lines.append("")
    lines.append("## Related Concepts")
    lines.append("")
    lines.append("- [Major League Cricket](../../leagues/major-league-cricket.md)")
    lines.append("- [MLC Orange Cap](./orange-cap.md)")
    lines.append("- [MLC Purple Cap](./purple-cap.md)")
    lines.append("- [MLC Players](../players/)")

    # Remove empty lines caused by empty formula
    content = frontmatter + "\n\n" + "\n".join(l for l in lines) + "\n"
    return content


def main():
    data = json.load(open(SNAPSHOT_DIR / "mlc-leaderboards.json"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    written = 0
    for slug, lb in data.items():
        content = generate_leaderboard_file(slug, lb)
        out_path = OUT_DIR / f"{slug}.md"
        out_path.write_text(content, encoding="utf-8")
        written += 1

    print(f"Generated {written} MLC leaderboard files → {OUT_DIR}/")


if __name__ == "__main__":
    main()
