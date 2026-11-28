// Reads uploaded home drawings with Gemini (free tier) and returns a room-by-room load list.
import { readJson, send, onlyPost, verifyToken, allow } from './_lib.js';

const API = 'https://generativelanguage.googleapis.com/v1beta';
const ROOM_TYPES = ['living', 'dining', 'kitchen', 'master_bedroom', 'bedroom', 'kids_bedroom', 'study', 'puja', 'bathroom',
  'balcony', 'entrance', 'passage', 'utility', 'home_theatre', 'terrace', 'staircase', 'other'];

const PROMPT = `You are an electrical estimator for Neonest, a smart home automation company in Mumbai, India.
The user has uploaded drawings of ONE home: possibly a civil/architectural floor plan, an electrical layout, a furniture layout and/or 3D interior views.

Read every drawing and return a room-by-room list of electrical loads that a smart switch plate would control.
For each habitable room give:
- name (as written on the drawing, else a sensible name), type (one of: ${ROOM_TYPES.join(', ')}), approximate area in sq ft if dimensions are given (else 0)
- lights: number of separately switched light circuits/points (ceiling lights, downlight groups, cove/profile strips, wall lights, pendants, exhaust counted as a light)
- fans: ceiling/exhaust fans needing a regulator
- curtains: windows or openings that would get a motorised curtain/blind (normally 0 for bathrooms, kitchens and passages)
- sockets: USB/universal sockets wanted ON the switch plates (usually 1 near bed or sofa, else 0)
- boards: number of switchboard locations in the room
- ac: number of air conditioners, tv: number of TVs
- estimated: true if you guessed (no electrical layout or symbols unclear), false if counted from electrical symbols
Counting rules: if an electrical layout exists, count its symbols. If only a civil plan exists, estimate using typical Mumbai apartment practice (living 6-10 light points, bedroom 4-6, kitchen 3-4, bathroom 2, balcony 1-2; one fan per bedroom/living unless AC-only; curtains = number of windows in living/bedrooms). Use 3D views for cove lighting, curtains, TV units and pendants.
Merge the same room across drawings. Ignore title blocks, legends and dimension text. Do not invent rooms that are not shown.
Also return: drawing_types (what you saw), home_type guess (1 BHK, 2 BHK, 3 BHK, 4 BHK, Villa or Unknown), main_door (true if an entrance door is visible), and a short plain-English note (max 2 sentences) for the homeowner about what you read and what you had to estimate.
If the images are not home drawings, return an empty rooms list and say so in the note.`;

const SCHEMA = {
  type: 'OBJECT',
  properties: {
    drawing_types: { type: 'ARRAY', items: { type: 'STRING' } },
    home_type: { type: 'STRING' },
    main_door: { type: 'BOOLEAN' },
    note: { type: 'STRING' },
    rooms: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' }, type: { type: 'STRING' }, area_sqft: { type: 'NUMBER' },
          lights: { type: 'INTEGER' }, fans: { type: 'INTEGER' }, curtains: { type: 'INTEGER' }, sockets: { type: 'INTEGER' },
          boards: { type: 'INTEGER' }, ac: { type: 'INTEGER' }, tv: { type: 'INTEGER' }, estimated: { type: 'BOOLEAN' }
        },
        required: ['name', 'type', 'lights', 'fans', 'curtains', 'sockets', 'boards', 'ac', 'tv', 'estimated']
      }
    }
  },
  required: ['rooms', 'note']
};

