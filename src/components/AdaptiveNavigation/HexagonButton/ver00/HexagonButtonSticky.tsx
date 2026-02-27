// src/components/HexagonButton/HexagonButtonSticky.tsx
'use client';

import React, { useState, useRef } from 'react';
import MenuButton from './MenuButton';
import HexagonCluster from './hexagonCluster';

interface HexagonButtonStickyProps {
  onInteract: () => void;
  opacity: number;
  isOpen: boolean;
  isDayMode: boolean;
  isMobile: boolean;
  isMiniMode?: boolean;
  onToggleMiniMode?: () => void;
}

export const HexagonButtonSticky: React.FC<HexagonButtonStickyProps> = ({
  onInteract,
  opacity,
  isOpen,
  isDayMode,
  isMobile,
  isMiniMode = false,
  onToggleMiniMode = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menuButtonBounds, setMenuButtonBounds] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // Dimensions
  const gridWidth = 280;
  const gridHeight = 140;
  const scale = 0.5;
  const scaledWidth = gridHeight * scale; // 70px
  const scaledHeight = gridWidth * scale; // 140px
  const circleDiameter = scaledWidth / 2; // 35px
  const circleGap = 8;

  const hb1Visible = !isMiniMode && !isOpen && opacity > 0;

  // Use MenuButton bounds if available, otherwise use scaled dimensions
  // For desktop, scale up since button is larger
  const mbWidth = menuButtonBounds.width || (isMobile ? scaledWidth : scaledWidth * 1.3);
  const mbHeight = menuButtonBounds.height || (isMobile ? scaledHeight : scaledHeight * 1.3);

  // Group 1 size: wraps both mb1 and hclus1 (stacked)
  const group1Width = mbWidth;
  const group1Height = mbHeight;

  // Circle dimensions
  const circleDimensions = {
    width: circleDiameter,
    height: circleDiameter,
  };

  return (
    <div
      className="fixed z-40"
      style={{
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out',
        visibility: opacity > 0 ? 'visible' : 'hidden',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
        {/*pointerEvents: opacity > 0 ? 'auto' : 'none',*/}
        
      {/* hb1 - Main flex container, stacks groups vertically */}
      {hb1Visible && (
        <div
          className="relative"
          data-hex-child="hb1-main"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'auto',
            gap: `${circleGap}px`,
            padding: '8px',
            border: '2px solid rgba(59, 130, 246, 0.5)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* GROUP 1: Menu Button + Hexagon Cluster (stacked, centered) */}
          <div
            className="relative"
            data-hex-child="group1-wrapper"
            style={{
              position: 'relative',
              width: `${group1Width}px`,
              height: `${group1Height}px`,
              border: '2px solid rgba(34, 197, 94, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Hexagon Cluster - background, centered */}
            <div
              className="absolute pointer-events-none"
              data-hex-child="hexagon-cluster-container"
              style={{
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.85,
                zIndex: 0,
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

            {/* Menu Button - foreground, centered, rotated -90deg */}
            <div
              className="relative z-20"
              data-hex-child="menu-button-wrapper"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/*transform: 'rotate(-90deg)',*/}
              <div
                style={{
                  transform: 'rotate(-90deg) scale(0.75)',
                  transformOrigin: 'center',
                }}
              >
                <MenuButton
                  isHeroSection={false}
                  onInteract={onInteract}
                  isOpen={isOpen}
                  isSomnlogg={false}
                  isDayMode={isDayMode}
                  isMobile={isMobile}
                  onBoundsChange={setMenuButtonBounds}
                />
              </div>
            </div>
          </div>

          {/* GROUP 2: Activation Circle */}
          <div
            data-hex-child="group2-wrapper"
            style={{
              width: `${circleDimensions.width}px`,
              height: `${circleDimensions.height}px`,
              border: '2px solid rgba(251, 146, 60, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={onToggleMiniMode}
              className="focus:outline-none"
              data-hex-child="hcir1a-button"
              style={{
                width: `${circleDimensions.width}px`,
                height: `${circleDimensions.height}px`,
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !isMiniMode && !isOpen ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                visibility: !isMiniMode && !isOpen ? 'visible' : 'hidden',
                pointerEvents: !isMiniMode && !isOpen ? 'auto' : 'none',
              }}
            >
              {/* Circle border indicator */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: `${circleDimensions.width}px`,
                  height: `${circleDimensions.height}px`,
                  borderRadius: '50%',
                  border: `2px solid rgba(156, 174, 198, 0.4)`,
                }}
              />
            </button>
          </div>

          {/* DEBUG: Show bounds */}
          <div style={{ fontSize: '10px', color: '#888', marginTop: '8px', whiteSpace: 'nowrap' }}>
            MB: {menuButtonBounds.width}×{menuButtonBounds.height}
          </div>
        </div>
      )}
    </div>
  );
};