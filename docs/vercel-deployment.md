# Vercel Deployment Guide

This project is configured for automated deployments on Vercel.

## Environment Variables

Configure required variables in the Vercel dashboard (Project Settings → Environment Variables). If your project uses none, this section can be skipped. Recommended variables for analytics or APIs:

- `VITE_API_BASE_URL` – Base URL for any external API
- `VITE_GTM_ID` – Google Tag Manager container ID
- `VITE_APP_ENV` – Environment label (`development`, `preview`, `production`)

Add variables to all environments as needed:

- Development: Local `.env` files (`.env`, `.env.development`)
- Preview: Vercel “Preview” Environment
- Production: Vercel “Production” Environment

## Build and Output Settings

- Build Command: `npm run build` (or `vercel-build` if present)
- Output Directory: `dist`
- Framework: Vite (auto-detected)
- SPA Routing: Handled in `vercel.json` with rewrite to `index.html`

## Routing Rules

`vercel.json` includes a SPA rewrite:

```json
{
  "version": 2,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Static assets under `/assets/*` are served with immutable cache headers.

## CI/CD and Branch Protection

1. Connect GitHub repository in Vercel (Project → Git).
2. Enable “Automatically deploy Preview for every push” and “Automatically deploy Production on main”.
3. In GitHub → Settings → Branches:
   - Protect `main` branch: require PRs, require status checks to pass.
   - Add required checks (e.g., Lighthouse CI, Vercel Preview).
4. Optional: Add Vercel comments app to PRs for deployment links.

## Deployment Scripts

- `vercel-build`: Used by Vercel if present.
- `deploy:vercel`: Optional CLI shortcut for manual production deploys.

## Verification

1. Push a branch → confirm Vercel Preview URL loads and routes work (deep links).
2. Merge to `main` → confirm Production deployment.
3. Validate caching headers for `/assets/*` and basic SPA navigation.

