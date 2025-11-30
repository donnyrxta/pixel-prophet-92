# Strategic Roadmap & Sprint Checklist

## Executive Summary
Based on the codebase analysis, the application is a modern React (Vite) SPA with a solid foundation for SEO (React Helmet, Schema.org) and Performance (Vite, Radix UI). However, there are gaps in advanced tracking, dynamic SEO generation for e-commerce, and comprehensive accessibility validation.

## Critical Dimensions Analysis

### 1. User Experience (UX)
*   **Current State**: Good use of semantic HTML and ARIA labels. "Skip to main content" is present.
*   **Gap**: No automated accessibility testing in CI.
*   **Action**: Add `axe-core` or similar for automated a11y testing.

### 2. Conversion Optimization
*   **Current State**: GTM is installed.
*   **Gap**: Missing Heatmap/Session Recording tools (Hotjar/FullStory) as requested.
*   **Action**: Implement Hotjar tracking script.

### 3. Technical SEO
*   **Current State**: `sitemap.xml` is manual and likely stale. `robots.txt` is standard. Meta tags are present.
*   **Gap**: Dynamic sitemap generation for new products/categories is missing.
*   **Action**: Create a build script (`generate-sitemap.mjs`) to auto-generate `sitemap.xml` based on `webstore-products.ts`.

### 4. Performance
*   **Current State**: Using `vite-plugin-imagemin`. Images are lazy-loaded.
*   **Gap**: External images (Pexels) might slow down LCP.
*   **Action**: Ensure `vite` config has proper chunk splitting.

### 5. Analytics
*   **Current State**: Basic PageView tracking via GTM.
*   **Gap**: Enhanced E-commerce events (add_to_cart, purchase) need verification.

---

## Sprint Checklist (Immediate Fixes)

### High Priority (Ship immediately)
- [ ] **Technical SEO**: Create `scripts/generate-sitemap.mjs` to dynamically build `sitemap.xml` from product data.
- [ ] **Analytics**: Implement `Hotjar` tracking code via a reusable hook/component.
- [ ] **Performance**: optimize `vite.config.ts` for better chunk splitting (manual chunks for vendor libs).
- [ ] **SEO**: Verify `canonical` tags on all dynamic product pages.

### Medium Priority
- [ ] **UX**: Add a "Back to Top" button for long product listing pages.
- [ ] **Conversion**: Add "Sticky Add to Cart" on mobile product pages.

## Implementation Plan

I will now proceed to implement the **High Priority** items:
1.  **Dynamic Sitemap Generator**: To ensure all your products are indexed by Google.
2.  **Hotjar Integration**: To start collecting user behavior data for the "UX Deep Dive".
3.  **Vite Optimization**: To ensure the best loading performance.
