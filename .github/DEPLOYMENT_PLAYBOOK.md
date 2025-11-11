# Deployment Playbook — GitHub / Agents

Purpose: give AI agents and humans a safe, repeatable checklist to deploy, promote, and rollback this site. Keep this playbook short, actionable, and tied to existing scripts and CI gates.

## Quick facts (from this repo)
- Local dev: `npm run dev` (Vite) — default http://localhost:5173
- Build: `npm run build` (Vite)
- Preview: `npm run preview`
- Perf CI: `npm run perf:ci` (Lighthouse CI)
- Image analysis: `npm run analyze:clients`
- Lint: `npm run lint`
- Deploy (Vercel): `npm run deploy:vercel` (calls `npx vercel --prod --yes`)

## Pre-deploy checklist (must pass locally and in CI)
1. Ensure branch is up-to-date with `main` and all required PR checks have passed.
2. Run local static checks and build:

   npm install
   npm run lint
   npm run build

3. If you changed images or assets run:

   npm run analyze:clients

4. If you changed layout, fonts, or assets run Lighthouse locally (or `npm run perf:ci` if configured):

   npm run perf:ci

5. Confirm analytics changes use `src/lib/gtm.ts` and do not include PII.
6. Update `CHANGELOG.md` or PR description with summary, perf impact, and any feature flags.

## Deploy to preview (PR preview steps)
1. Open a PR — CI should run lint, build, perf, and Lighthouse checks. Wait for green.
2. The repo uses Vercel preview deployments by default for PRs (if Vercel integration enabled). Verify the preview URL from the CI output.
3. Run quick smoke tests against the preview URL:
   - Confirm home page loads < 3s on mobile (Lighthouse quick run)
   - Smoke test key interactions: header nav, contact forms, GTM events (using Network tab)

## Promote to production (manual agent steps)
Prerequisites: you must have Vercel CLI configured and `VERCEL_TOKEN` available in the agent environment or GitHub Secrets.

1. Ensure `main` is the branch to promote. Merge PR into `main` via the normal PR flow.
2. Run full build and perf checks locally or in a pre-release environment:

   npm run build
   npm run perf:ci

3. Deploy using Vercel (PowerShell example):

   # from repo root
   npx vercel --prod --yes

   Or use the npm script (wraps npx):

   npm run deploy:vercel

4. After deploy completes, run post-deploy smoke tests:
   - Confirm production URL responds and main pages render.
   - Check Sentry (if configured) for new errors.
   - Verify GTM events appear in staging/GA4 (no PII) and that Pixel firing is as expected.
   - Run a Lighthouse quick scan on production to confirm no regressions.

## Rollback procedure
Goal: revert to the last known good deployment quickly.

Option A — Vercel rollback (recommended when available):
1. In Vercel dashboard, go to the project's Deployments list.
2. Find the last successful deployment (green) and click "Promote" (or use the Vercel CLI to redeploy that commit).

Option B — Git revert + redeploy (if dashboard unavailable):
1. On your local machine or agent environment:

   git checkout main
   git pull origin main
   git revert <bad-commit> --no-edit
   git push origin main

2. The GitHub Actions / CI should trigger a new build and deploy; monitor until live.

Notes:
- Always run a smoke test after rollback. Check Sentry / logs and Lighthouse if applicable.
- If rollback doesn't fix the issue, open an incident and capture debug artifacts (console logs, network captures, Lighthouse reports).

## Health checks & post-deploy monitoring
- Health quick list (run immediately after deploy):
  - HTTP 200 on `/`, `/services`, `/contact`
  - No JS console errors on home load
  - Essential GTM events firing (use Network tab or GTM debug console)
  - Critical images loaded and not 404
- Longer checks (first 10–30 minutes):
  - Sentry error rate (if configured) — look for a spike
  - Lighthouse mobile score regression > 5 points triggers rollback consideration
  - Business KPI smoke: form submissions and checkout flows functioning

## Secrets and permissions
- Required secrets (examples) — ensure they live in GitHub Secrets / Vercel environment and are *not* committed:
  - `VERCEL_TOKEN` — required for `npx vercel` automated deploys
  - `GA4_SERVER_KEY`, `SENDGRID_API_KEY`, `CMS_API_TOKEN` — used by serverless endpoints or integrations

## Agent safety rules (must be followed by any automated agent)
1. Do not deploy without CI green (lint/build/perf). If a perf gate fails, open an issue and do not deploy.
2. Do not add or expose secrets in code. Agents must write secrets only to GitHub Secrets or Vercel environment via an authorized process.
3. Keep deployment commands idempotent. Use commit hashes when promoting to avoid ambiguity.
4. Always capture logs and smoke test artifacts and attach them to the PR/incident if anything fails.

## Quick troubleshooting commands (PowerShell) — copyable

Install and start dev server:

```powershell
npm install
npm run dev
```

Build and preview:

```powershell
npm run build
npm run preview
```

Run lint and image analysis:

```powershell
npm run lint
npm run analyze:clients
```

Deploy to Vercel (requires `VERCEL_TOKEN` in env):

```powershell
npm run deploy:vercel
```

Rollback via git revert (example):

```powershell
git checkout main
git pull origin main
git revert <bad-commit> --no-edit
git push origin main
```

## Additions / automations to consider
- Add a small GitHub Action that runs `npm run lint && npm run build && npm run perf:ci` as a preflight job before merge on `main`.
- Add a `smoke-test` script that runs a small set of Playwright or Puppeteer checks against a URL — agents can call this after deploy.

---

If you'd like, I can also:
- Create a `.github/workflows/deploy-preflight.yml` action that gates merges with lint/build/perf.
- Add a `smoke-test` script and a tiny Playwright setup that exercises header nav, contact form, and a GTM event.
