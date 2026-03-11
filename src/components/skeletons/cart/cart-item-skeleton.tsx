import { cn } from "@/lib/utils/cn";

type CartItemSkeletonProps = {
  className?: string;
};

export default function CartItemSkeleton({ className }: CartItemSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-3 md:flex-row md:justify-between",
        "animate-pulse",
        className,
      )}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* left side */}
      <div className="cart-info flex flex-col gap-3 md:flex-row">
        {/* image */}
        <div className="imge w-full overflow-hidden rounded-md md:w-auto">
          <div className="h-[180px] w-full rounded-md bg-zinc-100 dark:bg-zinc-900 md:h-[150px] md:w-[150px]" />
        </div>

        {/* details */}
        <div className="details flex flex-1 flex-col justify-between">
          <div className="text-info">
            {/* title */}
            <div className="h-6 w-56 rounded-md bg-zinc-100 dark:bg-zinc-900" />

            {/* rating */}
            <div className="rating-info my-3 flex h-14 items-center gap-2">
              <div className="h-5 w-5 rounded bg-zinc-100 dark:bg-zinc-900" />
              <div className="h-4 w-44 rounded-md bg-zinc-100 dark:bg-zinc-900" />
              <div className="h-4 w-24 rounded-md bg-zinc-100 dark:bg-zinc-900" />
            </div>
          </div>

          {/* price + qty */}
          <div className="product-price-count mt-2 md:mt-0">
            <div className="inline-flex items-baseline gap-2 whitespace-nowrap">
              <div className="h-5 w-14 rounded-md bg-zinc-100 dark:bg-zinc-900" />
              <div className="h-7 w-28 rounded-md bg-zinc-100 dark:bg-zinc-900" />
              <div className="h-4 w-10 rounded-md bg-zinc-100 dark:bg-zinc-900" />
            </div>
          </div>
        </div>
      </div>

      {/* right side (actions) */}
      <div className="cart-actions flex w-full flex-col gap-3 md:w-[40%] md:justify-between">
        {/* remove button */}
        <div className="h-10 w-28 self-center rounded-xl bg-zinc-100 dark:bg-zinc-900 md:self-end" />

        {/* update controls */}
        <div className="update-btn flex items-center justify-between gap-2 md:justify-start">
          <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-12 w-40 rounded-xl bg-zinc-100 dark:bg-zinc-900 md:flex-1" />
          <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
        </div>

        {/* error placeholder */}
        <div className="h-4 w-56 self-center rounded-md bg-zinc-100 dark:bg-zinc-900" />
      </div>
    </div>
  );
}
