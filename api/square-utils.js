const crypto=require('crypto');
const ALLOWED=['babaoussou@gmail.com','caliph.safe@gmail.com'];
const supabaseHeaders=()=>({apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'});
async function authenticate(req){const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');if(!token||!process.env.SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)return null;const r=await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`,{headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${token}`}});if(!r.ok)return null;const user=await r.json();return ALLOWED.includes((user.email||'').toLowerCase())?user:null;}
function environment(){return (process.env.SQUARE_ENVIRONMENT||'sandbox').toLowerCase()==='production'?'production':'sandbox';}
function squareBase(){return environment()==='production'?'https://connect.squareup.com':'https://connect.squareupsandbox.com';}
function apiBase(){return environment()==='production'?'https://connect.squareup.com':'https://connect.squareupsandbox.com';}
function requireConfig(){const missing=['SQUARE_APPLICATION_ID','SQUARE_APPLICATION_SECRET','SQUARE_REDIRECT_URL','SQUARE_TOKEN_ENCRYPTION_KEY','SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY'].filter(k=>!process.env[k]);if(missing.length)throw new Error(`Missing server configuration: ${missing.join(', ')}`);}
function key(){const raw=process.env.SQUARE_TOKEN_ENCRYPTION_KEY||'';return crypto.createHash('sha256').update(raw).digest();}
function encrypt(value){const iv=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',key(),iv);const encrypted=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]),tag=cipher.getAuthTag();return `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted.toString('base64')}`;}
function decrypt(value){const [iv,tag,data]=String(value).split('.').map(v=>Buffer.from(v,'base64'));const decipher=crypto.createDecipheriv('aes-256-gcm',key(),iv);decipher.setAuthTag(tag);return Buffer.concat([decipher.update(data),decipher.final()]).toString('utf8');}
function randomState(){return crypto.randomBytes(32).toString('hex');}
async function rest(path,options={}){const r=await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`,{...options,headers:{...supabaseHeaders(),...(options.headers||{})}});const text=await r.text();if(!r.ok)throw new Error(text||`Supabase request failed (${r.status})`);return text?JSON.parse(text):null;}
async function connection(){const rows=await rest('square_connections?select=*&is_active=eq.true&order=updated_at.desc&limit=1');return rows?.[0]||null;}
module.exports={authenticate,environment,squareBase,apiBase,requireConfig,encrypt,decrypt,randomState,rest,connection,supabaseHeaders};
