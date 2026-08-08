'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { usePageView } from '@/hooks/usePageView';

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Call usePageView hook to automatically log page views to analytics DB
  usePageView();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow flex flex-col relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};
export default PageWrapper;
