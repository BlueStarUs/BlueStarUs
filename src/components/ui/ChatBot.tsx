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
  ThumbsUp,
  CornerDownLeft,
  GraduationCap,
  Calendar,
  Compass,
  BookOpen,
} from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "amy" | "user";
  senderName: string;
  timestamp: string;
  text: string;
  quotedText?: string;
  quotedAuthor?: string;
  reactionCount?: number;
  hasUserReacted?: boolean;
  actionLink?: {
    label: string;
    href: string;
  };
}

// Initial conversation seeds inspired by the reference chat screenshots
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "amy",
    senderName: "Amy Morgenstern",
    timestamp: "3 min",
    text: "Hello! I'm Dr. Amy Morgenstern from Blue Stars Admissions Consulting. Whether you're exploring Ivy League pathways, research spikes, art admissions, or essay guidance, I'm here to help. What questions can I answer for you or your student today?",
    reactionCount: 1,
    hasUserReacted: false,
  },
];

// Quick suggestion chips
const QUICK_PROMPTS = [
  "🎓 Admissions Consulting",
  "📝 Essay & Personal Statement",
  "🔬 Research & Internships",
  "🎨 Art Admissions Consulting",
  "🏆 Student Outcomes & Results",
  "📅 Book Free Strategy Session",
];

