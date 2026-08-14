'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface YuktiLogoMarkProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const YuktiLogoMark: React.FC<YuktiLogoMarkProps> = ({
  size = 'md',
}) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rotateX: -y * 0.15,
      rotateY: x * 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const iconSizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-center space-x-3 group cursor-pointer select-none"
    >
      {/* 3D Monogram Logo Badge: Deep Navy Background with distinct Solid Saffron & Teal Monogram */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative flex ${iconSizes[size]} items-center justify-center rounded-2xl bg-[#0F172A] border border-slate-700 shadow-lg shadow-teal-900/10 overflow-hidden transform-style-3d group-hover:border-[#0D9488] transition-colors duration-300`}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-7 w-7 relative z-10 transform-style-3d group-hover:scale-110 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid Lines (Solid Teal) */}
          <path
            d="M20 50H35 M65 50H80 M50 20V35 M50 65V80"
            stroke="#0D9488"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Outer Hex Shield Frame (Solid Saffron) */}
          <polygon
            points="50,12 83,31 83,69 50,88 17,69 17,31"
            stroke="#FF7A00"
            strokeWidth="3.5"
            strokeLinejoin="round"
            opacity="0.7"
          />

          {/* Top Bar of 'T' (Solid Teal) */}
          <path
            d="M 26 28 L 74 28"
            stroke="#0D9488"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Left Branch of 'Y' (Solid Saffron) */}
          <path
            d="M 28 28 L 50 54"
            stroke="#FF7A00"
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* Right Branch of 'Y' (Solid Saffron) */}
          <path
            d="M 72 28 L 50 54"
            stroke="#FF7A00"
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* Central Stem (Solid Teal) */}
          <path
            d="M 50 54 L 50 78"
            stroke="#0D9488"
            strokeWidth="9.5"
            strokeLinecap="round"
          />

          {/* Vertices Nodes */}
          <circle cx="26" cy="28" r="4.5" fill="#FFFFFF" />
          <circle cx="74" cy="28" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="54" r="5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="78" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="12" r="3.5" fill="#0D9488" />
        </svg>
      </motion.div>

      {/* Brand Title: Distinct Navy + Separate Saffron */}
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-black tracking-tight text-[#0F172A] flex items-center leading-none`}>
          Yukti
          <span className="ml-1.5 text-[#FF7A00] font-black tracking-tight">
            Technology
          </span>
        </span>
      </div>
    </div>
  );
};

export default YuktiLogoMark;
