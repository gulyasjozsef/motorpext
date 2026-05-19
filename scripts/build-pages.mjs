import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = process.cwd();
const siteUrl = "https://www.motorpext.ro";
const assetVersion = "20260517-nav14";
let currentPrefix = "";

const business = {
  name: "SC MOTORPEXT SRL",
  brand: "MOTORPEXT",
  phonePrimary: "0744 532 370",
  phoneSecondary: "0745 367 535",
  address: "Str. Santăului nr. 1, Oradea",
  hours: "Luni - Vineri: 8:00 - 17:00",
  city: "Oradea",
};

const imageUrls = {
  workshop: "/assets/images/workshop-hero.jpg",
  alignment: "/assets/images/reglaj-directie.jpg",
  ac: "/assets/images/incarcare-freon.jpg",
  diagnostics: "/assets/images/workshop-hero.jpg",
};

const services = [
  {
    slug: "reglaj-directie-oradea",
    title: "Reglaj direcție Oradea",
    navTitle: "Reglaj direcție",
    icon: "alignment",
    primaryKeyword: "Reglaj direcție Oradea",
    secondaryKeywords: ["Geometrie roți Oradea", "Reglaj geometrie roți Oradea", "Service direcție auto Oradea", "Verificare direcție auto Oradea"],
    metaTitle: "Reglaj direcție Oradea | Geometrie roți | MOTORPEXT",
    metaDescription: "Reglaj direcție în Oradea la SC MOTORPEXT SRL. Verificare geometrie roți, stabilitate mai bună și uzură uniformă a anvelopelor.",
    heroText: "Verificare și reglaj geometrie roți pentru stabilitate, siguranță și uzură uniformă a anvelopelor.",
    image: imageUrls.alignment,
    imageAlt: "Mecanic verificând geometria roților într-un service auto din Oradea",
    captionTitle: "Geometrie verificată corect",
    captionText: "Reglaje realizate cu atenție pentru direcție, suspensie și stabilitate.",
    symptomsTitle: "Când ai nevoie de reglaj direcție?",
    symptoms: [
      "Mașina trage într-o parte",
      "Volanul nu stă drept",
      "Anvelopele se uzează neuniform",
      "Ai lovit o bordură sau o groapă",
      "Ai schimbat componente de direcție sau suspensie",
      "Mașina este instabilă la viteze mai mari",
    ],
    explanationTitle: "Ce presupune reglajul direcției?",
    explanationIntro: "Reglajul direcției ajută mașina să ruleze drept, predictibil și eficient. La Motorpext verificăm geometria roților și intervenim cu reglaje atunci când valorile nu sunt în parametri.",
    explanationBlocks: [
      ["Verificarea geometriei roților", "Măsurăm poziția roților și identificăm abaterile care afectează stabilitatea."],
      ["Reglarea unghiurilor de direcție", "Corectăm unghiurile pentru o direcție mai precisă și o rulare mai uniformă."],
      ["Controlul stabilității", "Verificăm comportamentul mașinii și semnele care pot indica probleme conexe."],
      ["Recomandări tehnice după verificare", "Îți comunicăm clar ce s-a constatat și ce lucrări sunt recomandate."],
    ],
    benefits: ["Siguranță mai bună la condus", "Uzură uniformă a anvelopelor", "Stabilitate crescută", "Consum optimizat", "Protecție pentru suspensie și direcție"],
    benefitTitle: "Beneficiile reglajului corect",
    process: [
      ["Verificare inițială", "Discutăm simptomele și inspectăm elementele relevante."],
      ["Măsurare geometrie roți", "Verificăm valorile cu echipamente dedicate."],
      ["Reglaj direcție", "Aducem unghiurile în parametrii potriviți, unde reglajul este posibil."],
      ["Test și recomandări", "Confirmăm rezultatul și explicăm următorii pași, dacă sunt necesari."],
    ],
    ctaQuestion: "Ai nevoie de reglaj direcție în Oradea?",
    related: ["mecanica-auto-oradea", "service-anvelope-oradea", "frane-suspensie-oradea", "diagnoza-auto-oradea"],
    faqs: [
      ["Când este necesar reglajul direcției?", "Reglajul este recomandat când mașina trage într-o parte, volanul nu stă drept, anvelopele se uzează neuniform sau după intervenții la direcție ori suspensie."],
      ["Cât durează reglajul geometriei roților?", "Durata depinde de starea mașinii și de reglajele necesare, dar verificarea și reglajul sunt de regulă lucrări rapide pentru un service echipat corespunzător."],
      ["De ce trage mașina într-o parte?", "Cauzele pot include geometrie incorectă, presiune diferită în anvelope, uzură la direcție sau suspensie ori probleme la sistemul de frânare."],
      ["Este recomandat reglajul direcției după schimbarea anvelopelor?", "Da, mai ales dacă există uzură neuniformă, vibrații sau dacă au fost schimbate componente de suspensie ori direcție."],
      ["Reglajul direcției ajută la uzura uniformă a anvelopelor?", "Da. O geometrie corectă reduce uzura neuniformă și poate prelungi durata de viață a anvelopelor."],
    ],
  },
  {
    slug: "incarcare-freon-oradea",
    title: "Încărcare freon Oradea",
    navTitle: "Încărcare freon",
    icon: "snowflake",
    primaryKeyword: "Încărcare freon Oradea",
    secondaryKeywords: ["Reparații climă auto Oradea", "Service climă auto Oradea", "Freon auto Oradea", "Verificare climă auto Oradea"],
    metaTitle: "Încărcare freon Oradea | Service climă auto | MOTORPEXT",
    metaDescription: "Încărcare freon în Oradea și verificare climă auto la SC MOTORPEXT SRL. Diagnostic clar, întreținere și reparații pentru sistemul de climatizare.",
    heroText: "Verificare, întreținere și reparații pentru sistemul de climatizare auto, rapid și profesionist.",
    image: imageUrls.ac,
    imageAlt: "Mecanic lucrând la sistemul de climatizare auto într-un atelier modern",
    captionTitle: "Climă auto verificată tehnic",
    captionText: "Controlăm funcționarea înainte de reîncărcare și explicăm cauza problemelor.",
    symptomsTitle: "Când ai nevoie de verificarea climei auto?",
    symptoms: [
      "Clima nu mai răcește eficient",
      "Aerul are miros neplăcut",
      "Sistemul pornește greu",
      "Se aud zgomote neobișnuite",
      "Geamurile se aburesc rapid",
      "Nu ai verificat instalația de mult timp",
    ],
    explanationTitle: "Ce include serviciul de climă auto?",
    explanationIntro: "Pentru încărcare freon în Oradea, abordarea corectă începe cu verificarea instalației. Reîncărcarea are sens atunci când sistemul poate funcționa în parametri.",
    explanationBlocks: [
      ["Verificarea sistemului de climatizare", "Analizăm comportamentul instalației și semnele unei funcționări incorecte."],
      ["Verificarea presiunii", "Controlăm presiunea pentru a înțelege dacă sistemul are nevoie de intervenție."],
      ["Încărcare freon", "Completăm agentul frigorific atunci când verificările arată că este necesar."],
      ["Control funcționare", "Testăm răcirea și răspunsul sistemului după lucrare."],
      ["Recomandări tehnice", "Îți spunem clar dacă sunt necesare reparații suplimentare."],
    ],
    warning: {
      title: "Încărcarea cu freon nu rezolvă orice problemă",
      text: "Dacă sistemul pierde freon, este importantă verificarea cauzei. O simplă reîncărcare fără verificare poate fi doar o soluție temporară.",
    },
    benefits: ["Răcire eficientă", "Confort la condus", "Protecție pentru compresor", "Funcționare corectă a sistemului", "Diagnostic clar înainte de reparații"],
    benefitTitle: "Beneficii",
    process: [
      ["Verificare inițială", "Ascultăm simptomele și verificăm funcționarea climei."],
      ["Control presiune și funcționare", "Evaluăm presiunea și comportamentul sistemului."],
      ["Încărcare freon dacă este necesar", "Reîncărcăm doar când intervenția este justificată tehnic."],
      ["Test final", "Confirmăm răcirea și comunicăm eventualele recomandări."],
    ],
    ctaQuestion: "Ai nevoie de încărcare freon în Oradea?",
    related: ["diagnoza-auto-oradea", "mecanica-auto-oradea", "electrica-auto-oradea", "reparatii-clima-auto-oradea"],
    faqs: [
      ["Cât durează încărcarea cu freon?", "Durata depinde de verificările necesare și de starea instalației, dar lucrarea este de obicei rapidă atunci când sistemul este în stare bună."],
      ["De ce nu mai răcește clima auto?", "Poate fi vorba despre nivel scăzut de agent frigorific, pierderi, probleme la compresor, senzori, ventilatoare sau alte componente ale instalației."],
      ["Este suficientă doar încărcarea cu freon?", "Nu întotdeauna. Dacă există pierderi sau componente defecte, încărcarea fără verificare poate rezolva doar temporar simptomul."],
      ["Cât de des trebuie verificată clima auto?", "Este recomandată o verificare periodică, mai ales înainte de sezonul cald sau când observi scăderea eficienței de răcire."],
      ["Pot circula cu clima defectă?", "Da, dar este mai bine să verifici instalația. Unele probleme pot afecta confortul, dezaburirea și durata de viață a compresorului."],
    ],
  },
  {
    slug: "reparatii-clima-auto-oradea",
    title: "Reparații climă auto Oradea",
    navTitle: "Reparații climă",
    icon: "snowflake",
    primaryKeyword: "Reparații climă auto Oradea",
    secondaryKeywords: ["Service climă auto Oradea", "Verificare climă auto Oradea", "Freon auto Oradea"],
    metaTitle: "Reparații climă auto Oradea | MOTORPEXT",
    metaDescription: "Reparații climă auto în Oradea, verificare sistem climatizare și recomandări tehnice clare la SC MOTORPEXT SRL.",
    heroText: "Diagnostic și reparații pentru sistemul de climatizare auto, cu verificare tehnică înainte de intervenție.",
    image: imageUrls.ac,
    imageAlt: "Verificare sistem climatizare auto într-un service autorizat din Oradea",
    captionTitle: "Climă auto reparată corect",
    captionText: "Identificăm cauza, nu doar simptomul.",
    symptomsTitle: "Semne că sistemul de climatizare are nevoie de service",
    symptoms: ["Răcire slabă", "Miros neplăcut în habitaclu", "Zgomote la pornirea climei", "Geamuri care se aburesc rapid", "Compresor care pornește intermitent", "Pierdere repetată de freon"],
    explanationTitle: "Cum abordăm reparațiile la clima auto",
    explanationIntro: "Verificăm sistemul, identificăm cauza și îți comunicăm clar opțiunile de reparație.",
    explanationBlocks: genericBlocks("climatizare"),
    benefits: ["Confort mai bun", "Funcționare corectă", "Protecție pentru compresor", "Diagnostic clar", "Reducerea riscului de defecțiuni repetate"],
    process: genericProcess("climatizare"),
    ctaQuestion: "Ai nevoie de reparații climă auto în Oradea?",
    related: ["incarcare-freon-oradea", "diagnoza-auto-oradea", "electrica-auto-oradea", "mecanica-auto-oradea"],
    faqs: genericFaq("climă auto", "reparațiile"),
  },
  {
    slug: "diagnoza-auto-oradea",
    title: "Diagnoză auto Oradea",
    navTitle: "Diagnoză auto",
    icon: "diagnostics",
    primaryKeyword: "Diagnoză auto Oradea",
    secondaryKeywords: ["Diagnoză computerizată Oradea", "Verificare auto Oradea", "Service auto Oradea"],
    metaTitle: "Diagnoză auto Oradea | Diagnoză computerizată | MOTORPEXT",
    metaDescription: "Diagnoză auto în Oradea pentru identificarea rapidă a problemelor. SC MOTORPEXT SRL oferă verificări tehnice și recomandări clare.",
    heroText: "Diagnoză computerizată și verificări tehnice pentru identificarea problemelor înainte de reparații.",
    image: imageUrls.diagnostics,
    imageAlt: "Diagnoză computerizată auto într-un service din Oradea",
    captionTitle: "Diagnoză înainte de decizie",
    captionText: "Verificăm datele și simptomele pentru recomandări corecte.",
    symptomsTitle: "Când este utilă diagnoza auto?",
    symptoms: ["Martori aprinși în bord", "Motor care funcționează neregulat", "Consum crescut", "Pierdere de putere", "Pornire dificilă", "Zgomote sau comportament neobișnuit"],
    explanationTitle: "Ce include diagnoza auto?",
    explanationIntro: "Diagnoza ajută la înțelegerea cauzei reale și la evitarea reparațiilor făcute din presupuneri.",
    explanationBlocks: genericBlocks("diagnoză"),
    benefits: ["Identificare mai rapidă", "Decizii informate", "Costuri mai bine controlate", "Reparații orientate corect", "Comunicare clară"],
    process: genericProcess("diagnoză"),
    ctaQuestion: "Ai nevoie de diagnoză auto în Oradea?",
    related: ["mecanica-auto-oradea", "electrica-auto-oradea", "reparatii-injectoare-oradea", "incarcare-freon-oradea"],
    faqs: genericFaq("diagnoză auto", "verificarea"),
  },
  {
    slug: "mecanica-auto-oradea",
    title: "Mecanică auto Oradea",
    navTitle: "Mecanică auto",
    icon: "wrench",
    primaryKeyword: "Mecanică auto Oradea",
    secondaryKeywords: ["Reparații auto Oradea", "Service auto multimarcă Oradea", "Service auto Oradea"],
    metaTitle: "Mecanică auto Oradea | Reparații auto | MOTORPEXT",
    metaDescription: "Mecanică auto în Oradea pentru întreținere și reparații multimarcă. SC MOTORPEXT SRL, service autorizat RAR.",
    heroText: "Reparații mecanice și întreținere pentru autoturisme, cu explicații clare și lucrări realizate corect.",
    image: imageUrls.workshop,
    imageAlt: "Mecanic realizând reparații auto într-un atelier profesionist",
    captionTitle: "Reparații multimarcă",
    captionText: "Lucrări mecanice realizate cu atenție și comunicare clară.",
    symptomsTitle: "Când să vii la mecanică auto?",
    symptoms: ["Zgomote la motor sau suspensie", "Vibrații la rulare", "Scurgeri de lichide", "Frânare neuniformă", "Revizie necesară", "Comportament schimbat al mașinii"],
    explanationTitle: "Ce presupun reparațiile mecanice?",
    explanationIntro: "Verificăm problema, explicăm constatarea și intervenim asupra componentelor care necesită reparație sau înlocuire.",
    explanationBlocks: genericBlocks("mecanică auto"),
    benefits: ["Siguranță la condus", "Întreținere corectă", "Durată de viață mai bună pentru componente", "Costuri explicate clar", "Service multimarcă"],
    process: genericProcess("mecanică auto"),
    ctaQuestion: "Cauți mecanică auto în Oradea?",
    related: ["diagnoza-auto-oradea", "frane-suspensie-oradea", "reglaj-directie-oradea", "service-anvelope-oradea"],
    faqs: genericFaq("mecanică auto", "reparația"),
  },
  {
    slug: "electrica-auto-oradea",
    title: "Electrică auto Oradea",
    navTitle: "Electrică auto",
    icon: "bolt",
    primaryKeyword: "Electrică auto Oradea",
    secondaryKeywords: ["Diagnoză auto Oradea", "Reparații electrice auto Oradea", "Service auto Oradea"],
    metaTitle: "Electrică auto Oradea | Reparații electrice auto | MOTORPEXT",
    metaDescription: "Electrică auto în Oradea pentru probleme electrice, senzori, pornire și verificări tehnice. SC MOTORPEXT SRL.",
    heroText: "Verificări și reparații electrice auto pentru sisteme moderne, senzori și probleme de funcționare.",
    image: imageUrls.diagnostics,
    imageAlt: "Verificări electrice auto cu echipament de diagnoză",
    captionTitle: "Sisteme electrice verificate",
    captionText: "Testăm simptomele și componentele înainte de intervenție.",
    symptomsTitle: "Semne de probleme electrice auto",
    symptoms: ["Martori aprinși în bord", "Probleme la pornire", "Lumini sau accesorii care funcționează intermitent", "Baterie care se descarcă", "Senzori cu erori", "Climă sau ventilatoare cu probleme"],
    explanationTitle: "Cum verificăm electrica auto",
    explanationIntro: "Combinăm diagnoza cu verificări tehnice pentru a identifica problemele electrice fără intervenții inutile.",
    explanationBlocks: genericBlocks("electrică auto"),
    benefits: ["Identificare precisă", "Reparații orientate corect", "Funcționare stabilă", "Mai puține probleme recurente", "Recomandări clare"],
    process: genericProcess("electrică auto"),
    ctaQuestion: "Ai nevoie de electrică auto în Oradea?",
    related: ["diagnoza-auto-oradea", "incarcare-freon-oradea", "reparatii-clima-auto-oradea", "mecanica-auto-oradea"],
    faqs: genericFaq("electrică auto", "verificarea"),
  },
  {
    slug: "reparatii-injectoare-oradea",
    title: "Reparații injectoare Oradea",
    navTitle: "Reparații injectoare",
    icon: "injector",
    primaryKeyword: "Reparații injectoare Oradea",
    secondaryKeywords: ["Verificare injectoare Oradea", "Sistem injecție Oradea", "Diesel Point Oradea"],
    metaTitle: "Reparații injectoare Oradea | Verificare injecție | MOTORPEXT",
    metaDescription: "Reparații injectoare și verificare sistem injecție în Oradea la SC MOTORPEXT SRL, service certificat Diesel Point.",
    heroText: "Verificare și reparații pentru injectoare și sistemul de injecție, cu experiență Diesel Point.",
    image: imageUrls.workshop,
    imageAlt: "Tehnician lucrând la sistemul de injecție auto",
    captionTitle: "Certificat Diesel Point",
    captionText: "Experiență în verificarea și repararea sistemelor de injecție.",
    symptomsTitle: "Când pot fi injectoarele cauza?",
    symptoms: ["Pornire dificilă", "Fum excesiv", "Motor neregulat", "Consum crescut", "Pierdere de putere", "Zgomote neobișnuite la motor"],
    explanationTitle: "Ce presupun reparațiile la injectoare",
    explanationIntro: "Verificăm simptomele și sistemul de injecție pentru a stabili intervenția potrivită.",
    explanationBlocks: genericBlocks("injecție"),
    benefits: ["Funcționare mai stabilă", "Consum mai bine controlat", "Pornire îmbunătățită", "Diagnostic tehnic clar", "Experiență Diesel Point"],
    process: genericProcess("injecție"),
    ctaQuestion: "Ai nevoie de reparații injectoare în Oradea?",
    related: ["verificare-injectie-oradea", "diagnoza-auto-oradea", "mecanica-auto-oradea", "electrica-auto-oradea"],
    faqs: genericFaq("reparații injectoare", "verificarea"),
  },
  {
    slug: "verificare-injectie-oradea",
    title: "Verificare injecție Oradea",
    navTitle: "Verificare injecție",
    icon: "injector",
    primaryKeyword: "Verificare injecție Oradea",
    secondaryKeywords: ["Reparații injectoare Oradea", "Sistem injecție diesel Oradea", "Diesel Point Oradea"],
    metaTitle: "Verificare injecție Oradea | Diesel Point | MOTORPEXT",
    metaDescription: "Verificare sistem injecție în Oradea la SC MOTORPEXT SRL. Service certificat Diesel Point pentru constatări și recomandări tehnice.",
    heroText: "Verificări tehnice pentru sistemul de injecție, injectoare și simptome de funcționare neregulată.",
    image: imageUrls.diagnostics,
    imageAlt: "Verificare sistem injecție diesel într-un service auto",
    captionTitle: "Verificare tehnică",
    captionText: "Date clare înainte de decizia de reparație.",
    symptomsTitle: "Când este recomandată verificarea injecției?",
    symptoms: ["Pornire greoaie", "Fum la evacuare", "Consum crescut", "Motor care tremură", "Pierdere de putere", "Erori la diagnoză"],
    explanationTitle: "Ce verificăm la sistemul de injecție",
    explanationIntro: "Analizăm funcționarea și simptomele pentru a vedea dacă injectoarele sau alte componente necesită intervenție.",
    explanationBlocks: genericBlocks("sistem de injecție"),
    benefits: ["Claritate tehnică", "Reparații recomandate corect", "Protecție pentru motor", "Consum mai eficient", "Experiență Diesel Point"],
    process: genericProcess("sistem de injecție"),
    ctaQuestion: "Ai nevoie de verificare injecție în Oradea?",
    related: ["reparatii-injectoare-oradea", "diagnoza-auto-oradea", "mecanica-auto-oradea", "electrica-auto-oradea"],
    faqs: genericFaq("verificare injecție", "constatarea"),
  },
  {
    slug: "tinichigerie-vopsitorie-oradea",
    title: "Tinichigerie și vopsitorie Oradea",
    navTitle: "Tinichigerie și vopsitorie",
    icon: "paint",
    primaryKeyword: "Tinichigerie vopsitorie Oradea",
    secondaryKeywords: ["Reparații caroserie Oradea", "Vopsitorie auto Oradea", "Service auto Oradea"],
    metaTitle: "Tinichigerie și vopsitorie Oradea | MOTORPEXT",
    metaDescription: "Tinichigerie și vopsitorie auto în Oradea pentru reparații caroserie și lucrări realizate profesionist la SC MOTORPEXT SRL.",
    heroText: "Lucrări de caroserie și vopsitorie auto pentru reparații realizate curat, atent și profesionist.",
    image: imageUrls.workshop,
    imageAlt: "Lucrări de tinichigerie și vopsitorie auto într-un atelier",
    captionTitle: "Caroserie și finisaj",
    captionText: "Lucrări curate, cu atenție la detalii și comunicare clară.",
    symptomsTitle: "Când ai nevoie de tinichigerie sau vopsitorie?",
    symptoms: ["Lovituri de caroserie", "Zgârieturi vizibile", "Elemente deformate", "Necesitate revopsire locală", "Daune după incident", "Pregătire pentru reparații estetice"],
    explanationTitle: "Ce includ lucrările de caroserie",
    explanationIntro: "Evaluăm zona afectată, stabilim intervenția și explicăm pașii necesari pentru o reparație corectă.",
    explanationBlocks: genericBlocks("caroserie"),
    benefits: ["Aspect îmbunătățit", "Reparații corecte", "Protecție pentru caroserie", "Evaluare clară", "Execuție profesionistă"],
    process: genericProcess("caroserie"),
    ctaQuestion: "Ai nevoie de tinichigerie și vopsitorie în Oradea?",
    related: ["mecanica-auto-oradea", "diagnoza-auto-oradea", "service-anvelope-oradea", "reglaj-directie-oradea"],
    faqs: genericFaq("tinichigerie și vopsitorie", "evaluarea"),
  },
  {
    slug: "service-anvelope-oradea",
    title: "Service anvelope Oradea",
    navTitle: "Service anvelope",
    icon: "tire",
    primaryKeyword: "Service anvelope Oradea",
    secondaryKeywords: ["Schimb anvelope Oradea", "Echilibrare roți Oradea", "Service auto Oradea"],
    metaTitle: "Service anvelope Oradea | MOTORPEXT",
    metaDescription: "Service anvelope în Oradea pentru verificări, montaj și lucrări conexe. SC MOTORPEXT SRL oferă servicii auto multimarcă.",
    heroText: "Servicii pentru anvelope și roți, cu verificări conexe pentru siguranță și rulare corectă.",
    image: imageUrls.alignment,
    imageAlt: "Roată verificată într-un service auto din Oradea",
    captionTitle: "Roți verificate atent",
    captionText: "Anvelopele corecte ajută stabilitatea, frânarea și confortul.",
    symptomsTitle: "Când să verifici anvelopele?",
    symptoms: ["Uzură neuniformă", "Vibrații la viteză", "Presiune care scade", "Schimb sezonier", "Lovituri în bordură", "Zgomot sau comportament neobișnuit"],
    explanationTitle: "Ce presupune service-ul pentru anvelope",
    explanationIntro: "Verificăm starea roților și recomandăm lucrările necesare pentru siguranță și rulare uniformă.",
    explanationBlocks: genericBlocks("anvelope"),
    benefits: ["Rulare mai stabilă", "Siguranță la frânare", "Uzură controlată", "Confort mai bun", "Recomandări clare"],
    process: genericProcess("anvelope"),
    ctaQuestion: "Ai nevoie de service anvelope în Oradea?",
    related: ["reglaj-directie-oradea", "frane-suspensie-oradea", "mecanica-auto-oradea", "diagnoza-auto-oradea"],
    faqs: genericFaq("anvelope", "verificarea"),
  },
  {
    slug: "frane-suspensie-oradea",
    title: "Frâne și suspensie Oradea",
    navTitle: "Frâne și suspensie",
    icon: "brake",
    primaryKeyword: "Frâne și suspensie Oradea",
    secondaryKeywords: ["Mecanică auto Oradea", "Service direcție auto Oradea", "Reparații auto Oradea"],
    metaTitle: "Frâne și suspensie Oradea | MOTORPEXT",
    metaDescription: "Verificări și reparații pentru frâne și suspensie în Oradea la SC MOTORPEXT SRL, service auto autorizat RAR.",
    heroText: "Verificări și reparații pentru frâne, suspensie și componente care influențează siguranța la condus.",
    image: imageUrls.workshop,
    imageAlt: "Mecanic verificând frânele și suspensia unui autoturism",
    captionTitle: "Siguranță în mers",
    captionText: "Frânele și suspensia cer atenție tehnică, nu improvizații.",
    symptomsTitle: "Semne că frânele sau suspensia au nevoie de verificare",
    symptoms: ["Zgomote la frânare", "Vibrații în volan", "Mașina se lasă pe o parte", "Distanță de frânare crescută", "Bătăi la denivelări", "Instabilitate în viraje"],
    explanationTitle: "Ce verificăm la frâne și suspensie",
    explanationIntro: "Inspectăm componentele importante pentru siguranță și recomandăm intervențiile necesare.",
    explanationBlocks: genericBlocks("frâne și suspensie"),
    benefits: ["Siguranță mai bună", "Stabilitate crescută", "Frânare predictibilă", "Protecție pentru anvelope", "Reparații explicate clar"],
    process: genericProcess("frâne și suspensie"),
    ctaQuestion: "Ai nevoie de verificare frâne sau suspensie în Oradea?",
    related: ["mecanica-auto-oradea", "reglaj-directie-oradea", "service-anvelope-oradea", "diagnoza-auto-oradea"],
    faqs: genericFaq("frâne și suspensie", "verificarea"),
  },
];

