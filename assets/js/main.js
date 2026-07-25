
const MA2K_CONFIG={printflow:{enabled:false,embedUrl:""},endpoints:{contact:"",testimonial:"",customOrder:""}};
const translations={
 en:{nav_work:"Work",nav_solutions:"Solutions",nav_process:"Process",nav_about:"About",nav_start:"Start project",footer_note:"Custom apparel and visual production, made in New Bedford.",builder_title:"Your project",builder_empty:"Start building",builder_open:"View project",form_sent:"Thank you. Your request has been saved and is ready for connection to the MA2K order system."},
 fr:{nav_work:"Réalisations",nav_solutions:"Solutions",nav_process:"Processus",nav_about:"À propos",nav_start:"Démarrer",footer_note:"Vêtements personnalisés et production visuelle, fabriqués à New Bedford.",builder_title:"Votre projet",builder_empty:"Commencer",builder_open:"Voir le projet",form_sent:"Merci. Votre demande a été enregistrée et est prête à être connectée au système de commande MA2K."}
};
const copy={
 home:{en:{hero:"WE MAKE<br>THINGS<br>PEOPLE<br>REMEMBER.",heroSub:"Screen printing first. Embroidery, signage and promotional production when the project calls for more.",primary:"Build your project",secondary:"Explore our work",chapter2:"What are you creating?",chapter2sub:"Start with the outcome. We’ll help choose the right production method.",chapter3:"Made with intention.",chapter4:"Work that leaves the shop—and lives in the world.",quote:"A local print partner should feel like part of your team."},fr:{hero:"NOUS CRÉONS<br>DES OBJETS<br>QUE L’ON<br>RETIENT.",heroSub:"D’abord la sérigraphie. Puis la broderie, la signalétique et les objets promotionnels lorsque le projet demande davantage.",primary:"Créer votre projet",secondary:"Voir nos réalisations",chapter2:"Que créez-vous?",chapter2sub:"Commencez par le résultat souhaité. Nous vous aiderons à choisir la bonne méthode de production.",chapter3:"Fabriqué avec intention.",chapter4:"Des créations qui quittent l’atelier et vivent dans le monde.",quote:"Un imprimeur local doit devenir une extension de votre équipe."}},
 services:{en:{title:"SOLUTIONS",intro:"Every project starts differently. Choose what you’re making or go directly to a production method."},fr:{title:"SOLUTIONS",intro:"Chaque projet commence différemment. Choisissez ce que vous créez ou accédez directement à une méthode de production."}},
 process:{en:{title:"HOW IT’S MADE",intro:"A clear process keeps creative work moving and protects the final result."},fr:{title:"COMMENT C’EST FAIT",intro:"Un processus clair fait avancer la création et protège le résultat final."}},
 work:{en:{title:"SELECTED WORK",intro:"The gallery is ready for MA2K’s full-resolution project photography. Until then, each case-study frame shows how projects will be presented."},fr:{title:"RÉALISATIONS",intro:"La galerie est prête pour les photos haute résolution des projets MA2K. En attendant, chaque étude de cas montre comment les projets seront présentés."}},
 about:{en:{title:"BUILT LOCALLY",intro:"Family-owned production with the flexibility to support a single event, a growing brand or an ongoing organization."},fr:{title:"FABRIQUÉ ICI",intro:"Une production familiale assez flexible pour soutenir un événement, une marque en croissance ou une organisation à long terme."}},
 contact:{en:{title:"LET’S TALK",intro:"Tell us what you’re planning. We’ll help clarify the product, production method and next step."},fr:{title:"PARLONS-EN",intro:"Parlez-nous de votre projet. Nous vous aiderons à préciser le produit, la méthode de production et la prochaine étape."}},
 order:{en:{title:"BUILD YOUR PROJECT",intro:"Make a few selections and your project brief will build itself. Nothing is final until MA2K reviews it with you."},fr:{title:"CRÉEZ VOTRE PROJET",intro:"Faites quelques choix et votre dossier de projet se construira automatiquement. Rien n’est définitif avant la validation avec MA2K."}},
 testimonials:{en:{title:"COMMUNITY NOTES",intro:"Customers will be able to submit feedback here. New testimonials remain pending until reviewed by MA2K."},fr:{title:"MOTS DE LA COMMUNAUTÉ",intro:"Les clients pourront laisser un avis ici. Les nouveaux témoignages resteront en attente jusqu’à leur validation par MA2K."}}
};
const pageKey=document.body.dataset.page||'home';
let lang=localStorage.getItem('ma2k-lang')||(navigator.language||'en').toLowerCase().startsWith('fr')?'fr':'en';
function applyLanguage(){document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.textContent=translations[lang][key]});const c=copy[pageKey]?.[lang];if(c)Object.entries(c).forEach(([key,val])=>document.querySelectorAll(`[data-copy="${key}"]`).forEach(el=>el.innerHTML=val));document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));document.querySelectorAll('[data-en]').forEach(el=>{el.innerHTML=el.dataset[lang]||el.dataset.en});renderSummary()}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;localStorage.setItem('ma2k-lang',lang);applyLanguage()}));
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');if(menu)menu.addEventListener('click',()=>nav.classList.toggle('open'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
let project=JSON.parse(localStorage.getItem('ma2k-project')||'{}');
function saveProject(){localStorage.setItem('ma2k-project',JSON.stringify(project));renderSummary()}
document.querySelectorAll('[data-project-key]').forEach(btn=>{const key=btn.dataset.projectKey,val=btn.dataset.value;btn.classList.toggle('selected',project[key]===val);btn.addEventListener('click',()=>{project[key]=val;document.querySelectorAll(`[data-project-key="${key}"]`).forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');saveProject()})});
function renderSummary(){document.querySelectorAll('[data-summary]').forEach(box=>{const labels=lang==='fr'?{project:'Projet',product:'Produit',quantity:'Quantité',method:'Méthode',timeline:'Échéance'}:{project:'Project',product:'Product',quantity:'Quantity',method:'Method',timeline:'Timeline'};const rows=Object.entries(labels).filter(([k])=>project[k]).map(([k,l])=>`<div class="summary-row"><span>${l}</span><strong>${project[k]}</strong></div>`).join('');box.innerHTML=rows||`<p class="tiny">${translations[lang].builder_empty}</p>`});document.querySelectorAll('[data-project-count]').forEach(el=>el.textContent=Object.keys(project).length)}
function prefills(){document.querySelectorAll('[data-project-prefill]').forEach(el=>{const key=el.dataset.projectPrefill;if(project[key]&&!el.value)el.value=project[key]})}
prefills();
document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('.form-status');if(status)status.textContent=translations[lang].form_sent;if(form.id==='testimonial-form'){const entries=JSON.parse(localStorage.getItem('ma2k-testimonials')||'[]');entries.push(Object.fromEntries(new FormData(form)));localStorage.setItem('ma2k-testimonials',JSON.stringify(entries))}if(form.id==='order-form'){project={...project,...Object.fromEntries(new FormData(form))};saveProject()}form.reset()}));
const embed=document.querySelector('[data-printflow]');if(embed&&MA2K_CONFIG.printflow.enabled&&MA2K_CONFIG.printflow.embedUrl){embed.innerHTML=`<iframe src="${MA2K_CONFIG.printflow.embedUrl}" title="Printflow custom order" style="width:100%;min-height:900px;border:0;border-radius:24px"></iframe>`}
applyLanguage();renderSummary();


// Photo-library fallbacks: intentional placeholders until JPGs are uploaded.
document.querySelectorAll('.photo-frame img').forEach((img)=>{
  const frame=img.closest('.photo-frame');
  const missing=()=>frame&&frame.classList.add('is-missing');
  img.addEventListener('error',missing);
  img.addEventListener('load',()=>frame&&frame.classList.remove('is-missing'));
  if(img.complete && !img.naturalWidth) missing();
});
