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
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              AGEN<span className="text-brand-orange text-sm font-semibold ml-0.5 lowercase tracking-normal">workplace</span>
            </span>
            <span className="ml-2 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-bold tracking-wider text-emerald-400 uppercase border border-emerald-500/20">
              Active
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onScrollToSection('sandbox')}
            className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Agent Builder
          </button>
          <button
            onClick={() => onScrollToSection('features')}
            className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Key Features
          </button>
          <button
            onClick={() => onScrollToSection('architecture')}
            className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-brand-orange cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => onScrollToSection('benchmarks')}
            className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Comparisons
          </button>
          <button
            onClick={() => onScrollToSection('pricing')}
            className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-brand-orange cursor-pointer"
          >
            Pricing Plans
          </button>
          <button
            onClick={() => onScrollToSection('projections')}
            className="text-[10px] font-sans font-bold text-brand-orange hover:text-[#ff9d54] cursor-pointer flex items-center gap-1.5 bg-brand-orange/5 px-2.5 py-1 rounded-none border border-brand-orange/20 uppercase tracking-wider"
          >
            <span>Interactive Simulator</span>
            <span className="h-1.5 w-1.5 bg-brand-orange animate-pulse" />
          </button>
        </nav>

        {/* Action button & Status */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 rounded-none bg-emerald-500/5 border border-emerald-500/20 px-3 py-1 text-[10px] uppercase font-sans font-semibold text-emerald-400 tracking-wider">
            <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
            <span>Platform Online</span>
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

