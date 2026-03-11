"use client";

import { Input } from "@/components/ui/input";
import SearchOverlay from "@/components/shared/search-overlay";
import SearchCard from "@/components/shared/product-search-card";
import { useProducts } from "@/hooks/products/use-products";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ✅ Highlight component
function HighlightText({
  text,
  query,
  className,
}: {
  text: string;
  query: string;
  className?: string;
}) {
  const q = query.trim();
  if (!q) return <span className={className}>{text}</span>;

  const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = text.split(re);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isMatch = part.toLowerCase() === q.toLowerCase();
        return isMatch ? (
          <mark
            key={i}
            className={cn(
              "rounded px-1",
              "bg-maroon-600/15 text-maroon-800",
              "dark:bg-maroon-500/20 dark:text-soft-pink-200",
            )}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
}

export default function SearchInputWithOverlay() {
  // Translations
  const t = useTranslations();
  // Navigation
  const router = useRouter();
  const locale = useLocale();

  // State
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  // refs for scroll-into-view
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  // Debounce
  const [debouncedQuery] = useDebounce(query, 300);

  // Querys
  const { data: productList, isLoading } = useProducts({});

  // Variables
  const allProducts = useMemo(() => productList?.products || [], [productList]);

  // Filter by title
  const results = useMemo(() => {
    const keyword = debouncedQuery.trim().toLowerCase();
    if (!keyword) return [];
    return allProducts.filter((p) =>
      (p.title ?? "").toLowerCase().includes(keyword),
    );
  }, [debouncedQuery, allProducts]);

  const showEmpty =
    debouncedQuery.trim().length > 0 && !isLoading && results.length === 0;
  // Effects
  // Reset selection when results change / query changes
  useEffect(() => {
    setActiveIndex(results.length ? 0 : -1);
  }, [results.length, debouncedQuery]);

  useEffect(() => {
    if (!open) return;
    if (activeIndex < 0) return;
    const el = itemRefs.current[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  function closeOverlay() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function selectProduct(productId: string) {
    // ✅ close overlay
    closeOverlay();
    router.push(`/products/${productId}`, { locale });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;

    // ESC always closes
    if (e.key === "Escape") {
      e.preventDefault();
      closeOverlay();
      return;
    }

    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item?._id) selectProduct(item._id);
      return;
    }
  }

  return (
    <div className="grow">
      <Input
        type="search"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("what-awesome-gift-are-you-looking-for")}
      />

      <SearchOverlay
        open={open}
        onClose={closeOverlay}
        query={query}
        onQueryChange={setQuery}
        onInputKeyDown={handleKeyDown}
      >
        <div className="space-y-3">
          {/* before typing */}
          {debouncedQuery.trim().length === 0 && (
            <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {t("start-typing-to-search-products-0")}
            </div>
          )}

          {/* loading */}
          {isLoading && (
            <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {t("loading-products")}
            </div>
          )}

          {/* empty */}
          {showEmpty && (
            <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {t("no-products-found")}
            </div>
          )}

          {/* results */}
          {results.map((p, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={p._id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                role="option"
                aria-selected={isActive}
                tabIndex={-1}
                className={cn(
                  "rounded-2xl ring-1 ring-transparent transition",
                  isActive &&
                    "ring-maroon-600/40 bg-maroon-600/5 dark:bg-maroon-500/10",
                )}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectProduct(p._id);
                }}
              >
                <SearchCard
                  productId={p._id}
                  // ✅ highlight title
                  title={
                    <HighlightText
                      text={p.title ?? ""}
                      query={debouncedQuery}
                      className="text-base sm:text-lg font-semibold"
                    />
                  }
                  src={p.imgCover}
                  rate={p.rateAvg ?? 0}
                  rateCount={p.rateCount ?? 0}
                  priceBeforeSale={p.price ?? 0}
                  priceAfterSale={p.priceAfterDiscount ?? p.price ?? 0}
                  salesCount={p.sold ?? 0}
                />
              </div>
            );
          })}
        </div>
      </SearchOverlay>
    </div>
  );
}
