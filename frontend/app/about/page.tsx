'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Search,
  Compass,
  Code2,
  RefreshCw,
  Cpu,
  BrainCircuit,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import Card3DTilt from '@/components/animations/Card3DTilt';

// Core Metric Count-Up Component (Mid-Sized Cards)
function AnimatedMetric({
  value,
  label,
  subtitle,
  desc,
  accentColor,
  accentBg,
}: {
  value: string;
  label: string;
  subtitle: string;
  desc: string;
  accentColor: string;
  accentBg: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(value === '24/7' ? '0/0' : '0');

  useEffect(() => {
    if (!isInView) return;

    if (value === '5+') {
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        if (current >= 5) {
          setDisplayValue('5+');
          clearInterval(timer);
        } else {
          setDisplayValue(`${current}+`);
        }
      }, 150);
      return () => clearInterval(timer);
    } else if (value === '8+') {
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        if (current >= 8) {
          setDisplayValue('8+');
          clearInterval(timer);
        } else {
          setDisplayValue(`${current}+`);
        }
      }, 100);
      return () => clearInterval(timer);
    } else if (value === '24/7') {
      setDisplayValue('24/7');
    }
  }, [isInView, value]);

  let glareColor = 'rgba(255, 122, 0, 0.4)'; // Default orange
  if (value === '8+') {
    glareColor = 'rgba(37, 99, 235, 0.4)'; // Blue
  } else if (value === '24/7') {
    glareColor = 'rgba(13, 148, 136, 0.4)'; // Green/Teal
  }

  return (
    <Card3DTilt glareColor={glareColor}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full rounded-2xl bg-white p-6 sm:p-7 shadow-lg border border-slate-200/90 flex flex-col justify-between space-y-4 glass-card-hover group relative overflow-hidden transform-style-3d"
      >
        {/* Subtle Ambient Glow */}
        <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full ${accentBg} opacity-15 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100/80 px-2.5 py-0.5 rounded-md border border-slate-200">
              {label}
            </span>
            <div className={`h-2 w-2 rounded-full ${accentBg}`} />
          </div>

          <div className="flex items-baseline space-x-1 mb-2">
            <span className={`text-4xl sm:text-5xl font-black tracking-tight ${accentColor}`}>
              {displayValue}
            </span>
          </div>

          <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] mb-2">
            {subtitle}
          </h3>

          <p className="text-xs text-[#334155] leading-relaxed font-normal">
            {desc}
          </p>
        </div>

        <div className={`pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold ${accentColor}`}>
          <span>Verified Standard</span>
          <CheckCircle2 className="h-3.5 w-3.5" />
        </div>
      </motion.div>
    </Card3DTilt>
  );
}

// 4 How We Think Cards Data
const thinkingCards = [
  {
    num: '01',
    title: 'Understand First',
    desc: 'We start by understanding the problem, users, and business objective before writing code.',
    icon: Search,
    accentColor: 'text-[#FF7A00]',
    badgeBg: 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/25',
    pillBg: 'bg-[#FF7A00]',
  },
  {
    num: '02',
    title: 'Design With Purpose',
    desc: 'Every interface and interaction should make the product easier to understand and use.',
    icon: Compass,
    accentColor: 'text-[#0F172A]',
    badgeBg: 'bg-[#0F172A]/10 text-[#0F172A] border-[#0F172A]/25',
    pillBg: 'bg-[#0F172A]',
  },
  {
    num: '03',
    title: 'Engineer For Scale',
    desc: 'We build clean, maintainable systems that can evolve as your business grows.',
    icon: Code2,
    accentColor: 'text-[#2563EB]',
    badgeBg: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/25',
    pillBg: 'bg-[#2563EB]',
  },
  {
    num: '04',
    title: 'Improve Continuously',
    desc: 'We test, measure, learn, and improve instead of treating development as a one-time process.',
    icon: RefreshCw,
    accentColor: 'text-[#0D9488]',
    badgeBg: 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/25',
    pillBg: 'bg-[#0D9488]',
  },
];

// Why Yukti? 4 Points Updated Data
const whyYuktiPoints = [
  {
    num: '01',
    title: 'Your Idea, Our Engineering',
    desc: 'We turn your ideas into practical digital products through thoughtful design and reliable engineering.',
    icon: Code2,
    accentColor: 'text-[#FF7A00]',
    badgeBg: 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/25',
    iconBg: 'bg-[#FF7A00]',
  },
  {
    num: '02',
    title: 'AI Where It Makes Sense',
    desc: 'We use AI to solve meaningful problems and improve products—not simply to follow a trend.',
    icon: BrainCircuit,
    accentColor: 'text-[#2563EB]',
    badgeBg: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/25',
    iconBg: 'bg-[#2563EB]',
  },
  {
    num: '03',
    title: 'Direct & Transparent',
    desc: 'Work directly with the developer building your product, with clear communication from idea to deployment.',
    icon: Users,
    accentColor: 'text-[#0F172A]',
    badgeBg: 'bg-[#0F172A]/10 text-[#0F172A] border-[#0F172A]/25',
    iconBg: 'bg-[#0F172A]',
  },
  {
    num: '04',
    title: 'Built for the Long Term',
    desc: 'Clean architecture, maintainable code, and scalable foundations help your product evolve as your business grows.',
    icon: TrendingUp,
    accentColor: 'text-[#0D9488]',
    badgeBg: 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/25',
    iconBg: 'bg-[#0D9488]',
  },
];

