export interface AgentTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  prompt: string;
  recommendedTools: string[];
  suggestedModel: string;
  steps: {
    title: string;
    description: string;
    status: 'idle' | 'running' | 'success' | 'warn';
    logName: string;
  }[];
  thoughts: string[];
  outputs: {
    title: string;
    content: string;
  };
}

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'content-repurposer',
    name: 'Content Pipeline Agent',
    emoji: '✍️',
    description: 'Repurpose YouTube video transcripts into tweet threads, newsletters, & LinkedIn posts.',
    prompt: 'Read a new YouTube URL transcript, draft a 5-tweet summary thread, compile a professional newsletter email in markdown, and write a high-engagement LinkedIn post summarizing the takeaway points.',
    recommendedTools: ['browser-fetch', 'gmail-client', 'notion-vault', 'twitter-mcp'],
    suggestedModel: 'auto-route',
    steps: [
      { title: 'Retrieve Transcript', description: 'Fetch YouTube API or scrape transcript notes', status: 'idle', logName: 'browser-fetch' },
      { title: 'Draft Twitter Thread', description: 'Format 5 cohesive tweets from key concepts', status: 'idle', logName: 'gemini-flash' },
      { title: 'Compose Newsletter', description: 'Write Markdown email matching tone guidelines', status: 'idle', logName: 'gemini-flash' },
      { title: 'Draft LinkedIn Post', description: 'Establish high-impact outline and bullet callouts', status: 'idle', logName: 'gemini-flash' },
      { title: 'Publish Drafts', description: 'Save items inside Notion workspace team database', status: 'idle', logName: 'notion-vault' }
    ],
    thoughts: [
      '🔮 Initializing orchestrator: Analyzing content pipeline requirements...',
      '🔍 Executing YouTube Transcript Scrape for URL...',
      '📝 YouTube transcript successfully fetched (4,520 words). Distilling core insights...',
      '🧠 Prompting model for 5-part Twitter Thread generation (optimized for reach)...',
      '📬 Creating email newsletter draft in professional yet casual tone...',
      '💼 Creating professional LinkedIn copy focused on entrepreneurial and technical lessons...',
      '💾 Connecting to Notion... Storing draft entries under Content Hub schema...',
      '🎉 All assets drafted! Repurposed materials are fully formatted and staged.'
    ],
    outputs: {
      title: 'Repurposed Outputs Staged (Notion Workspace)',
      content: `### 🐦 Generated Twitter Thread (5 Tweets)
1/ Just dropped a deep-dive review of our serverless architecture choices. If you're building with React & MCP, you need to read this transition breakdown. Let's dig in: 🧵

2/ First principle: Developer setup. We moved away from heavy local Python modules toward standardized Model Context Protocol (MCP) servers. The result? 10x faster local iterations.

...

### ✉️ Newsletter Draft (Markdown)
**Subject:** Moving from Local Loops to Serverless Agents

Hey there,
This week, we took a hard look at our agentic workflows. We discovered that 80% of developer friction comes from writing tool-use boilerplate. Here is how we automated tool connections in 5 lines...`
    }
  },
  {
    id: 'linkedin-outreach',
    name: 'LinkedIn Outbound Agent',
    emoji: '🚀',
    description: 'Perform lead research, personalize pitches, and queue outreach drafts automatically.',
    prompt: 'Query Crunchbase or LinkedIn for seed-stage SaaS founders in healthcare, analyze their landing pages for pain points, and draft highly personalized messaging pitches to be saved for owner review.',
    recommendedTools: ['browser-fetch', 'crunchbase', 'linkedin-mcp', 'slack-vault'],
    suggestedModel: 'claude-3-5',
    steps: [
      { title: 'Search Healthcare SaaS', description: 'Filter target lists matching ICP parameters', status: 'idle', logName: 'crunchbase' },
      { title: 'Analyze Landing Pages', description: 'Scrape homepage headings to extract value statement', status: 'idle', logName: 'browser-fetch' },
      { title: 'Craft Bespoke Pitch', description: 'Draft short outreach message reference pain points', status: 'idle', logName: 'claude-3-5' },
      { title: 'Check Human Approval', description: 'Queue drafts for supervisor click approval', status: 'idle', logName: 'human-in-loop' }
    ],
    thoughts: [
      '🔮 Targeting criteria: SaaS Founders & Healthcare (Seed to Series A)',
      '🔍 Queries issued to company database index... Pulled 12 potential targets.',
      '🌐 Indexing targets. Fetching homepage structure for top 3: CarePulse, PathAI, GuardRx...',
      '📊 Synthesizing value propositions and identifying onboarding bottlenecks...',
      '✍️ Drafting message for Jane Doe (CEO @ CarePulse) highlighting automated scheduling value...',
      '✍️ Drafting message for Aaron Smith (Founder @ GuardRx) focusing on compliance tools...',
      '📥 Queue-status: Staging drafts inside LinkedIn Outreach pipeline...',
      '👀 Registered Human-in-the-Loop breakpoint. Waiting for supervisor approval before trigger.'
    ],
    outputs: {
      title: 'LinkedIn Outreach Pitch Drafts Staged',
      content: `### 🎯 Pitch for Jane Doe (CarePulse CEO)
"Hi Jane, noticed CarePulse recently launched its automatic doctor-patient matching. Love the speed but wondered how you handle edge-case scheduling overlaps. Our team built an MCP scheduling scheduler that drops override rates by 40% without complex setups. Let me know if you would open a 2min review!"`
    }
  },
  {
    id: 'github-reviewer',
    name: 'GitHub Security PR Reviewer',
    emoji: '🛡️',
    description: 'Scan new PR file diffs, analyze security and vulnerability holes, write suggestions.',
    prompt: 'Listen to webhook for new PRs. Scrape the Git diff file list, run a prompt targeting security vulnerability vectors (e.g. SQL Injection, unvalidated tokens), and write line comments directly in the GitHub PR review draft.',
    recommendedTools: ['github-mcp', 'browser-fetch', 'slack-vault'],
    suggestedModel: 'gpt-4o',
    steps: [
      { title: 'Intercept Webhook', description: 'Capture pull request open event payload', status: 'idle', logName: 'github-mcp' },
      { title: 'Ingest Diff Patch', description: 'Extract file modifications and nested paths', status: 'idle', logName: 'github-mcp' },
      { title: 'Review Code Security', description: 'Evaluate cryptographic and validation vulnerabilities', status: 'idle', logName: 'gpt-4o' },
      { title: 'Post Review Comments', description: 'Draft inline annotations on specific lines', status: 'idle', logName: 'github-mcp' }
    ],
    thoughts: [
      '🔮 Webhook listener activated. Intercepted PR #240. Author: @dev-lucas',
      '📂 Ingesting modified files: src/auth/jwt.ts, server/database.ts...',
      '🛠️ Scanned database.ts. WARNING: Detected direct string formatting inside SQL query on line 42 (possible SQL injection vulnerability)!',
      '🛠️ Scanned jwt.ts. Highlighted missing expiration grace period check.',
      '🧠 Preparing GitHub review annotations block...',
      '🚀 Posting automated security notes as "DRAFT REVIEW COMMENT" to PR #240...',
      '📣 Alerting developer channel via Slack notification.'
    ],
    outputs: {
      title: 'PR #240 Security Audit Review Posted',
      content: `### ❌ Vulnerability Found in \`server/database.ts\` (Line 42)
\`\`\`typescript
// Unsafe raw interpolation query
const query = \`SELECT * FROM users WHERE id = '\${req.body.id}'\`;
\`\`\`
👉 **Suggested Remediation (Parameterized Query):**
\`\`\`typescript
const query = 'SELECT * FROM users WHERE id = $1';
await client.query(query, [req.body.id]);
\`\`\``
    }
  },
  {
    id: 'competitor-watcher',
    name: 'Competitor Price Watcher',
    emoji: '📊',
    description: 'Monitor competitive retail structures, record deviations, and push summaries to Slack.',
    prompt: 'Scrape competitive landing catalog page daily for premium sneakers, compare with internal pricing matrix, flag pricing differences higher than 5%, write update to Google Sheets, and slack marketing managers.',
    recommendedTools: ['browser-fetch', 'google-sheets-mcp', 'slack-vault'],
    suggestedModel: 'auto-route',
    steps: [
      { title: 'Scrape Competitor Site', description: 'Crawl shoes catalog grid page prices', status: 'idle', logName: 'browser-fetch' },
      { title: 'Compare Price Delta', description: 'Map items to internal master dataset', status: 'idle', logName: 'gemini-flash' },
      { title: 'Update Google Sheet', description: 'Append columns with date and latest rates', status: 'idle', logName: 'google-sheets-mcp' },
      { title: 'Push Alert to Slack', description: 'Send bulleted discount alerts to channel', status: 'idle', logName: 'slack-vault' }
    ],
    thoughts: [
      '🔮 Initializing scraping workflow: Competitor sneaker pricing watchdog...',
      '🌐 Loading viewport renderer... Parsing shoes product catalog index page...',
      '📊 Successfully matched 12 overlapping runner shoes between competitor and our listings.',
      '⚖️ Calculating margins. Found competitor price drop: "Swift Runner v4" marked down by 14% ($120 -> $103)!',
      '📈 Connected to Google Sheets. Appending rows in "Price Monitor Tab"...',
      '💬 formatting slack markdown block for marketing channel alert...',
      '🚀 Slack message delivered successfully to #marketing-alerts.'
    ],
    outputs: {
      title: 'Sneaker Competitor Intel Dispatch',
      content: `### 🚨 Competitor Price Deviation Warning!
The competitor dropped prices on key inventories below our standard delta threshold:
* **Item:** Swift Runner v4
* **Our Price:** $122.00
* **Competitor Price:** $103.00 (Delta: **-15.5%** ⚠️)
* **Status:** Appended to master spreadsheet. Recommendation: match or launch 10% promo code.`
    }
  }
];

