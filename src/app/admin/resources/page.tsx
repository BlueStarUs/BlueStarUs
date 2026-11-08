"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderOpen,
  BookOpen,
  Radio,
  Video,
  HelpCircle,
  PlusCircle,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Loader2,
  CheckCircle2,
  Calendar,
  Clock,
  Download,
} from "lucide-react";
import {
  RESOURCE_GUIDES,
  WEBINARS_LIST,
  VIDEOS_LIST,
  FAQ_KNOWLEDGE_BASE,
  ResourceGuide,
  WebinarItem,
  VideoResource,
  FAQCategoryItem,
} from "@/lib/resources-data";
import { cn } from "@/lib/utils";

type ResourceTab = "guides" | "webinars" | "videos" | "faqs";

export default function AdminResourcesPage() {
  const [activeTab, setActiveTab] = useState<ResourceTab>("guides");
  const [guides, setGuides] = useState<ResourceGuide[]>(RESOURCE_GUIDES);
  const [webinars, setWebinars] = useState<WebinarItem[]>(WEBINARS_LIST);
  const [videos, setVideos] = useState<VideoResource[]>(VIDEOS_LIST);
  const [faqs, setFaqs] = useState<FAQCategoryItem[]>(FAQ_KNOWLEDGE_BASE);

  const [isAddGuideModal, setIsAddGuideModal] = useState(false);
  const [isAddWebinarModal, setIsAddWebinarModal] = useState(false);

  // New Guide Form
  const [guideForm, setGuideForm] = useState({
    title: "",
    subtitle: "",
    category: "Strategy" as const,
    description: "",
    pages: 35,
    readTime: "20 min read",
    downloadCount: "1,200+",
  });

  // New Webinar Form
  const [webinarForm, setWebinarForm] = useState({
    title: "",
    subtitle: "",
    date: "November 20, 2026",
    time: "5:00 PM PST",
    speakerName: "Dr. Amy Morgenstern",
    speakerRole: "Founder & Master Consultant",
    category: "Ivy League Admissions",
    description: "",
    status: "upcoming" as const,
  });

  const handleAddGuide = (e: React.FormEvent) => {
    e.preventDefault();
    const newGuide = {
      ...guideForm,
      id: `guide-${Date.now()}`,
      slug: guideForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      coverImage: "/images/resources/guides/Ivy_League_Top_20_Admissions_Playbook.png",
      updatedAt: "Fall 2026",
      highlights: ["Strategic admissions frameworks", "Interactive worksheets & checklists"],
      tableOfContents: ["1. Overview", "2. Core Strategy", "3. Step-by-Step Implementation"],
      targetAudience: "High school families targeting top 30 universities.",
    };

    setGuides([newGuide, ...guides]);
    setIsAddGuideModal(false);
    setGuideForm({
      title: "",
      subtitle: "",
      category: "Strategy",
      description: "",
      pages: 35,
      readTime: "20 min read",
      downloadCount: "1,200+",
    });
  };

  const handleDeleteGuide = (id: string) => {
    if (!window.confirm("Delete this guide?")) return;
    setGuides(guides.filter((g) => g.id !== id));
  };

  const handleAddWebinar = (e: React.FormEvent) => {
    e.preventDefault();
    const newWebinar = {
      ...webinarForm,
      id: `webinar-${Date.now()}`,
      slug: webinarForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      duration: "60 mins",
      speaker: {
        name: webinarForm.speakerName,
        role: webinarForm.speakerRole,
        avatar: "/images/person/person1.png",
      },
      topics: ["Admissions Strategy", "Live Q&A"],
      takeaways: ["Strategic action plan", "Timeline checklist"],
    };

    setWebinars([newWebinar, ...webinars]);
    setIsAddWebinarModal(false);
  };

  const handleDeleteWebinar = (id: string) => {
    if (!window.confirm("Delete this webinar?")) return;
    setWebinars(webinars.filter((w) => w.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
            Resource Toolkits &amp; Materials
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
            Manage comprehensive guides, upcoming live webinars, masterclass videos, and FAQs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "guides" && (
            <button
              type="button"
              onClick={() => setIsAddGuideModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold font-heading shadow-xs cursor-pointer transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Guide</span>
            </button>
          )}

          {activeTab === "webinars" && (
            <button
              type="button"
              onClick={() => setIsAddWebinarModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold font-heading shadow-xs cursor-pointer transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Schedule Webinar</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-border pb-px overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("guides")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 font-bold font-heading text-xs sm:text-[13px] border-b-2 transition-colors cursor-pointer whitespace-nowrap",
            activeTab === "guides"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-brand-text hover:text-brand-navy"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>Application Guides ({guides.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("webinars")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 font-bold font-heading text-xs sm:text-[13px] border-b-2 transition-colors cursor-pointer whitespace-nowrap",
            activeTab === "webinars"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-brand-text hover:text-brand-navy"
          )}
        >
          <Radio className="w-4 h-4" />
          <span>Live Webinars ({webinars.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("videos")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 font-bold font-heading text-xs sm:text-[13px] border-b-2 transition-colors cursor-pointer whitespace-nowrap",
            activeTab === "videos"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-brand-text hover:text-brand-navy"
          )}
        >
          <Video className="w-4 h-4" />
          <span>Video Masterclasses ({videos.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 font-bold font-heading text-xs sm:text-[13px] border-b-2 transition-colors cursor-pointer whitespace-nowrap",
            activeTab === "faqs"
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-brand-text hover:text-brand-navy"
          )}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ Knowledge Base ({faqs.length} categories)</span>
        </button>
      </div>

      {/* Tab 1: Guides */}
      {activeTab === "guides" && (
        <div className="bg-white rounded-[5px] border border-brand-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F8FBFE] border-b border-brand-border text-brand-navy font-bold font-heading uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Guide Title &amp; Subtitle</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Pages / Read</th>
                  <th className="py-3.5 px-4">Downloads</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {guides.map((guide) => (
                  <tr key={guide.id} className="hover:bg-[#F8FBFE]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-navy text-sm font-heading">
                        {guide.title}
                      </div>
                      <div className="text-[11.5px] text-brand-text truncate max-w-md mt-0.5">
                        {guide.subtitle}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-[3px] bg-brand-sky text-brand-blue font-bold text-[11px] font-heading">
                        {guide.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-brand-text">
                      {guide.pages} pages • {guide.readTime}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#2F9E5C] font-heading">
                      {guide.downloadCount}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/resources/guides/${guide.slug}`}
                          target="_blank"
                          title="View live page"
                          className="p-1.5 rounded-[4px] text-brand-text hover:text-brand-blue hover:bg-brand-sky"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteGuide(guide.id)}
                          className="p-1.5 rounded-[4px] text-red-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Webinars */}
      {activeTab === "webinars" && (
        <div className="bg-white rounded-[5px] border border-brand-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F8FBFE] border-b border-brand-border text-brand-navy font-bold font-heading uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Webinar Title</th>
                  <th className="py-3.5 px-4">Date &amp; Time</th>
                  <th className="py-3.5 px-4">Speaker</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {webinars.map((webinar) => (
                  <tr key={webinar.id} className="hover:bg-[#F8FBFE]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-navy text-sm font-heading">
                        {webinar.title}
                      </div>
                      <div className="text-[11px] text-brand-text mt-0.5">
                        {webinar.subtitle}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-brand-navy font-medium">
                      <div>{webinar.date}</div>
                      <div className="text-[11px] text-brand-text">{webinar.time}</div>
                    </td>

                    <td className="py-3.5 px-4 text-brand-text">
                      <div className="font-bold text-brand-navy">{webinar.speaker.name}</div>
                      <div className="text-[11px]">{webinar.speaker.role}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider",
                          webinar.status === "upcoming"
                            ? "bg-[#E3F5EA] text-[#2F9E5C]"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {webinar.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteWebinar(webinar.id)}
                        className="p-1.5 rounded-[4px] text-red-500 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Videos */}
      {activeTab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((vid) => (
            <div key={vid.id} className="bg-white rounded-[5px] border border-brand-border p-4 shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-[3px] bg-brand-sky text-brand-blue text-[10.5px] font-bold uppercase font-heading">
                  {vid.category}
                </span>
                <h4 className="text-sm font-extrabold text-brand-navy font-heading mt-2 line-clamp-2">
                  {vid.title}
                </h4>
                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-1 line-clamp-2">
                  {vid.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-text">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {vid.duration}
                </span>
                <span className="font-semibold text-brand-navy">{vid.speaker}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: FAQs */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
          {faqs.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-[5px] border border-brand-border p-6 shadow-xs">
              <h3 className="text-base font-extrabold text-brand-navy font-heading mb-1">
                {cat.category}
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                {cat.description}
              </p>

              <div className="divide-y divide-brand-border/60">
                {cat.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="py-3">
                    <div className="text-xs font-bold text-brand-navy font-heading">
                      Q: {faq.question}
                    </div>
                    <div className="text-xs text-brand-text font-sans mt-1 pl-3 border-l-2 border-brand-blue/30 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Guide */}
      {isAddGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#072442]/60 backdrop-blur-xs">
          <div className="bg-white rounded-[5px] border border-brand-border w-full max-w-lg p-6 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setIsAddGuideModal(false)}
              className="absolute top-4 right-4 p-1 rounded-[5px] text-brand-text hover:text-brand-navy"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-extrabold text-brand-navy font-heading mb-4">
              Add New Application Guide
            </h3>
            <form onSubmit={handleAddGuide} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-brand-navy font-heading block mb-1">Guide Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford & Ivy League Spike Blueprint"
                  value={guideForm.title}
                  onChange={(e) => setGuideForm({ ...guideForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE]"
                />
              </div>
              <div>
                <label className="font-bold text-brand-navy font-heading block mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. A step-by-step roadmap for high schoolers"
                  value={guideForm.subtitle}
                  onChange={(e) => setGuideForm({ ...guideForm, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE]"
                />
              </div>
              <div>
                <label className="font-bold text-brand-navy font-heading block mb-1">Category</label>
                <select
                  value={guideForm.category}
                  onChange={(e) => setGuideForm({ ...guideForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE]"
                >
                  <option value="Strategy">Strategy</option>
                  <option value="Essays">Essays</option>
                  <option value="UC System">UC System</option>
                  <option value="Checklists">Checklists</option>
                  <option value="High School">High School</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-brand-navy font-heading block mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  value={guideForm.description}
                  onChange={(e) => setGuideForm({ ...guideForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddGuideModal(false)}
                  className="px-4 py-2 font-bold font-heading text-brand-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[5px] font-bold font-heading bg-brand-blue text-white"
                >
                  Save Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

