"use client";

import { useState } from "react";
import type { Category } from "@/lib/types/category";

import { useCurrentCategory } from "../_hooks/use-current-category";
import { useCategoryProducts } from "../_hooks/use-category-products";
import CategoryCardUI from "./category-card-ui";
import CategoryDetailsDialog from "./category-details-dialog";
import CategoryProductsDialog from "./category-products-dialog";

type CategoryCardProps = {
  category: Category;
  className?: string;
};

export default function CategoryCard({
  category,
  className,
}: CategoryCardProps) {
  // State
  const [openDetails, setOpenDetails] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  // Variables
  const { _id } = category;

  // Queries (category details only)
  const {
    data: payload,
    isError,
    isPending,
    refetch,
  } = useCurrentCategory({
    categoryId: _id,
    enabled: openDetails,
  });

  const {
    isProductsError,
    isProductsPending,
    productsError,
    productsPayload,
    refetchProducts,
  } = useCategoryProducts({
    categoryId: _id,
    enabled: openProducts,
    query: {
      page: 1,
      limit: 12,
    },
  });

  return (
    <>
      <CategoryCardUI
        category={category}
        className={className}
        onOpenDetails={() => setOpenDetails(true)}
        onOpenProducts={() => setOpenProducts(true)}
      />

      <CategoryDetailsDialog
        open={openDetails}
        onOpenChange={setOpenDetails}
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
        category={payload?.category ?? null}
      />

      <CategoryProductsDialog
        open={openProducts}
        onOpenChange={setOpenProducts}
        isPending={isProductsPending}
        isError={isProductsError}
        errorMessage={productsError?.message}
        onRetry={refetchProducts}
        products={productsPayload?.products ?? []}
      />
    </>
  );
}
