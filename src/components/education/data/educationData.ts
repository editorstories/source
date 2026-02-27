// data/educationData.ts

import { Education } from '../types/types';

// Impact-formel: baseras på antal kurser, komplexitet och bredden av skills
// high complexity = 1.3x, medium = 1.0x, low = 0.7x
// cap 100
export const educationData: Education[] = [
  {
    id: 'BTH',
    institution: 'Blekinge tekniska högskola',
    degree: 'education.BTH.degree',
    periods: [
      { start: '2021-09', end: '2022-05', phase: 'education.BTH.phase1' },
      { start: '2022-09', end: '2024-05', phase: 'education.BTH.phase2' }
    ],
    location: 'Blekinge',
    type: 'university',
    impact: 65, // 3 kurser × medium komplexitet, stark koppling till React, UX, mobil
    complexity: 'medium',
    courses: ['Visuell design och programmering', 'Produkthantering och kravhantering för digitala miljöer', 'Utveckling av plattformsoberoende mobilapplikationer'],
    skills: [
      { name: 'React', level: 80, category: 'frontend', impact: 'high' },
      { name: 'React Native', level: 75, category: 'mobile', impact: 'high' },
      { name: 'TypeScript', level: 70, category: 'frontend', impact: 'medium' },
      { name: 'User Experience Design', level: 72, category: 'uxui', impact: 'high' },
      { name: 'Wireframing', level: 68, category: 'uxui', impact: 'medium' },
      { name: 'Prototyping (Low-fi)', level: 65, category: 'uxui', impact: 'medium' },
    ],
    narrative: 'education.BTH.narrative',
    color: '#A31F34',
    connections: ['KAU', 'HiG']
  },
  {
    id: 'HB',
    institution: 'Högskolan i Borås',
    degree: 'education.HB.degree',
    periods: [
      { start: '2023-09', end: '2026-06', phase: 'education.HB.phase1' }
    ],
    location: 'Borås',
    type: 'university',
    impact: 95, // 11 kurser × high komplexitet, bredaste UX-programmet
    complexity: 'high',
    courses: [
      'Interaktionsdesign & UX', 'informationsvetenskap och informationsdesign',
      'frontendutveckling', 'Grafisk informationsdesign', 'Multimodal informationsdesign',
      'Fördjupad frontendutveckling', 'Teori och metod', 'Content Management',
      'Informationspolitik och etik', 'Digitala texter', 'Projektarbete: UX-design'
    ],
    skills: [
      { name: 'User Experience Design', level: 92, category: 'uxui', impact: 'high' },
      { name: 'Interaction Design', level: 89, category: 'uxui', impact: 'high' },
      { name: 'Information Architecture', level: 85, category: 'uxui', impact: 'high' },
      { name: 'Design Thinking', level: 88, category: 'uxui', impact: 'high' },
      { name: 'User Research', level: 85, category: 'uxui', impact: 'high' },
      { name: 'Prototyping (High-fi)', level: 87, category: 'uxui', impact: 'high' },
      { name: 'Prototyping (Low-fi)', level: 90, category: 'uxui', impact: 'medium' },
      { name: 'UX Writing', level: 80, category: 'uxui', impact: 'medium' },
      { name: 'Typography', level: 82, category: 'uxui', impact: 'medium' },
      { name: 'HTML5', level: 88, category: 'frontend', impact: 'medium' },
      { name: 'CSS3', level: 85, category: 'frontend', impact: 'medium' },
    ],
    narrative: 'education.HB.narrative',
    color: '#0EA5E9',
    connections: ['SH', 'Hkr']
  },
  {
    id: 'HiG',
    institution: 'Högskolan i Gävle',
    degree: 'education.HiG.degree',
    periods: [
      { start: '2013-01', end: '2013-06', phase: 'education.HiG.phase1' }
    ],
    location: 'Gävle',
    type: 'university',
    impact: 45, // 1 kurs, high komplexitet men kort period
    complexity: 'high',
    courses: ['Programmering i Java'],
    skills: [
      { name: 'Java', level: 70, category: 'backend', impact: 'high' },
    ],
    narrative: 'education.HiG.narrative',
    color: '#10B981',
    connections: ['KAU']
  },
  {
    id: 'Hkr',
    institution: 'Högskolan Kristianstad',
    degree: 'education.Hkr.degree',
    periods: [
      { start: '2021-01', end: '2024-06', phase: 'education.Hkr.phase1' }
    ],
    location: 'Kristianstad',
    type: 'university',
    impact: 70, // 4 kurser × medium, bra spridning UX + JS + säkerhet + mobil
    complexity: 'medium',
    courses: ['Att designa digitala upplevelser', 'Datasäkerhet', 'JavaScript för webbutveckling', 'Spelutveckling för Android'],
    skills: [
      { name: 'User Experience Design', level: 75, category: 'uxui', impact: 'high' },
      { name: 'User Journey Mapping', level: 72, category: 'uxui', impact: 'high' },
      { name: 'Usability Testing', level: 68, category: 'uxui', impact: 'medium' },
      { name: 'JavaScript', level: 78, category: 'frontend', impact: 'high' },
      { name: 'Android Development', level: 60, category: 'mobile', impact: 'medium' },
    ],
    narrative: 'education.Hkr.narrative',
    color: '#F59E0B',
    connections: ['HB', 'SH']
  },
  {
    id: 'KAU',
    institution: 'Karlstads universitet',
    degree: 'education.KAU.degree',
    periods: [
      { start: '2021-01', end: '2024-12', phase: 'education.KAU.phase1' }
    ],
    location: 'Karlstad',
    type: 'university',
    impact: 60, // 3 kurser × low komplexitet men lång period, testning viktigt
    complexity: 'low',
    courses: ['Tillämpad programmering', 'Mjukvarutestning', 'Integritetsteknik'],
    skills: [
      { name: 'Jest', level: 70, category: 'tools', impact: 'high' },
      { name: 'Cypress', level: 65, category: 'tools', impact: 'medium' },
      { name: 'JavaScript', level: 72, category: 'frontend', impact: 'medium' },
      { name: 'Scientific Method', level: 68, category: 'soft', impact: 'medium' },
    ],
    narrative: 'education.KAU.narrative',
    color: '#8B5CF6',
    connections: ['HiG']
  },
  {
    id: 'KTH',
    institution: 'Kungl. Tekniska högskolan',
    degree: 'education.KTH.degree',
    periods: [
      { start: '2025-01', end: '2025-06', phase: 'education.KTH.phase1' }
    ],
    location: 'Stockholm',
    type: 'university',
    impact: 30, // 1 kurs, low komplexitet, men unik AI-inriktning
    complexity: 'low',
    courses: ['Generativ AI för medieteknik och interaktionsdesign'],
    skills: [
      { name: 'Artificial Intelligence (AI)', level: 40, category: 'ai', impact: 'high' },
      { name: 'Interaction Design', level: 55, category: 'uxui', impact: 'medium' },
    ],
    narrative: 'education.KTH.narrative',
    color: '#EC4899',
    connections: ['SH']
  },
  {
    id: 'LIU',
    institution: 'Linköpings universitet',
    degree: 'education.LIU.degree',
    periods: [
      { start: '2020-01', end: '2023-06', phase: 'education.LIU.phase1' }
    ],
    location: 'Linköping',
    type: 'university',
    impact: 30, // 2 kurser × low, säkerhet + AI intro
    complexity: 'low',
    courses: ['AI', 'Datasäkerhet'],
    skills: [
      { name: 'Artificial Intelligence (AI)', level: 30, category: 'ai', impact: 'medium' },
      { name: 'Data-driven Decisions', level: 50, category: 'soft', impact: 'medium' },
    ],
    narrative: 'education.LIU.narrative',
    color: '#06B6D4',
    connections: ['Hkr']
  },
  {
    id: 'Lnu',
    institution: 'Linnéuniversitetet',
    degree: 'education.Lnu.degree',
    periods: [
      { start: '2022-01', end: '2023-06', phase: 'education.Lnu.phase1' }
    ],
    location: 'Växjö',
    type: 'university',
    impact: 55, // 3 kurser × medium, Flutter unik skill
    complexity: 'medium',
    courses: ['Systemtänkande', 'Multimediedesign och produktion', 'Apputveckling med Flutter'],
    skills: [
      { name: 'Flutter', level: 70, category: 'mobile', impact: 'high' },
      { name: 'Adobe Creative Suite', level: 65, category: 'uxui', impact: 'medium' },
      { name: 'Animation & Micro-interactions', level: 60, category: 'uxui', impact: 'medium' },
      { name: 'Cross-functional Collaboration', level: 62, category: 'soft', impact: 'medium' },
    ],
    narrative: 'education.Lnu.narrative',
    color: '#F97316',
    connections: ['HB', 'BTH']
  },
  {
    id: 'Ltu',
    institution: 'Luleå tekniska universitet',
    degree: 'education.Ltu.degree',
    periods: [
      { start: '2013-01', end: '2023-06', phase: 'education.Ltu.phase1' }
    ],
    location: 'Luleå',
    type: 'university',
    impact: 80, // 6 kurser × high komplexitet, bred spridning inkl databaser + Java + spel
    complexity: 'high',
    courses: ['Speldesign', 'Datorspelsproduktion', 'Datorspelsskapande', 'Java', 'Knowledge Management', 'Databaser'],
    skills: [
      { name: 'Java', level: 78, category: 'backend', impact: 'high' },
      { name: 'PostgreSQL', level: 72, category: 'backend', impact: 'high' },
      { name: 'MySQL', level: 70, category: 'backend', impact: 'medium' },
      { name: 'Design Thinking', level: 65, category: 'uxui', impact: 'medium' },
      { name: 'Projektledning', level: 68, category: 'soft', impact: 'medium' },
    ],
    narrative: 'education.Ltu.narrative',
    color: '#EF4444',
    connections: ['KAU', 'HB', 'Hkr']
  },
  {
    id: 'MAU',
    institution: 'Malmö universitet',
    degree: 'education.MAU.degree',
    periods: [
      { start: '2013-01', end: '2022-06', phase: 'education.MAU.phase1' }
    ],
    location: 'Malmö',
    type: 'university',
    impact: 35, // 2 kurser × low, C# + innovation
    complexity: 'low',
    courses: ['Programming Using C#', 'Digital innovation och entreprenörskap'],
    skills: [
      { name: 'C#', level: 65, category: 'backend', impact: 'high' },
      { name: '.NET Core', level: 55, category: 'backend', impact: 'medium' },
      { name: 'Anpassningsförmåga', level: 70, category: 'soft', impact: 'medium' },
    ],
    narrative: 'education.MAU.narrative',
    color: '#84CC16',
    connections: ['KAU', 'Hkr']
  },
  {
    id: 'MIUN',
    institution: 'Mittuniversitetet',
    degree: 'education.MIUN.degree',
    periods: [
      { start: '2022-01', end: '2024-06', phase: 'education.MIUN.phase1' }
    ],
    location: 'Sundsvall',
    type: 'university',
    impact: 30, // 2 kurser × low
    complexity: 'low',
    courses: ['Datavetenskap XML', 'Informatik AV, Innovativa digitala lösningar'],
    skills: [
      { name: 'REST APIs', level: 55, category: 'backend', impact: 'medium' },
      { name: 'Kritiskt tänkande', level: 65, category: 'soft', impact: 'medium' },
    ],
    narrative: 'education.MIUN.narrative',
    color: '#14B8A6',
    connections: ['KAU', 'HiG']
  },
  {
    id: 'SH',
    institution: 'Södertörns högskola',
    degree: 'education.SH.degree',
    periods: [
      { start: '2011-01', end: '2026-01', phase: 'education.SH.phase1' }
    ],
    location: 'Stockholm',
    type: 'university',
    impact: 88, // 10 kurser × high, längsta perioden, stark design + MDI
    complexity: 'high',
    courses: [
      'Mobila tjänster och gränssnitt', 'Digital grafik och illustration',
      'Utmaningsdriven innovation med Design Thinking', 'Webbproduktion',
      'Mediedesign', 'Grafisk design', 'Ljud och rörlig bild',
      'Multimodal gestaltning', 'Interaktionsdesign', 'Människa-datorinteraktion'
    ],
    skills: [
      { name: 'Interaction Design', level: 88, category: 'uxui', impact: 'high' },
      { name: 'Design Thinking', level: 85, category: 'uxui', impact: 'high' },
      { name: 'Color Theory', level: 82, category: 'uxui', impact: 'medium' },
      { name: 'Typography', level: 84, category: 'uxui', impact: 'medium' },
      { name: 'Design Systems', level: 80, category: 'uxui', impact: 'high' },
      { name: 'Adobe Creative Suite', level: 78, category: 'uxui', impact: 'medium' },
      { name: 'HTML5', level: 85, category: 'frontend', impact: 'medium' },
      { name: 'CSS3', level: 82, category: 'frontend', impact: 'medium' },
      { name: 'Mobile UX Patterns', level: 78, category: 'mobile', impact: 'medium' },
      { name: 'Animation & Micro-interactions', level: 72, category: 'uxui', impact: 'medium' },
    ],
    narrative: 'education.SH.narrative',
    color: '#6366F1',
    connections: ['KAU', 'HB', 'Hkr']
  },
  {
    id: 'UU',
    institution: 'Uppsala universitet',
    degree: 'education.UU.degree',
    periods: [
      { start: '2020-01', end: '2020-08', phase: 'education.UU.phase1' }
    ],
    location: 'Uppsala',
    type: 'university',
    impact: 25, // 1 kurs × medium, kort period, systemnivå C++
    complexity: 'medium',
    courses: ['Datorer och programmering C++'],
    skills: [
      { name: 'Kritiskt tänkande', level: 60, category: 'soft', impact: 'medium' },
    ],
    narrative: 'education.UU.narrative',
    color: '#D946EF',
    connections: ['HiG', 'KAU']
  }
];

