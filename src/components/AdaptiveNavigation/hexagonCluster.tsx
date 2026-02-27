import React, { useState, useRef, useEffect } from 'react';

interface HexagonClusterProps {
  isHovered: boolean;
}

const HexagonCluster: React.FC<HexagonClusterProps> = ({ isHovered }) => {
//const HexagonCluster: React.FC = () => {
//  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const hexagons = [
    // Top row (5)
    { x: 0, y: 0, distance: 0, layer: 'main' },
    { x: 48, y: 0, distance: 0, layer: 'main' },
    { x: 96, y: 0, distance: 0, layer: 'main' },
    { x: 144, y: 0, distance: 0, layer: 'main' },
    { x: 192, y: 0, distance: 0, layer: 'main' },

    // Far distance layer (4 hexagons - 50% shade, 10% lower)
    { x: 24, y: -5.2, distance: 0, layer: 'far' },
    { x: 72, y: -5.2, distance: 0, layer: 'far' },
    { x: 120, y: -5.2, distance: 0, layer: 'far' },
    { x: 168, y: -5.2, distance: 0, layer: 'far' },

    // Middle row (6) - offset
    { x: -24, y: 41.6, distance: 0, layer: 'main' },
    { x: 24, y: 41.6, distance: 0, layer: 'main' },
    { x: 72, y: 41.6, distance: 0, layer: 'main' },
    { x: 120, y: 41.6, distance: 0, layer: 'main' },
    { x: 168, y: 41.6, distance: 0, layer: 'main' },
    { x: 216, y: 41.6, distance: 0, layer: 'main' },

    // Bottom row (5)
    { x: 0, y: 83.2, distance: 0, layer: 'main' },
    { x: 48, y: 83.2, distance: 0, layer: 'main' },
    { x: 96, y: 83.2, distance: 0, layer: 'main' },
    { x: 144, y: 83.2, distance: 0, layer: 'main' },
    { x: 192, y: 83.2, distance: 0, layer: 'main' },
  ];

  // Calculate distances from center
  const centerX = 96;
  const centerY = 41.6;
  hexagons.forEach(hex => {
    hex.distance = Math.sqrt(Math.pow(hex.x - centerX, 2) + Math.pow(hex.y - centerY, 2)) / 150;
  });

  const getHexGradient = (yPosition: number, layer: string) => {
    const isFarLayer = layer === 'far';

    // Far distance hexagons - 50% of top hexagon brightness
    if (isFarLayer) {
      return 'radial-gradient(circle at 50% 35%, rgba(139, 166, 201, 0.2375) 0%, rgba(139, 166, 201, 0.1665) 30%, rgba(71, 85, 105, 0.112) 65%, rgba(71, 85, 105, 0.055) 100%)';
    }

    // Top hexagons - faded distant look
    if (yPosition < 10) {
      return 'radial-gradient(circle at 50% 35%, rgba(139, 166, 201, 0.475) 0%, rgba(139, 166, 201, 0.333) 30%, rgba(71, 85, 105, 0.224) 65%, rgba(71, 85, 105, 0.11) 100%)';
    }
    // Bottom hexagons - half of top values (brighter)
    else if (yPosition > 75) {
      return 'radial-gradient(circle at 50% 35%, rgba(139, 166, 201, 0.565) 0%, rgba(139, 166, 201, 0.41) 30%, rgba(71, 85, 105, 0.28) 65%, rgba(71, 85, 105, 0.14) 100%)';
    }
    // Middle hexagons - original full brightness
    else {
      return 'radial-gradient(circle at 50% 35%, rgba(156, 174, 198, 0.72) 0%, rgba(156, 174, 198, 0.51) 30%, rgba(71, 85, 105, 0.34) 65%, rgba(71, 85, 105, 0.17) 100%)';
    }
  };

  const getHexOpacity = (distance: number, yPosition: number, layer: string) => {
    const isFarLayer = layer === 'far';

    // Distance-based opacity (outward fade)
    const distanceFade = Math.max(0.15, 0.85 - distance * 0.5);

    // Far layer - significantly reduced
    if (isFarLayer) {
      return distanceFade * 0.35;
    }

    // Top rows get faded for horizon effect
    if (yPosition < 10) {
      return distanceFade * 0.65;
    }
    // Bottom rows slightly reduced
    else if (yPosition > 75) {
      return distanceFade * 0.85;
    }
    // Middle rows full opacity
    return distanceFade;
  };

  const getShineGradient = (yPosition: number, layer: string) => {
    const isFarLayer = layer === 'far';

    // Far distance hexagons - dimmer shine
    if (isFarLayer) {
      return 'radial-gradient(rgba(203, 213, 225, 0.14) 0%, rgba(203, 213, 225, 0.055) 50%, transparent 100%)';
    }

    // Top hexagons - dimmer shine
    if (yPosition < 10) {
      return 'radial-gradient(rgba(203, 213, 225, 0.28) 0%, rgba(203, 213, 225, 0.11) 50%, transparent 100%)';
    }
    // Bottom hexagons - medium shine
    else if (yPosition > 75) {
      return 'radial-gradient(rgba(203, 213, 225, 0.36) 0%, rgba(203, 213, 225, 0.14) 50%, transparent 100%)';
    }
    // Middle - full shine
    else {
      return 'radial-gradient(rgba(203, 213, 225, 0.424) 0%, rgba(203, 213, 225, 0.17) 50%, transparent 100%)';
    }
  };

  const getShadowGradient = (yPosition: number, layer: string) => {
    const isFarLayer = layer === 'far';

    // Far distance hexagons - very dim shadow
    if (isFarLayer) {
      return 'radial-gradient(rgba(71, 85, 105, 0.112) 0%, rgba(71, 85, 105, 0.027) 50%, transparent 100%)';
    }

    // Top hexagons - dimmer shadow
    if (yPosition < 10) {
      return 'radial-gradient(rgba(71, 85, 105, 0.224) 0%, rgba(71, 85, 105, 0.055) 50%, transparent 100%)';
    }
    // Bottom hexagons - medium shadow
    else if (yPosition > 75) {
      return 'radial-gradient(rgba(71, 85, 105, 0.27) 0%, rgba(71, 85, 105, 0.067) 50%, transparent 100%)';
    }
    // Middle - full shadow
    else {
      return 'radial-gradient(rgba(71, 85, 105, 0.34) 0%, rgba(71, 85, 105, 0.086) 50%, transparent 100%)';
    }
  };

  const getBorderColor = (yPosition: number, layer: string) => {
    const isFarLayer = layer === 'far';

    // Far layer - very subtle border
    if (isFarLayer) {
      return 'rgba(148, 163, 184, 0.088)';
    }

    // Top hexagons - dimmer border
    if (yPosition < 10) {
      return 'rgba(148, 163, 184, 0.176)';
    }
    // Bottom hexagons - medium border
    else if (yPosition > 75) {
      return 'rgba(148, 163, 184, 0.22)';
    }
    // Middle - full border
    else {
      return 'rgba(148, 163, 184, 0.267)';
    }
  };

  const getBorderInnerColor = (yPosition: number, layer: string) => {
    const isFarLayer = layer === 'far';

    // Far layer - very subtle inner border
    if (isFarLayer) {
      return 'rgba(203, 213, 225, 0.063)';
    }

    // Top hexagons - dimmer inner border
    if (yPosition < 10) {
      return 'rgba(203, 213, 225, 0.125)';
    }
    // Bottom hexagons - medium inner border
    else if (yPosition > 75) {
      return 'rgba(203, 213, 225, 0.156)';
    }
    // Middle - full inner border
    else {
      return 'rgba(203, 213, 225, 0.192)';
    }
  };

  const getEdgeFadeOverlay = (xPosition: number) => {
    const leftmost = -24;
    const rightmost = 216;

    if (Math.abs(xPosition - leftmost) < 5) {
      return 'linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)';
    }

    if (Math.abs(xPosition - rightmost) < 5) {
      return 'linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)';
    }

    return 'none';
  };

  const getHexId = (idx: number) => {
    const hexRowInfo = [
      'top-1', 'top-2', 'top-3', 'top-4', 'top-5',
      'far-1', 'far-2', 'far-3', 'far-4',
      'middle-left', 'middle-2', 'middle-3', 'middle-4', 'middle-5', 'middle-right',
      'bottom-1', 'bottom-2', 'bottom-3', 'bottom-4', 'bottom-5'
    ];
    return hexRowInfo[idx] || `hex-${idx}`;
  };

  useEffect(() => {
    if (isHovered) {
      setAnimationPhase(0.5);
    }
  }, [isHovered]);

  const getWaveOffset = (idx: number, isCurrentlyHovered: boolean) => {
    const phase = animationPhase + (idx * 0.05);
    const normalizedPhase = (phase % 1);

    const wavePosition = Math.abs(Math.sin(normalizedPhase * Math.PI)) * 0.5 + 0.25;
    const offset = wavePosition * 16;

    return offset;
  };

  const getScaleFromWave = (idx: number, isCurrentlyHovered: boolean) => {
    const phase = animationPhase + (idx * 0.05);
    const normalizedPhase = (phase % 1);

    // Wave position: 0 at bottom, 1 at top
    const wavePosition = Math.abs(Math.sin(normalizedPhase * Math.PI)) * 0.5 + 0.25;

    // Scale from 1 (at bottom) to 1.05 (at top)
    const scale = 1 + (wavePosition * 0.05);

    return scale;
  };

  const getShadowDepth = (idx: number, isCurrentlyHovered: boolean, yPosition: number) => {
    const speed = isCurrentlyHovered ? 2 : 3.5;
    const phase = animationPhase + (idx * 0.05);
    const normalizedPhase = (phase % 1);

    const wavePosition = Math.abs(Math.sin(normalizedPhase * Math.PI)) * 0.5 + 0.25;
    let shadowOpacity = (1 - wavePosition) * 0.8;

    if (yPosition < 10) {
      shadowOpacity *= 1.5;
    }
    else if (yPosition > 75) {
      shadowOpacity *= 1.4;
    }

    return Math.min(1, shadowOpacity);
  };

  useEffect(() => {
    let animationFrame: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newPhase = (elapsed / (isHovered ? 2000 : 3500)) % 1;
      setAnimationPhase(newPhase);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const containerWidth = 300;
  const hexClusterWidth = 240;
  const centerOffset = (containerWidth - hexClusterWidth) / 2;

  return (
//    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-8">
    <div className="flex justify-center">
      <style>{`
        .hexagon {
          position: absolute;
          width: 42px;
          height: 48.3px;
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          will-change: opacity, transform;
          transform-origin: center center;
        }

        .hexagon-inner {
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 35%, rgba(156, 174, 198, 0.72) 0%, rgba(156, 174, 198, 0.51) 30%, rgba(71, 85, 105, 0.34) 65%, rgba(71, 85, 105, 0.17) 100%);
          position: relative;
          filter: drop-shadow(0 0 8px rgba(156, 174, 198, 0.4));
        }

        .hexagon-border-outer {
          position: absolute;
          inset: 0px;
          border: 2px solid rgba(148, 163, 184, 0.267);
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          opacity: 0.8;
          transition: opacity 0.3s;
        }

        .hexagon-border-inner {
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(203, 213, 225, 0.192);
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .hexagon-shine {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 25%;
          background: radial-gradient(rgba(203, 213, 225, 0.424) 0%, rgba(203, 213, 225, 0.17) 50%, transparent 100%);
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          pointer-events: none;
        }

        .hexagon-fade-overlay {
          position: absolute;
          inset: 0px;
          pointer-events: none;
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
        }

        .hexagon-shadow {
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translate(-50%, 0%);
          width: 100%;
          height: 60%;
          background: linear-gradient(to bottom, rgba(71, 85, 105, 0) 0%, rgba(50, 60, 80, 0.3) 50%, rgba(40, 45, 65, 0.5) 100%);
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          pointer-events: none;
          transition: opacity 0.05s linear;
        }

        .hexagon-bottom-fade {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to bottom, rgba(10, 14, 26, 0) 0%, rgba(10, 14, 26, 0.5) 100%);
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          pointer-events: none;
        }
      `}</style>

      <div className="relative w-[300px] h-[156px]" ref={containerRef}>
        {hexagons.map((hex, idx) => {
          const opacity = getHexOpacity(hex.distance, hex.y, hex.layer);
          const waveOffset = getWaveOffset(idx, isHovered);
          const shadowDepth = getShadowDepth(idx, isHovered, hex.y);
          const edgeFade = getEdgeFadeOverlay(hex.x);
          const hexId = getHexId(idx);
          const scale = getScaleFromWave(idx, isHovered);

          return (
            <div
              key={idx}
              id={hexId}
              className="hexagon"
              style={{
                left: `${hex.x + centerOffset}px`,
                top: `${hex.y}px`,
                opacity: opacity,
                transform: `translateY(${waveOffset}px) scale(${scale})`,
              }}
            >
              <div
                className="hexagon-inner"
                style={{
                  background: getHexGradient(hex.y, hex.layer),
                }}
              >
                <div
                  className="hexagon-border-outer"
                  style={{ borderColor: getBorderColor(hex.y, hex.layer) }}
                />
                <div
                  className="hexagon-border-inner"
                  style={{ borderColor: getBorderInnerColor(hex.y, hex.layer) }}
                />
                <div
                  className="hexagon-shine"
                  style={{ background: getShineGradient(hex.y, hex.layer) }}
                />
                <div
                  className="hexagon-shadow"
                  style={{
                    opacity: shadowDepth,
                    background: getShadowGradient(hex.y, hex.layer)
                  }}
                />
                {edgeFade !== 'none' && (
                  <div
                    className="hexagon-fade-overlay"
                    style={{ background: edgeFade }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HexagonCluster;