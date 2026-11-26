/**
 * Minimal Groq client (OpenAI-compatible API) using fetch, so no SDK is needed.
 * Models come from env so they can be swapped when Groq changes its catalog.
 */

const GROQ_BASE = "https://api.groq.com/openai/v1";

export const CHAT_MODELS = [
  process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  process.env.GROQ_FALLBACK_MODEL || "openai/gpt-oss-20b",
];

export const STT_MODEL = process.env.GROQ_STT_MODEL || "whisper-large-v3-turbo";

export interface ChatTurn {
  role: "system" | "user" | "assistant";
  content: string;
}

export class GroqError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function apiKey(): string {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new GroqError(500, "GROQ_API_KEY is not set");
  return key;
}

/** Errors worth retrying on the fallback model: rate limits, server errors, a model that is gone. */
export function isRetryable(err: unknown): boolean {
  return err instanceof GroqError && (err.status === 429 || err.status >= 500 || err.status === 404 || err.status === 400);
}

/**
 * Starts a streaming chat completion and yields content tokens.
 * Throws GroqError before the first token if the request is rejected,
 * so the caller can fall back to another model.
 */
export async function streamChat(
  model: string,
  messages: ChatTurn[],
  signal?: AbortSignal,
): Promise<AsyncGenerator<string>> {
  const res = await fetch(`${GROQ_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.3,
      // gpt-oss models think before answering; keep that short to save tokens and latency.
      reasoning_effort: "low",
      max_completion_tokens: 1024,
    }),
    signal,
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new GroqError(res.status, `Groq ${model} ${res.status}: ${detail.slice(0, 300)}`);
  }

  const body = res.body;
  return (async function* () {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.trim();
          if (!data.startsWith("data:")) continue;
          const payload = data.slice(5).trim();
          if (payload === "[DONE]") return;
          try {
            const json = JSON.parse(payload);
            if (json.error) throw new GroqError(500, String(json.error.message ?? "stream error"));
            const token = json.choices?.[0]?.delta?.content;
            if (token) yield token as string;
          } catch (e) {
            if (e instanceof GroqError) throw e;
            // ignore partial / non-JSON keep-alive lines
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  })();
}
