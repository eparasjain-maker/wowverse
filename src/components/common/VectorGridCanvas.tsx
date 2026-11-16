import React, { useRef, useEffect } from 'react';

interface VectorGridCanvasProps {
  color?: string;
  className?: string;
  gridSize?: number;
}

export const VectorGridCanvas: React.FC<VectorGridCanvasProps> = ({
  color = 'rgba(206, 31, 26, 0.45)', // Monument default crimson red
  className = '',
  gridSize = 42,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originX = i * gridSize;
          const originY = j * gridSize;

          // Distance to mouse
          const dx = mouseX - originX;
          const dy = mouseY - originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Interactive wave and displacement
          let offsetX = 0;
          let offsetY = 0;
          let scale = 1;

          if (dist < 180) {
            const force = (180 - dist) / 180;
            offsetX = -(dx / dist) * force * 15;
            offsetY = -(dy / dist) * force * 15;
            scale = 1 + force * 0.8;
          }

          // Subtle background breathing
          const wave = Math.sin(time + i * 0.2 + j * 0.2) * 2;
          const x = originX + offsetX + wave;
          const y = originY + offsetY;

          // Draw geometric crosshairs/dots
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;

          const arm = 3.5 * scale;
          ctx.beginPath();
          ctx.moveTo(x - arm, y);
          ctx.lineTo(x + arm, y);
          ctx.moveTo(x, y - arm);
          ctx.lineTo(x, y + arm);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [color, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
    />
  );
};
