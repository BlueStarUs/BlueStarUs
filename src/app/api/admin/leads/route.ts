import { NextRequest, NextResponse } from "next/server";
import { getLeads, addLead, updateLead, deleteLead } from "@/lib/admin-store";
import { requireAdminAuth, SECURITY_HEADERS } from "@/lib/admin-auth";

// GET all leads (Requires Admin Session)
export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const leads = await getLeads();
    return NextResponse.json(
      { success: true, leads },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

// POST new lead (Publicly accessible for contact form submissions)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic payload validation
    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { success: false, message: "Full name and email are required." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const newLead = await addLead(body);
    return NextResponse.json(
      { success: true, lead: newLead },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

// PATCH update lead (Requires Admin Session)
export async function PATCH(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) {
    return auth.errorResponse as unknown as NextResponse;
  }

  try {
    const { id, ...updates } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing lead id" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    const updated = await updateLead(id, updates);
    return NextResponse.json(
      { success: true, lead: updated },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

// DELETE lead (Requires Admin Session)
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
        { success: false, message: "Missing lead id" },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }
    await deleteLead(id);
    return NextResponse.json(
      { success: true, message: "Lead deleted" },
      { headers: SECURITY_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
