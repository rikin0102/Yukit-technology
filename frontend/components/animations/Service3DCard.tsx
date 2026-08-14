'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  Activity,
  LucideIcon,
} from 'lucide-react';

export interface Service3DCardProps {
  id: string;
  index: number;
  serviceNumber: string;
  isStar?: boolean;
  type: string;
  category?: string;
  title: string;
  targetAudience?: string;
  icon?: LucideIcon;
  image: string;
  desc: string;
  subDesc?: string;
  bullets: string[];
  tags: string[];
  ctaLabel: string;
  processFlow?: string[];
  metricsBadge?: string;
  onOpenQuote: (type: string) => void;
}

// Sophisticated Tailored Color Palette per Service Card
const serviceColorSchemes: Record<
  number,
  {
    solidBg: string;
    accentHex: string;
    lightBg: string;
    badgeStyle: string;
    borderGlow: string;
    btnGradient: string;
    pillBg: string;
  }
> = {
  0: {
    solidBg: 'bg-[#0D9488]',
    accentHex: '#0D9488',
    lightBg: 'bg-teal-50/80',
    badgeStyle: 'bg-teal-50 text-[#0D9488] border-teal-200/80',
    borderGlow: 'hover:border-teal-500/40 hover:shadow-teal-500/10',
    btnGradient: 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59]',
    pillBg: 'bg-teal-500/10 text-teal-700 border-teal-200',
  },
  1: {
    solidBg: 'bg-[#FF7A00]',
    accentHex: '#FF7A00',
    lightBg: 'bg-amber-50/80',
    badgeStyle: 'bg-amber-50 text-[#FF7A00] border-amber-200/80',
    borderGlow: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
    btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00]',
    pillBg: 'bg-amber-500/10 text-amber-700 border-amber-200',
  },
  2: {
    solidBg: 'bg-[#2563EB]',
    accentHex: '#2563EB',
    lightBg: 'bg-blue-50/80',
    badgeStyle: 'bg-blue-50 text-[#2563EB] border-blue-200/80',
    borderGlow: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
    btnGradient: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF]',
    pillBg: 'bg-blue-500/10 text-blue-700 border-blue-200',
  },
  3: {
    solidBg: 'bg-[#0D9488]',
    accentHex: '#0D9488',
    lightBg: 'bg-teal-50/80',
    badgeStyle: 'bg-teal-50 text-[#0D9488] border-teal-200/80',
    borderGlow: 'hover:border-teal-500/40 hover:shadow-teal-500/10',
    btnGradient: 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59]',
    pillBg: 'bg-teal-500/10 text-teal-700 border-teal-200',
  },
  4: {
    solidBg: 'bg-[#FF7A00]',
    accentHex: '#FF7A00',
    lightBg: 'bg-amber-50/80',
    badgeStyle: 'bg-amber-50 text-[#FF7A00] border-amber-200/80',
    borderGlow: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
    btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00]',
    pillBg: 'bg-amber-500/10 text-amber-700 border-amber-200',
  },
  5: {
    solidBg: 'bg-[#2563EB]',
    accentHex: '#2563EB',
    lightBg: 'bg-blue-50/80',
    badgeStyle: 'bg-blue-50 text-[#2563EB] border-blue-200/80',
    borderGlow: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
    btnGradient: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF]',
    pillBg: 'bg-blue-500/10 text-blue-700 border-blue-200',
  },
  6: {
    solidBg: 'bg-[#0D9488]',
    accentHex: '#0D9488',
    lightBg: 'bg-teal-50/80',
    badgeStyle: 'bg-teal-50 text-[#0D9488] border-teal-200/80',
    borderGlow: 'hover:border-teal-500/40 hover:shadow-teal-500/10',
    btnGradient: 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59]',
    pillBg: 'bg-teal-500/10 text-teal-700 border-teal-200',
  },
  7: {
    solidBg: 'bg-[#FF7A00]',
    accentHex: '#FF7A00',
    lightBg: 'bg-amber-50/80',
    badgeStyle: 'bg-amber-50 text-[#FF7A00] border-amber-200/80',
    borderGlow: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
    btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00]',
    pillBg: 'bg-amber-500/10 text-amber-700 border-amber-200',
  },
};

