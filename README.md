# MA2K Impression — PRESS 43 Build

A multi-page, bilingual, mobile-first website for MA2K Impression.

## Deploy
1. Unzip this folder.
2. Upload every file and folder to a GitHub repository.
3. Import the repository into Vercel.
4. No build command or framework preset is required.

## Main pages
- `index.html`
- `solutions.html`
- Individual service pages
- `work.html`
- `process.html`
- `about.html`
- `testimonials.html`
- `contact.html`
- `start-project.html`

## Printflow
Open `assets/js/config.js` and set `enabled: true` plus the future embed URL. The project builder is functional without Printflow and stores selections in the visitor’s browser.

## Forms
Forms currently provide a front-end demonstration and local testimonial storage. Connect the endpoint values in `assets/js/config.js` to Supabase, Formspree, a Vercel function, or another API.

## Project photos
Place full-resolution work images in `assets/images/projects/`, then replace the art-directed placeholders in `work.html`.

## Logo
The CSS-built temporary wordmark can be replaced later with the original logo file.
