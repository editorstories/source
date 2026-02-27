import React from 'react';
import { LanguageSwitcherProps } from '../types';
import { glassStyles } from '../config';

// ============================================
// 🌐 LANGUAGE SWITCHER COMPONENT
// ============================================

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  setLanguage
}) => {
  const languages = [
    { code: 'sv', label: 'Svenska' },
    { code: 'eu', label: 'Europe' },
    { code: 'cas', label: 'Castellano' }
  ];

  return (
    <div className={`flex gap-2 ${glassStyles.card} rounded-xl p-1`}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-4 py-2 rounded-lg text-sm transition-all duration-300
            ${language === lang.code
              ? 'bg-white/10 dark:bg-gray-700/10 ' + glassStyles.text.primary
              : glassStyles.text.secondary + ' hover:bg-white/5'
            }
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};