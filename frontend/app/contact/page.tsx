'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

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

    // Airplane flight animation duration before showing submitted success state
    setTimeout(() => {
      setIsFlying(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A4A4A] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-10 h-80 w-80 rounded-full bg-[#FF7A00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#FF9933]/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-widest text-[#FF7A00]"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#1A1A1A] tracking-tight"
          >
            Let's Build Something <span className="text-saffron-gradient">Extraordinary</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#4A4A4A] leading-relaxed"
          >
            Have a project in mind or need technical guidance? Reach out to our engineering team directly.
          </motion.p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          {/* LEFT COLUMN: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="rounded-3xl bg-white p-8 shadow-lg border border-[#EFE7DC] space-y-6">
              <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Contact Information</h2>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                Our core consulting desk operates 24/7 across multiple timezones. Drop us a message or schedule a direct video call.
              </p>

              <div className="space-y-5 pt-2">
                <div className="flex items-start space-x-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Address</h4>
                    <p className="text-xs text-[#4A4A4A] mt-1 leading-relaxed font-semibold">
                      Ahmedabad
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Contact</h4>
                    <p className="text-xs text-[#4A4A4A] mt-1 font-semibold">+91 9723251252</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Email</h4>
                    <p className="text-xs text-[#FF7A00] font-bold mt-1">rikinp0102@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Down Card: Global Operations with Perfect Contrast */}
            <div className="rounded-3xl bg-[#141417] p-8 shadow-xl border border-white/15 space-y-4 relative overflow-hidden text-white">
              {/* Ambient Glow */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#FF7A00]/25 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#C85236]/20 blur-3xl pointer-events-none" />

              <div className="flex items-center space-x-2 text-[#FF7A00] relative z-10">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Global Operations</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight relative z-10" style={{ color: '#FFFFFF' }}>
                Serving Clients Worldwide
              </h3>
              <p className="text-xs leading-relaxed relative z-10 font-medium" style={{ color: '#E2E8F0' }}>
                With engineering hubs across Asia, Europe, and North America, we deliver seamlessly across all regional timezones.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative"
          >
            {/* Animated Flying Airplane Overlay */}
            <AnimatePresence>
              {isFlying && (
                <motion.div
                  initial={{ x: -100, y: 150, scale: 0.8, rotate: -25, opacity: 0 }}
                  animate={{
                    x: [ -100, 40, 140, 180 ],
                    y: [ 150, -20, -60, -20 ],
                    scale: [ 0.8, 1.4, 1.3, 1.1 ],
                    rotate: [ -25, -45, 10, 0 ],
                    opacity: [ 0, 1, 1, 1 ],
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.3, ease: 'easeInOut' }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
                >
                  <div className="relative">
                    {/* Glowing Jet Trail */}
                    <div className="absolute top-1/2 right-full w-28 h-2 bg-gradient-to-l from-[#FF7A00] via-[#FF9933]/60 to-transparent rounded-full blur-xs -translate-y-1/2" />
                    
                    {/* Glowing Airplane Icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-2xl shadow-[#FF7A00]/60 border-2 border-white">
                      <Send className="h-10 w-10 stroke-[2.5] text-white" />
                    </div>
                  </div>
                  <span className="mt-3 text-xs font-black uppercase tracking-widest text-white bg-[#FF7A00] px-4 py-1.5 rounded-full border border-white/30 shadow-lg animate-pulse">
                    Flying Message... ✈️
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-[#EFE7DC] relative overflow-hidden">
              {submitted ? (
                /* CENTER SUBMITTED SUCCESS SCREEN */
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, type: 'spring', damping: 22 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-2xl shadow-[#FF7A00]/40">
                    <div className="absolute inset-0 rounded-full bg-[#FF7A00]/30 blur-xl animate-pulse" />
                    <CheckCircle2 className="h-12 w-12 stroke-[2] relative z-10 text-white" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#FF7A00] bg-[#FF7A00]/10 border border-[#FF7A00]/20">
                      Message Submitted Successfully!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-[#5A5A5A] max-w-md mx-auto leading-relaxed font-normal">
                      Your project message has been routed to our team in Ahmedabad. We will get back to you at{' '}
                      <span className="font-bold text-[#FF7A00]">{formData.email}</span> or{' '}
                      <span className="font-bold text-[#1A1A1A]">{formData.countryCode} {formData.phone}</span>.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', countryCode: '+91', phone: '', projectDetails: '' });
                      }}
                      className="btn-saffron px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-extrabold shadow-lg cursor-pointer"
                    >
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Send Us a Message</h2>
                      <p className="text-xs text-[#71717A]">Fill in your details to start the conversation</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g. Sarah Jenkins"
                        className="w-full rounded-xl border border-[#EFE7DC] bg-[#FDFBF7] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                      />
                    </div>

                    {/* Email & Phone with Country Code */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Work Email */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sarah@company.com"
                          className="w-full rounded-xl border border-[#EFE7DC] bg-[#FDFBF7] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                        />
                      </div>

                      {/* Phone Number with Country Code Dropdown */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                          Phone Number *
                        </label>
                        <div className="flex rounded-xl border border-[#EFE7DC] bg-[#FDFBF7] focus-within:border-[#FF7A00] focus-within:ring-2 focus-within:ring-[#FF7A00]/20 transition-all overflow-hidden">
                          <select
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                            className="bg-[#F6F2EB] border-r border-[#EFE7DC] px-2.5 py-3 text-xs font-bold text-[#1A1A1A] focus:outline-none cursor-pointer"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="9723251252"
                            className="w-full px-3 py-3 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                        Project Details *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        placeholder="Tell us about your project goals, timelines, budget expectations, or existing technical architecture..."
                        className="w-full rounded-xl border border-[#EFE7DC] bg-[#FDFBF7] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 transition-all"
                      />
                    </div>

                    {/* 3D Animated Submit Button */}
                    <div className="pt-3 perspective-1000">
                      <motion.button
                        type="submit"
                        disabled={isFlying}
                        whileHover={{
                          scale: 1.025,
                          y: -4,
                          rotateX: -6,
                          boxShadow: '0 20px 40px -10px rgba(255, 122, 0, 0.55), 0 0 25px rgba(255, 153, 51, 0.35)',
                        }}
                        whileTap={{
                          scale: 0.975,
                          y: 1,
                          rotateX: 3,
                          boxShadow: '0 6px 15px -4px rgba(255, 122, 0, 0.4)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="relative group w-full py-4.5 rounded-2xl text-xs uppercase tracking-widest font-black text-white bg-gradient-to-r from-[#FF7A00] via-[#FF8800] to-[#FF9933] shadow-xl shadow-[#FF7A00]/35 border-t border-white/35 flex items-center justify-center space-x-3 overflow-hidden cursor-pointer transform-style-3d disabled:opacity-70"
                      >
                        {/* Animated Sheen Light Sweep */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        {/* Glow Background */}
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FF9933] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />

                        <Send className="h-4.5 w-4.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-amber-100 drop-shadow" />
                        <span className="relative z-10 font-black tracking-widest text-xs sm:text-sm drop-shadow">
                          {isFlying ? 'Flying Message...' : 'Send Project Message'}
                        </span>
                        <Sparkles className="h-4 w-4 relative z-10 text-amber-200 animate-pulse" />
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