function genericBlocks(context) {
  return [
    ["Constatare tehnică", `Verificăm simptomele și componentele relevante pentru ${context}.`],
    ["Identificarea cauzei", "Căutăm cauza reală înainte de a recomanda intervenții sau înlocuiri."],
    ["Intervenție controlată", "Executăm lucrarea cu atenție la siguranță, funcționare și calitatea rezultatului."],
    ["Recomandări clare", "Îți explicăm ce s-a constatat și ce este recomandat mai departe."],
  ];
}

function genericProcess(context) {
  return [
    ["Discuție și verificare", `Începem cu simptomele și o verificare pentru ${context}.`],
    ["Constatare tehnică", "Identificăm componentele sau sistemele care necesită atenție."],
    ["Lucrare service", "Realizăm intervenția agreată după explicații clare."],
    ["Control final", "Verificăm rezultatul și comunicăm recomandările utile."],
  ];
}

function genericFaq(topic, noun) {
  return [
    [`Când este recomandat serviciul de ${topic}?`, `Este recomandat atunci când observi simptome neobișnuite sau când mașina are nevoie de întreținere preventivă.`],
    [`Cât durează ${noun}?`, "Durata depinde de starea mașinii și de complexitatea lucrării. Îți comunicăm estimarea după verificare."],
    ["Pot veni fără programare?", "Pentru disponibilitate mai bună, recomandăm să suni înainte sau să soliciți o programare."],
    ["Primesc explicații înainte de reparație?", "Da. Comunicarea clară cu clientul este parte importantă din modul nostru de lucru."],
    ["Lucrați pe mai multe mărci auto?", "Da, Motorpext este un service auto multimarcă în Oradea."],
  ];
}

