'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import FullScreenGrid from './FullScreenGrid';
import { SECTIONS } from './config';
import { HexagonButton } from '@/components/AdaptiveNavigation/HexagonButton/ver00';
import { HexagonCircle } from '@/components/AdaptiveNavigation/HexagonButton/ver00/HexagonCircle';
import { HexagonButtonHero } from '@/components/AdaptiveNavigation/HexagonButton/ver00/HexagonButtonHero';
import { NavigationReveal } from './NavigationReveal';
import { NavigationLangEarthMoon } from './NavigationLangEarthMoon';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import { useHexagonButtonState } from '@/hooks/useHexagonButtonState';
import { useHexagonMiniMode } from '@/hooks/useHexagonMiniMode';
import { useLanguage } from '@/context/LanguageContext';

const GRID_DISPLAY_DURATION = 4000;
const FADE_DURATION = 800;

interface AdaptiveNavigationProps {
  somnloggTheme?: 'morning' | 'evening';
}

export default function AdaptiveNavigation({ somnloggTheme = 'evening' }: AdaptiveNavigationProps) {
  // ====== UNIFIED SECTION DETECTION (single source of truth) ======
  const sections = ['hero', 'skills', 'somnlogg', 'education', 'qna'];
  const { currentSection, scrollDirection, allVisibilities, heroVisibility } = useSectionNavigation(sections);

  // ====== LOCAL UI STATE ======
  // const [locale, setLocale] = useState<'sv' | 'eu' | 'cas'>('sv');
  const { locale, setLocale, t } = useLanguage();

  const [mounted, setMounted] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showMiniGrid, setShowMiniGrid] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const [showNavReveal, setShowNavReveal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navAnimationComplete, setNavAnimationComplete] = useState(false);
  const [miniGridWidth, setMiniGridWidth] = useState(400);
  const [miniGridHeight, setMiniGridHeight] = useState(0);

  const miniGridRef = useRef<HTMLDivElement>(null);



  const isDayMode = somnloggTheme === 'morning' || new Date().getHours() >= 6 && new Date().getHours() < 19;

  // ====== CRITICAL FIX: Visibility-based state with hysteresis ======
  // Use 0.75 threshold instead of 0.5 to prevent thrashing between hero/skills
  // When hero is 47-52%, it was flipping isHeroSection constantly
  const isHeroSection = heroVisibility > 0.75; // Hero primary when >75% visible
  const isHeroFullyVisible = heroVisibility > 0.85; // Full grid only when >85% visible

  // These thresholds create hysteresis zones:
  // 0.00-0.75: Not hero section (other/somnlogg)
  // 0.75-0.85: Transition zone (HexButton visible, mini grid ready)
  // 0.85+: Full grid visible, HexButton hidden


  // Extract visibility values safely with null-coalescing
  const somnloggVisibility = allVisibilities['somnlogg']?.visibility ?? 0;
  const skillsVisibility = allVisibilities['skills']?.visibility ?? 0;
  const educationVisibility = allVisibilities['education']?.visibility ?? 0;

  // ====== REPLACE WITH THIS (Option A approach) ======
  const hexButtonState = useHexagonButtonState({
    currentSection,
    isMobile,
    showGrid: showMiniGrid,
    heroVisibility, // Pass raw visibility for coordinated thresholds
  });

  // v00
  // Mini mode state management
  const miniModeState = useHexagonMiniMode();

  // ============================================
  // UPDATED: AdaptiveNavigation.tsx
  // ============================================
  // In your opacity calculations:

  // hs1 opacity: CRITICAL FIX - fade out quickly starting at 0.97
  const hs1Opacity = useMemo(() => {
    // hs1 starts fading out at 0.97 and completes by ~0.85
    // This gives a much tighter, faster fade (0.97 - 0.85 = 0.12 range)

    if (heroVisibility > 0.97) {
      return 1; // Fully visible deep in hero
    } else if (heroVisibility > 0.85) {
      // Tight fade range: 0.97 to 0.85 (12% range, much faster)
      return (heroVisibility - 0.85) / 0.12;
    } else {
      return 0; // Completely hidden
    }
  }, [heroVisibility]);

  // oss1 opacity: inverse of hs1, with proper threshold alignment
  const oss1Opacity = useMemo(() => {
    // If buttonState is somnlogg, oss1 should be completely hidden
    if (hexButtonState.buttonState === 'somnlogg') {
      return 0;
    }

    // oss1 starts appearing when heroVisibility drops below 0.85
    // Fully visible by 0.70
    if (heroVisibility < 0.70) {
      return 1; // Fully visible
    } else if (heroVisibility < 0.85) {
      // Fade in between 0.85 and 0.70
      return (0.85 - heroVisibility) / 0.15;
    } else {
      return 0; // Hidden while in hero
    }
  }, [heroVisibility, hexButtonState.buttonState]);

  // sls1 opacity: only visible when buttonState is 'somnlogg' AND on mobile
  const sls1Opacity = useMemo(() => {
    if (hexButtonState.buttonState !== 'somnlogg') {
      return 0;
    }
    if (!isMobile || showMiniGrid || heroVisibility >= 0.70) {
      return 0;
    }
    return 1;
  }, [hexButtonState.buttonState, isMobile, showMiniGrid, heroVisibility]);

  const hcir1bVisibility = useMemo(() => {
    // Always show, only fade based on hero section boundary
    if (heroVisibility > 0.85) {
      // Fade out as hs1 fades in when returning to hero (0.97 → 0.85)
      // At 0.97+: invisible, at 0.85: fully visible
      return Math.max(0, 1 - ((heroVisibility - 0.85) / 0.12));
    }

    // Fully visible in all other sections (skills, education, qna, somnlogg)
    // heroVisibility <= 0.85 means we're past hero
    return 1;
  }, [heroVisibility]);

  const showHexagonCircle = useMemo(() => {
  //  return hcir1bVisibility > 0 && hexButtonState.buttonState !== 'somnlogg';
    return hcir1bVisibility > 0;
  }, [hcir1bVisibility, hexButtonState.buttonState]);


  // Note: The hook uses useSectionMeasurement internally for detailed measurements
  // heroVisibility is an optional prop to coordinate with AdaptiveNavigation thresholds

  // ====== MOUNT EFFECT ======
  useEffect(() => {
    setMounted(true);
  }, []);

  // ====== GRID AUTO-HIDE TIMER (hero section only, but gated by heroVisibility) ======
  useEffect(() => {
    if (!mounted || heroVisibility < 0.85) return; // Only auto-hide if actually in hero section

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setShowGrid(false);
        setIsFading(false);
      }, FADE_DURATION);
    }, GRID_DISPLAY_DURATION);

    return () => clearTimeout(fadeTimer);
  }, [mounted, heroVisibility]); // Changed dependency from currentSection

    // ====== SCROLL-TRIGGERED GRID HIDE ======
    useEffect(() => {
      if (!mounted) return;

      const handleScroll = () => {
        // Close mini grid if open AND user scrolling
        if (showMiniGrid && scrollDirection === 'down') {
          setShowMiniGrid(false);
        }

        // Hide full grid if user scrolls away from hero
        if (showGrid && heroVisibility < 0.85) {
          setIsFading(true);
          setTimeout(() => {
            setShowGrid(false);
            setIsFading(false);
          }, FADE_DURATION);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [mounted, heroVisibility, showGrid, showMiniGrid, scrollDirection]); // Changed dependency


  // ====== MOBILE DETECTION ======
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ====== MINI GRID HEIGHT TRACKING ======
  useEffect(() => {
    if (showMiniGrid && miniGridRef.current) {
      setMiniGridHeight(miniGridRef.current.offsetHeight);
    }
  }, [showMiniGrid]);

  // ====== CALCULATE MINI GRID WIDTH ======
  useEffect(() => {
    setMiniGridWidth(isMobile ? window.innerWidth : 400);
  }, [isMobile]);

  // ====== RESET ANIMATION STATE ======
  useEffect(() => {
    if (!showMiniGrid) {
      setNavAnimationComplete(false);
    }
  }, [showMiniGrid]);


  useEffect(() => {
    // Log button state transitions
    console.log('=== HEXAGON BUTTON STATE ===', {
      buttonState: hexButtonState.buttonState,
      positionMode: hexButtonState.positionMode,
      shouldBeVisible: hexButtonState.shouldBeVisible,
      isMobile,
      isHeroSection,
      heroVisibility: (heroVisibility * 100).toFixed(0) + '%',
      showMiniGrid,
      showGrid,
    });
  }, [hexButtonState.buttonState, isMobile, heroVisibility, showMiniGrid, showGrid]);

  // Also check when button state changes
  useEffect(() => {
    console.log('💾 ButtonState changed:', hexButtonState.buttonState);
    console.log('   Position:', hexButtonState.positionMode);
    console.log('   Visible:', hexButtonState.shouldBeVisible);
  }, [hexButtonState.buttonState]);

  // Check variant opacity calculations
  useEffect(() => {
    const variantOpacities = {
      hero: hexButtonState.buttonState === 'hero' ? 1 : 0,
      sticky: (hexButtonState.buttonState === 'other' && !isMobile) ? 1 : 0,
      somnlogg: (hexButtonState.buttonState === 'somnlogg' && isMobile) ? 1 : 0,
    };

    console.log('🎨 Variant Opacities:', variantOpacities);
  }, [hexButtonState.buttonState, isMobile]);


  // ====== HANDLERS ======

  const handleGridInteraction = (sectionId: string, fromMiniGrid: boolean = false) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const isAtSectionTop = rect.top >= -50 && rect.top <= 50;

    if (sectionId === currentSection && isAtSectionTop) {
      setIsFading(true);
      setTimeout(() => {
        setShowGrid(false);
        setShowMiniGrid(false);
        setIsFading(false);
      }, FADE_DURATION);
      return;
    }

    if (fromMiniGrid) {
      setShowMiniGrid(false);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    setPageTransition(true);
    setIsFading(true);

    setTimeout(() => {
      setShowGrid(false);
      setShowMiniGrid(false);
      setIsFading(false);

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      setTimeout(() => {
        setPageTransition(false);
      }, FADE_DURATION);
    }, FADE_DURATION);
  };

  const handleCloseGrid = () => {
    setIsFading(true);
    setTimeout(() => {
      setShowGrid(false);
      setShowMiniGrid(false);
      setIsFading(false);
    }, FADE_DURATION);
  };

  const handleMenuButtonClick = () => {
    // Use visibility-based logic, not section name
    // Hero is "active" when >75% visible (same as isHeroSection threshold)
    const isInHeroMode = heroVisibility > 0.75;

    if (isInHeroMode) {
      // In hero section - show full grid
      setShowGrid(true);
      setShowMiniGrid(false);
      console.log('Button clicked - Hero mode (heroVis: ' + (heroVisibility * 100).toFixed(0) + '%)');
    } else {
      // In other sections - toggle mini grid
      const newMiniGridState = !showMiniGrid;

      if (newMiniGridState) {
        setShowNavReveal(true);
      }

      setShowMiniGrid(newMiniGridState);
      console.log(
        'Button clicked. Hero visibility: ' + (heroVisibility * 100).toFixed(0) + '%. ' +
        'New mini grid state: ' + newMiniGridState
      );
    }
  };

  if (!mounted) {
    return null;
  }

  // ====== GRID CARD SETUP ======
  const introCard = {
    id: 'intro',
    icon: '✨',
    translationKey: t('nav.intro.title'),
    previewKey: t('nav.hero.preview'),
    backgroundImage: '',
    overlayImage: '',
    showLanguageSwitcher: true,
    isIntro: true,
  };

  //debug
  const translatedSections = SECTIONS.map(section => {
    console.log('Translating :', section.translationKey, '→', t(section.translationKey));
    return {
      ...section,
      translationKey: t(section.translationKey),
      previewKey: t(section.previewKey),
    };
  });

  const allCards = [introCard, ...translatedSections];

  // ===== GLOBE WRAPPER 1: In-card (mini grid intro) =====
  const InCardGlobe = () => (
    <div className="absolute top-1 right-1">
      <NavigationLangEarthMoon
        isVisible={true}
        locale={locale}
        size="small"
        showLabel={true}
        fadeOut={navAnimationComplete}
        onLocaleChange={setLocale}
      />
    </div>
  );


  // ===== GLOBE WRAPPER 2: Centered (full-screen overlay) =====
  // This renders OUTSIDE the mini grid flow to avoid layout issues
  const CenteredGlobe = () => {
    if (!showNavReveal || !showMiniGrid || isHeroSection || !navAnimationComplete) {
      return null;
    }

    const topPosition = isMobile
      ? `${miniGridHeight + 8}px`
      : 'calc(12% - 80px)';

    const leftOffset = 8;
    const centerOffset = (miniGridWidth - 80) / 2; // 80 = medium size
    const leftPosition = leftOffset + centerOffset;

    return (
      <div
        className="fixed pointer-events-none transition-opacity duration-1000"
        style={{
          top: topPosition,
          left: `${leftPosition}px`,
          width: '80px',
          height: '80px',
          zIndex: 77,
          opacity: navAnimationComplete ? 1 : 0,
          willChange: 'opacity',
        }}
      >
        {/* Enable pointer events only on child */}
        <div style={{ pointerEvents: 'auto' }}>
          <NavigationLangEarthMoon
            isVisible={true}
            locale={locale}
            size="medium"
            showLabel={true}
            onLocaleChange={setLocale}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ENHANCED DEBUG OVERLAY */}
      {/*<div className="fixed bottom-4 right-4 z-40 bg-slate-900/95 text-white text-xs p-3 rounded font-mono max-w-xs border border-slate-700">*/}
      {/*  <div className="mb-2 font-bold text-emerald-400">📊 Navigation State</div>*/}

      {/*  <div className="space-y-1 text-slate-300">*/}
      {/*    <div>*/}
      {/*      Section: <span className="text-cyan-400">{currentSection}</span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      Direction: <span className="text-yellow-400">{scrollDirection}</span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      isHero: <span className={isHeroSection ? 'text-green-400' : 'text-red-400'}>*/}
      {/*        {isHeroSection.toString()}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className="my-2 border-t border-slate-700 pt-2 font-bold text-blue-400">*/}
      {/*    🎯 Measurements*/}
      {/*  </div>*/}

      {/*  <div className="space-y-1 text-slate-300">*/}
      {/*    <div>*/}
      {/*      Hero: <span className="text-rose-400">*/}
      {/*        {(hexButtonState.debugInfo.heroVis * 100).toFixed(0)}%*/}
      {/*        {(heroVisibility * 100).toFixed(0)}%*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      Skills: <span className="text-orange-400">*/}
      {/*        {(hexButtonState.debugInfo.skillsVis * 100).toFixed(0)}%*/}
      {/*        {(skillsVisibility * 100).toFixed(0)}%*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      Somnlogg: <span className="text-emerald-400">*/}
      {/*        {(hexButtonState.debugInfo.somnloggVis * 100).toFixed(0)}%*/}
      {/*        {(somnloggVisibility * 100).toFixed(0)}%*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      Education: <span className="text-purple-400">*/}
      {/*        {(hexButtonState.debugInfo.educationVis * 100).toFixed(0)}%*/}
      {/*        {(educationVisibility * 100).toFixed(0)}%*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className="my-2 border-t border-slate-700 pt-2 font-bold text-pink-400">*/}
      {/*    🎮 Button State*/}
      {/*  </div>*/}

      {/*  <div className="space-y-1 text-slate-300">*/}
      {/*    <div>*/}
      {/*      State: <span className="text-pink-400">*/}
      {/*        {hexButtonState.buttonState}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      Position: <span className="text-indigo-400">*/}
      {/*        {hexButtonState.positionMode}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    {hexButtonState.debugInfo.pendingState && (*/}
      {/*      <>*/}
      {/*        <div>*/}
      {/*          Pending: <span className="text-yellow-500 animate-pulse">*/}
      {/*            {hexButtonState.debugInfo.pendingState}*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          Confirm in: <span className="text-yellow-500">*/}
      {/*            {(hexButtonState.debugInfo.timeUntilConfirm / 1000).toFixed(1)}s*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  </div>*/}

      {/*  <div className="my-2 border-t border-slate-700 pt-2 font-bold text-blue-400">*/}
      {/*    🎯 Grid Display Logic*/}
      {/*  </div>*/}
      {/*  <div className="space-y-1 text-slate-300">*/}
      {/*    <div>*/}
      {/*      Full Grid: <span className={isHeroFullyVisible ? 'text-green-400' : 'text-red-400'}>*/}
      {/*        {isHeroFullyVisible.toString()}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      Mini Grid: <span className={(!isHeroFullyVisible && showMiniGrid) ? 'text-green-400' : 'text-red-400'}>*/}
      {/*        {(!isHeroFullyVisible && showMiniGrid).toString()}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      HexButton: <span className={(!showGrid || !isHeroFullyVisible) ? 'text-green-400' : 'text-red-400'}>*/}
      {/*        {(!showGrid || !isHeroFullyVisible).toString()}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className="my-2 text-slate-500 text-[10px]">*/}
      {/*    Rules: Somnlogg &gt;75% + Skills &lt;25% OR Somnlogg &gt;80%*/}
      {/*  </div>*/}
      {/*  <div className="my-2 text-slate-500 text-[10px]">*/}
      {/*    Hero &gt;80% = Full Grid | Hero 50-80% = Transition | Hero &lt;50% = Mini Grid (mm only)*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* Page transition overlay */}
      {pageTransition && (
        <div
          className="fixed inset-0 bg-slate-950 z-[100] transition-opacity duration-800"
          style={{ opacity: pageTransition ? 1 : 0 }}
        />
      )}

      {/* Full-screen grid (hero only) */}
      {showGrid && isHeroFullyVisible && (
        <FullScreenGrid
          sections={translatedSections}
          onInteract={handleGridInteraction}
          onClose={handleCloseGrid}
          isFading={isFading}
          currentSection={currentSection}
          currentLocale={locale}
          onLocaleChange={(locale) => setLocale(locale as "sv" | "eu" | "cas")}
          t={t}
        />
      )}

      {/*// Hero Section - hs1 with smooth opacity fade*/}
      <HexagonButtonHero
        onInteract={handleMenuButtonClick}
        opacity={hs1Opacity}
        isOpen={showMiniGrid}
        isDayMode={isDayMode}
        isMobile={isMobile}
        isMiniMode={miniModeState.isMiniMode}
        onToggleMiniMode={miniModeState.toggleMiniMode}
      />

      {/* Non-Hero Sections - HexagonButton (oss1 + sls1) with hcir1a */}
      <HexagonButton
        isHeroSection={heroVisibility > 0.75}
        isOpen={showMiniGrid}
        onInteract={handleMenuButtonClick}
        currentSection={currentSection}
        scrollDirection={scrollDirection}
        isMobile={isMobile}
        somnloggTheme={somnloggTheme}
        sectionVisibilities={allVisibilities}
        heroVisibility={heroVisibility}
        buttonState={hexButtonState.buttonState}
        positionMode={hexButtonState.positionMode}
        isMiniMode={miniModeState.isMiniMode}
        onToggleMiniMode={miniModeState.toggleMiniMode}
        oss1Opacity={oss1Opacity}
        sls1Opacity={sls1Opacity}
      />

      {/*// Pass hcir1bVisibility to HexagonCircle component*/}
      {showHexagonCircle && (
        <HexagonCircle
          isMiniMode={miniModeState.isMiniMode}
          onToggleMiniMode={miniModeState.toggleMiniMode}
          isDayMode={isDayMode}
          isOpen={showMiniGrid}
          visibility={hcir1bVisibility}
        />
      )}

      {/* Mini grid and overlays */}
      {/* Mini grid - show when user scrolled past hero AND not in hero section */}
      {/* Mini grid - FIXED: shows when hero not fully visible AND mini grid is open */}
      {!isHeroFullyVisible && showMiniGrid && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/30 md:bg-slate-950/20 backdrop-blur-md md:backdrop-blur-sm z-[60]"
            onClick={() => setShowMiniGrid(false)}
          />

          {/* Mini Grid */}
          <div
            ref={miniGridRef}
            className="fixed top-0 left-0 right-0 md:fixed md:top-[12%] md:left-0 md:right-auto z-[70] md:w-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideIn 400ms ease-out',
            }}
          >
            <div className="bg-slate-900/95 backdrop-blur-sm border-0 md:border md:border-slate-800 md:rounded-sm shadow-2xl shadow-slate-950/50 overflow-hidden border-b-2 border-b-slate-700/50">
              <div className="grid grid-cols-2 grid-rows-3 md:grid-rows-3 gap-0 w-full md:w-[400px]">
                {allCards.map((card, idx) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      if (card.id === 'intro') {
                        handleCloseGrid();
                      } else {
                        setShowMiniGrid(false);
                        handleGridInteraction(card.id, true);
                      }
                    }}
                    className={`
                      relative w-full h-28 md:h-28
                      border border-slate-800/50
                      bg-slate-900/50 backdrop-blur-sm
                      flex flex-col justify-center items-center p-3
                      transition-all duration-300
                      hover:bg-slate-800/70 hover:border-slate-700 cursor-pointer
                      group
                    `}
                    style={{
                      animationDelay: `${idx * 50}ms`,
                      animation: 'fadeIn 300ms ease-out forwards',
                      opacity: 0,
                    }}
                  >
                    <div className="relative z-10 text-xl md:text-xl mb-1 transition-transform duration-300 group-hover:scale-110">
                      {card.icon}
                    </div>
                    <h3
                      className={`relative z-10 text-xs md:text-xs font-semibold text-white text-center mb-0.5 ${
                        card.id === 'intro' ? 'text-sm' : ''
                      }`}
                    >
                      {card.translationKey}
                    </h3>
                    <p
                      className={`relative z-10 text-[10px] md:text-[10px] text-slate-400 text-center transition-opacity duration-300 line-clamp-2 ${
                        card.id !== 'intro'
                          ? 'opacity-70 group-hover:opacity-100'
                          : 'opacity-80'
                      }`}
                    >
                      {card.previewKey}
                    </p>

                    {card.id === 'intro' && (
                      <>
                        <div className="absolute top-2 right-2 text-slate-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          ✕
                        </div>
                        <div className="absolute top-2 left-3 z-10">
                          <div className="flex items-center gap-1 text-[10px] font-medium">
                            {['sv', 'eu', 'cas'].map((lang, idx) => (
                              <React.Fragment key={lang}>
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLocale(lang as 'sv' | 'eu' | 'cas');
                                  }}
                                  className={`
                                    px-1 py-0.5 transition-all duration-200 cursor-pointer
                                    ${
                                      locale === lang
                                        ? 'text-emerald-400'
                                        : 'text-slate-500 hover:text-slate-300'
                                    }
                                  `}
                                >
                                  {lang === 'cas' ? 'CAS' : lang.toUpperCase()}
                                </span>
                                {idx < 2 && (
                                  <span className="text-slate-700">|</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {card.showLanguageSwitcher && (
                          <div className="absolute top-1 right-1">
                            <NavigationLangEarthMoon
                              isVisible={true}
                              isMobile={isMobile}
                              locale={locale}
                              size="small"
                              showLabel={true}
                              fadeOut={navAnimationComplete}
                              onLocaleChange={setLocale}
                            />
                          </div>
                        )}
                      </>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation reveal animation */}
          <NavigationReveal
            isVisible={showNavReveal && showMiniGrid && !isHeroSection}
            isMobile={isMobile}
            locale={locale}
            miniGridHeight={miniGridHeight}
            onAnimationComplete={setNavAnimationComplete}
          />

          <CenteredGlobe />
        </>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 768px) {
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}