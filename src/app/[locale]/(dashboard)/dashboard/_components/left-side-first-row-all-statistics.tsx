import { useTranslations } from "next-intl";
import StatsCard from "./statistic-card";
import {
  CircleDollarSign,
  ClipboardList,
  Package,
  ReceiptText,
} from "lucide-react";

export default function LeftSideFirstRowAllStatistics() {
  // Translations
  const t = useTranslations();

  // display static data  because backend not work for admine role for this statistic data
  return (
    <div className="left-side-statistics w-full rounded-xl bg-white dark:bg-black p-4 sm:p-5 lg:w-1/2">
      {/* First-row-statistic-cards  */}
      <section className="mb-3 flex flex-col gap-3 sm:flex-row">
        {/* products */}
        <StatsCard
          className="w-full sm:flex-1"
          bgColor="bg-maroon-50 dark:bg-zinc-800"
          valueColor="text-maroon-600"
          value={t("count-number-number-base", { count: 1364 })}
          title={t("total-products")}
          icon={<Package className="text-maroon-600" size={35} />}
        />

        {/* orders */}
        <StatsCard
          className="w-full sm:flex-1"
          bgColor="bg-maroon-50 dark:bg-zinc-800"
          valueColor="text-blue-600"
          value={t("count-number-number-base", { count: 8236 })}
          title={t("total-orders")}
          icon={<ReceiptText className="text-blue-600" size={35} />}
        />
      </section>

      {/* Second-row-statistic-cards */}
      <section className="flex flex-col gap-3 sm:flex-row">
        {/* categories */}
        <StatsCard
          className="w-full sm:flex-1"
          bgColor="bg-maroon-50 dark:bg-zinc-800"
          valueColor="text-blue-600"
          value={t("count-number-number-base", { count: 23 })}
          title={t("total-categories")}
          icon={<ClipboardList className="text-blue-600" size={35} />}
        />
        {/* revenue */}
        <StatsCard
          className="w-full sm:flex-1"
          bgColor="bg-maroon-50 dark:bg-zinc-800"
          valueColor="text-emerald-600"
          value={t("count-number-number-base", { count: 6453280 })}
          title={t("total-revenue")}
          icon={<CircleDollarSign className="text-emerald-600" size={35} />}
        />
      </section>
    </div>
  );
}
