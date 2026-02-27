// components/education/index.ts

//import EducationSection from './EducationSection';

// Main component export
//export { default as EducationSection } from './EducationSection';
//export EducationSection from './EducationSection';
//export { default as EducationSection } from './EducationSection';

//Working
//export { default } from './EducationSection';
//Experimenting
// index.tsx
export { default, default as EducationSection } from './EducationSection';


// Sub-components (for advanced usage)
export { EducationCard } from './components/EducationCard';
export { ViewControls } from './components/ViewControls';
export { FloatingNav } from './components/FloatingNav';
export { NetworkVisualization } from './components/NetworkVisualization';

// Hooks (for custom implementations)
export { useEducationData } from './hooks/useEducationData';
export { useEducationState } from './hooks/useEducationState';
export { useFloatingNav } from './hooks/useFloatingNav';
export { useSkillAnimation } from './hooks/useSkillAnimation';

// Types (for TypeScript users)
export type {
  Education,
  EducationPeriod,
  Skill,
  ViewMode,
  EducationCardProps,
  ViewControlsProps,
  FloatingNavProps,
  NetworkVisualizationProps,
  EducationSectionState,
  EducationSectionActions,
  GlassStyles,
  SkillsByCategory,
  SkillCategorySummary,
  NetworkNode,
  NetworkConnection
} from './types/types';
//} from './types/education.types';

// Data and utilities (for customization)
export { educationData } from './data/educationData';
export {
  glassStyles,
  getComplexityStyles,
  getImpactStyles,
  getCategoryIcon,
  createAnimationDelay,
  getCardTransition
} from './styles/glassStyles';