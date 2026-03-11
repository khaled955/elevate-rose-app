"use client";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/shared/use-query-params";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ResetAllQueryiesButton() {
  // Translations
  const t = useTranslations();
  // Hooks
  const { clearAll, hasAnyFilter } = useQueryParams();
  return (
    <Button
      disabled={!hasAnyFilter}
      onClick={clearAll}
      className="w-full"
      variant={"secondary"}
    >
      <RotateCcw /> {t("reset-all")}
    </Button>
  );
}
