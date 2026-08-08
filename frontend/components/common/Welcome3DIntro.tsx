'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu } from 'lucide-react';

export const Welcome3DIntro: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Show clean light Welcome Intro when site opens/loads
    const hasSeenIntro = sessionStorage.getItem('hasSeenYuktiWelcome');
    if (!hasSeenIntro) {
      setShowIntro(true);
      sessionStorage.setItem('hasSeenYuktiWelcome', 'true');

      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FFF8F0]/95 backdrop-blur-md p-4 overflow-hidden select-none"
        >
          {/* Subtle Ambient Light Radial Ring */}
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-[#C96A00]/10 via-[#FFF8F0] to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* SIMPLE LIGHT ELEGANT WELCOME CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative max-w-lg w-full px-8 py-10 rounded-3xl bg-white border border-[#EADBCE] shadow-[0_20px_50px_-15px_rgba(201,106,0,0.15)] flex flex-col items-center justify-center text-center gap-3"
          >
            {/* Top Light Tag */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C96A00]/10 border border-[#C96A00]/20 text-[#C96A00] text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome</span>
            </div>

            {/* Clean Light Heading */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1E1B4B] tracking-tight">
                Yukti Technologies
              </h1>
              <p className="text-xs sm:text-sm text-[#1F2937]/70 font-medium max-w-xs mx-auto">
                Enterprise Software & AI Architecture
              </p>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-32 h-1 bg-[#FFF8F0] rounded-full overflow-hidden mt-3">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-[#C96A00] to-[#D4A017]"
              />
            </div>

            {/* Simple Skip Button */}
            <button
              onClick={() => setShowIntro(false)}
              className="mt-1 text-[11px] font-semibold text-[#1F2937]/70 hover:text-[#1E1B4B] transition-colors cursor-pointer"
            >
              Skip →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Welcome3DIntro;
