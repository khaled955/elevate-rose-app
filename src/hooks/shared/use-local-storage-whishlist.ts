"use client";

import { LocalWishlistProduct } from "@/lib/types/whishlist";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "whishlist-items";
const STORAGE_EVENT = "local-wishlist-updated";

// ---- Module cache (keeps snapshot stable)
let cachedRaw: string | null = null;
let cachedParsed: LocalWishlistProduct[] = [];

/** Parse JSON safely into WishlistProduct[] */
function parseList(raw: string | null): LocalWishlistProduct[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LocalWishlistProduct[]) : [];
  } catch {
    return [];
  }
}

// Read snapshot with caching (stable reference) to prevent re-render
function getSnapshot(): LocalWishlistProduct[] {
  // to prevent hydration error
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);

  // ✅ If storage string didn't change, return the SAME array reference
  if (raw === cachedRaw) return cachedParsed;

  cachedRaw = raw;
  cachedParsed = parseList(raw);
  return cachedParsed;
}

// Subscribe to updates to make all components aware about updates in local-storage
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onCustom = () => callback();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };

  window.addEventListener(STORAGE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(STORAGE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

// Emit custom event that tells all components using hook there are updates in local storage
function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function useLocalWishlist() {
  // useSyncExternalStore => keeps all components in sync automatically
  const list = useSyncExternalStore(subscribe, getSnapshot, () => []);

  // Check if id exists
  const has = useCallback(
    (id: string) => list.some((item) => item.id === id),
    [list],
  );

  // Add (store full card details)
  const add = useCallback((item: LocalWishlistProduct) => {
    if (typeof window === "undefined") return false;

    const current = getSnapshot();
    if (current.some((x) => x.id === item.id)) return false;

    const next: LocalWishlistProduct[] = [
      ...current,
      {
        ...item,
        // ✅ safe defaults
        priceAfterDiscount: item.priceAfterDiscount ?? item.price,
        rateAvg: item.rateAvg ?? 0,
      },
    ];

    const rawNext = JSON.stringify(next);
    localStorage.setItem(STORAGE_KEY, rawNext);

    // ✅ update cache so next getSnapshot returns stable ref
    cachedRaw = rawNext;
    cachedParsed = next;

    emit();
    return true;
  }, []);

  // Remove by id
  const remove = useCallback((id: string) => {
    if (typeof window === "undefined") return false;

    const current = getSnapshot();
    if (!current.some((x) => x.id === id)) return false;

    const next = current.filter((x) => x.id !== id);
    const rawNext = JSON.stringify(next);

    localStorage.setItem(STORAGE_KEY, rawNext);

    // ✅ update cache
    cachedRaw = rawNext;
    cachedParsed = next;

    emit();
    return true;
  }, []);

  // Clear all
  const clear = useCallback(() => {
    if (typeof window === "undefined") return false;

    localStorage.removeItem(STORAGE_KEY);

    // reset cache
    cachedRaw = null;
    cachedParsed = [];

    emit();
    return true;
  }, []);

  return { list, has, add, remove, clear } as const;
}