const serviceMap = Object.fromEntries(services.map((service) => [service.slug, service]));
const navServiceSlugs = [
  "diagnoza-auto-oradea",
  "mecanica-auto-oradea",
  "electrica-auto-oradea",
  "reglaj-directie-oradea",
  "incarcare-freon-oradea",
  "reparatii-clima-auto-oradea",
  "reparatii-injectoare-oradea",
  "tinichigerie-vopsitorie-oradea",
];

function setPageContext(pathName) {
  const cleanPath = pathName.replace(/^\/|\/$/g, "");
  currentPrefix = cleanPath ? "../".repeat(cleanPath.split("/").length) : "";
}

function assetPath(src) {
  return src.startsWith("/") ? `${currentPrefix}${src.slice(1)}` : src;
}

function cssAssetPath(src) {
  return src.startsWith("/assets/") ? src.slice("/assets/".length) : assetPath(src);
}

function homeHref(hash = "") {
  return `${currentPrefix}index.html${hash}`;
}

function serviceHref(slug) {
  return `${currentPrefix}servicii/${slug}/index.html`;
}

function privacyHref() {
  return `${currentPrefix}politica-de-confidentialitate/index.html`;
}

function icon(name) {
  const paths = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/>',
    wrench: '<path d="M14.7 6.3a4.3 4.3 0 0 0-5.5 5.5L3 18l3 3 6.2-6.2a4.3 4.3 0 0 0 5.5-5.5l-3 3-3-3 3-3Z"/>',
    diagnostics: '<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-2 3-2-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M7 9h2m3 0h5M7 13h7"/>',
    bolt: '<path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z"/>',
    alignment: '<path d="M7 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M17 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M7 2v3m0 14v3m10-20v3m0 14v3M2 12h3m14 0h3"/>',
    snowflake: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/><path d="m8 4 4 4 4-4M8 20l4-4 4 4M4 8l4 4-4 4M20 8l-4 4 4 4"/>',
    injector: '<path d="M14 2 4 12l8 8 10-10-8-8Z"/><path d="m7 15-4 4m8-8 2 2m-5 5 3 3m4-16 4 4"/>',
    paint: '<path d="M19 11 13 5l2-2 6 6-2 2Z"/><path d="m14 6-8.5 8.5a4 4 0 1 0 5.7 5.7L19.7 12"/><path d="M7 17h.01"/>',
    tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m12 3 1 5m8 4-5 1m-4 8-1-5m-8-4 5-1m10-6-4 4m-8 8 4-4m8 4-4-4M6 6l4 4"/>',
    brake: '<circle cx="12" cy="12" r="8"/><path d="M7 4A10 10 0 0 0 4 7m13-3a10 10 0 0 1 3 3M7 20a10 10 0 0 1-3-3m13 3a10 10 0 0 0 3-3"/><path d="M9 12h6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    map: '<path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    car: '<path d="M3 13 5 7a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 6"/><path d="M5 13h14v5H5z"/><path d="M7 18v2m10-2v2M7 13l-2-2m12 2 2-2"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/>',
    alert: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 9v5m0 3h.01"/>',
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] ?? paths.check}</svg>`;
}

function shell({ title, description, pathName = "/", body, jsonLd = "" }) {
  const canonical = `${siteUrl}${pathName}`;
  return `<!doctype html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="ro_RO">
  <link rel="icon" href="${assetPath("/assets/favicon.svg")}" type="image/svg+xml">
  <link rel="stylesheet" href="${assetPath("/assets/styles.css")}?v=${assetVersion}">
  ${jsonLd}
