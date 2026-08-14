'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Compass, Code2, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Requirement Analysis',
    desc: 'Deep discovery into business logic, user personas, architecture constraints & performance targets.',
    icon: FileSearch,
    numColor: 'text-[#FF7A00]/50',
    iconBg: 'bg-gradient-to-tr from-[#FF7A00] to-[#FF9933]',
    iconShadow: 'shadow-[#FF7A00]/25',
    phaseText: 'text-[#FF7A00]',
    phaseDot: 'bg-[#FF7A00]',
    hoverBorder: 'hover:border-[#FF7A00]/50',
  },
  {
    num: '02',
    title: 'Planning & Design',
    desc: 'Interactive wireframing, high-fidelity UI/UX design, database schema, and microservice planning.',
    icon: Compass,
    numColor: 'text-[#FF7A00]/50',
    iconBg: 'bg-gradient-to-tr from-[#FF7A00] to-[#FF9933]',
    iconShadow: 'shadow-[#FF7A00]/25',
    phaseText: 'text-[#FF7A00]',
    phaseDot: 'bg-[#FF7A00]',
    hoverBorder: 'hover:border-[#FF7A00]/50',
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Agile sprints with production-grade code, modular components, clean API design, and AI model training.',
    icon: Code2,
    numColor: 'text-[#2563EB]/50',
    iconBg: 'bg-gradient-to-tr from-[#2563EB] to-[#3B82F6]',
    iconShadow: 'shadow-[#2563EB]/25',
    phaseText: 'text-[#2563EB]',
    phaseDot: 'bg-[#2563EB]',
    hoverBorder: 'hover:border-[#2563EB]/50',
  },
  {
    num: '04',
    title: 'Testing & QA',
    desc: 'Automated unit, integration, and load testing, end-to-end security audit, and edge-case verification.',
    icon: ShieldCheck,
    numColor: 'text-[#0D9488]/50',
    iconBg: 'bg-gradient-to-tr from-[#0D9488] to-[#10B981]',
    iconShadow: 'shadow-[#0D9488]/25',
    phaseText: 'text-[#0D9488]',
    phaseDot: 'bg-[#0D9488]',
    hoverBorder: 'hover:border-[#0D9488]/50',
  },
  {
    num: '05',
    title: 'Deploy & Support',
    desc: 'Zero-downtime CI/CD deployment, cloud scaling, telemetry monitoring, and ongoing post-launch maintenance.',
    icon: Rocket,
    numColor: 'text-[#0D9488]/50',
    iconBg: 'bg-gradient-to-tr from-[#0D9488] to-[#10B981]',
    iconShadow: 'shadow-[#0D9488]/25',
    phaseText: 'text-[#0D9488]',
    phaseDot: 'bg-[#0D9488]',
    hoverBorder: 'hover:border-[#0D9488]/50',
  },
];

export const ProcessFlowStep: React.FC = () => {
  return (
    <div className="relative py-10">
      {/* Desktop Connecting Line (Orange -> Blue -> Green) */}
      <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-[#EFE7DC] -translate-y-6 z-0">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#FF7A00] via-[#2563EB] to-[#0D9488] origin-left shadow-sm"
        />
      </div>

      {/* Step Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 35, rotateX: 25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`rounded-2xl bg-white p-6 shadow-lg border border-[#EFE7DC] flex flex-col justify-between glass-card-hover transition-all duration-300 ${step.hoverBorder} perspective-1000`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black ${step.numColor}`}>{step.num}</span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.iconBg} text-white shadow-md ${step.iconShadow}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-[#1A1A1A] mb-2">{step.title}</h3>
                <p className="text-xs leading-relaxed text-[#4A4A4A]">{step.desc}</p>
              </div>

              <div className={`mt-4 pt-3 border-t border-[#EFE7DC] flex items-center justify-between text-[10px] font-bold uppercase tracking-wider ${step.phaseText}`}>
                <span>Phase {step.num}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${step.phaseDot}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export default ProcessFlowStep;
