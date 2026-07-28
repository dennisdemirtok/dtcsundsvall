# Lanseringschecklista — synlighet i Google

Ordnad efter prioritet. (JS = Dennis gör, 🤖 = Claude kan göra/verifiera)

## Vecka 1 — teknisk grund

- [x] **Koppla domänen** — KLAR 2026-07-26 ✅
  - Domän köpt hos Strato, DNS på Cloudflare, Railway-integration för `www`
  - Apex → www via Cloudflare Redirect Rule (301, bevarar path + query)
  - Verifierat: cert OK, www 200, apex 301, sitemap/robots/og-bild 200
- [x] **Google Search Console** — domän verifierad 2026-07-28 ✅
  - [ ] Skicka in sitemap: fältet i Sitemaps-fliken → skriv `sitemap-index.xml`
- [x] **Google Business Profile** — KLAR 2026-07-28 ✅ (profil skapad med rätt NAP)
  - Obs: Google skickar ofta verifiering (vykort/video) innan profilen syns publikt
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

- [x] 🤖 Artikelsektion `/artiklar/` — KLAR 2026-07-28 ✅ (6 SEO-guider: takbyte-kostnad,
  takbyte steg för steg, takmaterial, altan, ROT 2026, vinterbona fritidshus)
  - [ ] JS: begär indexering av `/artiklar/` + takbyte-artikeln i Search Console
  - [ ] Fyll på med 1–2 artiklar per månad (🤖 skriver utkast på beställning)
- [ ] 🤖 Landningssida `/byggfirma-solleftea/` för Sollefteå-området
- [ ] Referensprojekt med ort ("Takbyte i Matfors") när kundgodkännanden finns
- [ ] Följ upp i Search Console månadsvis (sökfraser, klick, positioner)
- [ ] Rich Results Test (Google) — validera LocalBusiness + FAQPage efter lansering
- [ ] Lighthouse mobil ≥ 95 på produktionsdomänen

## Förväntan

Indexerad inom dagar · kartpaketet ger samtal när GBP har recensioner (veckor) ·
organiska positioner byggs upp 2–6 månader.
