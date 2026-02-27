'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronUp, Search, Grid, List, Layers, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedSkills } from '@/data/skills';
//import { Skill } from '@/types';

// Liquid glass theme utilities
const glassStyles = {
  card: `
    backdrop-blur-xl bg-white/5 dark:bg-gray-900/5
    border border-white/10 dark:border-gray-700/10
    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
    hover:bg-white/8 dark:hover:bg-gray-900/8
    transition-all duration-500 ease-out
  `,
  button: `
    backdrop-blur-md bg-white/3 dark:bg-gray-900/3
    border border-white/5 dark:border-gray-700/5
    hover:bg-white/5 dark:hover:bg-gray-900/5
    transition-all duration-300
  `,
  input: `
    backdrop-blur-md bg-white/5 dark:bg-gray-900/5
    border border-white/10 dark:border-gray-700/10
    focus:bg-white/8 dark:focus:bg-gray-900/8
    focus:border-white/20 dark:focus:border-gray-700/20
  `,
  text: {
    primary: 'text-gray-800/90 dark:text-gray-100/90',
    secondary: 'text-gray-600/70 dark:text-gray-400/70',
    muted: 'text-gray-200/50 dark:text-gray-200/50',
    focus: 'text-gray-100/50 dark:text-gray-100/50'
  },
  buttondiscovery: `
    backdrop-blur-md bg-white/3 dark:bg-gray-900/3
    border border-white/5 dark:border-gray-700/5
    hover:bg-white/5 dark:hover:bg-gray-900/5
    transition-all duration-300
  `,
};

//muted: 'text-gray-500/50 dark:text-gray-500/50'


// Skill Counter Component
const SkillCounter = ({ visible, total }) => {
  const { t } = useLanguage();

  return (
    <div className={`
      px-4 py-2 rounded-xl
      ${glassStyles.card}
      flex items-center gap-2
    `}>
      <div className="flex items-baseline gap-1">
        <span className={`text-lg font-bold ${glassStyles.text.primary}`}>
          {visible}
        </span>
        <span className={`text-sm ${glassStyles.text.muted}`}>
          {t('skills.counter.showing', { visible, total }).split(' ')[1]}
        </span>
        <span className={`text-lg font-bold ${glassStyles.text.primary}`}>
          {total}
        </span>
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ value, onChange, resultsCount }) => {
  const { t, tp } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);

