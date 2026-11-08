import { NextRequest, NextResponse } from "next/server";
import { getAdminBlogs, saveBlog, deleteBlog } from "@/lib/admin-store";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const blogs = await getAdminBlogs();
    return NextResponse.json(
      { success: true, blogs },
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
    const blog = await req.json();
    if (!blog.slug || !blog.title) {
      return NextResponse.json(
        { success: false, message: "Missing slug or title" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    const saved = await saveBlog(blog);
    return NextResponse.json(
      { success: true, blog: saved },
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
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Missing blog slug" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    await deleteBlog(slug);
    return NextResponse.json(
      { success: true, message: "Blog deleted" },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
