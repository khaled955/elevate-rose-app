import React from "react";
import { getTranslations } from "next-intl/server";
import catchError from "@/lib/utils/catch-error";
import { fetchAllCategoriesService } from "@/app/[locale]/(main)/(public)/categories/_actions/fetch-all-categories.service";
import { Categories } from "@/lib/types/category";
import StatisticListCard, { ListCardItem } from "./statistic-list-card";

export default async function RightSideFirstRowAllCategories() {
  // Translations
  const t = await getTranslations();

  // Variables

  const [payload] = await catchError<APIResponse<Categories>>(() =>
    fetchAllCategoriesService({}),
  );

  // catch-error
  if (payload && "error" in payload) {
    throw new Error(
      payload.error || "Error During Fetch All Categories In Dashboard!",
    );
  }

  // Categoryies
  const categories = payload?.categories || [];
  // Adapter: Category[] -> ListCardItem[]
  const categoryItems: ListCardItem[] = categories.map((cat) => ({
    id: cat._id, // from DataBaseProbs
    title: cat.name,
    rightText: t("product-count", { count: cat.productsCount }),
  }));

  return (
    <div className="max-h-64 overflow-y-auto sm:max-h-72 lg:max-h-[320px]">
      <StatisticListCard items={categoryItems} rowClassName="border-b" />
    </div>
  );
}
