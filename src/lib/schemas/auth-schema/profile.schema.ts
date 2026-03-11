import { z } from "zod";
import { useRegisterSchema } from "./register.schema";
export function useProfileSchema() {
  return useRegisterSchema().pick({
    email: true,
    firstName: true,
    lastName: true,
    gender: true,
    phone: true,
  });
}

export type ProfileFields = z.infer<ReturnType<typeof useProfileSchema>>;
