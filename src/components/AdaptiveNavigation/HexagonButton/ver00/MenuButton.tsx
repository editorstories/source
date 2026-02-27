import React, { useState, useRef, useEffect } from 'react';

interface MenuButtonProps {
  isHeroSection: boolean;
  onInteract: () => void;
  isOpen?: boolean;
  isSomnlogg?: boolean;
  isDayMode?: boolean;
  isMobile?: boolean;
  onBoundsChange?: (bounds: { top: number; left: number; width: number; height: number }) => void;
}

export default function MenuButton({
  isHeroSection,
  onInteract,
  isOpen = false,
  isSomnlogg = false,
  isDayMode = true,
  isMobile = false,
  onBoundsChange,
}: MenuButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const desktopWrapperRef = useRef<HTMLDivElement>(null);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);

  const isMobileSomnloggDay = isMobile && isSomnlogg && isDayMode;

  // Measure bounds when wrapper changes
  useEffect(() => {
    const measureBounds = () => {
      // Use the appropriate ref based on viewport
      const activeRef = isMobile ? mobileWrapperRef : desktopWrapperRef;

      if (!activeRef.current) return;

      const rect = activeRef.current.getBoundingClientRect();

      // Only proceed if wrapper has measurable dimensions
      if (rect.width > 0 && rect.height > 0) {
        const bounds = {
          top: 0,
          left: 0,
          width: rect.width,
          height: rect.height,
        };

        if (onBoundsChange) {
          onBoundsChange(bounds);
        }
      }
    };

    // Initial measurement
    const rafId = requestAnimationFrame(() => {
      setTimeout(measureBounds, 50);
    });

    // Observe for changes
    const activeRef = isMobile ? mobileWrapperRef : desktopWrapperRef;
    const resizeObserver = new ResizeObserver(measureBounds);
    if (activeRef.current) {
      resizeObserver.observe(activeRef.current);
    }

    // Window resize handler
    const handleWindowResize = () => {
      setTimeout(measureBounds, 50);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [isMobile, isHovered, isOpen, isHeroSection, isSomnlogg, isDayMode, onBoundsChange]);

  const getBoxShadow = () => {
    if (!isSomnlogg) return '0 1px 0 -6px blue';
    if (isMobileSomnloggDay) {
      return 'rgba(0, 0, 0, 0.6) 0px -50px 36px -28px inset';
    }
    return isDayMode
      ? 'rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset'
      : 'rgba(255, 255, 255, 0.15) 0px -50px 36px -28px inset';
  };

  const getTextColor = () => {
    if (isMobileSomnloggDay) {
      return 'rgb(71, 85, 105)';
    }
    return 'rgb(203, 213, 225)';
  };

  const getBorderColor = () => {
    if (isMobileSomnloggDay) {
      return isOpen ? 'rgb(100, 116, 139)' : 'rgb(71, 85, 105)';
    }
    return isOpen ? 'rgb(148, 163, 184)' : 'rgb(100, 116, 139)';
  };

  const shouldRotate = !isHeroSection && (isHovered || isOpen);

  const handleClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onInteract();
      setTimeout(() => setIsFadingOut(false), 100);
    }, 300);
  };

  const getLetterTransition = (isOriginal: boolean) => {
    if (shouldRotate) {
      if (isOriginal) {
        return {
          opacity: 0,
          transform: 'rotate(90deg)',
          transition: 'opacity 800ms ease-out, transform 0ms linear 800ms',
        };
      } else {
        return {
          opacity: 1,
          transform: 'rotate(90deg)',
          transition: 'opacity 800ms ease-in 800ms, transform 0ms linear',
        };
      }
    } else {
      if (isOriginal) {
        return {
          opacity: 1,
          transform: 'rotate(0deg)',
          transition: 'opacity 800ms ease-in 800ms, transform 0ms linear',
        };
      } else {
        return {
          opacity: 0,
          transform: 'rotate(0deg)',
          transition: 'opacity 800ms ease-out, transform 0ms linear 800ms',
        };
      }
    }
  };

  return (
    <>
      {/* Desktop button */}
      <div className="hidden md:block">
        <div
          ref={desktopWrapperRef}
          data-hex-child="menu-button-wrapper"
          className="inline-flex items-center justify-center"
          style={{
            fontSize: '90px',
            lineHeight: '1.2',
            margin: '0px',
            opacity: isFadingOut ? 0 : 1,
            transition: 'opacity 300ms ease-out',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Left letter group - n/v */}
          <div
            className="letter-wrapper relative inline-flex items-center justify-center"
            style={{
              fontSize: '90px',
              lineHeight: '1.2',
              minWidth: '90px',
              minHeight: '90px',
              position: 'relative',
            }}
          >
            {/* Letter layer 1 - original (n) */}
            <span
              className="text-slate-300 font-medium select-none absolute"
              style={{
                ...getLetterTransition(true),
                pointerEvents: 'none',
              }}
            >
              n
            </span>
            {/* Letter layer 2 - alternate (v) */}
            <span
              className="text-slate-300 font-medium select-none absolute"
              style={{
                ...getLetterTransition(false),
                pointerEvents: 'none',
              }}
            >
              v
            </span>
            {/* Invisible spacer to maintain layout */}
            <span
              className="text-slate-300 font-medium select-none opacity-0 pointer-events-none"
              style={{
                fontSize: '90px',
              }}
            >
              n
            </span>
          </div>

          {/* Center button */}
          <button
            className={`
              relative rounded-sm
              cursor-pointer transition-all duration-700
              hover:border-slate-400
              ${isOpen ? 'border-slate-400' : 'border-slate-500'}
            `}
            style={{
              width: '100px',
              height: '48px',
              backgroundColor: 'transparent',
              borderTop: 'none',
              borderLeft: '1px solid',
              borderRight: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'inherit',
              boxShadow: getBoxShadow(),
              zIndex: 10,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 -10px',
              flexShrink: 0,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            <span
              className="text-slate-300 text-lg font-medium select-none inline-block"
              style={{
                transform: shouldRotate ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: shouldRotate
                  ? 'transform 0ms linear 800ms'
                  : 'transform 0ms linear',
              }}
            >
              a
            </span>
          </button>

          {/* Right letter group - v/n */}
          <div
            className="letter-wrapper relative inline-flex items-center justify-center"
            style={{
              fontSize: '90px',
              lineHeight: '1.2',
              minWidth: '90px',
              minHeight: '90px',
              position: 'relative',
            }}
          >
            {/* Letter layer 1 - original (v) */}
            <span
              className="text-slate-300 font-medium select-none absolute"
              style={{
                ...getLetterTransition(true),
                pointerEvents: 'none',
              }}
            >
              v
            </span>
            {/* Letter layer 2 - alternate (n) */}
            <span
              className="text-slate-300 font-medium select-none absolute"
              style={{
                ...getLetterTransition(false),
                pointerEvents: 'none',
              }}
            >
              n
            </span>
            {/* Invisible spacer to maintain layout */}
            <span
              className="text-slate-300 font-medium select-none opacity-0 pointer-events-none"
              style={{
                fontSize: '90px',
              }}
            >
              v
            </span>
          </div>
        </div>
      </div>

      {/* Mobile button */}
      <div className="md:hidden">
        <div
          ref={mobileWrapperRef}
          data-hex-child="menu-button-wrapper-mobile"
          className="inline-flex items-center justify-center"
          style={{
            fontSize: isMobileSomnloggDay ? '35px' : '70px',
            lineHeight: '1.2',
            margin: '0px',
            opacity: isFadingOut ? 0 : 1,
            transition: 'opacity 300ms ease-out, font-size 300ms ease-out',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Left letter group - n/v */}
          <div
            className="letter-wrapper relative inline-flex items-center justify-center"
            style={{
              fontSize: isMobileSomnloggDay ? '35px' : '70px',
              lineHeight: '1.2',
              minWidth: isMobileSomnloggDay ? '35px' : '70px',
              minHeight: isMobileSomnloggDay ? '35px' : '70px',
              position: 'relative',
            }}
          >
            {/* Letter layer 1 - original (n) */}
            <span
              className="font-medium select-none absolute"
              style={{
                color: getTextColor(),
                ...getLetterTransition(true),
                pointerEvents: 'none',
              }}
            >
              n
            </span>
            {/* Letter layer 2 - alternate (v) */}
            <span
              className="font-medium select-none absolute"
              style={{
                color: getTextColor(),
                ...getLetterTransition(false),
                pointerEvents: 'none',
              }}
            >
              v
            </span>
            {/* Invisible spacer to maintain layout */}
            <span
              className="font-medium select-none opacity-0 pointer-events-none"
              style={{
                color: getTextColor(),
              }}
            >
              n
            </span>
          </div>

          {/* Center button */}
          <button
            className="relative rounded-sm cursor-pointer transition-all duration-700"
            style={{
              width: isMobileSomnloggDay ? '80px' : '80px',
              height: isMobileSomnloggDay ? '30px' : '40px',
              backgroundColor: isMobileSomnloggDay ? 'rgb(203, 213, 225)' : 'transparent',
              borderTop: 'none',
              borderLeft: '1px solid',
              borderRight: '1px solid',
              borderBottom: '1px solid',
              borderColor: getBorderColor(),
              boxShadow: getBoxShadow(),
              zIndex: 10,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: isMobileSomnloggDay ? '0 -4px' : '0 -8px',
              transition: 'all 300ms ease-out',
              flexShrink: 0,
            }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span
              className="text-base font-medium select-none inline-block"
              style={{
                color: getTextColor(),
                transform: shouldRotate ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: shouldRotate
                  ? 'transform 0ms linear 800ms, color 300ms ease-out'
                  : 'transform 0ms linear, color 300ms ease-out',
              }}
            >
              a
            </span>
          </button>

          {/* Right letter group - v/n */}
          <div
            className="letter-wrapper relative inline-flex items-center justify-center"
            style={{
              fontSize: isMobileSomnloggDay ? '35px' : '70px',
              lineHeight: '1.2',
              minWidth: isMobileSomnloggDay ? '35px' : '70px',
              minHeight: isMobileSomnloggDay ? '35px' : '70px',
              position: 'relative',
            }}
          >
            {/* Letter layer 1 - original (v) */}
            <span
              className="font-medium select-none absolute"
              style={{
                color: getTextColor(),
                ...getLetterTransition(true),
                pointerEvents: 'none',
              }}
            >
              v
            </span>
            {/* Letter layer 2 - alternate (n) */}
            <span
              className="font-medium select-none absolute"
              style={{
                color: getTextColor(),
                ...getLetterTransition(false),
                pointerEvents: 'none',
              }}
            >
              n
            </span>
            {/* Invisible spacer to maintain layout */}
            <span
              className="font-medium select-none opacity-0 pointer-events-none"
              style={{
                color: getTextColor(),
              }}
            >
              v
            </span>
          </div>
        </div>
      </div>
    </>
  );
}