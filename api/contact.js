const { json, readJsonBody, clean } = require('./_utils');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
  const body = await readJsonBody(req);
  if (!body) return json(res, 400, { ok: false, error: 'Invalid JSON' });

  const submission = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 60),
    message: clean(body.message, 4000),
    submittedAt: new Date().toISOString()
  };
  if (!submission.name || !submission.email || !submission.message) {
    return json(res, 400, { ok: false, error: 'Name, email and message are required.' });
  }

  // Connect email, CRM, Supabase, or another service here.
  console.log('MA2K contact submission', submission);
  return json(res, 202, { ok: true, message: 'Contact request accepted for processing.' });
};
