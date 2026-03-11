"use client";

import DashboardCategoryOccassionForm from "@/components/features/dashboard/dashboard-category-occassion-form";
import { useCreateCategory } from "./_hooks/use-create-category";
import { useTranslations } from "next-intl";

export default function CreateCategoryPage() {
  // Translations
  const t = useTranslations()
  // Mutation
  const { error, isPending, onCreateCategory } = useCreateCategory();
  return (
    <section>
      <header>
        <h1 className="text-zinc-800 dark:text-zinc-50 font-semibold">
          {t('add-a-new-category-1')}
        </h1>
      </header>
      <footer className="bg-white dark:bg-gray-800 p-5 mt-4 rounded-lg">
        <DashboardCategoryOccassionForm
          formType="category"
          mode="create"
          isLoading={isPending}
          serverError={error?.message}
          submitText={t("add-a-new-category-1")}
          onSubmit={(formData, reset) =>
            onCreateCategory(formData, { onSuccess: reset })
          }
        />
      </footer>
    </section>
  );
}
