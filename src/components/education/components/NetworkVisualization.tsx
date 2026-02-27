// components/NetworkVisualization.tsx
import React from 'react';
import { Education } from '../types/types';
import { glassStyles } from '../styles/glassStyles';
import clsx from 'clsx';

interface NetworkVisualizationProps {
  education: Education[];
  selectedEducation?: Education;
  compact?: boolean;
  height?: number;
  showLabels?: boolean;
  interactive?: boolean;
  isVisible?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  connectedEducations?: Education[];
  skillsVisible?: boolean;
}

export const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  education,
  selectedEducation,
  compact = false,
  height = 300,
  showLabels = true,
  interactive = true,
  isVisible = true,
  isExpanded = false,
  onToggle,
  connectedEducations = [],
  skillsVisible = false
}) => {
  if (!isVisible) return null;

  const validEducations = education.filter(edu =>
    edu &&
    typeof edu === 'object' &&
    edu.id &&
    edu.institution
  );

  if (validEducations.length === 0) {
    return (
      <div className={clsx(
        'flex items-center justify-center text-sm',
        glassStyles.text.muted
      )} style={{ height }}>
        No education data to visualise
      </div>
    );
  }

  // Positions as fractions (0–1) relative to the SVG/container
  // Use a circle layout centered at (0.5, 0.5) with radius 0.38
  const calculateNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // start from top
    const radius = compact ? 0.28 : 0.38;
    const x = 0.5 + Math.cos(angle) * radius;
    const y = 0.5 + Math.sin(angle) * radius;
    return { x, y };
  };

  const getSmartAbbreviation = (text: string, maxLength: number = 8) => {
    if (!text || text.length <= 3) return text;
    const words = text.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 3).toUpperCase();
    }
    return words
      .map(word => word.substring(0, word.length <= 4 ? 2 : 3))
      .join('')
      .substring(0, maxLength)
      .toUpperCase();
  };

  const [focusedEducation, setFocusedEducation] = React.useState<Education | null>(null);
  const [showCenterInfo, setShowCenterInfo] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCenterInfo(false);
        setFocusedEducation(null);
      }
    };
    if (showCenterInfo) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showCenterInfo]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setShowCenterInfo(false);
      setFocusedEducation(null);
    }
  };

  const handleNodeClick = (edu: Education, event?: React.MouseEvent | React.TouchEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (focusedEducation?.id === edu.id) {
      setShowCenterInfo(false);
      setFocusedEducation(null);
    } else {
      setFocusedEducation(edu);
      setShowCenterInfo(true);
    }
  };

  // Single education case
  if (validEducations.length === 1) {
    const edu = validEducations[0];
    return (
      <div className="flex items-center justify-center relative" style={{ height }}>
        <div
          className={clsx(
            "w-16 h-16 rounded-full flex items-center justify-center relative cursor-pointer transition-transform",
            interactive && "hover:scale-110"
          )}
          style={{ backgroundColor: `${edu.color}20` }}
          onClick={interactive ? onToggle : undefined}
        >
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: edu.color }} />
          <div className="absolute -bottom-2 -right-2 text-xs font-bold px-2 py-1 rounded-full bg-black/50 text-white">
            {edu.impact || 0}%
          </div>
        </div>
        {showLabels && !compact && (
          <div className={clsx('absolute top-full mt-2 text-xs text-center', glassStyles.text.primary)}>
            {edu.institution}
          </div>
        )}
      </div>
    );
  }

  const nodeSize = compact ? 64 : 80; // px

  return (
    <div
      ref={containerRef}
      className={`
        mt-12 p-6 rounded-2xl ${glassStyles.card}
        animate-in fade-in slide-in-from-bottom duration-1000
      `}
    >
      <h3 className={`text-xl font-bold mb-6 ${glassStyles.text.primary} text-center`}>
        Learning Network &amp; Connections
      </h3>

      {/* Main visualisation container — position:relative, explicit height */}
      <div
        className="relative rounded-xl bg-black/5 dark:bg-white/5 overflow-hidden"
        style={{ height }}
      >
        {/* Backdrop for click-to-close */}
        {showCenterInfo && (
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
            onClick={handleBackdropClick}
          />
        )}

        {/* SVG for connection lines — fills entire container */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {validEducations.map(edu =>
              edu.connections?.map(connId => {
                const connEducation = validEducations.find(e => e.id === connId);
                if (!connEducation) return null;
                return (
                  <linearGradient
                    key={`gradient-${edu.id}-${connId}`}
                    id={`gradient-${edu.id}-${connId}`}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor={edu.color} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={connEducation.color} stopOpacity="0.5" />
                  </linearGradient>
                );
              })
            )}
          </defs>

          {validEducations.map(edu =>
            edu.connections?.map(connId => {
              const fromIndex = validEducations.findIndex(e => e.id === edu.id);
              const toIndex = validEducations.findIndex(e => e.id === connId);
              if (fromIndex === -1 || toIndex === -1) return null;

              const from = calculateNodePosition(fromIndex, validEducations.length);
              const to = calculateNodePosition(toIndex, validEducations.length);

              // Convert 0-1 fractions to SVG viewBox (0-100)
              return (
                <line
                  key={`${edu.id}-${connId}`}
                  x1={from.x * 100}
                  y1={from.y * 100}
                  x2={to.x * 100}
                  y2={to.y * 100}
                  stroke={`url(#gradient-${edu.id}-${connId})`}
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />
              );
            })
          )}
        </svg>

        {/* Nodes — absolutely positioned using % */}
        {validEducations.map((edu, i) => {
          const position = calculateNodePosition(i, validEducations.length);
          const isSelected = selectedEducation?.id === edu.id;
          const isFocused = focusedEducation?.id === edu.id;
          const isBlurred = showCenterInfo && !isFocused;

          return (
            <div
              key={edu.id}
              className={clsx(
                'absolute flex flex-col items-center',
                'transition-all duration-500',
                interactive && 'cursor-pointer',
                isBlurred && 'opacity-30',
                isFocused && 'z-40',
                !showCenterInfo && 'hover:scale-110 hover:z-30'
              )}
              style={{
                // Center the node on the calculated position
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                transform: 'translate(-50%, -50%)',
                filter: isBlurred ? 'blur(1px) brightness(0.7)' : 'none',
              }}
              onClick={interactive ? (e) => handleNodeClick(edu, e) : undefined}
              onTouchStart={interactive ? (e) => handleNodeClick(edu, e) : undefined}
            >
              <div
                className={clsx(
                  'rounded-full flex flex-col items-center justify-center',
                  glassStyles.card,
                  'border-2 relative overflow-hidden transition-all duration-500',
                  isFocused && 'shadow-2xl'
                )}
                style={{
                  width: nodeSize,
                  height: nodeSize,
                  backgroundColor: `${edu.color}${isBlurred ? '08' : '15'}`,
                  borderColor: `${edu.color}${isBlurred ? '30' : '60'}`,
                  boxShadow: isFocused ? `0 0 24px ${edu.color}50` : undefined,
                  outline: isFocused ? `3px solid ${edu.color}80` : undefined,
                  outlineOffset: 2,
                }}
              >
                {/* Impact ring */}
                <div
                  className="absolute inset-0 rounded-full border-2 opacity-40"
                  style={{
                    borderColor: edu.color,
                    transform: `scale(${0.8 + ((edu.impact || 0) / 100) * 0.2})`
                  }}
                />

                <div className="text-center z-10 px-1">
                  <div className={clsx(
                    'font-bold leading-tight mb-0.5',
                    compact ? 'text-[9px]' : 'text-[10px]',
                    glassStyles.text.primary
                  )}>
                    {getSmartAbbreviation(edu.institution)}
                  </div>
                  <div
                    className={clsx(compact ? 'text-sm font-bold' : 'text-base font-bold')}
                    style={{ color: edu.color }}
                  >
                    {edu.impact || 0}%
                  </div>
                  <div className={clsx('text-[9px] capitalize', glassStyles.text.muted)}>
                    {edu.complexity || 'medium'}
                  </div>
                </div>
              </div>

              {/* Label below node */}
              {showLabels && !compact && (
                <div
                  className={clsx(
                    'mt-1 text-[10px] text-center max-w-[80px] leading-tight',
                    glassStyles.text.secondary
                  )}
                >
                  {edu.institution}
                </div>
              )}
            </div>
          );
        })}

        {/* Info panel — absolutely centred in the container */}
        <div
          className={clsx(
            'absolute z-[200]',
            'transition-opacity duration-300',
            showCenterInfo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 240,
            maxWidth: 320,
          }}
        >
          {focusedEducation && (
            <div
              className={clsx(
                glassStyles.card,
                'rounded-xl p-5 shadow-2xl border border-white/30',
                'backdrop-blur-xl bg-white/10 dark:bg-black/30',
                'relative'
              )}
            >
              {/* Close button */}
              <button
                onClick={() => { setShowCenterInfo(false); setFocusedEducation(null); }}
                className={clsx(
                  'absolute top-2 right-2 w-7 h-7 rounded-full',
                  'flex items-center justify-center text-sm',
                  'bg-white/10 hover:bg-white/20 transition-colors',
                  'text-gray-400 hover:text-white cursor-pointer'
                )}
              >
                ✕
              </button>

              <div className="text-center mb-3">
                <div className={clsx('text-lg font-bold mb-1', glassStyles.text.primary)}>
                  {focusedEducation.institution}
                </div>
                <div className={clsx('text-xs', glassStyles.text.secondary)}>
                  {focusedEducation.degree}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div className="text-center">
                  <div className={clsx('text-xs mb-1', glassStyles.text.muted)}>Skills</div>
                  <div className={clsx('text-2xl font-bold', glassStyles.text.primary)}>
                    {focusedEducation.skills?.length || 0}
                  </div>
                </div>
                <div className="text-center">
                  <div className={clsx('text-xs mb-1', glassStyles.text.muted)}>Phases</div>
                  <div className={clsx('text-2xl font-bold', glassStyles.text.primary)}>
                    {focusedEducation.periods?.length || 0}
                  </div>
                </div>
              </div>

              {/* Impact bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className={clsx('text-xs', glassStyles.text.muted)}>Impact</span>
                  <span className="text-sm font-bold" style={{ color: focusedEducation.color }}>
                    {focusedEducation.impact || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{
                      width: `${focusedEducation.impact || 0}%`,
                      backgroundColor: focusedEducation.color,
                      boxShadow: `0 0 8px ${focusedEducation.color}60`
                    }}
                  />
                </div>
              </div>

              {/* Complexity */}
              <div className="flex justify-center mb-2">
                <div
                  className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                  style={{
                    backgroundColor: `${focusedEducation.color}20`,
                    color: focusedEducation.color,
                    border: `1px solid ${focusedEducation.color}50`,
                  }}
                >
                  {focusedEducation.complexity || 'medium'} complexity
                </div>
              </div>

              {focusedEducation.connections && focusedEducation.connections.length > 0 && (
                <div className={clsx('text-center text-xs', glassStyles.text.muted)}>
                  🔗 Connected to {focusedEducation.connections.length} institutions
                </div>
              )}
            </div>
          )}
        </div>

        {/* Network stats top-left */}
        {!compact && (
          <div className="absolute top-2 left-3 space-y-0.5 pointer-events-none">
            <div className={clsx('text-xs', glassStyles.text.muted)}>
              {validEducations.length} institutions
            </div>
            <div className={clsx('text-xs', glassStyles.text.muted)}>
              {validEducations.reduce((acc, edu) => acc + (edu.connections?.length || 0), 0)} connections
            </div>
          </div>
        )}

        {/* Selected/focused summary bottom-right */}
        {!compact && (selectedEducation || focusedEducation) && (
          <div className={clsx(
            'absolute bottom-2 right-2 p-2 rounded-lg',
            glassStyles.badge,
            'min-w-32 pointer-events-none'
          )}>
            <div className={clsx('text-xs font-medium mb-0.5', glassStyles.text.primary)}>
              {(focusedEducation || selectedEducation)?.institution}
            </div>
            <div className="text-xs font-bold" style={{ color: (focusedEducation || selectedEducation)?.color }}>
              {(focusedEducation || selectedEducation)?.impact || 0}% impact
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {!compact && (
        <div className="mt-4 text-center space-y-2">
          <p className={clsx('text-xs', glassStyles.text.secondary)}>
            Klicka på en institution för att se detaljer
          </p>
          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className={glassStyles.text.muted}>Hög komplexitet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className={glassStyles.text.muted}>Medel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className={glassStyles.text.muted}>Låg komplexitet</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};