'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useHexagonButtonState } from '@/hooks/useHexagonButtonState';
import MenuButton from './MenuButton';
import HexagonCluster from './hexagonCluster';

interface HexagonButtonProps {
  isHeroSection: boolean;
  isOpen: boolean;
  onInteract: () => void;
  currentSection: string;
  scrollDirection: 'up' | 'down';
  isMobile: boolean;
  somnloggTheme?: 'morning' | 'evening';
  sectionVisibilities: Record<string, any>;
  heroVisibility: number;
}

export const HexagonButton: React.FC<HexagonButtonProps> = ({
  isHeroSection,
  isOpen,
  onInteract,
  currentSection,
  scrollDirection,
  isMobile,
  somnloggTheme = 'evening',
  sectionVisibilities,
  heroVisibility,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Separate state for different aspects
  const [displayMode, setDisplayMode] = useState<'hero' | 'sticky'>('sticky');
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(0);

  const previousModeRef = useRef<'hero' | 'sticky'>('sticky');
  const modeTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { buttonState, positionMode, shouldBeVisible } = useHexagonButtonState({
    currentSection,
    isMobile,
    showGrid: isOpen,
    isHeroSection,
    sectionVisibilities,
    heroVisibility,
  });

  // Determine display mode based on hero visibility with hysteresis
  const targetMode = heroVisibility > 0.75 ? 'hero' : 'sticky';

  // On mount
  useEffect(() => {
    setIsMounted(true);
    setDisplayMode(targetMode);
    previousModeRef.current = targetMode;
    setContainerOpacity(shouldBeVisible ? 1 : 0);
    setContentOpacity(shouldBeVisible ? 1 : 0);
  }, []);

  // Handle mode changes (hero ↔ sticky)
  useEffect(() => {
    if (!isMounted || previousModeRef.current === targetMode) return;

    // Mode changed - initiate transition
    modeTransitionTimeoutRef.current = setTimeout(() => {
      // Step 1: Fade out content (0.3s)
      setContentOpacity(0);

      contentTimeoutRef.current = setTimeout(() => {
        // Step 2: Change display mode (hidden, so no visual jump)
        setDisplayMode(targetMode);
        previousModeRef.current = targetMode;

        // Step 3: Fade in content (0.3s)
        setContentOpacity(shouldBeVisible ? 1 : 0);
      }, 300);
    }, 0);

    return () => {
      if (modeTransitionTimeoutRef.current) clearTimeout(modeTransitionTimeoutRef.current);
      if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    };
  }, [targetMode, isMounted, shouldBeVisible]);

  // Handle visibility changes
  useEffect(() => {
    if (!isMounted) return;

    // If switching between hero/sticky, don't update container opacity yet
    if (targetMode !== displayMode) return;

    // Same mode - just update visibility
    setContainerOpacity(shouldBeVisible ? 1 : 0);
    setContentOpacity(shouldBeVisible ? 1 : 0);
  }, [shouldBeVisible, isMounted, targetMode, displayMode]);

  // Handle menu open/close
  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      setContentOpacity(0);
    } else {
      const timer = setTimeout(() => {
        setContentOpacity(shouldBeVisible ? 1 : 0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted, shouldBeVisible]);

  // Grid dimensions
  const gridWidth = 280;
  const gridHeight = 140;

  // Container sizing - based on current displayMode, not targetMode
  const containerWidth = displayMode === 'hero'
    ? gridWidth
    : isMobile && buttonState === 'somnlogg'
      ? 30
      : gridHeight;

  const containerHeight = displayMode === 'hero' ? gridHeight : gridWidth;

  // Time-based theming
  const hour = new Date().getHours();
  const isDayMode = somnloggTheme === 'morning' || (hour >= 6 && hour < 19);

  // Position classes based on displayMode
  const positionClasses =
    displayMode === 'hero'
      ? 'bottom-[28%] left-1/2 -translate-x-1/2'
      : buttonState === 'somnlogg' && isMobile
        ? 'top-[8%] sm:top-[10%] md:top-[12%] left-0'
        : 'top-[8%] sm:top-[10%] md:top-[12%] left-8 md:left-12';

  if (!isMounted) return null;

  return (
    <div
      className={`
        fixed z-50 transition-all duration-700 ease-out
        ${positionClasses}
      `}
      style={{
        opacity: containerOpacity,
        transition: 'opacity 0.3s ease-in-out, top 0.7s ease-out, left 0.7s ease-out, bottom 0.7s ease-out',
        visibility: shouldBeVisible ? 'visible' : 'hidden',
        pointerEvents: shouldBeVisible ? 'auto' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Hexagon Grid Background */}
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none transition-all duration-700"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            transform: 'translate(-50%, -50%)',
            opacity: contentOpacity * (displayMode === 'hero' ? 0.95 : 0.85),
            zIndex: 0,
            overflow: 'visible',
            transition: 'opacity 0.3s ease-in-out, width 0.7s ease-out, height 0.7s ease-out',
          }}
        >
          <div
            style={{
              width: `${gridWidth}px`,
              height: `${gridHeight}px`,
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: displayMode === 'hero'
                ? 'translate(-50%, -50%) rotate(0deg)'
                : 'translate(-50%, -50%) rotate(90deg)',
              transition: 'transform 0.7s ease-out',
            }}
          >
            <HexagonCluster isHovered={isHovered} />
          </div>
        </div>

        {/* Menu Button */}
        <div
          className="absolute z-20 transition-all duration-700"
          style={{
            left: buttonState === 'somnlogg' && isMobile && displayMode === 'sticky' ? '0px' : '50%',
            top: '50%',
            transform: buttonState === 'somnlogg' && isMobile && displayMode === 'sticky'
              ? 'translate(0%, -50%)'
              : 'translate(-50%, -50%)',
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
            opacity: contentOpacity,
            transition: 'opacity 0.3s ease-in-out, left 0.7s ease-out, top 0.7s ease-out, width 0.7s ease-out, height 0.7s ease-out',
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700"
            style={{
              transform: displayMode === 'hero' ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.7s ease-out',
            }}
          >
            <MenuButton
              isHeroSection={displayMode === 'hero'}
              onInteract={onInteract}
              isOpen={isOpen}
              isSomnlogg={buttonState === 'somnlogg'}
              isDayMode={isDayMode}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};