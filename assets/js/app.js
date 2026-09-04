const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
function installLogo(){document.querySelectorAll('.brand').forEach(b=>{if(!b.querySelector('img')){b.innerHTML='<img src="assets/images/logo.png" alt="MA2K Impression">';}})}
installLogo();
const menu=$('.menu-toggle'),nav=$('.nav-links')||$('.site-nav');menu?.addEventListener('click',()=>{nav?.classList.toggle('open');menu.setAttribute('aria-expanded',nav?.classList.contains('open')?'true':'false')});
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const current=(location.pathname.split('/').pop()||'index.html').split('?')[0];$$('.site-nav a,.nav-links a').forEach(a=>{if((a.getAttribute('href')||'').split('?')[0]===current)a.classList.add('is-active')});
function productModeLabel(mode){return mode==='order'?'Order online':mode==='estimate'?'Instant estimate':'Custom quote'}window.MA2K={productModeLabel};