#!/usr/bin/env python3
"""Fix bare numeric tags (e.g., - 2026) to quoted strings (- "2026") in dossier YAML."""
import re
from pathlib import Path

dossier = Path(__file__).resolve().parent.parent / "okf" / "dossier"
fixed = 0
for f in sorted(dossier.glob("*.md")):
    txt = f.read_text(encoding="utf-8")
    new = re.sub(r"^(\s+- )(\d{4})$", r'\1"\2"', txt, flags=re.MULTILINE)
    if new != txt:
        f.write_text(new, encoding="utf-8", newline="\n")
        fixed += 1
        print(f"  fixed: {f.name}")
print(f"\nDone — {fixed} file(s) patched.")
