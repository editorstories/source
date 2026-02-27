import { QnAContent } from './types';

// ============================================
// 📚 Q&A CONTENT DATA
// ============================================

export const qnaContent: QnAContent = {
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
  en: {
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
  es: {
    work: [
      {
        q: '¿Qué tan flexible es tu horario de trabajo?',
        a: 'Actualmente estoy abierto a puestos del 50% con posibilidad de escalar hasta 75-100% dependiendo de las necesidades del proyecto y mi carga de estudios. A partir de la primavera de 2026, puedo trabajar al 100%. También estoy abierto a trabajo por horas, basado en proyectos o retainer.',
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