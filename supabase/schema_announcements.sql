-- ==============================================================================
-- Blue Stars Admissions Consulting - Announcements & Top Banner Schema
-- ==============================================================================
-- Run this SQL in your Supabase SQL Editor to enable persistent announcements.
-- ==============================================================================

-- 1. Create the announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  badge TEXT,
  link_text TEXT,
  link_url TEXT,
  type TEXT DEFAULT 'banner' CHECK (type IN ('banner', 'alert', 'webinar', 'urgent', 'success')),
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 1,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for fast querying by status and priority
CREATE INDEX IF NOT EXISTS idx_announcements_is_active ON public.announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON public.announcements(priority DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON public.announcements(created_at DESC);

-- 3. Enable Row-Level Security (RLS)
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Allow anyone (anonymous and authenticated) to view active announcements
DROP POLICY IF EXISTS "Public can view active announcements" ON public.announcements;
CREATE POLICY "Public can view active announcements"
  ON public.announcements
  FOR SELECT
  USING (is_active = true);

-- Allow service_role (Admin API) full access to insert, update, delete
DROP POLICY IF EXISTS "Service role has full access to announcements" ON public.announcements;
CREATE POLICY "Service role has full access to announcements"
  ON public.announcements
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Seed Initial Default Announcements
INSERT INTO public.announcements (
  id,
  title,
  message,
  badge,
  link_text,
  link_url,
  type,
  is_active,
  priority,
  created_at,
  updated_at
)
VALUES
  (
    'announcement-cohort-2026',
    'Class of 2026 & 2027 Admissions Cohort',
    'Now accepting high school students for comprehensive 1-on-1 college admissions mentoring. Limited advisory spots available.',
    'LIMITED SPOTS',
    'Schedule Free 30-Min Consultation',
    '/contact',
    'banner',
    true,
    10,
    NOW(),
    NOW()
  ),
  (
    'announcement-live-webinar',
    'Live Admissions Masterclass',
    'How to Build an Authentic Extracurricular Profile Spike That Stanford & Ivies Can''t Ignore — with Dr. Amy Morgenstern.',
    'FREE WEBINAR',
    'Reserve Free Seat',
    '/resources/webinars',
    'webinar',
    true,
    8,
    NOW(),
    NOW()
  ),
  (
    'announcement-early-outcomes',
    '98% Top-3 College Acceptance Rate',
    'Explore our newly published student success case studies and accepted essays for Stanford, WashU, RISD & UC Berkeley.',
    'NEW RESULTS',
    'Explore Student Stories',
    '/stories',
    'success',
    true,
    6,
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  message = EXCLUDED.message,
  badge = EXCLUDED.badge,
  link_text = EXCLUDED.link_text,
  link_url = EXCLUDED.link_url,
  type = EXCLUDED.type,
  priority = EXCLUDED.priority,
  updated_at = NOW();

