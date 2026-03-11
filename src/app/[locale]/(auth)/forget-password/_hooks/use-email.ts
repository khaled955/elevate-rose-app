import { useMutation } from "@tanstack/react-query";
import { LoginAndRegisterResponse } from "@/lib/types/auth";
import { EmailField } from "@/lib/schemas/auth-schema/forget-password.schema";
import { submitEmailAction } from "../_actions/submit-email.action";

export function useEmail() {
  const {
    mutate: onSubmitEmail,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (email: EmailField) => {
      const payload: APIResponse<LoginAndRegisterResponse> =
        await submitEmailAction(email);

      //check if it's an error
      if ("error" in payload || payload.message !== "success") {
        const errorMessage =
          payload.error || payload.message || "Failed to fetch products";
        throw new Error(errorMessage);
      }

      return payload;
    },
  });

  return { onSubmitEmail, isPending, error };
}
