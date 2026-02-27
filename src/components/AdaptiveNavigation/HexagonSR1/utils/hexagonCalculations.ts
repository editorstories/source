// src/components/HexagonSR1/utils/hexagonCalculations.ts

import { HexagonData, HexagonStyleConfig, SR1GridConfig } from '../types';

/**
 * Calculate distance from nearest edge
 */
export function calculateDistanceFromEdge(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const distLeft = x;
  const distRight = width - x;
  const distTop = y;
  const distBottom = height - y;

  return Math.min(distLeft, distRight, distTop, distBottom);
}

/**
 * Calculate opacity based on distance from edges (fade effect)
 */
export function calculateEdgeFadeOpacity(
  distanceFromEdge: number,
  fadeEdgeSize: number,
  centerOpacity: number,
  edgeOpacity: number
): number {
  if (distanceFromEdge >= fadeEdgeSize) {
    return centerOpacity;
  }

  const fadeRatio = distanceFromEdge / fadeEdgeSize;
  const easedRatio = fadeRatio * fadeRatio; // Smooth curve
  const opacity = edgeOpacity + (centerOpacity - edgeOpacity) * easedRatio;

  return Math.max(edgeOpacity, Math.min(centerOpacity, opacity));
}

/**
 * Calculate wave animation delay based on distance from center
 */
export function calculateWaveDelay(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const centerX = width / 2;
  const centerY = height / 2;

  const distanceFromCenter = Math.sqrt(
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
  );

  const maxDistance = Math.sqrt(
    Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
  );

  const normalizedDistance = distanceFromCenter / maxDistance;
  const maxDelay = 1.5; // seconds

  return normalizedDistance * maxDelay;
}

/**
 * Generate PERFECT honeycomb hexagon grid
 *
 * KEY MEASUREMENTS:
 * - hexWidth = styleConfig.hexSize (base size)
 * - hexHeight = hexWidth × 1.1547 (this is 2/√3)
 * - horizontalGap = hexWidth × 0.75 (exactly 3/4 of width)
 * - verticalGap = hexHeight (full height)
 * - Odd columns shift DOWN by hexHeight/2
 */
export function generateHexagonGrid(
  styleConfig: HexagonStyleConfig,
  gridConfig: SR1GridConfig
): HexagonData[] {
  const hexagons: HexagonData[] = [];

  // CRITICAL: Perfect hexagon measurements
  const hexWidth = styleConfig.hexSize;
  const hexHeight = hexWidth * 1.1547;  // Exact ratio for regular hexagon (2/√3)

  // Perfect honeycomb spacing
  const horizontalGap = hexWidth * 0.75;  // Columns are 3/4 width apart
  const verticalGap = hexHeight;          // Rows are full height apart
  const verticalOffset = hexHeight / 2;   // Odd columns shift by half height

  // Calculate grid center
  const centerX = gridConfig.width / 2;
  const centerY = gridConfig.height / 2;

  // Calculate how many hexagons we need (with extra for full coverage)
  const numCols = Math.ceil(gridConfig.width / horizontalGap) + 3;
  const numRows = Math.ceil(gridConfig.height / verticalGap) + 3;

  // Start from negative position to ensure edges are filled
  const startX = centerX - (numCols * horizontalGap) / 2;
  const startY = centerY - (numRows * verticalGap) / 2;

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      // Position calculation
      const x = startX + col * horizontalGap;
      const y = startY + row * verticalGap + (col % 2 ? verticalOffset : 0);

      // Calculate distances
      const distanceFromEdge = calculateDistanceFromEdge(
        x, y, gridConfig.width, gridConfig.height
      );

      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      // Calculate opacity with fade
      const opacity = calculateEdgeFadeOpacity(
        distanceFromEdge,
        gridConfig.fadeEdgeSize,
        styleConfig.centerOpacity,
        styleConfig.edgeOpacity
      );

      // Calculate animation delay
      const delay = calculateWaveDelay(
        x, y, gridConfig.width, gridConfig.height
      );

      hexagons.push({
        x,
        y,
        delay,
        opacity: isNaN(opacity) ? 0.5 : opacity,
        distanceFromCenter,
        distanceFromEdge,
      });
    }
  }

  return hexagons;
}

/**
 * Get default style config
 */
export function getDefaultStyleConfig(): HexagonStyleConfig {
  return {
    hexSize: 40,              // Base size
    spacing: 1.0,             // NOT USED in this version (kept for compatibility)
    centerOpacity: 0.85,
    edgeOpacity: 0.15,
    borderOpacity: 0.45,
    baseColor: 'rgb(156, 174, 198)',
    hoverScale: 1.12,
    waveAmplitude: 3,
  };
}