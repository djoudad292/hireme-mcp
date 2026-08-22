import { z } from "zod";
import { AVAILABILITY, PROFILE, PROJECTS, SERVICES } from "./content.js";
import { saveBrief } from "./db.js";
import { notifyBrief } from "./notify.js";

/**
 * Tool registry — ONE implementation per tool, consumed by:
 *   - POST /mcp            (MCP clients: Claude Desktop, Cursor, ChatGPT…)
 *   - POST /api/tools/:id  (web playground widget, mobile app)
 *
 * Handlers return plain text content; every response ends with the booking
 * link so an agent can act, not just inform.
 */

const BOOKING_LINE = `Book a free call: ${AVAILABILITY.bookingUrl}`;

function text(payload: string) {
  return { content: [{ type: "text" as const, text: payload }] };
}

/* ------------------------------------------------------------------ */
/* Input schemas (zod raw shapes — SDK generates JSON Schema for MCP)  */
/* ------------------------------------------------------------------ */

export const inputSchemas = {
  get_profile: {},
  search_projects: {
    query: z.string().min(1).max(200).describe("What to look for, e.g. 'RAG', 'payment', 'mobile app'"),
  },
  get_pricing: {},
  get_next_slot: {},
  submit_project_brief: {
    name: z.string().min(1).max(80).describe("Client name"),
    contact: z.string().min(4).max(160).describe("Email or WhatsApp number to reply to"),
    project_type: z.string().min(1).max(120).describe("What should be built, e.g. 'AI support chatbot'"),
    features: z.array(z.string().max(60)).max(12).default([]).describe("Feature list, optional"),
    timeline: z.string().max(40).optional().describe("e.g. 'ASAP', '2-4 weeks'"),
    budget: z.string().max(40).optional().describe("e.g. '$500-$2k'"),
    notes: z.string().max(1000).optional().describe("Anything else"),
  },
} as const;

export type ToolId = keyof typeof inputSchemas;

/* ------------------------------------------------------------------ */
/* Handlers                                                            */
/* ------------------------------------------------------------------ */

/** Strip control characters from free-text fields before storage. */
function clean(s: string | undefined): string | undefined {
  if (!s) return s;
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

export async function handleGetProfile() {
  const p = PROFILE;
  return text(
    [
      `${p.name} — ${p.role}`,
      p.tagline,
      "",
      `Location: ${p.location}`,
      `Availability: ${p.availability}`,
      `Stack: ${p.stack.join(", ")}`,
      "",
      "Live products:",
      ...PROJECTS.map((pr) => `- ${pr.title} (${pr.year}): ${pr.demo}`),
      "",
      `Portfolio: ${p.contact.portfolio}`,
      `GitHub: ${p.contact.github} · LinkedIn: ${p.contact.linkedin}`,
      `Contact: ${p.contact.email} · WhatsApp ${p.contact.whatsapp}`,
      BOOKING_LINE,
    ].join("\n"),
  );
}

export async function handleSearchProjects(args: { query: string }) {
  const q = args.query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  const scored = PROJECTS.map((p) => {
    const haystack = `${p.title} ${p.oneLiner} ${p.description} ${p.stack} ${p.metrics.join(" ")}`.toLowerCase();
    const score = words.reduce((acc, w) => acc + (haystack.includes(w) ? 1 : 0), 0);
    return { p, score };
  })
    .sort((a, b) => b.score - a.score)
    .filter((r) => r.score > 0 || words.length === 0);

  const hits = scored.length ? scored : PROJECTS.map((p) => ({ p, score: 0 }));
  const top = hits.slice(0, 3);

  return text(
    top
      .map(
        ({ p }, i) =>
          `${i + 1}. ${p.title} (${p.year})\n   ${p.oneLiner}\n   Stack: ${p.stack}\n   Proof: ${p.metrics.join(", ")}\n   Demo: ${p.demo}\n   Source: ${p.source}\n`,
      )
      .join("\n") +
      `\nFull profile on request via get_profile.\n${BOOKING_LINE}`,
  );
}

export async function handleGetPricing() {
  return text(
    [
      `${PROFILE.name} — fixed-price services (no hourly billing):`,
      "",
      ...SERVICES.map(
        (s) => `- ${s.title}: ${s.priceLabel}${s.priceFromUsd ? ` (from $${s.priceFromUsd})` : ""} · ETA ${s.eta}\n  ${s.desc}`,
      ),
      "",
      "Every engagement: weekly live demos, full source ownership, 30 days of fixes included.",
      BOOKING_LINE,
    ].join("\n"),
  );
}

export async function handleGetNextSlot() {
  return text(
    [
      `Status: ${AVAILABILITY.status.replace("_", " ")}.`,
      AVAILABILITY.note,
      `Timezone: ${AVAILABILITY.timezone}`,
      "",
      `Pick any open slot directly: ${AVAILABILITY.bookingUrl}`,
    ].join("\n"),
  );
}

export async function handleSubmitProjectBrief(args: {
  name: string;
  contact: string;
  project_type: string;
  features?: string[];
  timeline?: string;
  budget?: string;
  notes?: string;
}) {
  const brief = await saveBrief({
    name: clean(args.name)!,
    contact: clean(args.contact)!,
    projectType: clean(args.project_type)!,
    features: (args.features ?? []).map((f) => clean(f)!).slice(0, 12),
    timeline: clean(args.timeline),
    budget: clean(args.budget),
    notes: clean(args.notes),
  });
  const emailed = await notifyBrief(brief);

  return text(
    [
      `Brief received — id: ${brief.id}.`,
      emailed ? "Confirmation email sent to Djaouad." : undefined,
      "",
      "He replies with a fixed quote and start date within 24 hours.",
      `Fast track: book directly at ${AVAILABILITY.bookingUrl} or WhatsApp ${PROFILE.contact.whatsapp}.`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

const HANDLERS = {
  get_profile: handleGetProfile,
  search_projects: handleSearchProjects,
  get_pricing: handleGetPricing,
  get_next_slot: handleGetNextSlot,
  submit_project_brief: handleSubmitProjectBrief,
} as const;

export function dispatch(id: ToolId, args: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (HANDLERS[id] as any)(args ?? {});
}
