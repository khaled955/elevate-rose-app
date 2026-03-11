
import { PackageX } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

type EmptyOrdersProps = {
  title?: string;
  description?: string;
  className?: string;
  showButton?: boolean;
  productsPath?: string;
};

export default function EmptyOrders({
  title,
  description,
  className,
  showButton = true,
  productsPath = "/products",
}: EmptyOrdersProps) {
  const t = useTranslations("orders");
  const locale = useLocale();

  const defaultTitle = t("empty.title");
  const defaultDescription = t("empty.description");
  const buttonText = t("empty.button");

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border p-8 text-center transition-all",
        "bg-white border-zinc-200 shadow-sm",
        "dark:bg-zinc-950 dark:border-zinc-800",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
        <PackageX className="h-10 w-10 text-zinc-500 dark:text-zinc-400" />
      </div>

      {/* Texts */}
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
        {title || defaultTitle}
      </h3>

      <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        {description || defaultDescription}
      </p>

      {/* Action Button */}
      {showButton && (
        <Link
          href={productsPath}
          locale={locale}
          className={cn(
            "mt-2 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition",
            "bg-maroon-600 text-white hover:bg-maroon-700",
            "dark:bg-maroon-700 dark:hover:bg-maroon-800",
          )}
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
