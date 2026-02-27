// src/components/HexagonButton/HexagonButtonHero.tsx

'use client';

import React, { useState } from 'react';
import MenuButton from '../MenuButton';
import HexagonCluster from '../hexagonCluster';

interface HexagonButtonHeroProps {
  onInteract: () => void;
  opacity: number;
  isOpen: boolean;
  isDayMode: boolean;
  isMobile: boolean;
  isMiniMode?: boolean;
  onToggleMiniMode?: () => void;
}

export const HexagonButtonHero: React.FC<HexagonButtonHeroProps> = ({
  onInteract,
  opacity,
  isOpen,
  isDayMode,
  isMobile,
  isMiniMode = false,
  onToggleMiniMode = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [circleHovered, setCircleHovered] = useState(false);

  // Dimensions for hero mode
  const gridWidth = 280;
  const gridHeight = 140;
  const containerWidth = gridWidth;
  const containerHeight = gridHeight;

  // hcir1 dimensions (half of hb1)
  const circleDiameter = containerWidth / 2; // 140px

  return (
    <div
      className="fixed z-50 bottom-[28%] left-1/2 -translate-x-1/2"
      style={{
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out',
        visibility: opacity > 0 ? 'visible' : 'hidden',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
      }}
    >
      <div className="relative">
        {/* hb1 - Hexagon Button */}
        <div
          className="relative"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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

        {/* hcir1 - Hexagon Circle (positioned below hb1, centered) */}
        <button
          onClick={onToggleMiniMode}
          className="absolute z-50 -translate-x-1/2 pointer-events-auto focus:outline-none"
          style={{
            width: `${circleDiameter}px`,
            height: `${circleDiameter}px`,
            left: '50%',
            top: `${containerHeight + 8}px`, // 8px gap below hb1
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            opacity: isOpen || isMiniMode ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
            visibility: isOpen || isMiniMode ? 'hidden' : 'visible',
            pointerEvents: isOpen || isMiniMode ? 'none' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={() => setCircleHovered(true)}
          onMouseLeave={() => setCircleHovered(false)}
        >
          {/* Outer Circle Border */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: `${circleDiameter}px`,
              height: `${circleDiameter}px`,
              borderRadius: '50%',
              border: isMiniMode ? 'none' : `2px solid rgba(156, 174, 198, 0.4)`,
              transition: 'border 0.4s ease-in-out',
              boxShadow: isMiniMode ? `0 0 15px rgba(156, 174, 198, 0.4)` : 'none',
              top: 0,
              left: 0,
            }}
          />

          {/* Single Hexagon (visible only when minimized) */}
          {isMiniMode && (
            <div
              className="absolute pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.85,
              }}
            >
              <div
                style={{
                  width: '280px',
                  height: '140px',
                  position: 'absolute',
                  transform: 'rotate(90deg) scale(0.15)',
                  transformOrigin: 'center',
                }}
              >
                <HexagonCluster isHovered={circleHovered} />
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};