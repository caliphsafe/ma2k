const STORE = { products: [], lang: 'en', filter: 'all', category: 'all', query: '' };
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

async function loadProducts() {
  const prefix = document.body.classList.contains('product-page') ? '../' : '';
  const response = await fetch(`${prefix}data/products.json`);
  if (!response.ok) throw new Error(`Unable to load product data (${response.status})`);
  STORE.products = await response.json();
}

function productName(product) {
  return STORE.lang === 'fr' ? product.nameFr : product.name;
}

function productDescription(product) {
  return STORE.lang === 'fr' ? product.descriptionFr : product.description;
}

function productCategory(product) {
  return STORE.lang === 'fr' ? (product.categoryFr || product.category) : product.category;
}

function imageMarkup(product, className = 'product-card-media', eager = false) {
  const name = productName(product);
  const image = product.image || '';
  const source = product.imageSource || '';
  const loading = eager ? 'eager' : 'lazy';
  return `
    <figure class="${className}" data-product-media>
      <img
        src="${image}"
        alt="${product.imageAlt || `${name} example`}" 
        loading="${loading}"
        decoding="async"
        referrerpolicy="no-referrer"
        data-external-product-image
      >
      <figcaption>
        <span>${name}</span>
        ${source ? `<a href="${source}" target="_blank" rel="noopener noreferrer" aria-label="View image source for ${name}">Source</a>` : ''}
      </figcaption>
      <div class="product-media-fallback" aria-hidden="true">
        <strong>${name}</strong>
        <span>Product image unavailable</span>
      </div>
    </figure>`;
}

function activateMediaFallbacks(context = document) {
  $$('[data-external-product-image]', context).forEach((image) => {
    const figure = image.closest('[data-product-media]');
    if (!figure || image.dataset.bound === 'true') return;
    image.dataset.bound = 'true';
    const showFallback = () => figure.classList.add('is-unavailable');
    const showImage = () => figure.classList.remove('is-unavailable');
    image.addEventListener('error', showFallback, { once: true });
    image.addEventListener('load', showImage, { once: true });
    if (image.complete) {
      if (image.naturalWidth > 0) showImage();
      else showFallback();
    }
  });
}

function setLanguage(lang) {
  STORE.lang = lang;
  document.documentElement.lang = lang;
  $$('[data-lang]').forEach((button) => button.classList.toggle('active', button.dataset.lang === lang));
  $$('[data-en][data-fr]').forEach((element) => {
    const value = element.dataset[lang];
    if (value !== undefined) element.innerHTML = value;
  });
  if (document.body.classList.contains('catalog-page')) renderCatalog();
  if (document.body.classList.contains('product-page')) {
    renderProductLanguage();
    renderProductMedia();
    renderRelatedProducts();
  }
  renderHomeProducts();
}

