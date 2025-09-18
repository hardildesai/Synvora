'use client';

import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, compact = false }: { targetDate: string, compact?: boolean }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation on mount to avoid delay
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeEntries = Object.entries(timeLeft);

  if (compact) {
    return (
      <div className="flex items-center gap-3 font-mono text-sm">
        {timeEntries.map(([interval, value], index) => (
          <React.Fragment key={interval}>
            <div className="flex flex-col items-center">
              <span className="font-bold text-base text-foreground">{String(value).padStart(2, '0')}</span>
              <span className="text-xs opacity-70">{interval.charAt(0)}</span>
            </div>
            {index < timeEntries.length -1 && <span className="text-primary font-bold text-lg -mt-3">:</span>}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-8">
      {timeEntries.map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center p-2 rounded-lg min-w-[70px] md:min-w-[90px] bg-white/5 backdrop-blur-sm">
          <div className="text-4xl md:text-6xl font-extrabold text-white tracking-tight font-mono">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider">
            {interval}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