export const Service3DCard: React.FC<Service3DCardProps> = ({
  id,
  index,
  serviceNumber,
  isStar = false,
  type,
  title,
  targetAudience,
  image,
  desc,
  subDesc,
  bullets,
  tags,
  ctaLabel,
  processFlow,
  metricsBadge,
  onOpenQuote,
}) => {
  const isEven = index % 2 === 0;
  const colorScheme = serviceColorSchemes[index % 8];

  // Default metric badge if not passed
  const displayMetric =
    metricsBadge ||
    (isStar
      ? '⚡ Yukti AI Suite'
      : index === 0
      ? '⚡ Sub-Second Load Speed'
      : index === 1
      ? '🚀 99.99% SaaS Uptime'
      : index === 2
      ? '📱 Native iOS & Android'
      : index === 4
      ? '✨ High-Converting UX'
      : index === 5
      ? '🔒 Zero-Latency Gateways'
      : index === 6
      ? '🏢 Bespoke ERP Architecture'
      : '☁️ Cloud Kubernetes Scale');

  return (
    <div className="w-full my-6 sm:my-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg shadow-slate-200/40 p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all duration-300 ${colorScheme.borderGlow}`}
      >
        {/* Subtle Ambient Background Watermark Number */}
        <div className="absolute top-2 right-6 sm:right-10 text-[100px] sm:text-[140px] font-black text-slate-100/70 select-none pointer-events-none leading-none z-0 tracking-tighter">
          {serviceNumber}
        </div>

        {/* Ambient Top Glow Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${colorScheme.accentHex}, transparent)`,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ========================================================================= */}
          {/* CONTENT COLUMN */}
          {/* ========================================================================= */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              isEven ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {/* Top Badges & Service Index */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Index Pill */}
                <div
                  className={`flex h-6 px-2.5 items-center justify-center rounded-full text-white font-black text-[10px] uppercase tracking-wider ${colorScheme.solidBg} shadow-xs`}
                >
                  SERVICE {serviceNumber}
                </div>

                {/* Type Badge */}
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${colorScheme.badgeStyle}`}
                >
                  {type}
                </span>

                {/* Star / Differentiator Flagship Badge */}
                {isStar && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#0D9488] to-[#0F766E] shadow-sm animate-pulse">
                    <Sparkles className="h-3 w-3" />
                    <span>Yukti Flagship</span>
                  </span>
                )}
              </div>

              {/* Title with Gradient Accent */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                {title}
              </h2>

              {/* Target Audience Bar */}
              {targetAudience && (
                <div className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100/90 px-3 py-1 rounded-lg border border-slate-200/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
                  <span>{targetAudience}</span>
                </div>
              )}
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>{desc}</p>
              {subDesc && (
                <p className="text-slate-500 font-normal">{subDesc}</p>
              )}
            </div>

            {/* Live Process Pipeline Ribbon */}
            {processFlow && processFlow.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2">
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Activity className="h-3 w-3 text-[#0D9488]" />
                  <span>Engineering Lifecycle</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-[#0F172A]">
                  {processFlow.map((step, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                        {step}
                      </span>
                      {sIdx < processFlow.length - 1 && (
                        <span className="text-[#0D9488] font-extrabold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Capabilities Checkbox Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {bullets.map((bullet, bIdx) => (
                <div
                  key={bIdx}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-white hover:border-slate-300 transition-all text-xs font-semibold text-[#1E293B]"
                >
                  <div
                    className="h-4 w-4 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${colorScheme.accentHex}15` }}
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5"
                      style={{ color: colorScheme.accentHex }}
                    />
                  </div>
                  <span className="leading-snug">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips Bar */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Technologies & Frameworks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenQuote(title)}
                className={`px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-black flex items-center space-x-2.5 text-white shadow-md shadow-slate-900/10 cursor-pointer ${colorScheme.btnGradient}`}
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HIGH-CRAFT DARK STUDIO CODE & UI PREVIEW CANVAS */}
          {/* ========================================================================= */}
          <div
            className={`lg:col-span-5 ${
              isEven ? 'lg:order-2' : 'lg:order-1'
            } flex justify-center items-center`}
          >
            <div className="w-full relative group/studio">
              {/* Studio Canvas Outer Frame */}
              <div className="w-full rounded-2xl bg-[#0B1120] border border-slate-800 shadow-2xl p-3 sm:p-4 relative overflow-hidden">
                {/* Window Top Chrome (Traffic Lights + Breadcrumb) */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-[11px] font-mono text-slate-400">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  {/* Window Title Path */}
                  <div className="text-[10px] text-slate-400 flex items-center space-x-1 font-mono tracking-tight">
                    <Terminal className="h-3 w-3 text-slate-500" />
                    <span>yukti://services/{id}</span>
                  </div>

                  {/* Live Status Indicator */}
                  <div className="flex items-center space-x-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE</span>
                  </div>
                </div>

                {/* Main Visual Display Window */}
                <div className="w-full aspect-[16/11] rounded-xl relative overflow-hidden bg-slate-950 border border-slate-800/80 group-hover/studio:border-slate-700 transition-all duration-300">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/studio:scale-105"
                  />

                  {/* Gradient Overlay for Crisp Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/20 to-transparent pointer-events-none" />

                  {/* Floating Metric Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-[10px] font-bold tracking-wide shadow-lg">
                      <Cpu className="h-3 w-3 text-[#0D9488]" />
                      <span>{displayMetric}</span>
                    </div>

                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] font-extrabold uppercase">
                      <Layers className="h-3 w-3" />
                      <span>PROD ARCH</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="pt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600 inline-block" />
                    <span>Yukti Eng Suite v3.2</span>
                  </span>
                  <span className="text-slate-400 font-semibold">99.99% Reliability</span>
                </div>
              </div>

              {/* Ambient Glow behind Studio Canvas */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-20 blur-xl -z-10 transition-opacity group-hover/studio:opacity-40 pointer-events-none"
                style={{ backgroundColor: colorScheme.accentHex }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Service3DCard;