</head>
<body>
  <a class="skip-link" href="#continut">Sari la conținut</a>
  <div class="site-shell">
    ${header()}
    <main id="continut">
      ${body}
    </main>
    ${footer()}
  </div>
  <script src="${assetPath("/assets/site.js")}?v=${assetVersion}" defer></script>
</body>
</html>`;
}

function header() {
  return `<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${homeHref()}" aria-label="MOTORPEXT acasă">
      <span class="brand-mark">M</span>
      <span>
        <span class="brand-name">MOTORPEXT</span>
        <span class="brand-subtitle">Service auto Oradea</span>
      </span>
    </a>
    <button class="menu-toggle" type="button" aria-label="Deschide meniul" aria-controls="site-navigation" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="main-nav" id="site-navigation" aria-label="Navigație principală">
      <ul>
        <li><a href="${homeHref()}">Acasă</a></li>
        <li class="nav-dropdown">
          <button class="nav-trigger" type="button" aria-expanded="false">Servicii</button>
          <div class="nav-panel">
            <div class="nav-service-grid">
              ${navServiceSlugs.map((slug) => {
                const service = serviceMap[slug];
                return `<a href="${serviceHref(slug)}">${icon(service.icon)}<span>${service.navTitle}</span></a>`;
              }).join("")}
            </div>
          </div>
        </li>
        <li><a href="${homeHref("#despre-noi")}">Despre noi</a></li>
        <li><a href="${homeHref("#programare")}">Programare</a></li>
        <li><a href="${homeHref("#contact")}">Contact</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      <a class="phone-link" href="tel:+40744532370">${icon("phone")}<span>${business.phonePrimary}</span></a>
      <a class="btn btn-primary" href="${homeHref("#programare")}">Programează-te</a>
    </div>
  </div>
