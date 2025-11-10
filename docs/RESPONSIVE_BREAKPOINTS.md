# Responsive Breakpoints

This site targets three primary breakpoints to ensure a consistent, accessible experience across mobile and tablet devices.

## Breakpoints
- Mobile: `max-width: 480px`
- Small Tablets: `min-width: 481px` and `max-width: 768px`
- Larger Tablets: `min-width: 769px` and `max-width: 1024px`

## Rationale
- Mobile (≤480px): Optimize tap targets (≥48×48px), full‑width form fields, reduced spacing, and image/video scaling to avoid overflow and horizontal scrolling.
- Small Tablets (481–768px): Maintain accessible tap targets, increase container padding for readability, and allow navigation to wrap when needed.
- Larger Tablets (769–1024px): Slightly increase base font size, widen container padding, and preserve clear visual hierarchy.

## Implementation Notes
- Global rules to prevent horizontal scrolling: `body { overflow-x: hidden; }`.
- All media elements scale within their containers: `picture, img, video, canvas, svg { max-width: 100%; height: auto; }`.
- Mobile/Tablet accessibility: `.touch-target { min-height: 48px; min-width: 48px; }`.
- Motion sensitivity: `@media (prefers-reduced-motion: reduce) { ... }` to reduce animation durations.

## Components Touched
- `src/components/TimedCarousel.tsx`: Adjusted heading sizes, left offset, progress width, and image loading attributes.
- `src/index.css`: Appended organized media queries for the three target breakpoints.

## Testing Guidance
- Use Chrome DevTools device emulator for iPhone SE/12, Pixel 5, iPad Mini/Air.
- Validate tap targets with the Accessibility panel; ensure elements ≥48×48px.
- Confirm no horizontal scroll at all widths.
- Audit with Lighthouse (Mobile) aiming for ≥90 score.

