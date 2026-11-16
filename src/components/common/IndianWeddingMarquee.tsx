import React from 'react';

interface IndianWeddingMarqueeProps {
  phrases?: string[];
  reverse?: boolean;
  className?: string;
}

export const IndianWeddingMarquee: React.FC<IndianWeddingMarqueeProps> = ({
  phrases = [
    'EVERY WEDDING HAS A STORY',
    'WE CAPTURE THE WOW',
    'THE SACRED PHERE',
    'ELECTRIC BAARAT ENERGY',
    'UNFILTERED SANGEET MOMENTS',
    'HALDI BLOOMS & HAPPY TEARS',
    'ROYAL VRINDAVAN HERITAGE',
    'SAME-DAY REELS DELIVERED',
  ],
  reverse = false,
  className = '',
}) => {
  const content = phrases.join('  ✦  ');

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none py-3 border-y border-gold/20 bg-background/80 backdrop-blur-sm ${className}`}>
      <div
        className={`inline-flex items-center gap-8 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        <span className="font-royal text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest uppercase text-ivory/90">
          {content} ✦ {content} ✦
        </span>
        <span className="font-royal text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest uppercase text-ivory/90">
          {content} ✦ {content} ✦
        </span>
      </div>
    </div>
  );
};
