#!/usr/bin/env python3
"""
pre_ship.py — mandatory gate before every OKF commit.

Runs:
  1. Vendor-name leak scan (Sportmonks must not appear in any committed .md file)
  2. update_counts.py  → syncs manifest.yaml + llms.txt (both) + README + page.tsx JSON-LD
  3. sync_meta.py      → syncs level/profile-version/count to all consumer files
  4. Spec-file count sync  → okf/spec/index.md + okf/spec/conformance.md (legacy guard)
  5. build_llms_full.py   → regenerates viewer/public/llms-full.txt from all OKF files
  6. validate_okf.py  → 0 errors required

Exit 0 = ship. Exit 1 = block.

Usage:
  python scripts/pre_ship.py           # Full gate
  python scripts/pre_ship.py --check   # Check only, no writes, exit 1 if stale
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OKF_DIR = ROOT / "okf"
SPEC_INDEX = ROOT / "okf" / "spec" / "index.md"
SPEC_CONFORMANCE = ROOT / "okf" / "spec" / "conformance.md"
MANIFEST = ROOT / "manifest.yaml"

# Vendor names that must never appear in committed .md files
BANNED_VENDOR_PATTERNS = [
    r"\bSportmonks\b",
    r"\bsportmonks\b",
]

TOTAL_FILE_THRESHOLD = 1000  # If total < this something is wrong


def _count_okf_files():
    return sum(1 for _ in OKF_DIR.rglob("*.md"))


def _read_manifest_total():
    """Sum all counts: values in the manifest.yaml counts block."""
    try:
        import yaml
        data = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
        return sum(data.get("counts", {}).values())
    except Exception:
        return None


def step_vendor_scan(check_only: bool) -> bool:
    """Scan all committed .md files for banned vendor names."""
    print("\n[1/4] Vendor-name leak scan...")
    violations = []
    for md in sorted(OKF_DIR.rglob("*.md")):
        try:
            text = md.read_text(encoding="utf-8")
        except OSError:
            continue
        for pat in BANNED_VENDOR_PATTERNS:
            if re.search(pat, text):
                rel = md.relative_to(ROOT)
                violations.append(str(rel))
                break

    if violations:
        print(f"  FAIL — {len(violations)} file(s) contain banned vendor names:")
        for v in violations:
            print(f"    {v}")
        return False

    print(f"  PASS — no vendor name leaks in {sum(1 for _ in OKF_DIR.rglob('*.md'))} files")
    return True


def step_update_counts(check_only: bool) -> bool:
    """Run update_counts.py to sync manifest + llms.txt."""
    print("\n[3/6] Syncing counts (manifest + llms.txt + root llms.txt + README + page.tsx)...")
    flag = ["--check"] if check_only else []
    result = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "update_counts.py")] + flag,
        capture_output=True,
        text=True,
    )
    output = result.stdout + result.stderr
    for line in output.strip().splitlines():
        print(f"  {line}")
    if result.returncode != 0:
        print("  FAIL — counts are stale")
        return False
    print("  PASS")
    return True


def step_sync_meta(check_only: bool) -> bool:
    """Run sync_meta.py to propagate level/version/count to all consumer files."""
    print("\n[4/6] Syncing metadata (level, profile version, file count)...")
    flag = ["--check"] if check_only else []
    result = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "sync_meta.py")] + flag,
        capture_output=True,
        text=True,
    )
    output = (result.stdout + result.stderr).strip()
    for line in output.splitlines():
        print(f"  {line}")
    if result.returncode != 0:
        print("  FAIL — consumer files are stale; run `python scripts/sync_meta.py`")
        return False
    print("  PASS")
    return True


def step_sync_spec_files(check_only: bool) -> bool:
    """Legacy guard: verify spec/index.md and spec/conformance.md have the current file count.
    sync_meta.py (step 4) already handles this — this step catches any pattern mismatches."""
    print("\n[5/6] Verifying spec file counts...")
    total = _count_okf_files()
    if total < TOTAL_FILE_THRESHOLD:
        print(f"  WARN — only {total} files; expected >{TOTAL_FILE_THRESHOLD}. Skipping spec sync.")
        return True

    # Round down to nearest 100 for the "N,000+" label
    rounded = (total // 100) * 100
    label = f"{rounded:,}+"

    changed = []

    # spec/index.md: "reference implementation (N+ files, CI-validated)"
    idx_text = SPEC_INDEX.read_text(encoding="utf-8")
    new_idx = re.sub(
        r"(reference implementation \()[\d,+]+( files, CI-validated\))",
        rf"\g<1>{label}\2",
        idx_text,
    )
    if new_idx != idx_text:
        if check_only:
            print(f"  [STALE] spec/index.md: file count needs update → {label}")
            changed.append("spec/index.md")
        else:
            SPEC_INDEX.write_text(new_idx, encoding="utf-8")
            print(f"  spec/index.md: updated to {label}")
            changed.append("spec/index.md")

    # spec/conformance.md: "CI-validated; N+ files; ..."
    conf_text = SPEC_CONFORMANCE.read_text(encoding="utf-8")
    new_conf = re.sub(
        r"(CI-validated; )[\d,+]+( files;)",
        rf"\g<1>{label}\2",
        conf_text,
    )
    if new_conf != conf_text:
        if check_only:
            print(f"  [STALE] spec/conformance.md: file count needs update → {label}")
            changed.append("spec/conformance.md")
        else:
            SPEC_CONFORMANCE.write_text(new_conf, encoding="utf-8")
            print(f"  spec/conformance.md: updated to {label}")
            changed.append("spec/conformance.md")

    if check_only and changed:
        return False

    if not changed:
        print(f"  PASS — spec files already show {label} (actual: {total})")
    else:
        print(f"  PASS — updated {len(changed)} spec file(s) to {label}")
    return True


def step_rebuild_llms_full(check_only: bool) -> bool:
    """Rebuild viewer/public/llms-full.txt from all OKF files."""
    llms_full = ROOT / "viewer" / "public" / "llms-full.txt"
    print("\n[2/6] Rebuilding llms-full.txt + llms.txt template (count sync runs after)...")
    if check_only:
        # In check-only mode, verify the header count matches actual file count
        if llms_full.exists():
            import re as _re
            header = llms_full.read_text(encoding="utf-8", errors="replace")[:200]
            m = _re.search(r"Generated from ([\d,]+) OKF", header)
            if m:
                recorded = int(m.group(1).replace(",", ""))
                actual = sum(1 for _ in (ROOT / "okf").rglob("*.md"))
                if recorded != actual:
                    print(f"  [STALE] llms-full.txt header says {recorded:,} files; actual {actual:,}")
                    return False
        print("  PASS (check-only — skipping rebuild)")
        return True
    result = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "build_llms_full.py")],
        capture_output=True,
        text=True,
        cwd=str(ROOT),
    )
    output = (result.stdout + result.stderr).strip()
    for line in output.splitlines():
        print(f"  {line}")
    if result.returncode != 0:
        print("  FAIL — build_llms_full.py exited with error")
        return False
    print("  PASS")
    return True


def step_validate(check_only: bool) -> bool:
    """Run validate_okf.py and require 0 errors."""
    print("\n[6/6] Running OKF validator (0 errors required)...")
    result = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "validate_okf.py")],
        capture_output=True,
        text=True,
    )
    output = (result.stdout + result.stderr).strip()
    last_line = output.splitlines()[-1] if output else "(no output)"
    print(f"  {last_line}")

    if "0 error(s)" in last_line:
        print("  PASS")
        return True

    print("  FAIL — validator reported errors; do not ship")
    return False


def main():
    parser = argparse.ArgumentParser(description="Pre-ship gate for CricketStudio OKF commits.")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check only — report issues without writing; exit 1 if anything is stale/broken.",
    )
    args = parser.parse_args()

    print("=" * 60)
    print("CricketStudio OKF pre-ship gate")
    print("=" * 60)

    results = [
        step_vendor_scan(args.check),
        step_rebuild_llms_full(args.check),   # must run BEFORE update_counts (it overwrites llms.txt)
        step_update_counts(args.check),
        step_sync_meta(args.check),
        step_sync_spec_files(args.check),
        step_validate(args.check),
    ]

    print("\n" + "=" * 60)
    if all(results):
        print("GATE PASSED — safe to commit and push.")
        sys.exit(0)
    else:
        failed = sum(1 for r in results if not r)
        print(f"GATE FAILED — {failed} step(s) did not pass. Do not ship until resolved.")
        sys.exit(1)


if __name__ == "__main__":
    main()
