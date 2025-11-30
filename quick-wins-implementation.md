## Quick Wins Implementation (Soho Connect Webstore)

These snippets and data blocks deliver the five priority wins: Brevo signup embeds, sticky PDP CTAs, /smartphones-harare landing, Retail Security bundle hero, and Brevo event wiring (abandon cart + quote).

---

### 1) Brevo iframe signup (Footer + Checkout Success)
Paste in the footer component and checkout success page where you want the form to appear:

```tsx
{/* Brevo Newsletter Iframe */}
<div className="mt-8">
  <iframe
    title="Newsletter signup"
    width="540"
    height="305"
    src="https://62601774.sibforms.com/serve/MUIFAENY-lF76_tMfDwFEiL3tI4yslFyf6Qc_ZTYgBIL2heSaE9FDRTRcGLGSRM7GBDCsgaVK7BwqoIqn-gqLsxvPuWkap8dEVSlCurB-o4Igc0hD4HdEC2wcZSIeYaDEaSEQHoG1MheXgI-jDoeuQH795qMgvMD1cjiZRxLgESaztTM2MnmxjT77aqf3gSDnNZ7RGDsya9ZOkyHeA=="
    frameBorder="0"
    scrolling="auto"
    allowFullScreen
    style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
  />
</div>
```

---

### 2) Sticky PDP CTAs (Request Quote + WhatsApp + Add)
Create `src/components/shop/StickyPdpCtas.tsx`:

```tsx
import { PhoneCall, MessageCircle, FileText } from 'lucide-react';

export function StickyPdpCtas({ productName, productId }: { productName: string; productId: string }) {
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${productName} (${productId}). Can you help?`);
  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="flex gap-3 rounded-2xl bg-white/80 backdrop-blur px-3 py-2 shadow-lg border border-white/40">
        <a
          href={`https://wa.me/263000000000?text=${whatsappMessage}`}
          className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-white font-semibold shadow-md hover:bg-green-600"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a
          href="#quote-form"
          className="flex items-center gap-2 rounded-xl bg-[#4169e1] px-4 py-2 text-white font-semibold shadow-md hover:bg-[#3557c5]"
        >
          <FileText className="w-4 h-4" /> Request Quote
        </a>
        <button
          onClick={() => document.getElementById('add-to-cart-btn')?.click()}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-white font-semibold shadow-md hover:bg-amber-600"
        >
          <PhoneCall className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
```

Use on every PDP (e.g., `src/pages/webstore/product/[slug].tsx`):
```tsx
<StickyPdpCtas productName={product.name} productId={product.id} />
```
Ensure your “Add to cart” button has `id="add-to-cart-btn"` and your quote form has `id="quote-form"`. Replace the WhatsApp number with your real one.

---

### 3) `/smartphones-harare` landing (10 SKUs + bulk pricing)
Add route `src/pages/smartphones-harare.tsx`:

```tsx
import { Helmet } from 'react-helmet';
import { smartphones } from '@/data/products/smartphones';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { BulkPricingTable } from '@/components/shop/BulkPricingTable';

const bulkTable = [
  { range: '3 - 4 units', price: '-5%' },
  { range: '5 - 9 units', price: '-10%' },
  { range: '10+ units', price: '-15%' },
];

export default function SmartphonesHararePage() {
  const hararePhones = smartphones.slice(0, 10).map(p => ({ ...p, cityAvailability: ['Harare'] }));
  return (
    <>
      <Helmet>
        <title>Smartphones Harare | Bulk Staff Phones | Soho Connect</title>
        <meta name="description" content="Buy smartphones in Harare with bulk discounts. Samsung, Tecno, Xiaomi, iPhone. Same-day delivery Harare." />
        <link rel="canonical" href="https://yourdomain/webstore/smartphones-harare" />
      </Helmet>

      <section className="bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-[#e8edfa] px-4 py-1 text-[#4169e1] text-sm font-medium">Harare Only</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">Smartphones Harare</h1>
            <p className="mt-2 text-lg text-gray-600">Bulk pricing for teams. Same-day delivery in Harare CBD.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12">
        <ProductGrid products={hararePhones} />
        <div className="mt-10 max-w-xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Bulk Pricing</h2>
          <BulkPricingTable rows={bulkTable} />
        </div>
      </div>
    </>
  );
}
```

Seed 10 SKUs in `src/data/products/smartphones.ts` (example set below).

---

### 4) Retail Security bundle hero ($1,499)
Extend `src/data/bundles/index.ts`:

```ts
export const bundles = [
  {
    id: 'bundle-retail-security',
    slug: 'retail-security-bundle',
    name: 'Retail Security Bundle',
    tagline: '4-camera IP kit + install + signage + UPS',
    heroImage: '/images/bundles/retail-security.jpg',
    originalPrice: 1899,
    bundlePrice: 1499,
    savings: 400,
    savingsPercent: 21,
    stockRemaining: 7,
    isFeatured: true,
    isLimitedTime: true,
    expiresAt: '2025-12-31',
    items: [
      { productId: 'cctv-kit-4cam-ip', quantity: 1, isOptional: false },
      { productId: 'cctv-installation-harare', quantity: 1, isOptional: false },
      { productId: 'signage-cctv-warning-pack', quantity: 1, isOptional: false },
      { productId: 'ups-backup-600va', quantity: 1, isOptional: true },
    ],
    features: [
      '4x 5MP IP cameras + NVR + 2TB HDD',
      'Professional installation in Harare',
      'Compliance signage included',
      'Optional UPS backup',
      'Remote viewing setup',
    ],
  },
];
```

On home page hero (e.g., `src/pages/index.tsx`):
```tsx
import { BundleCard } from '@/components/shop/BundleCard';
import { bundles } from '@/data/bundles';
const retailBundle = bundles.find(b => b.id === 'bundle-retail-security');

