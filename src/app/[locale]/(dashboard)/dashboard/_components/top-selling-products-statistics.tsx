import TopSellingProducts from "./top-selling-products";
import StatisticHeaderCard from "./statistic-header-card";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import StatisticListSkeleton from "./statistic-list-skeleton";

export default function TopSellingProductsStatistics() {
  // Translations
  const t = useTranslations();
  // Variables

  return (
    <div className="top-selling col-span-12 lg:col-span-6">
      <section className="rounded-2xl border border-border bg-white shadow-sm dark:bg-zinc-950 p-3">
        {/* Header */}
        <StatisticHeaderCard
          title={t("top-selling-products")}
          className="mb-3"
        />
        <Suspense fallback={<StatisticListSkeleton rows={8} />}>
          <TopSellingProducts />
        </Suspense>
      </section>
    </div>
  );
}