export interface Benchmark {
  competitor: string;
  strengths: string;
  weaknesses: string;
  advantage: string;
}

export const COMPETITORS: Benchmark[] = [
  { competitor: 'Claude Managed Agents', strengths: 'Reliable infra, deep Claude tools', weaknesses: 'Claude-only, lacks visual builder', advantage: 'Multi-provider routing, visual workspace' },
  { competitor: 'OpenAI Agents SDK', strengths: 'Strong ecosystem, good function calls', weaknesses: 'GPT-only, requires core coding', advantage: 'Provider-agnostic, natural setup' },
  { competitor: 'LangGraph / CrewAI', strengths: 'Powerful customization structures', weaknesses: 'High complexity, no UI', advantage: '5-min setup, drag-and-drop builder' },
  { competitor: 'n8n / Zapier', strengths: 'Large API libraries, friendly UI', weaknesses: 'Deterministic, weak reasoning', advantage: 'Dynamic planning and auto-replanning' },
  { competitor: 'Relevance AI', strengths: 'Enterprise targeting modules', weaknesses: 'Rigid ecosystem, expensive', advantage: 'Open MCP integrations, code eject' },
];

export interface ArchLayer {
  id: string;
  name: string;
  short: string;
  tech: string;
  color: string;
  details: string[];
}

