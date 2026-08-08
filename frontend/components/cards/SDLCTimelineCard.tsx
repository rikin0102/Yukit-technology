'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, PackageCheck, ChevronDown } from 'lucide-react';

export interface SDLCStepData {
  num: string;
  phase: string;
  title: string;
  shortDesc: string;
  objectives: string[];
  deliverables: string[];
}

interface Props {
  step: SDLCStepData;
  isEven: boolean;
}

export const SDLCTimelineCard: React.FC<Props> = ({ step, isEven }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 6; // Max 6 deg tilt
    const rY = (mouseX / (width / 2)) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative text-left select-none cursor-pointer ${
        isHovered
          ? 'border-primary/40 bg-white shadow-[0_20px_50px_-10px_rgba(201,106,0,0.18)] z-30'
          : 'border-slate-200/80 bg-white/95 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Category Pill Badge & Step Number */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase font-mono px-2.5 py-1 rounded bg-[rgba(201,106,0,0.06)] border border-[rgba(201,106,0,0.18)]">
          {step.phase}
        </span>
        <span className="text-xs font-mono font-bold text-slate-400">
          STAGE {step.num}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-extrabold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
        {step.title}
      </h3>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
        {step.shortDesc}
      </p>

      {/* Hover Hint / Toggle Indicator */}
      <div className="flex items-center justify-between text-[11px] font-bold text-primary border-t border-slate-100 pt-3">
        <span>{isHovered ? 'Showing Objectives & Deliverables' : 'Hover to View Detailed Specs'}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
      </div>

      {/* Expandable Hover Details Drawer */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pt-4 mt-3 border-t border-slate-100 space-y-4"
          >
            {/* Objectives List */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Key Objectives</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-1">
                {step.objectives.map((obj, i) => (
                  <li key={i} className="text-[11px] text-slate-700 flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables List */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-foreground">
                <PackageCheck className="h-4 w-4 text-primary" />
                <span>Tangible Deliverables</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {step.deliverables.map((del, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full"
                  >
                    {del}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SDLCTimelineCard;
