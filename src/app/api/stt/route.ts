/**
 * POST /api/stt — speech-to-text for the chatbot mic (English only).
 *
 * Request:  multipart/form-data with an "audio" file (webm / mp4 / ogg from MediaRecorder)
 * Response: { text: string } or { error: string }
 *
 * Audio is forwarded to Groq Whisper and not stored.
 */

import { NextRequest, NextResponse } from "next/server";
import { SECURITY_HEADERS } from "@/lib/admin-auth";
import { STT_MODEL } from "@/lib/chatbot/groq";
import { clientIp, isAllowedOrigin, rateLimit } from "@/lib/chatbot/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** ~30 s of compressed speech is well under this; Vercel's own request limit is 4.5 MB. */
const MAX_AUDIO_BYTES = 2 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  "audio/webm": "webm",
  "audio/ogg": "ogg",
  "audio/mp4": "mp4",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/x-m4a": "m4a",
};

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...SECURITY_HEADERS, "Cache-Control": "no-store", ...extra } });
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) return json({ error: "Forbidden" }, 403);

  const retryAfter = rateLimit(`stt:${clientIp(req)}`, [
    { limit: 6, ms: 60_000 },
    { limit: 60, ms: 24 * 60 * 60_000 },
  ]);
  if (retryAfter) {
    return json({ error: "Voice input is busy right now. Please type your question or try again in a minute." }, 429, {
      "Retry-After": String(retryAfter),
    });
  }

  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_AUDIO_BYTES + 64 * 1024) return json({ error: "Recording is too long. Please keep it under 30 seconds." }, 413);

  let audio: File | null = null;
  try {
    const form = await req.formData();
    const value = form.get("audio");
    audio = value instanceof File ? value : null;
  } catch {
    return json({ error: "Invalid upload" }, 400);
  }
  if (!audio || audio.size === 0) return json({ error: "No audio received" }, 400);
  if (audio.size > MAX_AUDIO_BYTES) return json({ error: "Recording is too long. Please keep it under 30 seconds." }, 413);

  const baseType = audio.type.split(";")[0].trim().toLowerCase();
  const ext = EXTENSIONS[baseType];
  if (!ext) return json({ error: "Unsupported audio format" }, 415);

  const key = process.env.GROQ_API_KEY;
  if (!key) return json({ error: "Voice input is not configured" }, 500);

  const upstream = new FormData();
  upstream.append("file", new Blob([await audio.arrayBuffer()], { type: baseType }), `speech.${ext}`);
  upstream.append("model", STT_MODEL);
  upstream.append("language", "en");
  upstream.append("response_format", "json");
  upstream.append("temperature", "0");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: upstream,
      signal: req.signal,
    });
    if (!res.ok) {
      console.error("[stt] Groq", res.status, (await res.text().catch(() => "")).slice(0, 300));
      const busy = res.status === 429;
      return json(
        { error: busy ? "Voice input is busy right now. Please type your question or try again in a minute." : "Sorry, I couldn't understand that. Please try again or type your question." },
        busy ? 429 : 502,
      );
    }
    const data = (await res.json()) as { text?: string };
    return json({ text: (data.text ?? "").trim().slice(0, 1000) });
  } catch (err) {
    console.error("[stt] failed:", (err as Error).message);
    return json({ error: "Sorry, voice input failed. Please type your question." }, 502);
  }
}
