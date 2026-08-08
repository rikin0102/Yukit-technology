'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, CheckCircle2, AlertTriangle, Calculator, Cpu, Shield, Sparkles, Cloud } from 'lucide-react';
import { pricingService } from '@/services/api';

const pricingCalculatorSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid corporate email.' }),
  company: z.string().min(1, { message: 'Company name is required.' }),
  requirements: z.string().min(10, { message: 'Please summarize requirements in at least 10 characters.' }),
});

type CalculatorFormValues = z.infer<typeof pricingCalculatorSchema>;

export const PricingCalculator: React.FC = () => {
  // Calculator parameter states
  const [developers, setDevelopers] = useState(2); // 1 to 10
  const [dataScale, setDataScale] = useState(1); // 1 to 10 TB
  const [complexity, setComplexity] = useState(2); // 1 to 5

  // Options
  const [soc2, setSoc2] = useState(false);
  const [sla247, setSla247] = useState(false);
  const [multiCloud, setMultiCloud] = useState(false);

  // Computed Estimate Price
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Arithmetic logic to compute price estimate
    const base = 1500;
    const devCost = developers * 900;
    const dataCost = dataScale * 250;
    const complexityCost = complexity * 600;
    
    let optionsCost = 0;
    if (soc2) optionsCost += 1200;
    if (sla247) optionsCost += 1500;
    if (multiCloud) optionsCost += 2000;

    setEstimatedPrice(base + devCost + dataCost + complexityCost + optionsCost);
  }, [developers, dataScale, complexity, soc2, sla247, multiCloud]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(pricingCalculatorSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      requirements: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: CalculatorFormValues) => {
      // Assemble data packet
      const submissionData = {
        ...formData,
        estimated_budget: `$${estimatedPrice.toLocaleString()}/month`,
        custom_configuration: {
          scale_developers: developers,
          scale_data_tb: dataScale,
          scale_complexity: complexity,
          option_soc2: soc2,
          option_sla247: sla247,
          option_multicloud: multiCloud,
        },
      };
      return pricingService.createInquiry(submissionData);
    },
    onSuccess: () => {
      setSuccess(true);
      reset();
    },
  });

  const onSubmit = (data: CalculatorFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Left side: The sliders & interactive adjustments */}
      <div className="lg:col-span-7 glass-panel rounded-xl p-8 space-y-8">
        <div className="flex items-center space-x-3 pb-4 border-b border-[rgba(197,168,128,0.08)]">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-[rgba(197,168,128,0.05)] text-primary">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-wide text-foreground">Interactive Cost Estimator</h3>
            <p className="text-xs text-muted">Customize resources to configure your team & infrastructure budget.</p>
          </div>
        </div>

        {/* Sliders container */}
        <div className="space-y-6">
          {/* Sliders 1: Developers */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-muted">
              <span>Dedicated Engineering Pod Size</span>
              <span className="text-primary font-mono">{developers} {developers === 1 ? 'Engineer' : 'Engineers'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={developers}
              onChange={(e) => setDevelopers(parseInt(e.target.value))}
              className="w-full accent-primary bg-secondary/80 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-[10px] text-muted">Allocated backend, cloud infrastructure & automation engineers.</p>
          </div>

          {/* Sliders 2: Data Scale */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-muted">
              <span>Target Data Ingestion Scale</span>
              <span className="text-primary font-mono">{dataScale} TB / month</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={dataScale}
              onChange={(e) => setDataScale(parseInt(e.target.value))}
              className="w-full accent-primary bg-secondary/80 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-[10px] text-muted">Monthly throughput of streaming data pipes & analytical lakehouse systems.</p>
          </div>

          {/* Sliders 3: Complexity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase font-bold tracking-wider text-muted">
              <span>Platform Complexity Tier</span>
              <span className="text-primary font-mono">Level {complexity} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={complexity}
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="w-full accent-primary bg-secondary/80 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-[10px] text-muted">Scale from simple database integrations (L1) to custom AI models & multi-agent systems (L5).</p>
          </div>
        </div>

        {/* Options container checkboxes */}
        <div className="pt-6 border-t border-[rgba(197,168,128,0.08)] space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-muted block mb-2">Add-on compliance & operational guarantees</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: SOC 2 */}
            <div
              onClick={() => setSoc2(!soc2)}
              className={`p-4 rounded border cursor-pointer flex flex-col justify-between h-24 transition-all duration-300 ${
                soc2 
                  ? 'border-primary bg-[rgba(197,168,128,0.05)] text-foreground' 
                  : 'border-[rgba(197,168,128,0.1)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(197,168,128,0.2)] text-muted'
              }`}
            >
              <Shield className={`h-5 w-5 ${soc2 ? 'text-primary' : 'text-muted'}`} />
              <div className="text-left mt-2">
                <p className="text-xs font-semibold text-foreground">SOC 2 Security</p>
                <p className="text-[10px] text-muted">HIPAA & SOC 2 compliance</p>
              </div>
            </div>

            {/* Box 2: SLA 24/7 */}
            <div
              onClick={() => setSla247(!sla247)}
              className={`p-4 rounded border cursor-pointer flex flex-col justify-between h-24 transition-all duration-300 ${
                sla247 
                  ? 'border-primary bg-[rgba(197,168,128,0.05)] text-foreground' 
                  : 'border-[rgba(197,168,128,0.1)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(197,168,128,0.2)] text-muted'
              }`}
            >
              <Cpu className={`h-5 w-5 ${sla247 ? 'text-primary' : 'text-muted'}`} />
              <div className="text-left mt-2">
                <p className="text-xs font-semibold text-foreground">24/7 SLA Support</p>
                <p className="text-[10px] text-muted">SRE on-call monitoring</p>
              </div>
            </div>

            {/* Box 3: Multi cloud */}
            <div
              onClick={() => setMultiCloud(!multiCloud)}
              className={`p-4 rounded border cursor-pointer flex flex-col justify-between h-24 transition-all duration-300 ${
                multiCloud 
                  ? 'border-primary bg-[rgba(197,168,128,0.05)] text-foreground' 
                  : 'border-[rgba(197,168,128,0.1)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(197,168,128,0.2)] text-muted'
              }`}
            >
              <Cloud className={`h-5 w-5 ${multiCloud ? 'text-primary' : 'text-muted'}`} />
              <div className="text-left mt-2">
                <p className="text-xs font-semibold text-foreground">Multi-Cloud Setup</p>
                <p className="text-[10px] text-muted">Failover replication</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Price Display & Form to request this budget */}
      <div className="lg:col-span-5 space-y-6">
        {/* Cost estimate layout */}
        <div className="glass-panel rounded-xl p-8 text-center space-y-4 border-2 border-primary/30 bg-[rgba(197,168,128,0.02)] relative overflow-hidden">
          {/* Subtle particle glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          
          <span className="text-xs uppercase font-bold tracking-wider text-muted">Estimated Consulting Cost</span>
          <div className="flex items-baseline justify-center space-x-1.5">
            <span className="text-4xl font-extrabold text-foreground tracking-tight font-mono">${estimatedPrice.toLocaleString()}</span>
            <span className="text-sm text-muted font-medium">/ month</span>
          </div>
          <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
            Estimate scales based on engineering pod members, bandwidth streams, and compliance audits.
          </p>
        </div>

        {/* Inquiry Form */}
        <div className="glass-panel rounded-xl p-8 space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-muted block mb-2 border-b border-[rgba(197,168,128,0.06)] pb-2">
            Secure this Budget
          </span>

          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="text-sm font-semibold text-foreground">Estimate Request Filed</p>
              <p className="text-xs text-muted max-w-xs leading-relaxed">
                Thank you! We have captured your estimator setup. A senior technical partner will email you detailed scoping documents.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[10px] uppercase tracking-wider text-primary font-bold hover:underline"
              >
                Reset Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
              {/* Name */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('name')}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
                {errors.name && (
                  <p className="text-[10px] text-red-400 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <input
                  type="email"
                  placeholder="Corporate Email"
                  {...register('email')}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-400 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Company Name"
                  {...register('company')}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
                {errors.company && (
                  <p className="text-[10px] text-red-400 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div className="space-y-1.5">
                <textarea
                  rows={3}
                  placeholder="Briefly state target systems (e.g. AI taging chatbot on GCP, Kafka to Snowflake data logs)..."
                  {...register('requirements')}
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none resize-none"
                />
                {errors.requirements && (
                  <p className="text-[10px] text-red-400 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {errors.requirements.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gold-gradient text-background font-bold tracking-wider uppercase text-[10px] py-3 rounded hover:shadow-[0_0_15px_rgba(197,168,128,0.25)] transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-background" />
                    <span>Transmitting Estimate...</span>
                  </>
                ) : (
                  <span>Request Form Proposal</span>
                )}
              </button>

              {mutation.isError && (
                <div className="p-3 rounded border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  <span>Transmit error: {mutation.error.message}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default PricingCalculator;
