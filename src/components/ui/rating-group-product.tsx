"use client";

import * as React from "react";
import { StarIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils/cn";

interface RatingGroupValueProps {
  value?: string;
  onValueChange?: (value: string) => void;

  /** Fires on click with numeric value (1..max). Optional */
  onSelect?: (value: number) => void;

  max?: number;
  className?: string;
  disabled?: boolean;
  size?: "default" | "sm" | "lg";
}

function RatingGroupProduct({
  value = "0",
  onValueChange,
  onSelect,
  max = 5,
  className,
  disabled = false,
  size = "default",
  ...props
}: RatingGroupValueProps) {
  const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);

  const currentValue = React.useMemo(() => parseInt(value || "0", 10), [value]);
  const displayValue = hoveredValue ?? currentValue;

  const starIndices = React.useMemo(
    () => Array.from({ length: max }, (_, i) => i + 1),
    [max],
  );

  const handleMouseEnter = React.useCallback(
    (starValue: number) => {
      if (!disabled) setHoveredValue(starValue);
    },
    [disabled],
  );

  const handleMouseLeave = React.useCallback(() => {
    setHoveredValue(null);
  }, []);

  const handleClick = React.useCallback(
    (starIndex: number) => {
      if (disabled) return;

      // ✅ update ToggleGroup value (for RHF or normal state)
      onValueChange?.(String(starIndex));

      // ✅ optional callback (no query, no router)
      onSelect?.(starIndex);
    },
    [disabled, onSelect, onValueChange],
  );

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onValueChange}
      size={size}
      className={cn("gap-0", className)}
      disabled={disabled}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {starIndices.map((starIndex) => {
        const starValue = String(starIndex);
        const isActive = starIndex <= displayValue;

        return (
          <ToggleGroupItem
            key={starValue}
            value={starValue}
            aria-label={`${starIndex} star rating`}
            onClick={() => handleClick(starIndex)}
            className={cn(
              "relative border-0 bg-transparent p-0 hover:bg-transparent data-[state=on]:bg-transparent focus-visible:ring-0",
              "hover:scale-110 focus-visible:scale-110 transition-transform ease-out",
              disabled && "pointer-events-none opacity-50",
            )}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            disabled={disabled}
          >
            <StarIcon
              className={cn(
                "transition-colors ease-out size-8",
                isActive
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-yellow-400",
              )}
            />
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}

export { RatingGroupProduct };
