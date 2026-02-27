// src/hooks/useSectionDetection.ts
import { useState, useEffect, useRef, useCallback } from 'react';

interface SectionThresholds {
  enter: number;
  exit: number;
}

interface DirectionalThresholds {
  scrollDown: SectionThresholds;
  scrollUp: SectionThresholds;
}

export const useSectionDetection = (
  sections: string[],
  thresholds: SectionThresholds | DirectionalThresholds = {
    enter: 0.7,
    exit: 0.3
  }
) => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  const stateRef = useRef({
    currentSection: 'hero',
    scrollDirection: 'down' as 'down' | 'up',
    lastScrollY: 0,
    lastUpdateTime: 0
  });

  const getVisibilityRatio = useCallback((element: Element): number => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const elementTop = Math.max(0, rect.top);
    const elementBottom = Math.min(viewportHeight, rect.bottom);
    const visibleHeight = Math.max(0, elementBottom - elementTop);

    return visibleHeight / viewportHeight;
  }, []);

  const updateSection = useCallback(() => {
    const now = Date.now();
    const state = stateRef.current;

    // Throttle: only update once per 100ms for responsive detection
    if (now - state.lastUpdateTime < 100) {
      return;
    }

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - state.lastScrollY;

    // Only detect direction change if scroll is meaningful (> 15px)
    if (Math.abs(scrollDelta) > 15) {
      const newDirection = scrollDelta > 0 ? 'down' : 'up';
      if (newDirection !== state.scrollDirection) {
        state.scrollDirection = newDirection;
        setScrollDirection(newDirection);
      }
      state.lastScrollY = currentScrollY;
    }

    // Get active thresholds
    let activeThresholds: SectionThresholds;
    if ('scrollDown' in thresholds && 'scrollUp' in thresholds) {
      activeThresholds = state.scrollDirection === 'down'
        ? thresholds.scrollDown
        : thresholds.scrollUp;
    } else {
      activeThresholds = thresholds as SectionThresholds;
    }

    // Calculate visibility for all sections
    const visibilityMap: Record<string, number> = {};
    let newSection: string | null = null;
    let mostVisibleSection: string | null = null;
    let highestVisibility = -1;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (!element) continue;

      const visibility = getVisibilityRatio(element);
      visibilityMap[sectionId] = visibility;

      // Track most visible section (fallback for edge cases)
      if (visibility > highestVisibility) {
        highestVisibility = visibility;
        mostVisibleSection = sectionId;
      }

      // Skip sections with negligible visibility (< 5%)
      if (visibility < 0.05) continue;

      const isCurrentSection = state.currentSection === sectionId;
      const threshold = isCurrentSection
        ? activeThresholds.exit
        : activeThresholds.enter;

      // Check if this section meets the threshold
      if (visibility >= threshold) {
        if (newSection === null) {
          newSection = sectionId;
        }
      }
    }

    // Fallback 1: If no section meets threshold, use most visible section
    if (!newSection && mostVisibleSection && highestVisibility > 0.05) {
      newSection = mostVisibleSection;
    }

    // Fallback 2: Stay in current section if nothing better found
    if (!newSection) {
      newSection = state.currentSection;
    }

    // Update state only if section actually changed
    if (newSection && newSection !== state.currentSection) {
      const oldSection = state.currentSection;
      state.currentSection = newSection;
      state.lastUpdateTime = now;

      console.log(
        `📍 ${oldSection} → ${newSection} | ` +
        `${state.scrollDirection.toUpperCase()} | ` +
        `Visibility: ${(visibilityMap[newSection] * 100).toFixed(0)}%`
      );

      setCurrentSection(newSection);
    }

    state.lastUpdateTime = now;
  }, [sections, thresholds, getVisibilityRatio]);

  useEffect(() => {
    updateSection();

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateSection]);

  return {
    currentSection,
    scrollDirection
  };
};