"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  showReset?: boolean;
};

export default function DashboardEmptyState({
  title,
  description,
  icon,
  showReset = false,
}: EmptyStateProps) {
  // Translations
  const t = useTranslations();
  // Navigation
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleReset() {
    router.replace(pathname, { locale });
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-6">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        {icon ?? (
          <svg
            className="w-10 h-10 text-zinc-400 dark:text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
            />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
          {description}
        </p>
      </div>

      {/* Reset Button — optional */}
      {showReset && (
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
            bg-maroon-700 text-white hover:bg-maroon-800 transition-colors
            dark:bg-soft-pink-200 dark:text-zinc-800 dark:hover:bg-soft-pink-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          {t("show-all")}
        </button>
      )}
    </div>
  );
}
