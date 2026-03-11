"use client";
import DashboardHeaderPage from "@/components/features/dashboard/dashboard-header-page";
import AppPagination from "@/components/shared/app-pagination";
import { SearchParams } from "@/lib/types/common";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useCategories } from "../_hooks/use-categories";
import Spinner from "@/components/shared/spinner";
import { useSearchParams } from "next/navigation";
import DashboardSearchInput from "@/components/features/dashboard/dashboard-search-input";
import DashboardEmptyState from "../../../../../../components/features/dashboard/dashboard-empty-state";
import { DashboardTable } from "@/components/features/dashboard/dashboard-table";
import { useRouter } from "@/i18n/navigation";
import { useDeleteCategory } from "../_hooks/use-delete-category";
import { useState } from "react";
import DeleteAlert from "@/components/shared/alert-dialog";

export default function DashboardCategoryWraper() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();

  // Navigations
  const router = useRouter();

  // States
  const [alertOpen, setAlertOpen] = useState(false);
  const [pendingRow, setPendingRow] = useState<{
    id: string;
    onSettled: () => void;
  } | null>(null);

  // Variables
  const rawParams = useSearchParams();
  const searchQuery = Object.fromEntries(rawParams.entries());
  const currentPage = Number(searchQuery["page"] ?? "1");
  const nextParams: SearchParams = {
    ...searchQuery,
    page: String(currentPage),
    limit: searchQuery["limit"] ?? "6",
  };

  // Queries
  const { data: payload, isLoading, isFetching } = useCategories(nextParams);
  // Mutations
  const { onDeleteCategory, deleteCategoryIsPending } = useDeleteCategory();

  // Variables
  const categoriesList = payload?.categories || [];
  const totalPages = payload?.metadata?.totalPages ?? 1;
  const isBusy = isLoading || isFetching;
  const showPagination =
    !isLoading && totalPages > 1 && categoriesList.length > 0;

  // functions
  function handleAlertOpenChange(open: boolean) {
    // when alert closes without confirming — clear the spinner in the table row
    if (!open && pendingRow) {
      pendingRow.onSettled();
      setPendingRow(null);
    }
    setAlertOpen(open);
  }

  function handleDeleteConfirm() {
    if (!pendingRow) return;
    onDeleteCategory(pendingRow.id, {
      onSettled: () => {
        pendingRow.onSettled();
        setAlertOpen(false);
        setPendingRow(null);
      },
    });
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-md p-3 space-y-4">
      {/* header */}
      <DashboardHeaderPage
        btnText={t("add-a-new-category")}
        title={t("all-categories")}
        path="categories/create"
      />
      {/* Search */}
      <DashboardSearchInput debounceMs={500} placeholder={t('category-search')} queryKey="search"/>
      {/* loading */}
      {isBusy && <Spinner />}
      {/* categories-list-table */}
      {!isBusy && categoriesList.length > 0 && (
        <DashboardTable
          rows={categoriesList}
          columns={[
            {
              label: t("name"),
              render: (row) => (
                <span className="font-medium capitalize">{row.name}</span>
              ),
            },
            {
              label: t("products"),
              render: (row) => {
                const count = row.productsCount;
                const n = format.number(count, "number-base");
                return t("product-count-1", { count, n });
              },
            },
          ]}
          onEdit={(row) => router.push(`/dashboard/categories/${row._id}`)}
          onDelete={(row, onSettled) => {
            // store the row and onSettled — open alert
            setPendingRow({ id: row._id, onSettled });
            setAlertOpen(true);
          }}
        />
      )}
      {/* empty-category */}
      {!isBusy && !categoriesList.length && (
        <DashboardEmptyState
          title={t("no-categories-found")}
          description={t(
            "no-categories-match-your-search-try-resetting-to-see-all",
          )}
          showReset
        />
      )}
      {/* pagination */}
      {showPagination && (
        <AppPagination
          currentPage={currentPage}
          locale={locale}
          totalPages={totalPages}
          show={showPagination}
          pathname="/dashboard/categories"
          searchParams={searchQuery}
        />
      )}

      {/* delete-alert */}
      <DeleteAlert
        open={alertOpen}
        onOpenChange={handleAlertOpenChange}
        onConfirm={handleDeleteConfirm}
        locale={locale}
        title={t("are-you-sure-you-want-to-delete-this-category")}
        isLoading={deleteCategoryIsPending}
      />
    </section>
  );
}
