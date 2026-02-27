import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { Moon, Shield, Target, TrendingUp, ArrowRight, Check, Lock, Sun, ChevronLeft, Info, Sparkles, Zap, Coffee, Book, Music, Phone, Calendar, BarChart3, Bell, Download, Trash2 } from 'lucide-react';
import { annotationDefinitions } from './annotationDefinitions';


// THEME SYSTEM
const themes = {
  evening: {
    name: 'evening',
    colors: {
      primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460', highlight: '#533483',
      text: '#e8d5c4', textSecondary: '#b8a89e', border: 'rgba(83, 52, 131, 0.3)',
      cardBg: 'rgba(255, 255, 255, 0.05)', cardBgHover: 'rgba(255, 255, 255, 0.08)',
      success: '#6b4e8f', warning: '#8b6fa8', danger: '#9f6b7e',
      green: '#6b9f7e', yellow: '#b8a66f', red: '#9f6b7e', inputBg: 'rgba(255, 255, 255, 0.08)'
    },
    gradients: {
      main: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      card: 'linear-gradient(135deg, rgba(83, 52, 131, 0.1) 0%, rgba(15, 52, 96, 0.1) 100%)',
      button: 'linear-gradient(135deg, #533483 0%, #6b4e8f 100%)',
      success: 'linear-gradient(135deg, rgba(107, 78, 143, 0.2) 0%, rgba(83, 52, 131, 0.2) 100%)',
      score: 'linear-gradient(135deg, rgba(83, 52, 131, 0.3) 0%, rgba(107, 78, 143, 0.3) 100%)',
      positive: 'linear-gradient(135deg, rgba(107, 159, 126, 0.15) 0%, rgba(83, 52, 131, 0.15) 100%)',
      negative: 'linear-gradient(135deg, rgba(159, 107, 126, 0.15) 0%, rgba(122, 82, 150, 0.15) 100%)',
      selected: 'linear-gradient(135deg, rgba(83, 52, 131, 0.3) 0%, rgba(107, 78, 143, 0.3) 100%)'
    },
    animation: { duration: '1.2s', easing: 'cubic-bezier(0.4, 0, 0.2, 1)', slow: '2s' },
    shadows: { sm: '0 2px 8px rgba(83, 52, 131, 0.15)', md: '0 4px 16px rgba(83, 52, 131, 0.2)', lg: '0 8px 32px rgba(83, 52, 131, 0.25)' }
  },
  morning: {
    name: 'morning',
    colors: {
      primary: '#fff8e7', secondary: '#ffe5b4', accent: '#ffd700', highlight: '#ff8c42',
      text: '#2d3142', textSecondary: '#5a5a6e', border: 'rgba(255, 140, 66, 0.3)',
      cardBg: 'rgba(255, 255, 255, 0.6)', cardBgHover: 'rgba(255, 255, 255, 0.8)',
      success: '#4caf50', warning: '#ff9800', danger: '#f44336',
      green: '#4caf50', yellow: '#ff9800', red: '#f44336', inputBg: 'rgba(255, 255, 255, 0.8)'
    },
    gradients: {
      main: 'linear-gradient(135deg, #fff8e7 0%, #ffe5b4 50%, #ffd700 100%)',
      card: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 140, 66, 0.1) 100%)',
      button: 'linear-gradient(135deg, #ff8c42 0%, #ffa500 100%)',
      success: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(139, 195, 74, 0.2) 100%)',
      score: 'linear-gradient(135deg, rgba(255, 140, 66, 0.3) 0%, rgba(255, 165, 0, 0.3) 100%)',
      positive: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(139, 195, 74, 0.15) 100%)',
      negative: 'linear-gradient(135deg, rgba(244, 67, 54, 0.15) 0%, rgba(255, 152, 0, 0.15) 100%)',
      selected: 'linear-gradient(135deg, rgba(255, 140, 66, 0.3) 0%, rgba(255, 165, 0, 0.3) 100%)'
    },
    animation: { duration: '0.4s', easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', slow: '0.6s' },
    shadows: { sm: '0 2px 8px rgba(255, 140, 66, 0.15)', md: '0 4px 16px rgba(255, 140, 66, 0.2)', lg: '0 8px 32px rgba(255, 140, 66, 0.25)' }
  }
};

const getThemeByTime = (hour) => (hour >= 6 && hour < 19) ? 'morning' : 'evening';
const getCurrentHour = () => new Date().getHours();


// SUB-COMPONENTS
const FeatureCard = ({ icon, title, description, delay, theme }) => (
  <div className="backdrop-blur-sm border rounded-xl p-4 flex items-start gap-3 transition-all cursor-pointer"
    style={{ animationDelay: delay, background: theme.colors.cardBg, borderColor: theme.colors.border, boxShadow: theme.shadows.sm, transitionDuration: theme.animation.duration }}>
    <div className="p-2 rounded-lg" style={{ background: `${theme.colors.highlight}20`, color: theme.colors.highlight }}>{icon}</div>
    <div className="flex-1 text-left">
      <h3 className="font-semibold text-sm mb-1" style={{ color: theme.colors.text }}>{title}</h3>
      <p className="text-xs" style={{ color: theme.colors.textSecondary }}>{description}</p>
    </div>
  </div>
);

const HabitCard = ({ habit, checked, onCheck, onDetail, showXP, theme }) => (
  <div className="backdrop-blur-sm border rounded-xl p-4 flex items-center gap-3 transition-all group"
    style={{ background: theme.colors.cardBg, borderColor: theme.colors.border, transitionDuration: theme.animation.duration }}>
    <button onClick={onCheck} className="w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
      style={{ background: checked ? theme.colors.success : theme.colors.cardBg, transform: checked ? 'scale(1.05)' : 'scale(1)', boxShadow: checked ? theme.shadows.md : 'none', transitionDuration: theme.animation.duration }}>
      {checked ? <Check className="w-6 h-6" style={{ color: theme.colors.text }} /> : <span className="text-2xl">{habit.emoji}</span>}
    </button>
    <button onClick={onDetail} className="flex-1 text-left">
      <h4 className="font-semibold mb-1 transition-all" style={{ color: checked ? theme.colors.textSecondary : theme.colors.text, textDecoration: checked ? 'line-through' : 'none' }}>{habit.title}</h4>
      <p className="text-xs" style={{ color: theme.colors.textSecondary }}>{habit.description}</p>
    </button>
    {showXP && <span className="text-sm font-medium animate-scale-in" style={{ color: theme.colors.highlight }}>+10 XP</span>}
  </div>
);

