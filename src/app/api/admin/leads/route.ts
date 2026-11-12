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

    const fullName = (body.fullName || body.name || "").trim();
    const email = (body.email || "").trim();

    // Basic payload validation
    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, message: "Full name and email are required." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const leadPayload = {
      fullName,
      email,
      phone: body.phone || "",
      interest: body.interest || body.serviceInterest || "General Inquiry",
      studentGrade: body.studentGrade || body.grade || "",
      targetColleges: body.targetColleges || "",
      message: body.message || "",
      status: body.status || "new",
      notes: body.notes || "",
    };

    const newLead = await addLead(leadPayload);

    // HubSpot CRM Integration Forwarding (Official Blue Stars Portal 20571161)
    const portalId = process.env.HUBSPOT_PORTAL_ID || "20571161";
    // Choose appropriate form GUID based on payload source / interest
    const interestStr = (leadPayload.interest || "").toLowerCase();
    const sourceStr = (body.source || "").toLowerCase();
    const formGuid =
      body.formGuid ||
      (interestStr.includes("newsletter") || sourceStr.includes("newsletter")
        ? "20578b68-3cb4-47fa-be3e-037888cf7ddf"
        : interestStr.includes("workbook") || sourceStr.includes("workbook")
        ? "557872d0-5bf5-45db-96d7-b07c4cc96c50"
        : process.env.HUBSPOT_FORM_GUID || "557872d0-5bf5-45db-96d7-b07c4cc96c50");

    if (portalId && formGuid) {
      try {
        await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: fullName },
              { objectTypeId: "0-1", name: "email", value: email },
              { objectTypeId: "0-1", name: "phone", value: body.phone || "" },
              { objectTypeId: "0-1", name: "message", value: body.message || leadPayload.interest },
            ],
            context: {
              pageUri: req.headers.get("referer") || "https://bluestars.us",
              pageName: "Blue Stars Admissions Website Lead Form",
            },
          }),
        });
      } catch (hubspotErr) {
        console.warn("HubSpot submission forwarding error:", hubspotErr);
      }
    }

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
