"use client";
import DashboardCategoryOccassionForm from "@/components/features/dashboard/dashboard-category-occassion-form";
import Spinner from "@/components/shared/spinner";
import { RouteProps } from "@/lib/types/common";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useUpdateOccassion } from "./_hooks/use-update-occassion";
import { useCurrentOccassion } from "./_hooks/use-current-occassion";
import { isInvalidIdError } from "@/lib/utils/is-invalid-id-error";

export default function UpdateOccassionPage({ params }: RouteProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const occassionId = params.occassionId;
  const isValidId = occassionId.trim().length > 0;
  // guard-invalid-id
  if (!isValidId) {
    notFound();
  }

  // Query
  const {
    data,
    isPending,
    isFetching,
    error: currentOccassionError,
  } = useCurrentOccassion({
    occassionId,
    enabled: isValidId,
  });

  // Mutation
  const { onUpdateOccassion, isPending: updateIsPending } =
    useUpdateOccassion(occassionId);

  // guard-invalid-id
  if (!isValidId || isInvalidIdError(currentOccassionError?.message)) {
    notFound();
  }
  return (
    <section>
      {isPending || isFetching ? (
        <Spinner />
      ) : (
        <>
          <header>
            <h1 className="text-zinc-800 dark:text-zinc-50 font-semibold capitalize">
              {t("update-occassion-0")}
              {data?.occasion.name}
            </h1>
          </header>
          <footer className="bg-white dark:bg-gray-800 p-5 mt-4 rounded-lg">
            <DashboardCategoryOccassionForm
              mode="update"
              formType="occassion"
              submitText={t("update-occassion")}
              defaultName={data?.occasion.name}
              currentImageUrl={data?.occasion.image}
              isLoading={updateIsPending}
              serverError={currentOccassionError?.message}
              onSubmit={(formData, reset) =>
                onUpdateOccassion(formData, { onSuccess: reset })
              }
            />
          </footer>
        </>
      )}
    </section>
  );
}
