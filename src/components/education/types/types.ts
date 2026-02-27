// types/education.types.ts

// View Mode Types
export type ViewMode = 'network' | 'grid' | 'compact' | 'impact' | 'skills' | 'timeline';
//export type ViewMode = 'network' | 'impact' | 'skills' | 'timeline';
export type ComplexityLevel = 'high' | 'medium' | 'low';
export type EducationType = 'university' | 'certificate' | 'specialization';
export type SkillCategory = 'frontend' | 'backend' | 'design' | 'research' | 'mobile' | 'database' | 'ux' | 'tools';
export type ImpactLevel = 'high' | 'medium' | 'low';

//export interface EducationPeriod {
//  start: string;
//  end: string;
//  phase: string;
//}

// Education Period interface
export interface EducationPeriod {
  id: string;
  startDate: string;
  endDate?: string;
  phase: string;
  description?: string;
  achievements?: string[];
  skills?: string[];
}

//export interface Skill {
//  name: string;
//  level: number;
//  category: SkillCategory;
//  impact: ImpactLevel;
//}



export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-10
  acquired_date?: string;
  source_education_id?: string;
  impact: ImpactLevel;
}

//export interface Education {
//  id: string;
//  institution: string;
//  degree: string;
//  periods: EducationPeriod[];
//  location: string;
//  type: EducationType;
//  impact: number;
//  complexity: ComplexityLevel;
//  courses: string[];
//  skills: Skill[];
//  narrative: string;
//  color: string;
//  connections: string[];
//}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  type: 'university' | 'certificate' | 'specialization';
  location: string;
  complexity: 'high' | 'medium' | 'low';
  impact: number;
  color: string;
  narrative: string;
  periods?: EducationPeriod[];  // or Period[] if prefer
  skills: Skill[];
  courses?: string[];
  connections?: string[];  // Made optional with ?
}

export interface SkillMetrics {
  avgLevel: number;
  highImpactCount: number;
  totalSkills: number;
}

// Extended types for component architecture
export interface ViewComponentProps {
  education: Education;
  isExpanded: boolean;
  onToggle: () => void;
  skillsVisible: boolean;
//  viewMode?: string;
  viewMode?: ViewMode;
  allEducation?: Education[];
  onSkillSelect?: (skill: Skill, educationId: string) => void;
  skillMetrics: SkillMetrics;
  connectedEducations?: Education[];
}
//export interface ViewControlsProps {
//  displayCount: number;
//  totalCount: number;
//  onShowMore: () => void;
//  onShowLess: () => void;
//  onReset: () => void;
//  viewMode: ViewMode;
//  onViewChange: (mode: ViewMode) => void;
//}


//export interface ViewControlsProps {
//  displayCount: number;
//  totalCount: number;
//  initialDisplayCount?: number;
//  onShowMore: () => void;
//  onShowLess: () => void;
//  onReset: () => void;
//  viewMode: ViewMode;
//  onViewChange: (mode: ViewMode) => void;
//}


// View Controls Props
export interface ViewControlsProps {
  // Display count management
  displayCount: number;
  totalCount: number;
  initialDisplayCount?: number;

  // Control handlers
  onShowMore?: () => void;
  onShowLess?: () => void;
  onReset?: () => void;

  // View mode management
  viewMode?: ViewMode;
  onViewChange?: (mode: ViewMode) => void;

  // Optional configurations
  showProgress?: boolean;
  allowedModes?: ViewMode[];
  stepSize?: number; // How many items to show/hide at once
}

// Network Node interface for internal use
export interface NetworkNode {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  education: Education;
  isSelected?: boolean;
  isHovered?: boolean;
  connections: string[];
  velocity?: { x: number; y: number };
  fixed?: boolean;
}



//export interface EducationCardProps {
//  education: Education;
//  index: number;
//  viewMode: ViewMode;
//  isExpanded: boolean;
//  onToggle: () => void;
//  allEducation: Education[];
//}

export interface EducationCardProps {
  education: Education;
  index?: number;
  viewMode: ViewMode; // <- Use the same ViewMode type
  isExpanded?: boolean;
  onToggle?: (educationId: string) => void;
  allEducation?: Education[];
  onSkillSelect?: (skill: Skill, educationId: string) => void;
}
export interface FloatingNavProps {
  sectionRef: React.RefObject<HTMLElement>;
}

//export interface NetworkVisualizationProps {
//  education: Education[];
//  isVisible: boolean;
//}


//export interface NetworkVisualizationProps {
//  isVisible: boolean;
//  education: Education;
//  isExpanded: boolean;
//  onToggle: () => void;
//  connectedEducations: Education[];
//  skillsVisible: boolean;
//}


// Network Visualization Props - Unified interface
export interface NetworkVisualizationProps {
  // Primary data prop - supports both single and array
  educationData?: Education | Education[];

  // Legacy support for the old interface
  education?: Education | Education[];

