import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";

const GHL_BASE = "https://backend.leadconnectorhq.com/forms/submit";
const LOCATION_ID = "3D7QNFhkh5INfr6IVK5T";

async function submitToGHL(
  formId: string,
  fields: Record<string, string>
): Promise<void> {
  const url = `${GHL_BASE}?formId=${formId}&locationId=${LOCATION_ID}`;

  const body = new URLSearchParams({
    ...fields,
    formId,
    locationId: LOCATION_ID,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `GoHighLevel submission failed (${res.status}): ${text}`,
    });
  }
}

export const formsRouter = router({
  /**
   * Lead Magnet — "Get The Bible's Big Picture Guide"
   * GHL form: 2wVYZEzXTdyyOcE3tbKY
   * Fields: first_name, email
   */
  submitLeadMagnet: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required").max(100),
        email: z.string().email("Please enter a valid email address"),
      })
    )
    .mutation(async ({ input }) => {
      await submitToGHL("2wVYZEzXTdyyOcE3tbKY", {
        first_name: input.firstName,
        email: input.email,
      });
      return { success: true };
    }),

  /**
   * Course Waitlist — "Join the Waitlist"
   * GHL form: 19O7CR7PL2dDK3k2bhNB
   * Fields: full_name, email
   */
  submitWaitlist: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required").max(100),
        email: z.string().email("Please enter a valid email address"),
      })
    )
    .mutation(async ({ input }) => {
      await submitToGHL("19O7CR7PL2dDK3k2bhNB", {
        full_name: input.fullName,
        email: input.email,
      });
      return { success: true };
    }),
});
