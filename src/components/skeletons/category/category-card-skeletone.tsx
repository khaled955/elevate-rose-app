import { cn } from "@/lib/utils/cn";

type CategoryCardSkeletonProps = {
  className?: string;
};

export default function CategoryCardSkeleton({
  className,
}: CategoryCardSkeletonProps) {
  return (
    <li
      className={cn(
        "flex h-10 items-center gap-2 rounded-md",
        "bg-zinc-300 dark:bg-zinc-700",
        "animate-pulse",
        className,
      )}
      aria-hidden="true"
    >
      {/* Image skeleton */}
      <div
        className={cn(
          "flex h-full w-10 items-center justify-center rounded-s-md",
          "bg-zinc-400 dark:bg-zinc-600",
        )}
      >
        <div className="h-[18px] w-[18px] rounded bg-zinc-200 dark:bg-zinc-500" />
      </div>

      {/* Text skeleton */}
      <div className="flex-1 pr-2">
        <div className="h-3 w-[70%] rounded bg-zinc-200 dark:bg-zinc-500" />
      </div>
    </li>
  );
}
