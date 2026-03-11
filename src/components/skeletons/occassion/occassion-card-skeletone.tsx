"use client";

import { cn } from "@/lib/utils/cn";

type OccasionCardSkeletonProps = {
  className?: string;
};

export default function OccasionCardSkeleton({
  className,
}: OccasionCardSkeletonProps) {
  return (
    <li
      className={cn(
        "relative h-20 w-full overflow-hidden rounded-lg",
        "animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      {/* Image skeleton */}
      <div className="absolute inset-0 bg-zinc-300 dark:bg-zinc-700" />

      {/* Overlay skeleton */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />

      {/* Text skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-500" />
      </div>
    </li>
  );
}
