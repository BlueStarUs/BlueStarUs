/**
 * In-memory per-IP rate limiter for the public chatbot routes.
 *
 * Note: on Vercel each serverless instance has its own memory, so this is a
 * per-instance limit. Good enough for low traffic; move to a shared store
 * (e.g. Upstash Redis) if abuse becomes a problem.
 */

import type { NextRequest } from "next/server";

interface Window {
  limit: number;
  ms: number;
}

const buckets = new Map<string, number[]>();
let lastSweep = Date.now();

export function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Returns seconds until retry when limited, or 0 when the request is allowed (and counts it). */
export function rateLimit(key: string, windows: Window[]): number {
  const now = Date.now();
  const longest = Math.max(...windows.map((w) => w.ms));

  if (now - lastSweep > 10 * 60 * 1000) {
    for (const [k, times] of buckets) if (!times.length || now - times[times.length - 1] > longest) buckets.delete(k);
    lastSweep = now;
  }

  const times = (buckets.get(key) ?? []).filter((t) => now - t < longest);
  for (const w of windows) {
    const inWindow = times.filter((t) => now - t < w.ms);
    if (inWindow.length >= w.limit) {
      return Math.max(1, Math.ceil((inWindow[0] + w.ms - now) / 1000));
    }
  }
  times.push(now);
  buckets.set(key, times);
  return 0;
}

/** Rejects cross-site browser requests. Requests without an Origin header (same-origin GET, curl) are allowed. */
export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
