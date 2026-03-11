"use client";

import { cn } from "@/lib/utils/cn";

type ProductCardSkeletonProps = {
  className?: string;
  showWishlistBtn?: boolean;
};

export default function ProductCardSkeleton({
  className,
  showWishlistBtn = true,
}: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-xl shadow dark:shadow-zinc-200",
        "animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] w-full bg-zinc-300 dark:bg-zinc-700" />

      {/* Wishlist button skeleton */}
      {showWishlistBtn && (
        <div className="absolute top-3 end-4 h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-600" />
      )}

      {/* Badge skeleton */}
      <div className="absolute top-3 start-4 h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-600" />

      {/* Content */}
      <div className="px-3 pb-2 pt-3 space-y-3">
        {/* Title */}
        <div className="h-5 w-[75%] rounded bg-zinc-200 dark:bg-zinc-600" />

        {/* Rating stars */}
        <div className="flex gap-1">
          <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-600" />
          <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-600" />
          <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-600" />
          <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-600" />
          <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-600" />
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-600" />
            <div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Add button skeleton */}
          <div className="h-9 w-9 rounded-md bg-zinc-200 dark:bg-zinc-600" />
        </div>
      </div>
    </div>
  );
}
