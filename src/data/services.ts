import type { ImageMetadata } from 'astro';

import verandaStomme from '../assets/projekt/veranda-stomme.jpg';
import garageTakstolar from '../assets/projekt/garage-takstolar.jpg';
import plattakGarage from '../assets/projekt/plattak-garage.jpg';
import pooltakSjoutsikt from '../assets/projekt/pooltak-sjoutsikt.jpg';
import pooltakNarbild from '../assets/projekt/pooltak-narbild.jpg';
import kokRenovering from '../assets/projekt/kok-renovering.jpg';
import kokRenovering2 from '../assets/projekt/kok-renovering-2.jpg';
import poolTradackPanorama from '../assets/projekt/pool-tradack-panorama.jpg';
import poolTradack from '../assets/projekt/pool-tradack.jpg';
import tradackPool from '../assets/projekt/tradack-pool.jpg';
import plattakVinter from '../assets/projekt/plattak-vinter.jpg';
import inglasatUterum from '../assets/projekt/inglasat-uterum.jpg';
import verandaKvall from '../assets/projekt/veranda-kvall.jpg';
import inglasadVeranda from '../assets/projekt/inglasad-veranda.jpg';
import takbyteStallning from '../assets/projekt/takbyte-stallning.jpg';
import fasadStallning from '../assets/projekt/fasad-stallning.jpg';
import takrenoveringRivning from '../assets/projekt/takrenovering-rivning.jpg';

export interface ProjectImage {
  src: ImageMetadata;
  alt: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Kortetikett i mono, t.ex. virkesdimension */
  dim: string;
  /** Kort titel (kort på startsidan) */
  title: string;
  /** H1 på tjänstesidan */
  h1: string;
  /** <title> för tjänstesidan */
  metaTitle: string;
  metaDescription: string;
  /** Kort text på tjänstekortet */
  excerpt: string;
  /** Brödtext på tjänstesidan, 2–3 stycken */
  body: string[];
  /** Punktlista över deltjänster */
  items: string[];
  faq: FaqItem[];
  /** Slugs till två relaterade tjänster */
  related: [string, string];
  /** Bilder från riktiga projekt */
  images: ProjectImage[];
}

