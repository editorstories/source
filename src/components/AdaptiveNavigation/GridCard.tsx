// AdaptiveNavigation/GridCard.tsx
'use client';

import React, { useState } from 'react';
import { NavigationLangEarthMoon } from './NavigationLangEarthMoon';

interface GridCardProps {
  section: any;
  index: number;
  onClick: () => void;
  isIntro?: boolean;
  currentSection?: string;
  currentLocale?: string;
//  onLocaleChange?: (locale: string) => void;
  onLocaleChange?: (locale: "sv" | "en" | "es") => void;
  showLanguageSwitcher?: boolean;
  navAnimationComplete?: boolean;
  isMobile?: boolean; // NEW: Pass mobile state from parent
}

export default function GridCard({
  section,
  index,
  onClick,
  isIntro = false,
  currentSection,
  currentLocale = 'sv',
  onLocaleChange,
  showLanguageSwitcher = false,
  navAnimationComplete = false,
  isMobile = false
}: GridCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate fade out for mini globe in intro card
  const miniGlobeOpacity = navAnimationComplete ? 0 : 1;

  // Determine globe size based on mode
  const globeSize = isMobile ? 'medium' : 'large';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden border border-slate-800/50
        bg-slate-900/50 backdrop-blur-sm
        flex flex-col justify-center items-center p-6
        transition-all duration-500 cursor-pointer
        ${isHovered ? 'bg-slate-800/70 border-slate-700 scale-[1.02] z-10' : ''}
        ${section.backgroundImage ? 'bg-cover bg-center' : ''}
      `}
      style={{
        backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
        animationDelay: `${index * 80}ms`,
        animation: 'fadeInFromHero 600ms ease-out forwards',
      }}
    >
      {/* Background Image Overlay */}
      {section.overlayImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${section.overlayImage})`,
            opacity: isHovered ? 0.3 : 0.2,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className={`text-5xl mb-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {section.icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          {section.translationKey}
        </h3>
        <p className="text-sm text-slate-300 opacity-80 line-clamp-2">
          {section.previewKey}
        </p>
      </div>

      {/* Intro card special features */}
      {isIntro && (
        <>
          {/* Close indicator */}
          <div className="absolute top-4 right-4 text-slate-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            ✕ close
          </div>

          {/* Language switcher labels (top-left) */}
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-1 text-xs font-medium">
              {/*{['sv', 'en', 'es'].map((lang, idx) => (*/}
              {(['sv', 'en', 'es'] as const).map((lang, idx) => (
                <React.Fragment key={lang}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onLocaleChange?.(lang);
                    }}
                    className={`
                      px-2 py-1 transition-all duration-200 cursor-pointer rounded
                      ${currentLocale === lang
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}
                    `}
                  >
                    {lang === 'es' ? 'SP' : lang.toUpperCase()}
                  </span>
                  {idx < 2 && (
                    <span className="text-slate-700">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Centered Globe - near top and middle */}
          {showLanguageSwitcher && (
            <div
              className={`
                absolute left-1/2 -translate-x-1/2 z-20
                transition-opacity duration-1000
                ${isMobile ? 'top-12 w-20 h-20' : 'top-20 w-28 h-28'}
              `}
              style={{ opacity: miniGlobeOpacity }}
            >
              <NavigationLangEarthMoon
                isVisible={true}
                isMobile={isMobile}
                locale={currentLocale}
                size={globeSize}
                showLabel={true}
                fadeOut={false}
                onLocaleChange={onLocaleChange}
              />
            </div>
          )}
        </>
      )}

      {/* Gradient overlay on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-blue-500/0
        transition-all duration-500 pointer-events-none
        ${isHovered ? 'from-emerald-500/10 to-blue-500/10' : ''}
      `} />
    </div>
  );
}