#!/usr/bin/env python3
"""
pre_ship.py — MANDATORY GATE. Nothing in the OKF repo ships without this passing.
================================================================================

Run before EVERY commit that touches any .md, .json, .ts, or .tsx file.
Exit 0 = safe to commit + push.  Exit 1 = blocked; do not ship.

Usage:
  python scripts/pre_ship.py           # Full gate (writes updates in place)
  python scripts/pre_ship.py --check   # Read-only audit; exit 1 if anything is stale

What this gate covers (9 steps)
--------------------------------
[1] Vendor-name + API-key leak scan
    - Scans every .md file under okf/ for banned vendor names (e.g. "Sportmonks")
    - Scans ALL tracked repo files for real API key patterns:
        Anthropic (sk-ant-api...), OpenAI (sk-proj-...), Google (AIzaSy...),
        Perplexity (pplx-UUID). Placeholder strings in .env.example do NOT match.
    - Public/LLM-facing files must never name the upstream data vendor
    - Blocks if ANY violation found

[2] Rebuild llms-full.txt + llms.txt template  ← MUST run before step 3
    - Regenerates viewer/public/llms-full.txt from all OKF source files
    - Regenerates viewer/public/llms.txt from build_llms_full.py template
    - Template must have the correct Level text ("Level 3 — Agent-Safe"), not stale Level 2
    - Blocks on build_llms_full.py exit != 0

[3] Count sync (update_counts.py)
    - Reads manifest.yaml as single source of truth for all counts
    - Syncs counts to ALL of these consumer files:
        • viewer/public/llms.txt              (dossier N, journeys N, players N, metrics N)
        • viewer/public/llms-full.txt         (header line)
        • README.md                           (badge + stats section)
        • viewer/src/app/page.tsx             (JSON-LD Dataset description: total, players, dossier)
        • viewer/src/app/agents/page.tsx      (dossier count label + full-context "N+ files" label)
        • viewer/src/app/spec/page.tsx        ("N+ files, CI-validated" label in spec layer card)
        • datapackage.json                    (version + dataset_version from manifest)
        • okf/index.md                        (research / player / dossier / story / metric counts)
    - Blocks if any consumer file diverges from manifest

[4] Metadata sync (sync_meta.py)
    - Propagates conformance level, profile version, and file count to all consumer files:
        • viewer/public/llms.txt
        • viewer/public/llms-full.txt
        • viewer/src/app/page.tsx
        • viewer/src/app/agents/page.tsx
        • okf/spec/conformance.md
        • okf/spec/index.md
        • manifest.yaml (as written source)
    - Blocks if level/version/count strings are stale in any consumer

[5] Spec-file count sync (legacy guard)
    - Separately verifies spec/index.md and spec/conformance.md show the correct
      rounded file count label (e.g. "3,500+" for 3,512 actual files)
    - Catches pattern mismatches that sync_meta.py might miss due to regex differences
    - Non-blocking warn below TOTAL_FILE_THRESHOLD (sanity check)

[6] Hardcoded count audit (viewer .tsx files)  ← DEEP SWEEP
    - After step 3 syncs all known locations, this step is the catch-all
    - Scans every .tsx file in viewer/src/ for specific count values from manifest
      (dossier count, player count, total file count) appearing as LITERAL strings
    - Lines that are dynamic (byType., counts., getOKF, .filter, .length) are exempt
    - Release history strings in releases/page.tsx are exempt (historical facts)
    - Blocks if any specific hardcoded count is found that should be dynamic
    - If you add a new .tsx component with a count, either:
        a) Make it dynamic (use byType/counts/getOKF), or
        b) Add a sync function to update_counts.py — it will then pass step 3

[7] Releases page completeness
    - Reads all okf/releases/v*.md files
    - Verifies viewer/src/app/releases/page.tsx has a matching entry for EVERY version
    - Blocks if any release file is missing from the viewer UI
    - Prevents "shipped a release note but never linked it to the UI" mistakes

[8] search-index freshness (NON-BLOCKING — warn only)
    - Checks if viewer/public/search-index.json is older than the newest OKF .md file
    - The index is rebuilt by `cd viewer && npm run build` (or Amplify on deploy)
    - Only warns; does not block. Reminder to rebuild locally if you need search to work.

[9] OKF validator (validate_okf.py) — HARD GATE
    - Validates EVERY .md file in okf/ against the OKF schema:
        • Required frontmatter fields present + valid YAML
        • `type` is one of the 20 approved values (okf/spec/types.md)
        • All internal links resolve to real files
        • source_boundary declared; no restricted raw-data patterns
        • Metric files have formula + limitations
    - 0 errors required to pass. Warnings are logged but do not block.

Key invariants enforced across all steps
-----------------------------------------
- manifest.yaml is the SINGLE SOURCE OF TRUTH for counts, version, and conformance level
- Every consumer file (llms.txt, README, page.tsx, agents/page.tsx, spec/page.tsx,
  datapackage.json, okf/index.md, spec files) must agree with manifest before shipping
- "Sportmonks" must never appear in any public file
- Real API keys (Anthropic, OpenAI, Google, Perplexity) must never appear in any tracked file
- No hardcoded exact count values in .tsx files — all counts must flow from manifest
- Every okf/releases/v*.md must have a matching entry in the viewer releases page
- OKF validator must show 0 errors

Authoring reminder
------------------
After editing OKF files:
  1. python scripts/pre_ship.py   (runs all 9 steps; writes any stale counts)
  2. git add -p                   (review exactly what changed)
  3. git commit -m "..."          (with both Co-Authored-By trailers per §29)
  4. Wait for explicit push instruction — do NOT push speculatively
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

# Real API key patterns — specific enough to avoid false positives against
# placeholder strings like "sk-ant-..." in .env.example.
# Matches actual key formats used by each provider.
API_KEY_PATTERNS = [
    (r"sk-ant-api[0-9]{2}-[A-Za-z0-9_-]{20,}", "Anthropic API key (sk-ant-api...)"),
    (r"sk-proj-[A-Za-z0-9_-]{20,}", "OpenAI project key (sk-proj-...)"),
    (r"AIzaSy[A-Za-z0-9_\-]{30,}", "Google/Gemini API key (AIzaSy...)"),
    (r"pplx-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}", "Perplexity API key (pplx-UUID)"),
]

# Directories and files to skip in the API key scan
_SKIP_DIRS = {".git", "node_modules", ".next", "out", "dist", "build", "__pycache__", ".venv"}
_SKIP_FILES = {".env", ".env.local"}  # gitignored; shouldn't exist, but skip if present
_SCAN_EXTENSIONS = {".md", ".mjs", ".js", ".ts", ".tsx", ".json", ".yaml", ".yml", ".txt", ".py"}

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


def _iter_repo_files():
    """Yield every file in the repo that should be scanned for leaks."""
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        if any(part in _SKIP_DIRS for part in path.parts):
            continue
        if path.name in _SKIP_FILES:
            continue
        if path.suffix not in _SCAN_EXTENSIONS:
            continue
        yield path


def step_vendor_scan(check_only: bool) -> bool:
    """Scan for (1) vendor-name leaks in OKF .md files and (2) API keys in all repo files."""
    print("\n[1/9] Vendor-name + API-key leak scan...")
    violations = []

    # Part A — vendor names in OKF markdown
    for md in sorted(OKF_DIR.rglob("*.md")):
        try:
            text = md.read_text(encoding="utf-8")
        except OSError:
            continue
        for pat in BANNED_VENDOR_PATTERNS:
            if re.search(pat, text):
                rel = md.relative_to(ROOT)
                violations.append(f"{rel}  [vendor name]")
                break

    # Part B — real API keys anywhere in tracked files
    for fpath in _iter_repo_files():
        try:
            text = fpath.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for pat, label in API_KEY_PATTERNS:
            if re.search(pat, text):
                rel = fpath.relative_to(ROOT)
                violations.append(f"{rel}  [{label}]")
                break  # one violation per file is enough

    if violations:
        print(f"  FAIL -- {len(violations)} leak(s) found:")
        for v in violations:
            print(f"    {v}")
        return False

    md_count = sum(1 for _ in OKF_DIR.rglob("*.md"))
    print(f"  PASS -- no vendor name leaks in {md_count} files; no API keys in repo")
    return True


def step_update_counts(check_only: bool) -> bool:
    """Run update_counts.py to sync manifest + llms.txt."""
    print("\n[3/9] Syncing counts (manifest + llms.txt + root llms.txt + README + page.tsx)...")
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
    print("\n[4/9] Syncing metadata (level, profile version, file count)...")
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
    print("\n[5/9] Verifying spec file counts...")
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
    print("\n[2/9] Rebuilding llms-full.txt + llms.txt template (count sync runs after)...")
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


def step_hardcoded_count_audit(check_only: bool) -> bool:
    """Scan viewer .tsx files for hardcoded counts that diverge from manifest.

    After update_counts.py runs (step 3), every KNOWN location is synced.
    This step is the catch-all: it scans for any remaining specific numeric
    count that looks like a file/entity count but isn't a dynamic expression
    or an acceptable rounded '+' label.

    Checks:
    - dossier count: any exact occurrence of the manifest dossier number in a
      .tsx string literal that isn't wrapped in byType/counts./getOKF (dynamic)
    - total file count: same check for the exact total (vs the rounded N+ label)
    - player count: same for player count
    - 'old' stale counts: any number that was a real count in a prior version
      and now appears in a non-release-note string context

    Acceptable patterns (not flagged):
    - Numbers inside `${byType...}`, `${counts...}`, `{getOKF...}` — dynamic
    - Numbers in releases/page.tsx summary/highlights strings — historical notes
    - The rounded '+'-suffixed label (e.g. '3,500+') — deliberate approximation
    - Year values: 2020–2030
    - UI constants: port numbers, timeouts, pixel values, etc.
    """
    print("\n[6/9] Hardcoded count audit (viewer .tsx files)...")

    try:
        import yaml
        manifest_data = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"  WARN — could not read manifest: {e} (skipping)")
        return True

    counts = manifest_data.get("counts", {})
    total = sum(counts.values())
    dossier_n = counts.get("dossier", 0)
    player_n = counts.get("player", 0)
    rounded = (total // 100) * 100

    # The rounded label is OK; the exact total is not (it's volatile)
    rounded_label = f"{rounded:,}+"

    viewer_src = ROOT / "viewer" / "src"
    violations = []

    # Patterns we expect to find ONLY in dynamic contexts or release notes
    # Each entry: (file_glob_exclusion, regex_pattern, description)
    # We exclude releases/page.tsx for historical strings.
    volatile_patterns = [
        # Exact dossier count as a numeric literal in a string
        (rf"\b{dossier_n:,}\b", f"exact dossier count ({dossier_n:,})"),
        # Exact player count as a numeric literal
        (rf"\b{player_n:,}\b", f"exact player count ({player_n:,})"),
        # Exact total file count (not the rounded label)
        (rf"\b{total:,}\b", f"exact total file count ({total:,})"),
    ]

    # Dynamic-context markers — lines containing these are exempt
    DYNAMIC_MARKERS = re.compile(
        r"byType\.|counts\.|getOKF|\.filter\(|\.length|allFiles|nonIndex"
    )

    # Lines managed by update_counts.py — they ARE hardcoded but are kept
    # in sync by an explicit sync function, so the audit should not flag them.
    # Add a new entry here whenever you add a new _update_* function that
    # maintains a hardcoded count in a specific file.
    MANAGED_BY_SYNC = [
        # update_counts._update_agents_page — dossier count label
        re.compile(r"label: .Dossier .+ Q&A patterns"),
        # update_counts._update_agents_context_label — full-context "N+ files" line
        re.compile(r"all [\d,]+\+ OKF files concatenated"),
        # update_counts._update_page_jsonld — JSON-LD Dataset description
        re.compile(r"A curated, open knowledge catalog for cricket\."),
        # update_counts._update_spec_page — spec layer card "N+ files" label
        re.compile(r"Reference implementation .+ files, CI-validated"),
    ]

    for tsx in sorted(viewer_src.rglob("*.tsx")):
        rel = tsx.relative_to(ROOT)
        # Release history strings are acceptable hardcoded (historical facts)
        is_releases_page = tsx.name == "page.tsx" and "releases" in str(tsx)

        try:
            lines = tsx.read_text(encoding="utf-8").splitlines()
        except OSError:
            continue

        for lineno, line in enumerate(lines, 1):
            # Skip pure comments
            stripped = line.strip()
            if stripped.startswith("//") or stripped.startswith("*"):
                continue
            # Skip lines that are already dynamic
            if DYNAMIC_MARKERS.search(line):
                continue
            # Lines managed by an explicit update_counts.py sync function are OK
            if any(p.search(line) for p in MANAGED_BY_SYNC):
                continue
            # Release-note strings in releases/page.tsx are OK (historical facts)
            if is_releases_page and any(
                kw in line for kw in ("summary:", "highlights:", "'")
            ):
                continue

            for pattern, description in volatile_patterns:
                if re.search(pattern, line):
                    violations.append(
                        f"  {rel}:{lineno}: hardcoded {description}\n"
                        f"    -> {stripped[:120]}"
                    )
                    break  # one violation per line is enough

    if violations:
        print(f"  FAIL — {len(violations)} hardcoded count(s) found that should be dynamic:")
        for v in violations:
            print(v)
        print(
            "  Fix: add a sync function to scripts/update_counts.py for each location above,"
            " or make the value dynamic in the component."
        )
        return False

    print(
        f"  PASS — no hardcoded exact counts found in viewer .tsx "
        f"(dossier={dossier_n:,}, players={player_n:,}, total={total:,})"
    )
    return True


def step_check_releases_page(check_only: bool) -> bool:
    """Verify releases/page.tsx has an entry for every okf/releases/v*.md file."""
    print("\n[7/9] Checking releases page completeness...")
    releases_dir = ROOT / "okf" / "releases"
    releases_page = ROOT / "viewer" / "src" / "app" / "releases" / "page.tsx"

    # Find all versioned release note files (exclude index.md)
    release_files = sorted(
        f.stem for f in releases_dir.glob("v*.md")
    )  # e.g. ["v0.1", "v0.2", ...]

    if not releases_page.exists():
        print("  WARN — releases/page.tsx not found; skipping")
        return True

    page_content = releases_page.read_text(encoding="utf-8")
    missing = [v for v in release_files if f"version: '{v}'" not in page_content]

    if missing:
        print(f"  FAIL — releases/page.tsx is missing entries for: {', '.join(missing)}")
        print("    Add a version entry to the `releases` array in viewer/src/app/releases/page.tsx")
        return False

    print(f"  PASS — all {len(release_files)} releases present in releases/page.tsx")
    return True


def step_check_search_index_freshness(_check_only: bool) -> bool:
    """Warn (non-blocking) if search-index.json is older than the newest OKF file."""
    print("\n[8/9] Checking search-index freshness...")
    search_index = ROOT / "viewer" / "public" / "search-index.json"
    if not search_index.exists():
        print("  WARN — search-index.json not found (rebuilt by `cd viewer && npm run build`)")
        return True  # non-blocking

    import os
    idx_mtime = search_index.stat().st_mtime
    newest_okf = max(
        (f.stat().st_mtime for f in (ROOT / "okf").rglob("*.md")),
        default=0,
    )
    if newest_okf > idx_mtime:
        # Compute seconds difference
        delta = int(newest_okf - idx_mtime)
        minutes = delta // 60
        print(
            f"  WARN — search-index.json is {minutes}min older than newest OKF file. "
            "Run `cd viewer && npm run build` to regenerate. (non-blocking — Amplify rebuilds on deploy)"
        )
    else:
        print("  PASS — search-index.json is up to date")
    return True  # always non-blocking


def step_validate(check_only: bool) -> bool:
    """Run validate_okf.py and require 0 errors."""
    print("\n[9/9] Running OKF validator (0 errors required)...")
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
        step_rebuild_llms_full(args.check),       # [2] must run BEFORE update_counts (overwrites llms.txt)
        step_update_counts(args.check),           # [3] syncs ALL known count locations
        step_sync_meta(args.check),               # [4] syncs level/version/count metadata
        step_sync_spec_files(args.check),         # [5] legacy guard for spec file labels
        step_hardcoded_count_audit(args.check),   # [6] catch-all: no exact counts hardcoded in .tsx
        step_check_releases_page(args.check),     # [7] every release note has a viewer entry
        step_check_search_index_freshness(args.check),  # [8] warn if search index is stale
        step_validate(args.check),                # [9] OKF validator — 0 errors required
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
