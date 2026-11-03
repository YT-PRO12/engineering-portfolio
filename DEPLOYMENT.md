# Review and deployment

The change is prepared on `feat/portfolio-editorial-20261103`. Review its pull request and CI before merging. No production deployment is claimed.

## Local preview

Use Node 22 or newer:

```text
npm ci
npm run build
npx tsc --noEmit
npm run preview
```

Open the URL printed by Vite. The portfolio is served from the domain root; preserve `/projects/*.html`, `/resume/*` and `/assets/*`.

## Vercel

Use the existing engineering-portfolio project if one is connected. Select this feature branch for a preview deployment. Build command: `npm run build`. Output: `dist`. The included `vercel.json` retains cleanUrls=false and trailingSlash=false. The five HTML entries are actual built pages; do not add a blanket rewrite of all paths to index.html. Vercel can serve the included `404.html` for missing pages.

After a real deployment domain is confirmed, add absolute canonical and `og:url` metadata to all five entry pages, use the absolute `/assets/og-cover.png` URL, generate a five-page sitemap, and reference it from robots.txt. These domain-dependent settings are intentionally not fabricated. Verify the deployed project routes, all four resume downloads and a nonexistent path.

## Resume generation

Install Python 3.12+, python-docx, pypdf, LibreOffice Writer and Liberation Sans fonts. Run:

```text
python scripts/build_resume_assets.py
python scripts/check_assets.py
```

The existing resume sync workflow still generates and validates both variants, but now uploads an artifact instead of pushing directly to main. Download the verified artifact and update assets through a reviewed PR. This deliberate change keeps repository permissions read-only and respects the feature-branch workflow. The PR workflow checks the committed PDF/DOCX deliverables as well as build and TypeScript. It does not deploy.

## Rollback

Revert the feature commit through a new PR. No schema, backend, account or external-project migration is involved.
