"use client";
import { useSyncLocalWishlistToServer } from "@/hooks/shared/use-sync-local-whishlist-to-server";
import { useSyncGuestCartToServer } from "@/hooks/cart/use-sync-guest-cart-to-server";
import { LoginFields } from "@/lib/schemas/auth-schema/login.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

//Variables
const PATTERN_ERROR_END = `.{8,}$/`;

export function useLogin() {
  // Translations
  const t = useTranslations();

  // Hooks
  const { sendWhishlistProductsFromStorageToServer } =
    useSyncLocalWishlistToServer();

  const { sendCartItemsFromStorageToServer } = useSyncGuestCartToServer();

  // RHF
  const {
    mutate: onLogin,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (formValues: LoginFields) => {
      const payload = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        redirect: false,
      });

      if (!payload?.ok) throw new Error(payload?.error || "Login Failed");

      return payload;
    },
    onSuccess: () => {
      toast.success(t("successful-login"), {
        duration: 3000,
        onAutoClose: async () => {
          // ✅ transfer local wishlist to server
          await sendWhishlistProductsFromStorageToServer();

          // ✅ transfer guest cart to server
          await sendCartItemsFromStorageToServer();
          // Programmatic Navigation
          const callbackUrl =
            new URLSearchParams(location.search).get("callbackUrl") || "/";
          window.location.href = callbackUrl;
        },
      });
    },

    onError: (error) => {
      if (error.message.includes(PATTERN_ERROR_END)) {
        return (error.message = "Invalid Email Or Password");
      }
    },
  });

  return { onLogin, error, isPending };
}
