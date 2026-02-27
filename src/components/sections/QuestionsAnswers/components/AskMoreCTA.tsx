import React from 'react';
import { AskMoreCTAProps } from '../types';
import { glassStyles } from '../config';
import { useDynamicCTA } from '../QnA/hooks/useDynamicCTA';
import {ChevronsLeftRightEllipsis, SunMoon } from 'lucide-react';
export const AskMoreCTA: React.FC<AskMoreCTAProps> = ({ t, isVisible }) => {
  const { dayIndex, timeOfDay } = useDynamicCTA();

  const dayName  = t(`qna.days.${dayIndex}`);
  const timeName = t(`qna.timeOfDay.${timeOfDay}`);

  // sv: "använd mitt ursprungliga mejl — eller boka en tid, 10–15 min samtal, idag onsdag ikväll"
  const ctaText = `${t('qna.askMoreCta')} ${t('qna.today')} ${dayName} ${timeName}`;

  return (
    <div
      className={`
        ${glassStyles.card} rounded-2xl p-8 text-center
        transform transition-all duration-700
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `}
      style={{ transitionDelay: '400ms' }}
    >
      <SunMoon className={`w-12 h-12 mx-auto mb-4 stroke-[0.5px] ${glassStyles.text.icon}`} />
      <p className={`text-sm font-medium uppercase tracking-widest mb-3 ${glassStyles.text.secondary}`}>
        {t('qna.askMore')}
      </p>
      <p className={`text-base ${glassStyles.text.primary}`}>
        {ctaText}
      </p>
    </div>
  );
};