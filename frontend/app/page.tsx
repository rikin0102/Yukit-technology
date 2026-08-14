'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  BrainCircuit,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Globe2,
  Users,
  Clock,
  HeartHandshake,
  Target,
  Eye,
  CheckCircle2,
} from 'lucide-react';

import Card3DTilt from '@/components/animations/Card3DTilt';
import TestimonialsCarousel from '@/components/animations/TestimonialsCarousel';
import ProcessFlowStep from '@/components/animations/ProcessFlowStep';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.45]);

  return (
    <div ref={containerRef} className="relative min-h-screen text-[#334155]">

      {/* ------------------- SECTION 1: HERO ------------------- */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16 pb-12 overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-5xl text-center space-y-7"
        >
          {/* Main Heading styled with Indian Flag (Tricolor) Order */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[1.08] text-[#0F172A] max-w-5xl mx-auto flex flex-wrap justify-center gap-x-3.5 sm:gap-x-5 gap-y-1 py-1">
            {[
              { text: 'Building', colorClass: 'text-[#FF7A00]', delay: 0.1 },     // Saffron (Top Band)
              { text: 'Digital', colorClass: 'text-[#FF7A00]', delay: 0.22 },    // Saffron (Top Band)
              { text: 'Experiences', colorClass: 'text-[#0F172A]', delay: 0.35 },// Navy (Middle Band)
              { text: 'That', colorClass: 'text-[#0F172A]', delay: 0.48 },       // Navy (Middle Band)
              { text: 'Move', colorClass: 'text-[#0F172A]', delay: 0.6 },        // Navy (Middle Band)
              { text: 'Businesses', colorClass: 'text-[#0D9488]', delay: 0.73 },  // Green (Bottom Band)
              { text: 'Forward.', colorClass: 'text-[#0D9488]', delay: 0.86 },   // Green (Bottom Band)
            ].map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden py-1">
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: word.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block ${word.colorClass}`}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#334155] pt-2"
          >
            We design and develop modern software, websites, applications and AI-powered solutions that turn ideas into scalable digital products.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
          >
            {/* Button 1: Get in Touch (Saffron Orange) */}
            <Link href="/contact" className="w-full sm:w-auto no-underline">
              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="relative group overflow-hidden px-9 py-4 rounded-full text-sm font-bold text-white bg-[#FF7A00] hover:bg-[#E06C00] shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2.5 w-full sm:w-auto cursor-pointer"
              >
                <Sparkles className="h-4 w-4 relative z-10" />
                <span className="relative z-10 tracking-wide font-semibold text-base font-semibold">Get in Touch</span>
              </motion.div>
            </Link>

            {/* Button 2: Explore Our Work */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/projects"
                className="relative group px-9 py-4 rounded-full text-sm font-bold text-[#0F172A] bg-white backdrop-blur-md border border-slate-200 shadow-xs hover:border-[#0D9488] hover:text-[#0D9488] transition-all duration-300 flex items-center justify-center space-x-2.5 text-center w-full text-base font-semibold"
              >
                <span className="tracking-wide">Explore Our Work</span>
                <ArrowRight className="h-4 w-4 text-[#0D9488] transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------- SECTION 2: WHY CHOOSE US ------------------- */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight"
            >
              Why Visionary Leaders Choose <span className="text-[#FF7A00]">Yukti Technology</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base text-[#334155]"
            >
              We blend rigorous engineering disciplines with agile startup speed to deliver tangible business value.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
            {[
              {
                title: 'Built Around Your Needs',
                desc: 'Every project starts with your requirements, goals, and users—not a one-size-fits-all template.',
                icon: Target,
                badge: '01 — Custom Approach',
                solidBg: 'bg-[#FF7A00]', // 1st: Orange
                accentHex: '#FF7A00',
              },
              {
                title: 'Software + AI',
                desc: 'From modern websites and applications to AI-powered solutions, we combine software engineering with practical AI.',
                icon: BrainCircuit,
                badge: '02 — Engineering',
                solidBg: 'bg-[#0F172A]', // 2nd: White / Slate Neutral Accent
                accentHex: '#475569',
              },
              {
                title: 'Direct & Transparent',
                desc: 'Clear communication, straightforward development, and direct involvement throughout your project.',
                icon: Users,
                badge: '03 — Collaboration',
                solidBg: 'bg-[#2563EB]', // 3rd: Blue
                accentHex: '#2563EB',
              },
              {
                title: 'Built to Grow',
                desc: 'Clean architecture and scalable foundations help your digital product evolve with your business.',
                icon: TrendingUp,
                badge: '04 — Scalability',
                solidBg: 'bg-[#0D9488]', // 4th: Green
                accentHex: '#0D9488',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card3DTilt key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                    className="h-full rounded-3xl bg-white p-7 shadow-lg border border-slate-200/80 flex flex-col justify-between space-y-6 transform-style-3d glass-card-hover group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.solidBg} text-white shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 stroke-[2]" />
                        </div>
                        <span
                          className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border"
                          style={{
                            color: item.accentHex,
                            backgroundColor: `${item.accentHex}12`,
                            borderColor: `${item.accentHex}30`,
                          }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-[#0F172A] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#334155]">
                        {item.desc}
                      </p>
                    </div>

                    <div
                      className="pt-2 border-t border-slate-100 flex items-center text-xs font-bold transition-colors"
                      style={{ color: item.accentHex }}
                    >
                      <span>Learn Technical Capability</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                </Card3DTilt>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------- SECTION 3: PHILOSOPHY ------------------- */}
      <section className="relative py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Our Philosophy & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                title: 'Our Mission',
                desc: 'To demystify software complexity and equip organizations with resilient, AI-powered digital assets that inspire growth.',
                icon: Target,
                solidBg: 'bg-[#FF7A00]', // Saffron / Orange (Indian Flag)
              },
              {
                title: 'Our Vision',
                desc: 'To become the global benchmark for high-craft technology consulting, where engineering speed meets pixel-perfect design.',
                icon: Eye,
                solidBg: 'bg-[#2563EB]', // Vibrant Blue
              },
              {
                title: 'Our Values',
                desc: 'Uncompromising integrity, relentless curiosity, technical mastery, and absolute accountability to every client partner.',
                icon: ShieldCheck,
                solidBg: 'bg-[#0D9488]', // India Green (Indian Flag)
              },
            ].map((col, idx) => {
              const Icon = col.icon;
              return (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xs border border-slate-200"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${col.solidBg} text-white shadow-md`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#0F172A]">{col.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#334155] font-normal">{col.desc}</p>
                  </div>

                  <div className={`mt-6 h-1 w-full rounded-full ${col.solidBg}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------- SECTION 4: 5-STEP EXECUTION PROCESS ------------------- */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#0D9488]">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Our 5-Step Execution Blueprint
            </h2>
            <p className="text-sm text-[#334155]">
              A proven blueprint from discovery to continuous production deployment.
            </p>
          </div>

          <ProcessFlowStep />
        </div>
      </section>

      {/* ------------------- SECTION 5: TESTIMONIALS ------------------- */}
      <section className="relative py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Testimonials
            </h2>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* ------------------- SECTION 6: GET IN TOUCH CTA ------------------- */}
      <section className="relative w-full bg-[#0F172A] py-16 sm:py-20 md:py-24 overflow-hidden border-y border-slate-800 text-white z-10 mb-16 md:mb-24">
        {/* Overlapping Saffron Symmetrical/Abstract Circle shape on the right edge - Optimized for Mobile responsiveness */}
        <div className="absolute right-[-25%] sm:right-[-15%] lg:right-[-10%] top-[-10%] sm:top-[-20%] lg:top-1/2 lg:-translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px] bg-[#FF7A00] rounded-full opacity-[0.9] pointer-events-none z-0" />
        
        {/* Harmonious Ambient Glows */}
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#0D9488]/15 blur-3xl pointer-events-none z-0" />
        <div className="absolute inset-0 bg-radial from-slate-800/10 to-transparent pointer-events-none z-0" />

        {/* Content Container aligned with site grid */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
            {/* Left Side: Serif Heading & Subtle curved line graphic */}
            <div className="lg:col-span-7 space-y-4 relative">
              {/* Subtle curved line graphic */}
              <div className="absolute left-[-20px] top-[-35px] w-48 h-48 opacity-15 pointer-events-none hidden sm:block">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full text-white">
                  <path d="M10,90 C30,30 50,70 95,20" />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-white leading-[1.2] relative z-10">
                Ready to Transform Your <span className="italic block mt-1 font-serif text-[#0D9488] sm:text-white">Business with AI?</span>
              </h2>
            </div>

            {/* Right Side: Serif Description & Flat Clean White Button */}
            <div className="lg:col-span-5 space-y-7 relative z-10 flex flex-col items-start">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
                Let's Define Your Requirements And Architect A Tailored AI Solution That Intelligently Optimizes And Scales Your Operations.
              </p>

              <Link href="/contact" className="no-underline">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 bg-white text-[#0F172A] font-black uppercase tracking-widest text-[11px] rounded-lg hover:bg-slate-100 transition-all shadow-lg shadow-black/15 cursor-pointer"
                >
                  Get in touch
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
