// components/EducationCard.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Network,
  Clock,
  Target,
  TrendingUp,
  Users,
  Zap,
  Pin,
  PinOff,
  RotateCcw,
} from 'lucide-react';
import { EducationCardProps, Education, Skill, EducationPeriod } from '../types/types';
import { glassStyles, getComplexityStyles, getCategoryIcon } from '../styles/glassStyles';
import { useSkillAnimation } from '@/components/education';
import clsx from 'clsx';
import { TimelineEducationCard } from './TimelineEducationCard';
import { NetworkVisualization } from './NetworkVisualization';

// Animation constants to avoid magic numbers
const ANIMATION_DELAYS = {
  SKILL_BASE: 100,
  SKILL_OFFSET: 75,
  COURSE_OFFSET: 400
} as const;

// Utility functions extracted from component
const getInstitutionIcon = (type: Education['type']) => {
  switch(type) {
    case 'university': return GraduationCap;
    case 'certificate': return Award;
    case 'specialization': return BookOpen;
    default: return GraduationCap;
  }
};

// Safe formatting utility
const formatEducationPeriod = (periods: EducationPeriod[]): string => {
  if (!periods || periods.length === 0) {
    return 'Duration not specified';
  }
  const firstPeriod = periods[0];
  const lastPeriod = periods[periods.length - 1];
  return `${firstPeriod.start} - ${lastPeriod.end}`;
};

// Skill metrics calculation utility
const calculateSkillMetrics = (skills: Skill[]) => {
  if (!skills || skills.length === 0) {
    return {
      avgLevel: 0,
      highImpactCount: 0,
      totalSkills: 0
    };
  }

  const totalLevel = skills.reduce((sum, skill) => sum + skill.level, 0);
  return {
    avgLevel: totalLevel / skills.length,
    highImpactCount: skills.filter(s => s.impact === 'high').length,
    totalSkills: skills.length
  };
};


// Enhanced visual indicators for pinned cards
const getPinnedCardStyles = (isPinned: boolean, color: string) => ({
  ...(isPinned && {
    ring: `1px solid ${color}20`,
    boxShadow: `0 0 0 1px ${color}15, 0 8px 32px ${color}10`,
    background: `linear-gradient(135deg, ${color}05 0%, transparent 100%)`
  })
});

// Smooth scroll utility
const smoothScrollToCard = (cardId: string, offset: number = 100) => {
  const element = document.getElementById(`education-card-${cardId}`);
  if (element) {
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const top = absoluteElementTop - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};

// Error fallback component
const ErrorEducationCard: React.FC<{ message: string }> = ({ message }) => (
  <div className={clsx(
    glassStyles.card,
    'rounded-xl p-5 text-center',
    'border border-red-500/20 bg-red-500/5'
  )}>
    <div className="text-red-400 text-sm">{message}</div>
  </div>
);

// Pin Button Component
const PinButton: React.FC<{
  isPinned: boolean;
  onTogglePin: () => void;
  color: string;
  size?: 'sm' | 'md';
}> = ({ isPinned, onTogglePin, color, size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const buttonSize = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onTogglePin();
      }}
      className={clsx(
        buttonSize,
        'rounded-full flex items-center justify-center',
        'transition-all duration-300',
        'hover:scale-110 active:scale-95',
        isPinned
          ? 'bg-white/20 ring-1 ring-white/20'
          : 'bg-white/10 hover:bg-white/15',
        glassStyles.text.secondary
      )}
      title={isPinned ? 'Unpin card' : 'Pin card to keep open'}
      aria-label={isPinned ? 'Unpin this card' : 'Pin this card'}
    >
      {isPinned ? (
        <Pin className={clsx(iconSize, 'fill-current')} style={{ color }} />
      ) : (
        <PinOff className={iconSize} style={{ color }} />
      )}
    </button>
  );
};

