# MA2K Impression — Commercial Print Platform 43 Build

This build expands the existing bilingual MA2K site into a scalable commercial print, signage, apparel and promotional-products catalog.

## New public routes
- `catalog.html` — searchable, filterable catalog
- `products/<slug>.html` — clean, SEO-ready product pages generated from reusable product data

## Data architecture
- `data/products.json` is the single source of truth for product descriptions, options, use cases, timelines, FAQs, related products, order mode and placeholder pricing.
- `assets/js/storefront.js` powers search, filtering, bilingual product UI, file validation, live summaries and placeholder estimates.
- `assets/css/storefront.css` contains storefront-only styling.

## Placeholder pricing
The displayed estimate is intentionally a planning estimate. Replace each product's `pricing` object with MA2K rates or connect the configurator to Shopify, Printavo, PrintFlow, Supabase, Stripe or a custom pricing service.

## Artwork
The browser accepts PDF, AI, EPS, SVG, PSD, PNG and JPG files up to 50 MB and validates file type before the customer continues. Connect final binary storage to Supabase Storage, Shopify files, or another approved storage provider before production launch.

## Deployment
Upload all files to the repository root and deploy through Vercel. No `package-lock.json` is included or required.
