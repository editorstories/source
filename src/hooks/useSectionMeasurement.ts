// src/hooks/useSectionMeasurement.ts
// Precise section boundary detection with debug markers

import { useEffect, useState, useRef, useCallback } from 'react';

export interface SectionMeasurement {
  sectionId: string;
  visibility: number; // 0-1, percentage visible in viewport
  isInViewport: boolean;
  topOffset: number; // pixels from top of viewport
  bottomOffset: number; // pixels from bottom of viewport
  sectionHeight: number; // total section height
  visibleHeight: number; // how many pixels actually visible
}

interface UseSectionMeasurementReturn {
  measurements: Record<string, SectionMeasurement>;
  getMeasurement: (sectionId: string) => SectionMeasurement | null;
}

export const useSectionMeasurement = (
  sectionIds: string[]
): UseSectionMeasurementReturn => {
  const [measurements, setMeasurements] = useState<Record<string, SectionMeasurement>>(
    Object.fromEntries(
      sectionIds.map(id => [
        id,
        {
          sectionId: id,
          visibility: 0,
          isInViewport: false,
          topOffset: 0,
          bottomOffset: 0,
          sectionHeight: 0,
          visibleHeight: 0,
        },
      ])
    )
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Debounce updates to avoid excessive re-renders
  const updateMeasurements = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateRef.current < 100) return; // Max 10 updates/sec
    lastUpdateRef.current = now;

    const newMeasurements: Record<string, SectionMeasurement> = {};
    const viewportHeight = window.innerHeight;

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const sectionHeight = rect.height;

      // Calculate visible portion
      const topInViewport = Math.max(0, rect.top);
      const bottomInViewport = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, bottomInViewport - topInViewport);

      // Visibility as percentage
      const visibility = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;
      const clampedVisibility = Math.max(0, Math.min(1, visibility));

      newMeasurements[id] = {
        sectionId: id,
        visibility: clampedVisibility,
        isInViewport: rect.top < viewportHeight && rect.bottom > 0,
        topOffset: rect.top,
        bottomOffset: viewportHeight - rect.bottom,
        sectionHeight,
        visibleHeight,
      };
    });

    setMeasurements(prev => {
      // Only update if values changed significantly
      const hasSignificantChange = Object.keys(newMeasurements).some(
        id =>
          Math.abs(
            (newMeasurements[id]?.visibility || 0) - (prev[id]?.visibility || 0)
          ) > 0.02 || // 2% change threshold
          (newMeasurements[id]?.isInViewport || false) !==
            (prev[id]?.isInViewport || false)
      );

      return hasSignificantChange ? newMeasurements : prev;
    });
  }, [sectionIds]);

  // Setup Intersection Observer
  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(el => el !== null) as HTMLElement[];

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
          entries => {
            // Trigger measurement update when visibility changes
            updateMeasurements();
          },
          {
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
            rootMargin: '50px',
          }
        );

        elements.forEach(el => observer.observe(el));
        observerRef.current = observer;

        return () => {
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        };
      }, [sectionIds, updateMeasurements]);

      // Scroll listener for continuous updates
      useEffect(() => {
        const handleScroll = () => {
          updateMeasurements();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
      }, [updateMeasurements]);

      const getMeasurement = (sectionId: string): SectionMeasurement | null => {
        return measurements[sectionId] || null;
      };

      return {
        measurements,
        getMeasurement,
      };
    };