/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Sandbox } from './components/Sandbox';
import { Features } from './components/Features';
import { Architecture } from './components/Architecture';
import { Compare } from './components/Compare';
import { Metrics } from './components/Metrics';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

export default function App() {
  // Smooth scroll handler to target section IDs
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLaunchSandbox = () => {
    scrollToSection('sandbox');
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#F5F5F5] antialiased overflow-x-hidden selection:bg-brand-orange selection:text-black">
      {/* Structural layout outlines */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-[10%] w-[1px] bg-white/[0.02] hidden xl:block z-0" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-[10%] w-[1px] bg-white/[0.02] hidden xl:block z-0" />
      
      {/* High impact header navigation bar */}
      <Header 
        onScrollToSection={scrollToSection} 
        onLaunchSandbox={handleLaunchSandbox} 
      />

      {/* Hero Welcome Presentation */}
      <Hero onScrollToSection={scrollToSection} />

      {/* Main Sandbox Interactive Playground */}
      <div className="border-t border-white/10 bg-[#080808]">
        <Sandbox id="sandbox" />
      </div>

      {/* Bento Grid Feature Matrix */}
      <div className="bg-[#050505] border-t border-white/10">
        <Features id="features" />
      </div>

      {/* System Architecture layered viz */}
      <Architecture id="architecture" />

      {/* Competitors Compare grid board */}
      <Compare id="benchmarks" />

      {/* Dynamic 12-Month Projections SaaS Slider Chart */}
      <Metrics id="projections" />

      {/* Pricing subscription plans */}
      <Pricing id="pricing" />

      {/* Standard copyright Footer */}
      <Footer onScrollToSection={scrollToSection} />
    </div>
  );
}

