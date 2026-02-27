// src/hooks/useHexagonButtonState.ts
//- OPTION A: Integrated with heroVisibility

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSectionMeasurement, type SectionMeasurement } from './useSectionMeasurement';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';

type HexagonState = 'hero' | 'other' | 'somnlogg';
type PositionMode = 'hero-center' | 'sticky-left';

interface UseHexagonButtonStateProps {
  currentSection: string;
  isHeroSection: boolean;
  sectionVisibilities: Record<string, any>;
  isMobile: boolean;
  showGrid: boolean;
  heroVisibility?: number; // NEW: optional, from parent AdaptiveNavigation
}

interface UseHexagonButtonStateReturn {
  buttonState: HexagonState;
  positionMode: PositionMode;
  shouldBeVisible: boolean;
  opacity: number;
  debugInfo: {
    somnloggVis: number;
    skillsVis: number;
    educationVis: number;
    heroVis: number;
    pendingState: string | null;
    timeUntilConfirm: number;
  };
}

const CONFIG = {
  CONFIRM_DELAY: 2500, // 2.5s confirmation for somnlogg

  // Thresholds
  HERO_THRESHOLD: 0.75, // Hero state when >75% visible

  // SIMPLIFIED RULES based on actual visibility measurements:
  SOMNLOGG_RULES: {
    // When somnlogg is >75%, show somnlogg state (regardless of education)
    primary: { somnlogg_min: 0.75 },
    // When somnlogg is >80%, definitely show somnlogg
    secondary: { somnlogg_min: 0.8 },
  },
};

