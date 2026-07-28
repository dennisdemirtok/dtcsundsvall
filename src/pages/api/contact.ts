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

/* ============================================================
   Mailmallar — inline-CSS + tabellayout (krav i mailklienter)
   ============================================================ */

const C = {
  spruce: '#15231B',
  spruce2: '#1D3126',
  paper: '#F7F5F0',
  paper2: '#EFEBE2',
  timber: '#C98F45',
  ink: '#1A211C',
  inkSoft: '#5A655D',
  line: '#D8D2C4',
};

const FONT = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Gemensamt skal: mörk header med logotyp-text, innehåll, footer */
function emailShell(content: string): string {
  return `<!doctype html>
<html lang="sv">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:${C.paper2};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.paper2};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background-color:${C.spruce};border-radius:10px 10px 0 0;padding:28px 36px;border-bottom:3px solid ${C.timber};">
          <span style="font-family:${FONT};font-size:22px;font-weight:800;letter-spacing:4px;color:${C.paper};">DTC</span>
          <span style="font-family:${FONT};font-size:22px;font-weight:800;letter-spacing:4px;color:${C.timber};">&nbsp;SUNDSVALL</span>
          <div style="font-family:${FONT};font-size:11px;letter-spacing:2px;color:rgba(247,245,240,.6);padding-top:4px;">BYGG &middot; TAK &middot; RENOVERING &middot; SNICKERI</div>
        </td></tr>

        <!-- Innehåll -->
        <tr><td style="background-color:#ffffff;padding:36px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:${C.spruce};border-radius:0 0 10px 10px;padding:24px 36px;">
          <p style="font-family:${FONT};font-size:12px;line-height:1.7;color:rgba(247,245,240,.65);margin:0;">
            DTC Sundsvall AB &middot; Vikarbodarna 140, 862 96 Njurunda<br>
            <a href="tel:+46703330587" style="color:${C.timber};text-decoration:none;">070-333 05 87</a>
            &nbsp;&middot;&nbsp;
            <a href="mailto:info@dtcsundsvall.se" style="color:${C.timber};text-decoration:none;">info@dtcsundsvall.se</a>
            &nbsp;&middot;&nbsp;
            <a href="https://www.dtcsundsvall.se" style="color:${C.timber};text-decoration:none;">dtcsundsvall.se</a><br>
            Org.nr 559145-2353 &middot; F-skatt &amp; f&ouml;rs&auml;krade
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Rad i uppgiftstabellen i lead-mailet */
function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="font-family:${FONT};font-size:11px;letter-spacing:1.5px;color:${C.inkSoft};padding:10px 16px;border-bottom:1px solid ${C.line};white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="font-family:${FONT};font-size:15px;color:${C.ink};padding:10px 16px;border-bottom:1px solid ${C.line};width:100%;">${value}</td>
  </tr>`;
}

/** Lead-mail till DTC */
function leadEmailHtml(name: string, phone: string, email: string, type: string, message: string): string {
  return emailShell(`
    <p style="font-family:${FONT};font-size:12px;letter-spacing:2px;color:${C.timber};font-weight:600;margin:0 0 8px;">NY OFFERTF&Ouml;RFR&Aring;GAN</p>
    <h1 style="font-family:${FONT};font-size:24px;font-weight:800;color:${C.ink};margin:0 0 24px;">${esc(name)}</h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.paper};border:1px solid ${C.line};border-radius:8px;margin-bottom:24px;">
      ${infoRow('TELEFON', `<a href="tel:${esc(phone.replace(/[^+\d]/g, ''))}" style="color:${C.ink};text-decoration:none;font-weight:600;">${esc(phone)}</a>`)}
      ${infoRow('E-POST', `<a href="mailto:${esc(email)}" style="color:${C.ink};text-decoration:none;font-weight:600;">${esc(email)}</a>`)}
      ${infoRow('PROJEKT', esc(type || 'Ej angivet'))}
    </table>

    <p style="font-family:${FONT};font-size:11px;letter-spacing:1.5px;color:${C.inkSoft};margin:0 0 8px;">BESKRIVNING</p>
    <div style="font-family:${FONT};font-size:15px;line-height:1.7;color:${C.ink};background-color:${C.paper};border:1px solid ${C.line};border-radius:8px;padding:18px 20px;margin-bottom:28px;">
      ${esc(message || '—').replace(/\n/g, '<br>')}
    </div>

    <p style="font-family:${FONT};font-size:13px;color:${C.inkSoft};margin:0;">
      Svara p&aring; det h&auml;r mailet s&aring; g&aring;r svaret direkt till kunden.
    </p>
  `);
}

/** Bekräftelsemail till kunden */
function confirmationHtml(name: string, type: string): string {
  const firstName = name.trim().split(/\s+/)[0];
  return emailShell(`
    <p style="font-family:${FONT};font-size:12px;letter-spacing:2px;color:${C.timber};font-weight:600;margin:0 0 8px;">TACK F&Ouml;R DIN F&Ouml;RFR&Aring;GAN</p>
    <h1 style="font-family:${FONT};font-size:24px;font-weight:800;color:${C.ink};margin:0 0 20px;">Hej ${esc(firstName)}!</h1>

    <p style="font-family:${FONT};font-size:15px;line-height:1.7;color:${C.ink};margin:0 0 16px;">
      Vi har tagit emot din offertf&ouml;rfr&aring;gan${type ? ` g&auml;llande <strong>${esc(type.toLowerCase())}</strong>` : ''}
      och &aring;terkommer till dig <strong>inom en arbetsdag</strong> &mdash; oftast snabbare.
    </p>

    <p style="font-family:${FONT};font-size:15px;line-height:1.7;color:${C.ink};margin:0 0 24px;">
      Offerten &auml;r alltid kostnadsfri och du binder dig inte till n&aring;got.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr><td style="background-color:${C.timber};border-radius:8px;">
        <a href="tel:+46703330587" style="display:inline-block;font-family:${FONT};font-size:14px;font-weight:700;color:${C.spruce};text-decoration:none;padding:13px 26px;">Br&aring;ttom? Ring 070-333 05 87</a>
      </td></tr>
    </table>

    <p style="font-family:${FONT};font-size:13px;line-height:1.7;color:${C.inkSoft};margin:0;">
      V&auml;nliga h&auml;lsningar<br>
      <strong style="color:${C.ink};">Handre Sander</strong><br>
      DTC Sundsvall AB
    </p>
  `);
}

/* ============================================================
   Endpoint
   ============================================================ */

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

  const resend = new Resend(apiKey);
  const FROM = 'DTC Sundsvall <offert@dtcsundsvall.se>';

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [leadEmail],
      replyTo: email,
      subject: `Offertförfrågan: ${type || 'Ej angivet'} — ${name}`,
      html: leadEmailHtml(name, phone, email, type, message),
    });

    if (error) {
      console.error('Resend-fel:', error);
      return json({ ok: false, error: 'Kunde inte skicka. Försök igen senare.' }, 502);
    }
  } catch (err) {
    console.error('Oväntat fel vid mailutskick:', err);
    return json({ ok: false, error: 'Kunde inte skicka. Försök igen senare.' }, 502);
  }

  // Bekräftelse till kunden — får aldrig blockera leadet om den strular
  try {
    await resend.emails.send({
      from: FROM,
      to: [email],
      replyTo: leadEmail,
      subject: 'Tack för din förfrågan — vi återkommer inom en arbetsdag',
      html: confirmationHtml(name, type),
    });
  } catch (err) {
    console.error('Kunde inte skicka kundbekräftelse:', err);
  }

  return json({ ok: true });
};