</header>`;
}

function footer() {
  const footerServices = ["reglaj-directie-oradea", "incarcare-freon-oradea", "diagnoza-auto-oradea", "reparatii-injectoare-oradea"];
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <section>
      <a class="brand" href="${homeHref()}" aria-label="MOTORPEXT acasă">
        <span class="brand-mark">M</span>
        <span>
          <span class="brand-name" style="color:#fff">MOTORPEXT</span>
          <span class="brand-subtitle" style="color:rgba(255,255,255,.62)">SC MOTORPEXT SRL</span>
        </span>
      </a>
      <p>Service auto autorizat R.A.R. în Oradea, cu experiență din 1994 și servicii multimarcă pentru întreținere și reparații auto.</p>
    </section>
    <section>
      <h2>Linkuri rapide</h2>
      <ul class="footer-links">
        <li><a href="${homeHref()}">Acasă</a></li>
        <li><a href="${homeHref("#servicii")}">Servicii</a></li>
        <li><a href="${homeHref("#despre-noi")}">Despre noi</a></li>
        <li><a href="${homeHref("#programare")}">Programare</a></li>
        <li><a href="${homeHref("#contact")}">Contact</a></li>
      </ul>
    </section>
    <section>
      <h2>Servicii</h2>
      <ul class="footer-links">
        ${footerServices.map((slug) => `<li><a href="${serviceHref(slug)}">${serviceMap[slug].navTitle}</a></li>`).join("")}
      </ul>
    </section>
    <section>
      <h2>Contact</h2>
      <ul class="footer-links">
        <li><a href="tel:+40744532370">${business.phonePrimary}</a></li>
        <li><a href="tel:+40745367535">${business.phoneSecondary}</a></li>
        <li>${business.address}</li>
        <li>${business.hours}</li>
        <li><a href="${privacyHref()}">Politica de confidențialitate</a></li>
      </ul>
    </section>
  </div>
  <div class="container footer-bottom">
    <span>© ${new Date().getFullYear()} ${business.name}. Toate drepturile rezervate.</span>
    <span>Service auto Oradea · Autorizat R.A.R. · Diesel Point</span>
  </div>
</footer>`;
}

