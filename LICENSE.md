# License

CricketStudio OKF contains two kinds of material with different licenses. Read
[`DATA_LICENSE_BOUNDARIES.md`](DATA_LICENSE_BOUNDARIES.md) before redistributing anything.

## 1. Documentation, metric definitions, methodology, and curated prose

Licensed under **Creative Commons Attribution 4.0 International (CC-BY-4.0)**.

You may share and adapt this material for any purpose, including commercially, provided
you give appropriate credit to CricketStudio, link to the license, and indicate if
changes were made.

Full text: https://creativecommons.org/licenses/by/4.0/

## 2. Cricket data and derived claims

Cricket facts embedded in concept files are **not** uniformly CC-BY-4.0. Each file
declares a `source_boundary` in its frontmatter:

- **`public_open_data`** — derived from [Cricsheet](https://cricsheet.org) (IPL historical
  and MLC), licensed **CC BY 3.0**. Attribution required; see [`ATTRIBUTION.md`](ATTRIBUTION.md).
- **`derived_claims_only`** — IPL 2026 claims derived from data CricketStudio licenses
  from Sportmonks. The **derived claims** may be reused under CC-BY-4.0; the **raw feed**
  is proprietary and is never included in this bundle.
- **`proprietary_source_not_redistributed`** — references only; no raw data published.
- **`manual_curated_knowledge` / `methodology_only`** — CricketStudio-authored, CC-BY-4.0.

## 3. Code

Scripts under `scripts/` and the schema under `schema/` are licensed under the **MIT
License**.

```
MIT License

Copyright (c) 2026 CricketStudio.ai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
