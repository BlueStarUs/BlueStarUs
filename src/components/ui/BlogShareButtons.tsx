"use client";

import React, { useState } from "react";
import { Share2, Link as LinkIcon, Check, Linkedin, Twitter } from "lucide-react";

interface BlogShareButtonsProps {
  title: string;
  url?: string;
}

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return url || window.location.href;
    }
    return url || "https://bluestars.us";
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = getShareUrl();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareLinkedIn = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleShareTwitter = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    const shareText = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-brand-navy/70 uppercase tracking-wider font-heading mr-1 hidden sm:inline">
        Share:
      </span>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-bg hover:bg-brand-sky text-brand-navy hover:text-brand-blue text-xs font-semibold font-heading transition-colors border border-brand-border/70"
        title="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-brand-greenDark" />
            <span className="text-brand-greenDark font-bold">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleShareLinkedIn}
        className="w-8 h-8 rounded-full bg-brand-bg hover:bg-[#0077b5] text-brand-navy hover:text-white grid place-items-center transition-colors border border-brand-border/70"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={handleShareTwitter}
        className="w-8 h-8 rounded-full bg-brand-bg hover:bg-black text-brand-navy hover:text-white grid place-items-center transition-colors border border-brand-border/70"
        title="Share on X"
        aria-label="Share on X"
      >
        <Twitter className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

