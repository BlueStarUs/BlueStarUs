import { NextRequest, NextResponse } from "next/server";
import { getAdminStories, saveStory, deleteStory } from "@/lib/admin-store";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const stories = await getAdminStories();
    return NextResponse.json(
      { success: true, stories },
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
    const story = await req.json();
    if (!story.id || !story.name) {
      return NextResponse.json(
        { success: false, message: "Missing id or name" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    const saved = await saveStory(story);
    return NextResponse.json(
      { success: true, story: saved },
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
        { success: false, message: "Missing story id" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    await deleteStory(id);
    return NextResponse.json(
      { success: true, message: "Story deleted" },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
