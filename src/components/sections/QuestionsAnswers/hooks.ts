import { useState, useEffect, useRef, useCallback } from 'react';
import { translations } from './config';
import { NavigationState, ScrollState } from './types';

// ============================================
// 🎣 LANGUAGE HOOK
// ============================================

export const useLanguage = () => {
  const [language, setLanguage] = useState('sv');

  const t = useCallback((key: string) => {
    return translations[language]?.[key] || key;
  }, [language]);

  return { language, setLanguage, t };
};

export const useLanguageTemp = () => {
  const [language, setLanguage] = useState('sv');

  const t = useCallback((key: string) => {
    return translations[language]?.[key] || key;
  }, [language]);

  return { language, setLanguage, t };
};

// ============================================
// 🎣 NAVIGATION STATE HOOK
// ============================================

export const useNavigationState = (navRef: React.RefObject<HTMLDivElement>) => {
  const [state, setState] = useState<NavigationState>({
    isSticky: false,
    shouldShow: false,
    isCompact: false
  });

  const sectionTopRef = useRef<number>(0);

  useEffect(() => {
    const updateCompactMode = () => {
      setState(prev => ({ ...prev, isCompact: window.innerWidth < 768 }));
    };

    updateCompactMode();
    window.addEventListener('resize', updateCompactMode);
    return () => window.removeEventListener('resize', updateCompactMode);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setState(prev => ({
          ...prev,
          isSticky: rect.top <= 0,
          shouldShow: scrollY > sectionTopRef.current + 200
        }));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navRef]);

  useEffect(() => {
    const sectionElement = document.querySelector('[data-qna-section]');
    if (sectionElement) {
      sectionTopRef.current = sectionElement.getBoundingClientRect().top + window.scrollY;
    }
  }, []);

  return state;
};

// ============================================
// 🎣 SCROLL DETECTION HOOK
// ============================================

export const useScrollDirection = () => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolling: false,
    scrollDirection: null,
    lastScrollY: 0
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollState(prev => ({
        isScrolling: true,
        scrollDirection: currentScrollY > prev.lastScrollY ? 'down' : 'up',
        lastScrollY: currentScrollY
      }));

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollState(prev => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return scrollState;
};

// ============================================
// 🎣 QNA STATE MANAGEMENT HOOK
// ============================================

export const useQnAState = (activePath: string) => {
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [pinnedItems, setPinnedItems] = useState<Set<number>>(new Set());
  const [focusedItem, setFocusedItem] = useState<number | null>(null);

  // Reset state when path changes
  useEffect(() => {
    setQuestionsVisible(false);
    setExpandedItems(new Set());
    setPinnedItems(new Set());
    setFocusedItem(null);

    const timer = setTimeout(() => setQuestionsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [activePath]);

  const handleToggle = useCallback((index: number) => {
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
  }, [pinnedItems]);

  const handleTogglePin = useCallback((index: number) => {
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
  }, []);

  return {
    questionsVisible,
    expandedItems,
    pinnedItems,
    focusedItem,
    setFocusedItem,
    handleToggle,
    handleTogglePin
  };
};

// ============================================
// 🎣 PATH PROGRESS TRACKING HOOK
// ============================================

export const usePathProgress = (
  expandedItems: Set<number>,
  activePath: string,
  totalQuestions: number
) => {
  const [pathProgress, setPathProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const expandedCount = Array.from(expandedItems).length;
    const progress = totalQuestions > 0 ? expandedCount / totalQuestions : 0;

    setPathProgress(prev => ({
      ...prev,
      [activePath]: progress
    }));
  }, [expandedItems, activePath, totalQuestions]);

  return pathProgress;
};

// ============================================
// 🎣 SUMMARY TRIGGER HOOK
// ============================================

export const useSummaryTrigger = (viewedPaths: Set<string>) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summaryDismissed, setSummaryDismissed] = useState(false);
  const summaryTriggeredRef = useRef(false);

  useEffect(() => {
    if (viewedPaths.size >= 3 && !showSummary && !summaryDismissed && !summaryTriggeredRef.current) {
      summaryTriggeredRef.current = true;
      const timer = setTimeout(() => setShowSummary(true), 8000);
      return () => clearTimeout(timer);
    }
  }, [viewedPaths, showSummary, summaryDismissed]);

  const handleCloseSummary = useCallback(() => {
    setShowSummary(false);
    setSummaryDismissed(true);
  }, []);

  return { showSummary, handleCloseSummary };
};