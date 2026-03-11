import { useMutation } from "@tanstack/react-query";
import { deleteProfileAction } from "../_actions/delete-profile.action";

export function useDeleteProfile() {
  // Hooks
  const {
    error: deleteError,
    isPending: deleteIsPending,
    mutate: onDelete,
  } = useMutation({
    mutationFn: async () => {
      const payload = await deleteProfileAction();
      //  Catch-error
      if ("error" in payload) {
        throw new Error(
          payload.error || "Error During Delete Profile From Server Action",
        );
      }

      return payload;
    },
  });

  return { deleteError, deleteIsPending, onDelete };
}
