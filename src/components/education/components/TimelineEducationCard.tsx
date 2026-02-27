// components/TimelineEducationCard.tsx
import React, { useMemo } from 'react';
import { MapPin, ChevronUp, ChevronDown, BookOpen } from 'lucide-react';
import { Education, ViewComponentProps } from '../types/types';
import { glassStyles, getComplexityStyles, getCategoryIcon } from '../styles/glassStyles';
import clsx from 'clsx';

// Helper function for impact styles
const getImpactStyles = (impact: number) => {
  if (impact >= 80) {
    return {
      badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      text: 'text-emerald-400',
      indicator: 'bg-emerald-500'
    };
  } else if (impact >= 60) {
    return {
      badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      text: 'text-blue-400',
      indicator: 'bg-blue-500'
    };
  } else if (impact >= 40) {
    return {
      badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      text: 'text-amber-400',
      indicator: 'bg-amber-500'
    };
  } else {
    return {
      badge: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
      text: 'text-gray-400',
      indicator: 'bg-gray-500'
    };
  }
};

export const TimelineEducationCard: React.FC<ViewComponentProps> = ({
  education,
  isExpanded,
  onToggle,
  skillsVisible,
  viewMode = 'timeline' // Default to timeline if not specified
}) => {
  const Icon = BookOpen; // Simplified to avoid dynamic imports
  const complexityStyles = getComplexityStyles(education.complexity);

  // Common header component
  const renderHeader = (showImpactBadge = false) => (
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className={clsx('font-semibold text-lg mb-1', glassStyles.text.primary)}>
          {education.institution}
        </h3>
        <p className={clsx('text-sm mb-2', glassStyles.text.secondary)}>
          {education.degree}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <span className={clsx('flex items-center gap-1', glassStyles.text.muted)}>
            <MapPin className="w-3 h-3" />
            {education.location}
          </span>
          <span className={glassStyles.text.muted}>•</span>
          <span className={clsx('capitalize', complexityStyles.text)}>
            {education.complexity} complexity
          </span>
        </div>
      </div>
      <div className="text-right">
        <div
          className="text-xl font-bold"
          style={{ color: education.color }}
        >
          {education.impact}%
        </div>
        <div className={clsx('text-xs', glassStyles.text.muted)}>Impact</div>
        {showImpactBadge && (
          <div className={clsx('text-xs px-3 py-1 rounded-full mt-1', getImpactStyles(education.impact).badge)}>
            {education.impact >= 80 ? 'Transformational' :
             education.impact >= 60 ? 'Significant' :
             education.impact >= 40 ? 'Moderate' : 'Foundational'}
          </div>
        )}
      </div>
    </div>
  );

  // Common skills grid component
  const renderSkillsGrid = (skillsToShow = education.skills) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {skillsToShow?.map((skill, i) => {
        const categoryInfo = getCategoryIcon(skill.category);
        return (
          <div
            key={i}
            className={clsx(
              'p-3 rounded-lg transform transition-all duration-300',
              glassStyles.card,
              skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
              'hover:scale-[1.02]'
            )}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className={clsx('text-sm font-medium', glassStyles.text.primary)}>
                  {skill.name}
                </span>
                <div className={clsx('text-xs capitalize flex items-center gap-1', glassStyles.text.muted)}>
                  <div className={categoryInfo.icon} />
                  {skill.impact} impact • {skill.category}
                </div>
              </div>
              <span
                className="text-lg font-bold"
                style={{ color: education.color }}
              >
                {skill.level}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: skillsVisible ? `${skill.level}%` : '0%',
                  backgroundColor: education.color
                }}
              />
            </div>
          </div>
        );
      }) || <div className="text-sm text-gray-400">No skills data available</div>}
    </div>
  );

  // Common toggle button
  const renderToggleButton = () => (
    <button
      onClick={onToggle}
      className={clsx(
        'flex items-center gap-2 text-sm transition-colors duration-300',
        glassStyles.text.secondary,
        'hover:' + glassStyles.text.primary
      )}
    >
      {isExpanded ? 'Hide' : 'Show'} detailed breakdown
      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </button>
  );

  // Common expanded content
  const renderExpandedContent = () => (
    <div className={clsx(
      'mt-4 pt-4 border-t border-white/10',
      'animate-in slide-in-from-top duration-500'
    )}>
      {renderSkillsGrid()}

      {education.courses && education.courses.length > 0 && (
        <div>
          <h4 className={clsx('text-xs font-medium mb-3', glassStyles.text.secondary)}>
            Courses & Learning Paths
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {education.courses.map((course, i) => (
              <span
                key={i}
                className={clsx(
                  'text-xs px-3 py-2 rounded-lg flex items-center gap-2',
                  glassStyles.badge,
                  glassStyles.text.primary,
                  'transform transition-all duration-500 hover:scale-105',
                  skillsVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                )}
                style={{
                  transitionDelay: `${i * 75 + 400}ms`,
                  borderColor: `${education.color}40`,
                  backgroundColor: `${education.color}10`
                }}
              >
                <BookOpen className="w-3 h-3" style={{ color: education.color }} />
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Timeline View
  if (viewMode === 'timeline') {
    return (
      <div className="relative flex gap-4 group mb-8">
        {/* Timeline line */}
        <div className="absolute left-6 top-16 bottom-8 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

        {/* Timeline node with complexity indicator */}
        <div
          className={clsx(
            'relative z-10 w-12 h-12 rounded-full flex items-center justify-center',
            'border-2 transition-transform duration-300',
            glassStyles.card,
            'group-hover:scale-110'
          )}
          style={{
            backgroundColor: `${education.color}20`,
            borderColor: `${education.color}40`
          }}
        >
          <Icon className="w-5 h-5 z-10" style={{ color: education.color }} />
          <div className={clsx(
            'absolute inset-0 rounded-full border-2 opacity-30',
            complexityStyles.ring
          )} />
        </div>

        {/* Content */}
        <div className={clsx(
          'flex-1 rounded-xl p-5',
          glassStyles.card,
          'transform transition-all duration-500',
          'hover:translate-x-1 hover:shadow-lg'
        )}>
          {renderHeader()}

          {/* Timeline phases visualization */}
          <div className="mb-4">
            <h4 className={clsx('text-xs font-medium mb-2', glassStyles.text.secondary)}>
              Learning Progression
            </h4>
            <div className="relative">
              <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
                {education.periods?.map((period, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'flex-1 relative group/phase cursor-pointer',
                      'transition-all duration-300 hover:brightness-110'
                    )}
                    style={{ backgroundColor: `${education.color}${60 + i * 15}` }}
                    title={`${period.phase}: ${period.start} - ${period.end}`}
                  >
                    <div className={clsx(
                      'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2',
                      'opacity-0 group-hover/phase:opacity-100 transition-opacity duration-200',
                      'rounded px-2 py-1 text-xs whitespace-nowrap z-10',
                      glassStyles.card
                    )}>
                      <div className={clsx('font-medium', glassStyles.text.primary)}>
                        {period.phase}
                      </div>
                      <div className={glassStyles.text.muted}>
                        {period.start} → {period.end}
                      </div>
                    </div>
                  </div>
                )) || <div className="flex-1 bg-gray-400/20 rounded-full" />}
              </div>
            </div>
          </div>

          <p className={clsx('text-sm mb-4 leading-relaxed', glassStyles.text.secondary)}>
            {education.narrative}
          </p>

          {renderToggleButton()}
          {isExpanded && renderExpandedContent()}
        </div>
      </div>
    );
  }

  // Impact View
  if (viewMode === 'impact') {
    const highImpactSkills = education.skills
      .filter(skill => skill.impact === 'high')
      .sort((a, b) => b.level - a.level);

    return (
      <div className={clsx(
        glassStyles.card, 'rounded-xl p-6 mb-6',
        'transform transition-all duration-300',
        'hover:shadow-xl group relative overflow-hidden'
      )}>
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at top right, ${education.color}40, transparent 50%)`
          }}
        />

        <div className="relative z-10">
          {/* Enhanced header for impact view */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className={clsx(
                    'w-14 h-14 rounded-2xl flex items-center justify-center',
                    glassStyles.card, 'group-hover:scale-110 transition-all duration-500'
                  )}
                  style={{ backgroundColor: `${education.color}25` }}
                >
                  <Icon className="w-7 h-7" style={{ color: education.color }} />
                </div>
                <div className={clsx(
                  'absolute -top-2 -right-2 w-8 h-8 rounded-full',
                  'flex items-center justify-center text-xs font-bold',
                  getImpactStyles(education.impact).badge,
                  'animate-pulse'
                )}>
                  {education.impact}
                </div>
              </div>
              <div>
                <h3 className={clsx('text-xl font-bold mb-1', glassStyles.text.primary)}>
                  {education.institution}
                </h3>
                <p className={clsx(glassStyles.text.secondary, 'mb-2')}>
                  {education.degree}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <span className={clsx('flex items-center gap-1', glassStyles.text.muted)}>
                    <MapPin className="w-3 h-3" />
                    {education.location}
                  </span>
                  <span className={clsx('capitalize', complexityStyles.text)}>
                    {education.complexity} complexity
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={clsx('text-3xl font-bold mb-2', getImpactStyles(education.impact).text)}>
                {education.impact}%
              </div>
              <div className={clsx('text-sm mb-2', glassStyles.text.muted)}>Career Impact</div>
              <div className={clsx('text-xs px-3 py-1 rounded-full', getImpactStyles(education.impact).badge)}>
                {education.impact >= 80 ? 'Transformational' :
                 education.impact >= 60 ? 'Significant' :
                 education.impact >= 40 ? 'Moderate' : 'Foundational'}
              </div>
            </div>
          </div>

          {/* Impact metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={clsx('text-center p-4 rounded-xl', glassStyles.card)}>
              <div className={clsx('text-2xl font-bold mb-1', glassStyles.text.primary)}>
                {education.skills.length}
              </div>
              <div className={clsx('text-xs', glassStyles.text.muted)}>Skills Developed</div>
            </div>
            <div className={clsx('text-center p-4 rounded-xl', glassStyles.card)}>
              <div className={clsx('text-2xl font-bold mb-1', glassStyles.text.primary)}>
                {highImpactSkills.length}
              </div>
              <div className={clsx('text-xs', glassStyles.text.muted)}>High-Impact Skills</div>
            </div>
            <div className={clsx('text-center p-4 rounded-xl', glassStyles.card)}>
              <div className={clsx('text-2xl font-bold mb-1', glassStyles.text.primary)}>
                {Math.round(education.skills.reduce((sum, skill) => sum + skill.level, 0) / education.skills.length)}%
              </div>
              <div className={clsx('text-xs', glassStyles.text.muted)}>Avg Proficiency</div>
            </div>
          </div>

          {/* High-impact skills showcase */}
          {highImpactSkills.length > 0 && (
            <div className="mb-6">
              <h4 className={clsx('text-sm font-semibold mb-4', glassStyles.text.primary)}>
                Key Impact Areas
              </h4>
              <div className="space-y-3">
                {highImpactSkills.slice(0, 5).map((skill, i) => {
                  const categoryInfo = getCategoryIcon(skill.category);
                  return (
                    <div
                      key={i}
                      className={clsx(
                        'flex items-center gap-4 p-4 rounded-xl border border-white/10',
                        glassStyles.card,
                        'transform transition-all duration-500 hover:scale-[1.02]',
                        skillsVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                      )}
                      style={{
                        transitionDelay: `${i * 150}ms`,
                        borderColor: `${education.color}20`
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${categoryInfo.color}20` }}
                      >
                        <categoryInfo.icon className="w-5 h-5" style={{ color: categoryInfo.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={clsx('font-medium', glassStyles.text.primary)}>
                            {skill.name}
                          </span>
                          <span className="text-lg font-bold" style={{ color: education.color }}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={clsx('capitalize', glassStyles.text.muted)}>
                            {skill.category} • {skill.impact} impact
                          </span>
                          <div className="w-24 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: skillsVisible ? `${skill.level}%` : '0%',
                                backgroundColor: education.color
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Impact description */}
          <div className={clsx('p-4 rounded-xl mb-4', glassStyles.card)}>
            <p className={clsx('text-sm leading-relaxed', glassStyles.text.secondary)}>
              {education.narrative}
            </p>
          </div>

          <button
            onClick={onToggle}
            className={clsx(
              'w-full flex items-center justify-center gap-2 py-3 rounded-lg',
              glassStyles.card, glassStyles.text.secondary,
              'hover:' + glassStyles.text.primary,
              'transition-all duration-300 hover:scale-[1.01]'
            )}
          >
            {isExpanded ? 'Hide' : 'Show'} complete breakdown
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Expanded content for impact view */}
          {isExpanded && (
            <div className={clsx(
              'mt-6 pt-6 border-t border-white/10 space-y-6',
              'animate-in slide-in-from-top duration-500'
            )}>
              <div>
                <h4 className={clsx('text-sm font-semibold mb-4', glassStyles.text.primary)}>
                  Complete Skills Portfolio
                </h4>
                {['high', 'medium', 'low'].map(impactLevel => {
                  const skillsInLevel = education.skills.filter(skill => skill.impact === impactLevel);
                  if (skillsInLevel.length === 0) return null;

                  return (
                    <div key={impactLevel} className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={clsx('w-3 h-3 rounded-full', getImpactStyles(impactLevel === 'high' ? 80 : impactLevel === 'medium' ? 60 : 40).indicator)} />
                        <span className={clsx('text-sm font-medium capitalize', glassStyles.text.primary)}>
                          {impactLevel} Impact Skills ({skillsInLevel.length})
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-5">
                        {skillsInLevel.map((skill, i) => (
                          <span
                            key={i}
                            className={clsx(
                              'text-xs px-3 py-2 rounded-lg flex items-center gap-2',
                              glassStyles.badge, glassStyles.text.primary,
                              'transform transition-all duration-300 hover:scale-105'
                            )}
                            style={{
                              borderColor: `${education.color}40`,
                              backgroundColor: `${education.color}10`
                            }}
                          >
                            {skill.name}
                            <span className="font-medium" style={{ color: education.color }}>
                              {skill.level}%
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Learning timeline */}
              <div>
                <h4 className={clsx('text-sm font-semibold mb-4', glassStyles.text.primary)}>
                  Learning Timeline
                </h4>
                <div className="space-y-2">
                  {education.periods?.map((period, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{ borderColor: education.color, backgroundColor: `${education.color}30` }}
                      />
                      <div className="flex-1">
                        <span className={clsx('text-sm font-medium', glassStyles.text.primary)}>
                          {period.phase}
                        </span>
                        <span className={clsx('text-xs ml-2', glassStyles.text.muted)}>
                          {period.start} → {period.end}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};