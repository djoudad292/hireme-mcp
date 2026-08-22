import { Pool } from "pg";

/**
 * Briefs persist to Postgres when DATABASE_URL is set (same DB host as the
 * other products). Without it, the service degrades gracefully: briefs are
 * logged and kept in memory so demos still work end-to-end.
 */

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: /sslmode=require/.test(process.env.DATABASE_URL) ? undefined : { rejectUnauthorized: false },
      max: 5,
    })
  : null;

const memoryBriefs: Brief[] = [];

export interface Brief {
  id: string;
  name: string;
  contact: string;
  projectType: string;
  features: string[];
  timeline?: string;
  budget?: string;
  notes?: string;
  createdAt: string;
}

export async function ensureSchema(): Promise<void> {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS project_briefs (
      id            TEXT PRIMARY KEY,
      name          TEXT NOT NULL,
      contact       TEXT NOT NULL,
      project_type  TEXT NOT NULL,
      features      JSONB NOT NULL DEFAULT '[]',
      timeline      TEXT,
      budget        TEXT,
      notes         TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

export async function saveBrief(brief: Omit<Brief, "id" | "createdAt">): Promise<Brief> {
  const full: Brief = {
    id: crypto.randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
    ...brief,
  };
  if (pool) {
    await pool.query(
      `INSERT INTO project_briefs (id, name, contact, project_type, features, timeline, budget, notes)
       VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8)`,
      [full.id, full.name, full.contact, full.projectType, JSON.stringify(full.features), full.timeline, full.budget, full.notes],
    );
  } else {
    memoryBriefs.push(full);
  }
  return full;
}

export async function listBriefs(limit = 50): Promise<Brief[]> {
  if (pool) {
    const res = await pool.query(
      `SELECT id, name, contact, project_type AS "projectType", features,
              timeline, budget, notes, created_at AS "createdAt"
       FROM project_briefs ORDER BY created_at DESC LIMIT $1`,
      [limit],
    );
    return res.rows as Brief[];
  }
  return memoryBriefs.slice(-limit).reverse();
}
