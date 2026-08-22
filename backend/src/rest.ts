import { Router } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "./mcp.js";
import { inputSchemas, dispatch, type ToolId } from "./tools.js";
import { listBriefs } from "./db.js";

/**
 * REST surface for non-MCP clients (web playground widget, mobile app).
 * Same handlers as the MCP tools — one source of truth.
 */

export const restRouter = Router();

restRouter.get("/tools", (_req, res) => {
  res.json({
    server: "hireme-mcp",
    version: "1.0.0",
    mcpUrl: `${process.env.PUBLIC_URL ?? ""}/mcp`,
    tools: Object.entries(inputSchemas).map(([id, shape]) => ({
      id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input: Object.fromEntries(Object.entries(shape as any).map(([k, v]: [string, any]) => [k, v.description ?? ""])),
    })),
  });
});

restRouter.post("/tools/:id", async (req, res) => {
  const id = req.params.id as ToolId;
  if (!(id in inputSchemas)) {
    res.status(404).json({ error: `Unknown tool '${id}'` });
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = id === "get_profile" || id === "get_pricing" || id === "get_next_slot"
      ? {}
      : requireZodParse(id as Exclude<ToolId, "get_profile" | "get_pricing" | "get_next_slot">, req.body);
    const result = await dispatch(id, parsed);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : "Invalid input" });
  }
});

function requireZodParse(id: ToolId, body: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schema = (inputSchemas as any)[id];
  return schema.parse(body);
}

restRouter.get("/briefs", async (req, res) => {
  const token = (req.headers.authorization ?? "").replace("Bearer ", "");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({ briefs: await listBriefs(100) });
});
