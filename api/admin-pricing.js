const fs=require('fs'),path=require('path');
const ALLOWED=['babaoussou@gmail.com','caliph.safe@gmail.com'];
const baseHeaders=()=>({apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'});
async function auth(req){const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');if(!token||!process.env.SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)return null;const r=await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`,{headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${token}`}});if(!r.ok)return null;const u=await r.json();return ALLOWED.includes((u.email||'').toLowerCase())?u:null}
module.exports=async(req,res)=>{
 const user=await auth(req);if(!user)return res.status(401).json({error:'Unauthorized. Sign in again with an approved administrator account.'});
 const file=path.join(process.cwd(),'data/products.json');const base=JSON.parse(fs.readFileSync(file,'utf8'));
 if(req.method==='GET'){
  try{const r=await fetch(`${process.env.SUPABASE_URL}/rest/v1/product_pricing?select=*`,{headers:baseHeaders()});if(!r.ok)throw new Error(await r.text());const rows=await r.json();const map=Object.fromEntries(rows.map(x=>[x.product_slug,x]));return res.status(200).json(base.map(p=>{const x=map[p.slug];return x?{...p,orderMode:x.order_mode,pricing:{...p.pricing,setup:Number(x.setup),sqftRate:Number(x.sqft_rate),unitRate:Number(x.unit_rate),minimum:Number(x.minimum)}}:p}));}catch(error){return res.status(500).json({error:'Unable to read pricing from Supabase. Confirm the product_pricing table exists and the server variables are correct.'});}
 }
 if(req.method==='PUT'){
  if(!Array.isArray(req.body))return res.status(400).json({error:'Invalid pricing payload.'});
  const rows=req.body.map(p=>({product_slug:p.slug,product_name:p.name,order_mode:p.orderMode==='online'?'online':'quote',setup:Number(p.pricing?.setup)||0,sqft_rate:Number(p.pricing?.sqftRate)||0,unit_rate:Number(p.pricing?.unitRate)||0,minimum:Number(p.pricing?.minimum)||0,currency:'USD',is_active:true,updated_by:user.id,updated_at:new Date().toISOString()}));
  const r=await fetch(`${process.env.SUPABASE_URL}/rest/v1/product_pricing?on_conflict=product_slug`,{method:'POST',headers:{...baseHeaders(),Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(rows)});if(!r.ok)return res.status(500).json({error:'Supabase rejected the pricing update. Confirm the table columns and unique product_slug constraint.'});return res.status(200).json({message:'Pricing saved successfully.'});
 }
 res.setHeader('Allow','GET, PUT');return res.status(405).json({error:'Method not allowed.'});
};