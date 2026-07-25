const { json, readJsonBody, clean } = require('./_utils');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
  const body = await readJsonBody(req);
  if (!body) return json(res, 400, { ok: false, error: 'Invalid JSON' });

  const submission = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 60),
    project: clean(body.project, 160),
    product: clean(body.product, 160),
    quantity: clean(body.quantity, 80),
    method: clean(body.method, 120),
    timeline: clean(body.timeline, 120),
    details: clean(body.details, 5000),
    submittedAt: new Date().toISOString()
  };
  if (!submission.name || !submission.email) {
    return json(res, 400, { ok: false, error: 'Name and email are required.' });
  }

  // Forward to Printflow or another order-management API here.
  console.log('MA2K custom order submission', submission);
  return json(res, 202, { ok: true, message: 'Custom-order request accepted for processing.' });
};
