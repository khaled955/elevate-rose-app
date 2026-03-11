"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";

type FilterKey =
  | "category"
  | "occasion"
  | "rateAvg"
  | "price[lte]"
  | "price[gte]";

type FiltersState = Record<FilterKey, string | null>;

type Options = {
  resetPage?: boolean;
  pageKey?: string;
};

const FILTER_KEYS: FilterKey[] = [
  "category",
  "occasion",
  "rateAvg",
  "price[lte]",
  "price[gte]",
];

export function useQueryParams(options?: Options) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { resetPage = true, pageKey = "page" } = options ?? {};

  const cleanValue = (value: unknown) => {
    if (value === null || value === undefined) return null;
    const v = String(value).trim();

    // لو جالك "" أو قيمة فاضية -> اعتبرها null عشان نحذفها
    if (!v || v === '""') return null;

    return v;
  };

  const makeSearchParams = useCallback(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  const pushParams = useCallback(
    (sp: URLSearchParams) => {
      if (resetPage) sp.set(pageKey, "1");

      // ✅ امسح أي filter فاضي قبل الـ push
      FILTER_KEYS.forEach((k) => {
        const v = sp.get(k);
        if (v === null) return;
        if (!String(v).trim() || String(v).trim() === '""') sp.delete(k);
      });

      const qs = sp.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, resetPage, pageKey],
  );

  const filters: FiltersState = useMemo(() => {
    return FILTER_KEYS.reduce((acc, key) => {
      acc[key] = searchParams.get(key);
      return acc;
    }, {} as FiltersState);
  }, [searchParams]);

  const hasAnyFilter = useMemo(() => {
    return FILTER_KEYS.some((k) => {
      const v = searchParams.get(k);
      return v !== null && String(v).trim() !== "" && String(v).trim() !== '""';
    });
  }, [searchParams]);

  // actions
  const setQuery = useCallback(
    (payload: Partial<Record<FilterKey, unknown>>) => {
      const sp = makeSearchParams();

      (Object.keys(payload) as FilterKey[]).forEach((key) => {
        const value = cleanValue(payload[key]);
        if (value === null) sp.delete(key);
        else sp.set(key, value);
      });

      pushParams(sp);
    },
    [makeSearchParams, pushParams],
  );

  //   toggle query
  const toggleQuery = useCallback(
    (key: FilterKey, value: unknown) => {
      const sp = makeSearchParams();
      const next = cleanValue(value);

      if (next === null) {
        sp.delete(key);
        pushParams(sp);
        return;
      }

      if (sp.get(key) === next) sp.delete(key);
      else sp.set(key, next);

      pushParams(sp);
    },
    [makeSearchParams, pushParams],
  );

  //   remove custome query
  const removeQuery = useCallback(
    (key: string) => {
      const sp = makeSearchParams();
      sp.delete(key);
      pushParams(sp);
    },
    [makeSearchParams, pushParams],
  );

  //   clear all
  const clearAll = useCallback(() => {
    const sp = makeSearchParams();
    FILTER_KEYS.forEach((k) => sp.delete(k));
    pushParams(sp);
  }, [makeSearchParams, pushParams]);

  //   check if active
  const isActive = useCallback(
    (key: FilterKey, value: unknown) => {
      const v = cleanValue(value);
      if (v === null) return false;
      return searchParams.get(key) === v;
    },
    [searchParams],
  );

  const hasQueryValue = (key: FilterKey): boolean => {
    const value = searchParams.get(key);

    if (value === null) return false;

    const v = String(value).trim();

    // handles: "", whitespace, ""
    return v !== "" && v !== '""';
  };

  const removePriceQuery = () => {
    const sp = makeSearchParams();

    for (const key of Array.from(sp.keys())) {
      if (/^price\[[^\]]+\]$/.test(key)) {
        sp.delete(key);
      }
    }

    pushParams(sp);
  };

  return {
    filters,
    hasAnyFilter,
    setQuery,
    toggleQuery,
    removeQuery,
    clearAll,
    isActive,
    hasQueryValue,
    removePriceQuery,
  };
}
