/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;
const MAX_SIZE = 5 * 1024 * 1024;

export function usePhotoSchema() {
  return z.object({
    photo: z
      .instanceof(File, { message: "Please choose a photo." })
      .refine((file) => ALLOWED_TYPES.includes(file.type as any), {
        message: "Only JPG, PNG, GIF, or WEBP allowed.",
      })
      .refine((file) => file.size <= MAX_SIZE, {
        message: "Max file size is 5MB.",
      }),
  });
}

export type PhotoFields = z.infer<ReturnType<typeof usePhotoSchema>>;
