// "use client";

// import { Loader2, Search } from "lucide-react";
// import { useDebounce } from "use-debounce";

// import { cn } from "@/lib/utils/cn";
// import { Input } from "@/components/ui/input";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import ProductCard from "@/components/shared/product-card";
// import { Product } from "@/lib/types/product";
// import { useEffect, useMemo, useState } from "react";
// import { useTranslations } from "next-intl";

// type CategoryProductsDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;

//   isPending: boolean;
//   isError: boolean;
//   errorMessage?: string;

//   onRetry: () => void;
//   products: Product[];
// };

// export default function CategoryProductsDialog({
//   open,
//   onOpenChange,

//   isPending,
//   isError,
//   errorMessage,
//   onRetry,
//   products,
// }: CategoryProductsDialogProps) {
//   // Translations
//   const t = useTranslations();
//   // State
//   const [search, setSearch] = useState("");

//   // Variables
//   const showSearch = (products?.length ?? 0) > 4;

//   // Debounce
//   const [debouncedSearch] = useDebounce(search, 250);

//   const normalizedQuery = debouncedSearch.trim().toLowerCase();

//   const filteredProducts = useMemo(() => {
//     if (!normalizedQuery) return products;

//     return products.filter((p) =>
//       (p.title ?? "").toLowerCase().includes(normalizedQuery),
//     );
//   }, [products, normalizedQuery]);

//   const isEmpty = (products?.length ?? 0) === 0;
//   const isNoResults = !isEmpty && (filteredProducts?.length ?? 0) === 0;

//   // Effects
//   useEffect(() => {
//     if (!open) setSearch("");
//   }, [open]);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         className={cn(
//           "z-[70]",
//           "fixed left-1/2 top-16 -translate-x-1/2 translate-y-0",
//           "sm:top-20",
//           "w-[calc(100vw-24px)] max-w-6xl rounded-2xl p-0",
//           "max-h-[calc(100vh-96px)] sm:max-h-[calc(100vh-120px)]",
//           "overflow-hidden",
//           "border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
//           "data-[state=open]:animate-in data-[state=closed]:animate-out",
//           "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
//           "data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2",
//         )}
//       >
//         <DialogHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:px-6 sm:py-4">
//           <div className="flex items-center justify-between gap-3">
//             <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-lg">
//               {t("category-products")}
//             </DialogTitle>

//             <DialogClose
//               className={cn(
//                 "inline-flex h-9 items-center justify-center rounded-xl px-3 text-sm",
//                 "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
//                 "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/40",
//               )}
//             >
//               {t("close")}
//             </DialogClose>
//           </div>
//         </DialogHeader>

//         {/* ✅ scrollable body */}
//         <div className="max-h-[calc(100vh-160px)] overflow-y-auto p-4 pb-10 sm:p-6 sm:pb-12">
//           {/* Search (only if > 4 products) */}
//           {showSearch && !isPending && !isError && !isEmpty && (
//             <div className="mb-4 flex items-center gap-2">
//               <div className="relative w-full">
//                 <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
//                 <Input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder={t("search-products")}
//                   className="h-10 w-full rounded-xl ps-10"
//                 />
//               </div>

//               {search && (
//                 <button
//                   type="button"
//                   onClick={() => setSearch("")}
//                   className={cn(
//                     "h-10 rounded-xl px-3 text-sm",
//                     "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
//                     "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/40",
//                   )}
//                 >
//                   {t("clear")}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* loading */}
//           {isPending ? (
//             <div className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-600 dark:text-zinc-400">
//               <Loader2 className="h-4 w-4 animate-spin" />
//               <span>{t("loading")}</span>
//             </div>
//           ) : isError ? (
//             /* error */
//             <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
//               <p className="opacity-90">{errorMessage}</p>

