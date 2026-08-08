'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Calculator, ArrowRight, LucideIcon } from 'lucide-react';

interface Service3DCardProps {
  id: string;
  index: number;
  type: string;
  title: string;
  icon: LucideIcon;
  image: string;
  desc: string;
  bullets: string[];
  tags: string[];
  onOpenQuote: (type: string) => void;
}

export const Service3DCard: React.FC<Service3DCardProps> = ({
  index,
  type,
  title,
  icon: Icon,
  image,
  desc,
  bullets,
  tags,
  onOpenQuote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // Scroll 3D Animation Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // 3D Scroll Transforms
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [isEven ? 12 : -12, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [isEven ? -8 : 8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Interactive Mouse Tilt State
  const [mouseTilt, setMouseTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({
      rx: -yPos * 8,
      ry: x * 8,
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rx: 0, ry: 0 });
  };

  return (
    <div ref={containerRef} className="perspective-1000 w-full my-6">
      <motion.div
        style={{
          scale,
          opacity,
          rotateX: mouseTilt.rx || rotateX,
          rotateY: mouseTilt.ry || rotateY,
          y,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-md border border-[#EFE7DC] glass-card-hover relative overflow-hidden group ${
          isEven ? '' : 'lg:flex-row-reverse'
        }`}
      >
        {/* Ambient Gradient Glow */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-[#FF7A00]/10 to-[#FF9933]/5 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        {/* Content Side */}
        <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`} style={{ transformStyle: 'preserve-3d' }}>
          {/* Header Badge & Number */}
          <div className="flex items-center space-x-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25 transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
                Service 0{index + 1}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
                {title}
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-[#5A5A5A] font-normal">
            {desc}
          </p>

          {/* Feature Bullets (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start space-x-2 text-xs text-[#1A1A1A]">
                <CheckCircle2 className="h-4 w-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#2D2D2D] leading-snug">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#FF7A00] bg-[#FF7A00]/10 border border-[#FF7A00]/25"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenQuote(type)}
              className="btn-saffron px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center space-x-2 shadow-md shadow-[#FF7A00]/20 cursor-pointer"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Get Estimate for {type}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>

        {/* 3D Generated Service Image Side */}
        <div
          className={`lg:col-span-5 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          } flex justify-center`}
          style={{ transform: 'translateZ(25px)' }}
        >
          <div className="w-full h-48 sm:h-56 rounded-2xl relative overflow-hidden group/visual shadow-lg border border-[#EFE7DC] bg-[#121215]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover/visual:scale-108"
            />
            {/* Subtle Overlay Badge */}
            <div className="absolute top-3 left-3 bg-[#121215]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1.5 shadow-sm">
              <Icon className="h-3.5 w-3.5 text-[#FF7A00]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-white">
                {type} Spec
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Service3DCard;
