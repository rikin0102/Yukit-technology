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
} from 'lucide-react';

import ParticleMeshBackground from '@/components/animations/ParticleMeshBackground';
import InteractiveGridBoxes from '@/components/animations/InteractiveGridBoxes';
import Card3DTilt from '@/components/animations/Card3DTilt';
import TestimonialsCarousel from '@/components/animations/TestimonialsCarousel';
import ProcessFlowStep from '@/components/animations/ProcessFlowStep';
import BookDemoModal from '@/components/modals/BookDemoModal';

export default function HomePage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A4A4A] overflow-hidden">
      {/* Interactive Grid Boxes Background (Highlights on Mouse Move) */}
      <InteractiveGridBoxes gridSize={55} highlightRadius={240} className="opacity-90" />

      {/* ------------------- SECTION 1: HERO ------------------- */}
      <section className="relative min-h-[88vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        <ParticleMeshBackground />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-10 h-80 w-80 rounded-full bg-[#FF7A00]/15 blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-[#FF9933]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-7">
          {/* Main Heading matching Vibrant Saffron Theme */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[1.08] text-[#1A1A1A] max-w-5xl mx-auto"
          >
            Building{' '}
            <span className="text-[#FF7A00] drop-shadow-[0_4px_24px_rgba(255,122,0,0.35)]">
              Digital Experiences
            </span>{' '}
            That Move{' '}
            <span className="text-[#FF7A00] drop-shadow-[0_4px_24px_rgba(255,122,0,0.35)]">
              Businesses Forward.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#5A5A5A] pt-2"
          >
            We design and develop modern software, websites, applications and AI-powered solutions that turn ideas into scalable digital products.
          </motion.p>

          {/* Premium Animated Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6"
          >
            {/* Button 1: Start a Project (Matching Vibrant Saffron Gradient) */}
            <motion.button
              onClick={() => setIsDemoModalOpen(true)}
              whileHover={{ scale: 1.06, y: -2, boxShadow: '0 14px 35px -6px rgba(255, 122, 0, 0.55)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="relative group overflow-hidden px-9 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#FF7A00] via-[#FF8800] to-[#FF9933] shadow-lg shadow-[#FF7A00]/35 flex items-center justify-center space-x-2.5 w-full sm:w-auto cursor-pointer"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              <Sparkles className="h-4 w-4 relative z-10 animate-pulse text-amber-200" />
              <span className="relative z-10 tracking-wide font-semibold text-base">Start a Project</span>
            </motion.button>

            {/* Button 2: Explore Our Work */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/projects"
                className="relative group px-9 py-4 rounded-full text-sm font-bold text-[#1A1A1A] bg-white/90 backdrop-blur-md border border-[#E5DEC9] shadow-sm hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all duration-300 flex items-center justify-center space-x-2.5 text-center w-full text-base font-semibold"
              >
                <span className="tracking-wide">Explore Our Work</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* ------------------- SECTION 3: WHY CHOOSE US ------------------- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Our Competitive Edge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
              Why Choose Yukti Technology
            </h2>
            <p className="text-sm text-[#4A4A4A]">
              We blend rigorous engineering disciplines with agile startup speed to deliver tangible business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
            {[
              {
                title: 'Expert Team',
                desc: 'Senior full-stack architects, ML researchers, and product designers with deep domain expertise.',
                icon: Users,
              },
              {
                title: 'Timely Delivery',
                desc: 'Predictable milestone execution using continuous delivery pipelines and transparent telemetry.',
                icon: Clock,
              },
              {
                title: 'Modern Tech Stack',
                desc: 'Leveraging Next.js 16, Python AI engines, Rust microservices, and multi-cloud infrastructure.',
                icon: Layers,
              },
              {
                title: 'Client-Centric Approach',
                desc: 'Dedicated technical lead, 24/7 direct slack channel, and collaborative co-creation models.',
                icon: HeartHandshake,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40, rotateX: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
                  whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                  className="rounded-2xl bg-white p-8 shadow-md border border-[#EFE7DC] glass-card-hover"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF7A00]/10 text-[#FF7A00]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#1A1A1A] mb-2">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-[#4A4A4A]">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------- SECTION 4: OUR PHILOSOPHY ------------------- */}
      <section className="relative py-20 bg-white/70 border-y border-[#EFE7DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
              Our Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                title: 'Our Mission',
                desc: 'To demystify software complexity and equip organizations with resilient, AI-powered digital assets that inspire growth.',
                icon: Target,
              },
              {
                title: 'Our Vision',
                desc: 'To become the global benchmark for high-craft technology consulting, where engineering speed meets pixel-perfect design.',
                icon: Eye,
              },
              {
                title: 'Our Values',
                desc: 'Uncompromising integrity, relentless curiosity, technical mastery, and absolute accountability to every client partner.',
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
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="relative flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm border border-[#EFE7DC]"
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#1A1A1A]">{col.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#4A4A4A]">{col.desc}</p>
                  </div>

                  <div className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9933]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------- SECTION 5: OUR PROCESS ------------------- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
              Our 5-Step Execution Process
            </h2>
            <p className="text-sm text-[#4A4A4A]">
              A proven blueprint from discovery to continuous production deployment.
            </p>
          </div>

          <ProcessFlowStep />
        </div>
      </section>

      {/* ------------------- SECTION 6: TESTIMONIALS ------------------- */}
      <section className="relative py-20 bg-white/60 border-y border-[#EFE7DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Client Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
              Trusted by Industry Leaders
            </h2>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* ------------------- SECTION 7: GET IN TOUCH CTA ------------------- */}
      <section className="relative py-24 z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Card3DTilt>
            <div className="w-full rounded-3xl bg-[#141417] p-10 sm:p-16 shadow-2xl relative overflow-hidden border border-white/15 text-white transform-style-3d">
              {/* Ambient Lighting Background */}
              <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#FF7A00]/30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#FF9933]/20 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

              {/* 3D Floating Elements */}
              <div style={{ transform: 'translateZ(35px)' }}>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 tracking-tight leading-tight"
                  style={{ color: '#FFFFFF' }}
                >
                  <span style={{ color: '#FFFFFF' }}>Ready to Build Your Next </span>
                  <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFA033] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,122,0,0.5)]">
                    Digital Breakthrough?
                  </span>
                </h2>
              </div>

              <div style={{ transform: 'translateZ(25px)' }}>
                <p
                  className="mx-auto max-w-2xl text-base sm:text-lg mb-9 leading-relaxed font-medium"
                  style={{ color: '#E2E8F0' }}
                >
                  Schedule a strategy call with our senior tech architects to discuss your engineering needs, timeframe, and budget.
                </p>
              </div>

              <div style={{ transform: 'translateZ(50px)' }} className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2.5 px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#FF7A00] via-[#FF8800] to-[#FF9933] shadow-xl shadow-[#FF7A00]/45 hover:shadow-[#FF7A00]/70 transition-all duration-300 cursor-pointer"
                  >
                    <span className="tracking-widest">GET IN TOUCH NOW</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </Card3DTilt>
        </div>
      </section>

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
