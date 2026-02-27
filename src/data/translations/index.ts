// src/data/translations/index.ts

import { sv } from './sv';
import { en } from './en';
import { es } from './es';

export const translations = {
  sv,
  en,
  es
};

export type TranslationKey = keyof typeof sv;
export type LocaleKey = keyof typeof translations;