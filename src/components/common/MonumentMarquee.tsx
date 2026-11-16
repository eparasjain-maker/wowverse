import React from 'react';

interface MonumentMarqueeProps {
  text?: string[];
  reverse?: boolean;
  speed?: 'normal' | 'slow';
  outline?: boolean;
  className?: string;
}

export const MonumentMarquee: React.FC<MonumentMarqueeProps> = ({
  text = [
    'EVERY WEDDING HAS A STORY',
    'WE CAPTURE THE WOW',
    'UNSCRIPTED',
    'REAL-TIME STORIES',
    '4K VERTICAL CINEMA',
    'ZERO CORNY POSES',
    'NO WAITING 60 DAYS',
  ],
  reverse = false,
  speed = 'normal',
  outline = false,
  className = '',
}) => {
  const content = text.join('  ✦  ');

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none py-3 border-y border-white/10 bg-black/40 backdrop-blur-sm ${className}`}>
      <div
        className={`inline-flex items-center gap-8 ${
          reverse
            ? 'animate-marquee-reverse'
            : speed === 'slow'
            ? 'animate-marquee-slow'
            : 'animate-marquee'
        }`}
      >
        <span
          className={`font-monument text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase ${
            outline ? 'text-stroke-monument' : 'text-ivory'
          }`}
        >
          {content} ✦ {content} ✦ {content} ✦ {content} ✦
        </span>
        <span
          className={`font-monument text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight uppercase ${
            outline ? 'text-stroke-monument' : 'text-ivory'
          }`}
        >
          {content} ✦ {content} ✦ {content} ✦ {content} ✦
        </span>
      </div>
    </div>
  );
};
