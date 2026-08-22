import nodemailer from "nodemailer";
import { PROFILE } from "./content.js";
import type { Brief } from "./db.js";

/**
 * Optional email notification for new briefs. Enabled only when both
 * GMAIL_USER and GMAIL_APP_PASSWORD are present — otherwise silent no-op
 * (the brief is still persisted).
 */

export async function notifyBrief(brief: Brief): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return false;

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    const body = [
      `New project brief submitted via HireMe MCP (id: ${brief.id})`,
      "",
      `Name:    ${brief.name}`,
      `Contact: ${brief.contact}`,
      `Build:   ${brief.projectType}`,
      `Features:${brief.features.length ? " " + brief.features.join(", ") : " open"}`,
      `Timeline: ${brief.timeline || "—"}`,
      `Budget:   ${brief.budget || "—"}`,
      brief.notes ? `Notes: ${brief.notes}` : "",
      "",
      "— hireme-mcp",
    ]
      .filter(Boolean)
      .join("\n");

    await transport.sendMail({
      from: `HireMe MCP <${user}>`,
      to: PROFILE.contact.email,
      subject: `[MCP lead] ${brief.projectType} — ${brief.name}`,
      text: body,
    });
    return true;
  } catch {
    return false;
  }
}
