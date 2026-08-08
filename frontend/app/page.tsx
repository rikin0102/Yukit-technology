'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code,
  Globe,
  Smartphone,
  Palette,
  BrainCircuit,
  Users,
  Clock,
  Layers,
  HeartHandshake,
  Target,
  Eye,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Award,
  Terminal,
  Cpu,
} from 'lucide-react';

import InteractiveGridBoxes from '@/components/animations/InteractiveGridBoxes';
import Card3DTilt from '@/components/animations/Card3DTilt';
import TestimonialsCarousel from '@/components/animations/TestimonialsCarousel';
import ProcessFlowStep from '@/components/animations/ProcessFlowStep';
import BookDemoModal from '@/components/modals/BookDemoModal';

export default function HomePage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#2C2C2E] overflow-hidden">
      {/* Elegant Interactive Grid Background */}
      <InteractiveGridBoxes gridSize={60} highlightRadius={220} className="opacity-70" />

      {/* ------------------- SECTION 1: HERO (Classic Human Engineering Firm) ------------------- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Soft Ambient Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[36rem] rounded-full bg-[#FF7A00]/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-7">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-[#111113] max-w-5xl mx-auto"
          >
            Engineering{' '}
            <span className="text-[#FF7A00] drop-shadow-[0_4px_20px_rgba(255,122,0,0.25)]">
              Digital Experiences
            </span>{' '}
            That Move{' '}
            <span className="text-[#FF7A00] drop-shadow-[0_4px_20px_rgba(255,122,0,0.25)]">
              Businesses Forward.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-[#555558] pt-1"
          >
            Yukti Technology designs, builds, and scales custom web applications, enterprise software, and machine learning models for high-growth companies.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.button
              onClick={() => setIsDemoModalOpen(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-saffron px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg cursor-pointer w-full sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              <span>Start a Project</span>
            </motion.button>

            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/projects"
                className="px-8 py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-[#111113] bg-white border border-[#EBE4D8] shadow-xs hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all flex items-center justify-center space-x-2 w-full text-center"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Real Credibility Proof Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#EBE4D8]/80 text-center"
          >
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#111113]">100%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#77777A] mt-0.5">Code Ownership</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#FF7A00]">99.9%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#77777A] mt-0.5">Architecture Uptime</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#111113]">Full-Stack</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#77777A] mt-0.5">Python & Next.js</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-[#FF7A00]">Ahmedabad</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#77777A] mt-0.5">Engineering Hub</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------- SECTION 2: WHY CHOOSE US (Engineering Principles) ------------------- */}
      <section className="relative py-20 bg-white border-y border-[#EBE4D8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Our Engineering Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111113]">
              Why Work With Yukti Technology
            </h2>
            <p className="text-sm text-[#666668]">
              We operate as a dedicated engineering partner, focusing on clean architecture, high performance, and rapid delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Senior Engineering Team',
                desc: 'Work directly with experienced full-stack architects and ML developers based in Ahmedabad.',
                icon: Users,
              },
              {
                title: 'Predictable Delivery',
                desc: 'Milestone-driven execution with continuous delivery pipelines and daily telemetry updates.',
                icon: Clock,
              },
              {
                title: 'Modern Architecture',
                desc: 'Built using Django, Python ML, Next.js, PostgreSQL, Redis, and automated DevOps pipelines.',
                icon: Layers,
              },
              {
                title: 'Transparent Collaboration',
                desc: 'Direct Slack channel communication, daily standups, and 100% intellectual property ownership.',
                icon: HeartHandshake,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl bg-[#FAF8F5] p-7 border border-[#EBE4D8] hover:border-[#FF7A00]/40 transition-colors shadow-xs group"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[#EBE4D8] text-[#FF7A00] group-hover:bg-[#FF7A00] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#111113] mb-2">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-[#555558]">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------- SECTION 3: GUIDING PHILOSOPHY ------------------- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Our Operating Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111113]">
              Built On Technical Craftsmanship
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Our Mission',
                desc: 'To simplify software engineering for growing businesses, delivering resilient full-stack applications and AI systems that produce tangible business outcomes.',
                icon: Target,
              },
              {
                title: 'Our Craft',
                desc: 'We combine rigorous backend engineering, modern React frontend architecture, and elegant user interfaces to build products that users love.',
                icon: Eye,
              },
              {
                title: 'Our Commitment',
                desc: 'Clear communication, robust security standards, clean well-documented codebases, and long-term technical support for every product we ship.',
                icon: ShieldCheck,
              },
            ].map((col, idx) => {
              const Icon = col.icon;
              return (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="rounded-2xl bg-white p-8 border border-[#EBE4D8] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#111113]">{col.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#555558]">{col.desc}</p>
                  </div>
                  <div className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9933] opacity-60" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------- SECTION 4: OUR EXECUTION PROCESS ------------------- */}
      <section className="relative py-20 bg-white border-y border-[#EBE4D8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Development Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111113]">
              Our Execution Framework
            </h2>
            <p className="text-sm text-[#666668]">
              A structured 4-step engineering blueprint from initial specification to production release.
            </p>
          </div>

          <ProcessFlowStep />
        </div>
      </section>

      {/* ------------------- SECTION 5: CLIENT TESTIMONIALS ------------------- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111113]">
              Trusted By Growing Companies
            </h2>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* ------------------- SECTION 6: GET IN TOUCH CTA ------------------- */}
      <section className="relative py-20 z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-full rounded-3xl bg-[#141417] p-10 sm:p-14 shadow-2xl relative overflow-hidden border border-white/15 text-white">
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#FF7A00]/25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#FF9933]/15 blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight" style={{ color: '#FFFFFF' }}>
              Have a Project in Mind?
            </h2>

            <p className="mx-auto max-w-xl text-sm sm:text-base mb-8 leading-relaxed font-medium" style={{ color: '#E2E8F0' }}>
              Speak directly with our senior software architects in Ahmedabad to discuss your technical requirements, timeline, and scope.
            </p>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2.5 px-9 py-4 rounded-full text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#FF7A00] via-[#FF8800] to-[#FF9933] shadow-lg shadow-[#FF7A00]/40 cursor-pointer"
              >
                <span>CONTACT US TODAY</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
