// src/components/HexagonButton/index.tsx

'use client';

import React from 'react';
import { HexagonButtonSticky } from './HexagonButtonSticky';
import { HexagonButtonSomnlogg } from './HexagonButtonSomnlogg';

interface HexagonButtonProps {
  // State from parent
  isHeroSection: boolean;
  isOpen: boolean;
  onInteract: () => void;
  currentSection: string;
  scrollDirection: 'up' | 'down';
  isMobile: boolean;
  somnloggTheme?: 'morning' | 'evening';
  sectionVisibilities: Record<string, any>;
  heroVisibility: number;

  // From useHexagonButtonState hook
  buttonState: 'hero' | 'other' | 'somnlogg';
  positionMode: 'hero-center' | 'sticky-left';

  // Mini mode state
  isMiniMode: boolean;
  onToggleMiniMode: () => void;

  // Opacity values from parent (AdaptiveNavigation)
  oss1Opacity: number;
  sls1Opacity: number;
}

export const HexagonButton: React.FC<HexagonButtonProps> = ({
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
  oss1Opacity,
  sls1Opacity,
}) => {
  // Time-based theming
  const hour = new Date().getHours();
  const isDayMode = somnloggTheme === 'morning' || (hour >= 6 && hour < 19);

  return (
    <>
      {/* Sticky variant (oss1) - controlled by parent opacity */}
      <HexagonButtonSticky
        onInteract={onInteract}
        opacity={oss1Opacity}
        isOpen={isOpen}
        isDayMode={isDayMode}
        isMobile={isMobile}
        isMiniMode={isMiniMode}
        onToggleMiniMode={onToggleMiniMode}
      />

      {/* Somnlogg variant (sls1) - mobile only, controlled by parent opacity */}
      {isMobile && (
        <HexagonButtonSomnlogg
          onInteract={onInteract}
          opacity={sls1Opacity}
          isOpen={isOpen}
          isDayMode={isDayMode}
          isMiniMode={isMiniMode}
          onToggleMiniMode={onToggleMiniMode}
        />
      )}
    </>
  );
};