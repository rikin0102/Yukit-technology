'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Laptop,
  Bot,
  Smartphone,
  Link2,
  Cloud,
  Palette,
  Wrench,
  Zap,
  Database,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Code2,
  Sparkles
} from 'lucide-react';

interface FloatingIconItem {
  id: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const backgroundIconsData: FloatingIconItem[] = [
  { id: 1, icon: Globe, label: 'Web', top: '8%', left: '6%', size: 36, duration: 6, delay: 0 },
  { id: 2, icon: Laptop, label: 'SaaS', top: '15%', left: '88%', size: 40, duration: 7, delay: 1 },
  { id: 3, icon: Bot, label: 'AI', top: '28%', left: '15%', size: 44, duration: 5, delay: 0.5 },
  { id: 4, icon: Smartphone, label: 'Mobile', top: '35%', left: '82%', size: 38, duration: 6.5, delay: 1.5 },
  { id: 5, icon: Link2, label: 'API', top: '48%', left: '8%', size: 36, duration: 8, delay: 2 },
  { id: 6, icon: Cloud, label: 'DevOps', top: '55%', left: '90%', size: 42, duration: 7, delay: 0.8 },
  { id: 7, icon: Palette, label: 'UI/UX', top: '68%', left: '12%', size: 38, duration: 6, delay: 1.2 },
  { id: 8, icon: Wrench, label: 'Support', top: '78%', left: '85%', size: 40, duration: 7.5, delay: 0.3 },
  { id: 9, icon: Zap, label: 'FastAPI', top: '12%', left: '48%', size: 32, duration: 5.5, delay: 1.8 },
  { id: 10, icon: Database, label: 'Postgres', top: '42%', left: '50%', size: 34, duration: 6.8, delay: 0.4 },
  { id: 11, icon: Terminal, label: 'Python', top: '88%', left: '30%', size: 36, duration: 7.2, delay: 2.1 },
  { id: 12, icon: ShieldCheck, label: 'Security', top: '85%', left: '70%', size: 38, duration: 6.4, delay: 1.1 },
  { id: 13, icon: Cpu, label: 'React', top: '22%', left: '72%', size: 34, duration: 5.8, delay: 0.7 },
  { id: 14, icon: Layers, label: 'Redis', top: '62%', left: '75%', size: 32, duration: 6.2, delay: 1.4 },
  { id: 15, icon: Code2, label: 'Django', top: '72%', left: '38%', size: 36, duration: 7.8, delay: 0.9 },
  { id: 16, icon: Sparkles, label: 'LangChain', top: '92%', left: '52%', size: 30, duration: 6.1, delay: 1.6 },
];

export const ServiceIconsSpotlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 106, 0, 0.15), transparent 75%)`,
        }}
      />

      {/* Floating Background Service Icons with Distance Highlight Calculation */}
      {backgroundIconsData.map((item) => {
        const IconComponent = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ y: 0, opacity: 0.2 }}
            animate={{
              y: [0, -16, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
            }}
            className="flex flex-col items-center justify-center space-y-1 transition-all duration-300 group cursor-default"
          >
            <div className="p-3 rounded-2xl bg-[rgba(201,106,0,0.06)] border border-[rgba(201,106,0,0.12)] text-primary/40 group-hover:text-primary group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 backdrop-blur-xs">
              <IconComponent style={{ width: item.size, height: item.size }} />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted/30 group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
