/**
 * HireMe MCP — single source of truth.
 * Every tool response is derived from this file. Update it and every
 * connected AI client (Claude, Cursor, ChatGPT…) sees the new data.
 */

export const PROFILE = {
  name: "Djaouad Frih",
  role: "Full-Stack AI Engineer",
  tagline: "I build production AI agents, RAG systems, and the products around them — shipped, not demoed.",
  location: "Remote worldwide (UTC+1) — overlaps EU business hours; 13:00–17:00 UTC US-East overlap",
  availability: "Booking projects now — can typically start within days.",
  stack: [
    "TypeScript", "Next.js", "NestJS", "React Native (Expo)", "PostgreSQL",
    "pgvector / RAG", "LangGraph", "Gemini API", "OpenAI API", "Docker",
  ],
  contact: {
    email: "contact@djaouad.is-a.dev",
    whatsapp: "+213780688125",
    // VERIFIED 2026-10-04: cal.com/djaouad/30min returns HTTP 404 — the handle
    // was never created. Calendly handle below is live. This must stay
    // identical to portfolio-website/lib/positioning.ts BOOKING_URL.
    booking: "https://calendly.com/oufr29/30min",
    portfolio: "https://djaouad.is-a.dev",
    github: "https://github.com/djoudad292",
    linkedin: "https://linkedin.com/in/djaouad-frih",
  },
} as const;

export interface Project {
  id: string;
  title: string;
  year: string;
  oneLiner: string;
  description: string;
  stack: string;
  metrics: string[];
  demo: string;
  source: string;
}

export const PROJECTS: Project[] = [
  {
    id: "receptionist",
    title: "AI Virtual Receptionist",
    year: "2025",
    oneLiner: "24/7 receptionist that answers, books, captures leads and routes by department.",
    description:
      "Production receptionist trained on a business's own content — answers customers from a pgvector RAG index, books appointments through tool calls, captures leads, routes conversations to the right department and hands off to humans when confidence drops. Ships as web app + published Android app. Note: end-to-end answer latency is model-bound and has not been benchmarked; ask for current p50/p95 on your own content before committing to a figure.",
    stack: "Next.js · NestJS · pgvector · React Native · Gemini",
    metrics: ["Books + captures leads", "24/7 unattended", "Android app published"],
    demo: "https://chat.djaouad.is-a.dev",
    source: "https://github.com/djoudad292/ai-virtual-receptionist",
  },
  {
    id: "pdf-workspace",
    title: "Smart PDF Workspace",
    year: "2025",
    oneLiner: "Chat with your documents — cited answers, summaries, embeddable widget.",
    description:
      "Upload documents and ask questions with answers grounded in citations. Multi-tenant teams, token revocation, one-click ask-your-docs widget for embedding on any site. Full ingestion → chunking → pgvector retrieval → generation pipeline.",
    stack: "Next.js · NestJS · pgvector · OpenRouter · JWT",
    metrics: ["Cited RAG answers", "Multi-tenant teams", "Embeddable widget"],
    demo: "https://docs.djaouad.is-a.dev",
    source: "https://github.com/djoudad292/smart-pdf-workspace",
  },
  {
    id: "support-agent",
    title: "AI Customer Support Agent",
    year: "2026",
    oneLiner: "Tool-calling support agent with tickets, order lookups and live admin analytics.",
    description:
      "LangGraph agent wired to real business tools: creates support tickets, checks order status, searches the knowledge base and escalates to humans with full context. Includes an admin dashboard with live analytics and a one-line embeddable chat widget. This very MCP service runs beside it.",
    stack: "Next.js · NestJS · LangGraph · pgvector · WebSocket",
    metrics: ["5 tools wired to the agent", "Live admin analytics", "One-line embed"],
    demo: "https://customer.djaouad.is-a.dev",
    source: "https://github.com/djoudad292/ai-customer-support-agent",
  },
];

export interface Service {
  title: string;
  desc: string;
  priceFromUsd: number | null;
  priceLabel: string;
  eta: string;
}