//               <button
//                 type="button"
//                 onClick={onRetry}
//                 className="inline-flex h-9 items-center justify-center rounded-xl bg-maroon-600 px-3 text-sm font-medium text-white hover:bg-maroon-700"
//               >
//                 {t("try-again")}
//               </button>
//             </div>
//           ) : isEmpty ? (
//             /* empty-products */
//             <p className="text-sm text-zinc-600 dark:text-zinc-400">
//               {t("no-products")}
//             </p>
//           ) : isNoResults ? (
//             /* no results */
//             <p className="text-sm text-zinc-600 dark:text-zinc-400">
//               {t("no-search-results")}
//             </p>
//           ) : (
//             <div
//               className={cn(
//                 "grid",
//                 "items-stretch",
//                 "gap-5",
//                 "grid-cols-1",
//                 "sm:grid-cols-2 justify-center",
//               )}
//             >
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   className={cn(
//                     "min-w-0",
//                     "h-full",
//                     "rounded-2xl",
//                     "bg-transparent",
//                   )}
//                 >
//                   <ProductCard
//                     productId={product._id}
//                     title={product.title}
//                     src={product.imgCover}
//                     rate={product.rateAvg}
//                     rateCount={product.rateCount}
//                     priceBeforeSale={product.price}
//                     priceAfterSale={product.priceAfterDiscount!}
//                     salesCount={product.sold}
//                     productQuantity={product.quantity}
//                     productInfo={product}
//                     showWishListBtn
//                     className="h-auto"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductCard from "@/components/shared/product-card";
import type { Product } from "@/lib/types/product";
import { useTranslations } from "next-intl";

import { useEffect, useState } from "react";
import CategoryProductsSearch from "./category-products-search";
import { useDebouncedProductSearch } from "../_hooks/use-debounced-product-search";

type CategoryProductsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  isPending: boolean;
  isError: boolean;
  errorMessage?: string;

  onRetry: () => void;
  products: Product[];
};

export default function CategoryProductsDialog({
  open,
  onOpenChange,

  isPending,
  isError,
  errorMessage,
  onRetry,
  products,
}: CategoryProductsDialogProps) {
  // Translations
  const t = useTranslations();

  // State
  const [search, setSearch] = useState("");

  // Hooks
  const { filteredProducts, isEmpty, isNoResults, showSearch } =
    useDebouncedProductSearch({
      products,
      search,
      debounceMs: 250,
    });

  // Effects
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "z-[70]",
          "fixed left-1/2 top-16 -translate-x-1/2 translate-y-0",
          "sm:top-20",
          "w-[calc(100vw-24px)] max-w-6xl rounded-2xl p-0",
          "max-h-[calc(100vh-96px)] sm:max-h-[calc(100vh-120px)]",
          "overflow-hidden",
          "border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2",
        )}
      >
        <DialogHeader className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-lg">
              {t("category-products")}
            </DialogTitle>

            <DialogClose
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-xl px-3 text-sm",
                "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
                "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/40",
              )}
            >
              {t("close")}
            </DialogClose>
          </div>
        </DialogHeader>

        {/* ✅ scrollable body */}
        <div className="max-h-[calc(100vh-160px)] overflow-y-auto p-4 pb-10 sm:p-6 sm:pb-12">
          {/* Search (only if > 4 products) */}
          <CategoryProductsSearch
            visible={showSearch && !isPending && !isError && !isEmpty}
            value={search}
            onChange={setSearch}
            placeholder={t("search-products")}
            clearLabel={t("clear")}
          />

          {/* loading */}
          {isPending ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-600 dark:text-zinc-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("loading")}</span>
            </div>
          ) : isError ? (
            /* error */
            <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              <p className="opacity-90">{errorMessage}</p>

              <button
                type="button"
                onClick={onRetry}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-maroon-600 px-3 text-sm font-medium text-white hover:bg-maroon-700"
              >
                {t("try-again")}
              </button>
            </div>
          ) : isEmpty ? (
            /* empty-products */
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t("no-products")}
            </p>
          ) : isNoResults ? (
            /* no results */
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t("no-search-results")}
            </p>
          ) : (
            <div
              className={cn(
                "grid",
                "items-stretch",
                "gap-5",
                "grid-cols-1",
                "sm:grid-cols-2 justify-center",
              )}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className={cn(
                    "min-w-0",
                    "h-full",
                    "rounded-2xl",
                    "bg-transparent",
                  )}
                >
                  <ProductCard
                    productId={product._id}
                    title={product.title}
                    src={product.imgCover}
                    rate={product.rateAvg}
                    rateCount={product.rateCount}
                    priceBeforeSale={product.price}
                    priceAfterSale={product.priceAfterDiscount!}
                    salesCount={product.sold}
                    productQuantity={product.quantity}
                    productInfo={product}
                    showWishListBtn
                    className="h-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
