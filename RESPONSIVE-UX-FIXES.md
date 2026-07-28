# MA2K Responsive UX Fixes

This revision replaces the previous overflow-only patch with a structural responsive update.

## Updated
- Header changed from a rigid three-column grid to a flexible viewport-safe layout.
- Main navigation now collapses before its links can push the page beyond the browser width.
- Open mobile/tablet navigation is constrained between the viewport edges.
- Containers use explicit viewport-safe widths on desktop and mobile.
- Product cards, related cards, capability cards, admin guides, and dashboard cards now stretch evenly.
- Admin pricing labels, inputs, selects, and help areas use consistent vertical tracks.
- Homepage Quick Product Finder rebuilt as a guided six-choice experience.

## Files changed
- `index.html`
- `assets/css/style.css`
- `assets/css/storefront.css`
- `assets/js/admin.js`
