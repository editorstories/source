// src/hooks/useHexagonMiniMode.ts

'use client';

import { useState, useCallback } from 'react';

export const useHexagonMiniMode = () => {
  const [isMiniMode, setIsMiniMode] = useState(false);

  const toggleMiniMode = useCallback(() => {
    setIsMiniMode(prev => !prev);
  }, []);

  const enterMiniMode = useCallback(() => {
    setIsMiniMode(true);
  }, []);

  const exitMiniMode = useCallback(() => {
    setIsMiniMode(false);
  }, []);

  return {
    isMiniMode,
    toggleMiniMode,
    enterMiniMode,
    exitMiniMode,
  };
};