// Knowledge base for answering user questions intelligently
function getBotResponse(userText: string): {
  text: string;
  actionLink?: { label: string; href: string };
} {
  const query = userText.toLowerCase();

  if (query.includes("research") || query.includes("internship") || query.includes("academy")) {
    return {
      text: "Yes! At Blue Stars, we guide students in developing academic spikes through independent research projects, mentorship with university faculty, and prestigious summer internships. This provides compelling depth on college applications, especially for STEM, humanities, and pre-med tracks.",
      actionLink: { label: "Learn About Application Strategy", href: "/services/application-strategy" },
    };
  }

  if (query.includes("essay") || query.includes("statement") || query.includes("supplement")) {
    return {
      text: "Our Essay & Personal Statement Guidance focuses on discovering your genuine voice rather than writing cookie-cutter essays. We guide students through brainstorming, outlining, and iterative feedback so their stories stand out vividly to admissions officers.",
      actionLink: { label: "Explore Essay Guidance", href: "/services/essay-guidance" },
    };
  }

  if (query.includes("art") || query.includes("portfolio") || query.includes("risd") || query.includes("design")) {
    return {
      text: "Our Art Admissions Consulting helps aspiring artists, architects, and designers build cohesive portfolios and articulate artist statements for top institutions like RISD, Cooper Union, Pratt, and Carnegie Mellon. Jeanie and Hye Won both secured RISD admissions with our coaching!",
      actionLink: { label: "Art Admissions Program", href: "/services/art-admissions-consulting" },
    };
  }

  if (
    query.includes("result") ||
    query.includes("story") ||
    query.includes("acceptance") ||
    query.includes("stanford") ||
    query.includes("harvard") ||
    query.includes("ivy")
  ) {
    return {
      text: "Blue Stars students earn admissions to prestigious universities nationwide. Our graduates have secured spots at Harvard, Stanford, Brown, Dartmouth, WashU, UPenn, UC Berkeley, UCLA, and received valuable merit scholarships!",
      actionLink: { label: "Browse Student Success Stories", href: "/stories" },
    };
  }

  if (query.includes("price") || query.includes("cost") || query.includes("fee") || query.includes("package")) {
    return {
      text: "We offer tailored, comprehensive consulting packages based on your student's current grade (8th–12th grade) and specific admissions goals. We start with a complimentary 30-minute strategic consultation to review your student's profile and recommend the ideal pathway.",
      actionLink: {
        label: "Schedule Free Consultation",
        href: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
      },
    };
  }

  if (
    query.includes("contact") ||
    query.includes("call") ||
    query.includes("book") ||
    query.includes("consultation") ||
    query.includes("meet") ||
    query.includes("appointment")
  ) {
    return {
      text: "I'd love to connect! You can book a complimentary 30-minute Strategic Admissions Consultation with our directors. We'll discuss your student's aspirations, GPA, extracurriculars, and recommend a personalized plan.",
      actionLink: {
        label: "Book Free Strategic Call",
        href: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
      },
    };
  }

  if (query.includes("service") || query.includes("program") || query.includes("planning") || query.includes("roadmap")) {
    return {
      text: "Blue Stars provides end-to-end guidance including 8th–11th Grade College Planning, Comprehensive Application Strategy, Essay Coaching, Art Admissions, and Merit Scholarship Guidance.",
      actionLink: { label: "View All Services", href: "/services" },
    };
  }

  // Friendly default answer
  return {
    text: "Thank you for reaching out! Every student's journey is unique. At Blue Stars, we tailor our mentoring to each student's authentic strengths. Would you like to explore our student success stories or book a free 30-minute strategic consultation with our team?",
    actionLink: {
      label: "Book Free Consultation",
      href: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
    },
  };
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quotingMessage, setQuotingMessage] = useState<ChatMessage | null>(null);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowWelcomeTooltip(false);
      // Focus input when opened on non-mobile
      if (window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages, isTyping]);

  // Hide initial welcome tooltip after 9 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeTooltip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      senderName: "You",
      timestamp: "Now",
      text,
      quotedText: quotingMessage ? quotingMessage.text : undefined,
      quotedAuthor: quotingMessage ? quotingMessage.senderName : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setQuotingMessage(null);
    setIsTyping(true);

    // Simulate natural thinking delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMessage: ChatMessage = {
        id: `amy-${Date.now()}`,
        sender: "amy",
        senderName: "Amy Morgenstern",
        timestamp: "Now",
        text: response.text,
        quotedText: text,
        quotedAuthor: "You",
        actionLink: response.actionLink,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 950);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleReaction = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const hasReacted = msg.hasUserReacted;
          const currentCount = msg.reactionCount || 0;
          return {
            ...msg,
            hasUserReacted: !hasReacted,
            reactionCount: hasReacted ? Math.max(0, currentCount - 1) : currentCount + 1,
          };
        }
        return msg;
      })
    );
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setQuotingMessage(null);
  };

  return (
    <>
      {/* 1. Floating Tooltip Callout (auto-shows on desktop) */}
      {!isOpen && showWelcomeTooltip && (
        <div
          role="status"
          className="fixed bottom-[84px] sm:bottom-[94px] right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[280px] sm:max-w-xs"
        >
          <div className="bg-white rounded-[8px] p-3 sm:p-3.5 shadow-[0_10px_30px_rgba(10,61,107,0.18)] border border-[#cde1f7] text-left relative">
            <button
              type="button"
              onClick={() => setShowWelcomeTooltip(false)}
              className="absolute top-2 right-2 text-brand-text/50 hover:text-brand-navy p-0.5 rounded-full"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center flex-shrink-0 relative">
                <BrandStar className="w-4 h-4 text-white fill-white" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-white" />
              </div>
              <div className="min-w-0 pr-2">
                <div className="text-xs font-bold text-brand-navy font-heading">
                  Dr. Amy Morgenstern
                </div>
                <p className="text-[11.5px] text-brand-text font-sans mt-0.5 leading-snug">
                  Have questions about college admissions or research spikes? Let&apos;s chat!
                </p>
              </div>
            </div>
            {/* Arrow pointer */}
            <div className="w-3 h-3 bg-white border-r border-b border-[#cde1f7] rotate-45 absolute -bottom-1.5 right-6" />
          </div>
        </div>
      )}

      {/* 2. Floating Trigger Button in Bottom Right */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Blue Stars Chat Assistant"
          className={cn(
            "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50",
            // 5% smaller on mobile (53px), 20% smaller on desktop (52px)
            "w-[53px] h-[53px] sm:w-[52px] sm:h-[52px] rounded-full",
            "bg-gradient-to-br from-[#073D6B] via-[#094D85] to-brand-blue",
            "text-white shadow-[0_8px_24px_rgba(10,61,107,0.32)] hover:shadow-[0_12px_30px_rgba(10,61,107,0.42)]",
            "hover:scale-105 active:scale-95 transition-all duration-300",
            "flex items-center justify-center cursor-pointer group focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
          )}
        >
          {/* Online green indicator badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />

          {/* Blue Stars Star Icon with Chat Glyph */}
          <div className="relative w-7 h-7 sm:w-6.5 sm:h-6.5 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
            <BrandStar className="w-5.5 h-5.5 sm:w-5.5 sm:h-5.5 text-white fill-white drop-shadow-sm" />
            <Sparkles className="w-3 h-3 text-[#9ee3b8] absolute -top-1 -right-1" />
          </div>
        </button>
      )}

      {/* 3. Modern Interactive Chat Window (Matches screenshot UI) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Blue Stars Chat Assistant"
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden bg-white shadow-[0_20px_50px_rgba(10,61,107,0.25)] border border-[#d6e5f3]",
            // Mobile: 5% scaled (inset-x-3.5 bottom-3.5 top-14), Desktop: 20% smaller (350px x 490px)
            "inset-x-3.5 bottom-3.5 top-14 rounded-[14px] sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[590px] sm:max-h-[82vh] sm:rounded-[14px]",
            "animate-in fade-in zoom-in-95 duration-200"
          )}
        >
          {/* Header (Brand Navy Gradient with Amy Morgenstern info) */}
          <header className="p-3 sm:p-3.5 bg-gradient-to-r from-brand-navy via-[#084877] to-brand-blue text-white flex items-center justify-between gap-2.5 flex-shrink-0 shadow-xs relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />

            <div className="flex items-center gap-2 min-w-0 z-10">
              {/* Circular Avatar matching reference image (Blue circle with Blue Stars star) */}
              <div className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-gradient-to-br from-[#073D6B] to-[#0d4f82] border-2 border-white/40 flex items-center justify-center flex-shrink-0 relative shadow-sm">
                <BrandStar className="w-5 h-5 sm:w-5 sm:h-5 text-white fill-white drop-shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-brand-navy" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-[13px] font-bold font-heading truncate leading-tight text-white">
                    Amy Morgenstern
                  </h3>
                  <span className="text-[9.5px] font-bold px-1 py-0.2 rounded-[3px] bg-white/20 text-white/90">
                    Ph.D.
                  </span>
                </div>
                <div className="text-[10.5px] text-white/80 font-sans truncate flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Blue Stars Admissions Director</span>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-2 sm:gap-[2px] z-10 flex-shrink-0">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart conversation"
                className="w-8 h-8 rounded-[5px] text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="w-8 h-8 rounded-[5px] text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Minimize chat"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="w-8 h-8 rounded-[5px] text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </header>

          {/* Conversation Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 space-y-4 bg-[#f8fbfe] font-sans">
            {/* Start of chat timestamp */}
            <div className="text-center my-1">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-brand-text/50 font-heading bg-white px-2.5 py-1 rounded-full border border-[#e4edf6]">
                Blue Stars Admissions Advisor
              </span>
            </div>

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
                  {/* Sender Header Line (Exactly matching screenshot) */}
                  <div className="flex items-center gap-2 mb-1 px-1">
                    {!isUser && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#073D6B] to-brand-blue border border-[#0d4f82]/20 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <BrandStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white drop-shadow-xs" />
                      </div>
                    )}
                    <span className="text-xs sm:text-[13px] font-bold text-brand-navy font-heading">
                      {message.senderName}
                    </span>
                    <span className="text-[11px] text-brand-text/55 font-sans">
                      {message.timestamp}
                    </span>
                  </div>

                  {/* Message Bubble Container */}
                  <div className="relative max-w-[88%] sm:max-w-[84%]">
                    <div
                      className={cn(
                        "rounded-[12px] p-2.5 sm:p-3 text-xs sm:text-[12.5px] leading-[18px] sm:leading-[19px] shadow-2xs font-sans transition-all",
                        isUser
                          ? "bg-[#dcebfb] border border-[#c8e0fa] text-brand-navy rounded-tr-[3px]"
                          : "bg-white border border-[#e4edf6] text-brand-navy rounded-tl-[3px]"
                      )}
                    >
                      {/* Quoted Message Sub-Box (Signature visual element from the screenshot) */}
                      {message.quotedText && (
                        <div
                          className={cn(
                            "rounded-[8px] p-2.5 mb-2 border transition-colors",
                            isUser
                              ? "bg-white/80 border-[#b8d6f8]"
                              : "bg-[#f2f7fc] border-[#d8e6f5]"
                          )}
                        >
                          <div className="flex items-center gap-1.5 text-brand-blue font-bold text-[11px] font-heading mb-0.5">
                            <span className="text-sm font-serif leading-none">“</span>
                            <span>{message.quotedAuthor || "You"}</span>
                          </div>
                          <p className="line-clamp-2 italic text-brand-navy/85 text-[11.5px] font-sans">
                            {message.quotedText}
                          </p>
                        </div>
                      )}

                      {/* Main Message Body */}
                      <p className="whitespace-pre-line text-brand-navy font-medium">
                        {message.text}
                      </p>

                      {/* Action Link (e.g. Schedule Consultation / Read Stories) */}
                      {message.actionLink && (
                        <div className="mt-2.5 pt-2 border-t border-[#e8f1fa]">
                          <Link
                            href={message.actionLink.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white text-[11.5px] font-bold font-heading transition-colors shadow-2xs"
                          >
                            <span>{message.actionLink.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Reaction Badge (Thumbs Up 👍 1 pill matching screenshot) */}
                    {(message.reactionCount || 0) > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleReaction(message.id)}
                        className={cn(
                          "absolute -bottom-2.5 right-2 px-1.5 py-0.5 rounded-full text-[11px] font-sans flex items-center gap-1 bg-white border border-[#d6e5f3] shadow-xs cursor-pointer transition-transform hover:scale-105",
                          message.hasUserReacted
                            ? "bg-[#e8f3fc] border-brand-blue/40 text-brand-blue font-bold"
                            : "text-brand-text hover:text-brand-navy"
                        )}
                        aria-label="Thumbs up reaction"
                      >
                        <span>👍</span>
                        <span>{message.reactionCount}</span>
                      </button>
                    )}
                  </div>

                  {/* Inline Action Trigger: Quote This Message */}
                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuotingMessage(message);
                        inputRef.current?.focus();
                      }}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity mt-1 text-[11px] font-bold text-brand-blue hover:text-brand-navy font-heading flex items-center gap-1 cursor-pointer pl-1"
                    >
                      <CornerDownLeft className="w-3 h-3" />
                      <span>Quote &amp; Reply</span>
                    </button>
                  )}
                </div>
              );
            })}

            {/* Amy Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-1 px-1">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#073D6B] to-brand-blue border border-[#0d4f82]/20 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <BrandStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white drop-shadow-xs" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-brand-navy font-heading">
                    Amy Morgenstern
                  </span>
                  <span className="text-[11px] text-brand-text/50 font-sans">
                    Typing...
                  </span>
                </div>
                <div className="bg-white border border-[#e4edf6] rounded-[14px] rounded-tl-[3px] p-3 text-xs shadow-2xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-brand-blue animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel Bar */}
          <div className="px-3 py-2 bg-white border-t border-[#edf4fb] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold font-heading whitespace-nowrap bg-[#f0f6fc] hover:bg-brand-blue text-brand-navy hover:text-white border border-[#dce8f5] transition-all flex-shrink-0 cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Quoting Preview Banner (when user quotes a previous message) */}
          {quotingMessage && (
            <div className="px-3 py-2 bg-[#eef6fd] border-t border-[#d8e8fa] flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base text-brand-blue font-serif leading-none">“</span>
                <span className="truncate text-brand-navy font-sans text-[11.5px]">
                  Quoting <strong>{quotingMessage.senderName}</strong>: &quot;{quotingMessage.text}&quot;
                </span>
              </div>
              <button
                type="button"
                onClick={() => setQuotingMessage(null)}
                className="text-brand-text hover:text-brand-navy p-1 flex-shrink-0"
                aria-label="Cancel quote"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input Bar */}
          <footer className="p-2.5 sm:p-3 bg-white border-t border-[#e2eef9] flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about admissions, essays, results..."
              className="flex-1 px-3.5 py-2 sm:py-2 rounded-[20px] bg-[#f5f9fd] border border-[#d6e5f3] text-xs sm:text-[13px] text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:border-brand-blue focus:bg-white font-sans transition-all"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className={cn(
                "w-8.5 h-8.5 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-2xs",
                inputValue.trim()
                  ? "bg-brand-blue hover:bg-brand-navy text-white hover:scale-105 active:scale-95"
                  : "bg-[#e5eff8] text-brand-text/40 cursor-not-allowed"
              )}
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </footer>
        </div>
      )}
    </>
  );
}

