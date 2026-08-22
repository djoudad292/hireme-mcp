import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { inputSchemas, dispatch, type ToolId } from "./tools.js";

/**
 * Builds a fresh McpServer with the five HireMe tools registered.
 * A new instance per request keeps the endpoint stateless — it survives
 * free-tier restarts and needs no session store.
 */

const META = {
  name: "hireme-mcp",
  version: "1.0.0",
};

const TOOL_CONFIG: Record<
  ToolId,
  { title: string; description: string; annotations?: Record<string, unknown> }
> = {
  get_profile: {
    title: "Get Djaouad's profile",
    description:
      "Who Djaouad Frih is: full-stack AI engineer, stack, live products, availability and contact links. Call this first.",
  },
  search_projects: {
    title: "Search shipped projects",
    description:
      "Search Djaouad's production projects (AI receptionist, RAG document workspace, tool-calling support agent) for proof of relevant experience.",
    annotations: { readOnlyHint: true },
  },
  get_pricing: {
    title: "Get pricing",
    description: "Fixed-price service list in USD with ETAs. No hourly billing.",
    annotations: { readOnlyHint: true },
  },
  get_next_slot: {
    title: "Check availability & book",
    description: "Current availability status plus the direct booking link.",
    annotations: { readOnlyHint: true },
  },
  submit_project_brief: {
    title: "Submit a project brief",
    description:
      "File a project brief on the client's behalf. Djaouad replies with a fixed quote within 24 hours. Use after confirming scope with the human.",
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
};

export function createMcpServer(): McpServer {
  const server = new McpServer(META);

  server.registerTool(
    "get_profile",
    TOOL_CONFIG.get_profile as never,
    async () => dispatch("get_profile", {}),
  );
  server.registerTool(
    "search_projects",
    { ...TOOL_CONFIG.search_projects, inputSchema: inputSchemas.search_projects } as never,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (args: any) => dispatch("search_projects", args),
  );
  server.registerTool(
    "get_pricing",
    TOOL_CONFIG.get_pricing as never,
    async () => dispatch("get_pricing", {}),
  );
  server.registerTool(
    "get_next_slot",
    TOOL_CONFIG.get_next_slot as never,
    async () => dispatch("get_next_slot", {}),
  );
  server.registerTool(
    "submit_project_brief",
    { ...TOOL_CONFIG.submit_project_brief, inputSchema: inputSchemas.submit_project_brief } as never,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (args: any) => dispatch("submit_project_brief", args),
  );

  return server;
}
