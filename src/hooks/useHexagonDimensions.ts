// src/hooks/useHexagonDimensions.ts
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface ChildDimensions {
  id: string;
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
}

interface HexagonDimensions {
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
  measured: boolean;
  children: ChildDimensions[];
}

export const useHexagonDimensions = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState<HexagonDimensions>({
    width: 0,
    height: 0,
    offsetTop: 0,
    offsetLeft: 0,
    measured: false,
    children: [],
  });

  const measureDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    // Measure all children with data-hex-child attribute
    const childDimensions: ChildDimensions[] = [];

    const children = containerRef.current.querySelectorAll('[data-hex-child]');
    children.forEach((child) => {
      const htmlElement = child as HTMLElement;
      const rect = htmlElement.getBoundingClientRect();
      const id = htmlElement.getAttribute('data-hex-child') || 'unknown';

      // Calculate offset relative to container
      const offsetTop = rect.top - containerRect.top;
      const offsetLeft = rect.left - containerRect.left;

      childDimensions.push({
        id,
        width: rect.width,
        height: rect.height,
        offsetTop,
        offsetLeft,
      });
    });

    // Calculate bounding box that encompasses all children and their overflow
    let minTop = 0;
    let maxBottom = 0;
    let minLeft = 0;
    let maxRight = 0;

    if (childDimensions.length > 0) {
      minTop = Math.min(...childDimensions.map(c => c.offsetTop));
      maxBottom = Math.max(...childDimensions.map(c => c.offsetTop + c.height));
      minLeft = Math.min(...childDimensions.map(c => c.offsetLeft));
      maxRight = Math.max(...childDimensions.map(c => c.offsetLeft + c.width));
    }

    const totalHeight = Math.max(0, maxBottom - minTop);
    const totalWidth = Math.max(0, maxRight - minLeft);

    setDimensions({
      width: totalWidth,
      height: totalHeight,
      offsetTop: minTop,
      offsetLeft: minLeft,
      measured: true,
      children: childDimensions,
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initial measurement with delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      measureDimensions();
    }, 150);

    // Measure on resize
    window.addEventListener('resize', measureDimensions);

    // Use ResizeObserver for accurate measurements
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        measureDimensions();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureDimensions);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [measureDimensions]);

  return {
    containerRef,
    dimensions,
  };
};