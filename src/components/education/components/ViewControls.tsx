// components/ViewControls.tsx
import React from 'react';
import {
  Network,
  Target,
  Brain,
  Clock,
  Plus,
  Minus,
  RotateCcw,
  Grid,
  List
} from 'lucide-react';
import { ViewControlsProps, ViewMode } from '../types/types';
import { glassStyles } from '../styles/glassStyles';

// Complete view mode options including all supported modes
const VIEW_MODE_OPTIONS = [
  { id: 'network' as ViewMode, icon: Network, label: 'Network' },
  { id: 'grid' as ViewMode, icon: Grid, label: 'Grid' },
  { id: 'compact' as ViewMode, icon: List, label: 'Compact' },
  { id: 'impact' as ViewMode, icon: Target, label: 'Impact' },
  { id: 'skills' as ViewMode, icon: Brain, label: 'Skills' },
  { id: 'timeline' as ViewMode, icon: Clock, label: 'Timeline' }
];

export const ViewControls: React.FC<ViewControlsProps> = ({
  displayCount,
  totalCount,
  initialDisplayCount = 6,
  onShowMore,
  onShowLess,
  onReset,
  viewMode,
  onViewChange
}) => {
  // Fixed logic for button states
  const actualDisplayCount = Math.min(displayCount, totalCount);
  const showingAll = actualDisplayCount >= totalCount;
  const showingInitial = displayCount <= initialDisplayCount;

  // Better control state management
  const canShowMore = !showingAll && totalCount > displayCount;
  const canShowLess = !showingInitial && displayCount > initialDisplayCount;
  const canReset = displayCount !== initialDisplayCount;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      {/* View Mode Toggle */}
      <div className={`
        inline-flex rounded-xl p-0.5
        ${glassStyles.card}
      `}>
        {VIEW_MODE_OPTIONS.map(mode => (
          <button
            key={mode.id}
            onClick={() => onViewChange?.(mode.id)}
            className={`
              relative px-3 py-2 rounded-lg flex items-center gap-2
              transition-all duration-300
              ${viewMode === mode.id
                ? 'bg-white/10 dark:bg-gray-700/10'
                : 'hover:bg-white/5'
              }
              ${!onViewChange ? 'cursor-not-allowed opacity-50' : ''}
            `}
            aria-pressed={viewMode === mode.id}
            title={`Switch to ${mode.label} view`}
            disabled={!onViewChange}
          >
            <mode.icon className={`
              w-4 h-4
              ${viewMode === mode.id
                ? glassStyles.text.primary
                : glassStyles.text.secondary
              }
            `} />
            <span className={`
              text-xs hidden sm:inline
              ${viewMode === mode.id
                ? glassStyles.text.primary
                : glassStyles.text.secondary
              }
            `}>
              {mode.label}
            </span>
          </button>
        ))}
      </div>

      {/* Display Controls - Enhanced version with better UX */}
      <div className="flex items-center gap-2">
        <span className={`text-xs ${glassStyles.text.muted} mr-2`}>
          Showing {actualDisplayCount} of {totalCount}
        </span>

        {/* Show Less Button - Only when not showing initial amount */}
        {canShowLess && (
          <button
            onClick={onShowLess}
            className={`
              p-2 rounded-lg
              ${glassStyles.button}
              ${glassStyles.text.secondary}
              hover:${glassStyles.text.primary}
              transition-all duration-200
              hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
            title="Show less"
            aria-label="Show fewer items"
          >
            <Minus className="w-4 h-4" />
          </button>
        )}

        {/* Show More Button - Only when not showing all */}
        {canShowMore && (
          <button
            onClick={onShowMore}
            className={`
              p-2 rounded-lg
              ${glassStyles.button}
              ${glassStyles.text.secondary}
              hover:${glassStyles.text.primary}
              transition-all duration-200
              hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
            title="Show more"
            aria-label="Show more items"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}

        {/* Reset Button - Only when not at initial count */}
        {canReset && (
          <button
            onClick={onReset}
            className={`
              p-2 rounded-lg
              ${glassStyles.button}
              ${glassStyles.text.secondary}
              hover:${glassStyles.text.primary}
              transition-all duration-200
              hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
            title="Reset to initial view"
            aria-label={`Reset to show ${initialDisplayCount} items`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Optional: Progress indicator for large datasets */}
      {totalCount > 20 && (
        <div className="w-full sm:w-32 mt-2 sm:mt-0">
          <div className={`h-1 rounded-full ${glassStyles.card} overflow-hidden`}>
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${Math.min((actualDisplayCount / totalCount) * 100, 100)}%`
              }}
            />
          </div>
          <div className={`text-xs ${glassStyles.text.muted} text-center mt-1`}>
            {Math.round((actualDisplayCount / totalCount) * 100)}% shown
          </div>
        </div>
      )}
    </div>
  );
};