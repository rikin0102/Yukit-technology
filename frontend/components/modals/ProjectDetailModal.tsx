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
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl rounded-2xl bg-[#FDFBF7] p-6 sm:p-8 shadow-2xl border border-[#EFE7DC] max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#4A4A4A] shadow-md transition-colors hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] z-20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Banner Graphic */}
          <div className="relative mb-6 h-56 sm:h-72 w-full overflow-hidden rounded-xl bg-gradient-to-tr from-[#1A1A1A] to-[#4A4A4A]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-flex items-center space-x-1 rounded-full bg-[#FF7A00] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md mb-2">
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF7A00] mb-1">
                Project Overview
              </h3>
              <p className="text-sm leading-relaxed text-[#4A4A4A]">{project.fullDesc}</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">
                Key Deliverables & Innovations
              </h3>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {project.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2 rounded-xl bg-white p-3 border border-[#EFE7DC]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF7A00] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#1A1A1A]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2.5 flex items-center space-x-1">
                <Layers className="h-3.5 w-3.5 text-[#FF7A00]" />
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#F6F2EB] px-3 py-1.5 text-xs font-bold text-[#1A1A1A] border border-[#EFE7DC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EFE7DC]">
              {project.client && (
                <div className="text-xs text-[#71717A]">
                  Client / Industry: <span className="font-bold text-[#1A1A1A]">{project.client}</span>
                </div>
              )}

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-saffron px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <button
                  onClick={onClose}
                  className="btn-saffron px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider w-full sm:w-auto text-center"
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
