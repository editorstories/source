// AdaptiveNavigation/hooks/useTranslations.ts
// Pausing this. Adding to repository and keeping as reference
'use client';

import { useState, useEffect } from 'react';

// Match existing translation pattern
const translations = {
  sv: {
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
    'nav.close': 'Stäng'
  },
  en: {
    'nav.intro.title': 'UX designer & developer',

    'nav.hero.title': 'Home',
    'nav.hero.preview': 'Welcome to my portfolio. Start your journey here.',
    'nav.hero.short': 'Home',

    'nav.skills.title': 'Skills',
    'nav.skills.preview': 'Explore 100+ technologies, frameworks, and tools I master.',
    'nav.skills.short': 'Skills',

    'nav.somnlogg.title': 'Somnlogg',
    'nav.somnlogg.preview': 'Sleep tracking UX case study with interactive prototypes.',
    'nav.somnlogg.short': 'Work',

    'nav.education.title': 'Education',
    'nav.education.preview': 'Academic background with timeline and skill connections.',
    'nav.education.short': 'Education',

    'nav.qna.title': 'Q&A',
    'nav.qna.preview': 'Frequently asked questions with smart categorization.',
    'nav.qna.short': 'Q&A',

    'nav.youAreHere': 'You are here',
    'nav.openMenu': 'Open navigation menu',
    'nav.close': 'Close'
  },
  es: {
    'nav.intro.title': 'Diseñador UX & desarrollador',

    'nav.hero.title': 'Inicio',
    'nav.hero.preview': 'Bienvenido a mi portafolio. Comienza tu viaje aquí.',
    'nav.hero.short': 'Inicio',

    'nav.skills.title': 'Habilidades',
    'nav.skills.preview': 'Explora 100+ tecnologías, frameworks y herramientas que domino.',
    'nav.skills.short': 'Skills',

    'nav.somnlogg.title': 'Somnlogg',
    'nav.somnlogg.preview': 'Estudio de caso UX de seguimiento del sueño con prototipos interactivos.',
    'nav.somnlogg.short': 'Trabajo',

    'nav.education.title': 'Educación',
    'nav.education.preview': 'Antecedentes académicos con línea de tiempo y conexiones de habilidades.',
    'nav.education.short': 'Educación',

    'nav.qna.title': 'Preguntas',
    'nav.qna.preview': 'Preguntas frecuentes con categorización inteligente.',
    'nav.qna.short': 'Q&A',

    'nav.youAreHere': 'Estás aquí',
    'nav.openMenu': 'Abrir menú de navegación',
    'nav.close': 'Cerrar'
  }
};

// Simple context-free translation hook matching the app's pattern
export function useTranslation(initialLocale: string = 'sv') {
  const [locale, setLocale] = useState(initialLocale);

  const t = (key: string): string => {
    return translations[locale as keyof typeof translations]?.[key] || key;
  };

  return { t, locale, setLocale };
}