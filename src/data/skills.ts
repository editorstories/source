import { Skill } from '@/types';

// ─── Typ för lokaliserade namn ────────────────────────────────────────────────
export interface LocalizedSkill extends Omit<Skill, 'name'> {
  key: string;        // unik nyckel, används för matchning mot educationData
  name: string;       // visningsnamn (sätts dynamiskt via getLocalizedSkills)
}

// ─── Master skill-lista med nycklar ──────────────────────────────────────────
// name = engelska som bas, lokaliseras via getLocalizedSkills(t)
const skillsMaster: (Omit<LocalizedSkill, 'name'> & { nameKey: string })[] = [
  // UX/UI Design & Research
  { key: 'User Experience Design',        nameKey: 'skills.list.uxDesign',            level: 92, category: 'uxui',     color: '#FF6B6B' },
  { key: 'User Interface Design',         nameKey: 'skills.list.uiDesign',            level: 90, category: 'uxui',     color: '#4ECDC4' },
  { key: 'Design Thinking',               nameKey: 'skills.list.designThinking',      level: 88, category: 'uxui',     color: '#45B7D1' },
  { key: 'User Research',                 nameKey: 'skills.list.userResearch',        level: 85, category: 'uxui',     color: '#96CEB4' },
  { key: 'Prototyping (Low-fi)',          nameKey: 'skills.list.protoLow',            level: 90, category: 'uxui',     color: '#FFEAA7' },
  { key: 'Prototyping (High-fi)',         nameKey: 'skills.list.protoHigh',           level: 87, category: 'uxui',     color: '#DDA0DD' },
  { key: 'Usability Testing',             nameKey: 'skills.list.usabilityTesting',    level: 82, category: 'uxui',     color: '#98D8C8' },
  { key: 'A/B Testing',                   nameKey: 'skills.list.abTesting',           level: 78, category: 'uxui',     color: '#F7DC6F' },
  { key: 'UX Writing',                    nameKey: 'skills.list.uxWriting',           level: 80, category: 'uxui',     color: '#BB8FCE' },
  { key: 'Information Architecture',      nameKey: 'skills.list.infoArch',            level: 85, category: 'uxui',     color: '#85C1E9' },
  { key: 'Wireframing',                   nameKey: 'skills.list.wireframing',         level: 88, category: 'uxui',     color: '#F8C471' },
  { key: 'User Journey Mapping',          nameKey: 'skills.list.journeyMapping',      level: 86, category: 'uxui',     color: '#82E0AA' },
  { key: 'Persona Development',           nameKey: 'skills.list.personaDev',          level: 84, category: 'uxui',     color: '#F1948A' },
  { key: 'Survey Design',                 nameKey: 'skills.list.surveyDesign',        level: 75, category: 'uxui',     color: '#AED6F1' },
  { key: 'Accessibility (WCAG)',          nameKey: 'skills.list.accessibility',       level: 80, category: 'uxui',     color: '#D7BDE2' },
  { key: 'Design Systems',               nameKey: 'skills.list.designSystems',       level: 87, category: 'uxui',     color: '#A3E4D7' },
  { key: 'Typography',                    nameKey: 'skills.list.typography',          level: 85, category: 'uxui',     color: '#F9E79F' },
  { key: 'Color Theory',                  nameKey: 'skills.list.colorTheory',         level: 83, category: 'uxui',     color: '#FADBD8' },
  { key: 'Interaction Design',            nameKey: 'skills.list.interactionDesign',   level: 89, category: 'uxui',     color: '#D5A6BD' },
  { key: 'Animation & Micro-interactions',nameKey: 'skills.list.animation',           level: 78, category: 'uxui',     color: '#C39BD3' },
  { key: 'Usability Evaluation',          nameKey: 'skills.list.usabilityEval',       level: 60, category: 'uxui',     color: '#06B6D4' },
  { key: 'Figma',                         nameKey: 'skills.list.figma',               level: 92, category: 'uxui',     color: '#F24E1E' },
  { key: 'Adobe XD',                      nameKey: 'skills.list.adobeXd',             level: 78, category: 'uxui',     color: '#FF61F6' },
  { key: 'Sketch',                        nameKey: 'skills.list.sketch',              level: 75, category: 'uxui',     color: '#FDAD00' },
  { key: 'Adobe Creative Suite',          nameKey: 'skills.list.adobeSuite',          level: 80, category: 'uxui',     color: '#DA1F26' },
  { key: 'Principle',                     nameKey: 'skills.list.principle',           level: 70, category: 'uxui',     color: '#5B57A2' },
  { key: 'InVision',                      nameKey: 'skills.list.invision',            level: 72, category: 'uxui',     color: '#FF3366' },
  { key: 'Miro/Mural',                   nameKey: 'skills.list.miro',                level: 85, category: 'uxui',     color: '#050038' },

  // Frontend
  { key: 'React',                         nameKey: 'skills.list.react',               level: 95, category: 'frontend', color: '#61DAFB' },
  { key: 'TypeScript',                    nameKey: 'skills.list.typescript',          level: 90, category: 'frontend', color: '#3178C6' },
  { key: 'JavaScript',                    nameKey: 'skills.list.javascript',          level: 95, category: 'frontend', color: '#F7DF1E' },
  { key: 'Next.js',                       nameKey: 'skills.list.nextjs',              level: 85, category: 'frontend', color: '#000000' },
  { key: 'Vue.js',                        nameKey: 'skills.list.vuejs',               level: 80, category: 'frontend', color: '#4FC08D' },
  { key: 'Angular',                       nameKey: 'skills.list.angular',             level: 75, category: 'frontend', color: '#DD0031' },
  { key: 'Svelte',                        nameKey: 'skills.list.svelte',              level: 70, category: 'frontend', color: '#FF3E00' },
  { key: 'HTML5',                         nameKey: 'skills.list.html5',               level: 95, category: 'frontend', color: '#E34F26' },
  { key: 'CSS3',                          nameKey: 'skills.list.css3',                level: 90, category: 'frontend', color: '#1572B6' },
  { key: 'Tailwind CSS',                  nameKey: 'skills.list.tailwind',            level: 90, category: 'frontend', color: '#06B6D4' },
  { key: 'Sass/SCSS',                    nameKey: 'skills.list.sass',                level: 85, category: 'frontend', color: '#CC6699' },
  { key: 'Material-UI',                  nameKey: 'skills.list.mui',                 level: 85, category: 'frontend', color: '#007FFF' },
  { key: 'Styled Components',            nameKey: 'skills.list.styledComponents',    level: 80, category: 'frontend', color: '#DB7093' },
  { key: 'Web Performance',              nameKey: 'skills.list.webPerf',             level: 82, category: 'frontend', color: '#00D2FF' },
  { key: 'Progressive Web Apps',         nameKey: 'skills.list.pwa',                 level: 78, category: 'frontend', color: '#5A0FC8' },

  // Backend
  { key: 'Node.js',                       nameKey: 'skills.list.nodejs',              level: 88, category: 'backend',  color: '#339933' },
  { key: 'Express.js',                    nameKey: 'skills.list.express',             level: 85, category: 'backend',  color: '#000000' },
  { key: 'Python',                        nameKey: 'skills.list.python',              level: 82, category: 'backend',  color: '#3776AB' },
  { key: 'Django',                        nameKey: 'skills.list.django',              level: 78, category: 'backend',  color: '#092E20' },
  { key: 'FastAPI',                       nameKey: 'skills.list.fastapi',             level: 80, category: 'backend',  color: '#009688' },
  { key: 'Rust',                          nameKey: 'skills.list.rust',                level: 75, category: 'backend',  color: '#000000' },
  { key: 'Go',                            nameKey: 'skills.list.go',                  level: 70, category: 'backend',  color: '#00ADD8' },
  { key: 'Java',                          nameKey: 'skills.list.java',                level: 78, category: 'backend',  color: '#ED8B00' },
  { key: 'Spring Boot',                   nameKey: 'skills.list.springBoot',          level: 75, category: 'backend',  color: '#6DB33F' },
  { key: 'C#',                            nameKey: 'skills.list.csharp',              level: 72, category: 'backend',  color: '#239120' },
  { key: '.NET Core',                    nameKey: 'skills.list.dotnet',              level: 70, category: 'backend',  color: '#512BD4' },
  { key: 'PHP',                           nameKey: 'skills.list.php',                 level: 68, category: 'backend',  color: '#777BB4' },
  { key: 'PostgreSQL',                    nameKey: 'skills.list.postgresql',          level: 85, category: 'backend',  color: '#4169E1' },
  { key: 'MongoDB',                       nameKey: 'skills.list.mongodb',             level: 82, category: 'backend',  color: '#47A248' },
  { key: 'MySQL',                         nameKey: 'skills.list.mysql',               level: 80, category: 'backend',  color: '#4479A1' },
  { key: 'Redis',                         nameKey: 'skills.list.redis',               level: 75, category: 'backend',  color: '#DC382D' },
  { key: 'GraphQL',                       nameKey: 'skills.list.graphql',             level: 80, category: 'backend',  color: '#E10098' },
  { key: 'REST APIs',                    nameKey: 'skills.list.restApi',             level: 90, category: 'backend',  color: '#02569B' },
  { key: 'Microservices',               nameKey: 'skills.list.microservices',       level: 75, category: 'backend',  color: '#FF6B35' },

  // Mobile
  { key: 'React Native',                 nameKey: 'skills.list.reactNative',         level: 85, category: 'mobile',   color: '#61DAFB' },
  { key: 'Flutter',                       nameKey: 'skills.list.flutter',             level: 78, category: 'mobile',   color: '#02569B' },
  { key: 'Swift',                         nameKey: 'skills.list.swift',               level: 72, category: 'mobile',   color: '#FA7343' },
  { key: 'Kotlin',                        nameKey: 'skills.list.kotlin',              level: 75, category: 'mobile',   color: '#7F52FF' },
  { key: 'iOS Development',              nameKey: 'skills.list.ios',                 level: 70, category: 'mobile',   color: '#000000' },
  { key: 'Android Development',          nameKey: 'skills.list.android',             level: 75, category: 'mobile',   color: '#3DDC84' },
  { key: 'Expo',                          nameKey: 'skills.list.expo',                level: 80, category: 'mobile',   color: '#000020' },
  { key: 'Xamarin',                       nameKey: 'skills.list.xamarin',             level: 65, category: 'mobile',   color: '#3498DB' },
  { key: 'Mobile UX Patterns',           nameKey: 'skills.list.mobileUx',            level: 82, category: 'mobile',   color: '#FF9500' },

  // Tools
  { key: 'Git',                           nameKey: 'skills.list.git',                 level: 92, category: 'tools',    color: '#F05032' },
  { key: 'Docker',                        nameKey: 'skills.list.docker',              level: 85, category: 'tools',    color: '#2496ED' },
  { key: 'Kubernetes',                    nameKey: 'skills.list.kubernetes',          level: 75, category: 'tools',    color: '#326CE5' },
  { key: 'AWS',                           nameKey: 'skills.list.aws',                 level: 78, category: 'tools',    color: '#FF9900' },
  { key: 'Azure',                         nameKey: 'skills.list.azure',               level: 72, category: 'tools',    color: '#0078D4' },
  { key: 'Google Cloud',                 nameKey: 'skills.list.gcloud',              level: 70, category: 'tools',    color: '#4285F4' },
  { key: 'Vercel',                        nameKey: 'skills.list.vercel',              level: 88, category: 'tools',    color: '#000000' },
  { key: 'Netlify',                       nameKey: 'skills.list.netlify',             level: 85, category: 'tools',    color: '#00C7B7' },
  { key: 'Jenkins',                       nameKey: 'skills.list.jenkins',             level: 70, category: 'tools',    color: '#D33833' },
  { key: 'GitHub Actions',               nameKey: 'skills.list.githubActions',       level: 80, category: 'tools',    color: '#2088FF' },
  { key: 'VS Code',                       nameKey: 'skills.list.vscode',              level: 95, category: 'tools',    color: '#007ACC' },
  { key: 'IntelliJ IDEA',               nameKey: 'skills.list.intellij',            level: 80, category: 'tools',    color: '#000000' },
  { key: 'Xcode',                         nameKey: 'skills.list.xcode',               level: 75, category: 'tools',    color: '#1575F9' },
  { key: 'Android Studio',              nameKey: 'skills.list.androidStudio',       level: 78, category: 'tools',    color: '#3DDC84' },
  { key: 'Webpack',                       nameKey: 'skills.list.webpack',             level: 80, category: 'tools',    color: '#8DD6F9' },
  { key: 'Vite',                          nameKey: 'skills.list.vite',                level: 88, category: 'tools',    color: '#646CFF' },
  { key: 'ESLint',                        nameKey: 'skills.list.eslint',              level: 85, category: 'tools',    color: '#4B32C3' },
  { key: 'Prettier',                      nameKey: 'skills.list.prettier',            level: 90, category: 'tools',    color: '#F7B93E' },
  { key: 'Jest',                          nameKey: 'skills.list.jest',                level: 82, category: 'tools',    color: '#C21325' },
  { key: 'Cypress',                       nameKey: 'skills.list.cypress',             level: 78, category: 'tools',    color: '#17202C' },
  { key: 'Storybook',                     nameKey: 'skills.list.storybook',           level: 80, category: 'tools',    color: '#FF4785' },
  { key: 'Usage Analytics for Assessment',nameKey: 'skills.list.analytics',          level: 50, category: 'tools',    color: '#F7DF1E' },

  // Soft skills
  { key: 'Problemlösning',               nameKey: 'skills.list.problemSolving',      level: 92, category: 'soft',     color: '#8B5CF6' },
  { key: 'Kommunikation',                nameKey: 'skills.list.communication',       level: 88, category: 'soft',     color: '#10B981' },
  { key: 'Teamarbete',                   nameKey: 'skills.list.teamwork',            level: 90, category: 'soft',     color: '#F59E0B' },
  { key: 'Projektledning',               nameKey: 'skills.list.projectMgmt',         level: 85, category: 'soft',     color: '#EF4444' },
  { key: 'Användarfokus',                nameKey: 'skills.list.userFocus',           level: 90, category: 'soft',     color: '#06B6D4' },
  { key: 'Agile/Scrum',                  nameKey: 'skills.list.agile',               level: 87, category: 'soft',     color: '#8B5CF6' },
  { key: 'Mentorskap',                   nameKey: 'skills.list.mentoring',           level: 83, category: 'soft',     color: '#F472B6' },
  { key: 'Kritiskt tänkande',            nameKey: 'skills.list.criticalThinking',    level: 89, category: 'soft',     color: '#A855F7' },
  { key: 'Tidhantering',                 nameKey: 'skills.list.timeManagement',      level: 86, category: 'soft',     color: '#14B8A6' },
  { key: 'Kreativitet',                  nameKey: 'skills.list.creativity',          level: 88, category: 'soft',     color: '#F97316' },
  { key: 'Anpassningsförmåga',           nameKey: 'skills.list.adaptability',        level: 91, category: 'soft',     color: '#84CC16' },
  { key: 'Ledarskap',                    nameKey: 'skills.list.leadership',          level: 80, category: 'soft',     color: '#DC2626' },
  { key: 'Scientific Method',            nameKey: 'skills.list.scientificMethod',    level: 82, category: 'soft',     color: '#6366F1' },
  { key: 'Data-driven Decisions',        nameKey: 'skills.list.dataDriven',          level: 85, category: 'soft',     color: '#EC4899' },
  { key: 'Cross-functional Collaboration',nameKey: 'skills.list.crossFunctional',   level: 87, category: 'soft',     color: '#10B981' },

  // AI
  { key: 'Artificial Intelligence (AI)', nameKey: 'skills.list.ai',                 level: 25, category: 'ai',       color: '#8B5CF6' },
  { key: 'Machine Learning (ML)',        nameKey: 'skills.list.ml',                  level: 25, category: 'ai',       color: '#10B981' },
  { key: 'Deep Learning & Neural Networks', nameKey: 'skills.list.deepLearning',    level: 25, category: 'ai',       color: '#06B6D4' },
  { key: 'Natural Language Processing (NLP)', nameKey: 'skills.list.nlp',           level: 25, category: 'ai',       color: '#F59E0B' },
  { key: 'Multi-Agent Systems (MAS)',    nameKey: 'skills.list.mas',                 level: 25, category: 'ai',       color: '#EF4444' },
];