const ScoreBreakdown = ({ label, value, color, theme }) => {
  const colorMap = { blue: theme.colors.highlight, purple: theme.colors.accent, green: theme.colors.green, yellow: theme.colors.warning };
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span style={{ color: theme.colors.textSecondary }}>{label}</span>
        <span className="font-semibold" style={{ color: theme.colors.text }}>{value}</span>
      </div>
      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: theme.colors.cardBg }}>
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${value}%`, background: colorMap[color], transitionDuration: theme.animation.slow }} />
      </div>
    </div>
  );
};

const PatternCard = ({ pattern, delay, theme }) => {
  const isPositive = pattern.type === 'positive';
  return (
    <div className="rounded-2xl p-5 transition-all cursor-pointer animate-scale-in"
      style={{ animationDelay: delay, background: isPositive ? theme.gradients.positive : theme.gradients.negative, border: `1px solid ${isPositive ? theme.colors.green : theme.colors.red}40`, boxShadow: theme.shadows.sm }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg" style={{ background: `${isPositive ? theme.colors.green : theme.colors.red}20`, color: isPositive ? theme.colors.green : theme.colors.red }}>{pattern.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1" style={{ color: theme.colors.text }}>{pattern.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: theme.colors.textSecondary }}>{pattern.description}</p>
          <p className="text-xs mt-2" style={{ color: theme.colors.textSecondary }}>Baserat på {pattern.sampleSize} nätter</p>
        </div>
      </div>
      <button className="w-full text-sm font-medium py-2 px-4 rounded-lg transition-all hover:scale-105 active:scale-95"
        style={{ background: theme.gradients.button, color: theme.name === 'morning' ? '#2d3142' : '#ffffff', transitionDuration: theme.animation.duration }}>
        {pattern.action}
      </button>
    </div>
  );
};

const ScoreDetailCard = ({ title, score, color, description, tip, theme }) => {
  const colorMap = {
    blue: { color: theme.colors.highlight, bg: `${theme.colors.highlight}20` },
    purple: { color: theme.colors.accent, bg: `${theme.colors.accent}20` },
    green: { color: theme.colors.green, bg: `${theme.colors.green}20` },
    yellow: { color: theme.colors.warning, bg: `${theme.colors.warning}20` }
  };
  const style = colorMap[color];
  return (
    <div className="rounded-2xl p-5" style={{ background: theme.colors.cardBg, border: `1px solid ${style.color}40` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: theme.colors.text }}>{title}</h3>
        <span className="text-2xl font-bold" style={{ color: style.color }}>{score}</span>
      </div>
      <div className="w-full rounded-full h-2 mb-4 overflow-hidden" style={{ background: theme.colors.cardBg }}>
        <div className="h-2 rounded-full transition-all" style={{ width: `${score}%`, background: style.color, transitionDuration: theme.animation.slow }} />
      </div>
      <p className="text-sm mb-3" style={{ color: theme.colors.textSecondary }}>{description}</p>
      <div className="rounded-lg p-3" style={{ background: theme.colors.cardBg }}>
        <p className="text-xs flex items-start gap-2" style={{ color: theme.colors.textSecondary }}>
          <Sparkles className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span>{tip}</span>
        </p>
      </div>
    </div>
  );
};

const ToggleSwitch = ({ enabled, onToggle, theme }) => (
  <button onClick={onToggle} className="w-12 h-6 rounded-full transition-all" style={{ background: enabled ? theme.colors.highlight : theme.colors.cardBg }}>
    <div className="w-5 h-5 bg-white rounded-full transition-transform" style={{ transform: enabled ? 'translateX(24px)' : 'translateX(4px)', transitionDuration: theme.animation.duration }} />
  </button>
);


// i18n System
const translations = {
  sv: {
    // Mode selectors
    desktopMode: 'Desktop-läge',
    mobileMode: 'Mobil-läge',
    freeNavigate: 'Fri navigering',
    guidedTour: 'Guidad tur',

    // Principles
    'UX Pattern': 'UX-mönster',
    'User Psychology': 'Användarpsykologi',
    'Accessibility': 'Tillgänglighet',
    'Gamification': 'Gamifiering',
    'Behavioral Psychology': 'Beteendepsykologi',
    'Visual Design': 'Visuell design',
    'Information Architecture': 'Informationsarkitektur',
    'Personalization': 'Personalisering',
    'Data Visualization': 'Datavisualisering',
    'Conversion Design': 'Konverteringsdesign',
    'Design System': 'Designsystem',
    'Educational Design': 'Pedagogisk design',
    'Behavior Change': 'Beteendeförändring',
    'Goal Setting': 'Målsättning',
    'User Control': 'Användarkontroll',
    'Interaction Design': 'Interaktionsdesign',
    'Content Strategy': 'Innehållsstrategi',
    'Feedback Design': 'Feedbackdesign',
    'Affordance Design': 'Affordansdesign',
    'Safety Design': 'Säkerhetsdesign',

    // Navigation
    previous: 'Föregående',
    next: 'Nästa',
    gotIt: 'Jag förstår!',
    skipTour: 'Hoppa över tur'
  },
  en: {
    desktopMode: 'Desktop Mode',
    mobileMode: 'Mobile Mode',
    freeNavigate: 'Free Navigate',
    guidedTour: 'Guided Tour',

    // Principles stay in English
    previous: 'Previous',
    next: 'Next',
    gotIt: 'Got it!',
    skipTour: 'Skip tour'
  },
  es: {
    desktopMode: 'Modo escritorio',
    mobileMode: 'Modo móvil',
    freeNavigate: 'Navegación libre',
    guidedTour: 'Tour guiado',

    'UX Pattern': 'Patrón de UX',
    'User Psychology': 'Psicología del usuario',
    'Accessibility': 'Accesibilidad',
    'Gamification': 'Gamificación',
    'Behavioral Psychology': 'Psicología conductual',
    'Visual Design': 'Diseño visual',
    'Information Architecture': 'Arquitectura de información',
    'Personalization': 'Personalización',
    'Data Visualization': 'Visualización de datos',
    'Conversion Design': 'Diseño de conversión',
    'Design System': 'Sistema de diseño',
    'Educational Design': 'Diseño educativo',
    'Behavior Change': 'Cambio de comportamiento',
    'Goal Setting': 'Establecimiento de metas',
    'User Control': 'Control del usuario',
    'Interaction Design': 'Diseño de interacción',
    'Content Strategy': 'Estrategia de contenido',
    'Feedback Design': 'Diseño de retroalimentación',
    'Affordance Design': 'Diseño de affordance',
    'Safety Design': 'Diseño de seguridad',

    previous: 'Anterior',
    next: 'Siguiente',
    gotIt: '¡Entendido!',
    skipTour: 'Saltar tour'
  }
};

const useTranslation = (lang = 'sv') => {
  return (key) => translations[lang][key] || key;
};

// Multilingual screen annotations structure
const screenAnnotations = {
  //Moved
}

// Helper function to get annotations by language
const getAnnotations = (screen, language = 'sv') => {
  return screenAnnotations[language]?.[screen] || screenAnnotations.sv[screen] || [];
}


const annotationColors = {
  blue: { main: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)' },
  green: { main: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)' },
  purple: { main: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)' },
  yellow: { main: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' }
};

const AnnotationMarker = ({ annotation, isHovered, onHover, theme }) => {
  const colorScheme = annotationColors[annotation.color];

  // Determine card position based on annotation location
  const isRightSide = annotation.position.x > 50;
  const isTopHalf = annotation.position.y < 50;

  // Calculate card positioning
  const getCardPosition = () => {
    if (isRightSide) {
      // Show card on left side
      return {
        right: '100%',
        marginRight: '8px',
        left: 'auto'
      };
    } else {
      // Show card on right side
      return {
        left: '100%',
        marginLeft: '8px',
        right: 'auto'
      };
    }
  };

  const cardPosition = getCardPosition();

  return (
    <div
      className="absolute cursor-pointer transition-all"
      style={{
        left: `${annotation.position.x}%`,
        top: `${annotation.position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isHovered ? 100 : 50
      }}
      onMouseEnter={() => onHover(annotation.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Pulsing dot */}
      <div className="relative">
        <div
          className="w-4 h-4 rounded-full transition-all"
          style={{
            background: colorScheme.main,
            boxShadow: isHovered ? `0 0 0 8px ${colorScheme.bg}` : `0 0 0 4px ${colorScheme.bg}`,
            transform: isHovered ? 'scale(1.2)' : 'scale(1)'
          }}
        />
        {!isHovered && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: colorScheme.main, opacity: 0.5 }}
          />
        )}
      </div>

      {/* Hover card with smart positioning */}
      {isHovered && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-64 rounded-xl animate-scale-in pointer-events-none"
          style={{
            ...cardPosition,
            background: `${theme.colors.cardBg}f5`, // Slightly more opaque
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `2px solid ${colorScheme.border}`,
            boxShadow: `${theme.shadows.lg}, 0 0 40px ${colorScheme.bg}, inset 0 0 60px rgba(0,0,0,0.3)`,
            padding: '1rem'
          }}
        >
          {/* Arrow indicator pointing to annotation */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
            style={{
              [isRightSide ? 'right' : 'left']: '-6px',
              background: colorScheme.main,
              opacity: 0.3
            }}
          />

          <div className="flex items-start gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: colorScheme.main }}
            />
            <h4 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
              {annotation.title}
            </h4>
          </div>
          <p className="text-xs leading-relaxed mb-2" style={{ color: theme.colors.textSecondary }}>
            {annotation.description}
          </p>
          <div
            className="text-xs font-medium px-2 py-1 rounded-md inline-block"
            style={{
              background: colorScheme.bg,
              color: colorScheme.main
            }}
          >
            {annotation.principle}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNarrativeOverlay = ({ currentScreen, language, onNext, onClose, theme }) => {
//  const annotations = screenAnnotations[currentScreen] || [];
  const annotations = getAnnotations(currentScreen, language);
  const [currentAnnotation, setCurrentAnnotation] = useState(0);

  if (annotations.length === 0) return null;

  const annotation = annotations[currentAnnotation];
  const colorScheme = annotationColors[annotation.color];

  // Determine card position based on spotlight location
  const isTopFocused = annotation.position.y < 40;
  const isBottomFocused = annotation.position.y > 70;


  const [languageA, setLanguage] = useState(language);
  const t = useTranslation(languageA);

  // Determine card position based on spotlight location
  // Better thresholds: if spotlight is in upper half (0-50%), place card at bottom
  // If spotlight is in lower half (50-100%), place card at top
  const spotlightY = annotation.position.y;

  const getCardPosition = () => {
    if (spotlightY <= 50) {
      // Spotlight in upper half - place card at bottom
      return {
        bottom: '0',
        top: 'auto',
        borderTop: `2px solid ${colorScheme.border}`,
        borderBottom: 'none'
      };
    } else {
      // Spotlight in lower half - place card at top
      return {
        top: '15%',
        bottom: 'auto',
        borderBottom: `2px solid ${colorScheme.border}`,
        borderTop: 'none'
      };
    }
  };

  const cardPosition = getCardPosition();

  return (
    <div
      className="absolute inset-0 z-50"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
    >
      {/* Spotlight circle */}
      <div
        className="absolute rounded-full transition-all pointer-events-none"
        style={{
          left: `${annotation.position.x}%`,
          top: `${annotation.position.y}%`,
          width: '120px',
          height: '120px',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.5), inset 0 0 20px ${colorScheme.bg}`,
          border: `3px solid ${colorScheme.main}`,
          animation: 'pulse 2s infinite'
        }}
      />

      {/* Narrative card with dynamic positioning */}
      <div
        className="absolute left-0 right-0 p-6 animate-slide-in"
        style={{
          ...cardPosition,
          background: `${theme.colors.secondary}f8`, // Slightly transparent
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: theme.shadows.lg
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium" style={{ color: colorScheme.main }}>
            {currentAnnotation + 1} / {annotations.length}
          </span>
          <button
            onClick={onClose}
            className="text-xs px-3 py-1 rounded-full transition-all hover:scale-105"
            style={{
              color: theme.colors.textSecondary,
              background: theme.colors.cardBg
            }}
          >
            {/*Avsluta tur*/}
            {t('skipTour')}
          </button>
        </div>

        <h3 className="text-lg font-bold mb-2" style={{ color: theme.colors.text }}>
          {annotation.title}
        </h3>
        <p className="text-sm mb-2" style={{ color: theme.colors.textSecondary }}>
          {annotation.description}
        </p>
        <div
          className="text-xs font-medium px-3 py-1 rounded-full inline-block mb-4"
          style={{
            background: colorScheme.bg,
            color: colorScheme.main
          }}
        >
          💡 {annotation.principle}
        </div>

        <div className="flex gap-3">
          {currentAnnotation > 0 && (
            <button
              onClick={() => setCurrentAnnotation(prev => prev - 1)}
              className="flex-1 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: theme.colors.cardBg,
                color: theme.colors.text
              }}
            >
              {/*← Föregående*/}
              ← {t('previous')}
            </button>
          )}
          <button
            onClick={() => {
              if (currentAnnotation < annotations.length - 1) {
                setCurrentAnnotation(prev => prev + 1);
              } else {
                onNext();
              }
            }}
            className="flex-1 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
            style={{
              background: theme.gradients.button,
              color: theme.name === 'morning' ? '#2d3142' : '#ffffff',
              boxShadow: theme.shadows.md
            }}
          >
            {/*{currentAnnotation < annotations.length - 1 ? 'Nästa →' : 'Jag förstår! ✓'}*/}
            {currentAnnotation < annotations.length - 1 ? `${t('next')} →` : `${t('gotIt')} ✓`}
          </button>
        </div>
      </div>
    </div>
  );
};


interface SomnloggCompleteProps {
  onScreenChange?: ((screen: string) => void) | null;
  showNavigation?: boolean;
  activeAnnotationId?: string | null;
  theme?: any;
  onThemeChange?: ((theme: any, mode: string) => void) | null;
}


// MAIN APP
//const SomnloggComplete = ({ onScreenChange, showNavigation, activeAnnotationId, theme, onThemeChange }) => {
//const SomnloggComplete = ({ onScreenChange = null, showNavigation = true, activeAnnotationId = null, theme, onThemeChange = null  }) => {
const SomnloggComplete: React.FC<SomnloggCompleteProps> = ({
    onScreenChange = null,
    showNavigation = true,
    activeAnnotationId = null,
    theme,
    onThemeChange = null
  }) => {
  // STATE  + NEW showLevelUp
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [themeMode, setThemeMode] = useState('auto');
  const [currentTheme, setCurrentTheme] = useState(themes.evening);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinStep, setPinStep] = useState('enter');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false); // NEW
  const [habitChecked, setHabitChecked] = useState({});
  const [justChecked, setJustChecked] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [bedtime, setBedtime] = useState('22:30');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [showInsightBadge, setShowInsightBadge] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);


  // Notify parent when screen changes
  useEffect(() => {
    if (onScreenChange) {
      onScreenChange(currentScreen);
    }
  }, [currentScreen, onScreenChange]);

  // DATA
  const habits = [
    { id: 'phone', emoji: '📱', title: 'Telefonfri zon', description: '30 min före sömn', difficulty: 'medium', week: [true, true, false, true, false, false, false], streak: 3 },
    { id: 'music', emoji: '🎵', title: 'Kvällsmusik', description: 'Lugn musik 15 min', difficulty: 'easy', week: [true, true, true, true, false, true, false], streak: 5 }
  ];

  const allHabits = [
    ...habits,
    { id: 'reading', emoji: '📚', title: 'Kvällsläsning', description: '20 min innan sömn', difficulty: 'easy', isLocked: false, category: 'routine', week: [false, false, false, false, false, false, false], streak: 0 },
    { id: 'caffeine', emoji: '☕', title: 'Koffeinstopp', description: 'Ingen koffein efter 15:00', difficulty: 'medium', isLocked: false, category: 'nutrition', week: [false, false, false, false, false, false, false], streak: 0 },
    { id: 'exercise', emoji: '🏃', title: 'Kvällsträning', description: 'Lätt träning 3h före sömn', difficulty: 'hard', isLocked: true, unlockLevel: 3, category: 'routine' },
    { id: 'temperature', emoji: '🌡️', title: 'Svalt sovrum', description: 'Håll rummet 16-19°C', difficulty: 'easy', isLocked: true, unlockLevel: 2, category: 'environment' }
  ];

  const startGoals = [
    { id: 'phone', emoji: '📱', title: 'Telefonfri zon', description: 'Lägg undan telefonen 30 min före sömn', benefit: 'Snabbare insomning' },
    { id: 'music', emoji: '🎵', title: 'Kvällsmusik', description: 'Lyssna på lugn musik 15 min', benefit: 'Bättre avslappning' },
    { id: 'reading', emoji: '📚', title: 'Kvällsläsning', description: 'Läs 20 min innan sömn', benefit: 'Lugnare tankar' }
  ];

  const sleepData = [
    { day: 'M', hours: 7.2, mood: 4 }, { day: 'T', hours: 6.5, mood: 3 }, { day: 'O', hours: 8.1, mood: 5 },
    { day: 'T', hours: 7.8, mood: 4 }, { day: 'F', hours: 6.2, mood: 3 }, { day: 'L', hours: 9.0, mood: 5 }, { day: 'S', hours: 8.5, mood: 5 }
  ];

  const patterns = [
    { id: 'music', icon: <Music className="w-5 h-5" />, title: 'Musik hjälper dig', description: 'Du somnar 38% snabbare när du lyssnar på musik före sänggående', type: 'positive', sampleSize: 12, action: 'Lägg till som mål' },
    { id: 'reading', icon: <Book className="w-5 h-5" />, title: 'Läsning förbättrar sömnen', description: 'Nätter när du läst har 25% bättre sömnkvalitet', type: 'positive', sampleSize: 8, action: 'Lägg till som mål' },
    { id: 'caffeine', icon: <Coffee className="w-5 h-5" />, title: 'Sen koffein stör sömnen', description: 'Koffein efter 15:00 förlänger insomning med 15 min', type: 'negative', sampleSize: 15, action: 'Läs mer' }
  ];

  const historyData = [
    { date: '29 okt', bedtime: '22:30', wakeTime: '07:00', hours: 8.5, mood: 5 },
    { date: '28 okt', bedtime: '23:15', wakeTime: '06:45', hours: 7.5, mood: 4 },
    { date: '27 okt', bedtime: '22:00', wakeTime: '07:30', hours: 9.5, mood: 5 },
    { date: '26 okt', bedtime: '00:30', wakeTime: '07:00', hours: 6.5, mood: 3 },
    { date: '25 okt', bedtime: '22:45', wakeTime: '07:15', hours: 8.5, mood: 4 }
  ];

  const screens = {
    welcome: 'Välkommen', pin: 'PIN', profile: 'Profil', goalSelection: 'Välj mål', success: 'Klart!',
    logging: 'Logg', dashboard: 'Dashboard', habitDetail: 'Detalj', habitLibrary: 'Bibliotek',
    insights: 'Insikter', patterns: 'Mönster', scoreDetail: 'Poängdetalj', history: 'Historik', settings: 'Inställningar'
  };

  // useEffect
//  useEffect(() => {
//    if (themeMode === 'auto') {
//      const updateTheme = () => {
//        const hour = getCurrentHour();
//        const themeName = getThemeByTime(hour);
//        setCurrentTheme(themes[themeName]);
//      };
//      updateTheme();
//      const interval = setInterval(updateTheme, 60000);
//      return () => clearInterval(interval);
//    } else {
//      setCurrentTheme(themes[themeMode]);
//    }
//  }, [themeMode]);




//useEffect(() => {
//  if (themeMode === 'auto') {
//    const updateTheme = () => {
//      const hour = getCurrentHour();
//      const themeName = getThemeByTime(hour);
//      const autoTheme = themes[themeName];  // Define it here
//      setCurrentTheme(autoTheme);
//      if (onThemeChange) onThemeChange(autoTheme, 'auto');
//    };
//    updateTheme();
//    const interval = setInterval(updateTheme, 60000);
//    return () => clearInterval(interval);
//  } else {
//    const selectedTheme = themes[themeMode];  // Define it here
//    setCurrentTheme(selectedTheme);
//    if (onThemeChange) onThemeChange(selectedTheme, themeMode);
//  }
//}, [themeMode, onThemeChange]);



// Handle theme mode changes - THIS IS THE KEY PART
  useEffect(() => {
    let newTheme: any;
    let effectiveMode: string;

    if (themeMode === 'auto') {
      const hour = getCurrentHour();
      const themeName = getThemeByTime(hour);
      newTheme = themes[themeName];
      effectiveMode = 'auto';
      console.log('🕐 Auto theme update:', themeName, 'at hour:', hour);
    } else {
      newTheme = themes[themeMode];
      effectiveMode = themeMode;
      console.log('🎨 Manual theme update:', themeMode);
    }

    setCurrentTheme(newTheme);

    // Notify parent about theme change
    if (onThemeChange) {
      onThemeChange(newTheme, effectiveMode);
    }
  }, [themeMode, onThemeChange]);


  // Auto-update theme every minute when in auto mode
  useEffect(() => {
    if (themeMode === 'auto') {
      const interval = setInterval(() => {
        const hour = getCurrentHour();
        const themeName = getThemeByTime(hour);
        const autoTheme = themes[themeName];

        // Only update if theme actually changed
        if (autoTheme.name !== currentTheme.name) {
          console.log('⏰ Theme auto-switched to:', themeName);
          setCurrentTheme(autoTheme);
          if (onThemeChange) {
            onThemeChange(autoTheme, 'auto');
          }
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [themeMode, currentTheme.name, onThemeChange]);


  // HANDLERS
  const handlePinInput = (digit) => {
    if (pinStep === 'enter' && pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(() => { setPinStep('confirm'); setPin(''); }, 300);
      }
    } else if (pinStep === 'confirm' && confirmPin.length < 4) {
      const newConfirm = confirmPin + digit;
      setConfirmPin(newConfirm);
      if (newConfirm.length === 4) {
        setShowCelebration(true);
        setTimeout(() => { setShowCelebration(false); setCurrentScreen('profile'); }, 1500);
      }
    }
  };

  const handleHabitCheck = (habitId) => {
    const newChecked = !habitChecked[habitId];
    setHabitChecked(prev => ({...prev, [habitId]: newChecked}));
    if (newChecked) {
      setJustChecked(habitId);
      setTimeout(() => setJustChecked(null), 2000);
    }
  };

  const calculateDuration = () => {
    const [bedH, bedM] = bedtime.split(':').map(Number);
    const [wakeH, wakeM] = wakeTime.split(':').map(Number);
    let totalMinutes = (wakeH * 60 + wakeM) - (bedH * 60 + bedM);
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}min`;
  };

  const currentPinDisplay = pinStep === 'enter' ? pin : confirmPin;

  const getAnnotation = (id) => {
    const annotations = annotationDefinitions.sv[currentScreen] || [];
    return annotations.find(a => a.id === id);
  };

return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-all"
         style={{
           background: currentTheme.gradients.main,
           transitionDuration: currentTheme.animation.slow
         }}>

      <div className="flex flex-col gap-4 w-full max-w-md">

        {/* Navigation Row - Only show if enabled */}
        {showNavigation && (
          <div className="rounded-2xl p-4 transition-all"
               style={{
                 background: themeMode === 'morning' ? currentTheme.gradients.main : currentTheme.colors.cardBg,
                 transitionDuration: currentTheme.animation.slow
               }}>

          {/*  */}{/*{/* Theme Toggle */}
          {/*  <div className="flex justify-center gap-2 mb-3">*/}
          {/*  <button onClick={() => setThemeMode('auto')} className="px-3 py-1 rounded-full text-xs font-medium transition-all" style={{ background: themeMode === 'auto' ? currentTheme.colors.highlight : currentTheme.colors.cardBg, color: currentTheme.colors.text }}>*/}
          {/*  Auto ({currentTheme.name})*/}
          {/*  </button>*/}
          {/*  <button onClick={() => setThemeMode('morning')} className="px-3 py-1 rounded-full text-xs font-medium transition-all" style={{ background: themeMode === 'morning' ? themes.morning.colors.highlight : currentTheme.colors.cardBg, color: currentTheme.colors.text }}>*/}
          {/*    <Sun className="w-3 h-3 inline mr-1" />Morning*/}
          {/*  </button>*/}
          {/*  <button onClick={() => setThemeMode('evening')} className="px-3 py-1 rounded-full text-xs font-medium transition-all" style={{ background: themeMode === 'evening' ? themes.evening.colors.highlight : currentTheme.colors.cardBg, color: currentTheme.colors.text }}>*/}
          {/*    <Moon className="w-3 h-3 inline mr-1" />Evening*/}
          {/*  </button>*/}
          {/*</div>*/}
          {/* Theme Toggle */}
          <div className="flex justify-center gap-2 mb-3">
            <button
              onClick={() => setThemeMode('auto')}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: themeMode === 'auto' ? currentTheme.colors.highlight : currentTheme.colors.cardBg,
                color: currentTheme.colors.text
              }}
            >
              Auto ({currentTheme.name})
            </button>
            <button
              onClick={() => setThemeMode('morning')}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: themeMode === 'morning' ? themes.morning.colors.highlight : currentTheme.colors.cardBg,
                color: currentTheme.colors.text
              }}
            >
              <Sun className="w-3 h-3 inline mr-1" />Morning
            </button>
            <button
              onClick={() => setThemeMode('evening')}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                background: themeMode === 'evening' ? themes.evening.colors.highlight : currentTheme.colors.cardBg,
                color: currentTheme.colors.text
              }}
            >
              <Moon className="w-3 h-3 inline mr-1" />Evening
            </button>
          </div>

        {/* Screen Navigation */}
          <div className="flex justify-center gap-2 flex-wrap">
            {Object.entries(screens).map(([key, label]) => (
              <button key={key}
                      onClick={() => {
                        setCurrentScreen(key);
                        if (key === 'habitDetail' && !selectedHabit) setSelectedHabit(habits[0]);
                      }}
                      className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: currentScreen === key ? currentTheme.colors.highlight : currentTheme.colors.cardBg,
                        color: currentTheme.colors.text,
                        boxShadow: currentScreen === key ? currentTheme.shadows.md : 'none'
                      }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
        {/* Phone Container */}
        <div className="rounded-3xl shadow-2xl overflow-hidden border-8" style={{ background: currentTheme.colors.secondary, borderColor: currentTheme.colors.primary }}>
          {/* Status Bar  */}
          <div className="px-6 py-2 flex justify-between items-center text-xs" style={{ background: currentTheme.colors.primary, color: currentTheme.colors.textSecondary }}>
            <span>20:38</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 rounded-sm" style={{ border: `1px solid ${currentTheme.colors.textSecondary}` }}>
                <div className="w-2 h-2 m-0.5 rounded-sm" style={{ background: currentTheme.colors.textSecondary }}></div>
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="p-6 relative screen-content transition-all" style={{ background: currentTheme.gradients.main, transitionDuration: currentTheme.animation.slow }}>

            {/* Celebration Overlay  */}
            {showCelebration && (
              <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in" style={{ background: `${currentTheme.colors.primary}cc` }}>
                <div className="text-center animate-scale-in">
                  <div className="text-6xl mb-4 animate-bounce">🎉</div>
                  <p className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>Perfekt!</p>
                  <p className="mt-2" style={{ color: currentTheme.colors.textSecondary }}>Din PIN är säker</p>
                </div>
              </div>
            )}

            {/* NEW: Level Up Overlay */}
            {showLevelUp && (
              <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in"
                   style={{ background: `${currentTheme.colors.primary}cc` }}
                   onClick={() => setShowLevelUp(false)}>
                <div className="text-center animate-scale-in px-6" onClick={(e) => e.stopPropagation()}>
                  <div className="text-7xl mb-4 animate-bounce">🎯</div>
                  <p className="text-3xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Level Up!</p>
                  <p className="text-xl mb-4" style={{ color: currentTheme.colors.highlight }}>Level 3: Sömnoptimera</p>
                  <div className="rounded-2xl p-4 mb-6" style={{ background: currentTheme.colors.cardBg }}>
                    <p className="text-sm mb-3" style={{ color: currentTheme.colors.text }}>Nya mål upplåsta:</p>
                    <div className="flex justify-center gap-3">
                      <div className="text-3xl">🏃</div>
                      <div className="text-3xl">🌡️</div>
                    </div>
                  </div>
                  <button onClick={() => setShowLevelUp(false)}
                          className="px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                          style={{ background: currentTheme.gradients.button,
                                   color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff' }}>
                    Fantastiskt!
                  </button>
                </div>
              </div>
            )}

            {/* Welcome  */}
            {currentScreen === 'welcome' && (
              <div className="flex flex-col h-full animate-fade-in">
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <AnnotationFocus id="theme-icon" isActive={activeAnnotationId === 'w4'} annotation={getAnnotation('w4')} focusType="glow" theme={theme}>
                    <div className="mb-8 animate-float">
                      {currentTheme.name === 'morning' ? <Sun className="w-20 h-20 mx-auto mb-4" style={{ color: currentTheme.colors.highlight }} /> : <Moon className="w-20 h-20 mx-auto mb-4" style={{ color: currentTheme.colors.highlight }} />}
                      <h1 className="text-4xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Sömnlogg</h1>
                      <p style={{ color: currentTheme.colors.textSecondary }}>Din personliga sömnguide</p>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="feature-cards" isActive={activeAnnotationId === 'w1'} annotation={getAnnotation('w1')} focusType="ring" theme={theme}>
                    <div className="space-y-4 w-full max-w-xs">
                      <FeatureCard icon={<Target className="w-5 h-5" />} title="Mikromål som funkar" description="Små steg mot bättre sömn" delay="0ms" theme={currentTheme} />
                      <AnnotationFocus id="privacy-card" isActive={activeAnnotationId === 'w2'} annotation={getAnnotation('w2')} focusType="ring" theme={theme}>
                        <FeatureCard icon={<Lock className="w-5 h-5" />} title="Din data är säker" description="Allt sparas lokalt på din telefon" delay="100ms" theme={currentTheme} />
                      </AnnotationFocus>
                      <FeatureCard icon={<TrendingUp className="w-5 h-5" />} title="Upptäck mönster" description="Se vad som verkligen hjälper dig" delay="200ms" theme={currentTheme} />
                    </div>
                  </AnnotationFocus>
                </div>
                <AnnotationFocus id="cta-button" isActive={activeAnnotationId === 'w3'} annotation={getAnnotation('w3')} focusType="box" theme={theme}>
                  <button onClick={() => setCurrentScreen('pin')} className="w-full font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                    style={{ background: currentTheme.gradients.button, color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff', boxShadow: currentTheme.shadows.lg, transitionDuration: currentTheme.animation.duration }}>
                    Kom igång <ArrowRight className="w-5 h-5" />
                  </button>
                </AnnotationFocus>
              </div>
            )}

            {/* PIN Setup  */}
            {currentScreen === 'pin' && (
              <div className="flex flex-col h-full animate-fade-in">
                <button onClick={() => setCurrentScreen('welcome')} className="flex items-center gap-2 mb-6 transition-colors" style={{ color: currentTheme.colors.textSecondary }}>
                  <ChevronLeft className="w-5 h-5" />Tillbaka
                </button>
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <Shield className="w-16 h-16 mb-6 animate-pulse-slow" style={{ color: currentTheme.colors.highlight }} />
                  <AnnotationFocus id="pin-instructions" isActive={activeAnnotationId === 'p3'} annotation={getAnnotation('p3')} focusType="glow" theme={theme}>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>
                      {pinStep === 'enter' ? 'Skapa PIN-kod' : 'Bekräfta PIN-kod'}
                    </h2>
                    <p className="mb-8 max-w-xs" style={{ color: currentTheme.colors.textSecondary }}>
                      {pinStep === 'enter' ? 'Ingen annan kan se din sömndata' : 'Ange samma PIN-kod igen'}
                    </p>
                  </AnnotationFocus>
                  <AnnotationFocus id="pin-dots" isActive={activeAnnotationId === 'p1'} annotation={getAnnotation('p1')} focusType="ring" theme={theme}>
                    <div className="flex gap-4 mb-12">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="w-4 h-4 rounded-full transition-all"
                          style={{ background: i < currentPinDisplay.length ? currentTheme.colors.highlight : currentTheme.colors.cardBg, transform: i < currentPinDisplay.length ? 'scale(1.1)' : 'scale(1)', boxShadow: i < currentPinDisplay.length ? currentTheme.shadows.md : 'none', transitionDuration: currentTheme.animation.duration }} />
                      ))}
                    </div>
                  </AnnotationFocus>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        {activeAnnotationId === 'p2' && (
                          <div
                            id="focus-pin-keypad"
                            style={{
                              position: 'absolute',
                              top: '-12px',
                              left: '-12px',
                              right: '-12px',
                              bottom: '-12px',
                              borderRadius: '12px',
                              border: '3px solid #8b5cf6',
                              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                              zIndex: 10,
                              pointerEvents: 'none'
                            }}
                          />
                        )}
                        <div className="grid grid-cols-3 gap-4 max-w-xs">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].map((num, idx) => (
                            num !== '' ? (
                              <button
                                key={idx}
                                onClick={() => handlePinInput(num.toString())}
                                className="aspect-square text-xl font-semibold rounded-2xl transition-all active:scale-95"
                                style={{
                                  background: currentTheme.colors.cardBg,
                                  color: currentTheme.colors.text,
                                  boxShadow: currentTheme.shadows.sm,
                                  transitionDuration: currentTheme.animation.duration,
                                  width: '80px',
                                  height: '80px'
                                }}
                              >
                                {num}
                              </button>
                            ) : <div key={idx} style={{ width: '80px', height: '80px' }}></div>
                          ))}
                        </div>
                      </div>
                </div>
              </div>
            )}

            {/* Profile  */}
            {currentScreen === 'profile' && (
              <div className="flex flex-col h-full animate-fade-in">
                <AnnotationFocus id="progress-indicator" isActive={activeAnnotationId === 'pr2'} annotation={getAnnotation('pr2')} focusType="ring" theme={theme}>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Steg 3 av 5</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-1 rounded-full transition-all" style={{ width: i <= 3 ? '32px' : '24px', background: i <= 3 ? currentTheme.colors.highlight : currentTheme.colors.cardBg, transitionDuration: currentTheme.animation.duration }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </AnnotationFocus>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: currentTheme.colors.text }}>Om dig</h2>
                  <div className="space-y-6">
                    <AnnotationFocus id="name-input" isActive={activeAnnotationId === 'pr1'} annotation={getAnnotation('pr1')} focusType="box" theme={theme}>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>Vad vill du bli kallad? (valfritt)</label>
                        <input type="text" placeholder="Emma" className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                          style={{ background: currentTheme.colors.inputBg, color: currentTheme.colors.text, border: `2px solid ${currentTheme.colors.border}` }} />
                      </div>
                    </AnnotationFocus>
                    <AnnotationFocus id="sleep-goal-slider" isActive={activeAnnotationId === 'pr3'} annotation={getAnnotation('pr3')} focusType="ring" theme={theme}>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>Hur mycket sömn vill du få? (timmar)</label>
                        <input type="range" min="6" max="10" value={sleepGoal} onChange={(e) => setSleepGoal(Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: currentTheme.colors.cardBg }} />
                        <div className="flex justify-between text-xs mt-1">
                          <span style={{ color: currentTheme.colors.textSecondary }}>6t</span>
                          <span className="font-semibold" style={{ color: currentTheme.colors.highlight }}>{sleepGoal}t</span>
                          <span style={{ color: currentTheme.colors.textSecondary }}>10t</span>
                        </div>
                      </div>
                    </AnnotationFocus>
                    <AnnotationFocus id="bedtime-input" isActive={activeAnnotationId === 'pr4'} annotation={getAnnotation('pr4')} focusType="box" theme={theme}>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>När brukar du gå och lägga dig?</label>
                        <input type="time" defaultValue="23:00" className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                          style={{ background: currentTheme.colors.inputBg, color: currentTheme.colors.text, border: `2px solid ${currentTheme.colors.border}` }} />
                      </div>
                    </AnnotationFocus>
                  </div>
                </div>
                <button onClick={() => setCurrentScreen('goalSelection')} className="w-full font-semibold py-4 px-6 rounded-2xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: currentTheme.gradients.button, color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff', boxShadow: currentTheme.shadows.lg, transitionDuration: currentTheme.animation.duration }}>
                  Nästa
                </button>
              </div>
            )}

            {/* Goal Selection, Success, Logging  */}
            {/* S4 - GOAL SELECTION */}
            {currentScreen === 'goalSelection' && (
              <div className="flex flex-col h-full animate-fade-in">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Steg 4 av 5</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-1 rounded-full transition-all" style={{ width: i <= 4 ? '32px' : '24px', background: i <= 4 ? currentTheme.colors.highlight : currentTheme.colors.cardBg, transitionDuration: currentTheme.animation.duration }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Välj ditt första mål</h2>
                  <p className="text-sm mb-6" style={{ color: currentTheme.colors.textSecondary }}>Du kan alltid ändra senare</p>
                  <AnnotationFocus id="goal-cards" isActive={activeAnnotationId === 'gs1' || activeAnnotationId === 'gs4'} annotation={getAnnotation(activeAnnotationId === 'gs1' ? 'gs1' : 'gs4')} focusType="ring" theme={currentTheme}>
                    <div className="space-y-4">
                      {startGoals.map((goal) => (
                        <AnnotationFocus
                          key={goal.id}
                          id="selected-goal"
                          isActive={activeAnnotationId === 'gs3' && selectedGoal === goal.id}
                          annotation={getAnnotation('gs3')}
                          focusType="box"
                          theme={currentTheme}>
                          <button onClick={() => setSelectedGoal(goal.id)} className="w-full text-left p-5 rounded-2xl transition-all"
                            style={{ background: selectedGoal === goal.id ? currentTheme.gradients.selected : currentTheme.colors.cardBg, border: `2px solid ${selectedGoal === goal.id ? currentTheme.colors.highlight : currentTheme.colors.border}`, transform: selectedGoal === goal.id ? 'scale(1.02)' : 'scale(1)', transitionDuration: currentTheme.animation.duration }}>
                            <div className="flex items-start gap-4">
                              <div className="text-4xl">{goal.emoji}</div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1" style={{ color: currentTheme.colors.text }}>{goal.title}</h3>
                                <p className="text-sm mb-2" style={{ color: currentTheme.colors.textSecondary }}>{goal.description}</p>
                                <AnnotationFocus id="goal-benefit" isActive={activeAnnotationId === 'gs2'} annotation={getAnnotation('gs2')} focusType="glow" theme={currentTheme}>
                                  <span className="inline-flex items-center gap-1 text-xs" style={{ color: currentTheme.colors.highlight }}>
                                    <Target className="w-3 h-3" />{goal.benefit}
                                  </span>
                                </AnnotationFocus>
                              </div>
                              {selectedGoal === goal.id && <Check className="w-6 h-6 flex-shrink-0" style={{ color: currentTheme.colors.highlight }} />}
                            </div>
                          </button>
                        </AnnotationFocus>
                      ))}
                    </div>
                  </AnnotationFocus>
                </div>
                <button onClick={() => { if (selectedGoal) { setShowCelebration(true); setTimeout(() => { setShowCelebration(false); setCurrentScreen('success'); }, 1500); } }}
                  disabled={!selectedGoal} className="w-full font-semibold py-4 px-6 rounded-2xl transition-all"
                  style={{ background: selectedGoal ? currentTheme.gradients.button : currentTheme.colors.cardBg, color: selectedGoal ? (currentTheme.name === 'morning' ? '#2d3142' : '#ffffff') : currentTheme.colors.textSecondary, boxShadow: selectedGoal ? currentTheme.shadows.lg : 'none', cursor: selectedGoal ? 'pointer' : 'not-allowed', opacity: selectedGoal ? 1 : 0.5, transitionDuration: currentTheme.animation.duration }}>
                  Fortsätt
                </button>
              </div>
            )}

            {/* S5 - SUCCESS */}
            {currentScreen === 'success' && (
              <div className="flex flex-col h-full animate-fade-in items-center justify-center text-center">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <AnnotationFocus id="celebration-emoji" isActive={activeAnnotationId === 'su1'} annotation={getAnnotation('su1')} focusType="glow" theme={currentTheme}>
                    <div className="text-8xl mb-6 animate-bounce">🎉</div>
                  </AnnotationFocus>
                  <h2 className="text-3xl font-bold mb-3" style={{ color: currentTheme.colors.text }}>Du är redo!</h2>
                  <AnnotationFocus id="contextual-message" isActive={activeAnnotationId === 'su3'} annotation={getAnnotation('su3')} focusType="box" theme={currentTheme}>
                    <p className="text-lg mb-8 max-w-xs" style={{ color: currentTheme.colors.textSecondary }}>
                      Kom tillbaka {currentTheme.name === 'evening' ? 'i morgon' : 'ikväll'} för att logga din {currentTheme.name === 'evening' ? 'första natt' : 'sömn'}
                    </p>
                  </AnnotationFocus>
                  <AnnotationFocus id="next-steps" isActive={activeAnnotationId === 'su2'} annotation={getAnnotation('su2')} focusType="ring" theme={currentTheme}>
                    <div className="rounded-2xl p-6 max-w-xs" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                      <p className="text-sm mb-4" style={{ color: currentTheme.colors.textSecondary }}>Nästa steg:</p>
                      <div className="space-y-3 text-left">
                        {['Logga din sömn varje morgon', 'Checka av ditt mikromål', 'Se dina mönster efter 2 veckor'].map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${currentTheme.colors.highlight}33` }}>
                              <span className="text-sm font-bold" style={{ color: currentTheme.colors.highlight }}>{idx + 1}</span>
                            </div>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnnotationFocus>
                </div>
                <button onClick={() => setCurrentScreen('dashboard')} className="w-full font-semibold py-4 px-6 rounded-2xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: currentTheme.gradients.button, color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff', boxShadow: currentTheme.shadows.lg, transitionDuration: currentTheme.animation.duration }}>
                  Till startsidan
                </button>
              </div>
            )}

            {/* S6 - DASHBOARD */}
            {currentScreen === 'dashboard' && (
              <div className="flex flex-col h-full animate-fade-in">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <AnnotationFocus id="greeting-text" isActive={activeAnnotationId === 'd5'} annotation={getAnnotation('d5')} focusType="box" theme={currentTheme}>
                        <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>{currentTheme.name === 'morning' ? 'God morgon! ☀️' : 'God kväll! 🌙'}</p>
                      </AnnotationFocus>
                      <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>Emma</h2>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setCurrentScreen('settings')} className="p-2 rounded-lg transition-all" style={{ background: currentTheme.colors.cardBg }}>
                        <svg className="w-5 h-5" style={{ color: currentTheme.colors.textSecondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      <button onClick={() => setCurrentScreen('logging')} className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                        style={{ background: currentTheme.gradients.button, color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff', transitionDuration: currentTheme.animation.duration }}>
                        Logga sömn
                      </button>
                    </div>
                  </div>
                </div>
                <AnnotationFocus id="sleep-score" isActive={activeAnnotationId === 'd3'} annotation={getAnnotation('d3')} focusType="glow" theme={currentTheme}>
                  <div className="rounded-2xl p-6 mb-6 transition-all cursor-pointer" onClick={() => setCurrentScreen('insights')}
                    style={{ background: currentTheme.gradients.score, border: `1px solid ${currentTheme.colors.border}`, boxShadow: currentTheme.shadows.md }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: currentTheme.colors.textSecondary }}>Sömnpoäng</p>
                        <p className="text-4xl font-bold" style={{ color: currentTheme.colors.text }}>78</p>
                        <p className="text-sm mt-1 flex items-center gap-1" style={{ color: currentTheme.colors.success }}>
                          <TrendingUp className="w-4 h-4" />+5 sedan förra veckan
                        </p>
                      </div>
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse-slow" style={{ border: `4px solid ${currentTheme.colors.highlight}` }}>
                          {currentTheme.name === 'morning' ? <Sun className="w-8 h-8" style={{ color: currentTheme.colors.highlight }} /> : <Moon className="w-8 h-8" style={{ color: currentTheme.colors.highlight }} />}
                        </div>
                        <AnnotationFocus id="insight-badge" isActive={activeAnnotationId === 'd4'} annotation={getAnnotation('d4')} focusType="box" theme={currentTheme}>
                          {showInsightBadge && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-bounce"
                              style={{ background: currentTheme.colors.danger, color: currentTheme.colors.text }}>3</div>
                          )}
                        </AnnotationFocus>
                      </div>
                    </div>
                  </div>
                </AnnotationFocus>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>Dagens mikromål</h3>
                    <button onClick={() => setCurrentScreen('habitLibrary')} className="text-sm transition-colors" style={{ color: currentTheme.colors.highlight }}>Se alla</button>
                  </div>
                  <AnnotationFocus id="habit-cards" isActive={activeAnnotationId === 'd2'} annotation={getAnnotation('d2')} focusType="ring" theme={currentTheme}>
                    <div className="space-y-3">
                      {habits.map(habit => (
                        <HabitCard key={habit.id} habit={habit} checked={habitChecked[habit.id]} onCheck={() => handleHabitCheck(habit.id)}
                          onDetail={() => { setSelectedHabit(habit); setCurrentScreen('habitDetail'); }} showXP={justChecked === habit.id} theme={currentTheme} />
                      ))}
                    </div>
                  </AnnotationFocus>
                </div>
                <AnnotationFocus id="level-progress" isActive={activeAnnotationId === 'd1'} annotation={getAnnotation('d1')} focusType="ring" theme={currentTheme}>
                  <div className="rounded-2xl p-4 transition-all" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Level 2: Rutinbyggare 🏗️</span>
                      <span className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>65%</span>
                    </div>
                    <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: currentTheme.colors.cardBg }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: '65%', background: currentTheme.gradients.button, transitionDuration: currentTheme.animation.slow }} />
                    </div>
                    <p className="text-xs mt-2" style={{ color: currentTheme.colors.textSecondary }}>13 mikromål till: Sömnoptimera 🎯</p>
                    <button onClick={(e) => {
                              e.stopPropagation();
                              setShowLevelUp(true);
                            }}
                            className="w-full mt-3 text-xs py-2 rounded-lg transition-all hover:scale-105"
                            style={{ background: `${currentTheme.colors.highlight}33`,
                                     color: currentTheme.colors.highlight }}>
                      👀 Förhandsgranska Level Up
                    </button>
                  </div>
                </AnnotationFocus>
              </div>
            )}

            {/* S7 - LOGGING */}
            {currentScreen === 'logging' && (
              <div className="flex flex-col h-full animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Logga sömn</h2>
                  <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Hur sov du i natt?</p>
                </div>
                <div className="flex-1 space-y-6">
                  <AnnotationFocus id="time-inputs" isActive={activeAnnotationId === 'l1'} annotation={getAnnotation('l1')} focusType="box" theme={currentTheme}>
                    <div className="space-y-6">
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>När somnade du?</label>
                        <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} className="w-full px-4 py-3 rounded-xl text-lg transition-all outline-none"
                          style={{ background: currentTheme.colors.cardBg, color: currentTheme.colors.text, border: `2px solid ${currentTheme.colors.border}` }} />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>När vaknade du?</label>
                        <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="w-full px-4 py-3 rounded-xl text-lg transition-all outline-none"
                          style={{ background: currentTheme.colors.cardBg, color: currentTheme.colors.text, border: `2px solid ${currentTheme.colors.border}` }} />
                      </div>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="duration-display" isActive={activeAnnotationId === 'l2'} annotation={getAnnotation('l2')} focusType="glow" theme={currentTheme}>
                    <div className="rounded-2xl p-6 text-center animate-scale-in" style={{ background: currentTheme.gradients.success, border: `1px solid ${currentTheme.colors.border}` }}>
                      <p className="text-sm mb-2" style={{ color: currentTheme.colors.textSecondary }}>Din sömn</p>
                      <p className="text-3xl font-bold mb-1" style={{ color: currentTheme.colors.text }}>{calculateDuration()}</p>
                      <p className="text-sm flex items-center justify-center gap-1" style={{ color: currentTheme.colors.highlight }}>
                        <Sparkles className="w-4 h-4" />Bra jobbat!
                      </p>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="mood-picker" isActive={activeAnnotationId === 'l3'} annotation={getAnnotation('l3')} focusType="box" theme={currentTheme}>
                    <div>
                      <label className="block mb-3 text-sm" style={{ color: currentTheme.colors.textSecondary }}>Hur mår du idag? (valfritt)</label>
                      <div className="flex justify-between">
                        {['😫', '😕', '😐', '🙂', '😊'].map((emoji, idx) => (
                          <button key={idx} className="text-4xl transition-transform hover:scale-110 active:scale-95" style={{ transitionDuration: currentTheme.animation.duration }}>{emoji}</button>
                        ))}
                      </div>
                    </div>
                  </AnnotationFocus>
                </div>
                <div className="space-y-3">
                  <button onClick={() => setCurrentScreen('dashboard')} className="w-full font-semibold py-4 px-6 rounded-2xl transition-all hover:scale-105 active:scale-95"
                    style={{ background: currentTheme.gradients.button, color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff', boxShadow: currentTheme.shadows.lg, transitionDuration: currentTheme.animation.duration }}>
                    Spara
                  </button>
                  <button className="w-full text-sm transition-colors" style={{ color: currentTheme.colors.textSecondary }}>Hoppa över</button>
                </div>
              </div>
            )}

            {/* S8 - HABIT DETAIL */}
            {currentScreen === 'habitDetail' && selectedHabit && (
              <div className="flex flex-col h-full animate-slide-in">
                <button onClick={() => setCurrentScreen('dashboard')} className="flex items-center gap-2 mb-6 transition-colors" style={{ color: currentTheme.colors.textSecondary }}>
                  <ChevronLeft className="w-5 h-5" />Tillbaka
                </button>
                <div className="flex-1 overflow-y-auto space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-3 animate-bounce-slow">{selectedHabit.emoji}</div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: currentTheme.colors.text }}>{selectedHabit.title}</h2>
                    <p style={{ color: currentTheme.colors.textSecondary }}>{selectedHabit.description}</p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: selectedHabit.difficulty === 'easy' ? `${currentTheme.colors.green}33` : selectedHabit.difficulty === 'medium' ? `${currentTheme.colors.yellow}33` : `${currentTheme.colors.red}33`,
                               color: selectedHabit.difficulty === 'easy' ? currentTheme.colors.green : selectedHabit.difficulty === 'medium' ? currentTheme.colors.yellow : currentTheme.colors.red }}>
                      {selectedHabit.difficulty === 'easy' ? 'Lätt' : selectedHabit.difficulty === 'medium' ? 'Medel' : 'Svår'}
                    </span>
                  </div>
                  <AnnotationFocus id="week-calendar" isActive={activeAnnotationId === 'h1'} annotation={getAnnotation('h1')} focusType="ring" theme={currentTheme}>
                    <div className="rounded-2xl p-4" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                        <Calendar className="w-4 h-4" />Denna vecka
                      </h3>
                      <div className="flex justify-between">
                        {['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((day, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-2">
                            <span className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>{day}</span>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                              style={{ background: selectedHabit.week[idx] ? currentTheme.colors.success : currentTheme.colors.cardBg, boxShadow: selectedHabit.week[idx] ? currentTheme.shadows.sm : 'none', border: idx === 0 ? `2px solid ${currentTheme.colors.highlight}` : 'none' }}>
                              {selectedHabit.week[idx] ? <Check className="w-5 h-5" style={{ color: currentTheme.colors.text }} /> : <span style={{ color: currentTheme.colors.textSecondary }}>-</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-center mt-3 text-sm font-semibold" style={{ color: currentTheme.colors.warning }}>{selectedHabit.streak} dagar i rad! 🔥</p>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="why-section" isActive={activeAnnotationId === 'h2'} annotation={getAnnotation('h2')} focusType="glow" theme={currentTheme}>
                    <div className="rounded-2xl p-4" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                      <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                        <Info className="w-4 h-4" style={{ color: currentTheme.colors.highlight }} />Varför?
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: currentTheme.colors.textSecondary }}>
                        Blått ljus från skärmar hämmar melatonin, kroppens sömnhormon. Att lägga undan telefonen ger hjärnan tid att förbereda sig för vila.
                      </p>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="how-section" isActive={activeAnnotationId === 'h3'} annotation={getAnnotation('h3')} focusType="box" theme={currentTheme}>
                    <div className="rounded-2xl p-4" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                        <Zap className="w-4 h-4" style={{ color: currentTheme.colors.warning }} />Hur gör du?
                      </h3>
                      <ol className="space-y-2">
                        {['Sätt telefonen på laddning utanför sovrummet', '30 minuter innan din vanliga sänggåendetid', 'Ersätt med bok, musik eller stretching'].map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                              style={{ background: `${currentTheme.colors.highlight}33`, color: currentTheme.colors.highlight }}>{idx + 1}</span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="expected-result" isActive={activeAnnotationId === 'h4'} annotation={getAnnotation('h4')} focusType="box" theme={currentTheme}>
                    <div className="rounded-2xl p-4" style={{ background: currentTheme.gradients.success, border: `1px solid ${currentTheme.colors.border}` }}>
                      <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                        <Target className="w-4 h-4" style={{ color: currentTheme.colors.success }} />Förväntad effekt
                      </h3>
                      <p className="text-sm font-medium" style={{ color: currentTheme.colors.success }}>~20 min snabbare insomning efter 2 veckor</p>
                    </div>
                  </AnnotationFocus>
                </div>
                <button onClick={() => { handleHabitCheck(selectedHabit.id); setCurrentScreen('dashboard'); }}
                  className="w-full font-semibold py-4 px-6 rounded-2xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: currentTheme.gradients.button, color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff', boxShadow: currentTheme.shadows.lg, transitionDuration: currentTheme.animation.duration }}>
                  {habitChecked[selectedHabit.id] ? 'Markera som ej genomförd' : 'Markera som genomförd'}
                </button>
              </div>
            )}

            {/* S9 - HABIT LIBRARY */}
            {currentScreen === 'habitLibrary' && (
              <div className="flex flex-col h-full animate-fade-in">
                <button onClick={() => setCurrentScreen('dashboard')} className="flex items-center gap-2 mb-6 transition-colors" style={{ color: currentTheme.colors.textSecondary }}>
                  <ChevronLeft className="w-5 h-5" />Tillbaka
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Alla mikromål</h2>
                  <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Välj upp till 3 aktiva mål</p>
                </div>
                <AnnotationFocus id="habit-list" isActive={activeAnnotationId === 'hl3'} annotation={getAnnotation('hl3')} focusType="ring" theme={currentTheme}>
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {allHabits.map((habit) => (
                      <AnnotationFocus
                        key={habit.id}
                        id="locked-habits"
                        isActive={activeAnnotationId === 'hl1' && habit.isLocked}
                        annotation={getAnnotation('hl1')}
                        focusType="glow"
                        theme={currentTheme}>
                        <div className="p-4 rounded-2xl transition-all" onClick={() => { if (!habit.isLocked) { setSelectedHabit(habit); setCurrentScreen('habitDetail'); } }}
                          style={{ background: habit.isLocked ? `${currentTheme.colors.cardBg}80` : currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}`, opacity: habit.isLocked ? 0.6 : 1, cursor: habit.isLocked ? 'not-allowed' : 'pointer', transitionDuration: currentTheme.animation.duration }}>
                          <div className="flex items-center gap-3">
                            <div className="text-3xl" style={{ filter: habit.isLocked ? 'grayscale(100%)' : 'none', opacity: habit.isLocked ? 0.5 : 1 }}>
                              {habit.isLocked ? '🔒' : habit.emoji}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1" style={{ color: habit.isLocked ? currentTheme.colors.textSecondary : currentTheme.colors.text }}>{habit.title}</h3>
                              <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                                {habit.isLocked ? `Lås upp på Level ${habit.unlockLevel}` : habit.description}
                              </p>
                            </div>
                            <AnnotationFocus id="difficulty-badge" isActive={activeAnnotationId === 'hl2'} annotation={getAnnotation('hl2')} focusType="box" theme={currentTheme}>
                              <span className="text-xs px-2 py-1 rounded-full"
                                style={{ background: habit.difficulty === 'easy' ? `${currentTheme.colors.green}33` : habit.difficulty === 'medium' ? `${currentTheme.colors.yellow}33` : `${currentTheme.colors.red}33`,
                                         color: habit.difficulty === 'easy' ? currentTheme.colors.green : habit.difficulty === 'medium' ? currentTheme.colors.yellow : currentTheme.colors.red }}>
                                {habit.difficulty === 'easy' ? 'Lätt' : habit.difficulty === 'medium' ? 'Medel' : 'Svår'}
                              </span>
                            </AnnotationFocus>
                          </div>
                        </div>
                      </AnnotationFocus>
                    ))}
                  </div>
                </AnnotationFocus>
              </div>
            )}

            {/* S10 - INSIGHTS */}
            {currentScreen === 'insights' && (
              <div className="flex flex-col h-full animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Insikter</h2>
                  <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Baserat på 23 nätters data</p>
                </div>
                <div className="flex-1 overflow-y-auto space-y-6">
                  <AnnotationFocus id="score-breakdown" isActive={activeAnnotationId === 'i3'} annotation={getAnnotation('i3')} focusType="box" theme={currentTheme}>
                    <div className="rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-all" onClick={() => setCurrentScreen('scoreDetail')}
                      style={{ background: currentTheme.gradients.score, border: `1px solid ${currentTheme.colors.border}`, boxShadow: currentTheme.shadows.md, transitionDuration: currentTheme.animation.duration }}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm mb-1" style={{ color: currentTheme.colors.textSecondary }}>Sömnpoäng</p>
                          <p className="text-5xl font-bold" style={{ color: currentTheme.colors.text }}>78</p>
                        </div>
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse-slow" style={{ border: `4px solid ${currentTheme.colors.highlight}` }}>
                            {currentTheme.name === 'morning' ? <Sun className="w-10 h-10" style={{ color: currentTheme.colors.highlight }} /> : <Moon className="w-10 h-10" style={{ color: currentTheme.colors.highlight }} />}
                          </div>
                          {showInsightBadge && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-bounce"
                              style={{ background: currentTheme.colors.danger, color: currentTheme.colors.text }}>3</div>
                            )}
                          {/*Two parts union*/}
</div>
                      </div>
                      <AnnotationFocus id="score-metrics" isActive={activeAnnotationId === 'i4'} annotation={getAnnotation('i4')} focusType="glow" theme={currentTheme}>
                        <div className="space-y-2">
                          <ScoreBreakdown label="Längd" value={82} color="blue" theme={currentTheme} />
                          <ScoreBreakdown label="Konsistens" value={75} color="purple" theme={currentTheme} />
                          <ScoreBreakdown label="Kvalitet" value={78} color="green" theme={currentTheme} />
                          <ScoreBreakdown label="Humör" value={72} color="yellow" theme={currentTheme} />
                        </div>
                      </AnnotationFocus>
                      <p className="text-xs mt-3 text-center" style={{ color: currentTheme.colors.textSecondary }}>Tryck för mer detaljer</p>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="key-insight" isActive={activeAnnotationId === 'i1'} annotation={getAnnotation('i1')} focusType="glow" theme={currentTheme}>
                    <div className="rounded-2xl p-5 animate-scale-in" style={{ background: currentTheme.gradients.positive, border: `1px solid ${currentTheme.colors.green}40` }}>
                      <div className="flex items-start gap-3 mb-2">
                        <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: currentTheme.colors.green }} />
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: currentTheme.colors.text }}>Nyckelinsikt</h3>
                          <p className="text-sm leading-relaxed" style={{ color: currentTheme.colors.textSecondary }}>
                            Du somnar <span className="font-bold" style={{ color: currentTheme.colors.green }}>38% snabbare</span> när du lägger undan telefonen 30 min före sänggående
                          </p>
                          <p className="text-xs mt-2" style={{ color: currentTheme.colors.textSecondary }}>Baserat på 12 nätter</p>
                        </div>
                      </div>
                    </div>
                  </AnnotationFocus>
                  <AnnotationFocus id="weekly-chart" isActive={activeAnnotationId === 'i2'} annotation={getAnnotation('i2')} focusType="ring" theme={currentTheme}>
                    <div className="rounded-2xl p-4" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                      <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                        <BarChart3 className="w-4 h-4" />Senaste veckan
                      </h3>
                      <div className="flex items-end justify-between gap-2 h-32">
                        {sleepData.map((day, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                              style={{ height: `${(day.hours / 10) * 100}%`, background: day.hours >= 7 ? currentTheme.colors.green : day.hours >= 6 ? currentTheme.colors.warning : currentTheme.colors.red, transitionDuration: currentTheme.animation.duration }} />
                            <span className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>{day.day}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4 text-xs">
                        <span style={{ color: currentTheme.colors.textSecondary }}>Ø 7.5t</span>
                        <div className="flex gap-3">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ background: currentTheme.colors.green }}></div>
                            <span style={{ color: currentTheme.colors.textSecondary }}>≥7t</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ background: currentTheme.colors.warning }}></div>
                            <span style={{ color: currentTheme.colors.textSecondary }}>6-7t</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ background: currentTheme.colors.red }}></div>
                            <span style={{ color: currentTheme.colors.textSecondary }}>&lt;6t</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </AnnotationFocus>
                  <button onClick={() => { setShowInsightBadge(false); setCurrentScreen('patterns'); }}
                    className="w-full font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                    style={{ background: currentTheme.gradients.button, color: currentTheme.name === 'morning' ? '#2d3142' : '#ffffff', boxShadow: currentTheme.shadows.lg, transitionDuration: currentTheme.animation.duration }}>
                    Se alla mönster <Target className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}


            {currentScreen === 'patterns' && (
              <div className="flex flex-col h-full animate-fade-in">
                <button onClick={() => setCurrentScreen('insights')} className="flex items-center gap-2 mb-6 transition-colors" style={{ color: currentTheme.colors.textSecondary }}>
                  <ChevronLeft className="w-5 h-5" />Tillbaka
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Upptäckta mönster</h2>
                  <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>3 nya insikter</p>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {/* pa1: Show all cards together with ring focus */}
                  {activeAnnotationId === 'pa1' ? (
                    <AnnotationFocus id="pattern-cards" isActive={true} annotation={getAnnotation('pa1')} focusType="ring" theme={currentTheme}>
                      <div className="space-y-4">
                        {patterns.map((pattern, idx) => (
                          <PatternCard key={pattern.id} pattern={pattern} delay={`${idx * 100}ms`} theme={currentTheme} />
                        ))}
                      </div>
                    </AnnotationFocus>
                  ) : (
                    /* pa2-pa4 or no annotation: Show individual cards with specific focuses */
                    <>
                      <AnnotationFocus id="sample-size" isActive={activeAnnotationId === 'pa2'} annotation={getAnnotation('pa2')} focusType="box" theme={currentTheme}>
                        <PatternCard pattern={patterns[0]} delay="0ms" theme={currentTheme} />
                      </AnnotationFocus>

                      <AnnotationFocus id="percentage-stat" isActive={activeAnnotationId === 'pa3'} annotation={getAnnotation('pa3')} focusType="box" theme={currentTheme}>
                        <PatternCard pattern={patterns[1]} delay="100ms" theme={currentTheme} />
                      </AnnotationFocus>

                      <AnnotationFocus id="add-goal-button" isActive={activeAnnotationId === 'pa4'} annotation={getAnnotation('pa4')} focusType="glow" theme={currentTheme}>
                        <PatternCard pattern={patterns[2]} delay="200ms" theme={currentTheme} />
                      </AnnotationFocus>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* S12 - SCORE DETAIL */}
            {currentScreen === 'scoreDetail' && (
              <div className="flex flex-col h-full animate-fade-in">
                <button onClick={() => setCurrentScreen('insights')} className="flex items-center gap-2 mb-6 transition-colors" style={{ color: currentTheme.colors.textSecondary }}>
                  <ChevronLeft className="w-5 h-5" />Tillbaka
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Sömnpoäng</h2>
                  <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Hur beräknas ditt poäng?</p>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4">
                  <AnnotationFocus id="score-weights" isActive={activeAnnotationId === 'sd1'} annotation={getAnnotation('sd1')} focusType="box" theme={currentTheme}>
                    <ScoreDetailCard title="Längd (40%)" score={82} color="blue" description="Du sover i genomsnitt 7.5h per natt. Ditt mål är 8t." tip="Försök gå och lägga dig 30 min tidigare för att nå ditt mål." theme={currentTheme} />
                  </AnnotationFocus>
                  <AnnotationFocus id="metric-bars" isActive={activeAnnotationId === 'sd3'} annotation={getAnnotation('sd3')} focusType="ring" theme={currentTheme}>
                    <ScoreDetailCard title="Konsistens (30%)" score={75} color="purple" description="Din sänggåendetid varierar ±45 min. Bra, men kan förbättras." tip="Håll samma rutiner även på helger för bättre konsistens." theme={currentTheme} />
                  </AnnotationFocus>
                  <AnnotationFocus id="improvement-tips" isActive={activeAnnotationId === 'sd2'} annotation={getAnnotation('sd2')} focusType="box" theme={currentTheme}>
                    <div>
                      <ScoreDetailCard title="Kvalitet (20%)" score={78} color="green" description="Baserat på hur du mår och sömnlängd. Ganska bra!" tip="Fortsätt med dina aktiva mikromål för ännu bättre kvalitet." theme={currentTheme} />
                    </div>
                  </AnnotationFocus>
                  <ScoreDetailCard title="Humör (10%)" score={72} color="yellow" description="Ditt morgonhumör är mestadels positivt (🙂 eller 😊)." tip="Humöret kan förbättras med bättre sömnkvalitet." theme={currentTheme} />
                </div>
              </div>
            )}

            {/* S13 - HISTORY */}
            {currentScreen === 'history' && (
              <div className="flex flex-col h-full animate-fade-in">
                <button onClick={() => setCurrentScreen('insights')} className="flex items-center gap-2 mb-6 transition-colors" style={{ color: currentTheme.colors.textSecondary }}>
                  <ChevronLeft className="w-5 h-5" />Tillbaka
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Historik</h2>
                  <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Senaste 14 dagarna</p>
                </div>
                <AnnotationFocus id="history-list" isActive={activeAnnotationId === 'hi1'} annotation={getAnnotation('hi1')} focusType="ring" theme={currentTheme}>
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {historyData.map((entry, idx) => (
                      <div key={idx} className="rounded-2xl p-4 transition-all cursor-pointer hover:scale-[1.02]"
                        style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}`, transitionDuration: currentTheme.animation.duration }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold" style={{ color: currentTheme.colors.text }}>{entry.date}</span>
                          <AnnotationFocus id="sleep-duration-badge" isActive={activeAnnotationId === 'hi2' && idx === 0} annotation={getAnnotation('hi2')} focusType="glow" theme={currentTheme}>
                            <span className="text-sm px-2 py-1 rounded-lg"
                              style={{ background: entry.hours >= 7 ? `${currentTheme.colors.green}33` : entry.hours >= 6 ? `${currentTheme.colors.yellow}33` : `${currentTheme.colors.red}33`,
                                       color: entry.hours >= 7 ? currentTheme.colors.green : entry.hours >= 6 ? currentTheme.colors.yellow : currentTheme.colors.red }}>
                              {entry.hours}h
                            </span>
                          </AnnotationFocus>
                        </div>
                        <div className="flex items-center gap-4 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                          <span>🌙 {entry.bedtime}</span>
                          <span>→</span>
                          <span>☀️ {entry.wakeTime}</span>
                          <AnnotationFocus id="mood-emoji" isActive={activeAnnotationId === 'hi3' && idx === 0} annotation={getAnnotation('hi3')} focusType="box" theme={currentTheme}>
                            <span className="ml-auto">{['😫', '😕', '😐', '🙂', '😊'][entry.mood - 1]}</span>
                          </AnnotationFocus>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnnotationFocus>
              </div>
            )}

            {/* S14 - SETTINGS */}
            {currentScreen === 'settings' && (
              <div className="flex flex-col h-full animate-fade-in">
                <button onClick={() => setCurrentScreen('dashboard')} className="flex items-center gap-2 mb-6 transition-colors" style={{ color: currentTheme.colors.textSecondary }}>
                  <ChevronLeft className="w-5 h-5" />Tillbaka
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>Inställningar</h2>
                </div>
                <div className="flex-1 overflow-y-auto space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: currentTheme.colors.text }}>Notifikationer</h3>
                    <AnnotationFocus id="toggle-switches" isActive={activeAnnotationId === 's1'} annotation={getAnnotation('s1')} focusType="ring" theme={currentTheme}>
                      <div className="space-y-3">
                        <div className="rounded-xl p-4 flex items-center justify-between transition-all" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5" style={{ color: currentTheme.colors.highlight }} />
                            <div>
                              <p className="font-medium" style={{ color: currentTheme.colors.text }}>Morgonpåminnelse</p>
                              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Logga din sömn kl 07:00</p>
                            </div>
                          </div>
                          <ToggleSwitch enabled={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} theme={currentTheme} />
                        </div>
                      </div>
                    </AnnotationFocus>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: currentTheme.colors.text }}>Säkerhet</h3>
                    <div className="space-y-3">
                      <div className="rounded-xl p-4 flex items-center justify-between transition-all" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5" style={{ color: currentTheme.colors.highlight }} />
                          <div>
                            <p className="font-medium" style={{ color: currentTheme.colors.text }}>Face ID</p>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Lås upp med ansiktsigenkänning</p>
                          </div>
                        </div>
                        <ToggleSwitch enabled={faceIdEnabled} onToggle={() => setFaceIdEnabled(!faceIdEnabled)} theme={currentTheme} />
                      </div>
                      <button className="rounded-xl p-4 w-full text-left transition-all hover:scale-[1.02]" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}`, transitionDuration: currentTheme.animation.duration }}>
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5" style={{ color: currentTheme.colors.highlight }} />
                          <div>
                            <p className="font-medium" style={{ color: currentTheme.colors.text }}>Ändra PIN-kod</p>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Uppdatera din säkerhetskod</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: currentTheme.colors.text }}>Data</h3>
                    <div className="space-y-3">
                      <button onClick={() => setCurrentScreen('history')} className="rounded-xl p-4 w-full text-left transition-all hover:scale-[1.02]" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}`, transitionDuration: currentTheme.animation.duration }}>
                        <div className="flex items-center gap-3">
                          <Info className="w-5 h-5" style={{ color: currentTheme.colors.highlight }} />
                          <div>
                            <p className="font-medium" style={{ color: currentTheme.colors.text }}>Visa historik</p>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Se och redigera tidigare loggningar</p>
                          </div>
                        </div>
                      </button>
                      <button className="rounded-xl p-4 w-full text-left transition-all hover:scale-[1.02]" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}`, transitionDuration: currentTheme.animation.duration }}>
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5" style={{ color: currentTheme.colors.highlight }} />
                          <div>
                            <p className="font-medium" style={{ color: currentTheme.colors.text }}>Exportera data</p>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Ladda ner som CSV-fil</p>
                          </div>
                        </div>
                      </button>
                      <AnnotationFocus id="delete-button" isActive={activeAnnotationId === 's2'} annotation={getAnnotation('s2')} focusType="box" theme={currentTheme}>
                        <button className="rounded-xl p-4 w-full text-left transition-all hover:scale-[1.02]" style={{ background: `${currentTheme.colors.danger}20`, border: `1px solid ${currentTheme.colors.danger}40`, transitionDuration: currentTheme.animation.duration }}>
                          <div className="flex items-center gap-3">
                            <Trash2 className="w-5 h-5" style={{ color: currentTheme.colors.danger }} />
                            <div>
                              <p className="font-medium" style={{ color: currentTheme.colors.danger }}>Radera alla data</p>
                              <p className="text-sm" style={{ color: `${currentTheme.colors.danger}cc` }}>Permanent borttagning</p>
                            </div>
                          </div>
                        </button>
                      </AnnotationFocus>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: currentTheme.colors.text }}>Om appen</h3>
                    <div className="rounded-xl p-4" style={{ background: currentTheme.colors.cardBg, border: `1px solid ${currentTheme.colors.border}` }}>
                      <p className="text-sm mb-2" style={{ color: currentTheme.colors.textSecondary }}>Version 1.0.0</p>
                      <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Sömnlogg är en privacy-first sömntracker för tonåringar</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }

        .phone-container {
          width: 375px;
          height: 812px;
          max-width: none;
          margin: 0 auto;
        }

        .screen-content {
          height: 600px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .screen-content::-webkit-scrollbar,
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .screen-content,
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${currentTheme.colors.highlight};
          cursor: pointer;
          box-shadow: ${currentTheme.shadows.md};
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${currentTheme.colors.highlight};
          cursor: pointer;
          border: none;
          box-shadow: ${currentTheme.shadows.md};
        }

        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: ${currentTheme.name === 'morning' ? 'invert(0)' : 'invert(1)'};
          cursor: pointer;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};




