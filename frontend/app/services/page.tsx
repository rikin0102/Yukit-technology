'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Code2,
  Smartphone,
  BrainCircuit,
  Palette,
  Network,
  Building2,
  Server,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';

import Service3DCard from '@/components/animations/Service3DCard';
import GetQuoteModal from '@/components/modals/GetQuoteModal';

const categoryFilters = [
  { id: 'all', label: 'All Capabilities', count: 8 },
  { id: 'web', label: 'Web & SaaS', count: 3 },
  { id: 'mobile', label: 'Mobile Apps', count: 1 },
  { id: 'ai', label: 'AI & Intelligence', count: 1 },
  { id: 'design', label: 'UI/UX Systems', count: 1 },
  { id: 'cloud', label: 'Cloud & API', count: 2 },
];

const servicesList = [
  {
    id: '01',
    serviceNumber: '01',
    category: 'web',
    type: 'Website Dev',
    title: 'Custom Website Development',
    targetAudience: 'For: Businesses, startups, professionals & local brands.',
    icon: Globe,
    image: '/images/custom-dev.png',
    metricsBadge: '⚡ Sub-Second Load Speed',
    desc: 'Are you looking for bespoke, high-performance web development which is secure, scalable, and simple to adapt and deploy? You can count upon our talented engineering team with exceptional web experience to solve your complex business problems.',
    subDesc: 'On understanding and analyzing the objectives of your business strategy, we ensure on-time achievement of outcomes by following a rigorous quality process at all stages of our association, right from discovery to deployment and maintenance.',
    bullets: [
      'Custom web development',
      'Enterprise web application',
      'CRM Application',
      'Mobile Backend / API Development',
      'Content Management System',
      'ERP Software',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Django', 'PostgreSQL'],
    ctaLabel: 'Book Custom Website Service →',
  },
  {
    id: '02',
    serviceNumber: '02',
    category: 'web',
    type: 'Core Software',
    title: 'Website Application Development',
    targetAudience: 'Core Software Development Service for Scalable Digital Products',
    icon: Code2,
    image: '/images/web-dev.png',
    metricsBadge: '🚀 99.99% SaaS Uptime',
    desc: 'Architecting robust, enterprise-grade web applications, SaaS platforms, and internal management engines with secure role-based access, real-time telemetry, and high throughput.',
    subDesc: 'We align full-stack frontend reactive frameworks with battle-tested Python Django and FastAPI backends, delivering seamless API performance, relational database scaling, and zero-latency operational workflows.',
    bullets: [
      'Custom Web Applications & SaaS',
      'Admin Dashboards & Management Tools',
      'CRM & ERP Enterprise Systems',
      'Authentication & Role-Based RBAC',
      'Real-Time WebSockets & Telemetry',
      'Scalable Third-Party API Integrations',
    ],
    tags: ['Python', 'Django', 'FastAPI', 'Next.js', 'PostgreSQL', 'Redis'],
    ctaLabel: 'Book Web App Development →',
  },
  {
    id: '03',
    serviceNumber: '03',
    category: 'mobile',
    type: 'Mobile Apps',
    title: 'Mobile App Development',
    targetAudience: 'Cross-Platform Native Experience for B2B & B2C Apps',
    icon: Smartphone,
    image: '/images/app-dev.png',
    metricsBadge: '📱 iOS & Android Native',
    desc: 'Designing and building cross-platform native iOS and Android mobile applications powered by React Native and Flutter, with offline synchronization and push notifications.',
    subDesc: 'From consumer apps with smooth gesture animations to enterprise field-work telemetry tools, our mobile solutions are engineered for battery efficiency, low memory footprint, and instant App Store & Play Store compliance.',
    bullets: [
      'React Native & Flutter Cross-Platform',
      'Native iOS (Swift) & Android (Kotlin)',
      'Offline-First Data Sync & Storage',
      'Biometric Auth & Secure Hardware Vaults',
      'In-App Payments (Stripe, Razorpay, Apple Pay)',
      'Real-Time Location Tracking & Maps',
    ],
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'REST APIs', 'Firebase'],
    ctaLabel: 'Book Mobile App Service →',
  },
  {
    id: '04',
    serviceNumber: '04',
    isStar: true,
    category: 'ai',
    type: '⭐ AI Engine',
    title: 'AI Development & Integration',
    targetAudience: '⭐ Yukti Engineering Suite — AI Differentiator Service',
    icon: BrainCircuit,
    image: '/images/ai-dev.png',
    metricsBadge: '🧠 Real-Time LLM Pipeline',
    desc: 'Unlocking competitive advantage by embedding customized AI pipelines, Large Language Model (LLM) agents, automated document intelligence, and predictive machine learning models directly into your business software.',
    subDesc: 'We specialize in RAG (Retrieval-Augmented Generation), vector databases, intelligent speech-to-text workflows, and automated decision engines using PyTorch, OpenAI, and LangChain.',
    bullets: [
      'Custom LLM Fine-Tuning & Prompt Pipelines',
      'Retrieval-Augmented Generation (RAG)',
      'Vector Search (Pinecone, ChromaDB, pgvector)',
      'Intelligent Speech-to-Text & Voice Agents',
      'Predictive Analytics & Automated ML Models',
      'AI Chatbots & Conversational Workflows',
    ],
    tags: ['Python', 'PyTorch', 'OpenAI', 'LangChain', 'Pinecone', 'FastAPI'],
    ctaLabel: 'Book AI Development Service →',
  },
  {
    id: '05',
    serviceNumber: '05',
    category: 'design',
    type: 'Product Design',
    title: 'UI/UX & Product Design',
    targetAudience: 'Human-Centered Interface Design & Interactive Prototyping',
    icon: Palette,
    image: '/images/ui-ux-design.png',
    metricsBadge: '✨ High-Converting UX',
    desc: 'Crafting intuitive, human-centered UI/UX design systems, interactive prototypes, and high-converting web and mobile interfaces that turn casual visitors into loyal users.',
    subDesc: 'We combine deep user behavior research, wireframing, component-driven Figma design tokens, and WCAG accessibility standards to ensure every screen is visually stunning and functionally frictionless.',
    bullets: [
      'Figma Design Tokens & UI Component Libraries',
      'Wireframing & Interactive High-Fi Prototypes',
      'User Journey Mapping & Persona Research',
      'Design System Documentation & Handoff',
      'WCAG Accessibility & Responsive Grid Math',
      'Micro-Animations & Motion Design Specs',
    ],
    tags: ['Figma', 'UI/UX Design', 'Design Systems', 'Wireframing', 'Prototyping', 'User Research'],
    ctaLabel: 'Book UI/UX Design Service →',
    processFlow: ['Discovery', 'Wireframing', 'UI Components', 'Prototypes', 'Handoff'],
  },
  {
    id: '06',
    serviceNumber: '06',
    category: 'cloud',
    type: 'API & Microservices',
    title: 'API Development & Integration',
    targetAudience: 'High-Throughput Enterprise Data Pipelines & Third-Party Integration',
    icon: Network,
    image: '/images/api-integration.png',
    metricsBadge: '🔒 Zero-Latency Gateways',
    desc: 'Designing and building high-throughput RESTful and GraphQL APIs, asynchronous event queues, and decoupled microservices architectures for complex software ecosystems.',
    subDesc: 'Whether integrating legacy banking gateways, CRM platforms, or building scalable public API developer portals, we ensure 99.99% uptime, rate-limiting, and end-to-end data encryption.',
    bullets: [
      'RESTful & GraphQL API Engineering',
      'Asynchronous Event Queues (Celery, Redis)',
      'Microservices Decoupling & Gateway Routing',
      'Third-Party Payment & SaaS Integrations',
      'API Security, Rate-Limiting & JWT Auth',
      'Swagger / OpenAPI Automated Specs',
    ],
    tags: ['Django REST', 'FastAPI', 'GraphQL', 'Celery', 'Redis', 'Swagger'],
    ctaLabel: 'Book API Integration Service →',
  },
  {
    id: '07',
    serviceNumber: '07',
    category: 'web',
    type: 'Enterprise Software',
    title: 'Enterprise Software Development',
    targetAudience: 'Bespoke Business Management & Operational Automation',
    icon: Building2,
    image: '/images/custom-software.png',
    metricsBadge: '🏢 Bespoke ERP Architecture',
    desc: 'Building bespoke enterprise software applications tailored precisely to your company’s internal operational workflows, inventory systems, and multi-department analytics.',
    subDesc: 'We replace outdated legacy spreadsheets and fragmented tools with unified cloud software suites that automate repetitive tasks, improve data security, and provide real-time executive dashboards.',
    bullets: [
      'Bespoke Enterprise Software Systems',
      'Automated Workflow & Approval Engines',
      'Multi-Tenant SaaS Platform Development',
      'Legacy Software Refactoring & Migration',
      'Real-Time Executive Dashboards & Analytics',
      'Role-Based Granular Permission Matrices',
    ],
    tags: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'REST APIs'],
    ctaLabel: 'Book Custom Software Service →',
  },
  {
    id: '08',
    serviceNumber: '08',
    category: 'cloud',
    type: 'Cloud & DevOps',
    title: 'Deployment & Cloud Services',
    targetAudience: 'Automated CI/CD Pipelines, Kubernetes & High-Availability Cloud',
    icon: Server,
    image: '/images/devops-services.png',
    metricsBadge: '☁️ Cloud Kubernetes Scale',
    desc: 'Deploying and managing scalable cloud infrastructure on AWS, Google Cloud, and DigitalOcean with automated CI/CD deployment pipelines, containerization, and monitoring.',
    subDesc: 'We implement Infrastructure as Code (Terraform), Docker containerization, Kubernetes cluster orchestration, and 24/7 server health telemetry to guarantee zero-downtime releases.',
    bullets: [
      'AWS & GCP Cloud Architecture Setup',
      'Docker Containerization & Kubernetes (K8s)',
      'Automated CI/CD Pipelines (GitHub Actions)',
      'Infrastructure as Code (Terraform, Ansible)',
      'Database Backup, Disaster Recovery & Clustering',
      'Server Performance Telemetry & Security Hardening',
    ],
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx'],
    ctaLabel: 'Book Cloud & Deployment Service →',
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('Custom Website Development');

  const handleOpenQuote = (type: string) => {
    setSelectedProjectType(type);
    setIsQuoteModalOpen(true);
  };

  const filteredServices =
    activeCategory === 'all'
      ? servicesList
      : servicesList.filter((s) => s.category === activeCategory);

  return (
    <div className="relative min-h-screen text-[#334155] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14 relative z-10">
        {/* ========================================================================= */}
        {/* HERO / HEADER SECTION */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-[#0D9488]" />
            <span>Full-Cycle Engineering Capabilities</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
          >
            Engineering <span className="text-[#0D9488]">Excellence</span> &{' '}
            <span className="text-[#FF7A00]">AI Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            From custom high-throughput web applications to deep neural AI agents and automated Kubernetes cloud pipelines, explore our 8 core engineering disciplines.
          </motion.p>

          {/* Interactive Category Filter Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-2 border ${
                    isActive
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md shadow-slate-900/15 scale-105'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-[#0D9488] text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8 CORE BESPOKE ARCHITECTURAL SERVICE MODULES */}
        {/* ========================================================================= */}
        <motion.div layout className="space-y-4 sm:space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <Service3DCard
                  id={service.id}
                  index={idx}
                  serviceNumber={service.serviceNumber}
                  isStar={service.isStar}
                  type={service.type}
                  category={service.category}
                  title={service.title}
                  targetAudience={service.targetAudience}
                  icon={service.icon}
                  image={service.image}
                  desc={service.desc}
                  subDesc={service.subDesc}
                  bullets={service.bullets}
                  tags={service.tags}
                  ctaLabel={service.ctaLabel}
                  processFlow={service.processFlow}
                  metricsBadge={service.metricsBadge}
                  onOpenQuote={handleOpenQuote}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-WIDTH BOTTOM CTA BANNER (Exact Match) */}
      {/* ========================================================================= */}
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

      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultProjectType={selectedProjectType}
      />
    </div>
  );
}
