'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import YuktiLogoMark from '@/components/common/YuktiLogoMark';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Indian Flag Color Palette Mapping for Nav Links
  const navLinks = [
    {
      name: 'Home',
      path: '/',
      activeColor: 'text-[#FF7A00]',
      pillBg: 'bg-[#FF7A00]/10 border border-[#FF7A00]/30',
    },
    {
      name: 'About',
      path: '/about',
      activeColor: 'text-[#2563EB]',
      pillBg: 'bg-[#2563EB]/10 border border-[#2563EB]/30',
    },
    {
      name: 'Services',
      path: '/services',
      activeColor: 'text-[#0D9488]',
      pillBg: 'bg-[#0D9488]/10 border border-[#0D9488]/30',
    },
    {
      name: 'Projects',
      path: '/projects',
      activeColor: 'text-[#FF7A00]',
      pillBg: 'bg-[#FF7A00]/10 border border-[#FF7A00]/30',
    },
    {
      name: 'Contact',
      path: '/contact',
      activeColor: 'text-[#0D9488]',
      pillBg: 'bg-[#0D9488]/10 border border-[#0D9488]/30',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-500 pointer-events-none">
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 pointer-events-auto ${
            scrolled ? 'mt-2 sm:mt-3' : 'mt-4 sm:mt-5'
          }`}
        >
          {/* Floating Glass Container */}
          <div
            className={`rounded-full transition-all duration-500 border flex items-center justify-between px-4 sm:px-6 ${
              scrolled
                ? 'py-2.5 bg-white/95 backdrop-blur-2xl border-slate-200 shadow-md'
                : 'py-3.5 bg-white/90 backdrop-blur-xl border-slate-200/90 shadow-sm'
            }`}
          >
            {/* Left: Logo (Yukti in Navy + Technology in Saffron) */}
            <Link href="/" className="cursor-pointer flex items-center">
              <YuktiLogoMark size="md" />
            </Link>

            {/* Middle: Desktop Nav with Indian Tricolor Active Pills */}
            <nav className="hidden md:flex items-center space-x-1.5 bg-[#F8FAFC] p-1.5 rounded-full border border-slate-200 mr-10">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-5 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-colors duration-300 ${
                      active ? link.activeColor : 'text-[#334155] hover:text-[#0F172A]'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNavPill"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className={`absolute inset-0 rounded-full ${link.pillBg} shadow-2xs`}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Mobile Menu Toggle Button (Hidden on Desktop) */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2.5 text-[#0F172A] hover:bg-slate-100 rounded-full transition-all border border-slate-200"
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X className="h-5 w-5 text-[#FF7A00]" /> : <Menu className="h-5 w-5 text-[#0F172A]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden mt-3 mx-auto max-w-7xl pointer-events-auto"
            >
              <div className="rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-2xl p-5 space-y-4 shadow-2xl">
                <nav className="flex flex-col space-y-1.5">
                  {navLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-xs uppercase font-extrabold tracking-wider py-3 px-4 rounded-2xl transition-all flex items-center justify-between ${
                          active
                            ? `${link.activeColor} ${link.pillBg}`
                            : 'text-[#334155] hover:text-[#0F172A] hover:bg-slate-100'
                        }`}
                      >
                        <span>{link.name}</span>
                        {active && <ArrowRight className={`h-4 w-4 ${link.activeColor}`} />}
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-2 border-t border-slate-200">
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="block no-underline">
                    <div className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#FF7A00] to-[#E06C00] shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 cursor-pointer">
                      <Sparkles className="h-4 w-4 text-white" />
                      <span>Get in Touch</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
};

export default Header;
