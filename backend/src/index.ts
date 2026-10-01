import crypto from "node:crypto";
import { app, ensureSchema } from "./app.js";

// Local / Render entrypoint. On Vercel the exported app is served
// by api/index.ts instead — this file is not used there.
if (!process.env.VERCEL) {
  const port = Number(process.env.PORT ?? 4343);
  const server = crypto.randomUUID().slice(0, 6);
  ensureSchema()
    .then(() => {
      app.listen(port, () => {
        console.log(`[hireme-mcp:${server}] listening on :${port}`);
        console.log(`  MCP   POST /mcp`);
        console.log(`  REST  /api/tools/:id · /api/tools · /api/briefs`);
        console.log(`  DB    ${process.env.DATABASE_URL ? "postgres" : "memory (set DATABASE_URL to persist)"}`);
        console.log(`  MAIL  ${process.env.GMAIL_USER ? "enabled" : "disabled (set GMAIL_USER + GMAIL_APP_PASSWORD)"}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start:", err);
      process.exit(1);
    });
}
