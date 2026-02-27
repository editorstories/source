// hooks/useEducationState.ts - Debug version
import { useState, useMemo } from 'react';
import { ViewMode, Education } from '../types/types';

interface UseEducationStateProps {
  allEducation: Education[];
  initialDisplayCount: number;
  initialViewMode: ViewMode;
}

export const useEducationState = ({
  allEducation,
  initialDisplayCount,
  initialViewMode
}: UseEducationStateProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [showingSummary, setShowingSummary] = useState(false);

  // Debug logging
  console.log('🎯 Education State Debug:', {
    viewMode,
    displayCount,
    totalEducation: allEducation.length,
    expandedCards: Array.from(expandedCards),
    showingSummary
  });

  const visibleEducation = useMemo(() => {
    return allEducation.slice(0, displayCount);
  }, [allEducation, displayCount]);

  const handleViewChange = (newMode: ViewMode) => {
    console.log('🔄 View changing from', viewMode, 'to', newMode);
    setViewMode(newMode);

    // Show summary for network mode
    if (newMode === 'network') {
      setShowingSummary(true);
    }
  };

  const toggleCard = (educationId: string) => {
    console.log('🎯 Toggling card:', educationId);
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(educationId)) {
        newSet.delete(educationId);
      } else {
        newSet.add(educationId);
      }
      return newSet;
    });
  };

  const handleShowMore = () => {
    console.log('➕ Show more clicked, current:', displayCount);
    const increment = Math.min(6, allEducation.length - displayCount);
    setDisplayCount(prev => Math.min(prev + increment, allEducation.length));
  };

  const handleShowLess = () => {
    console.log('➖ Show less clicked, current:', displayCount);
    const decrement = Math.min(6, displayCount - initialDisplayCount);
    setDisplayCount(prev => Math.max(prev - decrement, initialDisplayCount));
  };

  const handleReset = () => {
    console.log('🔄 Reset clicked, setting to:', initialDisplayCount);
    setDisplayCount(initialDisplayCount);
  };

  return {
    viewMode,
    expandedCards,
    displayCount,
    showingSummary,
    visibleEducation,
    handleViewChange,
    toggleCard,
    handleShowMore,
    handleShowLess,
    handleReset,
    setShowingSummary
  };
};