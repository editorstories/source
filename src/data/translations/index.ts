// src/data/translations/index.ts

import { sv } from './sv';
import { eu } from './eu';
import { cas } from './cas';

export const translations = {
  sv,
  eu,
  cas
};

export type TranslationKey = keyof typeof sv;
export type LocaleKey = keyof typeof translations;