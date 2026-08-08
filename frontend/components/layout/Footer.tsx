'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Mail, Phone, MapPin, ArrowRight, Code2, Globe, Share2, MessageCircle } from 'lucide-react';
import YuktiLogoMark from '@/components/common/YuktiLogoMark';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#F6F2EB] border-t border-[#EFE7DC] pt-16 pb-12 overflow-hidden">
      {/* Soft Saffron Ambient Glow */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-[#FF7A00]/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="cursor-pointer inline-block">
              <YuktiLogoMark size="md" />
            </Link>

            <p className="text-sm leading-relaxed text-[#4A4A4A] max-w-sm">
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#4A4A4A] border border-[#EFE7DC] shadow-sm transition-all hover:bg-gradient-to-tr hover:from-[#FF7A00] hover:to-[#FF9933] hover:text-white hover:border-transparent hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#4A4A4A]">
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
                    className="hover:text-[#FF7A00] transition-colors flex items-center group text-xs font-semibold"
                  >
                    <ArrowRight className="h-3 w-3 mr-1.5 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0 text-[#FF7A00]" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[#4A4A4A]">
              <li><Link href="/services" className="hover:text-[#FF7A00] transition-colors">Software Development</Link></li>
              <li><Link href="/services" className="hover:text-[#FF7A00] transition-colors">Web Application Dev</Link></li>
              <li><Link href="/services" className="hover:text-[#FF7A00] transition-colors">Mobile App Development</Link></li>
              <li><Link href="/services" className="hover:text-[#FF7A00] transition-colors">AI & Machine Learning</Link></li>
              <li><Link href="/services" className="hover:text-[#FF7A00] transition-colors">UI/UX Design Systems</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-[#4A4A4A]">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span className="font-semibold text-[#1A1A1A]">Ahmedabad</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#FF7A00] shrink-0" />
                <span className="font-semibold text-[#1A1A1A]">+91 9723251252</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#FF7A00] shrink-0" />
                <span className="font-bold text-[#FF7A00]">rikinp0102@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-[#EFE7DC] flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717A]">
          <p>© {new Date().getFullYear()} Yukti Technology. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 sm:mt-0">
            <a href="#" className="hover:text-[#FF7A00] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FF7A00] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FF7A00] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
