'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, AlertTriangle, Loader2, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { inquiryService } from '@/services/api';

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

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  countryCode: z.string(),
  phoneNumber: z.string().min(6, { message: 'Phone number is required.' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Project details must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      countryCode: '+91',
      phoneNumber: '',
      company: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      const fullPhone = `${data.countryCode} ${data.phoneNumber}`.trim();
      return inquiryService.create({
        name: data.name,
        email: data.email,
        company: data.company || '',
        phone: fullPhone,
        message: data.message,
      });
    },
    onSuccess: () => {
      setSuccess(true);
      reset();
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="relative w-full">
      {/* Background Soft Glow Effect behind form */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#C96A00]/20 via-[#D4A017]/15 to-[#1E1B4B]/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

      {/* UNIQUE ASYMMETRICAL FLOATING PANEL DESIGN */}
      <div className="relative rounded-3xl border border-[#EADBCE] border-l-4 border-l-[#C96A00] p-6 sm:p-8 md:p-10 w-full bg-white shadow-[0_25px_60px_-15px_rgba(201,106,0,0.15)] overflow-hidden">
        
        {/* Top Gradient Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1E1B4B] via-[#C96A00] to-[#D4A017]" />

        <div className="mb-6 space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#C96A00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Inquiry Panel</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E1B4B] tracking-tight">
            Project Parameters
          </h3>
          <p className="text-xs sm:text-sm text-[#1F2937]/70">
            Fill in your requirements below to get started with our engineering team.
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 shadow-sm">
              <CheckCircle2 className="h-10 w-10 stroke-[1.75]" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-[#1E1B4B]">Message Sent Successfully!</h3>
            <p className="text-xs sm:text-sm text-[#1F2937]/70 max-w-sm leading-relaxed">
              Thank you for reaching out. We have received your project details and our team in Ahmedabad will respond within 1 business day.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-[#C96A00] hover:text-[#D4A017] underline cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F2937]/70">
                  Your Name <span className="text-[#C96A00]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="Rikin Patel"
                  className="w-full rounded-xl border border-[#EADBCE] bg-[#FFF8F0]/60 px-4 py-3 text-sm text-[#1E1B4B] focus:bg-white focus:border-[#C96A00] focus:ring-2 focus:ring-[#C96A00]/20 focus:outline-none transition-all shadow-xs"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertTriangle className="h-3.5 w-3.5 mr-1 shrink-0" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F2937]/70">
                  Email Address <span className="text-[#C96A00]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="rikinp0102@gmail.com"
                  className="w-full rounded-xl border border-[#EADBCE] bg-[#FFF8F0]/60 px-4 py-3 text-sm text-[#1E1B4B] focus:bg-white focus:border-[#C96A00] focus:ring-2 focus:ring-[#C96A00]/20 focus:outline-none transition-all shadow-xs"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertTriangle className="h-3.5 w-3.5 mr-1 shrink-0" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Phone with Country Code & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone Number with Country Code */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F2937]/70">
                  Phone Number <span className="text-[#C96A00]">*</span>
                </label>
                <div className="flex rounded-xl border border-[#EADBCE] bg-[#FFF8F0]/60 focus-within:bg-white focus-within:border-[#C96A00] focus-within:ring-2 focus-within:ring-[#C96A00]/20 transition-all overflow-hidden shadow-xs">
                  {/* Country Code Select */}
                  <select
                    {...register('countryCode')}
                    className="bg-[#FFF8F0] border-r border-[#EADBCE] px-2.5 py-3 text-xs font-bold text-[#1E1B4B] focus:outline-none cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  {/* Number Input */}
                  <input
                    id="phone"
                    type="tel"
                    {...register('phoneNumber')}
                    placeholder="9723251252"
                    className="w-full px-3 py-3 text-sm text-[#1E1B4B] bg-transparent focus:outline-none"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertTriangle className="h-3.5 w-3.5 mr-1 shrink-0" />
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label htmlFor="company" className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F2937]/70">
                  Company Name
                </label>
                <input
                  id="company"
                  type="text"
                  {...register('company')}
                  placeholder="Yukti Technologies"
                  className="w-full rounded-xl border border-[#EADBCE] bg-[#FFF8F0]/60 px-4 py-3 text-sm text-[#1E1B4B] focus:bg-white focus:border-[#C96A00] focus:ring-2 focus:ring-[#C96A00]/20 focus:outline-none transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Row 3: Project Details / Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F2937]/70">
                Project Details <span className="text-[#C96A00]">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message')}
                placeholder="Provide details about your project scope, target deadline, or technical requirements..."
                className="w-full rounded-xl border border-[#EADBCE] bg-[#FFF8F0]/60 px-4 py-3 text-sm text-[#1E1B4B] focus:bg-white focus:border-[#C96A00] focus:ring-2 focus:ring-[#C96A00]/20 focus:outline-none transition-all resize-none shadow-xs"
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1 shrink-0" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="button-premium w-full bg-gradient-to-r from-[#C96A00] to-[#D4A017] text-white font-bold tracking-wider uppercase text-xs py-4 px-6 rounded-xl hover:shadow-[0_6px_25px_rgba(201,106,0,0.35)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer shadow-md"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Submitting Project Parameters...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 stroke-[2]" />
                  <span>Submit Details</span>
                </>
              )}
            </button>

            {mutation.isError && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-xs flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Submission failed: {mutation.error.message || 'Server error. Please check details and try again.'}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