// Safe skill render component
const SafeSkillRender: React.FC<{
  skill: Skill;
  index: number;
  education: Education;
  skillsVisible: boolean;
  compact?: boolean;
}> = ({ skill, index, education, skillsVisible, compact = false }) => {
  try {
    if (!skill?.name) {
      return (
        <div className="text-xs text-gray-400 p-2">
          Invalid skill data
        </div>
      );
    }

    // getCategoryIcon returns a string, we need to map it to an actual icon component
    const getIconComponent = (category: string) => {
      const iconName = getCategoryIcon(category);
      switch(iconName) {
        case 'Code': return BookOpen;
        case 'Server': return Network;
        case 'Palette': return Award;
        case 'Search': return Target;
        case 'Smartphone': return BookOpen;
        case 'Database': return Network;
        case 'Users': return Award;
        case 'Wrench': return Target;
        default: return BookOpen;
      }
    };

    const IconComponent = getIconComponent(skill.category);

    if (compact) {
      return (
        <div
          className={clsx(
            'flex items-center justify-between py-1 px-2 rounded text-xs',
            'transform transition-all duration-300',
            skillsVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          )}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-1">
            <IconComponent className="w-3 h-3" />
            <span className={clsx('truncate max-w-20', glassStyles.text.primary)}>
              {skill.name}
            </span>
          </div>
          <span className={clsx('text-xs w-8 text-right', glassStyles.text.muted)}>
            {skill.level}%
          </span>
        </div>
      );
    }

    return (
      <div
        className={clsx(
          'flex items-center justify-between p-2 rounded-lg',
          glassStyles.card,
          'transform transition-all duration-300',
          skillsVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        )}
        style={{ transitionDelay: `${index * ANIMATION_DELAYS.SKILL_BASE}ms` }}
      >
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4" />
          <div>
            <span className={clsx('text-sm', glassStyles.text.primary)}>
              {skill.name}
            </span>
            <div className={clsx('text-xs capitalize', glassStyles.text.muted)}>
              {skill.impact} impact • {skill.category}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: skillsVisible ? `${skill.level}%` : '0%',
                backgroundColor: education.color
              }}
            />
          </div>
          <span className={clsx('text-xs w-8 text-right', glassStyles.text.muted)}>
            {skill.level}%
          </span>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Skill render error:', error);
    return (
      <div className="text-xs text-red-400 p-2">
        Error rendering skill
      </div>
    );
  }
};