function mediaCard({ image, alt, captionTitle, captionText, small = false }) {
  return `<figure class="media-card ${small ? "small" : ""}">
    <div class="photo-fallback">${workshopSvg()}</div>
    <img src="${assetPath(image)}" alt="${alt}" ${small ? 'loading="lazy"' : 'loading="eager" fetchpriority="high"'} decoding="async">
    <figcaption class="media-caption">
      <strong>${captionTitle}</strong>
      <span>${captionText}</span>
    </figcaption>
  </figure>`;
}

function workshopSvg() {
  return `<svg viewBox="0 0 620 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M64 258h492" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity=".8"/>
    <path d="M112 214h94l38-58h160l52 58h54c24 0 43 19 43 43v1H68v-1c0-24 20-43 44-43Z" stroke="currentColor" stroke-width="10" stroke-linejoin="round"/>
    <circle cx="176" cy="258" r="38" stroke="currentColor" stroke-width="10"/>
    <circle cx="454" cy="258" r="38" stroke="currentColor" stroke-width="10"/>
    <path d="M253 158h88m41 0 44 55M98 213h420M289 77v68m80-68v68M250 77h160" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
    <path d="M120 92h64m252 0h64M103 121h97m219 0h98" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity=".55"/>
  </svg>`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    alternateName: business.brand,
    url: siteUrl,
    telephone: [`+40 744 532 370`, `+40 745 367 535`],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Santăului nr. 1",
      addressLocality: "Oradea",
      addressCountry: "RO",
    },
    openingHours: "Mo-Fr 08:00-17:00",
    areaServed: "Oradea",
    priceRange: "$$",
    description: "Service auto autorizat R.A.R. în Oradea, cu experiență din 1994, servicii multimarcă și certificare Diesel Point.",
  };
}

