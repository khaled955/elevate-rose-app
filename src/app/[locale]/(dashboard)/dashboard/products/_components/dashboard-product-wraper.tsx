"use client";
import DashboardHeaderPage from "@/components/features/dashboard/dashboard-header-page";
import AppPagination from "@/components/shared/app-pagination";
import { SearchParams } from "@/lib/types/common";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import Spinner from "@/components/shared/spinner";
import { useSearchParams } from "next/navigation";
import DashboardSearchInput from "@/components/features/dashboard/dashboard-search-input";
import DashboardEmptyState from "../../../../../../components/features/dashboard/dashboard-empty-state";
import { DashboardTable } from "@/components/features/dashboard/dashboard-table";
import { useRouter } from "@/i18n/navigation";
import { useDeleteProduct } from "../_hooks/use-delete-product";
import { useState } from "react";
import DeleteAlert from "@/components/shared/alert-dialog";
import { useProducts } from "@/hooks/products/use-products";

export default function DashboardProductWraper() {
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
  const { data: payload, isLoading, isFetching } = useProducts(nextParams);
  // Mutations
  const { deleteProductIsPending, onDeleteProduct } = useDeleteProduct();
  // Variables
  const productList = payload?.products || [];
  const totalPages = payload?.metadata?.totalPages ?? 1;
  const isBusy = isLoading || isFetching;
  const showPagination = !isLoading && totalPages > 1 && productList.length > 0;

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
    onDeleteProduct(pendingRow.id, {
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
        btnText={t("add-new-product")}
        title={t("all-products")}
        path="products/create"
      />
      {/* Search */}
      <DashboardSearchInput
        queryKey="search"
        debounceMs={500}
        placeholder={t("search-product")}
      />
      {/* loading */}
      {isBusy && <Spinner />}
      {/* product-list-table */}
      {!isBusy && productList.length > 0 && (
        <DashboardTable
          rows={productList}
          columns={[
            {
              label: t("name"),
              render: (row) => (
                <span className="font-medium capitalize">{row.title}</span>
              ),
            },
            {
              label: t("price"),
              render: (row) => (
                <span className="font-medium capitalize">
                  {t("product-price-0", { price: row.price })}
                </span>
              ),
            },
            {
              label: t("stock"),
              render: (row) => {
                const count = row.quantity;
                const n = format.number(count, "number-base");
                return t("product-count-2", { count, n });
              },
            },

            {
              label: t("sales"),
              className: "hidden md:table-cell",
              render: (row) => {
                const count = row.sold ?? 0;
                const n = format.number(count, "number-base");
                return t("product-count-4", { count, n });
              },
            },
            {
              label: t("ratings-0"),
              className: "hidden md:table-cell",
              render: (row) => (
                <span className="font-medium capitalize">
                  {row.rateAvg}({row.rateCount})
                </span>
              ),
            },
          ]}
          onEdit={(row) => router.push(`/dashboard/products/${row._id}`)}
          onDelete={(row, onSettled) => {
            // store the row and onSettled — open alert
            setPendingRow({ id: row._id, onSettled });
            setAlertOpen(true);
          }}
        />
      )}
      {/* empty-products */}
      {!isBusy && !productList.length && (
        <DashboardEmptyState
          title={t("no-products-found-0")}
          description={t(
            "no-products-match-your-search-try-resetting-to-see-all",
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
          pathname="/dashboard/products"
          searchParams={searchQuery}
        />
      )}

      {/* delete-alert */}
      <DeleteAlert
        open={alertOpen}
        onOpenChange={handleAlertOpenChange}
        onConfirm={handleDeleteConfirm}
        locale={locale}
        title={t("are-your-sure-you-want-to-delete-this-product")}
        isLoading={deleteProductIsPending}
      />
    </section>
  );
}
