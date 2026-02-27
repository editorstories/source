'use client'
import React, {useState} from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Layout from '@/components/layout/ClientLayout';
import SkillsSection from '@/components/sections/SkillsSection';
import QnASection from '@/components/sections/QuestionsAnswers/QnASection';
import  EducationSection from '@/components/education';
import HeroSection from '@/components/HeroSection/HeroSection'
import SomnloggPresentation from '@/components/case/SomnloggPresentation'
import SectionLabel from '@/components/case/SectionLabel'
import AdaptiveNavigation from '../components/AdaptiveNavigation';
import StockholmClock from '@/components/StockholmClock'


const App: React.FC = () => {
  const [somnloggTheme, setSomnloggTheme] = useState<'morning' | 'evening'>('evening');

  const handleSomnloggThemeChange = (themeName: 'morning' | 'evening') => {
    console.log('🎨 App received theme change:', themeName);
    setSomnloggTheme(themeName);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout>
          <AdaptiveNavigation somnloggTheme={somnloggTheme} />
          {/*<div className="z-0 hittamig" >*/}
          {/*  <AdaptiveNavigation somnloggTheme={somnloggTheme} />*/}
          {/*</div>*/}
          <StockholmClock language="sv" />
          <section id="hero" className={'bg-slate-950'}>
            <HeroSection/>
          </section>
          <section id="skills" className={'bg-slate-950'}>
            <SkillsSection />
          </section>
          <section id="somnlogg" className="somnlogg-section bg-slate-950 relative">
            <SectionLabel sectionId="somnlogg" />
            <SomnloggPresentation onThemeChange={handleSomnloggThemeChange} />
          </section>
          <section id="education" className={'bg-slate-950'}>
            <EducationSection/>
          </section>
          <section id="qna" className={'bg-slate-950'}>
            <QnASection/>
          </section>
          {/*Footer*/}
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;