function scriptJson(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function homePage() {
  setPageContext("/");
  const localSchema = scriptJson(localBusinessSchema());
  const body = `<section class="hero">
  <div class="container hero-grid">
    <div>
      <span class="eyebrow">SC MOTORPEXT SRL · Oradea</span>
      <h1>Service auto profesionist în Oradea</h1>
      <p class="hero-copy">Diagnoză computerizată, mecanică auto, electrică, reglaj direcție, reparații climă și întreținere completă pentru autoturismul tău.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="tel:+40744532370">Contactează-ne</a>
        <a class="btn btn-secondary" href="#servicii">Vezi serviciile</a>
      </div>
      <div class="trust-strip" aria-label="Indicatori de încredere">
        ${["Autorizat R.A.R.", "Diesel Point", "Experiență din 1994", "Service multimarcă"].map((item) => `<div class="trust-item">${icon("shield")}<span>${item}</span></div>`).join("")}
      </div>
    </div>
    ${mediaCard({
      image: imageUrls.workshop,
      alt: "Atelier auto modern cu mecanic lucrând profesionist la un autoturism",
      captionTitle: "Atelier profesionist în Oradea",
      captionText: "Service multimarcă pentru diagnoză, mecanică, electrică și întreținere.",
    })}
  </div>
</section>

<section class="section section-white" id="servicii">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Servicii</span>
        <h2 class="section-title">Servicii auto în Oradea</h2>
      </div>
      <p class="section-lead">Pagini dedicate pentru cele mai căutate servicii, create pentru clienți care vor claritate, seriozitate și programare rapidă.</p>
    </div>
    <div class="services-grid">
      ${["diagnoza-auto-oradea", "mecanica-auto-oradea", "electrica-auto-oradea", "reglaj-directie-oradea", "incarcare-freon-oradea", "reparatii-clima-auto-oradea", "reparatii-injectoare-oradea", "tinichigerie-vopsitorie-oradea"].map(serviceCard).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Prioritar</span>
        <h2 class="section-title">Servicii căutate frecvent</h2>
      </div>
      <p class="section-lead">Două intervenții unde verificarea corectă și echipamentele potrivite fac diferența pentru siguranță și confort.</p>
    </div>
    <div class="featured-grid">
      ${featuredCard("reglaj-directie-oradea", imageUrls.alignment, "Reglaj direcție Oradea", "Verificare și reglaj geometrie roți pentru stabilitate, anvelope protejate și direcție predictibilă.")}
      ${featuredCard("incarcare-freon-oradea", imageUrls.ac, "Încărcare freon Oradea", "Verificare climă auto, control presiune și reîncărcare atunci când instalația are nevoie de intervenție.")}
    </div>
  </div>
</section>

<section class="section section-dark">
  <div class="container why-grid">
    <div>
      <span class="section-kicker">De ce Motorpext</span>
      <h2 class="section-title">Un service auto local construit pe seriozitate</h2>
      <p class="section-lead">Pentru clienții care caută un service auto autorizat RAR în Oradea, Motorpext combină experiența cu o abordare clară și tehnică.</p>
    </div>
    <div class="check-grid">
      ${[
        ["Experiență din 1994", "Activitate îndelungată în service auto."],
        ["Personal calificat", "Echipă atentă la constatare și execuție."],
        ["Echipamente moderne", "Verificări tehnice pentru sisteme actuale."],
        ["Prețuri transparente", "Comunicare clară înainte de lucrări."],
        ["Lucrări rapide și corecte", "Intervenții orientate către rezultat."],
        ["Comunicare clară cu clientul", "Explicații simple, fără presiune inutilă."],
      ].map(([title, text]) => `<div class="check-item">${icon("check")}<div><strong>${title}</strong><span>${text}</span></div></div>`).join("")}
    </div>
  </div>
</section>

<section class="section section-white" id="despre-noi">
  <div class="container split">
    <div class="about-panel">
      <span class="section-kicker">Despre noi</span>
      <h2 class="section-title">Service auto cu experiență în Oradea</h2>
      <p>Motorpext oferă servicii de reparații și întreținere auto pentru clienți care caută seriozitate, comunicare clară și lucrări realizate corect.</p>
      <ul class="credentials-list">
        <li>${icon("shield")} Service auto autorizat R.A.R.</li>
        <li>${icon("shield")} Certificat Diesel Point</li>
        <li>${icon("car")} Service auto multimarcă Oradea</li>
      </ul>
    </div>
    ${mediaCard({
      image: imageUrls.diagnostics,
      alt: "Specialist auto realizând diagnoză computerizată într-un atelier",
      captionTitle: "Diagnoză și constatare",
      captionText: "Începem cu verificarea corectă, apoi recomandăm intervenția potrivită.",
      small: true,
    })}
  </div>
</section>

<section class="section-tight" id="programare">
  <div class="container">
    ${ctaBand("Ai nevoie de o verificare auto?", "Sună acum sau programează o vizită la service.", "Sună: 0744 532 370")}
  </div>
</section>

${contactSection()}`;
  return shell({
    title: "Service auto Oradea | SC MOTORPEXT SRL",
    description: "SC MOTORPEXT SRL este un service auto autorizat RAR în Oradea, cu experiență din 1994. Diagnoză auto, mecanică, electrică, reglaj direcție, climă și reparații injectoare.",
    pathName: "/",
    body,
    jsonLd: localSchema,
  });
}

function serviceCard(slug) {
  const service = serviceMap[slug];
  return `<a class="service-card" href="${serviceHref(service.slug)}">
    <span class="card-icon">${icon(service.icon)}</span>
    <h3>${service.navTitle}</h3>
    <p>${service.heroText}</p>
    <span class="card-link">Detalii</span>
  </a>`;
}

function featuredCard(slug, image, title, text) {
  const service = serviceMap[slug];
  return `<article class="featured-card" style="--feature-image:url('${cssAssetPath(image)}')">
    <span class="card-icon">${icon(service.icon)}</span>
    <h3>${title}</h3>
    <p>${text}</p>
    <a class="text-link" href="${serviceHref(slug)}">Află mai multe</a>
  </article>`;
}

function ctaBand(title, text, primaryLabel) {
  return `<section class="cta-band" aria-labelledby="programare-rapida">
    <div class="cta-content">
      <div>
        <h2 id="programare-rapida">${title}</h2>
        <p>${text}</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary" href="tel:+40744532370">${primaryLabel}</a>
        <a class="btn btn-secondary" href="${homeHref("#contact")}">Programează-te</a>
      </div>
    </div>
  </section>`;
}

function contactSection() {
  return `<section class="section section-white" id="contact">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Contact</span>
        <h2 class="section-title">Programează o vizită la service</h2>
      </div>
      <p class="section-lead">Sună pentru disponibilitate, detalii despre lucrare sau o programare la atelierul Motorpext din Oradea.</p>
    </div>
    <div class="contact-grid">
      <section class="contact-card" aria-label="Date de contact">
        <ul class="contact-list">
          <li>${icon("phone")}<div><strong>Telefon</strong><a href="tel:+40744532370">${business.phonePrimary}</a></div></li>
          <li>${icon("phone")}<div><strong>Telefon</strong><a href="tel:+40745367535">${business.phoneSecondary}</a></div></li>
          <li>${icon("map")}<div><strong>Adresă</strong><span>${business.address}</span></div></li>
          <li>${icon("clock")}<div><strong>Program</strong><span>${business.hours}</span></div></li>
        </ul>
      </section>
      <section class="map-card" aria-label="Hartă">
        <div class="map-placeholder">
          <iframe
            title="Motorpext pe Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.343958401972!2d21.8919271!3d47.1075406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474647e9d7d39eab%3A0xd774a1d40437467f!2sMotorpext!5e1!3m2!1shu!2sro!4v1779010088374!5m2!1shu!2sro"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    </div>
  </div>
</section>`;
}

function servicePage(service) {
  setPageContext(`/servicii/${service.slug}/`);
  const localSchema = localBusinessSchema();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.primaryKeyword,
    areaServed: "Oradea",
    provider: {
      "@type": "AutoRepair",
      name: business.name,
      telephone: "+40 744 532 370",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Str. Santăului nr. 1",
        addressLocality: "Oradea",
        addressCountry: "RO",
      },
    },
  };

  const body = `<section class="hero service-hero">
  <div class="container hero-grid">
    <div>
      <ol class="breadcrumbs">
        <li><a href="${homeHref()}">Acasă</a></li>
        <li><a href="${homeHref("#servicii")}">Servicii</a></li>
        <li>${service.navTitle}</li>
      </ol>
      <span class="eyebrow">${business.name}</span>
      <h1>${service.title}</h1>
      <p class="hero-copy">${service.heroText}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="tel:+40744532370">Sună acum</a>
        <a class="btn btn-secondary" href="${homeHref("#contact")}">Programează-te</a>
      </div>
      <div class="badge-row" aria-label="Indicatori de încredere">
        ${["Autorizat R.A.R.", "Diesel Point", "Experiență din 1994", "Service auto în Oradea"].map((badge) => `<span class="badge">${icon("shield")}${badge}</span>`).join("")}
      </div>
    </div>
    ${mediaCard({
      image: service.image,
      alt: service.imageAlt,
      captionTitle: service.captionTitle,
      captionText: service.captionText,
    })}
  </div>
</section>

<section class="section section-white">
  <div class="container">
    <div class="centered">
      <span class="section-kicker">Simptome</span>
      <h2 class="section-title">${service.symptomsTitle}</h2>
      <p class="section-lead">Dacă observi unul dintre aceste semne, este recomandată o verificare tehnică înainte ca problema să se agraveze.</p>
    </div>
    <div class="symptom-grid" style="margin-top:42px">
      ${service.symptoms.map((item) => `<div class="symptom-card">${icon("check")}<strong>${item}</strong></div>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container explain-grid">
    <div>
      <span class="section-kicker">Explicație</span>
      <h2 class="section-title">${service.explanationTitle}</h2>
      <p class="section-lead">${service.explanationIntro}</p>
      <div class="stats-row">
        <div class="stat-card"><strong>1994</strong><span>Experiență din</span></div>
        <div class="stat-card"><strong>RAR</strong><span>Service autorizat</span></div>
        <div class="stat-card"><strong>2</strong><span>Numere de contact</span></div>
      </div>
    </div>
    <div class="explain-panel">
      <ul class="explain-list">
        ${service.explanationBlocks.map(([title, text]) => `<li>${icon(service.icon)}<div><strong>${title}</strong><span>${text}</span></div></li>`).join("")}
      </ul>
    </div>
  </div>
