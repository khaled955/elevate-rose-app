import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { updateProfileAction } from "../_actions/update-profile.action";
import { ProfileFields } from "@/lib/schemas/auth-schema/profile.schema";
import { useTranslations } from "next-intl";

// & ==> Variables
const ERROR_MSG = "Error During Update Profile From Server Action";

export function useUpdateProfile() {
  // Translations
  const t = useTranslations()
  // ^^==> States
  const { data: session, status, update } = useSession();

  //&&==> Variables
  const currentUser = session?.user;

  // TanStackQuery=>Mutation
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (formValues: ProfileFields) => {
      const toastId = toast.loading(t('updating-profile'));
      const payload = await updateProfileAction(formValues);
      toast.dismiss(toastId);
      if ("error" in payload) {
        throw new Error(payload.error || ERROR_MSG);
      }
      return payload;
    },
    onSuccess: async (data) => {
      // Guard-class
      if (!data) return;
      toast.success(t('profile-updated-successfully'));

      await update({
        user: {
          ...(currentUser ?? {}),
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          username: data.user.username,
          phone: data.user.phone,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message || ERROR_MSG);
    },
  });

  return { error, isPending, mutate, status, currentUser };
}
