"""
fix_okf_aliases.py — bulk-add missing Google OKF alias fields.

For every OKF markdown file:
  - If `canonical_page` exists and `resource` is absent → add resource: <canonical_page value>
  - If `last_verified` exists and `timestamp` is absent → add timestamp: <last_verified value>

Inserts the alias immediately after the source field, preserving all other content.
Idempotent: re-running on already-fixed files makes no changes.
"""

import pathlib
import re
import sys

OKF_DIR = pathlib.Path(__file__).parent.parent / "okf"

# Patterns to detect existing fields
RE_CANONICAL = re.compile(r"^canonical_page:\s*(.+)$", re.MULTILINE)
RE_RESOURCE   = re.compile(r"^resource:\s*", re.MULTILINE)
RE_LAST_VER  = re.compile(r"^last_verified:\s*(.+)$", re.MULTILINE)
RE_TIMESTAMP = re.compile(r"^timestamp:\s*", re.MULTILINE)


def fix_file(path: pathlib.Path) -> bool:
    text = path.read_text(encoding="utf-8")

    # Only operate inside the YAML frontmatter (between the first two ---)
    fm_match = re.match(r"^---\n(.*?\n)---\n", text, re.DOTALL)
    if not fm_match:
        return False

    fm = fm_match.group(1)
    changed = False

    # --- resource alias ---
    cp = RE_CANONICAL.search(fm)
    if cp and not RE_RESOURCE.search(fm):
        cp_val = cp.group(1).strip()
        # Insert `resource: <value>` on the line immediately after `canonical_page:`
        fm = fm.replace(
            cp.group(0),
            f"{cp.group(0)}\nresource: {cp_val}",
            1,
        )
        changed = True

    # --- timestamp alias ---
    lv = RE_LAST_VER.search(fm)
    if lv and not RE_TIMESTAMP.search(fm):
        lv_val = lv.group(1).strip()
        fm = fm.replace(
            lv.group(0),
            f"{lv.group(0)}\ntimestamp: {lv_val}",
            1,
        )
        changed = True

    if changed:
        new_text = f"---\n{fm}---\n" + text[fm_match.end():]
        path.write_text(new_text, encoding="utf-8")

    return changed


def main():
    files = sorted(OKF_DIR.rglob("*.md"))
    fixed = 0
    for p in files:
        if fix_file(p):
            fixed += 1
            print(f"  fixed: {p.relative_to(OKF_DIR.parent)}")
    print(f"\nDone. {fixed}/{len(files)} file(s) updated.")


if __name__ == "__main__":
    main()
