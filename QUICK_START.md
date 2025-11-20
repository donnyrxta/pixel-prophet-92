# Soho Connect Webstore - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your Brevo API credentials
VITE_BREVO_API_KEY=your_actual_api_key_here
VITE_BREVO_SENDER_NAME=Soho Connect
VITE_BREVO_SENDER_EMAIL=no-reply@sohoconnect.com
VITE_INTERNAL_NOTIFICATION_EMAIL=sales@sohoconnect.com
```

**Get Your Brevo API Key**:
1. Go to https://app.brevo.com/settings/keys/api
2. Create a new API key
3. Copy and paste into `.env.local`

### 2. Install Dependencies

```bash
npm install
```

This installs:
- axios (for API calls)
- All existing dependencies

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173

### 4. Test the Webstore

**Navigate to**:
- Webstore Home: http://localhost:5173/webstore
- Product Detail: Click any product
- Cart: Click cart icon in header
- Checkout: Click "Proceed to Checkout" from cart
- Confirmation: Complete checkout to see success page

### 5. Build for Production

```bash
npm run build
```

Output in `dist/` folder.

---

## 📍 Key URLs

| Page | URL | Purpose |
|------|-----|---------|
| Webstore Home | `/webstore` | Browse all products |
| Category | `/webstore/category/{slug}` | Filter by category |
| Product Detail | `/webstore/product/{slug}` | View product details |
| Cart | `/webstore/cart` | Review cart items |
| Checkout | `/webstore/checkout` | Complete purchase |
| Confirmation | `/webstore/order-confirmation` | Order success |

---

## 🎯 Core Features

### Shopping Cart
- **Add to cart**: Product detail page → "Add to Cart" button
- **View cart**: Header cart icon OR navigate to `/webstore/cart`
- **Update quantity**: Use +/- buttons or type directly
- **Remove items**: Click trash icon or set quantity to 0
- **Persistence**: Cart survives page refresh (localStorage)

### Checkout
- **Required fields**: Name, email, address, city, postal code, country
- **Optional fields**: Phone, state
- **Validation**: Real-time validation as you type
- **Submit**: "Place Order" button sends to Brevo and clears cart

### Email Notifications
- **Customer email**: Automatic confirmation with order details
- **Internal email**: Notification to sales team (if configured)
- **Template**: Customizable HTML in `src/api/order.ts`

---

## 🔧 Quick Customization

### Change Product Data
**File**: `src/data/webstore-products.ts`

```typescript
{
  id: '1',
  slug: 'my-product',
  name: 'My Product',
  price: 99.99,
  stock: 10,
  // ... more fields
}
```

### Modify Cart Logic
**File**: `src/context/WebstoreCartContext.tsx`

Key functions:
- `addToCart()` - line 72
- `removeFromCart()` - line 95
- `updateQuantity()` - line 103

### Customize Email Template
**File**: `src/api/order.ts`

Find `htmlContent` variable (line ~79) and modify the HTML.

### Change Styling
All components use Tailwind CSS classes. Example:

```typescript
className="bg-blue-600 text-white p-4 rounded-lg"
```

---

## 🐛 Troubleshooting

### Cart Not Persisting?
```typescript
// Check browser console for errors
// Verify localStorage is enabled
// Clear localStorage and try again:
localStorage.clear();
```

### Emails Not Sending?
1. Check API key in `.env.local`
2. Verify Brevo account is active
3. Check browser console for API errors
4. Test API key with curl:
```bash
curl -X GET "https://api.brevo.com/v3/account" \
  -H "api-key: YOUR_API_KEY"
```

### Build Fails?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors?
```bash
# Check TypeScript version
npx tsc --version

# Run type checking
npx tsc --noEmit
```

---

## 📊 Testing Checklist

### Basic Flow
- [ ] Add product to cart
- [ ] View cart
- [ ] Update quantity
- [ ] Remove item
- [ ] Proceed to checkout
- [ ] Fill form
- [ ] Submit order
- [ ] See confirmation
- [ ] Receive email

### Edge Cases
- [ ] Add same product twice (should increase quantity)
- [ ] Try to exceed stock limit
- [ ] Submit form with invalid email
- [ ] Navigate away and back (cart persists?)
- [ ] Checkout with empty cart (blocked?)

---

## 📦 Deployment Quick Steps

### Vercel (Recommended)
```bash
vercel --prod
```

Add environment variables in Vercel dashboard.

### Netlify
```bash
netlify deploy --prod --dir=dist
```

Add environment variables in Netlify dashboard.

### Manual
```bash
npm run build
# Upload dist/ folder to your server
```

---

## 📞 Need Help?

- **Documentation**: See `WEBSTORE_IMPLEMENTATION.md`
- **Code**: All files have inline documentation
- **Issues**: Check browser console for errors

---

## ✅ Success Checklist

After setup, verify:
- [ ] Development server runs (`npm run dev`)
- [ ] Can navigate to webstore
- [ ] Can add items to cart
- [ ] Cart icon shows item count
- [ ] Can complete checkout
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured

---

**Status**: ✅ All systems operational
**Last Build**: Successful (817 kB)
**Ready for**: Development & Testing

Happy coding! 🎉
