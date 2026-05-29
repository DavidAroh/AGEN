import React from 'react';
import { Sparkles, Zap, ShieldCheck, ChevronRight, Cpu } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-24 pb-20 md:pt-32 md:pb-28 border-b border-white/10">
      {/* Decorative tactical lines instead of ambient glows */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
      <div className="absolute left-8 inset-y-0 w-[1px] bg-white/5 hidden xl:block" />
      <div className="absolute right-8 inset-y-0 w-[1px] bg-white/5 hidden xl:block" />
      
      {/* Dynamic Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
        
        {/* Core Product Badge Tagline */}
        <div className="inline-flex items-center gap-2 border border-brand-orange/40 bg-brand-orange/5 px-4 py-1.5 text-[10px] uppercase font-sans font-bold tracking-wider text-brand-orange rounded-none">
          <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
          <span>Intelligent AI Coworkers</span>
        </div>

        {/* Master Heading Grid */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05] uppercase">
            Build Dedicated AI Assistants <br />
            For <span className="text-brand-orange">Your Daily Work</span>
          </h1>
          <div className="h-1 w-24 bg-brand-orange mx-auto font-sans" />
          <p className="font-sans text-xs font-semibold text-white/80 tracking-widest uppercase">
            // automate repetitive tasks & save hours every single day
          </p>
        </div>

        {/* Core Description Copy */}
        <p className="max-w-2xl mx-auto text-base text-white/70 tracking-wide leading-relaxed font-sans mt-4">
          Create powerful digital helpers using plain English. Teach them to search the web, write drafts, answer emails, update sheets, and run your business workflows seamlessly without touching a line of code.
        </p>

        {/* Dynamic Interactive Call to Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onScrollToSection('sandbox')}
            className="group relative inline-flex items-center gap-2 rounded-none bg-brand-orange hover:bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-black stroke-black" />
            Launch Agent Sandbox
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => onScrollToSection('features')}
            className="rounded-none border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer"
          >
            Explore Features
          </button>
        </div>

        {/* Trust Badging / Architectural Pillars */}
        <div className="pt-16 max-w-5xl mx-auto">
          <p className="text-[9px] font-sans tracking-[0.2em] text-white/40 uppercase font-bold">
            // Supported Connections & Intelligent Engines
          </p>
          
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 text-center items-center justify-center">
            <div className="border border-white/10 rounded-none bg-black/50 px-4 py-3.5 flex items-center justify-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-brand-orange" />
              <span className="font-sans text-[10px] font-bold uppercase text-white/70 tracking-wider">Anthropic Claude</span>
            </div>
            <div className="border border-white/10 rounded-none bg-black/50 px-4 py-3.5 flex items-center justify-center gap-2">
              <span className="h-2 w-2 bg-brand-orange animate-pulse" />
              <span className="font-sans text-[10px] font-bold uppercase text-white/70 tracking-wider">Google Gemini</span>
            </div>
            <div className="border border-white/10 rounded-none bg-black/50 px-4 py-3.5 flex items-center justify-center gap-2">
              <Zap className="h-3.5 w-3.5 text-brand-orange" />
              <span className="font-sans text-[10px] font-bold uppercase text-white/70 tracking-wider">OpenAI ChatGPT</span>
            </div>
            <div className="border border-white/10 rounded-none bg-black/50 px-4 py-3.5 flex items-center justify-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
              <span className="font-sans text-[10px] font-bold uppercase text-white/70 tracking-wider">Workspace Apps</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

