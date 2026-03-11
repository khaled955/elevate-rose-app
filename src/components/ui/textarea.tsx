import * as React from "react";

import { cn } from "@/lib/utils/cn";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "dark:border-zinc-600 md:text-sm flex min-h-[100px] w-full rounded-[10px] border border-zinc-300 bg-white p-4 px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-sm placeholder:text-zinc-400 hover:border-zinc-400 focus-visible:border-maroon-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-none disabled:bg-zinc-100 disabled:opacity-50 dark:bg-zinc-600 dark:text-zinc-50 dark:hover:border-zinc-500 dark:focus-visible:border-softpink-400 dark:disabled:bg-zinc-700 resize-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
