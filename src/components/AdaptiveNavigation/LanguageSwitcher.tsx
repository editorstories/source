'use client';

import React from "react";

interface LanguageSwitcherProps {
  currentLocale: string;
//  onLocaleChange: (locale: string) => void;
  onLocaleChange: (locale: "sv" | "en" | "es") => void;
}

export default function LanguageSwitcher({ 
  currentLocale, 
  onLocaleChange 
}: LanguageSwitcherProps) {
//  const languages = [
//    { code: 'sv', label: 'SV' },
//    { code: 'en', label: 'EN' },
//    { code: 'es', label: 'ES' }
//  ];

  const languages = [
    { code: 'sv', label: 'SV' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ] as const;

  return (
    <div 
      className="flex items-center gap-1 text-[10px] font-medium"
      onClick={(e) => e.stopPropagation()}
    >
      {languages.map((lang, idx) => (
        <React.Fragment key={lang.code}>
          <button
            onClick={() => onLocaleChange(lang.code)}
            className={`
              px-1 py-0.5 transition-all duration-200
              ${currentLocale === lang.code 
                ? 'text-emerald-400' 
                : 'text-slate-500 hover:text-slate-300'}
            `}
          >
            {lang.label}
          </button>
          {idx < languages.length - 1 && (
            <span className="text-slate-700">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}