// ==================== ANNOTATION FOCUS COMPONENT ====================
const AnnotationFocus = ({ id, isActive, annotation, children, focusType = 'ring' }) => {
  const colorMap = {
    blue: { main: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)' },
    green: { main: '#10b981', glow: 'rgba(16, 185, 129, 0.3)' },
    purple: { main: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.3)' },
    yellow: { main: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)' }
  };

  const color = colorMap[annotation?.color] || colorMap.blue;

  const focusStyles = {
    ring: {
      outline: '4px solid', outlineColor: color.main, outlineOffset: '8px', borderRadius: '16px',
      boxShadow: `0 0 0 12px ${color.glow}, 0 0 40px ${color.glow}`, position: 'relative', zIndex: 100
    },
    box: {
      border: '3px solid', borderColor: color.main, borderRadius: '12px', background: color.glow,
      position: 'relative', zIndex: 100, boxShadow: `0 0 30px ${color.glow}`
    },
    glow: {
      boxShadow: `0 0 0 6px ${color.glow}, 0 0 30px ${color.main}`, borderRadius: '16px',
      position: 'relative', zIndex: 100, transform: 'scale(1.02)'
    }
  };

  useEffect(() => {
    if (isActive) {
      const element = document.getElementById(`focus-${id}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }, 100);
      }
    }
  }, [isActive, id]);

  return (
    <div id={`focus-${id}`} className="transition-all duration-500" style={isActive ? focusStyles[focusType] : {}}>
      {children}
      {isActive && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center z-50"
          style={{ background: color.main, animation: 'pulse 2s infinite', boxShadow: `0 0 20px ${color.main}` }}>
          <div className="w-3 h-3 rounded-full bg-white"></div>
        </div>
      )}
    </div>
  );
};

// ==================== ANNOTATION CARD ====================
const AnnotationCard = ({ annotation, currentIndex, totalCount, onNext, onPrevious, onClose, language, screenContext, currentTheme }) => {
  if (!annotation) return null;

  const colorMap = { blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6', yellow: '#f59e0b' };
  const color = colorMap[annotation.color] || colorMap.blue;

    // Touch/swipe handlers for mobile navigation
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const isDragging = useRef(false);

    const handleSwipeStart = (e) => {
      // Don't interfere with button clicks
      if (e.target.closest('button')) return;

      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

      touchStartX.current = clientX;
      touchStartY.current = clientY;
      isDragging.current = false;
    };

    const handleSwipeMove = (e) => {
      if (touchStartX.current === 0) return;

      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

      const deltaX = Math.abs(clientX - touchStartX.current);
      const deltaY = Math.abs(clientY - touchStartY.current);

      // Only consider it a swipe if horizontal movement is greater than vertical
      if (deltaX > deltaY && deltaX > 10) {
        isDragging.current = true;
        e.preventDefault(); // Prevent scrolling while swiping
      }
    };

    const handleSwipeEnd = (e) => {
      if (!isDragging.current || touchStartX.current === 0) {
        touchStartX.current = 0;
        touchStartY.current = 0;
        isDragging.current = false;
        return;
      }

      const clientX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
      const swipeDistance = touchStartX.current - clientX;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && currentIndex < totalCount - 1) {
          onNext();
        } else if (swipeDistance < 0 && currentIndex > 0) {
          onPrevious();
        }
      }

      touchStartX.current = 0;
      touchStartY.current = 0;
      isDragging.current = false;
    };

  const t = {
    sv: {
      previous: 'Föregående',
      next: 'Nästa',
      done: 'Klar med skärm',
      close: 'Stäng guide',
      navigate: 'Navigera till andra skärmar för fler insikter',
      of: 'av',
      screenContext: 'Du är i'
    },
    en: {
      previous: 'Previous',
      next: 'Next',
      done: 'Done with screen',
      close: 'Close guide',
      navigate: 'Navigate to other screens for more insights',
      of: 'of',
      screenContext: 'You are in'
    },
    es: {
      previous: 'Anterior',
      next: 'Siguiente',
      done: 'Hecho con pantalla',
      close: 'Cerrar guía',
      navigate: 'Navega a otras pantallas para más perspectivas',
      of: 'de',
      screenContext: 'Estás en'
    }
  }[language];

  const isLastAnnotation = currentIndex === totalCount - 1;

  return (
      <div
        className="rounded-2xl p-6 shadow-2xl animate-slide-up select-none"
        style={{
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `2px solid ${color}`,
          maxWidth: '500px',
          width: '90vw',
          touchAction: 'pan-y',
          cursor: isDragging.current ? 'grabbing' : 'grab'
        }}
        onTouchStart={handleSwipeStart}
        onTouchMove={handleSwipeMove}
        onTouchEnd={handleSwipeEnd}
        onMouseDown={handleSwipeStart}
        onMouseMove={handleSwipeMove}
        onMouseUp={handleSwipeEnd}
        onMouseLeave={handleSwipeEnd}
      >
      <div className="flex gap-2 mb-4 justify-center">
        {Array.from({ length: totalCount }).map((_, idx) => (
          <div key={idx} className="h-1.5 rounded-full transition-all"
            style={{ width: idx === currentIndex ? '32px' : '8px', background: idx === currentIndex ? color : 'rgba(255,255,255,0.3)' }} />
        ))}
      </div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${color}33`, color: color }}>
          {currentIndex + 1} {t.of} {totalCount}
        </span>
        {screenContext && (
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: currentTheme.colors.cardBg, color: currentTheme.colors.text }}>
            {t.screenContext} {screenContext}
          </span>
        )}
      </div>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: color }}>
          💡 {annotation.principle}
        </span>
        <h3 className="text-xl font-bold text-white mb-3">{annotation.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{annotation.description}</p>
        {isLastAnnotation && (
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <p className="text-blue-400 text-xs">💫 {t.navigate}</p>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        {currentIndex > 0 && (
          <button onClick={onPrevious} className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-all">
            ← {t.previous}
          </button>
        )}
        <button onClick={onNext} className="flex-1 px-4 py-3 rounded-xl text-white font-medium hover:scale-105 transition-all" style={{ background: color }}>
          {currentIndex < totalCount - 1 ? `${t.next} →` : `${t.done} ✓`}
        </button>
      </div>
      <button onClick={onClose} className="w-full mt-3 text-sm text-gray-400 hover:text-white transition-colors">
        {t.close}
      </button>
    </div>
  );
};

interface SomnloggPresentationProps {
  onThemeChange?: (themeName: 'morning' | 'evening') => void;
}

// ==================== MAIN PRESENTATION ====================
//const SomnloggPresentation = () => {
//const SomnloggPresentation = ({ onThemeChange }) => {
const SomnloggPresentation: React.FC<SomnloggPresentationProps> = ({ onThemeChange }) => {
  const [currentAnnotationIndex, setCurrentAnnotationIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const [language, setLanguage] = useState('sv');
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const presentationRef = useRef(null);
//  const [isInView, setIsInView] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const currentAnnotations = annotationDefinitions[language]?.[currentScreen] || [];
  const currentAnnotation = currentAnnotations[currentAnnotationIndex];

  const [themeMode, setThemeMode] = useState('auto');
  const [currentTheme, setCurrentTheme] = useState(themes.evening);

  const [showGuideIntro, setShowGuideIntro] = useState(false);
  const [viewedScreens, setViewedScreens] = useState(new Set());
  const [completedScreens, setCompletedScreens] = useState(new Set());
  const totalScreens = 14;




//  const handleThemeChange = (theme, mode) => {
//    setCurrentTheme(theme);
//    setThemeMode(mode);
//  };

//  const handleThemeChange = (newTheme) => {
//    setCurrentTheme(newTheme);
//    // Notify parent about theme change
//    if (onThemeChange) {
//      onThemeChange(newTheme.name); // 'morning' or 'evening'
//    }
//  };

  // Handle theme changes from SomnloggComplete
  const handleThemeChange = (theme: any, mode: string) => {
    console.log('📱 SomnloggPresentation received theme:', theme.name, 'mode:', mode);
    setCurrentTheme(theme);

    // Notify parent (App) about the theme name
    if (onThemeChange && theme.name) {
      onThemeChange(theme.name); // Pass just 'morning' or 'evening'
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    if (presentationRef.current) {
      observer.observe(presentationRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    if (currentAnnotationIndex < currentAnnotations.length - 1) {
      setCurrentAnnotationIndex(prev => prev + 1);
    } else {
      setCompletedScreens(prev => new Set([...prev, currentScreen]));
      setCurrentAnnotationIndex(0);
//      Guiden följer med automatiskt
//      setShowGuide(false);
    }
  };

  const handlePrevious = () => {
    if (currentAnnotationIndex > 0) {
      setCurrentAnnotationIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    setCurrentAnnotationIndex(0);
    if (showGuide) {
      setViewedScreens(prev => new Set([...prev, currentScreen]));
    }
  }, [currentScreen, showGuide]);

  const screenNames = {
    sv: {
      welcome: 'Välkomst', pin: 'PIN', profile: 'Profil', goalSelection: 'Målval',
      success: 'Framgång', dashboard: 'Dashboard', logging: 'Loggning', habitDetail: 'Vanedetalj',
      habitLibrary: 'Bibliotek', insights: 'Insikter', patterns: 'Mönster', scoreDetail: 'Poäng',
      history: 'Historik', settings: 'Inställningar'
    },
    en: {
      welcome: 'Welcome', pin: 'PIN', profile: 'Profile', goalSelection: 'Goals',
      success: 'Success', dashboard: 'Dashboard', logging: 'Logging', habitDetail: 'Habit',
      habitLibrary: 'Library', insights: 'Insights', patterns: 'Patterns', scoreDetail: 'Score',
      history: 'History', settings: 'Settings'
    },
    es: {
      welcome: 'Bienvenida', pin: 'PIN', profile: 'Perfil', goalSelection: 'Objetivos',
      success: 'Éxito', dashboard: 'Panel', logging: 'Registro', habitDetail: 'Hábito',
      habitLibrary: 'Biblioteca', insights: 'Perspectivas', patterns: 'Patrones', scoreDetail: 'Puntuación',
      history: 'Historial', settings: 'Ajustes'
    }
  };

  const guideIntroText = {
    sv: {
      title: 'Välkommen till UX-guiden',
      points: [
        'Varje skärm har designinsikter',
        'Navigera fritt mellan skärmar',
        'Guiden följer med automatiskt',
        `${totalScreens} skärmar att utforska`
      ],
      button: 'Börja utforska'
    },
    en: {
      title: 'Welcome to the UX Guide',
      points: [
        'Each screen has design insights',
        'Navigate freely between screens',
        'Guide follows automatically',
        `${totalScreens} screens to explore`
      ],
      button: 'Start exploring'
    },
    es: {
      title: 'Bienvenido a la Guía UX',
      points: [
        'Cada pantalla tiene perspectivas de diseño',
        'Navega libremente entre pantallas',
        'La guía te sigue automáticamente',
        `${totalScreens} pantallas para explorar`
      ],
      button: 'Comenzar a explorar'
    }
  };

  const guideButtonText = {
    sv: {
      off: '○ \u00A0 Guide Av',
      completed: '● Klar',
      on: (count) => `● \u00A0 Guide På (${count})`,
      onSimple: '● På'
    },
    en: {
      off: '○ \u00A0 Guide Off',
      completed: '● Done',
      on: (count) => `● \u00A0 Guide On (${count})`,
      onSimple: '● On'
    },
    es: {
      off: '○ \u00A0 Guía Apagada',
      completed: '● Listo',
      on: (count) => `● \u00A0 Guía Encendida (${count})`,
      onSimple: '● On'
    }
  };
  const getGuideButtonText = () => {
    const texts = guideButtonText[language];
    if (!showGuide) return texts.off;
    const isCompleted = completedScreens.has(currentScreen);
    const annotationCount = currentAnnotations.length;
    if (isCompleted) return texts.completed;
    if (annotationCount > 0) return texts.on(annotationCount);
    return texts.onSimple;
  };

  // Button intro animation
  const [showButtonIntro, setShowButtonIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtonIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const langLabels = { sv: 'SV', en: 'EN', es: 'SP' };

  // Also detect initial theme
  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(currentTheme.name);
    }
  }, [currentTheme.name, onThemeChange]);

//    <div ref={presentationRef} className="min-h-screen relative" style={{ background: '#0a0a0a' }}>
  return (
    <div ref={presentationRef} className="min-h-screen relative bg-slate-950">
      {/* Guide Toggle - Fixed height, original vertical design with intro animation */}
      {isInView && (
        <div className="fixed left-2 md:left-[max(2rem,calc(50%-240px))] top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-300">
          <button
            onClick={() => {
              if (!showGuide && viewedScreens.size === 0) {
                setShowGuideIntro(true);
              }
              setShowGuide(!showGuide);
            }}
            className="px-3 rounded-lg font-bold shadow-lg relative"
            style={{
              background: showGuide
                ? (completedScreens.has(currentScreen)
                    ? '#f59e0b'  // Orange for completed
                    : currentTheme.colors.highlight)  // Use theme highlight color
                : 'rgba(40,40,40,0.85)',
              color: showGuide ? currentTheme.colors.text : '#ffffff',  // Use theme text color when active
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: showButtonIntro ? 'rotate(180deg) scale(1.4)' : 'rotate(180deg) scale(1)',
              height: '120px',
              width: '32px',
              minWidth: '32px',
              fontSize: language === 'es' ? '0.65rem' : '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: showGuide ? 'none' : '2px solid rgba(255,255,255,0.3)',
              transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border 0.3s',
              whiteSpace: 'nowrap'
            }}
          >
            {getGuideButtonText()}
            {viewedScreens.size > 0 && (
              <span
                className="absolute -top-1 -right-1 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold"
                style={{
                  background: currentTheme.colors.highlight,
                  color: currentTheme.colors.text
                }}
              >
                {viewedScreens.size}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Language Selector */}
      {isInView && (
        <div className="fixed right-2 md:right-[max(2rem,calc(50%-240px))] top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2 transition-opacity duration-300">
          {Object.entries(langLabels).map(([code, label]) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs font-bold transition-all hover:scale-110 flex items-center justify-center shadow-lg"
              style={{
                background: language === code
                  ? currentTheme.colors.highlight
                  : 'rgba(255,255,255,0.1)',
                color: language === code
                  ? currentTheme.colors.text
                  : '#ffffff',
                transition: 'all 0.3s ease'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Guide Introduction Modal */}
      {showGuideIntro && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)', zIndex: 200 }}>
          <div className="rounded-2xl p-8 max-w-md" style={{ background: 'rgba(20,20,20,0.98)', border: '2px solid #10b981', zIndex: 201 }}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">💡</div>
              <h2 className="text-2xl font-bold text-white mb-2">{guideIntroText[language].title}</h2>
            </div>
            <ul className="space-y-3 mb-6">
              {guideIntroText[language].points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowGuideIntro(false)}
              className="w-full py-3 rounded-xl text-white font-bold hover:scale-105 transition-all"
              style={{ background: '#10b981' }}
            >
              {guideIntroText[language].button} →
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-screen p-4 md:p-8">
        {/*<SomnloggComplete*/}
        {/*  showNavigation={true}*/}
        {/*  activeAnnotationId={showGuide ? currentAnnotation?.id : null}*/}
        {/*  onScreenChange={setCurrentScreen}*/}
        {/*  onThemeChange={handleThemeChange}*/}
        {/*/>*/}
        {/* DEBUG MARKER: Top of somnlogg section */}
        <div
          id="somnlogg-top-marker"
          className="absolute left-0 right-0 h-1 bg-emerald-500/50 pointer-events-none z-30"
          style={{ top: 0 }}
        >
          <div className="absolute -top-6 left-2 text-xs font-mono text-emerald-500 bg-slate-900/80 px-2 py-1 rounded">
            📍 Somnlogg TOP
          </div>
        </div>
        <SomnloggComplete
          showNavigation={true}
          activeAnnotationId={showGuide ? currentAnnotation?.id : null}
          onScreenChange={setCurrentScreen}
          onThemeChange={handleThemeChange}
        />
        {/* DEBUG MARKER: Bottom of somnlogg section */}
        <div
          id="somnlogg-bottom-marker"
          className="absolute left-0 right-0 h-1 bg-orange-500/50 pointer-events-none z-30"
          style={{ bottom: 0 }}
        >
          <div className="absolute -bottom-6 left-2 text-xs font-mono text-orange-500 bg-slate-900/80 px-2 py-1 rounded">
            📍 Somnlogg BOTTOM
          </div>
        </div>

        {/* Floating Annotation Card */}
        {showGuide && currentAnnotation && isInView && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2" style={{ zIndex: 150 }}>
            <AnnotationCard
              annotation={currentAnnotation}
              currentIndex={currentAnnotationIndex}
              totalCount={currentAnnotations.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onClose={() => setShowGuide(false)}
              language={language}
              screenContext={screenNames[language]?.[currentScreen]}
              currentTheme={currentTheme}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SomnloggPresentation;





//<AnnotationFocus id="theme-icon" isActive={activeAnnotationId === 'w4'} annotation={getAnnotation('w4')} focusType="glow" theme={theme}>
//<AnnotationFocus id="feature-cards" isActive={activeAnnotationId === 'w1'} annotation={getAnnotation('w1')} focusType="ring" theme={theme}>
//<AnnotationFocus id="privacy-card" isActive={activeAnnotationId === 'w2'} annotation={getAnnotation('w2')} focusType="ring" theme={theme}>
//<AnnotationFocus id="cta-button" isActive={activeAnnotationId === 'w3'} annotation={getAnnotation('w3')} focusType="box" theme={theme}>
//<AnnotationFocus id="pin-instructions" isActive={activeAnnotationId === 'p3'} annotation={getAnnotation('p3')} focusType="glow" theme={theme}>
//<AnnotationFocus id="pin-dots" isActive={activeAnnotationId === 'p1'} annotation={getAnnotation('p1')} focusType="ring" theme={theme}>
//{/*<AnnotationFocus id="pin-keypad" isActive={activeAnnotationId === 'p2'} annotation={getAnnotation('p2')} focusType="box" theme={theme}>*/}
//<AnnotationFocus id="progress-indicator" isActive={activeAnnotationId === 'pr2'} annotation={getAnnotation('pr2')} focusType="ring" theme={theme}>
//<AnnotationFocus id="name-input" isActive={activeAnnotationId === 'pr1'} annotation={getAnnotation('pr1')} focusType="box" theme={theme}>
//<AnnotationFocus id="sleep-goal-slider" isActive={activeAnnotationId === 'pr3'} annotation={getAnnotation('pr3')} focusType="ring" theme={theme}>
//<AnnotationFocus id="bedtime-input" isActive={activeAnnotationId === 'pr4'} annotation={getAnnotation('pr4')} focusType="box" theme={theme}>