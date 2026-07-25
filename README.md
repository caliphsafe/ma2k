# MA2K Impression — PRESS Photo 43 Build

## Important
This build requires **only the JPG image library below**. It does not require a logo, favicon, texture, icon, pattern, or detail-image folder. The temporary CSS wordmark and CSS-generated visual texture remain in place until real brand assets are supplied.

Until an image is uploaded, the website displays a clean monochrome placeholder showing the expected filename. No broken-image icon appears.

## Upload location
Upload all photos under `assets/images/` using the exact folders and filenames below.

### `assets/images/hero/`
```text
hero-main.jpg
hero-embroidery.jpg
hero-heatpress.jpg
hero-shop.jpg
```

### `assets/images/services/`
```text
screen-printing.jpg
embroidery.jpg
heat-press.jpg
vinyl.jpg
banners.jpg
promotional-products.jpg
```

### `assets/images/industries/`
```text
clothing-brand.jpg
school-apparel.jpg
sports-team.jpg
restaurant.jpg
construction.jpg
corporate.jpg
```

### `assets/images/process/`
```text
consultation.jpg
artwork.jpg
production.jpg
quality-control.jpg
packaging.jpg
```

### `assets/images/work/`
```text
work-streetwear.jpg
work-school.jpg
work-restaurant.jpg
work-corporate.jpg
work-events.jpg
```

### `assets/images/about/`
```text
owner.jpg
shop-overview.jpg
team.jpg
workspace.jpg
```

### `assets/images/contact/`
```text
storefront.jpg
reception.jpg
start-project.jpg
quote.jpg
```

## Image format
Use `.jpg` for every photo. Recommended export: sRGB, 80–88% JPG quality, at least 2400 px on the long edge. Larger hero images can be 3200 px wide.

## Deploy
1. Unzip the folder.
2. Upload every file and folder to GitHub.
3. Import the repository into Vercel.
4. No build command is required.

## Printflow
Open `assets/js/config.js`, set `printflow.enabled` to `true`, and add the future embed URL.

## Missing future assets
When available later, the original logo and favicon can be added deliberately. They are not referenced by this version, so the current site works without them.