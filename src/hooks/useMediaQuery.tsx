// ============================================================================
// useMediaQuery.ts - Custom Hook for Responsive Behavior
// Place: src/hooks/useMediaQuery.ts
// ============================================================================

import { useState, useEffect } from 'react';

///**
// * Custom hook to detect media query matches
// *
// * @param query - CSS media query string (e.g., '(min-width: 768px)')
// * @returns boolean - true if the media query matches
// *
// * @example
// * const isDesktop = useMediaQuery('(min-width: 768px)');
// * const isMobile = useMediaQuery('(max-width: 767px)');
// * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
// */
export const useMediaQuery = (query: string): boolean => {
  // Initialize with false to prevent hydration mismatch in SSR
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Event listener callback
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

///**
// * ============================================================================
// * USAGE EXAMPLES:
// * ============================================================================
// *
// * // Basic desktop detection
// * const isDesktop = useMediaQuery('(min-width: 768px)');
// *
// * // Mobile detection
// * const isMobile = useMediaQuery('(max-width: 767px)');
// *
// * // Tablet detection
// * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
// *
// * // Orientation
// * const isPortrait = useMediaQuery('(orientation: portrait)');
// * const isLandscape = useMediaQuery('(orientation: landscape)');
// *
// * // Dark mode preference
// * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
// *
// * // Touch device
// * const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');
// *
// * ============================================================================
// * USAGE IN COMPONENTS:
// * ============================================================================
// */

// Example: Responsive component
export const ResponsiveComponentExample = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div>
      {isDesktop ? (
        <div>Desktop Layout</div>
      ) : (
        <div>Mobile Layout</div>
      )}
    </div>
  );
};

// Example: In FloatingRectanglesSystem
export const FloatingRectanglesSystemExample = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {/* Single responsive beehive - no duplication! */}
      <ImageHexagonBeehive
        butterflyProgress={0.5}
        fadeInThreshold={isDesktop ? 0.36 : 0.54}
        fadeOutThreshold={0.88}
        isDesktop={isDesktop}
        cornerPosition="top-left"
      />
    </>
  );
};

///**
// * ============================================================================
// * ALTERNATIVE: Simple useState approach (if don't want a hook)
// * ============================================================================
// *
// * If prefer not to create a separate hook file, use this directly:
// */

export const ComponentWithInlineMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Check on mount
    checkDesktop();

    // Check on resize
    window.addEventListener('resize', checkDesktop);

    // Cleanup
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div>
      {isDesktop ? 'Desktop' : 'Mobile'}
    </div>
  );
};

// Placeholder for the ImageHexagonBeehive import
declare const ImageHexagonBeehive: any;