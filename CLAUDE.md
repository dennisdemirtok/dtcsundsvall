# Teknisk specifikation — DTC Sundsvall AB (dtcsundsvall.se)

> Marknadssajt för bygg- och snickeriföretag i Njurunda/Sundsvall.
> Byggs lokalt med Claude Code → GitHub → Railway.
> Denna fil kan användas som `CLAUDE.md` / projektbrief i repot.

---

## 1. Mål & krav

- **Syfte:** Generera offertförfrågningar (leads) för bygg, takläggning, renovering, snickeri, underhåll.
- **Målgrupp:** Privatpersoner (villa/fritidshus) i Sundsvallsområdet + BRF/företag.
- **SEO-primärt:** "byggfirma Sundsvall", "takläggning Sundsvall", "takbyte Sundsvall", "snickeri Njurunda", "renovering Sundsvall", "byggföretag Västernorrland".
- **Prestanda:** Lighthouse ≥ 95 på Performance/SEO/Accessibility/Best Practices (mobil).
- **Responsiv:** Mobile-first, testad 360px → 1440px+.
- **Språk:** Svenska (`lang="sv"`), sv_SE i og-taggar.

## 2. Teknikstack

| Lager | Val | Motivering |
|---|---|---|
| Framework | **Astro 4** (statisk output + en API-route) | Bäst-i-klass SEO/prestanda för content-sajter, noll JS by default, enkel att utöka |
| Styling | Vanilla CSS med custom properties (alt. Tailwind om du föredrar) | Designtokens finns redan definierade, litet scope |
| Typsnitt | Google Fonts self-hostade via `@fontsource` (Archivo variable, Inter, IBM Plex Mono) | Ingen extern request, bättre LCP + GDPR |
| Formulär-backend | Astro API-route (`/api/contact`) på Node-adapter + **Resend** (alt. SMTP via Nodemailer) | Railway kör Node ändå; Resend har generös gratisnivå |
| Spam-skydd | Honeypot-fält + rate limit (enkel in-memory) | Räcker för denna volym, ingen Captcha-friktion |
| Hosting | **Railway** (Node server via `@astrojs/node` standalone) | Din befintliga infra |
| CI/CD | GitHub → Railway auto-deploy från `main` | |
| Analytics | Plausible/Umami script-tag (valfritt, GDPR-vänligt) | |

> **Alternativ:** Om du hellre kör ren statisk sajt: `astro build` → serve med Caddy/`serve` på Railway och lägg formuläret på Formspree. Men API-routen ger full kontroll och du har redan Resend-mönster från andra projekt.

## 3. Repostruktur

```
dtc-sundsvall/
├── CLAUDE.md                  # denna spec
├── astro.config.mjs           # node adapter, site: https://www.dtcsundsvall.se
├── package.json
├── railway.json               # (valfritt) build/start-kommandon
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── images/                # projektbilder (WebP/AVIF)
├── src/
│   ├── styles/
│   │   └── global.css         # tokens + bas
│   ├── components/
│   │   ├── Header.astro       # sticky nav + mobilmeny
│   │   ├── Hero.astro         # taklinje-SVG 27°
│   │   ├── Ruler.astro        # måttbands-divider (signaturelement)
│   │   ├── ServiceCard.astro
│   │   ├── Services.astro
│   │   ├── About.astro
│   │   ├── Process.astro
│   │   ├── AreaRot.astro      # verksamhetsområde + ROT-kort
│   │   ├── ContactForm.astro  # klientvalidering + fetch till /api/contact
│   │   ├── Footer.astro
│   │   └── Seo.astro          # meta + JSON-LD, tar props per sida
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── tjanster/
│   │   │   ├── taklaggning.astro      # landningssida per tjänst (SEO)
│   │   │   ├── byggnation.astro
│   │   │   ├── renovering.astro
│   │   │   ├── snickeri.astro
│   │   │   └── underhall.astro
│   │   ├── om-oss.astro
│   │   ├── kontakt.astro
│   │   ├── integritetspolicy.astro
│   │   ├── 404.astro
│   │   └── api/
│   │       └── contact.ts     # POST-endpoint
│   └── data/
│       └── services.ts        # tjänstedata som TS-objekt (single source)
└── .env.example
```

**Viktigt SEO-beslut:** utkastet var en one-pager, men bygg **separata tjänstesidor** under `/tjanster/*`. En dedikerad sida för "Takläggning Sundsvall" rankar mångdubbelt bättre än ett ankare på startsidan. Startsidan länkar till dem med tjänstekorten.

## 4. Designtokens

```css
:root {
  /* Färger */
  --spruce: #15231B;       /* mörk grangrön — hero, process, footer */
  --spruce-2: #1D3126;
  --pine: #2F5240;         /* hover på mörka knappar */
  --paper: #F7F5F0;        /* bas-bakgrund */
  --paper-2: #EFEBE2;      /* alternerande sektioner */
  --timber: #C98F45;       /* accent — CTA, detaljer, taklinje */
  --timber-deep: #A9712F;
  --ink: #1A211C;
  --ink-soft: #5A655D;
  --line: #D8D2C4;
  --line-dark: rgba(247,245,240,.14);

  /* Typografi */
  --font-display: 'Archivo Variable', sans-serif;  /* wght 700–900, wdth 70–80%, UPPERCASE */
  --font-body: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;         /* eyebrows, virkesdimensioner, etiketter */

  --radius: 10px;
  --maxw: 1160px;
}
```

