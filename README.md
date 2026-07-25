# MA2K Impression — 43 Build

A bilingual, multi-page static website prepared for GitHub and Vercel.

## Pages
- Home
- Services overview
- Screen Printing
- Embroidery
- Heat Press + Vinyl
- Signs + Banners
- Promotional Products
- Work
- Process
- About
- Testimonials
- Contact
- Custom Order

## Printflow embed
Open `assets/js/config.js` and set:

```js
printflow: {
  enabled: true,
  embedUrl: "YOUR_PRINTFLOW_EMBED_URL"
}
```

The native custom-order form will automatically be replaced by the embed.

## Forms and future APIs
Set `integrations.forms.endpoint` for contact and order form submissions. Set `integrations.testimonials.endpoint` for moderated testimonial submissions. Empty endpoints use the local browser demonstration mode.

## Logo and photos
The current logo is a temporary typographic mark. Replace it after the original logo is supplied. Project-image areas are prepared for the future full-resolution gallery.

## Deploy
Upload the contents of this folder to the GitHub repository. Import the repository into Vercel as a static site. No build command is required.
