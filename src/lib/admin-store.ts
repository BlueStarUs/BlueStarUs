import { ConsultationLead, SuccessStory, BlogPost, HeroConfig, Announcement } from "@/types";
import { SUCCESS_STORIES } from "@/lib/stories-data";
import { BLOG_POSTS } from "@/lib/blogs-data";
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
import { SITE_CONFIG, DEFAULT_HERO_CONFIG, DEFAULT_ANNOUNCEMENTS } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase";

// In-Memory store as robust fallback and cache
const INITIAL_LEADS: ConsultationLead[] = [
  {
    id: "lead-1",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+1 (408) 555-0192",
    studentGrade: "11th Grade",
    interest: "College Admissions Consulting",
    targetColleges: "Stanford, UC Berkeley, Carnegie Mellon (CS)",
    message: "Interested in developing an authentic AI research spike and optimizing my 11th grade extracurricular roadmap before early applications next fall.",
    status: "new",
    createdAt: "2026-11-06T10:15:00Z",
    notes: "High GPA (3.98 UW), robotics team lead. Wants faculty research connection.",
  },
  {
    id: "lead-2",
    fullName: "Emily Chen & Parent",
    email: "chen.family@example.com",
    phone: "+1 (650) 555-0144",
    studentGrade: "12th Grade",
    interest: "Essay & Personal Statement Guidance",
    targetColleges: "WashU (ED), Brown, Northwestern, Dartmouth",
    message: "We need comprehensive guidance on personal statement drafts and supplemental essays before the upcoming Early Decision deadline.",
    status: "contacted",
    createdAt: "2026-11-05T14:30:00Z",
    notes: "Initial phone screening completed. Recommended 1-on-1 essay intensive with Dr. Amy.",
  },
  {
    id: "lead-3",
    fullName: "Marcus Vance",
    email: "marcus.vance@example.com",
    phone: "+1 (206) 555-0812",
    studentGrade: "10th Grade",
    interest: "Art Admissions Consulting",
    targetColleges: "Rhode Island School of Design (RISD), Cooper Union, Pratt",
    message: "Looking for early art portfolio curation, sketchbook review, and summer program application strategy.",
    status: "consulted",
    createdAt: "2026-11-04T09:20:00Z",
    notes: "Strategic consultation held on Zoom. Impressive digital art portfolio.",
  },
  {
    id: "lead-4",
    fullName: "Sophia Patel",
    email: "patel.sophia@example.com",
    phone: "+1 (510) 555-0633",
    studentGrade: "11th Grade",
    interest: "Merit Scholarships & College Planning",
    targetColleges: "USC, Vanderbilt, Duke, Michigan",
    message: "Our family is seeking expert guidance on balanced college list building and targeting high-yield merit scholarship opportunities.",
    status: "enrolled",
    createdAt: "2026-11-02T16:45:00Z",
    notes: "Enrolled in Comprehensive 2-Year Roadmap Package.",
  },
  {
    id: "lead-5",
    fullName: "David Goldstein",
    email: "d.goldstein@example.com",
    phone: "+1 (415) 555-0377",
    studentGrade: "9th Grade",
    interest: "College & University Planning",
    targetColleges: "Ivy League & Elite Universities",
    message: "Starting early to build good high school study habits and plan 4-year high school course rigor.",
    status: "new",
    createdAt: "2026-11-06T08:00:00Z",
  },
];

// Global in-memory cache across server requests in this process
interface GlobalAdminState {
  leads: ConsultationLead[];
  stories: SuccessStory[];
  blogs: BlogPost[];
  guides: ResourceGuide[];
  webinars: WebinarItem[];
  videos: VideoResource[];
  faqs: FAQCategoryItem[];
  settings: typeof SITE_CONFIG;
  hero: HeroConfig;
  announcements: Announcement[];
  tickerSpeed: number;
}

