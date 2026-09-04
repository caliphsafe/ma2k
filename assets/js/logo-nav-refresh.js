
/* MA2K visual refresh compatibility layer */
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll(".brand").forEach(b=>{b.innerHTML='<img src="assets/images/logo.png" alt="MA2K Impression">';});
 const current=(location.pathname.split("/").pop()||"index.html").split("?")[0];
 document.querySelectorAll(".site-nav a").forEach(a=>{if((a.getAttribute("href")||"").split("?")[0]===current)a.classList.add("is-active")});
});