function nav() {
  const toggle = $('.menu-toggle');
  const links = $('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
  }
  $$('.nav-links a').forEach((link) => link.addEventListener('click', () => {
    links?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
  $$('[data-lang]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
}

function cardMarkup(product, pathPrefix = 'products/') {
  const mode = product.orderMode === 'online'
    ? (STORE.lang === 'fr' ? 'Commander' : 'Order online')
    : (STORE.lang === 'fr' ? 'Devis' : 'Request quote');
  return `
    <a class="product-card product-card-with-media" href="${pathPrefix}${product.slug}.html">
      ${imageMarkup(product)}
      <div class="product-card-content">
        <span class="card-category">${productCategory(product)}</span>
        <h2>${productName(product)}</h2>
        <p>${productDescription(product)}</p>
        <footer>
          <div class="tag-row">${product.tags.slice(0, 2).map((tag) => `<span>${tag}</span>`).join('')}</div>
          <span class="card-mode">${mode}</span>
        </footer>
      </div>
    </a>`;
}

function renderCatalog() {
  const grid = $('#catalog-grid');
  if (!grid) return;
  const query = STORE.query.toLowerCase();
  const rows = STORE.products.filter((product) =>
    (STORE.filter === 'all' || product.tags.includes(STORE.filter)) &&
    (STORE.category === 'all' || product.category === STORE.category) &&
    (!query || [product.name, product.nameFr, product.category, product.description, ...product.tags]
      .join(' ').toLowerCase().includes(query))
  );
  grid.innerHTML = rows.map((product) => cardMarkup(product)).join('');
  const count = $('#result-count');
  if (count) count.textContent = `${rows.length} ${STORE.lang === 'fr' ? 'produits' : 'products'}`;
  const empty = $('#catalog-empty');
  if (empty) empty.hidden = rows.length > 0;
  activateMediaFallbacks(grid);
}

function catalogInit() {
  const search = $('#catalog-search');
  if (!search) return;
  const params = new URLSearchParams(location.search);
  if (params.get('category')) STORE.category = params.get('category');
  if (params.get('filter')) STORE.filter = params.get('filter');
  $$('[data-category]').forEach((item) => item.classList.toggle('active', item.dataset.category === STORE.category));
  $$('[data-filter]').forEach((item) => item.classList.toggle('active', item.dataset.filter === STORE.filter));
  search.addEventListener('input', (event) => { STORE.query = event.target.value; renderCatalog(); });
  $$('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    $$('[data-filter]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    STORE.filter = button.dataset.filter;
    renderCatalog();
  }));
  $$('[data-category]').forEach((button) => button.addEventListener('click', () => {
    $$('[data-category]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    STORE.category = button.dataset.category;
    renderCatalog();
  }));
  $('#clear-filters')?.addEventListener('click', () => {
    STORE.filter = 'all';
    STORE.category = 'all';
    STORE.query = '';
    search.value = '';
    $$('[data-filter],[data-category]').forEach((item) => item.classList.toggle(
      'active', item.dataset.filter === 'all' || item.dataset.category === 'all'
    ));
    renderCatalog();
  });
  renderCatalog();
}

function renderProductLanguage() {
  const product = STORE.products.find((item) => item.slug === document.body.dataset.product);
  if (!product) return;
  const description = $('#product-description');
  if (description) description.textContent = productDescription(product);
  document.title = `${productName(product)} | MA2K Impression`;
}

function renderProductMedia() {
  if (!document.body.classList.contains('product-page')) return;
  const product = STORE.products.find((item) => item.slug === document.body.dataset.product);
  const article = $('.product-layout > article');
  if (!product || !article) return;
  let showcase = $('#product-showcase');
  if (!showcase) {
    showcase = document.createElement('section');
    showcase.id = 'product-showcase';
    showcase.className = 'product-showcase';
    article.prepend(showcase);
  }
  showcase.innerHTML = `
    ${imageMarkup(product, 'product-showcase-media', true)}
    <div class="product-showcase-copy">
      <span class="card-category">${productCategory(product)}</span>
      <h2>${productName(product)}</h2>
      <p>${productDescription(product)}</p>
      <a class="text-link" href="${product.imageSource || '#'}" target="_blank" rel="noopener noreferrer">View media source</a>
    </div>`;
  activateMediaFallbacks(showcase);
}

function renderRelatedProducts() {
  const related = $('#related-products');
  const product = STORE.products.find((item) => item.slug === document.body.dataset.product);
  if (!related || !product) return;
  related.innerHTML = product.related.map((slug) => {
    const item = STORE.products.find((candidate) => candidate.slug === slug);
    if (!item) return '';
    return `
      <a class="related-card related-card-with-media" href="${slug}.html">
        ${imageMarkup(item, 'related-card-media')}
        <span>${productCategory(item)}</span>
        <strong>${productName(item)}</strong>
      </a>`;
  }).join('');
  activateMediaFallbacks(related);
}

function money(number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}

function productInit() {
  const form = $('#product-config');
  if (!form) return;
  const product = STORE.products.find((item) => item.slug === document.body.dataset.product);
  if (!product) return;
  const update = () => {
    const values = new FormData(form);
    const width = +values.get('width') || 0;
    const height = +values.get('height') || 0;
    const quantity = +values.get('quantity') || 1;
    const squareFeet = Math.max(.05, width * height / 144);
    const rush = String(values.get('rush')).toLowerCase().includes('rush') ? 1.3 : 1;
    const sides = String(values.get('sides')).includes('Double') ? 1.65 : 1;
    const lamination = values.get('lamination') === 'None' ? 0 : 1.15 * squareFeet * quantity;
    const estimate = Math.max(
      product.pricing.minimum,
      (product.pricing.setup + squareFeet * product.pricing.sqftRate * quantity + product.pricing.unitRate * quantity + lamination) * rush * sides
    );
    $('#estimate').textContent = money(estimate);
    const fields = ['width','height','quantity','material','thickness','sides','lamination','cut','grommets','polePockets','roundedCorners','hardware','installation','rush'];
    $('#summary-list').innerHTML = fields.map((key) => `
      <dt>${key.replace(/([A-Z])/g, ' $1')}</dt>
      <dd>${values.get(key) || '—'}${key === 'width' || key === 'height' ? ' in' : ''}</dd>`).join('');
    localStorage.setItem('ma2kProductProject', JSON.stringify({ slug: product.slug, estimate, values: Object.fromEntries(values) }));
  };
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  $('#artwork')?.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const extension = file.name.split('.').pop().toLowerCase();
    const supported = ['pdf','ai','eps','svg','psd','png','jpg','jpeg'].includes(extension);
    const withinLimit = file.size <= 50 * 1024 * 1024;
    $('#file-status').textContent = supported && withinLimit
      ? `${file.name} ready for review`
      : 'Please choose a supported file under 50 MB.';
    if (!supported || !withinLimit) event.target.value = '';
    update();
  });
  $('#submit-project')?.addEventListener('click', () => {
    update();
    const saved = JSON.parse(localStorage.getItem('ma2kProductProject') || '{}');
    localStorage.setItem('ma2kProject', JSON.stringify({ product: product.name, ...saved }));
    $('#config-message').textContent = STORE.lang === 'fr'
      ? 'Votre configuration est enregistrée. Continuez pour envoyer les coordonnées et les détails du projet.'
      : 'Your configuration is saved. Continue to send your contact and project details.';
    setTimeout(() => { location.href = '../start-project.html'; }, 700);
  });
  $('[data-scroll-config]')?.addEventListener('click', () => $('.configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  renderProductMedia();
  renderRelatedProducts();
  update();
}

function renderHomeProducts() {
  const grid = $('#home-products');
  if (!grid || !STORE.products.length) return;
  const picks = ['banners','yard-signs','window-graphics','retractable-banner-stands','vehicle-lettering','screen-printing','embroidery','promotional-products'];
  grid.innerHTML = picks.map((slug) => {
    const product = STORE.products.find((item) => item.slug === slug);
    return product ? cardMarkup(product) : '';
  }).join('');
  activateMediaFallbacks(grid);
}

function homeInit() {
  renderHomeProducts();
}

document.addEventListener('DOMContentLoaded', async () => {
  nav();
  try {
    await loadProducts();
    setLanguage('en');
    catalogInit();
    productInit();
    homeInit();
  } catch (error) {
    console.error(error);
    document.body.classList.add('product-data-error');
  }
});
