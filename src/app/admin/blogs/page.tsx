"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Upload,
  Loader2,
  CheckCircle2,
  Star,
  Clock,
} from "lucide-react";
import { BlogPost } from "@/types";
import { BLOG_CATEGORIES } from "@/lib/blogs-data";
import { cn } from "@/lib/utils";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    slug: "",
    title: "",
    excerpt: "",
    coverImage: "/images/blogs/blogs1.png",
    category: "College Planning",
    readTime: "7 min read",
    publishedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    accent: "blue",
    featured: false,
    tags: [],
    author: {
      name: "Dr. Amy Morgenstern",
      role: "Founder & Master Admissions Consultant",
      avatar: "/images/person/person1.png",
    },
    intro: [],
    sections: [],
    keyTakeaways: [],
    conclusion: [],
    relatedSlugs: [],
  });

  const [introText, setIntroText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tagsText, setTagsText] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.slug.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const handleOpenAddModal = () => {
    setEditingBlog(null);
    setFormData({
      slug: "",
      title: "",
      excerpt: "",
      coverImage: "/images/blogs/blogs1.png",
      category: "College Planning",
      readTime: "6 min read",
      publishedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      accent: "blue",
      featured: false,
      tags: [],
      author: {
        name: "Dr. Amy Morgenstern",
        role: "Founder & Master Admissions Consultant",
        avatar: "/images/person/person1.png",
      },
      intro: [],
      sections: [],
      keyTakeaways: [],
      conclusion: [],
      relatedSlugs: [],
    });
    setIntroText("");
    setBodyText("");
    setTagsText("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData(blog);
    setIntroText(blog.intro.join("\n\n"));
    const allSections = blog.sections
      .map((sec) => `## ${sec.heading}\n\n${sec.paragraphs.join("\n\n")}`)
      .join("\n\n");
    setBodyText(allSections);
    setTagsText(blog.tags.join(", "));
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const body = new FormData();
    body.append("file", file);
    body.append("fileName", `blog_${Date.now()}_${file.name}`);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
      }
    } catch (err) {
      console.error("Cover image upload failed", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) return;

    setIsSaving(true);
    const slug =
      formData.slug?.trim() ||
      formData.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const introParagraphs = introText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    // Simple parser for ## Heading and paragraphs
    const sectionBlocks = bodyText.split(/##\s+/).filter(Boolean);
    const parsedSections = sectionBlocks.map((block) => {
      const lines = block.trim().split("\n");
      const heading = lines[0].trim();
      const paragraphs = lines
        .slice(1)
        .join("\n")
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      return {
        heading,
        paragraphs: paragraphs.length > 0 ? paragraphs : ["Content section..."],
      };
    });

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: BlogPost = {
      ...(formData as BlogPost),
      slug: slug || `post-${Date.now()}`,
      tags,
      intro: introParagraphs.length > 0 ? introParagraphs : [formData.excerpt || ""],
      sections: parsedSections.length > 0 ? parsedSections : [
        {
          heading: "Admissions Insights",
          paragraphs: [formData.excerpt || ""],
        }
      ],
      keyTakeaways: formData.keyTakeaways || [],
      conclusion: formData.conclusion || [],
      relatedSlugs: formData.relatedSlugs || [],
    };

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setBlogs((prev) => {
          const idx = prev.findIndex((b) => b.slug === payload.slug);
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

  const handleDeleteBlog = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?slug=${slug}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
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
            Admissions Articles &amp; Blog Posts
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-0.5">
            Publish educational articles, essay writing tips, and college strategy guides.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white font-bold text-xs sm:text-[13px] font-heading shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Blog Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-[5px] border border-brand-border shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-text/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-xs sm:text-[13px] text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-sans"
            />
          </div>

          <div className="text-xs font-bold font-heading text-brand-navy/70">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {BLOG_CATEGORIES.map((category) => (
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

      {/* Blogs Table */}
      <div className="bg-white rounded-[5px] border border-brand-border shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-brand-navy text-xs font-bold font-heading">
            <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
            <span>Loading Blog Articles...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center text-brand-text text-xs sm:text-sm">
            No blog articles match your search or filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F8FBFE] border-b border-brand-border text-brand-navy font-bold font-heading uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Article Title &amp; Excerpt</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Published</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.slug} className="hover:bg-[#F8FBFE]/80 transition-colors">
                    <td className="py-3.5 px-4 max-w-[320px]">
                      <div className="font-bold text-brand-navy text-sm font-heading flex items-center gap-2 ">
                        <span className="truncate max-w-md">{blog.title}</span>
                        {blog.featured && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-[3px] bg-amber-100 text-amber-800 font-bold uppercase font-heading">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-[11.5px] text-brand-text truncate max-w-md mt-0.5">
                        {blog.excerpt}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-[3px] bg-brand-sky text-brand-blue font-bold text-[11px] font-heading">
                        {blog.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-brand-navy font-medium">
                      {blog.author?.name || "Dr. Amy Morgenstern"}
                    </td>

                    <td className="py-3.5 px-4 text-brand-text flex items-center gap-1 mt-3">
                      <Clock className="w-3.5 h-3.5 text-brand-text/50" />
                      <span>{blog.readTime}</span>
                    </td>

                    <td className="py-3.5 px-4 text-brand-text">
                      {blog.publishedAt}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end sm:gap-3 gap-2">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          title="View live article"
                          className="p-1.5 rounded-[4px] text-brand-text text-white hover:text-brand-blue bg-brand-blue hover:bg-brand-sky transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(blog)}
                          title="Edit article"
                          className="p-1.5 rounded-[4px] text-brand-blue hover:bg-brand-sky transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(blog.slug)}
                          title="Delete article"
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

      {/* Add / Edit Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#072442]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[5px] border border-brand-border w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-[5px] text-brand-text hover:text-brand-navy hover:bg-brand-sky"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue font-heading">
                {editingBlog ? "EDIT ARTICLE" : "WRITE NEW ARTICLE"}
              </span>
              <h3 className="text-xl font-extrabold text-brand-navy font-heading mt-0.5">
                {editingBlog ? `Edit: ${editingBlog.title}` : "New College Admissions Guide"}
              </h3>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-sans">
              <div>
                <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to Choose the Right Colleges for Your Goals"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-heading text-sm focus:bg-white focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="how-to-choose-colleges"
                    value={formData.slug || ""}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Category Track
                  </label>
                  <select
                    value={formData.category || "College Planning"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogPost["category"] })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy font-medium"
                  >
                    {BLOG_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Excerpt / Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="A clear 1-2 sentence preview shown on cards..."
                  value={formData.excerpt || ""}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Introductory Paragraphs (Separate with blank line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Introductory context setting the stage for the article..."
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                  Article Body Sections (Format: ## Section Heading followed by paragraphs)
                </label>
                <textarea
                  rows={8}
                  placeholder="## 1. Moving Beyond Generic Rankings&#10;&#10;When researching potential colleges, examine the educational philosophy...&#10;&#10;## 2. The 2-4-2 Strategic Framework&#10;&#10;Every balanced list needs reach, match, and foundational safety schools..."
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy focus:bg-white focus:border-brand-blue font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="College List, Ivy League, Strategy"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy"
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-navy font-heading uppercase tracking-wider block mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7 min read"
                    value={formData.readTime || "6 min read"}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full p-2.5 rounded-[5px] border border-brand-border bg-[#F8FBFE] text-brand-navy"
                  />
                </div>
              </div>

              {/* Cover Image with ImageKit Upload */}
              <div className="p-3.5 rounded-[5px] bg-[#F8FBFE] border border-brand-border space-y-2">
                <span className="font-bold text-brand-navy font-heading uppercase tracking-wider block">
                  Cover Image (Upload via ImageKit)
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
                {formData.coverImage && (
                  <div className="text-[11px] text-brand-text truncate">
                    Current Image: <span className="font-mono text-brand-navy">{formData.coverImage}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-brand-blue focus:ring-brand-blue w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featured" className="font-bold text-brand-navy font-heading cursor-pointer">
                  Feature this article at the top of the blog page
                </label>
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
                  {isSaving ? "Saving..." : editingBlog ? "Update Article" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

