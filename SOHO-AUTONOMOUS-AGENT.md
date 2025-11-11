# Soho Connect Autonomous Website Builder — System Specification and Operations Guide

This document describes a fully autonomous agent system capable of constructing the Soho Connect website end‑to‑end without manual intervention. It covers architecture, integrations, CI/CD, deployment, performance optimization, accessibility, security, analytics, progress reporting, error recovery, and production deliverables. It is vendor‑neutral and includes implementation guidance aligned with Soho Connect’s brand and business goals.

## Goals
- Prioritize Soho Connect’s core business services (design, print, branding, signage, digital marketing) across all information architecture, UX flows, and analytics.
- Treat electronics (smartphones, CCTV, accessories, consumables) as supporting infrastructure and a secondary division within a unified business site.
- Autonomously handle all phases: requirements → design → content → development → testing → deployment → monitoring → optimization.
- Enforce brand standards: primary color Royal Blue (`#4169e1`), Inter (primary) + Oswald (display); forbid orange hues.
- Deliver high performance (<=3s on 3G), WCAG 2.1 AA accessibility, SEO/AEO compliance, cross‑browser compatibility, scalable SSR architecture.
- Integrate analytics (GTM/GA4 server‑side Johannesburg), CRO (A/B testing), email automation (SendGrid), and optional lead routing (n8n).

## Business‑First Rebalance
- Present business services first: navigation, page hierarchy, and homepage story prioritize service discovery, credibility, and conversion.
- Position Electronics as an auxiliary division: accessible via dedicated routes and category pages, not the primary home narrative.
- Optimize forms, quote flows, and contact/WhatsApp pathways to reduce friction and increase lead quality (BANT scoring).
- Use trust signals, case studies, portfolio, pricing cues, and testimonials to support decision‑making.

## Non‑Goals
- Not a single-vendor lock-in. The system uses an interface-driven approach so different tools (CMS, hosting, analytics) can be swapped.
- Not a full CRM. It can integrate with CRMs or n8n but won’t replace them.

---

## System Overview

```
┌───────────────────────────────────────────────────────────────────┐
│  Orchestrator (Director Agent)                                     │
│  • Plans sprints, sequences tasks, resolves conflicts              │
│  • Owns state machine across phases                                │
└───────────┬───────────────────────────────────────────────────────┘
            ↓
┌───────────────────────────────────────────────────────────────────┐
│  Specialist Agents (Tool-Using)                                   │
│  • Requirements Agent  • Design Agent  • Content Agent            │
│  • Services & Quoting Agent  • Order Management Agent             │
│  • Frontend Agent      • Backend/Infra Agent                      │
│  • QA Agent            • SEO Agent                                 │
│  • Analytics Agent     • Performance Agent                         │
│  • Release Manager     • Monitoring & Recovery Agent               │
└───────────┬───────────────────────────────────────────────────────┘
            ↓
┌───────────────────────────────────────────────────────────────────┐
│  Tool Adapters & Connectors                                       │
│  • Web: React/Next.js                                              │
│  • Design: Figma API                                               │
│  • CMS: Headless CMS connectors (Sanity/Strapi/Contentful)         │
│  • Testing: Vitest/Jest, Playwright, Axe, Lighthouse CI            │
│  • Analytics: GTM/GA4 (server-side), Pixels, Hotjar                │
│  • Infra: Vercel/Netlify, GitHub Actions                           │
│  • Security: Snyk/OWASP ZAP, CSP management                        │
└───────────────────────────────────────────────────────────────────┘
```

### Phase State Machine
- Discover → Plan → Design → Implement → Test → Release → Monitor → Learn → Iterate
- Each phase emits progress events, quality gates, and can auto‑rollback on failures.

---

## Agent Taxonomy

### Orchestrator (Director Agent)
- Ingests docs (Skills‑2, website audit, comprehensive audit) + Figma files + CMS schemas.
- Converts inputs into backlog items with priorities, dependencies, and acceptance criteria.
- Assigns tasks to specialist agents; enforces quality gates; publishes progress.

