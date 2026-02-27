// src/components/HexagonButton/index.tsx

'use client';

import React, { useMemo } from 'react';
import { HexagonButtonHero } from './HexagonButtonHero';
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
}) => {
  // Determine which variants should be visible
  const variantOpacities = useMemo(() => {
    if (isOpen || isMiniMode) {
      // Menu is open or mini mode active - fade all out
      return {
        sticky: 0,
        somnlogg: 0,
      };
    }

    // Menu is closed - show appropriate variant
    return {
      sticky: buttonState === 'other' ? 1 : 0,
      somnlogg: (buttonState === 'somnlogg' && isMobile) ? 1 : 0,
    };
  }, [buttonState, isMobile, isOpen, isMiniMode]);

  // Time-based theming
  const hour = new Date().getHours();
  const isDayMode = somnloggTheme === 'morning' || (hour >= 6 && hour < 19);

  return (
    <>
      {/* Sticky variant - top left (oss1) */}
      <HexagonButtonSticky
        onInteract={onInteract}
        opacity={variantOpacities.sticky}
        isOpen={isOpen}
        isDayMode={isDayMode}
        isMobile={isMobile}
        isMiniMode={isMiniMode}
        onToggleMiniMode={onToggleMiniMode}
      />

      {/* Somnlogg variant - mobile only, top left compact (sls1) */}
      {isMobile && (
        <HexagonButtonSomnlogg
          onInteract={onInteract}
          opacity={variantOpacities.somnlogg}
          isOpen={isOpen}
          isDayMode={isDayMode}
          isMiniMode={isMiniMode}
          onToggleMiniMode={onToggleMiniMode}
        />
      )}
    </>
  );
};