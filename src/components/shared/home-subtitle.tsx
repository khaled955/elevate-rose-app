import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

type HomeSubtitleProp = {
  children: ReactNode;
  className?: string;
};
export default function HomeSubtitle({
  children,
  className,
}: HomeSubtitleProp) {
  return (
    <p
      className={cn(
        "font-bold text-maroon-700 dark:text-soft-pink-200 text-3xl relative after:content-[''] after:absolute after:w-[30%] after:bg-soft-pink-600 dark:after:bg-soft-pink-500 after:start-0 after:bottom-0 after:h-[3px] before:content-[''] before:absolute before:w-[76%] before:bg-soft-pink-100 dark:before:bg-zinc-700 before:start-0 before:bottom-1 before:h-4 before:rounded-e-full before:-z-10 isolate",
        className,
      )}
    >
      {children}
    </p>
  );
}
