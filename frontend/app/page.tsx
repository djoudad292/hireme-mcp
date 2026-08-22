import { ArrowUpRight, Bot, FileSignature, Plug, Radio } from "lucide-react";
import { Playground } from "@/components/playground";
import { ConnectConfigs } from "@/components/connect-configs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://mcp.djaouad.tech";
const APK_URL = "https://github.com/djoudad292/hireme-mcp/releases/download/latest-apk/hireme-mcp.apk";
const GITHUB_URL = "https://github.com/djoudad292/hireme-mcp";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent font-mono text-sm font-bold text-primary-foreground">
            ⌁
          </span>
          <span className="text-lg font-bold tracking-tight">HireMe MCP</span>
        </a>
        <div className="flex items-center gap-3">
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:inline-flex"
          >
            ⤓ Android App
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            Source
          </a>
          <a
            href="#connect"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90"
          >
            Connect Your AI
          </a>
        </div>
      </div>
    </nav>
  );
}

/** Terminal-style mockup of an actual MCP session. */
function McpPanel() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[28px] border border-border bg-card shadow-2xl shadow-primary/10">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-border px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">claude — mcp</span>
        </div>
        <div className="space-y-4 p-5 font-mono text-[11px] leading-relaxed sm:p-6">
          <p className="flex items-center gap-2 text-primary">
            <Radio className="h-3 w-3 animate-pulse" /> connected · hireme-mcp@1.0.0
          </p>
          <div className="rounded-xl bg-secondary p-3 text-muted-foreground">
            <p className="mb-1 text-[9px] uppercase tracking-wider">user</p>
            Find me a freelance AI engineer under $2k for a support chatbot.
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <p className="mb-1 text-[9px] uppercase tracking-wider text-primary">agent · tool call</p>
            <p className="text-muted-foreground">get_pricing() →</p>
            <p className="mt-1 text-foreground">&quot;AI agents &amp; chatbots — From $500 · ~1–2 weeks&quot;</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <p className="mb-1 text-[9px] uppercase tracking-wider text-primary">agent · tool call</p>
            <p className="text-muted-foreground">search_projects(&quot;RAG&quot;) →</p>
            <p className="mt-1 text-foreground">Smart PDF Workspace — docs.djaouad.tech ✓</p>
          </div>
          <div className="rounded-xl bg-primary p-3 font-medium text-primary-foreground">
            <p className="mb-1 text-[9px] uppercase opacity-70">submit_project_brief()</p>
            Brief filed ✓ Fixed quote within 24h.
          </div>
        </div>
      </div>

      {/* floating APK card */}
      <a
        href={APK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -bottom-6 -right-2 hidden items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl transition-colors hover:border-primary sm:flex"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-xl text-primary-foreground">⤓</span>
        <span>
          <span className="block text-sm font-semibold">Download for Android</span>
          <span className="block text-xs text-muted-foreground">Free · 54 MB · monitor briefs</span>
        </span>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ---------------- Hero ---------------- */}
      <header className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-16 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-secondary px-4 py-1.5 font-mono text-[11px] text-primary">
            <Plug className="h-3 w-3" /> Model Context Protocol Server
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            The First Portfolio
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Agents Can Hire
            </span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
            HireMe MCP exposes Djaouad Frih&apos;s real profile, shipped products, fixed pricing and
            a project-brief intake over MCP. Connect it once — your AI does the hiring homework:
            vets the work, checks availability, files the brief.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#connect"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Start Free — No Credit Card <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#playground"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
            >
              Try the Tools
            </a>
          </div>
        </div>
        <McpPanel />
      </header>

      {/* ---------------- How it works ---------------- */}
      <section className="border-y border-border/60 bg-card/40 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-center text-4xl font-bold tracking-tight">Three Steps to Hire</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Plug, title: "Connect", desc: "One URL into Claude, Cursor or any MCP client. No auth for read tools." },
              { icon: Bot, title: "Ask", desc: "Your AI queries profile, shipped projects and pricing — grounded, not hallucinated." },
              { icon: FileSignature, title: "Hire", desc: "The agent files a project brief on your behalf. Fixed quote back within 24 hours." },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
                <s.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Scenarios ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <span className="mx-auto block w-fit rounded-full border border-primary/30 bg-secondary px-4 py-1.5 font-mono text-[11px] text-primary">
          Built for these moments
        </span>
        <h2 className="mt-4 text-center text-4xl font-bold tracking-tight">
          Famous Flows This Server Was Built For
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              prompt: '"Claude — I need a freelance AI engineer to build a support chatbot under $2,000. Find someone good and send them my requirements."',
              tools: ["get_pricing", "search_projects", "submit_project_brief"],
            },
            {
              prompt: '"Check whether Djaouad has shipped production RAG systems and if he is available right now."',
              tools: ["get_profile", "search_projects"],
            },
            {
              prompt: '"Compare Djaouad\'s pricing vs an agency for a document-Q&A product, and check his next opening."',
              tools: ["get_pricing", "search_projects", "get_next_slot"],
            },
          ].map((s) => (
            <figure key={s.tools[0]} className="flex flex-col rounded-2xl border-l-2 border-l-primary border border-border bg-card p-6">
              <blockquote className="text-sm leading-relaxed">{s.prompt}</blockquote>
              <figcaption className="mt-auto pt-5 font-mono text-[10px] text-muted-foreground">
                {s.tools.join(" → ")}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- Connect ---------------- */}
      <section id="connect" className="scroll-mt-16 border-t border-border/60 bg-card/40 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            One-paste setup
          </p>
          <h2 className="mb-10 mt-3 text-center text-4xl font-bold tracking-tight">
            Connect It In Seconds
          </h2>
          <ConnectConfigs />
        </div>
      </section>

      {/* ---------------- Playground ---------------- */}
      <section id="playground" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          Live API
        </p>
        <h2 className="mb-3 mt-3 text-center text-4xl font-bold tracking-tight">Playground</h2>
        <p className="mx-auto mb-10 max-w-[56ch] text-center text-sm text-muted-foreground">
          Same handlers behind{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[11px]">{API_URL}/mcp</code> —
          what your AI sees is what you get.
        </p>
        <Playground />
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-border/60 py-10">
        <p className="text-center text-sm text-muted-foreground">
          Built by{" "}
          <a href="https://djaouad.tech" className="font-medium text-foreground underline-offset-4 hover:underline">
            Djaouad Frih
          </a>{" "}
          — Full-Stack AI Engineer. This server is itself the demo of what he ships.
        </p>
        <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground/70">
          {API_URL}/mcp · open protocol · no lock-in
        </p>
      </footer>
    </main>
  );
}
