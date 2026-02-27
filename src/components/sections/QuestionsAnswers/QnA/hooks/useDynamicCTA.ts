// src/sections/QnA/hooks/useDynamicCTA.ts
import { useMemo } from 'react';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export const useDynamicCTA = () => {
  return useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const dayIndex = now.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;

    let timeOfDay: TimeOfDay;
    if (hour >= 5 && hour < 12) {
      timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = 'afternoon';
    } else {
      timeOfDay = 'evening';
    }

    return { dayIndex, timeOfDay };
  }, []);
};