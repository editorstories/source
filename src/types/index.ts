// Core theme types
export type ThemeType = 'light' | 'dark';

export interface ThemeClasses {
  glass: string;
  glassStrong: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
  shadow: string;
  background: string;
  cardBackground: string;
}

// Language types
export type Language = 'sv' | 'eu' | 'cas';
export interface LanguageContent {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
    location: string;
    experience: string;
  };
  skills: {
    title: string;
    categories: {
      frontend: string;
      backend: string;
      mobile: string;
      tools: string;
      soft: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
}

// Skill types - Updated with mobile category
export interface Skill {
  name: string;
  level: number;
  category: 'uxui' |'frontend' | 'backend' | 'mobile' | 'tools' | 'soft' | 'ai';
  icon?: string;
  color?: string;
}

// Experience types
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'other';
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

// Component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

// Context types
export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  themeClasses: ThemeClasses;
}

// Fixed LanguageContextType - t should be a function, not an object
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // This is a function that takes a key and returns a string
  translations: Translations;
}

// Mouse position for interactive effects
export interface MousePosition {
  x: number;
  y: number;
}

export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [language: string]: Translation;
}

// Intersection Observer hook
export interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Career mapping type for future implementation
export interface CareerSkillMapping {
  [career: string]: string[];
}