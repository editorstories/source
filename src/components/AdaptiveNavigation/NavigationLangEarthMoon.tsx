// Strategy: Keep NavigationLangEarthMoon simple (only renders what's passed)
// Handle positioning/centering logic in AdaptiveNavigation

// src/components/AdaptiveNavigation/NavigationLangEarthMoon.tsx
// SIMPLIFIED: Remove all position logic, just render the globe

'use client';

import React, { useEffect, useState } from 'react';
import { NavigationLanguageSwitcher } from './components/LanguageSwitcher';

type GlobeSize = 'small' | 'medium' | 'large';

interface NavigationLangEarthMoonProps {
  isVisible: boolean;
  isMobile?: boolean;
  locale: string;
  size: GlobeSize;
  showLabel: boolean;
  fadeOut?: boolean;
  onLocaleChange?: (locale: 'sv' | 'eu' | 'cas') => void;
}

// Simple wrapper - NO positioning logic, NO conditional logic
export const NavigationLangEarthMoon: React.FC<NavigationLangEarthMoonProps> = ({
  isVisible,
  locale,
  size,
  showLabel,
  fadeOut = false,
  onLocaleChange,
}) => {
  const [opacity, setOpacity] = useState(fadeOut ? 0 : 1);

  const sizeMap: Record<GlobeSize, number> = {
    small: 60,
    medium: 80,
    large: 120,
  };

  const containerSize = sizeMap[size];

  useEffect(() => {
    if (fadeOut) {
      setOpacity(0);
    } else if (isVisible) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  }, [isVisible, fadeOut]);

  if (!isVisible) return null;

  return (
    <div
      className="transition-opacity duration-1000"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        opacity: opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        willChange: 'opacity',
      }}
    >
      <NavigationLanguageSwitcher
        locale={locale}
        size={size}
        showLabel={showLabel}
        onLocaleChange={onLocaleChange}
      />
    </div>
  );
};