# Customer-ready direct product image patch

## Corrected behavior

- Product images use direct remote image-file URLs, not screenshots of vendor pages.
- No vendor/source link is shown in the customer interface.
- Images render on homepage product cards, catalog cards, individual product pages and related-product cards.
- Existing hero background images and their folder are untouched.
- Broken external images fall back to a clean product placeholder.

## Upload

Replace:

- `data/products.json`
- `assets/js/storefront.js`
- `assets/css/storefront.css`
- `index.html`

Keep `PRODUCT-IMAGE-URLS.md` as the editable image reference list.
