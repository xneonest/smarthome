// Shared helpers for the Neonest AI home designer (not exposed as a route: files starting with "_" are private).
import crypto from 'node:crypto';

export const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxKX_GhZMAhbGHrWVG9VklutlhrfXQkEJQs_sX6xh5X0b2yTzCM-oWU31tdh1TWCwEzSg/exec';

// ---------- request helpers ----------
export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { return {}; }
}
export function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}
export function onlyPost(req, res) {
  if (req.method !== 'POST') { send(res, 405, { ok: false, error: 'Method not allowed' }); return false; }
  return true;
}

// ---------- signed session token (issued after the contact form) ----------
function secret() {
  const base = process.env.SESSION_SECRET || process.env.GEMINI_API_KEY || 'neonest-dev';
  return crypto.createHash('sha256').update('nn-session:' + base).digest();
}
export function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  return body + '.' + sig;
}
export function verifyToken(tok) {
  if (typeof tok !== 'string' || !tok.includes('.')) return null;
  const [body, sig] = tok.split('.');
  const good = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!p.exp || Date.now() > p.exp) return null;
    return p;
  } catch { return null; }
}

// Best-effort per-instance rate limit
const hits = new Map();
export function allow(key, max, windowMs) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) { hits.set(key, arr); return false; }
  arr.push(now); hits.set(key, arr);
  return true;
}

// ---------- lead sheet ----------
export async function sendToSheet(data) {
  try {
    await fetch(SHEET_URL, { method: 'POST', body: JSON.stringify(data), redirect: 'follow' });
    return true;
  } catch { return false; }
}

// ---------- MRP list (from the 2026 catalogue, incl. GST; freight & installation extra) ----------
// Touch plate prices keyed by code -> [Zigbee, WiFi, Touch-only]
const P = (z, w, t) => [z, w, t];
export const TOUCH_MRP = {
  'Socket': P(3950, 3950, 3950),
  '4S': P(13720, 13320, 11970), '2S+1C': P(13720, 13320, 11970), '2C': P(13720, 13320, 11970),
  '2S+1F': P(14390, 13990, 12640), '1F+1C': P(14390, 13990, 12640),
  '4S+1SK': P(17590, 17190, 15840), '2S+1C+1SK': P(17590, 17190, 15840), '2C+1SK': P(17590, 17190, 15840),
  '8S': P(17860, 17460, 16110), '6S+1C': P(17860, 17460, 16110), '4S+2C': P(17860, 17460, 16110),
  '2S+1F+1SK': P(18260, 17860, 16510), '1F+1C+1SK': P(18260, 17860, 16510),
  '6S+1F': P(18530, 18130, 16780), '4S+1F+1C': P(18530, 18130, 16780), '2S+1F+2C': P(18530, 18130, 16780),
  '4S+2F': P(19450, 19050, 17700), '2S+2F+1C': P(19450, 19050, 17700), '2F+2C': P(19450, 19050, 17700),
  '4S+2SK': P(22330, 21930, 20580), '2S+1C+2SK': P(22330, 21930, 20580), '2C+2SK': P(22330, 21930, 20580),
  '8S+1SK': P(22860, 22460, 21110), '6S+1C+1SK': P(22860, 22460, 21110), '4S+2C+1SK': P(22860, 22460, 21110),
  '2S+1F+2SK': P(22990, 22590, 21240), '1F+1C+2SK': P(22990, 22590, 21240),
  '6S+1F+1SK': P(23530, 23130, 21780), '4S+1F+1C+1SK': P(23530, 23130, 21780), '2S+1F+2C+1SK': P(23530, 23130, 21780),
  '10S': P(23930, 23530, 22180), '8S+1C': P(23930, 23530, 22180), '6S+2C': P(23930, 23530, 22180),
  '8S+1F': P(23930, 23530, 22180), '6S+1F+1C': P(23930, 23530, 22180), '4S+1F+2C': P(23930, 23530, 22180),
  '6S+2F': P(23930, 23530, 22180), '4S+2F+1C': P(23930, 23530, 22180), '2S+2F+2C': P(23930, 23530, 22180),
  '4S+2F+1SK': P(24450, 24050, 22700), '2S+2F+1C+1SK': P(24450, 24050, 22700), '2F+2C+1SK': P(24450, 24050, 22700),
  '10S+3SK': P(40980, 40580, 39230), '8S+1C+3SK': P(40980, 40580, 39230), '6S+2C+3SK': P(40980, 40580, 39230),
  '8S+1F+3SK': P(40980, 40580, 39230), '6S+1F+1C+3SK': P(40980, 40580, 39230), '4S+1F+2C+3SK': P(40980, 40580, 39230),
  '6S+2F+3SK': P(40980, 40580, 39230), '4S+2F+1C+3SK': P(40980, 40580, 39230), '2S+2F+2C+3SK': P(40980, 40580, 39230)
};
export const ITEM_MRP = {
  'retro-1': 6470, 'retro-2': 6470, 'retro-3': 6470, 'retro-4': 6470, 'retro-curtain': 6470,
  'cu-motor': 10130 + 21860, // Zigbee 1.2 Nm motor + 10 ft DIY track
  'ac-ir': 2550,
  'gateway': 8090, 'repeater': 5390,
  'ct-sc4': 6820, 'ct-p4': 60630, 'ct-p7': 133140, 'ct-p10': 199060,
  'lk-s200': 18150, 'lk-k390': 31230, 'lk-s3': 31920, 'lk-k300': 51100, 'lk-s5': 48680, 'lk-s7': 79830, 'lk-g1': 30140, 'lk-h1': 9780,
  'se-bell': 15410, 'se-vdp': 40000
};
export function priceOf(item) {
  if (item.kind === 'plate') {
    const row = TOUCH_MRP[item.code];
    if (!row) return null;
    const idx = item.series === 'wifi' ? 1 : item.series === 'touch' ? 2 : 0;
    return row[idx];
  }
  return ITEM_MRP[item.id] ?? null;
}
export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
