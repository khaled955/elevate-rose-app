"use client";
import { RatingGroup } from "@/components/ui/rating-group";
import FilterHeader from "./filter-header";
import { useQueryParams } from "@/hooks/shared/use-query-params";
import { useTranslations } from "next-intl";

export default function FilterByRate() {

  // Translation
  const t = useTranslations()
  // Hooks
  const { hasQueryValue} = useQueryParams();

  return (
    <section>
      <FilterHeader
        queryName="rateAvg"
        isDisabled={hasQueryValue("rateAvg")}
        title={t('rating')}
      />
      <RatingGroup
       
      />
    </section>
  );
}
