'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Service } from '@/types';
import Link from 'next/link';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Dynamically resolve lucide icon name
  const IconComponent = (Icons as any)[service.icon_identifier] || Icons.Cpu;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="glass-panel glass-panel-hover rounded-xl p-8 flex flex-col h-full group"
    >
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[rgba(197,168,128,0.2)] bg-[rgba(197,168,128,0.04)] text-primary mb-6 transition-all duration-300 group-hover:border-primary group-hover:bg-[rgba(197,168,128,0.08)] group-hover:shadow-[0_0_20px_rgba(197,168,128,0.15)]">
        <IconComponent className="h-7 w-7 stroke-[1.25]" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold tracking-wide text-foreground mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">
        {service.short_description}
      </p>

      {/* Features list */}
      {service.features && service.features.length > 0 && (
        <div className="border-t border-[rgba(197,168,128,0.08)] pt-5 mt-auto">
          <ul className="space-y-2.5">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-muted">
                <Icons.Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{feature.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Read More Link */}
      <div className="mt-6 pt-2">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center text-xs font-bold tracking-wider text-primary uppercase group/link hover:underline"
        >
          Explore Capability
          <Icons.ArrowUpRight className="h-4.5 w-4.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
};
export default ServiceCard;
