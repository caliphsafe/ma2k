# MA2K Impression — Unified Commercial Platform 43 Build

MA2K is presented throughout as one full-service commercial printing, signage, graphics, apparel-decoration and promotional-products company.

## Catalog and pricing
- `data/products.json` is the product source of truth.
- The public configurator uses placeholder planning formulas until MA2K pricing is approved.
- `/admin/` is prepared for authenticated pricing management by `babaoussou@gmail.com` and `caliph.safe@gmail.com`.
- Connect Supabase Auth and a pricing table before enabling admin writes.

## Payments
- `api/checkout.js` contains provider routing for future Square and Orange Money Web Payment integrations.
- Square credentials remain server-side.
- Orange Money availability, currency and merchant onboarding vary by market; enable only approved countries.
- Never expose payment secrets in `assets/js/config.js`.

## Images
No third-party copyrighted images are included. Add MA2K-owned, commissioned or properly licensed work photography to the existing image folders.

## Required environment variables
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SQUARE_ACCESS_TOKEN
SQUARE_LOCATION_ID
ORANGE_MONEY_CLIENT_ID
ORANGE_MONEY_CLIENT_SECRET

No package-lock.json is included.
