'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Title3DTextProps {
  text: string;
  className?: string;
  highlightWord?: string;
}

export const Title3DText: React.FC<Title3DTextProps> = ({
  text,
  className = '',
  highlightWord = 'Technology',
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = text.split(' ');

  return (
    <div
      className={`perspective-1000 select-none ${className}`}
      style={{
        transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 transform-style-3d">
        {words.map((word, wordIdx) => {
          const isHighlight = word.toLowerCase() === highlightWord.toLowerCase();
          const letters = word.split('');

          return (
            <div key={wordIdx} className="inline-flex transform-style-3d">
              {letters.map((char, charIdx) => {
                const globalIdx = wordIdx * 10 + charIdx;
                return (
                  <motion.span
                    key={charIdx}
                    initial={{
                      opacity: 0,
                      rotateY: -90,
                      rotateX: 45,
                      z: -100,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      rotateY: 0,
                      rotateX: 0,
                      z: 0,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: globalIdx * 0.04,
                      ease: 'easeOut',
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotateZ: Math.random() * 10 - 5,
                      z: 40,
                      transition: { duration: 0.2 },
                    }}
                    className={`inline-block font-extrabold tracking-tight ${
                      isHighlight ? 'text-saffron-gradient drop-shadow-sm' : 'text-[#1A1A1A]'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      textShadow: isHighlight
                        ? '0 10px 20px rgba(255,122,0,0.2)'
                        : '0 8px 16px rgba(26,26,26,0.1)',
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Title3DText;
