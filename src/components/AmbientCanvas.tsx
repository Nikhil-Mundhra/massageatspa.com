import React, { useEffect, useRef } from 'react';

/**
 * Organic Cartographic Isoline Topography Canvas
 * References: Archetype C (codrops/GradientTopographyAnimation)
 * Generates ambient undulating elevation contour lines in gold and sage tones.
 */
export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    let mouse = { x: width * 0.5, y: height * 0.4, targetX: width * 0.5, targetY: height * 0.4 };
    let time = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      time += 0.003;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Number of undulating contour lines
      const lineCount = 14;
      const step = height / (lineCount + 2);

      for (let i = 1; i <= lineCount; i++) {
        const baseY = i * step;
        const progress = i / lineCount;

        // Alternate subtle gold and sage palette
        const isGold = i % 2 === 0;
        const alpha = 0.04 + Math.sin(progress * Math.PI) * 0.07;
        const strokeColor = isGold
          ? `rgba(197, 155, 109, ${alpha})`
          : `rgba(140, 174, 152, ${alpha})`;

        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;

        for (let x = 0; x <= width; x += 16) {
          // Distance to mouse pointer for soft organic elevation warp
          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseFactor = Math.max(0, 1 - dist / 320);

          // Combined sine wave harmonics simulating elevation contours
          const wave1 = Math.sin(x * 0.0035 + time + i * 0.4) * 22;
          const wave2 = Math.cos(x * 0.007 - time * 0.8 + i * 0.3) * 14;
          const mousePush = Math.sin(dist * 0.02 - time * 2) * (mouseFactor * 26);

          const y = baseY + wave1 + wave2 + mousePush;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
