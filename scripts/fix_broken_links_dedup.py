#!/usr/bin/env python3
"""
Fix broken internal links caused by the dedup deletion.
Rewrites each deleted slug to its kept replacement across all OKF files.
"""
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OKF_ROOT = REPO_ROOT / "okf"

# deleted -> replacement mapping
REPLACEMENTS = {
    "ipl-2026-orange-cap-winner": "ipl-2026-orange-cap",
    "ipl-2026-suryavanshi-orange-cap": "ipl-2026-orange-cap",
    "ipl-2026-suryavanshi-fastest-century": "ipl-2026-fastest-century",
    "ipl-2026-urvil-patel-fastest-fifty": "ipl-2026-fastest-fifty",
    "ipl-2026-purple-cap": "ipl-2026-purple-cap-winner",
    "what-is-middle-overs-cricket": "what-is-ipl-t20-middle-overs",
    "what-is-a-batting-collapse": "what-is-a-batting-collapse-cricket",
    "what-is-a-bouncer": "what-is-a-bouncer-cricket",
    "what-is-a-caught-dismissal": "what-is-a-caught-dismissal-cricket",
    "what-is-a-chinaman-bowler": "what-is-a-chinaman-bowler-cricket",
    "what-is-ipl-concussion-substitute": "what-is-a-concussion-substitute-cricket",
    "what-is-a-dot-ball": "what-is-a-dot-ball-cricket",
    "what-is-dot-ball-cricket": "what-is-a-dot-ball-cricket",
    "what-is-a-free-hit": "what-is-a-free-hit-cricket",
    "what-is-a-googly": "what-is-a-googly-cricket",
    "what-is-a-hat-trick": "what-is-a-hat-trick-cricket",
    "what-is-a-maiden-over": "what-is-a-maiden-over-cricket",
    "what-is-a-mystery-spinner": "what-is-a-mystery-spinner-cricket",
    "what-is-a-no-ball": "what-is-a-no-ball-cricket",
    "what-is-a-pull-shot": "what-is-a-pull-shot-cricket",
    "what-is-a-slower-ball": "what-is-a-slower-ball-cricket",
    "what-is-a-stumping": "what-is-a-stumping-cricket",
    "what-is-a-super-over": "what-is-a-super-over-cricket",
    "what-is-a-sweep-shot-cricket": "what-is-a-sweep-shot",
    "what-is-a-wicket-maiden-cricket": "what-is-a-maiden-wicket-cricket",
    "what-is-a-wicket-keeper": "what-is-a-wicket-keeper-cricket",
    "what-is-a-wide": "what-is-a-wide-cricket",
    "what-is-a-yorker-cricket": "what-is-a-yorker",
    "what-is-an-all-rounder-cricket": "what-is-an-all-rounder",
    "what-is-an-ipl-franchise-cricket": "what-is-an-ipl-franchise",
    "what-is-batting-average": "what-is-batting-average-cricket",
    "what-is-a-leg-before-wicket-cricket": "what-is-an-lbw",
    "what-is-lbw": "what-is-an-lbw",
    "what-is-run-rate-cricket": "what-is-a-run-rate-cricket",
    "what-is-impact-player-rule": "what-is-impact-player-rule-ipl",
    "what-is-ipl-impact-player-rule": "what-is-impact-player-rule-ipl",
}


def fix_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in REPLACEMENTS.items():
        # Match .md references in both relative (../dossier/slug.md) and bare (slug.md) forms
        text = text.replace(f"../{path.parent.parent.name}/dossier/{old}.md", f"../dossier/{new}.md")
        text = text.replace(f"../dossier/{old}.md", f"../dossier/{new}.md")
        text = text.replace(f"{old}.md", f"{new}.md")
        # Also fix bare slug references in URLs
        text = text.replace(f"/dossier/{old}/", f"/dossier/{new}/")
        text = text.replace(f"/dossier/{old})", f"/dossier/{new})")
    if text != original:
        path.write_text(text, encoding="utf-8")
        return 1
    return 0


def main():
    changed = 0
    for f in sorted(OKF_ROOT.rglob("*.md")):
        if fix_file(f):
            print(f"  fixed  {f.relative_to(REPO_ROOT)}")
            changed += 1
    print(f"\nDone — {changed} files updated")


if __name__ == "__main__":
    main()
