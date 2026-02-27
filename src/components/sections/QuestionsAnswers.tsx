import React, { useState, useRef, useEffect, FC } from 'react';
import { MessageCircle, Briefcase, GraduationCap, Globe, Target, Zap, ChevronDown, Clock, ArrowRight, Sparkles, LucideIcon } from 'lucide-react';

// ============================================
// 📦 TYPE DEFINITIONS
// ============================================

interface PathConfig {
  id: string;
  icon: LucideIcon;
  color: string;
}

interface QnAItem {
  q: string;
  a: string;
  readTime: number;
  related: string[];
}

interface Translations {
  [key: string]: string;
}

interface QnAContent {
  [language: string]: {
    [pathId: string]: QnAItem[];
  };
}

interface SummaryHighlights {
  [language: string]: {
    [pathId: string]: string;
  };
}

interface LanguageSwitcherProps {
  language: string;
  setLanguage: (lang: string) => void;
}

interface StickyNavProps {
  paths: PathConfig[];
  activePath: string;
  onPathChange: (pathId: string) => void;
  t: (key: string) => string;
  isSticky: boolean;
  pathProgress: Record<string, number>;
}

interface QnAItemProps {
  question: string;
  answer: string;
  readTime: number;
  related: string[];
  index: number;
  isVisible: boolean;
  isPinned: boolean;
  onTogglePin: () => void;
  isExpanded: boolean;
  onToggle: () => void;
  onRelatedClick: (relatedId: string) => void;
  t: (key: string) => string;
  pathId: string;
  isFocused: boolean;
}

interface AskMoreCTAProps {
  t: (key: string) => string;
  isVisible: boolean;
}

interface SummaryCardProps {
  exploredPaths: string[];
  t: (key: string) => string;
  onClose: () => void;
  language: string;
}

// ============================================
// 📦 DATA LAYER - Easy to edit and expand
// ============================================

// Path configuration - Add new paths here
const pathConfig: PathConfig[] = [
  { id: 'work', icon: Briefcase, color: '#FF6B6B' },
  { id: 'journey', icon: GraduationCap, color: '#4ECDC4' },
  { id: 'location', icon: Globe, color: '#45B7D1' },
  { id: 'offer', icon: Target, color: '#96CEB4' },
  { id: 'start', icon: Zap, color: '#FFEAA7' },
  { id: 'collaboration', icon: MessageCircle, color: '#A78BFA' },
  { id: 'value', icon: Sparkles, color: '#F472B6' }
];

const translations: { [key: string]: Translations } = {
  sv: {
    'qna.title': 'Låt oss prata samarbete',
    'qna.subtitle': 'Välj vad som är viktigast för dig',
    'qna.readTime': 'min läsning',
    'qna.relatedQuestions': 'Du kanske också vill veta',
    'qna.pathLabel.work': 'Arbetssätt',
    'qna.pathLabel.journey': 'Läranderesa',
    'qna.pathLabel.location': 'Plats',
    'qna.pathLabel.offer': 'Erbjudande',
    'qna.pathLabel.start': 'Komma igång',
    'qna.pathLabel.collaboration': 'Samarbete',
    'qna.pathLabel.value': 'Värde',
    'qna.askMore': 'Har du fler frågor?',
    'qna.askMoreCta': 'Låt oss prata',
    'qna.progress': 'utforskade',
    'qna.summary.title': 'Baserat på vad du har utforskat',
    'qna.summary.intro': 'Här är vad som sticker ut',
    'qna.summary.close': 'Stäng',
    'qna.paths.work.title': 'Arbetssätt',
    'qna.paths.journey.title': 'Min läranderesa',
    'qna.paths.location.title': 'Plats & Distans',
    'qna.paths.offer.title': 'Vad jag erbjuder',
    'qna.paths.start.title': 'Komma igång',
    'qna.paths.collaboration.title': 'Samarbetsstil',
    'qna.paths.value.title': 'Värde',
  },
  eu: {
    'qna.title': "Let's talk collaboration",
    'qna.subtitle': 'Choose what matters most to you',
    'qna.readTime': 'min read',
    'qna.relatedQuestions': 'You might also want to know',
    'qna.askMore': 'Have more questions?',
    'qna.askMoreCta': "Let's talk",
    'qna.progress': 'explored',
    'qna.summary.title': 'Based on what you explored',
    'qna.summary.intro': "Here's what stands out",
    'qna.summary.close': 'Close',
    'qna.paths.work.title': 'Work Arrangements',
    'qna.paths.journey.title': 'My Learning Journey',
    'qna.paths.location.title': 'Location & Remote',
    'qna.paths.offer.title': 'What I Offer',
    'qna.paths.start.title': 'Getting Started',
    'qna.pathLabel.work': 'Work',
    'qna.pathLabel.journey': 'Journey',
    'qna.pathLabel.location': 'Location',
    'qna.pathLabel.offer': 'Offer',
    'qna.pathLabel.start': 'Start',
    'qna.pathLabel.collaboration': 'Collaboration',
    'qna.pathLabel.value': 'Value',
    'qna.paths.collaboration.title': 'Collaboration Style',
    'qna.paths.value.title': 'Value',
  },
  cas: {
    'qna.title': 'Hablemos de colaboración',
    'qna.subtitle': 'Elige lo que más te importa',
    'qna.readTime': 'min de lectura',
    'qna.relatedQuestions': 'También podrías querer saber',
    'qna.askMore': '¿Tienes más preguntas?',
    'qna.askMoreCta': 'Hablemos',
    'qna.progress': 'explorado',
    'qna.summary.title': 'Basado en lo que exploraste',
    'qna.summary.intro': 'Esto es lo que destaca',
    'qna.summary.close': 'Cerrar',
    'qna.paths.work.title': 'Modalidades de trabajo',
    'qna.paths.journey.title': 'Mi viaje de aprendizaje',
    'qna.paths.location.title': 'Ubicación y Remoto',
    'qna.paths.offer.title': 'Lo que ofrezco',
    'qna.paths.start.title': 'Primeros pasos',
    'qna.pathLabel.work': 'Trabajo',
    'qna.pathLabel.journey': 'Viaje',
    'qna.pathLabel.location': 'Ubicación',
    'qna.pathLabel.offer': 'Oferta',
    'qna.pathLabel.start': 'Inicio',
    'qna.pathLabel.collaboration': 'Colaboración',
    'qna.pathLabel.value': 'Valor',
    'qna.paths.collaboration.title': 'Estilo de colaboración',
    'qna.paths.value.title': 'Valor',
  }
};

