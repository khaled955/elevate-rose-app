"use client";
import { useQueryParams } from "@/hooks/shared/use-query-params";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
type FilterHeaderProps = {
  title: string;
  isDisabled: boolean;
  queryName: string;
};
export default function FilterHeader({
  title,
  isDisabled = true,
  // onDeleteQuery,
  queryName,
}: FilterHeaderProps) {
  // Translations
  const t = useTranslations();
  // Hooks
  const { removeQuery, removePriceQuery } = useQueryParams();

  // function
  function handleRemoveQuery() {
    // remove price query
    if (queryName === "price") {
      removePriceQuery();
      return;
    }
    // remove other query
    removeQuery(queryName);
  }

  return (
    <header className="flex justify-between items-center mb-3">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-50">
        {title}
      </h2>
      <button
        onClick={handleRemoveQuery}
        className={cn(
          !isDisabled ? "hidden" : "inline-flex",
          " items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-none p-0 gap gap-1 text-sm text-red-600 rtl:flex-row-reverse",
        )}
      >
        <X /> {t("reset")}
      </button>
    </header>
  );
}
