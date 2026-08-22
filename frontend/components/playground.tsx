"use client";

import { useState } from "react";
import { Play, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4343";

type ToolId = "get_profile" | "search_projects" | "get_pricing" | "get_next_slot" | "submit_project_brief";

const TOOLS: { id: ToolId; label: string; args: Record<string, string> }[] = [
  { id: "get_profile", label: "get_profile", args: {} },
  { id: "search_projects", label: "search_projects", args: { query: "RAG documents" } },
  { id: "get_pricing", label: "get_pricing", args: {} },
  { id: "get_next_slot", label: "get_next_slot", args: {} },
  {
    id: "submit_project_brief",
    label: "submit_project_brief",
    args: { name: "", contact: "", project_type: "AI support chatbot", budget: "$500-$2k", timeline: "ASAP", notes: "" },
  },
];

export function Playground() {
  const [active, setActive] = useState<ToolId>("search_projects");
  const [argsJson, setArgsJson] = useState(JSON.stringify({ query: "RAG documents" }, null, 2));
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = (t: (typeof TOOLS)[number]) => {
    setActive(t.id);
    setArgsJson(JSON.stringify(t.args, null, 2));
    setResult("");
    setError(null);
  };

  const run = async () => {
    setBusy(true);
    setError(null);
    setResult("");
    try {
      const args = argsJson.trim() ? JSON.parse(argsJson) : {};
      const res = await fetch(`${API}/api/tools/${active}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setResult((data as any).content?.[0]?.text ?? JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap gap-1.5 border-b border-border p-3">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => pick(t)}
            className={`rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
              active === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border-b border-border md:border-b-0 md:border-r">
          <p className="px-4 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            arguments.json
          </p>
          <textarea
            value={argsJson}
            onChange={(e) => setArgsJson(e.target.value)}
            rows={9}
            spellCheck={false}
            className="w-full resize-none bg-transparent px-4 py-3 font-mono text-xs text-foreground outline-none"
          />
          <button
            onClick={run}
            disabled={busy}
            className="mx-4 mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
            Run tool
          </button>
        </div>

        <div className="min-h-[220px] bg-background/60">
          <p className="px-4 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">response</p>
          {error && <p className="px-4 py-3 font-mono text-xs text-red-400">✗ {error}</p>}
          <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-xs leading-relaxed text-muted-foreground">
            {result || "// pick a tool and hit run — this calls the live API the MCP tools use"}
          </pre>
        </div>
      </div>
    </div>
  );
}
