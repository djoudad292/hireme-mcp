import crypto from "node:crypto";

/**
 * Tiny in-memory sliding-window rate limiter — enough for a free-tier demo
 * and stops the write tool from being hammered. Per-IP, no persistence.
 */
const windows = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (windows.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    windows.set(key, hits);
    return false;
  }
  hits.push(now);
  windows.set(key, hits);
  // opportunistic cleanup so the map cannot grow forever
  if (windows.size > 5000) {
    for (const [k, v] of windows) {
      if (v.every((t) => now - t >= windowMs)) windows.delete(k);
    }
  }
  return true;
}

/** Never store raw IPs. */
export function hashIp(ip: string | undefined): string {
  const salt = process.env.ADMIN_TOKEN ?? "hireme-mcp";
  return crypto.createHash("sha256").update(`${salt}:${ip ?? "unknown"}`).digest("hex").slice(0, 16);
}
