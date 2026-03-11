import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { createProductAction } from "../_actions/create-product.action";
import { ProductFields } from "@/lib/schemas/dashboard-schema/product.schema";

export function useCreateProduct() {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const {
    mutate: onCreateProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: ProductFields) => {
      // Build FormData
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("category", data.category);
      formData.append("occasion", data.occasion);
      formData.append("imgCover", data.imgCover);

      // optional fields
      if (data.discount) formData.append("discount", data.discount);
      if (data.priceAfterDiscount)
        formData.append("priceAfterDiscount", data.priceAfterDiscount);

      // images — multiple files under the same key
      data.images.forEach((image) => formData.append("images", image));

      const payload = await createProductAction(formData);

      // catch-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during create product!");
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success(t("product-created-successfully"));
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { onCreateProduct, isPending, error };
}
