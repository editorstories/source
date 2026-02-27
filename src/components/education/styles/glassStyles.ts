// styles/glassStyles.ts
//import { GlassStyles } from '../types/education.types';
import { GlassStyles } from '../types/types';

export const glassStyles: GlassStyles = {
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
  badge: `
    backdrop-blur-sm bg-white/10 dark:bg-gray-800/10
    border border-white/20 dark:border-gray-700/20
    px-2 py-1 rounded-lg text-xs
  `,
  text: {
    primary: 'text-gray-800/90 dark:text-gray-100/90',
    secondary: 'text-gray-600/70 dark:text-gray-400/70',
    muted: 'text-gray-500/50 dark:text-gray-500/50'
  }
};

// Utility functions for dynamic styling
export const getComplexityStyles = (complexity: string) => {
  switch (complexity) {
    case 'high':
      return {
        color: 'border-red-500/30',
        animation: 'animate-pulse'
      };
    case 'medium':
      return {
        color: 'border-yellow-500/30',
        animation: ''
      };
    case 'low':
      return {
        color: 'border-green-500/30',
        animation: ''
      };
    default:
      return {
        color: 'border-gray-500/30',
        animation: ''
      };
  }
};

export const getImpactStyles = (impact: number) => {
  if (impact >= 90) {
    return 'from-green-500 to-emerald-500';
  } else if (impact >= 80) {
    return 'from-blue-500 to-cyan-500';
  } else if (impact >= 70) {
    return 'from-yellow-500 to-orange-500';
  } else {
    return 'from-gray-500 to-gray-600';
  }
};

import { Code, Server, Palette, Search, Smartphone, Database, Users, Wrench, Circle } from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  const iconMap = {
    frontend: Code,
    backend: Server,
    design: Palette,
    research: Search,
    mobile: Smartphone,
    database: Database,
    ux: Users,
    tools: Wrench
  };
  return iconMap[category as keyof typeof iconMap] || Circle;
};

// Animation utilities
export const createAnimationDelay = (index: number, baseDelay = 50) => {
  return `${index * baseDelay}ms`;
};

export const getCardTransition = (viewMode: string) => {
  const transitions = {
    network: 'transform transition-all duration-500 hover:scale-[1.02]',
    impact: 'transform transition-all duration-500 hover:scale-[1.02]',
    skills: 'transform transition-all duration-500 hover:shadow-xl',
    timeline: 'transform transition-all duration-500 hover:translate-x-1'
  };
  return transitions[viewMode as keyof typeof transitions] || transitions.network;
};