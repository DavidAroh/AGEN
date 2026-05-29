import React from 'react';
import { Cpu, Heart } from 'lucide-react';

export function Footer({ onScrollToSection }: { onScrollToSection: (sectionId: string) => void }) {
  return (
    <footer className="bg-[#030303] border-t border-white/10 py-12 text-xs text-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-none border border-brand-orange bg-[#030303] flex items-center justify-center">
              <span className="text-[10px] text-brand-orange font-black">●</span>
            </div>
            <div>
              <span className="font-display text-base font-black tracking-widest text-white">AGEN_</span>
              <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest mt-1">Autonomous generalist agent runtime platform.</p>
            </div>
          </div>

          {/* Nav references */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-widest">
            <button
              onClick={() => onScrollToSection('sandbox')}
              className="text-white/60 hover:text-brand-orange transition-colors cursor-pointer"
            >
              // Interactive Sandbox
            </button>
            <button
              onClick={() => onScrollToSection('features')}
              className="text-white/60 hover:text-brand-orange transition-colors cursor-pointer"
            >
              // Feature Matrix
            </button>
            <button
              onClick={() => onScrollToSection('architecture')}
              className="text-white/60 hover:text-brand-orange transition-colors cursor-pointer"
            >
              // System Layer
            </button>
            <button
              onClick={() => onScrollToSection('benchmarks')}
              className="text-white/60 hover:text-brand-orange transition-colors cursor-pointer"
            >
              // Alignment
            </button>
            <button
              onClick={() => onScrollToSection('pricing')}
              className="text-white/60 hover:text-brand-orange transition-colors cursor-pointer"
            >
              // Subscription Tiers
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[9px] font-mono uppercase tracking-widest">
          <div className="space-y-1">
            <p className="text-white font-bold text-[10px]">© 2026 AGEN. All rights reserved.</p>
            <p className="text-[#555] tracking-widest">Subject to local legal stipulations. Strictly Confidential Product Specification.</p>
          </div>

          <div className="flex items-center gap-2 text-white/30">
            <span>Powered by google-deepmind AI</span>
            <div className="h-1.5 w-1.5 bg-brand-orange" />
            <span>Built at High Fidelity standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
