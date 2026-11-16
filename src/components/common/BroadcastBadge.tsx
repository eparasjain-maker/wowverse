import React, { useState, useEffect } from 'react';

export const BroadcastBadge: React.FC = () => {
  const [timecode, setTimecode] = useState('00:04:12:08');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 30)).padStart(2, '0');
      setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] md:text-[11px] tracking-widest text-ivory-dim uppercase select-none">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/40 border border-red-500/40 text-red-400">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-rec-blink" />
        <span className="font-bold">REC</span>
      </div>

      <span className="hidden sm:inline text-white/20">//</span>

      <span className="text-white font-medium">{timecode}</span>

      <span className="hidden sm:inline text-white/20">//</span>

      <span className="hidden md:inline px-2 py-0.5 rounded bg-white/5 border border-white/10 text-ivory">
        4K 60FPS UHD
      </span>

      <span className="hidden sm:inline text-white/20">//</span>

      <span className="text-wow font-semibold">
        VRINDAVAN / MATHURA / AGRA
      </span>
    </div>
  );
};
