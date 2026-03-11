"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryDetailCard from "./category-details-card";
import type { CurrentCategory } from "@/lib/types/category";
import { useTranslations } from "next-intl";

type CategoryDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  isPending: boolean;
  isError: boolean;
  onRetry: () => void;

  category: CurrentCategory | null;
};

export default function CategoryDetailsDialog({
  open,
  onOpenChange,

  isPending,
  isError,
  onRetry,
  category,
}: CategoryDetailsDialogProps) {
  // Translations
  const t = useTranslations();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle>{t("category-details")}</DialogTitle>
          <DialogClose>{t("close")}</DialogClose>
        </DialogHeader>

        <div className="p-4 sm:p-6">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isError ? (
            <button type="button" onClick={onRetry}>
              {t("try-again")}
            </button>
          ) : category ? (
            <CategoryDetailCard category={category} />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
