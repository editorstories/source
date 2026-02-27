// components/AdaptiveNavigation/GlobeLocalisation.tsx
'use client';

import React from 'react';

type LocaleKey = 'sv' | 'en' | 'es';

interface LocaleConfig {
  name: string;
  color: string;
  countries: string[];
  angle: number;
}

interface GlobeLocalisationProps {
  selectedLocale: LocaleKey;
  size?: 'mini' | 'mobile' | 'hero';
  onLocaleClick?: (locale: LocaleKey) => void;
  showLabel?: boolean;
}

const GlobeLocalisation: React.FC<GlobeLocalisationProps> = ({
  selectedLocale,
  size = 'mini',
  onLocaleClick,
  showLabel = false
}) => {
//      swedish: '#006AA7',
//      english: '#C8102E',
//      'text-emerald-400'
  const config = {
    colors: {
      swedish: '#22C55E',
      english: '#ffffff',
      spanish: '#E9A74F'
    }
  };

  const localeConfig: Record<LocaleKey, LocaleConfig> = {
    sv: {
      name: 'svenska',
      color: config.colors.swedish,
      countries: ['Sweden', 'Finland'],
      angle: 0
    },
    en: {
      name: 'english',
      color: config.colors.english,
      countries: ['United Kingdom', 'United States'],
      angle: 120
    },
    es: {
      name: 'castellano',
      color: config.colors.spanish,
      countries: ['Spain'],
      angle: 240
    }
  };

  // Size configurations - using percentages of parent container
  const sizeConfig = {
    mini: {
      // For 60-80px containers
      globePercent: 80, // 80% of container
      moonPercent: 15,  // 15% of globe
      moonOrbitPercent: 150, // 150% of globe diameter for orbit
      labelDistance: 50,
      labelSize: 'text-[10px]'
    },
    mobile: {
      // For 120px+ containers
      globePercent: 85,
      moonPercent: 18,
      moonOrbitPercent: 140,
      labelDistance: 70,
      labelSize: 'text-xs'
    },
    hero: {
      // For very large containers
      globePercent: 85,
      moonPercent: 20,
      moonOrbitPercent: 135,
      labelDistance: 110,
      labelSize: 'text-sm'
    }
  };

  const currentSize = sizeConfig[size];
  const selected = localeConfig[selectedLocale];

  // Handle clicks on the entire globe
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling to parent
    if (onLocaleClick) {
      // Cycle through locales
      const locales: LocaleKey[] = ['sv', 'en', 'es'];
      const currentIndex = locales.indexOf(selectedLocale);
      const nextIndex = (currentIndex + 1) % locales.length;
      onLocaleClick(locales[nextIndex]);
    }
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      {/* Earth */}
      <div className="relative flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
        <div
          className="rounded-full relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
          style={{
            width: `${currentSize.globePercent}%`,
            height: `${currentSize.globePercent}%`,
            boxShadow: 'inset 15px 4px 25px rgba(0,0,0,0.8)',
            background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)`,
            animation: 'earthRotate 60s linear infinite'
          }}
        >
          {/* Earth texture overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'url(https://1.bp.blogspot.com/-UUXaK5GCj-k/UcsKJRMgkVI/AAAAAAAACfM/sePP_H08JTQ/w1200-h630-p-k-no-nu/1.jpg)',
              backgroundSize: '400% 100%',
              backgroundRepeat: 'repeat-x',
              animation: 'textureScroll 120s linear infinite',
              filter: 'grayscale(0.8) contrast(1.2)'
            }}
          />

          {/* Atmosphere glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }}
          />

          {/* Selected locale highlight ring */}
          <div
            className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: `inset 0 0 20px ${selected.color}40, 0 0 20px ${selected.color}20`,
            }}
          />
        </div>

        {/* Moon orbit container - positioned absolutely relative to earth */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: `${currentSize.moonOrbitPercent}%`,
            height: `${currentSize.moonOrbitPercent}%`,
            animation: 'moonOrbit 30s linear infinite',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Moon */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${currentSize.moonPercent}%`,
              height: `${currentSize.moonPercent}%`,
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: 'inset 8px 2px 15px rgba(0,0,0,0.8)',
              background: 'linear-gradient(135deg, #d4d4d4 0%, #8a8a8a 50%, #a0a0a0 100%)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/02/04/17/08/map-4818866_960_720.jpg)',
                backgroundSize: '300% 100%',
                backgroundRepeat: 'repeat-x',
                animation: 'textureScroll 60s linear infinite',
                filter: 'grayscale(1) contrast(1.3)'
              }}
            />
          </div>
        </div>
      </div>

          {/*style={{*/}
          {/*  top: '50%',*/}
          {/*  left: '50%',*/}
          {/*  transform: `translate(-50%, -50%) translateY(-${currentSize.labelDistance}px)`,*/}
          {/*  opacity: 1,*/}
          {/*  transition: 'opacity 500ms ease-out'*/}
          {/*}}*/}
      {/* Selected locale label */}
      {showLabel && (
        <div
          className="absolute text-center pointer-events-none"
          style={{
            opacity: 1,
            transition: 'opacity 500ms ease-out'
          }}
        >
          <div
            className={`${currentSize.labelSize} font-medium uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300`}
            style={{
              color: selected.color,
              backgroundColor: `${selected.color}15`,
              border: `1px solid ${selected.color}40`,
              whiteSpace: 'nowrap'
            }}
          >
            {selected.name}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes earthRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes textureScroll {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 100% 0%;
          }
        }

        @keyframes moonOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GlobeLocalisation;