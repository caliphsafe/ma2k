const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const menu=$('.menu-toggle');const nav=$('.nav-links');menu?.addEventListener('click',()=>{nav?.classList.toggle('open');menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false')});
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
function productModeLabel(mode){return mode==='order'?'Order online':mode==='estimate'?'Instant estimate':'Custom quote'}
const current=(location.pathname.split('/').pop()||'index.html').split('?')[0];$$('.nav-links a,.site-nav a').forEach(a=>{const href=(a.getAttribute('href')||'').split('?')[0];if(href===current||(current==='product.html'&&href==='catalog.html'))a.classList.add('is-active')});
addEventListener('scroll',()=>$('.site-header')?.classList.toggle('scrolled',scrollY>24),{passive:true});
window.MA2K={productModeLabel};
