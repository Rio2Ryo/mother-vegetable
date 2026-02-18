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

## Important Notes
- Crawl ALL pages thoroughly before building
- Download/reference all images, videos, assets
- Match fonts, colors, spacing exactly
- EC functionality should be functional (cart, checkout)
- Multi-language support required
- The site uses EJS templating currently — we're converting to Next.js/React
