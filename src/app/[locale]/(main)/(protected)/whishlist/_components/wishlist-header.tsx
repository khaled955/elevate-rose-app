// "use client";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils/cn";
// import { BrushCleaning, Loader } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useFormatter, useLocale, useTranslations } from "next-intl";
// import { toast } from "sonner";
// import { useWhishlist } from "../_hooks/use-whishlist";
// import { useClearWhishlist } from "../_hooks/use-clear-whishlist";
// import { useLocalWishlist } from "@/hooks/shared/use-local-storage-whishlist";

// export default function WishlistHeader() {
//   // Translations
//   const t = useTranslations();
//   const locale = useLocale();
//   const format = useFormatter();

//   // Session
//   const { data: session } = useSession();

//   // Query
//   const { data, isFetching, isLoading } = useWhishlist();

//   // Mutation
//   const { onClearWhishlist, clearWhishlistIsPending } = useClearWhishlist();

//   //   Hooks
//   const { list, clear } = useLocalWishlist();

//   // Variables
//   const isBtnDisabled = session ? (data?.count ?? 0) === 0 : list.length === 0;
//   const count = session ? (data?.count ?? 0) : list.length;
//   const n = format.number(count, "number-base");
//   const isBusy = isFetching || isLoading;

//   // Functions
//   function handleClearWishlist() {
//     if (!session) {
//       clear();
//       toast.success(t("remove-all-products-done-successfully"));
//       return;
//     }

//     if (session) {
//       onClearWhishlist(undefined, {
//         onSuccess: () => {
//           toast.success(t("remove-all-products-done-successfully"));
//         },
//       });
//     }
//   }

//   return (
//     <header
//       className={cn(
//         locale === "ar" ? "gap-6 md:gap-3" : "gap-3",
//         "relative mb-9 py-2 flex flex-col items-center md:flex-row md:justify-between md:items-center",
//       )}
//     >
//       <div className="relative">
//         {/* title */}
//         <h1 className="capitalize mb-3 text-zinc-800 dark:text-zinc-200 font-bold text-3xl md:text-5xl">
//           {t("wishlist")}
//         </h1>

//         {/* count */}
//         <span
//           className={cn(
//             locale === "ar"
//               ? "start-32 -bottom-5 md:start-60 md:-bottom-8"
//               : "start-16 md:start-28 -bottom-7",
//             "product-length absolute text-zinc-400 dark:text-zinc-50 inline-flex items-baseline gap-1 whitespace-nowrap",
//           )}
//         >
//           {isBusy ? (
//             <Loader className="animate-spin" />
//           ) : (
//             t("data-numofwishlistitems-products", { count, n })
//           )}
//         </span>
//       </div>

//       {/* clear-wishlist-button */}
//       <Button
//         onClick={handleClearWishlist}
//         disabled={isBtnDisabled}
//         variant="secondary"
//         className="clear-cart text-maroon-600 font-semibold text-sm"
//       >
//         {clearWhishlistIsPending ? (
//           <Loader className="animate-spin" />
//         ) : (
//           <>
//             <BrushCleaning size={20} /> <span>{t("clear-wishlist")}</span>
//           </>
//         )}
//       </Button>
//     </header>
//   );
// }



"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { BrushCleaning, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useWhishlist } from "../_hooks/use-whishlist";
import { useClearWhishlist } from "../_hooks/use-clear-whishlist";
import { useLocalWishlist } from "@/hooks/shared/use-local-storage-whishlist";

export default function WishlistHeader() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();

  // State (session)
  const { data: session } = useSession();

  // Queries
  const { data, isFetching, isLoading } = useWhishlist();

  // Mutation
  const { onClearWhishlist, clearWhishlistIsPending } = useClearWhishlist();

  // Hooks
  const { list, clear } = useLocalWishlist();

  // Variables
  const isBtnDisabled = session ? (data?.count ?? 0) === 0 : list.length === 0;
  const count = session ? (data?.count ?? 0) : list.length;
  const n = format.number(count, "number-base");
  const isBusy = isFetching || isLoading;

  // Functions
  function handleClearWishlist() {
    if (!session) {
      clear();
      toast.success(t("remove-all-products-done-successfully"));
      return;
    }

    if (session) {
      onClearWhishlist(undefined, {
        onSuccess: () => {
          toast.success(t("remove-all-products-done-successfully"));
        },
      });
    }
  }

  return (
    <header
      className={cn(
        // layout
        locale === "ar" ? "gap-6 md:gap-3" : "gap-3",
        "relative mb-8 flex flex-col items-start justify-between gap-8",
        "md:mb-10 md:flex-row md:items-end",
      )}
    >
      <div className="relative">
        {/* title */}
        <h1
          className={cn(
            "capitalize font-extrabold tracking-tight",
            "text-zinc-900 dark:text-zinc-50",
            "text-3xl md:text-5xl",
          )}
        >
          {t("wishlist")}
        </h1>

        {/* count */}
        <span
          className={cn(
            locale === "ar"
              ? "start-32 -bottom-5 md:start-60 md:-bottom-8"
              : "start-16 md:start-28 -bottom-7",
            "product-length absolute inline-flex items-center gap-2 whitespace-nowrap",
            "text-sm font-medium",
            "text-zinc-500 dark:text-zinc-300",
          )}
        >
          {isBusy ? (
            <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            t("data-numofwishlistitems-products", { count, n })
          )}
        </span>
      </div>

      {/* clear-wishlist-button */}
      <Button
        onClick={handleClearWishlist}
        disabled={isBtnDisabled}
        variant="secondary"
        className={cn(
          "clear-cart inline-flex items-center gap-2",
          "rounded-lg px-4 py-2.5",
          "text-sm font-semibold",
          "text-maroon-700 hover:text-maroon-800",
          "dark:text-soft-pink-200 dark:hover:text-soft-pink-100",
          "disabled:opacity-60 disabled:pointer-events-none",
        )}
      >
        {clearWhishlistIsPending ? (
          <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            <BrushCleaning className="h-4 w-4" aria-hidden="true" />
            <span>{t("clear-wishlist")}</span>
          </>
        )}
      </Button>
    </header>
  );
}
