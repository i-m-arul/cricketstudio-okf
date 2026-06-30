"""
add_body_links.py — add inline body-text links to players.cricketstudio.ai
in OKF story and dossier files.

For each story/dossier:
  - Finds first unlinked mention of key player names and leaderboard terms
  - Replaces with [name](canonical_url) markdown link
  - Skips: existing links, code blocks, headings, frontmatter

Run: python scripts/add_body_links.py [--dry-run]
"""
import pathlib
import re
import sys

OKF_DIR = pathlib.Path(__file__).parent.parent / "okf"

# Priority order: longest/most-specific first to avoid partial matches.
# Short names only when unambiguous in cricket/IPL context.
PLAYER_LINKS = [
    # Full names (matched first)
    ("Vaibhav Suryavanshi",   "https://players.cricketstudio.ai/players/vaibhav-suryavanshi"),
    ("Virat Kohli",           "https://players.cricketstudio.ai/players/virat-kohli"),
    ("Jasprit Bumrah",        "https://players.cricketstudio.ai/players/jasprit-bumrah"),
    ("Kagiso Rabada",         "https://players.cricketstudio.ai/players/kagiso-rabada"),
    ("Rashid Khan",           "https://players.cricketstudio.ai/players/rashid-khan"),
    ("Sunil Narine",          "https://players.cricketstudio.ai/players/sunil-narine"),
    ("Yuzvendra Chahal",      "https://players.cricketstudio.ai/players/yuzvendra-chahal"),
    ("Rohit Sharma",          "https://players.cricketstudio.ai/players/rohit-sharma"),
    ("Mahendra Singh Dhoni",  "https://players.cricketstudio.ai/players/mahendra-singh-dhoni"),
    ("MS Dhoni",              "https://players.cricketstudio.ai/players/mahendra-singh-dhoni"),
    ("Shubman Gill",          "https://players.cricketstudio.ai/players/shubman-gill"),
    ("Hardik Pandya",         "https://players.cricketstudio.ai/players/hardik-pandya"),
    ("Suryakumar Yadav",      "https://players.cricketstudio.ai/players/suryakumar-yadav"),
    ("Bhuvneshwar Kumar",     "https://players.cricketstudio.ai/players/bhuvneshwar-kumar"),
    ("Axar Patel",            "https://players.cricketstudio.ai/players/axar-patel"),
    ("Faf du Plessis",        "https://players.cricketstudio.ai/players/faf-du-plessis"),
    ("Chris Gayle",           "https://players.cricketstudio.ai/players/ch-gayle"),
    ("Brendon McCullum",      "https://players.cricketstudio.ai/players/brendon-mccullum"),
    ("Pat Cummins",           "https://players.cricketstudio.ai/players/pat-cummins"),
    ("Trent Boult",           "https://players.cricketstudio.ai/players/trent-boult"),
    ("Nandre Burger",         "https://players.cricketstudio.ai/players/nandre-burger"),
    ("Mohammed Shami",        "https://players.cricketstudio.ai/players/mohammed-shami"),
    ("Mohammed Siraj",        "https://players.cricketstudio.ai/players/mohammed-siraj"),
    ("Ravindra Jadeja",       "https://players.cricketstudio.ai/players/ravindra-jadeja"),
    ("Abhishek Sharma",       "https://players.cricketstudio.ai/players/abhishek-sharma"),
    ("Ishan Kishan",          "https://players.cricketstudio.ai/players/ishan-kishan"),
    ("Praful Hinge",          "https://players.cricketstudio.ai/players/praful-hinge"),
    ("Yashasvi Jaiswal",      "https://players.cricketstudio.ai/players/yashasvi-jaiswal"),
    ("Rishabh Pant",          "https://players.cricketstudio.ai/players/rishabh-pant"),
    ("Shreyas Iyer",          "https://players.cricketstudio.ai/players/shreyas-iyer"),
    ("Jos Buttler",           "https://players.cricketstudio.ai/players/jos-buttler"),
    ("Lokesh Rahul",          "https://players.cricketstudio.ai/players/lokesh-rahul"),
    ("Heinrich Klaasen",      "https://players.cricketstudio.ai/players/heinrich-klaasen"),
    ("Sanju Samson",          "https://players.cricketstudio.ai/players/sanju-samson"),
    # Short names — unambiguous in IPL context
    ("Suryavanshi",  "https://players.cricketstudio.ai/players/vaibhav-suryavanshi"),
    ("Bumrah",       "https://players.cricketstudio.ai/players/jasprit-bumrah"),
    ("Rabada",       "https://players.cricketstudio.ai/players/kagiso-rabada"),
    ("Narine",       "https://players.cricketstudio.ai/players/sunil-narine"),
    ("Chahal",       "https://players.cricketstudio.ai/players/yuzvendra-chahal"),
    ("Kohli",        "https://players.cricketstudio.ai/players/virat-kohli"),
    ("Dhoni",        "https://players.cricketstudio.ai/players/mahendra-singh-dhoni"),
    ("Gayle",        "https://players.cricketstudio.ai/players/ch-gayle"),
    ("Gill",         "https://players.cricketstudio.ai/players/shubman-gill"),
    ("Rohit",        "https://players.cricketstudio.ai/players/rohit-sharma"),
    ("SKY",          "https://players.cricketstudio.ai/players/suryakumar-yadav"),
]