/**
 * Returnerar lokaliserade skills baserat på en t()-funktion.
 * Använd i SkillsSection: const skills = getLocalizedSkills(t)
 */
export const getLocalizedSkills = (t: (key: string) => string): Skill[] =>
  skillsMaster.map(({ nameKey, key, ...rest }) => ({
    ...rest,
    name: t(nameKey),
  }));

/**
 * Bakåtkompatibel export — använder engelska namn som standard.
 * Ersätt successivt med getLocalizedSkills(t) i komponenter.
 */
export const skillsData: Skill[] = skillsMaster.map(({ nameKey, key, ...rest }) => ({
  ...rest,
  name: key, // key = engelska originalnamnet
}));

export const careerSkillMapping = {
  'UX Designer': ['User Experience Design', 'User Interface Design', 'Design Thinking', 'User Research', 'Prototyping (Low-fi)', 'Prototyping (High-fi)', 'Figma', 'Wireframing', 'Usability Testing'],
  'UX Researcher': ['User Research', 'A/B Testing', 'Survey Design', 'Scientific Method', 'Data-driven Decisions', 'Usability Testing', 'Usability Evaluation', 'Persona Development', 'User Journey Mapping'],
  'UX Writer': ['UX Writing', 'User Research', 'Information Architecture', 'User Journey Mapping', 'Kommunikation', 'Kritiskt tänkande'],
  'UI Designer': ['User Interface Design', 'Design Systems', 'Typography', 'Color Theory', 'Figma', 'Adobe Creative Suite', 'Animation & Micro-interactions'],
  'Product Designer': ['User Experience Design', 'User Interface Design', 'Design Thinking', 'Prototyping (High-fi)', 'User Research', 'Design Systems', 'Figma'],
  'Frontend-utvecklare': ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Sass/SCSS', 'Next.js', 'Vue.js'],
  'Backend-utvecklare': ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL', 'Express.js', 'Django'],
  'Fullstack-utvecklare': ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Next.js', 'Express.js', 'User Experience Design'],
  'Mobilutvecklare': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS Development', 'Android Development', 'Mobile UX Patterns'],
  'DevOps-ingenjör': ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'GitHub Actions', 'Git', 'Azure', 'Google Cloud'],
  'Projektledare': ['Projektledning', 'Agile/Scrum', 'Kommunikation', 'Ledarskap', 'Tidhantering', 'Teamarbete', 'Cross-functional Collaboration'],
  'Systemarkitekt': ['PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Kritiskt tänkande', 'Projektledning', 'Microservices'],
};