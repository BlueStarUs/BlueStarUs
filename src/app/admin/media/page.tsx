"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Upload,
  Copy,
  Check,
  Image as ImageIcon,
  Loader2,
  Trash2,
  ExternalLink,
  Sparkles,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedMediaItem {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  isLocalFallback?: boolean;
}

const DEFAULT_MEDIA: UploadedMediaItem[] = [
  {
    id: "media-1",
    name: "person1.png",
    url: "/images/person/person1.png",
    uploadedAt: "Default Asset",
  },
  {
    id: "media-2",
    name: "person2.png",
    url: "/images/person/person2.png",
    uploadedAt: "Default Asset",
  },
  {
    id: "media-3",
    name: "person3.png",
    url: "/images/person/person3.png",
    uploadedAt: "Default Asset",
  },
  {
    id: "media-4",
    name: "blogs1.png",
    url: "/images/blogs/blogs1.png",
    uploadedAt: "Default Asset",
  },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<UploadedMediaItem[]>(DEFAULT_MEDIA);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const newItem: UploadedMediaItem = {
          id: data.fileId || `media-${Date.now()}`,
          name: data.name || file.name,
          url: data.url,
          uploadedAt: "Just now",
          isLocalFallback: data.isLocalFallback,
        };
        setMediaList([newItem, ...mediaList]);
      } else {
        setUploadError(data.message || "Failed to upload image");
      }
    } catch {
      setUploadError("Network connection error during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
         Media Library
        </h1>
        <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
          Upload and manage photos, student avatars, and blog cover illustrations delivered via ImageKit CDN.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-[5px] border-2 border-dashed border-brand-border hover:border-brand-blue p-8 text-center transition-colors shadow-xs">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-sky text-brand-blue flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-brand-navy font-heading">
              Upload Images to ImageKit
            </h3>
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-1">
              Supports PNG, JPG, WebP, SVG up to 10MB. Transformed and cached on ImageKit CDN.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white font-bold text-xs sm:text-[13px] font-heading shadow-xs cursor-pointer transition-colors">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading to ImageKit CDN...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Browse &amp; Upload File</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={isUploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {uploadError && (
            <p className="text-xs text-red-600 font-bold font-sans mt-2">
              {uploadError}
            </p>
          )}
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-[5px] border border-brand-border p-6 shadow-xs">
        <h3 className="text-sm font-extrabold text-brand-navy font-heading mb-4">
          All Media Assets ({mediaList.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="rounded-[5px] border border-brand-border overflow-hidden bg-[#F8FBFE] flex flex-col justify-between group hover:border-brand-blue transition-colors"
            >
              {/* Image Preview */}
              <div className="relative aspect-video w-full bg-white flex items-center justify-center overflow-hidden border-b border-brand-border/60">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Info & Copy Action */}
              <div className="p-3">
                <div className="text-xs font-bold text-brand-navy font-heading truncate">
                  {item.name}
                </div>
                <div className="text-[11px] text-brand-text/70 font-sans mt-0.5 truncate">
                  {item.uploadedAt}
                </div>

                <div className="mt-3 pt-2 border-t border-brand-border/60 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.url)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-[4px] bg-white hover:bg-brand-sky border border-brand-border text-brand-navy text-[11px] font-bold font-heading transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2F9E5C]" />
                        <span className="text-[#2F9E5C]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-[4px] text-brand-text hover:text-brand-blue hover:bg-white transition-colors"
                    title="Open image"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