Typskala: H1 `clamp(44px, 7.5vw, 92px)` / H2 `clamp(30px, 4vw, 44px)` / body 16px / mono-etiketter 12–13px med `letter-spacing: .1em+`.

**Signaturelement (behåll dessa — de gör designen igenkännbar):**
1. **Taklinje-SVG i heron:** diagonala linjer i 27° lutning med takstolar och `27°`-etikett i timber-färg.
2. **Måttbands-dividers** (`Ruler.astro`): repeating-linear-gradient som liknar tumstock, mellan sektioner.
3. **Virkesdimensioner som kortetiketter:** `45 × 220`, `TAK 27°`, `28 × 120`, `FIN 16 × 69` i mono ovanför tjänsterubriker.

Motion: subtil `translateY(-4px)` + skugga på kort-hover, inget mer. Respektera `prefers-reduced-motion`.

## 5. Sidor & innehåll

### 5.1 Startsida `/`
Sektionsordning: Hero → Ruler → Tjänster (6 kort) → Om oss → Process (4 steg) → Område + ROT → Ruler → Kontakt-CTA.
- H1: "Byggt för att hålla i norrländskt klimat" (em på "norrländskt" i timber).
- Hero-meta: 100 % helhetsansvar / F-skatt & försäkrade / ROT 50 000.
- Tjänstekorten länkar till respektive `/tjanster/*`-sida.

### 5.2 Tjänstesidor `/tjanster/*`
Mall per sida (data från `src/data/services.ts`):
- H1 med tjänst + ort: t.ex. "Takläggning & takbyte i Sundsvall".
- 2–3 stycken beskrivande text med naturliga nyckelord (ej keyword stuffing).
- Punktlista över deltjänster.
- FAQ-block (3–5 frågor) med `FAQPage` JSON-LD — stark SEO-signal, ger rich snippets.
- CTA-sektion → kontaktformulär.
- Intern länkning till 2 relaterade tjänster.

FAQ-exempel för takläggning: "Vad kostar ett takbyte i Sundsvall?", "Hur lång tid tar en takomläggning?", "Vilket takmaterial passar norrländskt klimat?", "Gäller ROT-avdrag för takbyte?".

### 5.3 Kontakt `/kontakt`
Formulärfält: namn*, telefon*, e-post*, typ av projekt (select), beskrivning (textarea), honeypot (dolt fält `company`).
NAP-block (Name, Address, Phone) — **måste matcha Google Business Profile exakt**.

### 5.4 Övrigt
- `integritetspolicy.astro` — GDPR-text för formulärdata (krävs).
- `404.astro` — enkel, med länkar till tjänster + kontakt.

## 6. SEO-implementation

### 6.1 `Seo.astro` (per sida via props)
- `<title>` unik per sida, format: `{Tjänst} i Sundsvall | DTC Sundsvall AB` (max ~60 tecken).
- Meta description unik per sida, 150–160 tecken, med CTA ("begär kostnadsfri offert").
- Canonical, og:*, `og:locale=sv_SE`.

### 6.2 Strukturerad data (JSON-LD)
- **Alla sidor:** `GeneralContractor` (LocalBusiness-subtyp) med `areaServed`: Sundsvall, Njurunda, Kvissleby, Matfors, Timrå, Alnö, Stöde, Söråker. Fyll i riktigt telefonnummer, org-adress, `openingHoursSpecification`, `geo` (lat/lng för Njurunda).
- **Tjänstesidor:** + `Service`-schema och `FAQPage`.
- **Breadcrumbs:** `BreadcrumbList` på undersidor.

### 6.3 Tekniskt
- `@astrojs/sitemap` → `sitemap-index.xml`, refereras i `robots.txt`.
- Alla bilder: beskrivande `alt` på svenska, WebP/AVIF via `astro:assets`, lazy loading utom hero.
- Semantik: exakt en H1 per sida, logisk H2/H3-hierarki.
- Interna länkar med beskrivande ankartext ("takläggning i Sundsvall", inte "läs mer").
- 301-redirect www/apex-variant (välj en kanonisk, förslagsvis `www`).

### 6.4 Efter lansering (checklista, utanför koden)
- [ ] Google Search Console: verifiera + skicka sitemap.
- [ ] Google Business Profile: skapa/claima, exakt NAP-match, kategorier "Byggfirma", "Takläggare".
- [ ] Bing Webmaster Tools.
- [ ] Registrera i lokala kataloger (hitta.se, eniro, merinfo) med samma NAP.

## 7. Kontaktformulär — API

