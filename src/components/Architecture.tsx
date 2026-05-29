import React, { useState } from 'react';
import { ARCHITECTURE_LAYERS, ArchLayer } from '../types';
import { Cpu, Terminal, ArrowRight, Settings, Radio, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Architecture({ id = "architecture" }: { id?: string }) {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('orchestration');

  const activeLayer = ARCHITECTURE_LAYERS.find(l => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[1];

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-[#080808]">
      
      {/* Background visual structural frames */}
      <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase font-black">// ARCHITECTURAL SPECIFICATION</span>
        <h2 className="font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
          LAYERED RUNTIME MODEL_
        </h2>
        <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs font-mono uppercase tracking-widest leading-relaxed">
          // Isolating core components into standard high-efficiency layers. Click any layer below to inspect the telemetry spec.
        </p>
      </div>

      {/* Main Grid: Interactive Diagram Left, Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
        
        {/* Left Side: Modular layered stack buttons representation (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block font-black mb-2">
              // CLASSIFIED STACK CONTROLS
            </span>

            <div className="flex flex-col gap-2.5">
              {ARCHITECTURE_LAYERS.map((layer, idx) => {
                const isSelected = selectedLayerId === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`group relative flex flex-col sm:flex-row items-center justify-between p-4 px-5 rounded-none border text-left transition-all duration-300 cursor-pointer ${isSelected ? 'border-brand-orange bg-brand-orange/5 text-white shadow-md' : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-[#111] text-slate-400'}`}
                  >
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`h-6 w-6 font-mono text-[10px] rounded-none border flex items-center justify-center font-black ${isSelected ? 'border-brand-orange text-brand-orange' : 'border-white/10 text-white/40 bg-white/5'}`}>
                        0{idx + 1}
                      </span>
                      <div>
                        <p className={`font-bold uppercase tracking-wide text-sm ${isSelected ? 'text-white' : 'text-white group-hover:text-brand-orange'}`}>
                          {layer.name}
                        </p>
                        <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1 max-w-md line-clamp-1">
                          {layer.short}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-3 sm:mt-0 font-mono text-[9px] uppercase font-black">
                      <span className={`px-2 py-0.5 rounded-none border ${isSelected ? 'border-brand-orange bg-brand-orange/15 text-brand-orange' : 'border-white/10 bg-black text-white/50'}`}>
                        {layer.tech.split(',')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architecture core values badges */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-[10px] font-mono leading-relaxed text-white/50 font-semibold">
            <div className="p-4 rounded-none bg-black border border-white/10">
              <span className="text-brand-orange block font-black uppercase tracking-wider mb-1">⚡ STREAMING_FIRST</span>
              Outputs streamed in real time via secure parallel endpoints.
            </div>
            <div className="p-4 rounded-none bg-black border border-white/10">
              <span className="text-brand-orange block font-black uppercase tracking-wider mb-1">🔄 STATELESS</span>
              Isolate jobs cleanly with stateless, secure workspace workers.
            </div>
            <div className="p-4 rounded-none bg-black border border-white/10">
              <span className="text-brand-orange block font-black uppercase tracking-wider mb-1">🔑 VAULT SECURE</span>
              Credentials secured with hardware isolation levels.
            </div>
          </div>
        </div>

        {/* Right Side: Elegant Selected Layer Panel (5 Columns) */}
        <div className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col justify-between rounded-none border border-white/10 bg-[#0a0a0a] p-6 md:p-8 relative overflow-hidden"
            >
              {/* Vertical side color strip matching selecting layer color */}
              <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-brand-orange" />

              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#F5F5F5]/40">// ACTIVE LAYER DEFINITIONS:</span>
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mt-1">
                    {activeLayer.name}
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-brand-orange mt-1">
                    [TECH] // <span className="text-white font-bold">{activeLayer.tech}</span>
                  </p>
                </div>

                <div className="border-t border-white/15 pt-5">
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white/40 block mb-3">// CORE LOGIC STATEMENTS</span>
                  <ul className="space-y-3 text-xs text-white/50">
                    {activeLayer.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-[11px] font-mono uppercase tracking-wider">
                        <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                        <span className="leading-relaxed text-white/70">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Micro diagnostic console block */}
              <div className="pt-6 border-t border-white/15 space-y-2 mt-6 font-mono">
                <div className="flex items-center justify-between text-[9px] text-[#F5F5F5]/40 font-black">
                  <span>TELEMETRY STAGE LINK:</span>
                  <span className="text-brand-orange flex items-center gap-1 font-black">
                    <span className="h-1.5 w-1.5 bg-brand-orange animate-pulse" />
                    LIVE PORT 3000
                  </span>
                </div>
                <div className="rounded-none bg-black p-3 text-[10px] leading-relaxed text-white/65 block border border-white/10">
                  <p className="text-white/30 block mb-1">// Route execution response query trace:</p>
                  <p className="text-brand-orange font-bold uppercase">GET /api/v1/sandbox/telemetry/probe</p>
                  <p className="text-white tracking-widest font-bold">200 NATIVE_OK — 18ms latency</p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
