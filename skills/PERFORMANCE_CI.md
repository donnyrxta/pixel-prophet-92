# Performance CI (Skills-2)

This folder documents automated performance testing setup using Lighthouse CI.

## Budget Targets
- Performance score ≥ 0.90 (mobile)
- CLS ≤ 0.10
- LCP ≤ 3000 ms
- TBT ≤ 300 ms

## How It Works
- `lighthouserc.json` defines collection and assertions.
- GitHub Action `.github/workflows/lighthouse.yml` builds the app and runs `lhci autorun`.
- Results are uploaded to temporary public storage for PR review.

## Local Run
```
# Install once
npm i -D @lhci/cli

# Build and run
npm run build
npm run perf:ci
```

## Extend URLs
Edit `lighthouserc.json` → `ci.collect.url` to include additional routes (e.g., `/shop`, `/electronics`).

## Notes
- For SSR/CDN environments, use `collect.url` with full absolute URLs.
- Consider artifact storage via LHCI server for historical tracking.

