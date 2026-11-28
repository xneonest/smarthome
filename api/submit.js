// Receives the finished design, prices it at MRP (server side only) and sends it to the Neonest lead sheet.
import { readJson, send, onlyPost, verifyToken, sendToSheet, priceOf, inr, allow } from './_lib.js';

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return;
  const b = await readJson(req);
  const sess = verifyToken(b.token);
  if (!sess) return send(res, 401, { ok: false, error: 'Session expired' });
  if (!allow('u:' + sess.p, 10, 24 * 60 * 60 * 1000)) return send(res, 429, { ok: false, error: 'Too many submissions today' });

  const items = Array.isArray(b.items) ? b.items.slice(0, 300) : [];
  const lines = []; let total = 0; let unpriced = 0;
  const grouped = new Map();
  for (const it of items) {
    const qty = Math.max(0, Math.min(200, Math.round(Number(it.qty) || 0)));
    if (!qty) continue;
    const label = String(it.label || it.id || it.code || '').slice(0, 120);
    const key = label + '|' + (it.kind === 'plate' ? it.code + it.series : it.id);
    const unit = priceOf(it);
    const g = grouped.get(key) || { label, qty: 0, unit };
    g.qty += qty; grouped.set(key, g);
  }
  for (const g of grouped.values()) {
    if (g.unit == null) { unpriced++; lines.push(`${g.qty} × ${g.label} — price to confirm`); continue; }
    total += g.unit * g.qty;
    lines.push(`${g.qty} × ${g.label} @ ${inr(g.unit)} = ${inr(g.unit * g.qty)}`);
  }
  const summary = String(b.summary || '').slice(0, 6000);
  const message = `[AI Home Designer] Design submitted\n\n${summary}\n\n--- INTERNAL BOQ (MRP, incl. GST; freight & installation extra) ---\n${lines.join('\n')}\nMRP TOTAL: ${inr(total)}${unpriced ? `\n(${unpriced} line(s) need pricing)` : ''}\n\nDrawings: ask client to share on WhatsApp.`;

  await sendToSheet({
    name: sess.n, phone: sess.p, email: String(b.email || ''), city: sess.a, projectType: sess.h,
    automationType: String(b.wiring || ''), siteStatus: String(b.stage || ''), message, source: 'ai-designer', mrpTotal: Math.round(total)
  });
  return send(res, 200, { ok: true });
}
