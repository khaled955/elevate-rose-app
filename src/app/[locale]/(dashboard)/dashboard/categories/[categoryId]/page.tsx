"use client";
import { useCurrentCategory } from "@/app/[locale]/(main)/(public)/categories/_hooks/use-current-category";
import DashboardCategoryOccassionForm from "@/components/features/dashboard/dashboard-category-occassion-form";
import Spinner from "@/components/shared/spinner";
import { RouteProps } from "@/lib/types/common";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useUpdateCategory } from "./_hooks/use-update-category";
import { isInvalidIdError } from "@/lib/utils/is-invalid-id-error";

export default function UpdateCategoryPage({ params }: RouteProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const categoryId = params.categoryId;
  const isValidId = categoryId.trim().length > 0;
  // guard-invalid-id
  if (!isValidId) {
    notFound();
  }

  // Query
  const {
    data,
    isPending,
    isFetching,
    error: currentCategoryError,
  } = useCurrentCategory({
    categoryId,
    enabled: isValidId,
  });

  // Mutation
  const {
    onUpdateCategory,
    isPending: updateIsPending,
    error,
  } = useUpdateCategory(categoryId);

  // guard-invalid-id
  if (!isValidId || isInvalidIdError(currentCategoryError?.message)) {
    notFound();
  }

  return (
    <section>
      {isPending || isFetching ? (
        <Spinner />
      ) : (
        <>
          <header>
            <h1 className="text-zinc-800 dark:text-zinc-50 font-semibold capitalize flex items-center gap-1">
              {t("update-category-0")} <span>{data?.category.name}</span>
            </h1>
          </header>
          <footer className="bg-white dark:bg-gray-800 p-5 mt-4 rounded-lg">
            <DashboardCategoryOccassionForm
              mode="update"
              formType="category"
              submitText={t("update-category")}
              defaultName={data?.category.name}
              currentImageUrl={data?.category.image}
              isLoading={updateIsPending}
              serverError={error?.message}
              onSubmit={(formData, reset) =>
                onUpdateCategory(formData, { onSuccess: reset })
              }
            />
          </footer>
        </>
      )}
    </section>
  );
}
