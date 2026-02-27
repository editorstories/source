import { LucideIcon } from 'lucide-react';

// ============================================
// 📦 CORE TYPE DEFINITIONS
// ============================================

export interface PathConfig {
  id: string;
  icon: LucideIcon;
  color: string;
}

export interface QnAItem {
  q: string;
  a: string;
  readTime: number;
  related: string[];
}

export interface Translations {
  [key: string]: string;
}

export interface QnAContent {
  [language: string]: {
    [pathId: string]: QnAItem[];
  };
}

export interface SummaryHighlights {
  [language: string]: {
    [pathId: string]: string;
  };
}

// ============================================
// 📦 COMPONENT PROPS
// ============================================

export interface LanguageSwitcherProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export interface StickyNavProps {
  paths: PathConfig[];
  activePath: string;
  onPathChange: (pathId: string) => void;
  t: (key: string) => string;
  isSticky: boolean;
  shouldShow: boolean;
  pathProgress: Record<string, number>;
}

export interface QnAItemProps {
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

export interface AskMoreCTAProps {
  t: (key: string) => string;
  isVisible: boolean;
}

export interface SummaryCardProps {
  exploredPaths: string[];
  t: (key: string) => string;
  onClose: () => void;
  language: string;
}

// ============================================
// 📦 NAVIGATION TYPES
// ============================================

export interface NavigationState {
  isSticky: boolean;
  shouldShow: boolean;
  isCompact: boolean;
}

export interface ScrollState {
  isScrolling: boolean;
  scrollDirection: 'up' | 'down' | null;
  lastScrollY: number;
}