</section>

${service.warning ? `<section class="section-tight section-white"><div class="container"><section class="warning-panel">${icon("alert")}<div><h2>${service.warning.title}</h2><p>${service.warning.text}</p></div></section></div></section>` : ""}

<section class="section section-white">
  <div class="container">
    <div class="centered">
      <span class="section-kicker">Beneficii</span>
      <h2 class="section-title">${service.benefitTitle ?? "Beneficii"}</h2>
      <p class="section-lead">Un service corect înseamnă siguranță, confort și decizii mai bune pentru întreținerea mașinii.</p>
    </div>
    <div class="benefit-grid" style="margin-top:42px">
      ${service.benefits.map((item) => `<article class="info-card"><span class="card-icon">${icon("check")}</span><h3>${item}</h3><p>Intervenție orientată către funcționare corectă, comunicare clară și rezultat tehnic verificabil.</p></article>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Proces</span>
        <h2 class="section-title">Cum lucrăm</h2>
      </div>
      <p class="section-lead">Pași simpli, explicați clar, pentru ca programarea la service să fie predictibilă.</p>
    </div>
    <div class="process-steps">
      ${service.process.map(([title, text]) => `<article class="process-step"><h3>${title}</h3><p>${text}</p></article>`).join("")}
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    ${ctaBand(service.ctaQuestion, "Sună acum sau programează o vizită la service pentru o constatare clară.", "Sună: 0744 532 370")}
  </div>
</section>

<section class="section section-white">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Conexe</span>
        <h2 class="section-title">Servicii conexe</h2>
      </div>
      <p class="section-lead">Pentru o constatare completă, aceste servicii pot fi relevante în aceeași vizită.</p>
    </div>
    <div class="related-grid">
      ${service.related.map(relatedCard).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container centered">
    <span class="section-kicker">FAQ</span>
    <h2 class="section-title">Întrebări frecvente despre ${service.navTitle.toLowerCase()}</h2>
    <div class="faq-list">
      ${service.faqs.map(([question, answer], index) => `<details class="faq-item" ${index === 0 ? "open" : ""}><summary>${question}</summary><p>${answer}</p></details>`).join("")}
    </div>
  </div>
</section>

${contactSection()}`;

  return shell({
    title: service.metaTitle,
    description: service.metaDescription,
    pathName: `/servicii/${service.slug}/`,
    body,
    jsonLd: `${scriptJson(localSchema)}${scriptJson(serviceSchema)}${scriptJson(faqSchema)}`,
  });
}

function relatedCard(slug) {
  const service = serviceMap[slug];
  return `<a class="related-card" href="${serviceHref(service.slug)}">
    <span class="card-icon">${icon(service.icon)}</span>
    <h3>${service.navTitle}</h3>
    <p>${service.heroText}</p>
    <span class="card-link">Află mai multe</span>
  </a>`;
}

function privacyPage() {
  setPageContext("/politica-de-confidentialitate/");
  const body = `<section class="hero service-hero">
    <div class="container">
      <span class="eyebrow">${business.name}</span>
      <h1>Politica de confidențialitate</h1>
      <p class="hero-copy">Informații generale despre protecția datelor pentru website-ul Motorpext.</p>
    </div>
  </section>
  <section class="section section-white">
    <div class="container about-panel">
      <h2>Confidențialitate</h2>
      <p>Acest website prezintă informații despre serviciile SC MOTORPEXT SRL și include date de contact pentru solicitări de programare. Pentru întrebări privind datele personale, ne poți contacta la numerele afișate pe site.</p>
    </div>
  </section>`;
  return shell({
    title: "Politica de confidențialitate | MOTORPEXT",
    description: "Politica de confidențialitate pentru website-ul SC MOTORPEXT SRL.",
    pathName: "/politica-de-confidentialitate/",
    body,
    jsonLd: scriptJson(localBusinessSchema()),
  });
}

async function writePage(filePath, html) {
  const fullPath = path.join(outDir, filePath);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html, "utf8");
}

await writePage("index.html", homePage());
for (const service of services) {
  await writePage(`servicii/${service.slug}/index.html`, servicePage(service));
}
await writePage("politica-de-confidentialitate/index.html", privacyPage());

const sitemapUrls = [
  "/",
  ...services.map((service) => `/servicii/${service.slug}/`),
  "/politica-de-confidentialitate/",
];
await writePage(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${siteUrl}${url}</loc></url>`).join("\n")}
</urlset>
`,
);
await writePage(
  "robots.txt",
  `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`,
);

console.log(`Generated ${sitemapUrls.length} HTML pages plus sitemap and robots.txt.`);
