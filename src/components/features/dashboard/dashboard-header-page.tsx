"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { Plus } from "lucide-react";

type DashboardHeaderPropts = {
  title: string;
  path: string;
  className?: string;
  btnText: string;
};
export default function DashboardHeaderPage({
  title,
  btnText,
  path,
  className,
}: DashboardHeaderPropts) {
  // Navigation
  const router = useRouter();

  // Functions
  function handleNavigate() {
    router.push(path);
  }

  return (
    <header className={cn("flex justify-between items-center", className)}>
      <h1 className="text-zinc-800 dark:text-zinc-50 font-bold capitalize">
        {title}
      </h1>
      <Button onClick={handleNavigate} className="w-fit">
        <Plus /> <span className="hidden sm:inline-block">{btnText}</span>
      </Button>
    </header>
  );
}
