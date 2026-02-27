//src/components/sections/QuestionsAnswers/QnASection.tsx
import React, { useState, useRef } from 'react';
import {
//  useLanguage,
  useNavigationState,
  useQnAState,
  usePathProgress,
  useSummaryTrigger
} from './hooks';
import { pathConfig } from './config';
import { qnaContent } from './qnaData';
import { parseRelatedId, smoothScrollToCenter, waitForTransition } from './utils';

// Import UI components (we'll create these next)
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { StickyNav } from './components/StickyNav';
import { QnAItem } from './components/QnAItem';
import { AskMoreCTA } from './components/AskMoreCTA';
import { SummaryCard } from './components/SummaryCard';
import { NavContainer } from './components/NavContainer';
import { useLanguage } from '@/context/LanguageContext';
// ============================================
// 🎯 MAIN QNA SECTION COMPONENT
// ============================================

const QnASection: React.FC = () => {
//  const { language, setLanguage, t } = useLanguage();
  const { t, locale } = useLanguage();
  //const [language, setLanguage] = useState('sv');

  const [activePath, setActivePath] = useState('work');
  const [viewedPaths, setViewedPaths] = useState<Set<string>>(new Set(['work']));

  const sectionRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navState = useNavigationState(navRef);
  const qnaState = useQnAState(activePath);

  //const currentQuestions = qnaContent[language]?.[activePath] || [];
  const currentQuestions = qnaContent[locale]?.[activePath] || [];
  const pathProgress = usePathProgress(qnaState.expandedItems, activePath, currentQuestions.length);
  const { showSummary, handleCloseSummary } = useSummaryTrigger(viewedPaths);

  // ============================================
  // 📍 PATH CHANGE HANDLER
  // ============================================
  const handlePathChange = (pathId: string) => {
    setActivePath(pathId);
    setViewedPaths(prev => new Set([...prev, pathId]));
  };

  // ============================================
  // 🎯 RELATED QUESTION CLICK HANDLER
  // ============================================
  const handleRelatedClick = async (relatedId: string) => {
    const { pathId, questionIndex } = parseRelatedId(relatedId);

    if (pathId !== activePath) {
      // Switch path first
      handlePathChange(pathId);

      // Wait for path transition
      await waitForTransition(300);
    }

    // Expand the target question
    qnaState.handleToggle(questionIndex);

    // Wait for expansion animation
    await waitForTransition(500);

    // Find and scroll to the element
    const targetElement = document.querySelector(
      `[data-question-index="${questionIndex}"][data-path-id="${pathId}"]`
    ) as HTMLElement;

    if (targetElement) {
      // Set focus
      qnaState.setFocusedItem(questionIndex);

      // Smooth scroll to center
      smoothScrollToCenter({
        element: targetElement,
        duration: 800,
        onComplete: () => {
          // Clear focus after 3 seconds
          setTimeout(() => qnaState.setFocusedItem(null), 3000);
        }
      });
    }
  };

  // ============================================
  // 🎨 RENDER
  // ============================================
//      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gray-950"
//<div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/10 to-pink-950/20 transition-all duration-1000" />
  return (
    <section
      ref={sectionRef}
      data-qna-section
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-slate-950"
    >
      {/* Morphing Background Gradient */}
      <div className="absolute inset-0 bg-slate-950 transition-all duration-1000" />
      <div className="absolute inset-0 transition-all duration-1000">
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `linear-gradient(to br, ${
              pathConfig.find(p => p.id === activePath)?.color
            }20, ${pathConfig.find(p => p.id === activePath)?.color}10)`
          }}
        />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-800/10 to-pink-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with language switcher */}
        {/*<div className="flex justify-end mb-8">*/}
        {/*  <LanguageSwitcher language={language} setLanguage={setLanguage} />*/}
        {/*</div>*/}

        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-100/90">
            {t('qna.title')}
          </h2>
          <p className="text-lg text-gray-400/70">
            {t('qna.subtitle')}
          </p>
        </div>

        {/* Navigation Reference Point */}
        <div ref={navRef} />

        {/* Sticky Navigation */}
        {/*<StickyNav*/}
        {/*  paths={pathConfig}*/}
        {/*  activePath={activePath}*/}
        {/*  onPathChange={handlePathChange}*/}
        {/*  t={t}*/}
        {/*  isSticky={navState.isSticky}*/}
        {/*  shouldShow={navState.shouldShow}*/}
        {/*  pathProgress={pathProgress}*/}
        {/*/>*/}
        <NavContainer
          paths={pathConfig}
          activePath={activePath}
          onPathChange={handlePathChange}
          t={t}
          isSticky={navState.isSticky}
          shouldShow={navState.shouldShow}
          pathProgress={pathProgress}
        />

        {/* Questions List */}
        <div className="space-y-4 max-w-4xl mx-auto mt-12">
          {currentQuestions.map((qa, index) => (
            <QnAItem
              key={index}
              question={qa.q}
              answer={qa.a}
              readTime={qa.readTime}
              related={qa.related}
              index={index}
              pathId={activePath}
              isFocused={qnaState.focusedItem === index}
              isVisible={qnaState.questionsVisible}
              isPinned={qnaState.pinnedItems.has(index)}
              onTogglePin={() => qnaState.handleTogglePin(index)}
              isExpanded={qnaState.expandedItems.has(index)}
              onToggle={() => qnaState.handleToggle(index)}
              onRelatedClick={handleRelatedClick}
              t={t}
            />
          ))}

          {/* Ask More CTA */}
          <AskMoreCTA t={t} isVisible={qnaState.questionsVisible} />
        </div>
      </div>

      {/* Summary Card */}
      {showSummary && (
        <SummaryCard
          exploredPaths={Array.from(viewedPaths)}
          t={t}
          language={locale}
          onClose={handleCloseSummary}
        />
      )}
    </section>
  );
};

export default QnASection;
//          language={language}