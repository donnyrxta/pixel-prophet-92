# Deployment Guide

This document outlines the deployment process for the Soho Connect application to the production environment (Vercel).

## 1. Preparation

The application is a React Vite Single Page Application (SPA).

### Build Artifacts
The build command `npm run build` generates a `dist` folder containing:
- `index.html`: Entry point
- `assets/`: Compiled JavaScript and CSS (hashed for caching)
- Public static assets

### Configuration Files
- `package.json`: Defines dependencies and build scripts.
- `vercel.json`: Vercel-specific configuration for routing and build settings.
- `.env`: Environment variables (must be configured in Vercel dashboard).

## 2. Target Environment Setup (Vercel)

1.  **Create Project**:
    - Log in to Vercel.
    - Import the repository from GitHub.
    - Framework Preset: `Vite`
    - Root Directory: `./`

2.  **Infrastructure**:
    - Vercel provides serverless functions and a global CDN (Edge Network).
    - No manual server provisioning is required.

## 3. Configuration

Configure the following environment variables in the Vercel Project Settings > Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | `GTM-XXXXXX` |
| `BREVO_API_KEY` | API Key for Brevo Email | `xkeysib-...` |
| `STRAPI_BASE_URL` | CMS URL | `https://cms.sohoconnect.co.zw` |
| `STRAPI_API_TOKEN` | CMS API Token | `...` |

## 4. Deployment Strategy (Zero Downtime)

We utilize Vercel's **Immutable Deployments** model which ensures zero downtime.

1.  **Preview Deployments (Blue/Green-like)**:
    - Every Pull Request generates a unique Preview URL.
    - This allows testing in a production-like environment before merging.

2.  **Production Deployments**:
    - Merging to `main` triggers a production build.
    - The new build is deployed to a unique URL.
    - Once health checks pass (internal Vercel checks), the main domain (`sohoconnect.co.zw`) is atomically switched to the new deployment.
    - If the build fails, the domain is never switched, ensuring stability.

## 5. Health Checks & Monitoring

### Automated Health Checks
- A `public/health.json` file is included in the build.
- **Post-Deployment Verification**:
    - Run `node scripts/health-check.mjs <deployment-url>` to verify the status.

### Monitoring
- **Vercel Analytics**: Enabled in Vercel dashboard for real-time user metrics.
- **Vercel Speed Insights**: Monitors Core Web Vitals.
- **Google Analytics/GTM**: Client-side tracking.

## 6. Deployment Process & Rollback

### Standard Deployment
1.  Push changes to a feature branch.
2.  Create a Pull Request (PR).
3.  Wait for Vercel Preview deployment to finish.
4.  Verify Preview URL.
5.  Merge PR to `main`.
6.  Vercel automatically deploys to Production.

### Rollback Procedure
If a critical issue is found in production:
1.  Go to Vercel Dashboard > Project > Deployments.
2.  Find the previous successful deployment (marked "Ready").
3.  Click the three dots menu (...) and select **"Redeploy"** or **"Promote to Production"**.
4.  Vercel instantly switches the domain pointer to the old deployment (Zero Downtime).

## 7. Post-Deployment Verification

After deployment, perform the following manual checks:
1.  **Health Check**: Access `/health.json` and ensure it returns `{"status": "ok"}`.
2.  **Critical Paths**:
    - Verify Homepage loads.
    - Verify Navigation menu works.
    - Verify Contact Form submission (sends email via Brevo).
    - Verify WiFi Marketing page carousel and pricing button.
3.  **Console Errors**: Check browser developer tools for any JS errors.
