MA2K PRODUCT IMAGE PATCH

Replace/upload these files into the SAME paths in the GitHub repository:

catalog.html
product.html
data/products.js
assets/js/catalog.js
assets/js/product.js
assets/css/product-images.css

The PNG product files themselves are NOT included because they are already in:
assets/images/products/

What this patch does:
- Maps all 24 uploaded PNG product images to their corresponding catalog products.
- Displays the real PNGs on catalog cards.
- Displays the same PNG on each product configuration/detail page.
- Removes the old generated placeholder artwork whenever a real product image exists.
- Uses object-fit: contain so transparent product images remain fully visible.
- Includes responsive sizing for mobile.

IMPORTANT:
The Vinyl Banners mapping uses the filename shown in your repository/screenshot:
assets/images/products/vvnyilbanner.png
If the actual repository filename is spelled differently, rename that image to vvnyilbanner.png or update the image path in data/products.js.

UPDATE: Product imagery now uses consistent 1:1 square containers on catalog cards and product pages. PNGs remain fully visible with object-fit: contain and are never stretched.
