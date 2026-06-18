# CricketStudio OKF Viewer

Next.js 14 static site that serves `okf.cricketstudio.ai`.

## Quick start

```bash
npm install
npm run build    # prebuild generates search-index.json, then next build exports to out/
```

## Dev server

```bash
npm run dev      # runs prebuild + next dev at http://localhost:3000
```

## Deploy (S3 + CloudFront)

```bash
npm run build
aws s3 sync out/ s3://okf.cricketstudio.ai --delete
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

## Deploy (AWS Amplify)

- Build command: `cd viewer && npm install && npm run build`
- Output directory: `viewer/out`
- The repo root is `cricketstudio-okf/`

## Architecture

- **Data layer**: `src/lib/okf.ts` reads `../okf/**/*.md` at build time via `fs`
- **Routing**: `[...slug]/page.tsx` catch-all renders every OKF file; category pages for `/concepts`, `/metrics`, etc.
- **Search**: `scripts/prebuild.mjs` generates `public/search-index.json`; `src/app/search/page.tsx` runs Fuse.js client-side
- **Output**: `out/` — 80 static pages, no server required
