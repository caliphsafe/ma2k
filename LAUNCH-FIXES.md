# MA2K Launch Fixes

## Required Vercel environment variables
- SUPABASE_URL
- SUPABASE_ANON_KEY (new public-config fallback)
- SUPABASE_SERVICE_ROLE_KEY

Run `supabase/pricing.sql` once in Supabase SQL Editor. Confirm both administrator users are created and email-confirmed.

## Administrator access
`/admin/` now provides visible connection, login, authorization, loading and save errors. Pricing changes persist to `product_pricing`.

## Navigation
The public label is consistently **Products / Produits** everywhere. The page itself may still use “product catalog” descriptively in body copy.

## Images
No Signs365 images are redistributed or hotlinked. Add licensed images using `assets/images/page-backgrounds/README.md`.
