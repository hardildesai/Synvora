'use client';

import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
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

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component has mounted on the client
    // before we start calculating time, preventing hydration mismatch.
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) {
    // Render a placeholder or nothing on the server to prevent hydration mismatch
    return null;
  }

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-8">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-white tracking-widest font-code">
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
