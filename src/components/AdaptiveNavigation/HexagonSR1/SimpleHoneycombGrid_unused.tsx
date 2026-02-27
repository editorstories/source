// src/components/HexagonSR1/SimpleHoneycombGrid.tsx
'use client';

import React from 'react';

interface SimpleHoneycombGridProps {
  // Core dimensions
  hexSize: number;              // Base hexagon size (e.g., 30)
  spacing?: number;             // Spacing multiplier (1.0 - 1.5, default: 1.15)
  rows: number;                 // Number of rows
  cols: number;                 // Number of columns

  // Container
  containerWidth: number;       // Container width in px
  containerHeight: number;      // Container height in px

  // Visual effects
  rotate?: boolean;             // Rotate grid -90deg (for vertical button)
  fadeEdges?: boolean;          // Fade edges with gradient mask
  opacity?: number;             // Overall opacity (0-1)

  // Styling
  className?: string;
}

export const SimpleHoneycombGrid: React.FC<SimpleHoneycombGridProps> = ({
  hexSize,
  spacing = 1.15,
  rows,
  cols,
  containerWidth,
  containerHeight,
  rotate = false,
  fadeEdges = true,
  opacity = 0.8,
  className = '',
}) => {
  // Calculate all dimensions based on hexSize
  const dims = {
    hexWidth: hexSize * 2,
    hexHeight: hexSize * 4,
    itemWidth: hexSize * 2 * spacing,
    itemHeight: hexSize * 2.3,
    hexTop: -hexSize * 0.85,
    marginLeft: hexSize * 1.01 * spacing,
    marginTop: -hexSize * 0.55,
    glowSize: hexSize * 2,
  };

  const totalHexagons = rows * cols;

  return (
    <div className={`honeycomb-wrapper ${className}`}>
      <style jsx>{`
        .honeycomb-wrapper {
          position: relative;
          width: ${containerWidth}px;
          height: ${containerHeight}px;
        }

        .honeycomb-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          opacity: ${opacity};
          ${fadeEdges ? `
            -webkit-mask-image:
              linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
            -webkit-mask-composite: source-in;
            mask-image:
              linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
            mask-composite: intersect;
          ` : ''}
        }

        .honeycomb-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          ${rotate ? 'transform: rotate(-90deg);' : ''}
          transform-origin: center center;
        }

        .honeycomb-grid {
          display: inline-block;
          padding: 2em 0;
        }

        .hex-item {
          width: ${dims.itemWidth}px;
          height: ${dims.itemHeight}px;
          position: relative;
          display: inline-block;
        }

        /* Offset every other row */
        .hex-item.offset {
          margin-left: ${dims.marginLeft}px;
        }

        /* Negative margin for rows after first */
        .hex-item.not-first-row {
          margin-top: ${dims.marginTop}px;
        }

        /* Triple-nested rotation hexagon */
        .hex-outer {
          position: absolute;
          width: ${dims.hexWidth}px;
          height: ${dims.hexHeight}px;
          top: ${dims.hexTop}px;
          overflow: hidden;
          transform: rotate(120deg);
          cursor: pointer;
        }

        .hex-middle {
          overflow: hidden;
          width: 100%;
          height: 100%;
          transform: rotate(-60deg);
        }

        .hex-inner {
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 50% 35%,
            rgba(156, 174, 198, 0.55) 0%,
            rgba(156, 174, 198, 0.39) 30%,
            rgba(71, 85, 105, 0.26) 65%,
            rgba(71, 85, 105, 0.13) 100%
          );
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: 125%;
          transform: rotate(-60deg);
          transition: all 0.3s ease;
          box-shadow: inset 0 0 0 ${dims.glowSize}px rgba(156, 174, 198, 0.3);
        }

        .hex-inner:hover {
          background: radial-gradient(
            circle at 50% 35%,
            rgba(156, 174, 198, 0.65) 0%,
            rgba(130, 224, 170, 0.35) 30%,
            rgba(69, 183, 209, 0.3) 65%,
            rgba(71, 85, 105, 0.2) 100%
          );
          box-shadow: inset 0 0 0 ${dims.glowSize}px rgba(130, 224, 170, 0.25);
        }
      `}</style>

      <div className="honeycomb-container">
        <div className="honeycomb-inner">
          <div className="honeycomb-grid">
            {Array.from({ length: totalHexagons }).map((_, i) => {
              const row = Math.floor(i / cols);
              const col = i % cols;
              const isOffsetRow = row % 2 === 1;
              const isFirstInOffsetRow = col === 0 && isOffsetRow;
              const isNotFirstRow = row > 0;

              return (
                <div
                  key={i}
                  className={`hex-item ${isFirstInOffsetRow ? 'offset' : ''} ${isNotFirstRow ? 'not-first-row' : ''}`}
                >
                  <div className="hex-outer">
                    <div className="hex-middle">
                      <div className="hex-inner" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};