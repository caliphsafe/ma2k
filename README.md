# MA2K Impression — PRESS 43 Build (Image-Free Edition)

A static, GitHub-ready and Vercel-ready bilingual website for MA2K Impression.

## Current design

- No photographs or visible image placeholders
- Editorial print-studio layouts built entirely with HTML and CSS
- Slightly stronger but restrained red, yellow and green production accents
- English is always the default on every new page load
- The EN/FR control changes only the currently open page and is not remembered by the browser
- Mobile-first navigation and project builder
- Printflow-ready custom-order handoff

## Future images

The website is prepared for a maximum of 3–4 intentional images per page. Nothing is displayed until you deliberately add image markup. Store future photography under `assets/images/<page-name>/`.

Example markup:

```html
<div class="future-media">
  <img src="assets/images/about/hero.jpg" alt="MA2K production studio">
  <img src="assets/images/about/detail-01.jpg" alt="Screen printing detail">
</div>
```

Use JPG for standard photography. Use PNG only for transparent graphics.

## Deployment

Upload the full folder contents to the root of a GitHub repository and import the repository into Vercel. No package manager or `package-lock.json` is required.

## Printflow

Edit `assets/js/config.js` and set `printflow.enabled` to `true`, then paste the embed URL into `printflow.embedUrl`.


## Background image folders
This version uses only three optional JPG folders. The website remains readable while files are missing because each photograph is layered beneath a strong gradient.

```text
assets/images/hero/
assets/images/services/
assets/images/process/
```

Use the exact filenames listed in each folder's `UPLOAD-HERE.txt`. No logo, texture, detail, icon, pattern, work, about, industry, or contact image folder is required.
