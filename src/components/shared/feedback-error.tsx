import { cn } from "@/lib/utils/cn";

type FeedbackErrorProps = {
  errorMsg?: string;
  className?:string;
};
export default function FeedbackError({ errorMsg,className }: FeedbackErrorProps) {
  return (
    <p className={cn("text-sm text-red-500 dark:text-zinc-300 capitalize",className)}>
      {errorMsg}
    </p>
  );
}
