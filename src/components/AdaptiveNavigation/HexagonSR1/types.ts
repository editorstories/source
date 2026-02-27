// src/components/HexagonSR1/types.ts

export interface HexagonData {
  x: number;
  y: number;
  delay: number;
  opacity: number;
  distanceFromCenter: number;
  distanceFromEdge: number;
}

export interface HexagonStyleConfig {
  hexSize: number;           // Base hexagon size in pixels
  spacing: number;           // Spacing multiplier (1 = touching)
  centerOpacity: number;     // Opacity at center
  edgeOpacity: number;       // Opacity at edges
  borderOpacity: number;     // Border opacity
  baseColor: string;         // Base color (for dark mode)
  hoverScale: number;        // Scale on hover
  waveAmplitude: number;     // Wave movement in pixels
}

export interface SR1GridConfig {
  width: number;             // Rectangle width
  height: number;            // Rectangle height
  fadeEdgeSize: number;      // Fade zone size in pixels
  padding: number;           // Extra render area outside bounds
}

export type AnimationState = 'idle' | 'entering' | 'visible' | 'exiting';

export interface SR1HexagonGridProps {
  gridConfig: SR1GridConfig;
  styleConfig?: Partial<HexagonStyleConfig>;
  animationState?: AnimationState;
  className?: string;
  onHoverHex?: (index: number) => void;
}