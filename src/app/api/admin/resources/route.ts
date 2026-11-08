import { NextRequest, NextResponse } from "next/server";
import {
  getAdminResources,
  saveGuide,
  deleteGuide,
  saveWebinar,
  deleteWebinar,
  saveVideo,
  deleteVideo,
} from "@/lib/admin-store";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const resources = await getAdminResources();
    return NextResponse.json(
      { success: true, resources },
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
    const { type, data } = await req.json();

    if (type === "guide") {
      const saved = await saveGuide(data);
      return NextResponse.json(
        { success: true, item: saved },
        { headers: SECURITY_HEADERS }
      );
    }
    if (type === "webinar") {
      const saved = await saveWebinar(data);
      return NextResponse.json(
        { success: true, item: saved },
        { headers: SECURITY_HEADERS }
      );
    }
    if (type === "video") {
      const saved = await saveVideo(data);
      return NextResponse.json(
        { success: true, item: saved },
        { headers: SECURITY_HEADERS }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid resource type" },
      { status: 400, headers: SECURITY_HEADERS }
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
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json(
        { success: false, message: "Missing type or id parameter" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (type === "guide") await deleteGuide(id);
    if (type === "webinar") await deleteWebinar(id);
    if (type === "video") await deleteVideo(id);

    return NextResponse.json(
      { success: true, message: `Resource ${type} deleted` },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
