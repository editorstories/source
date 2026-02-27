// hooks/useSkillAnimation.ts
import { useState, useEffect } from 'react';

export const useSkillAnimation = (isExpanded: boolean, delay = 200) => {
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setSkillsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      setSkillsVisible(false);
    }
  }, [isExpanded, delay]);

  return skillsVisible;
};