const globalState: GlobalAdminState = {
  leads: [...INITIAL_LEADS],
  stories: [...SUCCESS_STORIES],
  blogs: [...BLOG_POSTS],
  guides: [...RESOURCE_GUIDES],
  webinars: [...WEBINARS_LIST],
  videos: [...VIDEOS_LIST],
  faqs: [...FAQ_KNOWLEDGE_BASE],
  settings: { ...SITE_CONFIG },
  hero: { ...DEFAULT_HERO_CONFIG },
  announcements: [...DEFAULT_ANNOUNCEMENTS],
  tickerSpeed: 28,
};

// ==================== LEADS MANAGEMENT ====================
export async function getLeads(): Promise<ConsultationLead[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data as ConsultationLead[];
    }
  } catch {
    // Supabase table not created or offline; fallback to in-memory
  }
  return globalState.leads;
}

export async function addLead(lead: Omit<ConsultationLead, "id" | "createdAt">): Promise<ConsultationLead> {
  const newLead: ConsultationLead = {
    ...lead,
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  try {
    await supabaseAdmin.from("leads").insert([newLead]);
  } catch {
    // Ignore error and save to memory
  }

  globalState.leads.unshift(newLead);
  return newLead;
}

export async function updateLead(id: string, updates: Partial<ConsultationLead>): Promise<ConsultationLead | null> {
  try {
    await supabaseAdmin.from("leads").update(updates).eq("id", id);
  } catch {
    // Fallback to memory
  }

  const idx = globalState.leads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    globalState.leads[idx] = { ...globalState.leads[idx], ...updates };
    return globalState.leads[idx];
  }
  return null;
}

export async function deleteLead(id: string): Promise<boolean> {
  try {
    await supabaseAdmin.from("leads").delete().eq("id", id);
  } catch {
    // Fallback to memory
  }
  globalState.leads = globalState.leads.filter((l) => l.id !== id);
  return true;
}

// ==================== STORIES MANAGEMENT ====================
export async function getAdminStories(): Promise<SuccessStory[]> {
  try {
    const { data, error } = await supabaseAdmin.from("stories").select("*");
    if (!error && data && data.length > 0) {
      return data as SuccessStory[];
    }
  } catch {
    // Fallback to memory
  }
  return globalState.stories;
}

export async function saveStory(story: SuccessStory): Promise<SuccessStory> {
  try {
    await supabaseAdmin.from("stories").upsert([story]);
  } catch {
    // Fallback
  }

  const idx = globalState.stories.findIndex((s) => s.id === story.id);
  if (idx !== -1) {
    globalState.stories[idx] = story;
  } else {
    globalState.stories.unshift(story);
  }
  return story;
}

export async function deleteStory(id: string): Promise<boolean> {
  try {
    await supabaseAdmin.from("stories").delete().eq("id", id);
  } catch {
    // Fallback
  }
  globalState.stories = globalState.stories.filter((s) => s.id !== id);
  return true;
}

// ==================== BLOGS MANAGEMENT ====================
export async function getAdminBlogs(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseAdmin.from("blogs").select("*");
    if (!error && data && data.length > 0) {
      return data as BlogPost[];
    }
  } catch {
    // Fallback
  }
  return globalState.blogs;
}

export async function saveBlog(blog: BlogPost): Promise<BlogPost> {
  try {
    await supabaseAdmin.from("blogs").upsert([blog]);
  } catch {
    // Fallback
  }

  const idx = globalState.blogs.findIndex((b) => b.slug === blog.slug);
  if (idx !== -1) {
    globalState.blogs[idx] = blog;
  } else {
    globalState.blogs.unshift(blog);
  }
  return blog;
}

export async function deleteBlog(slug: string): Promise<boolean> {
  try {
    await supabaseAdmin.from("blogs").delete().eq("slug", slug);
  } catch {
    // Fallback
  }
  globalState.blogs = globalState.blogs.filter((b) => b.slug !== slug);
  return true;
}

// ==================== RESOURCES MANAGEMENT ====================
export async function getAdminResources() {
  return {
    guides: globalState.guides,
    webinars: globalState.webinars,
    videos: globalState.videos,
    faqs: globalState.faqs,
  };
}

export async function saveGuide(guide: typeof RESOURCE_GUIDES[number]) {
  const idx = globalState.guides.findIndex((g) => g.id === guide.id);
  if (idx !== -1) {
    globalState.guides[idx] = guide;
  } else {
    globalState.guides.unshift(guide);
  }
  return guide;
}

