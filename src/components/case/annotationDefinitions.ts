export const annotationDefinitions = {
    sv: {
      welcome: [
        { id: 'w1', target: 'feature-cards', title: 'Progressiv Avslöjning', description: 'Användare ser värdeförslag innan någon åtagande. Tre förmånskort etablerar förtroende och sätter förväntningar utan att överväldiga.', color: 'blue', principle: 'UX-mönster', focusType: 'ring' },
        { id: 'w2', target: 'privacy-card', title: 'Integritet-Först Meddelande', description: 'Säkerhetsproblem hanteras omedelbart med "lokal lagring" meddelande. Minskar ångest för tonårsanvändare och föräldrar.', color: 'green', principle: 'Användarpsykologi', focusType: 'ring' },
        { id: 'w3', target: 'cta-button', title: 'Enkel Tydlig CTA', description: 'En handling minskar beslutförlamning. Stort tryckmål (min 44px) uppfyller tillgänglighetsstandarder.', color: 'purple', principle: 'Tillgänglighet', focusType: 'box' },
        { id: 'w4', target: 'theme-icon', title: 'Adaptiv Tematisering', description: 'Tema byter automatiskt baserat på tid på dygnet. Kvällsläge använder varma, lugnande färger för att stödja sömnhygien.', color: 'yellow', principle: 'UX-mönster', focusType: 'glow' }
      ],
      pin: [
        { id: 'p1', target: 'pin-dots', title: 'Tvåstegsverifiering', description: 'PIN-bekräftelse förhindrar stavfel. Visuell feedback (fyllda prickar) ger tydlig framstegsindikeringar.', color: 'blue', principle: 'UX-mönster', focusType: 'ring' },
        { id: 'p2', target: 'pin-keypad', title: 'Taktil Feedback', description: 'Stora knappar (min 56px) med aktiva tillstånd ger tillfredsställande interaktion. Skalaanimering bekräftar inmatning.', color: 'purple', principle: 'Interaktionsdesign', focusType: 'box' },
        { id: 'p3', target: 'pin-instructions', title: 'Kontextuell Meddelande', description: 'Säkerhetsförklaring ändras mellan "ange" och "bekräfta" steg, vilket minskar kognitiv belastning.', color: 'green', principle: 'Innehållsstrategi', focusType: 'glow' }
      ],
      profile: [
        { id: 'pr1', target: 'name-input', title: 'Valfri Personalisering', description: 'Namn markerat som valfritt minskar tröskeln för att komma igång. Användare kan hoppa över utan att känna skuld.', color: 'blue', principle: 'UX-mönster', focusType: 'box' },
        { id: 'pr2', target: 'progress-indicator', title: 'Visuell Förloppsstapel', description: 'Steg-indikator (3 av 5) skapar tydlig förväntning om hur långt kvar. Minskar upplevd ansträngning.', color: 'purple', principle: 'Framstegsvisualisering', focusType: 'ring' },
        { id: 'pr3', target: 'sleep-goal-slider', title: 'Interaktiv Skjutreglage', description: 'Range slider gör val snabbt och lustfyllt. Visuell feedback (markerad siffra) bekräftar valet direkt.', color: 'green', principle: 'Interaktionsdesign', focusType: 'ring' },
        { id: 'pr4', target: 'bedtime-input', title: 'Kontextuell Standardvärde', description: 'Sömnmål börjar på 8h (rekommenderat för tonåringar). Smarta standarder minskar beslutströtthet.', color: 'yellow', principle: 'Designsystem', focusType: 'box' }
      ],
      goalSelection: [
        { id: 'gs1', target: 'goal-cards', title: 'Tvingande Val', description: 'Användare måste välja ett mål innan de fortsätter. Skapar initial commitment och tydlig startriktning.', color: 'blue', principle: 'Beteendeförändring', focusType: 'ring' },
        { id: 'gs2', target: 'goal-benefit', title: 'Förmån-Driven Design', description: 'Varje mål visar konkret nytta (Snabbare insomning). Outcome-fokus motiverar mer än process.', color: 'green', principle: 'Värdeproposition', focusType: 'glow' },
        { id: 'gs3', target: 'selected-goal', title: 'Visuell Feedback på Val', description: 'Valt kort skalas upp med check-markering. Multi-sensory feedback bekräftar handling.', color: 'purple', principle: 'Feedback-design', focusType: 'box' },
        { id: 'gs4', target: 'goal-cards', title: 'Begränsad Valfrihet', description: 'Tre alternativ följer "rule of three" - tillräckligt för valmöjlighet utan överväldigande.', color: 'yellow', principle: 'Kognitiv Belastning', focusType: 'ring' }
      ],
      success: [
        { id: 'su1', target: 'celebration-emoji', title: 'Firande-Moment', description: 'Stort emoji och bekräftelse skapar positiv avslutning. Första intrycket av appen blir lyckat genomförande.', color: 'green', principle: 'Användarpsykologi', focusType: 'glow' },
        { id: 'su2', target: 'next-steps', title: 'Förväntanshantering', description: 'Nästa steg-listan visar vad som kommer härnäst. Minskar osäkerhet och bygger mental modell.', color: 'blue', principle: 'Onboarding', focusType: 'ring' },
        { id: 'su3', target: 'contextual-message', title: 'Tidskontextuell Vägledning', description: 'Instruktionen ändras baserat på tid på dygnet (kväll vs morgon). Känns mer personligt och relevant.', color: 'purple', principle: 'Personalisering', focusType: 'box' }
      ],
      dashboard: [
        { id: 'd1', target: 'level-progress', title: 'Gamifieringslager', description: 'Nivåprogression med tydliga milstolpar skapar långsiktigt engagemang.', color: 'purple', principle: 'Gamifiering', focusType: 'ring' },
        { id: 'd2', target: 'habit-cards', title: 'Omedelbar Tillfredsställelse', description: '+10 XP-animation visas omedelbart vid vanekomplettering.', color: 'green', principle: 'Beteendepsykologi', focusType: 'ring' },
        { id: 'd3', target: 'sleep-score', title: 'Visuell Hierarki', description: 'Sömnpoäng använder störst typografi och central position.', color: 'blue', principle: 'Visuell design', focusType: 'glow' },
        { id: 'd4', target: 'insight-badge', title: 'Handlingsbara Insikter Badge', description: 'Röd notismärke skapar brådska utan att vara påträngande.', color: 'yellow', principle: 'Informationsarkitektur', focusType: 'box' },
        { id: 'd5', target: 'greeting-text', title: 'Kontextuella Hälsningar', description: 'Tidsmedveten meddelande gör upplevelsen personlig.', color: 'green', principle: 'Personalisering', focusType: 'box' }
      ],
      logging: [
        { id: 'l1', target: 'time-inputs', title: 'Smarta Standardvärden', description: 'Tidsinmatningar förifyllda med typiska värden.', color: 'blue', principle: 'UX-mönster', focusType: 'box' },
        { id: 'l2', target: 'duration-display', title: 'Realtidsberäkning', description: 'Varaktighet uppdateras live när tider ändras.', color: 'green', principle: 'Feedbackdesign', focusType: 'glow' },
        { id: 'l3', target: 'mood-picker', title: 'Valfri Humörspårning', description: 'Emoji-val markerat som valfritt minskar press.', color: 'yellow', principle: 'Användarpsykologi', focusType: 'box' }
      ],
      habitDetail: [
        { id: 'h1', target: 'week-calendar', title: 'Streak-Visualisering', description: 'Veckkalender balanserar motivation med realism.', color: 'purple', principle: 'Gamifiering', focusType: 'ring' },
        { id: 'h2', target: 'why-section', title: 'Pedagogiskt Lager', description: 'Vetenskaplig förklaring bygger trovärdighet.', color: 'blue', principle: 'Pedagogisk design', focusType: 'glow' },
        { id: 'h3', target: 'how-section', title: 'Steg-för-Steg Instruktioner', description: 'Numrerad lista med tydliga mikrohandlingar.', color: 'green', principle: 'Beteendeförändring', focusType: 'box' },
        { id: 'h4', target: 'expected-result', title: 'Förväntat Resultat', description: 'Specifikt, mätbart resultat skapar tydliga framgångskriterier.', color: 'yellow', principle: 'Målsättning', focusType: 'box' }
      ],
      habitLibrary: [
        { id: 'hl1', target: 'locked-habits', title: 'Progressiv Upplåsning', description: 'Låsta vanor skapar nyfikenhet och progression.', color: 'purple', principle: 'Gamifiering', focusType: 'glow' },
        { id: 'hl2', target: 'difficulty-badge', title: 'Svårighetsindikationer', description: 'Färgkodad svårighet sätter förväntningar.', color: 'yellow', principle: 'Användarkontroll', focusType: 'box' },
        { id: 'hl3', target: 'habit-list', title: 'Kategoriorganisation', description: 'Vanor grupperade efter typ underlättar upptäckt.', color: 'blue', principle: 'Informationsarkitektur', focusType: 'ring' }
      ],
      insights: [
        { id: 'i1', target: 'key-insight', title: 'Databerättande', description: 'Mönster presenteras som berättelser snarare än råa siffror.', color: 'blue', principle: 'Datavisualisering', focusType: 'glow' },
        { id: 'i2', target: 'weekly-chart', title: 'Visuell Trendanalys', description: 'Stapeldiagram gör det lätt att se mönster över tid.', color: 'green', principle: 'Datavisualisering', focusType: 'ring' },
        { id: 'i3', target: 'score-breakdown', title: 'Progressiv Avslöjning', description: 'Sammanfattningspoäng leder till detaljerad uppdelning.', color: 'purple', principle: 'Informationsarkitektur', focusType: 'box' },
        { id: 'i4', target: 'score-metrics', title: 'Färgkodade Mätvärden', description: 'Konsekvent färgspråk minskar inlärningskurva.', color: 'yellow', principle: 'Designsystem', focusType: 'glow' }
      ],
      patterns: [
        { id: 'pa1', target: 'pattern-cards', title: 'Positiv-Negativ Kategorisering', description: 'Gröna kort för goda vanor, röda för dåliga.', color: 'blue', principle: 'Informationsarkitektur', focusType: 'ring' },
        { id: 'pa2', target: 'sample-size', title: 'Bevis-Baserad Trovärdighet', description: 'Sample size visar transparens.', color: 'green', principle: 'Trovärdighetssignaler', focusType: 'box' },
        { id: 'pa3', target: 'percentage-stat', title: 'Specifika Procentsatser', description: 'Precision bygger förtroende.', color: 'yellow', principle: 'Datavisualisering', focusType: 'box' },
        { id: 'pa4', target: 'add-goal-button', title: 'Direkt Handling-Knapp', description: 'Varje insikt har CTA.', color: 'purple', principle: 'Konverteringsdesign', focusType: 'glow' }
      ],
      scoreDetail: [
        { id: 'sd1', target: 'score-weights', title: 'Transparent Algoritm', description: 'Visar exakt hur poäng beräknas.', color: 'blue', principle: 'Transparens', focusType: 'box' },
        { id: 'sd2', target: 'improvement-tips', title: 'Actionable Tips', description: 'Varje metrik har konkret förbättringsförslag.', color: 'green', principle: 'Praktisk Vägledning', focusType: 'box' },
        { id: 'sd3', target: 'metric-bars', title: 'Visuell Progression', description: 'Varje delscore har egen progress bar.', color: 'purple', principle: 'Datavisualisering', focusType: 'ring' }
      ],
      history: [
        { id: 'hi1', target: 'history-list', title: 'Kronologisk Översikt', description: 'Senaste först med tydliga datum.', color: 'blue', principle: 'Informationsarkitektur', focusType: 'ring' },
        { id: 'hi2', target: 'sleep-duration-badge', title: 'Visuell Färgkodning', description: 'Grön/gul/röd för sömnlängd.', color: 'green', principle: 'Visuell Hierarki', focusType: 'glow' },
        { id: 'hi3', target: 'mood-emoji', title: 'Emoji för Snabb Läsning', description: 'Emotionell data lättare att scanna.', color: 'yellow', principle: 'Kognitiv Ekonomi', focusType: 'box' }
      ],
      settings: [
        { id: 's1', target: 'toggle-switches', title: 'Toggle-Switchar', description: 'Fysisk switch-metafor gör binära tillstånd begripliga.', color: 'blue', principle: 'Affordansdesign', focusType: 'ring' },
        { id: 's2', target: 'delete-button', title: 'Destruktiv Handlingsstil', description: 'Raderingsalternativ använder röd bakgrund/kant.', color: 'yellow', principle: 'Säkerhetsdesign', focusType: 'box' }
      ]
    },
    en: {
    welcome: [
      { id: 'w1', target: 'feature-cards', title: 'Progressive Disclosure', description: 'Users see value propositions before any commitment. Three benefit cards establish trust and set expectations without overwhelming.', color: 'blue', principle: 'UX Pattern', focusType: 'ring' },
      { id: 'w2', target: 'privacy-card', title: 'Privacy-First Messaging', description: 'Security concerns addressed immediately with "local storage" messaging. Reduces anxiety for teen users and parents.', color: 'green', principle: 'User Psychology', focusType: 'ring' },
      { id: 'w3', target: 'cta-button', title: 'Single Clear CTA', description: 'One action reduces decision paralysis. Large touch target (min 44px) meets accessibility standards.', color: 'purple', principle: 'Accessibility', focusType: 'box' },
      { id: 'w4', target: 'theme-icon', title: 'Adaptive Theming', description: 'Theme auto-switches based on time of day. Evening mode uses warm, calming colors to support sleep hygiene.', color: 'yellow', principle: 'UX Pattern', focusType: 'glow' }
    ],
    pin: [
      { id: 'p1', target: 'pin-dots', title: 'Two-Step Verification', description: 'PIN confirmation prevents typos. Visual feedback (filled dots) provides clear progress indication.', color: 'blue', principle: 'UX Pattern', focusType: 'ring' },
      { id: 'p2', target: 'pin-keypad', title: 'Tactile Feedback', description: 'Large buttons (min 56px) with active states provide satisfying interaction. Scale animation confirms input.', color: 'purple', principle: 'Interaction Design', focusType: 'box' },
      { id: 'p3', target: 'pin-instructions', title: 'Contextual Messaging', description: 'Security explanation changes between "enter" and "confirm" steps, reducing cognitive load.', color: 'green', principle: 'Content Strategy', focusType: 'glow' }
    ],
    profile: [
      { id: 'pr1', target: 'name-input', title: 'Optional Personalization', description: 'Name marked as optional lowers barrier to getting started. Users can skip without feeling guilty.', color: 'blue', principle: 'UX Pattern', focusType: 'box' },
      { id: 'pr2', target: 'progress-indicator', title: 'Visual Progress Bar', description: 'Step indicator (3 of 5) creates clear expectation of what remains. Reduces perceived effort.', color: 'purple', principle: 'Progress Visualization', focusType: 'ring' },
      { id: 'pr3', target: 'sleep-goal-slider', title: 'Interactive Slider', description: 'Range slider makes selection quick and playful. Visual feedback (highlighted number) confirms choice immediately.', color: 'green', principle: 'Interaction Design', focusType: 'ring' },
      { id: 'pr4', target: 'bedtime-input', title: 'Contextual Default Value', description: 'Sleep goal starts at 8h (recommended for teens). Smart defaults reduce decision fatigue.', color: 'yellow', principle: 'Design System', focusType: 'box' }
    ],
    goalSelection: [
      { id: 'gs1', target: 'goal-cards', title: 'Forced Choice', description: 'Users must select a goal before continuing. Creates initial commitment and clear starting direction.', color: 'blue', principle: 'Behavior Change', focusType: 'ring' },
      { id: 'gs2', target: 'goal-benefit', title: 'Benefit-Driven Design', description: 'Each goal shows concrete benefit (Faster sleep onset). Outcome-focus motivates more than process.', color: 'green', principle: 'Value Proposition', focusType: 'glow' },
      { id: 'gs3', target: 'selected-goal', title: 'Visual Selection Feedback', description: 'Selected card scales up with checkmark. Multi-sensory feedback confirms action.', color: 'purple', principle: 'Feedback Design', focusType: 'box' },
      { id: 'gs4', target: 'goal-cards', title: 'Limited Choice', description: 'Three options follow "rule of three" - enough for choice without overwhelming.', color: 'yellow', principle: 'Cognitive Load', focusType: 'ring' }
    ],
    success: [
      { id: 'su1', target: 'celebration-emoji', title: 'Celebration Moment', description: 'Large emoji and confirmation creates positive ending. First impression of app becomes successful completion.', color: 'green', principle: 'User Psychology', focusType: 'glow' },
      { id: 'su2', target: 'next-steps', title: 'Expectation Management', description: 'Next steps list shows what comes next. Reduces uncertainty and builds mental model.', color: 'blue', principle: 'Onboarding', focusType: 'ring' },
      { id: 'su3', target: 'contextual-message', title: 'Time-Contextual Guidance', description: 'Instructions change based on time of day (evening vs morning). Feels more personal and relevant.', color: 'purple', principle: 'Personalization', focusType: 'box' }
    ],
    dashboard: [
      { id: 'd1', target: 'level-progress', title: 'Gamification Layer', description: 'Level progression with clear milestones creates long-term engagement. Progress bar shows "distance to next reward" rather than "total completion".', color: 'purple', principle: 'Gamification', focusType: 'ring' },
      { id: 'd2', target: 'habit-cards', title: 'Instant Gratification', description: '+10 XP animation appears immediately on habit completion. Micro-rewards trigger dopamine response, building positive associations.', color: 'green', principle: 'Behavioral Psychology', focusType: 'ring' },
      { id: 'd3', target: 'sleep-score', title: 'Visual Hierarchy', description: 'Sleep score uses largest typography and central position. Size, color, and placement follow F-pattern reading flow.', color: 'blue', principle: 'Visual Design', focusType: 'glow' },
      { id: 'd4', target: 'insight-badge', title: 'Actionable Insights Badge', description: 'Red notification badge creates urgency without being intrusive. Positioned on valuable content, not just alerts.', color: 'yellow', principle: 'Information Architecture', focusType: 'box' },
      { id: 'd5', target: 'greeting-text', title: 'Contextual Greetings', description: 'Time-aware messaging (morning/evening) makes experience feel personalized and present.', color: 'green', principle: 'Personalization', focusType: 'box' }
    ],
    logging: [
      { id: 'l1', target: 'time-inputs', title: 'Smart Defaults', description: 'Time inputs pre-filled with typical values. Reduces friction while allowing customization.', color: 'blue', principle: 'UX Pattern', focusType: 'box' },
      { id: 'l2', target: 'duration-display', title: 'Real-Time Calculation', description: 'Duration updates live as times change. Immediate feedback reinforces input accuracy.', color: 'green', principle: 'Feedback Design', focusType: 'glow' },
      { id: 'l3', target: 'mood-picker', title: 'Optional Mood Tracking', description: 'Emoji selection marked as optional reduces pressure. Large touch targets make quick logging easy.', color: 'yellow', principle: 'User Psychology', focusType: 'box' }
    ],
    habitDetail: [
      { id: 'h1', target: 'week-calendar', title: 'Streak Visualization', description: 'Weekly calendar balances motivation (showing progress) with realism (acknowledging imperfection). Current day highlighted with border.', color: 'purple', principle: 'Gamification', focusType: 'ring' },
      { id: 'h2', target: 'why-section', title: 'Educational Layer', description: 'Scientific explanation builds credibility. Teens more likely to adopt habits they understand the "why" behind.', color: 'blue', principle: 'Educational Design', focusType: 'glow' },
      { id: 'h3', target: 'how-section', title: 'Step-by-Step Instructions', description: 'Numbered list with clear micro-actions. Reduces "where do I start?" friction by making habits feel achievable.', color: 'green', principle: 'Behavior Change', focusType: 'box' },
      { id: 'h4', target: 'expected-result', title: 'Expected Outcome', description: 'Specific, measurable result ("~20 min faster") creates clear success criteria and motivates persistence.', color: 'yellow', principle: 'Goal Setting', focusType: 'box' }
    ],
    habitLibrary: [
      { id: 'hl1', target: 'locked-habits', title: 'Progressive Unlocking', description: 'Locked habits create curiosity and reward system progression. Prevents overwhelm for new users.', color: 'purple', principle: 'Gamification', focusType: 'glow' },
      { id: 'hl2', target: 'difficulty-badge', title: 'Difficulty Indicators', description: 'Color-coded difficulty (green/yellow/red) sets expectations. Users can self-select appropriate challenge level.', color: 'yellow', principle: 'User Control', focusType: 'box' },
      { id: 'hl3', target: 'habit-list', title: 'Category Organization', description: 'Habits grouped by type (routine, nutrition, environment) aid discovery and mental modeling.', color: 'blue', principle: 'Information Architecture', focusType: 'ring' }
    ],
    insights: [
      { id: 'i1', target: 'key-insight', title: 'Data Storytelling', description: 'Patterns presented as narratives ("You sleep 38% better when...") rather than raw numbers. Humans process stories 22x better than facts.', color: 'blue', principle: 'Data Visualization', focusType: 'glow' },
      { id: 'i2', target: 'weekly-chart', title: 'Visual Trend Analysis', description: 'Bar chart makes it easy to see patterns over time. Every data point links to specific action.', color: 'green', principle: 'Data Visualization', focusType: 'ring' },
      { id: 'i3', target: 'score-breakdown', title: 'Progressive Disclosure', description: 'Summary score leads to detailed breakdown. Users drill down only when interested, reducing cognitive overload.', color: 'purple', principle: 'Information Architecture', focusType: 'box' },
      { id: 'i4', target: 'score-metrics', title: 'Color-Coded Metrics', description: 'Consistent color language: Blue (duration), Purple (consistency), Green (quality), Yellow (mood). Reduces learning curve.', color: 'yellow', principle: 'Design System', focusType: 'glow' }
    ],
    patterns: [
      { id: 'pa1', target: 'pattern-cards', title: 'Positive-Negative Categorization', description: 'Green cards for good habits, red for bad. Color coding enables quick scanning.', color: 'blue', principle: 'Information Architecture', focusType: 'ring' },
      { id: 'pa2', target: 'sample-size', title: 'Evidence-Based Credibility', description: 'Sample size ("Based on 12 nights") shows transparency. Users trust data more with context.', color: 'green', principle: 'Credibility Signals', focusType: 'box' },
      { id: 'pa3', target: 'percentage-stat', title: 'Specific Percentages', description: '38% faster feels more credible than "much faster". Precision builds trust.', color: 'yellow', principle: 'Data Visualization', focusType: 'box' },
      { id: 'pa4', target: 'add-goal-button', title: 'Direct Action Button', description: 'Each insight has CTA (Add as goal). Converts passive reading into active change.', color: 'purple', principle: 'Conversion Design', focusType: 'glow' }
    ],
    scoreDetail: [
      { id: 'sd1', target: 'score-weights', title: 'Transparent Algorithm', description: 'Shows exactly how score is calculated (40% duration, 30% consistency). Builds trust through openness.', color: 'blue', principle: 'Transparency', focusType: 'box' },
      { id: 'sd2', target: 'improvement-tips', title: 'Actionable Tips', description: 'Each metric has concrete improvement suggestion. Makes data useful instead of just informative.', color: 'green', principle: 'Practical Guidance', focusType: 'box' },
      { id: 'sd3', target: 'metric-bars', title: 'Visual Progression', description: 'Each subscore has own progress bar. Makes it easy to see where improvement is needed.', color: 'purple', principle: 'Data Visualization', focusType: 'ring' }
    ],
    history: [
      { id: 'hi1', target: 'history-list', title: 'Chronological Overview', description: 'Latest first with clear dates. Matches mental model of "recent" to "further back".', color: 'blue', principle: 'Information Architecture', focusType: 'ring' },
      { id: 'hi2', target: 'sleep-duration-badge', title: 'Visual Color Coding', description: 'Green/yellow/red for sleep duration. Instant understanding without reading numbers.', color: 'green', principle: 'Visual Hierarchy', focusType: 'glow' },
      { id: 'hi3', target: 'mood-emoji', title: 'Emoji for Quick Reading', description: 'Mood icons next to each night. Emotional data easier to scan than text.', color: 'yellow', principle: 'Cognitive Economy', focusType: 'box' }
    ],
    settings: [
      { id: 's1', target: 'toggle-switches', title: 'Toggle Switches', description: 'Physical switch metaphor makes binary states instantly understandable. Animation provides satisfying feedback.', color: 'blue', principle: 'Affordance Design', focusType: 'ring' },
      { id: 's2', target: 'delete-button', title: 'Destructive Action Styling', description: 'Delete option uses red background/border to signal danger. Positioned last to prevent accidental taps.', color: 'yellow', principle: 'Safety Design', focusType: 'box' }
    ]
  },

  es: {
    welcome: [
      { id: 'w1', target: 'feature-cards', title: 'Divulgación Progresiva', description: 'Los usuarios ven propuestas de valor antes de cualquier compromiso. Tres tarjetas de beneficios establecen confianza y expectativas sin abrumar.', color: 'blue', principle: 'Patrón de UX', focusType: 'ring' },
      { id: 'w2', target: 'privacy-card', title: 'Mensaje de Privacidad Primero', description: 'Las preocupaciones de seguridad se abordan inmediatamente con el mensaje de "almacenamiento local". Reduce la ansiedad de usuarios adolescentes y padres.', color: 'green', principle: 'Psicología del Usuario', focusType: 'ring' },
      { id: 'w3', target: 'cta-button', title: 'CTA Único y Claro', description: 'Una acción reduce la parálisis de decisión. Objetivo táctil grande (mín 44px) cumple estándares de accesibilidad.', color: 'purple', principle: 'Accesibilidad', focusType: 'box' },
      { id: 'w4', target: 'theme-icon', title: 'Tematización Adaptativa', description: 'El tema cambia automáticamente según la hora del día. El modo nocturno usa colores cálidos y calmantes para apoyar la higiene del sueño.', color: 'yellow', principle: 'Patrón de UX', focusType: 'glow' }
    ],
    pin: [
      { id: 'p1', target: 'pin-dots', title: 'Verificación en Dos Pasos', description: 'La confirmación de PIN previene errores tipográficos. La retroalimentación visual (puntos llenos) proporciona indicación clara de progreso.', color: 'blue', principle: 'Patrón de UX', focusType: 'ring' },
      { id: 'p2', target: 'pin-keypad', title: 'Retroalimentación Táctil', description: 'Botones grandes (mín 56px) con estados activos proporcionan interacción satisfactoria. La animación de escala confirma la entrada.', color: 'purple', principle: 'Diseño de Interacción', focusType: 'box' },
      { id: 'p3', target: 'pin-instructions', title: 'Mensajería Contextual', description: 'La explicación de seguridad cambia entre los pasos "ingresar" y "confirmar", reduciendo la carga cognitiva.', color: 'green', principle: 'Estrategia de Contenido', focusType: 'glow' }
    ],
    profile: [
      { id: 'pr1', target: 'name-input', title: 'Personalización Opcional', description: 'Nombre marcado como opcional reduce la barrera para comenzar. Los usuarios pueden omitir sin sentirse culpables.', color: 'blue', principle: 'Patrón de UX', focusType: 'box' },
      { id: 'pr2', target: 'progress-indicator', title: 'Barra de Progreso Visual', description: 'Indicador de paso (3 de 5) crea expectativa clara de lo que queda. Reduce el esfuerzo percibido.', color: 'purple', principle: 'Visualización de Progreso', focusType: 'ring' },
      { id: 'pr3', target: 'sleep-goal-slider', title: 'Control Deslizante Interactivo', description: 'El control deslizante hace la selección rápida y divertida. La retroalimentación visual (número resaltado) confirma la elección inmediatamente.', color: 'green', principle: 'Diseño de Interacción', focusType: 'ring' },
      { id: 'pr4', target: 'bedtime-input', title: 'Valor Predeterminado Contextual', description: 'La meta de sueño comienza en 8h (recomendado para adolescentes). Los valores predeterminados inteligentes reducen la fatiga de decisión.', color: 'yellow', principle: 'Sistema de Diseño', focusType: 'box' }
    ],
    goalSelection: [
      { id: 'gs1', target: 'goal-cards', title: 'Elección Forzada', description: 'Los usuarios deben seleccionar una meta antes de continuar. Crea compromiso inicial y dirección de inicio clara.', color: 'blue', principle: 'Cambio de Comportamiento', focusType: 'ring' },
      { id: 'gs2', target: 'goal-benefit', title: 'Diseño Impulsado por Beneficios', description: 'Cada meta muestra beneficio concreto (Dormirse más rápido). El enfoque en resultados motiva más que el proceso.', color: 'green', principle: 'Propuesta de Valor', focusType: 'glow' },
      { id: 'gs3', target: 'selected-goal', title: 'Retroalimentación Visual de Selección', description: 'La tarjeta seleccionada se escala con marca de verificación. La retroalimentación multisensorial confirma la acción.', color: 'purple', principle: 'Diseño de Retroalimentación', focusType: 'box' },
      { id: 'gs4', target: 'goal-cards', title: 'Elección Limitada', description: 'Tres opciones siguen la "regla de tres" - suficiente para elegir sin abrumar.', color: 'yellow', principle: 'Carga Cognitiva', focusType: 'ring' }
    ],
    success: [
      { id: 'su1', target: 'celebration-emoji', title: 'Momento de Celebración', description: 'Emoji grande y confirmación crea un final positivo. La primera impresión de la app se convierte en una finalización exitosa.', color: 'green', principle: 'Psicología del Usuario', focusType: 'glow' },
      { id: 'su2', target: 'next-steps', title: 'Gestión de Expectativas', description: 'La lista de próximos pasos muestra lo que viene después. Reduce la incertidumbre y construye modelo mental.', color: 'blue', principle: 'Incorporación', focusType: 'ring' },
      { id: 'su3', target: 'contextual-message', title: 'Guía Contextual de Tiempo', description: 'Las instrucciones cambian según la hora del día (noche vs mañana). Se siente más personal y relevante.', color: 'purple', principle: 'Personalización', focusType: 'box' }
    ],
    dashboard: [
      { id: 'd1', target: 'level-progress', title: 'Capa de Gamificación', description: 'Progresión de niveles con hitos claros crea compromiso a largo plazo. La barra de progreso muestra "distancia a la próxima recompensa" en lugar de "finalización total".', color: 'purple', principle: 'Gamificación', focusType: 'ring' },
      { id: 'd2', target: 'habit-cards', title: 'Gratificación Instantánea', description: 'La animación +10 XP aparece inmediatamente al completar el hábito. Las micro-recompensas desencadenan respuesta de dopamina, construyendo asociaciones positivas.', color: 'green', principle: 'Psicología Conductual', focusType: 'ring' },
      { id: 'd3', target: 'sleep-score', title: 'Jerarquía Visual', description: 'La puntuación de sueño usa la tipografía más grande y posición central. Tamaño, color y ubicación siguen el flujo de lectura en patrón F.', color: 'blue', principle: 'Diseño Visual', focusType: 'glow' },
      { id: 'd4', target: 'insight-badge', title: 'Insignia de Perspectivas Accionables', description: 'La insignia de notificación roja crea urgencia sin ser intrusiva. Posicionada en contenido valioso, no solo alertas.', color: 'yellow', principle: 'Arquitectura de Información', focusType: 'box' },
      { id: 'd5', target: 'greeting-text', title: 'Saludos Contextuales', description: 'Mensajes conscientes del tiempo (mañana/noche) hacen que la experiencia se sienta personalizada y presente.', color: 'green', principle: 'Personalización', focusType: 'box' }
    ],
    logging: [
      { id: 'l1', target: 'time-inputs', title: 'Valores Predeterminados Inteligentes', description: 'Entradas de tiempo prellenadas con valores típicos. Reduce fricción mientras permite personalización.', color: 'blue', principle: 'Patrón de UX', focusType: 'box' },
      { id: 'l2', target: 'duration-display', title: 'Cálculo en Tiempo Real', description: 'La duración se actualiza en vivo a medida que cambian los tiempos. La retroalimentación inmediata refuerza la precisión de entrada.', color: 'green', principle: 'Diseño de Retroalimentación', focusType: 'glow' },
      { id: 'l3', target: 'mood-picker', title: 'Seguimiento de Humor Opcional', description: 'Selección de emoji marcada como opcional reduce presión. Objetivos táctiles grandes hacen el registro rápido fácil.', color: 'yellow', principle: 'Psicología del Usuario', focusType: 'box' }
    ],
    habitDetail: [
      { id: 'h1', target: 'week-calendar', title: 'Visualización de Rachas', description: 'El calendario semanal equilibra motivación (mostrando progreso) con realismo (reconociendo imperfección). Día actual resaltado con borde.', color: 'purple', principle: 'Gamificación', focusType: 'ring' },
      { id: 'h2', target: 'why-section', title: 'Capa Educativa', description: 'La explicación científica construye credibilidad. Los adolescentes son más propensos a adoptar hábitos cuando entienden el "por qué".', color: 'blue', principle: 'Diseño Educativo', focusType: 'glow' },
      { id: 'h3', target: 'how-section', title: 'Instrucciones Paso a Paso', description: 'Lista numerada con micro-acciones claras. Reduce la fricción de "¿por dónde empiezo?" haciendo que los hábitos se sientan alcanzables.', color: 'green', principle: 'Cambio de Comportamiento', focusType: 'box' },
      { id: 'h4', target: 'expected-result', title: 'Resultado Esperado', description: 'Resultado específico y medible ("~20 min más rápido") crea criterios claros de éxito y motiva la persistencia.', color: 'yellow', principle: 'Establecimiento de Metas', focusType: 'box' }
    ],
    habitLibrary: [
      { id: 'hl1', target: 'locked-habits', title: 'Desbloqueo Progresivo', description: 'Los hábitos bloqueados crean curiosidad y progresión del sistema de recompensas. Previene abrumar a nuevos usuarios.', color: 'purple', principle: 'Gamificación', focusType: 'glow' },
      { id: 'hl2', target: 'difficulty-badge', title: 'Indicadores de Dificultad', description: 'Dificultad codificada por color (verde/amarillo/rojo) establece expectativas. Los usuarios pueden autoseleccionar el nivel de desafío apropiado.', color: 'yellow', principle: 'Control del Usuario', focusType: 'box' },
      { id: 'hl3', target: 'habit-list', title: 'Organización por Categorías', description: 'Hábitos agrupados por tipo (rutina, nutrición, entorno) ayudan al descubrimiento y modelado mental.', color: 'blue', principle: 'Arquitectura de Información', focusType: 'ring' }
    ],
    insights: [
      { id: 'i1', target: 'key-insight', title: 'Narrativa de Datos', description: 'Los patrones se presentan como narrativas ("Duermes 38% mejor cuando...") en lugar de números crudos. Los humanos procesan historias 22x mejor que hechos.', color: 'blue', principle: 'Visualización de Datos', focusType: 'glow' },
      { id: 'i2', target: 'weekly-chart', title: 'Análisis Visual de Tendencias', description: 'El gráfico de barras facilita ver patrones a lo largo del tiempo. Cada punto de datos vincula a una acción específica.', color: 'green', principle: 'Visualización de Datos', focusType: 'ring' },
      { id: 'i3', target: 'score-breakdown', title: 'Divulgación Progresiva', description: 'La puntuación resumen lleva al desglose detallado. Los usuarios profundizan solo cuando están interesados, reduciendo la sobrecarga cognitiva.', color: 'purple', principle: 'Arquitectura de Información', focusType: 'box' },
      { id: 'i4', target: 'score-metrics', title: 'Métricas Codificadas por Color', description: 'Lenguaje de color consistente: Azul (duración), Morado (consistencia), Verde (calidad), Amarillo (humor). Reduce la curva de aprendizaje.', color: 'yellow', principle: 'Sistema de Diseño', focusType: 'glow' }
    ],
    patterns: [
      { id: 'pa1', target: 'pattern-cards', title: 'Categorización Positivo-Negativo', description: 'Tarjetas verdes para buenos hábitos, rojas para malos. La codificación de color permite escaneo rápido.', color: 'blue', principle: 'Arquitectura de Información', focusType: 'ring' },
      { id: 'pa2', target: 'sample-size', title: 'Credibilidad Basada en Evidencia', description: 'Tamaño de muestra ("Basado en 12 noches") muestra transparencia. Los usuarios confían más en datos con contexto.', color: 'green', principle: 'Señales de Credibilidad', focusType: 'box' },
      { id: 'pa3', target: 'percentage-stat', title: 'Porcentajes Específicos', description: '38% más rápido se siente más creíble que "mucho más rápido". La precisión genera confianza.', color: 'yellow', principle: 'Visualización de Datos', focusType: 'box' },
      { id: 'pa4', target: 'add-goal-button', title: 'Botón de Acción Directa', description: 'Cada perspectiva tiene CTA (Añadir como meta). Convierte la lectura pasiva en cambio activo.', color: 'purple', principle: 'Diseño de Conversión', focusType: 'glow' }
    ],
    scoreDetail: [
      { id: 'sd1', target: 'score-weights', title: 'Algoritmo Transparente', description: 'Muestra exactamente cómo se calcula la puntuación (40% duración, 30% consistencia). Genera confianza a través de la apertura.', color: 'blue', principle: 'Transparencia', focusType: 'box' },
      { id: 'sd2', target: 'improvement-tips', title: 'Consejos Accionables', description: 'Cada métrica tiene sugerencia concreta de mejora. Hace que los datos sean útiles en lugar de solo informativos.', color: 'green', principle: 'Guía Práctica', focusType: 'box' },
      { id: 'sd3', target: 'metric-bars', title: 'Progresión Visual', description: 'Cada subpuntuación tiene su propia barra de progreso. Facilita ver dónde se necesita mejora.', color: 'purple', principle: 'Visualización de Datos', focusType: 'ring' }
    ],
    history: [
      { id: 'hi1', target: 'history-list', title: 'Vista Cronológica', description: 'Lo más reciente primero con fechas claras. Coincide con el modelo mental de "reciente" a "más atrás".', color: 'blue', principle: 'Arquitectura de Información', focusType: 'ring' },
      { id: 'hi2', target: 'sleep-duration-badge', title: 'Codificación Visual por Color', description: 'Verde/amarillo/rojo para duración del sueño. Comprensión instantánea sin leer números.', color: 'green', principle: 'Jerarquía Visual', focusType: 'glow' },
      { id: 'hi3', target: 'mood-emoji', title: 'Emoji para Lectura Rápida', description: 'Iconos de humor junto a cada noche. Datos emocionales más fáciles de escanear que texto.', color: 'yellow', principle: 'Economía Cognitiva', focusType: 'box' }
    ],
    settings: [
      { id: 's1', target: 'toggle-switches', title: 'Interruptores de Palanca', description: 'Metáfora de interruptor físico hace que los estados binarios sean instantáneamente comprensibles. La animación proporciona retroalimentación satisfactoria.', color: 'blue', principle: 'Diseño de Affordance', focusType: 'ring' },
      { id: 's2', target: 'delete-button', title: 'Estilo de Acción Destructiva', description: 'La opción de eliminar usa fondo/borde rojo para señalar peligro. Posicionada al final para prevenir toques accidentales.', color: 'yellow', principle: 'Diseño de Seguridad', focusType: 'box' }
    ]
  }
};