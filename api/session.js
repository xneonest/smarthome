// Contact form gate: records the lead and returns a signed token that unlocks the AI designer.
import { readJson, send, onlyPost, signToken, sendToSheet, allow } from './_lib.js';

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return;
  const b = await readJson(req);
  const name = String(b.name || '').trim().slice(0, 80);
  let phone = String(b.phone || '').replace(/\D/g, '');
  if (phone.length === 12 && phone.startsWith('91')) phone = phone.slice(2);
  const area = String(b.area || '').trim().slice(0, 120);
  const email = String(b.email || '').trim().slice(0, 120);
  const home = String(b.home || '').trim().slice(0, 30);
  const stage = String(b.stage || '').trim().slice(0, 40);
  if (!name || phone.length !== 10) return send(res, 400, { ok: false, error: 'Please enter your name and a 10-digit mobile number.' });
  if (!b.consent) return send(res, 400, { ok: false, error: 'Please accept the terms to continue.' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'na';
  if (!allow('s:' + ip, 10, 60 * 60 * 1000)) return send(res, 429, { ok: false, error: 'Too many attempts. Please try again later.' });

  await sendToSheet({
    name, phone, email, city: area, projectType: home, automationType: 'AI home designer', siteStatus: stage,
    message: '[AI Home Designer] New sign-up. Client is now uploading drawings / designing.',
    source: 'ai-designer-signup'
  });
  const token = signToken({ n: name, p: phone, a: area, h: home, exp: Date.now() + 24 * 60 * 60 * 1000 });
  return send(res, 200, { ok: true, token });
}
