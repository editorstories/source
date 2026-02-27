import React, { useRef, useEffect, useState } from 'react';
import { Clock, ChevronDown, Sparkles } from 'lucide-react';
import { QnAItemProps } from '../types';

// ============================================
// 💬 ENHANCED QNA ITEM COMPONENT
// ============================================

export const QnAItem: React.FC<QnAItemProps> = ({
  question,
  answer,
  readTime,
  related,
  index,
  isVisible,
  isPinned,
  onTogglePin,
  isExpanded,
  onToggle,
  onRelatedClick,
  t,
  pathId,
  isFocused
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [highlightCount, setHighlightCount] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const glassCard = `
    backdrop-blur-xl bg-white/5 dark:bg-gray-900/5
    border border-white/10 dark:border-gray-700/10
    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
    transition-all duration-500 ease-out
  `;

  // Calculate content height
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  // Scroll to center when focused
  useEffect(() => {
    if (isFocused && isExpanded && cardRef.current && !isScrolling) {
      setIsScrolling(true);

      const scrollTimer = setTimeout(() => {
        if (!cardRef.current) {
          setIsScrolling(false);
          return;
        }

        const rect = cardRef.current.getBoundingClientRect();
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const headerOffset = 150;
        const availableHeight = viewportHeight - headerOffset;
        const elementTop = rect.top + currentScrollTop;
        const elementHeight = rect.height;
        const targetScrollTop = elementTop - headerOffset - (availableHeight / 2) + (elementHeight / 2);
        const finalTarget = Math.max(0, targetScrollTop);

        window.scrollTo({ top: finalTarget, behavior: 'smooth' });
        setTimeout(() => setIsScrolling(false), 1000);
      }, 400);

      return () => {
        clearTimeout(scrollTimer);
        setIsScrolling(false);
      };
    }
  }, [isFocused, isExpanded]);

  // Letter-by-letter highlight effect - SIMPLIFIED AND FIXED
  useEffect(() => {
    if (isFocused && isExpanded) {
      setHighlightCount(0);

      const startTimer = setTimeout(() => {
        let count = 0;
//        const maxLetters = 5;
        const maxLetters = 35;

        const interval = setInterval(() => {
          count++;
          setHighlightCount(count);

          if (count >= maxLetters) {
            clearInterval(interval);
            // Start fade out after 2 seconds
            setTimeout(() => {
              setHighlightCount(0);
            }, 2000);
          }
        }, 30);

        return () => clearInterval(interval);
      }, 900);

      return () => clearTimeout(startTimer);
    } else {
      setHighlightCount(0);
    }
  }, [isFocused, isExpanded]);

  // Render answer with CORRECT word spacing and letter highlighting
  const renderAnswerWithHighlight = () => {
    let letterIndex = 0;
    const words = answer.split(' ');

    return (
      <>
        {words.map((word, wordIdx) => {
          const letters = word.split('');

          return (
            <React.Fragment key={wordIdx}>
              <span className="inline-block">
                {letters.map((letter, idx) => {
                  const currentLetterIndex = letterIndex;
                  letterIndex++;

                  const shouldHighlight = highlightCount > 0 &&
                                         currentLetterIndex < highlightCount &&
                                         {/*currentLetterIndex < 5;*/}
                                         currentLetterIndex < 35;

                  return (
                    <span
                      key={idx}
                      className={shouldHighlight ? 'letter-glow' : ''}
                      style={{
                        display: 'inline-block',
                        ...(shouldHighlight ? {} : {
                          animation: isExpanded ? `fadeInLetter 0.4s ease-out ${wordIdx * 0.08}s forwards` : 'none',
                          opacity: isExpanded ? 0 : 1
                        })
                      }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </span>
              {/* Add space between words - THIS WAS MISSING */}
              {wordIdx < words.length - 1 && <span> </span>}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div
      ref={cardRef}
      data-question-index={index}
      data-path-id={pathId}
      className={`
        ${glassCard} rounded-2xl overflow-hidden
        transform transition-all duration-700
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${isPinned ? 'ring-1 ring-blue-400/30 dark:ring-blue-500/30' : ''}
        ${isFocused ? 'ring-1 ring-yellow-400/30 dark:ring-yellow-500/30 shadow-lg shadow-yellow-500/5' : ''}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-stretch">
        {/* Question Button */}
        <button
          onClick={onToggle}
          className="flex-1 p-6 text-left flex items-center justify-between gap-4 text-gray-100/90 hover:bg-white/3 dark:hover:bg-gray-900/3 transition-colors duration-300"
        >
          <div className="flex-1">
            <span className="font-medium text-lg">{question}</span>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400/60">
              <Clock className="w-3 h-3" />
              <span>{readTime} {t('qna.readTime')}</span>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Pin Button */}
        <button
          onClick={onTogglePin}
          className={`
            px-4 border-l border-white/10 dark:border-gray-700/10 transition-all duration-300
            ${isPinned ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:bg-white/3 dark:hover:bg-gray-900/3'}
          `}
          title={isPinned ? 'Unpin' : 'Pin open'}
        >
          <svg
            className="w-5 h-5 transition-transform duration-300"
            style={{ transform: isPinned ? 'rotate(-45deg)' : 'rotate(0deg)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Answer Content */}
      <div
        style={{
          maxHeight: isExpanded ? `${height}px` : '0px',
          opacity: isExpanded ? 1 : 0
        }}
        className="overflow-hidden transition-all duration-500 ease-out"
      >
        <div ref={contentRef} className="px-6 pb-6 pt-2">
          {/* Answer Text with proper spacing and highlighting */}
          <div className="text-gray-300/80 leading-relaxed mb-4">
            {renderAnswerWithHighlight()}
          </div>

          {/* Related Questions */}
          {related && related.length > 0 && (
            <div className={`${glassCard} rounded-xl p-4 mt-4`}>
              <div className="text-sm font-medium mb-3 text-gray-100/90 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t('qna.relatedQuestions')}
              </div>
              <div className="flex flex-wrap gap-2">
                {related.map((relatedId, idx) => {
                  const [pathId, questionNum] = relatedId.split('-');
                  return (
                    <button
                      key={idx}
                      onClick={() => onRelatedClick(relatedId)}
                      className={`text-xs px-3 py-1.5 rounded-lg ${glassCard} text-gray-300/70 hover:scale-105 hover:bg-white/8 transition-all duration-300`}
                    >
                      {t(`qna.pathLabel.${pathId}`)} #{parseInt(questionNum) + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLetter {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* CRITICAL: Strong letter glow effect */
        {/*:global(.letter-glow) {*/}
        {/*  color: #fbbf24 !important;*/}
        {/*  text-shadow:*/}
        {/*    0 0 30px rgba(251, 191, 36, 1),*/}
        {/*    0 0 20px rgba(251, 191, 36, 0.8),*/}
        {/*    0 0 10px rgba(251, 191, 36, 0.6) !important;*/}
        {/*  filter: brightness(1.8) !important;*/}
        {/*  font-weight: 600 !important;*/}
        {/*  animation: letterGlowPulse 2.5s ease-out forwards, fadeInLetter 0.4s ease-out forwards !important;*/}
        {/*  opacity: 1 !important;*/}
        {/*}*/}

        {/*:global(.letter-glow) {*/}
        {/*  color: #f59e0b !important;*/}
        {/*  text-shadow:*/}
        {/*    0 0 12px rgba(245, 158, 11, 0.9),*/}
        {/*    0 0 8px rgba(245, 158, 11, 0.7),*/}
        {/*    0 0 4px rgba(245, 158, 11, 0.5) !important;*/}
        {/*  filter: brightness(1.8) !important;*/}
        {/*  font-weight: 600 !important;*/}
        {/*  animation: letterGlowPulse 2.5s ease-out forwards, fadeInLetter 0.4s ease-out forwards !important;*/}
        {/*  opacity: 1 !important;*/}
        {/*}*/}

        {/*@keyframes letterGlowPulse {*/}
        {/*  0%, 20% {*/}
        {/*    color: #f59e0b !important;*/}
        {/*    text-shadow:*/}
        {/*      0 0 15px rgba(245, 158, 11, 0.95),*/}
        {/*      0 0 10px rgba(245, 158, 11, 0.8),*/}
        {/*      0 0 6px rgba(245, 158, 11, 0.6);*/}
        {/*    filter: brightness(2) !important;*/}
        {/*  }*/}
        {/*  50% {*/}
        {/*    color: #f59e0b !important;*/}
        {/*    text-shadow:*/}
        {/*      0 0 12px rgba(245, 158, 11, 0.85),*/}
        {/*      0 0 8px rgba(245, 158, 11, 0.6),*/}
        {/*      0 0 4px rgba(245, 158, 11, 0.4);*/}
        {/*    filter: brightness(1.6) !important;*/}
        {/*  }*/}
        {/*  100% {*/}
        {/*    color: inherit;*/}
        {/*    text-shadow: none;*/}
        {/*    filter: brightness(1);*/}
        {/*    font-weight: 400;*/}
        {/*  }*/}
        {/*}*/}


        {/*:global(.letter-glow) {*/}
        {/*    animation: glowIn 0.8s both, fadeInLetter 0.4s ease-out forwards !important;*/}
        {/*  }*/}

        {/*  @keyframes glowIn {*/}
        {/*    from {*/}
        {/*      opacity: 0;*/}
        {/*    }*/}
        {/*    65% {*/}
        {/*      opacity: 1;*/}
        {/*      color: #f59e0b;*/}
        {/*      text-shadow: 0 0 25px #f59e0b;*/}
        {/*    }*/}
        {/*    75% {*/}
        {/*      opacity: 1;*/}
        {/*      color: #f59e0b;*/}
        {/*    }*/}
        {/*    to {*/}
        {/*      opacity: 1;*/}
        {/*      color: inherit;*/}
        {/*      text-shadow: none;*/}
        {/*    }*/}
        {/*  }*/}

        {/*  @keyframes fadeInLetter {*/}
        {/*    from {*/}
        {/*      opacity: 0;*/}
        {/*      transform: translateY(4px);*/}
        {/*    }*/}
        {/*    to {*/}
        {/*      opacity: 1;*/}
        {/*      transform: translateY(0);*/}
        {/*    }*/}
        {/*  }*/}


        :global(.letter-glow) {
          animation: glowIn 0.4s both, fadeInLetter 0.4s ease-out forwards !important;
        }

        @keyframes glowIn {
          from {
            opacity: 0;
          }
          65% {
            opacity: 1;
            color: #f59e0b;
            text-shadow: 0 0 25px #f59e0b;
          }
          75% {
            opacity: 1;
            color: #f59e0b;
          }
          to {
            opacity: 1;
            color: inherit;
            text-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};