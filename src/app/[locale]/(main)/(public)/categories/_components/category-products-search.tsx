"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";

type CategoryProductsSearchProps = {
  visible: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  clearLabel: string;
  className?: string;
};

export default function CategoryProductsSearch({
  visible,
  value,
  onChange,
  placeholder,
  clearLabel,
  className,
}: CategoryProductsSearchProps) {
  if (!visible) return null;

  return (
    <div className={cn("mb-4 flex items-center gap-2", className)}>
      <div className="relative w-full">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl ps-10"
        />
      </div>

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className={cn(
            "h-10 rounded-xl px-3 text-sm",
            "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
            "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900/40",
          )}
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
}
