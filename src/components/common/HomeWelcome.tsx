import React, { useState, useEffect } from 'react';

export const HomeWelcome: React.FC = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if shown in this session
    const hasSeen = sessionStorage.getItem('wowverse_welcome_seen');
    if (hasSeen) {
      setVisible(false);
      return;
    }

    const timer1 = setTimeout(() => {
      setIsLeaving(true);
      sessionStorage.setItem('wowverse_welcome_seen', 'true');
    }, 1100);

    const timer2 = setTimeout(() => {
      setVisible(false);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`home-welcome ${isLeaving ? 'is-leaving' : ''}`}>
      <p className="meta text-ink/75 mb-2">
        Wedding Content Atelier · Est. 2025 · Vrindavan
      </p>

      <h1 className="wordmark text-6xl sm:text-8xl md:text-9xl text-ink font-bold tracking-tight">
        WOWVERSE
      </h1>

      <span className="display-title italic text-xl sm:text-3xl text-ink/85 mt-2">
        Every celebration has a story. We capture the WOW.
      </span>

      {/* Progress Line */}
      <div className="w-48 h-[2px] bg-ink/20 rounded-full mt-6 overflow-hidden">
        <div className="w-full h-full bg-ink origin-left animate-[welcome-load_1s_cubic-bezier(.65,.05,0,1)_forwards]" />
      </div>
    </div>
  );
};
