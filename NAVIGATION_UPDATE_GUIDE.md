# Navigation Update Guide

## 🎯 Quick Fix Required

Two files need manual updates to complete the routing migration:

---

## 1. Header Navigation

**File**: `src/components/Header.tsx`
**Line**: Around 64
**Time**: 5 minutes

### Current Code:
```typescript
{
  name: 'Webstore',
  path: '/webstore',
  submenu: [
    { name: 'All Products', path: '/webstore' },
    { name: 'Design Services', path: '/webstore/design' },           // ❌ OLD
    { name: 'Print Products', path: '/webstore/print' },             // ❌ OLD
    { name: 'Corporate Wear', path: '/webstore/corporate-wear' },    // ❌ OLD
    { name: 'CCTV & Security', path: '/webstore/cctv' },             // ❌ OLD
    { name: 'Marketing Products', path: '/webstore/marketing' },     // ❌ OLD
  ]
}
```

### Replace With:
```typescript
{
  name: 'Webstore',
  path: '/webstore',
  submenu: [
    { name: 'All Products', path: '/webstore' },
    { name: 'Design Services', path: '/webstore/category/design' },           // ✅ NEW
    { name: 'Print Products', path: '/webstore/category/print' },             // ✅ NEW
    { name: 'Corporate Wear', path: '/webstore/category/corporate-wear' },    // ✅ NEW
    { name: 'CCTV & Security', path: '/webstore/category/cctv' },             // ✅ NEW
    { name: 'Marketing Products', path: '/webstore/category/marketing' },     // ✅ NEW
  ]
}
```

### How to Find:
1. Open `src/components/Header.tsx`
2. Search for: `name: 'Webstore'`
3. Update the `submenu` array paths
4. Add `/category/` before each slug

---

## 2. Footer Navigation

**File**: `src/components/Footer.tsx`
**Line**: Around 20-25
**Time**: 5 minutes

### Current Code:
```typescript
shop: [
  { label: 'Webstore', href: '/webstore' },
  { label: 'Design Products', href: '/webstore/design' },          // ❌ OLD
  { label: 'CCTV & Security', href: '/webstore/cctv' },            // ❌ OLD
  { label: 'Corporate Wear', href: '/webstore/corporate-wear' },   // ❌ OLD
],
```

### Replace With:
```typescript
shop: [
  { label: 'Webstore', href: '/webstore' },
  { label: 'Design Products', href: '/webstore/category/design' },          // ✅ NEW
  { label: 'CCTV & Security', href: '/webstore/category/cctv' },            // ✅ NEW
  { label: 'Corporate Wear', href: '/webstore/category/corporate-wear' },   // ✅ NEW
],
```

### How to Find:
1. Open `src/components/Footer.tsx`
2. Search for: `shop:`
3. Update the `href` values in the `shop` array
4. Add `/category/` before each slug

---

## ✅ Verification Steps

After making the changes:

1. **Build Test**:
   ```bash
   npm run build
   ```
   Should complete without errors.

2. **Manual Test**:
   ```bash
   npm run dev
   ```
   - Click "Webstore" in header dropdown
   - Verify each submenu item navigates correctly
   - Scroll to footer
   - Click each shop link
   - Verify category pages load

3. **Test URLs**:
   - ✅ `/webstore` → Main webstore
   - ✅ `/webstore/category/design` → Design category
   - ✅ `/webstore/category/print` → Print category
   - ✅ `/webstore/category/corporate-wear` → Corporate Wear category
   - ✅ `/webstore/category/cctv` → CCTV category
   - ✅ `/webstore/category/marketing` → Marketing category
   - ✅ `/webstore/product/solar-cctv-kit` → Example product

---

## 🔍 Why This Change?

### Old Structure (Ambiguous):
```
/webstore/:slug
```
- Could be a category OR a product
- Router confusion
- Less explicit URLs

### New Structure (Clear):
```
/webstore/category/:slug   → Categories
/webstore/product/:slug    → Products
```
- Explicit resource types
- Better SEO
- Clearer routing logic
- Easier to extend

---

## 📝 Optional: Add Error Boundary

To handle 404s gracefully, update `WebstoreCategory.tsx`:

```typescript
if (!category) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-4">The category you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/webstore')}>
          Back to Webstore
        </Button>
      </div>
    </div>
  );
}
```

---

## 🎉 That's It!

**Total Time**: 10 minutes
**Files Changed**: 2
**Impact**: All webstore navigation will work correctly

After these changes, your webstore will have:
- ✅ Working navigation throughout the site
- ✅ Clean, SEO-friendly URLs
- ✅ Product detail pages with reviews
- ✅ Stock management
- ✅ Image galleries
- ✅ Ready for cart integration

---

*Last updated: 2025-11-20*
