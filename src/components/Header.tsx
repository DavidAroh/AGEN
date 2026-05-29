import React, { useState } from 'react';
import { Cpu, Zap, Radio, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onLaunchSandbox: () => void;
}

export function Header({ onScrollToSection, onLaunchSandbox }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsOpen(false);
  };

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
            className="hidden sm:inline-flex relative items-center gap-1.5 justify-center rounded-none bg-brand-orange hover:bg-white text-black px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-black stroke-black" />
            Create Agent
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center h-9 w-9 border border-white/15 bg-black/40 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-white/10 bg-[#050505] overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6 border-t border-white/10">
              <button
                onClick={() => handleNavClick('sandbox')}
                className="text-left text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-brand-orange py-2 transition-colors cursor-pointer"
              >
                Agent Builder
              </button>
              <button
                onClick={() => handleNavClick('features')}
                className="text-left text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-brand-orange py-2 transition-colors cursor-pointer"
              >
                Key Features
              </button>
              <button
                onClick={() => handleNavClick('architecture')}
                className="text-left text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-brand-orange py-2 transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick('benchmarks')}
                className="text-left text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-brand-orange py-2 transition-colors cursor-pointer"
              >
                Comparisons
              </button>
              <button
                onClick={() => handleNavClick('pricing')}
                className="text-left text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-brand-orange py-2 transition-colors cursor-pointer"
              >
                Pricing Plans
              </button>
              <button
                onClick={() => handleNavClick('projections')}
                className="text-left text-[11px] font-sans font-bold text-brand-orange hover:text-[#ff9d54] cursor-pointer flex items-center justify-between bg-brand-orange/5 px-2.5 py-1.5 rounded-none border border-brand-orange/20 uppercase tracking-wider whitespace-nowrap"
              >
                <span>Interactive Simulator</span>
                <span className="h-2 w-2 bg-brand-orange animate-pulse" />
              </button>

              {/* Promo mobile-only Action button inside dropdown */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLaunchSandbox();
                }}
                className="sm:hidden mt-2 relative flex items-center gap-1.5 justify-center rounded-none bg-brand-orange hover:bg-white text-black px-4 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 w-full"
              >
                <Zap className="h-4 w-4 fill-black stroke-black" />
                Create Agent
              </button>

              <div className="flex items-center gap-2 justify-center border-t border-white/5 pt-4 text-[10px] uppercase font-sans font-semibold text-emerald-400 tracking-wider">
                <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
                <span>Platform Online</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

