import React from 'react';
import { Cpu, Zap, Radio } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onLaunchSandbox: () => void;
}

export function Header({ onScrollToSection, onLaunchSandbox }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center border border-brand-orange bg-[#050505] p-1">
            <Cpu className="h-4 w-4 text-brand-orange" />
            <div className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-brand-orange animate-ping" />
          </div>
          <div className="flex items-baseline">
            <span className="font-display text-xl font-black tracking-tighter uppercase italic text-white">
              AGEN<span className="text-brand-orange">_</span>
            </span>
            <span className="ml-1.5 bg-white/10 px-1 py-0.5 text-[8px] font-black uppercase tracking-wider text-white/60">
              v1.0
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onScrollToSection('sandbox')}
            className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Agent Sandbox
          </button>
          <button
            onClick={() => onScrollToSection('features')}
            className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => onScrollToSection('architecture')}
            className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Architecture
          </button>
          <button
            onClick={() => onScrollToSection('benchmarks')}
            className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Compare
          </button>
          <button
            onClick={() => onScrollToSection('pricing')}
            className="text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => onScrollToSection('projections')}
            className="text-[10px] font-mono font-bold text-brand-orange hover:text-[#ff9d54] cursor-pointer flex items-center gap-1.5 bg-brand-orange/5 px-2.5 py-1 rounded-none border border-brand-orange/20 uppercase tracking-wider"
          >
            <span>Revenue Simulator</span>
            <span className="h-1.5 w-1.5 bg-brand-orange animate-pulse" />
          </button>
        </nav>

        {/* Action button & Status */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 rounded-none bg-brand-orange/5 border border-brand-orange/20 px-3 py-1 text-[10px] uppercase font-mono text-brand-orange tracking-widest">
            <Radio className="h-3 w-3 animate-pulse" />
            <span>Node: Active</span>
          </div>
          <button
            onClick={onLaunchSandbox}
            className="relative inline-flex items-center gap-1.5 justify-center rounded-none bg-brand-orange hover:bg-white text-black px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-black stroke-black" />
            Create Agent
          </button>
        </div>
      </div>
    </header>
  );
}

