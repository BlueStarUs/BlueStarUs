import { ApiResponse, ContactFormData } from "@/types";

/**
 * Service to handle contact form submissions.
 * Simulated mock API with latency to model production behavior.
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ id: string }>> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Basic validation check
  if (!data.fullName || !data.email || !data.message) {
    return {
      success: false,
      message: "Please fill out all required fields.",
    };
  }

  // Simulated successful submission
  return {
    success: true,
    message: "Thank you! We'll get back to you soon.",
    data: {
      id: `lead_${Date.now()}`,
    },
  };
}

