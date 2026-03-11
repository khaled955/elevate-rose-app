"use client";

import * as React from "react";
import { Eye, EyeClosed, Search, Upload } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./button";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = React.useId();

    // File Input
    if (type === "file") {
      return (
        <div className="flex gap-2 rounded-[10px] border border-zinc-300 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-700">
          <input
            id="FileInput"
            type="file"
            className={cn(
              "peer flex h-12 w-full rounded-[10px] bg-transparent text-[14px] file:w-0 file:opacity-0",
              "file:border-0 file:h-full file:bg-transparent file:text-sm file:font-medium file:text-zinc-800",
              "placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400",
              "disabled:bg-zinc-100 disabled:text-zinc-400 md:text-sm",
              "dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
              "invalid:border-red-600",
              className,
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          <label
            htmlFor="FileInput"
            className={cn(
              "group flex items-center justify-center rounded-[10px]",
              "bg-white dark:bg-zinc-700",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
            )}
          >
            <span className="flex w-[150px] items-center justify-center gap-3 bg-transparent text-sm text-maroon-500 dark:text-soft-pink-400">
              <Upload size={18} />
              <p>Upload file</p>
            </span>
          </label>
        </div>
      );
    }

    // Password Input
    // Password Input
    if (type === "password") {
      return (
        <div className="relative w-full">
          <input
            id={inputId}
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-12 w-full rounded-[10px] border border-zinc-300 bg-white p-4 text-[14px] shadow-sm transition-colors",
              "ps-4 pe-12 rtl:ps-12 rtl:pe-4",
              "placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400",
              "disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm",
              "dark:border-zinc-600 dark:bg-zinc-700 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
              "invalid:border-red-600",
              className,
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            tabIndex={-1}
            disabled={disabled}
            aria-controls={inputId}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((v) => !v)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2",
              "end-1",
              "h-10 w-10 rounded-md",
              "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-600",
              "text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-50",
              "focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500",
            )}
          >
            {showPassword ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>
      );
    }

    // Search Input
    if (type === "search") {
      return (
        <label
          htmlFor="SearchInput"
          className="relative flex w-full items-center justify-center"
        >
          <input
            id="SearchInput"
            type="search"
            className={cn(
              "flex h-12 w-full rounded-[10px] border border-zinc-300 bg-white p-4 ps-10 text-[14px] shadow-sm transition-colors",
              "placeholder:text-[14px] placeholder:font-normal placeholder:text-zinc-400",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400",
              "disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm",
              "dark:border-zinc-600 dark:bg-zinc-700 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
              "invalid:border-red-600",
              className,
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          <span className="absolute start-1 z-10 p-2">
            <Search size={18} className="text-zinc-400" />
          </span>
        </label>
      );
    }

    // Default Input
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[10px] border border-zinc-300 bg-white p-4 text-[14px] shadow-sm transition-colors",
          "placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400",
          "disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm",
          "dark:border-zinc-600 dark:bg-zinc-700 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
          "invalid:border-red-600",
          className,
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