<section className="container mx-auto px-4 py-12">
  <div className="grid gap-8 lg:grid-cols-2 items-center">
    <div>
      <p className="text-sm font-semibold text-[#4169e1]">Featured Bundle</p>
      <h2 className="text-4xl font-bold text-gray-900 mt-2">Protect & Open Strong</h2>
      <p className="mt-3 text-gray-600">Launch or secure your retail space with CCTV, signage, and power continuity.</p>
    </div>
    {retailBundle && <BundleCard bundle={retailBundle} onAddToCart={() => {/* add logic */}} />}
  </div>
</section>
```

---

### 5) Brevo events + journeys (abandoned cart + quote)
Minimal client helper (`src/lib/brevo.ts`):

```ts
// Hardcoded per request (rotate later)
export const BREVO_API_KEY = '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';

export function loadBrevo() {
  if (typeof window === 'undefined' || (window as any).sib) return;
  const s = document.createElement('script');
  s.src = 'https://sibforms.com/forms/end-form/build/main.js';
  s.async = true;
  document.body.appendChild(s);
}

export function trackBrevo(eventName: string, payload: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !(window as any).Sib || !(window as any).Sib.track) return;
  (window as any).Sib.track(eventName, payload);
}
```

Usage examples:
```ts
trackBrevo('add_to_cart', { sku, price, qty });
trackBrevo('checkout_start', { cartValue: total });
trackBrevo('quote_submit', { productId, email });
trackBrevo('whatsapp_click', { productId });
```

Server helper (`src/server/brevo.ts`):

```ts
import fetch from 'node-fetch';
const BREVO_KEY = BREVO_API_KEY;
const API = 'https://api.brevo.com/v3';

