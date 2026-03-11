import { useTranslations } from "next-intl";
import LowStockProducts from "./low-stock-products";
import StatisticHeaderCard from "./statistic-header-card";
import { Suspense } from "react";
import StatisticListSkeleton from "./statistic-list-skeleton";

export default function LowStockProductsStatistics() {
  // Translations
  const t = useTranslations();
  return (
    <div className="low-stock-products col-span-12 lg:col-span-6">
      <section className="rounded-2xl border border-border bg-white shadow-sm dark:bg-zinc-950 p-3">
        {/* Header */}
        <StatisticHeaderCard title={t("low-stock-products")} className="mb-3" />

        <Suspense fallback={<StatisticListSkeleton rows={8} />}>
          <LowStockProducts />
        </Suspense>
      </section>
    </div>
  );
}
