"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_READ_KEY = "bluestars-chat-auto-read";

/** Voices that sound natural, in order of preference; otherwise the first English voice. */
const PREFERRED_VOICES = [/google us english/i, /natural/i, /aria|jenny|guy/i, /samantha/i, /google uk english female/i, /zira/i];

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const english = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  for (const re of PREFERRED_VOICES) {
    const v = english.find((voice) => re.test(voice.name));
    if (v) return v;
  }
  return english.find((v) => v.lang.toLowerCase() === "en-us") ?? english[0];
}

/** Turns a chat answer into text that sounds right when spoken. */
export function toSpeakableText(text: string): string {
  return text
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\S+@\S+\.\w+/g, (email) => email.replace("@", " at ").replace(/\./g, " dot "))
    .replace(/[*_#`>]+/g, "")
    .replace(/^\s*[-•]\s+/gm, "")
    .replace(/([:;,.!?])\s*\n+\s*/g, "$1 ")
    .replace(/\s*\n+\s*/g, ". ")
    .replace(/\.\s*\./g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Chrome cuts off long utterances, so speak sentence-sized pieces in a queue. */
function splitForSpeech(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*/g) ?? [text];
  const parts: string[] = [];
  let current = "";
  for (const s of sentences) {
    if ((current + s).length > 200 && current) {
      parts.push(current.trim());
      current = "";
    }
    current += s;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/**
 * Read-aloud for chat replies using the browser's built-in speech (free, no API).
 * English voice only. `speakingId` tells the UI which message is being read.
 */
export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [autoRead, setAutoReadState] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const runRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => {
      voiceRef.current = pickVoice(window.speechSynthesis.getVoices());
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    // Feature detection and saved preference can only be read in the browser, after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(true);
    setAutoReadState(window.localStorage.getItem(AUTO_READ_KEY) === "1");
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    runRef.current++;
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, []);

  const speak = useCallback(
    (id: string, text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const run = ++runRef.current;
      const parts = splitForSpeech(toSpeakableText(text));
      if (!parts.length) return;

      setSpeakingId(id);
      parts.forEach((part, i) => {
        const u = new SpeechSynthesisUtterance(part);
        u.lang = voiceRef.current?.lang ?? "en-US";
        if (voiceRef.current) u.voice = voiceRef.current;
        u.rate = 1;
        if (i === parts.length - 1) {
          u.onend = () => {
            if (runRef.current === run) setSpeakingId(null);
          };
        }
        u.onerror = () => {
          if (runRef.current === run) setSpeakingId(null);
        };
        synth.speak(u);
      });
    },
    [],
  );

  const setAutoRead = useCallback(
    (on: boolean) => {
      setAutoReadState(on);
      try {
        window.localStorage.setItem(AUTO_READ_KEY, on ? "1" : "0");
      } catch {
        // storage may be unavailable (private mode); the toggle still works for this visit
      }
      if (!on) stop();
    },
    [stop],
  );

  return { supported, speakingId, autoRead, setAutoRead, speak, stop };
}
