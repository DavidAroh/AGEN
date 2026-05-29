import React, { useState, useMemo } from 'react';
import { BarChart3, ShieldAlert, Sparkles, TrendingUp, HelpCircle, DollarSign, Users2, Percent } from 'lucide-react';

export function Metrics({ id = "projections" }: { id?: string }) {
  // Simulator factors
  const [trialsMultiplier, setTrialsMultiplier] = useState<number>(1); // 1 = PRD default baseline
  const [conversionRate, setConversionRate] = useState<number>(15); // %
  const [churnRate, setChurnRate] = useState<number>(5); // %
  const [teamUpgradePct, setTeamUpgradePct] = useState<number>(10); // % of pro who upgrade

  // Pricing values
  const PRO_PRICE = 10; // $/mo
  const TEAM_SEAT_PRICE = 25; // $/seat
  const AVG_TEAM_SEATS = 3;

  // Compute 12-month projections dynamically
  const projectionData = useMemo(() => {
    // Standard baseline monthly trials from Slide 14
    const baseNewTrials = [200, 350, 500, 650, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];
    
    let cumulativeArr = 0;
    let localProSubs = 0;
    
    return baseNewTrials.map((rawTrials, index) => {
      const month = index + 1;
      // Scale trials according to selector
      const newTrials = Math.round(rawTrials * trialsMultiplier);
      
      // Calculate active paid subscribers from trials
      const targetNewPaidSubs = Math.round(newTrials * (conversionRate / 100));
      
      // Keep track of active users incorporating month-on-month churn
      if (month === 1) {
        localProSubs = targetNewPaidSubs;
      } else {
        localProSubs = Math.round((localProSubs * (1 - churnRate / 100)) + targetNewPaidSubs);
      }

      // Pro subs scale
      const proSubs = Math.round(localProSubs * (1 - teamUpgradePct / 100));
      // Team users upgrade
      const teamSubsCount = Math.round(localProSubs * (teamUpgradePct / 100));
      const teamSeatsCount = teamSubsCount * AVG_TEAM_SEATS;

      // Calculcate MRR (Est)
      const proRevenue = proSubs * PRO_PRICE;
      const teamRevenue = teamSeatsCount * TEAM_SEAT_PRICE;
      const mrr = proRevenue + teamRevenue;

      // Cumulative ARR accumulates MRR
      cumulativeArr += (mrr * 12) / 12; // Accumulated rolling value representation
      
      return {
        month,
        newTrials,
        proSubs,
        teamSeats: teamSeatsCount,
        mrr,
        arr: Math.round(mrr * 12) // Estimated ARR is run-rate
      };
    });
  }, [trialsMultiplier, conversionRate, churnRate, teamUpgradePct]);

  // Extract month 12 results
  const m12Data = projectionData[11];

  // SVG Chart Dimensions & Plots
  const chartHeight = 220;
  const chartWidth = 500;
  const padding = 35;

  const maxMrr = Math.max(...projectionData.map(d => d.mrr), 1000);

  const points = projectionData.map((d, index) => {
    const x = padding + (index * (chartWidth - padding * 2)) / 11;
    const y = chartHeight - padding - (d.mrr * (chartHeight - padding * 2)) / maxMrr;
    return { x, y, mrr: d.mrr, month: d.month };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-white/10 bg-[#050505]">
      
      {/* Background visual structural frames */}
      <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-6 w-[1px] bg-white/5 hidden xl:block pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[10px] font-sans tracking-wider text-brand-orange uppercase font-bold">// Interactive Efficiency Calculator</span>
        <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
          Project Your Team Time & Cost Savings
        </h2>
        <p className="mt-4 text-white/50 max-w-2xl mx-auto text-xs font-sans uppercase tracking-widest leading-relaxed">
          // Adjust the workflow sliders below to estimate the valuable hours and labor expenses saved by your new digital assistants.
        </p>
      </div>

      {/* Core Simulator Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto font-sans">
        
        {/* Left Side: 4 Sliders Panels (4 Columns) */}
        <div className="lg:col-span-4 p-6 rounded-none border border-white/10 bg-[#0a0a0a] space-y-6 flex flex-col justify-between">
          <div className="space-y-4 font-sans">
            <h3 className="font-display text-sm font-bold text-white tracking-widest uppercase pb-2.5 border-b border-white/10">
              Workflow Settings
            </h3>

            {/* Selector 1: Trials Factor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60 tracking-wider uppercase font-bold text-[10px] flex items-center gap-1.5">
                  <Users2 className="h-3.5 w-3.5 text-brand-orange" />
                  Active Workflow Volume
                </span>
                <span className="font-mono font-bold text-brand-orange bg-brand-orange/15 px-1.5 py-0.5 rounded-none border border-brand-orange/30 text-[10px]">
                  {trialsMultiplier === 1 ? '1.0X (Default)' : `${trialsMultiplier.toFixed(1)}X`}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={trialsMultiplier}
                onChange={(e) => setTrialsMultiplier(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-brand-orange"
              />
              <span className="text-[9px] text-white/30 uppercase block leading-normal font-sans">
                Controls the baseline volume of task runs managed by your digital workers.
              </span>
            </div>

            {/* Selector 2: Conversion Pct */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60 tracking-wider uppercase font-bold text-[10px] flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-brand-orange" />
                  Automation Success Rate
                </span>
                <span className="font-mono font-bold text-brand-orange bg-brand-orange/15 px-1.5 py-0.5 rounded-none border border-brand-orange/30 text-[10px]">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={conversionRate}
                onChange={(e) => setConversionRate(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-brand-orange"
              />
              <span className="text-[9px] text-white/30 uppercase block leading-normal font-sans">
                Ratio of workflow items processed fully automatically without human review.
              </span>
            </div>

            {/* Selector 3: Churn Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60 tracking-wider uppercase font-bold text-[10px] flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-brand-orange" />
                  Manual Followup Rate
                </span>
                <span className="font-mono font-bold text-brand-orange bg-brand-orange/15 px-1.5 py-0.5 rounded-none border border-brand-orange/30 text-[10px]">
                  {churnRate}%
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                step="1"
                value={churnRate}
                onChange={(e) => setChurnRate(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-brand-orange"
              />
              <span className="text-[9px] text-white/30 uppercase block leading-normal font-sans">
                Friction margin where task results have small questions or edits needed.
              </span>
            </div>

            {/* Selector 4: Team Upgrade Pct */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60 tracking-wider uppercase font-bold text-[10px] flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-orange" />
                  Custom Integration Rate
                </span>
                <span className="font-mono font-bold text-brand-orange bg-brand-orange/15 px-1.5 py-0.5 rounded-none border border-brand-orange/30 text-[10px]">
                  {teamUpgradePct}%
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={teamUpgradePct}
                onChange={(e) => setTeamUpgradePct(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-brand-orange"
              />
              <span className="text-[9px] text-white/30 uppercase block leading-normal font-sans">
                Percentage of tasks that bridge across highly custom team Slack channels or Notion databases.
              </span>
            </div>
          </div>

          {/* Quick Target status information card */}
          <div className="rounded-none bg-brand-orange/5 border border-brand-orange/20 p-4 text-[10px] text-white/80 uppercase font-sans leading-relaxed block mt-4">
            <strong className="block text-brand-orange font-bold mb-0.5">// SAVINGS SUMMARY</strong>
            These values project an amazing return on investment by saving your team up to <strong className="text-white font-bold">{Math.round(trialsMultiplier * 210)} hours</strong> and over <strong className="text-white font-bold">${(trialsMultiplier * 8400).toLocaleString()}</strong> in manual labor costs annually.
          </div>
        </div>

        {/* Center/Right Side: Interactive Dynamic Chart & Output metrics (8 Columns) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Top Row: Quick Calculated KPI cards */}
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
            {/* KPI 1: Monthly Hours Saved */}
            <div className="p-5 rounded-none border border-white/10 bg-black">
              <span className="text-[9px] font-sans font-bold text-white/40 block tracking-wider uppercase">// EST. MONTHLY HOURS SAVED</span>
              <span className="text-3xl font-display font-extrabold tracking-tight text-white block mt-1.5">
                {Math.round(trialsMultiplier * 180 + (conversionRate * 2)).toLocaleString()} hrs
              </span>
              <span className="text-[9px] font-sans text-white/30 uppercase block mt-1">
                BASED ON TYPICAL 5-MINUTE WORKFLOWS
              </span>
            </div>

            {/* KPI 2: Annual Cost Savings */}
            <div className="p-5 rounded-none border border-white/10 bg-black">
              <span className="text-[9px] font-sans font-bold text-white/40 block tracking-wider uppercase">// ANNUAL VALUE ESTIMATE</span>
              <span className="text-3xl font-display font-extrabold tracking-tight text-brand-orange block mt-1.5">
                ${Math.round(trialsMultiplier * 36000 + (conversionRate * 500)).toLocaleString()}
              </span>
              <span className="text-[9px] font-sans text-white/30 uppercase block mt-1">
                COMPARED TO MANUAL LABOR EXPENSES
              </span>
            </div>

            {/* KPI 3: Accuracy Score */}
            <div className="p-5 rounded-none border border-white/10 bg-black">
              <span className="text-[9px] font-sans font-bold text-white/40 block tracking-wider uppercase">// AUTO WORKFLOW ACCURACY</span>
              <span className="text-3xl font-display font-extrabold tracking-tight text-white block mt-1.5">
                {(95 + (conversionRate / 10)).toFixed(1)}%
              </span>
              <span className="text-[9px] font-sans text-white/30 uppercase block mt-1">
                COWORKER CONSENSUS RATE
              </span>
            </div>
          </div>

          {/* SVG Trend Graph */}
          <div className="md:col-span-12 p-5 rounded-none border border-white/10 bg-[#0a0a0a] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-sans tracking-wide text-[#F5F5F5]/40 uppercase block font-bold">// 12-MONTH TEAM SAVINGS ACCUMULATION GRAPH</span>
              <p className="text-[10px] font-sans text-white/35 uppercase tracking-wider mt-1">Projected cumulative workflow hours saved by our digital coworkers from Month 1 to Month 12.</p>
            </div>

            {/* Chart Canvas Area */}
            <div className="py-2.5 flex items-center justify-center">
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full max-w-xl h-auto block overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const yVal = padding + ratio * (chartHeight - padding * 2);
                  return (
                    <line 
                      key={idx}
                      x1={padding} 
                      y1={yVal} 
                      x2={chartWidth - padding} 
                      y2={yVal} 
                      stroke="#ffffff" 
                      strokeOpacity="0.08"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Area Gradient */}
                <path d={areaPath} fill="url(#chart-area-grad)" />

                {/* Line Path */}
                <path d={linePath} fill="none" stroke="#f97316" strokeWidth="2.5" />

                {/* Interactive Node Point Dots */}
                {points.map((p, idx) => {
                  const isMonthKey = [1, 3, 6, 9, 12].includes(p.month);
                  return (
                    <g key={idx} className="group cursor-pointer">
                      <circle 
                        cx={p.x} 
                        cy={p.y} 
                        r={isMonthKey ? 4.5 : 2.5} 
                        fill={isMonthKey ? '#f97316' : '#ffffff'} 
                        stroke="#000000" 
                        strokeWidth="1.5"
                      />
                      
                      {/* Interactive hover indicator elements */}
                      {isMonthKey && (
                        <text
                          x={p.x}
                          y={p.y - 10}
                          textAnchor="middle"
                          fill="#f97316"
                          fontSize="8.5px"
                          fontFamily="monospace"
                          fontWeight="bold"
                          className="font-mono"
                        >
                          {Math.round(p.mrr / 55)} hrs
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Month labels bottom axis */}
                {points.map((p, idx) => {
                  const isLabelKey = [1, 3, 6, 9, 12].includes(p.month);
                  if (!isLabelKey) return null;
                  return (
                    <text
                      key={idx}
                      x={p.x}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      fill="#777777"
                      fontSize="9px"
                      fontFamily="sans-serif"
                      className="font-sans uppercase font-bold"
                    >
                      Month {p.month}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Note description for variables scaling */}
            <div className="flex items-center justify-between text-[9px] font-sans text-white/30 border-t border-white/10 pt-2.5">
              <span>* HISTORIC MARKERS SHOW CONSECUTIVE TRAJECTORY MILESTONES.</span>
              <span>ESTIMATED RETURN ON EFFORT: <strong className="text-brand-orange font-bold uppercase">10X VALUE</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

