"use client";

import { Phone } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils/cn";

type AddressRadioItemProps = {
  value: string;
  city: string;
  phone: string;
  address: string;
};

export function AddressRadioItem({
  value,
  city,
  phone,
  address,
}: AddressRadioItemProps) {
  return (
    <RadioGroup.Item
      value={value}
      className={cn(
        "group relative rounded-md border border-zinc-300 p-3 text-left transition w-full my-3 px-5",

        // unchecked
        "data-[state=unchecked]:bg-white dark:data-[state=unchecked]:bg-zinc-900 dark:border-zinc-700",

        // checked
        "data-[state=checked]:border-zinc-300 data-[state=checked]:bg-maroon-600",
        "dark:data-[state=checked]:border-zinc-700 dark:data-[state=checked]:bg-maroon-700",
      )}
    >
      {/* city + phone */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "capitalize text-xl font-semibold text-zinc-800 flex items-center gap-2",
            "dark:text-zinc-100",
            "group-data-[state=checked]:text-zinc-50",
          )}
        >
          {city}
        </span>

        <p className="flex items-center gap-1">
          <Phone
            size={26}
            className={cn(
              "rounded-full bg-maroon-600 p-1 text-white",
              "dark:bg-maroon-700",
              "group-data-[state=checked]:bg-zinc-50 group-data-[state=checked]:text-maroon-600",
              "dark:group-data-[state=checked]:bg-zinc-200 dark:group-data-[state=checked]:text-maroon-700",
            )}
          />
          <span
            className={cn(
              "text-zinc-500 text-sm",
              "dark:text-zinc-400",
              "group-data-[state=checked]:text-zinc-50",
            )}
          >
            {phone}
          </span>
        </p>
      </div>

      {/* address */}
      <p
        className={cn(
          "mt-2 w-fit rounded-xl bg-zinc-100 p-2 text-sm capitalize text-zinc-800",

          "dark:bg-zinc-800 dark:text-zinc-200",

          "group-data-[state=checked]:text-zinc-50 group-data-[state=checked]:bg-zinc-800",

          "dark:group-data-[state=checked]:bg-zinc-950 dark:group-data-[state=checked]:text-zinc-100",
        )}
      >
        {address}
      </p>
    </RadioGroup.Item>
  );
}
