'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, CheckCircle, ArrowRight, DollarSign, Layers } from 'lucide-react';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectType?: string;
}

export const GetQuoteModal: React.FC<GetQuoteModalProps> = ({
  isOpen,
  onClose,
  defaultProjectType = 'Website',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState(defaultProjectType);
  const [category, setCategory] = useState('Fintech / Finance');
  const [budgetRange, setBudgetRange] = useState('$5,000 - $15,000');
  const [requirements, setRequirements] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Estimate rough cost calculation preview
  const getRoughEstimate = () => {
    switch (projectType) {
      case 'Website':
        return '$2,500 - $8,000';
      case 'App':
        return '$7,500 - $20,000';
      case 'AI Solution':
        return '$10,000 - $35,000';
      case 'UI-UX':
        return '$2,000 - $6,500';
      default:
        return '$3,500 - $12,000';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-24 sm:pt-28 pb-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#FDFBF7] p-6 sm:p-8 shadow-2xl border border-[#EFE7DC]"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F6F2EB] text-[#4A4A4A] transition-colors hover:bg-[#FF7A00]/10 hover:text-[#FF7A00]"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-lg shadow-[#FF7A00]/30">
                  <CheckCircle className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1A1A1A]">Quote Request Received!</h3>
                <p className="mt-2 text-sm text-[#4A4A4A]">
                  Thank you <span className="font-semibold text-[#1A1A1A]">{name}</span>. Estimated scope for <span className="text-[#FF7A00] font-bold">{projectType}</span> ({getRoughEstimate()}) is logged. Our team will send a detailed technical blueprint within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between pr-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25">
                      <Calculator className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Get a Project Quote</h2>
                      <p className="text-xs text-[#71717A]">Instant estimate breakdown & proposal request</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Project Type Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2 flex items-center space-x-1">
                      <Layers className="h-3.5 w-3.5 text-[#FF7A00]" />
                      <span>Select Project Type</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {['Website', 'App', 'AI Solution', 'UI-UX', 'Other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`rounded-xl py-2 px-3 text-xs font-bold transition-all border ${
                            projectType === type
                              ? 'border-[#FF7A00] bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-sm'
                              : 'border-[#EFE7DC] bg-white text-[#4A4A4A] hover:border-[#FF7A00]/40'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Category / Industry
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      >
                        <option>Fintech / Banking</option>
                        <option>Healthcare & Biotech</option>
                        <option>E-Commerce & Retail</option>
                        <option>AI & SaaS Startup</option>
                        <option>Education & EdTech</option>
                        <option>Enterprise Software</option>
                        <option>Other Industry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Target Budget Range (Optional)
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      >
                        <option>&lt; $5,000 (Small Prototype)</option>
                        <option>$5,000 - $15,000 (Standard MVP)</option>
                        <option>$15,000 - $35,000 (Full Platform)</option>
                        <option>$35,000+ (Enterprise System)</option>
                      </select>
                    </div>
                  </div>

                  {/* Requirements Textarea */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Basic Requirement Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Outline key features, target deadline, integrations, or special tech preferences..."
                      className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                    />
                  </div>

                  {/* Personal Contact */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Vance"
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@startup.io"
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      />
                    </div>
                  </div>

                  {/* Estimation Preview Ribbon */}
                  <div className="flex items-center justify-between rounded-xl bg-[#F6F2EB] p-3.5 border border-[#EFE7DC]">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-[#FF7A00]" />
                      <span className="text-xs font-semibold text-[#4A4A4A]">Rough Market Estimate:</span>
                    </div>
                    <span className="text-sm font-extrabold text-[#1A1A1A] bg-white px-3 py-1 rounded-lg border border-[#EFE7DC]">
                      {getRoughEstimate()}
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-saffron w-full py-3.5 rounded-xl text-sm uppercase tracking-wider font-extrabold flex items-center justify-center space-x-2"
                    >
                      <span>Submit Quote Request</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default GetQuoteModal;
