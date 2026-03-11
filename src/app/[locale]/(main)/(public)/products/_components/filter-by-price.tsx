"use client";
import { Label } from "@/components/ui/label";
import FilterHeader from "./filter-header";
import { Input } from "@/components/ui/input";
import { useQueryParams } from "@/hooks/shared/use-query-params";
import { useTranslations } from "next-intl";

export default function FilterByPrice() {
  // Translations
  const t = useTranslations();
  // Hooks
  const { hasQueryValue, toggleQuery } = useQueryParams();

  return (
    <section className="my-5 border-t border-b border-zinc-100 dark:border-zinc-700 py-4">
      <FilterHeader
        title={t("price")}
        queryName="price"
        isDisabled={hasQueryValue("price[gte]") || hasQueryValue("price[lte]")}
      />
      {/* inputs */}
      <div className="filter-inputs flex gap-2 items-center">
        {/* greater than input */}
        <div className="from">
          <Label htmlFor="from">{t("from")}</Label>
          <Input
            onChange={(e) => toggleQuery("price[gte]", e.target.value)}
            id="from"
            type="number"
            placeholder="0"
          />
        </div>
        {/* less than input */}
        <div className="to">
          <Label htmlFor="to">{t("to")}</Label>
          <Input
            onChange={(e) => toggleQuery("price[lte]", e.target.value)}
            id="to"
            type="number"
            placeholder="0000"
          />
        </div>
      </div>
    </section>
  );
}
