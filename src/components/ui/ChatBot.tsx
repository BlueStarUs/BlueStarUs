"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  ChevronRight,
  ArrowRight,
  Mic,
  Square,
  Loader2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { useVoiceInput } from "@/components/ui/useVoiceInput";
import { useSpeech } from "@/components/ui/useSpeech";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  timestamp: string;
  text: string;
  actionLink?: {
    label: string;
    href: string;
  };
}

/**
 * Topic pills shown in the chat. Picking one lists its questions; tapping a question sends it.
 * Every question is answered by the site's own FAQs/pages, which the bot's knowledge base indexes,
 * so keep new questions to topics the site covers.
 */
const QUESTION_CATEGORIES: { id: string; label: string; questions: string[] }[] = [
  {
    id: "getting-started",
    label: "Getting started",
    questions: [
      "When is the right time to start college planning with Blue Stars?",
      "How is Blue Stars different from our school counselor?",
      "How does the initial consultation work?",
      "How much do your services cost?",
    ],
  },
  {
    id: "strategy",
    label: "College lists & strategy",
    questions: [
      "How many colleges should my student apply to?",
      "Should my student apply Early Decision?",
      "What's the difference between Early Decision, Early Action and Regular Decision?",
      "Do you work with students aiming for Ivy League and top-30 colleges?",
    ],
  },
  {
    id: "essays",
    label: "Essays",
    questions: [
      "Will Blue Stars write or rewrite my student's essays?",
      "How many drafts does each essay go through?",
      "My student is a STEM kid who hates writing. Can you help?",
      "Can you help with the UC Personal Insight Questions?",
    ],
  },
  {
    id: "research",
    label: "Research & activities",
    questions: [
      "Does my student need prior research experience?",
      "How do students get research positions with university professors?",
      "Is research only for STEM students?",
      "Do paid summer programs help with admissions?",
    ],
  },
  {
    id: "art",
    label: "Art admissions",
    questions: [
      "What do art schools look for in a portfolio?",
      "Does my student need to major in art to submit a portfolio?",
      "How early should my student start building a portfolio?",
      "Do you help with National Portfolio Day?",
    ],
  },
  {
    id: "testing",
    label: "Testing & grades",
    questions: [
      "Are colleges really test-optional? Should my student submit scores?",
      "Is a B in an AP class better than an A in a regular class?",
      "How is the Digital SAT different from the old test?",
    ],
  },
];

// Exact 3 initial greeting messages from bluestars.us Chatbase bot
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    sender: "bot",
    timestamp: "Just now",
    text: "Welcome to Blue Stars Admissions Consulting!",
  },
  {
    id: "init-2",
    sender: "bot",
    timestamp: "Just now",
    text: "I am Dr. Amy Morgenstern's virtual assistant. I can help you learn about our college admissions consulting services, understand how we support students, and find the right next step for your family.",
  },
  {
    id: "init-3",
    sender: "bot",
    timestamp: "Just now",
    text: "How can I help you today?",
  },
];

const BOOKING_LINK = { label: "Book a consultation", href: HUBSPOT_CONSULTATION_URL };

const FALLBACK_ERROR =
  "Sorry, I couldn't answer just now. Please try again in a moment, or book a consultation and our team will help you directly.";

/** The model is asked for plain text; strip any stray markdown emphasis just in case. */
function cleanBotText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^#{1,6}\s+/gm, "");
}

/** How long a voice transcript waits in the input (cancellable) before it is sent. */
const VOICE_AUTO_SEND_MS = 1500;

/** Whisper output that is too short, just filler, or a common silence hallucination. */
const FILLER_TRANSCRIPT = /^(u+m+|u+h+|h+m+|a+h+|e+r+|o+h+|okay|ok|you|thank you|thanks for watching|bye)$/;

function isUsableTranscript(text: string): boolean {
  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
  if (normalized.replace(/\s/g, "").length < 3) return false;
  return !FILLER_TRANSCRIPT.test(normalized);
}

