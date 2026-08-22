# HireMe MCP

**The first portfolio AI agents can hire.** An open [Model Context Protocol](https://modelcontextprotocol.io) server that exposes Djaouad Frih's real profile, shipped products, fixed pricing and a project-brief intake — so Claude, Cursor, ChatGPT or any MCP client can vet the work and file a brief on your behalf.

Live: **https://mcp.djaouad.tech** · MCP endpoint: `https://mcp.djaouad.tech/mcp`

## Tools

| Tool | Type | What it does |
|---|---|---|
| `get_profile` | read | Identity, stack, live products, availability, contact links |
| `search_projects` | read | Semantic-ish search over shipped projects (proof of experience) |
| `get_pricing` | read | Fixed-price services in USD with ETAs |
| `get_next_slot` | read | Availability status + direct booking link |
| `submit_project_brief` | **write** | Files a project brief → persisted + emailed. Rate limited per IP |

## The famous flows

1. **Founder delegate** — *"Claude, find me an AI engineer under $2k and send them my requirements"* → their agent calls `get_pricing` → `search_projects` → files a brief.
2. **Recruiter deep-dive** — *"Has he actually shipped RAG?"* → grounded answers with demo links.
3. **Comparison shopper** — pricing + timeline vs. an agency, plus next opening.

## Structure

```
backend/    Express + @modelcontextprotocol/sdk (Streamable HTTP, stateless)
            POST /mcp            ← MCP clients
            /api/tools/:id       ← same handlers over REST (widget, mobile)
            /api/briefs          ← admin inbox (Bearer ADMIN_TOKEN)
            /widget.js           ← embeddable badge
frontend/   Next.js console (Netlify → mcp.djaouad.tech): connect configs,
            live playground, scenarios
mobile/     Expo app: profile, tool runner, admin briefs inbox
```

## Run locally

```bash
cd backend  && npm i && npm run dev        # :4343
cd frontend && npm i && npm run dev        # set NEXT_PUBLIC_API_URL=http://localhost:4343
cd mobile   && npm i && npm start          # Expo Go
```

Copy `backend/.env.example` → `.env`. Without `DATABASE_URL` it runs in memory-only demo mode; without Gmail creds email notifications are skipped silently.

## Deploy

- **Backend → Render**: `render.yaml` included (free tier). Set `DATABASE_URL`, `ADMIN_TOKEN`, optional `GMAIL_USER`/`GMAIL_APP_PASSWORD`.
- **Frontend → Netlify**: repo import picks up `netlify.toml` (static export). Attach custom domain `mcp.djaouad.tech`.
- **Mobile → APK**: `eas build -p android --profile preview` or `expo run:android`.

## Connect in one paste

```json
{ "mcpServers": { "hireme-mcp": { "url": "https://mcp.djaouad.tech/mcp" } } }
```

---

Built by [Djaouad Frih](https://djaouad.tech) — this server is itself the demo of what he ships.
