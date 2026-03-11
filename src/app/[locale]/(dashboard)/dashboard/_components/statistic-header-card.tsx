import { cn } from "@/lib/utils/cn";

type StatisticHeaderProps = {
  title: string;
  className?:string;
};
export default function StatisticHeaderCard({title,className}:StatisticHeaderProps) {
  return <h2 className={cn("capitalize font-semibold text-2xl text-zinc-800 dark:text-zinc-100",className)}>{title}</h2>;
}
