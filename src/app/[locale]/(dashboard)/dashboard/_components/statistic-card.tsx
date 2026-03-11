import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  currency?: string;
  className?: string;
  iconColor?: string;
  valueColor?: string;
  bgColor?: string;
};

export default function StatsCard({
  title,
  value,
  icon,
  currency,
  className,
  iconColor = "text-primary",
  valueColor = "text-foreground",
  bgColor = "bg-muted",
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-5",
        "border border-border",
        "transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "flex flex-col gap-3 items-center",
        bgColor,
        className,
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center",
          "w-10 h-10 rounded-lg",
          iconColor,
        )}
      >
        {icon}
      </div>

      {/* Value */}
      <div className="flex items-end gap-2 flex-wrap">
        <span
          className={cn("text-2xl font-semibold tracking-tight", valueColor)}
        >
          {value}
        </span>

        {currency && (
          <span className="text-sm font-medium text-muted-foreground">
            {currency}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-zinc-800 dark:text-zinc-50 font-semibold">{title}</p>

      {/* hover gradient effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/10" />
      </div>
    </div>
  );
}
