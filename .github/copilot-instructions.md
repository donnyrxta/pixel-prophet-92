<!-- Copilot / AI agent instructions for the pixel-prophet-92 repository -->
# Purpose
Short, actionable notes to help an AI coding agent be immediately productive in this codebase.

## Quick environment & commands
- Install and run locally: `npm install` then `npm run dev` (Vite). Default dev URL: http://localhost:5173
- Build: `npm run build` (production Vite build). Preview build: `npm run preview`.
- CI / perf: `npm run perf:ci` runs Lighthouse CI; image analysis: `npm run analyze:clients`.
- Lint: `npm run lint` (ESLint). Vercel deploy scripts are `deploy:vercel` / `vercel-build` in `package.json`.

## Big-picture architecture (as implemented)
- Vite + React (TypeScript) SPA with SSR-capable patterns in mind. Entry points: `src/main.tsx` and `src/App.tsx`.
- UI: Tailwind CSS + utility classes, shadcn-style component conventions, Radix primitives used in components.
- Routing: React Router (`react-router-dom`) with pages under `src/pages` and components in `src/components`.
- Analytics & Ads: code-level adapter functions under `src/lib` (see `src/lib/gtm.ts`, `src/lib/utils.ts`) and `src/ads` for integrations.
- Image handling: reusable components `ResponsiveImage.tsx` and `SafeImage.tsx` in `src/components` and a script for image analysis at `scripts/analyze-images.mjs`.

## Project-specific patterns & conventions
- Tailwind-first styling: prefer composing styles via utility classes and the project `tailwind.config.ts`.
- Component API style: many components accept variant props using class-variance-authority (cva); follow existing component signatures when adding variants.
- Form handling: uses `react-hook-form` and `zod` for validation patterns — look at `QuotationCalculator` and `PremiumQuotationCalculator` for examples.
- Analytics events: push events via the GTM helper in `src/lib/gtm.ts`. Follow existing event names (eg. `view_item`, `add_to_cart`, `quote_start`) and keep PII out of client-side events.

## Key files & directories (where to look first)
- `package.json` — scripts and deployment hooks
- `vite.config.ts` and `postcss.config.js` — build tooling
- `tailwind.config.ts` — design tokens and breakpoints
- `src/main.tsx`, `src/App.tsx` — app bootstrapping and router
- `src/pages/` — route implementations (home, services, store)
- `src/components/` — UI building blocks (look for `ResponsiveImage.tsx`, `SafeImage.tsx`, `QuotationCalculator.tsx`)
- `src/lib/gtm.ts`, `src/lib/utils.ts` — analytics and helper utilities
- `scripts/analyze-images.mjs` — image analysis used by CI
- `public/` — static assets, favicons, manifest
- `docs/` — product/agent docs and implementation notes (useful for higher-level goals)

## How to implement small changes (examples)
- Add a GTM event: call the helper in `src/lib/gtm.ts` from the component's interaction handler. Mirror event names already used.
- Add a responsive image: prefer `ResponsiveImage.tsx` usage; pass `srcSet`/`sizes` and include WebP/AVIF fallbacks where supported.
- Add a new route: create a file under `src/pages/`, register the route in the router in `src/App.tsx`, and add navigation in `src/components/Header.tsx`.

## CI / PR expectations
- PRs should keep `npm run build` passing locally and follow the existing ESLint rules (`npm run lint`).
- Performance gate: repository uses Lighthouse CI (`npm run perf:ci`) in CI — small regressions may block deploys.
- Deploys target Vercel by default (see `deploy:vercel`). Preview deployments are expected for PRs.

## Known repository constraints & local rules
- TypeScript is used across the project; prefer adding types and keep `tsconfig` patterns consistent.
- Avoid adding runtime-heavy client libraries; preference is low initial JS payload and code splitting where possible.
- Brand and UX constraints are documented in `SOHO-AUTONOMOUS-AGENT.md` (root) — follow these for color, font, and service-first hierarchy rules.

## When in doubt — concrete places to inspect
- For analytics and events: `src/lib/gtm.ts` and `src/ads/*`
- For UI patterns and variants: any file in `src/components/` (e.g. `QuotationCalculator.tsx`, `HeroSection.tsx`)
- For performance/image requirements: `scripts/analyze-images.mjs` and `public/images/` + `ResponsiveImage.tsx`

