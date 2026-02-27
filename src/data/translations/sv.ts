// sv.ts
// src/data/translations/sv.ts
import { sv_skills_list } from './sections/skills.sv';
export const sv = {


  // Navigation
  'nav.intro.title': 'UX designer & utvecklare',
  'nav.hero.title': 'Hem',
  'nav.hero.preview': 'Välkommen till min portfolio. Börja din resa här.',
  'nav.hero.short': 'Hem',

  'nav.skills.title': 'Kompetenser',
  'nav.skills.preview': 'Utforska 100+ teknologier, ramverk och verktyg jag behärskar.',
  'nav.skills.short': 'Skills',

  'nav.somnlogg.title': 'Somnlogg',
  'nav.somnlogg.preview': 'Sömnloggning UX-fallstudie med interaktiva prototyper.',
  'nav.somnlogg.short': 'Arbete',

  'nav.education.title': 'Utbildning',
  'nav.education.preview': 'Akademisk bakgrund med tidslinje och kompetenskopplingar.',
  'nav.education.short': 'Utbildning',

  'nav.qna.title': 'Frågor & Svar',
  'nav.qna.preview': 'Vanliga frågor med smart kategorisering.',
  'nav.qna.short': 'Q&A',

  'nav.youAreHere': 'Du är här',
  'nav.openMenu': 'Öppna navigationsmeny',
  'nav.close': 'Stäng',

  // Add more translations as needed
  // Example for sections content:
  // 'hero.welcome': 'Välkommen',
  // 'hero.subtitle': 'Din resa börjar här',
  // 'skills.heading': 'Mina kompetenser',
  // etc...



  // src/data/translations/sv.ts
    nav: {
      intro: {
        title: 'UX designer & utvecklare'
      },
      hero: {
        title: 'Hem',
        preview: 'Välkommen till min portfolio. Börja din resa här.',
        short: 'Hem'
      },
      skills: {
        title: 'Kompetenser',
        preview: 'Utforska 100+ teknologier, ramverk och verktyg jag behärskar.',
        short: 'Skills'
      },
      somnlogg: {
        title: 'Somnlogg',
        preview: 'Sömnloggning UX-fallstudie med interaktiva prototyper.',
        short: 'Arbete'
      },
      education: {
        title: 'Utbildning',
        preview: 'Akademisk bakgrund med tidslinje och kompetenskopplingar.',
        short: 'Utbildning'
      },
      qna: {
        title: 'Frågor & Svar',
        preview: 'Vanliga frågor med smart kategorisering.',
        short: 'Q&A'
      },
      youAreHere: 'Du är här',
      openMenu: 'Öppna navigationsmeny',
      close: 'Stäng'
    },









    heroSection: {
      title1a: 'ux designer',
      title1b: '& utvecklare',
      subtitle:'...kärnklyvning av komplexitet'
    },




  // src/data/translations/sv.ts
skills: {
  title: 'färdigheter & teknik',
  subtitle: 'upptäck kompetenser genom intuitiv utforskning',

  // Search and filters
  search: {
    placeholder: 'Sök färdigheter, kategorier eller nyckelord...',
    results: {
      zero: "Null resultat just nu, prova alternativet 'Alla' i menyn nedan och sök igen",
      one: '{count} resultat hittades',
      other: '{count} resultat hittades'
    },
    noResults: "Inga färdigheter matchar din sökning. Prova andra nyckelord. Se till att även söka i 'Alla' i menyn ovan."
  },

  // View modes
  viewModes: {
    grid: 'Rutnät',
    compact: 'Lista',
    detailed: 'Kort'
  },

  // Categories
  categories: {
    all: 'Alla',
    uxui: 'UX/UI',
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobil',
    tools: 'Verktyg',
    soft: 'Mjuka färdigheter',
    ai: 'AI (pågående)'
  },

  // Skill counter
  counter: {
    showing: '{visible} av {total}',
    remaining: {
      zero: 'Inga fler färdigheter',
      one: 'Upptäck {count} färdighet till...',
      other: 'Upptäck {count} färdigheter till...'
    }
  },

  // Proficiency
  proficiency: 'Kompetens',

  // Actions
  loadMore: 'Upptäck fler färdigheter...',
  clearSearch: 'Rensa sökning',


  list: sv_skills_list












},




//Collection
sectionLabel: {
  collection: 'samling'
},



//education: {
//  title: 'utbildningsresa',
//  subtitle: 'En omfattande sammanställning av min läroresa, kompetensutveckling och akademiska prestationer från olika institutioner och plattformar.'
//},
qasection: {
  title: 'paus',
  subtitle: 'paus'
},


// ============================================================
// LÄGG TILL DETTA BLOCK INUTI sv = { ... } i sv.ts
// Ersätt eller komplettera befintlig "education" nyckel
// ============================================================

education: {
    title: 'utbildningsresa',
    subtitle: 'En omfattande sammanställning av min läroresa, kompetensutveckling och akademiska prestationer från olika institutioner och plattformar.',

    // Faser (generiska)
    phases: {
      foundation: 'Grundår',
      specialization: 'Specialisering',
      intensive: 'Intensivprogram',
      backend: 'Backendfokus',
      core: 'Kärnprinciper',
      programming: 'Programmering',
      design: 'Design',
      security: 'Säkerhetsfokus',
    },

    // Per institution
    BTH: {
      degree: 'Visuell design, produkthantering & mobilutveckling — kurser i gränssnittsprogrammering, kravhantering för digitala produkter samt plattformsoberoende appar med React Native.',
      phase1: 'Grundår',
      phase2: 'Specialisering',
      narrative: 'Koppling av teknik och design genom innovativ problemlösning och användarcentrerade arbetssätt.',
    },
    HB: {
      degree: 'UX & informationsdesign — fördjupning i interaktionsdesign, front-end, grafisk informationsdesign, content management, informationspolitik och projektarbete inom UX-design.',
      phase1: 'Intensivprogram',
      narrative: 'Mästare i människo-centrerade designmetoder för komplex problemlösning.',
    },
    HiG: {
      degree: 'Objektorienterad programmering i Java — grundläggande och tillämpad programmering med fokus på algoritmer, datastrukturer och mjukvaruutveckling.',
      phase1: 'Backendfokus',
      narrative: 'Byggt en stabil grund inom objektorienterad programmering och mjukvaruarkitektur.',
    },
    Hkr: {
      degree: 'Digital UX & webbutveckling — design av digitala upplevelser, JavaScript-programmering, datasäkerhet och spelutveckling för Android.',
      phase1: 'Kärn-UX-principer',
      narrative: 'Fördjupad förståelse för användarpsykologi och inkluderande designprinciper.',
    },
    KAU: {
      degree: 'Tillämpad programmering & mjukvarukvalitet — kurser i tillämpad programmering, mjukvarutestning och integritetsteknik med fokus på hållbar kod.',
      phase1: 'Programmering',
      narrative: 'Tillämpat industristandard för programmeringsmetoder och testdriven utveckling.',
    },
    KTH: {
      degree: 'Medieteknik & generativ AI — kurs i generativ AI för medieteknik och interaktionsdesign, med fokus på AI-verktyg inom kreativa och interaktiva medier.',
      phase1: 'Intensivprogram',
      narrative: 'Utforskning av AI:s roll i framtidens interaktionsdesign och medieproduktion.',
    },
    LIU: {
      degree: 'AI & datasäkerhet — introduktionskurser i artificiell intelligens och datasäkerhet med koppling till digital design och etik.',
      phase1: 'Säkerhetsfokus',
      narrative: 'Grundläggande förståelse för säkerhetsperspektiv och AI inom digitala system.',
    },
    Lnu: {
      degree: 'Multimediedesign & apputveckling — systemtänkande, multimediedesign och produktion samt apputveckling med Flutter för mobilplattformar.',
      phase1: 'Design',
      narrative: 'Fördjupning i systemorienterat tänkande och multimedial gestaltning.',
    },
    Ltu: {
      degree: 'Speldesign, Java & kunskapshantering — kurser i speldesign, datorspelsproduktion, Java-programmering, knowledge management och databaser.',
      phase1: 'Design & teknologi',
      narrative: 'Bred teknisk och kreativ grund inom spel, programmering och informationshantering.',
    },
    MAU: {
      degree: 'C#-programmering & digital innovation — programmering med C# samt digital innovation och entreprenörskap inom teknikdrivna miljöer.',
      phase1: 'Design',
      narrative: 'Kombination av objektorienterad programmering och innovativt tänkande.',
    },
    MIUN: {
      degree: 'XML, datavetenskap & innovativa digitala lösningar — kurser i datavetenskap med XML-fokus samt informatik med inriktning mot innovativa digitala lösningar.',
      phase1: 'Design',
      narrative: 'Förståelse för datastrukturering och digitala innovationsprocesser.',
    },
    SH: {
      degree: 'Mediedesign, interaktionsdesign & människa-dator-interaktion — bred utbildning inom grafisk design, webbproduktion, interaktionsdesign, MDI, digital illustration och multimodal gestaltning.',
      phase1: 'Design',
      narrative: 'Mångsidig kompetens i digitalt skapande från visuell identitet till interaktiva system.',
    },
    UU: {
      degree: 'Systemprogrammering i C++ — introduktionskurs i datorer och programmering med C++, med fokus på minnehantering och lågnivåprogrammering.',
      phase1: 'Programmering',
      narrative: 'Inblick i systemnära programmering och datorarkitektur.',
    },
  },

// QnA
qna: {
  title: 'utforska synergier',
  subtitle: 'välj vad som är viktigast',
  readTime: 'min läsning',
  relatedQuestions: 'du kanske också vill veta',
  pathLabel: {
    work: 'Arbetssätt',
    journey: 'Läranderesa',
    location: 'Plats',
    offer: 'Erbjudande',
    start: 'Komma igång',
    collaboration: 'Samarbete',
    value: 'Värde',
  },
  askMore: 'Nå mig',
  askMoreCta: 'använd mitt ursprungliga mejl - eller boka en tid, 10-15 min samtal',
  today: 'idag,',
  timeOfDay: {
    morning:   'förmiddag',
    afternoon: 'eftermiddag',
    evening:   'kväll',
  },
  days: {
    0: 'söndag', 1: 'måndag', 2: 'tisdag',  3: 'onsdag',
    4: 'torsdag', 5: 'fredag', 6: 'lördag',
  },
  progress: 'utforskade',
  summary: {
    title: 'Baserat på vad du har utforskat',
    intro: 'Här är vad som sticker ut',
    close: 'Stäng',
  },
  paths: {
    work: { title: 'Arbetssätt' },
    journey: { title: 'Min läranderesa' },
    location: { title: 'Plats & Distans' },
    offer: { title: 'Vad jag erbjuder' },
    start: { title: 'Komma igång' },
    collaboration: { title: 'Samarbetsstil' },
    value: { title: 'Värde' },
  },
},

};