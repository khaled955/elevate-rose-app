"use client";

import { MapPinOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type EmptyAddressesProps = {
  title?: string;
  description?: string;
  onAddAddress?: () => void;
  className?: string;
  showAddButton?: boolean;

  locale?: string;
  dir?: "ltr" | "rtl";
};

const COPY = {
  en: {
    title: "No addresses available",
    description: "Add a delivery address to continue checkout.",
    hint: "You can manage your saved addresses anytime from your profile.",
  },
  ar: {
    title: "لا توجد عناوين محفوظة",
    description: "أضف عنوان توصيل لمتابعة إتمام الطلب.",
    hint: "يمكنك إدارة عناوينك المحفوظة في أي وقت من ملفك الشخصي.",
  },
} as const;

export default function EmptyAddresses({
  title,
  description,
  className,
  locale = "en",
  dir,
}: EmptyAddressesProps) {
  // لو locale أي حاجة غير en/ar → خليها en افتراضي
  const safeLocale = locale === "ar" ? "ar" : "en";

  const content = COPY[safeLocale];
  const resolvedDir = dir ?? (safeLocale === "ar" ? "rtl" : "ltr");

  return (
    <div
      dir={resolvedDir}
      className={cn(
        "rounded-xl border p-6 shadow-sm",
        "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className={cn(
            "grid h-14 w-14 place-items-center rounded-full",
            "bg-maroon-600/10 text-maroon-600 dark:bg-maroon-600/15",
          )}
        >
          <MapPinOff size={26} />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {title ?? content.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {description ?? content.description}
          </p>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          {content.hint}
        </p>
      </div>
    </div>
  );
}
