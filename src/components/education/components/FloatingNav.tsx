// components/FloatingNav.tsx
import React from 'react';
import { ChevronUp } from 'lucide-react';
//import { FloatingNavProps } from '../types/education.types';
//import { useFloatingNav } from '../hooks/useEducationState';
import { FloatingNavProps } from '../types/types';
import { useFloatingNav } from '../hooks/useFloatingNav';
import { glassStyles } from '../styles/glassStyles';

export const FloatingNav: React.FC<FloatingNavProps> = ({ sectionRef }) => {
  const { isVisible, scrollToTop } = useFloatingNav({ sectionRef });

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 p-3 rounded-full
        ${glassStyles.card}
        ${glassStyles.text.secondary}
        hover:${glassStyles.text.primary}
        transform transition-all duration-300
        hover:scale-110 z-50
        animate-in slide-in-from-bottom duration-500
      `}
      title="Back to top"
      aria-label="Scroll to top of education section"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};