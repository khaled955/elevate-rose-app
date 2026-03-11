"use client";

import { Button } from "@/components/ui/button";
import { ErrorProps } from "@/lib/types/common";
import { useTranslations } from "next-intl";

export default function RootLayoutError({ error, reset }: ErrorProps) {
  // Translations
  const t = useTranslations();
  return (
    <html>
      <body>
        <p className="text-red-500">{error.message}</p>
        <Button onClick={() => reset()}>{t("reset-0")}</Button>
      </body>
    </html>
  );
}
