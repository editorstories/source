// src/hooks/useSectionNavigation.ts
// SINGLE source of truth for all section detection

import { useEffect, useState, useRef, useCallback } from 'react';

export interface SectionVisibilityData {
  visibility: number; // 0-1, percentage of section visible
  isInViewport: boolean; // Whether any part is visible
}

export interface SectionVisibility {
  [sectionId: string]: SectionVisibilityData;
}

interface UseSectionNavigationReturn {
  currentSection: string;
  scrollDirection: 'up' | 'down';
  sectionVisibilities: SectionVisibility;
  allVisibilities: Record<string, SectionVisibilityData>; // Full visibility objects
  heroVisibility: number; // Raw hero visibility (0-1)
}

export const useSectionNavigation = (
  sectionIds: string[],
  visibilityThresholds = [0, 0.25, 0.5, 0.75, 1]
): UseSectionNavigationReturn => {
  const [currentSection, setCurrentSection] = useState(sectionIds[0] || 'hero');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  // Initialize with proper structure
  const [sectionVisibilities, setSectionVisibilities] = useState<SectionVisibility>(
    Object.fromEntries(
      sectionIds.map(id => [
        id,
        { visibility: id === 'hero' ? 1 : 0, isInViewport: id === 'hero' }
      ])
    )
  );

  const [heroVisibility, setHeroVisibility] = useState(1);

  const scrollStateRef = useRef({
    lastScrollY: 0,
    lastUpdateTime: 0,
    lastDirection: 'down' as 'up' | 'down',
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Debounced scroll direction detection
  const updateScrollDirection = useCallback(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - scrollStateRef.current.lastUpdateTime;

    // Update direction only every 250ms (4 updates per second)
    if (timeSinceLastUpdate < 250) return;

    const currentScrollY = window.scrollY;
    const previousScrollY = scrollStateRef.current.lastScrollY;

    if (currentScrollY > previousScrollY) {
      setScrollDirection('down');
      scrollStateRef.current.lastDirection = 'down';
    } else if (currentScrollY < previousScrollY) {
      setScrollDirection('up');
      scrollStateRef.current.lastDirection = 'up';
    }

    scrollStateRef.current.lastScrollY = currentScrollY;
    scrollStateRef.current.lastUpdateTime = now;
  }, []);

  // Passive scroll listener for direction tracking
  useEffect(() => {
    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [updateScrollDirection]);

  // Intersection Observer for all sections
  useEffect(() => {
    const elements = sectionIds
      .map(id => ({ id, element: document.getElementById(id) }))
      .filter(({ element }) => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibilities: SectionVisibility = {};
        let maxVisibility = 0;
        let mostVisibleSection = currentSection;

        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;

          // Calculate visibility ratio (0-1)
          const topInViewport = Math.max(0, rect.top);
          const bottomInViewport = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, bottomInViewport - topInViewport);

          // Visibility is the percentage of viewport occupied by this section
          const visibility = viewportHeight > 0 ? visibleHeight / viewportHeight : 0;
          const clampedVisibility = Math.max(0, Math.min(1, visibility));

          visibilities[sectionId] = {
            visibility: clampedVisibility,
            isInViewport: entry.isIntersecting,
          };

          // Track the most visible section
          if (clampedVisibility > maxVisibility) {
            maxVisibility = clampedVisibility;
            mostVisibleSection = sectionId;
          }

          // Track hero visibility separately for threshold logic
          if (sectionId === 'hero') {
            setHeroVisibility(clampedVisibility);
          }
        });

        // Update state only if something changed
        setSectionVisibilities((prev) => {
          const hasChanged = Object.keys(visibilities).some(
            (id) =>
              Math.abs(
                (visibilities[id]?.visibility ?? 0) - (prev[id]?.visibility ?? 0)
              ) > 0.01 ||
              visibilities[id]?.isInViewport !== prev[id]?.isInViewport
          );

          if (hasChanged) {
            return { ...prev, ...visibilities };
          }
          return prev;
        });

        // Update active section only if visibility > 25%
        if (maxVisibility > 0.25 && mostVisibleSection !== currentSection) {
          setCurrentSection(mostVisibleSection);
        }
      },
      {
        threshold: visibilityThresholds,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    elements.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, visibilityThresholds, currentSection]);

  return {
    currentSection,
    scrollDirection,
    sectionVisibilities,
    allVisibilities: sectionVisibilities, // Now returns full objects
    heroVisibility,
  };
};