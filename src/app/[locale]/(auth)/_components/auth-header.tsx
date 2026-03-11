import { cn } from "@/lib/utils/cn";

type AuthHeaderProps = {
  children: React.ReactNode;
  className?: string;
};
export default function AuthHeader({ children, className }: AuthHeaderProps) {
  return (
    <h2
      className={cn(
        "w-full text-center text-maroon-700 dark:text-soft-pink-300 text-5xl capitalize",
        className
      )}
    >
      {children}
    </h2>
  );
}
