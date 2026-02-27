// src/components/HexagonButton/HexagonButtonSomnlogg.tsx

'use client';

import React, { useState } from 'react';
import MenuButton from '../MenuButton';
import HexagonCluster from '../hexagonCluster';
import { useHexagonDimensions } from '@/hooks/useHexagonDimensions';

interface HexagonButtonSomnloggProps {
  onInteract: () => void;
  opacity: number;
  isOpen: boolean;
  isDayMode: boolean;
  isMiniMode?: boolean;
  onToggleMiniMode?: () => void;
}

export const HexagonButtonSomnlogg: React.FC<HexagonButtonSomnloggProps> = ({
  onInteract,
  opacity,
  isOpen,
  isDayMode,
  isMiniMode = false,
  onToggleMiniMode = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [circleHovered, setCircleHovered] = useState(false);
  const { containerRef, dimensions } = useHexagonDimensions();

  // Scale and dimensions
  const gridWidth = 280;
  const gridHeight = 140;
  const containerWidth = gridHeight;
  const containerHeight = gridWidth;
  const scale = 0.5;
  const scaledWidth = containerWidth * scale; // 70px
  const scaledHeight = containerHeight * scale; // 140px

  // hcir1 dimensions
  const circleDiameter = scaledWidth / 2; // 35px

  // Opacity logic:
  // hb1: visible when NOT mini mode AND menu not open AND opacity passed in
  // hcir1: visible with hb1, fades out completely when sls1 is not displayed
  const hb1Opacity = !isMiniMode && !isOpen ? opacity : 0;

  return (
    <div
      ref={containerRef}
      className="fixed z-50"
      style={{
        top: '16px',
        left: '16px',
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out',
        // Container fades with sls1 - only interactive when sls1 is displayed
        visibility: opacity > 0 && !isOpen ? 'visible' : 'hidden',
        pointerEvents: opacity > 0 && !isOpen ? 'auto' : 'none',
      }}
    >
      <div className="relative" style={{ width: `${scaledWidth}px` }}>
        {/* hb1 - Hexagon Button (full button in sls1) */}
        <div
          className="relative"
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            opacity: hb1Opacity,
            transition: 'opacity 0.5s ease-in-out',
            visibility: hb1Opacity > 0 ? 'visible' : 'hidden',
            pointerEvents: hb1Opacity > 0 ? 'auto' : 'none',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Hexagon Grid Background - rotated 90deg, scaled to 50% */}
          <div
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.85,
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
                transform: `translate(-50%, -50%) rotate(90deg) scale(${scale})`,
                transformOrigin: 'center',
              }}
            >
              <HexagonCluster isHovered={isHovered} />
            </div>
          </div>

          {/* Menu Button - rotated -90deg to counter the grid rotation */}
          <div
            className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: 'rotate(-90deg)',
              }}
            >
              <MenuButton
                isHeroSection={false}
                onInteract={onInteract}
                isOpen={isOpen}
                isSomnlogg={true}
                isDayMode={isDayMode}
                isMobile={true}
              />
            </div>
          </div>
        </div>

        {/* hcir1 - Circle when idle, Hexagon when active (mini mode) */}
        <button
          onClick={onToggleMiniMode}
          className="focus:outline-none"
          style={{
            width: `${circleDiameter}px`,
            height: `${circleDiameter}px`,
            // Toggle positioning based on mini mode state
            // Mini mode: fixed to top-left, independent of parent
            // Normal: absolute below hb1
            ...(isMiniMode ? {
              position: 'fixed',
              top: '16px',
              left: '16px',
              zIndex: 50,
            } : {
              position: 'absolute',
              zIndex: 50,
              left: `${(scaledWidth - circleDiameter) / 2}px`,
              top: `${scaledHeight + 8}px`,
            }),
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            // hcir1 visible when: menu closed
            opacity: !isOpen ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out, position 0.3s ease-in-out',
            visibility: !isOpen ? 'visible' : 'hidden',
            pointerEvents: !isOpen ? 'auto' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={() => setCircleHovered(true)}
          onMouseLeave={() => setCircleHovered(false)}
        >
          {/* Show hexagon only when in mini mode (active) */}
          {isMiniMode && (
            <>
              <style>{`
                @keyframes hexagonBreathe {
                  0%, 100% {
                    transform: translateY(0px) scale(1);
                    opacity: 0.77;
                  }
                  50% {
                    transform: translateY(8.265373px) scale(1.025829);
                    opacity: 0.8;
                  }
                }
                .hexagon-breathing {
                  animation: hexagonBreathe 3s ease-in-out infinite;
                }
              `}</style>

              <svg
                viewBox="0 0 200 200"
                width={`${circleDiameter}px`}
                height={`${circleDiameter}px`}
                style={{
                  position: 'absolute',
                  pointerEvents: 'none',
                }}
              >
                <defs>
                  <radialGradient id="hexGradient-somnlogg" cx="50%" cy="35%">
                    <stop offset="0%" stopColor="rgba(156, 174, 198, 0.72)" />
                    <stop offset="30%" stopColor="rgba(156, 174, 198, 0.51)" />
                    <stop offset="65%" stopColor="rgba(71, 85, 105, 0.34)" />
                    <stop offset="100%" stopColor="rgba(71, 85, 105, 0.17)" />
                  </radialGradient>
                  <radialGradient id="hexShine-somnlogg" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(203, 213, 225, 0.424)" />
                    <stop offset="50%" stopColor="rgba(203, 213, 225, 0.17)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="hexShadow-somnlogg" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(71, 85, 105, 0.34)" />
                    <stop offset="50%" stopColor="rgba(71, 85, 105, 0.086)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Outer hexagon (outer border) */}
                <polygon
                  points="100,15 185,57.5 185,142.5 100,185 15,142.5 15,57.5"
                  fill="url(#hexGradient-somnlogg)"
                  className="hexagon-breathing"
                />

                {/* Outer border */}
                <polygon
                  points="100,15 185,57.5 185,142.5 100,185 15,142.5 15,57.5"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.267)"
                  strokeWidth="2"
                  className="hexagon-breathing"
                />

                {/* Inner border */}
                <polygon
                  points="100,30 170,65 170,135 100,170 30,135 30,65"
                  fill="none"
                  stroke="rgba(203, 213, 225, 0.192)"
                  strokeWidth="1.5"
                  className="hexagon-breathing"
                />

                {/* Shine overlay */}
                <polygon
                  points="100,15 185,57.5 185,142.5 100,185 15,142.5 15,57.5"
                  fill="url(#hexShine-somnlogg)"
                  className="hexagon-breathing"
                />

                {/* Shadow overlay */}
                <polygon
                  points="100,15 185,57.5 185,142.5 100,185 15,142.5 15,57.5"
                  fill="url(#hexShadow-somnlogg)"
                  opacity="0.386731"
                  className="hexagon-breathing"
                />
              </svg>
            </>
          )}

          {/* Show simple circle border when NOT in mini mode (idle) */}
          {!isMiniMode && (
            <div
              className="absolute pointer-events-none"
              style={{
                width: `${circleDiameter}px`,
                height: `${circleDiameter}px`,
                borderRadius: '50%',
                border: `2px solid rgba(156, 174, 198, 0.4)`,
                top: 0,
                left: 0,
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};