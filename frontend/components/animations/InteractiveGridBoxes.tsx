'use client';

import React, { useEffect, useRef } from 'react';

interface InteractiveGridBoxesProps {
  className?: string;
  gridSize?: number; // Size of each square in px
  highlightRadius?: number; // Distance threshold for mouse highlight in px
}

export const InteractiveGridBoxes: React.FC<InteractiveGridBoxesProps> = ({
  className = '',
  gridSize = 50,
  highlightRadius = 220,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates relative to canvas
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    // Matrix of square intensity trails for smooth fade
    let cols = 0;
    let rows = 0;
    let intensities: number[][] = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;

      cols = Math.ceil(width / gridSize) + 1;
      rows = Math.ceil(height / gridSize) + 1;

      intensities = Array.from({ length: cols }, () => Array(rows).fill(0));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener('mousemove', handleMouseMove as EventListener);
    parent.addEventListener('mouseleave', handleMouseLeave as EventListener);

    // Render loop
    const render = () => {
      // Smooth interpolation for mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Draw faint background grid lines
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const boxX = i * gridSize;
          const boxY = j * gridSize;
          const centerX = boxX + gridSize / 2;
          const centerY = boxY + gridSize / 2;

          // Distance from mouse to center of box
          const dx = centerX - mouse.x;
          const dy = centerY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Target intensity based on distance
          let targetIntensity = 0;
          if (dist < highlightRadius) {
            const factor = 1 - dist / highlightRadius;
            targetIntensity = Math.pow(factor, 2.2); // Smooth falloff
          }

          // Decay existing intensity or approach target
          if (targetIntensity > intensities[i][j]) {
            intensities[i][j] = targetIntensity;
          } else {
            intensities[i][j] *= 0.91; // Smooth trail decay
          }

          const currentIntensity = intensities[i][j];

          // 1. Draw base square grid line
          ctx.strokeStyle =
            currentIntensity > 0.02
              ? `rgba(255, 122, 0, ${0.15 + currentIntensity * 0.6})`
              : 'rgba(235, 226, 214, 0.45)';

          ctx.strokeRect(boxX, boxY, gridSize, gridSize);

          // 2. Fill highlighted box
          if (currentIntensity > 0.01) {
            // Gradient fill for glowing effect inside box
            const fillGradient = ctx.createRadialGradient(
              centerX,
              centerY,
              2,
              centerX,
              centerY,
              gridSize * 0.7
            );
            fillGradient.addColorStop(0, `rgba(255, 122, 0, ${currentIntensity * 0.32})`);
            fillGradient.addColorStop(0.6, `rgba(255, 153, 51, ${currentIntensity * 0.18})`);
            fillGradient.addColorStop(1, `rgba(255, 180, 70, ${currentIntensity * 0.03})`);

            ctx.fillStyle = fillGradient;
            ctx.fillRect(boxX + 1, boxY + 1, gridSize - 2, gridSize - 2);

            // Subtle inner border glow
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = `rgba(255, 122, 0, ${currentIntensity * 0.75})`;
            ctx.strokeRect(boxX + 0.5, boxY + 0.5, gridSize - 1, gridSize - 1);
            ctx.lineWidth = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parent.removeEventListener('mousemove', handleMouseMove as EventListener);
      parent.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, highlightRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default InteractiveGridBoxes;
