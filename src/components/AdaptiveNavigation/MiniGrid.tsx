// AdaptiveNavigation/MiniGrid.tsx
'use client';

import { useTranslation } from './hooks/useTranslations';
import type { Section } from './config';

interface MiniGridProps {
  sections: Section[];
  onInteract: (sectionId: string) => void;
  onClose: () => void;
}

export default function MiniGrid({
  sections,
  onInteract,
  onClose
}: MiniGridProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-30 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mini Grid Container */}
      <div
        className="fixed top-24 left-8 z-40"
        style={{
          animation: 'slideInLeft 400ms ease-out'
        }}
      >
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-sm shadow-2xl shadow-slate-950/50 overflow-hidden">
          {/* Grid layout - 2 columns */}
          <div className="grid grid-cols-2 gap-0 w-[400px]">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => onInteract(section.id)}
                className="
                  relative w-full h-32
                  border border-slate-800/50
                  bg-slate-900/50 backdrop-blur-sm
                  flex flex-col justify-center items-center p-4
                  transition-all duration-300
                  hover:bg-slate-800/70 hover:border-slate-700
                  group
                "
                style={{
                  animationDelay: `${idx * 50}ms`,
                  animation: 'fadeIn 300ms ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Icon */}
                <div className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">
                  {section.icon}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white text-center mb-1">
                  {t(section.translationKey)}
                </h3>

                {/* Preview text */}
                <p className="text-xs text-slate-400 text-center opacity-70 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {t(section.previewKey)}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}