export const services: Service[] = [
  {
    slug: 'taklaggning',
    dim: 'TAK 27°',
    title: 'Takläggning & takbyte',
    h1: 'Takläggning & takbyte i Sundsvall',
    metaTitle: 'Takläggning Sundsvall — takbyte & takrenovering | DTC Sundsvall AB',
    metaDescription:
      'Takläggning och takbyte i Sundsvall med garanti. Plåt, betongpannor och papp — byggt för norrländskt klimat. Begär kostnadsfri offert idag.',
    excerpt:
      'Kompletta takbyten och takrenoveringar — plåt, betongpannor och papp. Dimensionerat för snölast och norrländskt väder.',
    body: [
      'Taket är husets viktigaste skydd — och i Sundsvall ställer snölast, temperaturväxlingar och fukt särskilda krav. Vi utför kompletta takbyten och takomläggningar i hela Sundsvallsområdet, från Njurunda till Timrå, alltid med material och konstruktion dimensionerade för norrländskt klimat.',
      'Vi tar helhetsansvar från besiktning och offert till färdigt tak: rivning av gammalt tegel eller plåt, kontroll och byte av råspont, ny underlagspapp, läkt och taktäckning. Behöver takstolarna åtgärdas eller vinden tilläggsisoleras löser vi det i samma entreprenad.',
      'Alla takarbeten utförs av försäkrade snickare med F-skatt, och som privatperson kan du använda ROT-avdraget på arbetskostnaden. Kontakta oss för en kostnadsfri besiktning och fast offert.',
    ],
    items: [
      'Takbyte och takomläggning — tegel, betongpannor, plåt och papp',
      'Byte av råspont, underlagspapp och läkt',
      'Plåtarbeten: rännor, stuprör, vindskivor och fotplåt',
      'Taksäkerhet: snörasskydd, takstegar och gångbryggor',
      'Besiktning och underhåll av befintliga tak',
    ],
    faq: [
      {
        q: 'Vad kostar ett takbyte i Sundsvall?',
        a: 'Priset beror på takets storlek, material och skick på underlaget. Ett normalstort villatak ligger ofta i spannet 150 000–300 000 kr före ROT-avdrag. Vi lämnar alltid en kostnadsfri besiktning och fast offert innan arbetet påbörjas.',
      },
      {
        q: 'Hur lång tid tar en takomläggning?',
        a: 'En normalstor villa tar vanligtvis 1–2 veckor beroende på väder, material och om råspont behöver bytas. Vi täcker alltid taket vädersäkert under arbetets gång.',
      },
      {
        q: 'Vilket takmaterial passar norrländskt klimat?',
        a: 'Både betongpannor och plåttak fungerar utmärkt i Norrland. Plåt är lätt och skjuter snön effektivt, medan betongpannor är tåliga och tysta. Vi hjälper dig välja utifrån takets lutning, husets konstruktion och budget.',
      },
      {
        q: 'Gäller ROT-avdrag för takbyte?',
        a: 'Ja, som privatperson får du ROT-avdrag på 50 % av arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter administrationen direkt mot Skatteverket — du betalar bara nettobeloppet.',
      },
    ],
    related: ['byggnation', 'underhall'],
    images: [
      {
        src: plattakGarage,
        alt: 'Färdigt svart bandtäckt plåttak med snörasskydd på garage i Sundsvall',
      },
      {
        src: plattakVinter,
        alt: 'Nylagt mörkgrått plåttak monterat vintertid med byggställning runt huset',
      },
      {
        src: takrenoveringRivning,
        alt: 'Snickare river gammalt plåttak inför takbyte på äldre hus',
      },
    ],
  },
  {
    slug: 'byggnation',
    dim: '45 × 220',
    title: 'Byggnation & tillbyggnad',
    h1: 'Byggnation & tillbyggnad i Sundsvall',
    metaTitle: 'Byggfirma Sundsvall — nybyggnation & tillbyggnad | DTC Sundsvall AB',
    metaDescription:
      'Byggfirma i Sundsvall för tillbyggnad, garage, attefallshus och nybyggnation. Helhetsansvar från bygglov till slutbesiktning. Begär kostnadsfri offert.',
    excerpt:
      'Tillbyggnader, garage, attefallshus och nybyggnation — helhetsansvar från grund till nock.',
    body: [
      'Planerar du en tillbyggnad, ett garage eller ett attefallshus? Vi är byggfirman i Sundsvall som tar helhetsansvar genom hela projektet — från idé och bygglovsritningar till stomresning, tätt hus och slutbesiktning.',
      'Vi bygger med beprövade konstruktioner anpassade för norrländska förhållanden: rejäla dimensioner, korrekt fuktsäkring och isolering som klarar både sträng kyla och varma somrar. Som totalentreprenör samordnar vi el, VVS och mark så att du har en enda kontakt genom hela bygget.',
      'Oavsett om det gäller ett uterum i Njurunda eller en full tillbyggnad i Sundsvall får du fast offert, tydlig tidsplan och löpande avstämningar. F-skatt, försäkring och ROT-avdrag är självklarheter.',
    ],
    items: [
      'Tillbyggnader och påbyggnader av villor och fritidshus',
      'Garage, carportar och förråd',
      'Attefallshus och gäststugor',
      'Uterum och inglasade altaner',
      'Stomresning och tätt hus vid nybyggnation',
    ],
    faq: [
      {
        q: 'Behöver jag bygglov för en tillbyggnad i Sundsvall?',
        a: 'Oftast ja — tillbyggnader kräver normalt bygglov från Sundsvalls kommun, medan attefallsåtgärder upp till 30 m² klarar sig med en anmälan. Vi hjälper dig med ritningar och ansökan.',
      },
      {
        q: 'Vad kostar det att bygga garage?',
        a: 'Ett enkelgarage på plintar eller platta ligger ofta i spannet 250 000–450 000 kr beroende på storlek, grund och standard. Vi lämnar fast offert efter platsbesök.',
      },
      {
        q: 'Tar ni helhetsansvar med el och VVS?',
        a: 'Ja. Vi jobbar som totalentreprenör och samordnar behöriga elektriker och VVS-montörer, så du har en kontakt och ett avtal genom hela projektet.',
      },
    ],
    related: ['renovering', 'snickeri'],
    images: [
      {
        src: verandaStomme,
        alt: 'Stomresning av ny veranda med takstolar på villa i Sundsvallsområdet',
      },
      {
        src: inglasatUterum,
        alt: 'Färdigbyggt inglasat uterum med sadeltak och trädäck på villa',
      },
      {
        src: verandaKvall,
        alt: 'Färdig veranda med tegeltak och infälld belysning i kvällsljus',
      },
    ],
  },
  {
    slug: 'renovering',
    dim: '28 × 120',
    title: 'Renovering',
    h1: 'Renovering i Sundsvall — kök, badrum & totalrenovering',
    metaTitle: 'Renovering Sundsvall — kök, badrum & helrenovering | DTC Sundsvall AB',
    metaDescription:
      'Renovering i Sundsvall: kök, badrum, fasad och totalrenovering med helhetsansvar och ROT-avdrag. Begär kostnadsfri offert från lokal byggfirma.',
    excerpt:
      'Kök, badrum, fasader och totalrenoveringar. Vi lyfter huset — och bevarar det som är värt att bevara.',
    body: [
      'En genomtänkt renovering höjer både boendekvaliteten och husets värde. Vi renoverar villor, fritidshus och bostadsrätter i hela Sundsvallsområdet — från enskilda rum till totalrenoveringar där hela huset lyfts invändigt och utvändigt.',
      'Många hus i Sundsvall och Njurunda har detaljer värda att bevara. Vi kombinerar modern byggteknik med hantverkskänsla: rätt material på rätt plats, fuktsäkert utförande och snygga avslut. Vid badrumsrenovering samarbetar vi med certifierade plattsättare och VVS-montörer så att våtrummet uppfyller branschreglerna.',
      'Du får en fast offert, tydlig tidsplan och en kontaktperson genom hela projektet. ROT-avdraget dras direkt på fakturan.',
    ],
    items: [
      'Köksrenovering — stomme, montering och snickerier',
      'Badrumsrenovering med certifierade samarbetspartners',
      'Fasadrenovering och fönsterbyte',
      'Golvläggning, innerväggar och ytskikt',
      'Totalrenovering av villor och fritidshus',
    ],
    faq: [
      {
        q: 'Vad kostar en köksrenovering?',
        a: 'En köksrenovering med nya stommar, montering och snickeriarbete ligger ofta i spannet 100 000–300 000 kr beroende på storlek och materialval, exklusive vitvaror. Arbetskostnaden ger rätt till ROT-avdrag.',
      },
      {
        q: 'Hur lång tid tar en badrumsrenovering?',
        a: 'Räkna med 3–5 veckor för ett normalstort badrum, inklusive rivning, tätskikt, plattsättning och installation. Torktider för tätskikt styr en del av tidsplanen.',
      },
      {
        q: 'Kan ni renovera fritidshus utanför Sundsvall?',
        a: 'Ja, vi jobbar i hela Sundsvallsområdet inklusive Njurunda, Matfors, Stöde, Alnö och Timrå — även fritidshus utmed kusten och i inlandet.',
      },
    ],
    related: ['snickeri', 'byggnation'],
    images: [
      {
        src: kokRenovering,
        alt: 'Nyrenoverat kök med gröna luckor, köksö och ribbpanel i trä',
      },
      {
        src: kokRenovering2,
        alt: 'Platsbyggd köksinredning med gröna skåpluckor och svart blandare',
      },
    ],
  },
  {
    slug: 'snickeri',
    dim: 'FIN 16 × 69',
    title: 'Snickeri',
    h1: 'Snickeri i Njurunda & Sundsvall',
    metaTitle: 'Snickeri Njurunda & Sundsvall — finsnickeri & altaner | DTC Sundsvall AB',
    metaDescription:
      'Snickeri i Njurunda och Sundsvall: altaner, trappor, inbyggda förvaringar och finsnickeri av erfarna snickare. Begär kostnadsfri offert.',
    excerpt:
      'Altaner, trappor, platsbyggd förvaring och finsnickeri — hantverk med känsla för detaljer.',
    body: [
      'Snickeriet är vårt hjärta. Med bas i Njurunda utför vi allt från altanbyggen och trappor till platsbyggd förvaring och finsnickeri i hela Sundsvallsområdet. Det är i detaljerna kvaliteten syns — raka linjer, täta skarvar och material som åldras vackert.',
      'En altan i Norrland ska klara snö, is och stora temperaturskillnader. Vi bygger med tryckimpregnerat eller organiskt behandlat trä, rejäl bärlina och rätt dimensionerat bjälklag — så att altanen står stadigt år efter år.',
      'Inget uppdrag är för litet. Behöver du en ny ytterdörr inpassad, en fönsterbräda bytt eller lister dragna i hela huset? Hör av dig, så återkommer vi med pris inom en arbetsdag.',
    ],
    items: [
      'Altaner, trädäck och pergolor',
      'Utvändiga och invändiga trappor',
      'Platsbyggd förvaring, garderober och bokhyllor',
      'Dörr- och fönstermontage, lister och foder',
      'Finsnickeri och specialbeställningar',
    ],
    faq: [
      {
        q: 'Vad kostar det att bygga altan?',
        a: 'En altan på 20–30 m² i tryckimpregnerat trä ligger ofta i spannet 40 000–90 000 kr beroende på höjd, grundläggning och räcken. ROT-avdrag gäller på arbetskostnaden.',
      },
      {
        q: 'Bygger ni altaner även utanför Njurunda?',
        a: 'Ja, vi bygger altaner och trädäck i hela Sundsvallsområdet — Kvissleby, Matfors, Alnö, Timrå och Söråker med omnejd.',
      },
      {
        q: 'Kan ni matcha befintliga snickerier i äldre hus?',
        a: 'Ja, vi tillverkar och anpassar lister, foder och paneler för att matcha originalutförandet i äldre hus — ett av våra vanligaste finsnickeriuppdrag.',
      },
    ],
    related: ['renovering', 'underhall'],
    images: [
      {
        src: tradackPool,
        alt: 'Nybyggt trädäck i tryckimpregnerat trä runt pool vid villa',
      },
      {
        src: poolTradackPanorama,
        alt: 'Stort trädäck med pool och pooltak med utsikt över sjön',
      },
      {
        src: pooltakSjoutsikt,
        alt: 'Skjutbart pooltak på platsbyggt trädäck vid sjötomt',
      },
    ],
  },
  {
    slug: 'underhall',
    dim: '22 × 95',
    title: 'Underhåll & service',
    h1: 'Fastighetsunderhåll & service i Sundsvall',
    metaTitle: 'Fastighetsunderhåll Sundsvall — service & reparationer | DTC Sundsvall AB',
    metaDescription:
      'Löpande underhåll, reparationer och service för villor, BRF och företag i Sundsvall. Snabb hjälp av försäkrad byggfirma — begär offert.',
    excerpt:
      'Löpande underhåll, reparationer och service för villor, BRF:er och företag — innan små fel blir stora.',
    body: [
      'Ett hus i norrländskt klimat behöver regelbunden omsorg. Vi hjälper villaägare, bostadsrättsföreningar och företag i Sundsvall med löpande underhåll och reparationer — från byte av rötskadade vindskivor till målning, tätning och justering av dörrar och fönster.',
      'Små skador växer snabbt: en läckande takfot blir en fuktskada, en spricken panel släpper in vatten i väggen. Med regelbundna underhållsinsatser förlänger du husets livslängd och slipper dyra akutåtgärder. För BRF:er och fastighetsägare erbjuder vi återkommande service enligt avtal.',
      'Vi kommer ut, bedömer vad som behöver göras och lämnar ett tydligt pris. Enkelt, försäkrat och med ROT-avdrag för privatpersoner.',
    ],
    items: [
      'Byte av rötskadad panel, vindskivor och foder',
      'Utvändig målning och träskydd',
      'Justering och byte av dörrar och fönster',
      'Tätning, isolering och vindsåtgärder',
      'Serviceavtal för BRF och fastighetsägare',
    ],
    faq: [
      {
        q: 'Gör ni små jobb också?',
        a: 'Ja — inga uppdrag är för små. Byte av en vindskiva, justering av en dörr eller några meter panel löser vi ofta inom en vecka.',
      },
      {
        q: 'Erbjuder ni serviceavtal för BRF?',
        a: 'Ja, vi tecknar underhållsavtal med bostadsrättsföreningar och fastighetsägare i Sundsvall med återkommande tillsyn och prioriterad hjälp vid akuta fel.',
      },
      {
        q: 'När på året bör man måla om huset?',
        a: 'I Sundsvall är maj–september bäst: träet ska vara torrt och dygnstemperaturen stabilt över 10 grader. Vi besiktar gärna fasaden i god tid så att arbetet kan planeras in.',
      },
    ],
    related: ['taklaggning', 'snickeri'],
    images: [
      {
        src: fasadStallning,
        alt: 'Byggställning rest längs grönmålad träfasad inför fasadarbete',
      },
      {
        src: garageTakstolar,
        alt: 'Nya takbjälkar monterade vid renovering av garagetak',
      },
    ],
  },
  {
    slug: 'renovering-fritidshus',
    dim: '34 × 145',
    title: 'Fritidshus & stugor',
    h1: 'Renovering & tillbyggnad av fritidshus i Sundsvallsområdet',
    metaTitle: 'Fritidshusrenovering Sundsvall & Njurunda | DTC Sundsvall AB',
    metaDescription:
      'Renovering, vinterbonning och tillbyggnad av fritidshus i Sundsvallsområdet. Lokal byggfirma med helhetsansvar — begär kostnadsfri offert.',
    excerpt:
      'Vinterbonning, renovering och tillbyggnad av stugor och fritidshus — vi gör sommarstället året-runt-redo.',
    body: [
      'Kusten och inlandet kring Sundsvall är fulla av fritidshus med potential. Vi hjälper dig renovera, bygga till och vinterbona stugan — så att den fungerar lika bra i januari som i juli.',
      'Vinterbonning handlar om mer än isolering: rätt ventilation, fuktsäker konstruktion och uppvärmning som fungerar ihop. Vi har lång erfarenhet av äldre fritidshus och vet var problemen brukar sitta — grunden, vinden och skarven däremellan.',
      'Vi jobbar i hela området: Njurunda, Galtström, Lörudden, Alnö, Stöde och vidare. Även när stugan ligger långt ut tar vi helhetsansvar för material, transport och genomförande.',
    ],
    items: [
      'Vinterbonning och tilläggsisolering',
      'Tillbyggnader och altaner på fritidshus',
      'Byte av tak, fasad och fönster',
      'Grundförstärkning och dränering i samarbete',
      'Renovering av kök och interiörer',
    ],
    faq: [
      {
        q: 'Vad kostar det att vinterbona ett fritidshus?',
        a: 'Det beror helt på husets skick och storlek — allt från 100 000 kr för isolering och tätning till 500 000+ kr för genomgripande ombyggnad. Vi börjar alltid med en besiktning och en tydlig åtgärdsplan.',
      },
      {
        q: 'Jobbar ni med fritidshus på öar och svårtillgängliga lägen?',
        a: 'Ja, vi planerar material och logistik efter läget. Kontakta oss med adress och en beskrivning så bedömer vi förutsättningarna.',
      },
      {
        q: 'Gäller ROT-avdrag för fritidshus?',
        a: 'Ja, ROT-avdraget gäller även fritidshus så länge du äger huset och det är minst fem år gammalt.',
      },
    ],
    related: ['renovering', 'byggnation'],
    images: [
      {
        src: takbyteStallning,
        alt: 'Äldre gult trähus med byggställning inför takbyte',
      },
      {
        src: inglasadVeranda,
        alt: 'Inglasad veranda med skjutpartier på fritidshus i kvällsljus',
      },
      {
        src: poolTradack,
        alt: 'Pool med trädäck och pooltak i trädgård vid blått trähus',
      },
    ],
  },
  {
    slug: 'byggstallning',
    dim: '200 M²',
    title: 'Byggställning',
    h1: 'Byggställning i Sundsvall — montering & uthyrning',
    metaTitle: 'Byggställning Sundsvall — hyra, montering & demontering | DTC',
    metaDescription:
      'Hyr byggställning i Sundsvall — upp till 200 m². Vi monterar, demonterar och levererar ställning för tak-, fasad- och målningsjobb. Begär offert.',
    excerpt:
      'Montering, demontering och uthyrning av byggställning upp till 200 m² — för tak, fasad och målning.',
    body: [
      'Ska du byta tak, renovera fasaden eller måla om huset? Vi hyr ut byggställning i Sundsvallsområdet — upp till 200 m² — och tar hand om hela kedjan: transport, montering, säkerhetskontroll och demontering när jobbet är klart.',
      'En korrekt monterad ställning är skillnaden mellan ett säkert, effektivt jobb och ett riskabelt. Vi monterar enligt Arbetsmiljöverkets föreskrifter, förankrar i fasaden där det krävs och anpassar ställningen efter huset — även vid trånga tomter, sluttningar och utbyggnader.',
      'Ställningen går att hyra fristående till ditt eget projekt, med eller utan montering. Vid våra egna tak- och fasadentreprenader ingår etableringen alltid i offerten, så du slipper anlita en separat ställningsfirma.',
    ],
    items: [
      'Uthyrning av byggställning — upp till 200 m²',
      'Montering och demontering av fasadställning',
      'Ställning för takbyte, fasadrenovering och målning',
      'Transport, etablering och säkerhetskontroll',
      'Ingår alltid vid våra egna tak- och fasadprojekt',
    ],
    faq: [
      {
        q: 'Kan man hyra byggställning av er?',
        a: 'Ja, vi hyr ut byggställning upp till 200 m² i Sundsvallsområdet — med eller utan montering. Berätta om projektet så återkommer vi med pris och tillgänglighet.',
      },
      {
        q: 'Vad kostar det att hyra byggställning i Sundsvall?',
        a: 'Priset beror på yta, hyrestid och om vi ska montera och demontera. Vi lämnar alltid en kostnadsfri offert med fast pris — hör av dig med mått på huset så räknar vi på det.',
      },
      {
        q: 'Monterar och demonterar ni ställningen?',
        a: 'Ja, vi utför både montering och demontering. Ställningen förankras och kontrolleras enligt Arbetsmiljöverkets föreskrifter innan den tas i bruk.',
      },
      {
        q: 'Ingår ställning när ni gör taket eller fasaden?',
        a: 'Ja, vid våra egna entreprenader ingår ställning, etablering och nedmontering i offerten — du behöver inte anlita någon separat ställningsfirma.',
      },
    ],
    related: ['taklaggning', 'underhall'],
    images: [
      {
        src: fasadStallning,
        alt: 'Byggställning monterad längs träfasad inför fasadarbete',
      },
      {
        src: takbyteStallning,
        alt: 'Byggställning rest runt äldre trähus inför takbyte',
      },
    ],
  },
];

