// src/hooks/useCountdown.js
import { useState, useEffect } from 'react';
import { CHECKIN_RESET_HOUR } from '../utils/constants';

export const useCountdown = (lastCheckinTime, hasCheckedInToday, setHasCheckedInToday) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!hasCheckedInToday || !lastCheckinTime) return;

    const getNext6AM = () => {
      const now = new Date();
      const next6AM = new Date();
      next6AM.setHours(CHECKIN_RESET_HOUR, 0, 0, 0);
      if (now.getTime() >= next6AM.getTime()) {
        next6AM.setDate(next6AM.getDate() + 1);
      }
      return next6AM.getTime();
    };

    const updateCountdown = () => {
      const now = Date.now();
      const timeLeft = getNext6AM() - now;
      if (timeLeft <= 0) {
        setHasCheckedInToday(false);
        setCountdown('');
        return;
      }
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [hasCheckedInToday, lastCheckinTime, setHasCheckedInToday]);

  return countdown;
};
