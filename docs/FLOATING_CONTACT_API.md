# Floating Contact Widget - API Documentation

## Component Overview

The `FloatingContact` component is a sophisticated, collapsible contact menu widget that provides users with quick access to multiple communication channels.

## Features

- ✅ **Responsive Design**: Auto-expands on desktop, collapses on mobile/tablet
- ✅ **Glassmorphic UI**: Modern translucent design with backdrop blur
- ✅ **Scroll Intelligence**: Hides on scroll down, shows on scroll up
- ✅ **Full Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- ✅ **Analytics Ready**: Built-in event tracking for user interactions
- ✅ **Performance Optimized**: 60fps animations with GPU acceleration

## Usage

### Basic Implementation

```tsx
import FloatingContact from '@/components/FloatingContact';

function MyPage() {
  return (
    <div>
      {/* Your page content */}
      <FloatingContact />
    </div>
  );
}
```

### With Custom Contact Info

The component automatically uses contact information from `@/lib/constants`:

```typescript
// src/lib/constants.ts
export const CONTACT_INFO = {
  phone: "+263714570414",
  whatsappNumber: "263714570414",
  email: "info@sohoconnect.co.zw",
  // ...
};
```

## Component Structure

### State Management

```typescript
const [isExpanded, setIsExpanded] = useState(false);    // Menu state
const [isVisible, setIsVisible] = useState(true);       // Visibility on scroll
const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
```

### Contact Options Configuration

```typescript
interface ContactOption {
  id: string;              // Unique identifier for analytics
  label: string;           // Display label
  icon: LucideIcon;        // Icon component
  href: string;            // Link destination
  color: string;           // Tailwind color classes
  ariaLabel: string;       // Accessibility label
  target?: string;         // Link target (_blank for external)
  rel?: string;            // Link relationship
}
```

## Responsive Breakpoints

| Screen Size | Behavior | Initial State |
|-------------|----------|---------------|
| Desktop (≥1024px) | Auto-expands on load | Expanded |
| Tablet (768-1023px) | Manual toggle only | Collapsed |
| Mobile (<768px) | Auto-hide on scroll | Collapsed |

## Animation Timings

| Animation | Duration | Easing | Purpose |
|-----------|----------|--------|---------|
| Expand/Collapse | 300ms | ease-in-out | Menu state transition |
| Stagger | 50ms | ease-in-out | Sequential reveal |
| Scale | 300ms | ease-in-out | Hover effect |
| Fade | 300ms | ease-in-out | Visibility change |
| Pulse | 2s | infinite | Scroll indicator |

## Accessibility Features

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate through options |
| `Shift + Tab` | Navigate backwards |
| `Enter` / `Space` | Toggle menu or activate link |
| `Escape` | Close menu and return focus |

### ARIA Attributes

```html
<!-- Toggle Button -->
<button
  aria-label="Open contact menu"
  aria-expanded="false"
  aria-controls="floating-contact-menu"
  data-contact-toggle
>

<!-- Menu Container -->
<div
  role="complementary"
  aria-label="Floating contact menu"
>

<!-- Live Region -->
<div role="status" aria-live="polite">
  Contact menu expanded
</div>
```

### Screen Reader Support

- **State announcements**: Menu state changes are announced
- **Descriptive labels**: All interactive elements have clear labels
- **Hidden decorative elements**: Icons marked with `aria-hidden="true"`

## Analytics Integration

### Event Tracking

The component includes built-in analytics tracking:

```typescript
// Toggle event
trackInteraction('toggle_contact_menu', 'expanded' | 'collapsed');

// Contact click event
trackInteraction('contact_click', 'whatsapp' | 'phone' | 'email');
```

### Google Analytics 4 Integration

```typescript
// Automatically tracks events if gtag is available
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', action, {
    event_category: 'Contact Widget',
    event_label: label
  });
}
```

### Custom Analytics Provider

To integrate with a different analytics provider, modify the `trackInteraction` function:

```typescript
const trackInteraction = (action: string, label: string) => {
  // Your custom analytics implementation
  yourAnalytics.track({
    event: action,
    category: 'Contact Widget',
    label: label,
    timestamp: Date.now()
  });
};
```

