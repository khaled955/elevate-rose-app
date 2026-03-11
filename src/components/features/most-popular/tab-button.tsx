"use client";

import { Occasion } from "@/lib/types/occasion";
import { cn } from "@/lib/utils/cn";

type TabButtonProps = {
  occasions: Occasion[];
  currentOccasion: string;
  onChange: (id: string) => void;
};

export function TabButton({
  occasions,
  currentOccasion,
  onChange,
}: TabButtonProps) {
  return (
    <ul className="flex gap-4">
      {occasions.map((o) => (
        <li key={o._id}>
          <button
            className={cn(
              "capitalize",
              o._id === currentOccasion
                ? "text-maroon-500 dark:text-soft-pink-200"
                : ""
            )}
            onClick={() => onChange(o._id)}
          >
            {o.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
