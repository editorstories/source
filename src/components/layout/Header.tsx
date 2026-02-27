// First, let's create a debugging version to identify the issue
// Add this temporarily to see where headers are being rendered

'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';
import StockholmClock from '@/components/StockholmClock'


interface HeaderProps {
  debugId?: string; // Add this to track multiple instances
}

const Header: React.FC<HeaderProps> = ({ debugId = 'main' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme, themeClasses } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Debug logging to track multiple instances
  useEffect(() => {
    console.log(`Header instance "${debugId}" mounted`);
    return () => {
      console.log(`Header instance "${debugId}" unmounted`);
    };
  }, [debugId]);

  // Memoize navigation items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.contact', href: '#contact' }
  ], []);

  const languageLabels = useMemo(() => ({
    sv: 'SV',
    eu: 'EU',
    cas: 'CAS'
  }), []);

  const forceCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);

    if (isMenuOpen) {
      forceCloseMenu();
    }
  }, [isMenuOpen, forceCloseMenu]);

  useEffect(() => {
    // Only add scroll listener for the main header to prevent conflicts
    if (debugId === 'main') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, debugId]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const nav = document.querySelector(`nav[data-header="${debugId}"]`);
      const mobileMenu = document.querySelector(`[data-mobile-menu="${debugId}"]`);

      if (!nav?.contains(target) && !mobileMenu?.contains(target)) {
        forceCloseMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        forceCloseMenu();
      }
    };

    document.body.style.overflow = 'hidden';

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, forceCloseMenu, debugId]);

  const scrollToSection = useCallback((href: string) => {
    forceCloseMenu();

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }, [forceCloseMenu]);

  const toggleLanguage = useCallback(() => {
    const languages: Language[] = ['sv', 'eu','cas'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLanguage = languages[nextIndex];

    console.log(`Language toggle from ${debugId}:`, language, '->', newLanguage);
    setLanguage(newLanguage);
  }, [language, setLanguage, debugId]);

  const getLanguageLabel = useCallback((lang: Language): string => {
    return languageLabels[lang];
  }, [languageLabels]);

  return (
    <>
      {/* Header with debug identifier */}
      <header
        data-header={debugId}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? themeClasses.glassStrong : 'bg-transparent'
        }`}
      >
        <nav data-header={debugId} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with debug info */}
            <div className={`font-bold text-lg sm:text-xl ${themeClasses.textPrimary} z-10`}>
              Portfolio {process.env.NODE_ENV === 'development' && (
                <span className="text-xs opacity-50">({debugId})</span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 z-10">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`${themeClasses.textPrimary} ${themeClasses.accentHover}
                            transition-colors duration-200 text-sm font-medium
                            hover:scale-105 active:scale-95`}
                >
                  {t(item.key)}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4 z-20">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg ${themeClasses.glass}
                          ${themeClasses.textPrimary} ${themeClasses.accentHover}
                          transition-all duration-200 font-medium text-sm
                          hover:scale-105 active:scale-95 min-w-[60px] justify-center`}
                aria-label={`Current language: ${getLanguageLabel(language)}`}
              >
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span className="font-semibold select-none">
                  {getLanguageLabel(language)}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${themeClasses.glass} ${themeClasses.textPrimary}
                          ${themeClasses.accentHover} transition-all duration-200
                          hover:scale-105 active:scale-95`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${themeClasses.glass} ${themeClasses.textPrimary}
                          ${themeClasses.accentHover} transition-all duration-200
                          hover:scale-105 active:scale-95`}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={forceCloseMenu}
        >
          <div
            data-mobile-menu={debugId}
            className={`fixed top-20 left-4 right-4 max-w-sm mx-auto z-50
                       ${themeClasses.glassStrong} rounded-lg shadow-2xl
                       transform transition-all duration-300 ease-out ${
                         isMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                       }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left py-3 px-4 rounded-lg ${themeClasses.textPrimary}
                              ${themeClasses.accentHover} transition-all duration-200 text-base font-medium
                              hover:${themeClasses.glass} transform hover:translate-x-2
                              animate-in slide-in-from-left-4 duration-300`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {t(item.key)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;