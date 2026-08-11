const $=(s,c=document)=>c.querySelector(s); const $$=(s,c=document)=>[...c.querySelectorAll(s)];
$('.menu-toggle')?.addEventListener('click',()=>$('.nav-links')?.classList.toggle('open'));
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
function productModeLabel(mode){return mode==='order'?'Order online':mode==='estimate'?'Instant estimate':'Custom quote'}
window.MA2K={productModeLabel};
