import React, { useState, useEffect, useMemo } from 'react';

// Simulating language context - replace with actual useLanguage hook when ready
// import { useLanguage } from '@/context/LanguageContext';

import { useLanguage } from '@/context/LanguageContext';
import { skillsData } from '@/data/skills';

type WordPair = {
  left: string;
  right: string;
};

type LanguageKey = 'sv' | 'eu' | 'cas';

// Memoized background layer component for better performance
const BackgroundLayer = React.memo(({
  mousePos,
  currentWords,
  wordIndex,
  animationKey,
  isReady
}: {
  mousePos: { x: number; y: number };
  currentWords: WordPair[];
  wordIndex: number;
  animationKey: number;
  isReady: boolean;
}) => {
  if (!isReady) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Far layer - dynamic words with unique keys and synchronized animation */}
      <div
        key={`left-${animationKey}`}
        className="absolute text-slate-700 text-8xl md:text-9xl font-extralight select-none"
        style={{
          top: '15%',
          left: '10%',
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 3s ease-out',
          animation: 'wordFade 30s ease-in-out forwards',
          animationFillMode: 'both'
        }}
      >
        {currentWords[wordIndex].left}
      </div>

      <div
        key={`right-${animationKey}`}
        className="absolute text-slate-700 text-8xl md:text-9xl font-extralight select-none"
        style={{
          bottom: '20%',
          right: '15%',
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          transition: 'transform 3s ease-out',
          animation: 'wordFade 30s ease-in-out forwards',
          animationFillMode: 'both'
        }}
      >
        {currentWords[wordIndex].right}
      </div>

      {/* Mid layer - skills as distant stars */}
      <div
        className="absolute text-slate-600 text-sm font-light select-none"
        style={{
          top: '30%',
          right: '20%',
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          transition: 'transform 2s ease-out',
          animation: 'twinkle 8s ease-in-out infinite'
        }}
      >
        React
      </div>

      <div
        className="absolute text-slate-600 text-sm font-light select-none"
        style={{
          top: '60%',
          left: '25%',
          transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px)`,
          transition: 'transform 2s ease-out',
          animation: 'twinkle 10s ease-in-out infinite 2s'
        }}
      >
        TypeScript
      </div>

      <div
        className="absolute text-slate-600 text-sm font-light select-none"
        style={{
          top: '45%',
          right: '30%',
          transform: `translate(${mousePos.x * 0.65}px, ${mousePos.y * 0.65}px)`,
          transition: 'transform 2s ease-out',
          animation: 'twinkle 12s ease-in-out infinite 4s'
        }}
      >
        Figma
      </div>

      <div
        className="absolute text-slate-600 text-sm font-light select-none"
        style={{
          bottom: '35%',
          left: '15%',
          transform: `translate(${mousePos.x * 0.55}px, ${mousePos.y * 0.55}px)`,
          transition: 'transform 2s ease-out',
          animation: 'twinkle 9s ease-in-out infinite 1s'
        }}
      >
        UX Research
      </div>

      {/* Tiny dots - like distant stars */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-slate-500 rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            left: `${15 + i * 12}%`,
            animation: `twinkle ${8 + i * 2}s ease-in-out infinite ${i}s`
          }}
        />
      ))}
    </div>
  );
});

BackgroundLayer.displayName = 'BackgroundLayer';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Replace this with: const { language } = useLanguage();
  const language: LanguageKey = 'sv'; // Default svenska - replace with actual hook när färdig
  const { t } = useLanguage();
//  {t('skills.counter.showing', { visible, total }).split(' ')[1]}
//  {t('skills.title')}


  // Multi-language background words
  const backgroundWords: Record<LanguageKey, WordPair[]> = {
    sv: [
      { left: 'Design', right: 'Kod' },
      { left: 'Forskning', right: 'Bygga' },
      { left: 'Tänka', right: 'Skapa' },
      { left: 'Utforska', right: 'Leverera' }
    ],
    en: [
      { left: 'Design', right: 'Code' },
      { left: 'Research', right: 'Build' },
      { left: 'Think', right: 'Create' },
      { left: 'Explore', right: 'Deliver' }
    ],
    es: [
      { left: 'Diseño', right: 'Código' },
      { left: 'Investigar', right: 'Construir' },
      { left: 'Pensar', right: 'Crear' },
      { left: 'Explorar', right: 'Entregar' }
    ]
  };

  const currentWords = useMemo(
    () => backgroundWords[language] || backgroundWords.sv,
    [language]
  );

  useEffect(() => {
    // First show main content
    const mainTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Then show background elements after main content has appeared
    const backgroundTimer = setTimeout(() => {
      setBackgroundReady(true);
    }, 1500); // Delay background by 1.5s

    // Throttled mouse move handler for better performance
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
        rafId = null;
      });
    };

    // Rotate background words every 30 seconds (slower)
    const wordRotation = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % currentWords.length);
      setAnimationKey((prev) => prev + 1); // Increment key to force new animation
    }, 30000);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      clearTimeout(mainTimer);
      clearTimeout(backgroundTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(wordRotation);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [currentWords.length]);

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const getTransform = (multiplier: number) => {
    if (prefersReducedMotion) return 'none';
    return `translate(${mousePos.x * multiplier}px, ${mousePos.y * multiplier}px)`;
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center">

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInBackground {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.45; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.5; }
        }
        @keyframes wordFade {
          0% { opacity: 0; }
          15% { opacity: 0.35; }
          85% { opacity: 0.35; }
          100% { opacity: 0; }
        }
        .fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .fade-in-background {
          animation: fadeInBackground 2s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Distant background text - creating depth - appears after main content */}
      <div className={backgroundReady ? 'fade-in-background' : 'opacity-0'}>
        <BackgroundLayer
          mousePos={mousePos}
          currentWords={currentWords}
          wordIndex={wordIndex}
          animationKey={animationKey}
          isReady={backgroundReady}
        />
      </div>

      {/* Main focal point - clear and prominent - appears först */}
      <div className={`relative z-10 text-center px-6 ${isVisible ? 'fade-in' : 'opacity-0'}`}>

        {/* Main headline - the brightest star */}
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-extralight text-white mb-8 tracking-tight"
          style={{
            transform: getTransform(0.5),
            transition: prefersReducedMotion ? 'none' : 'transform 1.5s ease-out',
            textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
          }}
        >
          {t('heroSection.title1a')}
          <span className="block text-slate-400 mt-4">
            {t('heroSection.title1b')}
          </span>
        </h1>

        {/* Closer supporting text */}
        <p
          className="text-xl md:text-2xl text-slate-500 font-extralight max-w-2xl mx-auto mb-16"
          style={{
            transform: getTransform(0.8),
            transition: prefersReducedMotion ? 'none' : 'transform 1s ease-out'
          }}
        >
          {t('heroSection.subtitle')}
          {/*...spiraling out of complexity*/}
        </p>
      </div>

      {/* Bottom subtle text - most distant */}
      {/*className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-700 text-xs font-light fade-in-background"*/}
      {/*transform: `translateX(-50%) ${prefersReducedMotion ? '' : `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`}`,*/}
      {backgroundReady && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-700 text-xs font-light fade-in-background"
          style={{
            transform: `${prefersReducedMotion ? '' : `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`}`,
            transition: prefersReducedMotion ? 'none' : 'transform 3s ease-out',
            opacity: 0.6
          }}
        >
          12 years exploring · ready to build
        </div>
      )}

    </div>
  );
}