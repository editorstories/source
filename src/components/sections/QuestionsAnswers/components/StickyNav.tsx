import React, {useState, useEffect, useRef} from 'react';
import { StickyNavProps } from '../types';

// ============================================
// 🧭 ENHANCED STICKY NAVIGATION COMPONENT
// ============================================

export const StickyNav: React.FC<StickyNavProps> = ({
  paths,
  activePath,
  onPathChange,
  t,
  isSticky,
  shouldShow,
  pathProgress
}) => {
  const [isCompact, setIsCompact] = useState(false);

  // Detect mobile/compact mode
  useEffect(() => {
    const updateCompactMode = () => setIsCompact(window.innerWidth < 768);
    updateCompactMode();
    window.addEventListener('resize', updateCompactMode);
    return () => window.removeEventListener('resize', updateCompactMode);
  }, []);

  const activePathData = paths.find(p => p.id === activePath);
  const ActiveIcon = activePathData?.icon;

  // Enhanced glass styles
  const glassButton = `
    backdrop-blur-xl bg-white/5 dark:bg-gray-900/5
    border border-white/10 dark:border-gray-700/10
    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
    hover:bg-white/8 dark:hover:bg-gray-900/8
    transition-all duration-500 ease-out
  `;

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active path icon in sticky nav
  useEffect(() => {
    if (isSticky && shouldShow && scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(
        `[data-path-id="${activePath}"]`
      ) as HTMLElement;

      if (activeButton) {
        setTimeout(() => {
          activeButton.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }, 100);
      }
    }
  }, [activePath, isSticky, shouldShow]);

  // ============================================
  // 📱 COMPACT TOP NAVIGATION
  // ============================================
  if (isSticky && shouldShow) {
    return (
      <div
        className="fixed left-0 right-0 py-2 backdrop-blur-xl bg-gray-950/90 border-b border-white/5 z-40"
        style={{
          top: '80px',
          animation: 'fadeIn 0.6s ease-out'
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            {/* Active Path Indicator */}
            <div
              className={`${glassButton} rounded-xl px-4 py-2 flex items-center gap-2`}
              style={{
                minWidth: isCompact ? '170px' : '200px',
                maxWidth: isCompact ? '170px' : '200px'
              }}
            >
              {ActiveIcon && (
                <ActiveIcon className="w-4 h-4 flex-shrink-0" style={{ color: activePathData.color }} />
              )}
              <span className="text-sm font-medium text-gray-100/90 truncate">
                {t(`qna.paths.${activePath}.title`)}
              </span>
            </div>

            {/* Path Icons Navigation - NO SCROLLBAR, AUTO-SCROLL TO ACTIVE */}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto flex-1 scrollbar-hide"
            >
              {paths.map(path => {
                  const Icon = path.icon;
                  const isActive = activePath === path.id;
                  const progress = pathProgress[path.id] || 0;

                  return (
                    <button
                      key={path.id}
                      data-path-id={path.id}  // ← ADD THIS LINE
                      onClick={() => onPathChange(path.id)}
                      className={`
                        group relative flex items-center justify-center p-2 rounded-xl
                        ${glassButton} ${isActive ? 'ring-1' : ''} flex-shrink-0
                      `}
                      style={{
                        ringColor: isActive ? `${path.color}60` : undefined,
                        borderColor: isActive ? `${path.color}30` : undefined
                      }}
                      title={t(`qna.paths.${path.id}.title`)}
                    >
                      <div className="relative w-8 h-8">
                        <svg className="w-8 h-8 -rotate-90">
                          <circle cx="16" cy="16" r="14" fill="none" stroke={`${path.color}15`} strokeWidth="2" />
                          <circle
                            cx="16" cy="16" r="14" fill="none" stroke={path.color} strokeWidth="2"
                            strokeDasharray={`${progress * 87.96} 87.96`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <Icon
                          className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ color: path.color }}
                        />
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }
        `}</style>
      </div>
    );
  }

  // ============================================
  // 🖥️ DEFAULT FULL NAVIGATION
  // ============================================
  const totalItems = paths.length;
  const cols = isCompact ? 3 : 4;

  return (
    <div>
      {/* Active Path Header */}
      <div className={`${glassButton} rounded-xl px-4 py-3 mb-4 flex items-center gap-3 justify-center`}>
        {ActiveIcon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${activePathData.color}30` }}
          >
            <ActiveIcon className="w-5 h-5" style={{ color: activePathData.color }} />
          </div>
        )}
        <span className="text-lg font-medium text-gray-100/90">
          {t(`qna.paths.${activePath}.title`)}
        </span>
      </div>

      {/* DESKTOP: Two-row grid with centered second row */}
      {!isCompact && (
        <div className="space-y-2">
          {/* First Row: 4 items */}
          <div className="grid grid-cols-4 gap-2">
            {paths.slice(0, 4).map((path) => {
              const Icon = path.icon;
              const isActive = activePath === path.id;
              const progress = pathProgress[path.id] || 0;
              const label = t(`qna.paths.${path.id}.title`);

              return (
                <button
                  key={path.id}
                  onClick={() => onPathChange(path.id)}
                  className={`
                    group relative flex flex-col items-center gap-2 p-4 rounded-xl
                    ${glassButton} ${isActive ? 'ring-1' : ''} w-full
                  `}
                  style={{
                    ringColor: isActive ? `${path.color}40` : undefined,
                    borderColor: isActive ? `${path.color}30` : undefined
                  }}
                >
                  <div className="relative w-10 h-10">
                    <svg className="w-10 h-10 -rotate-90">
                      <circle cx="20" cy="20" r="18" fill="none" stroke={`${path.color}20`} strokeWidth="2" />
                      <circle
                        cx="20" cy="20" r="18" fill="none" stroke={path.color} strokeWidth="2"
                        strokeDasharray={`${progress * 113.1} 113.1`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <Icon
                      className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ color: path.color }}
                    />
                  </div>
                  <span className={`text-xs font-medium text-center ${isActive ? 'text-gray-100/90' : 'text-gray-400/70'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Second Row: 3 items centered using flex */}
          {totalItems > 4 && (
            <div className="flex justify-center gap-2">
              {paths.slice(4).map((path) => {
                const Icon = path.icon;
                const isActive = activePath === path.id;
                const progress = pathProgress[path.id] || 0;
                const label = t(`qna.paths.${path.id}.title`);

                return (
                  <button
                    key={path.id}
                    onClick={() => onPathChange(path.id)}
                    className={`
                      group relative flex flex-col items-center gap-2 p-4 rounded-xl
                      ${glassButton} ${isActive ? 'ring-1' : ''}
                    `}
                    style={{
                      width: 'calc((100% - 0.5rem * 3) / 4)', // Match first row item width
                      ringColor: isActive ? `${path.color}40` : undefined,
                      borderColor: isActive ? `${path.color}30` : undefined
                    }}
                  >
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 -rotate-90">
                        <circle cx="20" cy="20" r="18" fill="none" stroke={`${path.color}20`} strokeWidth="2" />
                        <circle
                          cx="20" cy="20" r="18" fill="none" stroke={path.color} strokeWidth="2"
                          strokeDasharray={`${progress * 113.1} 113.1`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <Icon
                        className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ color: path.color }}
                      />
                    </div>
                    <span className={`text-xs font-medium text-center ${isActive ? 'text-gray-100/90' : 'text-gray-400/70'}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MOBILE: Standard grid with centered last item */}
      {isCompact && (
        <div className="grid grid-cols-3 gap-2">
          {paths.map((path, index) => {
            const Icon = path.icon;
            const isActive = activePath === path.id;
            const progress = pathProgress[path.id] || 0;
            const label = t(`qna.paths.${path.id}.title`);

            const lastRowStart = Math.floor(totalItems / cols) * cols;
            const isLastRow = index >= lastRowStart;
            const itemsInLastRow = totalItems - lastRowStart;
            const shouldCenter = isLastRow && itemsInLastRow === 1;

            return (
              <button
                key={path.id}
                onClick={() => onPathChange(path.id)}
                className={`
                  group relative flex flex-col items-center gap-2 p-4 rounded-xl
                  ${glassButton} ${isActive ? 'ring-1' : ''} w-full
                  ${shouldCenter ? 'col-start-2' : ''}
                `}
                style={{
                  ringColor: isActive ? `${path.color}40` : undefined,
                  borderColor: isActive ? `${path.color}30` : undefined
                }}
              >
                <div className="relative w-10 h-10">
                  <svg className="w-10 h-10 -rotate-90">
                    <circle cx="20" cy="20" r="18" fill="none" stroke={`${path.color}20`} strokeWidth="2" />
                    <circle
                      cx="20" cy="20" r="18" fill="none" stroke={path.color} strokeWidth="2"
                      strokeDasharray={`${progress * 113.1} 113.1`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <Icon
                    className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ color: path.color }}
                  />
                </div>
                <span className="text-xs font-medium text-center max-w-[70px] ${isActive ? 'text-gray-100/90' : 'text-gray-400/70'}">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};