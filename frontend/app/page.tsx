import { ArrowUpRight, Download, Plug } from "lucide-react";
import { Playground } from "@/components/playground";
import { ConnectConfigs } from "@/components/connect-configs";
import { WakeSplash } from "@/components/wake-splash";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://mcp.djaouad.tech";
const APK_URL = "https://github.com/djoudad292/hireme-mcp/releases/download/latest-apk/hireme-mcp.apk";
const GITHUB_URL = "https://github.com/djoudad292/hireme-mcp";
const BLOG_URL = "https://djaouad.is-a.dev";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 items-center justify-between max-w-6xl px-5">
        <a href="#" className="text-lg font-bold tracking-tight">HireMe MCP</a>
        <div className="flex items-center gap-3">
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-border px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> Android App
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            Source
          </a>
          <a
            href="#connect"
            className="rounded-md bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-colors hover:opacity-90"
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
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-border px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">claude — mcp</span>
        </div>
        <div className="space-y-3.5 p-5 font-mono text-[11px] leading-relaxed sm:p-6">
          <p className="flex items-center gap-2 text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> connected · hireme-mcp@1.0.0
          </p>
          <div className="rounded-md bg-secondary px-3 py-2.5 text-muted-foreground">
            <p className="mb-1 text-[9px] uppercase tracking-wider">user</p>
            Find me a freelance AI engineer under $2k for a support chatbot.
          </div>
          <div className="rounded-md border border-border bg-background px-3 py-2.5">
            <p className="mb-1 text-[9px] uppercase tracking-wider text-foreground">agent · tool call</p>
            <p className="text-muted-foreground">get_pricing() →</p>
            <p className="mt-1 text-foreground">AI agents &amp; chatbots — From $500 · ~1–2 weeks</p>
          </div>
          <div className="rounded-md border border-border bg-background px-3 py-2.5">
            <p className="mb-1 text-[9px] uppercase tracking-wider text-foreground">agent · tool call</p>
            <p className="text-muted-foreground">search_projects("RAG") →</p>
            <p className="mt-1 text-foreground">Smart PDF Workspace — docs.djaouad.tech ✓</p>
          </div>
          <div className="rounded-md bg-foreground px-3 py-2.5 font-medium text-background">
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
        className="absolute -bottom-5 -right-2 hidden items-center gap-3 rounded-md border border-border bg-card px-4 py-3 transition-colors hover:border-foreground sm:flex"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-xl text-foreground">
          <Download className="h-4 w-4" />
        </span>
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
      {/* Sits above the sticky nav (same z-50, later in DOM) so the whole screen is covered. */}
      <WakeSplash />

      {/* ---------------- Hero ---------------- */}
      <header className="mx-auto grid items-center gap-10 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3.5 py-1 font-mono text-[11px] text-foreground">
            <Plug className="h-3 w-3" /> Model Context Protocol Server
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            The First Portfolio
            <br />
            <span className="text-foreground">AI Agents Can Hire</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
            HireMe MCP exposes Djaouad Frih&apos;s real profile, shipped products, fixed pricing and
            a project-brief intake over MCP. Connect it once — your AI does the hiring homework:
            vets the work, checks availability, files the brief.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#playground"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Try the Tools <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#connect"
              className="rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Connect in one paste
            </a>
          </div>
        </div>
        <McpPanel />
      </header>

      {/* ---------------- How it works ---------------- */}
      <section className="border-y border-border/60 bg-secondary py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight">Three Steps to Hire</h2>
          <div className="mt-8 grid gap-3.5 md:grid-cols-3">
            {[
              { icon: Plug, title: "Connect", desc: "One URL into Claude, Cursor or any MCP client." },
              {
                icon: Download,
                title: "Ask",
                desc: "Your AI queries profile, shipped projects and pricing — grounded, not hallucinated.",
              },
              {
                icon: ArrowUpRight,
                title: "Hire",
                desc: "The agent files a project brief on your behalf. Fixed quote back within 24 hours.",
              },
            ].map((s) => (
              <div key={s.title} className="rounded-md border border-border bg-card px-5 py-4">
                <s.icon className="h-5 w-5 text-foreground" />
                <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Scenarios ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <span className="mx-auto block w-fit rounded-md border border-border bg-secondary px-3.5 py-1 font-mono text-[11px] text-foreground">
          Built for these moments
        </span>
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight">
          Flows This Server Was Built For
        </h2>
        <div className="mt-8 grid gap-3.5 md:grid-cols-3">
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
            <figure
              key={s.tools[0]}
              className="flex flex-col rounded-md border-l-2 border-l-foreground border-border bg-card px-5 py-4"
            >
              <blockquote className="text-sm leading-relaxed">{s.prompt}</blockquote>
              <figcaption className="mt-auto pt-4 font-mono text-[10px] text-muted-foreground">
                {s.tools.join(" → ")}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- Connect ---------------- */}
      <section id="connect" className="scroll-mt-14 border-t border-border/60 bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-foreground">
            One-paste setup
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight">
            Connect It In Seconds
          </h2>
          <ConnectConfigs />
        </div>
      </section>

      {/* ---------------- Playground ---------------- */}
      <section id="playground" className="mx-auto max-w-5xl scroll-mt-14 px-5 py-16">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-foreground">
          Live API
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight">Playground</h2>
        <p className="mx-auto mt-2 max-w-[56ch] text-center text-sm text-muted-foreground">
          No sign-in required. Pick a tool and run it — this calls the live API the same
          MCP tools use. Write tools are rate-limited per visitor.
        </p>
        <Playground />
      </section>

      {/* ---------------- Conversion banner ---------------- */}
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-center text-sm text-muted-foreground">
            Built by Djaouad Frih · Want this for your business? →{" "}
            <a
              href={BLOG_URL}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              https://djaouad.is-a.dev
            </a>
          </p>
          <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground/70">
            {API_URL}/mcp · open protocol · no lock-in
          </p>
        </div>
      </footer>
    </main>
  );
}
