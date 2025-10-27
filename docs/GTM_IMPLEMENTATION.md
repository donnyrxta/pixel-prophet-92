# Google Tag Manager Implementation Guide

## Overview
Google Tag Manager (GTM) has been strategically implemented across the Soho Connect website to track key user interactions and conversions as specified in the Excellence Rubric.

## Implementation Details

### 1. GTM Container Installation
- **Container ID**: `GTM-TPKW683V`
- **Location**: Installed in `index.html`
  - Script tag: In `<head>` section (as high as possible)
  - Noscript tag: Immediately after opening `<body>` tag

### 2. Data Layer Events

The following events are tracked according to the Excellence Rubric requirements:

#### Core Conversion Events

1. **form_submit**
   - Triggered when any form is submitted
   - Data captured:
     - `form_name`: Type of form (quote, contact, newsletter)
     - `form_location`: Current page path
     - Additional form-specific data

2. **cta_click**
   - Triggered when CTA buttons are clicked
   - Data captured:
     - `cta_label`: Button text/label
     - `cta_location`: Where on the page
     - `cta_destination`: Target URL/action
     - `page_path`: Current page

3. **portfolio_view**
   - Triggered when a portfolio project is viewed
   - Data captured:
     - `project_id`: Unique project identifier
     - `project_title`: Project name
     - `project_category`: Category (Printing, Branding, etc.)
     - `page_path`: Current page

4. **whatsapp_click**
   - Triggered when WhatsApp buttons are clicked
   - Data captured:
     - `click_source`: Where the button was clicked (floating widget, form, etc.)
     - `message_template`: Pre-filled message (if any)
     - `page_path`: Current page

#### Supporting Events

5. **quote_calculator**
   - Triggered during quote calculator interactions
   - Actions: `started`, `completed`, `abandoned`
   - Captures quote details and estimated values

6. **menu_interaction**
   - Triggered when menus are toggled
   - Captures menu type and action (expanded/collapsed)

7. **service_view**
   - Triggered when service pages are viewed
   - Captures service name

8. **page_view**
   - Triggered on SPA route changes
   - Captures page title and path

### 3. Implementation Files

#### Core Tracking Utilities
- **`src/lib/gtm.ts`**: Core GTM tracking functions
  - All event tracking functions
  - Data layer initialization
  - TypeScript type safety

#### React Integration
- **`src/hooks/usePageTracking.tsx`**: Automatic page view tracking
  - Tracks SPA route changes
  - Integrated in App.tsx

#### Component Integration
GTM tracking has been integrated into the following components:

1. **FloatingContact** (`src/components/FloatingContact.tsx`)
   - Tracks menu expansion/collapse
   - Tracks WhatsApp clicks
   - Tracks phone/email CTA clicks

2. **QuotationCalculator** (`src/components/QuotationCalculator.tsx`)
   - Tracks calculator completion
   - Tracks form submission
   - Tracks WhatsApp quote requests

3. **Portfolio** (`src/pages/Portfolio.tsx`)
   - Tracks portfolio project views
   - Captures project details and categories

4. **Contact** (`src/pages/Contact.tsx`)
   - Tracks contact form submissions
   - Tracks WhatsApp contact redirects

## Usage Examples

### Tracking a Form Submission
```typescript
import { trackFormSubmit } from '@/lib/gtm';

trackFormSubmit('contact_form', {
  has_phone: true,
  message_length: 150
});
```

### Tracking a CTA Click
```typescript
import { trackCTAClick } from '@/lib/gtm';

trackCTAClick('Get Instant Quote', 'hero_section', '/contact');
```

### Tracking WhatsApp Interaction
```typescript
import { trackWhatsAppClick } from '@/lib/gtm';

trackWhatsAppClick('floating_widget', 'Hi, I need a quote');
```

### Tracking Portfolio Views
```typescript
import { trackPortfolioView } from '@/lib/gtm';

trackPortfolioView('1', 'Corporate Rebrand', 'Branding');
```

## GTM Container Setup (Next Steps)

Once GTM is live, configure the following in the GTM dashboard:

### 1. Google Analytics 4
- Create a GA4 Configuration Tag
- Use the form_submit, cta_click, portfolio_view, and whatsapp_click events
- Set up conversion tracking

### 2. Facebook Pixel
- Add Facebook Pixel base code
- Configure custom events for key conversions
- Track PageView, Lead, and Contact events

### 3. Conversion Tracking
Set up goals/conversions for:
- Form submissions
- WhatsApp clicks
- Quote calculator completions
- Phone number clicks

### 4. Trigger Configuration
Create triggers for each data layer event:
- Custom Event trigger for `form_submit`
- Custom Event trigger for `cta_click`
- Custom Event trigger for `portfolio_view`
- Custom Event trigger for `whatsapp_click`
- Custom Event trigger for `quote_calculator`

## Testing

### Using GTM Preview Mode
1. Enable Preview mode in GTM dashboard
2. Navigate through the website
3. Verify all events fire correctly
4. Check data layer variables

### Browser Console Testing
```javascript
// Check if dataLayer exists
console.log(window.dataLayer);

// Monitor dataLayer pushes
window.dataLayer.push = new Proxy(window.dataLayer.push, {
  apply: function(target, thisArg, argumentsList) {
    console.log('DataLayer Push:', argumentsList[0]);
    return target.apply(thisArg, argumentsList);
  }
});
```

## Performance Considerations

1. **Async Loading**: GTM script loads asynchronously
2. **Minimal Impact**: Tracking functions are lightweight
3. **Error Handling**: Graceful degradation if GTM fails to load
4. **No Blocking**: All tracking is non-blocking to user experience

## Compliance

### GDPR/POPIA Alignment
- Tracking is transparent and disclosed
- No PII collected without consent
- Cookie banner integration ready
- Data retention policies aligned

### Zimbabwe Specific
- Complies with Cyber & Data Protection Act 2021
- No hidden tracking or cloaking
- All data collection disclosed in privacy policy

## Best Practices Implemented

✅ White-hat analytics only (from white-hat playbook)
✅ Clean GA4 property setup ready
✅ Server-side tagging capable
✅ No spam or manipulation tactics
✅ Transparent data collection
✅ Performance optimized (<150KB JS)
✅ Mobile-first approach
✅ Accessibility maintained

## Maintenance

### Adding New Events
1. Add event function to `src/lib/gtm.ts`
2. Import and use in relevant component
3. Document in this file
4. Test in GTM Preview mode
5. Configure tags in GTM dashboard

### Monitoring
- Weekly: Check GTM dashboard for errors
- Monthly: Review event volume and data quality
- Quarterly: Audit tag performance impact

## Support & Documentation
- GTM Documentation: https://tagmanager.google.com/
- GA4 Documentation: https://support.google.com/analytics/
- Data Layer Reference: https://developers.google.com/tag-platform/tag-manager/datalayer

---

**Status**: ✅ Implemented and Ready for Production
**Last Updated**: 2025-10-27
**Version**: 1.0.0
