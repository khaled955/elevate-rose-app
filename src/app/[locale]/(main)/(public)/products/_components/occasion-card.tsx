"use client";
import { useQueryParams } from "@/hooks/shared/use-query-params";
import { Occasion } from "@/lib/types/occasion";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
type OccasionCardProps = {
  occasion: Occasion;
};

const IMAGE_PREFIX = "https://flower.elevateegy.com/uploads";

export default function OccasionCard({ occasion }: OccasionCardProps) {
  // hooks
  const { toggleQuery, isActive } = useQueryParams();

  return (
    <li
      onClick={() => toggleQuery("occasion", occasion._id)}
      className="relative h-20 w-full cursor-pointer overflow-hidden rounded-lg"
    >
      <Image
        className="object.cover"
        fill
        src={`${IMAGE_PREFIX}/${occasion.image}`}
        alt={occasion.name}
        sizes="33vw"
      />
      <h3
        className={cn(
          isActive("occasion", occasion._id)
            ? "bg-occasion-active"
            : "bg-overlay-black-50",
          "absolute font-medium text-zinc-50 inset-0  flex justify-center items-center",
        )}
      >
        {occasion.name}
      </h3>
    </li>
  );
}
