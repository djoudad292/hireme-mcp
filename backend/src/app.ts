import "dotenv/config";
import express from "express";
import cors from "cors";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "./mcp.js";
import { restRouter } from "./rest.js";
import { ensureSchema } from "./db.js";
import { hashIp, rateLimit } from "./rateLimit.js";

export const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "256kb" }));

/**
 * MCP endpoint — Streamable HTTP, stateless mode.
 * A fresh server + transport per request: no sessions to persist, safe for
 * scale-to-zero/serverless hosts. GET/DELETE are not used in this mode.
 */
app.post("/mcp", async (req, res) => {
  try {
    if (!isInitializeRequest(req.body) && !req.body?.method) {
      res.status(400).json({ jsonrpc: "2.0", error: { code: -32600, message: "Invalid Request" }, id: null });
      return;
    }
    const server = createMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("[mcp] error handling request:", err);
    if (!res.headersSent) {
      res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal error" }, id: null });
    }
  }
});

app.get("/mcp", (_req, res) => {
  res.status(405).json({ error: "Stateless MCP: POST only" });
});
app.delete("/mcp", (_req, res) => {
  res.status(405).json({ error: "Stateless MCP: no sessions" });
});

// Health check.
app.get("/health", (_req, res) => res.json({ ok: true, service: "hireme-mcp" }));

app.use("/api", restRouter);

// Serve the embeddable widget.
app.use(express.static(new URL("../public", import.meta.url).pathname));
app.get("/widget.js", (_req, res) =>
  res.sendFile("widget.js", { root: new URL("../public", import.meta.url).pathname }),
);

// Global write-guard: brief submissions per IP (defense in depth with the tool-level limiter).
app.use("/api/tools/submit_project_brief", (req, res, next) => {
  const key = `brief:${hashIp(req.ip)}`;
  if (!rateLimit(key, 5, 60 * 60 * 1000)) {
    res.status(429).json({ error: "Too many briefs from this client — try again later." });
    return;
  }
  next();
});

export { ensureSchema };
