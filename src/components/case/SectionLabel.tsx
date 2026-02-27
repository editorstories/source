// components/SectionLabel/SectionLabel.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SectionLabelProps {
  sectionId: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ sectionId }) => {
  const { t } = useLanguage();

  // Desktop
  const [desktopDimmed, setDesktopDimmed] = useState(false);
  const dimTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile
  const [mobileDimmed, setMobileDimmed] = useState(false);
  const mobileDimTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sessionKey = `section-label-shown-${sectionId}`;
  const hasShownRef = useRef(false);

  const clearDimTimer = useCallback(() => {
    if (dimTimerRef.current) { clearTimeout(dimTimerRef.current); dimTimerRef.current = null; }
  }, []);

  const clearMobileDimTimer = useCallback(() => {
    if (mobileDimTimerRef.current) { clearTimeout(mobileDimTimerRef.current); mobileDimTimerRef.current = null; }
  }, []);

  useEffect(() => {
    // Kolla sessionStorage utan setState — undviker ESLint-varning
    hasShownRef.current = !!sessionStorage.getItem(sessionKey);

    const target = document.getElementById(sectionId);
    if (!target) return;

    // Desktop observer
    const desktopObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (window.innerWidth < 768) return;
          if (entry.isIntersecting) {
            clearDimTimer();
            dimTimerRef.current = setTimeout(() => setDesktopDimmed(true), 1000);
          } else {
            clearDimTimer();
            setDesktopDimmed(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Mobile observer — triggas när sektionen börjar synas
    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (window.innerWidth >= 768) return;

          if (entry.isIntersecting) {
            // Visa alltid när användaren landar — återställ dimning
            setMobileDimmed(false);
            clearMobileDimTimer();

            // Dimma efter 3 sek, men bara om vi redan visat en gång
            if (hasShownRef.current) {
              mobileDimTimerRef.current = setTimeout(() => setMobileDimmed(true), 3000);
            } else {
              // Första gången — visa, sätt session, dimma efter 3 sek
              hasShownRef.current = true;
              sessionStorage.setItem(sessionKey, 'true');
              mobileDimTimerRef.current = setTimeout(() => setMobileDimmed(true), 3000);
            }
          } else {
            // Användaren har lämnat sektionen — återställ
            clearMobileDimTimer();
            setMobileDimmed(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    desktopObserver.observe(target);
    mobileObserver.observe(target);

    return () => {
      desktopObserver.disconnect();
      mobileObserver.disconnect();
      clearDimTimer();
      clearMobileDimTimer();
    };
  }, [sectionId, sessionKey, clearDimTimer, clearMobileDimTimer]);

  const label = t('sectionLabel.collection');

  // Dubbel skugga — läsbar på både ljus och mörk bakgrund
  const textStyle: React.CSSProperties = {
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    textShadow: `
      0 0 8px rgba(0, 0, 0, 0.9),
      0 0 2px rgba(0, 0, 0, 1),
      0 0 20px rgba(255, 255, 255, 0.3),
      0 0 40px rgba(255, 255, 255, 0.1)
    `,
    whiteSpace: 'nowrap',
  };

  return (
    <>
      {/* ── Desktop ── */}
      <div
        className={`
          hidden md:flex
          absolute left-0 top-0 h-full w-16 z-20
          items-center justify-center
          pointer-events-none
          transition-all duration-700 ease-in-out
          ${desktopDimmed ? 'opacity-30 scale-95' : 'opacity-80 scale-100'}
        `}
      >
        <span
          className="text-7xl lg:text-8xl font-extralight text-white tracking-tight select-none"
          style={textStyle}
        >
          {label}
        </span>
      </div>
      {/* ── Mobil: brightness-overlay över hela sektionen ── */}
      <div
        className={`
          md:hidden
          absolute inset-0 z-10
          pointer-events-none
          transition-opacity duration-700 ease-in-out
          ${mobileDimmed ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'brightness(0.6) contrast(1.1)',
        }}
      />

      {/* ── Mobil: rubriken ovanpå overlayen ── */}
      <div
        className={`
          md:hidden
          absolute left-0 top-0 h-full w-16 z-20
          flex items-center justify-center
          pointer-events-none
          transition-all duration-700 ease-in-out
          ${mobileDimmed ? 'opacity-20' : 'opacity-80'}
        `}
      >
        <span
          className="text-7xl font-extralight text-white tracking-tight select-none"
          style={textStyle}
        >
          {label}
        </span>
      </div>
    </>
  );
};

export default SectionLabel;