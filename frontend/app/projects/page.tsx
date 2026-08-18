'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/services/api';
import ProjectDetailModal, { ProjectData } from '@/components/modals/ProjectDetailModal';
import Card3DTilt from '@/components/animations/Card3DTilt';

type StyledProject = ProjectData & {
  accentColor: string;
  badgeStyle: string;
  btnGradient: string;
};

const projectsList: StyledProject[] = [
  {
    id: 'sales-forecasting-system',
    title: 'Sales Forecasting System',
    category: 'Machine Learning & Analytics',
    image: '/images/sales-forecasting.png',
    shortDesc: 'Django-based machine learning forecasting application analyzing historical sales data to generate predictive insights using Linear Regression, Random Forest, and XGBoost.',
    fullDesc: 'Developed a comprehensive Django-based sales forecasting application to analyze historical sales data and generate predictive insights using advanced machine learning models. Built a complete data processing pipeline with Pandas and NumPy for feature engineering and model training. Integrated Celery and Redis for background task processing with REST APIs and PostgreSQL.',
    keyFeatures: [
      'Developed Django-based sales forecasting app to analyze historical sales data & generate predictive insights',
      'Implemented ML models including Linear Regression, Random Forest & XGBoost using Scikit-learn',
      'Built complete data processing pipeline (data cleaning, feature engineering, model evaluation) with Pandas & NumPy',
      'Integrated Celery & Redis for background task processing with REST APIs & PostgreSQL',
      'Structured modular backend architecture with interactive dashboard visualization & reporting features',
    ],
    techStack: ['Python', 'Django', 'PostgreSQL', 'Scikit-learn', 'Pandas', 'NumPy', 'Celery', 'Redis', 'REST APIs', 'HTML/CSS/JS'],
    client: 'Enterprise Analytics Division',
    accentColor: '#FF7A00',
    badgeStyle: 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/30',
    btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00] shadow-amber-500/20',
  },
  {
    id: 'ai-mock-interview-system',
    title: 'AI Mock Interview System',
    category: 'AI & Speech Processing',
    image: '/images/ai-mock-interview.png',
    shortDesc: 'AI-powered mock interview application using Python and Django to simulate real-time interactive interview sessions with speech-to-text integration.',
    fullDesc: 'Developed an intelligent AI-based mock interview application using Python and Django to simulate real-time interview sessions. Designed robust backend logic for dynamic question generation, response evaluation, and session management. Integrated Speech-to-Text APIs to process audio responses and enable real-time interactive interview workflows.',
    keyFeatures: [
      'Developed AI-based mock interview app using Python & Django simulating real-time interview sessions',
      'Designed backend logic for dynamic question generation, response handling & interview workflows',
      'Integrated Speech-to-Text APIs to process audio responses & enable real-time interaction during interviews',
      'Implemented features such as inactivity handling, question skipping & AI response evaluation',
      'Built REST APIs and structured modular backend architecture for high scalability and maintainability',
    ],
    techStack: ['Python', 'Django', 'PostgreSQL', 'Speech-to-Text API', 'REST APIs', 'WebSockets', 'HTML/CSS/JS'],
    client: 'EdTech & AI Career Platform',
    accentColor: '#2563EB',
    badgeStyle: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30',
    btnGradient: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] shadow-blue-500/20',
  },
  {
    id: 'smart-logistics-telemetry',
    title: 'Smart Logistics Telemetry Engine',
    category: 'IoT & Real-Time Tracking',
    image: '/images/custom-software.png',
    shortDesc: 'High-throughput enterprise IoT telemetry engine built with Django, Redis, and React Native for real-time fleet location tracking and automated route optimization.',
    fullDesc: 'Engineered a high-availability fleet telemetry and logistics tracking engine using Python, Django, and WebSockets. Implemented real-time GPS coordinates stream processing with Redis PubSub and PostgreSQL PostGIS spatial queries. Built cross-platform driver and dispatcher applications with React Native.',
    keyFeatures: [
      'High-throughput real-time GPS telemetry stream processing using WebSockets & Redis',
      'Geofencing alerts & PostGIS spatial database queries for automated arrival notifications',
      'Interactive dispatcher dashboard with live map rendering & vehicle telemetry metrics',
      'React Native driver app with offline-first position caching & background location sync',
      'REST APIs & microservices routing for third-party ERP integration',
    ],
    techStack: ['Python', 'Django', 'PostgreSQL', 'PostGIS', 'Redis', 'WebSockets', 'React Native', 'Docker', 'AWS'],
    client: 'Global Freight & Supply Chain Corp',
    accentColor: '#0D9488',
    badgeStyle: 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/30',
    btnGradient: 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] shadow-teal-500/20',
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Fetch projects dynamically from Django backend API
  const { data: apiProjects } = useQuery({
    queryKey: ['projects_list_page'],
    queryFn: () => projectService.list(),
  });

  const colorPatterns = [
    {
      accentColor: '#FF7A00',
      badgeStyle: 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/30',
      btnGradient: 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] hover:from-[#E06C00] hover:to-[#C55F00] shadow-amber-500/20',
      glareColor: 'rgba(255, 122, 0, 0.4)',
    },
    {
      accentColor: '#2563EB',
      badgeStyle: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30',
      btnGradient: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] shadow-blue-500/20',
      glareColor: 'rgba(37, 99, 235, 0.4)',
    },
    {
      accentColor: '#0D9488',
      badgeStyle: 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/30',
      btnGradient: 'bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] shadow-teal-500/20',
      glareColor: 'rgba(13, 148, 136, 0.4)',
    },
  ];

  const mappedApiProjects: StyledProject[] = (apiProjects || [])
    .filter((p: any) => p.status === 'PUBLISHED')
    .map((project: any, idx: number) => {
      const pattern = colorPatterns[idx % colorPatterns.length];
      
      const techStack = project.tech_stack
        ? project.tech_stack.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
        : (project.services_details ? project.services_details.map((s: any) => s.title) : []);
      
      return {
        id: project.slug,
        title: project.title,
        category: project.industry || 'Software Engineering',
        image: project.featured_image?.file_url || '/images/custom-software.png',
        shortDesc: project.description,
        fullDesc: project.long_description,
        keyFeatures: project.long_description ? project.long_description.split('\n').filter((l: string) => l.trim() !== '') : [],
        techStack: techStack,
        demoUrl: project.live_url || undefined,
        client: project.client || undefined,
        ...pattern,
      };
    });

  const displayedProjects = mappedApiProjects.length > 0 ? mappedApiProjects : projectsList;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen text-[#334155] py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-10 relative z-10">
        {/* Header - Indian Flag Color Accent Sequence */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight"
          >
            <span className="text-[#FF7A00]">Ideas, </span>
            <span>Engineered </span>
            <span className="text-[#0D9488]">Into Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-2xl mx-auto font-normal"
          >
            From concepts to working digital products, explore what we build with software, AI, and modern technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedProjects.map((project, idx) => (
            <Card3DTilt key={project.id} glareColor={(project as any).glareColor}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="h-full rounded-2xl bg-white p-5 shadow-lg border border-slate-200/90 flex flex-col justify-between space-y-4 glass-card-hover group transform-style-3d relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Short Compact Image Container */}
                  <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden relative border border-slate-100 bg-[#0F172A]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#0F172A]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[9px] font-black uppercase text-white shadow-xs">
                      {project.category}
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#FF7A00] transition-colors leading-snug line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-[#334155] line-clamp-3 font-normal">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Modal Trigger Button (Tech stack is cleanly inside the case study modal) */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center justify-center space-x-2 text-white shadow-md cursor-pointer transition-all ${project.btnGradient}`}
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      {/* Project Details Modal (Displays complete Tech Stack & Key Deliverables inside) */}
      {selectedProject && (
        <ProjectDetailModal
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </motion.div>
  );
}
