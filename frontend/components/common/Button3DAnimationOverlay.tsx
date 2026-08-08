'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MousePointer } from 'lucide-react';

interface ClickedButtonInfo {
  id: string;
  name: string;
  x: number;
  y: number;
}

export const Button3DAnimationOverlay: React.FC = () => {
  const [activeAnimation, setActiveAnimation] = useState<ClickedButtonInfo | null>(null);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const buttonEl = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]');
      if (!buttonEl) return;

      let name = buttonEl.textContent?.trim() || '';
      if (!name || name.length < 1) {
        name = buttonEl.getAttribute('aria-label') || buttonEl.getAttribute('title') || 'Action Triggered';
      }

      name = name.replace(/\s+/g, ' ').trim();
      if (name.length > 32) {
        name = name.substring(0, 32) + '...';
      }

      const rect = buttonEl.getBoundingClientRect();
      const clickX = event.clientX || rect.left + rect.width / 2;
      const clickY = event.clientY || rect.top + rect.height / 2;

      setActiveAnimation({
        id: Date.now().toString(),
        name: name.toUpperCase(),
        x: clickX,
        y: clickY,
      });
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => {
      window.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  useEffect(() => {
    if (!activeAnimation) return;
    const timer = setTimeout(() => {
      setActiveAnimation(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, [activeAnimation]);

  return (
    <AnimatePresence>
      {activeAnimation && (
        <div className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
          />

          <motion.div
            key={activeAnimation.id}
            initial={{
              opacity: 0,
              scale: 0.15,
              rotateX: -55,
              rotateY: 35,
              rotateZ: -15,
              y: 60,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 1.25,
              rotateX: 45,
              y: -70,
              transition: { duration: 0.3, ease: 'easeIn' },
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 16,
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
            className="relative px-8 sm:px-12 py-6 sm:py-8 rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#FF7A00] to-[#FF9933] text-white border-2 border-[#FF9933]/50 shadow-[0_30px_70px_-15px_rgba(255,122,0,0.85)] flex flex-col items-center justify-center gap-2 select-none"
          >
            <div className="absolute -top-3 -right-3 p-2 bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white rounded-full shadow-xl animate-bounce">
              <Sparkles className="w-5 h-5 fill-current text-white" />
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-[10px] font-black uppercase tracking-[0.25em] text-[#FDFBF7] backdrop-blur-md">
              <MousePointer className="w-3 h-3 text-[#FF7A00]" />
              <span>3D BUTTON ACTION</span>
            </div>

            <div
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-center text-white px-2 py-1"
              style={{
                textShadow: `
                  0 1px 0 #FF7A00,
                  0 2px 0 #D96A00,
                  0 3px 0 #B35700,
                  0 4px 0 #8C4400,
                  0 5px 0 #663100,
                  0 15px 30px rgba(0, 0, 0, 0.65),
                  0 0 25px rgba(255, 122, 0, 0.85)
                `,
              }}
            >
              {activeAnimation.name}
            </div>

            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FF9933] to-transparent rounded-full mt-2 shadow-[0_0_15px_#FF7A00]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Button3DAnimationOverlay;
