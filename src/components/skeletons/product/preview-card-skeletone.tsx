"use client";

import { cn } from "@/lib/utils/cn";

type PreviewCardSkeletonProps = {
  className?: string;
};

export default function PreviewCardSkeleton({
  className,
}: PreviewCardSkeletonProps) {
  return (
    <section
      className={cn(
        "border-s border-zinc-200 dark:border-zinc-800",
        "ps-3 py-4 shadow-sm dark:shadow-zinc-200",
        "animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      {/* Header */}
      <header className="flex items-center gap-3 mb-4">
        {/* Avatar skeleton */}
        <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />

        {/* Name + date */}
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-600" />
        </div>
      </header>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <div className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-700" />
        </div>

        <div className="h-4 w-8 rounded bg-zinc-200 dark:bg-zinc-600" />
      </div>

      {/* Title */}
      <div className="h-4 w-[60%] rounded bg-zinc-300 dark:bg-zinc-700 mb-2" />

      {/* Comment */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-600" />
        <div className="h-3 w-[90%] rounded bg-zinc-200 dark:bg-zinc-600" />
        <div className="h-3 w-[75%] rounded bg-zinc-200 dark:bg-zinc-600" />
      </div>
    </section>
  );
}