// Default technology logo image paths
const DEFAULT_TECH_LOGOS = [
  '/images/tech/typescript.png',
  '/images/tech/html5.png',
  '/images/tech/css3.png',
  '/images/tech/python.png',
  '/images/tech/Figma-Logo.png',
  '/images/tech/Kotlin-Foundation-Logo-Vector-730x730.jpg',
  '/images/tech/ai.avif',
  '/images/tech/aws.png',
  '/images/tech/canva.png',
  '/images/tech/devops.avif',
  '/images/tech/django.png',
  '/images/tech/fastapi.png',
  '/images/tech/gemini.png',
  '/images/tech/git.webp',
  '/images/tech/github.png',
  '/images/tech/grok.png',
  '/images/tech/hugging face.webp',
  '/images/tech/js.webp',
  '/images/tech/langchain.jpeg',
  '/images/tech/linux.png',
  '/images/tech/llm.webp',
  '/images/tech/mern.jpg',
  '/images/tech/ml.png',
  '/images/tech/mysql.png',
  '/images/tech/nextjs.jpeg',
  '/images/tech/openai.png',
  '/images/tech/postgrasql.png',
  '/images/tech/rag.webp',
  '/images/tech/react js.png',
  '/images/tech/redis.png',
  '/images/tech/restapi.jpg',
  '/images/tech/tailwind.webp',
  '/images/tech/ui-ux-designer-icon-design-free-vector.jpg',
  '/images/tech/windows.png',
];

