# MA2K Product Image Rendering 43 Build Patch

This patch fixes the missing external product imagery by rendering each product's `image` field in every customer-facing product component.

## Replace

- `index.html`
- `assets/js/storefront.js`
- `assets/css/storefront.css`
- `data/products.json`

## Product images now appear in

- Homepage featured-product cards
- Products catalog cards
- Individual product/order pages
- Related-product cards

## Hero backgrounds

This patch does not modify page hero-background folders or hero-background CSS. Product imagery remains a separate media layer.

## External media behavior

Each image uses the URL stored in `data/products.json`. The source link remains available on the visible image caption and on the individual product page. If an external host blocks an image or removes it, the card displays a clean product-name fallback rather than a broken-image icon.
