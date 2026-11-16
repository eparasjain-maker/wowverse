import React, { useState, useEffect } from 'react';

interface TimezoneBarProps {
  theme?: 'dark' | 'light' | 'orange' | 'red';
  tagline?: string;
  className?: string;
}

export const TimezoneBar: React.FC<TimezoneBarProps> = ({
  theme = 'dark',
  tagline = 'Crafting Wedding Stories that move you',
  className = '',
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    dark: 'text-ivory-dim border-white/10 bg-black/30',
    light: 'text-neutral-800 border-black/10 bg-white/40',
    orange: 'text-white border-white/20 bg-black/20',
    red: 'text-white border-white/20 bg-black/20',
  };

  return (
    <div
      className={`py-2 px-4 rounded-none border-t font-mono text-[11px] tracking-widest uppercase flex items-center justify-between backdrop-blur-sm select-none ${styles[theme]} ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-wow animate-ping" />
        <span className="font-bold text-white">{time || '12:00:00 PM'}</span>
        <span className="opacity-60">IST (GMT +5:30)</span>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs font-monument tracking-wider">
        <span>Vrindavan · Mathura · Agra</span>
        <span className="opacity-40">//</span>
        <span>{tagline}</span>
      </div>
    </div>
  );
};
