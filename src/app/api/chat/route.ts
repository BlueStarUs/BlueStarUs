/**
 * POST /api/chat — public chatbot endpoint.
 *
 * Request:  { messages: [{ role: "user" | "assistant", content: string }] }
 * Response: NDJSON stream, one JSON object per line:
 *   { "type": "delta", "text": "..." }      answer tokens, in order
 *   { "type": "done", "actionLink": {...} } final metadata (link button)
 *   { "type": "error", "message": "..." }   friendly message to show instead
 */

import { NextRequest, NextResponse } from "next/server";
import { SECURITY_HEADERS } from "@/lib/admin-auth";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";
import { getKnowledgeSearch } from "@/lib/chatbot/knowledge-store";
import { buildSystemPrompt } from "@/lib/chatbot/prompt";
import { CHAT_MODELS, isRetryable, streamChat, type ChatTurn } from "@/lib/chatbot/groq";
import { clientIp, isAllowedOrigin, rateLimit } from "@/lib/chatbot/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const MAX_TURNS = 6;
const MAX_MESSAGE_CHARS = 1000;
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const BOOKING_LINK = { label: "Book a consultation", href: HUBSPOT_CONSULTATION_URL };

const BUSY_MESSAGE =
  "I'm getting a lot of questions right now. Please try again in a minute, or book a consultation and our team will help you directly.";

type ActionLink = { label: string; href: string };

/** Identical first questions (the suggested ones especially) are answered from cache, using no tokens. */
const answerCache = new Map<string, { text: string; actionLink: ActionLink; at: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000;

function json(body: unknown, status: number, extra: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...SECURITY_HEADERS, ...extra } });
}

function parseMessages(raw: unknown): ChatTurn[] | null {
  if (!raw || typeof raw !== "object" || !Array.isArray((raw as { messages?: unknown }).messages)) return null;
  const turns: ChatTurn[] = [];
  for (const m of (raw as { messages: unknown[] }).messages.slice(-MAX_TURNS)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (text) turns.push({ role, content: text });
  }
  if (!turns.length || turns[turns.length - 1].role !== "user") return null;
  return turns;
}

function linkFor(best: { title: string; resource: string } | null, lowConfidence: boolean): ActionLink {
  if (!best || lowConfidence || best.resource === HUBSPOT_CONSULTATION_URL) return BOOKING_LINK;
  const title = best.title.replace(/^FAQ:\s*/, "");
  return { label: `Learn more: ${title.length > 38 ? `${title.slice(0, 36).trim()}...` : title}`, href: best.resource };
}

/** Below this BM25 score the match is too weak to point people at a page. Tuned with `npm run kb:test`. */
const LOW_CONFIDENCE_SCORE = 15;

/** Phrases the model uses when it declines or lacks the information. */
const DECLINE_RE =
  /\b(i['’]?m sorry|i can only help|i can['’]?t help|cannot help|i don['’]?t have (that|this|any|specific)|can['’]?t guarantee|cannot guarantee|not able to (help|answer))\b/i;

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) return json({ error: "Forbidden" }, 403);

  const ip = clientIp(req);
  const retryAfter = rateLimit(`chat:${ip}`, [
    { limit: 8, ms: 60_000 },
    { limit: 100, ms: 24 * 60 * 60_000 },
  ]);
  if (retryAfter) {
    return json({ type: "error", message: BUSY_MESSAGE }, 429, { "Retry-After": String(retryAfter) });
  }

  const rawBody = await req.text();
  if (rawBody.length > MAX_BODY_BYTES) return json({ error: "Request too large" }, 413);
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const turns = parseMessages(parsed);
  if (!turns) return json({ error: "Invalid messages" }, 400);

  const question = turns[turns.length - 1].content;
  const isFirstQuestion = turns.filter((t) => t.role === "user").length === 1;
  const cacheKey = question.toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(/\s+/g, " ").trim();
  const emailShared = EMAIL_RE.test(question);

  // Retrieval: short follow-ups ("what about the cost?") also use the previous question.
  const search = await getKnowledgeSearch();
  const previousUser = [...turns].reverse().find((t, i) => i > 0 && t.role === "user")?.content;
  const wordCount = question.split(/\s+/).length;
  const query = previousUser && wordCount < 7 ? `${question} ${previousUser}` : question;
  const retrieved = search.retrieve(query);
  const lowConfidence = retrieved.topScore < LOW_CONFIDENCE_SCORE;
  const actionLink = linkFor(retrieved.best, lowConfidence);

  const encoder = new TextEncoder();
  const line = (obj: unknown) => encoder.encode(`${JSON.stringify(obj)}\n`);

  const cached = isFirstQuestion && !emailShared ? answerCache.get(cacheKey) : undefined;
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(line({ type: "delta", text: cached.text }));
        controller.enqueue(line({ type: "done", actionLink: cached.actionLink }));
        controller.close();
      },
    });
    return new Response(body, { headers: streamHeaders() });
  }

  const messages: ChatTurn[] = [
    {
      role: "system",
      content: buildSystemPrompt(retrieved.contextText, {
        emailShared,
        today: new Date().toISOString().slice(0, 10),
      }),
    },
    ...turns,
  ];

  const body = new ReadableStream({
    async start(controller) {
      let answer = "";
      try {
        let tokens: AsyncGenerator<string> | null = null;
        let lastError: unknown = null;
        for (const model of CHAT_MODELS) {
          try {
            tokens = await streamChat(model, messages, req.signal);
            break;
          } catch (err) {
            lastError = err;
            console.warn("[chat]", (err as Error).message);
            if (!isRetryable(err)) break;
          }
        }
        if (!tokens) throw lastError ?? new Error("No model available");

        for await (const token of tokens) {
          answer += token;
          controller.enqueue(line({ type: "delta", text: token }));
        }
        if (!answer.trim()) throw new Error("Empty answer");

        // A refusal or "I don't know" should point to booking, not to whichever page matched best.
        const finalLink = DECLINE_RE.test(answer) ? BOOKING_LINK : actionLink;
        controller.enqueue(line({ type: "done", actionLink: finalLink }));
        if (isFirstQuestion && !emailShared) {
          if (answerCache.size >= 200) answerCache.delete(answerCache.keys().next().value!);
          answerCache.set(cacheKey, { text: answer, actionLink: finalLink, at: Date.now() });
        }
      } catch (err) {
        if (req.signal.aborted) return controller.close();
        console.error("[chat] failed:", (err as Error).message);
        controller.enqueue(
          line(
            answer
              ? { type: "done", actionLink }
              : { type: "error", message: BUSY_MESSAGE, actionLink: BOOKING_LINK },
          ),
        );
      }
      controller.close();
    },
  });

  return new Response(body, { headers: streamHeaders() });
}

function streamHeaders(): HeadersInit {
  return {
    ...SECURITY_HEADERS,
    "Content-Type": "application/x-ndjson; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Accel-Buffering": "no",
  };
}
