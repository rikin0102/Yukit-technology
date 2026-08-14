'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Code2, Globe, Share2, MessageCircle } from 'lucide-react';
import YuktiLogoMark from '@/components/common/YuktiLogoMark';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0F172A] border-t border-slate-800 pt-16 pb-12 overflow-hidden text-slate-300">
      {/* Soft Teal & Saffron Ambient Glow */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-[#0D9488]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#FF7A00]/8 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="cursor-pointer inline-block">
              <YuktiLogoMark size="md" />
            </Link>

            <p className="text-sm leading-relaxed text-slate-300 max-w-sm font-normal">
              Architecting state-of-the-art software systems, AI models, and scalable digital solutions to accelerate high-growth startups and visionary enterprises globally.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: Code2, href: '#', label: 'Code' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Share2, href: '#', label: 'Network' },
                { icon: MessageCircle, href: '#', label: 'Community' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 border border-slate-700 shadow-xs transition-all hover:bg-gradient-to-tr hover:from-[#0D9488] hover:to-[#FF7A00] hover:text-white hover:border-transparent hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Projects', href: '/projects' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#0D9488] transition-colors flex items-center group text-xs font-semibold"
                  >
                    <ArrowRight className="h-3 w-3 mr-1.5 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0 text-[#0D9488]" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><Link href="/services" className="hover:text-[#0D9488] transition-colors">Software Development</Link></li>
              <li><Link href="/services" className="hover:text-[#0D9488] transition-colors">Web Application Dev</Link></li>
              <li><Link href="/services" className="hover:text-[#0D9488] transition-colors">Mobile App Development</Link></li>
              <li><Link href="/services" className="hover:text-[#0D9488] transition-colors">AI & Machine Learning</Link></li>
              <li><Link href="/services" className="hover:text-[#0D9488] transition-colors">UI/UX Design Systems</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span className="font-semibold text-white">Ahmedabad</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#0D9488] shrink-0" />
                <span className="font-semibold text-white">+91 9723251252</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#FF7A00] shrink-0" />
                <span className="font-bold text-[#FF7A00]">rikinp0102@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Yukti Technology. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 sm:mt-0">
            <a href="#" className="hover:text-[#0D9488] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#0D9488] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#0D9488] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
