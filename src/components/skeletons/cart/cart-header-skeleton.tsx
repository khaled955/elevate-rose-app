import { cn } from "@/lib/utils/cn";

type CartHeaderSkeletonProps = {
  className?: string;
};

export default function CartHeaderSkeleton({
  className,
}: CartHeaderSkeletonProps) {
  return (
    <header
      className={cn(
        "relative mb-9 flex flex-col items-center gap-3 py-2 md:flex-row md:items-center md:justify-between",
        "animate-pulse",
        className,
      )}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="relative">
        {/* title skeleton */}
        <div className="mb-3 h-10 w-32 rounded-md bg-zinc-100 dark:bg-zinc-900 md:h-12 md:w-44" />

        {/* count skeleton */}
        <div
          className={cn(
            "absolute inline-flex items-baseline gap-1 whitespace-nowrap",
            "start-16 bottom-0 md:start-28",
          )}
        >
          <div className="h-4 w-24 rounded-md bg-zinc-100 dark:bg-zinc-900" />
        </div>
      </div>

      {/* clear cart button skeleton */}
      <div className="h-10 w-32 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
    </header>
  );
}
