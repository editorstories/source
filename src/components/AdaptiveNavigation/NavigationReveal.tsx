// AdaptiveNavigation/NavigationReveal.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface NavigationRevealProps {
  isVisible: boolean;
  isMobile?: boolean;
  locale?: string;
  miniGridHeight?: number;
  onAnimationComplete?: (complete: boolean) => void; // NEW: Callback to signal completion
}

const translations = {
  sv: { word: 'navigering', short: 'nav', suffixStart: 3 },
  en: { word: 'navigation', short: 'nav', suffixStart: 3 },
  es: { word: 'navegación', short: 'nav', suffixStart: 3 },
};

export const NavigationReveal: React.FC<NavigationRevealProps> = ({
  isVisible,
  isMobile = false,
  locale = 'sv',
  miniGridHeight = 0,
  onAnimationComplete, // NEW
}) => {
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [suffixFading, setSuffixFading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const config = translations[locale as keyof typeof translations] || translations.sv;
  const { word, short, suffixStart } = config;
  const chars = word.split('');

  // Timing
  const charDelay = 180;
  const holdDuration = 1000;
  const suffixFadeDuration = 800;

  useEffect(() => {
    if (!isVisible) {
      setCurrentCharIndex(-1);
      setSuffixFading(false);
      setAnimationComplete(false);
      onAnimationComplete?.(false); // NEW: Signal not complete
      return;
    }

    // Appear characters
    const charTimers: NodeJS.Timeout[] = [];
    chars.forEach((_, i) => {
      const timer = setTimeout(() => {
        setCurrentCharIndex(i);
      }, i * charDelay);
      charTimers.push(timer);
    });

    const totalAppearTime = chars.length * charDelay;

    // Start fading suffix
    const fadeTimer = setTimeout(() => {
      setSuffixFading(true);
    }, totalAppearTime + holdDuration);

    // Mark animation complete
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      onAnimationComplete?.(true); // NEW: Signal completion
    }, totalAppearTime + holdDuration + suffixFadeDuration);

    return () => {
      charTimers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, chars.length, onAnimationComplete]);

  if (!isVisible) return null;

  const fontSize = isMobile ? 50 : 60;
  const charWidth = fontSize * 0.55;

  // Calculate dimensions for the final "nav" state
  const finalWidth = short.length * charWidth;
  const finalHeight = fontSize * 0.7;

  const topPosition = isMobile
    ? `${miniGridHeight + 8}px`
    : 'calc(12% - 80px)';

  const leftPosition = isMobile
    ? '8px'
    : '8px';

  const transform = isMobile ? 'none' : 'none';

  return (
    <>
      {/* Backdrop blur - sized for final "nav" state */}
      <div
        className="fixed z-[74] pointer-events-none"
        style={{
          top: topPosition,
          left: leftPosition,
          transform: transform,
          width: `${finalWidth + 16}px`,
          height: `${finalHeight + 8}px`,
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          background: 'rgba(15, 23, 42, 0.3)',
          borderRadius: '6px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Text container - centered in blur */}
      <div
        className="fixed z-[75] pointer-events-none"
        style={{
          top: topPosition,
          left: leftPosition,
          transform: transform,
          width: `${finalWidth + 16}px`,
          height: `${finalHeight + 8}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Trajan Pro', 'Times New Roman', serif",
          fontSize: `${fontSize}px`,
          fontWeight: 500,
          lineHeight: '0.7',
        }}
      >
        <div className="relative" style={{ width: `${finalWidth}px`, height: `${finalHeight}px` }}>
          {/* Render only the visible characters in their final positions */}
          {short.split('').map((char, i) => {
            const fullWordIndex = i;
            const isAppeared = fullWordIndex <= currentCharIndex;
            const isCurrentlyAppearing = fullWordIndex === currentCharIndex;

            let glowIntensity = 0;
            if (isAppeared && !animationComplete) {
              if (isCurrentlyAppearing) {
                glowIntensity = 0.75;
              } else {
                const charsSince = currentCharIndex - fullWordIndex;
                glowIntensity = Math.max(0.2, 0.75 - (charsSince * 0.1));
              }
            }

            return (
              <span
                key={i}
                className="inline-block absolute text-slate-300"
                style={{
                  left: `${i * charWidth}px`,
                  opacity: isAppeared ? 1 : 0,
                  transition: isAppeared ? 'opacity 400ms ease-out' : 'none',
                  filter: isAppeared ? 'blur(0px)' : 'blur(4px)',
                  textShadow: glowIntensity > 0
                    ? `
                        0 0 ${8 * glowIntensity}px rgba(148, 163, 184, ${glowIntensity}),
                        0 0 ${15 * glowIntensity}px rgba(148, 163, 184, ${0.7 * glowIntensity}),
                        0 0 ${22 * glowIntensity}px rgba(148, 163, 184, ${0.5 * glowIntensity})
                      `
                    : 'none',
                }}
              >
                {char}
              </span>
            );
          })}

          {/* Render suffix characters that will fade out */}
          {chars.slice(suffixStart).map((char, i) => {
            const fullWordIndex = suffixStart + i;
            const isAppeared = fullWordIndex <= currentCharIndex;
            const isFadingOut = suffixFading;

            let glowIntensity = 0;
            if (isAppeared && !isFadingOut) {
              const isCurrentlyAppearing = fullWordIndex === currentCharIndex;
              if (isCurrentlyAppearing) {
                glowIntensity = 0.75;
              } else {
                const charsSince = currentCharIndex - fullWordIndex;
                glowIntensity = Math.max(0.2, 0.75 - (charsSince * 0.1));
              }
            }

            return (
              <span
                key={`suffix-${i}`}
                className="inline-block absolute text-slate-300"
                style={{
                  left: `${fullWordIndex * charWidth}px`,
                  opacity: isAppeared ? (isFadingOut ? 0 : 1) : 0,
                  transition: isFadingOut
                    ? `opacity ${suffixFadeDuration}ms ease-out`
                    : isAppeared
                      ? 'opacity 400ms ease-out'
                      : 'none',
                  filter: isAppeared ? 'blur(0px)' : 'blur(4px)',
                  textShadow: glowIntensity > 0
                    ? `
                        0 0 ${8 * glowIntensity}px rgba(148, 163, 184, ${glowIntensity}),
                        0 0 ${15 * glowIntensity}px rgba(148, 163, 184, ${0.7 * glowIntensity}),
                        0 0 ${22 * glowIntensity}px rgba(148, 163, 184, ${0.5 * glowIntensity})
                      `
                    : 'none',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};