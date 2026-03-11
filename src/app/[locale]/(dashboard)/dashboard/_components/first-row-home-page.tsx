import React, { Suspense } from "react";
import RightSideFirstRowAllCategories from "./right-side-first-row-all-categories";
import LeftSideFirstRowAllStatistics from "./left-side-first-row-all-statistics";
import StatisticHeaderCard from "./statistic-header-card";
import StatisticListSkeleton from "./statistic-list-skeleton";
import { useTranslations } from "next-intl";

export default function FirstRowHomePage() {
  // Translations
  const t = useTranslations();
  return (
    <div className="first-row-parent flex flex-col gap-4 lg:flex-row">
      {/* left-side-first-row */}
      <LeftSideFirstRowAllStatistics />

      {/* right-side-all-categories */}
      <div className="all-categories w-full rounded-xl bg-white dark:bg-black p-4 sm:p-5 lg:w-1/2">
        {/* title */}
        <StatisticHeaderCard title={t("all-categories")} className="mb-2" />
        {/* categories-list */}
        <Suspense fallback={<StatisticListSkeleton rows={8} />}>
          <RightSideFirstRowAllCategories />
        </Suspense>
      </div>
    </div>
  );
}
