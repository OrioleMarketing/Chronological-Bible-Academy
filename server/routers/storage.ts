import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { adminProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";
import {
  createUpload,
  getUploadsByUser,
  getUploadById,
  deleteUpload,
} from "../db";

export const storageRouter = router({
  /**
   * Upload a file. Expects a base64-encoded data URI from the client.
   * Returns the saved upload record.
   */
  upload: adminProcedure
    .input(
      z.object({
        fileName: z.string().min(1).max(255),
        mimeType: z.string().min(1).max(128),
        size: z.number().int().positive(),
        dataBase64: z.string().min(1), // base64 string (no data URI prefix)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { fileName, mimeType, size, dataBase64 } = input;

      // 20 MB limit
      if (size > 20 * 1024 * 1024) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File exceeds the 20 MB size limit.",
        });
      }

      const ext = fileName.split(".").pop() ?? "bin";
      const fileKey = `uploads/${ctx.user.id}/${nanoid(12)}.${ext}`;

      const buffer = Buffer.from(dataBase64, "base64");
      const { url } = await storagePut(fileKey, buffer, mimeType);

      await createUpload({
        userId: ctx.user.id,
        fileName,
        fileKey,
        url,
        mimeType,
        size,
      });

      return { fileName, fileKey, url, mimeType, size };
    }),

  /**
   * List all files uploaded by the current user.
   */
  list: adminProcedure.query(async ({ ctx }) => {
    return getUploadsByUser(ctx.user.id);
  }),

  /**
   * Delete a file owned by the current user.
   */
  delete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const record = await getUploadById(input.id);
      if (!record) {
        throw new TRPCError({ code: "NOT_FOUND", message: "File not found." });
      }
      if (record.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not own this file.",
        });
      }
      await deleteUpload(input.id);
      return { success: true };
    }),
});
