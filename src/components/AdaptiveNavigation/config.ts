// AdaptiveNavigation/config.ts

export interface Section {
  id: string;
  icon: string;
  translationKey: string;
  previewKey: string;
  backgroundImage?: string;
  overlayImage?: string;
  showLanguageSwitcher?: boolean;
  isIntro?: boolean;
}

export const SECTIONS: Section[] = [
  {
    id: 'hero',
    icon: '🏠',
    translationKey: 'nav.hero.title',
    previewKey: 'nav.hero.preview',
  },
  {
    id: 'skills',
    icon: '♾️',
    translationKey: 'nav.skills.title',
    previewKey: 'nav.skills.preview',
  },
  {
    id: 'somnlogg',
    icon: '🌒 ',
    translationKey: 'nav.somnlogg.title',
    previewKey: 'nav.somnlogg.preview',
  },
  {
    id: 'education',
    icon: '📚',
    translationKey: 'nav.education.title',
    previewKey: 'nav.education.preview',
  },
  {
    id: 'qna',
    icon: '💬',
    translationKey: 'nav.qna.title',
    previewKey: 'nav.qna.preview',
  }
];