/**
 * THE LADDER — keep byte-identical to portfolio-website/lib/positioning.ts.
 * The audit is FREE (the entry offer). Full builds start at $3,500. This is the
 * single price floor exposed to AI agents via get_pricing, matching the
 * PORTFOLIO_PRICE_ANCHOR. One number, no contradiction.
 */
export const AUDIT_OFFER = {
  price: "Free",
  duration: "one week, target",
  summary:
    "Retrieval and authorization audit on your own documents. Precision/recall/F1 against a goldset built from your corpus, refusal rate on out-of-scope questions, citation correctness, p50/p95 latency and token cost, and a server-side authorization review.",
  terms: "Failures are published alongside the scores. Credited in full against any build that follows. Turnaround is a target, not a guarantee — it depends on the size of the corpus turned into a goldset.",
} as const;

export const SERVICES: Service[] = [
  {
    title: "Audit — AI reliability & retrieval review",
    desc: "The entry offer. One week, target — turnaround depends on the size of the corpus turned into a goldset. Retrieval precision/recall/F1 against a goldset from your own corpus, refusal rate on out-of-scope questions, citation correctness, p50/p95 latency and token cost, and a server-side authorization review. Failures published, not hidden. Credited in full against a build.",
    priceFromUsd: null,
    priceLabel: "Free",
    eta: "one week, target",
  },
  {
    title: "Starter — AI chatbot or agent",
    desc: "Trained on your content: answers, books, qualifies, escalates. Deployed to your domain with an embeddable widget.",
    priceFromUsd: 3500,
    priceLabel: "From $3,500",
    eta: "~1–2 weeks",
  },
  {
    title: "Professional — production AI system",
    desc: "Everything in Starter plus RAG pipeline, tool calling, admin dashboard and live analytics — the full stack behind Djaouad's own live demos.",
    priceFromUsd: 6500,
    priceLabel: "From $6,500",
    eta: "2–4 weeks",
  },
  {
    title: "Custom — SaaS & multi-service products",
    desc: "Multi-tenant platforms with payments, dashboards, React Native apps and third-party integrations. Scoped on a free call.",
    priceFromUsd: 9000,
    priceLabel: "From $9,000",
    eta: "2–8 weeks",
  },
  {
    title: "Monitoring — post-deployment ops",
    desc: "The part nobody sells and every buyer needs. Retrieval drift alerting, model-migration and deprecation handling, rollback path, and the eval harness kept wired into CI so a regression removes the merge button.",
    priceFromUsd: 300,
    priceLabel: "$300/month",
    eta: "ongoing",
  },
  {
    title: "White-label — agency capacity",
    desc: "I work as your delivery layer: scoped, fixed-price, end-to-end builds you take to the client under your brand. You keep the relationship and the margin; I bring production engineering and retrieval benchmarking. Starts at $3,500.",
    priceFromUsd: 3500,
    priceLabel: "From $3,500",
    eta: "1–3 weeks",
  },
];

export const AVAILABILITY = {
  status: "accepting_projects" as const,
  note: "Typically starts within days of the first call. Fixed quotes within 24 hours of receiving a brief.",
  bookingUrl: PROFILE.contact.booking,
  timezone: "UTC+1 — overlaps EU business hours; 13:00–17:00 UTC US-East overlap",
};

/** Famous flows this server was built for — surfaced in docs and the playground. */
export const SCENARIOS = [
  {
    title: "The founder delegate",
    prompt:
      '"Claude, I need a freelance AI engineer to build a support chatbot. Find someone good and send them my requirements."',
    tools: ["get_pricing", "search_projects", "submit_project_brief"],
  },
  {
    title: "The agency white-label",
    prompt:
      '"Find me a freelance AI engineer to build my client a production retrieval system, quoted fixed-price as my delivery layer."',
    tools: ["get_pricing", "search_projects", "submit_project_brief"],
  },
  {
    title: "The recruiter deep-dive",
    prompt: '"Check if Djaouad has shipped production RAG systems and whether he\'s available."',
    tools: ["get_profile", "search_projects"],
  },
  {
    title: "The comparison shopper",
    prompt: '"Compare Djaouad\'s pricing and timeline against hiring an agency for a document-Q&A product."',
    tools: ["get_pricing", "search_projects", "get_next_slot"],
  },
];
