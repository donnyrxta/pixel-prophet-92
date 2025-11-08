# Image Sourcing Guide
## SohoConnect - Official Brand Assets & Image Sources

**Last Updated**: November 8, 2025

---

## 🎯 Purpose

This guide documents where to source images for the SohoConnect website, ensuring:
- Legal compliance (proper licenses)
- Brand consistency
- Performance optimization
- SEO/AEO alignment

---

## 📌 Payment & Trust Logos

### EcoCash
**Source**: Econet Wireless Zimbabwe Official Media Kit
- **URL**: Contact Econet Wireless for official merchant assets
- **File Format**: PNG with transparent background
- **Size**: 200×80px recommended
- **License**: Free for verified merchants
- **Usage**: Checkout page, footer payment badges
- **Color**: Keep official EcoCash green (#00B140)

### Visa
**Source**: Visa Brand Center
- **URL**: https://brand.visa.com/en_US/home.html
- **Login**: Required (free merchant account)
- **File Format**: SVG or PNG
- **Size**: 60×40px minimum
- **License**: Free for Visa-accepting merchants
- **Usage**: Checkout page, footer payment badges
- **Guidelines**: Maintain clear space, don't modify logo

### MasterCard
**Source**: MasterCard Brand Center
- **URL**: https://brand.mastercard.com/
- **Login**: Required (free merchant account)
- **File Format**: SVG or PNG
- **Size**: 60×40px minimum
- **License**: Free for MasterCard-accepting merchants
- **Usage**: Checkout page, footer payment badges
- **Guidelines**: Use official colors, maintain aspect ratio

---

## 🌍 Product & Service Images

### Electronics Division (Smartphones, CCTV, Tech Accessories)

**Primary Sources**:
1. **Unsplash** (https://unsplash.com)
   - **Keywords**: "smartphone business", "CCTV installation office", "laptop workspace", "tech accessories flat lay"
   - **License**: Free for commercial use
   - **Attribution**: Not required (but recommended)
   - **Optimization**: Compress to WebP, ≤200KB

2. **Pexels** (https://pexels.com)
   - **Keywords**: "office electronics", "business phone", "security camera system"
   - **License**: Free for commercial use
   - **Attribution**: Not required (but recommended)
   - **Optimization**: Use `<picture>` with WebP

3. **Pixabay** (https://pixabay.com)
   - **Keywords**: "electronics", "technology", "office equipment"
   - **License**: Free for commercial use
   - **Attribution**: Not required
   - **Optimization**: Compress before upload

**SEO Best Practices**:
- Add descriptive `alt` text: e.g., "SohoConnect CCTV system installed in Harare office"
- Geo-tag images where possible (especially for location pages)
- Use actual product photos when available

---

### Business Consumables (Printing, Stationery, Office Supplies)

**Primary Sources**:
1. **Pexels**
   - **Keywords**: "office stationery", "business printing", "branding materials desk"
   - **License**: Free for commercial use

2. **StockSnap.io** (https://stocksnap.io)
   - **Keywords**: "modern business visuals", "workspace setup"
   - **License**: CC0 (public domain)

3. **Unsplash**
   - **Keywords**: "printing press", "business cards", "brochure design"

**Usage Guidelines**:
- Prefer realistic usage scenes (people using products)
- Match brand colors where possible (Royal Blue #4169e1)
- Show professional, Harare-appropriate settings

---

### Branding & Marketing

**Primary Sources**:
1. **Unsplash**
   - **Keywords**: "business team meeting branding", "marketing campaign", "exhibition stand"

2. **Pexels**
   - **Keywords**: "events", "exhibitions", "customer engagement retail"

3. **Pixabay**
   - **Keywords**: "marketing funnel icons", "business charts"

**AIDA Funnel Alignment**:
- **Attention**: Eye-catching hero images
- **Interest**: Product detail shots
- **Desire**: Lifestyle/usage scenes
- **Action**: Clear CTA imagery

---

## 🇿🇼 Zimbabwe-Specific Content

### Location Pages (Harare, Bulawayo, Gweru, Mutare)

**Primary Sources**:
1. **Unsplash**
   - **Keywords**: "Harare city business", "Zimbabwe office workspace", "African tech startup"

2. **Pexels**
   - **Keywords**: "urban Zimbabwe", "local retail electronics"

3. **Commissioned Photography** (Recommended)
   - **Vendor**: Local Harare photographers
   - **Benefits**: Authentic, unique content (≥30% unique requirement for SEO)
   - **Budget**: $200-500/session
   - **Usage**: Geo-tagged, exclusive rights

**Compliance**:
- Ensure ≥30% unique content on location pages (per whitehat playbook)
- Geo-tag all local photos for SEO
- Show realistic Harare/Zimbabwe context

---

## 🎨 Brand Assets (Internal)

### Existing Assets (Already in `/public/images/brand/`)
- ✅ `logo-color-icon.png` - Primary logo with color
- ✅ `logo-icon.png` - Monochrome logo
- ✅ `favicon.ico` - Browser favicon
- ✅ `favicon.svg` - Scalable favicon
- ✅ `apple-touch-icon.png` - iOS app icon

### Needed Assets
- [ ] EcoCash payment logo
- [ ] Visa payment logo
- [ ] MasterCard payment logo
- [ ] ZIMRA compliance badge (if available)
- [ ] RBZ-approved forex disclaimer graphic (optional)

---

## 🔧 Optimization Workflow

### 1. Source Image
- Download from approved repository
- Check license compatibility
- Verify resolution (≥1920px wide for hero images)

### 2. Optimize
```bash
# Convert to WebP
cwebp -q 85 input.jpg -o output.webp

# Or use online tool: squoosh.app
```

### 3. Implement
```tsx
<picture>
  <source srcset="/images/product.webp" type="image/webp" />
  <img
    src="/images/product.jpg"
    alt="Descriptive alt text with location"
    loading="lazy"
    width="800"
    height="600"
  />
</picture>
```

### 4. Document
- Add to this guide under appropriate section
- Note source URL, license, date downloaded
- Track in `public/images/README.md` (if created)

---

## 📊 Image Inventory

### Current Public Images

#### Hero Images (`/public/images/hero/`)
- `charlesdeluvio-Lks7vei-eAg-unsplash.jpg` (Unsplash)
- `tanaka-malote-V3VKKSayZP0-unsplash.jpg` (Unsplash)

**Action Items**:
- [ ] Convert to WebP
- [ ] Add Zimbabwe-specific hero images
- [ ] Commission local photography

#### Client Logos (`/public/images/clients/`)
- Various client logos (with permission)

**Action Items**:
- [ ] Verify usage rights for all client logos
- [ ] Optimize file sizes
- [ ] Add new clients with logo permissions

---

## ✅ Compliance Checklist

Before adding any image to the site:
- [ ] License allows commercial use
- [ ] Attribution provided (if required)
- [ ] Image optimized (≤200KB for standard images)
- [ ] Alt text added (SEO + accessibility)
- [ ] Source documented in this guide
- [ ] No misleading stock imagery (Google penalty risk)
- [ ] Geo-tagged (for location pages)
- [ ] WebP format with JPG/PNG fallback

---

## 🔗 Quick Reference Links

**Free Stock Images**:
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com
- StockSnap.io: https://stocksnap.io

**Payment Logo Sources**:
- Visa Brand Center: https://brand.visa.com
- MasterCard Brand Center: https://brand.mastercard.com
- EcoCash: Contact Econet Wireless

**Optimization Tools**:
- Squoosh: https://squoosh.app
- TinyPNG: https://tinypng.com
- SVGOMG: https://jakearchibald.github.io/svgomg/

**SEO Tools**:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Lighthouse: Built into Chrome DevTools

---

## 📝 Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-11-08 | Initial guide creation | Claude Code |
| | | |
| | | |

---

**Maintained By**: SohoConnect Development Team
**Review Cycle**: Monthly (ensure all sources/licenses remain valid)
**Questions**: Update this guide via pull request

---

**Bottom Line**: This guide ensures SohoConnect sources images legally, optimizes for performance, and maintains SEO/brand standards. All team members must reference this before adding images to the website.
