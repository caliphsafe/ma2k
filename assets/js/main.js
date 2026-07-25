(() => {
  const config = window.MA2K_CONFIG || {};
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('[data-filters] button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filters] button').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => item.hidden = filter !== 'all' && item.dataset.category !== filter);
  }));

  const postForm = async (type, payload) => {
    const endpoint = config.integrations?.forms?.endpoint;
    if (!endpoint) return { ok: true, local: true };
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, ...payload }) });
    if (!res.ok) throw new Error('Submission failed');
    return res.json();
  };

  const bindBasicForm = (selector, type, message) => {
    const form = document.querySelector(selector); if (!form) return;
    form.addEventListener('submit', async e => { e.preventDefault(); const status = form.querySelector('[data-form-status]'); status.textContent = 'Sending…';
      const data = Object.fromEntries(new FormData(form).entries());
      try { await postForm(type, data); status.textContent = message; form.reset(); } catch { status.textContent = 'We could not send this online. Please call 508-958-9587 or email ma2kimpression@gmail.com.'; }
    });
  };
  bindBasicForm('[data-contact-form]', 'contact', 'Thanks — your message has been recorded. MA2K will follow up using the contact details provided.');

  const orderForm = document.querySelector('[data-order-form]');
  if (orderForm) {
    const pf = config.integrations?.printflow;
    const frame = document.querySelector('[data-printflow-frame]'); const shell = document.querySelector('#printflow-embed'); const statusLabel = document.querySelector('[data-integration-status]');
    if (pf?.enabled && pf.embedUrl && frame && shell) { frame.src = pf.embedUrl; shell.hidden = false; orderForm.hidden = true; if (statusLabel) statusLabel.textContent = 'Printflow connected'; }
    const urlService = new URLSearchParams(location.search).get('service');
    if (urlService) { const radio = [...orderForm.querySelectorAll('[name="service"]')].find(r => r.value.toLowerCase().replaceAll(' ', '-') === urlService); if (radio) radio.checked = true; }
    orderForm.addEventListener('submit', async e => { e.preventDefault(); const formData = new FormData(orderForm); const file = formData.get('artwork'); const data = Object.fromEntries(formData.entries()); data.artwork = file?.name || '';
      const status = orderForm.querySelector('[data-form-status]'); status.textContent = 'Submitting…';
      try { await postForm('custom-order', data); localStorage.setItem('ma2k-last-order', JSON.stringify({ ...data, submittedAt: new Date().toISOString() })); status.textContent = 'Your request has been recorded. MA2K will review the details and contact you before anything moves into production.'; orderForm.reset(); } catch { status.textContent = 'Online submission is unavailable. Please email the project details to ma2kimpression@gmail.com.'; }
    });
  }

  const testimonialForm = document.querySelector('[data-testimonial-form]');
  const testimonialList = document.querySelector('[data-testimonial-list]');
  const renderTestimonials = () => {
    if (!testimonialList) return;
    const approved = JSON.parse(localStorage.getItem('ma2k-approved-testimonials') || '[]');
    if (!approved.length) return;
    testimonialList.innerHTML = approved.map(t => `<article class="testimonial-card"><div class="stars">${'★'.repeat(Number(t.rating || 5))}</div><blockquote>“${escapeHtml(t.message)}”</blockquote><strong>${escapeHtml(t.name)}</strong><span>${escapeHtml(t.organization || t.service || '')}</span></article>`).join('');
  };
  const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  renderTestimonials();
  if (testimonialForm) testimonialForm.addEventListener('submit', async e => { e.preventDefault(); const status = testimonialForm.querySelector('[data-form-status]'); const data = Object.fromEntries(new FormData(testimonialForm).entries()); status.textContent = 'Submitting…';
    try { const endpoint = config.integrations?.testimonials?.endpoint; if (endpoint) { const res = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }); if (!res.ok) throw new Error(); } else { const pending = JSON.parse(localStorage.getItem('ma2k-pending-testimonials') || '[]'); pending.push({ ...data, id: crypto.randomUUID?.() || Date.now(), status:'pending', submittedAt:new Date().toISOString() }); localStorage.setItem('ma2k-pending-testimonials', JSON.stringify(pending)); }
      status.textContent = 'Thank you. Your testimonial has been submitted for review.'; testimonialForm.reset();
    } catch { status.textContent = 'Submission failed. Please send your testimonial to ma2kimpression@gmail.com.'; }
  });
})();
