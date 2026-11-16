import React, { useEffect, useState } from 'react';

export const RoyalCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const customCursor = target.closest('[data-cursor]');
        const interactive = target.closest('a, button, [role="button"], input, select');

        if (customCursor) {
          setHoverText(customCursor.getAttribute('data-cursor'));
          setIsHovering(true);
        } else if (interactive) {
          setHoverText(null);
          setIsHovering(true);
        } else {
          setHoverText(null);
          setIsHovering(false);
        }
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [pos]);

  if (!visible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Golden Jewel Center */}
      <div
        className="fixed w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_12px_#D4AF37] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />

      {/* Royal Gold Ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 flex items-center justify-center ${
          hoverText
            ? 'w-24 h-24 bg-surface/90 border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.4)] backdrop-blur-md scale-100'
            : isHovering
            ? 'w-14 h-14 border border-gold/80 bg-gold/10 scale-110'
            : 'w-9 h-9 border border-gold/40 scale-100'
        }`}
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
      >
        {hoverText && (
          <span className="font-royal text-[10px] font-bold tracking-widest text-gold uppercase text-center px-1">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
};
