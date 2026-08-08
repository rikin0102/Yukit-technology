'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Calculate 3D tilt angles (max ~15 deg)
    const rotateX = -mouseY * 22; // Invert Y for natural tilt
    const rotateY = mouseX * 22;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);

    // Calculate glare highlight position
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="perspective-1000 w-full flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden rounded-3xl cursor-pointer select-none ${className}`}
      >
        {/* Dynamic Mouse Glare Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, rgba(255, 122, 0, ${glarePos.opacity * 0.4}) 35%, transparent 70%)`,
          }}
        />

        {/* Card Content with 3D Depth */}
        <div style={{ transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Card3DTilt;
