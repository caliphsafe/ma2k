const { json, readJsonBody, clean } = require('./_utils');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
  const body = await readJsonBody(req);
  if (!body) return json(res, 400, { ok: false, error: 'Invalid JSON' });

  const submission = {
    name: clean(body.name, 120),
    organization: clean(body.organization, 180),
    service: clean(body.service, 120),
    rating: Math.max(1, Math.min(5, Number(body.rating) || 5)),
    testimonial: clean(body.testimonial, 3000),
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  if (!submission.name || !submission.testimonial) {
    return json(res, 400, { ok: false, error: 'Name and testimonial are required.' });
  }

  // Save to Supabase or another moderated datastore here.
  console.log('MA2K testimonial submission', submission);
  return json(res, 202, { ok: true, status: 'pending', message: 'Testimonial submitted for review.' });
};
