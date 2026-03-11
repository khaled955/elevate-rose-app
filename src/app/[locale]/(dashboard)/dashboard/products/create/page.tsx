"use client";

import ProductForm from "../_components/product-form";
import { useTranslations } from "next-intl";
import { useCreateProduct } from "./_hooks/use-create-product";

export default function CreateProductPage() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { error, isPending, onCreateProduct } = useCreateProduct();

  return (
    <section>
      <header>
        <h1 className="text-zinc-800 dark:text-zinc-50 font-semibold">
          {t("add-new-product")}
        </h1>
      </header>
      <footer className="bg-white dark:bg-gray-800 p-5 mt-4 rounded-lg">
        <ProductForm
          onSubmit={(data, onSuccess) => onCreateProduct(data, { onSuccess })}
          isPending={isPending}
          error={error}
          submitLabel={t("add-product")}
        />
      </footer>
    </section>
  );
}
