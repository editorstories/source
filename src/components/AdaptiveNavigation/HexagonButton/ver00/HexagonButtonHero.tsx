// src/components/HexagonButton/HexagonButtonHero.tsx

'use client';

import React, { useState } from 'react';
import MenuButton from './MenuButton';
import HexagonCluster from './hexagonCluster';

interface HexagonButtonHeroProps {
  onInteract: () => void;
  opacity: number;
  isOpen: boolean;
  isDayMode: boolean;
  isMobile: boolean;
}

export const HexagonButtonHero: React.FC<HexagonButtonHeroProps> = ({
  onInteract,
  opacity,
  isOpen,
  isDayMode,
  isMobile,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dimensions for hero mode
  const gridWidth = 280;
  const gridHeight = 140;
  const containerWidth = gridWidth;
  const containerHeight = gridHeight;

  return (
    <div
      className="fixed z-50 bottom-[28%] left-1/2 -translate-x-1/2"
      style={{
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out',
        visibility: opacity > 0 ? 'visible' : 'hidden',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Hexagon Grid Background */}
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.95,
            zIndex: 0,
            overflow: 'visible',
          }}
        >
          <div
            style={{
              width: `${gridWidth}px`,
              height: `${gridHeight}px`,
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%) rotate(0deg)',
            }}
          >
            <HexagonCluster isHovered={isHovered} />
          </div>
        </div>

        {/* Menu Button - centered */}
        <div
          className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
          }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <MenuButton
              isHeroSection={true}
              onInteract={onInteract}
              isOpen={isOpen}
              isSomnlogg={false}
              isDayMode={isDayMode}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};