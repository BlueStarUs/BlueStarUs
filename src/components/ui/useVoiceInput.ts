"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceState = "idle" | "recording" | "transcribing";

/** Recordings stop automatically after this, to keep uploads small and within free-tier limits. */
const MAX_RECORDING_MS = 30_000;

/** First type the browser can record. Chrome/Firefox: webm/ogg, Safari: mp4. */
const MIME_CANDIDATES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus", "audio/ogg"];

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return MIME_CANDIDATES.find((t) => MediaRecorder.isTypeSupported?.(t));
}

/**
 * Press-to-record voice input: records with MediaRecorder, sends the audio to
 * /api/stt (Groq Whisper, English) and passes the transcript to `onText`.
 */
export function useVoiceInput(onText: (text: string) => void) {
  const [state, setState] = useState<VoiceState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);
  const onTextRef = useRef(onText);

  useEffect(() => {
    onTextRef.current = onText;
  }, [onText]);

  useEffect(() => {
    // Feature detection must run in the browser, after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined");
  }, []);

  const releaseMic = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const transcribe = useCallback(async (blob: Blob) => {
    setState("transcribing");
    try {
      const form = new FormData();
      const ext = blob.type.includes("mp4") ? "mp4" : blob.type.includes("ogg") ? "ogg" : "webm";
      form.append("audio", blob, `speech.${ext}`);
      const res = await fetch("/api/stt", { method: "POST", body: form });
      const data = (await res.json().catch(() => ({}))) as { text?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Voice input failed. Please type your question.");
      const text = (data.text ?? "").trim();
      if (!text) throw new Error("I didn't catch that. Please try again.");
      onTextRef.current(text);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setState("idle");
    }
  }, []);

  const stop = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
  }, []);

  const start = useCallback(async () => {
    if (state !== "idle") return;
    setError(null);
    cancelledRef.current = false;
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (err) {
      const name = (err as DOMException).name;
      setError(
        name === "NotAllowedError" || name === "SecurityError"
          ? "Microphone access is blocked. Please allow it in your browser settings, or type your question."
          : "No microphone found. Please type your question.",
      );
      return;
    }

    streamRef.current = stream;
    const mimeType = pickMimeType();
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      releaseMic();
      recorderRef.current = null;
      if (cancelledRef.current) {
        setState("idle");
        return;
      }
      const blob = new Blob(chunks, { type: recorder.mimeType || mimeType || "audio/webm" });
      if (blob.size < 1000) {
        setState("idle");
        setError("That was too short. Please tap the mic and speak a little longer.");
        return;
      }
      void transcribe(blob);
    };

    recorderRef.current = recorder;
    recorder.start();
    setState("recording");
    timerRef.current = setTimeout(stop, MAX_RECORDING_MS);
  }, [state, releaseMic, stop, transcribe]);

  /** Stops without transcribing (e.g. when the chat closes). */
  const cancel = useCallback(() => {
    cancelledRef.current = true;
    stop();
    releaseMic();
  }, [stop, releaseMic]);

  useEffect(() => cancel, [cancel]);

  return { state, error, supported, start, stop, cancel, clearError: () => setError(null) };
}
