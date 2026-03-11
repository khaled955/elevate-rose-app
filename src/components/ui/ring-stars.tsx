"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type RatingStarsProps = {
  /** Average rating value (supports fractions like 3.5) */
  rateAvg: number;

  /** Total count of ratings */
  rateCount?: number;

  /** Maximum number of stars */
  max?: number;

  /** Star size */
  size?: number;

  /** Wrapper class */
  className?: string;

  /** Show rating count text */
  showCount?: boolean;
};

export function RatingStars({
  rateAvg,
  rateCount,
  max = 5,
  size = 16,
  className,
  showCount = true,
}: RatingStarsProps) {
  const safeValue = Math.min(Math.max(rateAvg, 0), max);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, index) => {
          const fillPercentage = Math.min(Math.max(safeValue - index, 0), 1);

          return (
            <div key={index} className="relative">
              {/* Empty star */}
              <Star size={size} className="text-yellow-500" />

              {/* Filled part */}
              {fillPercentage > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage * 100}%` }}
                >
                  <Star
                    size={size}
                    className="fill-yellow-500 text-yellow-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rating count */}
      {showCount && typeof rateCount === "number" && (
        <span className="text-xs text-zinc-500">({rateCount})</span>
      )}
    </div>
  );
}
