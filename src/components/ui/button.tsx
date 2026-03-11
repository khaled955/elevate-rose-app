import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 w-[181px] px-4 py-3 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:bg-zinc-300 disabled:text-zinc-500 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        primary:
          "bg-maroon-600 text-white shadow hover:bg-maroon-700 dark:bg-soft-pink-300 dark:text-zinc-800 dark:hover:bg-soft-pink-400 disabled:dark:bg-zinc-700 disabled:dark:text-zinc-500",
        destructive:
          "bg-red-600 text-white shadow hover:bg-red-700 dark:bg-red-500 dark:text-zinc-50 dark:hover:bg-red-600",
        secondary:
          "bg-maroon-50 text-maroon-600 shadow-sm hover:bg-maroon-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600",
        outline:
          "border border-zinc-300 border-e-0 rounded-none rounded-s-lg h-12 transition-colors dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700 invalid:border-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        subtle:
          "border border-zinc-400 bg-zinc-50 text-zinc-800 hover:text-zinc-800 shadow-sm hover:bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-50 disabled:bg-zinc-100 disabled:border-zinc-300",
        ghost:
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none border border-zinc-100 text-zinc-800 hover:bg-zinc-100 disabled:border-zinc-300 disabled:bg-zinc-100 disabled:text-zinc-400 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-500 disabled:dark:border-zinc-600 disabled:dark:bg-zinc-800 disabled:dark:text-zinc-600 px-4 py-2 w-full rounded-lg bg-zinc-100",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
        whish:
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 h-11 w-full rounded-lg",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