// Q&A Content - Import this from external file in real app
const qnaContent = {
  sv: {
    work: [
      {
        q: 'Hur flexibel är din arbetstid?',
        a: 'Jag är för närvarande öppen för 50% tjänst med möjlighet att skala upp till 75-100% beroende på projektets behov och min studiebelastning. Från och med våren 2026 kan jag arbeta 100%. Jag är också öppen för timbaserat, projekt- eller retainer-arbete, det vill säga löpande samarbete.',
        readTime: 2,
        related: ['work-1', 'start-0', 'collaboration-0', 'value-1']
      },
      {
        q: 'Föredrar du distansarbete?',
        a: 'Ja, distansarbete är min primära preferens. Det är både hälsosamt och hållbart för mig - mindre stress, mer fokuserad arbetstid. Jag är baserad i Stockholm och kan resa vid behov i framtiden.',
        readTime: 1,
        related: ['location-0', 'work-2', 'collaboration-0', 'collaboration-6']
      },
      {
        q: 'Vilka typer av uppdrag söker du?',
        a: 'Jag är öppen för olika typer: timpris, projektbaserat, retainer eller deltid/heltid anställning. Jag värdesätter flexibilitet och kan anpassa mig efter företagets behov.',
        readTime: 1,
        related: ['offer-0', 'start-1', 'value-4']
      }
    ],
    journey: [
      {
        q: 'Har du några pågående examina?',
        a: 'Ja! Jag arbetar för närvarande mot två examina: Medieteknik och Informationsdesign (arkitektur och utveckling). Dessa kommer att formalisera mina många års studier inom datavetenskap, design och utveckling.',
        readTime: 2,
        related: ['journey-1', 'journey-2', 'value-2', 'value-6']
      },
      {
        q: 'Varför har du inga formella examensbevis trots 12 års studier?',
        a: 'Jag har studerat i över 12 år på universitetsnivå och fortsätter fortfarande. Jag har 7 års fullständiga högskolepoäng inom olika discipliner som UX, UI, programmering och mjukvarudesign. De återstående åren spenderades i djupinlärningsfaser där jag prioriterade behärskning över poängsamling. När jag förstod ett koncept gick jag vidare för att lära mig mer, istället för att slutföra repetitivt kursarbete. Denna metod gav mig både bredd och djup, men färre certifikat.',
        readTime: 3,
        related: ['journey-3', 'offer-2', 'value-2', 'value-6']
      },
      {
        q: 'Vilka är dina huvudsakliga kompetensområden?',
        a: 'Jag är en generalist med djup kunskap inom många områden: UX/UI-design, frontend-utveckling (React, TypeScript, Next.js), backend-utveckling (Node.js, Python), och projektledning. Min styrka ligger i att överbrygga design och utveckling samt snabbt lära mig nya teknologier.',
        readTime: 2,
        related: ['offer-0', 'journey-3', 'collaboration-4', 'value-5']
      },
      {
        q: 'Hur ser du på din breda kompetens?',
        a: 'Som generalist kan jag bidra till olika faser av produktutveckling - från användarforskning till implementation. Denna mångsidighet gör mig värdefull i tvärfunktionella team och när projekt behöver någon som kan "tala båda språken" mellan design och utveckling.',
        readTime: 2,
        related: ['offer-1', 'offer-2', 'value-5', 'collaboration-4']
      }
    ],
    location: [
      {
        q: 'Var är du baserad?',
        a: 'Jag bor i Stockholm, Sverige. Distansarbete är min primära preferens, men jag kan resa vid behov i framtiden.',
        readTime: 1,
        related: ['work-1', 'location-1', 'collaboration-6']
      },
      {
        q: 'Kan du arbeta i olika tidszoner?',
        a: 'Ja, jag är flexibel med arbetstider och kan anpassa mig efter internationella teams behov.',
        readTime: 1,
        related: ['work-0', 'start-1', 'collaboration-5']
      }
    ],
    offer: [
      {
        q: 'Kan du arbeta med endast en del av ett projekt?',
        a: 'Absolut! Jag kan fokusera på specifika delar som: endast UX-research och design, endast frontend-utveckling, endast backend-arbete, eller undervisa/mentora team i specifika teknologier.',
        readTime: 2,
        related: ['offer-1', 'journey-2', 'collaboration-4', 'value-5']
      },
      {
        q: 'Kan du undervisa eller mentora?',
        a: 'Ja! Min omfattande lärandeerfarenhet har lärt mig mycket om hur människor lär sig. Jag kan hålla kurser, workshops, seminarier eller mentorskap inom UX/UI, frontend-utveckling och problemlösning.',
        readTime: 2,
        related: ['journey-3', 'start-0', 'collaboration-1', 'value-7']
      },
      {
        q: 'Vad är din största styrka?',
        a: 'Min förmåga att snabbt lära mig och anpassa mig till nya teknologier och sammanhang. Som generalist kan jag se helheten samtidigt som jag kan dyka djupt in i detaljer när det behövs.',
        readTime: 2,
        related: ['journey-1', 'journey-3', 'value-2', 'value-5']
      }
    ],
    start: [
      {
        q: 'Hur börjar vi samarbeta?',
        a: 'Det enklaste är att kontakta mig direkt. Vi kan börja med ett kort samtal för att diskutera dina behov och se om jag passar för projektet eller rollen.',
        readTime: 1,
        related: ['start-1', 'work-0', 'collaboration-0', 'value-1']
      },
      {
        q: 'Hur ser din arbetsprocess ut?',
        a: 'Jag arbetar agilt och användarcentrerat. Jag börjar alltid med att förstå problemet och användarbehoven, sedan itererar jag snabbt med tät kommunikation. Transparens och samarbete är centralt i min arbetsprocess.',
        readTime: 2,
        related: ['offer-0', 'work-2', 'collaboration-1', 'collaboration-2']
      }
    ],
    collaboration: [
      {
        q: 'Hur kommunicerar du under projekt?',
        a: 'Första kontakten sker via email med 2-timmars svarstid. När jag väl arbetar är jag nåbar inom minuter under överenskomna tider. Jag använder Zoom/video för möten och anpassar mig till teamets verktyg (Slack, Teams, etc.). Distansarbete kräver extra kommunikationsinsats - jag tar det på allvar och är proaktiv.',
        readTime: 2,
        related: ['work-1', 'start-0', 'collaboration-1', 'value-6']
      },
      {
        q: 'Hur ofta ger du uppdateringar?',
        a: 'Så ofta som behövs - dagligen, veckovis eller enligt överenskommelse. Jag tror på transparens och proaktiv kommunikation. Du kommer aldrig undra "vad gör han?". Jag dokumenterar framsteg och delar regelbundet, vilket är extra viktigt vid distansarbete.',
        readTime: 1,
        related: ['collaboration-0', 'work-2', 'start-1', 'value-1']
      },
      {
        q: 'Hur hanterar du feedback och revisioner?',
        a: 'Feedback är essentiell för användarcentrerat arbete. Jag ser revisioner som en del av den iterativa processen, inte som kritik. Min designbakgrund har lärt mig att första versionen sällan är slutversionen - det är hälsosamt. Jag ställer förtydligande frågor för att förstå "varför" bakom feedbacken.',
        readTime: 2,
        related: ['offer-1', 'journey-2', 'collaboration-3', 'value-5']
      },
      {
        q: 'Hur hanterar du konflikter eller oenigheter?',
        a: 'Först: förstå grundorsaken. Ofta är "konflikter" egentligen missförstånd eller olika prioriteringar. Jag söker förstå alla perspektiv, hitta gemensam grund och föreslå alternativ. Målet är ömsesidig överenskommelse och kompromiss som tjänar projektet och användarna.',
        readTime: 2,
        related: ['collaboration-1', 'work-0', 'collaboration-0', 'value-3']
      },
      {
        q: 'Arbetar du bättre i team eller solo?',
        a: 'Både och. Jag är mycket självgående och kan arbeta självständigt med regelbundna uppdateringar. Samtidigt trivs jag i teamarbete - särskilt tvärfunktionella team där jag kan bidra med både design- och utvecklingsperspektiv. Jag anpassar mig efter projektets behov.',
        readTime: 2,
        related: ['work-2', 'journey-3', 'offer-1', 'value-4']
      },
      {
        q: 'Vilka mötesformer föredrar du?',
        a: 'För distansarbete: strukturerade videomöten med tydlig agenda. Jag uppskattar också asynkron kommunikation (skriftlig dokumentation, Loom-videos) för att respektera olika tidszoner och arbetsflöden. Spontana check-ins via chat fungerar också bra för snabba frågor.',
        readTime: 2,
        related: ['location-1', 'collaboration-1', 'work-1', 'value-4']
      },
      {
        q: 'Hur säkerställer du god kommunikation på distans?',
        a: 'Genom att vara extra tydlig i skrift, dokumentera beslut, använda visuella hjälpmedel (skärmdelningstips, annoterade screenshots), och aldrig anta att något är "uppenbart". Jag tar initiativ till kommunikation istället för att vänta på att andra ska fråga. Överkommunikation är bättre än underkommunikation på distans.',
        readTime: 3,
        related: ['work-1', 'collaboration-0', 'location-0', 'value-6']
      }
    ],
    value: [
      {
        q: 'Varför ska vi välja dig framför andra utvecklare?',
        a: 'Ärligt svar: Jag kommer med fräscht perspektiv utan dåliga vanor, djup teoretisk kunskap med praktisk tillämpning, och genuint nyfikenhet på att lösa problem. Jag kanske saknar traditionell erfarenhet, men jag erbjuder dedikation, snabb inlärning och ett design-först-tänkande. Jag är också högt motiverad - detta är min ingång till yrkeslivet.',
        readTime: 3,
        related: ['journey-3', 'offer-2', 'value-2', 'collaboration-0']
      },
      {
        q: 'Vad kan du leverera under första veckan?',
        a: 'Vecka 1 handlar om lärande: förstå er företagskultur, tech stack, nuvarande utmaningar och hur jag bäst kan bidra. Jag kommer ställa många frågor, läsa dokumentation och börja med små uppgifter för att bekanta mig med era arbetsflöden. Att sätta en stark grund är viktigare än att stressa fram något.',
        readTime: 2,
        related: ['start-0', 'collaboration-0', 'value-3', 'work-0']
      },
      {
        q: 'Vad gör dig annorlunda?',
        a: 'Min okonventionella väg. 12 års studier betyder att jag förstår grunder djupt, inte bara ytliga ramverk. Jag överbryggar design och utveckling naturligt. Och jag är genuint exalterad över att tillämpa min kunskap professionellt - den energin är värdefull. Jag ser varje projekt som en möjlighet att lära och växa.',
        readTime: 2,
        related: ['journey-1', 'offer-2', 'value-0', 'collaboration-2']
      },
      {
        q: 'Hur mäter du framgång?',
        a: 'Användarnöjdhet, projektmål uppfyllda, kodens underhållbarhet och teamsamarbete. Framgång är inte bara "funktion levererad" - det är "löste vi rätt problem på ett hållbart sätt?". Jag tänker holistiskt och värderar långsiktig kvalitet över kortsiktiga genvägar.',
        readTime: 2,
        related: ['offer-1', 'work-0', 'journey-2', 'collaboration-3']
      },
      {
        q: 'Vilken typ av projekt passar dig bäst?',
        a: 'Projekt där design och användarupplevelse är prioriterade, där man värderar genomtänkta lösningar över snabba fix. Jag trivs med tvärfunktionella team där jag kan bidra till flera faser. Särskilt lämplig för MVP-utveckling, designsystem-uppbyggnad eller när man behöver "översätta" mellan designers och utvecklare.',
        readTime: 3,
        related: ['offer-0', 'journey-3', 'work-2', 'collaboration-4']
      },
      {
        q: 'Vad är din största styrka?',
        a: 'Jag är utmärkt på att lära snabbt och koppla ihop kunskap från olika discipliner. Min generalistbakgrund gör att jag kan bidra till flera faser - från UX-research till frontend-implementation. Jag har också genuin nyfikenhet och inget ego om att "min väg" är den enda vägen. Varje projekt lär mig något nytt.',
        readTime: 2,
        related: ['journey-3', 'collaboration-2', 'offer-2', 'value-2']
      },
      {
        q: 'Hur hanterar du att inte ha traditionell arbetslivserfarenhet?',
        a: 'Jag ser det som en styrka och en utmaning. Styrka: inga dåliga vanor, öppen för att lära "era sätt", fräscht perspektiv. Utmaning: jag behöver stöd initialt för att förstå arbetslivskulturen. Jag kompenserar genom att vara extra lyhörd, ställa frågor och ta initiativ. Min akademiska disciplin översätts till professionell noggrannhet.',
        readTime: 3,
        related: ['journey-1', 'value-0', 'start-1', 'collaboration-0']
      },
      {
        q: 'Vad motiverar dig i ditt arbete?',
        a: 'Att lösa verkliga problem för riktiga användare. Efter år av teori är jag redo att se min kunskap skapa värde i praktiken. Jag drivs av nyfikenhet, önskan att ständigt lära och känslan av att bidra till något meningsfullt. Att bygga produkter som förbättrar människors vardag är min största motivation.',
        readTime: 2,
        related: ['journey-0', 'offer-1', 'value-3', 'collaboration-1']
      }
    ]
  },
  eu: {
    work: [
      {
        q: 'How flexible is your work schedule?',
        a: "I'm currently open to 50% positions with the possibility to scale up to 75-100% depending on the project's needs and my study workload. From spring 2026 onwards, I can work 100%. I'm also open to hourly, project-based, or retainer work.",
        readTime: 2,
        related: ['work-1', 'start-0', 'collaboration-0', 'value-1']
      },
      {
        q: 'Do you prefer remote work?',
        a: "Yes, remote work is my primary preference. It's both healthy and sustainable for me - less stress, more focused work time. I'm based in Stockholm and can travel as needed in the future.",
        readTime: 1,
        related: ['location-0', 'work-2', 'collaboration-0', 'collaboration-6']
      },
      {
        q: 'What types of engagements are you looking for?',
        a: "I'm open to various types: hourly rates, project-based, retainer, or part-time/full-time employment. I value flexibility and can adapt to the company's needs.",
        readTime: 1,
        related: ['offer-0', 'start-1', 'value-4']
      }
    ],
    journey: [
      {
        q: 'Do you have any degrees in progress?',
        a: "Yes! I'm currently working toward two degrees: Media Technology and Information Design (architecture and development). These will formalize my many years of study in computer science, design, and development.",
        readTime: 2,
        related: ['journey-1', 'journey-2', 'value-2', 'value-6']
      },
      {
        q: 'Why do you not have formal degree certificates despite 12 years of study?',
        a: "I've studied for over 12 years at university level and am still continuing. I have 7 years of completed university credits across various disciplines like UX, UI, programming, and software design. The remaining years were spent in deep learning phases where I prioritized mastery over credit collection. When I understood a concept, I moved forward to learn more, rather than completing repetitive coursework. This approach gave me both breadth and depth, but fewer certificates.",
        readTime: 3,
        related: ['journey-3', 'offer-2', 'value-2', 'value-6']
      },
      {
        q: 'What are your main areas of expertise?',
        a: "I'm a generalist with deep knowledge in many areas: UX/UI design, frontend development (React, TypeScript, Next.js), backend development (Node.js, Python), and project management. My strength lies in bridging design and development, as well as quickly learning new technologies.",
        readTime: 2,
        related: ['offer-0', 'journey-3', 'collaboration-4', 'value-5']
      },
      {
        q: 'How do you view your broad competence?',
        a: 'As a generalist, I can contribute to different phases of product development - from user research to implementation. This versatility makes me valuable in cross-functional teams and when projects need someone who can "speak both languages" between design and development.',
        readTime: 2,
        related: ['offer-1', 'offer-2', 'value-5', 'collaboration-4']
      }
    ],
    location: [
      {
        q: 'Where are you based?',
        a: "I live in Stockholm, Sweden. Remote work is my primary preference, but I can travel as needed in the future.",
        readTime: 1,
        related: ['work-1', 'location-1', 'collaboration-6']
      },
      {
        q: 'Can you work across different time zones?',
        a: "Yes, I'm flexible with work hours and can adapt to international teams' needs.",
        readTime: 1,
        related: ['work-0', 'start-1', 'collaboration-5']
      }
    ],
    offer: [
      {
        q: 'Can you work on just part of a project?',
        a: 'Absolutely! I can focus on specific parts such as: UX research and design only, frontend development only, backend work only, or teaching/mentoring teams in specific technologies.',
        readTime: 2,
        related: ['offer-1', 'journey-2', 'collaboration-4', 'value-5']
      },
      {
        q: 'Can you teach or mentor?',
        a: 'Yes! My extensive learning experience has taught me a lot about how people learn. I can deliver courses, workshops, seminars, or mentorship in UX/UI, frontend development, and problem-solving.',
        readTime: 2,
        related: ['journey-3', 'start-0', 'collaboration-1', 'value-7']
      },
      {
        q: 'What is your greatest strength?',
        a: 'My ability to quickly learn and adapt to new technologies and contexts. As a generalist, I can see the big picture while being able to dive deep into details when needed.',
        readTime: 2,
        related: ['journey-1', 'journey-3', 'value-2', 'value-5']
      }
    ],
    start: [
      {
        q: 'How do we start collaborating?',
        a: "The easiest way is to contact me directly. We can start with a short conversation to discuss your needs and see if I'm a good fit for the project or role.",
        readTime: 1,
        related: ['start-1', 'work-0', 'collaboration-0', 'value-1']
      },
      {
        q: 'What does your work process look like?',
        a: 'I work in an agile and user-centered way. I always start by understanding the problem and user needs, then iterate quickly with close communication. Transparency and collaboration are central to my work process.',
        readTime: 2,
        related: ['offer-0', 'work-2', 'collaboration-1', 'collaboration-2']
      }
    ],
    collaboration: [
      {
        q: 'How do you communicate during projects?',
        a: 'First contact via email with 2-hour response time. Once working, I\'m reachable within minutes during agreed hours. I use Zoom/video for meetings and adapt to the team\'s tools (Slack, Teams, etc.). Remote work requires extra communication effort - I take that seriously and am proactive.',
        readTime: 2,
        related: ['work-1', 'start-0', 'collaboration-1', 'value-6']
      },
      {
        q: 'How often do you give updates?',
        a: 'As often as needed - daily, weekly, or as agreed. I believe in transparency and proactive communication. You\'ll never wonder "what is he doing?". I document progress and share regularly, which is especially important in remote work.',
        readTime: 1,
        related: ['collaboration-0', 'work-2', 'start-1', 'value-1']
      },
      {
        q: 'How do you handle feedback and revisions?',
        a: 'Feedback is essential for user-centered work. I see revisions as part of the iterative process, not criticism. My design background taught me that the first version is rarely the final version - that\'s healthy. I ask clarifying questions to understand the "why" behind feedback.',
        readTime: 2,
        related: ['offer-1', 'journey-2', 'collaboration-3', 'value-5']
      },
      {
        q: 'How do you handle conflicts or disagreements?',
        a: 'First: understand the root cause. Often "conflicts" are actually miscommunication or different priorities. I seek to understand all perspectives, find common ground, and propose alternatives. The goal is mutual agreement and compromise that serves the project and users.',
        readTime: 2,
        related: ['collaboration-1', 'work-0', 'collaboration-0', 'value-3']
      },
      {
        q: 'Do you work better in teams or solo?',
        a: 'Both. I\'m very self-directed and can work independently with regular updates. At the same time, I thrive in teamwork - especially cross-functional teams where I can contribute both design and development perspectives. I adapt to the project\'s needs.',
        readTime: 2,
        related: ['work-2', 'journey-3', 'offer-1', 'value-4']
      },
      {
        q: 'What meeting formats do you prefer?',
        a: 'For remote work: structured video meetings with clear agendas. I also appreciate asynchronous communication (written documentation, Loom videos) to respect different time zones and workflows. Spontaneous check-ins via chat work well for quick questions too.',
        readTime: 2,
        related: ['location-1', 'collaboration-1', 'work-1', 'value-4']
      },
      {
        q: 'How do you ensure good communication remotely?',
        a: 'By being extra clear in writing, documenting decisions, using visual aids (screen sharing, annotated screenshots), and never assuming something is "obvious". I take initiative in communication instead of waiting for others to ask. Over-communication is better than under-communication remotely.',
        readTime: 3,
        related: ['work-1', 'collaboration-0', 'location-0', 'value-6']
      }
    ],
    value: [
      {
        q: 'Why should we choose you over other developers?',
        a: 'Honest answer: I bring fresh perspective without bad habits, deep theoretical knowledge with practical application, and genuine curiosity about solving problems. I may lack traditional experience, but I offer dedication, fast learning, and a design-first mindset. I\'m also highly motivated - this is my entry into professional work.',
        readTime: 3,
        related: ['journey-3', 'offer-2', 'value-2', 'collaboration-0']
      },
      {
        q: 'What can you deliver in the first week?',
        a: 'Week 1 is about learning: understanding your company culture, tech stack, current challenges, and how I can best contribute. I\'ll ask lots of questions, read documentation, and start with small tasks to get familiar with your workflows. Setting a strong foundation matters more than rushing.',
        readTime: 2,
        related: ['start-0', 'collaboration-0', 'value-3', 'work-0']
      },
      {
        q: 'What makes you different?',
        a: 'My unconventional path. 12 years of study means I understand fundamentals deeply, not just surface-level frameworks. I bridge design and development naturally. And I\'m genuinely excited to apply my knowledge professionally - that energy is valuable. I see every project as an opportunity to learn and grow.',
        readTime: 2,
        related: ['journey-1', 'offer-2', 'value-0', 'collaboration-2']
      },
      {
        q: 'How do you measure success?',
        a: 'User satisfaction, project goals met, code maintainability, and team collaboration. Success isn\'t just "feature shipped" - it\'s "did we solve the right problem in a sustainable way?". I think holistically and value long-term quality over short-term shortcuts.',
        readTime: 2,
        related: ['offer-1', 'work-0', 'journey-2', 'collaboration-3']
      },
      {
        q: 'What type of projects suit you best?',
        a: 'Projects where design and user experience are prioritized, where thoughtful solutions are valued over quick fixes. I thrive in cross-functional teams where I can contribute to multiple phases. Especially suited for MVP development, design system building, or when you need someone to "translate" between designers and developers.',
        readTime: 3,
        related: ['offer-0', 'journey-3', 'work-2', 'collaboration-4']
      },
      {
        q: 'What is your greatest strength?',
        a: 'I\'m excellent at learning quickly and connecting knowledge from different disciplines. My generalist background means I can contribute to multiple phases - from UX research to frontend implementation. I also bring genuine curiosity and no ego about "my way" being the only way. Every project teaches me something new.',
        readTime: 2,
        related: ['journey-3', 'collaboration-2', 'offer-2', 'value-2']
      },
      {
        q: 'How do you handle not having traditional work experience?',
        a: 'I see it as both a strength and a challenge. Strength: no bad habits, open to learning "your ways", fresh perspective. Challenge: I need support initially to understand workplace culture. I compensate by being extra attentive, asking questions, and taking initiative. My academic discipline translates to professional rigor.',
        readTime: 3,
        related: ['journey-1', 'value-0', 'start-1', 'collaboration-0']
      },
      {
        q: 'What motivates you in your work?',
        a: 'Solving real problems for real users. After years of theory, I\'m ready to see my knowledge create value in practice. I\'m driven by curiosity, the desire to constantly learn, and the feeling of contributing to something meaningful. Building products that improve people\'s daily lives is my greatest motivation.',
        readTime: 2,
        related: ['journey-0', 'offer-1', 'value-3', 'collaboration-1']
      }
    ]
  },
  cas: {
    work: [
      {
        q: '¿Qué tan flexible es tu horario de trabajo?',
        a: 'Actualmente estoy abierto a puestos del 50% con posibilidad de escalar hasta 75-100% dependiendo de las necesidades del proyecto y mi carga de estudios. A partir de la primavera de 2026, puedo trabajar al 100%. También estoy abierto a trabajo por horas, basado en proyectos o retainer, en otras palabras, continua colaborasion.',
        readTime: 2,
        related: ['work-1', 'start-0', 'collaboration-0', 'value-1']
      },
      {
        q: '¿Prefieres el trabajo remoto?',
        a: 'Sí, el trabajo remoto es mi preferencia principal. Es saludable y sostenible para mí - menos estrés, más tiempo de trabajo enfocado. Estoy basado en Estocolmo y puedo viajar según sea necesario en el futuro.',
        readTime: 1,
        related: ['location-0', 'work-2', 'collaboration-0', 'collaboration-6']
      },
      {
        q: '¿Qué tipos de compromisos estás buscando?',
        a: 'Estoy abierto a varios tipos: tarifas por hora, basado en proyectos, retainer o empleo a tiempo parcial/completo. Valoro la flexibilidad y puedo adaptarme a las necesidades de la empresa.',
        readTime: 1,
        related: ['offer-0', 'start-1', 'value-4']
      }
    ],
    journey: [
      {
        q: '¿Tienes algún grado en progreso?',
        a: 'Sí! Actualmente estoy trabajando hacia dos grados: Tecnología de Medios y Diseño de Información (arquitectura y desarrollo). Estos formalizarán mis muchos años de estudio en ciencias de la computación, diseño y desarrollo.',
        readTime: 2,
        related: ['journey-1', 'journey-2', 'value-2', 'value-6']
      },
      {
        q: '¿Por qué no tienes certificados de grado formales a pesar de 12 años de estudio?',
        a: 'He estudiado durante más de 12 años a nivel universitario y continúo haciéndolo. Tengo 7 años de créditos universitarios completos en varias disciplinas como UX, UI, programación y diseño de software. Los años restantes se dedicaron a fases de aprendizaje profundo donde prioricé el dominio sobre la acumulación de créditos. Cuando entendía un concepto, avanzaba para aprender más, en lugar de completar trabajo repetitivo. Este enfoque me dio amplitud y profundidad, pero menos certificados.',
        readTime: 3,
        related: ['journey-3', 'offer-2', 'value-2', 'value-6']
      },
      {
        q: '¿Cuáles son tus principales áreas de expertise?',
        a: 'Soy un generalista con conocimiento profundo en muchas áreas: diseño UX/UI, desarrollo frontend (React, TypeScript, Next.js), desarrollo backend (Node.js, Python) y gestión de proyectos. Mi fortaleza radica en conectar diseño y desarrollo, además de aprender rápidamente nuevas tecnologías.',
        readTime: 2,
        related: ['offer-0', 'journey-3', 'collaboration-4', 'value-5']
      },
      {
        q: '¿Cómo ves tu amplia competencia?',
        a: 'Como generalista, puedo contribuir a diferentes fases del desarrollo de productos - desde investigación de usuarios hasta implementación. Esta versatilidad me hace valioso en equipos multifuncionales y cuando los proyectos necesitan alguien que pueda "hablar ambos idiomas" entre diseño y desarrollo.',
        readTime: 2,
        related: ['offer-1', 'offer-2', 'value-5', 'collaboration-4']
      }
    ],
    location: [
      {
        q: '¿Dónde estás ubicado?',
        a: 'Vivo en Estocolmo, Suecia. El trabajo remoto es mi preferencia principal, pero puedo viajar según sea necesario en el futuro.',
        readTime: 1,
        related: ['work-1', 'location-1', 'collaboration-6']
      },
      {
        q: '¿Puedes trabajar en diferentes zonas horarias?',
        a: 'Sí, soy flexible con los horarios de trabajo y puedo adaptarme a las necesidades de equipos internacionales.',
        readTime: 1,
        related: ['work-0', 'start-1', 'collaboration-5']
      }
    ],
    offer: [
      {
        q: '¿Puedes trabajar solo en parte de un proyecto?',
        a: '¡Absolutamente! Puedo enfocarme en partes específicas como: solo investigación y diseño UX, solo desarrollo frontend, solo trabajo backend, o enseñar/mentorizar equipos en tecnologías específicas.',
        readTime: 2,
        related: ['offer-1', 'journey-2', 'collaboration-4', 'value-5']
      },
      {
        q: '¿Puedes enseñar o mentorizar?',
        a: 'Sí! Mi extensa experiencia de aprendizaje me ha enseñado mucho sobre cómo aprenden las personas. Puedo impartir cursos, talleres, seminarios o mentoría en UX/UI, desarrollo frontend y resolución de problemas.',
        readTime: 2,
        related: ['journey-3', 'start-0', 'collaboration-1', 'value-7']
      },
      {
        q: '¿Cuál es tu mayor fortaleza?',
        a: 'Mi capacidad para aprender y adaptarme rápidamente a nuevas tecnologías y contextos. Como generalista, puedo ver el panorama completo mientras profundizo en los detalles cuando es necesario.',
        readTime: 2,
        related: ['journey-1', 'journey-3', 'value-2', 'value-5']
      }
    ],
    start: [
      {
        q: '¿Cómo empezamos a colaborar?',
        a: 'La forma más fácil es contactarme directamente. Podemos comenzar con una conversación breve para discutir tus necesidades y ver si soy adecuado para el proyecto o rol.',
        readTime: 1,
        related: ['start-1', 'work-0', 'collaboration-0', 'value-1']
      },
      {
        q: '¿Cómo es tu proceso de trabajo?',
        a: 'Trabajo de manera ágil y centrada en el usuario. Siempre comienzo entendiendo el problema y las necesidades del usuario, luego itero rápidamente con comunicación cercana. La transparencia y la colaboración son centrales en mi proceso de trabajo.',
        readTime: 2,
        related: ['offer-0', 'work-2', 'collaboration-1', 'collaboration-2']
      }
    ],
    collaboration: [
      {
        q: '¿Cómo te comunicas durante los proyectos?',
        a: 'Primer contacto por email con 2 horas de tiempo de respuesta. Una vez trabajando, estoy disponible en minutos durante horas acordadas. Uso Zoom/video para reuniones y me adapto a las herramientas del equipo (Slack, Teams, etc.). El trabajo remoto requiere esfuerzo extra de comunicación - lo tomo en serio y soy proactivo.',
        readTime: 2,
        related: ['work-1', 'start-0', 'collaboration-1', 'value-6']
      },
      {
        q: '¿Con qué frecuencia das actualizaciones?',
        a: 'Tan a menudo como sea necesario - diario, semanal o según lo acordado. Creo en la transparencia y la comunicación proactiva. Nunca te preguntarás "¿qué está haciendo?". Documento el progreso y comparto regularmente, lo cual es especialmente importante en trabajo remoto.',
        readTime: 1,
        related: ['collaboration-0', 'work-2', 'start-1', 'value-1']
      },
      {
        q: '¿Cómo manejas feedback y revisiones?',
        a: 'El feedback es esencial para el trabajo centrado en el usuario. Veo las revisiones como parte del proceso iterativo, no como crítica. Mi formación en diseño me enseñó que la primera versión rara vez es la final - eso es saludable. Hago preguntas aclaratorias para entender el "por qué" detrás del feedback.',
        readTime: 2,
        related: ['offer-1', 'journey-2', 'collaboration-3', 'value-5']
      },
      {
        q: '¿Cómo manejas conflictos o desacuerdos?',
        a: 'Primero: entender la causa raíz. A menudo los "conflictos" son en realidad malentendidos o diferentes prioridades. Busco entender todas las perspectivas, encontrar puntos en común y proponer alternativas. El objetivo es un acuerdo mutuo y compromiso que sirva al proyecto y a los usuarios.',
        readTime: 2,
        related: ['collaboration-1', 'work-0', 'collaboration-0', 'value-3']
      },
      {
        q: '¿Trabajas mejor en equipo o solo?',
        a: 'Ambos. Soy muy autodirigido y puedo trabajar independientemente con actualizaciones regulares. Al mismo tiempo, prospero en el trabajo en equipo - especialmente equipos multifuncionales donde puedo aportar perspectivas de diseño y desarrollo. Me adapto a las necesidades del proyecto.',
        readTime: 2,
        related: ['work-2', 'journey-3', 'offer-1', 'value-4']
      },
      {
        q: '¿Qué formatos de reunión prefieres?',
        a: 'Para trabajo remoto: reuniones de video estructuradas con agendas claras. También aprecio la comunicación asíncrona (documentación escrita, videos Loom) para respetar diferentes zonas horarias y flujos de trabajo. Los check-ins espontáneos por chat también funcionan bien para preguntas rápidas.',
        readTime: 2,
        related: ['location-1', 'collaboration-1', 'work-1', 'value-4']
      },
      {
        q: '¿Cómo aseguras buena comunicación remotamente?',
        a: 'Siendo extra claro al escribir, documentando decisiones, usando ayudas visuales (compartir pantalla, capturas anotadas), y nunca asumiendo que algo es "obvio". Tomo iniciativa en la comunicación en lugar de esperar a que otros pregunten. Sobre-comunicar es mejor que sub-comunicar remotamente.',
        readTime: 3,
        related: ['work-1', 'collaboration-0', 'location-0', 'value-6']
      }
    ],
    value: [
      {
        q: '¿Por qué deberían elegirte sobre otros desarrolladores?',
        a: 'Respuesta honesta: Traigo perspectiva fresca sin malos hábitos, conocimiento teórico profundo con aplicación práctica, y curiosidad genuina por resolver problemas. Puede que carezca de experiencia tradicional, pero ofrezco dedicación, aprendizaje rápido y una mentalidad de diseño primero. También estoy muy motivado - esta es mi entrada al trabajo profesional.',
        readTime: 3,
        related: ['journey-3', 'offer-2', 'value-2', 'collaboration-0']
      },
      {
        q: '¿Qué puedes entregar en la primera semana?',
        a: 'La semana 1 es sobre aprender: entender tu cultura empresarial, stack tecnológico, desafíos actuales y cómo puedo contribuir mejor. Haré muchas preguntas, leeré documentación y comenzaré con tareas pequeñas para familiarizarme con tus flujos de trabajo. Establecer una base sólida es más importante que apresurar algo.',
        readTime: 2,
        related: ['start-0', 'collaboration-0', 'value-3', 'work-0']
      },
      {
        q: '¿Qué te hace diferente?',
        a: 'Mi camino poco convencional. 12 años de estudio significa que entiendo los fundamentos profundamente, no solo frameworks superficiales. Conecto diseño y desarrollo naturalmente. Y estoy genuinamente emocionado de aplicar mi conocimiento profesionalmente - esa energía es valiosa. Veo cada proyecto como una oportunidad de aprender y crecer.',
        readTime: 2,
        related: ['journey-1', 'offer-2', 'value-0', 'collaboration-2']
      },
      {
        q: '¿Cómo mides el éxito?',
        a: 'Satisfacción del usuario, objetivos del proyecto cumplidos, mantenibilidad del código y colaboración del equipo. El éxito no es solo "función entregada" - es "¿resolvimos el problema correcto de manera sostenible?". Pienso holísticamente y valoro la calidad a largo plazo sobre los atajos a corto plazo.',
        readTime: 2,
        related: ['offer-1', 'work-0', 'journey-2', 'collaboration-3']
      },
      {
        q: '¿Qué tipo de proyectos te convienen mejor?',
        a: 'Proyectos donde el diseño y la experiencia del usuario son priorizados, donde se valoran soluciones reflexivas sobre arreglos rápidos. Prospero en equipos multifuncionales donde puedo contribuir a múltiples fases. Especialmente adecuado para desarrollo de MVP, construcción de sistemas de diseño, o cuando necesitas a alguien que "traduzca" entre diseñadores y desarrolladores.',
        readTime: 3,
        related: ['offer-0', 'journey-3', 'work-2', 'collaboration-4']
      },
      {
        q: '¿Cuál es tu mayor fortaleza?',
        a: 'Soy excelente aprendiendo rápidamente y conectando conocimiento de diferentes disciplinas. Mi formación generalista significa que puedo contribuir a múltiples fases - desde investigación UX hasta implementación frontend. También traigo curiosidad genuina y ningún ego sobre que "mi manera" sea la única. Cada proyecto me enseña algo nuevo.',
        readTime: 2,
        related: ['journey-3', 'collaboration-2', 'offer-2', 'value-2']
      },
      {
        q: '¿Cómo manejas no tener experiencia laboral tradicional?',
        a: 'Lo veo como una fortaleza y un desafío. Fortaleza: sin malos hábitos, abierto a aprender "tus maneras", perspectiva fresca. Desafío: necesito apoyo inicial para entender la cultura laboral. Compenso siendo extra atento, haciendo preguntas y tomando iniciativa. Mi disciplina académica se traduce en rigor profesional.',
        readTime: 3,
        related: ['journey-1', 'value-0', 'start-1', 'collaboration-0']
      },
      {
        q: '¿Qué te motiva en tu trabajo?',
        a: 'Resolver problemas reales para usuarios reales. Después de años de teoría, estoy listo para ver mi conocimiento crear valor en la práctica. Me impulsa la curiosidad, el deseo de aprender constantemente y el sentimiento de contribuir a algo significativo. Construir productos que mejoren la vida diaria de las personas es mi mayor motivación.',
        readTime: 2,
        related: ['journey-0', 'offer-1', 'value-3', 'collaboration-1']
      }
    ]
  }
};

