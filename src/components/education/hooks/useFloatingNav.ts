// hooks/useFloatingNav.ts
import { useState, useEffect } from 'react';

interface UseFloatingNavProps {
  sectionRef: React.RefObject<HTMLElement>;
  threshold?: number;
}

export const useFloatingNav = ({
  sectionRef,
  threshold = 0.1
}: UseFloatingNavProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef, threshold]);

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return { isVisible, scrollToTop };
};