export const ARCHITECTURE_LAYERS: ArchLayer[] = [
  {
    id: 'platform',
    name: 'Platform Layer (UI & CLI)',
    short: 'Web Workspace UI, Flow Canvas, Debug Terminals',
    tech: 'React, WebSockets, Tailwind',
    color: 'border-violet-500 bg-violet-950/20 text-violet-300',
    details: [
      'React-based client workspace & view manager',
      'Real-time socket state synchronizers',
      'Drag-and-drop Visual Flow Canvas interface',
      'Run log metrics with inline debugger'
    ]
  },
  {
    id: 'orchestration',
    name: 'Orchestration Engine',
    short: 'Task Executors, Breakpoint Queues, Checkpoints',
    tech: 'TypeScript, BullMQ, Redis',
    color: 'border-cyan-500 bg-cyan-950/20 text-cyan-300',
    details: [
      'Core thought-action-observation runtime loops',
      'Orchestration routing of sub-workers',
      'Pause/resume approval checkpoints',
      'Configurable background trigger cron logs'
    ]
  },
  {
    id: 'gateway',
    name: 'Model Gateway',
    short: 'LLM Multi-Router, Schema Normalization',
    tech: 'Gateway APIs SDK router',
    color: 'border-amber-500 bg-amber-950/20 text-amber-300',
    details: [
      'Hassle-free provider-agnostic LLM router',
      'Direct input-output JSON normalizer',
      'Automatic cost-performance routing',
      'Request queues and rate limits protective wrapper'
    ]
  },
  {
    id: 'tools',
    name: 'Tool Integration Layer',
    short: 'MCP Servers, REST Modules, Credentials Vaults',
    tech: 'MCP Protocol TypeScript SDK',
    color: 'border-rose-500 bg-rose-950/20 text-rose-300',
    details: [
      'Supports standard Model Context Protocol servers',
      'Credential encryption vault (AES-256)',
      'Sandboxed secure execution wrappers',
      'Standard library adapters for key workspace APIs'
    ]
  },
  {
    id: 'data',
    name: 'Data Layer',
    short: 'State Storage, Run logs, Objects storage',
    tech: 'Postgres, S3 Store, Redis Cache',
    color: 'border-emerald-500 bg-emerald-950/20 text-emerald-300',
    details: [
      'Persistent system states configuration tables',
      'Redis instant dispatchers and event registries',
      'S3 bucket capture logs holding outputs',
      'Strict Row Level Security rules setup'
    ]
  }
];
