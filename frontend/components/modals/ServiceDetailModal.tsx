'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layers, Activity } from 'lucide-react';

export interface ServiceData {
  id: string;
  serviceNumber: string;
  category: string;
  type: string;
  title: string;
  targetAudience?: string;
  image: string;
  desc: string;
  subDesc?: string;
  bullets: string[];
  tags: string[];
  ctaLabel: string;
  processFlow?: string[];
  metricsBadge?: string;
  isStar?: boolean;
}

interface ServiceDetailModalProps {
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
  index: number;
}

const serviceColorSchemes: Record<
  number,
  {
    solidBg: string;
    accentHex: string;
    lightBg: string;
    badgeStyle: string;
    btnGradient: string;
    pillBg: string;
  }
> = {
  0: {
    solidBg: 'bg-[#FF7A00]',
    accentHex: '#FF7A00',
    lightBg: 'bg-amber-50/80',
    badgeStyle: 'bg-amber-50 text-[#FF7A00] border-amber-200/80',
    btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00]',
    pillBg: 'bg-amber-500/10 text-amber-700 border-amber-200',
  },
  1: {
    solidBg: 'bg-[#2563EB]',
    accentHex: '#2563EB',
    lightBg: 'bg-blue-50/80',
    badgeStyle: 'bg-blue-50 text-[#2563EB] border-blue-200/80',
    btnGradient: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF]',
    pillBg: 'bg-blue-500/10 text-blue-700 border-blue-200',
  },
  2: {
    solidBg: 'bg-[#0D9488]',
    accentHex: '#0D9488',
    lightBg: 'bg-teal-50/80',
    badgeStyle: 'bg-teal-50 text-[#0D9488] border-teal-200/80',
    btnGradient: 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59]',
    pillBg: 'bg-teal-500/10 text-teal-700 border-teal-200',
  },
  3: {
    solidBg: 'bg-[#FF7A00]',
    accentHex: '#FF7A00',
    lightBg: 'bg-amber-50/80',
    badgeStyle: 'bg-amber-50 text-[#FF7A00] border-amber-200/80',
    btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00]',
    pillBg: 'bg-amber-500/10 text-amber-700 border-amber-200',
  },
  4: {
    solidBg: 'bg-[#2563EB]',
    accentHex: '#2563EB',
    lightBg: 'bg-blue-50/80',
    badgeStyle: 'bg-blue-50 text-[#2563EB] border-blue-200/80',
    btnGradient: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF]',
    pillBg: 'bg-blue-500/10 text-blue-700 border-blue-200',
  },
  5: {
    solidBg: 'bg-[#0D9488]',
    accentHex: '#0D9488',
    lightBg: 'bg-teal-50/80',
    badgeStyle: 'bg-teal-50 text-[#0D9488] border-teal-200/80',
    btnGradient: 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59]',
    pillBg: 'bg-teal-500/10 text-teal-700 border-teal-200',
  },
  6: {
    solidBg: 'bg-[#FF7A00]',
    accentHex: '#FF7A00',
    lightBg: 'bg-amber-50/80',
    badgeStyle: 'bg-amber-50 text-[#FF7A00] border-amber-200/80',
    btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00]',
    pillBg: 'bg-amber-500/10 text-amber-700 border-amber-200',
  },
  7: {
    solidBg: 'bg-[#2563EB]',
    accentHex: '#2563EB',
    lightBg: 'bg-blue-50/80',
    badgeStyle: 'bg-blue-50 text-[#2563EB] border-blue-200/80',
    btnGradient: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF]',
    pillBg: 'bg-blue-500/10 text-blue-700 border-blue-200',
  },
};

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onBookService,
  index,
}) => {
  if (!service || !isOpen) return null;

  const colorScheme = serviceColorSchemes[index % 8] || serviceColorSchemes[0];



  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-24 sm:pt-28 pb-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#0F172A] shadow-md transition-colors hover:bg-slate-200 z-20 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Banner Graphic with embedded padding to keep the image contained inside */}
          <div className="relative mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg bg-slate-950">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight">
                {service.title}
              </h2>
              {service.targetAudience && (
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {service.targetAudience}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2.5 text-sm text-slate-600 leading-relaxed font-normal">
              <p>{service.desc}</p>
              {service.subDesc && <p className="text-slate-500">{service.subDesc}</p>}
            </div>

            {/* Engineering Lifecycle / Process Flow */}
            {service.processFlow && service.processFlow.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Activity className="h-3.5 w-3.5 text-[#0D9488]" />
                  <span>Engineering Lifecycle</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  {service.processFlow.map((step, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
                        {step}
                      </span>
                      {sIdx < service.processFlow!.length - 1 && (
                        <span className="text-[#0D9488] font-extrabold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables / Capabilities */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] mb-3">
                Key Capabilities & Deliverables
              </h3>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {service.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start space-x-2.5 rounded-xl bg-slate-50/70 p-3 border border-slate-200/60 hover:bg-white transition-all">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 mt-0.5"
                      style={{ color: colorScheme.accentHex }}
                    />
                    <span className="text-xs font-semibold text-[#1E293B] leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] mb-2.5 flex items-center space-x-1">
                <Layers className="h-3.5 w-3.5" style={{ color: colorScheme.accentHex }} />
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-bold shadow-2xs border bg-white"
                    style={{
                      color: colorScheme.accentHex,
                      borderColor: `${colorScheme.accentHex}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>


          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
