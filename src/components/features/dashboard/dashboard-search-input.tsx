"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

type DashboardSearchInputProps = {
  queryKey?: string;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
};

export default function DashboardSearchInput({
  
  queryKey = "name",
  placeholder = "Search...",
  debounceMs = 400,
  className,
}: DashboardSearchInputProps) {
  //Translations
  const locale = useLocale();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Variables
  const searchParams = useSearchParams();
  const paramsString = useMemo(() => searchParams.toString(), [searchParams]);

  // Extract the current value of our target queryKey from the URL
  const urlValue = useMemo(
    () => new URLSearchParams(paramsString).get(queryKey) ?? "",
    [paramsString, queryKey],
  );

  //States
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(urlValue);

  // Refs
  // Prevents redundant navigations when debounce fires but nothing changed
  const lastAppliedRef = useRef(urlValue);

  // Effects
  // sync the controlled input to match the new URL value
  useEffect(() => {
    setValue(urlValue);
  }, [urlValue]);

  // After the user stops typing for debounceMs:
  // 1. Skip if the value hasn't changed since the last push
  // 2. Update the URL query param (set or delete)
  // 3. Reset page to 1 so results start from the beginning
  // 4. Use startTransition so React keeps the UI responsive during navigation
  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextValue = value.trim();

      // Skip navigation if the URL already reflects this value
      if (nextValue === lastAppliedRef.current) return;

      const params = new URLSearchParams(paramsString);

      if (nextValue) params.set(queryKey, nextValue);
      else params.delete(queryKey);

      // Always reset to page 1 on a new search
      params.set("page", "1");

      // Remember what we applied to avoid duplicate navigations
      lastAppliedRef.current = nextValue;

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { locale });
      });
    }, debounceMs);

    // Cancel the pending debounce if the user keeps typing
    return () => clearTimeout(timeout);
  }, [value, debounceMs, queryKey, pathname, router, locale, paramsString]);

  // Clears the input — the debounce effect will then remove the
  // queryKey param from the URL after debounceMs
  function handleClear() {
    setValue("");
  }

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      {/* Search icon*/}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
      {/* search-input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-zinc-200
          dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100
          text-sm outline-none focus:ring-2 focus:ring-maroon-700
          dark:focus:ring-soft-pink-200 transition-all"
      />

      {/* Clear button  */}
      {value && !isPending && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Spinner */}
      {isPending && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3
          border-2 border-maroon-700 border-t-transparent rounded-full animate-spin
          dark:border-soft-pink-200"
        />
      )}
    </div>
  );
}
