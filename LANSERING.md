# Lanseringschecklista — synlighet i Google

Ordnad efter prioritet. (JS = Dennis gör, 🤖 = Claude kan göra/verifiera)

## Vecka 1 — teknisk grund

- [x] **Koppla domänen** — KLAR 2026-07-26 ✅
  - Domän köpt hos Strato, DNS på Cloudflare, Railway-integration för `www`
  - Apex → www via Cloudflare Redirect Rule (301, bevarar path + query)
  - Verifierat: cert OK, www 200, apex 301, sitemap/robots/og-bild 200
- [ ] **Google Search Console** (JS) — [search.google.com/search-console](https://search.google.com/search-console)
  - Verifiera domänen via DNS-post
  - Skicka in sitemap: `https://www.dtcsundsvall.se/sitemap-index.xml`
  - Begär indexering av startsidan + /tjanster/taklaggning/
- [ ] **Google Business Profile** (JS) — [business.google.com](https://business.google.com)
  - Exakt NAP: DTC Sundsvall AB, Vikarbodarna 140, 862 96 Njurunda + riktigt telefonnummer
  - Kategorier: Byggfirma (primär), Takläggare, Snickare
  - Ladda upp logga + arbetsbilder, länka till sajten
- [x] **Riktigt telefonnummer** — KLAR ✅ 070-333 05 87 överallt
  (Footer, kontaktsidan, startsidans CTA, integritetspolicyn, Seo.astro/JSON-LD)
- [x] **Resend + mail** — KLAR 2026-07-28 ✅
  - Domän verifierad i Resend, formuläret skickar från `offert@dtcsundsvall.se`
  - `info@dtcsundsvall.se` via Cloudflare Email Routing → Gmail (+ catch-all)
  - Livetestat: honeypot, validering och riktig förfrågan hela vägen till inkorgen

## Vecka 2 — förstärkning

- [ ] **Google-recensioner** (JS, löpande) — be 3–5 nöjda kunder direkt; gör till rutin efter varje jobb
- [ ] **Kataloger med samma NAP** (JS) — hitta.se, eniro.se, merinfo.se
- [ ] **Bing Webmaster Tools** (JS) — importera från Search Console
- [ ] **Sociala profiler** (JS) — lägg webbadressen på Facebook/Instagram; posta arbetsbilder

## Månad 1+ — innehåll och uppföljning

- [ ] 🤖 Landningssida `/byggfirma-solleftea/` för Sollefteå-området
- [ ] Referensprojekt med ort ("Takbyte i Matfors") när kundgodkännanden finns
- [ ] Följ upp i Search Console månadsvis (sökfraser, klick, positioner)
- [ ] Rich Results Test (Google) — validera LocalBusiness + FAQPage efter lansering
- [ ] Lighthouse mobil ≥ 95 på produktionsdomänen

## Förväntan

Indexerad inom dagar · kartpaketet ger samtal när GBP har recensioner (veckor) ·
organiska positioner byggs upp 2–6 månader.
