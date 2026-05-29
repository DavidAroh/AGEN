import React, { useState } from 'react';
import { 
  Bot, LayoutGrid, Shuffle, ShoppingCart, Users, Calendar, 
  History, UserCheck, BarChart3, HelpCircle, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { motion } from 'motion/react';

interface FeatureItem {
  id: string;
  title: string;
  priority: 'P0' | 'P1' | 'P2';
  priorityLabel: string;
  icon: React.ComponentType<any>;
  desc: string;
  detailedPoints: string[];
}

export function Features({ id = "features" }: { id?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'P0' | 'P1' | 'P2'>('all');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'nl-builder',
      title: 'NL Agent Builder',
      priority: 'P0',
      priorityLabel: 'MVP',
      icon: Bot,
      desc: 'Describe objectives in plain English to build direct, runtime-ready specs.',
      detailedPoints: [
        'Semantic parsing of goal descriptions',
        'Automatic memory adaptors configuration'
      ]
    },
    {
      id: 'flow-canvas',
      title: 'Visual Flow Canvas',
      priority: 'P0',
      priorityLabel: 'MVP',
      icon: LayoutGrid,
      desc: 'Interactive block rendering alongside raw configuration overrides.',
      detailedPoints: [
        'Dynamic visual flow execution tracking',
        'Direct fork and adjust parameter structures'
      ]
    },
    {
      id: 'agnostic-routing',
      title: 'Agnostic LLM Routing',
      priority: 'P0',
      priorityLabel: 'MVP',
      icon: Shuffle,
      desc: 'Switch between Claude, GPT, Gemini, or custom API endpoints cleanly.',
      detailedPoints: [
        'Vendor lock-in protection with single-click swaps',
        'Automated rate-limiting and robust rate failovers'
      ]
    },
    {
      id: 'mcp-marketplace',
      title: 'MCP Tool Library',
      priority: 'P0',
      priorityLabel: 'MVP',
      icon: ShoppingCart,
      desc: 'Connect web scrapers, email, code trackers, and workspace tools.',
      detailedPoints: [
        'Standardized integration layout wrappers',
        'Isolated OAuth credential vault servers'
      ]
    },
    {
      id: 'multi-agent',
      title: 'Agent Orchestration',
      priority: 'P1',
      priorityLabel: 'Growth',
      icon: Users,
      desc: 'A primary coordinator spawns specialized workers for parallel processing.',
      detailedPoints: [
        'Hierarchical multi-routing delegations',
        'Automated progress metric consolidations'
      ]
    },
    {
      id: 'schedules-triggers',
      title: 'Schedules & Webhooks',
      priority: 'P1',
      priorityLabel: 'Growth',
      icon: Calendar,
      desc: 'Trigger routines on precise time intervals or webhook events.',
      detailedPoints: [
        'Easy cron schedule configuration specs',
        'Secure incoming request signature checking'
      ]
    },
    {
      id: 'run-history',
      title: 'Deep Replay Auditing',
      priority: 'P1',
      priorityLabel: 'Growth',
      icon: History,
      desc: 'Trace exact inputs, states, token usage, and tool responses.',
      detailedPoints: [
        'Interactive step execution timestamps',
        'One-click historical routine replays'
      ]
    },
    {
      id: 'human-checkpoints',
      title: 'Human Checkpoints',
      priority: 'P2',
      priorityLabel: 'Scale',
      icon: UserCheck,
      desc: 'Pause routines on sensitive boundaries and request verification.',
      detailedPoints: [
        'Supervised action override capabilities',
        'Manual Slack and email confirmation hooks'
      ]
    },
    {
      id: 'cost-dashboard',
      title: 'Resource Budgets',
      priority: 'P2',
      priorityLabel: 'Scale',
      icon: BarChart3,
      desc: 'Track and restrict multi-provider API bills automatically.',
      detailedPoints: [
        'Real-time spending analytics',
        'Hard block thresholds globally'
      ]
    }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(f => f.priority === selectedCategory);

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-[#050505]">
      {/* Decorative background guidelines */}
      <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-white/5 hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-6 w-[1px] bg-white/5 hidden xl:block" />

      {/* Heading/Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase font-black">// CORE CAPABILITIES SHARD ATOMICS</span>
          <h2 className="font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl mt-2">
            THE AGEN FEATURE MATRIX_
          </h2>
          <p className="mt-4 text-white/50 max-w-xl text-xs font-mono uppercase tracking-widest leading-relaxed">
            // Sitting at the absolute boundary of high usability and raw performance. Filter through target priorities.
          </p>
        </div>

        {/* Feature Filters */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-none bg-black/60 border border-white/10 self-start md:self-auto shrink-0 font-mono">
          {(['all', 'P0', 'P1', 'P2'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-none px-3 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${selectedCategory === cat ? 'bg-brand-orange text-black' : 'text-slate-400 hover:text-white'}`}
            >
              {cat === 'all' ? 'All [FEATURES]' : cat === 'P0' ? 'Must-Haves (P0)' : cat === 'P1' ? 'Growth (P1)' : 'Scale (P2)'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feat) => {
          const IconComponent = feat.icon;
          const isActive = activeFeature === feat.id;
          return (
            <div
              key={feat.id}
              onClick={() => setActiveFeature(isActive ? null : feat.id)}
              className={`flex flex-col justify-between p-6 rounded-none border text-left transition-all duration-300 cursor-pointer select-none ${isActive ? 'border-brand-orange bg-brand-orange/5' : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-[#111]'}`}
            >
              <div className="space-y-4">
                {/* Top row: Icon and Priority sticker */}
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-none border ${feat.priority === 'P0' ? 'border-brand-orange/30 bg-brand-orange/10 text-brand-orange' : feat.priority === 'P1' ? 'border-white/20 bg-white/5 text-white' : 'border-white/10 bg-white/5 text-white/40'}`}>
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                  
                  <span className={`rounded-none px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border ${feat.priority === 'P0' ? 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange' : feat.priority === 'P1' ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-white/40'}`}>
                    {feat.priority}
                  </span>
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">{feat.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-sans">{feat.desc}</p>
                </div>
              </div>

              {/* Expandable Points Accordion Toggle */}
              <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
                <div 
                  className="flex items-center justify-between w-full text-white/30 hover:text-[#fff] transition-colors text-[9px] font-mono font-black tracking-widest uppercase cursor-pointer"
                >
                  <span>{isActive ? '// COLLAPSE SHARD SPECS' : '// EXPAND TECHNICAL SPECS'}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isActive ? 'rotate-180 text-brand-orange' : ''}`} />
                </div>

                {isActive && (
                  <div className="space-y-2 text-[11px] text-white/70 pl-1 pt-1.5">
                    {feat.detailedPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Priority Key Reference footer */}
      <div className="mt-10 rounded-none bg-black border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono max-w-4xl mx-auto">
        <span className="text-white/40 uppercase tracking-widest font-black flex items-center gap-2 text-[10px]">
          <HelpCircle className="h-4 w-4 text-brand-orange shrink-0" /> ROADMAP TIMELINE COMPLIANCE:
        </span>
        <div className="flex flex-wrap items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5 text-brand-orange font-bold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-brand-orange" />
            <strong>P0</strong>: core launch (0-3M)
          </span>
          <span className="flex items-center gap-1.5 text-white font-bold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-white" />
            <strong>P1</strong>: growth phase (3-6M)
          </span>
          <span className="flex items-center gap-1.5 text-white/40 font-bold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 bg-white/30" />
            <strong>P2</strong>: scale phase (6-12M)
          </span>
        </div>
      </div>
    </section>
  );
}

