// src/components/HexagonButton/HexagonCircle.tsx

'use client';

import React from 'react';

interface HexagonCircleProps {
  isMiniMode: boolean;
  onToggleMiniMode: () => void;
  isDayMode?: boolean;
  isOpen: boolean;
  visibility?: number; // opacity control from parent
}

export const HexagonCircle: React.FC<HexagonCircleProps> = ({
  isMiniMode,
  onToggleMiniMode,
  isDayMode,
  isOpen,
  visibility = 1, // Default to fully visible for backward compatibility
}) => {
  const circleDiameter = 52.5; // Matches oss1 hcir1 size

  // Only render when in mini mode AND menu is not open
  if (!isMiniMode || isOpen) {
    return null;
  }

  return (
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

      <button
        onClick={onToggleMiniMode}
        className="focus:outline-none"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          width: `${circleDiameter}px`,
          height: `${circleDiameter}px`,
          zIndex: 50,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.5s ease-in-out',
          opacity: visibility, // Apply visibility from parent
          pointerEvents: visibility > 0 ? 'auto' : 'none', // Disable clicks when invisible
        }}
      >
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
            <radialGradient id="hexGradient-global" cx="50%" cy="35%">
              <stop offset="0%" stopColor="rgba(156, 174, 198, 0.72)" />
              <stop offset="30%" stopColor="rgba(156, 174, 198, 0.51)" />
              <stop offset="65%" stopColor="rgba(71, 85, 105, 0.34)" />
              <stop offset="100%" stopColor="rgba(71, 85, 105, 0.17)" />
            </radialGradient>
            <radialGradient id="hexShine-global" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(203, 213, 225, 0.424)" />
              <stop offset="50%" stopColor="rgba(203, 213, 225, 0.17)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="hexShadow-global" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(71, 85, 105, 0.34)" />
              <stop offset="50%" stopColor="rgba(71, 85, 105, 0.086)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Outer hexagon (outer border) */}
          <polygon
            points="100,15 185,57.5 185,142.5 100,185 15,142.5 15,57.5"
            fill="url(#hexGradient-global)"
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
            fill="url(#hexShine-global)"
            className="hexagon-breathing"
          />

          {/* Shadow overlay */}
          <polygon
            points="100,15 185,57.5 185,142.5 100,185 15,142.5 15,57.5"
            fill="url(#hexShadow-global)"
            opacity="0.386731"
            className="hexagon-breathing"
          />
        </svg>
      </button>
    </>
  );
};