// ─── Utility functions ───────────────────────────────────────────────────────

export const getEducationById = (id: string): Education | undefined =>
  educationData.find(edu => edu.id === id);

export const getEducationByType = (type: string): Education[] =>
  educationData.filter(edu => edu.type === type);

export const getSortedEducationByImpact = (): Education[] =>
  [...educationData].sort((a, b) => b.impact - a.impact);

export const getSortedEducationByTimeline = (): Education[] =>
  [...educationData].sort((a, b) => {
    const aStart = new Date(a.periods[0]?.start || '1970-01-01');
    const bStart = new Date(b.periods[0]?.start || '1970-01-01');
    return aStart.getTime() - bStart.getTime();
  });

export const getSortedEducationBySkills = (): Education[] =>
  [...educationData].sort((a, b) => {
    const avg = (skills: typeof a.skills) =>
      skills.length > 0 ? skills.reduce((sum, s) => sum + s.level, 0) / skills.length : 0;
    return avg(b.skills) - avg(a.skills);
  });

export const getSortedEducationByComplexity = (): Education[] => {
  const order = { high: 3, medium: 2, low: 1 };
  return [...educationData].sort((a, b) => {
    const diff = order[b.complexity] - order[a.complexity];
    return diff !== 0 ? diff : b.impact - a.impact;
  });
};

export const getTotalStats = () => ({
  totalInstitutions: educationData.length,
  totalCourses: educationData.reduce((acc, edu) => acc + edu.courses.length, 0),
  totalSkills: educationData.reduce((acc, edu) => acc + edu.skills.length, 0),
  totalPhases: educationData.reduce((acc, edu) => acc + edu.periods.length, 0),
  averageImpact: educationData.length > 0
    ? Math.round(educationData.reduce((acc, edu) => acc + edu.impact, 0) / educationData.length)
    : 0
});

export const validateEducationData = (): boolean => {
  if (!Array.isArray(educationData) || educationData.length === 0) {
    console.warn('Education data is empty or invalid');
    return false;
  }
  const requiredFields = ['id', 'institution', 'degree', 'periods', 'type'];
  return educationData.every(edu => requiredFields.every(field => field in edu));
};

export const EDUCATION_DATA_LENGTH = educationData.length;