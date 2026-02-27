import React, { useRef } from 'react';
import { EducationCard } from '../education/components/EducationCard';
import { ViewControls } from '../education/components/ViewControls';
import { FloatingNav } from '../education/components/FloatingNav';
import { NetworkVisualization } from '../education/components/NetworkVisualization';
import { useEducationState } from '../education/hooks/useEducationState';
import { useEducationData } from '../education/hooks/useEducationData';
import { glassStyles } from '../education/styles/glassStyles';
import { GraduationCap, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { allEducation, totalStats } = useEducationData();

  const INITIAL_DISPLAY_COUNT = 6;

  const {
    viewMode,
    expandedCards,
    displayCount,
    showingSummary,
    visibleEducation,
    handleViewChange,
    toggleCard,
    handleShowMore,
    handleShowLess,
    handleReset,
    setShowingSummary
  } = useEducationState({
    allEducation,
    initialDisplayCount: INITIAL_DISPLAY_COUNT,
    initialViewMode: 'grid'
  });

  const { t } = useLanguage();
  // Show summary stats when enabled
  const SummaryStats = () => (
    <div className={`
      mt-12 p-6 rounded-2xl ${glassStyles.card}
      animate-in fade-in slide-in-from-bottom duration-1000
    `}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${glassStyles.text.primary}`}>
            {totalStats.totalInstitutions}
          </div>
          <div className={`text-xs ${glassStyles.text.secondary}`}>
            Institutions
          </div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${glassStyles.text.primary}`}>
            {totalStats.totalCourses}
          </div>
          <div className={`text-xs ${glassStyles.text.secondary}`}>
            Courses Completed
          </div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${glassStyles.text.primary}`}>
            {totalStats.totalSkills}
          </div>
          <div className={`text-xs ${glassStyles.text.secondary}`}>
            Skills Developed
          </div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${glassStyles.text.primary}`}>
            {totalStats.totalPhases}
          </div>
          <div className={`text-xs ${glassStyles.text.secondary}`}>
            Learning Phases
          </div>
        </div>
      </div>
    </div>
  );

  // Calculate remaining items to show
  const remainingItems = Math.max(0, allEducation.length - displayCount);

//  bg-slate-950
//<h2 className={`
//          text-4xl md:text-5xl font-bold mb-6 ${glassStyles.text.primary}
//          animate-in fade-in slide-in-from-bottom duration-1000 delay-200
//        `}>
  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-950">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`
            w-16 h-16 rounded-2xl ${glassStyles.card}
            flex items-center justify-center
            animate-in zoom-in duration-1000
          `}>
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <h2 className={`
          text-4xl md:text-5xl mb-6 ${glassStyles.text.primary}
          animate-in fade-in slide-in-from-bottom duration-1000 delay-200
        `}>
          {t('education.title')}
        </h2>

        <p className={`
          text-lg md:text-xl max-w-3xl mx-auto ${glassStyles.text.secondary}
          animate-in fade-in slide-in-from-bottom duration-1000 delay-400
        `}>
          {t('education.subtitle')}
        </p>
      </div>

      {/* View Controls */}
      <ViewControls
        viewMode={viewMode}
        onViewChange={handleViewChange}
        totalCount={allEducation.length}
        displayCount={displayCount}
        initialDisplayCount={INITIAL_DISPLAY_COUNT}
        onShowMore={handleShowMore}
        onShowLess={handleShowLess}
        onReset={handleReset}
      />

      {/* Education Cards */}
      <div className={`
        ${viewMode === 'timeline' ? 'space-y-0' : 'grid gap-6'}
        ${viewMode === 'impact' ? 'grid-cols-1 md:grid-cols-2' : ''}
        ${viewMode === 'skills' ? 'grid-cols-1 lg:grid-cols-2' : ''}
        ${viewMode === 'network' ? 'grid-cols-1' : ''}
        ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : ''}
        ${viewMode === 'compact' ? 'grid-cols-1' : ''}
      `}>
        {viewMode === 'network' ? (
          <NetworkVisualization
            education={allEducation}
            isVisible={showingSummary && viewMode === 'network'}
          />
        ) : (
          visibleEducation.map((edu, index) => (
            <EducationCard
              key={edu.id}
              education={edu}
              index={index}
              viewMode={viewMode}
              isExpanded={expandedCards.has(edu.id)}
              onToggle={() => toggleCard(edu.id)}
              allEducation={allEducation}
            />
          ))
        )}
      </div>

      {/* Show More Button */}
      {viewMode !== 'network' && remainingItems > 0 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowMore}
            className={`
              px-8 py-3 rounded-xl ${glassStyles.card}
              ${glassStyles.text.secondary} hover:${glassStyles.text.primary}
              transform transition-all duration-300
              hover:scale-105 hover:shadow-lg
              flex items-center gap-2
            `}
          >
            <BookOpen className="w-4 h-4" />
            Show More Education ({remainingItems} remaining)
          </button>
        </div>
      )}

      {/* Show Less Button */}
      {displayCount > INITIAL_DISPLAY_COUNT && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowLess}
            className={`
              px-6 py-2 rounded-lg text-sm ${glassStyles.text.muted}
              hover:${glassStyles.text.secondary} transition-colors duration-300
            `}
          >
            Show Less
          </button>
        </div>
      )}

      {/* Summary Stats */}
      {showingSummary && (
        <SummaryStats />
      )}

      {/* Floating Navigation */}
      {/*<FloatingNav sectionRef={sectionRef} />*/}
    </section>
  );
};

export default EducationSection;