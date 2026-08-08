'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const ContactCoupleAnimation: React.FC = () => {
  // Smooth Natural 3D Tilt Effect on Mouse Movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 14 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 14 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['-6deg', '6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 select-none perspective-1000"
    >
      {/* Soft Background Radial Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* 3D CHARACTER PRESENTATION */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full max-w-lg flex flex-col items-center justify-center"
      >
        <div className="relative w-full aspect-[4/3.2] flex items-center justify-center bg-transparent">
          <Image
            src="/images/indian_couple_3d_exact.png"
            alt="Yukti Technologies Contact Team"
            fill
            priority
            className="object-contain object-center scale-100 hover:scale-103 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Clean Sub-Label Underneath */}
        <div className="mt-2 text-center space-y-0.5">
          <p className="text-sm font-extrabold text-foreground tracking-wide">Yukti Technologies Team</p>
          <p className="text-xs font-bold text-primary uppercase tracking-wider">Ahmedabad, Gujarat, India</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactCoupleAnimation;
