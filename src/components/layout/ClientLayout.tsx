'use client'
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { BaseComponentProps } from '@/types';

interface LayoutProps extends BaseComponentProps {
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  className = ''
}) => {
  const { themeClasses } = useTheme();

  return (
    <div className={`min-h-screen ${themeClasses.background} ${themeClasses.textPrimary}`}>
      <main>
        {children}
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

    </div>
  );
};

export default Layout;

