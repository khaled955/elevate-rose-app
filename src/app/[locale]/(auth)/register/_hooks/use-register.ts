import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";
import { RegisterFields } from "@/lib/schemas/auth-schema/register.schema";
import { LoginAndRegisterResponse } from "@/lib/types/auth";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function useRegister() {
  const router = useRouter();
  const locale = useLocale();

  const {
    mutate: onRegister,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (registerValues: RegisterFields) => {
      const payload: APIResponse<LoginAndRegisterResponse> =
        await registerAction(registerValues);

      //check if it's an error
      if ("error" in payload || payload.message !== "success") {
        const errorMessage =
          payload.error || payload.message || "Failed to fetch products";
        throw new Error(errorMessage);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success("Your Account Created Successfully", {
        duration: 1500,
        onAutoClose: () => {
          router.push("/login", { locale });
        },
      });
    },
  });

  return { onRegister, isPending, error };
}
