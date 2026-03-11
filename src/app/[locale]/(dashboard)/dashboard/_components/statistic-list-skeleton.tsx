import * as React from "react";
import { cn } from "@/lib/utils/cn";

type StatisticListSkeletonProps = {
  rows?: number;
  className?: string;
};

export default function StatisticListSkeleton({
  rows = 6,
  className,
}: StatisticListSkeletonProps) {
  return (
    <div className={cn("mt-4 space-y-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3 rounded-md bg-zinc-100 dark:bg-zinc-900/40 animate-pulse"
        >
          {/* Left text skeleton */}
          <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

          {/* Right text skeleton */}
          <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}
