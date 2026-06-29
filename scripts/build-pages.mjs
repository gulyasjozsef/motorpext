import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = process.cwd();
const siteUrl = "https://www.motorpext.ro";
const assetVersion = "20260629-customer-copy-refresh";
let currentPrefix = "";
let currentLang = "ro";
let currentPathName = "/";

const languages = {
  ro: { label: "RO", name: "Română", htmlLang: "ro", ogLocale: "ro_RO", prefix: "" },
  hu: { label: "HU", name: "Magyar", htmlLang: "hu", ogLocale: "hu_HU", prefix: "hu/" },
  en: { label: "EN", name: "English", htmlLang: "en", ogLocale: "en_US", prefix: "en/" },
};

const languageOrder = ["ro", "hu", "en"];

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
  diagnostics: "/assets/images/service-diagnoza-auto.jpg",
  mechanic: "/assets/images/service-mecanica-auto.jpg",
  electrical: "/assets/images/service-electrica-auto.jpg",
  alignment: "/assets/images/service-reglaj-directie.jpg",
  ac: "/assets/images/service-incarcare-freon.jpg",
  acRepair: "/assets/images/service-reparatii-clima.jpg",
  injection: "/assets/images/service-verificare-injectie.jpg",
  bodywork: "/assets/images/service-tinichigerie-vopsitorie.jpg",
  tires: "/assets/images/service-anvelope.jpg",
  brakes: "/assets/images/service-frane-suspensie.jpg",
  workflowBooking: "/assets/images/workflow-programare-discutie.jpg",
  workflowInspection: "/assets/images/workflow-constatare-tehnica.jpg",
  workflowSolution: "/assets/images/workflow-solutie-clara.jpg",
  workflowFinalCheck: "/assets/images/workflow-verificare-finala.jpg",
  fleet: "/assets/images/fleet-auto-companii.jpg",
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
    metaDescription: "Reglaj direcție în Oradea pentru mașini care trag într-o parte, volan strâmb sau anvelope uzate neuniform. Verificare clară la Motorpext.",
    heroText: "Mașina trage într-o parte sau volanul nu stă drept? Verificăm geometria roților și reglăm direcția pentru rulare stabilă.",
    image: imageUrls.alignment,
    imageAlt: "Mecanic verificând geometria roților într-un service auto din Oradea",
    captionTitle: "Direcție care se simte corect",
    captionText: "Verificăm valorile roților și corectăm abaterile care afectează stabilitatea.",
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
    explanationIntro: "Când direcția nu este reglată corect, mașina devine obositoare de condus și poate uza anvelopele mai repede. Verificăm geometria, îți explicăm ce valori sunt în afara parametrilor și facem reglajul acolo unde este posibil.",
    explanationBlocks: [
      ["Verificarea geometriei roților", "Măsurăm poziția roților și vedem exact ce poate provoca instabilitate sau uzură neuniformă."],
      ["Reglarea unghiurilor de direcție", "Corectăm unghiurile pentru o direcție mai precisă și o mașină mai ușor de controlat."],
      ["Controlul stabilității", "Verificăm dacă există semne de probleme la direcție, suspensie sau anvelope."],
      ["Recomandări după verificare", "Primești explicații simple despre ce am constatat și ce merită făcut mai departe."],
    ],
    benefits: ["Siguranță mai bună la condus", "Uzură uniformă a anvelopelor", "Stabilitate crescută", "Consum optimizat", "Protecție pentru suspensie și direcție"],
    benefitTitle: "Beneficiile reglajului corect",
    process: [
      ["Verificare inițială", "Ne spui ce simți la volan și inspectăm elementele relevante."],
      ["Măsurare geometrie roți", "Verificăm valorile cu echipamente dedicate și le interpretăm pentru tine."],
      ["Reglaj direcție", "Aducem unghiurile în parametri, dacă starea mașinii permite reglajul."],
      ["Confirmare și recomandări", "Verificăm rezultatul și îți spunem dacă sunt necesare alte intervenții."],
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
    metaDescription: "Încărcare freon în Oradea cu verificarea instalației de climă. Află dacă sistemul poate fi încărcat corect sau are pierderi.",
    heroText: "Clima nu mai răcește bine? Verificăm instalația, presiunea și completăm freonul doar când sistemul permite o lucrare corectă.",
    image: imageUrls.ac,
    imageAlt: "Mecanic lucrând la sistemul de climatizare auto într-un atelier modern",
    captionTitle: "Răcire verificată înainte de drum",
    captionText: "Nu încărcăm la întâmplare: verificăm dacă sistemul poate funcționa corect.",
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
    explanationIntro: "Dacă aerul nu mai este rece, cauza poate fi nivelul scăzut de agent frigorific, o pierdere sau o componentă defectă. De aceea începem cu verificarea instalației, apoi îți spunem clar dacă încărcarea este suficientă.",
    explanationBlocks: [
      ["Verificarea sistemului de climatizare", "Analizăm cum lucrează instalația și dacă apar semne de pierderi sau blocaje."],
      ["Verificarea presiunii", "Controlăm presiunea pentru a vedea dacă sistemul poate fi încărcat în siguranță."],
      ["Încărcare freon", "Completăm agentul frigorific atunci când verificările arată că lucrarea este justificată."],
      ["Control funcționare", "Testăm răcirea și răspunsul sistemului după încărcare."],
      ["Recomandări tehnice", "Îți spunem pe înțelesul tău dacă este nevoie de o reparație suplimentară."],
    ],
    warning: {
      title: "Încărcarea cu freon nu rezolvă orice problemă",
      text: "Dacă instalația pierde freon, o simplă reîncărcare poate ține puțin. Verificarea cauzei te ajută să eviți drumuri repetate la service.",
    },
    benefits: ["Răcire eficientă", "Confort la condus", "Protecție pentru compresor", "Funcționare corectă a sistemului", "Diagnostic clar înainte de reparații"],
    benefitTitle: "Beneficii",
    process: [
      ["Verificare inițială", "Ne spui ce ai observat, apoi verificăm funcționarea climei."],
      ["Control presiune și funcționare", "Evaluăm presiunea și comportamentul sistemului."],
      ["Încărcare freon dacă este necesar", "Reîncărcăm doar când intervenția are sens tehnic."],
      ["Test final", "Confirmăm răcirea și îți comunicăm eventualele recomandări."],
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
    metaDescription: "Reparații climă auto în Oradea pentru răcire slabă, miros neplăcut, pierderi de freon sau compresor cu probleme. Verificare clară.",
    heroText: "Dacă aerul nu mai răcește, apare miros neplăcut sau pierzi freon, verificăm cauza și reparăm sistemul de climatizare.",
    image: imageUrls.acRepair,
    imageAlt: "Verificare sistem climatizare auto într-un service autorizat din Oradea",
    captionTitle: "Climă reparată cu logică",
    captionText: "Căutăm cauza problemei, ca reparația să nu fie doar o soluție temporară.",
    symptomsTitle: "Semne că sistemul de climatizare are nevoie de service",
    symptoms: ["Răcire slabă", "Miros neplăcut în habitaclu", "Zgomote la pornirea climei", "Geamuri care se aburesc rapid", "Compresor care pornește intermitent", "Pierdere repetată de freon"],
    explanationTitle: "Cum abordăm reparațiile la clima auto",
    explanationIntro: "O climă auto defectă poate însemna pierderi, senzori, compresor, ventilatoare sau probleme electrice. Verificăm sistemul pas cu pas și îți explicăm varianta de reparație potrivită.",
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
    metaDescription: "Diagnoză auto în Oradea pentru martori aprinși, pornire dificilă, consum crescut sau pierdere de putere. Verificări și explicații clare.",
    heroText: "Ai un martor aprins sau mașina se comportă ciudat? Facem diagnoză și verificări tehnice ca să afli cauza, nu doar codul de eroare.",
    image: imageUrls.diagnostics,
    imageAlt: "Diagnoză computerizată auto într-un service din Oradea",
    captionTitle: "Răspunsuri înainte de reparații",
    captionText: "Corelăm datele din diagnoză cu simptomele reale ale mașinii.",
    symptomsTitle: "Când este utilă diagnoza auto?",
    symptoms: ["Martori aprinși în bord", "Motor care funcționează neregulat", "Consum crescut", "Pierdere de putere", "Pornire dificilă", "Zgomote sau comportament neobișnuit"],
    explanationTitle: "Ce include diagnoza auto?",
    explanationIntro: "Un cod de eroare este doar începutul. Îl verificăm împreună cu simptomele mașinii, ca să poți decide informat și să eviți schimbările de piese făcute din presupuneri.",
    explanationBlocks: genericBlocks("diagnoză"),
    benefits: ["Identificare mai rapidă", "Decizii informate", "Costuri mai bine controlate", "Reparații orientate corect", "Comunicare clară"],
    process: genericProcess("diagnoză"),
    ctaQuestion: "Ai nevoie de diagnoză auto în Oradea?",
    related: ["mecanica-auto-oradea", "electrica-auto-oradea", "incarcare-freon-oradea", "reparatii-clima-auto-oradea"],
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
    metaDescription: "Mecanică auto în Oradea pentru revizii, zgomote, vibrații, scurgeri sau reparații multimarcă. Service autorizat RAR.",
    heroText: "Zgomote, vibrații, scurgeri sau revizie amânată? Verificăm mașina și îți explicăm clar ce trebuie reparat.",
    image: imageUrls.mechanic,
    imageAlt: "Mecanic realizând reparații auto într-un atelier profesionist",
    captionTitle: "Reparații explicate pe înțeles",
    captionText: "Știi ce se lucrează la mașină și de ce este necesară intervenția.",
    symptomsTitle: "Când să vii la mecanică auto?",
    symptoms: ["Zgomote la motor sau suspensie", "Vibrații la rulare", "Scurgeri de lichide", "Frânare neuniformă", "Revizie necesară", "Comportament schimbat al mașinii"],
    explanationTitle: "Ce presupun reparațiile mecanice?",
    explanationIntro: "Începem cu simptomele pe care le simți la condus, verificăm componentele relevante și îți spunem ce este urgent, ce poate aștepta și ce lucrare rezolvă problema.",
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
    metaDescription: "Electrică auto în Oradea pentru martori aprinși, probleme de pornire, baterie, senzori, lumini sau accesorii care funcționează intermitent.",
    heroText: "Probleme la pornire, senzori, baterie sau martori aprinși? Verificăm sistemele electrice și căutăm cauza reală.",
    image: imageUrls.electrical,
    imageAlt: "Verificări electrice auto cu echipament de diagnoză",
    captionTitle: "Verificare electrică atentă",
    captionText: "Testăm circuitul, simptomele și componentele înainte să recomandăm reparația.",
    symptomsTitle: "Semne de probleme electrice auto",
    symptoms: ["Martori aprinși în bord", "Probleme la pornire", "Lumini sau accesorii care funcționează intermitent", "Baterie care se descarcă", "Senzori cu erori", "Climă sau ventilatoare cu probleme"],
    explanationTitle: "Cum verificăm electrica auto",
    explanationIntro: "Defecțiunile electrice pot avea cauze ascunse și simptome intermitente. Combinăm diagnoza cu testări tehnice pentru a evita intervențiile inutile.",
    explanationBlocks: genericBlocks("electrică auto"),
    benefits: ["Identificare precisă", "Reparații orientate corect", "Funcționare stabilă", "Mai puține probleme recurente", "Recomandări clare"],
    process: genericProcess("electrică auto"),
    ctaQuestion: "Ai nevoie de electrică auto în Oradea?",
    related: ["diagnoza-auto-oradea", "incarcare-freon-oradea", "reparatii-clima-auto-oradea", "mecanica-auto-oradea"],
    faqs: genericFaq("electrică auto", "verificarea"),
  },
  {
    slug: "verificare-injectie-oradea",
    title: "Verificare injecție Oradea",
    navTitle: "Verificare injecție",
    icon: "injector",
    primaryKeyword: "Verificare injecție Oradea",
    secondaryKeywords: ["Verificare injectoare Oradea", "Sistem injecție diesel Oradea", "Diesel Point Oradea"],
    metaTitle: "Verificare injecție Oradea | Diesel Point | MOTORPEXT",
    metaDescription: "Verificare injecție în Oradea pentru pornire greoaie, fum, consum crescut sau motor neregulat. Service certificat Diesel Point.",
    heroText: "Motorul pornește greu, scoate fum sau tremură? Verificăm sistemul de injecție și îți spunem ce merită reparat.",
    image: imageUrls.injection,
    imageAlt: "Verificare sistem injecție diesel într-un service auto",
    captionTitle: "Date clare înainte de decizie",
    captionText: "Verificăm sistemul de injecție înainte să recomandăm reparația.",
    symptomsTitle: "Când este recomandată verificarea injecției?",
    symptoms: ["Pornire greoaie", "Fum la evacuare", "Consum crescut", "Motor care tremură", "Pierdere de putere", "Erori la diagnoză"],
    explanationTitle: "Ce verificăm la sistemul de injecție",
    explanationIntro: "Problemele de injecție pot afecta pornirea, consumul, fumul și puterea motorului. Verificăm simptomele și componentele relevante înainte să recomandăm reparații.",
    explanationBlocks: genericBlocks("sistem de injecție"),
    benefits: ["Claritate tehnică", "Reparații recomandate corect", "Protecție pentru motor", "Consum mai eficient", "Experiență Diesel Point"],
    process: genericProcess("sistem de injecție"),
    ctaQuestion: "Ai nevoie de verificare injecție în Oradea?",
    related: ["diagnoza-auto-oradea", "mecanica-auto-oradea", "electrica-auto-oradea", "incarcare-freon-oradea"],
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
    metaDescription: "Tinichigerie și vopsitorie auto în Oradea pentru lovituri, zgârieturi, elemente deformate și reparații de caroserie.",
    heroText: "Lovituri, zgârieturi sau elemente de caroserie deformate? Evaluăm dauna și îți explicăm pașii pentru o reparație curată.",
    image: imageUrls.bodywork,
    imageAlt: "Lucrări de tinichigerie și vopsitorie auto într-un atelier",
    captionTitle: "Caroserie cu aspect îngrijit",
    captionText: "Stabilim lucrarea potrivită pentru zona afectată și rezultatul dorit.",
    symptomsTitle: "Când ai nevoie de tinichigerie sau vopsitorie?",
    symptoms: ["Lovituri de caroserie", "Zgârieturi vizibile", "Elemente deformate", "Necesitate revopsire locală", "Daune după incident", "Pregătire pentru reparații estetice"],
    explanationTitle: "Ce includ lucrările de caroserie",
    explanationIntro: "Fiecare daună are soluția ei: îndreptare, pregătire, vopsire locală sau înlocuire. Evaluăm zona afectată și îți explicăm ce variantă este potrivită pentru mașina ta.",
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
    metaDescription: "Service anvelope în Oradea pentru schimb sezonier, uzură neuniformă, vibrații, presiune scăzută și verificări ale roților.",
    heroText: "Ai vibrații, presiune care scade sau anvelope uzate neuniform? Verificăm roțile ca mașina să ruleze sigur și stabil.",
    image: imageUrls.tires,
    imageAlt: "Roată verificată într-un service auto din Oradea",
    captionTitle: "Roți verificate pentru siguranță",
    captionText: "Anvelopele în stare bună ajută frânarea, stabilitatea și confortul.",
    symptomsTitle: "Când să verifici anvelopele?",
    symptoms: ["Uzură neuniformă", "Vibrații la viteză", "Presiune care scade", "Schimb sezonier", "Lovituri în bordură", "Zgomot sau comportament neobișnuit"],
    explanationTitle: "Ce presupune service-ul pentru anvelope",
    explanationIntro: "Anvelopele influențează direct frânarea, stabilitatea și consumul. Verificăm starea roților și îți recomandăm lucrările necesare pentru rulare sigură.",
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
    metaDescription: "Verificări și reparații pentru frâne și suspensie în Oradea. Zgomote, vibrații, instabilitate sau distanță de frânare crescută.",
    heroText: "Auzi zgomote la frânare, simți vibrații sau mașina este instabilă? Verificăm frânele și suspensia pentru siguranța ta.",
    image: imageUrls.brakes,
    imageAlt: "Mecanic verificând frânele și suspensia unui autoturism",
    captionTitle: "Siguranță la fiecare frânare",
    captionText: "Frânele și suspensia se verifică atent, fără improvizații.",
    symptomsTitle: "Semne că frânele sau suspensia au nevoie de verificare",
    symptoms: ["Zgomote la frânare", "Vibrații în volan", "Mașina se lasă pe o parte", "Distanță de frânare crescută", "Bătăi la denivelări", "Instabilitate în viraje"],
    explanationTitle: "Ce verificăm la frâne și suspensie",
    explanationIntro: "Frânele și suspensia schimbă felul în care mașina oprește, virează și reacționează la denivelări. Inspectăm componentele importante și îți spunem ce trebuie rezolvat.",
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
    ["Constatare tehnică", `Verificăm simptomele pe care le observi și componentele relevante pentru ${context}.`],
    ["Identificarea cauzei", "Căutăm cauza reală înainte să recomandăm înlocuiri sau lucrări mai costisitoare."],
    ["Intervenție controlată", "Executăm lucrarea agreată cu atenție la siguranță, funcționare și rezultat."],
    ["Recomandări clare", "Primești explicații simple, fără presiune, ca să știi ce decizie iei."],
  ];
}

function genericProcess(context) {
  return [
    ["Discuție și verificare", `Începem cu ce ai observat la mașină și o verificare pentru ${context}.`],
    ["Constatare tehnică", "Identificăm sistemele care necesită atenție și îți explicăm prioritatea lor."],
    ["Lucrare service", "Realizăm intervenția agreată după ce știi ce presupune și de ce este necesară."],
    ["Control final", "Verificăm rezultatul și îți spunem ce recomandări sunt utile pe mai departe."],
  ];
}

