"use client";
import DashboardHeaderPage from "@/components/features/dashboard/dashboard-header-page";
import AppPagination from "@/components/shared/app-pagination";
import { SearchParams } from "@/lib/types/common";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useOccassions } from "../_hooks/use-occassions";
import Spinner from "@/components/shared/spinner";
import { useSearchParams } from "next/navigation";
import DashboardSearchInput from "@/components/features/dashboard/dashboard-search-input";
import DashboardEmptyState from "../../../../../../components/features/dashboard/dashboard-empty-state";
import { DashboardTable } from "@/components/features/dashboard/dashboard-table";
import { useRouter } from "@/i18n/navigation";
import { useDeleteOccassion } from "../_hooks/use-delete-occassion";
import { useState } from "react";
import DeleteAlert from "@/components/shared/alert-dialog";

export default function DashboardOccassionWraper() {
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
  const { data: payload, isLoading, isFetching } = useOccassions(nextParams);
  // Mutations
  const { onDeleteOccassion, deleteOccassionIsPending } = useDeleteOccassion();

  // Variables
  const occassionsList = payload?.occasions || [];
  const totalPages = payload?.metadata?.totalPages ?? 1;
  const isBusy = isLoading || isFetching;
  const showPagination =
    !isLoading && totalPages > 1 && occassionsList.length > 0;

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
    onDeleteOccassion(pendingRow.id, {
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
        btnText={t("add-a-occassion")}
        title={t("all-occassions")}
        path="occassions/create"
      />
      {/* Search */}
      <DashboardSearchInput debounceMs={500} queryKey="search" placeholder={t('occassion-search')} />
      {/* loading */}
      {isBusy && <Spinner />}
      {/* occassions-list-table */}
      {!isBusy && occassionsList.length > 0 && (
        <DashboardTable
        
          rows={occassionsList}
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
          onEdit={(row) => router.push(`/dashboard/occassions/${row._id}`)}
          onDelete={(row, onSettled) => {
            // store the row and onSettled — open alert
            setPendingRow({ id: row._id, onSettled });
            setAlertOpen(true);
          }}
        />
      )}
      {/* empty-occassions */}
      {!isBusy && !occassionsList.length && (
        <DashboardEmptyState
          title={t("no-occassions-found")}
          description={t(
            "no-occassions-match-your-search-try-resetting-to-see-all",
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
          pathname="/dashboard/occassions"
          searchParams={searchQuery}
        />
      )}

      {/* delete-alert */}
      <DeleteAlert
        open={alertOpen}
        onOpenChange={handleAlertOpenChange}
        onConfirm={handleDeleteConfirm}
        locale={locale}
        title={t("are-you-sure-you-want-to-delete-this-occassion")}
        isLoading={deleteOccassionIsPending}
      />
    </section>
  );
}
