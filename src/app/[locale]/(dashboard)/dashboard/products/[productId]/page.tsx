"use client";

import Spinner from "@/components/shared/spinner";
import { RouteProps } from "@/lib/types/common";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useCurrentProduct } from "./_hooks/use-current-product";
import { useUpdateProduct } from "./_hooks/use-update-product";
import { useCategories } from "../../categories/_hooks/use-categories";
import ProductForm from "../_components/product-form";
import { isInvalidIdError } from "@/lib/utils/is-invalid-id-error";

export default function UpdateProductPage({ params }: RouteProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const productId = params.productId;
  const isValidId = productId.trim().length > 0;

  // Queries
  const {
    data,
    isPending,
    isFetching,
    error: currentProductError,
  } = useCurrentProduct({
    productId,
    enabled: isValidId,
  });
  // guard-invalid-id
  if (!isValidId || isInvalidIdError(currentProductError?.message)) {
    notFound();
  }

  const { isLoading: categoriesLoading } = useCategories({});

  // Mutation
  const {
    onUpdateProduct,
    isPending: updateIsPending,
    error,
  } = useUpdateProduct(productId);

  // Variables
  const product = data?.product;
  const isBusy = isPending || isFetching || categoriesLoading;

  return (
    <section>
      {isBusy ? (
        <Spinner />
      ) : (
        <>
          <header>
            <h1 className="text-zinc-800 dark:text-zinc-50 font-semibold capitalize">
              {t("update-product")} {product?.title}
            </h1>
          </header>
          <footer className="bg-white dark:bg-gray-800 p-5 mt-4 rounded-lg">
            {product && (
              <ProductForm
                mode="update"
                onSubmit={(data, onSuccess) =>
                  onUpdateProduct(data, { onSuccess })
                }
                isPending={updateIsPending}
                error={error}
                submitLabel={t("update-product-0")}
                initialValues={{
                  title: product.title ?? "",
                  description: product.description ?? "",
                  price: String(product.price ?? ""),
                  quantity: String(product.quantity ?? ""),
                  category: product.category ?? "",
                  imgCover: product.imgCover ?? "",
                  images: product.images ?? [],
                }}
              />
            )}
          </footer>
        </>
      )}
    </section>
  );
}