export default function AboutPage() {
  // Use the full set of 34 logos for marqueeItems loop
  const marqueeItems = [...DEFAULT_TECH_LOGOS, ...DEFAULT_TECH_LOGOS];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen text-[#334155] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">

        {/* ------------------- 1. HERO / WHO WE ARE SECTION ------------------- */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4 relative">
          {/* Ambient Glow behind Heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-96 bg-gradient-to-r from-[#FF7A00]/15 via-[#0D9488]/10 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Eyebrow - Enhanced Comfort & Attractiveness */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-[#FF7A00] bg-gradient-to-r from-[#FF7A00]/15 via-[#FF7A00]/8 to-[#FF7A00]/15 border border-[#FF7A00]/30 shadow-lg shadow-[#FF7A00]/10 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#FF7A00] animate-pulse" />
            <span>WHO WE ARE</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.12]"
          >
            <span>Engineering Ideas Into </span>
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FFA04D] to-[#FF7A00] bg-clip-text text-transparent inline-block">
              Digital Intelligence
            </span>
          </motion.h1>

          {/* Introduction Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#334155] pt-1"
          >
            Yukti Technologies is a software and AI engineering company building modern digital products for businesses, startups, and ambitious ideas. We combine thoughtful design, reliable engineering, and practical AI to transform complex problems into simple, scalable digital solutions.
          </motion.p>
        </section>


        {/* ------------------- 2. STORY SECTION ------------------- */}
        <section className="relative">
          <Card3DTilt>
            <div className="w-full rounded-3xl bg-white p-8 sm:p-14 shadow-2xl border border-slate-200/90 relative overflow-hidden glass-card transform-style-3d">
              {/* Subtle Decorative Ambient Orb */}
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#FF7A00]/10 via-[#0D9488]/10 to-transparent blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Heading Left */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#0D9488]">
                    Our Origin & Focus
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight">
                    Built With Purpose.<br />
                    <span className="text-[#FF7A00]">Driven By Innovation.</span>
                  </h2>
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#0D9488]" />
                </div>

                {/* Paragraphs Right */}
                <div className="lg:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed text-[#334155] font-normal">
                  <p>
                    Yukti Technologies was created with a simple belief: technology should solve real problems, not create unnecessary complexity. We build websites, applications, custom software, and AI-powered solutions that help businesses turn ideas into working digital products.
                  </p>
                  <p>
                    Our approach combines engineering, design, and artificial intelligence. From a business website to a complete software platform or an AI-powered workflow, we focus on building solutions that are practical, scalable, secure, and designed around the people who use them.
                  </p>
                </div>
              </div>
            </div>
          </Card3DTilt>
        </section>


        {/* ------------------- 3. CORE METRICS SECTION (MID-SIZED) ------------------- */}
        <section className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Core Scale Metrics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedMetric
              value="5+"
              label="METRIC 01"
              subtitle="CORE TECHNOLOGIES"
              desc="Modern technologies across AI, software engineering, web development, databases, and cloud infrastructure."
              accentColor="text-[#FF7A00]"
              accentBg="bg-[#FF7A00]"
            />

            <AnimatedMetric
              value="8+"
              label="METRIC 02"
              subtitle="SOLUTION CATEGORIES"
              desc="From websites and web applications to AI, mobile, automation, APIs, and custom software solutions."
              accentColor="text-[#2563EB]"
              accentBg="bg-[#2563EB]"
            />

            <AnimatedMetric
              value="24/7"
              label="METRIC 03"
              subtitle="DIGITAL AVAILABILITY"
              desc="Digital-first solutions designed to keep your business accessible, connected, and ready to scale."
              accentColor="text-[#0D9488]"
              accentBg="bg-[#0D9488]"
            />
          </div>
        </section>


        {/* ------------------- 4. HOW WE THINK SECTION (4 ANIMATED CARDS) ------------------- */}
        <section className="space-y-10">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              How We Think
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Core principles guiding how we build software, design experiences, and solve complex technical challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {thinkingCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Card3DTilt key={card.num}>
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-2xl bg-white p-7 shadow-lg border border-slate-200/90 flex flex-col justify-between space-y-6 glass-card-hover group relative overflow-hidden transform-style-3d"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-3xl font-black ${card.accentColor}`}>
                          {card.num}
                        </span>
                        <div className={`p-2 rounded-xl bg-slate-100 group-hover:scale-110 transition-transform ${card.accentColor}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#FF7A00] transition-colors">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

                    <div className={`h-1 w-full rounded-full ${card.pillBg}`} />
                  </motion.div>
                </Card3DTilt>
              );
            })}
          </div>
        </section>


        {/* ------------------- 5. TECHNOLOGY SHOWCASE ------------------- */}
        <section className="space-y-8 pt-2">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Technology Behind Our Solutions
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Continuous right-to-left technology pipeline (Hover to pause)
            </p>
          </div>

          {/* Single-Line Right-to-Left Moving Marquee */}
          <div className="relative overflow-hidden w-full py-10 bg-slate-50/50 rounded-3xl">
            {/* Fade Edges Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-20 pointer-events-none" />

            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 90,
                ease: 'linear',
              }}
              className="flex flex-nowrap items-center space-x-24 w-max hover:[animation-play-state:paused]"
            >
              {marqueeItems.map((src, idx) => (
                <div key={idx} className="flex items-center justify-center select-none shrink-0 px-4">
                  <img
                    src={src}
                    alt="technology logo"
                    className="h-12 sm:h-16 w-auto object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* ------------------- 6. WHY YUKTI? SECTION (UPDATED) ------------------- */}
        <section className="space-y-10">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#0D9488]">
              WHY YUKTI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Technology With Purpose. <span className="text-[#FF7A00]">Built Around You.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl mx-auto font-normal">
              We believe great technology isn't about adding more features—it's about solving the right problems with the right approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyYuktiPoints.map((point) => {
              const Icon = point.icon;
              return (
                <Card3DTilt key={point.num}>
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-2xl bg-white p-7 shadow-lg border border-slate-200/90 flex flex-col justify-between space-y-6 glass-card-hover group relative overflow-hidden transform-style-3d"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${point.iconBg} text-white shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${point.badgeBg}`}>
                          0{point.num}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#FF7A00] transition-colors">
                        {point.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-normal">
                        {point.desc}
                      </p>
                    </div>

                    <div className={`h-1 w-full rounded-full ${point.iconBg}`} />
                  </motion.div>
                </Card3DTilt>
              );
            })}
          </div>
        </section>

      </div>

      {/* ------------------- 7. STRONG FINAL CTA SECTION (Full-Width) ------------------- */}
      <section className="relative w-full bg-[#0F172A] py-16 sm:py-20 md:py-24 overflow-hidden border-y border-slate-800 text-white z-10 mt-16 mb-16 md:mb-24">
        {/* Overlapping Saffron Symmetrical/Abstract Circle shape on the right edge - Optimized for Mobile responsiveness */}
        <div className="absolute right-[-25%] sm:right-[-15%] lg:right-[-10%] top-[-10%] sm:top-[-20%] lg:top-1/2 lg:-translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px] bg-[#FF7A00] rounded-full opacity-[0.9] pointer-events-none z-0" />
        
        {/* Harmonious Ambient Glows */}
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#0D9488]/15 blur-3xl pointer-events-none z-0" />
        <div className="absolute inset-0 bg-radial from-slate-800/10 to-transparent pointer-events-none z-0" />

        {/* Content Container aligned with site grid */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
            {/* Left Side: Serif Heading & Subtle curved vector line */}
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
    </motion.div>
  );
}
