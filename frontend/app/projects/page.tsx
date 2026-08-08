'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';
import ProjectDetailModal, { ProjectData } from '@/components/modals/ProjectDetailModal';
import InteractiveGridBoxes from '@/components/animations/InteractiveGridBoxes';
import Card3DTilt from '@/components/animations/Card3DTilt';

const projectsList: ProjectData[] = [
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
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A4A4A] py-14 sm:py-18 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Interactive Grid Background */}
      <InteractiveGridBoxes gridSize={55} highlightRadius={240} className="opacity-80" />

      {/* Ambient Saffron Lighting */}
      <div className="absolute top-10 right-1/4 h-72 w-72 rounded-full bg-[#FF7A00]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-[#FF9933]/15 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl space-y-10 relative z-10">
        {/* Header (Clean, without top badge) */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight"
          >
            Featured <span className="text-[#FF7A00] drop-shadow-[0_4px_20px_rgba(255,122,0,0.35)]">Projects & Systems</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed font-normal"
          >
            Explore our flagship Machine Learning & AI systems. Click "Show More Details" to view complete technical specifications.
          </motion.p>
        </div>

        {/* Mid-Sized Clean Grid Cards (Only Image, Title, 1-2 Line Details, & Show More Button) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {projectsList.map((project) => (
            <Card3DTilt key={project.id}>
              <div className="h-full rounded-3xl bg-white/95 backdrop-blur-xl border border-[#EFE7DC] shadow-md overflow-hidden flex flex-col justify-between glass-card-hover group p-5 sm:p-6 space-y-4 transform-style-3d">
                <div className="space-y-3.5">
                  {/* Matching 3D Image Banner */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-2xl bg-[#121215] shadow-sm">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-extrabold text-[#1A1A1A] group-hover:text-[#C85236] transition-colors tracking-tight">
                    {project.title}
                  </h2>

                  {/* Short 1-2 Line Details */}
                  <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed line-clamp-2">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Show More Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedProject(project)}
                    className="btn-saffron w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                  >
                    <span>Show More Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      {/* Detailed Technical Case Study Modal (Shows All Features, Tech Stack, & Full Architecture Details) */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