  // Display options
  selectedEducation?: Education;
  compact?: boolean;
  height?: number;
  showLabels?: boolean;
  interactive?: boolean;

  // Visibility and expansion states
  isVisible?: boolean;
  isExpanded?: boolean;

  // Event handlers
  onToggle?: () => void;
  onEducationSelect?: (education: Education) => void;
  onEducationHover?: (education: Education | null) => void;

  // Additional data for enhanced functionality
  connectedEducations?: Education[];
  skillsVisible?: boolean;

  // Animation and styling options
  animationEnabled?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  customColors?: Record<string, string>;
}




export interface EducationSectionState {
  viewMode: ViewMode;
  displayCount: number;
  expandedCards: Set<string>;
}

export interface EducationSectionActions {
  setViewMode: (mode: ViewMode) => void;
  handleShowMore: () => void;
  handleShowLess: () => void;
  handleReset: () => void;
  toggleCard: (id: string) => void;
}

export interface GlassStyles {
  card: string;
  button: string;
  input: string;
  badge: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
}

// Utility types for data processing
export interface SkillsByCategory {
  [category: string]: Skill[];
}

export interface SkillCategorySummary {
  category: string;
  avgLevel: number;
  count: number;
  skills: Skill[];
}

//export interface NetworkNode {
//  id: string;
//  x: number;
//  y: number;
//  education: Education;
//}

export interface NetworkConnection {
  from: string;
  to: string;
  fromEducation: Education;
  toEducation: Education;
}


// Network Edge interface for internal use
export interface NetworkEdge {
  source: string;
  target: string;
  strength: number;
  color?: string;
  animated?: boolean;
}

// Layout configuration for network visualization
export interface NetworkLayoutConfig {
  centerX: number;
  centerY: number;
  radius: number;
  nodeSpacing: number;
  edgeLength: number;
  repulsion: number;
  attraction: number;
  damping: number;
}

// Animation configuration
export interface AnimationConfig {
  enabled: boolean;
  duration: number;
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  stagger: number;
}

// Theme configuration
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  shadow: string;
}

// Filter and sort options
export interface FilterOptions {
  complexity?: ComplexityLevel[];
  type?: EducationType[];
  impactRange?: [number, number];
  dateRange?: [string, string];
  hasConnections?: boolean;
  skillCategories?: string[];
}

export interface SortOptions {
  field: 'institution' | 'impact' | 'startDate' | 'complexity' | 'skillCount';
  direction: 'asc' | 'desc';
}

// Statistics interface
export interface EducationStats {
  totalEducations: number;
  totalSkills: number;
  totalConnections: number;
  averageImpact: number;
  complexityDistribution: Record<ComplexityLevel, number>;
  typeDistribution: Record<EducationType, number>;
  skillCategoryDistribution: Record<string, number>;
  timelineSpan: {
    earliest: string;
    latest: string;
    totalDuration: number; // in months
  };
}

// Search interface
export interface SearchOptions {
  query: string;
  fields: ('institution' | 'degree' | 'narrative' | 'skills' | 'courses')[];
  fuzzy: boolean;
  minScore: number;
}

// Export utility type for component prop inference
export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : never;

// Utility types for partial updates
export type PartialEducation = Partial<Education> & { id: string };
export type EducationUpdate = Partial<Omit<Education, 'id'>>;

// Event types for custom events
export interface EducationSelectEvent {
  education: Education;
  source: 'click' | 'keyboard' | 'programmatic';
  timestamp: number;
}

export interface EducationHoverEvent {
  education: Education | null;
  position: { x: number; y: number };
  timestamp: number;
}

export interface NetworkInteractionEvent {
  type: 'node-click' | 'edge-click' | 'background-click' | 'node-hover' | 'edge-hover';
  target: Education | { source: Education; target: Education } | null;
  position: { x: number; y: number };
  timestamp: number;
}

// Hook return types
export interface UseEducationNetwork {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  stats: EducationStats;
  selectedEducation: Education | null;
  hoveredEducation: Education | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  selectEducation: (education: Education | null) => void;
  hoverEducation: (education: Education | null) => void;
  addConnection: (sourceId: string, targetId: string) => void;
  removeConnection: (sourceId: string, targetId: string) => void;
  updateEducation: (id: string, updates: EducationUpdate) => void;

  // Filters and search
  setFilters: (filters: FilterOptions) => void;
  setSort: (sort: SortOptions) => void;
  search: (options: SearchOptions) => Education[];
}

export interface UseViewControls {
  displayCount: number;
  viewMode: ViewMode;
  filters: FilterOptions;
  sort: SortOptions;

  // Actions
  showMore: () => void;
  showLess: () => void;
  reset: () => void;
  setViewMode: (mode: ViewMode) => void;
  setFilters: (filters: FilterOptions) => void;
  setSort: (sort: SortOptions) => void;
}