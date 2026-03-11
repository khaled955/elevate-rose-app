"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { MoveLeft, MoveRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function ContinueShoppingButton() {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const locale = useLocale();

  return (
    <Button
      className="my-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold md:w-fit"
      onClick={() => router.push("/products", { locale })}
    >
      {locale === "ar" ? (
        <MoveRight className="h-4 w-4" aria-hidden="true" />
      ) : (
        <MoveLeft className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{t("continue-shopping")}</span>
    </Button>
  );
}
