import { Briefcase, GraduationCap, Globe, Target, Zap, MessageCircle, Sparkles } from 'lucide-react';
import { PathConfig, Translations, QnAContent, SummaryHighlights } from './types';

// ============================================
// 🎨 DESIGN SYSTEM
// ============================================

export const glassStyles = {
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
    muted: 'text-gray-500/50 dark:text-gray-500/50',
    icon: 'text-sky-600 font-thin',
  }
};

// ============================================
// 🗺️ PATH CONFIGURATION
// ============================================

export const pathConfig: PathConfig[] = [
  { id: 'work', icon: Briefcase, color: '#FF6B6B' },
  { id: 'journey', icon: GraduationCap, color: '#4ECDC4' },
  { id: 'location', icon: Globe, color: '#45B7D1' },
  { id: 'offer', icon: Target, color: '#96CEB4' },
  { id: 'start', icon: Zap, color: '#FFEAA7' },
  { id: 'collaboration', icon: MessageCircle, color: '#A78BFA' },
  { id: 'value', icon: Sparkles, color: '#F472B6' }
];

// ============================================
// 🌐 TRANSLATIONS
// ============================================

export const translations: { [key: string]: Translations } = {
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

// Note: QnA content would be imported from a separate data file
// For now, export the structure. In production, this would be:
// export { qnaContent } from './qnaData';
// export { summaryHighlights } from './summaryData';