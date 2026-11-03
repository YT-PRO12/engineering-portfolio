# Modern React + Vite deployment source

This is the preferred production deployment source. It is equivalent in content and styling to the verified offline/static React preview, but uses modern npm React and Vite rather than the offline preview's vendored React 16 runtime.

## Setup

```bash
npm install
npm run dev
npm run build
npm run preview
```

Run in Node 20+ (Node 22 recommended). All five HTML entrypoints are built through `vite.config.js`. Open `/projects/aegised.html`, etc., after build.

**Important:** This Vite version could not be built in the artifact environment (npm registry access unavailable). Before deployment, run the commands above, test all links and mobile navigation, and compare with the browser screenshots from `../verification/`. Do not claim a tested production build until that is done.

No backend, API secrets, analytics trackers or forms are included. All contact actions are mailto/copy-email.


## Academic and credential policy (2026-11-03)

- User-confirmed **CGPA: 9.00/10.00**, B.Tech in Information Technology, JECRC, expected graduation 2028.
- The last professional section is **Education & Certifications**, followed only by Contact and footer.
- IBM/Microsoft learning awards and AI-900/AI-102 exams are **not claimed** until a corresponding issuer-issued credential file or verifiable link is supplied.
- PDFs and editable DOCX files are built from `scripts/build_resume_assets.py` and synchronized by `.github/workflows/sync-resumes.yml`.
- The resume includes only an existing GitHub source link for this portfolio until a genuine live URL is verified.
