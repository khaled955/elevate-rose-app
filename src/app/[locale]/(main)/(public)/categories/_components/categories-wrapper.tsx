import catchError from "@/lib/utils/catch-error";
import { fetchAllCategoriesService } from "../_actions/fetch-all-categories.service";
import type { Categories } from "@/lib/types/category";
import CategoryCard from "./category-card";
import type { SearchParams } from "@/lib/types/common";
import AppPagination from "@/components/shared/app-pagination";
import { getLocale, getTranslations } from "next-intl/server";

type CategoriesWrapperProps = {
  searchParams: SearchParams;
};

export default async function CategoriesWrapper({
  searchParams,
}: CategoriesWrapperProps) {
  // Translations
  const t = await getTranslations();
  const locale = await getLocale();
  // Variables
  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? "1",
    limit: searchParams.limit ?? "8",
  };

  const [payload, error] = await catchError<
    APIResponse<PaginatedResponse<Categories>>
  >(() => fetchAllCategoriesService(nextParams));

  if (error) {
    return <p className="text-sm text-red-600 dark:text-red-400">{error}</p>;
  }

  // ✅ 2) guard payload
  if (!payload) return null;

  // ✅ 3) handle API error shape
  if ("error" in payload) {
    throw new Error(payload.error || "Error During Fetch Categories!");
  }

  // ✅ 4) extract categories
  const categories = payload.categories ?? [];

  if (categories.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {t('no-categories-found')}
      </p>
    );
  }

  return (
    <section className="space-y-4 my-6">
      <h1 className="text-2xl font-semibold capitalize text-zinc-800 dark:text-zinc-200 sm:text-3xl lg:text-4xl">
        {t('categories')}
      </h1>

      {/* categories-list */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => (
          <li key={cat._id}>
            <CategoryCard category={cat} />
          </li>
        ))}
      </ul>

      {/* pagination */}
      <AppPagination
        currentPage={payload.metadata.currentPage}
        locale={locale}
        pathname="categories"
        searchParams={searchParams}
        totalPages={payload.metadata.totalPages}
        show={payload.categories.length > 5}
      />
    </section>
  );
}
