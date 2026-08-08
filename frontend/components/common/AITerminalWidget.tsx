'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, ShieldCheck, Zap, Play, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export const AITerminalWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inference' | 'vectors' | 'cluster'>('inference');
  const [typedText, setTypedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Initializing Yukti AI Core Engine v4.8.2...',
    '[GPU] Loaded Tensor Core acceleration (CUDA 12.4 active)',
    '[VECTOR] Connected to pgvector cluster (2.4M 1536-dim embeddings)',
    '[API] FastAPI server ready on http://127.0.0.1:8000 (0.8ms warmup)',
  ]);

  const scriptCode = `import { YuktiAI, VectorSearch } from '@yukti/ai';

const agent = new YuktiAI.Agent({
  model: 'DeepLlama-3-Enterprise-70B',
  temperature: 0.1,
  memory: new VectorSearch({ topK: 5 }),
});

const response = await agent.execute({
  prompt: 'Synthesize real-time financial anomaly streams',
  stream: true,
});
// Status: 200 OK | Latency: 7.2ms | Tokens: 4,920/s`;

  // Typing animation effect for the code snippet
  useEffect(() => {
    let index = 0;
    setTypedText('');
    const timer = setInterval(() => {
      if (index < scriptCode.length) {
        setTypedText(scriptCode.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [activeTab]);

  const handleRunDemo = (actionName: string) => {
    setIsProcessing(true);
    const newLog = `[ACTION] Triggered ${actionName} execution at ${new Date().toLocaleTimeString()}`;
    setLogs((prev) => [...prev.slice(-3), newLog, `[SUCCESS] Output generated in 4.2ms | Memory: 32MB`]);
    setTimeout(() => {
      setIsProcessing(false);
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-2xl border border-[#D4A017]/30 bg-[#1E1B4B] text-[#FFF8F0] shadow-[0_25px_60px_-15px_rgba(30,27,75,0.4)] overflow-hidden font-sans select-none"
    >
      {/* Top Holographic Cyber Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#151336] border-b border-[#D4A017]/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <div className="pl-2 text-[11px] font-mono font-bold text-[#D4A017] tracking-wider flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#C96A00]" />
            <span>yukti-ai-core@v4.8.2:~/engine</span>
          </div>
        </div>

        {/* Live System Indicator */}
        <div className="flex items-center space-x-2 text-[10px] font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold uppercase tracking-wider">LIVE AI NODE</span>
        </div>
      </div>

      {/* Console Tab Selector */}
      <div className="flex items-center bg-[#181540] border-b border-[#D4A017]/15 px-3 py-1.5 space-x-2 text-[11px] font-mono">
        <button
          onClick={() => setActiveTab('inference')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'inference'
              ? 'bg-[#C96A00] text-white font-bold shadow-xs'
              : 'text-[#FFF8F0]/60 hover:text-[#FFF8F0] hover:bg-white/5'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>AI Inference</span>
        </button>

        <button
          onClick={() => setActiveTab('vectors')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'vectors'
              ? 'bg-[#C96A00] text-white font-bold shadow-xs'
              : 'text-[#FFF8F0]/60 hover:text-[#FFF8F0] hover:bg-white/5'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>pgvector Index</span>
        </button>

        <button
          onClick={() => setActiveTab('cluster')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
            activeTab === 'cluster'
              ? 'bg-[#C96A00] text-white font-bold shadow-xs'
              : 'text-[#FFF8F0]/60 hover:text-[#FFF8F0] hover:bg-white/5'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Cluster Metrics</span>
        </button>
      </div>

      {/* Main Terminal Viewport */}
      <div className="p-5 font-mono text-xs space-y-4 bg-[#141233] min-h-[220px]">
        {/* Live Code Box */}
        <div className="relative p-4 rounded-xl bg-[#0E0C26] border border-[#D4A017]/20 font-mono text-[11px] leading-relaxed text-slate-200 overflow-x-auto shadow-inner">
          <div className="absolute top-2 right-3 text-[9px] font-mono text-[#D4A017] uppercase tracking-widest flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#C96A00]" />
            <span>Real-time Execution</span>
          </div>

          <pre className="whitespace-pre-wrap font-mono">
            <code>
              {typedText}
              <span className="inline-block w-2 h-4 bg-[#C96A00] ml-0.5 animate-pulse align-middle" />
            </code>
          </pre>
        </div>

        {/* Live Logs Stream */}
        <div className="space-y-1.5 text-[10px] text-slate-300 font-mono pt-1">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center space-x-2">
              <span className="text-[#C96A00] font-bold">›</span>
              <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : ''}>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Cyber Toolbar Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-[#151336] border-t border-[#D4A017]/20 gap-3 text-[11px]">
        <div className="flex items-center space-x-4 text-[10px] font-mono text-[#FFF8F0]/80">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>JWT Gated</span>
          </span>
          <span className="flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>7.2ms Latency</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1565C0]" />
            <span>99.99% Uptime</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleRunDemo('Vector Query')}
            disabled={isProcessing}
            className="px-3 py-1.5 rounded-lg bg-[#C96A00] hover:bg-[#D4A017] text-white font-bold text-[10px] uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isProcessing ? 'Processing...' : 'Run Pipeline'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AITerminalWidget;