//  ${isFocused ? 'ring-2 ring-white/20 dark:ring-gray-400/20' : ''}
//${isFocused ? 'text-gray-700 dark:text-gray-300' : glassStyles.text.muted}
//${isFocused ? 'text-gray-700 dark:text-gray-300' : glassStyles.text.muted}
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className={`
        relative rounded-2xl overflow-hidden
        ${glassStyles.input}
        ${isFocused ? 'ring-2 ring-white/20 dark:ring-gray-400' : 'ring-2 ring-white/20 dark:ring-gray-300/20'}
        transition-all duration-300
      `}>
        <Search className={`
          absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4
          ${isFocused ? 'text-gray-700 dark:text-gray-300' : glassStyles.text.muted}
          transition-colors duration-300
        `} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('skills.search.placeholder')}
          className={`
            w-full pl-11 pr-4 py-3 bg-transparent
            ${glassStyles.text.primary}
            placeholder:${glassStyles.text.focus}
            focus:outline-none
          `}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className={`
              absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg
              ${glassStyles.button} ${glassStyles.text.secondary}
              opacity-60 hover:opacity-100
            `}
            aria-label={t('skills.clearSearch')}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      {value && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 px-4 py-2
          text-xs ${glassStyles.text.secondary} text-center
          animate-in fade-in duration-300
        `}>
          {tp('skills.search.results', resultsCount)}
        </div>
      )}
    </div>
  );
};

// View Toggle Component
const ViewToggle = ({ viewMode, onChange }) => {
  const { t } = useLanguage();
  const modes = [
    { id: 'grid', icon: Grid, label: t('skills.viewModes.grid') },
    { id: 'compact', icon: List, label: t('skills.viewModes.compact') },
    { id: 'detailed', icon: Layers, label: t('skills.viewModes.detailed') }
  ];

  return (
    <div className={`
      inline-flex rounded-xl p-0.5
      ${glassStyles.card}
    `}>
      {modes.map(mode => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`
            relative px-3 py-2 rounded-lg flex items-center gap-2
            transition-all duration-300
            ${viewMode === mode.id
              ? 'bg-white/10 dark:bg-gray-700/10 shadow-sm'
              : 'hover:bg-white/5 dark:hover:bg-gray-800/5'
            }
          `}
          aria-label={mode.label}
        >
          <mode.icon className={`
            w-4 h-4
            ${viewMode === mode.id
              ? glassStyles.text.primary
              : glassStyles.text.secondary
            }
          `} />
          <span className={`
            text-xs hidden sm:inline
            ${viewMode === mode.id
              ? glassStyles.text.primary
              : glassStyles.text.secondary
            }
          `}>
            {mode.label}
          </span>
        </button>
      ))}
    </div>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, active, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`
            px-4 py-2 rounded-xl text-xs font-medium
            ${glassStyles.button}
            ${active === cat
              ? 'bg-white/10 dark:bg-gray-700/10 ' + glassStyles.text.primary
              : glassStyles.text.secondary + ' hover:' + glassStyles.text.primary
            }
            transition-all duration-300
          `}
        >
          {t(`skills.categories.${cat}`)}
        </button>
      ))}
    </div>
  );
};

// Skill Card Component
const SkillCard = ({ skill, index, viewMode, isVisible }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(skill.level);
      }, index * 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  const pastelColor = `${skill.color}20`;
  const progressColor = `${skill.color}60`;

  if (viewMode === 'compact') {
    return (
      <div
        className={`
          ${glassStyles.card}
          rounded-xl p-3 flex items-center gap-3
          transform transition-all duration-500
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}
        style={{
          transitionDelay: `${index * 30}ms`,
          borderColor: `${skill.color}10`
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: progressColor }}
        />
        <span className={`flex-1 text-sm ${glassStyles.text.primary}`}>
          {skill.name}
        </span>
        <span className={`text-xs font-mono ${glassStyles.text.secondary}`}>
          {skill.level}%
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    );
  }

  if (viewMode === 'detailed') {
    return (
      <div
        className={`
          ${glassStyles.card}
          rounded-2xl p-5
          transform transition-all duration-500
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}
        style={{
          transitionDelay: `${index * 30}ms`,
          background: `linear-gradient(135deg, ${pastelColor}, transparent)`
        }}
      >
        <h4 className={`font-medium mb-3 ${glassStyles.text.primary}`}>
          {skill.name}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className={glassStyles.text.secondary}>{t('skills.proficiency')}</span>
            <span className={glassStyles.text.primary}>{skill.level}%</span>
          </div>
          <div className="relative h-2 rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: progressColor
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div
      className={`
        ${glassStyles.card}
        rounded-xl p-4
        transform transition-all duration-500
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
      style={{
        transitionDelay: `${index * 30}ms`,
        borderTop: `2px solid ${progressColor}`
      }}
    >
      <h4 className={`text-sm font-medium mb-2 ${glassStyles.text.primary}`}>
        {skill.name}
      </h4>
      <div className="flex items-center gap-2">
        <div className="flex-1 relative h-1.5 rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: progressColor
            }}
          />
        </div>
        <span className={`text-xs font-mono ${glassStyles.text.secondary}`}>
          {skill.level}%
        </span>
      </div>
    </div>
  );
};

