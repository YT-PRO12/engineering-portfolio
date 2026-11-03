# QA results — 3 November 2026

**Scope:** engineering-portfolio and two resumes. Baseline main: `f7d662cca23870557a111ec980bffde13b94ece1`. No other project repository changed. Production deployment is not performed.

| Check | Actual result |
|---|---|
| Baseline | `npm ci` and `npm run build` passed before implementation. Current GitHub main matched handoff. |
| Production build | `npm run build` passed; all five HTML entries generated. Final JS ~242.44 kB / 75.30 kB gzip; CSS ~17.80 kB / 4.39 kB gzip. Baseline CSS 28.98 kB / 7.52 kB gzip. No added runtime dependencies. |
| TypeScript / whitespace | `npx tsc --noEmit` and `git diff --check` passed. |
| Responsive browser | Real Chromium iframe viewports at **390, 768, 1440 px** on home and all four case studies: **15/15** layouts without document-level horizontal overflow. One H1 per page and no missing in-page anchors. Native device/OS testing not performed. |
| Visual inspection | Real baseline and redesigned desktop screenshots captured; mobile homepage, project list and tablet case study inspected. AegisED repository screenshot inspected before inclusion. |
| Accessibility | axe-core WCAG 2 A/AA + WCAG 2.1 AA: **zero violations on all five routes** at 390 px. Automated contrast review marked decorative diagram arrows incomplete; manually checked dark ink against all four pale backgrounds. This is not a complete WCAG certification. |
| Keyboard / interactions | Mobile menu expanded/collapsed correctly, Escape closed it and returned focus; selecting Work closed the menu. Skip link moved focus to `main`. Category buttons returned 2 Systems, 1 Optimization, 1 Applied AI and 4 All work with correct `aria-pressed`. |
| Clipboard | Restricted-browser fallback displayed “Please copy the email address above.” Successful clipboard access was not verified in this environment. |
| Browser console | No portfolio application errors observed; browser-extension metadata errors were excluded. |
| External URLs | 13 supplied source/profile links returned HTTP 200. LinkedIn returned 999 (restricted); Render demo timed out. These two remain **NOT VERIFIED**, not reported as broken or live. Email compose links were structurally checked, not sent. |
| Internal assets | Browser-side HTTP requests passed for five pages, four resume downloads, screenshot and 404 document (**11/11 HTTP 200**). PDF signatures and DOCX ZIP signatures/byte sizes matched expected assets. Native browser save-event reporting timed out; response delivery is verified. |
| Resumes | Both final PDFs: **exactly one A4 page**, searchable text, five hyperlink annotations, correct 9.00/10.00 and 2028, all four projects, explicit unachieved RouteGuard target. Both DOCX files: editable paragraphs, no layout tables, 10.5 pt body style. |
| Render fidelity | `render_docx.py --emit_pdf` ran for both DOCX files. Both final page images were inspected after removing an inherited title rule. PDF raster pixels exactly matched the separately rendered DOCX PDF for each variant. No clipping or overlap observed. Microsoft Word on Windows was not independently tested. |
| Evidence | `python scripts/check_assets.py` passed for both variants; no employment or earned-certificate claims. Education is the last resume section. |
| Hosting / domain | No production domain or deployment confirmed. Domain-dependent canonical URLs, sitemap and absolute OG URLs intentionally deferred. Dedicated 404 asset and unknown-route recovery UI verified; hosting-specific HTTP 404 status not verified. |

## Workflow safety

Automatic approval review rejected retaining the modified sync workflow with direct-to-main write capability. It was replaced by read-only checkout and verified resume-artifact upload; no automatic source push remains. The separate PR workflow also uses read-only permissions.

## Focused fixes from QA

- Allowed the exact managed preview host in Vite to resolve the initial preview host rejection.
- Added an explicit accessible name to the AegisED screenshot link.
- Made Escape work from the mobile-menu button as well as inside the menu.
- Removed the inherited blue title border from both editable resumes and rerendered them.
- Normalized PDF whitespace in the evidence check so line wraps cannot cause false failures.

## Reproduce

```text
npm ci
npm run build
npx tsc --noEmit
python scripts/check_assets.py
```

The release ZIP includes captured responsive/a11y/link evidence and before/after images. Browser QA used a temporary same-origin iframe harness to set precise layout widths; test instrumentation was removed from shipping code.

**Remaining hosted check:** after Vercel creates the branch preview, open each `/projects/*.html` URL, download all four resume files, and request an unknown path to verify HTTP 404. Check the Render demo and LinkedIn from a normal browser. CI status is recorded in the pull request; this report does not claim an unobserved hosted run.
