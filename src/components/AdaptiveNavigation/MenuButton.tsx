// AdaptiveNavigation/MenuButton.tsx
'use client';

import React, { useState } from 'react';

//interface MenuButtonProps {
//  isHeroSection: boolean;
//  onInteract: () => void;
//  isOpen?: boolean;
//  isSomnlogg?: boolean;
//  isDayMode?: boolean;
//  isMobile?: boolean;
//}

interface MenuButtonProps {
  isHeroSection: boolean;
  onInteract: () => void;
  isOpen?: boolean;
  isSomnlogg?: boolean;
  isDayMode?: boolean;
  isMobile?: boolean;
}
export default function MenuButton({
  isHeroSection,
  onInteract,
  isOpen = false,
  isSomnlogg = false,
  isDayMode = true,
  isMobile = false,
}: MenuButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const isMobileSomnloggDay = isMobile && isSomnlogg && isDayMode;

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
          className="relative flex items-center justify-center"
          style={{
            fontSize: '90px',
            lineHeight: '0px',
            margin: '0px',
            opacity: isFadingOut ? 0 : 1,
            transition: 'opacity 300ms ease-out',
          }}
        >
          <div className="relative inline-block">
            <span
              className="text-slate-300 font-medium select-none inline-block"
              style={getLetterTransition(true)}
            >
              n
            </span>
            <span
              className="text-slate-300 font-medium select-none inline-block absolute left-0"
              style={{
                ...getLetterTransition(false),
                pointerEvents: 'none',
              }}
            >
              v
            </span>
          </div>

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

          <div className="relative inline-block">
            <span
              className="text-slate-300 font-medium select-none inline-block"
              style={getLetterTransition(true)}
            >
              v
            </span>
            <span
              className="text-slate-300 font-medium select-none inline-block absolute left-0"
              style={{
                ...getLetterTransition(false),
                pointerEvents: 'none',
              }}
            >
              n
            </span>
          </div>
        </div>
      </div>

      {/* Mobile button - FIXED sizing and background */}
      <div className="md:hidden">
        <div
          className="relative flex items-center justify-center"
          style={{
            fontSize: isMobileSomnloggDay ? '35px' : '70px',
            lineHeight: '0px',
            margin: '0px',
            opacity: isFadingOut ? 0 : 1,
            transition: 'opacity 300ms ease-out, font-size 300ms ease-out',
          }}
        >
          <div className="relative inline-block">
            <span
              className="font-medium select-none inline-block"
              style={{
                ...getLetterTransition(true),
                color: getTextColor(),
                transition: `${getLetterTransition(true).transition}, color 300ms ease-out`,
              }}
            >
              n
            </span>
            <span
              className="font-medium select-none inline-block absolute left-0"
              style={{
                ...getLetterTransition(false),
                color: getTextColor(),
                pointerEvents: 'none',
                transition: `${getLetterTransition(false).transition}, color 300ms ease-out`,
              }}
            >
              v
            </span>
          </div>

          <button
            className="relative rounded-sm cursor-pointer transition-all duration-700"
            style={{
              // FIXED: Better sizing for mobile Somnlogg day mode
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

          <div className="relative inline-block">
            <span
              className="font-medium select-none inline-block"
              style={{
                ...getLetterTransition(true),
                color: getTextColor(),
                transition: `${getLetterTransition(true).transition}, color 300ms ease-out`,
              }}
            >
              v
            </span>
            <span
              className="font-medium select-none inline-block absolute left-0"
              style={{
                ...getLetterTransition(false),
                color: getTextColor(),
                pointerEvents: 'none',
                transition: `${getLetterTransition(false).transition}, color 300ms ease-out`,
              }}
            >
              n
            </span>
          </div>
        </div>
      </div>
    </>
  );
}