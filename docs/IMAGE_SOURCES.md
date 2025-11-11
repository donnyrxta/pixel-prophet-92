# Image Sourcing Documentation
**SohoConnect Website - Asset Transparency & Attribution**

## Purpose
This document tracks all images used on the SohoConnect website, ensuring compliance with licensing requirements and providing transparency for maintenance and updates.

---

## 📌 Sourcing Principles

1. **License Compliance**: Only use images with proper commercial licenses
2. **Attribution**: Provide credit where required by license terms
3. **Optimization**: All images compressed and served as WebP where possible
4. **Accessibility**: Every image has descriptive alt text
5. **Performance**: Lazy loading enabled for all non-critical images

---

## 🖼️ Image Inventory

### Electronics Division

#### Smartphones
- **File**: `/public/images/electronics/iphone-business.jpg`
- **Source**: Unsplash
- **URL**: https://unsplash.com/photos/person-holding-black-iphone-5-gTs2w7bu3Qo
- **Photographer**: Tyler Lastovich
- **License**: Unsplash License (Free for commercial use)
- **Usage**: Product cards, category banners
- **Alt Text**: "Professional smartphone for business use in Harare office"
- **Optimization**: 800px width, ~180KB, WebP fallback

#### CCTV Systems
- **File**: `/public/images/electronics/cctv-security.jpg`
- **Source**: Unsplash
- **URL**: https://unsplash.com/photos/white-and-black-camera-on-white-wall-bcSc_XAfc7w
- **Photographer**: Bernard Hermant
- **License**: Unsplash License (Free for commercial use)
- **Usage**: Security system showcases, category pages
- **Alt Text**: "CCTV security camera installation for Harare businesses"
- **Optimization**: 800px width, ~165KB, WebP fallback

#### Laptops & Workstations
- **File**: `/public/images/electronics/laptop-workspace.jpg`
- **Source**: Unsplash
- **URL**: https://unsplash.com/photos/macbook-pro-on-brown-wooden-table-Hin-rzhOdWs
- **Photographer**: XPS
- **License**: Unsplash License (Free for commercial use)
- **Usage**: Tech accessories section, homepage hero
- **Alt Text**: "Modern laptop workspace setup for Zimbabwe professionals"
- **Optimization**: 800px width, ~195KB, WebP fallback

---

### Business Consumables

#### Office Supplies
- **File**: `/public/images/business/office-desk.jpg`
- **Source**: Unsplash
- **URL**: https://unsplash.com/photos/white-printer-paper-on-brown-wooden-table-w7ZyuGYNpRQ
- **Photographer**: Bench Accounting
- **License**: Unsplash License (Free for commercial use)
- **Usage**: Stationery, office consumables section
- **Alt Text**: "Professional office desk with business stationery and supplies"
- **Optimization**: 800px width, ~172KB, WebP fallback

#### Printing Services
- **File**: `/public/images/business/printing-press.jpg`
- **Source**: Unsplash
- **URL**: https://unsplash.com/photos/white-printing-paper-with-numbers-TqOEyiq6H8k
- **Photographer**: Bank Phrom
- **License**: Unsplash License (Free for commercial use)
- **Usage**: Printing services, commercial print section
- **Alt Text**: "Professional printing press for business materials in Harare"
- **Optimization**: 800px width, ~188KB, WebP fallback

---

### Location-Specific

#### Harare Context
- **File**: `/public/images/harare/office-workspace.jpg`
- **Source**: Unsplash
- **URL**: https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-QckxruozjRg
- **Photographer**: Marvin Meyer
- **License**: Unsplash License (Free for commercial use)
- **Usage**: Location pages, about section, team imagery
- **Alt Text**: "Modern office workspace in Harare, Zimbabwe"
- **Optimization**: 800px width, ~201KB, WebP fallback
- **Geo-tagging**: Harare, Zimbabwe (added in metadata)

---

### Trust Signals & Logos

#### Payment Method Logos
- **Visa Logo**
  - **File**: `/public/images/trust/visa-logo.svg`
  - **Source**: Custom SVG (brand guidelines compliant)
  - **License**: Trademark usage under payment processor agreement
  - **Usage**: Checkout page, footer trust badges
  - **Format**: SVG (scalable)

- **Mastercard Logo**
  - **File**: `/public/images/trust/mastercard-logo.svg`
  - **Source**: Custom SVG (brand guidelines compliant)
  - **License**: Trademark usage under payment processor agreement
  - **Usage**: Checkout page, footer trust badges
  - **Format**: SVG (scalable)

- **EcoCash Logo**
  - **File**: `/public/images/trust/ecocash-logo.svg`
  - **Source**: Custom SVG (brand representation)
  - **License**: Commercial use (Zimbabwe payment platform)
  - **Usage**: Checkout page, footer trust badges, payment options
  - **Format**: SVG (scalable)

---

## 🔧 Technical Implementation

### Image Optimization
```html
<!-- Responsive image with WebP -->
<picture>
  <source srcset="/images/electronics/iphone-business.webp" type="image/webp">
  <img 
    src="/images/electronics/iphone-business.jpg" 
    alt="Professional smartphone for business use in Harare office"
    loading="lazy"
    width="800"
    height="600"
  >
</picture>
```

### Lazy Loading
All images use `loading="lazy"` except:
- Above-the-fold hero images
- Logo/branding elements
- Critical UI components

### CDN Integration
- Images served via Vercel CDN with automatic optimization
- Brotli compression enabled
- Cache-Control headers: `immutable` for versioned assets

---

## 📊 Performance Targets

- **Lighthouse Score**: ≥90 on all metrics
- **Max Image Size**: 200KB per image
- **Format**: WebP with JPG fallback
- **Compression**: 85% quality for photos
- **Lazy Load**: All below-the-fold images

---

## 🔄 Update Process

1. Source new images from approved repositories (Unsplash, Pexels, Pixabay)
2. Verify license compatibility (commercial use allowed)
3. Download at optimal resolution (800-1200px width)
4. Compress using ImageOptim or similar (target 85% quality)
5. Add to appropriate `/public/images/` subdirectory
6. Update this document with metadata
7. Add descriptive alt text in component code
8. Test performance impact with Lighthouse

---

## 📝 Compliance Notes

### GDPR/Privacy
- No personal data or faces used without consent
- Stock images used for representation only
- No user-uploaded content without proper rights

### Trademark Usage
- Payment logos used under commercial agreement
- No modification of brand logos
- Proper trademark notices in footer

### Zimbabwe Compliance
- Geo-tagged images for local SEO
- Harare location emphasized in alt text
- RBZ forex disclaimer on pricing pages

---

## 📚 Resources

- **Unsplash**: https://unsplash.com (License: https://unsplash.com/license)
- **Pexels**: https://pexels.com (License: https://www.pexels.com/license/)
- **Pixabay**: https://pixabay.com (License: https://pixabay.com/service/license/)
- **Image Optimization**: https://imageoptim.com
- **WebP Conversion**: https://squoosh.app

---

**Last Updated**: 2025-01-09  
**Maintained By**: SohoConnect Development Team  
**Contact**: dev@sohoconnect.co.zw
