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

Domänen är verifierad i Resend och formuläret skickar från `offert@dtcsundsvall.se`
till `LEAD_EMAIL` (info@dtcsundsvall.se, som Cloudflare Email Routing vidarebefordrar
till Gmail).

## Före lansering

Alla företagsuppgifter är ifyllda: telefon 070-333 05 87, org.nr 559145-2353,
adress Vikarbodarna 140, 862 96 Njurunda. NAP-uppgifterna måste matcha
Google Business Profile exakt. Full checklista i [LANSERING.md](LANSERING.md).
