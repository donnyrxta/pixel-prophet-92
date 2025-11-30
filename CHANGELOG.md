# Changelog

## 2025-12-01 - UI Enhancements & Production Deployment

### Added
- **Micro-interactions**: Enhanced button components with hover/active states, loading indicators, and smooth transitions.
- **Story Section**: Added a new scroll-based storytelling section with "Problem", "Solution", and "Proof" segments, featuring GSAP animations and parallax effects.
- **Glassmorphism**: Implemented `.btn-glass` style for card actions, providing a modern, frosted-glass aesthetic.
- **Visual Polish**:
    - Standardized button padding and touch targets (`.btn-hero`).
    - Enhanced hero background with gradient overlays and mix-blend modes.
    - Updated typography and color palette to strictly adhere to Soho Connect's Royal Blue (`#4169e1`) branding.

### Changed
- **Button Component**: Updated `src/components/ui/button.tsx` to support `isLoading` prop and improved transition timings.
- **Header**: Increased z-index to `z-50` to ensure navigation remains accessible over animated sections.
- **StorySection**: Refined copy and animations for better performance and accessibility (respects `prefers-reduced-motion`).

### Deployment
- **Status**: Initiated deployment to Vercel Production via Git Integration.
- **Build**: Successfully built locally (`vite build`).
- **Version**: `v1.2.0` (UI & Brand Polish).

## 2025-11-10

- Fix: OrderSuccess.tsx complies with React Hooks rules-of-hooks. Consolidated conditional `useEffect` into a single unconditional effect and moved redirect logic inside the effect. Rendering is skipped while redirecting to avoid flicker. No visual UI changes expected.
- Chore: tailwind.config.ts migrated to ESM import for `tailwindcss-animate` and kept `satisfies Config` typing for strong type safety.
- Types: GTM utilities (`src/lib/gtm.ts`) now use explicit interfaces for e-commerce payloads and replace all `any` with `unknown`. Introduced `EcommerceItem` and `EcommercePayload` types; function signatures for e-commerce events accept `EcommerceItem[]` for item lists.

### Notes and Required Modifications

- If external code references GTM utilities, ensure any ad-hoc payloads passed into tracking functions are typed as `Record<string, unknown>` instead of `Record<string, any>`.
- Item arrays passed to `trackBeginCheckout` and `trackPurchase` should follow `EcommerceItem` shape. Empty arrays are valid.
- No breaking UI changes are anticipated; analytics payloads gain stricter compile-time safety.

### Verification

- Lint passes on the updated files: `src/pages/OrderSuccess.tsx`, `tailwind.config.ts`, and `src/lib/gtm.ts`.
- Repository-wide lint still reports errors in other files (e.g., `Checkout.tsx`, `ServicesDetail.tsx`). Addressing those will be scheduled next to achieve a full zero-error lint pass.
