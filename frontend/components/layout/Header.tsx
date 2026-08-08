'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Cpu, Sparkles } from 'lucide-react';
import BookDemoModal from '@/components/modals/BookDemoModal';
import YuktiLogoMark from '@/components/common/YuktiLogoMark';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [logoTilt, setLogoTilt] = useState({ rotateX: 0, rotateY: 0 });
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setLogoTilt({ rotateX: -y * 0.15, rotateY: x * 0.15 });
  };

  const handleLogoMouseLeave = () => {
    setLogoTilt({ rotateX: 0, rotateY: 0 });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-header-scrolled py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Animated 3D Interwoven Y+T Logo */}
            <Link href="/" className="cursor-pointer">
              <YuktiLogoMark size="md" />
            </Link>

            {/* Right Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#EFE7DC] shadow-sm">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                      active
                        ? 'text-[#FF7A00] bg-[#FF7A00]/10'
                        : 'text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#F6F2EB]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9933]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="btn-saffron px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center space-x-2 animate-pulse-glow"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Book a Demo</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 text-[#1A1A1A] hover:bg-[#F6F2EB] rounded-xl transition-all"
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X className="h-6 w-6 text-[#FF7A00]" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-[#EFE7DC] bg-[#FDFBF7] px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase font-bold tracking-wider py-3 px-4 rounded-xl transition-colors ${
                    isActive(link.path)
                      ? 'text-[#FF7A00] bg-[#FF7A00]/10'
                      : 'text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#F6F2EB]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsDemoModalOpen(true);
              }}
              className="btn-saffron w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Book a Demo</span>
            </button>
          </div>
        )}
      </header>

      {/* Book a Demo Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
};
export default Header;
