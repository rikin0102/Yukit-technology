'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Yukti Technologies engineered our clinical semantic search database core with absolute precision. Their RAG search using doctor note vectors dropped our clinical lookup times by 82% while meeting strict healthcare compliance rules.",
    author: "Dr. Eleanor Vance",
    role: "Chief Medical Officer",
    company: "MedLife Solutions",
    rating: 5,
  },
  {
    id: 2,
    quote: "Our financial anomaly detection streams process over 12,000 credit card operations per second with an average execution latency under 12ms. Yukti's event-driven Kafka setup has completely automated our risk controls.",
    author: "Marcus Reynolds",
    role: "Director of Risk Infrastructure",
    company: "Apex Financial Group",
    rating: 5,
  },
  {
    id: 3,
    quote: "Yukti migrated our global containerized pipelines from legacy on-prem hypervisors to an auto-scaling Kubernetes cluster on Google Cloud with zero production downtime. Our cloud hosting spend decreased by 35% in month one.",
    author: "Sophia Chen",
    role: "VP of Global DevOps",
    company: "TransRoute Logistics",
    rating: 5,
  },
];

const pageVariants = {
  initial: (dir: number) => ({
    rotateY: dir > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.92,
    transformOrigin: dir > 0 ? 'left center' : 'right center',
  }),
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transformOrigin: 'center center',
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.92,
    transformOrigin: dir > 0 ? 'right center' : 'left center',
  }),
};

export const TestimonialSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = Next, -1 = Prev

  // Auto-play timer (6.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > index ? 1 : -1);
    setIndex(idx);
  };

  const activeTestimonial = testimonials[index];

  return (
    <div className="mx-auto max-w-4xl px-4 flex flex-col items-center">
      
      {/* 3D Book Page-Turn Container */}
      <div className="relative w-full min-h-[340px] sm:min-h-[280px] flex items-center justify-center select-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTestimonial.id}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformPerspective: 1200 }}
            className="w-full max-w-2xl rounded-2xl p-8 sm:p-12 border border-primary/35 bg-white shadow-[0_20px_50px_-10px_rgba(201,106,0,0.16)] relative text-left"
          >
            {/* Quote watermark icon */}
            <Quote className="absolute left-6 top-6 h-12 w-12 text-primary/10 stroke-[1.25]" />

            <div className="space-y-5 relative z-10">
              {/* Rating stars */}
              <div className="flex space-x-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 text-primary fill-primary" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-sm sm:text-base italic font-medium leading-relaxed text-foreground select-text">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author details */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-extrabold text-foreground">{activeTestimonial.author}</h4>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-primary mt-0.5">
                    {activeTestimonial.role}
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded bg-[rgba(201,106,0,0.05)] border border-[rgba(201,106,0,0.15)] text-[9px] uppercase tracking-wider font-extrabold text-primary max-w-max">
                  {activeTestimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between w-full max-w-2xl pt-6 border-t border-slate-200/50 mt-8 z-25">
        {/* Arrow controls */}
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            className="h-10 w-10 rounded-lg border border-[rgba(201,106,0,0.2)] bg-white hover:border-primary text-muted hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 rounded-lg border border-[rgba(201,106,0,0.2)] bg-white hover:border-primary text-muted hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots indicators */}
        <div className="flex space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === index ? 'w-5 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TestimonialSlider;
