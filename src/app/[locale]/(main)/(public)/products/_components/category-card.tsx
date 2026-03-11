"use client";
import Image from "next/image";
import defaultPhoto from "../../../../../../../public/assets/occasion-1.png";
import { Category } from "@/lib/types/category";
import { cn } from "@/lib/utils/cn";
import { useQueryParams } from "@/hooks/shared/use-query-params";

type CategoryCardProp = {
  category: Category;
};

export default function CategoryCard({
  category: { image, _id, name },
}: CategoryCardProp) {
  // hooks
  const { toggleQuery, isActive } = useQueryParams();

  return (
    <li
      onClick={() => toggleQuery("category", _id)}
      className={cn(
        "group flex h-10 items-center gap-2 rounded-md cursor-pointer transition-colors",
        "bg-zinc-300 text-zinc-800 hover:bg-zinc-100",
        "dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
        isActive("category", _id) && "bg-maroon-50 dark:bg-rose-200",
      )}
    >
      <div
        className={cn(
          "flex h-full w-10 items-center justify-center rounded-s-md transition-colors",
          "bg-zinc-400 group-hover:bg-rose-500",
          isActive("category", _id) && "bg-maroon-600",
        )}
      >
        <Image
          className="bg-white"
          src={image || defaultPhoto}
          alt={name}
          width={18}
          height={18}
        />
      </div>

      <span className="truncate text-sm font-medium capitalize">{name}</span>
    </li>
  );
}
