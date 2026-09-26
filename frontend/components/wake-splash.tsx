"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Plug } from "lucide-react";

const HEALTH_URL = "/health";
const POLL_MS = 2500;
const REQUEST_TIMEOUT_MS = 8000;
const MIN_VISIBLE_MS = 600;
const FADE_MS = 350;
const NOTE_AFTER_S = 15;
const ENTER_AFTER_S = 45;

type Phase = "visible" | "fading" | "gone";

/**
 * Full-screen wake-up splash: the Render backend sleeps on the free plan, so the
 * first tool call after a cold start hangs for up to ~60s. The splash stays up
 * until the frontend has mounted AND /health answers 200 (same-origin via the
 * Netlify proxy), so nobody ever sees a broken playground. Not a gate —
 * Escape or "Enter anyway" always lets a real visitor through.
 */
export function WakeSplash() {
  const [phase, setPhase] = useState<Phase>("visible");
  const [elapsed, setElapsed] = useState(0);

  const mountedAt = useRef(0);
  const dismissed = useRef(false);
  const timers = useRef<number[]>([]);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - mountedAt.current));
    timers.current.push(
      window.setTimeout(() => {
        setPhase("fading");
        timers.current.push(window.setTimeout(() => setPhase("gone"), FADE_MS));
      }, wait),
    );
  }, []);

  // mount timestamp + elapsed counter
  useEffect(() => {
    mountedAt.current = Date.now();
    setElapsed(0);
    const id = window.setInterval(() => {
      if (dismissed.current) return;
      setElapsed(Math.floor((Date.now() - mountedAt.current) / 1000));
    }, 1000);
    return () => {
      window.clearInterval(id);
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, []);

  // poll the backend until it is awake (one request in flight, 8s cap each)
  useEffect(() => {
    if (phase !== "visible") return;

    let cancelled = false;
    let inFlight = false;
    let controller: AbortController | null = null;

    const probe = async () => {
      if (cancelled || inFlight) return;
      inFlight = true;
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), REQUEST_TIMEOUT_MS);
      try {
        const res = await fetch(HEALTH_URL, {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!cancelled && res.status === 200) dismiss();
      } catch {
        /* still asleep, aborted, or offline — try again next tick */
      } finally {
        window.clearTimeout(timeout);
        inFlight = false;
      }
    };

    void probe();
    const id = window.setInterval(() => void probe(), POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      controller?.abort();
    };
  }, [phase, dismiss]);

  // Escape always releases a real visitor
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss]);

  if (phase === "gone") return null;

  const canEnter = elapsed >= ENTER_AFTER_S;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background px-5 text-center transition-opacity duration-[350ms] ease-out ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="space-y-2">
        <p className="flex items-center justify-center gap-2 text-lg font-bold tracking-tight">
          <Plug className="h-4 w-4" /> HireMe MCP
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Connecting to the live API…
        </p>
      </div>

      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-hidden />

      <div className="max-w-[42ch] space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {elapsed < NOTE_AFTER_S
            ? "Waking the live API…"
            : "Free servers sleep when idle — first visit can take up to a minute."}
        </p>
        {canEnter && (
          <button
            onClick={dismiss}
            className="rounded-md border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground"
          >
            Enter anyway
          </button>
        )}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
        {elapsed}s
      </p>
    </div>
  );
}
