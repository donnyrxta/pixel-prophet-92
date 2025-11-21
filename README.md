# Soho Connect — Printing & Design Services for Zimbabwe

Professional printing, branding, digital marketing, and e-commerce solutions built for Zimbabwean businesses.

**Live Site**: [sohoconnect.co.zw](https://sohoconnect.co.zw)  
**Repository**: [donnyrxta/pixel-prophet-92](https://github.com/donnyrxta/pixel-prophet-92)

## Quick Start

### Prerequisites
- Node.js 18+ and npm (or bun)
- Git

### Local Development

```sh
# Clone the repository
git clone https://github.com/donnyrxta/pixel-prophet-92.git
cd pixel-prophet-92

# Install dependencies
npm install
# or
bun install

# Start dev server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Linting & Quality
```sh
npm run lint                 # Run ESLint
npm run perf:ci              # Run Lighthouse CI
npm run analyze:clients      # Analyze client image sizes
```

### Deployment
```sh
npm run deploy:vercel        # Deploy to Vercel (requires CLI)
# OR use Vercel's GitHub integration for automatic deployments
```

## Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn-ui components
- **Routing**: React Router v6
- **Analytics**: Google Tag Manager (GTM) + GA4
- **Forms & Validation**: react-hook-form + Zod
- **State Management**: React Context (CartContext, QuoteCalculatorContext, AdPlannerContext)
- **UI Components**: Radix UI primitives, Lucide icons
- **Hosting**: Vercel (with automatic deployments)

## Project Structure

```
src/
├── pages/              # Route pages (Services, Shop, Checkout, etc.)
├── components/         # Reusable UI components
├── context/            # React Context providers
├── lib/                # Utilities (GTM, pricing, constants)
├── hooks/              # Custom React hooks
├── ads/                # Analytics & ad campaign logic
├── types/              # TypeScript type definitions
├── App.tsx             # Router configuration
└── main.tsx            # Entry point

public/
├── images/             # Optimized images (hero, products, clients)
└── site.webmanifest    # PWA manifest

docs/                   # Implementation guides & deployment notes
scripts/                # Build automation (image analysis, etc.)
```

## Key Features

### 🖨️ Printing Services
- Business cards, brochures, flyers, signage, and large-format printing
- Real-time quotation calculator with instant pricing
- Fast turnaround (24–48 hours) and local delivery

### 🎨 Branding & Design
- Logo design, brand identity, and rebranding services
- Print collateral and marketing materials
- Professional design consultation

### 🌐 Digital Marketing
- Social media marketing, SEO, and content strategy
- Web design and digital transformation
- Analytics and performance tracking

### 🛒 E-Commerce Platform
- 6 featured products with real-time cart
- Three-step checkout with multiple payment options (EcoCash, card, bank)
- Zimbabwe pricing compliance (VAT, government levy, forex disclaimers)
- Mobile-responsive shop interface

### 📱 Mobile-First & Responsive
- Fully responsive design (mobile, tablet, desktop)
- Accessible UI (WCAG AA) with keyboard navigation
- Fast load times and optimized images (WebP/AVIF)

### 📊 Analytics & Tracking
- Google Tag Manager integration
- E-commerce event tracking (add_to_cart, begin_checkout, purchase)
- Form submissions and lead tracking

### 📍 Location Pages
- Dedicated pages for Harare, Bulawayo, and Gweru
- Local business schema markup for SEO
- Geotargeted content and messaging
