import React, { useEffect, useState } from 'react';

export const MonumentCursor: React.FC = () => {
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
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [pos]);

  if (!visible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central focal pointer */}
      <div
        className="fixed w-2 h-2 rounded-full bg-wow -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />

      {/* Monument Faceted Diamond Polygon Cursor */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center ${
          hoverText
            ? 'w-24 h-24 scale-100'
            : isHovering
            ? 'w-16 h-16 scale-110'
            : 'w-10 h-10 scale-100'
        }`}
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full ${
            hoverText
              ? 'fill-wow text-wow drop-shadow-[0_0_20px_rgba(255,59,0,0.6)]'
              : isHovering
              ? 'fill-wow/20 stroke-wow stroke-2'
              : 'fill-transparent stroke-white/40 stroke-1'
          } transition-all duration-300`}
        >
          {/* Monument's exact faceted diamond polygon path */}
          <polygon
            points="26.5,3.5 69.5,0 100,28.5 97,72.3 72.4,100 30,96.5 2,72.3 0,30.3"
          />
        </svg>

        {hoverText && (
          <span className="absolute font-monument text-xs font-bold tracking-widest text-white uppercase select-none">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
};
