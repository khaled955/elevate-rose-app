import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { updateProfilePhotoAction } from "../_actions/update-profile-photo.action";
import { fetchUserDataService } from "../_services/fetch-user-data.service";

const ERROR_MSG = "Error During Update Profile Photo";

export function useUpdateProfilePhoto() {
  // Hooks
  const { data: session, update } = useSession();

  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (file: File) => {
      const toastId = toast.loading("Uploading photo...");

      const formData = new FormData();
      formData.append("photo", file);

      const payload = await updateProfilePhotoAction(formData);

      toast.dismiss(toastId);

      if ("error" in payload) {
        throw new Error(payload?.error || ERROR_MSG);
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success("Photo updated successfully");

      //   Refech user data to get new photo and update session
      const newUserData = await fetchUserDataService();

      //   Update session with new photo and other user data
      await update({
        user: {
          ...(session?.user ?? {}),
          ...newUserData.user,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message || ERROR_MSG);
    },
  });

  return { mutate, isPending, error };
}