export async function deleteGuide(id: string) {
  globalState.guides = globalState.guides.filter((g) => g.id !== id);
  return true;
}

export async function saveWebinar(webinar: WebinarItem) {
  const idx = globalState.webinars.findIndex((w: WebinarItem) => w.id === webinar.id);
  if (idx !== -1) {
    globalState.webinars[idx] = webinar;
  } else {
    globalState.webinars.unshift(webinar);
  }
  return webinar;
}

export async function deleteWebinar(id: string) {
  globalState.webinars = globalState.webinars.filter((w: WebinarItem) => w.id !== id);
  return true;
}

export async function saveVideo(video: VideoResource) {
  const idx = globalState.videos.findIndex((v: VideoResource) => v.id === video.id);
  if (idx !== -1) {
    globalState.videos[idx] = video;
  } else {
    globalState.videos.unshift(video);
  }
  return video;
}

export async function deleteVideo(id: string) {
  globalState.videos = globalState.videos.filter((v: VideoResource) => v.id !== id);
  return true;
}

// ==================== SETTINGS ====================
export async function getSettings() {
  return globalState.settings;
}

export async function updateSettings(newSettings: Partial<typeof SITE_CONFIG>) {
  globalState.settings = { ...globalState.settings, ...newSettings };
  return globalState.settings;
}

// ==================== HERO SECTION CONFIG ====================
export async function getHeroConfig(): Promise<HeroConfig> {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("config")
      .eq("id", "hero_config")
      .single();

    if (!error && data?.config) {
      globalState.hero = { ...DEFAULT_HERO_CONFIG, ...data.config };
      return globalState.hero;
    }
  } catch {
    // Supabase offline or not yet seeded
  }

  return globalState.hero;
}

export async function saveHeroConfig(newConfig: Partial<HeroConfig>): Promise<HeroConfig> {
  globalState.hero = { ...globalState.hero, ...newConfig };

  try {
    await supabaseAdmin
      .from("site_settings")
      .upsert(
        {
          id: "hero_config",
          config: globalState.hero,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
  } catch (error) {
    console.warn("Notice: Saved Hero config to local cache, Supabase offline:", error);
  }

  return globalState.hero;
}

// ==================== ANNOUNCEMENTS MANAGEMENT ====================
function mapDbToAnnouncement(row: Record<string, any>): Announcement {
  return {
    id: String(row.id),
    title: row.title || "",
    message: row.message || "",
    badge: row.badge || undefined,
    linkText: row.link_text ?? row.linkText ?? undefined,
    linkUrl: row.link_url ?? row.linkUrl ?? undefined,
    type: row.type || "banner",
    isActive: row.is_active !== undefined ? Boolean(row.is_active) : row.isActive !== undefined ? Boolean(row.isActive) : true,
    priority: Number(row.priority ?? 1),
    startDate: row.start_date ?? row.startDate ?? undefined,
    endDate: row.end_date ?? row.endDate ?? undefined,
    createdAt: row.created_at ?? row.createdAt ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? row.updatedAt ?? new Date().toISOString(),
  };
}

function mapAnnouncementToDb(a: Announcement) {
  return {
    id: a.id,
    title: a.title,
    message: a.message,
    badge: a.badge || null,
    link_text: a.linkText || null,
    link_url: a.linkUrl || null,
    type: a.type || "banner",
    is_active: Boolean(a.isActive),
    priority: Number(a.priority || 1),
    start_date: a.startDate || null,
    end_date: a.endDate || null,
    updated_at: new Date().toISOString(),
  };
}

export async function getAnnouncements(): Promise<Announcement[]> {
  // 1. Try querying the dedicated 'announcements' SQL table in Supabase
  try {
    const { data, error } = await supabaseAdmin
      .from("announcements")
      .select("*")
      .order("priority", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped = data.map(mapDbToAnnouncement);
      globalState.announcements = mapped;
      return mapped;
    }
  } catch {
    // Table not created or network unavailable
  }

  // 2. Fallback to site_settings JSON store in Supabase
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("config")
      .eq("id", "announcements_config")
      .single();

    if (!error && data?.config) {
      if (Array.isArray(data.config) && data.config.length > 0) {
        globalState.announcements = data.config.map(mapDbToAnnouncement);
        return globalState.announcements;
      } else if (data.config.announcements && Array.isArray(data.config.announcements)) {
        globalState.announcements = data.config.announcements.map(mapDbToAnnouncement);
        if (data.config.tickerSpeed) {
          globalState.tickerSpeed = Number(data.config.tickerSpeed);
        }
        return globalState.announcements;
      }
    }
  } catch {
    // site_settings query failed
  }

  // 3. Fallback to memory
  return globalState.announcements;
}

export async function getTickerSpeed(): Promise<number> {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("config")
      .eq("id", "announcements_config")
      .single();

    if (!error && data?.config?.tickerSpeed) {
      globalState.tickerSpeed = Number(data.config.tickerSpeed);
    }
  } catch {
    // Fallback
  }
  return globalState.tickerSpeed;
}

