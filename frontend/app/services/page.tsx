'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Globe,
  Smartphone,
  Server,
  BrainCircuit,
  Palette,
  Cpu,
  Calculator,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import Service3DCard from '@/components/animations/Service3DCard';
import Card3DTilt from '@/components/animations/Card3DTilt';
import InteractiveGridBoxes from '@/components/animations/InteractiveGridBoxes';
import GetQuoteModal from '@/components/modals/GetQuoteModal';

const servicesList = [
  {
    id: 'custom-dev',
    type: 'Custom Development',
    title: 'Custom Development',
    icon: Code2,
    image: '/images/custom-dev.png',
    desc: 'Bespoke software architecture engineered specifically to power your unique business logic. We build resilient backend systems, custom APIs, data pipelines, and scalable microservices.',
    bullets: [
      'Tailored business logic & microservices architecture',
      'Scalable Python, Node.js & Go backend engines',
      'RESTful & gRPC enterprise API engineering',
      'Database optimization, caching & secure data pipelines',
    ],
    tags: ['Next.js', 'Node.js', 'Python', 'Microservices', 'GraphQL'],
  },
  {
    id: 'app-dev',
    type: 'App',
    title: 'App Development',
    icon: Smartphone,
    image: '/images/app-dev.png',
    desc: 'Native and cross-platform mobile app development engineered for smooth performance across iOS and Android. Features offline sync, biometric security, and real-time state management.',
    bullets: [
      'React Native & Flutter iOS / Android app deployment',
      'Offline-first architecture with encrypted local storage',
      'Push notification workflows & background task handling',
      'Seamless App Store & Google Play publishing pipeline',
    ],
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'WebSockets'],
  },
  {
    id: 'web-dev',
    type: 'Website',
    title: 'Web Development',
    icon: Globe,
    image: '/images/web-dev.png',
    desc: 'High-speed, SEO-optimized modern websites and web applications built with Next.js 16, React 19, and rich 3D animations. Designed for ultra-fast load times and flawless user conversions.',
    bullets: [
      'Next.js 16 App Router & Server Components optimization',
      'Interactive 3D WebGL graphics & smooth animations',
      'SEO metadata architecture & automated schema generation',
      'Headless CMS integration (Sanity, Strapi, Contentful)',
    ],
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'devops-services',
    type: 'DevOps',
    title: 'DevOps Services',
    icon: Server,
    image: '/images/devops-services.png',
    desc: 'Automated CI/CD pipelines, cloud infrastructure management, Kubernetes orchestration, and 24/7 telemetry monitoring to guarantee 99.99% uptime and zero-downtime deployments.',
    bullets: [
      'AWS / GCP Cloud migration & Infrastructure as Code (Terraform)',
      'Docker containerization & Kubernetes cluster orchestration',
      'Automated CI/CD GitHub Actions & GitLab deployment pipelines',
      'Real-time metrics, logging & Prometheus/Grafana monitoring',
    ],
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    id: 'ai-dev',
    type: 'AI Solution',
    title: 'AI Development & Integration',
    icon: BrainCircuit,
    image: '/images/ai-dev.png',
    desc: 'End-to-end AI capabilities including LLM fine-tuning, RAG vector pipelines, computer vision, and autonomous AI agents designed to automate complex business workflows.',
    bullets: [
      'Custom LLM agent workflows & RAG vector search',
      'Computer vision & OCR document processing engines',
      'Predictive analytics & machine learning models',
      'Seamless OpenAI, Anthropic & Llama model integrations',
    ],
    tags: ['Python', 'PyTorch', 'OpenAI API', 'LangChain', 'Vector DB'],
  },
  {
    id: 'ui-ux',
    type: 'UI-UX',
    title: 'UI/UX Design & Design Systems',
    icon: Palette,
    image: '/images/ui-ux-design.png',
    desc: 'Human-centered user interface design, interactive Figma prototypes, component libraries, and glassmorphic aesthetic systems built to engage and retain users.',
    bullets: [
      'High-fidelity Figma interactive wireframes & prototypes',
      'Scalable design tokens & design system creation',
      'Accessibility compliance (WCAG 2.1 AA standard)',
      'Micro-animation & responsive UI design',
    ],
    tags: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'WCAG AA'],
  },
  {
    id: 'enterprise-software',
    type: 'Other',
    title: 'Enterprise Software Services',
    icon: Cpu,
    image: '/images/enterprise-software.png',
    desc: 'Legacy monolith modernization, enterprise security auditing, cloud re-platforming, and custom internal tools to accelerate organizational efficiency.',
    bullets: [
      'Monolith to microservices refactoring & API gateways',
      'Security penetration testing & compliance audits',
      'Redis distributed caching & SQL database tuning',
      'Custom enterprise ERP & CRM software tools',
    ],
    tags: ['Enterprise Architecture', 'Security Audit', 'Redis', 'PostgreSQL', 'Microservices'],
  },
];