// ============================================
// 🎨 THEME & UTILITIES
// ============================================

const glassStyles = {
  card: `
    backdrop-blur-xl bg-white/5 dark:bg-gray-900/5
    border border-white/10 dark:border-gray-700/10
    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
    hover:bg-white/8 dark:hover:bg-gray-900/8
    transition-all duration-500 ease-out
  `,
  button: `
    backdrop-blur-md bg-white/3 dark:bg-gray-900/3
    border border-white/5 dark:border-gray-700/5
    hover:bg-white/5 dark:hover:bg-gray-900/5
    transition-all duration-300
  `,
  text: {
    primary: 'text-gray-800/90 dark:text-gray-100/90',
    secondary: 'text-gray-600/70 dark:text-gray-400/70',
    muted: 'text-gray-500/50 dark:text-gray-500/50'
  }
};

// ============================================
// 🧩 MAIN CONTAINER COMPONENT
// ============================================

const QnASection: FC = () => {
  const useLanguage = () => {
    const [language, setLanguage] = useState('sv');
    const t = (key: string) => translations[language]?.[key] || key;
    return { language, setLanguage, t };
  };

  const { language, setLanguage, t } = useLanguage();
  const [activePath, setActivePath] = useState('work');
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [pinnedItems, setPinnedItems] = useState<Set<number>>(new Set());
  const [focusedItem, setFocusedItem] = useState<number | null>(null);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [pathProgress, setPathProgress] = useState<Record<string, number>>({});
  const [viewedPaths, setViewedPaths] = useState<Set<string>>(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [summaryDismissed, setSummaryDismissed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const summaryTriggeredRef = useRef(false);

  // Track scroll for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsNavSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger questions animation when path changes
  useEffect(() => {
    setQuestionsVisible(false);
    setExpandedItems(new Set());
    setPinnedItems(new Set());
    setFocusedItem(null); // Clear focus on path change
    const timer = setTimeout(() => setQuestionsVisible(true), 100);

    // Track viewed paths
    setViewedPaths(prev => new Set([...prev, activePath]));

    return () => clearTimeout(timer);
  }, [activePath]);

  // Show summary after exploring 3+ paths
  useEffect(() => {
    if (viewedPaths.size >= 3 && !showSummary && !summaryDismissed && !summaryTriggeredRef.current) {
      summaryTriggeredRef.current = true;
      const timer = setTimeout(() => setShowSummary(true), 8000);
      return () => clearTimeout(timer);
    }
  }, [viewedPaths, showSummary, summaryDismissed]);

  // Calculate path progress
  useEffect(() => {
    const currentQuestions = qnaContent[language]?.[activePath] || [];
    const expandedCount = Array.from(expandedItems).length;
    const progress = currentQuestions.length > 0 ? expandedCount / currentQuestions.length : 0;

    setPathProgress(prev => ({
      ...prev,
      [activePath]: progress
    }));
  }, [expandedItems, activePath, language]);

  const currentQuestions = qnaContent[language]?.[activePath] || [];

  // Handle expand/collapse with pin logic
  const handleToggle = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);

      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        const toRemove = Array.from(newSet).filter(i => !pinnedItems.has(i));
        toRemove.forEach(i => newSet.delete(i));
        newSet.add(index);
      }

      return newSet;
    });
  };

  // Handle pin toggle
  const handleTogglePin = (index: number) => {
    setPinnedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
        setExpandedItems(prevExpanded => new Set(prevExpanded).add(index));
      }
      return newSet;
    });
  };

  // FIXED: Handle related question click with proper focus
  const handleRelatedClick = (relatedId: string) => {
    const [pathId, questionIndex] = relatedId.split('-');
    const qIndex = parseInt(questionIndex);

    if (pathId !== activePath) {
      // Switch path first
      setActivePath(pathId);
      // Then expand and focus after path switch
      setTimeout(() => {
        setExpandedItems(new Set([qIndex]));
        setFocusedItem(qIndex);
        // Clear focus after 3 seconds
        setTimeout(() => setFocusedItem(null), 3000);
      }, 300);
    } else {
      // Same path - just expand and focus
      setExpandedItems(prev => new Set([...prev, qIndex]));
      setFocusedItem(qIndex);
      setTimeout(() => setFocusedItem(null), 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      data-qna-section
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gray-950"
    >
      {/* Morphing Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/10 to-pink-950/20 transition-all duration-1000" />
      <div className="absolute inset-0 transition-all duration-1000">
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `linear-gradient(to br, ${pathConfig.find(p => p.id === activePath)?.color}20, ${pathConfig.find(p => p.id === activePath)?.color}10)`
          }}
        />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-800/10 to-pink-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with language switcher */}
        <div className="flex justify-end mb-8">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>

        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageCircle className={`w-12 h-12 ${glassStyles.text.primary}`} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${glassStyles.text.primary}`}>
            {t('qna.title')}
          </h2>
          <p className={`text-lg ${glassStyles.text.secondary}`}>
            {t('qna.subtitle')}
          </p>
        </div>

        {/* Navigation Reference Point */}
        <div ref={navRef} />

        {/* Sticky Navigation */}
        <StickyNav
          paths={pathConfig}
          activePath={activePath}
          onPathChange={setActivePath}
          t={t}
          isSticky={isNavSticky}
          pathProgress={pathProgress}
        />

        {/* Questions List */}
        <div className="space-y-4 max-w-4xl mx-auto mt-12">
          {currentQuestions.map((qa, index) => (
            <QnAItem
              key={index}
              question={qa.q}
              answer={qa.a}
              readTime={qa.readTime}
              related={qa.related}
              index={index}
              pathId={activePath}
              isFocused={focusedItem === index}
              isVisible={questionsVisible}
              isPinned={pinnedItems.has(index)}
              onTogglePin={() => handleTogglePin(index)}
              isExpanded={expandedItems.has(index)}
              onToggle={() => handleToggle(index)}
              onRelatedClick={handleRelatedClick}
              t={t}
            />
          ))}

          {/* Ask More CTA */}
          <AskMoreCTA t={t} isVisible={questionsVisible} />
        </div>
      </div>

      {/* Summary Card */}
      {showSummary && !summaryDismissed && (
        <SummaryCard
          exploredPaths={Array.from(viewedPaths)}
          t={t}
          language={language}
          onClose={() => {
            setShowSummary(false);
            setSummaryDismissed(true);
          }}
        />
      )}
    </section>
  );
};

export default QnASection;

// ============================================
// PART 3: PRESENTATION COMPONENTS
// ============================================
// Paste this AFTER Part 2

// Language Switcher Component
const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const languages = [
    { code: 'sv', label: 'Svenska' },
    { code: 'eu', label: 'Europe' },
    { code: 'cas', label: 'Castellano' }
  ];

  return (
    <div className={`flex gap-2 ${glassStyles.card} rounded-xl p-1`}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-4 py-2 rounded-lg text-sm transition-all duration-300
            ${language === lang.code
              ? 'bg-white/10 dark:bg-gray-700/10 ' + glassStyles.text.primary
              : glassStyles.text.secondary + ' hover:bg-white/5'
            }
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

// Sticky Navigation Component
const StickyNav: FC<StickyNavProps> = ({ paths, activePath, onPathChange, t, isSticky, pathProgress }) => {
  const [isCompact, setIsCompact] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const sectionTopRef = useRef<number>(0);

  useEffect(() => {
    setIsCompact(window.innerWidth < 768);
    const handleResize = () => setIsCompact(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShouldShow(scrollY > sectionTopRef.current + 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionElement = document.querySelector('[data-qna-section]');
    if (sectionElement) {
      sectionTopRef.current = sectionElement.getBoundingClientRect().top + window.scrollY;
    }
  }, []);

  const activePathData = paths.find(p => p.id === activePath);
  const ActiveIcon = activePathData?.icon;

  return (
    <div
      className={`
        transition-all duration-500 z-40
        ${isSticky && shouldShow
          ? 'fixed left-0 right-0 py-2 backdrop-blur-xl bg-gray-950/90 border-b border-white/5'
          : 'relative py-0'
        }
      `}
      style={{ top: isSticky && shouldShow ? '80px' : 'auto' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {isSticky && shouldShow ? (
          <div className="flex items-center gap-3">
            <div className={`
              ${glassStyles.card} rounded-lg px-3 py-1.5
              flex items-center gap-2 flex-shrink-0 border-white/5
            `}>
              {ActiveIcon && (
                <ActiveIcon className="w-4 h-4" style={{ color: activePathData.color }} />
              )}
              <span className={`text-sm font-medium ${glassStyles.text.primary} hidden sm:block`}>
                {t(`qna.paths.${activePath}.title`)}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
              {paths.map(path => {
                const Icon = path.icon;
                const isActive = activePath === path.id;
                const progress = pathProgress[path.id] || 0;

                return (
                  <button
                    key={path.id}
                    onClick={() => onPathChange(path.id)}
                    className={`
                      group relative flex items-center justify-center p-2 rounded-lg
                      backdrop-blur-md bg-white/0 hover:bg-white/5
                      border border-white/0
                      ${isActive ? 'ring-1 ring-offset-0' : ''}
                      transition-all duration-300 flex-shrink-0
                    `}
                    style={{ ringColor: isActive ? `${path.color}60` : undefined }}
                    title={t(`qna.paths.${path.id}.title`)}
                  >
                    <div className="relative w-8 h-8">
                      <svg className="w-8 h-8 -rotate-90">
                        <circle cx="16" cy="16" r="14" fill="none" stroke={`${path.color}15`} strokeWidth="2" />
                        <circle
                          cx="16" cy="16" r="14" fill="none" stroke={path.color} strokeWidth="2"
                          strokeDasharray={`${progress * 87.96} 87.96`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <Icon
                        className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ color: path.color }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className={`
              ${glassStyles.card} rounded-xl px-4 py-3 mb-4
              flex items-center gap-3 justify-center border-white/5
            `}>
              {ActiveIcon && (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${activePathData.color}30` }}
                >
                  <ActiveIcon className="w-5 h-5" style={{ color: activePathData.color }} />
                </div>
              )}
              <span className={`text-lg font-medium ${glassStyles.text.primary}`}>
                {t(`qna.paths.${activePath}.title`)}
              </span>
            </div>

            <div className={`grid gap-2 justify-items-center ${isCompact ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {paths.map(path => {
                const Icon = path.icon;
                const isActive = activePath === path.id;
                const progress = pathProgress[path.id] || 0;
                const label = t(`qna.paths.${path.id}.title`);

                return (
                  <button
                    key={path.id}
                    onClick={() => onPathChange(path.id)}
                    className={`
                      group relative flex flex-col items-center gap-2 p-3 rounded-xl
                      ${glassStyles.button}
                      ${isActive ? 'ring-2' : ''}
                      transition-all duration-300 w-full border-white/5
                    `}
                    style={{ ringColor: isActive ? `${path.color}40` : undefined }}
                  >
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 -rotate-90">
                        <circle cx="20" cy="20" r="18" fill="none" stroke={`${path.color}20`} strokeWidth="2" />
                        <circle
                          cx="20" cy="20" r="18" fill="none" stroke={path.color} strokeWidth="2"
                          strokeDasharray={`${progress * 113.1} 113.1`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <Icon
                        className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ color: path.color }}
                      />
                    </div>

                    <span className={`
                      text-xs font-medium text-center
                      ${isActive ? glassStyles.text.primary : glassStyles.text.secondary}
                      ${isCompact ? 'max-w-[60px] truncate' : ''}
                    `}>
                      {isCompact ? label.slice(0, 5) : label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
};

// Individual Q&A Item - WITH FIXED FOCUS HIGHLIGHTING
const QnAItem: FC<QnAItemProps> = ({
  question, answer, readTime, related, index, isVisible, isPinned,
  onTogglePin, isExpanded, onToggle, onRelatedClick, t, pathId, isFocused
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  // FIXED: Scroll to center when focused
  useEffect(() => {
    if (isFocused && isExpanded && cardRef.current) {
      setTimeout(() => {
        const card = cardRef.current;
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const cardTop = cardRect.top + scrollTop;
        const cardHeight = cardRect.height;
        const targetScroll = cardTop - (viewportHeight / 2) + (cardHeight / 2);

        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }, 500);
    }
  }, [isFocused, isExpanded]);

  return (
    <div
      ref={cardRef}
      data-question-index={index}
      data-path-id={pathId}
      className={`
        ${glassStyles.card} rounded-2xl overflow-hidden
        transform transition-all duration-700
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${isPinned ? 'ring-2 ring-blue-400/30 dark:ring-blue-500/30' : ''}
        ${isFocused ? 'ring-2 ring-yellow-400/50 dark:ring-yellow-500/50 shadow-lg shadow-yellow-500/20' : ''}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-stretch">
        <button
          onClick={onToggle}
          className={`
            flex-1 p-6 text-left flex items-center justify-between gap-4
            ${glassStyles.text.primary}
            hover:bg-white/3 dark:hover:bg-gray-900/3
            transition-colors duration-300
          `}
        >
          <div className="flex-1">
            <span className="font-medium text-lg">{question}</span>
            <div className={`flex items-center gap-2 mt-2 text-xs ${glassStyles.text.muted}`}>
              <Clock className="w-3 h-3" />
              <span>{readTime} {t('qna.readTime')}</span>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        <button
          onClick={onTogglePin}
          className={`
            px-4 border-l border-white/10 dark:border-gray-700/10 transition-all duration-300
            ${isPinned
              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
              : 'text-gray-400 dark:text-gray-500 hover:bg-white/3 dark:hover:bg-gray-900/3'
            }
          `}
          title={isPinned ? 'Unpin' : 'Pin open'}
        >
          <svg
            className="w-5 h-5 transition-transform duration-300"
            style={{ transform: isPinned ? 'rotate(-45deg)' : 'rotate(0deg)' }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <div
        style={{ maxHeight: isExpanded ? `${height}px` : '0px', opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden transition-all duration-500 ease-out"
      >
        <div ref={contentRef} className="px-6 pb-6 pt-2">
          <div className={`${glassStyles.text.secondary} leading-relaxed mb-4`}>
            {answer.split(' ').map((word, i) => (
              <span
                key={i}
                className={`inline ${i === 0 && isExpanded && isFocused ? 'first-word-glow font-semibold' : ''}`}
                style={{
                  animation: isExpanded ? `fadeInWord 0.3s ease-out ${i * 0.02}s forwards` : 'none',
                  opacity: isExpanded ? 0 : 1
                }}
              >
                {word}{' '}
              </span>
            ))}
          </div>

          {related && related.length > 0 && (
            <div className={`${glassStyles.card} rounded-xl p-4 mt-4`}>
              <div className={`text-sm font-medium mb-3 ${glassStyles.text.primary} flex items-center gap-2`}>
                <Sparkles className="w-4 h-4" />
                {t('qna.relatedQuestions')}
              </div>
              <div className="flex flex-wrap gap-2">
                {related.map((relatedId, idx) => {
                  const [pathId, questionNum] = relatedId.split('-');
                  return (
                    <button
                      key={idx}
                      onClick={() => onRelatedClick(relatedId)}
                      className={`
                        text-xs px-3 py-1.5 rounded-lg ${glassStyles.button} ${glassStyles.text.secondary}
                        hover:scale-105 transition-transform duration-300
                      `}
                    >
                      {t(`qna.pathLabel.${pathId}`)} #{parseInt(questionNum) + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInWord {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .first-word-glow {
          animation: firstWordGlow 2s ease-out forwards;
          color: #fbbf24;
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        }

        @keyframes firstWordGlow {
          0% { filter: brightness(1.8); text-shadow: 0 0 30px rgba(251, 191, 36, 0.8); }
          50% { filter: brightness(1.5); text-shadow: 0 0 25px rgba(251, 191, 36, 0.6); }
          100% { filter: brightness(1); text-shadow: 0 0 10px rgba(251, 191, 36, 0.3); }
        }
      `}</style>
    </div>
  );
};

// Ask More CTA Card
const AskMoreCTA: FC<AskMoreCTAProps> = ({ t, isVisible }) => {
  return (
    <div
      className={`
        ${glassStyles.card} rounded-2xl p-8 text-center
        transform transition-all duration-700
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `}
      style={{ transitionDelay: '400ms' }}
    >
      <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${glassStyles.text.primary}`} />
      <h3 className={`text-2xl font-bold mb-2 ${glassStyles.text.primary}`}>{t('qna.askMore')}</h3>
      <p className={`mb-6 ${glassStyles.text.secondary}`}>{t('qna.askMoreCta')}</p>
      <button
        className={`
          ${glassStyles.button} px-6 py-3 rounded-xl ${glassStyles.text.primary} font-medium
          hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto
        `}
      >
        <span>{t('qna.askMoreCta')}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Summary Card
const SummaryCard: FC<SummaryCardProps> = ({ exploredPaths, t, onClose, language }) => {
  const summaryHighlights: SummaryHighlights = {
    sv: {
      work: 'Flexibel arbetstid med distans som prioritet',
      journey: 'Djup generalistkompetens från 12 års studier',
      location: 'Stockholm-baserad, redo för internationellt samarbete',
      offer: 'Kan bidra med allt från UX till utveckling och mentorskap',
      start: 'Agil arbetsprocess med fokus på användarbehov',
      collaboration: 'Proaktiv kommunikation med 2-timmars svarstid',
      value: 'Fräscht perspektiv med djup teoretisk grund och snabb inlärning'
    },
    eu: {
      work: 'Flexible schedule with remote work priority',
      journey: 'Deep generalist expertise from 12 years of study',
      location: 'Stockholm-based, ready for international collaboration',
      offer: 'Can contribute from UX to development and mentorship',
      start: 'Agile work process focused on user needs',
      collaboration: 'Proactive communication with 2-hour response time',
      value: 'Fresh perspective with deep theoretical foundation and fast learning'
    },
    cas: {
      work: 'Horario flexible con prioridad en trabajo remoto',
      journey: 'Experiencia generalista profunda de 12 años de estudio',
      location: 'Basado en Estocolmo, listo para colaboración internacional',
      offer: 'Puede contribuir desde UX hasta desarrollo y mentoría',
      start: 'Proceso de trabajo ágil enfocado en necesidades del usuario',
      collaboration: 'Comunicación proactiva con 2 horas de tiempo de respuesta',
      value: 'Perspectiva fresca con base teórica profunda y aprendizaje rápido'
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`${glassStyles.card} rounded-2xl p-8 max-w-2xl w-full transform transition-all duration-500 scale-100 opacity-100`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${glassStyles.text.primary}`}>{t('qna.summary.title')}</h3>
            <p className={`${glassStyles.text.secondary}`}>{t('qna.summary.intro')}</p>
          </div>
          <button onClick={onClose} className={`${glassStyles.button} p-2 rounded-lg`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {exploredPaths.map((pathId, idx) => {
            const path = pathConfig.find(p => p.id === pathId);
            if (!path) return null;
            const Icon = path.icon;

            return (
              <div
                key={pathId}
                className={`${glassStyles.card} rounded-xl p-4 flex items-start gap-4`}
                style={{ animation: `slideInRight 0.5s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${path.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: path.color }} />
                </div>
                <p className={`${glassStyles.text.secondary} leading-relaxed`}>
                  {summaryHighlights[language][pathId]}
                </p>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </div>
  );
};