import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Enkel in-memory rate limit: max 5 requests/IP/timme
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // städa gamla IP:n så mapen inte växer obegränsat
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Ogiltig förfrågan.' }, 400);
  }

  const name = String(data.name ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const email = String(data.email ?? '').trim();
  const type = String(data.type ?? '').trim();
  const message = String(data.message ?? '').trim();
  const company = String(data.company ?? '').trim();

  // Honeypot: låtsas OK, skicka inget
  if (company !== '') {
    return json({ ok: true });
  }

  if (!name || !phone || !email) {
    return json({ ok: false, error: 'Namn, telefon och e-post krävs.' }, 400);
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return json({ ok: false, error: 'Ogiltig e-postadress.' }, 400);
  }
  if (name.length > 200 || phone.length > 50 || type.length > 100 || message.length > 5000) {
    return json({ ok: false, error: 'Ett eller flera fält är för långa.' }, 400);
  }

  let ip = 'unknown';
  try {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress;
  } catch {
    // clientAddress kan sakna värde i vissa miljöer
  }
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'För många förfrågningar. Försök igen om en stund.' }, 429);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const leadEmail = import.meta.env.LEAD_EMAIL;
  if (!apiKey || !leadEmail) {
    console.error('RESEND_API_KEY eller LEAD_EMAIL saknas i miljövariabler');
    return json({ ok: false, error: 'Servern är felkonfigurerad. Ring oss istället.' }, 500);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'DTC Sundsvall <onboarding@resend.dev>',
      to: [leadEmail],
      replyTo: email,
      subject: `Offertförfrågan: ${type || 'Ej angivet'} — ${name}`,
      html: `
        <h2>Ny offertförfrågan från dtcsundsvall.se</h2>
        <p><strong>Namn:</strong> ${esc(name)}</p>
        <p><strong>Telefon:</strong> ${esc(phone)}</p>
        <p><strong>E-post:</strong> ${esc(email)}</p>
        <p><strong>Typ av projekt:</strong> ${esc(type || 'Ej angivet')}</p>
        <p><strong>Beskrivning:</strong></p>
        <p>${esc(message || '—').replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend-fel:', error);
      return json({ ok: false, error: 'Kunde inte skicka. Försök igen senare.' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Oväntat fel vid mailutskick:', err);
    return json({ ok: false, error: 'Kunde inte skicka. Försök igen senare.' }, 502);
  }
};
