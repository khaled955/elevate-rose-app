import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

export type ListCardItem = {
  id: string;
  // Left side
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  // Right side
  rightText?: React.ReactNode;
};

type RowResolverCtx = {
  item: ListCardItem;
  index: number;
  items: ListCardItem[];
};

type RightVariant = "badge" | "text";

type ListCardProps = {
  items: ListCardItem[];
  className?: string;
  listClassName?: string;
  emptyState?: React.ReactNode;
  rowClassName?: string;
  rightVariant?: RightVariant;
  rightTextBaseClassName?: string;
  badgeClassName?: string;

  // Dynamic styling hooks
  getRowClassName?: (ctx: RowResolverCtx) => string | undefined;
  getRightTextClassName?: (ctx: RowResolverCtx) => string | undefined;
  getBadgeClassName?: (ctx: RowResolverCtx) => string | undefined;
};

export default function StatisticListCard({
  items,
  className,
  listClassName,
  emptyState,

  rowClassName,

  rightVariant = "badge",
  rightTextBaseClassName,

  badgeClassName,

  getRowClassName,
  getRightTextClassName,
  getBadgeClassName,
}: ListCardProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const isEmpty = items.length === 0;

  return (
    <section className={cn(className)}>
      <div className={cn("mt-4 overflow-auto", listClassName)}>
        {isEmpty ? (
          <div className="px-4 py-3 text-sm text-muted-foreground">
            {emptyState ?? t("no-data-yet")}
          </div>
        ) : (
          <ul>
            {items.map((item, index) => {
              const ctx: RowResolverCtx = { item, index, items };

              const rightClassName =
                rightVariant === "badge"
                  ? cn(
                      "shrink-0 rounded-md px-2 py-1 text-xs font-medium",
                      "bg-black/5 text-zinc-800 dark:bg-white/5 dark:text-zinc-50",
                      badgeClassName,
                      getBadgeClassName?.(ctx),
                      getRightTextClassName?.(ctx),
                    )
                  : cn(
                      "shrink-0 text-xs font-semibold tabular-nums",
                      "text-zinc-900 dark:text-zinc-100",
                      rightTextBaseClassName,
                      getRightTextClassName?.(ctx),
                    );

              return (
                <li
                  key={item.id}
                  className={cn(
                    "px-4 py-3",
                    rowClassName,
                    getRowClassName?.(ctx),
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Left */}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-foreground">
                        {item.title}
                      </div>

                      {item.subtitle ? (
                        <div className="mt-0.5 truncate text-xs text-muted-foreground">
                          {item.subtitle}
                        </div>
                      ) : null}
                    </div>

                    {/* Right */}
                    {item.rightText ? (
                      <span className={rightClassName}>{item.rightText}</span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
