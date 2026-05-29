import React, { useState } from 'react';
import { Check, HelpCircle, Zap, ShieldCheck, MailOpen, Crown } from 'lucide-react';

export function Pricing({ id = "pricing" }: { id?: string }) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');

  const plans = [
    {
      name: 'Trial Core',
      badge: 'PRO ACCESS',
      priceMonthly: 0,
      priceAnnually: 0,
      subtext: 'No credit card required at sign up',
      desc: 'Evaluate AGEN premium capabilities thoroughly and experience your first "wow" setup in under 3 minutes.',
      features: [
        'Full Pro access for 7 days',
        'Auto-expires (No automatic charges)',
        '3 active custom agents',
        'Connect up to 3 MCP tools',
        'Basic run logs (24h preservation)',
        'Standard shared execution queue'
      ],
      cta: 'Start 7-Day Free Trial',
      popular: false
    },
    {
      name: 'Pro Platform',
      badge: 'MOST POPULAR',
      priceMonthly: 10,
      priceAnnually: 8.33, // 100/yr / 12
      subtext: 'Billed $100 annually' ,
      desc: 'Perfect for individual developers, creators, growth hackers, and indie founders automating advanced workflows.',
      features: [
        '2,000 autonomous runs/month',
        'Unlimited active tool connections',
        'Up to 10 active parallel agents',
        'Full Run History & Replay tracking',
        'Human-in-the-Loop approval check',
        'Priority email response (under 4h)',
        'Bring your own LLM API keys option'
      ],
      cta: 'Configure Pro Workspace',
      popular: true
    },
    {
      name: 'Team Hub',
      badge: 'COLLABORATIVE',
      priceMonthly: 25,
      priceAnnually: 20.83, // 250/yr / 12 => $250/year (billed $250) or effectively $25/seat monthly
      subtext: 'Per seat / Billed annually',
      desc: 'Designed for startups and engineering agencies requiring shared workspace nodes and high performance quotas.',
      features: [
        'Everything in Pro plan included',
        'Shared secure team workspace canvas',
        'Role-based permissions & admin audit',
        'Unlimited active parallel agents',
        'High-frequency dedicated execution',
        'General usage rollup dashboards',
        'Custom Slack alerting integrations'
      ],
      cta: 'Invite Team Members',
      popular: false
    },
    {
      name: 'White-Label',
      badge: 'ENTERPRISE',
      priceMonthly: null, // Custom
      priceAnnually: null,
      subtext: 'Invoiced quarterly',
      desc: 'Tailored for agencies or enterprise products embedding AGEN runtime capacities directly into client SaaS tools.',
      features: [
        'Full platform brand customization',
        'Custom white-label domain deployment',
        'Dedicated isolated infrastructure',
        'Contractual 99.9% uptime SLA',
        'Assigned personal account success manager',
        'Custom code integration consulting',
        'Private VPS deploy support'
      ],
      cta: 'Contact Partner Success',
      popular: false
    }
  ];

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-[#030303]">
      
      {/* Background visual structural frames */}
      <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-12 space-y-4 font-mono">
        <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase font-black">// VALUE-FIRST SUBSCRIPTION COMPLIANCE</span>
        <h2 className="font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl mt-2">
          SIMPLE SUBSCRIPTION TIERS_
        </h2>
        <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs font-mono uppercase tracking-widest leading-relaxed">
          // AGEN implements transparent, predictable resource pricing layout. Start evaluating without a credit card commitment.
        </p>

        {/* Pricing Toggle Switch */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
          <span className={`transition-colors duration-200 ${billingPeriod === 'monthly' ? 'text-white' : 'text-[#666]'}`}>
            Monthly Billing
          </span>
          
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annually' : 'monthly')}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-none border border-white/10 bg-black transition-colors duration-200 focus:outline-none"
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-brand-orange shadow-none duration-200 ease-in-out mt-0.5 ml-0.5 ${billingPeriod === 'annually' ? 'translate-x-[22px]' : 'translate-x-0'}`}
            />
          </button>

          <span className={`flex items-center gap-2 transition-colors duration-200 ${billingPeriod === 'annually' ? 'text-brand-orange' : 'text-[#666]'}`}>
            Annual billing
            <span className="rounded-none bg-brand-orange/15 border border-brand-orange/30 px-2 py-0.5 text-[8px] text-brand-orange font-black uppercase tracking-widest">
              SAVE 17%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch">
        {plans.map((plan, index) => {
          const isPro = plan.popular;
          return (
            <div
              key={index}
              className={`flex flex-col justify-between p-6 rounded-none border transition-all duration-300 ${isPro ? 'border-brand-orange bg-brand-orange/5' : 'border-white/10 bg-black/40 hover:border-white/30'}`}
            >
              <div className="space-y-5">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black tracking-widest text-[#F5F5F5]/40 uppercase block">
                    // {plan.name}
                  </span>
                  {plan.badge && (
                    <span className={`rounded-none px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border ${isPro ? 'border-brand-orange/40 bg-brand-orange/20 text-brand-orange' : 'border-white/10 bg-white/5 text-white/50'}`}>
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price block */}
                <div className="space-y-1 font-mono">
                  {plan.priceMonthly === null ? (
                    <span className="text-3xl font-display font-black text-white uppercase tracking-tighter">Custom_</span>
                  ) : (
                    <div className="flex items-baseline text-white">
                      <span className="text-4xl font-display font-black tracking-tighter">
                        ${billingPeriod === 'monthly' ? plan.priceMonthly : Math.round(plan.priceAnnually || 0)}
                      </span>
                      <span className="ml-1 text-[10px] text-white/30 uppercase font-black">/mo</span>
                    </div>
                  )}
                  <p className="text-[9.5px] text-white/30 uppercase tracking-widest">
                    {billingPeriod === 'annually' && plan.priceAnnually !== 0 && plan.priceAnnually !== null
                      ? `BILLED ANNUALLY: $${plan.priceAnnually * 12}/YR`
                      : plan.subtext}
                  </p>
                </div>

                <p className="text-xs text-white/50 leading-relaxed font-sans">{plan.desc}</p>

                {/* Features Checklist */}
                <div className="border-t border-white/10 pt-5 space-y-3 font-mono">
                  <span className="text-[9px] font-mono font-black tracking-widest text-white/40 uppercase block">// INCLUDED BIND SPECS</span>
                  <ul className="space-y-2 text-[11px] text-white/60 lowercase tracking-wider">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 leading-relaxed">
                        <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => alert(`Registration initiated for: ${plan.name}. Proceeding to authentication layer...`)}
                  className={`w-full text-center rounded-none py-2 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer font-mono ${isPro ? 'bg-brand-orange text-black' : 'bg-white/5 text-white/50 hover:bg-brand-orange hover:text-black border border-white/10'}`}
                >
                  {plan.cta}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Value statement footnote */}
      <div className="mt-10 rounded-none bg-black border border-white/10 p-5 text-[11px] text-white/50 leading-relaxed font-mono uppercase tracking-wider max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <Crown className="h-5 w-5 text-brand-orange shrink-0" />
        <div>
          <strong>Annual Billing Overviews:</strong> Switching to annual billing reduces overall maintenance overhead while improving workspace throughput. Pro accounts can additionally connect their own third-party LLM provider API keys to completely bypass default compute processor markups!
        </div>
      </div>
    </section>
  );
}
