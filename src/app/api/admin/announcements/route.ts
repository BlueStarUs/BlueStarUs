import { NextRequest, NextResponse } from "next/server";
import {
  getAnnouncements,
  saveAnnouncement,
  updateAnnouncement,
  toggleAnnouncementActive,
  deleteAnnouncement,
  getTickerSpeed,
  saveTickerSpeed,
} from "@/lib/admin-store";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";
import { Announcement } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const [announcements, tickerSpeed] = await Promise.all([
      getAnnouncements(),
      getTickerSpeed(),
    ]);
    const activeCount = announcements.filter((a) => a.isActive).length;

    return NextResponse.json(
      {
        success: true,
        announcements,
        tickerSpeed,
        stats: {
          total: announcements.length,
          active: activeCount,
          inactive: announcements.length - activeCount,
        },
      },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const body = await req.json();
    const announcementData = body.announcement || body;

    if (!announcementData.title) {
      return NextResponse.json(
        { success: false, message: "Announcement Title is required." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const id = announcementData.id || `announcement-${Date.now()}`;
    const announcement: Announcement = {
      id,
      title: announcementData.title.trim(),
      message: announcementData.message?.trim() || undefined,
      badge: announcementData.badge?.trim() || undefined,
      linkText: announcementData.linkText?.trim() || undefined,
      linkUrl: announcementData.linkUrl?.trim() || undefined,
      type: announcementData.type || "banner",
      isActive: announcementData.isActive !== undefined ? Boolean(announcementData.isActive) : true,
      priority: Number(announcementData.priority ?? 1),
      startDate: announcementData.startDate || undefined,
      endDate: announcementData.endDate || undefined,
      createdAt: announcementData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = await saveAnnouncement(announcement);

    return NextResponse.json(
      {
        success: true,
        message: "Announcement saved automatically to Supabase database",
        announcement: saved,
      },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const body = await req.json();
    const { id, action, updates, speed } = body;

    // Handle scroll speed setting update
    if (action === "set_speed" || speed !== undefined) {
      const newSpeed = await saveTickerSpeed(speed);
      return NextResponse.json(
        {
          success: true,
          message: `Ticker scroll speed updated to ${newSpeed} seconds`,
          tickerSpeed: newSpeed,
        },
        { headers: SECURITY_HEADERS }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Announcement ID is required" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (action === "toggle") {
      const toggled = await toggleAnnouncementActive(id);
      if (!toggled) {
        return NextResponse.json(
          { success: false, message: "Announcement not found" },
          { status: 404, headers: SECURITY_HEADERS }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: `Announcement ${toggled.isActive ? "activated" : "paused"} successfully`,
          announcement: toggled,
        },
        { headers: SECURITY_HEADERS }
      );
    }

    const updated = await updateAnnouncement(id, updates || {});
    return NextResponse.json(
      {
        success: true,
        message: "Announcement updated successfully",
        announcement: updated,
      },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Announcement ID is required" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    await deleteAnnouncement(id);

    return NextResponse.json(
      { success: true, message: "Announcement deleted successfully" },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

