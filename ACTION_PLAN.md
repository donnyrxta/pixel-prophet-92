# Launch Action Plan
_Owner: Soho Connect_  
_Primary contact: info@sohoconnect.co.zw_

## Front-End (UX/Performance)
- [ ] Freeze design tokens and dual render modes (full/lightweight) // keeps neumorphic+glassmorphic visuals while providing low-GPU fallback.
- [ ] Add `prefers-reduced-motion` path and lightweight shadow presets // prevents motion-induced jank and meets accessibility expectations.
- [ ] Fix overlay contrast and typography weights on frosted cards // raises WCAG AA compliance for glass surfaces.
- [ ] Lazy-load hero media with `srcset` and preload critical CSS // targets LCP <2.0s on mobile.
- [x] Add micro-interactions for success/error/loading on all forms // improves clarity for lead capture and checkout flows.
- [ ] Responsive QA down to 320px and iOS Safari clip checks // ensures tactile edges and blurs render cleanly on small screens.
- [x] ARIA focus order, aria-live on toasts, escape/Tab traps removed // completes keyboard-only journey coverage.

## Back-End (Strapi)
- [ ] Enforce roles/permissions and CORS for prod/stage only // limits surface area of public APIs.
- [ ] Enable rate limiting on public content and auth endpoints // reduces bot and brute-force risk.
- [ ] Encrypt PII fields and enable audit-log plugin // secures user data and creates traceability.
- [ ] Daily backups + migration dry-runs in CI before deploy // prevents schema drift and data loss.
- [ ] Content workflow: draft/review/publish + scheduled releases // supports editorial governance pre-launch.
- [ ] Require SEO meta + schema type per entry (Product/FAQ/Article) // guarantees structured data completeness.
- [ ] Generate sitemap/robots directly from Strapi publish events // keeps search index fresh automatically.

## Integrations (Brevo ⇆ Strapi ⇆ Site)
- [ ] Configure Brevo SMTP/transactional with DKIM/SPF from `info@sohoconnect.co.zw` // ensures deliverability for receipts/resets.
- [x] Strapi webhook → Brevo Contacts API with consent + source page // centralizes lead capture with proof of consent.
- [x] Double opt-in flow using Brevo template; store DOI status back in Strapi // meets GDPR and keeps state aligned.
- [x] Auto-tag contacts by form type, product category, and UTM params // enables segmented campaigns on free tier.
- [x] Nightly sync job to backfill tags and reconcile bounced/unsubscribed // keeps lists clean within Brevo limits.
- [ ] Automations: 3-step welcome, 1-step recovery, 1-step re-engagement // maximizes free-tier automation slots for ROI.
- [x] GA4/GTM events mirrored into Brevo identify/track where allowed // keeps personalization data flowing without duplication.

## User Journey Completion
- [ ] Validate browse → PDP → cart → checkout → confirmation email E2E // ensures revenue path is unbroken.
- [x] Validate lead → form → Brevo list → DOI → welcome series // ensures nurture path is unbroken.
- [ ] Support path: form → ticket email to `info@sohoconnect.co.zw` + Brevo tag // routes service requests reliably.
- [x] Add 404/500 recovery pages with navigation shortcuts // reduces abandonment from dead ends.
- [ ] Offline/empty states for product/category listings // keeps UX coherent during outages or zero results.

## Data Protection & Compliance
- [x] Deploy consent banner with analytics/marketing toggles; persist choices to Strapi + Brevo attributes // provides auditable consent.
- [x] Publish privacy/ToS pages in Strapi with version stamps // documents obligations and change history.
- [ ] DSR workflow: intake form to `info@sohoconnect.co.zw`, 30-day SLA, identity verification checklist // operationalizes GDPR rights.
- [ ] Retention policy: leads 24 months inactivity; orders 6 years; automated purge job // limits data exposure window.

## Checkpoints / Milestones
- **T0 (today)**: Tokens frozen; Brevo SMTP+DKIM/SPF verified; consent banner live on staging // establishes baseline deliverability and compliance.
- **T+3 days**: Perf/AA fixes deployed; Strapi roles/permissions locked; structured data emitted; Brevo webhook+DOI working // unlocks content and lead validity.
- **T+5 days**: Automations active; segmentation tags live; GA4/GTM parity confirmed; backups/audit-log running // hardens operations and analytics.
- **T+7 days (Go/No-Go)**: Mobile Lighthouse ≥90, LCP/INP “good”; E2E checkout and lead journeys green; DSR process documented; rollback plan ready // go-live criteria met with safety net.