export default function ServicesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('Website');

  const handleOpenQuote = (type: string) => {
    setSelectedProjectType(type);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A4A4A] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Interactive Grid Background */}
      <InteractiveGridBoxes gridSize={55} highlightRadius={240} className="opacity-80" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-20 left-1/4 h-80 w-80 rounded-full bg-[#C85236]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 h-72 w-72 rounded-full bg-[#FF7A00]/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl space-y-12 relative z-10">
        {/* Header (Clean, without top badge) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight"
          >
            Engineering <span className="text-[#FF7A00] drop-shadow-[0_4px_20px_rgba(255,122,0,0.35)]">Excellence</span> &{' '}
            <span className="text-[#FF7A00] drop-shadow-[0_4px_20px_rgba(255,122,0,0.35)]">AI Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#5A5A5A] max-w-xl mx-auto leading-relaxed font-normal"
          >
            Explore our high-craft digital solutions, from custom Development and Web & Mobile Apps to DevOps pipelines and AI integrations.
          </motion.p>
        </div>

        {/* Mid-Range Sized 3D Animated Services List */}
        <div className="space-y-2">
          {servicesList.map((service, idx) => (
            <Service3DCard
              key={service.id}
              id={service.id}
              index={idx}
              type={service.type}
              title={service.title}
              icon={service.icon}
              image={service.image}
              desc={service.desc}
              bullets={service.bullets}
              tags={service.tags}
              onOpenQuote={handleOpenQuote}
            />
          ))}
        </div>

        {/* Global Interactive Quote Estimator CTA Box */}
        <div className="pt-6">
          <Card3DTilt>
            <div className="w-full rounded-3xl bg-[#141417] p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/15 text-white transform-style-3d text-center space-y-6">
              {/* Ambient Lighting */}
              <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#FF7A00]/30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#C85236]/25 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

              <div style={{ transform: 'translateZ(30px)' }}>
                <h2
                  className="text-2xl sm:text-4xl font-black tracking-tight leading-tight"
                  style={{ color: '#FFFFFF' }}
                >
                  <span style={{ color: '#FFFFFF' }}>Have a Specific </span>
                  <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFA033] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,122,0,0.5)]">
                    Project Scope?
                  </span>
                </h2>
              </div>

              <div style={{ transform: 'translateZ(20px)' }}>
                <p
                  className="max-w-lg mx-auto text-xs sm:text-base leading-relaxed font-medium"
                  style={{ color: '#E2E8F0' }}
                >
                  Use our interactive quote estimator form to select project category, timeline, budget range, and receive an instant estimation breakdown.
                </p>
              </div>

              <div style={{ transform: 'translateZ(45px)' }} className="inline-block pt-1">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={() => handleOpenQuote('Website')}
                  className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-[#FF7A00] via-[#FF8800] to-[#FF9933] shadow-xl shadow-[#FF7A00]/45 hover:shadow-[#FF7A00]/70 transition-all duration-300 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="tracking-widest">Open Interactive Quote Estimator</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </Card3DTilt>
        </div>
      </div>

      {/* Quote Estimator Modal */}
      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultProjectType={selectedProjectType}
      />
    </div>
  );
}
