"use client";

import DashboardCategoryOccassionForm from "@/components/features/dashboard/dashboard-category-occassion-form";
import { useTranslations } from "next-intl";
import { useCreateOccassion } from "./_hooks/use-create-occassion";

export default function CreateOccassionPage() {
  // Translations
  const t = useTranslations();
  // Mutation
  const { error, isPending, onCreateOccassion } = useCreateOccassion();
  return (
    <section>
      <header>
        <h1 className="text-zinc-800 dark:text-zinc-50 font-semibold">
          {t("add-a-new-category-0")}
        </h1>
      </header>
      <footer className="bg-white dark:bg-gray-800 p-5 mt-4 rounded-lg">
        <DashboardCategoryOccassionForm
          formType="occassion"
          mode="create"
          isLoading={isPending}
          serverError={error?.message}
          submitText={t("add-new-occassion")}
          onSubmit={(formData, reset) =>
            onCreateOccassion(formData, { onSuccess: reset })
          }
        />
      </footer>
    </section>
  );
}
