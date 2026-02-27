import { useState, useEffect } from 'react';

interface StockholmClockProps {
  language?: 'sv' | 'en' | 'es';
}

export default function StockholmClock({ language = 'sv' }: StockholmClockProps) {
  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
  const [dateInfo, setDateInfo] = useState({ day: '', date: '' });
  const [opacity, setOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const locales = {
    sv: 'sv-SE',
    en: 'en-US',
    es: 'es-ES'
  };

  const cityNames = {
    sv: 'Stockholm',
    en: 'Stockholm',
    es: 'Estocolmo'
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const stockholmTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));

      const hour = stockholmTime.getHours();
      const minute = stockholmTime.getMinutes();
      const second = stockholmTime.getSeconds();

      setTime({ hour, minute, second });

      const locale = locales[language];

      const day = stockholmTime.toLocaleDateString(locale, {
        weekday: 'long',
        timeZone: 'Europe/Stockholm'
      });
      const date = stockholmTime.toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Stockholm'
      });

      setDateInfo({ day, date });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [language]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const fadeStart = windowHeight * 0.4;
      const fadeEnd = windowHeight * 0.8;

      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeRange = fadeEnd - fadeStart;
        const scrollRange = scrollY - fadeStart;
        setOpacity(1 - (scrollRange / fadeRange));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;

  const hourAngle = ((time.hour % 12) * 60 + time.minute) / (12 * 60) * 360;
  const minuteAngle = (time.minute / 60) * 360;

  // Calculate dot positions on the ring - responsive based on screen size
  const minuteRadius = isMobile ? 39 : 62;
  const hourRadius = isMobile ? 34 : 54;
  const centerOffset = isMobile ? 40 : 64;

  const minuteX = centerOffset + minuteRadius * Math.sin((minuteAngle * Math.PI) / 180);
  const minuteY = centerOffset - minuteRadius * Math.cos((minuteAngle * Math.PI) / 180);

  const hourX = centerOffset + hourRadius * Math.sin((hourAngle * Math.PI) / 180);
  const hourY = centerOffset - hourRadius * Math.cos((hourAngle * Math.PI) / 180);
//  font-weight: 700;
  return (
    <>
      <style jsx>{`
        .clock-container {
          position: fixed;
          top: 80px;
          right: 10px;
          pointer-events: none;
          z-index: 10;
        }

        .dots-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(152, 216, 200, 0.5) 1px, transparent 1px) 0 0 / 12px 12px repeat;
          -webkit-mask-image: linear-gradient(to left, black 20%, transparent 100%);
          mask-image: linear-gradient(to left, black 20%, transparent 100%);
          pointer-events: none;
        }

        .content-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px 32px;
        }

        .text-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .date-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: white;
          white-space: nowrap;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
        }

        .city-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: white;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
        }

        .clock-section {
          position: relative;
          width: 128px;
          height: 128px;
          flex-shrink: 0;
        }

        .clock-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clock-face {
          position: relative;
          width: 128px;
          height: 128px;
        }

        /* Minute ring (outer) */
        .minute-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(100, 100, 100, 0.3);
        }

        .minute-progress {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #98D8C8 0deg, #98D8C8 var(--minute-angle), transparent var(--minute-angle));
          -webkit-mask-image: radial-gradient(circle, transparent 60px, black 60px, black 64px, transparent 64px);
          mask-image: radial-gradient(circle, transparent 60px, black 60px, black 64px, transparent 64px);
          filter: drop-shadow(0 0 8px rgba(152, 216, 200, 0.6));
        }

        .minute-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #98D8C8, #7BC4B8);
          box-shadow: 0 0 12px rgba(152, 216, 200, 0.8);
          transition: all 0.3s linear;
        }

        /* Hour ring (inner) */
        .hour-ring {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 3px solid rgba(100, 100, 100, 0.3);
        }

        .hour-progress {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #A3E4D7 0deg, #A3E4D7 var(--hour-angle), transparent var(--hour-angle));
          -webkit-mask-image: radial-gradient(circle, transparent 52px, black 52px, black 56px, transparent 56px);
          mask-image: radial-gradient(circle, transparent 52px, black 52px, black 56px, transparent 56px);
          filter: drop-shadow(0 0 10px rgba(163, 228, 215, 0.7));
        }

        .hour-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #A3E4D7, #82C9BC);
          box-shadow: 0 0 14px rgba(163, 228, 215, 0.9);
          transition: all 0.3s linear;
        }

        .time-display {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .time-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 36px;
          font-weight: 300;
          color: white;
          letter-spacing: -0.025em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .clock-container {
            top: 60px;
            right: 6px;
          }

          .dots-overlay {
            background: radial-gradient(circle, rgba(152, 216, 200, 0.5) 0.8px, transparent 0.8px) 0 0 / 10px 10px repeat;
          }

          .content-wrapper {
            gap: 16px;
            padding: 12px 24px;
          }

          .date-text {
            font-size: 12px;
          }

          .city-text {
            font-size: 14px;
          }

          .clock-section {
            width: 80px;
            height: 80px;
          }

          .clock-face {
            width: 80px;
            height: 80px;
          }

          .minute-progress {
            -webkit-mask-image: radial-gradient(circle, transparent 38px, black 38px, black 40px, transparent 40px);
            mask-image: radial-gradient(circle, transparent 38px, black 38px, black 40px, transparent 40px);
          }

          .minute-dot {
            width: 6px;
            height: 6px;
          }

          .hour-ring {
            inset: 4px;
            border-width: 2px;
          }

          .hour-progress {
            inset: 4px;
            -webkit-mask-image: radial-gradient(circle, transparent 33px, black 33px, black 36px, transparent 36px);
            mask-image: radial-gradient(circle, transparent 33px, black 33px, black 36px, transparent 36px);
          }

          .hour-dot {
            width: 8px;
            height: 8px;
          }

          .time-text {
            font-size: 16px;
          }
        }
      `}</style>

      <div
        className="clock-container"
        style={{
          opacity,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <div className="dots-overlay" />

        <div className="content-wrapper">
          <div className="text-section">
            {/*switch font date - city text*/}
            <div className="date-text">
              {cityNames[language]}
            </div>
            <div className="city-text">
              {dateInfo.day}, {dateInfo.date}
            </div>
          </div>

          <div className="clock-section">
            <div className="clock-inner">
              <div
                className="clock-face"
                style={{
                  '--minute-angle': `${minuteAngle}deg`,
                  '--hour-angle': `${hourAngle}deg`
                } as React.CSSProperties}
              >
                <div className="minute-ring" />
                <div className="minute-progress" />
                <div
                  className="minute-dot"
                  style={{
                    left: `${minuteX - (isMobile ? 3 : 5)}px`,
                    top: `${minuteY - (isMobile ? 3 : 5)}px`
                  }}
                />

                <div className="hour-ring" />
                <div className="hour-progress" />
                <div
                  className="hour-dot"
                  style={{
                    left: `${hourX - (isMobile ? 4 : 6)}px`,
                    top: `${hourY - (isMobile ? 4 : 6)}px`
                  }}
                />

                <div className="time-display">
                  <div className="time-text">{formattedTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}