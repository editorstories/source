// ============================================
// 🎯 ENHANCED SMOOTH SCROLL UTILITIES
// ============================================

interface ScrollToOptions {
  element: HTMLElement;
  offset?: number;
  duration?: number;
  headerOffset?: number;
  onComplete?: () => void;
}

/**
 * Enhanced smooth scroll to center an element in viewport
 * Accounts for sticky headers and proper centering
 */
export const smoothScrollToCenter = ({
  element,
  offset = 0,
  duration = 800,
  headerOffset = 140, // Default: main header (80px) + sticky nav (~60px)
  onComplete
}: ScrollToOptions) => {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;

  // Calculate available viewport height after accounting for headers
  const availableHeight = viewportHeight - headerOffset;

  // Calculate target position to center element in available space
  const elementTop = rect.top + scrollTop;
  const elementHeight = rect.height;
  const targetScroll = elementTop - headerOffset - (availableHeight / 2) + (elementHeight / 2) + offset;

  // Ensure we don't scroll past the top
  const finalTarget = Math.max(0, targetScroll);

  const startScroll = scrollTop;
  const distance = finalTarget - startScroll;
  const startTime = performance.now();

  const easeInOutCubic = (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const scroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startScroll + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    } else if (onComplete) {
      onComplete();
    }
  };

  requestAnimationFrame(scroll);
};

/**
 * Calculate if element is properly centered in viewport
 */
export const isInViewport = (element: HTMLElement, threshold = 0.5): boolean => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const elementMiddle = rect.top + rect.height / 2;
  const viewportMiddle = viewportHeight / 2;

  return Math.abs(elementMiddle - viewportMiddle) < viewportHeight * threshold;
};

/**
 * Check if element is properly centered accounting for headers
 */
export const isCentered = (
  element: HTMLElement,
  headerOffset = 140,
  tolerance = 50
): boolean => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const availableHeight = viewportHeight - headerOffset;

  const elementMiddle = rect.top + rect.height / 2;
  const targetMiddle = headerOffset + availableHeight / 2;

  return Math.abs(elementMiddle - targetMiddle) < tolerance;
};

// ============================================
// 🎨 ANIMATION UTILITIES
// ============================================

/**
 * Create staggered animation delay
 */
export const getStaggerDelay = (index: number, baseDelay = 100): number => {
  return index * baseDelay;
};

/**
 * Parse related question ID
 */
export const parseRelatedId = (relatedId: string): { pathId: string; questionIndex: number } => {
  const [pathId, questionIndex] = relatedId.split('-');
  return {
    pathId,
    questionIndex: parseInt(questionIndex, 10)
  };
};

// ============================================
// 🎯 FOCUS MANAGEMENT
// ============================================

interface FocusOptions {
  element: HTMLElement;
  duration?: number;
  onFocusStart?: () => void;
  onFocusEnd?: () => void;
}

/**
 * Apply focus effect with automatic cleanup
 */
export const applyFocusEffect = ({
  element,
  duration = 3000,
  onFocusStart,
  onFocusEnd
}: FocusOptions): (() => void) => {
  if (onFocusStart) onFocusStart();

  const timeoutId = setTimeout(() => {
    if (onFocusEnd) onFocusEnd();
  }, duration);

  // Return cleanup function
  return () => {
    clearTimeout(timeoutId);
    if (onFocusEnd) onFocusEnd();
  };
};

// ============================================
// 📊 PROGRESS CALCULATION
// ============================================

/**
 * Calculate completion percentage
 */
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.min(Math.max(completed / total, 0), 1);
};

/**
 * Format progress as percentage string
 */
export const formatProgress = (progress: number): string => {
  return `${Math.round(progress * 100)}%`;
};

// ============================================
// 🎭 TRANSITION HELPERS
// ============================================

/**
 * Wait for transition to complete
 */
export const waitForTransition = (duration: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

/**
 * Debounce function for performance
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ============================================
// 📱 RESPONSIVE HELPERS
// ============================================

/**
 * Get dynamic header offset based on viewport
 */
export const getHeaderOffset = (): number => {
  const isMobile = window.innerWidth < 768;
  // Mobile: main header + compact sticky nav
  // Desktop: main header + full sticky nav
  return isMobile ? 140 : 150;
};

/**
 * Smooth transition between navigation states
 */
export const handleNavigationTransition = async (
  isTransitioningToSticky: boolean,
  onTransitionComplete?: () => void
): Promise<void> => {
  // Wait for fade out
  await waitForTransition(300);

  if (onTransitionComplete) {
    onTransitionComplete();
  }

  // Wait for fade in
  await waitForTransition(300);
};