'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Tag } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  keyFeatures: string[];
  techStack: string[];
  demoUrl?: string;
  client?: string;
  accentColor?: string;
  badgeStyle?: string;
  btnGradient?: string;
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const accentColor = project.accentColor || '#FF7A00';
  const btnGradient = project.btnGradient || 'bg-gradient-to-r from-[#FF7A00] to-[#E06C00] shadow-amber-500/20';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-24 sm:pt-28 pb-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#0F172A] shadow-md transition-colors hover:bg-slate-200 z-20 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Banner Graphic */}
          <div className="relative mb-6 h-56 sm:h-72 w-full overflow-hidden rounded-xl bg-[#0F172A]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span
                className="inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md mb-2"
                style={{ backgroundColor: accentColor }}
              >
                <Tag className="h-3 w-3 mr-1" />
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{project.title}</h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3
                className="text-xs font-black uppercase tracking-wider mb-1"
                style={{ color: accentColor }}
              >
                Project Overview
              </h3>
              <p className="text-sm leading-relaxed text-[#334155] font-normal">{project.fullDesc}</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] mb-3">
                Key Deliverables & Innovations
              </h3>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {project.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2.5 rounded-xl bg-slate-50 p-3 border border-slate-200/80">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                    />
                    <span className="text-xs font-medium text-[#1E293B]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] mb-2.5 flex items-center space-x-1">
                <Layers className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold shadow-2xs border"
                    style={{
                      color: accentColor,
                      backgroundColor: `${accentColor}12`,
                      borderColor: `${accentColor}30`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              {project.client && (
                <div className="text-xs text-[#64748B]">
                  Client / Industry: <span className="font-bold text-[#0F172A]">{project.client}</span>
                </div>
              )}

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 text-white shadow-md cursor-pointer transition-all ${btnGradient} w-full sm:w-auto justify-center`}
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <button
                  onClick={onClose}
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-md cursor-pointer transition-all ${btnGradient} w-full sm:w-auto text-center`}
                >
                  Close Case Study
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
