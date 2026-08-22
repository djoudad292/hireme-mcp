"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://mcp.djaouad.tech";
const MCP_URL = `${API_URL}/mcp`;

const TABS = [
  {
    id: "claude",
    label: "Claude Desktop",
    file: "claude_desktop_config.json",
    snippet: JSON.stringify(
      { mcpServers: { "hireme-mcp": { url: MCP_URL } } },
      null,
      2,
    ),
    note: "Settings → Developer → Edit Config → paste and restart Claude Desktop.",
  },
  {
    id: "cursor",
    label: "Cursor",
    file: "~/.cursor/mcp.json",
    snippet: JSON.stringify({ mcpServers: { "hireme-mcp": { url: MCP_URL } } }, null, 2),
    note: "Cursor Settings → MCP → Add new global MCP server.",
  },
  {
    id: "cli",
    label: "Claude Code / CLI",
    file: "shell",
    snippet: `claude mcp add --transport http hireme-mcp ${MCP_URL}`,
    note: "One command — then ask Claude about Djaouad in any project.",
  },
  {
    id: "curl",
    label: "Raw curl",
    file: "shell",
    snippet: `curl -X POST ${MCP_URL} \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json, text/event-stream' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`,
    note: "Any MCP client speaking Streamable HTTP works — no auth needed to read.",
  },
];

export function ConnectConfigs() {
  const [tab, setTab] = useState(TABS[0]);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
              tab.id === t.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute right-3 top-3">
          <CopyButton text={tab.snippet} />
        </div>
        <p className="px-5 pt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{tab.file}</p>
        <pre className="overflow-x-auto px-5 py-3 pr-24 font-mono text-xs leading-relaxed text-foreground/90">
          {tab.snippet}
        </pre>
      </div>
      <p className="border-t border-border px-5 py-3 text-xs text-muted-foreground">{tab.note}</p>
    </div>
  );
}
