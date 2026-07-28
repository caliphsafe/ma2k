# MA2K Square Connection Setup

The admin page now connects Square using Square OAuth. Administrators authorize on Square's website; Square passwords and access tokens are never entered into MA2K's browser interface.

## 1. Run the updated Supabase SQL

Open Supabase > SQL Editor and run the complete `supabase/pricing.sql` file again. It creates the pricing table plus `square_oauth_states` and `square_connections`.

## 2. Create or open a Square developer application

In the Square Developer Console, create an application for MA2K Impression. Start in Sandbox until the online-order workflow has been tested.

## 3. Add the OAuth redirect URL

Add this exact redirect URL to the Square application:

`https://YOUR-DOMAIN.com/api/square-callback`

For the Vercel preview/domain, use the corresponding HTTPS URL. The value must exactly match the Vercel environment variable below.

## 4. Add Vercel environment variables

Add these under Vercel > Project > Settings > Environment Variables:

- `SQUARE_APPLICATION_ID`
- `SQUARE_APPLICATION_SECRET`
- `SQUARE_ENVIRONMENT` = `sandbox` initially; later `production`
- `SQUARE_REDIRECT_URL` = `https://YOUR-DOMAIN.com/api/square-callback`
- `SQUARE_TOKEN_ENCRYPTION_KEY` = a long random secret of at least 32 characters

Keep the existing Supabase variables:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Redeploy after adding or changing variables.

## 5. Connect from the admin

Sign in at `/admin/`, open Payments, select Connect Square, sign in on Square, choose the correct seller account, approve access, and return to the MA2K admin.

## Sales methods

**Request Quote**: use for custom, variable, installation-dependent, freight-dependent, or artwork-sensitive projects. The customer submits details before payment.

**Order Online**: use only for standardized products with tested pricing, supported configurations, and a complete fulfillment flow. Square must be connected before customers can pay.

## Production note

Square OAuth access tokens expire. A scheduled token-refresh endpoint should be added before production checkout is enabled. The current connection flow stores encrypted access and refresh tokens and records the expiration date, but this patch does not yet create customer charges.
