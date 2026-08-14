'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    projectDetails: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFlying(true);

    setTimeout(() => {
      setIsFlying(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className="relative min-h-screen text-[#334155] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12 relative z-10">
        {/* Header - Indian Flag Color Palette */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight uppercase"
          >
            <span className="text-[#FF7A00]">HAVE AN IDEA </span>
            <span>WORTH </span>
            <span className="text-[#0D9488]">BUILDING?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#334155] leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Let's turn your idea into a digital product.
          </motion.p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          {/* LEFT COLUMN: Let's Talk (Indian Flag Colors Combination) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200/80 space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">
                  <span className="text-[#FF7A00]">Let's </span>
                  <span className="text-[#0D9488]">Talk</span>
                </h2>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#0F172A] to-[#0D9488]" />
              </div>

              <p className="text-xs text-[#334155] leading-relaxed font-normal">
                Our core engineering desk is available for direct communication. Drop us a message or connect directly for your project.
              </p>

              <div className="space-y-5 pt-2">
                {/* Item 1: Location (Saffron Orange) */}
                <div className="flex items-start space-x-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF7A00] text-white shadow-md shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">Location</h4>
                    <p className="text-xs text-[#0F172A] mt-0.5 leading-relaxed font-bold">
                      Ahmedabad, India 🇮🇳
                    </p>
                  </div>
                </div>

                {/* Item 2: Phone (Ashoka Chakra Royal Blue) */}
                <div className="flex items-start space-x-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Phone / WhatsApp</h4>
                    <p className="text-xs text-[#0F172A] mt-0.5 font-bold">+91 9723251252</p>
                  </div>
                </div>

                {/* Item 3: Email (India Green) */}
                <div className="flex items-start space-x-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D9488] text-white shadow-md shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">Direct Email</h4>
                    <p className="text-xs text-[#0D9488] font-bold mt-0.5">rikinp0102@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Direct Support Card (Tricolor Border Highlight) */}
              <div className="p-5 rounded-2xl bg-[#0F172A] text-white space-y-3 shadow-md border-l-4 border-l-[#FF7A00] border border-slate-700">
                <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#0D9488]">
                  <Clock className="h-4 w-4 text-[#0D9488]" />
                  <span>24-Hour Estimate Guarantee</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300 font-normal">
                  Every inquiry receives a preliminary technical scope, time estimate, and architecture recommendation within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-lg border border-slate-200/80 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0D9488]/10 border border-[#0D9488]/30 shadow-sm">
                      <CheckCircle2 className="h-10 w-10 text-[#0D9488]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-[#FF7A00] tracking-tight">Message Received!</h3>
                      <p className="text-xs sm:text-sm text-[#334155] max-w-md mx-auto leading-relaxed font-normal">
                        Thank you for reaching out. Our lead architect will review your project details and respond shortly to <strong className="text-[#2563EB] font-extrabold">{formData.email}</strong>.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-7 py-3 rounded-full bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-md shadow-teal-500/20 text-xs font-black uppercase tracking-widest cursor-pointer transition-all border border-teal-500/30"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className={`space-y-6 transition-all duration-500 ${isFlying ? 'opacity-15 blur-xs' : ''}`}
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-[#0F172A]">Project Details</h3>
                      <p className="text-xs text-[#334155]">Fill in your information to start the conversation.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all"
                        />
                      </div>

                      {/* Phone with Country Code */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <div className="flex space-x-2">
                          <select
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                            className="px-3 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="98765 43210"
                            className="flex-1 px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all"
                          />
                        </div>
                      </div>

                      {/* Project Details */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Tell Us About Your Project *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.projectDetails}
                          onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                          placeholder="Describe your project goals, required tech stack, timeline, or scope..."
                          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Single Solid Color Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isFlying}
                        className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[#FF7A00] hover:bg-[#E06C00] shadow-md shadow-amber-500/20 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <div className="flex items-center space-x-2 text-white">
                          {!isFlying && <Send className="h-4 w-4 text-white" />}
                          <span className="text-white font-black tracking-widest">
                            {isFlying ? 'SENDING...' : 'SEND INQUIRY NOW'}
                          </span>
                        </div>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Paper Plane Flying to Center Overlay */}
              <AnimatePresence>
                {isFlying && (
                  <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    <motion.div
                      initial={{ x: 0, y: 180, scale: 0.8, rotate: 0 }}
                      animate={{
                        x: [0, -100, 60, -30, 0], // flight curves left and right
                        y: [180, 100, 20, -30, 0], // climbs up to card center
                        scale: [0.8, 1.5, 2.0, 2.4, 1.8], // scales up near center
                        rotate: [0, -35, 15, -60, -45], // banking rotation
                      }}
                      transition={{
                        duration: 1.4,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      className="text-[#FF7A00] flex items-center justify-center relative"
                    >
                      <Send className="h-12 w-12 drop-shadow-[0_8px_16px_rgba(255,122,0,0.4)]" />
                      
                      {/* Shockwave ripple when reaching center */}
                      <motion.div
                        initial={{ opacity: 0.6, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 2.5 }}
                        transition={{ duration: 0.7, repeat: 1, ease: 'easeOut', delay: 0.7 }}
                        className="absolute h-16 w-16 rounded-full border-2 border-[#FF7A00]/50 -z-10"
                      />
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
