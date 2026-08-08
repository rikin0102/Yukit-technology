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
      {/* 3D Interwoven Y+T AI Monogram Logo Badge */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative flex ${iconSizes[size]} items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1A1A1A] via-[#2A2A2E] to-[#121215] border border-white/20 shadow-xl shadow-[#FF7A00]/20 overflow-hidden transform-style-3d group-hover:border-[#FF7A00]/50 transition-colors duration-300`}
      >
        {/* Ambient Saffron Glow Ring */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A00]/25 via-transparent to-[#FF9933]/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Crisp Vector Interwoven 'Y' & 'T' Monogram with AI Circuit Nodes */}
        <svg
          viewBox="0 0 100 100"
          className="h-7 w-7 relative z-10 drop-shadow-[0_2px_10px_rgba(255,122,0,0.6)] transform-style-3d group-hover:scale-110 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Saffron Brand Gradient */}
            <linearGradient id="ytBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="50%" stopColor="#FF8800" />
              <stop offset="100%" stopColor="#FF9933" />
            </linearGradient>

            {/* Glowing AI Circuit Line Gradient */}
            <linearGradient id="aiNodeGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFD2A8" />
            </linearGradient>
          </defs>

          {/* Background AI Circuit Grid Lines */}
          <path
            d="M20 50H35 M65 50H80 M50 20V35 M50 65V80"
            stroke="url(#ytBrandGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Outer Monogram Frame Hex-Shield */}
          <polygon
            points="50,12 83,31 83,69 50,88 17,69 17,31"
            stroke="url(#ytBrandGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            opacity="0.4"
          />

          {/* INTERWOVEN 'Y' & 'T' MONOGRAM STRUCTURE */}
          {/* Top Horizontal Bar of 'T' */}
          <path
            d="M 26 28 L 74 28"
            stroke="url(#ytBrandGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Diagonal Left Branch of 'Y' interwoven with 'T' */}
          <path
            d="M 28 28 L 50 54"
            stroke="url(#ytBrandGrad)"
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* Diagonal Right Branch of 'Y' interwoven with 'T' */}
          <path
            d="M 72 28 L 50 54"
            stroke="url(#ytBrandGrad)"
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* Main Central Stem for both 'Y' and 'T' */}
          <path
            d="M 50 54 L 50 78"
            stroke="url(#ytBrandGrad)"
            strokeWidth="9.5"
            strokeLinecap="round"
          />

          {/* Inner Highlight Core Lines for 3D Inset */}
          <path
            d="M 30 28 H 70 M 32 30 L 50 52 L 68 30 M 50 54 V 76"
            stroke="url(#aiNodeGlow)"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* AI Neural Circuit Nodes (Glowing Dots at Y-T Vertices) */}
          <circle cx="26" cy="28" r="4.5" fill="#FFFFFF" className="animate-pulse" />
          <circle cx="74" cy="28" r="4.5" fill="#FFFFFF" className="animate-pulse" />
          <circle cx="50" cy="54" r="5" fill="#FF7A00" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="78" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="12" r="3.5" fill="#FF9933" />
        </svg>

        {/* Light Shimmer Sweep across Logo Icon */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      </motion.div>

      {/* Animated Text Brand Title: Yukti Technology */}
      <div className="flex flex-col">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative inline-block overflow-hidden"
        >
          <span className={`${textSizes[size]} font-black tracking-tight text-[#1A1A1A] flex items-center leading-none`}>
            Yukti
            <span className="ml-1.5 text-saffron-gradient font-black tracking-tight drop-shadow-[0_2px_12px_rgba(255,122,0,0.3)]">
              Technology
            </span>
          </span>

          {/* Shiny Metallic Text Shimmer Overlay */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default YuktiLogoMark;