If any part of these notes is unclear or you want the instructions expanded (examples, linter rules, or a checklist for PRs), say which area and I will update this file.

## Agent playbook — how to operate in this repo
This section turns the quick notes above into an operational checklist an AI agent or new engineer can follow.

1) Onboard & bootstrap
	- Clone, then run:

	  npm install
	  npm run dev

	- Open `http://localhost:5173` and confirm the app boots.
	- Inspect `src/main.tsx` → `src/App.tsx` to understand routing and global providers (theme, contexts).

2) Local PR checklist (run before opening a PR)
	- Run lint and build locally:

	  npm run lint
	  npm run build

	- Run image analysis if you change images:

	  npm run analyze:clients

	- Run perf checks locally if making layout/asset changes (CI gate uses Lighthouse CI):

	  npm run perf:ci

	- Confirm no PII is sent in client-side events. Use `src/lib/gtm.ts` as the single place to dispatch analytics events.

3) PR review focus points for agents
	- Code size & bundle impact: large third‑party libs are discouraged. Prefer code-splitting and lazy-loading.
	- Images: prefer `ResponsiveImage.tsx` usage, include AVIF/WebP fallbacks and proper `sizes`/`srcSet`.
	- Accessibility: check key pages with Axe or Chrome Lighthouse (keyboard navigation, labels, focus order).
	- Analytics: event names should use existing taxonomy (`view_item`, `add_to_cart`, `quote_start`, etc.). Update `src/lib/gtm.ts` only when adding new events.

4) Performance & accessibility gates (what to check automatically)
	- Lighthouse mobile score target: >= 90 (CI uses `npm run perf:ci`). If absent locally, run `npm run preview` and run Lighthouse manually.
	- Bundle: aim for initial JS < ~500KB. Watch `vite` output for large chunks during build.
	- Accessibility: run Axe checks (CI includes Axe); address high-severity failures before merge.

5) Adding a route / page
	- Create `src/pages/MyPage.tsx` and add a route in the router in `src/App.tsx`.
	- Add navigation to `src/components/Header.tsx` if it should appear in the main nav.
	- Use `ResponsiveImage.tsx` for images and pass proper `alt` text.

6) Analytics & GTM
	- Centralize event pushes in `src/lib/gtm.ts`. Keep events free of PII.
	- For server-side GA4 / tagging keys, the repo expects secrets — common names to look for (assumption): `GA4_SERVER_KEY`, `SENDGRID_API_KEY`, `CMS_API_TOKEN`, `VERCEL_TOKEN`.

7) Tests
	- This repo currently has no `test` script in `package.json`. Unit tests (Vitest/Jest) are expected by project conventions — add `npm test` if you add tests and wire CI to run them.

8) Debugging tips
	- Use React DevTools and network tab to inspect API calls and analytics events.
	- To validate images and sizes run `node scripts/analyze-images.mjs` and review the output.
	- If encountering build failures, run `vite build --debug` or `npm run build:dev` to see detailed messages.

9) Release & deploy
	- Use `npm run deploy:vercel` to push a production deploy (requires Vercel CLI and `VERCEL_TOKEN`).
	- CI creates preview deployments on PRs; ensure preview URLs are included in the PR description for manual QA.

10) Where to extend guidance
	- If you add new adapters (payments, email, CMS), put them under `src/lib/` and provide a thin adapter surface so other modules call a single interface (e.g., `sendEmail(payload)` in `src/lib/email.ts`).

## Quick troubleshooting checklist
- App doesn't start: check `node` version (use Node 18+), ensure `npm install` completed, inspect `vite` errors.
- Lint failures: run `npm run lint` and fix or run autofix if configured (`eslint --fix`).
- Build fails: run `npm run build:dev` to preserve dev mode diagnostics.

---

If you want, I can also:
- Add a short PR checklist file (e.g., `.github/PULL_REQUEST_TEMPLATE.md`) with these local commands and perf thresholds.
- Create a tiny CI helper script to run `lint`, `build`, `analyze-images`, and `perf:ci` sequentially for local preflight checks.

