"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Minus,
  Send,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CornerDownLeft,
  Calendar,
  Compass,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { HUBSPOT_CONSULTATION_URL, HUBSPOT_STRATEGY_CONSULTATION_URL } from "@/lib/constants";
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

// Exact 5 suggested questions from bluestars.us Chatbase bot
const SUGGESTED_QUESTIONS = [
  "How does Blue Stars help students with college admissions?",
  "What college counseling services do you offer?",
  "How can I schedule an Initial Consultation with Dr. Amy?",
  "What does your college planning process include?",
  "Can you tell me about your Research & Internship services?",
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

// Intelligent responses matching Blue Stars offerings
function getBotResponse(userText: string): {
  text: string;
  actionLink?: { label: string; href: string };
} {
  const query = userText.toLowerCase().trim();

  // 1. "How does Blue Stars help students with college admissions?"
  if (
    query.includes("how does blue stars help") ||
    (query.includes("help") && query.includes("admissions"))
  ) {
    return {
      text: "At Blue Stars, we practice 'The Calm Way' to college admissions. We guide high school students to discover their authentic intellectual passions, develop impactful extracurricular and research spikes, craft genuine personal narratives, and build a strategic college list.\n\nOur students earn admission to top Ivy League, UC, and elite private universities while building lifelong confidence.",
      actionLink: {
        label: "Book Your Initial Consultation",
        href: HUBSPOT_CONSULTATION_URL,
      },
    };
  }

  // 2. "What college counseling services do you offer?"
  if (
    query.includes("what college counseling services") ||
    query.includes("services do you offer") ||
    query.includes("what services")
  ) {
    return {
      text: "We offer tailored, holistic admissions consulting across all high school years:\n\n• 8th–11th Grade College Planning & Mentorship\n• Comprehensive Senior Application Strategy\n• Essay & Personal Statement Guidance\n• Research, Science & Competitive Summer Internships\n• Specialized Art Admissions Consulting & Portfolio Prep\n• Direct Strategy Consultation (75 Min)",
      actionLink: {
        label: "Explore All Services",
        href: "/services",
      },
    };
  }

  // 3. "How can I schedule an Initial Consultation with Dr. Amy?"
  if (
    query.includes("schedule") ||
    query.includes("initial consultation") ||
    query.includes("dr. amy") ||
    query.includes("consultation") ||
    query.includes("book") ||
    query.includes("appointment") ||
    query.includes("calendar")
  ) {
    return {
      text: "You can book a complimentary 30-minute Initial Consultation directly on Dr. Amy Morgenstern's calendar!\n\nDuring this video session, our counseling team will learn about your student's unique personality, academic profile, and college aspirations to recommend the ideal next steps.",
      actionLink: {
        label: "Book Your Initial Consultation (30 Min)",
        href: HUBSPOT_CONSULTATION_URL,
      },
    };
  }

  // 4. "What does your college planning process include?"
  if (
    query.includes("college planning process") ||
    query.includes("process include") ||
    query.includes("how do you work") ||
    query.includes("methodology")
  ) {
    return {
      text: "Our structured 4-step process is designed for clarity and stress-free success:\n\n1. Initial Consultation (30 Min) — Meet with us to understand your goals and explore fit.\n2. Strategy Consultation (75 Min) — Deep diagnostic review of transcripts, testing, activities, and a custom admissions roadmap.\n3. Partnership & Designated Counselor — One-on-one mentorship tailored to your teen's interests.\n4. Application Execution & Confidence — Exceptional essays, interviews, and strategic submissions.",
      actionLink: {
        label: "Read About Our Process",
        href: "/#process",
      },
    };
  }

  // 5. "Can you tell me about your Research & Internship services?"
  if (
    query.includes("research") ||
    query.includes("internship") ||
    query.includes("summer program") ||
    query.includes("lab") ||
    query.includes("stem")
  ) {
    return {
      text: "Our Research & Internship mentorship pairs high school students with PhD-level mentors and helps them secure spots at world-renowned programs like Stanford SIMR, SASI, COSMOS, and MIT RISE.\n\nStudents conduct original research, author academic papers, or lead passion projects that demonstrate rare intellectual initiative to admissions officers.",
      actionLink: {
        label: "View Research & Internships",
        href: "/services/application-strategy",
      },
    };
  }

  // Art admissions
  if (
    query.includes("art") ||
    query.includes("portfolio") ||
    query.includes("risd") ||
    query.includes("design") ||
    query.includes("bfa")
  ) {
    return {
      text: "Dr. Amy holds an MFA in contemporary art and provides piece-by-piece studio critique and artist statement coaching. Our students consistently gain admission with substantial merit scholarships to RISD, Pratt Institute, CalArts, Parsons, and university art supplements (Ivy League, UCLA, CMU).",
      actionLink: {
        label: "Art Admissions Program",
        href: "/services/art-admissions-consulting",
      },
    };
  }

  // Essays
  if (
    query.includes("essay") ||
    query.includes("personal statement") ||
    query.includes("supplement")
  ) {
    return {
      text: "Our Socratic narrative brainstorming helps students uncover their genuine story rather than writing cliché essays. We guide students through outline, voice development, and line editing so their applications stand out memorably to readers.",
      actionLink: {
        label: "Essay Guidance Details",
        href: "/services/essay-guidance",
      },
    };
  }

  // Admissions outcomes & results
  if (
    query.includes("result") ||
    query.includes("acceptance") ||
    query.includes("outcome") ||
    query.includes("stanford") ||
    query.includes("harvard") ||
    query.includes("ivy")
  ) {
    return {
      text: "Blue Stars students have achieved acceptances to Harvard, Stanford, Princeton, Brown, Dartmouth, Cornell ED, CMU School of Computer Science, Northwestern, UC Berkeley, UCLA, and many more, often with six-figure merit scholarships!",
      actionLink: {
        label: "View Successes & Admits",
        href: "/successes",
      },
    };
  }

  // Lead capture (email)
  if (query.includes("@")) {
    return {
      text: "Thank you for sharing your email! Our senior counseling team has received your information and will reach out promptly. In the meantime, you can reserve an open slot on Dr. Amy's calendar directly:",
      actionLink: {
        label: "Book Your Initial Consultation",
        href: HUBSPOT_CONSULTATION_URL,
      },
    };
  }

  // Generic friendly fallback
  return {
    text: "Thank you for reaching out! Every student's journey is unique. At Blue Stars, we provide personalized, compassionate mentorship to help your teen shine authentically. Would you like to schedule a free 30-minute Initial Consultation with our senior team?",
    actionLink: {
      label: "Book Your Initial Consultation",
      href: HUBSPOT_CONSULTATION_URL,
    },
  };
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    if (!text) return;

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

    // Natural bot response delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        timestamp: "Now",
        text: response.text,
        actionLink: response.actionLink,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            className={cn(
              "group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full",
              "bg-gradient-to-r from-brand-navy via-[#07466F] to-brand-blue text-white",
              "shadow-[0_8px_25px_rgba(2,82,105,0.30)] hover:shadow-[0_12px_32px_rgba(2,82,105,0.40)]",
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
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              "bg-brand-navy hover:bg-brand-darkNavy text-white shadow-lg",
              "hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer",
              "focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
            )}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Mobile Backdrop Overlay (Tap to Dismiss on Small Screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =========================================================================
          2. CHAT MODAL WINDOW (Replicates bluestars.us Chatbase UI & Structure)
          - Border radius 20px (--cb-radius: 20px)
          - Header: Blue Stars Admissions Consulting + controls
          - Body: 3 initial messages + 5 suggested prompt cards
          - Input: Pill input with "Message..." placeholder
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Blue Stars Admissions Consulting Chat"
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden bg-white shadow-[0_20px_60px_rgba(2,82,105,0.22)]",
            "border border-brand-border/90",
            // Mobile: full viewport sheet with generous touch targets | Desktop: elegant floating box
            "inset-x-3 bottom-[76px] top-16 rounded-[12px] sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[410px] sm:h-[610px] sm:max-h-[82vh]",
            "animate-in fade-in zoom-in-95 duration-200 font-sans"
          )}
        >
          {/* Header */}
          <header className="px-4 py-3.5 bg-gradient-to-r from-brand-navy via-[#07466F] to-brand-blue text-white flex items-center justify-between gap-3 flex-shrink-0 relative overflow-hidden">
            {/* Ambient Star Glow */}
            <div
              className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="flex items-center gap-2.5 min-w-0 z-10">
              {/* Profile Avatar with Brand Star */}
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center flex-shrink-0 relative shadow-xs">
                <BrandStar className="w-5 h-5 text-white fill-white" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#7BC144] absolute -bottom-0.5 -right-0.5 ring-2 ring-brand-navy" />
              </div>

              <div className="min-w-0">
                <h3 className="text-[14px] sm:text-[14.5px] font-bold font-heading truncate leading-tight text-white">
                  Blue Stars Admissions Consulting
                </h3>
                <div className="text-[11px] text-[#D8EAEE] font-sans truncate flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BC144] animate-pulse" />
                  <span>Dr. Amy Morgenstern&apos;s Assistant</span>
                </div>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1 z-10 flex-shrink-0">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="w-7 h-7 rounded-[6px] text-white/80 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
                className="w-7 h-7 rounded-[6px] text-white/80 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="w-7 h-7 rounded-[6px] text-white/80 hover:text-white hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </header>

          {/* Conversation Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 space-y-3.5 bg-brand-bg font-sans">
            {/* Timestamp Badge */}
            <div className="text-center my-1">
              <span className="text-[11px] font-semibold text-brand-gray/80 font-heading bg-white px-3 py-1 rounded-full border border-brand-border shadow-2xs">
                Today
              </span>
            </div>

            {/* Rendered Messages */}
            {messages.map((message) => {
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
                      <div className="w-6 h-6 rounded-full bg-brand-navy flex items-center justify-center flex-shrink-0 shadow-2xs mb-0.5">
                        <BrandStar className="w-3.5 h-3.5 text-white fill-white" />
                      </div>
                    )}

                    {/* Bubble with Chatbase radii: 20px rounded, 4px tail */}
                    <div
                      className={cn(
                        "rounded-[20px] p-3 text-[13px] sm:text-[13.5px] leading-[19px] sm:leading-[20px] font-sans shadow-2xs transition-all",
                        isUser
                          ? "bg-brand-blue !text-white rounded-tr-[4px]"
                          : "bg-white border border-brand-border text-brand-navy rounded-tl-[4px]"
                      )}
                    >
                      <p
                        className={cn(
                          "whitespace-pre-line font-[500] text-[13px] sm:text-[13.5px] leading-[19px] sm:leading-[20px]",
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
                                setIsOpen(false);
                              }
                            }}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-heading transition-all shadow-xs",
                              isUser
                                ? "bg-white text-brand-blue hover:bg-[#F3F8FD]"
                                : "bg-brand-blue hover:bg-brand-navy text-white"
                            )}
                          >
                            <span>{message.actionLink.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Suggested Prompt Cards (Replicates bluestars.us Chatbase suggested messages) */}
            {!hasInteracted && (
              <div className="pt-2 space-y-2 animate-in fade-in duration-300">
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/60 font-heading px-1">
                  Suggested Questions
                </div>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleSendMessage(question)}
                      className={cn(
                        "w-full text-left px-3.5 py-2.5 rounded-[12px] bg-white hover:bg-brand-sky",
                        "border border-brand-border hover:border-brand-blue/40",
                        "text-[12.5px] sm:text-[13px] font-[500] text-brand-navy font-heading",
                        "transition-all duration-150 shadow-2xs hover:shadow-xs",
                        "flex items-center justify-between gap-2 group cursor-pointer"
                      )}
                    >
                      <span className="flex-1 leading-snug">{question}</span>
                      <ChevronRight className="w-4 h-4 text-brand-blue/60 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 animate-in fade-in duration-200">
                <div className="w-6 h-6 rounded-full bg-brand-navy flex items-center justify-center flex-shrink-0 shadow-2xs mb-0.5">
                  <BrandStar className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <div className="bg-white border border-brand-border rounded-[20px] rounded-tl-[4px] px-3.5 py-2.5 text-xs shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar (when user has already interacted, keeps chips handy) */}
          {hasInteracted && (
            <div className="px-3 py-1.5 bg-white border-t border-brand-border/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSendMessage(question)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-[500] font-heading whitespace-nowrap bg-brand-bg hover:bg-brand-blue text-brand-navy hover:text-white border border-brand-border transition-all flex-shrink-0 cursor-pointer shadow-2xs"
                >
                  {question.length > 32 ? question.slice(0, 32) + "..." : question}
                </button>
              ))}
            </div>
          )}

          {/* Message Input Footer (Replicates bluestars.us Chatbase footer) */}
          <footer className="p-3 bg-white border-t border-brand-border flex items-center gap-2">
            <div className="flex-1 relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message..."
                className={cn(
                  "w-full pl-4 pr-10 py-2.5 rounded-full bg-brand-bg border border-brand-border",
                  "text-xs sm:text-[13px] text-brand-navy placeholder:text-brand-gray/60",
                  "focus:outline-none focus:border-brand-blue focus:bg-white font-sans transition-all"
                )}
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                aria-label="Send message"
                className={cn(
                  "absolute right-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-all",
                  inputValue.trim()
                    ? "bg-brand-blue hover:bg-brand-navy text-white cursor-pointer shadow-2xs hover:scale-105"
                    : "bg-transparent text-brand-gray/40 cursor-not-allowed"
                )}
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
