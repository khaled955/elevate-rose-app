"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

type MobileFiltersSheetProps = {
  children: React.ReactNode;
  title?: string;
};

export default function MobileFiltersSheet({
  children,
  title = "Filters",
}: MobileFiltersSheetProps) {
  const [open, setOpen] = useState(false);

  // lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* ✅ Mobile button only */}
      <div className="lg:hidden sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-maroon-900/70 dark:supports-[backdrop-filter]:bg-maroon-900/50">
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-maroon-200 bg-white px-3 py-2 text-sm text-maroon-800
                       dark:border-maroon-700 dark:bg-maroon-900 dark:text-soft-pink-100"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="size-4" />
            {title}
          </button>
        </div>
      </div>

      {/* ✅ Desktop sidebar */}
      <aside className="hidden lg:block lg:w-[320px] xl:w-[360px] flex-shrink-0">
        {children}
      </aside>

      {/* ✅ Mobile Sheet Overlay Wrapper */}
      <div
        className={[
          "lg:hidden fixed inset-0 z-50",
          // ✅ wrapper itself blocks events when closed (no ghost hover)
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* ✅ Backdrop (NOT a button) */}
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0",
            "bg-black/40 dark:bg-black/60",
            "transition-opacity duration-300",
            // ✅ backdrop receives pointer events ONLY when open
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
            // ✅ make sure cursor isn't pointer unless open
            open ? "cursor-pointer" : "cursor-default",
          ].join(" ")}
          aria-label="Close filters overlay"
          role="presentation"
        />

        {/* ✅ Panel */}
        <div
          className={[
            "absolute inset-x-0 bottom-0",
            "max-h-[85vh] overflow-y-auto",
            "rounded-t-2xl border",
            "bg-white border-maroon-200",
            "dark:bg-maroon-950 dark:border-maroon-800",
            "transition-transform duration-300 ease-out",
            open ? "translate-y-0" : "translate-y-full",
            // ✅ panel receives pointer events ONLY when open
            open ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          // ✅ stop close when clicking inside panel
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3
                          bg-white border-maroon-200
                          dark:bg-maroon-950 dark:border-maroon-800"
          >
            <p className="text-sm font-medium text-maroon-900 dark:text-soft-pink-100">
              {title}
            </p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border p-2 border-maroon-200 bg-white text-maroon-900
                         hover:bg-maroon-50
                         dark:border-maroon-800 dark:bg-maroon-900 dark:text-soft-pink-100 dark:hover:bg-maroon-800"
              aria-label="Close filters"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 text-maroon-900 dark:text-soft-pink-100">
            {children}
          </div>

          <div className="h-4" />
        </div>
      </div>
    </>
  );
}