export async function sendAbandonEmail(toEmail: string, cartLink: string) {
  await fetch(`${API}/smtp/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_KEY },
    body: JSON.stringify({
      sender: { email: 'no-reply@yourdomain.com', name: 'Soho Connect' },
      to: [{ email: toEmail }],
      subject: 'Complete your order and get free delivery',
      htmlContent: `<p>Pick up where you left off: <a href="${cartLink}">Return to cart</a></p>`,
    }),
  });
}

export async function sendQuoteFollowup(toEmail: string, quoteId: string) {
  await fetch(`${API}/smtp/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_KEY },
    body: JSON.stringify({
      sender: { email: 'sales@yourdomain.com', name: 'Soho Connect' },
      to: [{ email: toEmail }],
      subject: 'Your quote is ready',
      htmlContent: `<p>We received your quote (#${quoteId}). Reply to book install or add bundles.</p>`,
    }),
  });
}
```

Trigger logic:
- Abandon: cart updated but no order in 60 minutes → `sendAbandonEmail`.
- Quote: on quote submission → immediate `sendQuoteFollowup`.

---

### 10 sample smartphone SKUs (drop into `src/data/products/smartphones.ts`)

```ts
export const smartphones: Product[] = [
  { id:'tecno-spark-20', name:'Tecno Spark 20', category:'smartphones', subcategory:'budget', basePrice:89, brand:'Tecno',
    variants:[{id:'ts20-64-bk', sku:'TEC-20-64-BK', price:89, stock:15, attributes:{storage:'64GB', color:'Black'}}],
    images:['/images/phones/tecno-spark-20.jpg'], bulkPricing:[{minQty:3, price:84},{minQty:5, price:80}] },
  { id:'itel-a60', name:'Itel A60', category:'smartphones', subcategory:'budget', basePrice:69, brand:'Itel',
    variants:[{id:'ia60-32-bl', sku:'ITEL-A60-32-BL', price:69, stock:20, attributes:{storage:'32GB', color:'Blue'}}],
    images:['/images/phones/itel-a60.jpg'], bulkPricing:[{minQty:3, price:65},{minQty:5, price:61}] },
  { id:'xiaomi-redmi-13c', name:'Xiaomi Redmi 13C', category:'smartphones', subcategory:'budget', basePrice:119, brand:'Xiaomi',
    variants:[{id:'xr13c-128-gr', sku:'XIA-13C-128-GR', price:119, stock:18, attributes:{storage:'128GB', color:'Graphite'}}],
    images:['/images/phones/redmi-13c.jpg'], bulkPricing:[{minQty:3, price:113},{minQty:5, price:107}] },
  { id:'samsung-a05', name:'Samsung Galaxy A05', category:'smartphones', subcategory:'midrange', basePrice:149, brand:'Samsung',
    variants:[{id:'sa05-64-bk', sku:'SAM-A05-64-BK', price:149, stock:12, attributes:{storage:'64GB', color:'Black'}}],
    images:['/images/phones/samsung-a05.jpg'], bulkPricing:[{minQty:3, price:142},{minQty:5, price:135}] },
  { id:'samsung-a15-5g', name:'Samsung Galaxy A15 5G', category:'smartphones', subcategory:'midrange', basePrice:199, brand:'Samsung',
    variants:[{id:'sa15-128-bl', sku:'SAM-A15-128-BL', price:199, stock:10, attributes:{storage:'128GB', color:'Blue'}}],
    images:['/images/phones/samsung-a15.jpg'], bulkPricing:[{minQty:3, price:189},{minQty:5, price:179}] },
  { id:'oppo-a58', name:'Oppo A58', category:'smartphones', subcategory:'midrange', basePrice:209, brand:'Oppo',
    variants:[{id:'op58-128-gr', sku:'OPP-A58-128-GR', price:209, stock:8, attributes:{storage:'128GB', color:'Green'}}],
    images:['/images/phones/oppo-a58.jpg'], bulkPricing:[{minQty:3, price:199},{minQty:5, price:189}] },
  { id:'xiaomi-redmi-note-13', name:'Redmi Note 13', category:'smartphones', subcategory:'midrange', basePrice:239, brand:'Xiaomi',
    variants:[{id:'rn13-256-sil', sku:'XIA-RN13-256-SI', price:239, stock:7, attributes:{storage:'256GB', color:'Silver'}}],
    images:['/images/phones/redmi-note-13.jpg'], bulkPricing:[{minQty:3, price:227},{minQty:5, price:215}] },
  { id:'samsung-s23-fe', name:'Samsung Galaxy S23 FE', category:'smartphones', subcategory:'premium', basePrice:599, brand:'Samsung',
    variants:[{id:'s23fe-128-lav', sku:'SAM-S23FE-128-LA', price:599, stock:3, attributes:{storage:'128GB', color:'Lavender'}}],
    images:['/images/phones/s23-fe.jpg'], bulkPricing:[{minQty:3, price:575}] },
  { id:'iphone-13', name:'iPhone 13', category:'smartphones', subcategory:'premium', basePrice:699, brand:'Apple',
    variants:[{id:'ip13-128-mid', sku:'APP-IP13-128-MI', price:699, stock:2, attributes:{storage:'128GB', color:'Midnight'}}],
    images:['/images/phones/iphone-13.jpg'], bulkPricing:[{minQty:3, price:675}] },
  { id:'iphone-15', name:'iPhone 15', category:'smartphones', subcategory:'premium', basePrice:899, brand:'Apple',
    variants:[{id:'ip15-128-pk', sku:'APP-IP15-128-PK', price:899, stock:1, attributes:{storage:'128GB', color:'Pink'}}],
    images:['/images/phones/iphone-15.jpg'], bulkPricing:[{minQty:3, price:865}] },
];
```

---

### SMTP settings (Brevo)
- Server: `smtp-relay.brevo.com`
- Port: `587`
- Login: `9bb43f001@smtp-brevo.com`
- SMTP key: `xsmtpsib-6bef05b36f0c1642e1189c64d9183ea72a7b40b1441d0d7bda09c7e6d6f587c1-dt0viC45t2r0oHhd`

### API keys (provided, rotate later)
- Brevo API: `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`
- MCP API: `eyJhcGlfa2V5IjoieGtleXNpYi02YmVmMDViMzZmMGMxNjQyZTExODljNjRkOTE4M2VhNzJhN2I0MGIxNDQxZDBkN2JkYTA5YzdlNmQ2ZjU4N2MxLVpFblR3Z2ZzNFdWM2J6SDcifQ==`

> Rotate these after go-live; consider env variables for production.