LEADERBOARD_LINKS = [
    ("Orange Cap", "https://players.cricketstudio.ai/leagues/ipl/leaderboards/orange-cap"),
    ("Purple Cap", "https://players.cricketstudio.ai/leagues/ipl/leaderboards/purple-cap"),
]

ALL_LINKS = PLAYER_LINKS + LEADERBOARD_LINKS


def split_frontmatter(text: str):
    """Return (frontmatter_block, body). frontmatter_block includes both --- delimiters."""
    if not text.startswith("---"):
        return "", text
    end = text.find("\n---", 3)
    if end == -1:
        return "", text
    split_at = end + 4  # past the closing ---
    if split_at < len(text) and text[split_at] == "\n":
        split_at += 1
    return text[:split_at], text[split_at:]


def protect_regions(body: str):
    """
    Replace code blocks and existing [text](url) links with placeholders so we
    don't accidentally rewrite inside them. Returns (protected_body, restore_map).
    """
    placeholders = {}
    counter = [0]

    def placeholder(match_text: str) -> str:
        key = f"\x00PLACEHOLDER{counter[0]}\x00"
        counter[0] += 1
        placeholders[key] = match_text
        return key

    # Fenced code blocks ```...```
    protected = re.sub(r"```[\s\S]*?```", lambda m: placeholder(m.group(0)), body)
    # Inline code `...`
    protected = re.sub(r"`[^`]+`", lambda m: placeholder(m.group(0)), protected)
    # Existing markdown links [text](url) — protect the entire link
    protected = re.sub(r"\[[^\]]+\]\([^)]+\)", lambda m: placeholder(m.group(0)), protected)

    return protected, placeholders


def restore_regions(text: str, placeholders: dict) -> str:
    for key, val in placeholders.items():
        text = text.replace(key, val)
    return text


def is_heading(line: str) -> bool:
    return line.startswith("#")


def add_links_to_body(body: str) -> tuple[str, int]:
    """
    Add links to body text. Returns (new_body, count_of_changes).
    Links each name only once per file (first occurrence only).
    Skips headings.
    """
    protected, placeholders = protect_regions(body)
    lines = protected.split("\n")
    linked: set[str] = set()
    changes = 0

    for i, line in enumerate(lines):
        if is_heading(line.lstrip()):
            continue  # skip headings

        for name, url in ALL_LINKS:
            if name in linked:
                continue  # already linked this name in this file

            # Match the name as a word (not mid-word), case-sensitive
            pattern = r"(?<!\[)(?<!\w)" + re.escape(name) + r"(?!\w)(?!\])"
            if re.search(pattern, line):
                replacement = f"[{name}]({url})"
                new_line = re.sub(pattern, replacement, line, count=1)
                if new_line != line:
                    lines[i] = new_line
                    linked.add(name)
                    changes += 1
                    break  # one replacement per line per pass; re-scan on next name

    new_body = "\n".join(lines)
    return restore_regions(new_body, placeholders), changes


def process_file(path: pathlib.Path, dry_run: bool = False) -> int:
    text = path.read_text(encoding="utf-8")
    fm, body = split_frontmatter(text)
    if not body.strip():
        return 0

    new_body, changes = add_links_to_body(body)
    if changes == 0:
        return 0

    if not dry_run:
        path.write_text(fm + new_body, encoding="utf-8")
    return changes


def main():
    dry_run = "--dry-run" in sys.argv
    target_dirs = [OKF_DIR / "stories", OKF_DIR / "dossier"]
    total_files = 0
    total_changes = 0

    for d in target_dirs:
        for path in sorted(d.glob("*.md")):
            if path.stem == "index":
                continue
            changes = process_file(path, dry_run=dry_run)
            if changes > 0:
                total_files += 1
                total_changes += changes
                prefix = "[DRY RUN] " if dry_run else "linked: "
                print(f"  {prefix}{path.relative_to(OKF_DIR)} (+{changes} links)")

    mode = "dry run" if dry_run else "done"
    print(f"\n{mode.upper()}. {total_files} file(s) updated, {total_changes} link(s) added.")


if __name__ == "__main__":
    main()
