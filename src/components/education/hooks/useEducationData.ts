// hooks/useEducationData.ts
import { useMemo } from 'react';
import { Education, SkillsByCategory, SkillCategorySummary } from '../types/types';
import { educationData, getTotalStats, validateEducationData } from '../data/educationData';
import { useLanguage } from '@/context/LanguageContext';
interface UseEducationDataReturn {
  allEducation: Education[];
  skillsByCategory: SkillsByCategory;
  topSkills: SkillCategorySummary[];
  totalStats: ReturnType<typeof getTotalStats>;
  isDataValid: boolean;
}

export const useEducationData = (): UseEducationDataReturn => {
  // Validate data integrity
  const isDataValid = useMemo(() => validateEducationData(), []);

  const { t } = useLanguage();

  // Memoize education data for immutability
//  const allEducation = useMemo(() => [...educationData], []);
  const allEducation = useMemo(() =>
    educationData.map(edu => ({
      ...edu,
      degree: t(edu.degree),
      narrative: t(edu.narrative),
      periods: edu.periods.map(p => ({ ...p, phase: t(p.phase) })),
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]  // re-memoize när språket byts
  );

  // Optimized skills categorization
  const skillsByCategory = useMemo(() => {
    if (!allEducation.length) return {};

    const categorized: SkillsByCategory = {};

    allEducation.forEach(edu => {
      edu.skills?.forEach(skill => {
        if (!categorized[skill.category]) {
          categorized[skill.category] = [];
        }
        categorized[skill.category].push(skill);
      });
    });

    return categorized;
  }, [allEducation]);

  // Enhanced top skills calculation with error handling
  const topSkills = useMemo(() => {
    if (!skillsByCategory || Object.keys(skillsByCategory).length === 0) {
      return [];
    }

    return Object.entries(skillsByCategory)
      .map(([category, skills]) => ({
        category,
        avgLevel: skills.length > 0
          ? Math.round((skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length) * 100) / 100
          : 0,
        count: skills.length,
        skills: skills
          .sort((a, b) => b.level - a.level)
          .slice(0, 3)
      }))
      .filter(categoryData => categoryData.count > 0)
      .sort((a, b) => b.avgLevel - a.avgLevel);
  }, [skillsByCategory]);

  // Memoized total stats
  const totalStats = useMemo(() => getTotalStats(), []);

  return {
    allEducation,
    skillsByCategory,
    topSkills,
    totalStats,
    isDataValid
  };
};