### `POST /api/contact`
```ts
// src/pages/api/contact.ts
// 1. Parsa JSON body: { name, phone, email, type, message, company }
// 2. Honeypot: om company !== "" → returnera 200 (låtsas OK), skicka inget
// 3. Validera: name/phone/email required, email-regex, message max 5000 tecken
// 4. Rate limit: max 5 requests/IP/timme (Map i minnet räcker)
// 5. Skicka mail via Resend till LEAD_EMAIL med reply-to = avsändarens e-post
// 6. Returnera { ok: true } / { ok: false, error }
```

Klientsidan: `fetch` med JSON, disable-knapp under sändning, visa bekräftelse i formuläret ("Tack! Vi hör av oss inom en arbetsdag."), felmeddelande med telefonnummer som fallback.

### Miljövariabler (`.env.example`)
```
RESEND_API_KEY=
LEAD_EMAIL=info@dtcsundsvall.se
SITE_URL=https://www.dtcsundsvall.se
```

## 8. Astro-konfiguration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.dtcsundsvall.se',
  output: 'hybrid',              // statiska sidor + SSR för /api/contact
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap()],
});
```

```json
// package.json (relevanta scripts)
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "start": "node ./dist/server/entry.mjs"
  }
}
```

## 9. Deployment — GitHub + Railway

### 9.1 GitHub
```bash
gh repo create dtc-sundsvall --private --source=. --push
```
- Branch-strategi: `main` = produktion. Feature branches + PR om ni är fler.
- `.gitignore`: `node_modules`, `dist`, `.env`.

### 9.2 Railway
1. New Project → Deploy from GitHub repo → välj `dtc-sundsvall`.
2. Railway detekterar Node via Nixpacks automatiskt. Vid behov, explicit:
   ```json
   // railway.json
   {
     "build": { "builder": "NIXPACKS", "buildCommand": "npm run build" },
     "deploy": {
       "startCommand": "npm run start",
       "healthcheckPath": "/",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```
3. Variables: `RESEND_API_KEY`, `LEAD_EMAIL`, `SITE_URL`. Astro/Node läser `PORT` från Railway automatiskt — se till att start lyssnar på `process.env.PORT` och `HOST=0.0.0.0` (node-adaptern gör detta om `HOST`/`PORT` env sätts; lägg `HOST=0.0.0.0` i variables).
4. Settings → Networking → Custom Domain: `www.dtcsundsvall.se` → lägg CNAME hos DNS-leverantören. Apex `dtcsundsvall.se` → redirect till www (DNS-leverantörens redirect eller ALIAS + redirect i appen).
5. Auto-deploy från `main` är på by default.

### 9.3 Verifiering efter deploy
- [ ] `curl -I https://www.dtcsundsvall.se` → 200, korrekt cert.
- [ ] `/sitemap-index.xml` och `/robots.txt` svarar.
- [ ] Testa formuläret → mail landar i `LEAD_EMAIL`.
- [ ] Lighthouse mobil ≥ 95 överallt.
- [ ] Rich Results Test (Google) validerar LocalBusiness + FAQPage.

## 10. Tillgänglighet (kvalitetsgolv)

- Synligt `:focus-visible` (3px timber-outline).
- Mobilmeny: `aria-expanded`, `aria-controls`, stängs vid länk-klick och `Escape`.
- Kontrast: timber-på-spruce OK för stora rubriker; för brödtext på mörk bakgrund använd `rgba(247,245,240,.82)` eller ljusare. Kör axe/Lighthouse-kontroll.
- Alla formulärfält med `<label for>`, felmeddelanden kopplade via `aria-describedby`.
- `prefers-reduced-motion` stänger av transitions/animationer.

## 11. Byggordning (förslag till Claude Code-sessioner)

1. **Scaffold:** `npm create astro@latest`, node-adapter, sitemap, fontsource, tokens i `global.css`, `Base.astro` + `Seo.astro`.
2. **Startsida:** Header, Hero (taklinje-SVG), Ruler, Services, About, Process, AreaRot, Footer — portera från befintligt HTML-utkast (`dtc-sundsvall.html`).
3. **Tjänstesidor:** `services.ts`-data, sidmall, FAQ-block + FAQPage-schema.
4. **Formulär:** ContactForm + `/api/contact` + Resend, honeypot, rate limit.
5. **SEO-finish:** JSON-LD komplett, sitemap, robots, og-bilder, 404, integritetspolicy.
6. **Deploy:** GitHub-repo, Railway-projekt, env vars, custom domain, verifieringschecklista.

Referens-HTML för hela designen finns i `dtc-sundsvall.html` — porta CSS/markup därifrån 1:1 till komponenter.

## 12. Öppna frågor att fylla i före lansering

- [ ] Riktigt telefonnummer, e-post, exakt besöks-/postadress, org.nr.
- [ ] Domän: äger DTC `dtcsundsvall.se`? (kolla + registrera annars)
- [ ] Projektbilder från riktiga jobb (min. hero + 1 per tjänst).
- [ ] Ev. referenser/omdömen med kundens godkännande.
- [ ] Vem tar emot leads-mailen och äger Resend-kontot?