function genericFaq(topic, noun) {
  return [
    [`Când este recomandat serviciul de ${topic}?`, `Este recomandat când observi simptome neobișnuite, când mașina nu mai funcționează normal sau când vrei să previi o problemă mai scumpă.`],
    [`Cât durează ${noun}?`, "Durata depinde de starea mașinii și de complexitatea lucrării. După verificare îți comunicăm o estimare realistă."],
    ["Pot veni fără programare?", "Pentru disponibilitate mai bună, recomandăm să suni înainte sau să soliciți o programare."],
    ["Primesc explicații înainte de reparație?", "Da. Îți explicăm ce am găsit, ce recomandăm și ce opțiuni ai înainte să înceapă lucrarea."],
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
  "tinichigerie-vopsitorie-oradea",
];

function setPageContext(pathName) {
  currentPathName = pathName;
  const cleanPath = localizedPath(pathName, currentLang).replace(/^\/|\/$/g, "");
  currentPrefix = cleanPath ? "../".repeat(cleanPath.split("/").length) : "";
}

function langRoot(lang = currentLang) {
  return languages[lang]?.prefix ?? "";
}

function localizedPath(pathName, lang = currentLang) {
  if (lang === "ro") return pathName;
  return `/${lang}${pathName === "/" ? "/" : pathName}`;
}

function outputPath(pathName, lang = currentLang) {
  const cleanPath = localizedPath(pathName, lang).replace(/^\/|\/$/g, "");
  return cleanPath ? `${cleanPath}/index.html` : "index.html";
}

function languageHref(lang) {
  const cleanPath = currentPathName.replace(/^\/|\/$/g, "");
  return `${currentPrefix}${langRoot(lang)}${cleanPath ? `${cleanPath}/index.html` : "index.html"}`;
}

function assetPath(src) {
  return src.startsWith("/") ? `${currentPrefix}${src.slice(1)}` : src;
}

function cssAssetPath(src) {
  return src.startsWith("/assets/") ? src.slice("/assets/".length) : assetPath(src);
}

function homeHref(hash = "") {
  return `${currentPrefix}${langRoot()}index.html${hash}`;
}

function serviceHref(slug) {
  return `${currentPrefix}${langRoot()}servicii/${slug}/index.html`;
}

function privacyHref() {
  return `${currentPrefix}${langRoot()}politica-de-confidentialitate/index.html`;
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
  const canonicalPath = localizedPath(pathName, currentLang);
  const canonical = `${siteUrl}${canonicalPath}`;
  const langConfig = languages[currentLang];
  const alternates = languageOrder.map((lang) => {
    const hrefLang = lang === "ro" ? "ro" : lang;
    return `<link rel="alternate" hreflang="${hrefLang}" href="${siteUrl}${localizedPath(pathName, lang)}">`;
  }).join("\n  ");
  const rawHtml = `<!doctype html>
<html lang="${langConfig.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${siteUrl}${localizedPath(pathName, "ro")}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${langConfig.ogLocale}">
  <link rel="icon" href="${assetPath("/assets/favicon.svg")}" type="image/svg+xml">
  <link rel="stylesheet" href="${assetPath("/assets/styles.css")}?v=${assetVersion}">
  ${jsonLd}
</head>
<body>
  <a class="skip-link" href="#continut">Sari la conținut</a>
  <div class="site-shell">
    ${header()}
    ${languageSwitcher()}
    <main id="continut">
      ${body}
    </main>
    ${footer()}
  </div>
  <script src="${assetPath("/assets/site.js")}?v=${assetVersion}" defer></script>
</body>
</html>`;
  return translateHtml(rawHtml, currentLang);
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
    <button class="menu-toggle" type="button" aria-label="Deschide meniul" data-label-open="Deschide meniul" data-label-close="Închide meniul" aria-controls="site-navigation" aria-expanded="false">
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
        <li><a href="${homeHref("#flota-auto")}">Flotă auto</a></li>
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

function languageSwitcher() {
  return `<nav class="language-switcher" aria-label="Alege limba">
    ${languageOrder.map((lang) => `<a href="${languageHref(lang)}" lang="${languages[lang].htmlLang}" ${lang === currentLang ? 'aria-current="true"' : ""}>${languages[lang].label}</a>`).join("")}
  </nav>`;
}

function footer() {
  const footerServices = ["reglaj-directie-oradea", "incarcare-freon-oradea", "diagnoza-auto-oradea", "mecanica-auto-oradea"];
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
        <li><a href="${homeHref("#flota-auto")}">Flotă auto</a></li>
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
  const heroSlides = [
    {
      title: "Service auto profesionist în Oradea",
      text: "Când mașina are nevoie de atenție, primești verificări clare, explicații pe înțeles și lucrări făcute corect.",
      image: imageUrls.workshop,
      alt: "Mecanic lucrând într-un service auto modern din Oradea",
    },
    {
      title: "Încărcare freon",
      text: serviceMap["incarcare-freon-oradea"].heroText,
      image: imageUrls.ac,
      alt: serviceMap["incarcare-freon-oradea"].imageAlt,
    },
    {
      title: "Reglaj direcție",
      text: serviceMap["reglaj-directie-oradea"].heroText,
      image: imageUrls.alignment,
      alt: serviceMap["reglaj-directie-oradea"].imageAlt,
    },
  ];
  const body = `<section class="hero home-hero" aria-label="Servicii principale Motorpext" data-hero-slider>
  <div class="home-hero-slides" aria-hidden="true">
    ${heroSlides.map((slide, index) => `<div class="home-hero-slide${index === 0 ? " is-active" : ""}" style="--hero-image: url('${cssAssetPath(slide.image)}')"></div>`).join("")}
  </div>
  <div class="container home-hero-inner">
    <div class="home-hero-content">
      <span class="eyebrow">SC MOTORPEXT SRL · Oradea</span>
      <div class="home-hero-copy">
        ${heroSlides.map((slide, index) => `<article class="home-hero-panel${index === 0 ? " is-active" : ""}" data-hero-panel="${index}" aria-hidden="${index === 0 ? "false" : "true"}">
          <h1>${slide.title}</h1>
          <p class="hero-copy">${slide.text}</p>
        </article>`).join("")}
      </div>
      <div class="hero-actions">
        <a class="btn btn-primary" href="tel:+40744532370">Contactează-ne</a>
        <a class="btn btn-secondary" href="#servicii">Vezi serviciile</a>
      </div>
    </div>
    <div class="hero-progress" aria-label="Alege serviciul afișat">
      ${heroSlides.map((slide, index) => `<button class="hero-progress-button${index === 0 ? " is-active" : ""}" type="button" data-hero-dot="${index}" aria-label="Afișează: ${slide.title}" aria-pressed="${index === 0 ? "true" : "false"}">
        <svg viewBox="0 0 44 44" aria-hidden="true">
          <circle class="hero-progress-track" cx="22" cy="22" r="19"></circle>
          <circle class="hero-progress-ring" cx="22" cy="22" r="19"></circle>
        </svg>
        <span>${index + 1}</span>
      </button>`).join("")}
    </div>
  </div>
</section>

<section class="section section-services" id="servicii">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Servicii</span>
        <h2 class="section-title">Servicii auto în Oradea</h2>
      </div>
      <p class="section-lead">Alege rapid serviciul potrivit pentru problema mașinii tale și vezi ce verificăm, când este recomandat și cum poți programa o vizită.</p>
    </div>
    <div class="services-grid">
      ${["diagnoza-auto-oradea", "mecanica-auto-oradea", "electrica-auto-oradea", "reglaj-directie-oradea", "incarcare-freon-oradea", "reparatii-clima-auto-oradea", "tinichigerie-vopsitorie-oradea"].map(serviceCard).join("")}
    </div>
  </div>
</section>

<section class="section section-dark fleet-section" id="flota-auto" style="--fleet-image:url('${cssAssetPath(imageUrls.fleet)}')">
  <div class="container fleet-grid">
    <div class="fleet-copy">
      <span class="section-kicker">Flotă auto</span>
      <h2 class="section-title">Service pentru flote auto și companii</h2>
      <p class="section-lead">Ținem mașinile companiei tale în lucru cât mai mult timp, cu programări organizate, constatări clare și intervenții prioritizate.</p>
      <div class="fleet-actions">
        <a class="btn btn-primary" href="${homeHref("#programare")}">Solicită o discuție</a>
        <a class="btn btn-ghost" href="tel:+40744532370">Sună pentru flotă</a>
      </div>
    </div>
    <div class="fleet-benefits">
      ${[
        ["Programări organizate", "Stabilim vizitele astfel încât vehiculele să stea cât mai puțin în service."],
        ["Reparații multimarcă", "Lucrăm pe autoturisme și utilitare ușoare, cu diagnostic și constatare atentă."],
        ["Priorități clare", "Știi ce lucrare este urgentă, ce poate aștepta și ce costuri trebuie anticipate."],
        ["Partener local în Oradea", "Ai aproape un service cu experiență pentru nevoile zilnice ale flotei."],
      ].map(([title, text]) => `<div class="fleet-benefit">${icon("check")}<div><strong>${title}</strong><span>${text}</span></div></div>`).join("")}
    </div>
  </div>
</section>

<section class="section workflow-section">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Procedură</span>
        <h2 class="section-title">Cum lucrăm noi</h2>
      </div>
      <p class="section-lead">De la primul telefon până la verificarea finală, știi ce se întâmplă cu mașina și ce decizii ai de luat.</p>
    </div>
    <div class="workflow-grid">
      ${[
        ["Programare și discuție", "Ne spui ce ai observat la mașină și alegem împreună momentul potrivit pentru vizită."],
        ["Constatare tehnică", "Verificăm atent simptomele și căutăm cauza, nu doar efectul vizibil."],
        ["Soluție clară înainte de lucrare", "Îți explicăm ce am găsit, ce recomandăm și ce presupune intervenția."],
        ["Lucrare și verificare finală", "Executăm lucrarea agreată, verificăm rezultatul și îți spunem ce merită urmărit în perioada următoare."],
      ].map(([title, text], index) => `<article class="workflow-card">
        <span class="workflow-number">${String(index + 1).padStart(2, "0")}</span>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>`).join("")}
    </div>
  </div>
</section>

<div class="home-lower-zone">
<section class="section why-proof-section">
  <div class="container why-proof-grid">
    <div class="why-proof-panel">
      <span class="section-kicker">De ce Motorpext</span>
      <h2 class="section-title">Un service auto local la care știi ce se întâmplă cu mașina ta</h2>
      <p class="section-lead">La Motorpext primești constatări tehnice, explicații clare și lucrări orientate către funcționarea corectă a mașinii, nu promisiuni vagi.</p>
      <div class="proof-meta">
        <span>Autorizat R.A.R.</span>
        <span>Din 1994</span>
        <span>Oradea</span>
      </div>
    </div>
    <div class="check-grid why-proof-cards">
      ${[
        ["Experiență din 1994", "Lucrăm de mulți ani cu probleme reale, pe mașini diferite."],
        ["Personal calificat", "O echipă atentă la constatare, execuție și verificarea finală."],
        ["Echipamente moderne", "Verificări tehnice pentru mașini actuale și sisteme complexe."],
        ["Costuri explicate", "Discutăm lucrarea înainte, ca să știi ce urmează."],
        ["Intervenții orientate corect", "Căutăm soluția potrivită pentru problemă, nu improvizații."],
        ["Comunicare fără presiune", "Primești explicații simple și timp să decizi informat."],
      ].map(([title, text]) => `<div class="check-item">${icon("check")}<div><strong>${title}</strong><span>${text}</span></div></div>`).join("")}
    </div>
  </div>
</section>

<section class="section-tight" id="programare">
  <div class="container">
    ${ctaBand("Ai nevoie de o verificare auto?", "Sună și spune-ne ce ai observat la mașină. Îți indicăm următorul pas și programăm vizita în service.", "Sună: 0744 532 370")}
  </div>
</section>

${contactSection()}
</div>`;
  return shell({
    title: "Service auto Oradea | SC MOTORPEXT SRL",
    description: "SC MOTORPEXT SRL este un service auto autorizat RAR în Oradea, cu experiență din 1994. Diagnoză auto, mecanică, electrică, reglaj direcție, climă și întreținere auto.",
    pathName: "/",
    body,
    jsonLd: localSchema,
  });
}

function serviceCard(slug) {
  const service = serviceMap[slug];
  return `<a class="service-card" href="${serviceHref(service.slug)}" style="--service-image:url('${cssAssetPath(service.image)}')">
    <span class="card-icon">${icon(service.icon)}</span>
    <h3>${service.navTitle}</h3>
    <p>${service.heroText}</p>
    <span class="card-link">Află mai multe</span>
  </a>`;
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

function contactSection(extraClass = "") {
  return `<section class="section section-white${extraClass ? ` ${extraClass}` : ""}" id="contact">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Contact</span>
        <h2 class="section-title">Programează o vizită la service</h2>
      </div>
      <p class="section-lead">Sună pentru disponibilitate, descrie problema mașinii și stabilim împreună când poți veni la atelierul Motorpext din Oradea.</p>
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

  const body = `<section class="hero service-hero" style="--hero-image: url('${cssAssetPath(service.image)}')">
  <div class="container">
    <div class="service-hero-content">
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
    </div>
  </div>
</section>

<div class="service-content-zone" style="--detail-image: url('${cssAssetPath(service.image)}')">
<section class="section section-white service-symptoms-section">
  <div class="container">
    <div class="centered">
      <span class="section-kicker">Simptome</span>
      <h2 class="section-title">${service.symptomsTitle}</h2>
      <p class="section-lead">Dacă recunoști unul dintre aceste semne, o verificare la timp te poate ajuta să eviți reparații mai costisitoare.</p>
    </div>
    <div class="symptom-grid" style="margin-top:42px">
      ${service.symptoms.map((item) => `<div class="symptom-card">${icon("check")}<strong>${item}</strong></div>`).join("")}
    </div>
  </div>
</section>

<section class="section service-explain-section">
  <div class="container explain-grid">
    <div>
      <span class="section-kicker">Explicație</span>
      <h2 class="section-title">${service.explanationTitle}</h2>
      <p class="section-lead">${service.explanationIntro}</p>
    </div>
    <div class="explain-panel">
      <ul class="explain-list">
        ${service.explanationBlocks.map(([title, text]) => `<li>${icon(service.icon)}<div><strong>${title}</strong><span>${text}</span></div></li>`).join("")}
      </ul>
    </div>
  </div>
</section>

${service.warning ? `<section class="section-tight section-white service-warning-section"><div class="container"><section class="warning-panel">${icon("alert")}<div><h2>${service.warning.title}</h2><p>${service.warning.text}</p></div></section></div></section>` : ""}

<section class="section section-white service-benefits-section">
  <div class="container">
    <div class="centered">
      <span class="section-kicker">Beneficii</span>
      <h2 class="section-title">${service.benefitTitle ?? "Beneficii"}</h2>
      <p class="section-lead">Scopul este să pleci cu mașina verificată, cu explicații clare și cu mai multă siguranță la volan.</p>
    </div>
    <div class="benefit-grid" style="margin-top:42px">
      ${service.benefits.map((item) => `<article class="info-card"><span class="card-icon">${icon("check")}</span><h3>${item}</h3><p>Verificăm, explicăm și intervenim doar acolo unde lucrarea are sens pentru mașina ta.</p></article>`).join("")}
    </div>
  </div>
</section>

<section class="section service-process-section">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Proces</span>
        <h2 class="section-title">Cum lucrăm</h2>
      </div>
      <p class="section-lead">Știi dinainte pașii principali, iar după constatare primești explicațiile de care ai nevoie ca să decizi.</p>
    </div>
    <div class="process-steps">
      ${service.process.map(([title, text]) => `<article class="process-step"><h3>${title}</h3><p>${text}</p></article>`).join("")}
    </div>
  </div>
</section>

<section class="section-tight service-cta-section">
  <div class="container">
    ${ctaBand(service.ctaQuestion, "Sună și spune-ne ce se întâmplă cu mașina. Îți recomandăm următorul pas și programăm o verificare.", "Sună: 0744 532 370")}
  </div>
</section>

<section class="section section-white service-related-section">
  <div class="container">
    <div class="section-heading-row">
      <div>
        <span class="section-kicker">Conexe</span>
        <h2 class="section-title">Servicii conexe</h2>
      </div>
      <p class="section-lead">Unele probleme au cauze legate între ele. Aceste servicii pot completa verificarea în aceeași vizită.</p>
    </div>
    <div class="related-grid">
      ${service.related.map(relatedCard).join("")}
    </div>
  </div>
</section>

<section class="section service-faq-section">
  <div class="container centered">
    <span class="section-kicker">FAQ</span>
    <h2 class="section-title">Întrebări frecvente despre ${service.navTitle.toLowerCase()}</h2>
    <div class="faq-list">
      ${service.faqs.map(([question, answer], index) => `<details class="faq-item" ${index === 0 ? "open" : ""}><summary>${question}</summary><p>${answer}</p></details>`).join("")}
    </div>
  </div>
</section>

${contactSection("service-contact-section")}
</div>`;

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
  return `<a class="related-card" href="${serviceHref(service.slug)}" style="--service-image:url('${cssAssetPath(service.image)}')">
    <span class="card-icon">${icon(service.icon)}</span>
    <h3>${service.navTitle}</h3>
    <p>${service.heroText}</p>
    <span class="card-link">Află mai multe</span>
  </a>`;
}

function privacyPage() {
  setPageContext("/politica-de-confidentialitate/");
  const body = `<section class="hero service-hero" style="--hero-image: url('${cssAssetPath(imageUrls.workshop)}')">
    <div class="container">
      <div class="service-hero-content">
        <span class="eyebrow">${business.name}</span>
        <h1>Politica de confidențialitate</h1>
        <p class="hero-copy">Informații generale despre protecția datelor pentru website-ul Motorpext.</p>
      </div>
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

const translationEntries = {
  hu: [
    ["Service auto Oradea | SC MOTORPEXT SRL", "Autószerviz Nagyváradon | SC MOTORPEXT SRL"],
    ["SC MOTORPEXT SRL este un service auto autorizat RAR în Oradea, cu experiență din 1994. Diagnoză auto, mecanică, electrică, reglaj direcție, climă și întreținere auto.", "Az SC MOTORPEXT SRL RAR engedéllyel rendelkező autószerviz Nagyváradon, 1994 óta működő tapasztalattal. Autódiagnosztika, mechanika, autóvillamosság, futóműállítás, klímaszerviz és autókarbantartás."],
    ["Sari la conținut", "Ugrás a tartalomhoz"],
    ["MOTORPEXT acasă", "MOTORPEXT főoldal"],
    ["Alege limba", "Nyelv kiválasztása"],
    ["Servicii principale Motorpext", "Motorpext fő szolgáltatások"],
    ["Alege serviciul afișat", "Válaszd ki a megjelenített szolgáltatást"],
    ["Afișează:", "Megjelenítés:"],
    ["Navigație principală", "Fő navigáció"],
    ["Deschide meniul", "Menü megnyitása"],
    ["Închide meniul", "Menü bezárása"],
    ["Service auto Oradea", "Autószerviz Nagyvárad"],
    ["Acasă", "Főoldal"],
    ["Servicii", "Szolgáltatások"],
    ["Despre noi", "Rólunk"],
    ["Flotă auto", "Céges flotta"],
    ["Programare", "Időpontfoglalás"],
    ["Contactează-ne", "Kapcsolatfelvétel"],
    ["Vezi serviciile", "Szolgáltatások megtekintése"],
    ["Programează-te", "Foglalj időpontot"],
    ["Sună acum", "Hívj most"],
    ["Sună: 0744 532 370", "Hívás: 0744 532 370"],
    ["Află mai multe", "Tudj meg többet"],
    ["Detalii", "Részletek"],
    ["Contact", "Kapcsolat"],
    ["Telefon", "Telefon"],
    ["Adresă", "Cím"],
    ["Program", "Nyitvatartás"],
    ["Luni - Vineri: 8:00 - 17:00", "Hétfő - Péntek: 8:00 - 17:00"],
    ["Hartă", "Térkép"],
    ["Motorpext pe Google Maps", "Motorpext a Google Térképen"],
    ["Politica de confidențialitate", "Adatvédelmi irányelvek"],
    ["Toate drepturile rezervate.", "Minden jog fenntartva."],
    ["Linkuri rapide", "Gyors linkek"],
    ["Service auto autorizat R.A.R. în Oradea, cu experiență din 1994 și servicii multimarcă pentru întreținere și reparații auto.", "RAR engedélyezett autószerviz Nagyváradon, 1994 óta működő tapasztalattal és többmárkás karbantartási, javítási szolgáltatásokkal."],
    ["Service auto autorizat R.A.R. în Oradea, cu experiență din 1994, servicii multimarcă și certificare Diesel Point.", "RAR engedélyezett autószerviz Nagyváradon, 1994 óta működő tapasztalattal, többmárkás szolgáltatásokkal és Diesel Point minősítéssel."],
    ["Service auto Oradea · Autorizat R.A.R. · Diesel Point", "Autószerviz Nagyvárad · R.A.R. engedély · Diesel Point"],
    ["Service auto profesionist în Oradea", "Professzionális autószerviz Nagyváradon"],
    ["Diagnoză computerizată, mecanică auto, electrică, reglaj direcție, reparații climă și întreținere completă pentru autoturismul tău.", "Számítógépes diagnosztika, autószerelés, autóvillamosság, futóműállítás, klímajavítás és teljes körű karbantartás az autód számára."],
    ["Autorizat R.A.R.", "R.A.R. engedéllyel"],
    ["Din 1994", "1994 óta"],
    ["Experiență din 1994", "Tapasztalat 1994 óta"],
    ["Service multimarcă", "Többmárkás szerviz"],
    ["Atelier auto modern cu mecanic lucrând profesionist la un autoturism", "Modern autóműhely, ahol szerelő dolgozik egy autón"],
    ["Atelier profesionist în Oradea", "Professzionális műhely Nagyváradon"],
    ["Service multimarcă pentru diagnoză, mecanică, electrică și întreținere.", "Többmárkás szerviz diagnosztikához, mechanikához, autóvillamossághoz és karbantartáshoz."],
    ["Servicii auto în Oradea", "Autószerviz szolgáltatások Nagyváradon"],
    ["Pagini dedicate pentru cele mai căutate servicii, create pentru clienți care vor claritate, seriozitate și programare rapidă.", "Külön oldalak a legkeresettebb szolgáltatásokhoz, azoknak, akik átláthatóságot, komolyságot és gyors időpontfoglalást keresnek."],
    ["Service pentru flote auto și companii", "Szerviz céges flottáknak és vállalatoknak"],
    ["Oferim întreținere și reparații pentru flote auto, astfel încât mașinile companiei tale să rămână disponibile, sigure și pregătite pentru lucru.", "Karbantartást és javítást vállalunk céges flották számára, hogy a vállalat autói elérhetők, biztonságosak és munkára készek maradjanak."],
    ["Solicită o discuție", "Kérj egyeztetést"],
    ["Sună pentru flotă", "Hívj flotta ügyben"],
    ["Programări organizate", "Szervezett időpontok"],
    ["Stabilim intervențiile astfel încât timpul de staționare al vehiculelor să fie cât mai redus.", "Úgy ütemezzük a beavatkozásokat, hogy a járművek állásideje minél rövidebb legyen."],
    ["Reparații multimarcă", "Többmárkás javítás"],
    ["Lucrăm pe autoturisme și utilitare ușoare, cu diagnostic și constatare tehnică atentă.", "Személyautókon és könnyű haszonjárműveken dolgozunk, alapos diagnosztikával és műszaki hibafeltárással."],
    ["Comunicare clară", "Világos kommunikáció"],
    ["Primești explicații, recomandări și prioritizare înainte de lucrările importante.", "Magyarázatot, javaslatot és prioritást kapsz a fontosabb munkák előtt."],
    ["Partener local în Oradea", "Helyi partner Nagyváradon"],
    ["Ai un service auto aproape, cu experiență și abordare serioasă pentru nevoile companiei.", "Közeli, tapasztalt és komoly szemléletű autószerviz áll rendelkezésre a céged igényeihez."],
    ["Procedură", "Folyamat"],
    ["Cum lucrăm noi", "Hogyan dolgozunk"],
    ["Un proces simplu și transparent, ca să știi ce se întâmplă cu mașina ta înainte, în timpul și după intervenție.", "Egyszerű és átlátható folyamat, hogy tudd, mi történik az autóddal a beavatkozás előtt, közben és után."],
    ["Programare și discuție", "Időpont és egyeztetés"],
    ["Ne spui ce simptome ai observat, ce lucrare te interesează și stabilim împreună momentul potrivit pentru vizită.", "Elmondod, milyen tüneteket vettél észre, milyen munkára van szükséged, és közösen egyeztetünk időpontot."],
    ["Constatare tehnică", "Műszaki hibafeltárás"],
    ["Verificăm mașina cu atenție, folosim echipamentele potrivite și identificăm cauza reală, nu doar efectul vizibil.", "Gondosan ellenőrizzük az autót, megfelelő eszközöket használunk, és a valódi okot keressük, nem csak a látható tünetet."],
    ["Soluție clară înainte de lucrare", "Világos megoldás munka előtt"],
    ["Îți explicăm ce am găsit, ce recomandăm și ce presupune intervenția, astfel încât să poți decide informat.", "Elmagyarázzuk, mit találtunk, mit javaslunk, és mivel jár a munka, hogy tájékozottan dönthess."],
    ["Lucrare și verificare finală", "Munka és végső ellenőrzés"],
    ["Executăm intervenția agreată, verificăm rezultatul și îți comunicăm recomandările utile pentru următoarea perioadă.", "Elvégezzük az egyeztetett munkát, ellenőrizzük az eredményt, és elmondjuk a hasznos további javaslatokat."],
    ["De ce Motorpext", "Miért a Motorpext"],
    ["Un service auto local construit pe seriozitate", "Helyi autószerviz, amely a komolyságra épül"],
    ["Pentru clienții care caută un service auto autorizat RAR în Oradea, Motorpext combină experiența cu o abordare clară și tehnică.", "Azoknak, akik RAR engedélyezett autószervizt keresnek Nagyváradon, a Motorpext tapasztalatot és tiszta, műszaki szemléletet kínál."],
    ["Personal calificat", "Képzett személyzet"],
    ["Echipamente moderne", "Modern felszerelés"],
    ["Prețuri transparente", "Átlátható árak"],
    ["Lucrări rapide și corecte", "Gyors és korrekt munkák"],
    ["Comunicare clară cu clientul", "Tiszta kommunikáció az ügyféllel"],
    ["Activitate îndelungată în service auto.", "Hosszú távú autószerviz tapasztalat."],
    ["Echipă atentă la constatare și execuție.", "Gondos csapat a hibafeltárásban és a kivitelezésben."],
    ["Verificări tehnice pentru sisteme actuale.", "Műszaki ellenőrzések modern rendszerekhez."],
    ["Comunicare clară înainte de lucrări.", "Tiszta tájékoztatás a munkák előtt."],
    ["Intervenții orientate către rezultat.", "Eredményre fókuszáló beavatkozások."],
    ["Explicații simple, fără presiune inutilă.", "Egyszerű magyarázatok felesleges nyomás nélkül."],
    ["Service auto cu experiență în Oradea", "Tapasztalt autószerviz Nagyváradon"],
    ["Motorpext oferă servicii de reparații și întreținere auto pentru clienți care caută seriozitate, comunicare clară și lucrări realizate corect.", "A Motorpext javítási és karbantartási szolgáltatásokat kínál azoknak, akik komolyságot, tiszta kommunikációt és korrekt munkát keresnek."],
    ["Service auto autorizat R.A.R.", "R.A.R. engedélyezett autószerviz"],
    ["Certificat Diesel Point", "Diesel Point minősítés"],
    ["Service auto multimarcă Oradea", "Többmárkás autószerviz Nagyvárad"],
    ["Specialist auto realizând diagnoză computerizată într-un atelier", "Autós szakember számítógépes diagnosztikát végez egy műhelyben"],
    ["Diagnoză și constatare", "Diagnosztika és hibafeltárás"],
    ["Începem cu verificarea corectă, apoi recomandăm intervenția potrivită.", "A pontos ellenőrzéssel kezdünk, majd a megfelelő beavatkozást javasoljuk."],
    ["Ai nevoie de o verificare auto?", "Szükséged van autóellenőrzésre?"],
    ["Sună acum sau programează o vizită la service.", "Hívj most, vagy foglalj időpontot a szervizbe."],
    ["Programează o vizită la service", "Foglalj időpontot a szervizbe"],
    ["Sună pentru disponibilitate, detalii despre lucrare sau o programare la atelierul Motorpext din Oradea.", "Hívj elérhetőségért, részletekért vagy időpontfoglalásért a nagyváradi Motorpext műhelybe."],
    ["Date de contact", "Elérhetőségek"],
    ["Google Maps embed", "Google Térkép"],
    ["Indicatori de încredere", "Bizalmi jelzések"],
    ["Service auto în Oradea", "Autószerviz Nagyváradon"],
    [" în Oradea", " Nagyváradon"],
    [" la SC MOTORPEXT SRL", " az SC MOTORPEXT SRL-nél"],
    ["Informații generale despre protecția datelor pentru website-ul Motorpext.", "Általános információk a Motorpext weboldal adatkezeléséről."],
    ["Confidențialitate", "Adatvédelem"],
    ["Acest website prezintă informații despre serviciile SC MOTORPEXT SRL și include date de contact pentru solicitări de programare. Pentru întrebări privind datele personale, ne poți contacta la numerele afișate pe site.", "Ez a weboldal az SC MOTORPEXT SRL szolgáltatásairól ad tájékoztatást, és elérhetőségeket tartalmaz időpontkéréshez. Személyes adatokkal kapcsolatos kérdés esetén a weboldalon feltüntetett telefonszámokon érhetsz el minket."],
    ["Când mașina are nevoie de atenție, primești verificări clare, explicații pe înțeles și lucrări făcute corect.", "Amikor az autód figyelmet igényel, érthető ellenőrzést, világos magyarázatot és korrekt munkát kapsz."],
    ["Alege rapid serviciul potrivit pentru problema mașinii tale și vezi ce verificăm, când este recomandat și cum poți programa o vizită.", "Válaszd ki gyorsan az autód problémájához illő szolgáltatást, nézd meg, mit ellenőrzünk, mikor ajánlott, és hogyan kérhetsz időpontot."],
    ["Ținem mașinile companiei tale în lucru cât mai mult timp, cu programări organizate, constatări clare și intervenții prioritizate.", "Segítünk, hogy céged autói minél többet legyenek használatban: szervezett időpontokkal, világos hibafeltárással és rangsorolt beavatkozásokkal."],
    ["Stabilim vizitele astfel încât vehiculele să stea cât mai puțin în service.", "Úgy egyeztetjük a látogatásokat, hogy a járművek minél kevesebbet álljanak a szervizben."],
    ["Lucrăm pe autoturisme și utilitare ușoare, cu diagnostic și constatare atentă.", "Személyautókon és könnyű haszonjárműveken dolgozunk, alapos diagnosztikával és hibafeltárással."],
    ["Priorități clare", "Világos prioritások"],
    ["Știi ce lucrare este urgentă, ce poate aștepta și ce costuri trebuie anticipate.", "Tudod, melyik munka sürgős, mi várhat, és milyen költségekkel érdemes számolni."],
    ["Ai aproape un service cu experiență pentru nevoile zilnice ale flotei.", "Közel van egy tapasztalt szerviz a flotta mindennapi igényeihez."],
    ["De la primul telefon până la verificarea finală, știi ce se întâmplă cu mașina și ce decizii ai de luat.", "Az első telefonhívástól a végső ellenőrzésig tudod, mi történik az autóval, és milyen döntéseket kell meghoznod."],
    ["Ne spui ce ai observat la mașină și alegem împreună momentul potrivit pentru vizită.", "Elmondod, mit vettél észre az autón, és együtt kiválasztjuk a megfelelő időpontot."],
    ["Verificăm atent simptomele și căutăm cauza, nu doar efectul vizibil.", "Gondosan ellenőrizzük a tüneteket, és az okot keressük, nem csak a látható hatást."],
    ["Îți explicăm ce am găsit, ce recomandăm și ce presupune intervenția.", "Elmagyarázzuk, mit találtunk, mit javaslunk, és mivel jár a beavatkozás."],
    ["Executăm lucrarea agreată, verificăm rezultatul și îți spunem ce merită urmărit în perioada următoare.", "Elvégezzük az egyeztetett munkát, ellenőrizzük az eredményt, és elmondjuk, mire érdemes figyelni a következő időszakban."],
    ["Un service auto local la care știi ce se întâmplă cu mașina ta", "Helyi autószerviz, ahol tudod, mi történik az autóddal"],
    ["La Motorpext primești constatări tehnice, explicații clare și lucrări orientate către funcționarea corectă a mașinii, nu promisiuni vagi.", "A Motorpextnél műszaki hibafeltárást, világos magyarázatot és az autó helyes működésére irányuló munkát kapsz, nem homályos ígéreteket."],
    ["Lucrăm de mulți ani cu probleme reale, pe mașini diferite.", "Sok éve dolgozunk valódi problémákon, különböző autókon."],
    ["O echipă atentă la constatare, execuție și verificarea finală.", "Csapat, amely figyel a hibafeltárásra, kivitelezésre és végső ellenőrzésre."],
    ["Verificări tehnice pentru mașini actuale și sisteme complexe.", "Műszaki ellenőrzések mai autókhoz és összetett rendszerekhez."],
    ["Costuri explicate", "Elmagyarázott költségek"],
    ["Discutăm lucrarea înainte, ca să știi ce urmează.", "Előre megbeszéljük a munkát, hogy tudd, mi következik."],
    ["Intervenții orientate corect", "Jól célzott beavatkozások"],
    ["Căutăm soluția potrivită pentru problemă, nu improvizații.", "A problémához illő megoldást keressük, nem rögtönzünk."],
    ["Comunicare fără presiune", "Kommunikáció nyomás nélkül"],
    ["Primești explicații simple și timp să decizi informat.", "Egyszerű magyarázatot és időt kapsz a tájékozott döntéshez."],
    ["Sună și spune-ne ce ai observat la mașină. Îți indicăm următorul pas și programăm vizita în service.", "Hívj, és mondd el, mit vettél észre az autón. Elmondjuk a következő lépést, és időpontot egyeztetünk a szervizbe."],
    ["Sună pentru disponibilitate, descrie problema mașinii și stabilim împreună când poți veni la atelierul Motorpext din Oradea.", "Hívj elérhetőségért, írd le az autó problémáját, és együtt egyeztetjük, mikor jöhetsz a nagyváradi Motorpext műhelybe."],
    ["Dacă recunoști unul dintre aceste semne, o verificare la timp te poate ajuta să eviți reparații mai costisitoare.", "Ha felismered valamelyik jelet, egy időben elvégzett ellenőrzés segíthet elkerülni a drágább javításokat."],
    ["Scopul este să pleci cu mașina verificată, cu explicații clare și cu mai multă siguranță la volan.", "A cél, hogy ellenőrzött autóval, világos magyarázatokkal és nagyobb biztonságérzettel indulj tovább."],
    ["Verificăm, explicăm și intervenim doar acolo unde lucrarea are sens pentru mașina ta.", "Ellenőrzünk, magyarázunk, és csak ott avatkozunk be, ahol a munka valóban indokolt az autódnál."],
    ["Știi dinainte pașii principali, iar după constatare primești explicațiile de care ai nevoie ca să decizi.", "Előre ismered a fő lépéseket, a hibafeltárás után pedig megkapod a döntéshez szükséges magyarázatokat."],
    ["Sună și spune-ne ce se întâmplă cu mașina. Îți recomandăm următorul pas și programăm o verificare.", "Hívj, és mondd el, mi történik az autóval. Javasoljuk a következő lépést, és időpontot egyeztetünk ellenőrzésre."],
    ["Unele probleme au cauze legate între ele. Aceste servicii pot completa verificarea în aceeași vizită.", "Egyes problémák összefüggő okokból erednek. Ezek a szolgáltatások ugyanazon látogatás során kiegészíthetik az ellenőrzést."],
    ["Reglaj direcție în Oradea pentru mașini care trag într-o parte, volan strâmb sau anvelope uzate neuniform. Verificare clară la Motorpext.", "Futóműállítás Nagyváradon félrehúzó autóhoz, ferde kormányhoz vagy egyenetlenül kopó abroncsokhoz. Világos ellenőrzés a Motorpextnél."],
    ["Mașina trage într-o parte sau volanul nu stă drept? Verificăm geometria roților și reglăm direcția pentru rulare stabilă.", "Az autó félrehúz, vagy nem áll egyenesen a kormány? Ellenőrizzük a kerékgeometriát, és beállítjuk a futóművet a stabil futásért."],
    ["Direcție care se simte corect", "Kormányzás, amely jónak érződik"],
    ["Verificăm valorile roților și corectăm abaterile care afectează stabilitatea.", "Ellenőrizzük a kerékértékeket, és korrigáljuk a stabilitást befolyásoló eltéréseket."],
    ["Când direcția nu este reglată corect, mașina devine obositoare de condus și poate uza anvelopele mai repede. Verificăm geometria, îți explicăm ce valori sunt în afara parametrilor și facem reglajul acolo unde este posibil.", "Ha a futómű nincs jól beállítva, az autó fárasztóbb vezetni, és gyorsabban koptathatja az abroncsokat. Ellenőrizzük a geometriát, elmagyarázzuk az eltéréseket, és ahol lehet, beállítjuk."],
    ["Măsurăm poziția roților și vedem exact ce poate provoca instabilitate sau uzură neuniformă.", "Megmérjük a kerekek helyzetét, és pontosan látjuk, mi okozhat instabilitást vagy egyenetlen kopást."],
    ["Corectăm unghiurile pentru o direcție mai precisă și o mașină mai ușor de controlat.", "Korrigáljuk a szögeket a pontosabb kormányzásért és könnyebben kontrollálható autóért."],
    ["Verificăm dacă există semne de probleme la direcție, suspensie sau anvelope.", "Megnézzük, van-e jele kormány-, futómű- vagy abroncsproblémának."],
    ["Recomandări după verificare", "Javaslatok ellenőrzés után"],
    ["Primești explicații simple despre ce am constatat și ce merită făcut mai departe.", "Egyszerű magyarázatot kapsz arról, mit találtunk, és mit érdemes tenni ezután."],
    ["Ne spui ce simți la volan și inspectăm elementele relevante.", "Elmondod, mit érzel a kormánynál, mi pedig ellenőrizzük a releváns részeket."],
    ["Verificăm valorile cu echipamente dedicate și le interpretăm pentru tine.", "Dedikált eszközökkel ellenőrizzük az értékeket, és érthetően elmagyarázzuk őket."],
    ["Aducem unghiurile în parametri, dacă starea mașinii permite reglajul.", "Paraméterre állítjuk a szögeket, ha az autó állapota ezt lehetővé teszi."],
    ["Confirmare și recomandări", "Ellenőrzés és javaslatok"],
    ["Verificăm rezultatul și îți spunem dacă sunt necesare alte intervenții.", "Ellenőrizzük az eredményt, és elmondjuk, szükséges-e további beavatkozás."],
    ["Încărcare freon în Oradea cu verificarea instalației de climă. Află dacă sistemul poate fi încărcat corect sau are pierderi.", "Klíma töltés Nagyváradon a klímarendszer ellenőrzésével. Kiderül, hogy a rendszer feltölthető-e helyesen, vagy szivárog."],
    ["Clima nu mai răcește bine? Verificăm instalația, presiunea și completăm freonul doar când sistemul permite o lucrare corectă.", "Nem hűt jól a klíma? Ellenőrizzük a rendszert és a nyomást, és csak akkor töltünk freont, ha a munka korrektül elvégezhető."],
    ["Răcire verificată înainte de drum", "Ellenőrzött hűtés indulás előtt"],
    ["Nu încărcăm la întâmplare: verificăm dacă sistemul poate funcționa corect.", "Nem töltünk találomra: ellenőrizzük, hogy a rendszer képes-e helyesen működni."],
    ["Dacă aerul nu mai este rece, cauza poate fi nivelul scăzut de agent frigorific, o pierdere sau o componentă defectă. De aceea începem cu verificarea instalației, apoi îți spunem clar dacă încărcarea este suficientă.", "Ha a levegő már nem hideg, oka lehet alacsony hűtőközegszint, szivárgás vagy hibás alkatrész. Ezért a rendszer ellenőrzésével kezdünk, majd elmondjuk, elég-e a feltöltés."],
    ["Analizăm cum lucrează instalația și dacă apar semne de pierderi sau blocaje.", "Megnézzük, hogyan dolgozik a rendszer, és van-e szivárgásra vagy elzáródásra utaló jel."],
    ["Controlăm presiunea pentru a vedea dacă sistemul poate fi încărcat în siguranță.", "Ellenőrizzük a nyomást, hogy biztonságosan tölthető-e a rendszer."],
    ["Completăm agentul frigorific atunci când verificările arată că lucrarea este justificată.", "A hűtőközeget akkor töltjük, ha az ellenőrzések alapján ez indokolt."],
    ["Testăm răcirea și răspunsul sistemului după încărcare.", "Feltöltés után teszteljük a hűtést és a rendszer reakcióját."],
    ["Îți spunem pe înțelesul tău dacă este nevoie de o reparație suplimentară.", "Érthetően elmondjuk, ha további javításra van szükség."],
    ["Dacă instalația pierde freon, o simplă reîncărcare poate ține puțin. Verificarea cauzei te ajută să eviți drumuri repetate la service.", "Ha a rendszer freont veszít, egy egyszerű újratöltés rövid ideig tarthat. Az ok ellenőrzése segít elkerülni az ismételt szervizlátogatást."],
    ["Ne spui ce ai observat, apoi verificăm funcționarea climei.", "Elmondod, mit vettél észre, majd ellenőrizzük a klíma működését."],
    ["Reîncărcăm doar când intervenția are sens tehnic.", "Csak akkor töltünk újra, ha a beavatkozás műszakilag indokolt."],
    ["Confirmăm răcirea și îți comunicăm eventualele recomandări.", "Ellenőrizzük a hűtést, és elmondjuk az esetleges javaslatokat."],
    ["Reparații climă auto în Oradea pentru răcire slabă, miros neplăcut, pierderi de freon sau compresor cu probleme. Verificare clară.", "Autóklíma javítás Nagyváradon gyenge hűtéshez, kellemetlen szaghoz, freonvesztéshez vagy kompresszorhibához. Világos ellenőrzés."],
    ["Dacă aerul nu mai răcește, apare miros neplăcut sau pierzi freon, verificăm cauza și reparăm sistemul de climatizare.", "Ha a levegő nem hűt, kellemetlen szag van, vagy freont veszít a rendszer, megkeressük az okot és javítjuk a klímát."],
    ["Climă reparată cu logică", "Átgondolt klímajavítás"],
    ["Căutăm cauza problemei, ca reparația să nu fie doar o soluție temporară.", "A probléma okát keressük, hogy a javítás ne csak ideiglenes megoldás legyen."],
    ["O climă auto defectă poate însemna pierderi, senzori, compresor, ventilatoare sau probleme electrice. Verificăm sistemul pas cu pas și îți explicăm varianta de reparație potrivită.", "Egy hibás autóklíma mögött lehet szivárgás, szenzor, kompresszor, ventilátor vagy elektromos probléma. Lépésről lépésre ellenőrizzük a rendszert, és elmagyarázzuk a megfelelő javítást."],
    ["Diagnoză auto în Oradea pentru martori aprinși, pornire dificilă, consum crescut sau pierdere de putere. Verificări și explicații clare.", "Autódiagnosztika Nagyváradon világító hibajelzéshez, nehéz indításhoz, magas fogyasztáshoz vagy teljesítményvesztéshez. Világos ellenőrzés és magyarázat."],
    ["Ai un martor aprins sau mașina se comportă ciudat? Facem diagnoză și verificări tehnice ca să afli cauza, nu doar codul de eroare.", "Világít egy hibajelzés, vagy furcsán viselkedik az autó? Diagnosztikát és műszaki ellenőrzést végzünk, hogy az okot tudd meg, ne csak a hibakódot."],
    ["Răspunsuri înainte de reparații", "Válaszok javítás előtt"],
    ["Corelăm datele din diagnoză cu simptomele reale ale mașinii.", "A diagnosztikai adatokat összevetjük az autó valódi tüneteivel."],
    ["Un cod de eroare este doar începutul. Îl verificăm împreună cu simptomele mașinii, ca să poți decide informat și să eviți schimbările de piese făcute din presupuneri.", "Egy hibakód csak a kezdet. Összevetjük az autó tüneteivel, hogy tájékozottan dönthess, és elkerüld a találgatásból történő alkatrészcserét."],
    ["Mecanică auto în Oradea pentru revizii, zgomote, vibrații, scurgeri sau reparații multimarcă. Service autorizat RAR.", "Autószerelés Nagyváradon szervizekhez, zajokhoz, vibrációhoz, szivárgáshoz vagy többmárkás javításhoz. RAR engedélyezett szerviz."],
    ["Zgomote, vibrații, scurgeri sau revizie amânată? Verificăm mașina și îți explicăm clar ce trebuie reparat.", "Zaj, vibráció, szivárgás vagy halogatott szerviz? Ellenőrizzük az autót, és világosan elmondjuk, mit kell javítani."],
    ["Reparații explicate pe înțeles", "Érthetően elmagyarázott javítások"],
    ["Știi ce se lucrează la mașină și de ce este necesară intervenția.", "Tudod, mit dolgozunk az autón, és miért szükséges a beavatkozás."],
    ["Începem cu simptomele pe care le simți la condus, verificăm componentele relevante și îți spunem ce este urgent, ce poate aștepta și ce lucrare rezolvă problema.", "A vezetés közben érzett tünetekkel kezdünk, ellenőrizzük a releváns alkatrészeket, és elmondjuk, mi sürgős, mi várhat, és milyen munka oldja meg a problémát."],
    ["Electrică auto în Oradea pentru martori aprinși, probleme de pornire, baterie, senzori, lumini sau accesorii care funcționează intermitent.", "Autóvillamosság Nagyváradon hibajelzésekhez, indítási gondokhoz, akkumulátorhoz, szenzorokhoz, lámpákhoz vagy időszakosan működő kiegészítőkhöz."],
    ["Probleme la pornire, senzori, baterie sau martori aprinși? Verificăm sistemele electrice și căutăm cauza reală.", "Indítási gond, szenzorhiba, akkumulátorprobléma vagy világító hibajelzés? Ellenőrizzük az elektromos rendszereket, és a valódi okot keressük."],
    ["Verificare electrică atentă", "Alapos villamossági ellenőrzés"],
    ["Testăm circuitul, simptomele și componentele înainte să recomandăm reparația.", "A javítás javaslata előtt teszteljük az áramkört, a tüneteket és az alkatrészeket."],
    ["Defecțiunile electrice pot avea cauze ascunse și simptome intermitente. Combinăm diagnoza cu testări tehnice pentru a evita intervențiile inutile.", "Az elektromos hibáknak rejtett okai és időszakos tünetei lehetnek. A diagnosztikát műszaki tesztekkel kombináljuk, hogy elkerüljük a felesleges beavatkozást."],
    ["Verificare injecție în Oradea pentru pornire greoaie, fum, consum crescut sau motor neregulat. Service certificat Diesel Point.", "Befecskendezés ellenőrzés Nagyváradon nehéz indításhoz, füsthöz, magas fogyasztáshoz vagy egyenetlen motorjáráshoz. Diesel Point minősítésű szerviz."],
    ["Motorul pornește greu, scoate fum sau tremură? Verificăm sistemul de injecție și îți spunem ce merită reparat.", "Nehezen indul, füstöl vagy ráz a motor? Ellenőrizzük a befecskendező rendszert, és elmondjuk, mit érdemes javítani."],
    ["Verificăm sistemul de injecție înainte să recomandăm reparația.", "A javítás javaslata előtt ellenőrizzük a befecskendező rendszert."],
    ["Problemele de injecție pot afecta pornirea, consumul, fumul și puterea motorului. Verificăm simptomele și componentele relevante înainte să recomandăm reparații.", "A befecskendezési problémák befolyásolhatják az indítást, fogyasztást, füstölést és motorteljesítményt. Javítás előtt ellenőrizzük a tüneteket és a releváns alkatrészeket."],
    ["Tinichigerie și vopsitorie auto în Oradea pentru lovituri, zgârieturi, elemente deformate și reparații de caroserie.", "Karosszéria és fényezés Nagyváradon horpadásokhoz, karcokhoz, deformált elemekhez és karosszériajavításhoz."],
    ["Lovituri, zgârieturi sau elemente de caroserie deformate? Evaluăm dauna și îți explicăm pașii pentru o reparație curată.", "Horpadás, karc vagy deformált karosszériaelem? Felmérjük a sérülést, és elmagyarázzuk a tiszta javítás lépéseit."],
    ["Caroserie cu aspect îngrijit", "Rendezett megjelenésű karosszéria"],
    ["Stabilim lucrarea potrivită pentru zona afectată și rezultatul dorit.", "Meghatározzuk az érintett részhez és a kívánt eredményhez illő munkát."],
    ["Fiecare daună are soluția ei: îndreptare, pregătire, vopsire locală sau înlocuire. Evaluăm zona afectată și îți explicăm ce variantă este potrivită pentru mașina ta.", "Minden sérülésnek megvan a megoldása: egyengetés, előkészítés, helyi fényezés vagy csere. Felmérjük az érintett részt, és elmagyarázzuk, mi illik az autódhoz."],
    ["Service anvelope în Oradea pentru schimb sezonier, uzură neuniformă, vibrații, presiune scăzută și verificări ale roților.", "Gumiszerviz Nagyváradon szezonális cseréhez, egyenetlen kopáshoz, vibrációhoz, csökkenő nyomáshoz és kerékellenőrzéshez."],
    ["Ai vibrații, presiune care scade sau anvelope uzate neuniform? Verificăm roțile ca mașina să ruleze sigur și stabil.", "Vibrációt érzel, csökken a nyomás, vagy egyenetlenül kopnak az abroncsok? Ellenőrizzük a kerekeket a biztonságos és stabil futásért."],
    ["Roți verificate pentru siguranță", "Biztonságra ellenőrzött kerekek"],
    ["Anvelopele în stare bună ajută frânarea, stabilitatea și confortul.", "A jó állapotú abroncsok segítik a fékezést, stabilitást és kényelmet."],
    ["Anvelopele influențează direct frânarea, stabilitatea și consumul. Verificăm starea roților și îți recomandăm lucrările necesare pentru rulare sigură.", "Az abroncsok közvetlenül befolyásolják a fékezést, stabilitást és fogyasztást. Ellenőrizzük a kerekek állapotát, és javasoljuk a biztonságos futáshoz szükséges munkát."],
    ["Verificări și reparații pentru frâne și suspensie în Oradea. Zgomote, vibrații, instabilitate sau distanță de frânare crescută.", "Fék és futómű ellenőrzés, javítás Nagyváradon. Zajok, vibráció, instabilitás vagy megnövekedett féktáv esetén."],
    ["Auzi zgomote la frânare, simți vibrații sau mașina este instabilă? Verificăm frânele și suspensia pentru siguranța ta.", "Zajt hallasz fékezéskor, vibrációt érzel, vagy instabil az autó? Ellenőrizzük a féket és futóművet a biztonságodért."],
    ["Siguranță la fiecare frânare", "Biztonság minden fékezésnél"],
    ["Frânele și suspensia se verifică atent, fără improvizații.", "A féket és futóművet alaposan, rögtönzés nélkül ellenőrizzük."],
    ["Frânele și suspensia schimbă felul în care mașina oprește, virează și reacționează la denivelări. Inspectăm componentele importante și îți spunem ce trebuie rezolvat.", "A fék és futómű meghatározza, hogyan áll meg, kanyarodik és reagál az autó az úthibákra. Ellenőrizzük a fontos alkatrészeket, és elmondjuk, mit kell megoldani."],
    ["Verificăm simptomele pe care le observi și componentele relevante pentru", "Ellenőrizzük az általad észlelt tüneteket és a releváns alkatrészeket ehhez:"],
    ["Căutăm cauza reală înainte să recomandăm înlocuiri sau lucrări mai costisitoare.", "A valódi okot keressük, mielőtt cserét vagy költségesebb munkát javasolnánk."],
    ["Executăm lucrarea agreată cu atenție la siguranță, funcționare și rezultat.", "Az egyeztetett munkát a biztonságra, működésre és eredményre figyelve végezzük."],
    ["Primești explicații simple, fără presiune, ca să știi ce decizie iei.", "Egyszerű magyarázatot kapsz nyomás nélkül, hogy tudd, milyen döntést hozol."],
    ["Începem cu ce ai observat la mașină și o verificare pentru", "Azzal kezdünk, amit az autón észrevettél, majd ellenőrzést végzünk ehhez:"],
    ["Identificăm sistemele care necesită atenție și îți explicăm prioritatea lor.", "Azonosítjuk a figyelmet igénylő rendszereket, és elmagyarázzuk a prioritásukat."],
    ["Realizăm intervenția agreată după ce știi ce presupune și de ce este necesară.", "Az egyeztetett beavatkozást azután végezzük el, hogy tudod, mit jelent és miért szükséges."],
    ["Verificăm rezultatul și îți spunem ce recomandări sunt utile pe mai departe.", "Ellenőrizzük az eredményt, és elmondjuk, milyen javaslatok hasznosak később."],
    ["Este recomandat când observi simptome neobișnuite, când mașina nu mai funcționează normal sau când vrei să previi o problemă mai scumpă.", "Akkor ajánlott, ha szokatlan tüneteket észlelsz, az autó nem működik normálisan, vagy meg szeretnél előzni egy drágább problémát."],
    ["Durata depinde de starea mașinii și de complexitatea lucrării. După verificare îți comunicăm o estimare realistă.", "Az idő az autó állapotától és a munka összetettségétől függ. Ellenőrzés után reális becslést adunk."],
    ["Da. Îți explicăm ce am găsit, ce recomandăm și ce opțiuni ai înainte să înceapă lucrarea.", "Igen. Elmagyarázzuk, mit találtunk, mit javaslunk, és milyen lehetőségeid vannak a munka megkezdése előtt."],
    ["Clima nu mai răcește eficient", "A klíma nem hűt hatékonyan"],
    ["Aerul are miros neplăcut", "Kellemetlen szagú a levegő"],
    ["Sistemul pornește greu", "A rendszer nehezen indul"],
    ["Se aud zgomote neobișnuite", "Szokatlan zajok hallhatók"],
    ["Geamurile se aburesc rapid", "Az ablakok gyorsan párásodnak"],
    ["Nu ai verificat instalația de mult timp", "Rég nem ellenőriztetted a rendszert"],
    ["Ai nevoie de încărcare freon în Oradea?", "Klíma töltésre van szükséged Nagyváradon?"],
    ["Ai nevoie de diagnoză auto în Oradea?", "Autódiagnosztikára van szükséged Nagyváradon?"],
    ["reglaj direcție", "futóműállítás"],
    ["încărcare freon", "klíma töltés"],
    ["diagnoză auto", "autódiagnosztika"],
    ["mecanică auto", "autószerelés"],
    ["electrică auto", "autóvillamosság"],
    ["reparații climă", "klímajavítás"],
    ["verificare injecție", "befecskendezés ellenőrzés"],
    ["tinichigerie și vopsitorie", "karosszéria és fényezés"],
    ["service anvelope", "gumiszerviz"],
    ["frâne și suspensie", "fék és futómű"],
    ["Servicii conexe", "Kapcsolódó szolgáltatások"],
  ],
  en: [
    ["Service auto Oradea | SC MOTORPEXT SRL", "Auto Repair Service in Oradea | SC MOTORPEXT SRL"],
    ["SC MOTORPEXT SRL este un service auto autorizat RAR în Oradea, cu experiență din 1994. Diagnoză auto, mecanică, electrică, reglaj direcție, climă și întreținere auto.", "SC MOTORPEXT SRL is a RAR-authorized auto repair workshop in Oradea, active since 1994. Auto diagnostics, mechanical repairs, electrical repairs, wheel alignment, air conditioning service and vehicle maintenance."],
    ["Sari la conținut", "Skip to content"],
    ["MOTORPEXT acasă", "MOTORPEXT home"],
    ["Alege limba", "Choose language"],
    ["Servicii principale Motorpext", "Motorpext main services"],
    ["Alege serviciul afișat", "Choose displayed service"],
    ["Afișează:", "Show:"],
    ["Navigație principală", "Main navigation"],
    ["Deschide meniul", "Open menu"],
    ["Închide meniul", "Close menu"],
    ["Service auto Oradea", "Auto repair Oradea"],
    ["Acasă", "Home"],
    ["Servicii", "Services"],
    ["Despre noi", "About us"],
    ["Flotă auto", "Fleet Service"],
    ["Programare", "Appointment"],
    ["Contactează-ne", "Contact us"],
    ["Vezi serviciile", "View services"],
    ["Programează-te", "Book now"],
    ["Sună acum", "Call now"],
    ["Sună: 0744 532 370", "Call: 0744 532 370"],
    ["Află mai multe", "Learn more"],
    ["Detalii", "Details"],
    ["Contact", "Contact"],
    ["Telefon", "Phone"],
    ["Adresă", "Address"],
    ["Program", "Hours"],
    ["Luni - Vineri: 8:00 - 17:00", "Monday - Friday: 8:00 - 17:00"],
    ["Hartă", "Map"],
    ["Motorpext pe Google Maps", "Motorpext on Google Maps"],
    ["Politica de confidențialitate", "Privacy policy"],
    ["Toate drepturile rezervate.", "All rights reserved."],
    ["Linkuri rapide", "Quick links"],
    ["Service auto autorizat R.A.R. în Oradea, cu experiență din 1994 și servicii multimarcă pentru întreținere și reparații auto.", "RAR-authorized auto repair workshop in Oradea, active since 1994, offering multi-brand maintenance and repair services."],
    ["Service auto autorizat R.A.R. în Oradea, cu experiență din 1994, servicii multimarcă și certificare Diesel Point.", "RAR-authorized auto repair workshop in Oradea, active since 1994, with multi-brand services and Diesel Point certification."],
    ["Service auto Oradea · Autorizat R.A.R. · Diesel Point", "Auto repair Oradea · R.A.R. authorized · Diesel Point"],
    ["Service auto profesionist în Oradea", "Professional Auto Repair Service in Oradea"],
    ["Diagnoză computerizată, mecanică auto, electrică, reglaj direcție, reparații climă și întreținere completă pentru autoturismul tău.", "Computer diagnostics, mechanical repairs, electrical repairs, wheel alignment, AC repairs and complete maintenance for your car."],
    ["Autorizat R.A.R.", "R.A.R. authorized"],
    ["Din 1994", "Since 1994"],
    ["Experiență din 1994", "Experience since 1994"],
    ["Service multimarcă", "Multi-brand service"],
    ["Atelier auto modern cu mecanic lucrând profesionist la un autoturism", "Modern auto workshop with a mechanic working professionally on a car"],
    ["Atelier profesionist în Oradea", "Professional workshop in Oradea"],
    ["Service multimarcă pentru diagnoză, mecanică, electrică și întreținere.", "Multi-brand service for diagnostics, mechanics, electrical repairs and maintenance."],
    ["Servicii auto în Oradea", "Auto Repair Services in Oradea"],
    ["Pagini dedicate pentru cele mai căutate servicii, create pentru clienți care vor claritate, seriozitate și programare rapidă.", "Dedicated pages for the most requested services, built for customers who want clarity, reliability and quick booking."],
    ["Service pentru flote auto și companii", "Auto Service for Company Fleets"],
    ["Oferim întreținere și reparații pentru flote auto, astfel încât mașinile companiei tale să rămână disponibile, sigure și pregătite pentru lucru.", "We provide maintenance and repairs for company fleets, helping your vehicles stay available, safe and ready for work."],
    ["Solicită o discuție", "Request a discussion"],
    ["Sună pentru flotă", "Call for fleet service"],
    ["Programări organizate", "Organized scheduling"],
    ["Stabilim intervențiile astfel încât timpul de staționare al vehiculelor să fie cât mai redus.", "We schedule interventions to keep vehicle downtime as low as possible."],
    ["Reparații multimarcă", "Multi-brand repairs"],
    ["Lucrăm pe autoturisme și utilitare ușoare, cu diagnostic și constatare tehnică atentă.", "We service passenger cars and light commercial vehicles with careful diagnostics and technical inspection."],
    ["Comunicare clară", "Clear communication"],
    ["Primești explicații, recomandări și prioritizare înainte de lucrările importante.", "You receive explanations, recommendations and prioritization before important work begins."],
    ["Partener local în Oradea", "Local partner in Oradea"],
    ["Ai un service auto aproape, cu experiență și abordare serioasă pentru nevoile companiei.", "You have a nearby auto service partner with experience and a serious approach to your company’s needs."],
    ["Procedură", "Procedure"],
    ["Cum lucrăm noi", "How We Work"],
    ["Un proces simplu și transparent, ca să știi ce se întâmplă cu mașina ta înainte, în timpul și după intervenție.", "A simple, transparent process so you know what happens with your car before, during and after the service."],
    ["Programare și discuție", "Booking and discussion"],
    ["Ne spui ce simptome ai observat, ce lucrare te interesează și stabilim împreună momentul potrivit pentru vizită.", "You tell us what symptoms you noticed, what service you need, and we agree on the right time for your visit."],
    ["Constatare tehnică", "Technical inspection"],
    ["Verificăm mașina cu atenție, folosim echipamentele potrivite și identificăm cauza reală, nu doar efectul vizibil.", "We carefully check the car, use the right equipment and identify the real cause, not just the visible effect."],
    ["Soluție clară înainte de lucrare", "Clear solution before work"],
    ["Îți explicăm ce am găsit, ce recomandăm și ce presupune intervenția, astfel încât să poți decide informat.", "We explain what we found, what we recommend and what the repair involves, so you can decide with confidence."],
    ["Lucrare și verificare finală", "Repair and final check"],
    ["Executăm intervenția agreată, verificăm rezultatul și îți comunicăm recomandările utile pentru următoarea perioadă.", "We carry out the agreed work, check the result and share useful recommendations for the next period."],
    ["De ce Motorpext", "Why Motorpext"],
    ["Un service auto local construit pe seriozitate", "A local auto workshop built on reliability"],
    ["Pentru clienții care caută un service auto autorizat RAR în Oradea, Motorpext combină experiența cu o abordare clară și tehnică.", "For customers looking for a RAR-authorized auto service in Oradea, Motorpext combines experience with a clear technical approach."],
    ["Personal calificat", "Qualified staff"],
    ["Echipamente moderne", "Modern equipment"],
    ["Prețuri transparente", "Transparent pricing"],
    ["Lucrări rapide și corecte", "Fast and correct work"],
    ["Comunicare clară cu clientul", "Clear customer communication"],
    ["Activitate îndelungată în service auto.", "Long-standing activity in auto repair."],
    ["Echipă atentă la constatare și execuție.", "A team focused on inspection and execution."],
    ["Verificări tehnice pentru sisteme actuale.", "Technical checks for modern vehicle systems."],
    ["Comunicare clară înainte de lucrări.", "Clear communication before work begins."],
    ["Intervenții orientate către rezultat.", "Result-focused service work."],
    ["Explicații simple, fără presiune inutilă.", "Simple explanations without unnecessary pressure."],
    ["Service auto cu experiență în Oradea", "Experienced Auto Repair Workshop in Oradea"],
    ["Motorpext oferă servicii de reparații și întreținere auto pentru clienți care caută seriozitate, comunicare clară și lucrări realizate corect.", "Motorpext provides auto repair and maintenance services for customers who value reliability, clear communication and properly completed work."],
    ["Service auto autorizat R.A.R.", "R.A.R. authorized auto repair"],
    ["Certificat Diesel Point", "Diesel Point certified"],
    ["Service auto multimarcă Oradea", "Multi-brand auto service Oradea"],
    ["Specialist auto realizând diagnoză computerizată într-un atelier", "Auto specialist performing computer diagnostics in a workshop"],
    ["Diagnoză și constatare", "Diagnostics and inspection"],
    ["Începem cu verificarea corectă, apoi recomandăm intervenția potrivită.", "We start with the right inspection, then recommend the proper service."],
    ["Ai nevoie de o verificare auto?", "Need a vehicle check?"],
    ["Sună acum sau programează o vizită la service.", "Call now or book a visit to the workshop."],
    ["Programează o vizită la service", "Book a workshop visit"],
    ["Sună pentru disponibilitate, detalii despre lucrare sau o programare la atelierul Motorpext din Oradea.", "Call for availability, work details or an appointment at the Motorpext workshop in Oradea."],
    ["Date de contact", "Contact details"],
    ["Google Maps embed", "Google Maps"],
    ["Indicatori de încredere", "Trust indicators"],
    ["Service auto în Oradea", "Auto repair service in Oradea"],
    [" în Oradea", " in Oradea"],
    [" la SC MOTORPEXT SRL", " at SC MOTORPEXT SRL"],
    ["Informații generale despre protecția datelor pentru website-ul Motorpext.", "General information about data protection for the Motorpext website."],
    ["Confidențialitate", "Privacy"],
    ["Acest website prezintă informații despre serviciile SC MOTORPEXT SRL și include date de contact pentru solicitări de programare. Pentru întrebări privind datele personale, ne poți contacta la numerele afișate pe site.", "This website presents information about SC MOTORPEXT SRL services and includes contact details for appointment requests. For questions about personal data, you can contact us using the phone numbers shown on the website."],
    ["Când mașina are nevoie de atenție, primești verificări clare, explicații pe înțeles și lucrări făcute corect.", "When your car needs attention, you get clear checks, understandable explanations and properly completed work."],
    ["Alege rapid serviciul potrivit pentru problema mașinii tale și vezi ce verificăm, când este recomandat și cum poți programa o vizită.", "Quickly choose the right service for your car's issue and see what we check, when it is recommended and how to book a visit."],
    ["Ținem mașinile companiei tale în lucru cât mai mult timp, cu programări organizate, constatări clare și intervenții prioritizate.", "We help keep your company vehicles working longer, with organized scheduling, clear inspections and prioritized service work."],
    ["Stabilim vizitele astfel încât vehiculele să stea cât mai puțin în service.", "We plan visits so vehicles spend as little time as possible in the workshop."],
    ["Lucrăm pe autoturisme și utilitare ușoare, cu diagnostic și constatare atentă.", "We work on passenger cars and light commercial vehicles with careful diagnostics and inspection."],
    ["Priorități clare", "Clear priorities"],
    ["Știi ce lucrare este urgentă, ce poate aștepta și ce costuri trebuie anticipate.", "You know what work is urgent, what can wait and what costs to anticipate."],
    ["Ai aproape un service cu experiență pentru nevoile zilnice ale flotei.", "You have an experienced local workshop nearby for daily fleet needs."],
    ["De la primul telefon până la verificarea finală, știi ce se întâmplă cu mașina și ce decizii ai de luat.", "From the first call to the final check, you know what happens with the car and what decisions you need to make."],
    ["Ne spui ce ai observat la mașină și alegem împreună momentul potrivit pentru vizită.", "You tell us what you noticed about the car, and we choose the right time for your visit together."],
    ["Verificăm atent simptomele și căutăm cauza, nu doar efectul vizibil.", "We carefully check the symptoms and look for the cause, not just the visible effect."],
    ["Îți explicăm ce am găsit, ce recomandăm și ce presupune intervenția.", "We explain what we found, what we recommend and what the service involves."],
    ["Executăm lucrarea agreată, verificăm rezultatul și îți spunem ce merită urmărit în perioada următoare.", "We complete the agreed work, check the result and tell you what to watch over the next period."],
    ["Un service auto local la care știi ce se întâmplă cu mașina ta", "A local auto workshop where you know what happens with your car"],
    ["La Motorpext primești constatări tehnice, explicații clare și lucrări orientate către funcționarea corectă a mașinii, nu promisiuni vagi.", "At Motorpext you get technical inspections, clear explanations and work focused on correct vehicle operation, not vague promises."],
    ["Lucrăm de mulți ani cu probleme reale, pe mașini diferite.", "We have worked for many years with real issues on different cars."],
    ["O echipă atentă la constatare, execuție și verificarea finală.", "A team focused on inspection, execution and the final check."],
    ["Verificări tehnice pentru mașini actuale și sisteme complexe.", "Technical checks for modern cars and complex systems."],
    ["Costuri explicate", "Explained costs"],
    ["Discutăm lucrarea înainte, ca să știi ce urmează.", "We discuss the work first, so you know what comes next."],
    ["Intervenții orientate corect", "Correctly focused service work"],
    ["Căutăm soluția potrivită pentru problemă, nu improvizații.", "We look for the right solution for the issue, not improvisations."],
    ["Comunicare fără presiune", "No-pressure communication"],
    ["Primești explicații simple și timp să decizi informat.", "You get simple explanations and time to make an informed decision."],
    ["Sună și spune-ne ce ai observat la mașină. Îți indicăm următorul pas și programăm vizita în service.", "Call and tell us what you noticed about the car. We guide you to the next step and book the workshop visit."],
    ["Sună pentru disponibilitate, descrie problema mașinii și stabilim împreună când poți veni la atelierul Motorpext din Oradea.", "Call for availability, describe the car's issue and we will agree when you can come to the Motorpext workshop in Oradea."],
    ["Dacă recunoști unul dintre aceste semne, o verificare la timp te poate ajuta să eviți reparații mai costisitoare.", "If you recognize any of these signs, a timely check can help you avoid more expensive repairs."],
    ["Scopul este să pleci cu mașina verificată, cu explicații clare și cu mai multă siguranță la volan.", "The goal is to leave with the car checked, clear explanations and more confidence behind the wheel."],
    ["Verificăm, explicăm și intervenim doar acolo unde lucrarea are sens pentru mașina ta.", "We check, explain and intervene only where the work makes sense for your car."],
    ["Știi dinainte pașii principali, iar după constatare primești explicațiile de care ai nevoie ca să decizi.", "You know the main steps in advance, and after inspection you get the explanations you need to decide."],
    ["Sună și spune-ne ce se întâmplă cu mașina. Îți recomandăm următorul pas și programăm o verificare.", "Call and tell us what is happening with the car. We recommend the next step and schedule a check."],
    ["Unele probleme au cauze legate între ele. Aceste servicii pot completa verificarea în aceeași vizită.", "Some issues have connected causes. These services can complete the check during the same visit."],
    ["Reglaj direcție în Oradea pentru mașini care trag într-o parte, volan strâmb sau anvelope uzate neuniform. Verificare clară la Motorpext.", "Wheel alignment in Oradea for cars pulling to one side, crooked steering wheels or uneven tire wear. Clear check at Motorpext."],
    ["Mașina trage într-o parte sau volanul nu stă drept? Verificăm geometria roților și reglăm direcția pentru rulare stabilă.", "Does the car pull to one side or is the steering wheel not straight? We check wheel geometry and align the steering for stable driving."],
    ["Direcție care se simte corect", "Steering that feels right"],
    ["Verificăm valorile roților și corectăm abaterile care afectează stabilitatea.", "We check wheel values and correct deviations that affect stability."],
    ["Când direcția nu este reglată corect, mașina devine obositoare de condus și poate uza anvelopele mai repede. Verificăm geometria, îți explicăm ce valori sunt în afara parametrilor și facem reglajul acolo unde este posibil.", "When steering is not aligned correctly, the car becomes tiring to drive and can wear tires faster. We check geometry, explain which values are outside parameters and adjust where possible."],
    ["Măsurăm poziția roților și vedem exact ce poate provoca instabilitate sau uzură neuniformă.", "We measure wheel position and see exactly what may cause instability or uneven wear."],
    ["Corectăm unghiurile pentru o direcție mai precisă și o mașină mai ușor de controlat.", "We correct angles for more precise steering and a car that is easier to control."],
    ["Verificăm dacă există semne de probleme la direcție, suspensie sau anvelope.", "We check for signs of steering, suspension or tire issues."],
    ["Recomandări după verificare", "Recommendations after the check"],
    ["Primești explicații simple despre ce am constatat și ce merită făcut mai departe.", "You receive simple explanations about what we found and what is worth doing next."],
    ["Ne spui ce simți la volan și inspectăm elementele relevante.", "You tell us what you feel at the wheel, and we inspect the relevant elements."],
    ["Verificăm valorile cu echipamente dedicate și le interpretăm pentru tine.", "We check the values with dedicated equipment and interpret them for you."],
    ["Aducem unghiurile în parametri, dacă starea mașinii permite reglajul.", "We bring the angles into parameters if the vehicle condition allows adjustment."],
    ["Confirmare și recomandări", "Confirmation and recommendations"],
    ["Verificăm rezultatul și îți spunem dacă sunt necesare alte intervenții.", "We check the result and tell you if any other work is needed."],
    ["Încărcare freon în Oradea cu verificarea instalației de climă. Află dacă sistemul poate fi încărcat corect sau are pierderi.", "Freon refill in Oradea with AC system checking. Find out if the system can be refilled correctly or has leaks."],
    ["Clima nu mai răcește bine? Verificăm instalația, presiunea și completăm freonul doar când sistemul permite o lucrare corectă.", "Is the AC no longer cooling well? We check the system and pressure, and add freon only when the system allows proper work."],
    ["Răcire verificată înainte de drum", "Cooling checked before the road"],
    ["Nu încărcăm la întâmplare: verificăm dacă sistemul poate funcționa corect.", "We do not refill blindly: we check whether the system can work correctly."],
    ["Dacă aerul nu mai este rece, cauza poate fi nivelul scăzut de agent frigorific, o pierdere sau o componentă defectă. De aceea începem cu verificarea instalației, apoi îți spunem clar dacă încărcarea este suficientă.", "If the air is no longer cold, the cause may be low refrigerant, a leak or a faulty component. That is why we start by checking the system, then clearly tell you if refilling is enough."],
    ["Analizăm cum lucrează instalația și dacă apar semne de pierderi sau blocaje.", "We analyze how the system works and whether there are signs of leaks or blockages."],
    ["Controlăm presiunea pentru a vedea dacă sistemul poate fi încărcat în siguranță.", "We check pressure to see whether the system can be refilled safely."],
    ["Completăm agentul frigorific atunci când verificările arată că lucrarea este justificată.", "We add refrigerant when the checks show the work is justified."],
    ["Testăm răcirea și răspunsul sistemului după încărcare.", "We test cooling and system response after refilling."],
    ["Îți spunem pe înțelesul tău dacă este nevoie de o reparație suplimentară.", "We explain clearly if an additional repair is needed."],
    ["Dacă instalația pierde freon, o simplă reîncărcare poate ține puțin. Verificarea cauzei te ajută să eviți drumuri repetate la service.", "If the system loses freon, a simple refill may not last. Checking the cause helps you avoid repeated workshop visits."],
    ["Ne spui ce ai observat, apoi verificăm funcționarea climei.", "You tell us what you noticed, then we check AC operation."],
    ["Reîncărcăm doar când intervenția are sens tehnic.", "We refill only when the intervention makes technical sense."],
    ["Confirmăm răcirea și îți comunicăm eventualele recomandări.", "We confirm cooling and share any recommendations."],
    ["Reparații climă auto în Oradea pentru răcire slabă, miros neplăcut, pierderi de freon sau compresor cu probleme. Verificare clară.", "Car AC repair in Oradea for weak cooling, unpleasant smells, freon loss or compressor issues. Clear check."],
    ["Dacă aerul nu mai răcește, apare miros neplăcut sau pierzi freon, verificăm cauza și reparăm sistemul de climatizare.", "If the air no longer cools, there is an unpleasant smell or freon loss, we check the cause and repair the AC system."],
    ["Climă reparată cu logică", "AC repaired with a clear logic"],
    ["Căutăm cauza problemei, ca reparația să nu fie doar o soluție temporară.", "We look for the cause of the issue so the repair is not just temporary."],
    ["O climă auto defectă poate însemna pierderi, senzori, compresor, ventilatoare sau probleme electrice. Verificăm sistemul pas cu pas și îți explicăm varianta de reparație potrivită.", "Faulty car AC can mean leaks, sensors, compressor, fans or electrical issues. We check the system step by step and explain the right repair option."],
    ["Diagnoză auto în Oradea pentru martori aprinși, pornire dificilă, consum crescut sau pierdere de putere. Verificări și explicații clare.", "Auto diagnostics in Oradea for warning lights, difficult starting, increased consumption or loss of power. Clear checks and explanations."],
    ["Ai un martor aprins sau mașina se comportă ciudat? Facem diagnoză și verificări tehnice ca să afli cauza, nu doar codul de eroare.", "Do you have a warning light or does the car behave strangely? We do diagnostics and technical checks so you learn the cause, not just the error code."],
    ["Răspunsuri înainte de reparații", "Answers before repairs"],
    ["Corelăm datele din diagnoză cu simptomele reale ale mașinii.", "We connect diagnostic data with the car's real symptoms."],
    ["Un cod de eroare este doar începutul. Îl verificăm împreună cu simptomele mașinii, ca să poți decide informat și să eviți schimbările de piese făcute din presupuneri.", "An error code is only the beginning. We check it together with the car's symptoms so you can decide with confidence and avoid parts changes based on guesswork."],
    ["Mecanică auto în Oradea pentru revizii, zgomote, vibrații, scurgeri sau reparații multimarcă. Service autorizat RAR.", "Auto mechanics in Oradea for servicing, noises, vibrations, leaks or multi-brand repairs. RAR-authorized workshop."],
    ["Zgomote, vibrații, scurgeri sau revizie amânată? Verificăm mașina și îți explicăm clar ce trebuie reparat.", "Noises, vibrations, leaks or overdue service? We check the car and clearly explain what needs repair."],
    ["Reparații explicate pe înțeles", "Repairs explained clearly"],
    ["Știi ce se lucrează la mașină și de ce este necesară intervenția.", "You know what is being done on the car and why the work is needed."],
    ["Începem cu simptomele pe care le simți la condus, verificăm componentele relevante și îți spunem ce este urgent, ce poate aștepta și ce lucrare rezolvă problema.", "We start with the symptoms you feel while driving, check relevant components and tell you what is urgent, what can wait and what work solves the issue."],
    ["Electrică auto în Oradea pentru martori aprinși, probleme de pornire, baterie, senzori, lumini sau accesorii care funcționează intermitent.", "Auto electrical service in Oradea for warning lights, starting issues, battery, sensors, lights or accessories working intermittently."],
    ["Probleme la pornire, senzori, baterie sau martori aprinși? Verificăm sistemele electrice și căutăm cauza reală.", "Starting issues, sensors, battery or warning lights? We check electrical systems and look for the real cause."],
    ["Verificare electrică atentă", "Careful electrical check"],
    ["Testăm circuitul, simptomele și componentele înainte să recomandăm reparația.", "We test the circuit, symptoms and components before recommending repair."],
    ["Defecțiunile electrice pot avea cauze ascunse și simptome intermitente. Combinăm diagnoza cu testări tehnice pentru a evita intervențiile inutile.", "Electrical faults can have hidden causes and intermittent symptoms. We combine diagnostics with technical tests to avoid unnecessary work."],
    ["Verificare injecție în Oradea pentru pornire greoaie, fum, consum crescut sau motor neregulat. Service certificat Diesel Point.", "Injection check in Oradea for hard starting, smoke, increased consumption or irregular engine operation. Diesel Point certified workshop."],
    ["Motorul pornește greu, scoate fum sau tremură? Verificăm sistemul de injecție și îți spunem ce merită reparat.", "Does the engine start hard, smoke or shake? We check the injection system and tell you what is worth repairing."],
    ["Verificăm sistemul de injecție înainte să recomandăm reparația.", "We check the injection system before recommending repair."],
    ["Problemele de injecție pot afecta pornirea, consumul, fumul și puterea motorului. Verificăm simptomele și componentele relevante înainte să recomandăm reparații.", "Injection issues can affect starting, consumption, smoke and engine power. We check symptoms and relevant components before recommending repairs."],
    ["Tinichigerie și vopsitorie auto în Oradea pentru lovituri, zgârieturi, elemente deformate și reparații de caroserie.", "Bodywork and car painting in Oradea for dents, scratches, deformed parts and body repairs."],
    ["Lovituri, zgârieturi sau elemente de caroserie deformate? Evaluăm dauna și îți explicăm pașii pentru o reparație curată.", "Dents, scratches or deformed body parts? We assess the damage and explain the steps for a clean repair."],
    ["Caroserie cu aspect îngrijit", "Bodywork with a clean appearance"],
    ["Stabilim lucrarea potrivită pentru zona afectată și rezultatul dorit.", "We define the right work for the affected area and desired result."],
    ["Fiecare daună are soluția ei: îndreptare, pregătire, vopsire locală sau înlocuire. Evaluăm zona afectată și îți explicăm ce variantă este potrivită pentru mașina ta.", "Every damage has its own solution: straightening, preparation, local painting or replacement. We assess the affected area and explain which option fits your car."],
    ["Service anvelope în Oradea pentru schimb sezonier, uzură neuniformă, vibrații, presiune scăzută și verificări ale roților.", "Tire service in Oradea for seasonal change, uneven wear, vibrations, low pressure and wheel checks."],
    ["Ai vibrații, presiune care scade sau anvelope uzate neuniform? Verificăm roțile ca mașina să ruleze sigur și stabil.", "Do you feel vibrations, dropping pressure or uneven tire wear? We check the wheels so the car drives safely and steadily."],
    ["Roți verificate pentru siguranță", "Wheels checked for safety"],
    ["Anvelopele în stare bună ajută frânarea, stabilitatea și confortul.", "Tires in good condition support braking, stability and comfort."],
    ["Anvelopele influențează direct frânarea, stabilitatea și consumul. Verificăm starea roților și îți recomandăm lucrările necesare pentru rulare sigură.", "Tires directly affect braking, stability and consumption. We check wheel condition and recommend the work needed for safe driving."],
    ["Verificări și reparații pentru frâne și suspensie în Oradea. Zgomote, vibrații, instabilitate sau distanță de frânare crescută.", "Brake and suspension checks and repairs in Oradea. Noises, vibrations, instability or increased braking distance."],
    ["Auzi zgomote la frânare, simți vibrații sau mașina este instabilă? Verificăm frânele și suspensia pentru siguranța ta.", "Do you hear noises while braking, feel vibrations or is the car unstable? We check brakes and suspension for your safety."],
    ["Siguranță la fiecare frânare", "Safety at every braking"],
    ["Frânele și suspensia se verifică atent, fără improvizații.", "Brakes and suspension are checked carefully, without improvisation."],
    ["Frânele și suspensia schimbă felul în care mașina oprește, virează și reacționează la denivelări. Inspectăm componentele importante și îți spunem ce trebuie rezolvat.", "Brakes and suspension change how the car stops, turns and reacts to bumps. We inspect important components and tell you what needs attention."],
    ["Verificăm simptomele pe care le observi și componentele relevante pentru", "We check the symptoms you notice and the relevant components for"],
    ["Căutăm cauza reală înainte să recomandăm înlocuiri sau lucrări mai costisitoare.", "We look for the real cause before recommending replacements or more expensive work."],
    ["Executăm lucrarea agreată cu atenție la siguranță, funcționare și rezultat.", "We perform the agreed work with attention to safety, function and result."],
    ["Primești explicații simple, fără presiune, ca să știi ce decizie iei.", "You get simple explanations without pressure, so you know what decision you are making."],
    ["Începem cu ce ai observat la mașină și o verificare pentru", "We start with what you noticed about the car and a check for"],
    ["Identificăm sistemele care necesită atenție și îți explicăm prioritatea lor.", "We identify the systems that need attention and explain their priority."],
    ["Realizăm intervenția agreată după ce știi ce presupune și de ce este necesară.", "We perform the agreed intervention after you know what it involves and why it is needed."],
    ["Verificăm rezultatul și îți spunem ce recomandări sunt utile pe mai departe.", "We check the result and tell you which recommendations are useful next."],
    ["Este recomandat când observi simptome neobișnuite, când mașina nu mai funcționează normal sau când vrei să previi o problemă mai scumpă.", "It is recommended when you notice unusual symptoms, when the car no longer works normally or when you want to prevent a more expensive issue."],
    ["Durata depinde de starea mașinii și de complexitatea lucrării. După verificare îți comunicăm o estimare realistă.", "Duration depends on the car's condition and work complexity. After checking, we provide a realistic estimate."],
    ["Da. Îți explicăm ce am găsit, ce recomandăm și ce opțiuni ai înainte să înceapă lucrarea.", "Yes. We explain what we found, what we recommend and what options you have before work begins."],
    ["Clima nu mai răcește eficient", "The AC no longer cools efficiently"],
    ["Aerul are miros neplăcut", "The air has an unpleasant smell"],
    ["Sistemul pornește greu", "The system starts with difficulty"],
    ["Se aud zgomote neobișnuite", "Unusual noises can be heard"],
    ["Geamurile se aburesc rapid", "Windows fog up quickly"],
    ["Nu ai verificat instalația de mult timp", "The system has not been checked in a long time"],
    ["Ai nevoie de încărcare freon în Oradea?", "Need freon refill in Oradea?"],
    ["Ai nevoie de diagnoză auto în Oradea?", "Need auto diagnostics in Oradea?"],
    ["reglaj direcție", "wheel alignment"],
    ["încărcare freon", "freon refill"],
    ["diagnoză auto", "auto diagnostics"],
    ["mecanică auto", "auto mechanics"],
    ["electrică auto", "auto electrical"],
    ["reparații climă", "AC repairs"],
    ["verificare injecție", "injection check"],
    ["tinichigerie și vopsitorie", "bodywork and painting"],
    ["service anvelope", "tire service"],
    ["frâne și suspensie", "brakes and suspension"],
    ["Servicii conexe", "Related services"],
  ],
};

const serviceTranslationEntries = {
  hu: [
    ["Reglaj direcție Oradea", "Futóműállítás Nagyvárad"],
    ["Reglaj direcție", "Futóműállítás"],
    ["Geometrie roți Oradea", "Kerékgeometria Nagyvárad"],
    ["Reglaj geometrie roți Oradea", "Kerékgeometria állítás Nagyvárad"],
    ["Service direcție auto Oradea", "Kormánymű szerviz Nagyvárad"],
    ["Verificare direcție auto Oradea", "Kormányzás ellenőrzés Nagyvárad"],
    ["Verificare și reglaj geometrie roți pentru stabilitate, siguranță și uzură uniformă a anvelopelor.", "Kerékgeometria ellenőrzés és futóműállítás a stabilitásért, biztonságért és az abroncsok egyenletes kopásáért."],
    ["Mecanic verificând geometria roților într-un service auto din Oradea", "Szerelő kerékgeometriát ellenőriz egy nagyváradi autószervizben"],
    ["Geometrie verificată corect", "Pontosan ellenőrzött geometria"],
    ["Reglaje realizate cu atenție pentru direcție, suspensie și stabilitate.", "Gondosan elvégzett beállítások a kormányzás, futómű és stabilitás érdekében."],
    ["Când ai nevoie de reglaj direcție?", "Mikor van szükség futóműállításra?"],
    ["Mașina trage într-o parte", "Az autó félrehúz"],
    ["Volanul nu stă drept", "A kormány nem áll egyenesen"],
    ["Anvelopele se uzează neuniform", "Az abroncsok egyenetlenül kopnak"],
    ["Ai lovit o bordură sau o groapă", "Padkát vagy kátyút ütöttél meg"],
    ["Ai schimbat componente de direcție sau suspensie", "Kormány- vagy futóműalkatrészt cseréltél"],
    ["Mașina este instabilă la viteze mai mari", "Az autó instabil nagyobb sebességnél"],
    ["Ce presupune reglajul direcției?", "Mit tartalmaz a futóműállítás?"],
    ["Reglajul direcției ajută mașina să ruleze drept, predictibil și eficient. La Motorpext verificăm geometria roților și intervenim cu reglaje atunci când valorile nu sunt în parametri.", "A futóműállítás segít, hogy az autó egyenesen, kiszámíthatóan és hatékonyan haladjon. A Motorpextnél ellenőrizzük a kerékgeometriát, és szükség esetén beállítjuk az értékeket."],
    ["Verificarea geometriei roților", "Kerékgeometria ellenőrzése"],
    ["Măsurăm poziția roților și identificăm abaterile care afectează stabilitatea.", "Megmérjük a kerekek helyzetét, és azonosítjuk a stabilitást befolyásoló eltéréseket."],
    ["Reglarea unghiurilor de direcție", "Kormányzási szögek beállítása"],
    ["Corectăm unghiurile pentru o direcție mai precisă și o rulare mai uniformă.", "Korrigáljuk a szögeket a pontosabb kormányzás és egyenletesebb futás érdekében."],
    ["Controlul stabilității", "Stabilitás ellenőrzése"],
    ["Verificăm comportamentul mașinii și semnele care pot indica probleme conexe.", "Ellenőrizzük az autó viselkedését és a kapcsolódó hibák jeleit."],
    ["Recomandări tehnice după verificare", "Műszaki javaslatok az ellenőrzés után"],
    ["Îți comunicăm clar ce s-a constatat și ce lucrări sunt recomandate.", "Világosan elmondjuk, mit találtunk és milyen munkák javasoltak."],
    ["Siguranță mai bună la condus", "Nagyobb vezetési biztonság"],
    ["Uzură uniformă a anvelopelor", "Egyenletesebb abroncskopás"],
    ["Stabilitate crescută", "Nagyobb stabilitás"],
    ["Consum optimizat", "Optimalizált fogyasztás"],
    ["Protecție pentru suspensie și direcție", "A futómű és kormányzás védelme"],
    ["Beneficiile reglajului corect", "A helyes futóműállítás előnyei"],
    ["Verificare inițială", "Kezdeti ellenőrzés"],
    ["Discutăm simptomele și inspectăm elementele relevante.", "Megbeszéljük a tüneteket és ellenőrizzük a releváns elemeket."],
    ["Măsurare geometrie roți", "Kerékgeometria mérése"],
    ["Verificăm valorile cu echipamente dedicate.", "Dedikált felszereléssel ellenőrizzük az értékeket."],
    ["Aducem unghiurile în parametrii potriviți, unde reglajul este posibil.", "Ahol lehetséges, a szögeket megfelelő értékekre állítjuk."],
    ["Test și recomandări", "Teszt és javaslatok"],
    ["Confirmăm rezultatul și explicăm următorii pași, dacă sunt necesari.", "Ellenőrizzük az eredményt és szükség esetén elmagyarázzuk a további lépéseket."],
    ["Ai nevoie de reglaj direcție în Oradea?", "Futóműállításra van szükséged Nagyváradon?"],
    ["Când este necesar reglajul direcției?", "Mikor szükséges a futóműállítás?"],
    ["Reglajul este recomandat când mașina trage într-o parte, volanul nu stă drept, anvelopele se uzează neuniform sau după intervenții la direcție ori suspensie.", "Futóműállítás javasolt, ha az autó félrehúz, a kormány nem áll egyenesen, az abroncsok egyenetlenül kopnak, vagy kormány/futómű javítás történt."],
    ["Cât durează reglajul geometriei roților?", "Mennyi ideig tart a kerékgeometria állítás?"],
    ["Durata depinde de starea mașinii și de reglajele necesare, dar verificarea și reglajul sunt de regulă lucrări rapide pentru un service echipat corespunzător.", "Az idő az autó állapotától és a szükséges beállításoktól függ, de megfelelő felszereléssel általában gyors munka."],
    ["De ce trage mașina într-o parte?", "Miért húz félre az autó?"],
    ["Cauzele pot include geometrie incorectă, presiune diferită în anvelope, uzură la direcție sau suspensie ori probleme la sistemul de frânare.", "Oka lehet rossz geometria, eltérő guminyomás, kormány- vagy futóműkopás, illetve fékprobléma."],
    ["Este recomandat reglajul direcției după schimbarea anvelopelor?", "Ajánlott futóműállítás gumicsere után?"],
    ["Da, mai ales dacă există uzură neuniformă, vibrații sau dacă au fost schimbate componente de suspensie ori direcție.", "Igen, főleg egyenetlen kopás, vibráció vagy futómű/kormányalkatrész csere után."],
    ["Reglajul direcției ajută la uzura uniformă a anvelopelor?", "Segít a futóműállítás az abroncsok egyenletes kopásában?"],
    ["Da. O geometrie corectă reduce uzura neuniformă și poate prelungi durata de viață a anvelopelor.", "Igen. A helyes geometria csökkenti az egyenetlen kopást és meghosszabbíthatja az abroncsok élettartamát."],
  ],
  en: [
    ["Reglaj direcție Oradea", "Wheel Alignment Oradea"],
    ["Reglaj direcție", "Wheel alignment"],
    ["Geometrie roți Oradea", "Wheel geometry Oradea"],
    ["Reglaj geometrie roți Oradea", "Wheel geometry adjustment Oradea"],
    ["Service direcție auto Oradea", "Steering service Oradea"],
    ["Verificare direcție auto Oradea", "Steering check Oradea"],
    ["Verificare și reglaj geometrie roți pentru stabilitate, siguranță și uzură uniformă a anvelopelor.", "Wheel geometry check and alignment for stability, safety and even tire wear."],
    ["Mecanic verificând geometria roților într-un service auto din Oradea", "Mechanic checking wheel geometry in an auto repair workshop in Oradea"],
    ["Geometrie verificată corect", "Correctly checked geometry"],
    ["Reglaje realizate cu atenție pentru direcție, suspensie și stabilitate.", "Careful adjustments for steering, suspension and stability."],
    ["Când ai nevoie de reglaj direcție?", "When do you need wheel alignment?"],
    ["Mașina trage într-o parte", "The car pulls to one side"],
    ["Volanul nu stă drept", "The steering wheel is not straight"],
    ["Anvelopele se uzează neuniform", "Tires wear unevenly"],
    ["Ai lovit o bordură sau o groapă", "You hit a curb or pothole"],
    ["Ai schimbat componente de direcție sau suspensie", "Steering or suspension parts were replaced"],
    ["Mașina este instabilă la viteze mai mari", "The car feels unstable at higher speeds"],
    ["Ce presupune reglajul direcției?", "What does wheel alignment include?"],
    ["Reglajul direcției ajută mașina să ruleze drept, predictibil și eficient. La Motorpext verificăm geometria roților și intervenim cu reglaje atunci când valorile nu sunt în parametri.", "Wheel alignment helps the car drive straight, predictably and efficiently. At Motorpext we check wheel geometry and adjust it when values are outside parameters."],
    ["Verificarea geometriei roților", "Wheel geometry check"],
    ["Măsurăm poziția roților și identificăm abaterile care afectează stabilitatea.", "We measure wheel position and identify deviations that affect stability."],
    ["Reglarea unghiurilor de direcție", "Steering angle adjustment"],
    ["Corectăm unghiurile pentru o direcție mai precisă și o rulare mai uniformă.", "We correct angles for more precise steering and smoother driving."],
    ["Controlul stabilității", "Stability check"],
    ["Verificăm comportamentul mașinii și semnele care pot indica probleme conexe.", "We check vehicle behavior and signs of related issues."],
    ["Recomandări tehnice după verificare", "Technical recommendations after the check"],
    ["Îți comunicăm clar ce s-a constatat și ce lucrări sunt recomandate.", "We clearly explain what was found and what work is recommended."],
    ["Siguranță mai bună la condus", "Better driving safety"],
    ["Uzură uniformă a anvelopelor", "Even tire wear"],
    ["Stabilitate crescută", "Increased stability"],
    ["Consum optimizat", "Optimized fuel consumption"],
    ["Protecție pentru suspensie și direcție", "Protection for suspension and steering"],
    ["Beneficiile reglajului corect", "Benefits of correct alignment"],
    ["Verificare inițială", "Initial check"],
    ["Discutăm simptomele și inspectăm elementele relevante.", "We discuss symptoms and inspect the relevant parts."],
    ["Măsurare geometrie roți", "Wheel geometry measurement"],
    ["Verificăm valorile cu echipamente dedicate.", "We check values with dedicated equipment."],
    ["Aducem unghiurile în parametrii potriviți, unde reglajul este posibil.", "Where adjustment is possible, we bring the angles into the correct parameters."],
    ["Test și recomandări", "Test and recommendations"],
    ["Confirmăm rezultatul și explicăm următorii pași, dacă sunt necesari.", "We confirm the result and explain the next steps if needed."],
    ["Ai nevoie de reglaj direcție în Oradea?", "Need wheel alignment in Oradea?"],
    ["Când este necesar reglajul direcției?", "When is wheel alignment necessary?"],
    ["Reglajul este recomandat când mașina trage într-o parte, volanul nu stă drept, anvelopele se uzează neuniform sau după intervenții la direcție ori suspensie.", "Alignment is recommended when the car pulls to one side, the steering wheel is not straight, tires wear unevenly, or after steering or suspension repairs."],
    ["Cât durează reglajul geometriei roților?", "How long does wheel geometry adjustment take?"],
    ["Durata depinde de starea mașinii și de reglajele necesare, dar verificarea și reglajul sunt de regulă lucrări rapide pentru un service echipat corespunzător.", "Duration depends on the vehicle condition and required adjustments, but the check and adjustment are usually quick for a properly equipped workshop."],
    ["De ce trage mașina într-o parte?", "Why does the car pull to one side?"],
    ["Cauzele pot include geometrie incorectă, presiune diferită în anvelope, uzură la direcție sau suspensie ori probleme la sistemul de frânare.", "Possible causes include incorrect geometry, uneven tire pressure, steering or suspension wear, or braking system issues."],
    ["Este recomandat reglajul direcției după schimbarea anvelopelor?", "Is alignment recommended after changing tires?"],
    ["Da, mai ales dacă există uzură neuniformă, vibrații sau dacă au fost schimbate componente de suspensie ori direcție.", "Yes, especially if there is uneven wear, vibration, or if steering or suspension parts were replaced."],
    ["Reglajul direcției ajută la uzura uniformă a anvelopelor?", "Does alignment help with even tire wear?"],
    ["Da. O geometrie corectă reduce uzura neuniformă și poate prelungi durata de viață a anvelopelor.", "Yes. Correct geometry reduces uneven wear and can extend tire life."],
  ],
};

function allTranslationEntries(lang) {
  return [...(translationEntries[lang] ?? []), ...(serviceTranslationEntries[lang] ?? []), ...genericTranslationEntries(lang)];
}

function translateHtml(html, lang) {
  if (lang === "ro") return html;
  const translated = allTranslationEntries(lang)
    .sort((a, b) => b[0].length - a[0].length)
    .reduce((output, [from, to]) => output.split(from).join(to), html);
  return cleanupLocalizedHtml(translated, lang);
}

function cleanupLocalizedHtml(html, lang) {
  if (lang === "hu") {
    return html
      .replace(/Când este recomandat serviciul de [^?<"]+\?/g, "Mikor ajánlott ez a szolgáltatás?")
      .replace(/Cât durează [^?<"]+\?/g, "Mennyi ideig tart a munka?")
      .replace(/Adatvédelmi irányelvek pentru website-ul SC MOTORPEXT SRL\./g, "Adatvédelmi irányelvek az SC MOTORPEXT SRL weboldalához.");
  }
  if (lang === "en") {
    return html
      .replace(/Când este recomandat serviciul de [^?<"]+\?/g, "When is this service recommended?")
      .replace(/Cât durează [^?<"]+\?/g, "How long does the service take?")
      .replace(/Privacy policy pentru website-ul SC MOTORPEXT SRL\./g, "Privacy policy for the SC MOTORPEXT SRL website.");
  }
  return html;
}

function genericTranslationEntries(lang) {
  const hu = [
    ["Reglaj direcție Oradea | Geometrie roți | MOTORPEXT", "Futóműállítás Nagyvárad | Kerékgeometria | MOTORPEXT"],
    ["Reglaj direcție în Oradea la SC MOTORPEXT SRL. Verificare geometrie roți, stabilitate mai bună și uzură uniformă a anvelopelor.", "Futóműállítás Nagyváradon az SC MOTORPEXT SRL-nél. Kerékgeometria ellenőrzés, jobb stabilitás és egyenletesebb abroncskopás."],
    ["Diagnoză auto Oradea | Diagnoză computerizată | MOTORPEXT", "Autódiagnosztika Nagyvárad | Számítógépes diagnosztika | MOTORPEXT"],
    ["Mecanică auto Oradea | Reparații auto | MOTORPEXT", "Autószerelés Nagyvárad | Autójavítás | MOTORPEXT"],
    ["Electrică auto Oradea | Reparații electrice auto | MOTORPEXT", "Autóvillamosság Nagyvárad | Elektromos javítások | MOTORPEXT"],
    ["Încărcare freon Oradea | Service climă auto | MOTORPEXT", "Klíma töltés Nagyvárad | Autóklíma szerviz | MOTORPEXT"],
    ["Reparații climă auto Oradea | MOTORPEXT", "Autóklíma javítás Nagyvárad | MOTORPEXT"],
    ["Verificare injecție Oradea | Diesel Point | MOTORPEXT", "Befecskendezés ellenőrzés Nagyvárad | Diesel Point | MOTORPEXT"],
    ["Tinichigerie și vopsitorie Oradea | MOTORPEXT", "Karosszéria és fényezés Nagyvárad | MOTORPEXT"],
    ["Service anvelope Oradea | MOTORPEXT", "Gumiszerviz Nagyvárad | MOTORPEXT"],
    ["Frâne și suspensie Oradea | MOTORPEXT", "Fék és futómű Nagyvárad | MOTORPEXT"],
    ["Diagnoză auto în Oradea pentru identificarea rapidă a problemelor. SC MOTORPEXT SRL oferă verificări tehnice și recomandări clare.", "Autódiagnosztika Nagyváradon a hibák gyors azonosításához. Az SC MOTORPEXT SRL műszaki ellenőrzést és világos javaslatokat kínál."],
    ["Mecanică auto în Oradea pentru întreținere și reparații multimarcă. SC MOTORPEXT SRL, service autorizat RAR.", "Autószerelés Nagyváradon többmárkás karbantartáshoz és javításhoz. SC MOTORPEXT SRL, RAR engedélyezett szerviz."],
    ["Electrică auto în Oradea pentru probleme electrice, senzori, pornire și verificări tehnice. SC MOTORPEXT SRL.", "Autóvillamosság Nagyváradon elektromos hibákhoz, szenzorokhoz, indítási problémákhoz és műszaki ellenőrzésekhez. SC MOTORPEXT SRL."],
    ["Încărcare freon în Oradea și verificare climă auto la SC MOTORPEXT SRL. Diagnostic clar, întreținere și reparații pentru sistemul de climatizare.", "Klíma töltés Nagyváradon és autóklíma ellenőrzés az SC MOTORPEXT SRL-nél. Egyértelmű diagnosztika, karbantartás és javítás a klímarendszerhez."],
    ["Reparații climă auto în Oradea, verificare sistem climatizare și recomandări tehnice clare la SC MOTORPEXT SRL.", "Autóklíma javítás Nagyváradon, klímarendszer ellenőrzés és világos műszaki javaslatok az SC MOTORPEXT SRL-nél."],
    ["Verificare sistem injecție în Oradea la SC MOTORPEXT SRL. Service certificat Diesel Point pentru constatări și recomandări tehnice.", "Befecskendező rendszer ellenőrzés Nagyváradon az SC MOTORPEXT SRL-nél. Diesel Point minősített szerviz műszaki hibafeltáráshoz és javaslatokhoz."],
    ["Tinichigerie și vopsitorie auto în Oradea pentru reparații caroserie și lucrări realizate profesionist la SC MOTORPEXT SRL.", "Karosszéria és autófényezés Nagyváradon professzionális karosszériajavításokhoz az SC MOTORPEXT SRL-nél."],
    ["Service anvelope în Oradea pentru verificări, montaj și lucrări conexe. SC MOTORPEXT SRL oferă servicii auto multimarcă.", "Gumiszerviz Nagyváradon ellenőrzéshez, szereléshez és kapcsolódó munkákhoz. Az SC MOTORPEXT SRL többmárkás autószerviz szolgáltatásokat kínál."],
    ["Verificări și reparații pentru frâne și suspensie în Oradea la SC MOTORPEXT SRL, service auto autorizat RAR.", "Fék és futómű ellenőrzés, javítás Nagyváradon az SC MOTORPEXT SRL-nél, RAR engedélyezett autószervizben."],
    ["Diagnoză computerizată auto într-un service din Oradea", "Számítógépes autódiagnosztika egy nagyváradi szervizben"],
    ["Diagnoză înainte de decizie", "Diagnosztika döntés előtt"],
    ["Verificăm datele și simptomele pentru recomandări corecte.", "Ellenőrizzük az adatokat és tüneteket a korrekt javaslatokhoz."],
    ["Mecanic realizând reparații auto într-un atelier profesionist", "Szerelő autójavítást végez egy professzionális műhelyben"],
    ["Reparații multimarcă", "Többmárkás javítások"],
    ["Lucrări mecanice realizate cu atenție și comunicare clară.", "Gondosan végzett mechanikai munkák tiszta kommunikációval."],
    ["Verificări electrice auto cu echipament de diagnoză", "Autóvillamossági ellenőrzés diagnosztikai eszközzel"],
    ["Sisteme electrice verificate", "Ellenőrzött elektromos rendszerek"],
    ["Testăm simptomele și componentele înainte de intervenție.", "A beavatkozás előtt ellenőrizzük a tüneteket és az alkatrészeket."],
    ["Verificare sistem climatizare auto într-un service autorizat din Oradea", "Autóklíma rendszer ellenőrzése egy nagyváradi engedélyezett szervizben"],
    ["Climă auto reparată corect", "Korrektül javított autóklíma"],
    ["Identificăm cauza, nu doar simptomul.", "Az okot keressük, nem csak a tünetet."],
    ["Tehnician lucrând la sistemul de injecție auto", "Technikus autó befecskendező rendszeren dolgozik"],
    ["Certificat Diesel Point", "Diesel Point minősítés"],
    ["Experiență în verificarea și repararea sistemelor de injecție.", "Tapasztalat a befecskendező rendszerek ellenőrzésében és javításában."],
    ["Verificare sistem injecție diesel într-un service auto", "Dízel befecskendező rendszer ellenőrzése autószervizben"],
    ["Verificare tehnică", "Műszaki ellenőrzés"],
    ["Date clare înainte de decizia de reparație.", "Tiszta adatok a javítási döntés előtt."],
    ["Lucrări de tinichigerie și vopsitorie auto într-un atelier", "Karosszéria- és fényezési munkák műhelyben"],
    ["Caroserie și finisaj", "Karosszéria és felület"],
    ["Lucrări curate, cu atenție la detalii și comunicare clară.", "Tiszta munkák, figyelemmel a részletekre és világos kommunikációval."],
    ["Roată verificată într-un service auto din Oradea", "Kerék ellenőrzése egy nagyváradi autószervizben"],
    ["Roți verificate atent", "Gondosan ellenőrzött kerekek"],
    ["Anvelopele corecte ajută stabilitatea, frânarea și confortul.", "A megfelelő abroncsok segítik a stabilitást, fékezést és kényelmet."],
    ["Mecanic verificând frânele și suspensia unui autoturism", "Szerelő féket és futóművet ellenőriz egy autón"],
    ["Siguranță în mers", "Biztonság menet közben"],
    ["Frânele și suspensia cer atenție tehnică, nu improvizații.", "A fék és futómű műszaki figyelmet igényel, nem rögtönzést."],
    ["Identificare mai rapidă", "Gyorsabb azonosítás"],
    ["Decizii informate", "Megalapozott döntések"],
    ["Costuri mai bine controlate", "Jobban kontrollált költségek"],
    ["Reparații orientate corect", "Jól célzott javítások"],
    ["Comunicare clară", "Tiszta kommunikáció"],
    ["Identificare precisă", "Pontos azonosítás"],
    ["Funcționare stabilă", "Stabil működés"],
    ["Mai puține probleme recurente", "Kevesebb visszatérő probléma"],
    ["Confort mai bun", "Nagyobb komfort"],
    ["Funcționare corectă", "Helyes működés"],
    ["Protecție pentru compresor", "Kompresszorvédelem"],
    ["Diagnostic clar", "Tiszta diagnosztika"],
    ["Reducerea riscului de defecțiuni repetate", "Az ismétlődő hibák kockázatának csökkentése"],
    ["Funcționare mai stabilă", "Stabilabb működés"],
    ["Consum mai bine controlat", "Jobban kontrollált fogyasztás"],
    ["Pornire îmbunătățită", "Javított indítás"],
    ["Diagnostic tehnic clar", "Tiszta műszaki diagnosztika"],
    ["Aspect îmbunătățit", "Javított megjelenés"],
    ["Reparații corecte", "Korrekt javítások"],
    ["Protecție pentru caroserie", "Karosszériavédelem"],
    ["Evaluare clară", "Tiszta értékelés"],
    ["Execuție profesionistă", "Professzionális kivitelezés"],
    ["Rulare mai stabilă", "Stabilabb futás"],
    ["Siguranță la frânare", "Biztonságosabb fékezés"],
    ["Uzură controlată", "Kontrollált kopás"],
    ["Confort mai bun", "Nagyobb komfort"],
    ["Recomandări clare", "Világos javaslatok"],
    ["Siguranță la condus", "Vezetési biztonság"],
    ["Întreținere corectă", "Korrekt karbantartás"],
    ["Durată de viață mai bună pentru componente", "Hosszabb alkatrész-élettartam"],
    ["Costuri explicate clar", "Világosan magyarázott költségek"],
    ["Cauți mecanică auto în Oradea?", "Autószerelést keresel Nagyváradon?"],
    ["Ai nevoie de electrică auto în Oradea?", "Autóvillamosságra van szükséged Nagyváradon?"],
    ["Ai nevoie de reparații climă auto în Oradea?", "Autóklíma javításra van szükséged Nagyváradon?"],
    ["Ai nevoie de verificare injecție în Oradea?", "Befecskendezés ellenőrzésre van szükséged Nagyváradon?"],
    ["Ai nevoie de tinichigerie și vopsitorie în Oradea?", "Karosszéria és fényezés kell Nagyváradon?"],
    ["Ai nevoie de service anvelope în Oradea?", "Gumiszervizre van szükséged Nagyváradon?"],
    ["Ai nevoie de verificare frâne sau suspensie în Oradea?", "Fék vagy futómű ellenőrzésre van szükséged Nagyváradon?"],
    ["Ce presupun reparațiile mecanice?", "Mit tartalmaznak a mechanikai javítások?"],
    ["Verificăm problema, explicăm constatarea și intervenim asupra componentelor care necesită reparație sau înlocuire.", "Ellenőrizzük a problémát, elmagyarázzuk a hibafeltárást, és a javítást vagy cserét igénylő alkatrészeken dolgozunk."],
    ["Cum verificăm electrica auto", "Hogyan ellenőrizzük az autóvillamosságot"],
    ["Combinăm diagnoza cu verificări tehnice pentru a identifica problemele electrice fără intervenții inutile.", "A diagnosztikát műszaki ellenőrzésekkel kombináljuk, hogy felesleges beavatkozás nélkül találjuk meg az elektromos hibákat."],
    ["Cum abordăm reparațiile la clima auto", "Hogyan közelítjük meg az autóklíma javítását"],
    ["Verificăm sistemul, identificăm cauza și îți comunicăm clar opțiunile de reparație.", "Ellenőrizzük a rendszert, azonosítjuk az okot, és világosan elmondjuk a javítási lehetőségeket."],
    ["Ce verificăm la sistemul de injecție", "Mit ellenőrzünk a befecskendező rendszeren?"],
    ["Analizăm funcționarea și simptomele pentru a vedea dacă injectoarele sau alte componente necesită intervenție.", "Elemezzük a működést és a tüneteket, hogy kiderüljön, az injektorok vagy más alkatrészek igényelnek-e beavatkozást."],
    ["Ce includ lucrările de caroserie", "Mit tartalmaznak a karosszériamunkák?"],
    ["Evaluăm zona afectată, stabilim intervenția și explicăm pașii necesari pentru o reparație corectă.", "Felmérjük az érintett részt, meghatározzuk a beavatkozást, és elmagyarázzuk a korrekt javításhoz szükséges lépéseket."],
    ["Ce presupune service-ul pentru anvelope", "Mit tartalmaz a gumiszerviz?"],
    ["Verificăm starea roților și recomandăm lucrările necesare pentru siguranță și rulare uniformă.", "Ellenőrizzük a kerekek állapotát, és javasoljuk a biztonsághoz, egyenletes futáshoz szükséges munkákat."],
    ["Ce verificăm la frâne și suspensie", "Mit ellenőrzünk a féken és futóművön?"],
    ["Inspectăm componentele importante pentru siguranță și recomandăm intervențiile necesare.", "Megvizsgáljuk a biztonság szempontjából fontos alkatrészeket, és javasoljuk a szükséges beavatkozásokat."],
    ["Ce include serviciul de climă auto?", "Mit tartalmaz az autóklíma szolgáltatás?"],
    ["Pentru încărcare freon în Oradea, abordarea corectă începe cu verificarea instalației. Reîncărcarea are sens atunci când sistemul poate funcționa în parametri.", "Klíma töltésnél a korrekt megközelítés a rendszer ellenőrzésével kezdődik. A feltöltés akkor indokolt, ha a rendszer megfelelő paraméterek között tud működni."],
    ["Verificarea sistemului de climatizare", "Klímarendszer ellenőrzése"],
    ["Analizăm comportamentul instalației și semnele unei funcționări incorecte.", "Megnézzük a rendszer viselkedését és a hibás működés jeleit."],
    ["Verificarea presiunii", "Nyomás ellenőrzése"],
    ["Controlăm presiunea pentru a înțelege dacă sistemul are nevoie de intervenție.", "Ellenőrizzük a nyomást, hogy lássuk, szükséges-e beavatkozás."],
    ["Încărcare freon", "Klíma töltés"],
    ["Completăm agentul frigorific atunci când verificările arată că este necesar.", "A hűtőközeget akkor töltjük, amikor az ellenőrzések ezt indokolják."],
    ["Control funcționare", "Működés ellenőrzése"],
    ["Testăm răcirea și răspunsul sistemului după lucrare.", "A munka után teszteljük a hűtést és a rendszer reakcióját."],
    ["Recomandări tehnice", "Műszaki javaslatok"],
    ["Îți spunem clar dacă sunt necesare reparații suplimentare.", "Világosan elmondjuk, ha további javításra van szükség."],
    ["Încărcarea cu freon nu rezolvă orice problemă", "A freon feltöltés nem old meg minden problémát"],
    ["Dacă sistemul pierde freon, este importantă verificarea cauzei. O simplă reîncărcare fără verificare poate fi doar o soluție temporară.", "Ha a rendszer freont veszít, fontos az ok ellenőrzése. Egy egyszerű feltöltés ellenőrzés nélkül csak ideiglenes megoldás lehet."],
    ["Răcire eficientă", "Hatékony hűtés"],
    ["Confort la condus", "Kényelem vezetés közben"],
    ["Protecție pentru compresor", "Kompresszorvédelem"],
    ["Funcționare corectă a sistemului", "A rendszer helyes működése"],
    ["Diagnostic clar înainte de reparații", "Tiszta diagnosztika javítás előtt"],
    ["Ascultăm simptomele și verificăm funcționarea climei.", "Meghallgatjuk a tüneteket és ellenőrizzük a klíma működését."],
    ["Control presiune și funcționare", "Nyomás- és működésellenőrzés"],
    ["Evaluăm presiunea și comportamentul sistemului.", "Értékeljük a nyomást és a rendszer viselkedését."],
    ["Încărcare freon dacă este necesar", "Klíma töltés, ha szükséges"],
    ["Reîncărcăm doar când intervenția este justificată tehnic.", "Csak akkor töltjük újra, ha a beavatkozás műszakilag indokolt."],
    ["Test final", "Végső teszt"],
    ["Confirmăm răcirea și comunicăm eventualele recomandări.", "Ellenőrizzük a hűtést és elmondjuk az esetleges javaslatokat."],
    ["Cât durează încărcarea cu freon?", "Mennyi ideig tart a klíma töltés?"],
    ["Durata depinde de verificările necesare și de starea instalației, dar lucrarea este de obicei rapidă atunci când sistemul este în stare bună.", "Az idő a szükséges ellenőrzésektől és a rendszer állapotától függ, de jó állapotú rendszernél a munka általában gyors."],
    ["De ce nu mai răcește clima auto?", "Miért nem hűt már az autóklíma?"],
    ["Poate fi vorba despre nivel scăzut de agent frigorific, pierderi, probleme la compresor, senzori, ventilatoare sau alte componente ale instalației.", "Oka lehet alacsony hűtőközegszint, szivárgás, kompresszor-, szenzor-, ventilátor- vagy más alkatrészhiba."],
    ["Este suficientă doar încărcarea cu freon?", "Elég csak a freon feltöltés?"],
    ["Nu întotdeauna. Dacă există pierderi sau componente defecte, încărcarea fără verificare poate rezolva doar temporar simptomul.", "Nem mindig. Ha szivárgás vagy hibás alkatrész van, az ellenőrzés nélküli feltöltés csak ideiglenesen oldhatja meg a tünetet."],
    ["Cât de des trebuie verificată clima auto?", "Milyen gyakran kell ellenőrizni az autóklímát?"],
    ["Este recomandată o verificare periodică, mai ales înainte de sezonul cald sau când observi scăderea eficienței de răcire.", "Időszakos ellenőrzés javasolt, főleg a meleg szezon előtt vagy ha csökken a hűtési teljesítmény."],
    ["Pot circula cu clima defectă?", "Lehet hibás klímával közlekedni?"],
    ["Da, dar este mai bine să verifici instalația. Unele probleme pot afecta confortul, dezaburirea și durata de viață a compresorului.", "Igen, de jobb ellenőriztetni a rendszert. Egyes hibák befolyásolhatják a kényelmet, a páramentesítést és a kompresszor élettartamát."],
    ["Diagnoză auto Oradea", "Autódiagnosztika Nagyvárad"],
    ["Diagnoză auto", "Autódiagnosztika"],
    ["Mecanică auto Oradea", "Autószerelés Nagyvárad"],
    ["Mecanică auto", "Autószerelés"],
    ["Electrică auto Oradea", "Autóvillamosság Nagyvárad"],
    ["Electrică auto", "Autóvillamosság"],
    ["Încărcare freon Oradea", "Klíma töltés Nagyvárad"],
    ["Încărcare freon", "Klíma töltés"],
    ["Reparații climă auto Oradea", "Autóklíma javítás Nagyvárad"],
    ["Reparații climă", "Klímajavítás"],
    ["Verificare injecție Oradea", "Befecskendezés ellenőrzés Nagyvárad"],
    ["Verificare injecție", "Befecskendezés ellenőrzés"],
    ["Tinichigerie și vopsitorie Oradea", "Karosszéria és fényezés Nagyvárad"],
    ["Tinichigerie și vopsitorie", "Karosszéria és fényezés"],
    ["Service anvelope Oradea", "Gumiszerviz Nagyvárad"],
    ["Service anvelope", "Gumiszerviz"],
    ["Frâne și suspensie Oradea", "Fék és futómű Nagyvárad"],
    ["Frâne și suspensie", "Fék és futómű"],
    ["Diagnoză computerizată Oradea", "Számítógépes diagnosztika Nagyvárad"],
    ["Verificare auto Oradea", "Autóellenőrzés Nagyvárad"],
    ["Reparații auto Oradea", "Autójavítás Nagyvárad"],
    ["Service auto multimarcă Oradea", "Többmárkás autószerviz Nagyvárad"],
    ["Reparații electrice auto Oradea", "Autóvillamossági javítás Nagyvárad"],
    ["Verificare injectoare Oradea", "Injektor ellenőrzés Nagyvárad"],
    ["Sistem injecție Oradea", "Befecskendező rendszer Nagyvárad"],
    ["Diesel Point Oradea", "Diesel Point Nagyvárad"],
    ["Sistem injecție diesel Oradea", "Dízel befecskendező rendszer Nagyvárad"],
    ["Tinichigerie vopsitorie Oradea", "Karosszéria fényezés Nagyvárad"],
    ["Reparații caroserie Oradea", "Karosszéria javítás Nagyvárad"],
    ["Vopsitorie auto Oradea", "Autófényezés Nagyvárad"],
    ["Schimb anvelope Oradea", "Gumicsere Nagyvárad"],
    ["Echilibrare roți Oradea", "Kerékkiegyensúlyozás Nagyvárad"],
    ["Diagnoză computerizată și verificări tehnice pentru identificarea problemelor înainte de reparații.", "Számítógépes diagnosztika és műszaki ellenőrzés a hibák javítás előtti azonosításához."],
    ["Reparații mecanice și întreținere pentru autoturisme, cu explicații clare și lucrări realizate corect.", "Mechanikai javítások és karbantartás személyautókhoz, tiszta magyarázatokkal és korrekt munkával."],
    ["Verificări și reparații electrice auto pentru sisteme moderne, senzori și probleme de funcționare.", "Autóvillamossági ellenőrzések és javítások modern rendszerekhez, szenzorokhoz és működési hibákhoz."],
    ["Verificare, întreținere și reparații pentru sistemul de climatizare auto, rapid și profesionist.", "Gyors és professzionális ellenőrzés, karbantartás és javítás az autóklíma rendszeréhez."],
    ["Diagnostic și reparații pentru sistemul de climatizare auto, cu verificare tehnică înainte de intervenție.", "Diagnosztika és javítás az autóklíma rendszeréhez, műszaki ellenőrzéssel a beavatkozás előtt."],
    ["Verificări tehnice pentru sistemul de injecție, injectoare și simptome de funcționare neregulată.", "Műszaki ellenőrzések a befecskendező rendszerhez, injektorokhoz és egyenetlen működési tünetekhez."],
    ["Lucrări de caroserie și vopsitorie auto pentru reparații realizate curat, atent și profesionist.", "Karosszéria- és fényezési munkák tiszta, gondos és professzionális javításokhoz."],
    ["Servicii pentru anvelope și roți, cu verificări conexe pentru siguranță și rulare corectă.", "Gumi- és kerékszerviz kapcsolódó ellenőrzésekkel a biztonságos és helyes futásért."],
    ["Verificări și reparații pentru frâne, suspensie și componente care influențează siguranța la condus.", "Fék, futómű és a vezetési biztonságot befolyásoló alkatrészek ellenőrzése és javítása."],
    ["Simptome", "Tünetek"],
    ["Explicație", "Magyarázat"],
    ["Beneficii", "Előnyök"],
    ["Proces", "Folyamat"],
    ["Conexe", "Kapcsolódó"],
    ["Întrebări frecvente despre", "Gyakori kérdések:"],
    ["Când este utilă diagnoza auto?", "Mikor hasznos az autódiagnosztika?"],
    ["Când să vii la mecanică auto?", "Mikor érdemes autószerelőhöz jönni?"],
    ["Semne de probleme electrice auto", "Autóvillamossági hibák jelei"],
    ["Când ai nevoie de verificarea climei auto?", "Mikor kell ellenőrizni az autóklímát?"],
    ["Semne că sistemul de climatizare are nevoie de service", "Jelek, hogy az autóklíma szervizt igényel"],
    ["Când pot fi injectoarele cauza?", "Mikor lehetnek az injektorok a hibaforrások?"],
    ["Când este recomandată verificarea injecției?", "Mikor ajánlott a befecskendezés ellenőrzése?"],
    ["Când ai nevoie de tinichigerie sau vopsitorie?", "Mikor kell karosszéria vagy fényezés?"],
    ["Când să verifici anvelopele?", "Mikor ellenőrizd az abroncsokat?"],
    ["Semne că frânele sau suspensia au nevoie de verificare", "Jelek, hogy a féket vagy futóművet ellenőrizni kell"],
    ["Dacă observi unul dintre aceste semne, este recomandată o verificare tehnică înainte ca problema să se agraveze.", "Ha ezek közül valamelyiket tapasztalod, érdemes műszaki ellenőrzést kérni, mielőtt a probléma súlyosbodik."],
    ["Un service corect înseamnă siguranță, confort și decizii mai bune pentru întreținerea mașinii.", "A korrekt szerviz biztonságot, kényelmet és jobb döntéseket jelent az autó karbantartásában."],
    ["Pași simpli, explicați clar, pentru ca programarea la service să fie predictibilă.", "Egyszerű, világosan elmagyarázott lépések, hogy a szervizlátogatás kiszámítható legyen."],
    ["Pentru o constatare completă, aceste servicii pot fi relevante în aceeași vizită.", "Teljesebb hibafeltáráshoz ezek a szolgáltatások ugyanazon látogatás során is relevánsak lehetnek."],
    ["Sună acum sau programează o vizită la service pentru o constatare clară.", "Hívj most vagy foglalj időpontot egy egyértelmű hibafeltáráshoz."],
    ["Constatare tehnică", "Műszaki hibafeltárás"],
    ["Identificarea cauzei", "Az ok azonosítása"],
    ["Intervenție controlată", "Ellenőrzött beavatkozás"],
    ["Recomandări clare", "Világos javaslatok"],
    ["Verificăm simptomele și componentele relevante pentru", "Ellenőrizzük a tüneteket és a releváns alkatrészeket ehhez:"],
    ["Căutăm cauza reală înainte de a recomanda intervenții sau înlocuiri.", "A valódi okot keressük, mielőtt beavatkozást vagy cserét javasolnánk."],
    ["Executăm lucrarea cu atenție la siguranță, funcționare și calitatea rezultatului.", "A munkát a biztonságra, működésre és az eredmény minőségére figyelve végezzük."],
    ["Îți explicăm ce s-a constatat și ce este recomandat mai departe.", "Elmagyarázzuk, mit találtunk és mi javasolt a továbbiakban."],
    ["Discuție și verificare", "Egyeztetés és ellenőrzés"],
    ["Începem cu simptomele și o verificare pentru", "A tünetekkel és ellenőrzéssel kezdünk ehhez:"],
    ["Identificăm componentele sau sistemele care necesită atenție.", "Azonosítjuk azokat az alkatrészeket vagy rendszereket, amelyek figyelmet igényelnek."],
    ["Lucrare service", "Szervizmunka"],
    ["Realizăm intervenția agreată după explicații clare.", "A megbeszélt beavatkozást világos magyarázat után végezzük el."],
    ["Control final", "Végső ellenőrzés"],
    ["Verificăm rezultatul și comunicăm recomandările utile.", "Ellenőrizzük az eredményt és elmondjuk a hasznos javaslatokat."],
    ["Intervenție orientată către funcționare corectă, comunicare clară și rezultat tehnic verificabil.", "A beavatkozás célja a helyes működés, a tiszta kommunikáció és az ellenőrizhető műszaki eredmény."],
    ["Ce include diagnoza auto?", "Mit tartalmaz az autódiagnosztika?"],
    ["Diagnoza ajută la înțelegerea cauzei reale și la evitarea reparațiilor făcute din presupuneri.", "A diagnosztika segít megérteni a valódi okot, és elkerülni a találgatás alapján végzett javításokat."],
    ["Cum lucrăm", "Hogyan dolgozunk"],
    ["Martori aprinși în bord", "Világító hibajelzések a műszerfalon"],
    ["Motor care funcționează neregulat", "Egyenetlenül működő motor"],
    ["Consum crescut", "Megnövekedett fogyasztás"],
    ["Pierdere de putere", "Teljesítményvesztés"],
    ["Pornire dificilă", "Nehéz indítás"],
    ["Zgomote sau comportament neobișnuit", "Szokatlan zajok vagy viselkedés"],
    ["Zgomote la motor sau suspensie", "Zajok a motornál vagy futóműnél"],
    ["Vibrații la rulare", "Vibráció menet közben"],
    ["Scurgeri de lichide", "Folyadékszivárgás"],
    ["Frânare neuniformă", "Egyenetlen fékezés"],
    ["Revizie necesară", "Szükséges szerviz"],
    ["Comportament schimbat al mașinii", "Megváltozott autóviselkedés"],
    ["Martori aprinși în bord", "Világító hibajelzések a műszerfalon"],
    ["Probleme la pornire", "Indítási problémák"],
    ["Lumini sau accesorii care funcționează intermitent", "Időszakosan működő lámpák vagy kiegészítők"],
    ["Baterie care se descarcă", "Gyorsan merülő akkumulátor"],
    ["Senzori cu erori", "Hibás szenzorok"],
    ["Climă sau ventilatoare cu probleme", "Klíma vagy ventilátor problémák"],
    ["Răcire slabă", "Gyenge hűtés"],
    ["Miros neplăcut în habitaclu", "Kellemetlen szag az utastérben"],
    ["Zgomote la pornirea climei", "Zaj a klíma indításakor"],
    ["Geamuri care se aburesc rapid", "Gyorsan párásodó ablakok"],
    ["Compresor care pornește intermitent", "Időszakosan induló kompresszor"],
    ["Pierdere repetată de freon", "Ismétlődő freonvesztés"],
    ["Pornire greoaie", "Nehézkes indítás"],
    ["Fum la evacuare", "Füst a kipufogónál"],
    ["Motor care tremură", "Rázkódó motor"],
    ["Erori la diagnoză", "Diagnosztikai hibák"],
    ["Lovituri de caroserie", "Karosszéria sérülések"],
    ["Zgârieturi vizibile", "Látható karcok"],
    ["Elemente deformate", "Deformált elemek"],
    ["Necesitate revopsire locală", "Helyi újrafényezés szükséges"],
    ["Daune după incident", "Sérülés baleset után"],
    ["Pregătire pentru reparații estetice", "Esztétikai javítás előkészítése"],
    ["Uzură neuniformă", "Egyenetlen kopás"],
    ["Vibrații la viteză", "Vibráció sebességnél"],
    ["Presiune care scade", "Csökkenő guminyomás"],
    ["Schimb sezonier", "Szezonális csere"],
    ["Lovituri în bordură", "Padkaütés"],
    ["Zgomot sau comportament neobișnuit", "Szokatlan zaj vagy viselkedés"],
    ["Zgomote la frânare", "Zaj fékezéskor"],
    ["Vibrații în volan", "Vibráció a kormányban"],
    ["Mașina se lasă pe o parte", "Az autó egyik oldalra ül"],
    ["Distanță de frânare crescută", "Megnövekedett féktáv"],
    ["Bătăi la denivelări", "Kopogás úthibáknál"],
    ["Instabilitate în viraje", "Instabilitás kanyarban"],
    ["Claritate tehnică", "Műszaki tisztánlátás"],
    ["Reparații recomandate corect", "Helyesen javasolt javítások"],
    ["Protecție pentru motor", "Motorvédelem"],
    ["Consum mai eficient", "Hatékonyabb fogyasztás"],
    ["Experiență Diesel Point", "Diesel Point tapasztalat"],
    ["Siguranță mai bună", "Nagyobb biztonság"],
    ["Frânare predictibilă", "Kiszámítható fékezés"],
    ["Protecție pentru anvelope", "Abroncsvédelem"],
    ["Reparații explicate clar", "Világosan elmagyarázott javítások"],
    ["funcționarea", "működés"],
    ["verificarea", "ellenőrzés"],
    ["reparația", "javítás"],
    ["reparațiile", "javítások"],
    ["constatarea", "hibafeltárás"],
    ["evaluarea", "értékelés"],
    ["diagnoză", "diagnosztika"],
    ["mecanică auto", "autószerelés"],
    ["electrică auto", "autóvillamosság"],
    ["climă auto", "autóklíma"],
    ["climatizare", "klímarendszer"],
    ["injecție", "befecskendezés"],
    ["sistem de injecție", "befecskendező rendszer"],
    ["caroserie", "karosszéria"],
    ["__term_anvelope__", "abroncsok"],
    ["frâne și suspensie", "fék és futómű"],
    ["Este recomandat atunci când observi simptome neobișnuite sau când mașina are nevoie de întreținere preventivă.", "Akkor ajánlott, ha szokatlan tüneteket tapasztalsz, vagy az autónak megelőző karbantartásra van szüksége."],
    ["Durata depinde de starea mașinii și de complexitatea lucrării. Îți comunicăm estimarea după verificare.", "Az idő az autó állapotától és a munka összetettségétől függ. Az ellenőrzés után becslést adunk."],
    ["Pot veni fără programare?", "Jöhetek időpont nélkül?"],
    ["Pentru disponibilitate mai bună, recomandăm să suni înainte sau să soliciți o programare.", "A jobb elérhetőség érdekében javasoljuk, hogy előtte telefonálj vagy kérj időpontot."],
    ["Primesc explicații înainte de reparație?", "Kapok magyarázatot a javítás előtt?"],
    ["Da. Comunicarea clară cu clientul este parte importantă din modul nostru de lucru.", "Igen. A tiszta kommunikáció az ügyféllel fontos része a munkamódszerünknek."],
    ["Lucrați pe mai multe mărci auto?", "Több autómárkával is dolgoztok?"],
    ["Da, Motorpext este un service auto multimarcă în Oradea.", "Igen, a Motorpext többmárkás autószerviz Nagyváradon."],
  ];
  const en = [
    ["Reglaj direcție Oradea | Geometrie roți | MOTORPEXT", "Wheel Alignment Oradea | Wheel Geometry | MOTORPEXT"],
    ["Reglaj direcție în Oradea la SC MOTORPEXT SRL. Verificare geometrie roți, stabilitate mai bună și uzură uniformă a anvelopelor.", "Wheel alignment in Oradea at SC MOTORPEXT SRL. Wheel geometry checks, better stability and even tire wear."],
    ["Diagnoză auto Oradea | Diagnoză computerizată | MOTORPEXT", "Auto Diagnostics Oradea | Computer Diagnostics | MOTORPEXT"],
    ["Mecanică auto Oradea | Reparații auto | MOTORPEXT", "Auto Mechanics Oradea | Auto Repairs | MOTORPEXT"],
    ["Electrică auto Oradea | Reparații electrice auto | MOTORPEXT", "Auto Electrical Service Oradea | Electrical Repairs | MOTORPEXT"],
    ["Încărcare freon Oradea | Service climă auto | MOTORPEXT", "Freon Refill Oradea | Car AC Service | MOTORPEXT"],
    ["Reparații climă auto Oradea | MOTORPEXT", "Car AC Repair Oradea | MOTORPEXT"],
    ["Verificare injecție Oradea | Diesel Point | MOTORPEXT", "Injection System Check Oradea | Diesel Point | MOTORPEXT"],
    ["Tinichigerie și vopsitorie Oradea | MOTORPEXT", "Bodywork and Painting Oradea | MOTORPEXT"],
    ["Service anvelope Oradea | MOTORPEXT", "Tire Service Oradea | MOTORPEXT"],
    ["Frâne și suspensie Oradea | MOTORPEXT", "Brakes and Suspension Oradea | MOTORPEXT"],
    ["Diagnoză auto în Oradea pentru identificarea rapidă a problemelor. SC MOTORPEXT SRL oferă verificări tehnice și recomandări clare.", "Auto diagnostics in Oradea for quickly identifying vehicle issues. SC MOTORPEXT SRL provides technical checks and clear recommendations."],
    ["Mecanică auto în Oradea pentru întreținere și reparații multimarcă. SC MOTORPEXT SRL, service autorizat RAR.", "Auto mechanics in Oradea for multi-brand maintenance and repairs. SC MOTORPEXT SRL, RAR-authorized workshop."],
    ["Electrică auto în Oradea pentru probleme electrice, senzori, pornire și verificări tehnice. SC MOTORPEXT SRL.", "Auto electrical service in Oradea for electrical issues, sensors, starting problems and technical checks. SC MOTORPEXT SRL."],
    ["Încărcare freon în Oradea și verificare climă auto la SC MOTORPEXT SRL. Diagnostic clar, întreținere și reparații pentru sistemul de climatizare.", "Freon refill in Oradea and car AC checks at SC MOTORPEXT SRL. Clear diagnostics, maintenance and repairs for the air conditioning system."],
    ["Reparații climă auto în Oradea, verificare sistem climatizare și recomandări tehnice clare la SC MOTORPEXT SRL.", "Car AC repairs in Oradea, air conditioning system checks and clear technical recommendations at SC MOTORPEXT SRL."],
    ["Verificare sistem injecție în Oradea la SC MOTORPEXT SRL. Service certificat Diesel Point pentru constatări și recomandări tehnice.", "Injection system checks in Oradea at SC MOTORPEXT SRL. Diesel Point certified service for inspections and technical recommendations."],
    ["Tinichigerie și vopsitorie auto în Oradea pentru reparații caroserie și lucrări realizate profesionist la SC MOTORPEXT SRL.", "Bodywork and car painting in Oradea for professional body repairs at SC MOTORPEXT SRL."],
    ["Service anvelope în Oradea pentru verificări, montaj și lucrări conexe. SC MOTORPEXT SRL oferă servicii auto multimarcă.", "Tire service in Oradea for checks, fitting and related work. SC MOTORPEXT SRL offers multi-brand auto service."],
    ["Verificări și reparații pentru frâne și suspensie în Oradea la SC MOTORPEXT SRL, service auto autorizat RAR.", "Brake and suspension checks and repairs in Oradea at SC MOTORPEXT SRL, a RAR-authorized auto workshop."],
    ["Diagnoză computerizată auto într-un service din Oradea", "Computer diagnostics in an auto workshop in Oradea"],
    ["Diagnoză înainte de decizie", "Diagnostics before decisions"],
    ["Verificăm datele și simptomele pentru recomandări corecte.", "We check data and symptoms for correct recommendations."],
    ["Mecanic realizând reparații auto într-un atelier profesionist", "Mechanic performing auto repairs in a professional workshop"],
    ["Reparații multimarcă", "Multi-brand repairs"],
    ["Lucrări mecanice realizate cu atenție și comunicare clară.", "Mechanical work carried out carefully with clear communication."],
    ["Verificări electrice auto cu echipament de diagnoză", "Auto electrical checks with diagnostic equipment"],
    ["Sisteme electrice verificate", "Electrical systems checked"],
    ["Testăm simptomele și componentele înainte de intervenție.", "We test symptoms and components before service work."],
    ["Verificare sistem climatizare auto într-un service autorizat din Oradea", "Car air conditioning system check in an authorized workshop in Oradea"],
    ["Climă auto reparată corect", "Car AC repaired correctly"],
    ["Identificăm cauza, nu doar simptomul.", "We identify the cause, not just the symptom."],
    ["Tehnician lucrând la sistemul de injecție auto", "Technician working on a vehicle injection system"],
    ["Certificat Diesel Point", "Diesel Point certified"],
    ["Experiență în verificarea și repararea sistemelor de injecție.", "Experience in checking and repairing injection systems."],
    ["Verificare sistem injecție diesel într-un service auto", "Diesel injection system check in an auto workshop"],
    ["Verificare tehnică", "Technical check"],
    ["Date clare înainte de decizia de reparație.", "Clear data before the repair decision."],
    ["Lucrări de tinichigerie și vopsitorie auto într-un atelier", "Bodywork and car painting in a workshop"],
    ["Caroserie și finisaj", "Bodywork and finish"],
    ["Lucrări curate, cu atenție la detalii și comunicare clară.", "Clean work with attention to detail and clear communication."],
    ["Roată verificată într-un service auto din Oradea", "Wheel checked in an auto workshop in Oradea"],
    ["Roți verificate atent", "Carefully checked wheels"],
    ["Anvelopele corecte ajută stabilitatea, frânarea și confortul.", "The right tires support stability, braking and comfort."],
    ["Mecanic verificând frânele și suspensia unui autoturism", "Mechanic checking a car's brakes and suspension"],
    ["Siguranță în mers", "Safety on the road"],
    ["Frânele și suspensia cer atenție tehnică, nu improvizații.", "Brakes and suspension need technical attention, not improvisation."],
    ["Identificare mai rapidă", "Faster identification"],
    ["Decizii informate", "Informed decisions"],
    ["Costuri mai bine controlate", "Better controlled costs"],
    ["Reparații orientate corect", "Correctly targeted repairs"],
    ["Comunicare clară", "Clear communication"],
    ["Identificare precisă", "Precise identification"],
    ["Funcționare stabilă", "Stable operation"],
    ["Mai puține probleme recurente", "Fewer recurring issues"],
    ["Confort mai bun", "Better comfort"],
    ["Funcționare corectă", "Correct operation"],
    ["Protecție pentru compresor", "Compressor protection"],
    ["Diagnostic clar", "Clear diagnostics"],
    ["Reducerea riscului de defecțiuni repetate", "Reduced risk of repeated faults"],
    ["Funcționare mai stabilă", "More stable operation"],
    ["Consum mai bine controlat", "Better controlled consumption"],
    ["Pornire îmbunătățită", "Improved starting"],
    ["Diagnostic tehnic clar", "Clear technical diagnostics"],
    ["Aspect îmbunătățit", "Improved appearance"],
    ["Reparații corecte", "Correct repairs"],
    ["Protecție pentru caroserie", "Bodywork protection"],
    ["Evaluare clară", "Clear evaluation"],
    ["Execuție profesionistă", "Professional execution"],
    ["Rulare mai stabilă", "More stable driving"],
    ["Siguranță la frânare", "Braking safety"],
    ["Uzură controlată", "Controlled wear"],
    ["Recomandări clare", "Clear recommendations"],
    ["Siguranță la condus", "Driving safety"],
    ["Întreținere corectă", "Correct maintenance"],
    ["Durată de viață mai bună pentru componente", "Longer component life"],
    ["Costuri explicate clar", "Clearly explained costs"],
    ["Cauți mecanică auto în Oradea?", "Looking for auto mechanics in Oradea?"],
    ["Ai nevoie de electrică auto în Oradea?", "Do you need auto electrical service in Oradea?"],
    ["Ai nevoie de reparații climă auto în Oradea?", "Do you need car AC repair in Oradea?"],
    ["Ai nevoie de verificare injecție în Oradea?", "Do you need an injection system check in Oradea?"],
    ["Ai nevoie de tinichigerie și vopsitorie în Oradea?", "Do you need bodywork and painting in Oradea?"],
    ["Ai nevoie de service anvelope în Oradea?", "Do you need tire service in Oradea?"],
    ["Ai nevoie de verificare frâne sau suspensie în Oradea?", "Do you need brake or suspension checks in Oradea?"],
    ["Ce presupun reparațiile mecanice?", "What do mechanical repairs include?"],
    ["Verificăm problema, explicăm constatarea și intervenim asupra componentelor care necesită reparație sau înlocuire.", "We check the issue, explain the inspection and work on the components that need repair or replacement."],
    ["Cum verificăm electrica auto", "How we check auto electrical systems"],
    ["Combinăm diagnoza cu verificări tehnice pentru a identifica problemele electrice fără intervenții inutile.", "We combine diagnostics with technical checks to identify electrical problems without unnecessary interventions."],
    ["Cum abordăm reparațiile la clima auto", "How we approach car AC repairs"],
    ["Verificăm sistemul, identificăm cauza și îți comunicăm clar opțiunile de reparație.", "We check the system, identify the cause and clearly explain the repair options."],
    ["Ce verificăm la sistemul de injecție", "What we check in the injection system"],
    ["Analizăm funcționarea și simptomele pentru a vedea dacă injectoarele sau alte componente necesită intervenție.", "We analyze operation and symptoms to see whether injectors or other components need service."],
    ["Ce includ lucrările de caroserie", "What bodywork includes"],
    ["Evaluăm zona afectată, stabilim intervenția și explicăm pașii necesari pentru o reparație corectă.", "We assess the affected area, define the work and explain the steps needed for a correct repair."],
    ["Ce presupune service-ul pentru anvelope", "What tire service includes"],
    ["Verificăm starea roților și recomandăm lucrările necesare pentru siguranță și rulare uniformă.", "We check wheel condition and recommend the work needed for safety and even driving."],
    ["Ce verificăm la frâne și suspensie", "What we check on brakes and suspension"],
    ["Inspectăm componentele importante pentru siguranță și recomandăm intervențiile necesare.", "We inspect the safety-critical components and recommend the necessary work."],
    ["Ce include serviciul de climă auto?", "What does the car AC service include?"],
    ["Pentru încărcare freon în Oradea, abordarea corectă începe cu verificarea instalației. Reîncărcarea are sens atunci când sistemul poate funcționa în parametri.", "For freon refill in Oradea, the correct approach starts with checking the system. Refilling makes sense when the system can operate within proper parameters."],
    ["Verificarea sistemului de climatizare", "Air conditioning system check"],
    ["Analizăm comportamentul instalației și semnele unei funcționări incorecte.", "We analyze system behavior and signs of incorrect operation."],
    ["Verificarea presiunii", "Pressure check"],
    ["Controlăm presiunea pentru a înțelege dacă sistemul are nevoie de intervenție.", "We check pressure to understand whether the system needs service."],
    ["Încărcare freon", "Freon refill"],
    ["Completăm agentul frigorific atunci când verificările arată că este necesar.", "We top up refrigerant when checks show it is necessary."],
    ["Control funcționare", "Operation check"],
    ["Testăm răcirea și răspunsul sistemului după lucrare.", "We test cooling and system response after the work."],
    ["Recomandări tehnice", "Technical recommendations"],
    ["Îți spunem clar dacă sunt necesare reparații suplimentare.", "We clearly tell you if additional repairs are needed."],
    ["Încărcarea cu freon nu rezolvă orice problemă", "Freon refill does not solve every problem"],
    ["Dacă sistemul pierde freon, este importantă verificarea cauzei. O simplă reîncărcare fără verificare poate fi doar o soluție temporară.", "If the system loses freon, checking the cause is important. A simple refill without inspection may only be a temporary solution."],
    ["Răcire eficientă", "Efficient cooling"],
    ["Confort la condus", "Driving comfort"],
    ["Protecție pentru compresor", "Compressor protection"],
    ["Funcționare corectă a sistemului", "Correct system operation"],
    ["Diagnostic clar înainte de reparații", "Clear diagnostics before repairs"],
    ["Ascultăm simptomele și verificăm funcționarea climei.", "We listen to the symptoms and check AC operation."],
    ["Control presiune și funcționare", "Pressure and operation check"],
    ["Evaluăm presiunea și comportamentul sistemului.", "We evaluate pressure and system behavior."],
    ["Încărcare freon dacă este necesar", "Freon refill if needed"],
    ["Reîncărcăm doar când intervenția este justificată tehnic.", "We refill only when the work is technically justified."],
    ["Test final", "Final test"],
    ["Confirmăm răcirea și comunicăm eventualele recomandări.", "We confirm cooling and communicate any recommendations."],
    ["Cât durează încărcarea cu freon?", "How long does freon refill take?"],
    ["Durata depinde de verificările necesare și de starea instalației, dar lucrarea este de obicei rapidă atunci când sistemul este în stare bună.", "Duration depends on the checks needed and system condition, but the work is usually quick when the system is in good condition."],
    ["De ce nu mai răcește clima auto?", "Why is the car AC no longer cooling?"],
    ["Poate fi vorba despre nivel scăzut de agent frigorific, pierderi, probleme la compresor, senzori, ventilatoare sau alte componente ale instalației.", "It may be low refrigerant, leaks, compressor issues, sensors, fans or other system components."],
    ["Este suficientă doar încărcarea cu freon?", "Is freon refill alone enough?"],
    ["Nu întotdeauna. Dacă există pierderi sau componente defecte, încărcarea fără verificare poate rezolva doar temporar simptomul.", "Not always. If there are leaks or faulty components, refilling without inspection may only temporarily solve the symptom."],
    ["Cât de des trebuie verificată clima auto?", "How often should car AC be checked?"],
    ["Este recomandată o verificare periodică, mai ales înainte de sezonul cald sau când observi scăderea eficienței de răcire.", "Periodic checking is recommended, especially before the warm season or when cooling efficiency drops."],
    ["Pot circula cu clima defectă?", "Can I drive with faulty AC?"],
    ["Da, dar este mai bine să verifici instalația. Unele probleme pot afecta confortul, dezaburirea și durata de viață a compresorului.", "Yes, but it is better to check the system. Some issues can affect comfort, defogging and compressor life."],
    ["Diagnoză auto Oradea", "Auto Diagnostics Oradea"],
    ["Diagnoză auto", "Auto diagnostics"],
    ["Mecanică auto Oradea", "Auto Mechanics Oradea"],
    ["Mecanică auto", "Auto mechanics"],
    ["Electrică auto Oradea", "Auto Electrical Service Oradea"],
    ["Electrică auto", "Auto electrical"],
    ["Încărcare freon Oradea", "Freon Refill Oradea"],
    ["Încărcare freon", "Freon refill"],
    ["Reparații climă auto Oradea", "Car AC Repair Oradea"],
    ["Reparații climă", "AC repairs"],
    ["Verificare injecție Oradea", "Injection System Check Oradea"],
    ["Verificare injecție", "Injection check"],
    ["Tinichigerie și vopsitorie Oradea", "Bodywork and Painting Oradea"],
    ["Tinichigerie și vopsitorie", "Bodywork and painting"],
    ["Service anvelope Oradea", "Tire Service Oradea"],
    ["Service anvelope", "Tire service"],
    ["Frâne și suspensie Oradea", "Brakes and Suspension Oradea"],
    ["Frâne și suspensie", "Brakes and suspension"],
    ["Diagnoză computerizată Oradea", "Computer diagnostics Oradea"],
    ["Verificare auto Oradea", "Vehicle check Oradea"],
    ["Reparații auto Oradea", "Auto repairs Oradea"],
    ["Service auto multimarcă Oradea", "Multi-brand auto service Oradea"],
    ["Reparații electrice auto Oradea", "Auto electrical repairs Oradea"],
    ["Verificare injectoare Oradea", "Injector check Oradea"],
    ["Sistem injecție Oradea", "Injection system Oradea"],
    ["Diesel Point Oradea", "Diesel Point Oradea"],
    ["Sistem injecție diesel Oradea", "Diesel injection system Oradea"],
    ["Tinichigerie vopsitorie Oradea", "Bodywork painting Oradea"],
    ["Reparații caroserie Oradea", "Body repairs Oradea"],
    ["Vopsitorie auto Oradea", "Car painting Oradea"],
    ["Schimb anvelope Oradea", "Tire change Oradea"],
    ["Echilibrare roți Oradea", "Wheel balancing Oradea"],
    ["Diagnoză computerizată și verificări tehnice pentru identificarea problemelor înainte de reparații.", "Computer diagnostics and technical checks to identify problems before repairs."],
    ["Reparații mecanice și întreținere pentru autoturisme, cu explicații clare și lucrări realizate corect.", "Mechanical repairs and maintenance for passenger cars, with clear explanations and properly completed work."],
    ["Verificări și reparații electrice auto pentru sisteme moderne, senzori și probleme de funcționare.", "Auto electrical checks and repairs for modern systems, sensors and operating issues."],
    ["Verificare, întreținere și reparații pentru sistemul de climatizare auto, rapid și profesionist.", "Fast and professional checks, maintenance and repairs for the car air conditioning system."],
    ["Diagnostic și reparații pentru sistemul de climatizare auto, cu verificare tehnică înainte de intervenție.", "Diagnostics and repairs for the car AC system, with technical checks before service."],
    ["Verificări tehnice pentru sistemul de injecție, injectoare și simptome de funcționare neregulată.", "Technical checks for the injection system, injectors and irregular operation symptoms."],
    ["Lucrări de caroserie și vopsitorie auto pentru reparații realizate curat, atent și profesionist.", "Bodywork and car painting for clean, careful and professional repairs."],
    ["Servicii pentru anvelope și roți, cu verificări conexe pentru siguranță și rulare corectă.", "Tire and wheel services with related checks for safety and proper driving."],
    ["Verificări și reparații pentru frâne, suspensie și componente care influențează siguranța la condus.", "Checks and repairs for brakes, suspension and components that affect driving safety."],
    ["Simptome", "Symptoms"],
    ["Explicație", "Explanation"],
    ["Beneficii", "Benefits"],
    ["Proces", "Process"],
    ["Conexe", "Related"],
    ["Întrebări frecvente despre", "Frequently asked questions about"],
    ["Când este utilă diagnoza auto?", "When is auto diagnostics useful?"],
    ["Când să vii la mecanică auto?", "When should you come for mechanical service?"],
    ["Semne de probleme electrice auto", "Signs of auto electrical problems"],
    ["Când ai nevoie de verificarea climei auto?", "When do you need an AC system check?"],
    ["Semne că sistemul de climatizare are nevoie de service", "Signs that the AC system needs service"],
    ["Când pot fi injectoarele cauza?", "When can injectors be the cause?"],
    ["Când este recomandată verificarea injecției?", "When is injection system checking recommended?"],
    ["Când ai nevoie de tinichigerie sau vopsitorie?", "When do you need bodywork or painting?"],
    ["Când să verifici anvelopele?", "When should you check the tires?"],
    ["Semne că frânele sau suspensia au nevoie de verificare", "Signs that brakes or suspension need checking"],
    ["Dacă observi unul dintre aceste semne, este recomandată o verificare tehnică înainte ca problema să se agraveze.", "If you notice any of these signs, a technical check is recommended before the issue gets worse."],
    ["Un service corect înseamnă siguranță, confort și decizii mai bune pentru întreținerea mașinii.", "Proper service means safety, comfort and better decisions for vehicle maintenance."],
    ["Pași simpli, explicați clar, pentru ca programarea la service să fie predictibilă.", "Simple steps, clearly explained, so your workshop visit is predictable."],
    ["Pentru o constatare completă, aceste servicii pot fi relevante în aceeași vizită.", "For a complete inspection, these services may be relevant during the same visit."],
    ["Sună acum sau programează o vizită la service pentru o constatare clară.", "Call now or book a workshop visit for a clear inspection."],
    ["Constatare tehnică", "Technical inspection"],
    ["Identificarea cauzei", "Cause identification"],
    ["Intervenție controlată", "Controlled service work"],
    ["Recomandări clare", "Clear recommendations"],
    ["Verificăm simptomele și componentele relevante pentru", "We check symptoms and relevant components for"],
    ["Căutăm cauza reală înainte de a recomanda intervenții sau înlocuiri.", "We look for the real cause before recommending service work or replacements."],
    ["Executăm lucrarea cu atenție la siguranță, funcționare și calitatea rezultatului.", "We perform the work with attention to safety, function and result quality."],
    ["Îți explicăm ce s-a constatat și ce este recomandat mai departe.", "We explain what was found and what is recommended next."],
    ["Discuție și verificare", "Discussion and check"],
    ["Începem cu simptomele și o verificare pentru", "We start with symptoms and a check for"],
    ["Identificăm componentele sau sistemele care necesită atenție.", "We identify components or systems that need attention."],
    ["Lucrare service", "Service work"],
    ["Realizăm intervenția agreată după explicații clare.", "We perform the agreed work after clear explanations."],
    ["Control final", "Final check"],
    ["Verificăm rezultatul și comunicăm recomandările utile.", "We check the result and communicate useful recommendations."],
    ["Intervenție orientată către funcționare corectă, comunicare clară și rezultat tehnic verificabil.", "Service work focused on correct operation, clear communication and a verifiable technical result."],
    ["Ce include diagnoza auto?", "What does auto diagnostics include?"],
    ["Diagnoza ajută la înțelegerea cauzei reale și la evitarea reparațiilor făcute din presupuneri.", "Diagnostics helps understand the real cause and avoid repairs based on guesswork."],
    ["Cum lucrăm", "How we work"],
    ["Martori aprinși în bord", "Warning lights on the dashboard"],
    ["Motor care funcționează neregulat", "Engine running irregularly"],
    ["Consum crescut", "Increased consumption"],
    ["Pierdere de putere", "Loss of power"],
    ["Pornire dificilă", "Difficult starting"],
    ["Zgomote sau comportament neobișnuit", "Unusual noises or behavior"],
    ["Zgomote la motor sau suspensie", "Engine or suspension noises"],
    ["Vibrații la rulare", "Vibrations while driving"],
    ["Scurgeri de lichide", "Fluid leaks"],
    ["Frânare neuniformă", "Uneven braking"],
    ["Revizie necesară", "Service required"],
    ["Comportament schimbat al mașinii", "Changed vehicle behavior"],
    ["Probleme la pornire", "Starting problems"],
    ["Lumini sau accesorii care funcționează intermitent", "Lights or accessories working intermittently"],
    ["Baterie care se descarcă", "Battery draining"],
    ["Senzori cu erori", "Sensor errors"],
    ["Climă sau ventilatoare cu probleme", "AC or fan problems"],
    ["Răcire slabă", "Weak cooling"],
    ["Miros neplăcut în habitaclu", "Unpleasant cabin smell"],
    ["Zgomote la pornirea climei", "Noises when AC starts"],
    ["Geamuri care se aburesc rapid", "Windows fog up quickly"],
    ["Compresor care pornește intermitent", "Compressor starts intermittently"],
    ["Pierdere repetată de freon", "Repeated freon loss"],
    ["Pornire greoaie", "Hard starting"],
    ["Fum la evacuare", "Exhaust smoke"],
    ["Motor care tremură", "Engine shaking"],
    ["Erori la diagnoză", "Diagnostic errors"],
    ["Lovituri de caroserie", "Body dents"],
    ["Zgârieturi vizibile", "Visible scratches"],
    ["Elemente deformate", "Deformed parts"],
    ["Necesitate revopsire locală", "Local repainting needed"],
    ["Daune după incident", "Damage after an incident"],
    ["Pregătire pentru reparații estetice", "Preparation for cosmetic repairs"],
    ["Uzură neuniformă", "Uneven wear"],
    ["Vibrații la viteză", "Vibrations at speed"],
    ["Presiune care scade", "Dropping pressure"],
    ["Schimb sezonier", "Seasonal change"],
    ["Lovituri în bordură", "Curb impacts"],
    ["Zgomot sau comportament neobișnuit", "Unusual noise or behavior"],
    ["Zgomote la frânare", "Noises while braking"],
    ["Vibrații în volan", "Steering wheel vibrations"],
    ["Mașina se lasă pe o parte", "The car leans to one side"],
    ["Distanță de frânare crescută", "Longer braking distance"],
    ["Bătăi la denivelări", "Knocking over bumps"],
    ["Instabilitate în viraje", "Instability in corners"],
    ["Claritate tehnică", "Technical clarity"],
    ["Reparații recomandate corect", "Correct repair recommendations"],
    ["Protecție pentru motor", "Engine protection"],
    ["Consum mai eficient", "More efficient consumption"],
    ["Experiență Diesel Point", "Diesel Point experience"],
    ["Siguranță mai bună", "Better safety"],
    ["Frânare predictibilă", "Predictable braking"],
    ["Protecție pentru anvelope", "Tire protection"],
    ["Reparații explicate clar", "Clearly explained repairs"],
    ["funcționarea", "operation"],
    ["verificarea", "the check"],
    ["reparația", "the repair"],
    ["reparațiile", "the repairs"],
    ["constatarea", "the inspection"],
    ["evaluarea", "the evaluation"],
    ["diagnoză", "diagnostics"],
    ["mecanică auto", "auto mechanics"],
    ["electrică auto", "auto electrical"],
    ["climă auto", "car AC"],
    ["climatizare", "air conditioning"],
    ["injecție", "injection"],
    ["sistem de injecție", "injection system"],
    ["caroserie", "bodywork"],
    ["__term_anvelope__", "tires"],
    ["frâne și suspensie", "brakes and suspension"],
    ["Este recomandat atunci când observi simptome neobișnuite sau când mașina are nevoie de întreținere preventivă.", "It is recommended when you notice unusual symptoms or when the vehicle needs preventive maintenance."],
    ["Durata depinde de starea mașinii și de complexitatea lucrării. Îți comunicăm estimarea după verificare.", "Duration depends on vehicle condition and work complexity. We provide an estimate after checking."],
    ["Pot veni fără programare?", "Can I come without an appointment?"],
    ["Pentru disponibilitate mai bună, recomandăm să suni înainte sau să soliciți o programare.", "For better availability, we recommend calling first or requesting an appointment."],
    ["Primesc explicații înainte de reparație?", "Will I receive explanations before repair?"],
    ["Da. Comunicarea clară cu clientul este parte importantă din modul nostru de lucru.", "Yes. Clear communication with the customer is an important part of how we work."],
    ["Lucrați pe mai multe mărci auto?", "Do you work on multiple car brands?"],
    ["Da, Motorpext este un service auto multimarcă în Oradea.", "Yes, Motorpext is a multi-brand auto repair workshop in Oradea."],
  ];
  return lang === "hu" ? hu : en;
}

async function writePage(filePath, html) {
  const fullPath = path.join(outDir, filePath);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html, "utf8");
}

const sitemapUrls = [];

for (const lang of languageOrder) {
  currentLang = lang;
  sitemapUrls.push(localizedPath("/", lang));
  await writePage(outputPath("/", lang), homePage());

  for (const service of services) {
    const pathName = `/servicii/${service.slug}/`;
    sitemapUrls.push(localizedPath(pathName, lang));
    await writePage(outputPath(pathName, lang), servicePage(service));
  }

  const privacyPath = "/politica-de-confidentialitate/";
  sitemapUrls.push(localizedPath(privacyPath, lang));
  await writePage(outputPath(privacyPath, lang), privacyPage());
}

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
