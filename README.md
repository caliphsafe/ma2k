# MA2K Impression — Complete Print Procurement 43 Build

Static, Vercel-ready rebuild of MA2K Impression as a complete print procurement platform.

## Included
- Product catalog with search, category and use-case filters
- 24 seeded products across signs, graphics, displays, commercial print, apparel, vehicle graphics and promotional products
- Three procurement modes: Order Online, Instant Estimate, Custom Quote
- Dynamic product configurator
- Project intake with artwork upload and live summary
- Existing MA2K rush-charge logic: $50 at 10–15 days; $100 under 10 days, subject to capacity
- FormSubmit contact/project delivery to ma2kimpression@gmail.com
- Mobile-first responsive UI
- Reusable product data layer in `data/products.js`
- No package-lock.json and no npm build requirement

## Deploy
Upload the full folder to GitHub and import the repository into Vercel. This is a static site, so no build command is required.

## Next production integrations
1. Supabase for customer accounts, saved projects, product data, quotes and order history.
2. Stripe/Square for approved online checkout and deposits.
3. Supplier/private APIs for live costs, inventory, shipping and order submission.
4. Cloud storage for production artwork and proof versions.
5. Admin dashboard for quote approval, vendor routing, proofing and job status.

## Important
The included prices are planning placeholders only. Replace them with MA2K's actual pricing tables before enabling direct online purchase.
