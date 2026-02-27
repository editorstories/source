// src/components/HexagonSR1/HexagonShape.tsx

import React, { useState } from 'react';
import { HexagonStyleConfig } from './types';

interface HexagonShapeProps {
  styleConfig: HexagonStyleConfig;
  opacity: number;
  animationDelay: number;
  x: number;
  y: number;
  isEdge: boolean;
  index: number;
  onHover?: (index: number) => void;
  gridWidth: number;
  gridHeight: number;
  edgeFadeWidth?: number;
}

export const HexagonShape: React.FC<HexagonShapeProps> = ({
  styleConfig,
  opacity,
  animationDelay,
  x,
  y,
  isEdge,
  index,
  onHover,
  gridWidth,
  gridHeight,
  edgeFadeWidth = 50,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { hexSize, borderOpacity, hoverScale } = styleConfig;

  // CRITICAL: Use exact hexagon height (2/√3 ratio)
  const hexHeight = hexSize * 1.1547;

  // ENHANCED slate color palette - FULL VISIBILITY for design work
  // These values provide maximum clarity to see the hexagon structure
  // Parent component opacity will be used to reduce visibility in production
  const slateColors = {
    primary: '156, 174, 198',      // Slate-400 - main hexagon color
    light: '203, 213, 225',        // Slate-300 - bright highlights
    dark: '71, 85, 105',           // Slate-600 - shadows and depth
    accent: '139, 166, 201',       // Blue-slate - edge hexagons
    glow: '226, 232, 240',         // Slate-200 - bright glow effects
    border: '148, 163, 184',       // Slate-400 - visible borders
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hexColor = isEdge ? slateColors.accent : slateColors.primary;

  // Calculate edge fade based on position
  const calculateEdgeFade = () => {
    const hexCenterX = x + hexSize / 2;
    const hexCenterY = y + hexSize / 2;

    const distLeft = hexCenterX;
    const distRight = gridWidth - hexCenterX;
    const distTop = hexCenterY;
    const distBottom = gridHeight - hexCenterY;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);

    if (minDist >= edgeFadeWidth) {
      return 1; // Full opacity in center
    }

    // Smooth fade curve
    const fadeRatio = minDist / edgeFadeWidth;
    return 0.3 + (fadeRatio * fadeRatio) * 0.7; // Minimum 30% visibility
  };

  const edgeFadeMultiplier = calculateEdgeFade();

  // DESIGN MODE: Use full opacity here, parent will control overall visibility
  // This ensures you can see the design clearly during development
  const finalOpacity = opacity * edgeFadeMultiplier;

  return (
    <div
      className={`sr1-hexagon ${isEdge ? 'sr1-hex-edge' : ''} findSr1`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${hexSize}px`,
        height: `${hexSize * 1.15}px`,
        opacity: finalOpacity,
        animationDelay: `${animationDelay}s`,
        position: 'absolute',
        willChange: 'opacity, transform',
        transformOrigin: 'center center',
        transform: isHovered ? `scale(${hoverScale})` : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: isHovered ? 10 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ===================================
          MAIN HEXAGON BODY
          Radial gradient creates depth: light center → dark edges
          =================================== */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 35%,
            rgba(${hexColor}, ${finalOpacity * 0.85}) 0%,
            rgba(${hexColor}, ${finalOpacity * 0.6}) 30%,
            rgba(${slateColors.dark}, ${finalOpacity * 0.4}) 65%,
            rgba(${slateColors.dark}, ${finalOpacity * 0.2}) 100%
          )`,
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          filter: isHovered
            ? `drop-shadow(0 0 16px rgba(${slateColors.glow}, ${finalOpacity * 1}))`
            : 'none',
          transition: 'filter 0.3s ease',
        }}
      />

      {/* ===================================
          OUTER BORDER
          Primary definition line - visible and clear
          =================================== */}
      <div
        style={{
          position: 'absolute',
          inset: '0',
          border: `2px solid rgba(${slateColors.border}, ${borderOpacity * finalOpacity * 0.7})`,
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          opacity: isHovered ? 1 : 0.8,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ===================================
          INNER HIGHLIGHT BORDER
          Adds dimension with lighter inner edge
          =================================== */}
      <div
        style={{
          position: 'absolute',
          inset: '3px',
          border: `1px solid rgba(${slateColors.light}, ${borderOpacity * finalOpacity * 0.5})`,
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          opacity: isHovered ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ===================================
          TOP HIGHLIGHT
          Creates 3D effect - light source from above
          =================================== */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '25%',
          background: `radial-gradient(ellipse at center,
            rgba(${slateColors.light}, ${finalOpacity * 0.5}) 0%,
            rgba(${slateColors.light}, ${finalOpacity * 0.2}) 50%,
            transparent 100%
          )`,
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          pointerEvents: 'none',
        }}
      />

      {/* ===================================
          BOTTOM SHADOW
          Enhances 3D effect with shadow at bottom
          =================================== */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: '60%',
          height: '30%',
          background: `radial-gradient(ellipse at center,
            rgba(${slateColors.dark}, ${finalOpacity * 0.4}) 0%,
            rgba(${slateColors.dark}, ${finalOpacity * 0.1}) 50%,
            transparent 100%
          )`,
          clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
          pointerEvents: 'none',
        }}
      />

      {/* ===================================
          HOVER CENTER DOT
          Glowing dot that appears on hover
          =================================== */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: `rgba(${slateColors.glow}, 1)`,
            boxShadow: `
              0 0 10px rgba(${slateColors.glow}, 0.9),
              0 0 20px rgba(${slateColors.accent}, 0.6),
              0 0 30px rgba(${slateColors.accent}, 0.3)
            `,
            animation: 'sr1-pulse 1.5s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
};

//'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;'