/** Utvalda projektbilder till startsidans referensgalleri */
export const featuredProjects: { src: ImageMetadata; alt: string; label: string; title: string }[] = [
  {
    src: verandaKvall,
    alt: 'Färdig veranda med tegeltak och infälld belysning i kvällsljus',
    label: 'BYGGNATION',
    title: 'Veranda med tak & belysning',
  },
  {
    src: plattakGarage,
    alt: 'Färdigt svart bandtäckt plåttak med snörasskydd på garage',
    label: 'TAK 27°',
    title: 'Plåttak med snörasskydd',
  },
  {
    src: inglasatUterum,
    alt: 'Inglasat uterum med sadeltak och trädäck på villa',
    label: 'INGLASNING',
    title: 'Inglasat uterum',
  },
  {
    src: kokRenovering,
    alt: 'Nyrenoverat kök med gröna luckor, köksö och ribbpanel i trä',
    label: 'RENOVERING',
    title: 'Kök med platsbyggd inredning',
  },
  {
    src: poolTradackPanorama,
    alt: 'Stort trädäck med pool och pooltak med utsikt över sjön',
    label: 'SNICKERI',
    title: 'Trädäck & pool vid sjötomt',
  },
  {
    src: plattakVinter,
    alt: 'Nylagt mörkgrått plåttak monterat vintertid',
    label: 'TAK · VINTER',
    title: 'Takbyte i vinterförhållanden',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
