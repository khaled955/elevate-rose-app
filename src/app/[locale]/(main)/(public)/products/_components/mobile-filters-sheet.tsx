"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, ChevronUp } from "lucide-react";

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
      {/* Mobile trigger button — hidden md+ */}
      <div className="md:hidden sticky top-0 z-20 py-3 bg-white/90 backdrop-blur-md border-b border-zinc-100 dark:bg-maroon-950/90 dark:border-maroon-800/60">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2.5 rounded-xl border border-maroon-200 bg-white px-4 py-2.5 text-sm font-medium text-maroon-800 shadow-sm
                     transition-all duration-200 hover:border-maroon-400 hover:shadow-md active:scale-95
                     dark:border-maroon-700 dark:bg-maroon-900 dark:text-soft-pink-100 dark:hover:border-maroon-500"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="size-4 transition-transform duration-200 group-hover:rotate-12" />
          {title}
          <ChevronUp className="size-3.5 ml-1 rotate-180 text-maroon-400 dark:text-maroon-500" />
        </button>
      </div>

      {/* Mobile sheet overlay — hidden md+ */}
      <div
        className={[
          "md:hidden fixed inset-0 z-50",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0",
            "bg-black/50 backdrop-blur-sm",
            "transition-opacity duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          ].join(" ")}
          role="presentation"
        />

        {/* Panel */}
        <div
          className={[
            "absolute inset-x-0 bottom-0",
            "flex flex-col",
            "max-h-[90vh]",
            "rounded-t-3xl",
            "bg-white dark:bg-maroon-950",
            "shadow-2xl",
            "transition-transform duration-300 ease-out",
            open ? "translate-y-0" : "translate-y-full",
            open ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-zinc-200 dark:bg-maroon-700" />
          </div>

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-zinc-100 dark:border-maroon-800">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-maroon-50 dark:bg-maroon-900">
                <SlidersHorizontal className="size-4 text-maroon-700 dark:text-soft-pink-200" />
              </div>
              <p className="text-base font-semibold text-maroon-900 dark:text-soft-pink-100 tracking-tight">
                {title}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg
                         text-zinc-400 hover:text-maroon-700 hover:bg-maroon-50
                         transition-all duration-150 active:scale-90
                         dark:text-maroon-500 dark:hover:text-soft-pink-100 dark:hover:bg-maroon-800"
              aria-label="Close filters"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-maroon-900 dark:text-soft-pink-100">
            {children}
          </div>

          {/* Safe area */}
          <div className="flex-shrink-0 h-6" />
        </div>
      </div>
    </>
  );
}
