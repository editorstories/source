// AdaptiveNavigation/FullScreenGrid.tsx
'use client';

import React, { useState, useEffect } from 'react';
import GridCard from './GridCard';
import type { Section } from './config';

  //onLocaleChange: React.Dispatch<React.SetStateAction<"sv" | "eu" | "cas">>;
interface FullScreenGridProps {
  sections: Section[];
  onInteract: (sectionId: string) => void;
  onClose: () => void;
  isFading: boolean;
  currentSection: string;
  currentLocale: string;
  onLocaleChange: (locale: "sv" | "eu" | "cas") => void;
  t: (key: string) => string;
}
//  onLocaleChange: (locale: string) => void;

export default function FullScreenGrid({
  sections,
  onInteract,
  onClose,
  isFading,
  currentSection,
  currentLocale,
  onLocaleChange,
  t
}: FullScreenGridProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add intro card as first item with close functionality
  const introCard = {
    id: 'intro',
    icon: '✨',
    translationKey: t('nav.intro.title'),
    previewKey: t('nav.hero.preview'),
    isIntro: true,
    backgroundImage: '',
    overlayImage: '',
    showLanguageSwitcher: true
  };

  // Map sections to use translations
  const translatedSections = sections.map(section => ({
    ...section,
    translationKey: t(section.translationKey),
    previewKey: t(section.previewKey)
  }));

  const allCards = [introCard, ...translatedSections];

  return (
    <div
      className={`
        fixed inset-0 z-[55] bg-slate-950
        flex items-center justify-center
        transition-opacity duration-800
        ${isFading ? 'opacity-0' : 'opacity-100'}
      `}
      role="navigation"
      aria-label="Section navigation"
    >

      {/* Desktop: 3x2 Grid */}
      <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-0 w-full h-full">
        {allCards.map((card, idx) => (
          <GridCard
            key={card.id}
            section={card}
            index={idx}
            onClick={() => {
              if (card.isIntro) {
                onClose();
              } else {
                onInteract(card.id);
              }
            }}
            isIntro={card.isIntro}
            currentSection={currentSection}
            currentLocale={currentLocale}
            onLocaleChange={onLocaleChange}
            showLanguageSwitcher={card.showLanguageSwitcher}
            isMobile={false} // Desktop mode
          />
        ))}
      </div>

      {/* Mobile: 2x3 Grid */}
      <div className="md:hidden grid grid-cols-2 grid-rows-3 gap-0 w-full h-full">
        {allCards.map((card, idx) => (
          <GridCard
            key={card.id}
            section={card}
            index={idx}
            onClick={() => {
              if (card.isIntro) {
                onClose();
              } else {
                onInteract(card.id);
              }
            }}
            isIntro={card.isIntro}
            currentSection={currentSection}
            currentLocale={currentLocale}
            onLocaleChange={onLocaleChange}
            showLanguageSwitcher={card.showLanguageSwitcher}
            isMobile={true} // Mobile mode
          />
        ))}
      </div>
    </div>
  );
}