import { useMutation } from "@tanstack/react-query";
import { SendOtpFields } from "@/lib/schemas/auth-schema/forget-password.schema";
import { verifyOtpAction } from "../_actions/verify-otp.action";

export function useVerifyOtp() {
  const {
    mutate: onSubmitOtp,
    isPending: optIsPending,
    error: otpError,
  } = useMutation({
    mutationFn: async (fields: SendOtpFields) => {
      const payload: APIResponse<null> = await verifyOtpAction(fields);

      //check if it's an error
      if ("error" in payload) {
        const errorMessage = payload.error || "Failed to fetch products";
        throw new Error(errorMessage);
      }

      return payload;
    },
  });

  return { onSubmitOtp,  optIsPending,  otpError };
}
