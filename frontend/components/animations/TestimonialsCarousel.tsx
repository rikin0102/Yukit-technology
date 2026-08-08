'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Vikram Malhotra',
    role: 'Chief Technology Officer',
    company: 'FinPulse Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    quote: 'Yukti Technology transformed our legacy architecture into a high-throughput microservices system. Their AI integration shaved 40% off our processing latency.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophia Chen',
    role: 'Founder & CEO',
    company: 'Aura Health AI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    quote: 'The 3D design craft and engineering execution delivered by Yukti exceeded our highest expectations. They built our core SaaS MVP in under 8 weeks.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    role: 'VP of Product',
    company: 'Logix Supply Chain',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    quote: 'Rarely do you find a technology partner that excels equally in deep AI engineering and breathtaking user interface design. Truly world-class craftsmanship.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ananya Sharma',
    role: 'Head of Engineering',
    company: 'NextGen Mobility',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    quote: 'Their proactive agile workflow and meticulous testing standards gave us 100% confidence during our enterprise launch. Highly recommended!',
    rating: 5,
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.85,
      z: -100,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.7,
        ease: 'easeInOut' as const,
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.85,
      z: -100,
      transition: {
        duration: 0.5,
        ease: 'easeInOut' as const,
      },
    }),
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8 perspective-1000">
      <div className="relative min-h-[320px] flex items-center justify-center transform-style-3d">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-2xl rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-[#EFE7DC] relative glass-card-hover transform-style-3d"
          >
            {/* Top Saffron Quote Icon */}
            <div className="absolute -top-5 left-10 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/30">
              <Quote className="h-5 w-5" />
            </div>

            {/* Rating Stars */}
            <div className="flex items-center space-x-1 mb-4 pt-2">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#FF7A00] text-[#FF7A00]" />
              ))}
            </div>

            {/* Quote Body */}
            <p className="text-base sm:text-lg leading-relaxed text-[#1A1A1A] font-medium italic mb-6">
              "{current.quote}"
            </p>

            {/* User Profile */}
            <div className="flex items-center space-x-4 border-t border-[#EFE7DC] pt-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-[#FF7A00]"
              />
              <div>
                <h4 className="text-sm font-extrabold text-[#1A1A1A]">{current.name}</h4>
                <p className="text-xs text-[#71717A]">
                  {current.role} • <span className="text-[#FF7A00] font-semibold">{current.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="mt-6 flex items-center justify-center space-x-6">
        <button
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1A1A] border border-[#EFE7DC] shadow-sm transition-all hover:border-[#FF7A00] hover:text-[#FF7A00] hover:scale-110"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Indicators */}
        <div className="flex space-x-2">
          {testimonialsData.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-gradient-to-r from-[#FF7A00] to-[#FF9933]'
                  : 'w-2.5 bg-[#EFE7DC] hover:bg-[#FF7A00]/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1A1A] border border-[#EFE7DC] shadow-sm transition-all hover:border-[#FF7A00] hover:text-[#FF7A00] hover:scale-110"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
export default TestimonialsCarousel;
