'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType, ThemeClasses, ThemeContextType } from '@/types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getThemeClasses = (theme: ThemeType): ThemeClasses => ({
  glass: theme === 'dark'
    ? 'bg-gray-900/10 backdrop-blur-sm border border-gray-700/20'
    : 'bg-white/10 backdrop-blur-sm border border-gray-200/20',
  glassStrong: theme === 'dark'
    ? 'bg-gray-900/80 backdrop-blur-md border border-gray-700/30'
    : 'bg-white/80 backdrop-blur-md border border-gray-200/30',
  textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
  textSecondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
  accent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
  accentHover: theme === 'dark' ? 'hover:text-blue-300' : 'hover:text-blue-700',
  border: theme === 'dark' ? 'border-gray-700/30' : 'border-gray-200/30',
  shadow: theme === 'dark' ? 'shadow-xl shadow-black/20' : 'shadow-xl shadow-gray-900/10',
  background: theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900'
    : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50',
  cardBackground: theme === 'dark'
    ? 'bg-gray-800/50 backdrop-blur-sm'
    : 'bg-white/50 backdrop-blur-sm'
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Start with dark theme as default to prevent hydration mismatch
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated and set actual theme after component mounts
    setIsHydrated(true);

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const newTheme = prefersDark ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isHydrated) {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    }
  };

  const themeClasses = getThemeClasses(theme);

  useEffect(() => {
    if (isHydrated && typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, isHydrated]);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    themeClasses
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};