'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderOpen } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Try to find image url, fallback to a elegant gradient background if none uploaded
  const imageUrl = project.featured_image?.file_url || project.featured_image?.file;
  
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel glass-panel-hover rounded-xl overflow-hidden flex flex-col h-full group"
    >
      {/* Featured Image */}
      <div className="relative h-60 w-full overflow-hidden bg-[#1E1B4B] border-b border-[#EADBCE]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1B4B] via-[#1565C0]/40 to-[#1E1B4B] p-6 text-center">
            <FolderOpen className="h-10 w-10 text-[#D4A017] mb-3 stroke-[1.2]" />
            <span className="text-xs uppercase tracking-widest text-[#FFF8F0] font-bold">{project.client || 'Enterprise Solution'}</span>
          </div>
        )}
        <div className="absolute top-4 left-4 rounded-full bg-[#1E1B4B]/85 border border-[#D4A017]/40 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#D4A017] backdrop-blur-sm">
          {project.industry || 'Case Study'}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Services / Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.services_details?.map((service) => (
            <span
              key={service.id}
              className="text-[9px] uppercase tracking-wider text-muted border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-2 py-0.5 rounded"
            >
              {service.title}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-wide text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted mb-6 flex-grow">
          {project.description}
        </p>

        {/* Action Link */}
        <div className="mt-auto pt-4 border-t border-[rgba(197,168,128,0.06)]">
          <Link
            href={`/projects#${project.slug}`}
            className="inline-flex items-center text-xs font-bold tracking-wider text-primary uppercase group/link hover:underline"
          >
            Review Case Study
            <ArrowUpRight className="h-4 w-4 ml-1.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
