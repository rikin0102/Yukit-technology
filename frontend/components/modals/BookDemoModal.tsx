'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle, Sparkles, Send, ArrowRight } from 'lucide-react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceTopic: 'Software Development',
    preferredDate: '',
    preferredTime: '10:00 AM',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto reset after 4s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl rounded-2xl bg-[#FDFBF7] p-6 sm:p-8 shadow-2xl border border-[#EFE7DC] perspective-1000"
          >
            {/* Close Button */}
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
                <h3 className="text-2xl font-extrabold text-[#1A1A1A]">Demo Session Requested!</h3>
                <p className="mt-2 text-sm text-[#4A4A4A]">
                  Thank you, <span className="font-semibold text-[#1A1A1A]">{formData.name}</span>. Our tech solutions expert will reach out shortly to confirm your schedule.
                </p>
              </motion.div>
            ) : (
              <div>
                {/* Modal Header */}
                <div className="mb-6 flex items-center space-x-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-md shadow-[#FF7A00]/25">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Book a Product Demo</h2>
                    <p className="text-xs text-[#71717A]">Schedule a 1-on-1 consultation with our engineering team</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Solution Interest
                      </label>
                      <select
                        value={formData.serviceTopic}
                        onChange={(e) => setFormData({ ...formData, serviceTopic: e.target.value })}
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      >
                        <option>Software Development</option>
                        <option>Web Development</option>
                        <option>Mobile App Development</option>
                        <option>AI Development & ML</option>
                        <option>UI/UX Design</option>
                        <option>Startup Full Suite</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1 flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5 text-[#FF7A00]" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1 flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-[#FF7A00]" />
                        <span>Time Slot</span>
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                      >
                        <option>09:00 AM EST</option>
                        <option>11:00 AM EST</option>
                        <option>02:00 PM EST</option>
                        <option>04:00 PM EST</option>
                        <option>06:00 PM EST</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Project Notes / Special Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Briefly describe what you'd like us to focus on during the demo..."
                      className="w-full rounded-xl border border-[#EFE7DC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] placeholder-[#71717A]/50 focus:border-[#FF7A00] focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-saffron w-full py-3.5 rounded-xl text-sm uppercase tracking-wider font-extrabold flex items-center justify-center space-x-2"
                    >
                      <span>Confirm & Book Demo</span>
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
export default BookDemoModal;
