const ALLOWED=['babaoussou@gmail.com','caliph.safe@gmail.com'];
let sb=null,session=null,products=[];
const $=s=>document.querySelector(s);
const status=(message,type='')=>{const el=$('#admin-status');if(el){el.textContent=message;el.dataset.type=type}};
const consoleStatus=(message,type='')=>{const el=$('#admin-console-status');if(el){el.textContent=message;el.dataset.type=type}};
async function resolveConfig(){
 const local=window.MA2K_CONFIG?.supabase||{};
 if(local.url&&local.anonKey)return local;
 try{const r=await fetch('/api/public-config',{cache:'no-store'});if(r.ok){const c=await r.json();if(c.supabaseUrl&&c.supabaseAnonKey)return{url:c.supabaseUrl,anonKey:c.supabaseAnonKey}}}catch(e){}
 throw new Error('Supabase is not configured. Add the project URL and public key in assets/js/config.js or Vercel environment variables.');
}
async function init(){
 status('Checking secure connection…');
 try{
  if(!window.supabase?.createClient)throw new Error('The Supabase library did not load. Check the browser connection or content-security settings.');
  const cfg=await resolveConfig();
  sb=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  sb.auth.onAuthStateChange((_event,next)=>{if(next)activate(next);});
  const {data,error}=await sb.auth.getSession();
  if(error)throw error;
  if(data.session)await activate(data.session);else status('Ready to sign in.');
 }catch(error){status(error.message||'Unable to initialize administrator login.','error');}
}
async function activate(nextSession){
 if(!nextSession?.user){status('No authenticated session was returned.','error');return;}
 const email=(nextSession.user.email||'').toLowerCase();
 if(!ALLOWED.includes(email)){await sb.auth.signOut();status('This account is not authorized for MA2K pricing.','error');return;}
 session=nextSession;
 $('#admin-auth').hidden=true;$('#admin-console').hidden=false;$('#admin-user').textContent=`Signed in as ${email}`;
 await loadProducts();
}
async function api(path,options={}){
 if(!session?.access_token)throw new Error('Your session expired. Sign in again.');
 const r=await fetch(path,{...options,headers:{...(options.headers||{}),Authorization:`Bearer ${session.access_token}`}});
 const data=await r.json().catch(()=>({}));
 if(!r.ok)throw new Error(data.error||`Request failed (${r.status})`);
 return data;
}
async function loadProducts(){
 consoleStatus('Loading pricing…');
 try{products=await api('/api/admin-pricing');render();consoleStatus(`${products.length} products loaded.`,'success');}
 catch(error){consoleStatus(error.message,'error');}
}
function render(){
 $('#admin-products').innerHTML=products.map((p,i)=>`<article class="admin-product"><div><strong>${p.name}</strong><small>${p.slug}</small></div><label>Mode<select data-i="${i}" data-k="orderMode"><option value="quote" ${p.orderMode==='quote'?'selected':''}>Quote</option><option value="online" ${p.orderMode==='online'?'selected':''}>Order online</option></select></label><label>Setup<input data-i="${i}" data-k="setup" type="number" min="0" step="0.01" value="${p.pricing?.setup??0}"></label><label>Sq. ft.<input data-i="${i}" data-k="sqftRate" type="number" min="0" step="0.01" value="${p.pricing?.sqftRate??0}"></label><label>Unit<input data-i="${i}" data-k="unitRate" type="number" min="0" step="0.01" value="${p.pricing?.unitRate??0}"></label><label>Minimum<input data-i="${i}" data-k="minimum" type="number" min="0" step="0.01" value="${p.pricing?.minimum??0}"></label></article>`).join('');
 document.querySelectorAll('[data-i]').forEach(el=>el.addEventListener('change',()=>{const p=products[Number(el.dataset.i)];if(el.dataset.k==='orderMode')p.orderMode=el.value;else{p.pricing=p.pricing||{};p.pricing[el.dataset.k]=Number(el.value)||0}}));
}
$('#admin-login-form')?.addEventListener('submit',async e=>{
 e.preventDefault();if(!sb){status('The secure connection is not ready. Review the configuration message above.','error');return;}
 const email=$('#admin-email').value.trim().toLowerCase(),password=$('#admin-password').value;
 if(!ALLOWED.includes(email)){status('Use an approved MA2K administrator email.','error');return;}
 const button=$('#admin-login');button.disabled=true;button.textContent='Signing in…';status('Verifying account…');
 try{const {data,error}=await sb.auth.signInWithPassword({email,password});if(error)throw error;if(!data.session)throw new Error('Supabase did not return a session. Confirm the user is verified.');await activate(data.session);}
 catch(error){status(error.message||'Sign in failed.','error');}
 finally{button.disabled=false;button.textContent='Sign in';}
});
$('#admin-save-all')?.addEventListener('click',async()=>{const b=$('#admin-save-all');b.disabled=true;b.textContent='Saving…';consoleStatus('Saving pricing…');try{const result=await api('/api/admin-pricing',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(products)});consoleStatus(result.message||'Pricing saved.','success');}catch(error){consoleStatus(error.message,'error');}finally{b.disabled=false;b.textContent='Save changes';}});
$('#admin-signout')?.addEventListener('click',async()=>{await sb?.auth.signOut();session=null;location.reload();});
init();