// src/context/LanguageContext.tsx
"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/data/translations';

export type Locale = 'sv' | 'en' | 'es';
type Messages = typeof translations.sv;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tp: (key: string, count: number, params?: Record<string, string | number>) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Interpolation helper
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
}

// Pluralization helper
function pluralize(messages: any, key: string, count: number): string {
  const keys = key.split('.');
  let value: any = messages;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key;
  }

  if (typeof value === 'object' && ('zero' in value || 'one' in value || 'other' in value)) {
    const pluralKey = count === 0 ? 'zero' : count === 1 ? 'one' : 'other';
    return value[pluralKey] || value.other || key;
  }

  return key;
}

// Date formatting helper
function formatDate(date: Date, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
  const localeMap: Record<Locale, string> = {
    sv: 'sv-SE',
    en: 'en-US',
    es: 'es-ES'
  };

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat(localeMap[locale], defaultOptions).format(date);
}

// Number formatting helper
function formatNumber(num: number, locale: Locale, options?: Intl.NumberFormatOptions): string {
  const localeMap: Record<Locale, string> = {
    sv: 'sv-SE',
    en: 'en-US',
    es: 'es-ES'
  };

  return new Intl.NumberFormat(localeMap[locale], options).format(num);
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('sv');
  const [isHydrated, setIsHydrated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('language') as Locale;
      if (savedLocale && ['en', 'sv', 'es'].includes(savedLocale)) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('language', locale);
      document.documentElement.lang = locale;
    }
  }, [locale, isHydrated]);

  const setLocale = (newLocale: Locale) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLocaleState(newLocale);
      setIsTransitioning(false);
    }, 150);
  };

  const messages = translations[locale];

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing: ${key} for locale: ${locale}`);
        return key;
      }
    }

    return typeof value === 'string' ? interpolate(value, params) : key;
  };

  const tp = (key: string, count: number, params?: Record<string, string | number>): string => {
    const result = pluralize(messages, key, count);
    return interpolate(result, { count, ...params });
  };

  const formatDateFn = (date: Date, options?: Intl.DateTimeFormatOptions) =>
    formatDate(date, locale, options);

  const formatNumberFn = (num: number, options?: Intl.NumberFormatOptions) =>
    formatNumber(num, locale, options);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t,
    tp,
    formatDate: formatDateFn,
    formatNumber: formatNumberFn
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};