## Scroll Behavior

### IntersectionObserver Implementation

The component uses `requestAnimationFrame` for throttled scroll detection:

```typescript
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  // Hide on scroll down beyond 100px
  if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
    setScrollDirection('down');
    if (window.innerWidth < 1024) {
      setIsVisible(false);
    }
  } else {
    setScrollDirection('up');
    setIsVisible(true);
  }
  
  lastScrollY.current = currentScrollY;
};
```

### Performance Optimization

```typescript
// Throttle with requestAnimationFrame
let ticking = false;
const scrollListener = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
};
```

## Styling & Customization

### Glassmorphic Effect

```css
.glass-effect {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Custom Colors

To customize contact option colors, modify the `contactOptions` array:

```typescript
const contactOptions: ContactOption[] = [
  {
    id: 'whatsapp',
    color: 'bg-[#25D366] hover:bg-[#20BD5A]', // WhatsApp green
    // ...
  },
  {
    id: 'phone',
    color: 'bg-primary hover:bg-primary/90', // Your primary color
    // ...
  },
  // Add more options...
];
```

### Position Customization

To change the widget position:

```tsx
<div className="fixed bottom-6 right-6 z-50">
  {/* Change bottom-6 right-6 to your preferred position */}
</div>
```

## Performance Considerations

### Bundle Size
- Component size: ~8KB
- Dependencies: lucide-react icons
- Total impact: ~12KB gzipped

### Rendering Optimization
- Uses CSS transforms for animations (GPU accelerated)
- Throttled scroll listener
- Conditional rendering based on visibility
- Lazy state updates

### Critical Rendering Path
```
1. Initial render → Collapsed state (mobile/tablet)
2. Mount effect → Check screen size
3. Auto-expand → If desktop (≥1024px)
4. Scroll listener → Throttled updates
```

## Browser Support

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome | 88+ | ✅ Full | |
| Firefox | 84+ | ✅ Full | |
| Safari | 14+ | ✅ Full | Requires `-webkit-` prefix |
| Edge | 88+ | ✅ Full | |
| Opera | 74+ | ✅ Full | |
| Samsung Internet | 14+ | ✅ Full | |
| IE11 | - | ❌ No | No backdrop-filter support |

## Troubleshooting

### Menu doesn't expand on desktop
**Solution**: Check that viewport width detection is working correctly. May need to adjust breakpoint.

### Animations are janky
**Solution**: Ensure GPU acceleration is enabled. Add `will-change: transform` to animated elements.

### Backdrop blur not working
**Solution**: Check browser support. Add vendor prefixes for Safari.

### Touch targets too small on mobile
**Solution**: Verify minimum 48px×48px. Check with Chrome DevTools mobile emulator.

### Scroll behavior not working
**Solution**: Check that scroll listener is attached. Verify `passive: true` flag is set.

## Advanced Usage

### Conditional Rendering

```tsx
// Only show on specific pages
{router.pathname !== '/checkout' && <FloatingContact />}

// Hide for logged-in users
{!user && <FloatingContact />}
```

### Custom Contact Options

```typescript
// Add a new contact method
const customOptions = [
  ...contactOptions,
  {
    id: 'telegram',
    label: 'Telegram',
    icon: MessageSquare,
    href: 'https://t.me/yourhandle',
    color: 'bg-[#0088cc] hover:bg-[#0077bb]',
    ariaLabel: 'Contact us on Telegram',
    target: '_blank',
    rel: 'noopener noreferrer'
  }
];
```

## Best Practices

1. **Always test on real devices**: Emulators don't capture touch behavior accurately
2. **Monitor analytics**: Track which contact methods are most popular
3. **A/B test positions**: Try different screen positions to optimize conversions
4. **Keep it simple**: Don't add too many contact options (3-4 max)
5. **Update contact info**: Keep `constants.ts` as single source of truth
6. **Test accessibility**: Regular audits with screen readers
7. **Performance budget**: Monitor bundle size and runtime performance

---

**Component Version**: 2.0  
**Last Updated**: 2025-01-26  
**Maintainer**: Soho Connect Dev Team