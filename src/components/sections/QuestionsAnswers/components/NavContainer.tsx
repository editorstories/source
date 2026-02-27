import React, { useRef, useEffect, useState } from 'react';
import { StickyNav } from './StickyNav';
import { StickyNavProps } from '../types';

// ============================================
// 🎯 NAVIGATION CONTAINER WRAPPER
// Enhanced for mobile stability
// ============================================

export const NavContainer: React.FC<StickyNavProps> = (props) => {
  const defaultNavRef = useRef<HTMLDivElement>(null);
  const [defaultNavHeight, setDefaultNavHeight] = useState<number | null>(null);
  const [showDefaultContent, setShowDefaultContent] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Capture default navigation height MORE RELIABLY
  useEffect(() => {
    if (defaultNavRef.current && defaultNavHeight === null) {
      // Use ResizeObserver for more reliable height detection
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height;
          if (height > 0) {
            setDefaultNavHeight(height);
          }
        }
      });

      observer.observe(defaultNavRef.current);

      // Fallback: Also try direct measurement after a delay
      setTimeout(() => {
        if (defaultNavRef.current && defaultNavHeight === null) {
          const height = defaultNavRef.current.offsetHeight;
          if (height > 0) {
            setDefaultNavHeight(height);
          }
        }
      }, 100);

      return () => observer.disconnect();
    }
  }, [defaultNavHeight]);

  // Handle transitions with mobile-specific logic
  useEffect(() => {
    if (props.isSticky && props.shouldShow) {
      // Transitioning TO sticky
      setShowDefaultContent(false);
    } else {
      // Transitioning TO default
      const delay = isMobile ? 50 : 100; // Faster on mobile
      const timer = setTimeout(() => {
        setShowDefaultContent(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [props.isSticky, props.shouldShow, isMobile]);

  const shouldShowSticky = props.isSticky && props.shouldShow;
  const shouldShowDefault = !props.isSticky || !props.shouldShow;

  return (
    <>
      {/* Default Navigation Container - ALWAYS maintains height */}
      <div
        style={{
          minHeight: defaultNavHeight ? `${defaultNavHeight}px` : 'auto',
          height: shouldShowDefault ? 'auto' : (defaultNavHeight ? `${defaultNavHeight}px` : 'auto'),
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          ref={defaultNavRef}
          className="w-full"
          style={{
            opacity: showDefaultContent ? 1 : 0,
            transition: isMobile ? 'opacity 400ms ease-out' : 'opacity 600ms ease-out',
            pointerEvents: showDefaultContent ? 'auto' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            visibility: shouldShowDefault ? 'visible' : 'hidden'
          }}
        >
          <StickyNav {...props} isSticky={false} shouldShow={false} />
        </div>
      </div>

      {/* Sticky Navigation */}
      {shouldShowSticky && (
        <div
          style={{
            opacity: 1,
            transition: isMobile ? 'opacity 400ms ease-out' : 'opacity 600ms ease-out',
            animation: isMobile ? 'fadeInSticky 0.4s ease-out' : 'fadeInSticky 0.6s ease-out'
          }}
        >
          <StickyNav {...props} isSticky={true} shouldShow={true} />
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInSticky {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};