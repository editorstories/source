// AdaptiveNavigation/HexagonNet.tsx
'use client';

import React from 'react';

interface Hex {
  x: number;
  y: number;
}

interface HexagonNetProps {
  hexSize?: number; // radius of each hexagon in pixels
  cols?: number; // number of hexagons per row
  rows?: number; // number of rows
  horizontalGap?: number; // gap between hexes horizontally
  verticalGap?: number; // gap between rows
  className?: string;
  children?: React.ReactNode;
  showFadeEdges?: boolean;
}

export default function HexagonNet({
  hexSize = 30,
  cols = 4,
  rows = 2,
  horizontalGap = 6,
  verticalGap = 4,
  className = '',
  children,
  showFadeEdges = false
}: HexagonNetProps) {
  // Derived dimensions
  const hexWidth = hexSize * 2;
  const hexHeight = Math.sqrt(3) * hexSize;

  // Horizontal and vertical step sizes
  // For hexagons to touch perfectly: horizStep = hexWidth * 0.75, vertStep = hexHeight
  // Add gaps to create separation while maintaining net structure
  const horizStep = hexWidth * 0.75 + horizontalGap;
  const vertStep = hexHeight + verticalGap;

  // Calculate total dimensions
  const totalWidth = (cols - 1) * horizStep + hexWidth;
  const totalHeight = (rows - 1) * vertStep + hexHeight;

  // Generate hexagon positions
  const hexes: Hex[] = [];
  for (let row = 0; row < rows; row++) {
    // For odd rows (index 1, 3, etc.), we need one more hex to fill the space
    const colsInRow = row % 2 === 1 ? cols + 1 : cols;

    for (let col = 0; col < colsInRow; col++) {
      // Offset every other row by half a hex width to create honeycomb pattern
      const xOffset = row % 2 === 1 ? horizStep * 0.5 : 0;
      const x = col * horizStep + xOffset;
      const y = row * vertStep;
      hexes.push({ x, y });
    }
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${totalWidth}px`,
        height: `${totalHeight}px`,
      }}
    >
      {/* Fade edges (optional) */}
      {showFadeEdges && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-950 via-gray-950/70 to-transparent z-10" />
        </>
      )}

      {/* Hexagon grid */}
      {hexes.map((hex, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${hex.x}px`,
            top: `${hex.y}px`,
            width: `${hexWidth}px`,
            height: `${hexHeight}px`,
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background:
              'linear-gradient(135deg, rgba(71, 85, 105, 0.15), rgba(51, 65, 85, 0.1))', // More subtle slate colors
            border: '1px solid rgba(100, 116, 139, 0.3)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-5" />
        </div>
      ))}

      {/* Content overlay (button) - centered on top of hexagons */}
      {children && (
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}