type StreamEvent =
  | { type: "delta"; text: string }
  | { type: "done"; actionLink?: ChatMessage["actionLink"] }
  | { type: "error"; message: string; actionLink?: ChatMessage["actionLink"] };

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const activeCategory = QUESTION_CATEGORIES.find((c) => c.id === activeCategoryId) ?? null;
  const toggleCategory = (id: string) => setActiveCategoryId((cur) => (cur === id ? null : id));
  const abortRef = useRef<AbortController | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Voice input: a clear transcript is sent automatically after a short pause that the
  // user can cancel to edit it. Noise or filler stays in the input box instead.
  const [voicePending, setVoicePending] = useState(false);
  const voice = useVoiceInput((transcript) => {
    setInputValue((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
    if (isUsableTranscript(transcript)) {
      setVoicePending(true);
    } else {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  });
  const { cancel: cancelVoice } = voice;

  const cancelVoiceSend = () => {
    if (voicePending) setVoicePending(false);
  };

  const closeChat = () => {
    setVoicePending(false);
    setIsOpen(false);
  };
  const closeChatRef = useRef(closeChat);
  useEffect(() => {
    closeChatRef.current = closeChat;
  });

  // Read-aloud: per-message speaker buttons plus an optional auto-read toggle.
  const speech = useSpeech();
  const { stop: stopSpeech } = speech;
  const autoReadRef = useRef(false);
  useEffect(() => {
    autoReadRef.current = speech.autoRead;
  }, [speech.autoRead]);

  useEffect(() => {
    if (!isOpen) {
      cancelVoice();
      stopSpeech();
    }
  }, [isOpen, cancelVoice, stopSpeech]);

  // Auto-send a pending voice transcript unless the user cancels within the window.
  // If a reply is still streaming, the send is skipped and the text stays in the input.
  const sendRef = useRef<() => void>(() => {});
  useEffect(() => {
    if (!voicePending) return;
    const timer = setTimeout(() => {
      setVoicePending(false);
      sendRef.current();
    }, VOICE_AUTO_SEND_MS);
    return () => clearTimeout(timer);
  }, [voicePending]);

  // Esc closes the drawer; focus returns to the launcher once it is visible again.
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) launcherRef.current?.focus();
    wasOpenRef.current = isOpen;
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChatRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock page scroll behind the full-screen chat on mobile.
  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => {
      document.body.style.overflow = mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isStreaming) return;
    setVoicePending(false);
    setActiveCategoryId(null);
    speech.stop();

    setHasInteracted(true);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: "Now",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // If an email address is detected, log lead to admin backend
    if (text.includes("@")) {
      const extractedEmail =
        text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || text;
      fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Chatbot Visitor",
          email: extractedEmail,
          phone: "Not provided",
          interest: "Admissions Consulting Inquiry",
          serviceInterest: "Chatbase Virtual Assistant",
          message: text,
          source: "Floating Chatbot",
          formGuid: "557872d0-5bf5-45db-96d7-b07c4cc96c50",
        }),
      }).catch(() => {});
    }

    void streamReply(text);
  };

  /** Sends the conversation to /api/chat and fills the bot bubble as tokens arrive. */
  const streamReply = async (text: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const history = messages
      .filter((m) => !m.id.startsWith("init-") && m.text.trim())
      .map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }));
    history.push({ role: "user", content: text });

    const botId = `bot-${Date.now()}`;
    let started = false;
    const update = (patch: Partial<ChatMessage>) => {
      if (!started) {
        started = true;
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: botId, sender: "bot", timestamp: "Now", text: "", ...patch }]);
      } else {
        setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, ...patch, text: patch.text ?? m.text } : m)));
      }
    };

    setIsStreaming(true);
    let answer = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-6) }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        update({ text: data?.message || FALLBACK_ERROR, actionLink: BOOKING_LINK });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          let event: StreamEvent;
          try {
            event = JSON.parse(line);
          } catch {
            continue;
          }
          if (event.type === "delta") {
            answer += event.text;
            update({ text: cleanBotText(answer) });
          } else if (event.type === "done") {
            update({ actionLink: event.actionLink });
          } else if (event.type === "error") {
            update({ text: event.message, actionLink: event.actionLink ?? BOOKING_LINK });
          }
        }
      }
      if (!answer && !started) update({ text: FALLBACK_ERROR, actionLink: BOOKING_LINK });
      if (answer && autoReadRef.current && !controller.signal.aborted) speech.speak(botId, cleanBotText(answer));
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      update({ text: answer ? cleanBotText(answer) : FALLBACK_ERROR, actionLink: BOOKING_LINK });
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setIsTyping(false);
        setIsStreaming(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    sendRef.current = () => handleSendMessage();
  });

  const handleResetChat = () => {
    setVoicePending(false);
    setActiveCategoryId(null);
    setInputValue("");
    speech.stop();
    abortRef.current?.abort();
    abortRef.current = null;
    setIsTyping(false);
    setIsStreaming(false);
    setMessages(INITIAL_MESSAGES);
    setHasInteracted(false);
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING CHAT TRIGGER BUTTON (Replicates bluestars.us Chatbase Pill)
          - Rounded pill button: [Chat Icon] Chat
          - Uses BlueStars Brand Blue (#1166B0) and Montserrat Font
          - Online pulsating green indicator
          ========================================================================= */}
      <div
        className={cn(
          "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-50",
          // The open drawer has its own close button, so the launcher hides.
          isOpen && "hidden"
        )}
      >
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          className={cn(
            "group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full",
            "bg-gradient-to-r from-brand-navy via-[#07466F] to-brand-blue text-white",
            "shadow-[0_1px_3px_rgba(18,48,90,0.05)] hover:shadow-[0_1px_3px_rgba(18,48,90,0.05)]",
            "hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer",
            "font-heading font-bold text-sm tracking-wide focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
          )}
        >
          {/* Live Green Status Badge */}
          <span
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#7BC144] ring-2 ring-white animate-pulse"
            aria-hidden="true"
          />

          {/* Chat Speech Bubble with Brand Star */}
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-white fill-white/20 transition-transform group-hover:scale-110" />
          </div>

          {/* "Chat" Text matching bluestars.us */}
          <span className="font-heading font-bold text-[14.5px] leading-none text-white">
            Chat
          </span>
        </button>
      </div>

      {/* =========================================================================
          2. CHAT MODAL WINDOW (Replicates bluestars.us Chatbase UI & Structure)
          - Border radius 20px (--cb-radius: 20px)
          - Header: Blue Stars Admissions Consulting + controls
          - Body: 3 initial messages + 5 suggested prompt cards
          - Input: Pill input with "Message..." placeholder
          ========================================================================= */}
      {/* Stays mounted so it can slide in and out; `inert` + `invisible` keep it
          out of the tab order and away from screen readers while closed. */}
      <div
        role="dialog"
        aria-label="Blue Stars Admissions Consulting Chat"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "fixed z-[60] flex flex-col overflow-hidden bg-white font-sans",
          // Base size for the whole drawer; text and controls inside use em, so they scale together.
          "text-[13.5px] xl:text-[14.5px] 2xl:text-[15.5px]",
          // Mobile: full-screen, slides up | Desktop: full-height right drawer, slides in from the right
          "inset-0 h-[100dvh]",
          "sm:left-auto sm:w-[clamp(380px,26vw,520px)] sm:supports-[width:round(1px,1px)]:w-[round(clamp(380px,26vw,520px),1px)] sm:border-l sm:border-brand-border sm:shadow-[-8px_0_24px_rgba(18,48,90,0.12)]",
          "transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none",
          isOpen
            ? "visible transform-none"
            : "invisible translate-y-full sm:translate-y-0 sm:translate-x-full"
        )}
      >
        {/* Header */}
        <header className="px-3 sm:px-4 py-3 sm:py-3.5 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3.5 bg-gradient-to-r from-brand-navy via-[#07466F] to-brand-blue text-white flex items-center justify-between gap-3 flex-shrink-0 relative overflow-hidden">
          {/* Ambient Star Glow */}

          <div className="flex items-center gap-2.5 min-w-0 z-10">
            {/* Profile Avatar with Brand Star */}
            <div className="w-[2.65em] h-[2.65em] rounded-full bg-white/15 border border-white/30 flex items-center justify-center flex-shrink-0 relative shadow-xs">
              <BrandStar className="w-[1.5em] h-[1.5em] text-white fill-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#7BC144] absolute -bottom-0.5 -right-0.5 ring-2 ring-brand-navy" />
            </div>

            <div className="min-w-0">
              <h3 className="text-[1.07em] font-bold font-heading leading-tight text-white [text-wrap:balance]">
                <span className="sm:hidden">Blue Stars</span>
                <span className="hidden sm:inline">Blue Stars Admissions Consulting</span>
              </h3>
              <div className="text-[0.81em] text-[#f3eee5] font-sans truncate flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7BC144] animate-pulse" />
                <span>Dr. Amy Morgenstern&apos;s Assistant</span>
              </div>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-0.5 sm:gap-1 z-10 flex-shrink-0">
            {speech.supported && (
              <button
                type="button"
                onClick={() => speech.setAutoRead(!speech.autoRead)}
                title={speech.autoRead ? "Stop reading replies aloud" : "Read replies aloud"}
                aria-label={speech.autoRead ? "Stop reading replies aloud" : "Read replies aloud"}
                aria-pressed={speech.autoRead}
                className={cn(
                  "w-10 h-10 sm:w-[2.1em] sm:h-[2.1em] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer",
                  speech.autoRead ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/15"
                )}
              >
                {speech.autoRead ? <Volume2 className="w-[1.05em] h-[1.05em]" /> : <VolumeX className="w-[1.05em] h-[1.05em]" />}
              </button>
            )}

            <button
              type="button"
              onClick={handleResetChat}
              title="Restart conversation"
              aria-label="Restart conversation"
              className="w-10 h-10 sm:w-[2.1em] sm:h-[2.1em] rounded-[6px] text-white/80 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              <RotateCcw className="w-[1.05em] h-[1.05em]" />
            </button>

            <button
              type="button"
              onClick={closeChat}
              title="Close chat"
              aria-label="Close chat"
              className="w-10 h-10 sm:w-[2.1em] sm:h-[2.1em] rounded-[6px] text-white/80 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-[1.05em] h-[1.05em]" />
            </button>
          </div>
        </header>

        {/* Conversation Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 space-y-3.5 bg-brand-bg font-sans">
          {/* Timestamp Badge */}
          <div className="text-center my-1">
            <span className="text-[0.81em] font-semibold text-brand-gray font-heading bg-white px-3 py-1 rounded-full border border-brand-border shadow-2xs">
              Today
            </span>
          </div>

          {/* Rendered Messages */}
          {messages.map((message, index) => {
            const isUser = message.sender === "user";

            return (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col group",
                  isUser ? "items-end" : "items-start"
                )}
              >
                <div className="flex items-end gap-2 max-w-[88%] sm:max-w-[85%]">
                  {/* Bot Avatar Icon */}
                  {!isUser && (
                    <div className="w-[1.8em] h-[1.8em] rounded-full bg-brand-navy flex items-center justify-center flex-shrink-0 shadow-2xs mb-0.5">
                      <BrandStar className="w-[1.05em] h-[1.05em] text-white fill-white" />
                    </div>
                  )}

                  {/* Bubble with Chatbase radii: 20px rounded, 4px tail */}
                  <div
                    className={cn(
                      "rounded-[20px] p-[0.9em] text-[1em] leading-[1.48] font-sans shadow-2xs transition-all",
                      isUser
                        ? "bg-brand-ink !text-white rounded-tr-[4px]"
                        : "bg-white border border-brand-border text-brand-navy rounded-tl-[4px]"
                    )}
                  >
                    <p
                      className={cn(
                        "whitespace-pre-line font-[500] text-[1em] leading-[1.48]",
                        isUser ? "text-white !text-white" : "text-brand-navy"
                      )}
                      style={isUser ? { color: "#ffffff" } : { color: "#025269" }}
                    >
                      {message.text}
                    </p>

                    {/* Attached Action Link */}
                    {message.actionLink && (
                      <div className="mt-3 pt-2.5 border-t border-brand-border/60">
                        <Link
                          href={message.actionLink.href}
                          target={
                            message.actionLink.href.startsWith("http")
                              ? "_blank"
                              : "_self"
                          }
                          rel={
                            message.actionLink.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          onClick={() => {
                            if (!message.actionLink?.href.startsWith("http")) {
                              closeChat();
                            }
                          }}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.89em] font-bold font-heading transition-all shadow-xs",
                            isUser
                              ? "bg-white text-brand-blue hover:bg-[#f3eee5]"
                              : "bg-brand-ink hover:bg-brand-blue text-white"
                          )}
                        >
                          <span>{message.actionLink.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Read this reply aloud (hidden while the reply is still streaming in) */}
                  {!isUser &&
                    speech.supported &&
                    message.text.trim() &&
                    !(isStreaming && index === messages.length - 1) && (
                      <button
                        type="button"
                        onClick={() =>
                          speech.speakingId === message.id
                            ? speech.stop()
                            : speech.speak(message.id, message.text)
                        }
                        title={speech.speakingId === message.id ? "Stop reading" : "Read aloud"}
                        aria-label={speech.speakingId === message.id ? "Stop reading" : "Read this reply aloud"}
                        className={cn(
                          "w-[1.8em] h-[1.8em] mb-0.5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40",
                          speech.speakingId === message.id
                            ? "bg-brand-ink text-white"
                            : "text-brand-gray hover:text-brand-ink hover:bg-white"
                        )}
                      >
                        {speech.speakingId === message.id ? (
                          <Square className="w-[0.75em] h-[0.75em] fill-current" />
                        ) : (
                          <Volume2 className="w-[1.05em] h-[1.05em]" />
                        )}
                      </button>
                    )}
                </div>
              </div>
            );
          })}

          {/* Topic pills: pick a topic to see its questions, tap a question to send it */}
          {!hasInteracted && (
            <div className="pt-2 space-y-2.5">
              <div className="text-[0.81em] font-bold uppercase tracking-wider text-brand-gray font-heading px-1">
                Choose a topic
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUESTION_CATEGORIES.map((cat) => (
                  <CategoryPill
                    key={cat.id}
                    label={cat.label}
                    active={cat.id === activeCategoryId}
                    controls="chat-topic-questions"
                    onClick={() => toggleCategory(cat.id)}
                  />
                ))}
              </div>
              {activeCategory && (
                <div id="chat-topic-questions" className="flex flex-col gap-1.5">
                  {activeCategory.questions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleSendMessage(question)}
                      className={cn(
                        "w-full text-left px-[1em] py-[0.7em] rounded-[12px] bg-white hover:bg-brand-sky",
                        "border border-brand-border hover:border-brand-blue/40",
                        "text-[0.96em] font-[500] text-brand-navy font-heading",
                        "transition-all duration-150 shadow-2xs hover:shadow-xs",
                        "flex items-center justify-between gap-2 group cursor-pointer"
                      )}
                    >
                      <span className="flex-1 leading-snug">{question}</span>
                      <ChevronRight className="w-[1.1em] h-[1.1em] text-brand-blue/60 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 animate-in fade-in duration-200">
              <div className="w-[1.8em] h-[1.8em] rounded-full bg-brand-navy flex items-center justify-center flex-shrink-0 shadow-2xs mb-0.5">
                <BrandStar className="w-[1.05em] h-[1.05em] text-white fill-white" />
              </div>
              <div className="bg-white border border-brand-border rounded-[20px] rounded-tl-[4px] px-3.5 py-2.5 text-xs shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ink animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ink animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ink animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* After the first message: topic chips stay handy; a picked topic opens its questions above them */}
        {hasInteracted && activeCategory && (
          <div
            id="chat-topic-questions"
            className="max-h-[40%] overflow-y-auto custom-scrollbar bg-brand-bg border-t border-brand-border/60 px-3 py-2 flex flex-col gap-1"
          >
            {activeCategory.questions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleSendMessage(question)}
                className="w-full text-left px-[0.9em] py-[0.55em] rounded-[10px] bg-white hover:bg-brand-sky border border-brand-border hover:border-brand-blue/40 text-[0.9em] leading-snug font-[500] font-heading text-brand-navy transition-colors flex items-center justify-between gap-2 group cursor-pointer"
              >
                <span className="flex-1">{question}</span>
                <ChevronRight className="w-[1em] h-[1em] text-brand-blue/60 group-hover:text-brand-blue flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
        {hasInteracted && (
          <div
            className={cn(
              "pl-3 py-2 bg-white border-t border-brand-border/60 flex items-center gap-1.5 overflow-x-auto",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              // Soft fade on the right edge hints that more chips scroll into view.
              "[mask-image:linear-gradient(to_right,black_calc(100%-2rem),transparent)]"
            )}
          >
            {QUESTION_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.id}
                label={cat.label}
                active={cat.id === activeCategoryId}
                controls="chat-topic-questions"
                compact
                onClick={() => toggleCategory(cat.id)}
              />
            ))}
            {/* Spacer so the last chip can scroll clear of the fade */}
            <span className="w-8 flex-shrink-0" aria-hidden="true" />
          </div>
        )}

        {/* Message Input Footer (Replicates bluestars.us Chatbase footer) */}
        <footer className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3 bg-white border-t border-brand-border flex flex-col gap-1.5">
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                cancelVoiceSend();
                setInputValue(e.target.value);
              }}
              onPointerDown={cancelVoiceSend}
              onKeyDown={(e) => {
                if (e.key !== "Enter") cancelVoiceSend();
                handleKeyDown(e);
              }}
              placeholder={
                voice.state === "recording"
                  ? "Listening... tap stop when done"
                  : voice.state === "transcribing"
                    ? "Transcribing..."
                    : "Message..."
              }
              aria-label="Type your message"
              className={cn(
                "w-full pl-4 py-2.5 rounded-full bg-brand-bg border border-brand-border",
                voice.supported ? "pr-[5.5rem] sm:pr-[5.4em]" : "pr-12 sm:pr-[3em]",
                "text-base sm:text-[1em] text-brand-navy placeholder:text-brand-gray",
                "focus:outline-none focus:border-brand-ink focus:bg-white font-sans transition-all"
              )}
            />

            {voice.supported && (
              <button
                type="button"
                onClick={() => {
                  voice.clearError();
                  cancelVoiceSend();
                  if (voice.state === "recording") voice.stop();
                  else {
                    speech.stop(); // so the mic doesn't record the bot's own voice
                    void voice.start();
                  }
                }}
                disabled={voice.state === "transcribing"}
                aria-label={voice.state === "recording" ? "Stop recording" : "Speak your question"}
                aria-pressed={voice.state === "recording"}
                title={voice.state === "recording" ? "Stop recording" : "Speak your question (English)"}
                className={cn(
                  "absolute right-11 sm:right-[2.95em] w-9 h-9 sm:w-[2.1em] sm:h-[2.1em] rounded-full flex items-center justify-center transition-all",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40",
                  voice.state === "recording"
                    ? "bg-red-500 text-white animate-pulse cursor-pointer"
                    : voice.state === "transcribing"
                      ? "text-brand-ink cursor-wait"
                      : "text-brand-gray hover:text-brand-ink hover:bg-brand-sky cursor-pointer"
                )}
              >
                {voice.state === "recording" ? (
                  <Square className="w-[0.9em] h-[0.9em] fill-white" />
                ) : voice.state === "transcribing" ? (
                  <Loader2 className="w-[1.05em] h-[1.05em] animate-spin" />
                ) : (
                  <Mic className="w-[1.05em] h-[1.05em]" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className={cn(
                "absolute right-1.5 w-9 h-9 sm:w-[2.1em] sm:h-[2.1em] rounded-full flex items-center justify-center transition-all",
                inputValue.trim()
                  ? "bg-brand-ink hover:bg-brand-blue text-white cursor-pointer shadow-2xs hover:scale-105"
                  : "bg-transparent text-brand-gray/40 cursor-not-allowed"
              )}
            >
              <Send className="w-[1.05em] h-[1.05em] ml-0.5" />
            </button>
          </div>

          {voicePending ? (
            <div role="status" className="px-3 flex items-center gap-2 text-[0.81em] leading-snug font-sans text-brand-navy">
              <Loader2 className="w-3 h-3 animate-spin text-brand-ink flex-shrink-0" />
              <span className="flex-1">Sending… tap the message to edit it.</span>
              <button
                type="button"
                onClick={() => {
                  setVoicePending(false);
                  inputRef.current?.focus();
                }}
                className="px-2 py-1 -my-1 rounded-full font-bold font-heading text-brand-blue hover:bg-brand-sky cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
              >
                Edit
              </button>
            </div>
          ) : voice.error ? (
            <p role="alert" className="px-3 text-[0.78em] leading-snug text-red-600 font-sans">
              {voice.error}
            </p>
          ) : (
            voice.supported && (
              <p className="px-3 text-[0.74em] leading-snug text-brand-gray font-sans [@media(max-height:500px)]:hidden">
                Voice input is English only. Audio is sent to Groq for transcription and not stored.
              </p>
            )
          )}
        </footer>
      </div>
    </>
  );
}

/** A topic pill; `active` marks the topic whose questions are showing. */
function CategoryPill({
  label,
  active,
  controls,
  compact = false,
  onClick,
}: {
  label: string;
  active: boolean;
  controls: string;
  compact?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      aria-controls={active ? controls : undefined}
      className={cn(
        "rounded-full font-[600] font-heading whitespace-nowrap border transition-colors flex-shrink-0 cursor-pointer shadow-2xs",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40",
        compact ? "px-[0.9em] py-[0.3em] text-[0.85em]" : "px-[1em] py-[0.45em] text-[0.9em]",
        active
          ? "bg-brand-ink border-brand-ink text-white"
          : "bg-white border-brand-border text-brand-navy hover:border-brand-blue/50 hover:bg-brand-sky"
      )}
    >
      {label}
    </button>
  );
}