export async function saveTickerSpeed(speed: number): Promise<number> {
  globalState.tickerSpeed = Math.max(10, Math.min(90, Number(speed) || 28));

  try {
    await supabaseAdmin
      .from("site_settings")
      .upsert(
        {
          id: "announcements_config",
          config: {
            announcements: globalState.announcements,
            tickerSpeed: globalState.tickerSpeed,
          },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
  } catch (error) {
    console.warn("Notice: Saved ticker speed to memory fallback:", error);
  }

  return globalState.tickerSpeed;
}

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const all = await getAnnouncements();
  const now = new Date();

  return all
    .filter((a) => {
      if (!a.isActive) return false;
      if (a.startDate && new Date(a.startDate) > now) return false;
      if (a.endDate && new Date(a.endDate) < now) return false;
      return true;
    })
    .sort((a, b) => b.priority - a.priority);
}

export async function saveAnnouncement(announcement: Announcement): Promise<Announcement> {
  const formatted: Announcement = {
    ...announcement,
    updatedAt: new Date().toISOString(),
  };

  const idx = globalState.announcements.findIndex((a) => a.id === formatted.id);
  if (idx !== -1) {
    globalState.announcements[idx] = formatted;
  } else {
    globalState.announcements.unshift(formatted);
  }

  // 1. Try saving to dedicated 'announcements' table
  try {
    await supabaseAdmin
      .from("announcements")
      .upsert(mapAnnouncementToDb(formatted), { onConflict: "id" });
  } catch (error) {
    console.warn("Notice: Saved announcement locally, Supabase table offline:", error);
  }

  // 2. Also back up to site_settings announcements_config
  try {
    await supabaseAdmin
      .from("site_settings")
      .upsert(
        {
          id: "announcements_config",
          config: {
            announcements: globalState.announcements,
            tickerSpeed: globalState.tickerSpeed,
          },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
  } catch {
    // Ignore backup failure
  }

  return formatted;
}

export async function updateAnnouncement(
  id: string,
  updates: Partial<Announcement>
): Promise<Announcement | null> {
  const existing = globalState.announcements.find((a) => a.id === id);
  if (!existing) return null;

  const updated: Announcement = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return saveAnnouncement(updated);
}

export async function toggleAnnouncementActive(id: string): Promise<Announcement | null> {
  const existing = globalState.announcements.find((a) => a.id === id);
  if (!existing) return null;

  return updateAnnouncement(id, { isActive: !existing.isActive });
}

export async function deleteAnnouncement(id: string): Promise<boolean> {
  globalState.announcements = globalState.announcements.filter((a) => a.id !== id);

  try {
    await supabaseAdmin.from("announcements").delete().eq("id", id);
  } catch {
    // Ignore SQL error
  }

  try {
    await supabaseAdmin.from("site_settings").upsert({
      id: "announcements_config",
      config: {
        announcements: globalState.announcements,
        tickerSpeed: globalState.tickerSpeed,
      },
      updated_at: new Date().toISOString(),
    });
  } catch {
    // Ignore backup failure
  }

  return true;
}



