import { ArrowUpRight, Bot, Plug, FileSignature, Radio } from "lucide-react";
import { Playground } from "@/components/playground";
import { ConnectConfigs } from "@/components/connect-configs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://hireme-mcp-backend.onrender.com";

const STEPS = [
  {
    icon: Plug,
    title: "Connect",
    desc: "One URL into Claude, Cursor or any MCP client. No auth for read tools.",
  },
  {
    icon: Bot,
    title: "Ask",
    desc: "Your AI queries profile, shipped projects and pricing — grounded, not hallucinated.",
  },
  {
    icon: FileSignature,
    title: "Hire",
    desc: "The agent files a project brief on your behalf. Fixed quote back within 24 hours.",
  },
];

const SCENARIOS = [
  {
    title: "The founder delegate",
    prompt:
      '"Claude — I need a freelance AI engineer to build a support chatbot under $2,000. Find someone good and send them my requirements."',
    tools: ["get_pricing", "search_projects", "submit_project_brief"],
  },
  {
    title: "The recruiter deep-dive",
    prompt: '"Check whether Djaouad has shipped production RAG systems and if he is available right now."',
    tools: ["get_profile", "search_projects"],
  },
  {
    title: "The comparison shopper",
    prompt: '"Compare Djaouad\'s pricing vs an agency for a document-Q&A product, and check his next opening."',
    tools: ["get_pricing", "search_projects", "get_next_slot"],
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24">
      {/* ---------------- Hero ---------------- */}
      <header className="pt-20 pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          An open server on the Model Context Protocol
        </p>
        <h1 className="mt-4 max-w-[24ch] font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          The first portfolio <em className="italic text-primary">AI agents</em> can hire.
        </h1>
        <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-muted-foreground">
          HireMe MCP exposes Djaouad Frih&apos;s real profile, shipped products, fixed pricing and a
          project-brief intake over the Model Context Protocol. Connect it once — then your AI does
          the hiring homework: vets the work, checks availability, files the brief.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#connect"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Connect it to your AI
          </a>
          <a
            href="#playground"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary"
          >
            Try the tools live
          </a>
          <span className="flex items-center gap-2 pl-1 font-mono text-[11px] text-muted-foreground">
            <Radio className="h-3.5 w-3.5 animate-pulse text-primary" /> live · no auth to read
          </span>
        </div>
      </header>

      {/* ---------------- How it works ---------------- */}
      <section aria-labelledby="how-h" className="py-12">
        <h2 id="how-h" className="sr-only">How it works</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-3 font-medium">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Scenarios ---------------- */}
      <section aria-labelledby="scen-h" className="py-12">
        <h2 id="scen-h" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Built for these moments
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {SCENARIOS.map((s) => (
            <figure key={s.title} className="flex flex-col rounded-2xl border-l-2 border-l-primary border border-border bg-card p-5">
              <blockquote className="text-sm leading-relaxed">{s.prompt}</blockquote>
              <figcaption className="mt-auto pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary">{s.title}</p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">{s.tools.join(" → ")}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- Connect ---------------- */}
      <section id="connect" aria-labelledby="connect-h" className="scroll-mt-8 py-12">
        <h2 id="connect-h" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Connect it in one paste
        </h2>
        <div className="mt-5">
          <ConnectConfigs />
        </div>
      </section>

      {/* ---------------- Playground ---------------- */}
      <section id="playground" aria-labelledby="pg-h" className="scroll-mt-8 py-12">
        <h2 id="pg-h" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Playground — same tools your AI sees
        </h2>
        <p className="mb-5 mt-2 max-w-[60ch] text-sm text-muted-foreground">
          These buttons hit the same handlers behind the MCP endpoint at{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[11px]">{API_URL}/mcp</code>.
        </p>
        <Playground />
      </section>

      {/* ---------------- Widget ---------------- */}
      <section id="widget" aria-labelledby="w-h" className="scroll-mt-8 py-12">
        <h2 id="w-h" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Or embed the badge anywhere
        </h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card p-5">
          <pre className="overflow-x-auto rounded-xl bg-background/70 p-4 font-mono text-xs text-foreground/90">
            {`<script src="${API_URL}/widget.js" async></script>`}
          </pre>
          <p className="mt-3 text-xs text-muted-foreground">
            Drops an &ldquo;Hire via AI&rdquo; badge on any site — visitors click, see the tools, connect their agent.
          </p>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <a href="https://djaouad.tech" className="text-foreground underline-offset-4 hover:underline">
            Djaouad Frih
          </a>{" "}
          — Full-Stack AI Engineer. This server is itself the demo of what he ships.
        </p>
        <a
          href="https://github.com/djoudad292/hireme-mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          source <ArrowUpRight className="h-3 w-3" />
        </a>
      </footer>
    </main>
  );
}
