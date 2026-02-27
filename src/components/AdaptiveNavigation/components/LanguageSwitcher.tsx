// AdaptiveNavigation/components/LanguageSwitcher.tsx
'use client';

import React from 'react';
import GlobeLocalisation from '@/components/AdaptiveNavigation/GlobeLocalisation';

type GlobeSize = 'small' | 'medium' | 'large';
type LocaleKey = 'sv' | 'eu' | 'cas';

interface NavigationLanguageSwitcherProps {
  locale: string;
  size: GlobeSize;
  showLabel: boolean;
  onLocaleChange?: (locale: LocaleKey) => void;
}

export function NavigationLanguageSwitcher({
  locale,
  size,
  showLabel,
  onLocaleChange
}: NavigationLanguageSwitcherProps) {

  const handleLocaleClick = (newLocale: LocaleKey) => {
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    }
  };

  // Map size to GlobeLocalisation size variant
  const globeSizeMap: Record<GlobeSize, 'mini' | 'mobile' | 'hero'> = {
    small: 'mini',   // 60px
    medium: 'mini',  // 80px - still uses mini but in larger container
    large: 'mobile', // 120px
  };

  return (
    <div className="w-full h-full">
      <GlobeLocalisation
        selectedLocale={locale as LocaleKey}
        size={globeSizeMap[size]}
        onLocaleClick={handleLocaleClick}
        showLabel={showLabel}
      />
    </div>
  );
}