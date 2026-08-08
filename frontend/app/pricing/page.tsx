'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check, HelpCircle } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PricingCalculator } from '@/components/forms/PricingCalculator';
import { pricingService } from '@/services/api';
import { PricingTier } from '@/types';

export default function PricingPage() {
  const { data: tiers, isLoading } = useQuery<PricingTier[]>({
    queryKey: ['pricing_tiers_page'],
    queryFn: () => pricingService.listTiers(),
  });

  // Fallback pricing tiers if DB connection is offline
  const fallbackTiers: PricingTier[] = [
    {
      id: 1,
      name: 'Startup Acceleration',
      slug: 'startup-acceleration',
      cost: '$1,999',
      billing_cycle: 'month',
      short_description: 'Ideal for early-stage companies needing high-end software architecture consulting and prototype building.',
      features: [
        'Dedicated Technical Architect (5 hrs/week)',
        'Cloud Infrastructure Review & Security Audits',
        'CI/CD Pipeline Setup & Best Practices',
        '24/7 Server Health Monitoring alerts',
        'Slack & Email Developer Support (24h response)'
      ],
      is_featured: false,
      order: 1,
      is_active: true,
      created_at: ''
    },
    {
      id: 2,
      name: 'Enterprise Transformation',
      slug: 'enterprise-transformation',
      cost: '$4,999',
      billing_cycle: 'month',
      short_description: 'Full-scale design, engineering, and maintenance for mid-market and enterprise platforms.',
      features: [
        'Dedicated Engineering Team (20 hrs/week)',
        'Custom AI Integration & Model Fine-Tuning',
        'Kubernetes Clustering & Multi-Cloud Setup',
        'SOC 2 Compliance Readiness Checks',
        'Dedicated Account Manager & 4-Hour Support SLA',
        'Weekly Standups & Milestone Reviews'
      ],
      is_featured: true,
      order: 2,
      is_active: true,
      created_at: ''
    },
    {
      id: 3,
      name: 'Custom Strategy',
      slug: 'custom-strategy',
      cost: 'Custom',
      billing_cycle: 'project',
      short_description: 'Bespoke software development, dedicated full-time engineering pods, and custom SLA agreements.',
      features: [
        'Dedicated Full-Time Developers & Tech Lead',
        'On-Premise or Private Cloud Deployment',
        '24/7/365 Dedicated SRE On-Call Team',
        'Full Intellectual Property Rights Transfer',
        'HIPAA / GDPR / SOC 2 Audits & Compliance Integration'
      ],
      is_featured: false,
      order: 3,
      is_active: true,
      created_at: ''
    }
  ];

  const displayedTiers = tiers && tiers.length > 0 ? tiers : fallbackTiers;

  const scrollToCalculator = () => {
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      {/* 1. Header Banner */}
      <section className="relative py-20 overflow-hidden border-b border-[rgba(197,168,128,0.1)]">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">Transparent Engagement</span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            Timeless Packages, Elastic Value
          </h1>
          <p className="text-sm text-muted max-w-xl mx-auto leading-relaxed">
            Select a baseline engineering tier or use our custom calculator tool below to adjust developers, storage scale, and compliance parameters dynamically.
          </p>
        </div>
      </section>

      {/* 2. Core Columns Layout */}
      <section className="py-24 bg-[#060608]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="h-10 w-10 animate-spin rounded-full border border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {displayedTiers.map((tier) => {
                return (
                  <div
                    key={tier.id}
                    className={`glass-panel rounded-xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                      tier.is_featured 
                        ? 'border-2 border-primary/50 shadow-[0_0_30px_rgba(197,168,128,0.1)] bg-[rgba(197,168,128,0.02)] scale-102 z-10' 
                        : 'border border-[rgba(197,168,128,0.15)] bg-card-bg'
                    }`}
                  >
                    {tier.is_featured && (
                      <div className="absolute top-4 right-4 bg-gold-gradient text-background text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                        Most Popular
                      </div>
                    )}
                    
                    {/* Header */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold tracking-wide text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted min-h-12 leading-relaxed">{tier.short_description}</p>
                      
                      <div className="flex items-baseline space-x-1.5 pt-2 border-b border-[rgba(197,168,128,0.08)] pb-6">
                        <span className="text-4xl font-extrabold text-foreground tracking-tight font-mono">{tier.cost}</span>
                        <span className="text-xs text-muted">/ {tier.billing_cycle}</span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3.5 pt-6 text-xs text-muted">
                        {tier.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5">
                            <Check className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                            <span className="leading-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button */}
                    <div className="pt-8">
                      <button
                        onClick={scrollToCalculator}
                        className={`w-full py-3.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          tier.is_featured
                            ? 'bg-gold-gradient text-background hover:shadow-[0_0_20px_rgba(197,168,128,0.3)]'
                            : 'border border-[rgba(197,168,128,0.25)] text-primary hover:border-primary hover:bg-[rgba(197,168,128,0.04)]'
                        }`}
                      >
                        Acquire Tier Proposal
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. Estimator Section */}
      <section id="estimator" className="py-24 border-t border-[rgba(197,168,128,0.1)] bg-[#040406] scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-primary">Elastic Budgeting</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Configure Custom Resources</h2>
            <p className="text-xs text-muted">
              Select technical staffing size, pipeline memory bandwidth scales, and continuous on-call support parameters to generate a custom proposal.
            </p>
          </div>

          <PricingCalculator />
        </div>
      </section>
    </PageWrapper>
  );
}
