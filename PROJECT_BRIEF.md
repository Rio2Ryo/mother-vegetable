# Mother Vegetable - Site Clone Project

## Goal
Recreate https://www.mothervegetable.com/ as a pixel-perfect clone using Next.js, deployable on Vercel (and Cloudflare-compatible).

## Tech Stack
- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **E-Commerce**: Shopify Storefront API (headless) or Saleor — choose whichever works best on Vercel/Cloudflare
- **Deployment**: Vercel (primary), Cloudflare Pages compatible
- **Language Support**: English (primary), Japanese, Chinese (site has multi-language)

## Site Structure (All Pages to Recreate)

### Main Pages
1. **/** - Homepage (hero, products overview, trust section, food/cosmetic functions, Two Only Ones, group countries)
2. **/achieve-howto** - How to use Achieve (food product) — recipes for drinks, food items
3. **/confidence-howto** - How to use Confidence (cosmetic product) — skincare applications
4. **/forever-howto** - How to use Forever (pet product) — pet food mixing guides

### Navigation Structure (from header)
- **Food** section
- **Cosmetic** section  
- **Products**: Achieve, Confidence, Forever
- **How To Use**: Achieve, Confidence, Forever
- **Certified Instructor** page
- **Healthcare For Hospital** page
- **Language switcher**: English, 中文, 日本語

### E-Commerce Features
- User Login / Sign Up
- Shopping Cart (slide-in panel)
- Product pages with add-to-cart
- Checkout flow

### Design Elements
- Dark/black background theme
- Green accent color (spirulina/vegetable green)
- Elegant typography
- Smooth animations and transitions
- Responsive design (mobile + desktop)
- Video/image hero sections
- Product cards with hover effects
- Certification badges section
- World map with country presence
- Before & After photo sections

## Repository
- GitHub: https://github.com/Rio2Ryo/mother-vegetable
- Branch: main

## Deployment
- Vercel CLI is authenticated
- `vercel` command available
- Deploy with `vercel --prod` when ready

## E-Commerce Requirements
The site is a full EC (e-commerce) site. Must implement:

### Products
- **Achieve** (Food supplement) — capsule/stick format, multiple SKUs
- **Confidence** (Cosmetic/Skincare) — quasi-drug certified
- **Forever** (Pet supplement) — pet food grade certified

### EC Features Required
1. **Product Listings** — Product pages with image galleries, descriptions, pricing
2. **Shopping Cart** — Slide-in cart panel, add/remove items, quantity adjustment
3. **User Auth** — Login/Signup (Google, Facebook OAuth + email/password)
4. **Checkout Flow** — Shipping info, payment, order confirmation
5. **User Account** — Order history, profile management
6. **Inventory/SKU Management** — Multiple product variants (sizes, quantities)

### EC Backend Options (choose one)
- **Shopify Storefront API (Headless)** — Most mature, easy setup
- **Medusa.js** — Open source, self-hosted, Next.js friendly
- **Saleor** — GraphQL-based, modern

For MVP: Use Shopify Storefront API or mock the backend with local JSON data + Zustand state management. Real payment integration can come later.

### Cart State
- Use Zustand for client-side cart state
- Persist cart in localStorage
- Cart panel slides in from right (matches original site behavior)

## Crawl Data Available
All HTML, CSS, and assets have been crawled and saved:
- `crawl-data/*.html` — All page HTML source
- `crawl-data/css/` — All CSS files
- `public/Images/` — Local image assets
- `public/cdn/` — CDN product images downloaded locally
- Videos: Reference CDN URLs directly (https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/...)

## Important Notes
- Crawl ALL pages thoroughly before building
- Download/reference all images, videos, assets
- Match fonts, colors, spacing exactly
- EC functionality should be fully functional (cart, checkout, auth)
- Multi-language support required (EN, JA, ZH)
- The site uses EJS templating currently — we're converting to Next.js/React
- Deploy to Vercel with `vercel --prod --yes`
- Git: `gh auth setup-git` before pushing
