"use client";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

// Types
type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // ✅ أضف ده
  children?: React.ReactNode;
};

export default function SearchOverlay({
  open,
  onClose,
  query,
  onQueryChange,
  children,
  onInputKeyDown,
}: SearchOverlayProps) {
  // Translations
  const t = useTranslations();
  // Refs
  const panelRef = useRef<HTMLDivElement>(null);

  // Effects
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
      />

      {/* panel */}
      <div className="relative mx-auto mt-20 w-[92%] max-w-3xl">
        <div
          ref={panelRef}
          className={cn(
            "rounded-2xl border border-zinc-200 bg-white shadow-xl",
            "dark:border-zinc-800 dark:bg-zinc-950",
          )}
          role="dialog"
          aria-modal="true"
        >
          {/* header */}
          <div className="flex items-center justify-between gap-2 border-b border-zinc-200 p-3 dark:border-zinc-800">
            <div className="flex-1">
              {/* ٍSearch-input */}
              <input
                autoFocus
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search products..."
                className={cn(
                  "h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none",
                  "focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20",
                  "dark:border-zinc-800 dark:bg-zinc-900 dark:text-white",
                )}
              />
            </div>

            <button
              type="button"
              onClick={onClose}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-xl border border-zinc-200 bg-white",
                "hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
              )}
              aria-label="Close"
            >
              <X className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
            </button>
          </div>

          {/* content */}
          <div className="max-h-[60vh] overflow-auto p-3">
            {children ? (
              children
            ) : (
              <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                {t("start-typing-to-search-products")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
