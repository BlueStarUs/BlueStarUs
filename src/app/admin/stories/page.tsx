"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Star,
  ExternalLink,
  X,
  Upload,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { SuccessStory } from "@/types";
import { STORY_CATEGORIES } from "@/lib/stories-data";
import { cn } from "@/lib/utils";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Stories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<SuccessStory>>({
    id: "",
    name: "",
    title: "",
    admittedTo: "",
    category: "Ivy League & Elite",
    accent: "blue",
    quote: "",
    fullStory: [],
    tags: [],
    highSchool: "",
    location: "United States",
    authorRole: "Blue Stars Student",
    rating: 5,
    image: "/images/person/person1.png",
  });

  const [fullStoryText, setFullStoryText] = useState("");
  const [tagsText, setTagsText] = useState("");

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/admin/stories");
      const data = await res.json();
      if (data.success) {
        setStories(data.stories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory =
        selectedCategory === "All Stories" || story.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        story.name.toLowerCase().includes(q) ||
        (story.title || "").toLowerCase().includes(q) ||
        (story.admittedTo || "").toLowerCase().includes(q) ||
        story.quote.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [stories, selectedCategory, searchQuery]);

  const handleOpenAddModal = () => {
    setEditingStory(null);
    setFormData({
      id: `story-${Date.now()}`,
      name: "",
      title: "",
      admittedTo: "",
      category: "Ivy League & Elite",
      accent: "blue",
      quote: "",
      highSchool: "",
      location: "United States",
      authorRole: "Blue Stars Student",
      rating: 5,
      image: "/images/person/person1.png",
    });
    setFullStoryText("");
    setTagsText("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (story: SuccessStory) => {
    setEditingStory(story);
    setFormData(story);
    setFullStoryText((story.fullStory || [story.quote]).join("\n\n"));
    setTagsText((story.tags || []).join(", "));
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const body = new FormData();
    body.append("file", file);
    body.append("fileName", `avatar_${Date.now()}_${file.name}`);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;

    setIsSaving(true);
    const paragraphs = fullStoryText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: SuccessStory = {
      ...(formData as SuccessStory),
      id: formData.id || `story-${formData.name?.toLowerCase().replace(/\s+/g, "-")}`,
      fullStory: paragraphs.length > 0 ? paragraphs : [formData.quote || ""],
      tags,
    };

    try {
      const res = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStories((prev) => {
          const idx = prev.findIndex((s) => s.id === payload.id);
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = payload;
            return updated;
          }
          return [payload, ...prev];
        });
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this success story?")) return;
    try {
      const res = await fetch(`/api/admin/stories?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setStories((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
            Student Success Stories
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
            Manage genuine student acceptances, test scores, scholarships, and Ivy League outcomes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white font-bold text-xs sm:text-[13px] font-heading shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Story</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-[5px] border border-brand-border shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-text/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stories by student, university, or quote..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-xs sm:text-[13px] text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-sans"
            />
          </div>

          <div className="text-xs font-bold font-heading text-brand-navy/70">
            Showing {filteredStories.length} of {stories.length} stories
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {["All Stories", ...STORY_CATEGORIES.filter((c) => c !== "All Stories")].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-3 py-1.5 rounded-[5px] text-xs font-bold font-heading whitespace-nowrap transition-colors cursor-pointer",
                selectedCategory === category
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-[#F8FBFE] text-brand-navy/80 hover:bg-brand-sky hover:text-brand-blue border border-brand-border/60"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Table */}
      <div className="bg-white rounded-[5px] border border-brand-border shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-brand-navy text-xs font-bold font-heading">
            <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
            <span>Loading Stories...</span>
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="py-16 text-center text-brand-text text-xs sm:text-sm">
            No success stories found matching your filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F8FBFE] border-b border-brand-border text-brand-navy font-bold font-heading uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Student &amp; Title</th>
                  <th className="py-3.5 px-4">Admitted University</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Accent</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredStories.map((story) => (
                  <tr key={story.id} className="hover:bg-[#F8FBFE]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-navy text-sm font-heading flex items-center gap-2">
                        <span>{story.name}</span>
                        <div className="flex items-center text-amber-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] ml-0.5 text-brand-navy font-bold">5.0</span>
                        </div>
                      </div>
                      <div className="text-[11.5px] text-brand-text truncate max-w-sm mt-0.5">
                        {story.title || story.quote}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#E8F3FC] text-brand-navy font-bold text-xs font-heading">
                        <GraduationCap className="w-3.5 h-3.5 text-brand-blue" />
                        <span>{story.admittedTo || "Top Choice Admit"}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-brand-navy font-medium">
                      {story.category || "Ivy League & Elite"}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider",
                          story.accent === "green"
                            ? "bg-[#E3F5EA] text-[#2F9E5C]"
                            : "bg-brand-sky text-brand-blue"
                        )}
                      >
                        {story.accent || "blue"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/stories/${story.id}`}
                          target="_blank"
                          title="View live page"
                          className="p-1.5 rounded-[4px] text-brand-text hover:text-brand-blue hover:bg-brand-sky transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(story)}
                          title="Edit story"
                          className="p-1.5 rounded-[4px] text-brand-blue hover:bg-brand-sky transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteStory(story.id)}
                          title="Delete story"
                          className="p-1.5 rounded-[4px] text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
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
        )}
      </div>

      {/* Add / Edit Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#072442]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[5px] border border-brand-border w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-[5px] text-brand-text hover:text-brand-navy hover:bg-brand-sky"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue font-heading">
                {editingStory ? "EDIT SUCCESS STORY" : "CREATE NEW SUCCESS STORY"}
              </span>
              <h3 className="text-xl font-extrabold text-brand-navy font-heading mt-0.5">
                {editingStory ? `Edit: ${editingStory.name}` : "New Acceptance Outcome"}
              </h3>
            </div>

            <form onSubmit={handleSaveStory} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sandy"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Admitted University *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford & Harvard, NYU Stern"
                    value={formData.admittedTo || ""}
                    onChange={(e) => setFormData({ ...formData, admittedTo: e.target.value })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Story Title / Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Trusted Guidance for All Three of Our Children"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Category Track
                  </label>
                  <select
                    value={formData.category || "Ivy League & Elite"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-medium"
                  >
                    {STORY_CATEGORIES.filter((c) => c !== "All Stories").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Color Accent Theme
                  </label>
                  <select
                    value={formData.accent || "blue"}
                    onChange={(e) => setFormData({ ...formData, accent: e.target.value as "blue" | "green" })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-medium"
                  >
                    <option value="blue">Brand Navy &amp; Blue</option>
                    <option value="green">Green Accent (Merit / Arts)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Primary Quote / Testimonial *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="The highlighted quotation shown on cards and overview..."
                  value={formData.quote || ""}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Full Story Paragraphs (Separate each paragraph with a blank line)
                </label>
                <textarea
                  rows={5}
                  placeholder="Paragraph 1...&#10;&#10;Paragraph 2...&#10;&#10;Paragraph 3..."
                  value={fullStoryText}
                  onChange={(e) => setFullStoryText(e.target.value)}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    High School or Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gunn High School, Palo Alto, CA"
                    value={formData.highSchool || ""}
                    onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy"
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Highlights / Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stanford & Harvard, UC Berkeley, Merit"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy"
                  />
                </div>
              </div>

              {/* Avatar / Photo with ImageKit Upload */}
              <div className="p-3.5 rounded-[5px] bg-[#F8FBFE] border border-brand-border space-y-2">
                <span className="font-bold text-brand-navy font-heading uppercase tracking-wider block">
                  Student Avatar Photo (Upload to ImageKit)
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs text-brand-text file:mr-3 file:py-1.5 file:px-3 file:rounded-[4px] file:border-0 file:text-xs file:font-bold file:bg-brand-blue file:text-white hover:file:bg-brand-navy cursor-pointer"
                  />
                  {isUploadingImage && (
                    <span className="flex items-center gap-1.5 text-xs text-brand-blue font-bold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to ImageKit...
                    </span>
                  )}
                </div>
                {formData.image && (
                  <div className="text-[11px] text-brand-text truncate">
                    Current Image: <span className="font-mono text-brand-navy">{formData.image}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-[5px] font-bold font-heading text-brand-navy hover:bg-brand-sky transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-[5px] font-bold font-heading bg-brand-blue hover:bg-brand-navy text-white transition-colors cursor-pointer shadow-xs"
                >
                  {isSaving ? "Saving Story..." : editingStory ? "Update Story" : "Publish Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

