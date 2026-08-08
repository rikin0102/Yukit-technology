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
  },
  {
    num: '02',
    title: 'Planning & Design',
    desc: 'Interactive wireframing, high-fidelity UI/UX design, database schema, and microservice planning.',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Agile sprints with production-grade code, modular components, clean API design, and AI model training.',
    icon: Code2,
  },
  {
    num: '04',
    title: 'Testing & QA',
    desc: 'Automated unit, integration, and load testing, end-to-end security audit, and edge-case verification.',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'Deploy & Support',
    desc: 'Zero-downtime CI/CD deployment, cloud scaling, telemetry monitoring, and ongoing post-launch maintenance.',
    icon: Rocket,
  },
];

export const ProcessFlowStep: React.FC = () => {
  return (
    <div className="relative py-10">
      {/* Desktop Connecting Line (Animated Drawing) */}
      <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-[#EFE7DC] -translate-y-6 z-0">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9933] origin-left shadow-sm shadow-[#FF7A00]/40"
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
              className="rounded-2xl bg-white p-6 shadow-lg border border-[#EFE7DC] flex flex-col justify-between glass-card-hover perspective-1000"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#FF7A00]/40">{step.num}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-[#1A1A1A] mb-2">{step.title}</h3>
                <p className="text-xs leading-relaxed text-[#4A4A4A]">{step.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EFE7DC] flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]">
                <span>Phase {step.num}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export default ProcessFlowStep;
