// AdaptiveNavigation/CompactNavButton.tsx
'use client';

import { useState } from 'react';
import type { Section } from './config';

interface CompactNavButtonProps {
  sections: Section[];
}

export default function CompactNavButton({ sections }: CompactNavButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (sectionId: string) => {
    setIsOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Main navigation button - positioned like the Explore button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-fadeIn">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-16 h-16 rounded-full
            border border-slate-800
            bg-slate-900/95 backdrop-blur-sm
            hover:border-slate-700 hover:bg-slate-800/95
            transition-all duration-500
            flex items-center justify-center
            shadow-lg shadow-slate-950/50
            ${isOpen ? 'scale-95' : 'hover:scale-105'}
          `}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
        >
          <div className={`
            transition-transform duration-300
            ${isOpen ? 'rotate-45' : 'rotate-0'}
          `}>
            {isOpen ? (
              <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Expanded menu */}
      {isOpen && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 animate-fadeIn">
          <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl shadow-slate-950/50 p-2 min-w-[200px]">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => handleNavigation(section.id)}
                className="
                  w-full px-4 py-3 rounded-xl
                  text-left text-sm text-slate-300
                  hover:bg-slate-800/70 hover:text-white
                  transition-all duration-300
                  flex items-center gap-3
                  group
                "
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </span>
                <span className="font-medium">
                  {section.translationKey}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-30 animate-fadeIn"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}