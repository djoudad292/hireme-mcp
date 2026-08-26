/**
 * HireMe MCP — single source of truth.
 * Every tool response is derived from this file. Update it and every
 * connected AI client (Claude, Cursor, ChatGPT…) sees the new data.
 */

export const PROFILE = {
  name: "Djaouad Frih",
  role: "Full-Stack AI Engineer",
  tagline: "I build production AI agents, RAG systems, and the products around them — shipped, not demoed.",
  location: "Remote worldwide (UTC+1) — overlaps EU & US hours",
  availability: "Booking projects now — can typically start within days.",
  stack: [
    "TypeScript", "Next.js", "NestJS", "React Native (Expo)", "PostgreSQL",
    "pgvector / RAG", "LangGraph", "Gemini API", "OpenAI API", "Docker",
  ],
  contact: {
    email: "oufr29@gmail.com",
    whatsapp: "+213780688125",
    calendly: "https://calendly.com/oufr29/30min",
    portfolio: "https://djaouad.tech",
    github: "https://github.com/djoudad292",
    linkedin: "https://linkedin.com/in/djaouad-frih-16ab7323a",
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
      "Production receptionist trained on a business's own content — answers customers in under a second via RAG over pgvector, books appointments through tool calls, captures leads, routes conversations to the right department and hands off to humans when confidence drops. Ships as web app + published Android app.",
    stack: "Next.js · NestJS · pgvector · React Native · Gemini",
    metrics: ["<1s first response", "24/7 unattended", "Android app published"],
    demo: "https://chat.djaouad.tech",
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
    demo: "https://docs.djaouad.tech",
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
    demo: "https://customer.djaouad.tech",
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

export const SERVICES: Service[] = [
  {
    title: "Starter — AI chatbot or agent",
    desc: "Trained on your content: answers, books, qualifies, escalates. Deployed to your domain with an embeddable widget.",
    priceFromUsd: 500,
    priceLabel: "From $500",
    eta: "~1–2 weeks",
  },
  {
    title: "Professional — production AI system",
    desc: "Everything in Starter plus RAG pipeline, tool calling, admin dashboard and live analytics — the full stack behind Djaouad's own live demos.",
    priceFromUsd: 2500,
    priceLabel: "From $2,500",
    eta: "2–4 weeks",
  },
  {
    title: "Custom — SaaS & multi-service products",
    desc: "Multi-tenant platforms with payments, dashboards, React Native apps and third-party integrations. Scoped on a free call.",
    priceFromUsd: null,
    priceLabel: "Fixed quote after a free call",
    eta: "2–8 weeks",
  },
];

export const AVAILABILITY = {
  status: "accepting_projects" as const,
  note: "Typically starts within days of the first call. Fixed quotes within 24 hours of receiving a brief.",
  bookingUrl: PROFILE.contact.calendly,
  timezone: "UTC+1 — flexible overlap with EU and US East Coast",
};

/** Famous flows this server was built for — surfaced in docs and the playground. */
export const SCENARIOS = [
  {
    title: "The founder delegate",
    prompt:
      '"Claude, I need a freelance AI engineer to build a support chatbot under $2000. Find someone good and send them my requirements."',
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
