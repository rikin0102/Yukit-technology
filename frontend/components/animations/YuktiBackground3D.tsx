'use client';

import React, { useEffect, useRef } from 'react';

interface YuktiBackground3DProps {
  className?: string;
}

export const YuktiBackground3D: React.FC<YuktiBackground3DProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const boxSize = 48;
    const gap = 16;
    const stride = boxSize + gap;
    const highlightRadius = 240;

    interface GridBox {
      x: number;
      y: number;
      currentZ: number;
      targetZ: number;
      colorType: 'saffron' | 'blue' | 'green';
      rgb: string;
      topRgb: string;
      sideRgb: string;
      glowHex: string;
    }

    let boxes: GridBox[] = [];

    // Indian Flag Color System (Saffron #FF7A00, Ashoka Blue #2563EB, India Green #0D9488)
    const tricolorPalette = [
      {
        type: 'saffron' as const,
        rgb: 'rgba(255, 122, 0, ',
        topRgb: 'rgba(255, 153, 51, ',
        sideRgb: 'rgba(204, 98, 0, ',
        glowHex: '#FF7A00',
      },
      {
        type: 'blue' as const,
        rgb: 'rgba(37, 99, 235, ',
        topRgb: 'rgba(96, 165, 250, ',
        sideRgb: 'rgba(30, 64, 175, ',
        glowHex: '#2563EB',
      },
      {
        type: 'green' as const,
        rgb: 'rgba(13, 148, 136, ',
        topRgb: 'rgba(20, 184, 166, ',
        sideRgb: 'rgba(15, 118, 110, ',
        glowHex: '#0D9488',
      },
    ];

    const initGrid = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;

      const cols = Math.ceil(width / stride) + 1;
      const rows = Math.ceil(height / stride) + 1;

      boxes = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * stride;
          const y = r * stride;

          // Assign Tricolor in alternating sequence across grid
          const paletteIndex = (c + r) % tricolorPalette.length;
          const colorObj = tricolorPalette[paletteIndex];

          boxes.push({
            x,
            y,
            currentZ: 0,
            targetZ: 0,
            colorType: colorObj.type,
            rgb: colorObj.rgb,
            topRgb: colorObj.topRgb,
            sideRgb: colorObj.sideRgb,
            glowHex: colorObj.glowHex,
          });
        }
      }
    };

    initGrid();
    window.addEventListener('resize', initGrid);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw3DBox = (box: GridBox) => {
      const { x, y, currentZ, rgb, topRgb, sideRgb, glowHex } = box;
      const size = boxSize;

      // 3D Offset Projection based on Z elevation
      const zOffset = currentZ * 14;
      const topX = x - zOffset * 0.4;
      const topY = y - zOffset * 0.6;

      const alpha = 0.06 + currentZ * 0.75;
      const isLit = currentZ > 0.04;

      ctx.save();

      // Glow effect when cursor highlights box
      if (isLit) {
        ctx.shadowColor = glowHex;
        ctx.shadowBlur = 14 * currentZ;
      }

      // Draw 3D Side Bevels (Right & Bottom faces for 3D elevation depth)
      if (currentZ > 0.01) {
        // Bottom Face
        ctx.beginPath();
        ctx.moveTo(x, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(topX + size, topY + size);
        ctx.lineTo(topX, topY + size);
        ctx.closePath();
        ctx.fillStyle = `${sideRgb}${alpha * 0.7})`;
        ctx.fill();

        // Right Face
        ctx.beginPath();
        ctx.moveTo(x + size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(topX + size, topY + size);
        ctx.lineTo(topX + size, topY);
        ctx.closePath();
        ctx.fillStyle = `${sideRgb}${alpha * 0.85})`;
        ctx.fill();
      }

      // Draw 3D Main Top Square Face
      ctx.beginPath();
      ctx.rect(topX, topY, size, size);
      ctx.fillStyle = isLit ? `${topRgb}${alpha})` : 'rgba(255, 255, 255, 0.85)';
      ctx.fill();

      // 3D Outer Border Stroke in Indian Tricolor
      ctx.lineWidth = isLit ? 1.5 : 1;
      ctx.strokeStyle = isLit
        ? `${rgb}${Math.min(1, alpha + 0.25)})`
        : 'rgba(226, 232, 240, 0.55)';
      ctx.stroke();

      // Inner 3D Center Dot Node when lit
      if (isLit) {
        ctx.beginPath();
        ctx.arc(topX + size / 2, topY + size / 2, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${rgb}1)`;
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Render 3D Boxes Grid
      boxes.forEach((box) => {
        const centerX = box.x + boxSize / 2;
        const centerY = box.y + boxSize / 2;

        const dx = centerX - mouse.x;
        const dy = centerY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < highlightRadius) {
          const factor = 1 - dist / highlightRadius;
          box.targetZ = Math.pow(factor, 2);
        } else {
          box.targetZ = 0;
        }

        // Smooth 3D elevation interpolation
        box.currentZ += (box.targetZ - box.currentZ) * 0.12;

        draw3DBox(box);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`fixed inset-0 h-full w-full pointer-events-none z-0 overflow-hidden bg-[#F8FAFC] ${className}`}>
      {/* Light Theme Ambient Glow Orbs in Tricolor Palette */}
      <div className="absolute top-[-10%] left-[-5%] h-[36rem] w-[36rem] rounded-full bg-[#FF7A00]/8 blur-3xl pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-[#2563EB]/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] h-[36rem] w-[36rem] rounded-full bg-[#0D9488]/8 blur-3xl pointer-events-none" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default YuktiBackground3D;
