# App folder clarification

The MA2K build is a static HTML/CSS/JavaScript website, so it does not require a Next.js `app/` directory.

The active browser application code is located in:

- `assets/js/config.js`
- `assets/js/main.js`

This folder is included only to prevent confusion. Do not upload a Next.js app structure unless the website is intentionally migrated from static HTML to Next.js.
