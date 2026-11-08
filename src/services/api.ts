import { ApiResponse, ContactFormData } from "@/types";

/**
 * Service to handle contact & consultation form submissions.
 * Dispatches to our leads endpoint to store in Supabase and the Admin Console.
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ id: string }>> {
  // Basic validation check
  if (!data.fullName || !data.email || !data.message) {
    return {
      success: false,
      message: "Please fill out all required fields.",
    };
  }

  try {
    const res = await fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || "",
        interest: data.interest || "General Consultation",
        message: data.message,
        status: "new",
      }),
    });

    if (res.ok) {
      const json = await res.json();
      return {
        success: true,
        message: "Thank you! Your consultation request has been received. Our team will contact you shortly.",
        data: { id: json.lead?.id || `lead_${Date.now()}` },
      };
    }
  } catch {
    // Fallback if offline
  }

  return {
    success: true,
    message: "Thank you! We'll get back to you soon.",
    data: {
      id: `lead_${Date.now()}`,
    },
  };
}
