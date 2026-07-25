# MA2K Impression — 43 Build

A complete static, responsive website prepared for GitHub + Vercel.

## Pages
- `index.html` — Homepage
- `about.html` — Company story and values
- `work.html` — Filterable project gallery with temporary graphic placeholders
- `custom-order.html` — Built-in order form plus Printflow embed support
- `testimonials.html` — Testimonial submission and display foundation
- `contact.html` — Contact details and general inquiry form

## Deploy to GitHub and Vercel
1. Create a new GitHub repository.
2. Upload every file and folder from this ZIP to the repository root.
3. In Vercel, choose **Add New → Project** and import the repository.
4. Leave Framework Preset as **Other**.
5. Leave Build Command and Output Directory empty.
6. Deploy.

## Add the future logo
1. Put the logo file in `assets/images/`, for example `logo.png`.
2. Replace each `.brand` wordmark block with an `<img src="assets/images/logo.png" alt="MA2K Impression">`.
3. Add sizing in `assets/css/style.css`.

## Add project photos
Replace each `.gallery-placeholder` inside `work.html` with:

```html
<img src="assets/images/project-name.jpg" alt="Description of MA2K project">
```

Then add:

```css
.gallery-placeholder img { width:100%; height:100%; object-fit:cover; }
```

## Connect Printflow
Open `assets/js/config.js` and change:

```js
printflow: {
  enabled: true,
  embedUrl: "PASTE_THE_PRINTFLOW_EMBED_URL_HERE"
}
```

The built-in form will automatically hide and the Printflow iframe will appear. No HTML redesign is necessary.

## Form/API connection
The forms work as local demonstrations now. To send live submissions, enter your endpoint in `assets/js/config.js`:

```js
forms: {
  endpoint: "https://your-api.example.com/forms"
}
```

The endpoint receives JSON with a `type` value of `contact` or `custom-order`.

## Testimonials
Current behavior:
- A submission is saved to browser `localStorage` as pending.
- It does not publicly publish itself.
- This safely demonstrates the workflow before a real database is connected.

Recommended production setup:
- Supabase table: `testimonials`
- Columns: `id`, `name`, `organization`, `service`, `rating`, `message`, `permission`, `status`, `created_at`
- Default `status`: `pending`
- Admin approves an item by changing `status` to `approved`
- Public page only fetches approved records

Enter the future endpoint here:

```js
testimonials: {
  endpoint: "https://your-api.example.com/testimonials"
}
```

## Future API architecture
All service switches are centralized in `assets/js/config.js`, allowing future additions such as:
- Printflow
- Supabase
- Cloudinary or Supabase Storage
- Stripe
- Shipping/fulfillment
- CRM
- Email notifications

## Business information included
- 1 Wamsutta Street, Suite 15, New Bedford, MA 02740
- 508-958-9587
- ma2kimpression@gmail.com
- Monday–Saturday, 10:00 AM–6:00 PM