### Requirements Agent
- Automated requirement gathering: parses internal docs and external constraints to produce an actionable backlog.
- Extracts: pages/routes, components, content models, schema requirements (e.g., `ElectronicsStore`, `Service`, `FAQPage`, `BreadcrumbList`), analytics events, performance budgets.
- Confirms feasibility against brand rules (color/typography) and localization (Harare context, RBZ disclaimers).

### Design Agent (Figma API)
- Pulls Figma components, variables, and tokens; exports design tokens (color, typography, spacing) as JSON.
- Generates responsive layouts and component blueprints (cards, nav, checkout, micro‑interactions).
- Enforces brand: Royal Blue (#4169e1), Inter + Oswald; forbids orange hues.

### Content Agent
- Dynamic content generation aligned to brand voice; uses LLM prompting with guardrails.
- Produces unique copy for products and location pages (≥30% unique, geo‑tagged), FAQ content, schema‑friendly descriptions.
- Validates content against SEO guidelines, accessibility, and compliance.

### Services & Quoting Agent
- Owns service funnels (design, print, branding, signage, digital marketing) and quote workflows.
- Optimizes multi‑step forms for low friction and BANT qualification; integrates WhatsApp routing.
- Outputs pricing tiers and calculator logic; generates service FAQs and schema.

### Order Management Agent
- Tracks quotes → orders → production → delivery; syncs with CRM and task boards.
- Publishes customer updates; ensures SLA adherence; escalates delays.

### Frontend Agent
- Chooses SSR framework (Next.js 14 with App Router recommended).
- Scaffolds pages/routes/components; integrates design tokens; applies Tailwind + shadcn/ui.
- Implements responsive breakpoints (360, 768, 1024, 1440) and micro‑interactions (hover, transitions, skeleton loaders).
- Integrates trust signals (EcoCash, Visa, MasterCard logos, ZIMRA VAT footer, RBZ forex disclaimer).

### Backend/Infra Agent
- Configures serverless APIs (Vercel) for email (SendGrid), analytics server‑side tagging, and optional CMS webhooks.
- Manages secrets via platform vault; sets up environment aliases for staging/production.
- Applies security: HTTPS-only, CSP, rate limiting, input sanitization, logging.

### QA Agent
- Unit and integration testing (Vitest/Jest + Testing Library).
- E2E across browsers with Playwright; visual regression snapshots at key breakpoints.
- Accessibility testing (Axe), performance testing (Lighthouse CI) with budgets.

### SEO Agent
- Implements SSR parity (Googlebot vs Chrome HTML identical).
- Adds structured data: Organization, ElectronicsStore, Service, FAQPage, BreadcrumbList, Review/AggregateRating.
- Generates `sitemap.xml` and `robots.txt`; ensures canonical URLs and OpenGraph/Twitter cards.

### Analytics Agent
- Defines GTM data layer events: view_item, add_to_cart, begin_checkout, purchase.
- Configures GA4 server‑side tagging (Johannesburg region); integrates pixels (Facebook, LinkedIn) and Hotjar.
- Ensures privacy compliance (no PII in client‑side events).

### Performance Agent
- Enforces budgets (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1; initial JS < 500KB).
- Image optimization: WebP/AVIF, `<picture>`, lazy‑load, preconnect/preload critical assets.
- Implements caching headers (`Cache-Control: immutable`) and CDN strategies.

### Release Manager
- Runs CI gates; promotes artifacts from staging to production if all checks pass.
- Handles rollbacks on failures; posts release notes and benchmark reports.

### Monitoring & Recovery Agent
- Observability: Sentry for errors, uptime checks, performance telemetry.
- Auto triage: retry, backoff, circuit breaker; opens incident and attempts self‑healing.
- Reports status to dashboard and Slack/Teams.

---

## Toolchain & Connectors

### Web Frameworks
- Recommended: Next.js 14 (React 18, App Router, SSR/SSG, Image Optimization).
- UI: Tailwind CSS + shadcn/ui components; GSAP/Framer Motion for animation.

### Figma API Integration
- Fetch components, variables (colors, fonts, spacing), and create a token pipeline.
- Convert Figma variables → design tokens JSON → Tailwind config/shadcn theme.
- Validate exported components against accessibility and brand rules.

### CMS Interface
- Abstract `CMSAdapter` with pluggable connectors (Sanity, Strapi, Contentful).
- Models: Service, PricingTier, Quote, CaseStudy, Product, Category, LocationPage, BlogPost, FAQ, Review.
- Webhooks: content publish triggers rebuilds or ISR revalidation.

### Automated Testing Suites
- Unit/Integration: Vitest/Jest + Testing Library.
- E2E: Playwright with device profiles; visual regression snapshots.
- Accessibility: Axe automated checks + keyboard navigation tests.
- Performance: Lighthouse CI with thresholds and budgets.

### Analytics Stack
- GTM data layer in code; server‑side GA4 (Johannesburg); Pixels; Hotjar heatmaps.
- Event taxonomy includes CTA clicks, scroll depth, form submissions, checkout funnel steps.

### Security Tooling
- Static analysis and dependency scanning (Snyk). Dynamic scans (OWASP ZAP in CI).
- CSP generator and monitor; secret scanning; rate‑limit policies.

### CI/CD & Hosting
- GitHub Actions: multi‑stage pipeline (lint, test, build, scan, lighthouse, axe, deploy).
- Hosting: Vercel (recommended) with preview deployments, environment promotion.
- Feature flags and canary releases; automated rollback on failed health checks.

---

## Agile Autonomy Framework

### Backlog Creation (Automated Requirement Gathering)
- Ingests internal documents: Skills‑2, website audit, comprehensive audit; extracts tasks.
- Produces epics: Service funnels (design/print/branding/signage/digital), Quote & Pricing, Electronics webstore (supporting), Analytics/CRO, SEO/AEO, Accessibility, Performance, Email automation, Ops.
- Generates sprint plans with acceptance criteria and measurable KPIs.

### Sprint Execution (Autonomous)
- Agents pick tasks, create/diff changes, run tests, and submit artifacts to CI.
- Progress gates enforce: tests passing, performance budgets met, accessibility scores >= AA, SEO checks green.

### Continuous Improvement via ML
- Experimentation engine runs bandits/A/B for CTA positions, text, layout variants.
- Uses GA4 outcomes (conversion rate, revenue per visitor) to allocate traffic.
- Produces learnings and applies changes when statistically significant.

---

## Core Functionalities (Detailed)

### 1) Automated Requirement Gathering & Analysis
- Parse docs to extract: required pages (`/home`, `/services`, `/about`, `/portfolio`, `/contact`), Electronics division `/store` as secondary, schemas, analytics events.
- Identify trust signals and compliance images from public repositories (EcoCash, Visa, MasterCard, ZIMRA, RBZ statements).
- Derive performance targets: mobile Lighthouse >= 90, bundle < 500KB initial.

### 2) Dynamic Content Generation
- Product descriptions and FAQs generated with brand voice; humanization heuristics; anti‑hallucination checks.
- Location pages (Harare + suburbs) with geo‑tagged images, unique copy ≥30%; service case studies and portfolio entries.
- Structured content output: conforms to CMS models; validated by SEO Agent.

### 3) Responsive Design Implementation
- Grid system and fluid typography; breakpoints 360/768/1024/1440.
- Keyboard navigability; focus management; hover/touch micro‑interactions.
 - Prioritize service discovery, pricing transparency, and quote flow accessibility.

### 4) SEO Optimization
- SSR parity; canonical tags; OpenGraph/Twitter metadata.
- Structured data: ElectronicsStore, Service, FAQPage, BreadcrumbList, Organization, Review/AggregateRating.
- Auto‑generated `sitemap.xml`, `robots.txt`.

### 5) Security Compliance
- HTTPS enforced; HSTS; CSP with allowed domains; Subresource Integrity for external scripts.
- Input sanitization; rate limiting per IP; token auth for sensitive endpoints; optional reCAPTCHA.
- Secret management via platform vault; dependency scanning and patch alerts.

### 6) Analytics Integration
- GTM data layer primitives; GA4 server‑side tagging in Johannesburg region.
- Events (business-first): lead_capture_view, quote_start, quote_submit, whatsapp_click, call_click, form_complete, service_page_view, portfolio_view.
- Store events (supporting): product_view, add_to_cart, begin_checkout, purchase.
- Privacy filters: no PII; consent management ready.

---

## CI/CD Pipelines (Reference)

### Stages
1. Validate: type-check, lint, unit/integration tests.
2. Scan: Snyk, secret scanning, OWASP ZAP baseline.
3. Build: SSR build with production configs.
4. Quality Gates: Lighthouse CI, Axe checks, bundle size budgets.
5. Deploy: staging (preview URL) → smoke tests → production promote.
6. Post‑Deploy: analytics event verification, uptime checks, benchmarks published.

### Automated Deployment Strategy
- Trunk‑based development with feature branches; preview deployments per PR.
- Canary percentage rollout; automatic rollback if error rate or LCP thresholds exceeded.
- Environment segregation: `preview`, `staging`, `production` with isolated secrets.

---

## Performance Optimization Techniques
- Image pipeline: WebP/AVIF; responsive `<picture>`; lazy‑load; critical image priority.
- Code splitting: route‑level and component‑level; `React.lazy` for non‑critical chunks.
- Preload critical fonts; font-display swap; self‑host Inter and Oswald.
- Cache headers: `Cache-Control: immutable` for hashed assets; ISR/SSG for pages with revalidation.
- Network hints: DNS prefetch, preconnect for analytics endpoints.

---

## Accessibility (WCAG 2.1 AA)
- Semantic HTML; ARIA only when necessary; roles and labels.
- Focus order; skip links; visible focus; keyboard navigation compliance.
- Color contrast enforcing brand palette; no orange hues; test contrast ratios.
- Screen reader audit for forms, navigation, product cards.
- Automated Axe checks + manual spot checks.
 - Design system constraints enforced: Royal Blue CTAs, stone neutrals, no orange hues, 44x44px touch targets, visible focus ring, reduced motion support, high contrast mode.

---

## Cross‑Browser Compatibility
- Playwright matrix: Chrome, Firefox, Edge, Safari (WebKit).
- Breakpoint visual regression snapshots; no overlapping/cropped elements.
- Touch target sizing; mobile gesture validation.

---

## Scalable Architecture Decisions
- SSR with Next.js for SEO parity and performance.
- Modular adapters: CMS, Analytics, Email, Payments.
- CDN fronting static assets; ISR for dynamic content pages.
- Feature flags for experiments and phased rollouts.

---

## Analytics & CRO
- GTM data layer standardization (`src/lib/gtm.ts` conceptually).
- GA4 events mapped to service funnel steps (lead capture, quote start/submit, order); revenue attribution; cohort analysis.
- Ethical A/B testing for CTAs/checkout and quote flows; Hotjar heatmaps for qualitative.

---

## Email Automation
- Client-side hook with zod validation; serverless endpoint (rate limit, sanitize, optional bearer token, optional reCAPTCHA); SendGrid transactional templates.
- Optional n8n webhook for lead routing by BANT tiers.

---

## Error Recovery & Troubleshooting
- Circuit breakers and retries for network calls.
- Auto‑rollback on failing health checks; restore previous stable version.
- Incident creation; Slack/Teams notifications; on‑call rotation (virtual).

---

## Real‑Time Progress Reporting
- Agent Ops Dashboard (web UI or CLI) with phase/status, percent complete, current gate results.
- Publish logs, benchmarks (Lighthouse/axe), and deployment links.
- Webhooks to Slack/Teams for milestone events.

---

## Production Deliverables
- Complete documentation (this spec + configuration runbook).
- Performance benchmarks (Lighthouse CI reports) meeting ≥90 mobile score.
- Accessibility compliance (WCAG 2.1 AA) documented.
- Cross‑browser compatibility validated with visual regression tests.
- Scalable SSR architecture with CI/CD and rollback.

---

## Operations Guide: Configure, Run, Monitor, Recover

### Configure
- Secrets: GA4 server‑side keys (Johannesburg), SendGrid API key, CMS tokens, analytics pixels.
- Brand tokens: primary `#4169e1`, Inter/Oswald fonts, stone neutrals; disallow orange hues.
- CMS schemas for Product, Category, Location, FAQ, Review.
 - CRM connector and quoting models; SLA targets for service delivery.

### Run
- Orchestrator starts phase machine; specialist agents consume backlog.
- CI/CD triggers on change; preview deployments for validation.
 - Services & Quoting Agent activates service funnels; Order Management Agent tracks production and delivery.

### Monitor
- Dashboard shows phase status; Sentry error rate; Lighthouse budgets; Axe accessibility results.
- Analytics pipeline verifies event integrity and funnel conversion targets.
 - CRM sync health; quote aging and SLA alerts; WhatsApp/phone contact volumes.

### Recover
- On failure, rollback; quarantine bad artifacts; retry with backoff.
- Auto open incident report; capture diagnostics; propose remediation task.

---

## Audit Checklists & Templates

### Performance Benchmark Template
- KPIs: LCP, INP, CLS, TTFB, Total JS size.
- Targets: LCP <= 2.5s; INP <= 200ms; CLS <= 0.1; JS < 500KB initial.
- Tools: Lighthouse CI, WebPageTest; report links attached.

### Accessibility Checklist
- Keyboard navigability; focus management; alt text; ARIA roles; contrast.
- Axe suite passes across pages; manual screen reader checks.

### SEO/AEO Checklist
- SSR parity verified; structured data (ElectronicsStore, Service, FAQPage, BreadcrumbList, Organization, Reviews) valid in Rich Results Test.
- `sitemap.xml` includes all routes; `robots.txt` allows crawling; canonical/OG/Twitter tags set.

### Analytics & CRO Checklist
- GTM events mapped; GA4 server-side working (Johannesburg); pixels firing.
- Funnel goals defined; A/B test plan; Hotjar heatmap coverage.

### Security Checklist
- HTTPS/HSTS/CSP; input sanitization; rate limiting; secrets rotated; dependency scans.

---

## Implementation Roadmap (Autonomous)

### Week 1: Foundation
- Backlog generation from audits; brand tokens; SSR scaffold; core routes (`/services`, `/about`, `/portfolio`, `/contact`); add `/store` as Electronics division route.

### Week 2: Conversion Optimization
- Trust signals; social proof; CTA A/B experiments; pricing transparency; optimize quote flows and WhatsApp contact.

### Week 3: Analytics & A/B Testing
- GTM data layer; GA4 server-side; Hotjar; initial experiments live; measure lead→quote→order funnel conversion.

### Week 4: Email Automation & Performance
- SendGrid templates; serverless email endpoint; image optimization; code splitting; order status emails and follow-up nudges.

### Week 5+: Monitor, Optimize, Scale
- Funnel analytics; heatmaps; subscription offerings; retainer packages; affiliate program; CRM sync and production scheduling.

---

## Appendix: Configuration Examples (Conceptual)

### GA4 Server-Side (Johannesburg)
- Property configured for ZA region; server-side container receives events from site; validates and forwards to GA4.

### Structured Data Examples (Conceptual)
- Service schema for core offerings; FAQPage for common questions; BreadcrumbList for navigation; Organization with enhanced company data; ElectronicsStore for the supporting division with products and reviews.

### Payment & Compliance Notes
- EcoCash integration and other payment logos displayed; ZIMRA VAT and RBZ forex disclaimers in footer; privacy and data handling aligned to local regulations; display compliance badges and certifications on service pages.

---

## Success Criteria
- Mobile Lighthouse ≥ 90; accessibility AA; SEO rich results validated.
- Business KPIs met: quote completion ≥ 35%, lead capture ≥ 15%, repeat orders ≥ +60%, AOV ≥ +35%.
- Conversion funnel events tracked end‑to‑end (lead→quote→order); revenue per visitor reported.
- No orange hues in UI; brand identity consistent.
- Autonomous cycles continue to learn and improve based on analytics outcomes.
