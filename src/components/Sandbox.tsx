import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Play, CheckCircle2, AlertTriangle, Clock, ArrowRight, Share2, 
  Terminal, Settings, Database, Code, RefreshCw, Globe, Mail, 
  BookOpen, Slack, Layers, Check, Zap, ChevronRight, AlertCircle, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENT_TEMPLATES, AgentTemplate } from '../types';

interface SandboxProps {
  id?: string;
}

export function Sandbox({ id = "sandbox" }: SandboxProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate>(AGENT_TEMPLATES[0]);
  const [customPrompt, setCustomPrompt] = useState<string>(AGENT_TEMPLATES[0].prompt);
  const [connectedTools, setConnectedTools] = useState<string[]>(['browser-fetch']);
  const [selectedModel, setSelectedModel] = useState<string>('auto-route');
  
  // Running simulation states
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [simulatedSteps, setSimulatedSteps] = useState<any[]>(
    AGENT_TEMPLATES[0].steps.map(s => ({ ...s, status: 'idle' }))
  );
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const triggerFeedback = (message: string) => {
    setActionFeedback(message);
    setTimeout(() => {
      setActionFeedback(null);
    }, 4000);
  };

  // Sync custom prompt when a user changes templates
  const handleTemplateSelect = (template: AgentTemplate) => {
    setSelectedTemplate(template);
    setCustomPrompt(template.prompt);
    // Auto recommended starting toolset
    setConnectedTools(template.recommendedTools);
    setSimulatedSteps(template.steps.map(s => ({ ...s, status: 'idle' })));
    setSelectedStepIndex(null);
  };

  // Tool lists available in marketplace
  const marketplaceTools = [
    { id: 'browser-fetch', name: 'Browser Scraper', icon: Globe, desc: 'Renders SPA web pages & extracts clean HTML body data' },
    { id: 'gmail-client', name: 'Gmail Workspace', icon: Mail, desc: 'OAuth authenticated client for sending & reading drafts' },
    { id: 'notion-vault', name: 'Notion Database', icon: BookOpen, desc: 'Append document databases or structure workspace tables' },
    { id: 'github-mcp', name: 'GitHub Connector', icon: Code, desc: 'Full repository code search, PR scanning & inline reviewing' },
    { id: 'slack-vault', name: 'Slack Alerts', icon: Slack, desc: 'OAuth message webhook pusher into specified channels' },
    { id: 'google-sheets-mcp', name: 'Google Sheets', icon: FileText, desc: 'Read and write rows in workspace spreadsheets' },
  ];

  // Tool toggle selection
  const toggleTool = (toolId: string) => {
    if (connectedTools.includes(toolId)) {
      setConnectedTools(connectedTools.filter(t => t !== toolId));
    } else {
      setConnectedTools([...connectedTools, toolId]);
    }
  };

  // Run simulation logging sequence
  useEffect(() => {
    let logTimer: NodeJS.Timeout;
    if (isRunning && currentThoughtIndex < selectedTemplate.thoughts.length) {
      logTimer = setTimeout(() => {
        const nextThought = selectedTemplate.thoughts[currentThoughtIndex];
        const timestamp = new Date().toLocaleTimeString();
        setTerminalLogs(prev => [...prev, `[${timestamp}] ${nextThought}`]);
        
        // Dynamically update steps statuses based on thought progression
        const progressPercentage = (currentThoughtIndex + 1) / selectedTemplate.thoughts.length;
        const stepsUpdated = [...simulatedSteps];
        const stepIndexToComplete = Math.floor(progressPercentage * stepsUpdated.length);
        
        for (let i = 0; i < stepsUpdated.length; i++) {
          if (i < stepIndexToComplete) {
            stepsUpdated[i].status = 'success';
          } else if (i === stepIndexToComplete) {
            stepsUpdated[i].status = 'running';
          } else {
            stepsUpdated[i].status = 'idle';
          }
        }
        setSimulatedSteps(stepsUpdated);
        setCurrentThoughtIndex(prev => prev + 1);
      }, 900);
    } else if (isRunning && currentThoughtIndex >= selectedTemplate.thoughts.length) {
      setIsRunning(false);
      setSimulationComplete(true);
      const stepsUpdated = simulatedSteps.map(s => ({ ...s, status: 'success' }));
      setSimulatedSteps(stepsUpdated);
    }

    return () => clearTimeout(logTimer);
  }, [isRunning, currentThoughtIndex, selectedTemplate, simulatedSteps]);

  // Scroll to bottom of terminal
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const handleStartSimulation = () => {
    setTerminalLogs([]);
    setCurrentThoughtIndex(0);
    setSimulationComplete(false);
    setSelectedStepIndex(null);
    
    // Initialize simulation steps from template
    const initialSteps = selectedTemplate.steps.map(step => ({
      ...step,
      status: 'idle'
    }));
    setSimulatedSteps(initialSteps);
    setIsRunning(true);
    setActiveStep(4);
  };

  const handleResetSimulation = () => {
    setIsRunning(false);
    setSimulationComplete(false);
    setTerminalLogs([]);
    setCurrentThoughtIndex(0);
    setSimulatedSteps(selectedTemplate.steps.map(s => ({ ...s, status: 'idle' })));
    setSelectedStepIndex(null);
    setActiveStep(1);
  };

  // Ejected code preview logic
  const getEjectedCode = () => {
    return `// Ejected from AGEN Workspace v1.0
// Framework: Node.js / TypeScript Core Runtime
import { AgentRunner, MCPConnector, ModelGateway } from "@agen/core";

// 1. Initialize multi-provider LLM gateway
const gateway = new ModelGateway({
  defaultModel: "${selectedModel === 'auto-route' ? 'claude-3-5-sonnet' : selectedModel}",
  fallbackSettings: { maxRetries: 3 }
});

// 2. Configure authorized MCP connectors
const connectors = [
${connectedTools.map(t => {
  const toolInfo = marketplaceTools.find(m => m.id === t);
  return `  new MCPConnector({ provider: "${t}", key: process.env.${t.toUpperCase().replace('-', '_')}_SECRET }),`;
}).join('\n')}
];

// 3. Define Autonomous Multi-Agent Work Graph
const agent = new AgentRunner({
  name: "${selectedTemplate.name}",
  goal: "${customPrompt.substring(0, 80)}...",
  models: gateway,
  tools: connectors,
  memory: "short-term-context",
  safetyChecks: "human-in-the-loop-approval"
});

// 4. Trigger Run on Trigger Hook
export async function startWorkflow() {
  const runLog = await agent.run();
  console.log("Agent finished run:", runLog.runId);
  return runLog.artifact;
}`;
  };

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/10">
      {/* Decorative vertical bounds */}
      <div className="absolute top-0 left-4 h-full w-[1px] bg-white/5 hidden lg:block" />
      <div className="absolute top-0 right-4 h-full w-[1px] bg-white/5 hidden lg:block" />

      {/* Header and 5-min Badge */}
      <div className="text-center mb-16 font-sans">
        <div className="inline-flex items-center gap-2 border border-brand-orange bg-brand-orange/5 px-4 py-1.5 text-[10px] uppercase font-sans font-bold tracking-wider text-brand-orange rounded-none mb-4">
          <Clock className="h-3.5 w-3.5" />
          <span>Set Up Coworkers In Under 5 Minutes</span>
        </div>
        <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase text-white sm:text-5xl">
          Interactive Assistant Builder
        </h2>
        <div className="h-1.5 w-16 bg-brand-orange mx-auto mt-4" />
        <p className="mt-4 text-xs font-sans uppercase tracking-[0.1em] text-white/50 max-w-2xl mx-auto leading-relaxed">
          // Explain what you want to automate, choose the integration apps, and watch your digital assistant compile and run live.
        </p>
      </div>

      {/* Onboarding Wizard Steps Indicator */}
      <div className="mb-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-black uppercase tracking-wider border-b border-white/10 pb-4">
          <button 
            disabled={isRunning}
            onClick={() => setActiveStep(1)}
            className={`flex flex-col md:flex-row items-center justify-center gap-2 py-3 transition-all cursor-pointer rounded-none border-b-2 ${activeStep === 1 ? 'text-brand-orange border-brand-orange bg-white/5 font-black' : 'text-slate-400 hover:text-white border-transparent'}`}
          >
            <span className={`flex h-5 w-5 items-center justify-center border font-mono text-[10px] ${activeStep === 1 ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-white/20 bg-white/5 text-white/50'}`}>01</span>
            <span>Describe Goal</span>
          </button>
          
          <button 
            disabled={isRunning}
            onClick={() => setActiveStep(2)}
            className={`flex flex-col md:flex-row items-center justify-center gap-2 py-3 transition-all cursor-pointer rounded-none border-b-2 ${activeStep === 2 ? 'text-brand-orange border-brand-orange bg-white/5 font-black' : 'text-slate-400 hover:text-white border-transparent'}`}
          >
            <span className={`flex h-5 w-5 items-center justify-center border font-mono text-[10px] ${activeStep === 2 ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-white/20 bg-white/5 text-white/50'}`}>02</span>
            <span>Connect Tools</span>
          </button>

          <button 
            disabled={isRunning}
            onClick={() => setActiveStep(3)}
            className={`flex flex-col md:flex-row items-center justify-center gap-2 py-3 transition-all cursor-pointer rounded-none border-b-2 ${activeStep === 3 ? 'text-brand-orange border-brand-orange bg-white/5 font-black' : 'text-slate-400 hover:text-white border-transparent'}`}
          >
            <span className={`flex h-5 w-5 items-center justify-center border font-mono text-[10px] ${activeStep === 3 ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-white/20 bg-white/5 text-white/50'}`}>03</span>
            <span>Route Model</span>
          </button>

          <button 
            onClick={() => {
              if (simulatedSteps.length === 0) {
                // Initialize default simulator structure
                setSimulatedSteps(selectedTemplate.steps.map(s => ({ ...s, status: 'idle' })));
              }
              setActiveStep(4);
            }}
            className={`flex flex-col md:flex-row items-center justify-center gap-2 py-3 transition-all cursor-pointer rounded-none border-b-2 ${activeStep === 4 ? 'text-brand-orange border-brand-orange bg-white/5 font-black' : 'text-slate-400 hover:text-white border-transparent'}`}
          >
            <span className={`flex h-5 w-5 items-center justify-center border font-mono text-[10px] ${activeStep === 4 ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-white/20 bg-white/5 text-white/50'}`}>04</span>
            <span>Deploy & Watch</span>
          </button>
        </div>
      </div>

      {/* Core Sandbox Workplace Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto rounded-none border border-white/10 bg-black/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Left Side: Interactivity Space */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: Describe / Choose template */}
            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block font-black">STEP // 01</span>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mt-1">
                      SPECIFY OBJECTIVE
                    </h3>
                    <p className="text-xs text-white/50 mt-1">
                      Enter plain English instructions to compile your custom agent.
                    </p>
                  </div>

                  {/* Pre-built Templates Quick Chips */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block font-black">// SELECT PROTOCOL PRESET WORKFLOWS:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {AGENT_TEMPLATES.map((tmpl) => (
                        <button
                          key={tmpl.id}
                          onClick={() => handleTemplateSelect(tmpl)}
                          className={`flex items-start gap-3 p-3.5 text-left rounded-none border text-xs transition-all cursor-pointer ${selectedTemplate.id === tmpl.id ? 'border-brand-orange bg-brand-orange/5 text-white shadow-md' : 'border-white/5 bg-[#0a0a0a] text-slate-400 hover:border-white/15'}`}
                        >
                          <span className="text-lg leading-none">{tmpl.emoji}</span>
                          <div>
                            <p className="font-bold text-white uppercase tracking-wider text-[11px]">{tmpl.name}</p>
                            <p className="text-[10px] text-white/40 line-clamp-1 mt-0.5">{tmpl.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt Field */}
                  <div className="space-y-2 relative">
                    <textarea
                      rows={4}
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="w-full rounded-none border border-white/10 bg-black px-4 py-3 text-xs text-white placeholder-white/30 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange font-mono leading-relaxed"
                      placeholder="Identify your agent objective payload..."
                    />
                    <div className="absolute right-3.5 bottom-3 text-[9px] font-mono text-white/30 uppercase">
                      CHARS: {customPrompt.length}
                    </div>
                  </div>

                  {/* Summary box parsed by NL engine */}
                  <div className="rounded-none bg-brand-orange/5 border border-brand-orange/10 p-4 space-y-3">
                    <span className="text-[9px] font-mono uppercase tracking-[0.15em] font-black text-brand-orange block">
                      // COMPILER AUTODETECT TARGETS:
                    </span>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-white/40 block text-[9px] font-mono uppercase">RECOMMENDED CORE DECODER:</span>
                        <span className="font-bold text-white font-mono uppercase text-[10px]">
                          {selectedTemplate.suggestedModel === 'auto-route' ? 'Smart Router' : selectedTemplate.suggestedModel}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[9px] font-mono uppercase">MCP PLUG DECOUPLINGS:</span>
                        <span className="font-bold text-brand-orange font-mono uppercase text-[10px]">
                          {selectedTemplate.recommendedTools.length} modules configured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="inline-flex items-center gap-1.5 rounded-none bg-brand-orange hover:bg-white text-black px-5 py-3 text-xs font-black uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                  >
                    Next: Connect Tools
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Connect Tools */}
            {activeStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block font-black">STEP // 02</span>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mt-1">
                      CONNECT TOOLS (MCP)
                    </h3>
                    <p className="text-xs text-white/50 mt-1">
                      Select environment drivers to grant tool access inside the workspace.
                    </p>
                  </div>

                  {/* Marketplace Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {marketplaceTools.map((tool) => {
                      const isSelected = connectedTools.includes(tool.id);
                      const isRecommended = selectedTemplate.recommendedTools.includes(tool.id);
                      const ToolIcon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => toggleTool(tool.id)}
                          className={`group relative flex items-start gap-3 p-3.5 text-left rounded-none border text-xs transition-all cursor-pointer ${isSelected ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-white/5 bg-[#0a0a0a] text-slate-400 hover:border-white/15'} ${isRecommended && !isSelected ? 'ring-1 ring-brand-orange/30' : ''}`}
                        >
                          {isRecommended && (
                            <span className="absolute top-2.5 right-2.5 text-[8px] font-mono text-brand-orange bg-brand-orange/10 px-1 py-0.5 rounded-none uppercase font-black tracking-wider">
                              SUGGESTED
                            </span>
                          )}
                          <div className={`p-2 rounded-none border ${isSelected ? 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange' : 'border-white/10 bg-white/5 text-slate-500 group-hover:text-white'}`}>
                            <ToolIcon className="h-4.5 w-4.5" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold text-white uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                              {tool.name}
                              {isSelected && <Check className="h-3 w-3 text-brand-orange" />}
                            </p>
                            <p className="text-[10px] text-white/50 leading-normal">{tool.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-4">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    // Go Back
                  </button>
                  <button
                    onClick={() => {
                      if (connectedTools.length === 0) {
                        alert("Please select at least 1 tool to proceed!");
                        return;
                      }
                      setActiveStep(3);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-none bg-brand-orange hover:bg-white text-black px-5 py-3 text-xs font-black uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                  >
                    Next: Choose Model
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Route Model */}
            {activeStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block font-black">STEP // 03</span>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mt-1">
                      SELECT LLM ROUTING
                    </h3>
                    <p className="text-xs text-white/50 mt-1">
                      Choose automated routing or force specific platform backends.
                    </p>
                  </div>

                  {/* Routing Presets */}
                  <div className="space-y-3">
                    {/* Option 1: Auto route */}
                    <button
                      onClick={() => setSelectedModel('auto-route')}
                      className={`w-full flex items-center justify-between p-4 rounded-none border text-left transition-all cursor-pointer ${selectedModel === 'auto-route' ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-white/5 bg-[#0a0a0a] text-slate-400 hover:bg-[#111111]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-none border border-brand-orange/40 bg-brand-orange/10 flex items-center justify-center text-brand-orange text-xs font-bold font-mono">
                          ★
                        </div>
                        <div>
                          <p className="font-bold text-white uppercase text-[11px] tracking-wider">Autonomous Consensus Route (RECOMMENDED)</p>
                          <p className="text-[10px] text-white/50 mt-0.5">Dynamically load-balances cost & reasoning weight nodes based on real-time prompt telemetry.</p>
                        </div>
                      </div>
                      <div className={`p-1 rounded-none border ${selectedModel === 'auto-route' ? 'border-brand-orange bg-brand-orange text-black' : 'border-white/20'}`}>
                        <Check className="h-3 w-3" />
                      </div>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Claude */}
                      <button
                        onClick={() => setSelectedModel('anthropic')}
                        className={`flex flex-col p-3.5 rounded-none border text-left text-xs justify-between transition-all cursor-pointer ${selectedModel === 'anthropic' ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-white/5 bg-[#0a0a0a] text-slate-400 hover:bg-white/[0.03]'}`}
                      >
                        <span className="font-bold text-white uppercase tracking-wider text-[10px]">Claude 3.5 Sonnet</span>
                        <span className="text-[9px] text-white/40 mt-1 font-mono uppercase">Anthropic Block</span>
                        <span className="text-[9px] text-brand-orange mt-3 font-mono uppercase">// ELITE EXECUTION</span>
                      </button>
                      
                      {/* Gemini */}
                      <button
                        onClick={() => setSelectedModel('gemini')}
                        className={`flex flex-col p-3.5 rounded-none border text-left text-xs justify-between transition-all cursor-pointer ${selectedModel === 'gemini' ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-white/5 bg-[#0a0a0a] text-slate-400 hover:bg-white/[0.03]'}`}
                      >
                        <span className="font-bold text-white uppercase tracking-wider text-[10px]">Gemini 2.0 Flash</span>
                        <span className="text-[9px] text-white/40 mt-1 font-mono uppercase">DeepMind Web</span>
                        <span className="text-[9px] text-brand-orange mt-3 font-mono uppercase">// 2M SHARD LIMIT</span>
                      </button>

                      {/* OpenAI */}
                      <button
                        onClick={() => setSelectedModel('openai')}
                        className={`flex flex-col p-3.5 rounded-none border text-left text-xs justify-between transition-all cursor-pointer ${selectedModel === 'openai' ? 'border-brand-orange bg-brand-orange/5 text-white' : 'border-white/5 bg-[#0a0a0a] text-slate-400 hover:bg-white/[0.03]'}`}
                      >
                        <span className="font-bold text-white uppercase tracking-wider text-[10px]">GPT-4o Mini</span>
                        <span className="text-[9px] text-white/40 mt-1 font-mono uppercase">OpenAI Core</span>
                        <span className="text-[9px] text-brand-orange mt-3 font-mono uppercase">// FAST ROUTE</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-4">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    // Go Back
                  </button>
                  <button
                    onClick={handleStartSimulation}
                    className="inline-flex items-center gap-1.5 rounded-none bg-brand-orange hover:bg-white text-black px-6 py-3 text-xs font-black uppercase tracking-widest transition-transform hover:scale-[1.01] shadow-lg shadow-brand-orange/10 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Deploy & Run Loop
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Live debug console & outputs */}
            {activeStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-sans tracking-wide text-brand-orange uppercase block font-bold">Step 4</span>
                    <h3 className="font-display text-base font-bold uppercase text-white flex items-center gap-1.5 mt-0.5">
                      <Terminal className="h-4 w-4 text-brand-orange animate-pulse" />
                      Live Workflow Run & Preview
                    </h3>
                    <p className="text-[9px] text-white/50 font-sans mt-0.5">
                      Mode: <span className="text-brand-orange">Interactive Simulation</span> | Intelligence: <span className="text-brand-orange">{selectedModel.toUpperCase()}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isRunning ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-orange/10 border border-brand-orange/30 text-[9px] font-sans text-brand-orange uppercase font-bold tracking-wider">
                        <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                        Running Task...
                      </span>
                    ) : simulationComplete ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-sans text-emerald-400 uppercase font-bold tracking-wider">
                        ● Completed Successfully
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] font-sans text-white/50 uppercase font-bold tracking-wider">
                        ⌛ Ready to Run
                      </span>
                    )}

                    <button
                      onClick={handleResetSimulation}
                      className="p-1 rounded-none border border-white/10 bg-white/5 hover:bg-brand-orange hover:text-black hover:border-brand-orange text-slate-400 transition-colors cursor-pointer"
                      title="Reset Sandbox"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Mini Visual Flow Graph Render */}
                <div className="rounded-none border border-white/10 bg-black/60 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="text-[9px] font-sans uppercase tracking-wider text-white/50 flex items-center gap-1 font-semibold">
                      <Layers className="h-3 w-3 text-brand-orange" /> Workflow Progress Map:
                    </span>
                    <span className="text-[8.5px] font-sans text-brand-orange/80 uppercase">
                      💡 Hover to inspect &bull; Click to open step details
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2.5 py-4 px-2 bg-black rounded-none border border-white/5 overflow-x-auto">
                    {simulatedSteps.map((step, idx) => {
                      const isStepSuccess = step.status === 'success';
                      const isStepRunning = step.status === 'running';
                      const isSelected = selectedStepIndex === idx;
                      return (
                        <React.Fragment key={idx}>
                          <div className="relative">
                            <button
                              onClick={() => setSelectedStepIndex(selectedStepIndex === idx ? null : idx)}
                              onMouseEnter={() => setHoveredStepIndex(idx)}
                              onMouseLeave={() => setHoveredStepIndex(null)}
                              className={`flex flex-col items-center justify-center px-4 py-2.5 rounded-none border text-center transition-all cursor-pointer focus:outline-none ${
                                isSelected 
                                  ? 'border-brand-orange ring-1 ring-brand-orange bg-brand-orange/15 text-white scale-102 font-bold shadow-lg shadow-brand-orange/10' 
                                  : isStepSuccess 
                                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-300 hover:border-emerald-500/70 hover:bg-emerald-950/25' 
                                    : isStepRunning 
                                      ? 'border-brand-orange bg-brand-orange/10 text-brand-orange animate-pulse font-bold' 
                                      : 'border-white/5 bg-white/2 text-white/30 hover:border-white/15 hover:bg-white/5'
                              }`}
                            >
                              <span className="text-[8px] font-mono text-white/40 mb-0.5 uppercase tracking-wider block font-black">{step.logName}</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider block whitespace-nowrap">{step.title}</span>
                            </button>

                            {/* Floating Absolute Tooltip */}
                            <AnimatePresence>
                              {hoveredStepIndex === idx && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#0a0a0a] border border-brand-orange/40 rounded-none z-30 shadow-2xl pointer-events-none text-left"
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                                      <span className="text-[9px] font-sans font-bold text-brand-orange uppercase">// STEP DETAILS</span>
                                      <span className="text-[8.5px] font-sans bg-white/10 px-1 py-0.5 text-white/70 uppercase font-bold">
                                        {step.status === 'success' ? '✔ DONE' : step.status === 'running' ? '⚡ RUNNING' : '⌛ QUEUED'}
                                      </span>
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-[10px] text-white uppercase tracking-wider">{step.title}</h5>
                                      <p className="text-[9.5px] text-white/50 leading-relaxed mt-0.5">{step.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/5 text-[8.5px] font-sans">
                                      <div>
                                        <span className="text-white/40 block uppercase text-[8px]">EST. TIME</span>
                                        <span className="text-[#eee] font-bold">{step.estimatedDuration}</span>
                                      </div>
                                      <div>
                                        <span className="text-white/40 block uppercase text-[8px]">SERVICE USED</span>
                                        <span className="text-[#eee] font-bold truncate block">{step.logSource}</span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {idx < simulatedSteps.length - 1 && (
                            <ChevronRight className={`h-4 w-4 shrink-0 ${isStepSuccess ? 'text-emerald-500' : isStepRunning ? 'text-brand-orange animate-pulse' : 'text-slate-700'}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Selected Step Telemetry Details on Selector Inspector */}
                  <AnimatePresence>
                    {selectedStepIndex !== null && (() => {
                      const selectedStep = simulatedSteps[selectedStepIndex];
                      if (!selectedStep) return null;
                      return (
                        <motion.div
                          key="inspector-panel"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/10 pt-3 mt-2 font-sans overflow-hidden"
                        >
                          <div className="p-3 bg-black border border-brand-orange/20 rounded-none space-y-3 font-sans">
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                              <span className="text-[9px] tracking-wider text-brand-orange uppercase font-bold flex items-center gap-1.5">
                                <Settings className="h-3.5 w-3.5 text-brand-orange" /> // STEP INSPECTOR: {selectedStep.title.toUpperCase()}
                              </span>
                              <button
                                onClick={() => setSelectedStepIndex(null)}
                                className="text-[9px] text-white/40 hover:text-white uppercase font-bold cursor-pointer"
                              >
                                [Close Inspector]
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">// Selected Step:</span>
                                  <span className="font-bold text-white uppercase text-[11px] font-display">{selectedStep.title}</span>
                                </div>
                                <div>
                                  <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">// Action Performed:</span>
                                  <p className="text-white/60 text-[10.5px] mt-0.5 leading-relaxed font-sans">{selectedStep.description}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 bg-[#0a0a0a] p-2.5 border border-white/5 text-[10px]">
                                <div>
                                  <span className="text-white/40 block text-[8px] uppercase">Est Time:</span>
                                  <span className="font-bold text-brand-orange font-mono text-[10.5px]">{selectedStep.estimatedDuration}</span>
                                </div>
                                <div>
                                  <span className="text-white/40 block text-[8px] uppercase">Task Source:</span>
                                  <span className="font-bold text-white font-mono text-[10.5px] truncate block">{selectedStep.logSource}</span>
                                </div>
                                <div>
                                  <span className="text-white/40 block text-[8px] uppercase">Current Status:</span>
                                  <span className={`font-bold font-mono text-[9px] uppercase ${selectedStep.status === 'success' ? 'text-emerald-400' : selectedStep.status === 'running' ? 'text-brand-orange animate-pulse' : 'text-white/35'}`}>
                                    {selectedStep.status.toUpperCase() === 'SUCCESS' ? 'DONE' : selectedStep.status.toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-white/40 block text-[8px] uppercase">Run Safety Status:</span>
                                  <span className="font-bold text-emerald-400 font-mono text-[9px] uppercase">✔ SECURE</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions under inspector */}
                            <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[9px] text-white/30 uppercase">
                              <span>* Select any other flow segment directly above to compare variables</span>
                              <button
                                onClick={() => console.log(`Manual verification initiated for: ${selectedStep.title}`)}
                                className="px-2.5 py-1 bg-white/5 hover:bg-brand-orange hover:text-black border border-white/10 text-white font-bold text-[9px] tracking-wider transition-colors uppercase cursor-pointer"
                              >
                                Verify Step Health
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>

                {/* Raw Terminal stream logs */}
                <div className="rounded-none border border-white/10 bg-black p-4 text-[10.5px] font-mono font-medium leading-relaxed overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-[10px] uppercase font-bold text-white/40 tracking-wider">
                    <span>Command Channel Stream:</span>
                    <span>ANSI TTY STANDARD</span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto block pr-1 scrollbar-thin">
                    {terminalLogs.length === 0 && (
                      <p className="text-white/30 italic font-mono uppercase text-[9px]">// Core idle. Hit 'Deploy & Run' to initiate execution stream.</p>
                    )}
                    {terminalLogs.map((log, lidx) => (
                      <motion.div
                        key={lidx}
                        initial={{ opacity: 0, x: -3 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={log.includes('WARNING') ? 'text-brand-orange font-bold' : log.includes('Executing') ? 'text-cyan-400' : log.includes('successfully') || log.includes('all assets') ? 'text-emerald-400' : 'text-slate-300'}
                      >
                        {log}
                      </motion.div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                </div>

                {/* Completed Output preview Panel */}
                <AnimatePresence>
                  {simulationComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-none border border-emerald-500/20 bg-emerald-950/5 p-4 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-emerald-400 border-b border-emerald-500/15 pb-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase font-mono tracking-wider">{selectedTemplate.outputs.title}</span>
                      </div>
                      <div className="rounded-none border border-white/5 bg-black/60 p-3 text-slate-300 font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto block">
                        {selectedTemplate.outputs.content}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[10px] font-sans text-white/50 uppercase tracking-wide">
                        <span>Workflow ready. Task is primed to trigger automatically.</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => triggerFeedback("Schedule configured! Daily morning trigger is active.")}
                            className="px-3 py-2 rounded-none bg-white/10 hover:bg-white text-white hover:text-black transition-colors font-bold uppercase text-[10px] tracking-wider border border-white/10 cursor-pointer"
                          >
                            Set Schedule
                          </button>
                          <button
                            onClick={() => {
                              triggerFeedback("Workflow published! Team workspace members can now run it.");
                            }}
                            className="px-3 py-2 rounded-none bg-brand-orange hover:bg-white text-black transition-colors font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                          >
                            Share Template
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Back button */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setActiveStep(3)}
                    disabled={isRunning}
                    className="font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    // Adjust Model Setup
                  </button>

                  {!isRunning && !simulationComplete && (
                    <button
                      onClick={handleStartSimulation}
                      className="inline-flex items-center gap-1.5 rounded-none bg-brand-orange px-5 py-2 text-xs font-black uppercase tracking-widest text-black hover:bg-white cursor-pointer"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Execute Shard Run
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Informative Workspace Specs & Developer Code Ejection */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase font-black block">WORKSPACE TELEMETRY</span>
              <h4 className="font-display text-lg font-bold uppercase tracking-tight text-white mt-1">Sandbox Configuration</h4>
            </div>

            {/* Config metadata metrics list */}
            <ul className="space-y-4 text-xs text-white/60 font-mono">
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-none border border-brand-orange/40 bg-brand-orange/10 text-brand-orange flex items-center justify-center font-mono text-[10px] font-black shrink-0">ST</div>
                <div>
                  <span className="font-black uppercase tracking-wider text-white block text-[10px]">Pipeline Shard</span>
                  <span className="text-[11px] text-white/50 uppercase leading-relaxed">{selectedTemplate.name} // Provisioned specs ready.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-none border border-white/20 bg-white/5 text-white flex items-center justify-center font-mono text-[10px] font-black shrink-0">TL</div>
                <div>
                  <span className="font-black uppercase tracking-wider text-white block text-[10px]">MCP Modules</span>
                  <span className="text-[11px] flex flex-wrap gap-1 mt-1 font-mono uppercase tracking-wider">
                    {connectedTools.map(tId => (
                      <span key={tId} className="bg-white/5 border border-white/10 px-1.5 py-0.5 text-[9.5px] text-brand-orange font-bold">
                        {tId}
                      </span>
                    ))}
                    {connectedTools.length === 0 && <span className="text-white/30 italic">None selected.</span>}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-none border border-white/20 bg-white/5 text-white flex items-center justify-center font-mono text-[10px] font-black shrink-0">RT</div>
                <div>
                  <span className="font-black uppercase tracking-wider text-white block text-[10px]">Router Gateway</span>
                  <span className="text-[11px] text-white/50 uppercase leading-relaxed">
                    {selectedModel === 'auto-route' ? 'Smart Consensus Mesh Model Routing Layer' : `FORCED CONTEXT NETWORK: ${selectedModel}`}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-none border border-brand-orange/40 bg-brand-orange/10 text-brand-orange flex items-center justify-center font-mono text-[10px] font-black shrink-0">PP</div>
                <div>
                  <span className="font-black uppercase tracking-wider text-white block text-[10px]">Developer Trial</span>
                  <span className="text-[11px] text-brand-orange font-black uppercase">Active // 100% Sandbox Capabilities Available</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Code Eject Box */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-sans tracking-wide text-[#F5F5F5]/40 uppercase block font-bold">
                // INSTANT CODE EXPORTS:
              </span>
              <span className="text-[9px] font-sans text-brand-orange uppercase font-bold">TypeScript NATIVE</span>
            </div>
            
            <div className="relative rounded-none border border-white/10 bg-black p-3 text-[10px] font-mono leading-relaxed text-[#eee] block max-h-48 overflow-y-auto">
              <pre>{getEjectedCode()}</pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getEjectedCode());
                  triggerFeedback("Configuration template copied to clipboard!");
                }}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-none border border-white/10 bg-white/5 hover:bg-brand-orange hover:text-black transition-all cursor-pointer"
                title="Copy Ejected Code"
              >
                <Code className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-[9px] font-sans tracking-wide text-white/35 uppercase text-center mt-2 leading-relaxed">
              "Agen binds clean runtime configurations with intuitive visual workspace controls."
            </p>
          </div>

        </div>
      </div>

      {/* Absolute Dynamic Toast Notification */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0a0a0a] border border-brand-orange/60 px-5 py-3 shadow-2xl text-xs text-white uppercase font-sans font-bold"
          >
            <div className="h-2 w-2 rounded-full bg-brand-orange animate-ping" />
            <span>{actionFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
