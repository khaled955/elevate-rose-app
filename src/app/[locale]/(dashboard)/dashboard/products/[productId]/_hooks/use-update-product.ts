import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateProductAction } from "../_actions/update-product.action";
import { UpdateProductFields } from "@/lib/schemas/dashboard-schema/product.schema";

export function useUpdateProduct(productId: string) {
  // Translations
  const t = useTranslations();

  // Hooks
  const queryClient = useQueryClient();

  const {
    mutate: onUpdateProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: UpdateProductFields) => {
      // Build FormData
      const formData = new FormData();

      if (data.title) formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.price) formData.append("price", data.price);
      if (data.quantity) formData.append("quantity", data.quantity);
      if (data.category) formData.append("category", data.category);
      if (data.occasion) formData.append("occasion", data.occasion);
      if (data.priceAfterDiscount)
        formData.append("priceAfterDiscount", data.priceAfterDiscount);

      // imgCover — only append if user selected a new File
      if (data.imgCover instanceof File) {
        formData.append("imgCover", data.imgCover);
      }

      // images — only append new File entries,
      if (data.images) {
        data.images.forEach((image) => {
          if (image instanceof File) formData.append("images", image);
        });
      }

      const payload = await updateProductAction({ productId, formData });

      // catch-error
      if ("error" in payload) {
        throw new Error(payload.error || "error during update product!");
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success(t("product-updated-successfully"));
      await queryClient.invalidateQueries({
        queryKey: ["product-details", productId],
      });
      await queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onUpdateProduct, isPending, error };
}