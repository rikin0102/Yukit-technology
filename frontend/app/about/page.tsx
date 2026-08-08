'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Cpu, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';

const techStack = [
  { name: 'Next.js 16', cat: 'Frontend', icon: '⚡' },
  { name: 'React 19', cat: 'UI Library', icon: '⚛️' },
  { name: 'TypeScript', cat: 'Language', icon: '🔷' },
  { name: 'Python AI', cat: 'Machine Learning', icon: '🐍' },
  { name: 'PyTorch / LLMs', cat: 'AI Engines', icon: '🔥' },
  { name: 'Node.js', cat: 'Backend', icon: '🟢' },
  { name: 'PostgreSQL', cat: 'Database', icon: '🐘' },
  { name: 'Docker / K8s', cat: 'DevOps', icon: '🐳' },
  { name: 'AWS Cloud', cat: 'Infrastructure', icon: '☁️' },
  { name: 'TailwindCSS v4', cat: 'Styling', icon: '🎨' },
  { name: 'Three.js / R3F', cat: '3D Graphics', icon: '📐' },
  { name: 'Framer Motion', cat: 'Animations', icon: '✨' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A4A4A] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[#FF7A00]/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl space-y-20 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-widest text-[#FF7A00]"
          >
            Who We Are
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#1A1A1A] tracking-tight"
          >
            Engineering <span className="text-saffron-gradient">Digital Intelligence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#4A4A4A] leading-relaxed"
          >
            Yukti Technology is a premium software, AI, and startup solutions provider committed to delivering world-class engineering and exceptional digital experiences.
          </motion.p>
        </div>

        {/* About Us Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Our Story & Core Conviction
            </h2>

            <p className="text-sm leading-relaxed text-[#4A4A4A]">
              Founded with the vision to bridge complex enterprise software engineering with seamless user interface design, <strong className="text-[#1A1A1A]">Yukti Technology</strong> has evolved into a trusted innovation partner for global enterprises and ambitious startups alike. "Yukti" signifies tactical innovation and intelligent problem solving—the core philosophy embedded in every line of code we craft.
            </p>

            <p className="text-sm leading-relaxed text-[#4A4A4A]">
              We believe that modern software must be fast, resilient, and beautifully designed. Whether building custom AI workflows, high-throughput cloud infrastructure, or intuitive web and mobile applications, our multi-disciplinary engineering teams focus on shipping products that drive real revenue and user delight.
            </p>

            <p className="text-sm leading-relaxed text-[#4A4A4A]">
              With headquarters operating at the intersection of technological advancement and human-centered design, we continue to push the boundaries of Web3, Generative AI, and ultra-responsive micro-frontend design.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EFE7DC]">
              <div>
                <h4 className="text-2xl font-black text-[#FF7A00]">99.8%</h4>
                <p className="text-xs text-[#71717A] font-semibold">On-Time Sprint Delivery</p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-[#FF7A00]">50+</h4>
                <p className="text-xs text-[#71717A] font-semibold">Shipped Products</p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-[#FF7A00]">100%</h4>
                <p className="text-xs text-[#71717A] font-semibold">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative perspective-1000"
          >
            <div className="rounded-3xl bg-white p-8 shadow-xl border border-[#EFE7DC] space-y-6 glass-card-hover transform-style-3d">
              <div className="flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#1A1A1A]">Startup & Enterprise Acceleration</h3>
                  <p className="text-xs text-[#71717A]">From zero to production launch</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'Bespoke AI model fine-tuning & RAG architectures',
                  'High-availability cloud microservices (Kubernetes/Serverless)',
                  'Sub-second rendering Next.js & React web applications',
                  'Cross-platform iOS and Android mobile engineering',
                  'Rigorous security compliance and automated test coverage',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-[#4A4A4A]">
                    <Zap className="h-4 w-4 text-[#FF7A00] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continuous Infinite Scroll Strip of Tech Stack with 3D Tilt */}
        <div className="space-y-6 py-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
              Stack & Tools
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Technologies We Use
            </h2>
          </div>

          <div className="relative overflow-hidden w-full py-4 border-y border-[#EFE7DC] bg-white/70">
            <div className="animate-marquee-strip flex space-x-6">
              {[...techStack, ...techStack].map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 rounded-xl bg-white px-5 py-3 border border-[#EFE7DC] shadow-sm transition-all hover:border-[#FF7A00] hover:shadow-md hover:-translate-y-1 transform-style-3d cursor-pointer shrink-0"
                >
                  <span className="text-xl">{tech.icon}</span>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#1A1A1A]">{tech.name}</h4>
                    <span className="text-[10px] text-[#71717A] font-semibold">{tech.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Culture & Experience Blurb */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-lg border border-[#EFE7DC]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1A1A1A]">Culture of Excellence</h3>
              <p className="text-xs leading-relaxed text-[#4A4A4A]">
                Our engineers are passionate problem solvers who foster transparent communication, continuous peer reviews, and extreme pride in software craft.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1A1A1A]">Uncompromising Security</h3>
              <p className="text-xs leading-relaxed text-[#4A4A4A]">
                Data protection, encryption at rest/in transit, and SOC2 compliant architecture design are baked into every phase of development.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#1A1A1A]">Scalable Foundation</h3>
              <p className="text-xs leading-relaxed text-[#4A4A4A]">
                We build system foundations designed to support 100x user growth without requiring costly structural overhauls down the line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