// Compact View Component - ultra-minimal card design
const CompactEducationCard: React.FC<{
  education: Education;
  isExpanded: boolean;
  onToggle: () => void;
  skillsVisible: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
}> = ({ education, isExpanded, onToggle, skillsVisible, isPinned = false, onTogglePin }) => {
  const Icon = useMemo(() => getInstitutionIcon(education.type), [education.type]);
  const skillMetrics = calculateSkillMetrics(education.skills || []);

  return (
    <div
      id={`education-card-${education.id}`}
      className={clsx(
      'relative rounded-lg p-3',
      glassStyles.card,
      'transform transition-all duration-300',
      'hover:scale-[1.02] hover:shadow-lg',
      'cursor-pointer border border-white/5',
      isExpanded ? 'ring-1 ring-white/10' : ''
    )}
      style={getPinnedCardStyles(isPinned, education.color)}
      onClick={onToggle}>
      {/* Pin Button */}
      {onTogglePin && (
        <div className="absolute -top-1 -right-1 z-10">
          <PinButton
            isPinned={isPinned}
            onTogglePin={onTogglePin}
            color={education.color}
            size="sm"
          />
        </div>
      )}

      {/* Compact Header */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${education.color}25` }}
        >
          <Icon className="w-3 h-3" style={{ color: education.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={clsx('font-medium text-xs truncate', glassStyles.text.primary)}>
            {education.institution}
          </h3>
          <p className={clsx('text-xs truncate opacity-75', glassStyles.text.muted)}>
            {education.degree}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-bold" style={{ color: education.color }}>
            {education.impact}%
          </div>
        </div>
      </div>

      {/* Compact Stats Bar */}
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-3">
          <span className={clsx('flex items-center gap-1', glassStyles.text.muted)}>
            <Zap className="w-3 h-3" />
            {skillMetrics.totalSkills}
          </span>
          <span className={clsx('flex items-center gap-1 capitalize', glassStyles.text.muted)}>
            <Target className="w-3 h-3" />
            {education.complexity}
          </span>
        </div>
        <ChevronDown className={clsx('w-3 h-3 transition-transform duration-300',
          isExpanded ? 'rotate-180' : '', glassStyles.text.muted)} />
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${education.impact}%`,
            backgroundColor: education.color
          }}
        />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
          {/* Top Skills */}
          {education.skills && education.skills.length > 0 && (
            <div className="space-y-1">
              <div className={clsx('text-xs font-medium', glassStyles.text.secondary)}>
                Top Skills
              </div>
              {education.skills.slice(0, 3).map((skill, i) => (
                <SafeSkillRender
                  key={i}
                  skill={skill}
                  index={i}
                  education={education}
                  skillsVisible={skillsVisible}
                  compact={true}
                />
              ))}
              {education.skills.length > 3 && (
                <div className={clsx('text-xs text-center py-1', glassStyles.text.muted)}>
                  +{education.skills.length - 3} more skills
                </div>
              )}
            </div>
          )}

          {/* Quick Info */}
          <div className="flex items-center justify-between text-xs">
            <span className={clsx('flex items-center gap-1', glassStyles.text.muted)}>
              <Calendar className="w-3 h-3" />
              {education.periods?.length || 0} phases
            </span>
            <span className={clsx('flex items-center gap-1', glassStyles.text.muted)}>
              <MapPin className="w-3 h-3" />
              {education.location}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Timeline View Component - focuses on chronological progression
const TimelineEducationCard1: React.FC<{
  education: Education;
  isExpanded: boolean;
  onToggle: () => void;
  skillsVisible: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
}> = ({ education, isExpanded, onToggle, skillsVisible, isPinned = false, onTogglePin }) => {
  const Icon = useMemo(() => getInstitutionIcon(education.type), [education.type]);

  return (
    <div
      id={`education-card-${education.id}`}
      className={clsx(
      'relative rounded-xl p-5',
      glassStyles.card,
      'transform transition-all duration-500',
      'hover:scale-[1.02] hover:shadow-xl'
    )}
     style={getPinnedCardStyles(isPinned, education.color)}
    >
      {/* Pin Button */}
      {onTogglePin && (
        <div className="absolute -top-2 -right-2 z-10">
          <PinButton
            isPinned={isPinned}
            onTogglePin={onTogglePin}
            color={education.color}
          />
        </div>
      )}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${education.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: education.color }} />
        </div>
        <div className="flex-1">
          <h3 className={clsx('font-semibold text-lg', glassStyles.text.primary)}>
            {education.institution}
          </h3>
          <p className={clsx('text-sm', glassStyles.text.secondary)}>
            {education.degree}
          </p>
          <p className={clsx('text-xs', glassStyles.text.muted)}>
            {formatEducationPeriod(education.periods)}
          </p>
        </div>
        <div className="text-right">
          <div className={clsx('text-lg font-bold', glassStyles.text.primary)} style={{ color: education.color }}>
            {education.impact}%
          </div>
        </div>
      </div>

      {/* Timeline visualization */}
      {education.periods && education.periods.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4" style={{ color: education.color }} />
            <span className={clsx('text-sm font-medium', glassStyles.text.secondary)}>
              Learning Journey
            </span>
          </div>
          <div className="space-y-2">
            {education.periods.map((period, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={clsx('w-2 h-2 rounded-full')} style={{ backgroundColor: education.color }} />
                <div className="flex-1">
                  <div className={clsx('text-sm', glassStyles.text.primary)}>{period.phase}</div>
                  <div className={clsx('text-xs', glassStyles.text.muted)}>
                    {period.start} → {period.end}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className={clsx('text-sm mb-4', glassStyles.text.secondary)}>
            {education.narrative}
          </p>
          {education.skills && education.skills.length > 0 && (
            <div className="space-y-2">
              {education.skills.slice(0, 3).map((skill, i) => (
                <SafeSkillRender
                  key={i}
                  skill={skill}
                  index={i}
                  education={education}
                  skillsVisible={skillsVisible}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <button onClick={onToggle} className={clsx('mt-4 w-full text-center text-sm', glassStyles.text.muted)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

// Skills View Component - focuses on skills and competencies
const SkillsEducationCard: React.FC<{
  education: Education;
  isExpanded: boolean;
  onToggle: () => void;
  skillsVisible: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
}> = ({ education, isExpanded, onToggle, skillsVisible, isPinned = false, onTogglePin }) => {
  const Icon = useMemo(() => getInstitutionIcon(education.type), [education.type]);
  const skillMetrics = calculateSkillMetrics(education.skills || []);

  return (
    <div
      id={`education-card-${education.id}`}
      className={clsx(
      'relative rounded-xl p-5',
      glassStyles.card,
      'transform transition-all duration-500',
      'hover:scale-[1.02] hover:shadow-xl'
    )}
     style={getPinnedCardStyles(isPinned, education.color)}
    >
      {/* Pin Button */}
      {onTogglePin && (
        <div className="absolute -top-2 -right-2 z-10">
          <PinButton
            isPinned={isPinned}
            onTogglePin={onTogglePin}
            color={education.color}
          />
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${education.color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: education.color }} />
          </div>
          <div>
            <h3 className={clsx('font-semibold text-lg mb-1', glassStyles.text.primary)}>
              {education.institution}
            </h3>
            <p className={clsx('text-sm mb-2', glassStyles.text.secondary)}>
              {education.degree}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={clsx('text-xs', glassStyles.text.muted)}>Skills Gained</div>
          <div className="text-2xl font-bold" style={{ color: education.color }}>
            {skillMetrics.totalSkills}
          </div>
        </div>
      </div>

      {/* Skills Preview */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        {education.skills?.slice(0, isExpanded ? undefined : 3).map((skill, i) => (
          <SafeSkillRender
            key={i}
            skill={skill}
            index={i}
            education={education}
            skillsVisible={skillsVisible}
          />
        )) || (
          <div className="text-sm text-gray-400">No skills data available</div>
        )}
      </div>

      {education.skills && education.skills.length > 3 && (
        <button
          onClick={onToggle}
          className={clsx(
            'w-full text-center text-sm p-2 rounded-lg transition-all duration-300',
            glassStyles.button,
            glassStyles.text.secondary
          )}
        >
          {isExpanded ? `Hide ${education.skills.length - 3} skills` : `Show ${education.skills.length - 3} more skills`}
        </button>
      )}
    </div>
  );
};

// Impact View Component - focuses on impact and outcomes
const ImpactEducationCard: React.FC<{
  education: Education;
  isExpanded: boolean;
  onToggle: () => void;
  skillsVisible: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
}> = ({ education, isExpanded, onToggle, skillsVisible, isPinned = false, onTogglePin }) => {
  const Icon = useMemo(() => getInstitutionIcon(education.type), [education.type]);
  const complexityStyles = getComplexityStyles(education.complexity);

  return (
    <div
      id={`education-card-${education.id}`}
      className={clsx(
      'relative rounded-xl p-5',
      glassStyles.card,
      'transform transition-all duration-500',
      'hover:scale-[1.02] hover:shadow-xl'
    )}
     style={getPinnedCardStyles(isPinned, education.color)}
    >
      {/* Pin Button */}
      {onTogglePin && (
        <div className="absolute -top-2 -right-2 z-10">
          <PinButton
            isPinned={isPinned}
            onTogglePin={onTogglePin}
            color={education.color}
          />
        </div>
      )}
      {/* Impact Badge */}
      <div className="absolute -top-2 -right-2">
        <div className={clsx(
          'px-3 py-1 rounded-full text-xs font-medium',
          education.impact >= 80 ? 'bg-green-500/20 text-green-400' :
          education.impact >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
          education.impact >= 40 ? 'bg-orange-500/20 text-orange-400' :
                                  'bg-gray-500/20 text-gray-400'
        )}>
          {education.impact >= 80 ? 'High Impact' :
           education.impact >= 60 ? 'Medium Impact' :
           'Foundation'}
        </div>
      </div>

      <div className="text-center mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: `${education.color}20` }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: education.color }}>
              {education.impact}
            </div>
            <div className={clsx('text-xs', glassStyles.text.muted)}>Impact</div>
          </div>
        </div>
        <h3 className={clsx('font-semibold text-lg mb-1', glassStyles.text.primary)}>
          {education.institution}
        </h3>
        <p className={clsx('text-sm', glassStyles.text.secondary)}>
          {education.degree}
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className={clsx('text-sm', glassStyles.text.muted)}>Complexity</span>
          <span className={clsx('text-sm capitalize', glassStyles.text.primary)} style={{ color: complexityStyles.color }}>
            {education.complexity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={clsx('text-sm', glassStyles.text.muted)}>Skills Developed</span>
          <span className={clsx('text-sm', glassStyles.text.primary)}>
            {education.skills?.length || 0}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={clsx('text-sm', glassStyles.text.muted)}>Location</span>
          <span className={clsx('text-sm', glassStyles.text.primary)}>
            {education.location}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className={clsx('text-sm mb-4', glassStyles.text.secondary)}>
            {education.narrative}
          </p>
          {education.courses && education.courses.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {education.courses.slice(0, 4).map((course, i) => (
                <span
                  key={i}
                  className={clsx('text-xs px-2 py-1 rounded-lg', glassStyles.badge)}
                  style={{ backgroundColor: `${education.color}10` }}
                >
                  {course}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        onClick={onToggle}
        className={clsx('mt-4 w-full text-center text-sm', glassStyles.text.muted)}
      >
        {isExpanded ? 'Show Less' : 'Show Details'}
      </button>
    </div>
  );
};

// Grid View Component - compact grid layout
const GridEducationCard: React.FC<{
  education: Education;
  isExpanded: boolean;
  onToggle: () => void;
  skillsVisible: boolean;
  isPinned?: boolean;
  onTogglePin?: () => void;
}> = ({ education, isExpanded, onToggle, skillsVisible, isPinned = false, onTogglePin }) => {
  const Icon = useMemo(() => getInstitutionIcon(education.type), [education.type]);

  return (
    <div
      id={`education-card-${education.id}`}
      className={clsx(
      'relative rounded-xl p-4',
      glassStyles.card,
      'transform transition-all duration-500',
      'hover:scale-[1.02] hover:shadow-xl',
      'cursor-pointer'
    )}
      style={getPinnedCardStyles(isPinned, education.color)}
      onClick={onToggle}>
      {/* Pin Button */}
      {onTogglePin && (
        <div className="absolute -top-2 -right-2 z-10">
          <PinButton
            isPinned={isPinned}
            onTogglePin={onTogglePin}
            color={education.color}
          />
        </div>
      )}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${education.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: education.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={clsx('font-semibold text-sm mb-1 truncate', glassStyles.text.primary)}>
            {education.institution}
          </h3>
          <p className={clsx('text-xs mb-2 truncate', glassStyles.text.secondary)}>
            {education.degree}
          </p>
          <div className="flex items-center justify-between">
            <span className={clsx('text-xs', glassStyles.text.muted)}>
              {education.skills?.length || 0} skills
            </span>
            <span className="text-xs font-medium" style={{ color: education.color }}>
              {education.impact}%
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className={clsx('text-xs mb-3 line-clamp-2', glassStyles.text.secondary)}>
            {education.narrative}
          </p>
          {education.skills && education.skills.length > 0 && (
            <div className="space-y-1">
              {education.skills.slice(0, 2).map((skill, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className={clsx('text-xs', glassStyles.text.primary)}>
                    {skill.name}
                  </span>
                  <span className={clsx('text-xs', glassStyles.text.muted)}>
                    {skill.level}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Enhanced Network View Component - uses the imported NetworkVisualization
const NetworkEducationCard: React.FC<{
  education: Education;
  isExpanded: boolean;
  onToggle: () => void;
  connectedEducations: Education[];
  skillsVisible: boolean;
  allEducation: Education[];
  isPinned?: boolean;
  onTogglePin?: () => void;
}> = ({ education, isExpanded, onToggle, connectedEducations, skillsVisible, allEducation, isPinned = false, onTogglePin  }) => {
  const Icon = useMemo(() => getInstitutionIcon(education.type), [education.type]);
  const complexityStyles = getComplexityStyles(education.complexity);

  return (
    <div
      id={`education-card-${education.id}`}
      className={clsx(
      'relative rounded-xl p-5',
      glassStyles.card,
      'transform transition-all duration-500',
      'hover:scale-[1.02] hover:shadow-xl'
    )}
     style={getPinnedCardStyles(isPinned, education.color)}
    >
      {/* Pin Button */}
      {onTogglePin && (
        <div className="absolute -top-2 -right-2 z-10">
          <PinButton
            isPinned={isPinned}
            onTogglePin={onTogglePin}
            color={education.color}
          />
        </div>
      )}
      {/* Connection indicators */}
      {connectedEducations.length > 0 && (
        <div className="absolute -top-2 -right-2">
          <div className={clsx(
            'w-6 h-6 rounded-full flex items-center justify-center',
            glassStyles.badge,
            'animate-pulse'
          )}>
            <Network className="w-3 h-3" style={{ color: education.color }} />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: `${education.color}20` }}
          >
            <Icon className="w-6 h-6 z-10" style={{ color: education.color }} />
            <div
              className="absolute inset-0 opacity-10 animate-pulse"
              style={{ backgroundColor: education.color }}
            />
            {complexityStyles.color && (
              <div className={clsx(
                'absolute -bottom-1 -right-1 w-4 h-4 rounded-full',
                'border-2 border-white dark:border-gray-900'
              )}
              style={{ backgroundColor: complexityStyles.color }} />
            )}
          </div>
          <div>
            <h3 className={clsx('font-semibold text-lg mb-1', glassStyles.text.primary)}>
              {education.institution}
            </h3>
            <p className={clsx('text-sm mb-2', glassStyles.text.secondary)}>
              {education.degree}
            </p>
            <div className="flex items-center gap-3 text-xs">
              <span className={clsx('flex items-center gap-1', glassStyles.text.muted)}>
                <Clock className="w-3 h-3" />
                {education.periods?.length || 0} phases
              </span>
              <span className={glassStyles.text.muted}>•</span>
              <span className={clsx('flex items-center gap-1 capitalize', glassStyles.text.muted)}>
                <Target className="w-3 h-3" />
                {education.complexity} complexity
              </span>
              <span className={glassStyles.text.muted}>•</span>
              <span className={clsx('flex items-center gap-1', glassStyles.text.muted)}>
                <MapPin className="w-3 h-3" />
                {education.location}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div
            className="text-2xl font-bold mb-1"
            style={{ color: education.color }}
          >
            {education.impact}%
          </div>
          <div className={clsx('text-xs', glassStyles.text.muted)}>Impact Score</div>
        </div>
      </div>

      <p className={clsx('text-sm mb-4 leading-relaxed', glassStyles.text.secondary)}>
        {education.narrative}
      </p>

      {/* Connected institutions */}
      {connectedEducations.length > 0 && (
        <div className="mb-4">
          <h4 className={clsx('text-xs font-medium mb-2', glassStyles.text.secondary)}>
            Connected Learning Pathways
          </h4>
          <div className="flex flex-wrap gap-2">
            {connectedEducations.map(connEducation => (
              <span
                key={connEducation.id}
                className={clsx(
                  'text-xs px-3 py-1 rounded-full border',
                  glassStyles.badge,
                  'transition-all duration-300',
                  'hover:scale-105 cursor-pointer'
                )}
                // Continuing from where the code left off...
                style={{
                  borderColor: `${connEducation.color}50`,
                  backgroundColor: `${connEducation.color}10`
                }}
                title={`Connected to ${connEducation.degree}`}
              >
                {connEducation.institution}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`education-details-${education.id}`}
        className={clsx(
          'flex items-center gap-2 text-sm w-full justify-center',
          'p-3 rounded-lg transition-all duration-300',
          glassStyles.button,
          glassStyles.text.secondary,
          'hover:scale-[1.02]'
        )}
      >
        {isExpanded ? 'Hide' : 'Show'} skills & courses
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div
          id={`education-details-${education.id}`}
          role="region"
          aria-label={`Details for ${education.institution}`}
          className={clsx(
            'mt-4 pt-4 border-t border-white/10',
            'animate-in slide-in-from-top duration-500'
          )}
        >
          {/* Network Visualization */}
          {allEducation && allEducation.length > 1 && (
            <div className="mb-4">
              <h4 className={clsx('text-xs font-medium mb-3', glassStyles.text.secondary)}>
                Educational Network
              </h4>
              {/*<NetworkVisualization*/}
              {/*  educationData={allEducation}*/}
              {/*  selectedEducation={education}*/}
              {/*  compact={true}*/}
              {/*  height={200}*/}
              {/*/>*/}
              <NetworkVisualization
                educationData={allEducation}
                selectedEducation={education}
                compact={true}
                height={200}
                showLabels={false}
                interactive={true}
                isVisible={true}
                isExpanded={isExpanded}
                onToggle={onToggle}
                connectedEducations={connectedEducations}
                skillsVisible={skillsVisible}
                onEducationSelect={(selectedEdu) => {
                  // Handle selection locally or via callback prop
                  // Handle education selection - could trigger parent callback
                  console.log('Selected education:', selectedEdu);
                }}
              />
            </div>
          )}

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {education.skills?.map((skill, i) => (
              <SafeSkillRender
                key={i}
                skill={skill}
                index={i}
                education={education}
                skillsVisible={skillsVisible}
              />
            )) || (
              <div className="text-sm text-gray-400">No skills data available</div>
            )}
          </div>

          {/* Key Courses */}
          {education.courses && education.courses.length > 0 && (
            <div>
              <h4 className={clsx('text-xs font-medium mb-3', glassStyles.text.secondary)}>
                Key Courses & Learning Modules
              </h4>
              <div className="flex flex-wrap gap-2">
                {education.courses.map((course, i) => (
                  <span
                    key={i}
                    className={clsx(
                      'text-xs px-3 py-1 rounded-lg',
                      glassStyles.badge,
                      glassStyles.text.muted,
                      'transform transition-all duration-500',
                      skillsVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
                      'hover:scale-105'
                    )}
                    style={{
                      transitionDelay: `${i * 50 + ANIMATION_DELAYS.COURSE_OFFSET}ms`,
                      borderColor: `${education.color}30`
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main EducationCard Component with proper architecture and all view modes
export const EducationCard: React.FC<EducationCardProps> = ({
  education,
  viewMode = 'network',
  isExpanded = false,
  onToggle,
  allEducation = []
}) => {
  // Move all hooks to the top before any conditional returns
  const connectedEducations = useMemo(() => {
    if (!education?.connections) return [];
    return education.connections
      .map(connId => allEducation.find(edu => edu.id === connId))
      .filter((edu): edu is Education => edu !== undefined);
  }, [education?.connections, allEducation]);

  const skillMetrics = useMemo(() =>
    calculateSkillMetrics(education?.skills || []),
    [education?.skills]
  );

  const skillsVisible = useSkillAnimation(isExpanded, 200);

  const handleToggle = useCallback(() => {
    onToggle?.();
  }, [onToggle]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (skillsVisible && education?.skills) {
      education.skills.forEach((_, i) => {
        const timeout = setTimeout(() => {
          // Animation logic handled in components
        }, i * ANIMATION_DELAYS.SKILL_BASE);
        timeouts.push(timeout);
      });
    }
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [education?.skills, skillsVisible]);

  // Input validation after hooks
  if (!education?.institution || !education?.degree) {
    return <ErrorEducationCard message="Invalid education data - missing required fields" />;
  }

  // Route to appropriate view component
  switch (viewMode) {
    case 'network':
      return (
        <NetworkEducationCard
          education={education}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          connectedEducations={connectedEducations}
          skillsVisible={skillsVisible}
          allEducation={allEducation}
        />
      );
    case 'timeline':
      return (
        <TimelineEducationCard
          education={education}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          skillsVisible={skillsVisible}
        />
      );
    case 'skills':
      return (
        <SkillsEducationCard
          education={education}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          skillsVisible={skillsVisible}
        />
      );
    case 'impact':
      return (
        <ImpactEducationCard
          education={education}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          skillsVisible={skillsVisible}
        />
      );
    case 'grid':
      return (
        <GridEducationCard
          education={education}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          skillsVisible={skillsVisible}
        />
      );
    case 'compact':
      return (
        <CompactEducationCard
          education={education}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          skillsVisible={skillsVisible}
        />
      );
    default:
      console.warn(`Unsupported view mode: ${viewMode}`);
      return <ErrorEducationCard message={`Unsupported view mode: ${viewMode}`} />;
  }
};

// Set display name for React DevTools
if (process.env.NODE_ENV === 'development') {
  EducationCard.displayName = 'EducationCard';
  NetworkEducationCard.displayName = 'NetworkEducationCard';
  CompactEducationCard.displayName = 'CompactEducationCard';
  SkillsEducationCard.displayName = 'SkillsEducationCard';
  ImpactEducationCard.displayName = 'ImpactEducationCard';
  GridEducationCard.displayName = 'GridEducationCard';
}

// Enhanced EducationCardProps with all view modes
export interface EnhancedEducationCardProps extends EducationCardProps {
  viewMode?: 'network' | 'timeline' | 'skills' | 'impact' | 'grid' | 'compact';
  allEducation?: Education[];
  onEducationClick?: (education: Education) => void;
  onEducationHover?: (education: Education | null) => void;
  showConnections?: boolean;
  animateOnLoad?: boolean;
}

// Export utility functions for external use
export {
  getInstitutionIcon,
  formatEducationPeriod,
  calculateSkillMetrics,
  getComplexityStyles,
  getCategoryIcon
};

// Export all view components for direct use
export {
  NetworkEducationCard,
  CompactEducationCard,
  TimelineEducationCard1 as TimelineEducationCard,
  SkillsEducationCard,
  ImpactEducationCard,
  GridEducationCard,
  SafeSkillRender,
  ErrorEducationCard
};

// Hook for managing multiple education cards
export const useEducationCards = (educationData: Education[]) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [viewMode, setViewMode] = useState<EnhancedEducationCardProps['viewMode']>('network');

  const toggleCard = useCallback((educationId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(educationId)) {
        newSet.delete(educationId);
      } else {
        newSet.add(educationId);
      }
      return newSet;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedCards(new Set(educationData.map(edu => edu.id)));
  }, [educationData]);

  const collapseAll = useCallback(() => {
    setExpandedCards(new Set());
  }, []);

  const selectEducation = useCallback((education: Education | null) => {
    setSelectedEducation(education);
  }, []);

  const changeViewMode = useCallback((newMode: EnhancedEducationCardProps['viewMode']) => {
    setViewMode(newMode);
  }, []);

  return {
    expandedCards,
    selectedEducation,
    viewMode,
    toggleCard,
    expandAll,
    collapseAll,
    selectEducation,
    changeViewMode,
    isExpanded: (educationId: string) => expandedCards.has(educationId)
  };
};

// Default export
export default EducationCard;