// Back to Top Component
const BackToTop = ({ targetRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [targetRef]);

  const scrollToTop = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 p-3 rounded-full
        ${glassStyles.card}
        ${glassStyles.text.secondary}
        hover:${glassStyles.text.primary}
        transform transition-all duration-300
        hover:scale-110 z-50
      `}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

// Main Component
const SkillsSection = () => {
  const { t, tp } = useLanguage();
  const sectionRef = useRef(null);
  const skillsData = useMemo(() => getLocalizedSkills(t), [t]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const [visibleItems, setVisibleItems] = useState(new Set());



  // Enhanced search with fuzzy matching
  const searchResults = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return skillsData;

    return skillsData.filter(skill => {
      if (skill.name.toLowerCase().includes(term)) return true;
      if (skill.category.toLowerCase().includes(term)) return true;

      const relatedTerms = {
        'ux': ['user experience', 'user interface', 'design', 'research', 'journey', 'usability', 'persona'],
        'ui': ['interface', 'design', 'visual', 'typography', 'color'],
        'frontend': ['react', 'javascript', 'typescript', 'css', 'html'],
        'backend': ['node', 'python', 'database', 'api'],
      };

      for (const [key, terms] of Object.entries(relatedTerms)) {
        if (term.includes(key)) {
          return terms.some(t => skill.name.toLowerCase().includes(t));
        }
      }
      return false;
    });
  }, [searchTerm, skillsData]);

  const filteredSkills = useMemo(() => {
    const filtered = searchResults.filter(skill =>
      activeCategory === 'all' || skill.category === activeCategory
    );
    return filtered.slice(0, visibleCount);
  }, [searchResults, activeCategory, visibleCount]);

  const totalFilteredSkills = useMemo(() => {
    return searchResults.filter(skill =>
      activeCategory === 'all' || skill.category === activeCategory
    ).length;
  }, [searchResults, activeCategory]);

  const remainingSkills = totalFilteredSkills - visibleCount;

  const categories = useMemo(() => {
    return ['all', ...new Set(skillsData.map(s => s.category))];
  }, []);

  // Intersection observer for gradual reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-skill-card]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredSkills]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const hasMore = remainingSkills > 0;
  //<h2 className={`text-4xl md:text-5xl font-bold mb-4 ${glassStyles.text.primary}`}>
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      {/* Liquid gradient background */}
      {/* in hero sec className="min-h-screen  relative overflow-hidden flex items-center justify-center"*/}
      {/* pausing <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20" />*/}
      <div className="absolute inset-0 bg-slate-950"/>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-800/10 dark:to-purple-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-800/10 dark:to-pink-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl mb-4 ${glassStyles.text.primary}`}>
            {t('skills.title')}
          </h2>
          <p className={`text-lg ${glassStyles.text.secondary}`}>
            {t('skills.subtitle')}
          </p>
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          resultsCount={searchResults.length}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />

          <div className="flex items-center gap-3">
            <SkillCounter
              visible={filteredSkills.length}
              total={totalFilteredSkills}
            />
            <ViewToggle
              viewMode={viewMode}
              onChange={setViewMode}
            />
          </div>
        </div>

        <div className={`
          grid gap-4
          ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}
          ${viewMode === 'compact' ? 'grid-cols-1 md:grid-cols-2' : ''}
          ${viewMode === 'detailed' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
        `}>
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              data-skill-card
              data-index={index}
            >
              <SkillCard
                skill={skill}
                index={index}
                viewMode={viewMode}
                isVisible={visibleItems.has(String(index))}
              />
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 text-center flex flex-row items-center justify-center">
            <button
              onClick={loadMore}
              className={`
                px-6 py-3 rounded-xl flex flex-row items-center justify-center
                ${glassStyles.buttondiscovery}
                ${glassStyles.text.secondary}
                hover:${glassStyles.text.primary}
                transition-all duration-300
              `}
            >
              ✨⃝ ➤ &ensp;
              {tp('skills.counter.remaining', remainingSkills)}
            </button>
          </div>
        )}

        {filteredSkills.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-lg ${glassStyles.text.secondary}`}>
              {t('skills.search.noResults')}
            </p>
          </div>
        )}
      </div>

      <BackToTop targetRef={sectionRef} />
    </section>
  );
};

export default SkillsSection;