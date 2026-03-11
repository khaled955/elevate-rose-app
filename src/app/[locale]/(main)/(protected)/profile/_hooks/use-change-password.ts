import { useMutation } from "@tanstack/react-query";
import { ChangePasswordData } from "@/lib/schemas/auth-schema/change-password.schema";
import { changePasswordAction } from "../_actions/change-password.action";


export function useChangePassword() {
  // Hooks
  const {
    error,
    isPending,
    mutate: onChange,
  } = useMutation({
    mutationFn: async (formValues: ChangePasswordData) => {
      const payload = await changePasswordAction(formValues);

      return payload;
    },
  });

  return { error, isPending, onChange };
}
