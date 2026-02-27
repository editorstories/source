// src/components/HexagonButton/HexagonButtonWrapper.tsx

'use client';

import React from 'react';
import { HexagonButton } from './index';
import { HexagonButtonHero } from './HexagonButtonHero';

interface HexagonButtonWrapperProps {
  isHeroSection: boolean;
  isOpen: boolean;
  onInteract: () => void;
  currentSection: string;
  scrollDirection: 'up' | 'down';
  isMobile: boolean;
  somnloggTheme?: 'morning' | 'evening';
  sectionVisibilities: Record<string, any>;
  heroVisibility: number;
  buttonState: 'hero' | 'other' | 'somnlogg';
  positionMode: 'hero-center' | 'sticky-left';
  isMiniMode: boolean;
  onToggleMiniMode: () => void;
}

export const HexagonButtonWrapper: React.FC<HexagonButtonWrapperProps> = ({
  isHeroSection,
  isOpen,
  onInteract,
  currentSection,
  scrollDirection,
  isMobile,
  somnloggTheme = 'evening',
  sectionVisibilities,
  heroVisibility,
  buttonState,
  positionMode,
  isMiniMode,
  onToggleMiniMode,
}) => {
  const hour = new Date().getHours();
  const isDayMode = somnloggTheme === 'morning' || (hour >= 6 && hour < 19);

  // Hero section: only show HexagonButtonHero with integrated hcir1
  if (isHeroSection) {
    return (
      <HexagonButtonHero
        onInteract={onInteract}
        opacity={1}
        isOpen={isOpen}
        isDayMode={isDayMode}
        isMobile={isMobile}
        isMiniMode={isMiniMode}
        onToggleMiniMode={onToggleMiniMode}
      />
    );
  }

  // Non-hero sections: show HexagonButton (sticky/somnlogg) with integrated hcir1
  return (
    <HexagonButton
      isHeroSection={isHeroSection}
      isOpen={isOpen}
      onInteract={onInteract}
      currentSection={currentSection}
      scrollDirection={scrollDirection}
      isMobile={isMobile}
      somnloggTheme={somnloggTheme}
      sectionVisibilities={sectionVisibilities}
      heroVisibility={heroVisibility}
      buttonState={buttonState}
      positionMode={positionMode}
      isMiniMode={isMiniMode}
      onToggleMiniMode={onToggleMiniMode}
    />
  );
  };