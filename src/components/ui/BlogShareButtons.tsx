"use client";

import React, { useState } from "react";
import { Link as LinkIcon, Check, Linkedin, Twitter, Mail, MessageCircle, Share2 } from "lucide-react";
import { FacebookIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface BlogShareButtonsProps {
  title: string;
  url?: string;
  showLabel?: boolean;
  className?: string;
}

export function BlogShareButtons({
  title,
  url,
  showLabel = true,
  className,
}: BlogShareButtonsProps) {
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
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

  const handleShareLinkedIn = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleShareWhatsApp = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    const shareText = encodeURIComponent(title);
    window.open(
      `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleShareEmail = () => {
    const shareUrl = getShareUrl();
    const subject = encodeURIComponent(`Recommended Article: ${title}`);
    const body = encodeURIComponent(
      `Hi,\n\nI thought you might find this article from Blue Stars Admissions Consulting helpful:\n\n${title}\n${shareUrl}\n`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-2 flex-wrap", className)}>
      {showLabel && (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mr-1">
          <Share2 className="w-3.5 h-3.5 text-brand-blue" />
          <span>Share:</span>
        </span>
      )}

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-white hover:bg-brand-sky text-brand-navy hover:text-brand-blue text-xs font-semibold font-heading transition-colors border border-brand-border shadow-xs flex-shrink-0"
        title="Copy link"
        aria-label="Copy link to article"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-brand-greenDark" />
            <span className="text-brand-greenDark font-bold">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5 text-brand-blue" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Social Icon Group */}
      <div className="inline-flex items-center gap-1.5 flex-wrap">
        {/* Facebook */}
        <button
          type="button"
          onClick={handleShareFacebook}
          className="w-8 h-8 rounded-[5px] bg-white hover:bg-[#1877f2] text-brand-navy hover:text-white grid place-items-center transition-colors border border-brand-border shadow-xs"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="w-3.5 h-3.5" />
        </button>

        {/* X / Twitter */}
        <button
          type="button"
          onClick={handleShareTwitter}
          className="w-8 h-8 rounded-[5px] bg-white hover:bg-black text-brand-navy hover:text-white grid place-items-center transition-colors border border-brand-border shadow-xs"
          title="Share on X"
          aria-label="Share on X"
        >
          <Twitter className="w-3.5 h-3.5" />
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={handleShareLinkedIn}
          className="w-8 h-8 rounded-[5px] bg-white hover:bg-[#0077b5] text-brand-navy hover:text-white grid place-items-center transition-colors border border-brand-border shadow-xs"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-8 h-8 rounded-[5px] bg-white hover:bg-[#25D366] text-brand-navy hover:text-white grid place-items-center transition-colors border border-brand-border shadow-xs"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5" />
        </button>

        {/* Email */}
        <button
          type="button"
          onClick={handleShareEmail}
          className="w-8 h-8 rounded-[5px] bg-white hover:bg-brand-blue text-brand-navy hover:text-white grid place-items-center transition-colors border border-brand-border shadow-xs"
          title="Share via Email"
          aria-label="Share via Email"
        >
          <Mail className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

