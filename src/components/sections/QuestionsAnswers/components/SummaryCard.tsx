import React from 'react';
import { X, Sparkles, CheckCircle } from 'lucide-react';
import { SummaryCardProps } from '../types';
import { pathConfig } from '../config';
import { summaryHighlights } from '../summaryData';

// ============================================
// 📊 ENHANCED SUMMARY CARD COMPONENT
// ============================================

export const SummaryCard: React.FC<SummaryCardProps> = ({
  exploredPaths,
  t,
  onClose,
  language
}) => {
  const glassCard = `
    backdrop-blur-xl bg-white/5 dark:bg-gray-900/5
    border border-white/10 dark:border-gray-700/10
    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
  `;
    //text-blue-600/100 dark:text-sky-400/100
//    <div
//        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
//        style={{
//          background: 'rgba(0, 0, 0, 0.6)',
//          backdropFilter: 'blur(8px)'
//        }}
//        onClick={onClose}
//      >
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{
        background: 'rgba(0, 0, 0, 1)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        className={`
          ${glassCard} rounded-2xl p-8 max-w-2xl w-full
          transform transition-all duration-500 animate-scaleIn
          shadow-2xl shadow-purple-500/10 back-card-parent
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-100/90 mb-1">
                {t('qna.summary.title')}
              </h3>
              <p className="text-sm text-gray-400/70">
                {t('qna.summary.intro')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`
              ${glassCard} p-2.5 rounded-xl
              hover:bg-white/10 active:scale-95
              transition-all duration-300
              text-gray-400 hover:text-gray-200
            `}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400/70">
              Explored {exploredPaths.length} of {pathConfig.length} paths
            </span>
            <span className="text-sm font-medium text-purple-400">
              {Math.round((exploredPaths.length / pathConfig.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(exploredPaths.length / pathConfig.length) * 100}%`,
                animation: 'progressGrow 1s ease-out'
              }}
            />
          </div>
        </div>

        {/* Explored Paths */}
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
          {exploredPaths.map((pathId, idx) => {
            const path = pathConfig.find(p => p.id === pathId);
            if (!path) return null;

            const Icon = path.icon;
            const highlight = summaryHighlights[language]?.[pathId] ||
                            `You explored ${t(`qna.paths.${pathId}.title`)}`;

            return (
              <div
                key={pathId}
                className={`
                  ${glassCard} rounded-xl p-4
                  flex items-start gap-4
                  hover:bg-white/8 transition-all duration-300
                  animate-slideInRight
                `}
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 relative"
                  style={{
                    backgroundColor: `${path.color}20`,
                    boxShadow: `0 0 20px ${path.color}15`
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: path.color }} />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-100/90 mb-1">
                    {t(`qna.paths.${pathId}.title`)}
                  </h4>
                  <p className="text-sm text-gray-400/70 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`${glassCard} rounded-xl p-4 mt-6 text-center`}>
          <p className="text-sm text-gray-400/70">
            Keep exploring to discover more about my journey! 👣
          </p>
        </div>
      </div>

      <style jsx>{`

        .back-card-parent {
            background:  color(display-p3 0.217 0.247 0.265 / 0.48);}
          }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progressGrow {
          from {
            width: 0%;
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
};