let modelCache = null;
async function candidateModels(key) {
  if (process.env.GEMINI_MODEL) return process.env.GEMINI_MODEL.split(',').map((s) => s.trim()).filter(Boolean);
  if (modelCache) return modelCache;
  const fallback = ['gemini-flash-latest', 'gemini-flash-lite-latest'];
  try {
    const r = await fetch(`${API}/models?pageSize=200`, { headers: { 'x-goog-api-key': key } });
    if (!r.ok) return fallback;
    const j = await r.json();
    const names = (j.models || [])
      .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map((m) => m.name.replace(/^models\//, ''))
      .filter((n) => /^gemini-/.test(n) && /flash/.test(n) && !/(image|tts|audio|live|embedding|thinking|exp|preview|robotics|computer)/.test(n));
    const ver = (n) => parseFloat((n.match(/gemini-(\d+(?:\.\d+)?)/) || [0, 0])[1]);
    const full = names.filter((n) => !/lite/.test(n) && !/latest/.test(n)).sort((a, b) => ver(b) - ver(a));
    const lite = names.filter((n) => /lite/.test(n) && !/latest/.test(n)).sort((a, b) => ver(b) - ver(a));
    const aliases = names.filter((n) => /latest/.test(n));
    const list = [...new Set([...aliases.filter((n) => !/lite/.test(n)), ...full.slice(0, 2), ...aliases.filter((n) => /lite/.test(n)), ...lite.slice(0, 2)])];
    modelCache = list.length ? list : fallback;
    return modelCache;
  } catch { return fallback; }
}

const clampInt = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.round(Number(v) || 0)));
function clean(out) {
  const rooms = Array.isArray(out.rooms) ? out.rooms.slice(0, 30) : [];
  return {
    drawing_types: (out.drawing_types || []).map(String).slice(0, 6),
    home_type: String(out.home_type || 'Unknown').slice(0, 20),
    main_door: !!out.main_door,
    note: String(out.note || '').slice(0, 400),
    rooms: rooms.map((r) => ({
      name: String(r.name || 'Room').slice(0, 40),
      type: ROOM_TYPES.includes(r.type) ? r.type : 'other',
      area_sqft: Math.max(0, Math.round(Number(r.area_sqft) || 0)),
      lights: clampInt(r.lights, 0, 30), fans: clampInt(r.fans, 0, 6), curtains: clampInt(r.curtains, 0, 8),
      sockets: clampInt(r.sockets, 0, 6), boards: clampInt(r.boards, 1, 6), ac: clampInt(r.ac, 0, 4), tv: clampInt(r.tv, 0, 3),
      estimated: !!r.estimated
    }))
  };
}

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return;
  const key = process.env.GEMINI_API_KEY;
  if (!key) return send(res, 503, { ok: false, error: 'AI reader is not configured yet.' });
  const b = await readJson(req);
  const sess = verifyToken(b.token);
  if (!sess) return send(res, 401, { ok: false, error: 'Your session has expired. Please fill the form again.' });
  if (!allow('a:' + sess.p, 6, 24 * 60 * 60 * 1000)) return send(res, 429, { ok: false, error: 'You have used today\'s drawing analyses. Please fill the rooms in manually or try tomorrow.' });

  const imgs = Array.isArray(b.images) ? b.images.slice(0, 8) : [];
  const ok = imgs.filter((i) => i && /^image\/(jpeg|png|webp)$/.test(i.mime) && typeof i.data === 'string' && i.data.length < 3_000_000);
  if (!ok.length) return send(res, 400, { ok: false, error: 'Please upload at least one drawing (PDF, JPG or PNG).' });

  const parts = [{ text: PROMPT }];
  ok.forEach((i, n) => { parts.push({ text: `Drawing ${n + 1}${i.label ? ' (' + String(i.label).slice(0, 60) + ')' : ''}:` }); parts.push({ inline_data: { mime_type: i.mime, data: i.data } }); });
  const body = { contents: [{ role: 'user', parts }], generationConfig: { temperature: 0.2, maxOutputTokens: 8192, responseMimeType: 'application/json', responseSchema: SCHEMA } };

  const models = await candidateModels(key);
  let lastErr = 'unknown';
  for (const model of models) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 50_000);
    try {
      const r = await fetch(`${API}/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST', signal: ctl.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify(body)
      });
      clearTimeout(t);
      if (r.status === 404 || r.status === 429 || r.status >= 500) { lastErr = model + ':' + r.status; continue; }
      const j = await r.json();
      if (!r.ok) { lastErr = model + ':' + r.status + ':' + (j.error && j.error.message || ''); continue; }
      const text = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('');
      let parsed;
      try { parsed = JSON.parse(text); } catch { lastErr = model + ':bad-json'; continue; }
      return send(res, 200, { ok: true, model, ...clean(parsed) });
    } catch (e) {
      clearTimeout(t);
      lastErr = model + ':' + (e.name === 'AbortError' ? 'timeout' : 'network');
    }
  }
  console.error('analyze failed', lastErr);
  return send(res, 502, { ok: false, error: 'Our AI reader is busy right now. Please fill your rooms in below, or try again in a few minutes.', detail: lastErr });
}
