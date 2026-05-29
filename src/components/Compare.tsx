import React from 'react';
import { COMPETITORS } from '../types';
import { ShieldCheck, AlertCircle, Sparkles, Check } from 'lucide-react';

export function Compare({ id = "benchmarks" }: { id?: string }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-[#050505]">
      
      {/* Background visual structural frames */}
      <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase font-black">// MARKET BOUNDARY AUDIT</span>
        <h2 className="font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl mt-2">
          THE AGEN COMPARATIVE METRIC_
        </h2>
        <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs font-mono uppercase tracking-widest leading-relaxed">
          // While incumbents restrict your workflows or mandate nested code config, AGEN delegates tools and model orchestration smoothly.
        </p>
      </div>

      {/* Comparison Grid Board */}
      <div className="max-w-6xl mx-auto overflow-x-auto rounded-none border border-white/10 bg-black shadow-2xl block">
        <table className="w-full min-w-[700px] border-collapse text-left text-xs md:text-sm font-mono">
          <thead>
            <tr className="border-b border-white/10 bg-black text-[10px] uppercase tracking-wider font-black">
              <th className="p-4 md:p-5 font-display text-sm font-black text-white max-w-xs">// COMPETITOR PLATFORM</th>
              <th className="p-4 md:p-5 text-white/40">STRENGTH SPEC</th>
              <th className="p-4 md:p-5 text-white/40">LIMITATION AUDIT</th>
              <th className="p-4 md:p-5 font-display text-sm font-black text-brand-orange bg-brand-orange/10">★ AGEN COMPLIANCE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 uppercase tracking-wide text-[11px] text-white/70">
            {COMPETITORS.map((comp, index) => (
              <tr key={index} className="transition-colors hover:bg-white/[0.02]">
                {/* Competitor Name */}
                <td className="p-4 md:p-5 font-display font-black text-white max-w-xs">
                  {comp.competitor}
                </td>
                
                {/* Strengths */}
                <td className="p-4 md:p-5 leading-relaxed">
                  <div className="flex items-start gap-2 max-w-xs text-white/60">
                    <ShieldCheck className="h-4 w-4 text-[#ddd] shrink-0 mt-0.5" />
                    <span>{comp.strengths}</span>
                  </div>
                </td>

                {/* Weaknesses */}
                <td className="p-4 md:p-5 leading-relaxed text-white/35">
                  <div className="flex items-start gap-2 max-w-xs">
                    <AlertCircle className="h-4 w-4 text-[#c00] shrink-0 mt-0.5" />
                    <span>{comp.weaknesses}</span>
                  </div>
                </td>

                {/* AGEN Advantage */}
                <td className="p-4 md:p-5 bg-brand-orange/5 font-bold leading-relaxed max-w-xs border-l border-white/5">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-white">{comp.advantage}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trust summary tag line */}
      <p className="text-center text-[9px] font-mono text-white/30 tracking-widest uppercase mt-6">
        * Comparative metrics compiled directly from initial product requirement research and industry user trial logs.
      </p>

    </section>
  );
}
