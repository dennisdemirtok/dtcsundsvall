# DTC Sundsvall AB — dtcsundsvall.se

Marknadssajt för bygg- och snickeriföretag i Njurunda/Sundsvall.
Byggd med Astro 5 + Node-adapter. Full spec i [CLAUDE.md](CLAUDE.md).

## Utveckling

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # bygger till dist/
npm run start      # kör produktionsservern (dist/server/entry.mjs)
```

## Miljövariabler

Kopiera `.env.example` → `.env`:

| Variabel | Beskrivning |
|---|---|
| `RESEND_API_KEY` | API-nyckel från [resend.com](https://resend.com) |
| `LEAD_EMAIL` | Adress som tar emot offertförfrågningar |
| `SITE_URL` | `https://www.dtcsundsvall.se` |

## Deploy — Railway

1. Skapa GitHub-repo och pusha (`main` = produktion), eller kör `railway up` direkt.
2. Railway: **New Project → Deploy from GitHub repo** → välj repot.
   `railway.json` styr build (`npm run build`) och start (`npm run start`).
3. **Variables:** `RESEND_API_KEY`, `LEAD_EMAIL`, `SITE_URL`, `HOST=0.0.0.0`.
4. **Networking → Custom Domain:** `www.dtcsundsvall.se` (CNAME hos DNS-leverantören).
   Apex `dtcsundsvall.se` → redirect till www.

### Resend

Innan riktiga leads kan skickas: verifiera domänen `dtcsundsvall.se` i Resend och byt
`from`-adressen i `src/pages/api/contact.ts` från `onboarding@resend.dev` till t.ex.
`offert@dtcsundsvall.se`. (Med onboarding-adressen kan Resend bara skicka till
kontoägarens egen e-post — bra för test, inte för produktion.)

## Före lansering

Telefonnumret `060-00 00 00` är fortfarande platshållare — sök på `060-00 00 00`
och `+4660000000` i koden och ersätt (Footer, kontaktsidan, startsidans CTA,
integritetspolicyn och `Seo.astro`). Org.nr (559145-2353) och adress
(Vikarbodarna 140, 862 96 Njurunda) är ifyllda. NAP-uppgifterna måste matcha
Google Business Profile exakt. Full checklista i [CLAUDE.md](CLAUDE.md) §6.4 och §12.
