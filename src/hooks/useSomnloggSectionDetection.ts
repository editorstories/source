// ============================================================================
// src/hooks/useSomnloggSectionDetection.ts
// ============================================================================

import { useEffect, useState, useRef } from 'react';

interface UseSomnloggSectionDetectionProps {
  sectionId: string;
}

export const useSomnloggSectionDetection = ({ sectionId }: UseSomnloggSectionDetectionProps) => {
  const [visibility, setVisibility] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Use Intersection Observer for accurate visibility calculation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is in viewport
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;

          const topVisible = Math.max(0, rect.top);
          const bottomVisible = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, bottomVisible - topVisible);

          const visibilityRatio = visibleHeight / viewportHeight;
          setVisibility(Math.min(1, Math.max(0, visibilityRatio)));
        } else {
          // Element completely out of view
          setVisibility(0);
        }
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0.0 to 1.0
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionId]);

  return visibility;
};