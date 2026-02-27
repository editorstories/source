// src/components/HexagonSR1/SR1HexagonGrid.tsx

import React, { useMemo, useState, useEffect } from 'react';
import { HexagonShape } from './HexagonShape';
import { SR1HexagonGridProps, AnimationState } from './types';
import { generateHexagonGrid, getDefaultStyleConfig } from './utils/hexagonCalculations';

export const SR1HexagonGrid: React.FC<SR1HexagonGridProps> = ({
  gridConfig,
  styleConfig: styleOverrides,
  animationState = 'visible',
  className = '',
  onHoverHex,
}) => {
  const [animKey, setAnimKey] = useState(0);

  // Merge style config with defaults
  const styleConfig = useMemo(
    () => ({ ...getDefaultStyleConfig(), ...styleOverrides }),
    [styleOverrides]
  );

  // Generate hexagon grid
  const hexagons = useMemo(
    () => generateHexagonGrid(styleConfig, gridConfig),
    [styleConfig, gridConfig]
  );

  // Reset animation when state changes
  useEffect(() => {
    if (animationState === 'entering') {
      setAnimKey(prev => prev + 1);
    }
  }, [animationState]);

  // Get animation class based on state
  const getAnimationClass = (): string => {
    switch (animationState) {
      case 'idle':
        return 'sr1-hex-idle';
      case 'entering':
        return 'sr1-hex-entering';
      case 'visible':
        return 'sr1-hex-visible sr1-hex-wave';
      case 'exiting':
        return 'sr1-hex-exiting';
      default:
        return '';
    }
  };

  const animClass = getAnimationClass();

  return (
    <div
      key={animKey}
      className={`sr1-hexagon-grid ${className}`}
      style={{
        position: 'absolute',
        width: `${gridConfig.width}px`,
        height: `${gridConfig.height}px`,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      {hexagons.map((hex, index) => {
        const isEdge = hex.distanceFromEdge < gridConfig.fadeEdgeSize;

        return (
          <div key={`hex-${index}`} className={animClass}>
            {/*<HexagonShape*/}
            {/*  styleConfig={styleConfig}*/}
            {/*  opacity={hex.opacity}*/}
            {/*  animationDelay={hex.delay}*/}
            {/*  x={hex.x}*/}
            {/*  y={hex.y}*/}
            {/*  isEdge={isEdge}*/}
            {/*  index={index}*/}
            {/*  onHover={onHoverHex}*/}
            {/*  gridWidth={gridConfig.width}*/}
            {/*  gridHeight={gridConfig.height}*/}
            {/*  edgeFadeWidth={60}*/}
            {/*/>*/}

            <HexagonShape
              styleConfig={styleConfig}
              opacity={hex.opacity}
              animationDelay={hex.delay}
              x={hex.x}
              y={hex.y}
              isEdge={isEdge}
              index={index}
              onHover={onHoverHex}
              gridWidth={gridConfig.width}
              gridHeight={gridConfig.height}
              edgeFadeWidth={10}
            />
          </div>
        );
      })}
    </div>
  );
};