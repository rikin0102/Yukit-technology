'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Cpu,
  Clock,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Bot,
  FileSearch,
  TrendingUp,
  Layers,
  Code,
  Rocket,
  Headphones,
} from 'lucide-react';

interface MidSizeHighlightBoxProps {
  type: 'guarantee' | 'ai-showcase' | 'workflow' | 'cta';
  onOpenQuote?: (serviceType: string) => void;
}

export const MidSizeHighlightBox: React.FC<MidSizeHighlightBoxProps> = ({
  type,
  onOpenQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'rag' | 'doc' | 'forecast'>('rag');

  if (type === 'guarantee') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="my-14 w-full"
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-[#121215] via-[#1A1A22] to-[#0D0D10] p-6 sm:p-10 text-white shadow-2xl border border-[#FF7A00]/30 overflow-hidden group">
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-[#FF7A00]/15 blur-3xl pointer-events-none group-hover:bg-[#FF7A00]/25 transition-all duration-700" />
          <div className="absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-[#FF9933]/10 blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FF7A00]/20 text-[#FF9933] border border-[#FF7A00]/40">
                <Sparkles className="h-3 w-3" />
                <span>The Yukti Quality Standard</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Engineered for High Performance & Zero Compromise
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md leading-relaxed">
              Every digital asset built by Yukti Technologies undergoes rigorous performance tuning, security hardening, and scalability testing.
            </p>
          </div>

          {/* 4 Feature Columns Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl bg-white/5 backdrop-blur-md p-5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] flex items-center justify-center mb-4 shadow-md shadow-[#FF7A00]/30">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="text-xl font-black text-white">Sub-100ms</div>
              <div className="text-xs font-semibold text-[#FF9933] uppercase tracking-wider mb-2">API Latency</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Optimized SQL queries, Redis caching, and edge delivery for lightning speed.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-md p-5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] flex items-center justify-center mb-4 shadow-md shadow-[#FF7A00]/30">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div className="text-xl font-black text-white">Bank-Grade</div>
              <div className="text-xs font-semibold text-[#FF9933] uppercase tracking-wider mb-2">Security Standard</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                OAuth2, JWT authentication, RBAC authorization, and automated vulnerability scanning.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-md p-5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] flex items-center justify-center mb-4 shadow-md shadow-[#FF7A00]/30">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="text-xl font-black text-white">2-Week MVP</div>
              <div className="text-xs font-semibold text-[#FF9933] uppercase tracking-wider mb-2">Sprint Turnaround</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rapid iterative sprints delivering production-ready features every fortnight.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-md p-5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FF9933] flex items-center justify-center mb-4 shadow-md shadow-[#FF7A00]/30">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div className="text-xl font-black text-white">99.9% Uptime</div>
              <div className="text-xs font-semibold text-[#FF9933] uppercase tracking-wider mb-2">SLA Telemetry</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Proactive error monitoring, automatic backups, and cloud auto-scaling infrastructure.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'ai-showcase') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="my-14 w-full"
      >
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] p-6 sm:p-10 text-white shadow-2xl border border-indigo-500/30 overflow-hidden group">
          {/* Glowing Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/40">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>⭐ Yukti Core Differentiator</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Generative AI & Enterprise RAG Pipelines
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We turn unstructured company documents, PDFs, and database records into active, intelligent AI assistants capable of reasoning, answering queries, and executing workflow automations.
              </p>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setActiveTab('rag')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'rag'
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  RAG Document Q&A
                </button>
                <button
                  onClick={() => setActiveTab('doc')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'doc'
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  Doc Intelligence
                </button>
                <button
                  onClick={() => setActiveTab('forecast')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'forecast'
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF9933] text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  ML Sales Forecasting
                </button>
              </div>

              {onOpenQuote && (
                <div className="pt-3">
                  <button
                    onClick={() => onOpenQuote('AI Engine & RAG Integration')}
                    className="btn-saffron px-5 py-2.5 rounded-xl text-xs uppercase font-extrabold flex items-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <span>Request AI Consultation</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Interactive Simulator Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#090D16] border border-indigo-500/40 p-5 shadow-xl relative overflow-hidden font-mono">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3 mb-4 text-xs text-indigo-300">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-[#FF7A00]" />
                    <span className="font-semibold text-white">Yukti AI Terminal v2.4</span>
                  </div>
                  <span className="inline-flex items-center space-x-1.5 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Engine Active</span>
                  </span>
                </div>

                {activeTab === 'rag' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-200">
                      <span className="text-[#FF9933] font-bold">User Prompt:</span> "Analyze last quarter sales report PDF and highlight key growth drivers."
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 space-y-2">
                      <div className="flex items-center space-x-2 text-[11px] text-amber-400 font-bold">
                        <FileSearch className="h-3.5 w-3.5" />
                        <span>RAG Vector Search Completed (32ms)</span>
                      </div>
                      <p className="text-[11px] font-sans leading-relaxed text-slate-300">
                        Based on page 14 of <code className="bg-indigo-900/60 px-1 rounded text-amber-300">Q3_Report.pdf</code>, enterprise SaaS subscriptions grew by 42%. Vector similarity score: 0.94.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'doc' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-200">
                      <span className="text-[#FF9933] font-bold">Input:</span> Batch 150 scanned invoices & GST tax receipts.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 space-y-1.5">
                      <div className="text-[11px] text-emerald-400 font-bold flex items-center space-x-1.5">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>OCR & Entity Extraction Success</span>
                      </div>
                      <div className="text-[10px] text-slate-400 grid grid-cols-2 gap-2 pt-1 font-sans">
                        <div className="p-2 rounded bg-slate-950 border border-slate-800">
                          <div className="text-slate-400">Total Extracted:</div>
                          <div className="text-white font-bold">₹14,85,200</div>
                        </div>
                        <div className="p-2 rounded bg-slate-950 border border-slate-800">
                          <div className="text-slate-400">Accuracy Rate:</div>
                          <div className="text-emerald-400 font-bold">99.8%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'forecast' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-200">
                      <span className="text-[#FF9933] font-bold">Model:</span> Time-series XGBoost + LSTM Sales Predictor
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-amber-400 font-bold flex items-center space-x-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          <span>Q4 Predicted Revenue</span>
                        </span>
                        <span className="text-emerald-400 font-bold">+28.5% YoY</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#FF7A00] to-emerald-400 h-full w-[78%]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === 'workflow') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="my-14 w-full"
      >
        <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl border border-[#EFE7DC] overflow-hidden">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/25">
              <Layers className="h-3.5 w-3.5" />
              <span>Agile Execution Method</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Our 4-Step Engineering Delivery Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5A5A]">
              From concept blueprint to production deployment with complete transparency.
            </p>
          </div>

          {/* Stepper Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="relative rounded-2xl bg-[#FDFBF7] p-5 border border-[#EFE7DC] hover:border-[#FF7A00]/50 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#FF7A00] bg-[#FF7A00]/10 px-2.5 py-1 rounded-lg">
                  STEP 01
                </span>
                <Code className="h-5 w-5 text-[#FF7A00]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A] mb-1">Architecture Blueprint</h4>
              <p className="text-xs text-[#5A5A5A] leading-relaxed">
                Requirements scoping, DB schema design, tech stack selection, and UI wireframes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl bg-[#FDFBF7] p-5 border border-[#EFE7DC] hover:border-[#FF7A00]/50 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#FF7A00] bg-[#FF7A00]/10 px-2.5 py-1 rounded-lg">
                  STEP 02
                </span>
                <Zap className="h-5 w-5 text-[#FF7A00]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A] mb-1">Agile Sprint Slices</h4>
              <p className="text-xs text-[#5A5A5A] leading-relaxed">
                Rapid bi-weekly feature development with live staging previews and client feedback loops.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl bg-[#FDFBF7] p-5 border border-[#EFE7DC] hover:border-[#FF7A00]/50 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#FF7A00] bg-[#FF7A00]/10 px-2.5 py-1 rounded-lg">
                  STEP 03
                </span>
                <ShieldCheck className="h-5 w-5 text-[#FF7A00]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A] mb-1">Automated QA & Security</h4>
              <p className="text-xs text-[#5A5A5A] leading-relaxed">
                End-to-end integration tests, load stress testing, and vulnerability penetration checks.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative rounded-2xl bg-[#FDFBF7] p-5 border border-[#EFE7DC] hover:border-[#FF7A00]/50 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#FF7A00] bg-[#FF7A00]/10 px-2.5 py-1 rounded-lg">
                  STEP 04
                </span>
                <Rocket className="h-5 w-5 text-[#FF7A00]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A] mb-1">Deploy & Support</h4>
              <p className="text-xs text-[#5A5A5A] leading-relaxed">
                Zero-downtime CI/CD release, telemetry setup, full documentation handoff, and 24/7 SLAs.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Fallback: CTA Mid Box
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="my-14 w-full"
    >
      <div className="relative rounded-3xl bg-gradient-to-r from-[#FF7A00] via-[#FF8811] to-[#FF9933] p-8 sm:p-12 text-white shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-md">
              Accelerate Your Growth
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Turn Your Vision into a High-Performing Product?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Book a 1-on-1 strategy call with our lead engineers. We will analyze your architecture requirements and provide a free project estimate within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenQuote && onOpenQuote('Custom Architecture')}
              className="px-6 py-3.5 rounded-xl bg-white text-[#FF7A00] hover:bg-[#FDFBF7] font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="https://wa.me/918320473950"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/30 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <Headphones className="h-4 w-4" />
              <span>Instant Support</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MidSizeHighlightBox;