export const useHexagonButtonState = ({
  currentSection,
  isHeroSection,
  isMobile,
  showGrid,
  heroVisibility: heroVisibilityProp, // NEW: optional prop from parent
}: UseHexagonButtonStateProps): UseHexagonButtonStateReturn => {
  // Get precise measurements
  const { measurements } = useSectionMeasurement([
    'hero',
    'skills',
    'somnlogg',
    'education',
    'qna',
  ]);


  // A ref to track if currently in somnlogg state
  const inSomnloggRef = useRef(false);

  const sections = ['hero', 'skills', 'somnlogg', 'education', 'qna'];
  const { scrollDirection } = useSectionNavigation(sections);



  const [buttonState, setButtonState] = useState<HexagonState>('hero');
  const [positionMode, setPositionMode] = useState<PositionMode>('hero-center');
  const [opacity, setOpacity] = useState(1);

  // Refs
  const stateRef = useRef({
    confirmedState: 'hero' as HexagonState,
    pendingState: null as HexagonState | null,
    pendingStartTime: 0,
  });

  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Utilities
  const clearTimer = (key: string) => {
    const timer = timersRef.current.get(key);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(key);
  };

  const setTimer = (key: string, callback: () => void, delay: number) => {
    clearTimer(key);
    timersRef.current.set(
      key,
      setTimeout(() => {
        callback();
        timersRef.current.delete(key);
      }, delay)
    );
  };

  // Get safe measurements, from useSectionMeasurement
//  const heroVis = measurements.hero?.visibility || 0;
  const heroVisFromMeasure = measurements.hero?.visibility || 0;
  const skillsVis = measurements.skills?.visibility || 0;
  const somnloggVis = measurements.somnlogg?.visibility || 0;
  const educationVis = measurements.education?.visibility || 0;

  // NEW: Use heroVisibility from prop if provided, otherwise use measured value
  // This allows external coordination while keeping internal measurement as backup
  const heroVis = heroVisibilityProp !== undefined ? heroVisibilityProp : heroVisFromMeasure;

  const determineTargetState = useCallback((): HexagonState => {
    // ===== RULE 1: Hero detection with relaxed thresholds =====
    // Primary: Hero >75% is hero (even if skills are visible)
    // Secondary: Hero >80% is DEFINITELY hero (very lenient on other sections)

    if (heroVis > 0.80) {
      // Hero strongly visible - ignore other sections
      return 'hero';
    }

    if (heroVis > CONFIG.HERO_THRESHOLD && skillsVis < 0.35) {
      // Hero >75% and skills not TOO dominant (e.g., 77% hero + 23% skills = OK)
      return 'hero';
    }

    // ===== RULE 2: Mobile-only somnlogg detection =====
    if (isMobile) {
      if (scrollDirection === 'down') {
        // Scrolling DOWN: enter at 75%, exit at 15%
        if (somnloggVis >= 0.75) {
          inSomnloggRef.current = true;
          return 'somnlogg';
        }
        if (inSomnloggRef.current && somnloggVis >= 0.15) {
          return 'somnlogg';
        }
        if (somnloggVis < 0.15) {
          inSomnloggRef.current = false;
        }
      } else {
        // Scrolling UP
        // EXIT somnlogg if skills becomes significantly visible (>8%)
        if (skillsVis > 0.08) {
          inSomnloggRef.current = false;
          return 'other';
        }

        // Otherwise, use hysteresis thresholds
        if (inSomnloggRef.current && somnloggVis >= 0.09) {
          return 'somnlogg';
        }
        if (somnloggVis >= 0.15) {
          inSomnloggRef.current = true;
          return 'somnlogg';
        }
        if (somnloggVis < 0.09) {
          inSomnloggRef.current = false;
        }
      }
    }

    // ===== RULE 3: Default to other =====
    return 'other';
  }, [heroVis, somnloggVis, skillsVis, educationVis, isMobile, scrollDirection]);






  const targetState = useMemo(() => determineTargetState(), [determineTargetState]);

  // State machine: confirmation only for transitions TO somnlogg
  useEffect(() => {
    const confirmed = stateRef.current.confirmedState;
    const pending = stateRef.current.pendingState;
    const now = Date.now();

    // No change needed
    if (targetState === confirmed && pending === null) {
      clearTimer('confirmation');
      return;
    }

    // New target detected
    if (targetState !== confirmed && targetState !== pending) {
      // INSTANT: hero→other or somnlogg→other (fade handled separately)
      if (
        (confirmed === 'hero' && targetState === 'other') ||
        (confirmed === 'somnlogg' && targetState === 'other') ||
        (confirmed === 'other' && targetState === 'hero')
      ) {
        stateRef.current.confirmedState = targetState;
        stateRef.current.pendingState = null;
        setButtonState(targetState);
//        console.log(`⚡ Instant: ${confirmed} → ${targetState}`);
        console.log(`⚡ Instant: ${confirmed} → ${targetState} (heroVis: ${(heroVis * 100).toFixed(0)}%)`);
        return;
      }

      // DELAYED: anything→somnlogg (2.5s confirmation)
      if (targetState === 'somnlogg') {
        stateRef.current.pendingState = targetState;
        stateRef.current.pendingStartTime = now;

        console.log(
          `🔄 Pending somnlogg: ${confirmed} → somnlogg (${CONFIG.CONFIRM_DELAY}ms)`
        );

        setTimer('confirmation', () => {
          const currentTarget = determineTargetState();
          if (currentTarget === 'somnlogg') {
            stateRef.current.confirmedState = 'somnlogg';
            stateRef.current.pendingState = null;
            setButtonState('somnlogg');
            console.log(`✅ Somnlogg confirmed`);
          } else {
            console.log(`⚠️ Somnlogg cancelled: now ${currentTarget}`);
            stateRef.current.pendingState = null;
          }
        }, CONFIG.CONFIRM_DELAY);

        return;
      }
    }

    // Pending state conditions broke
    if (pending === 'somnlogg' && targetState !== 'somnlogg') {
      console.log(`🚫 Somnlogg cancelled`);
      stateRef.current.pendingState = null;
      clearTimer('confirmation');
    }
  }, [targetState, determineTargetState]);

  // Update position mode based on state
  useEffect(() => {
    const newMode: PositionMode =
      buttonState === 'hero' ? 'hero-center' : 'sticky-left';
    if (newMode !== positionMode) {
      setPositionMode(newMode);
    }
  }, [buttonState, positionMode]);

  // Handle grid visibility
  useEffect(() => {
    setOpacity(showGrid ? 0 : 1);
  }, [showGrid]);

  // Cleanup
  useEffect(() => {
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  // Debug info
  const debugInfo = {
    heroVis: heroVis,
    somnloggVis: somnloggVis,
    skillsVis: skillsVis,
    educationVis: educationVis,
    pendingState: stateRef.current.pendingState,
    timeUntilConfirm:
      stateRef.current.pendingState !== null
        ? Math.max(
            0,
            CONFIG.CONFIRM_DELAY -
              (Date.now() - stateRef.current.pendingStartTime)
          )
        : 0,
  };

  return {
    buttonState,
    positionMode,
    shouldBeVisible: !showGrid,
    opacity,
    debugInfo,
  };
};