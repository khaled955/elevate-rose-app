"use client";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useMemo } from "react";

type UserAvatarProps = {
  userId?: string;
  email?: string;
  firstName: string;
  lastName?: string;
  photo?: string | null;
  size?: number;
  className?: string;
  alt?: string;
};

//convert string -> stable positive integer
function hashString(str: string) {
  // Initialize hash accumulator with 0 as starting value
  let hash = 0;

  // Iterate over every character in the string
  for (let i = 0; i < str.length; i++) {
    // Get the numeric Unicode value of the current character
    const charCode = str.charCodeAt(i);

    // Multiply the previous hash by 32 using left bit shift (hash * 2^5)
    const multipliedBy32 = hash << 5;

    // Subtract original hash → equivalent to (hash * 31)
    const multipliedBy31 = multipliedBy32 - hash;

    // Combine current character into hash
    // Formula: newHash = (oldHash * 31) + charCode
    hash = charCode + multipliedBy31;
  }
  // Ensure the final hash is always positive
  return Math.abs(hash);
}

// ===== HSL -> CSS string
function hsl(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}

function getUserAvatarColors(userKey: string) {
  const seed = hashString(userKey);

  const HUE = 340; // Rose family (fixed)

  // Background color
  const saturation = 55 + (seed % 26); // 55..80
  const lightness = 82 + ((seed >> 3) % 10); // 82..91

  // Text color
  const textSaturation = 65;
  const textLightness = 28;

  const bg = hsl(HUE, saturation, lightness);
  const text = hsl(HUE, textSaturation, textLightness);

  return { bg, text };
}

export default function UserAvatar({
  userId,
  email,
  firstName,
  lastName,
  photo,
  size = 44,
  className,
  alt,
}: UserAvatarProps) {
  //Variables
  const fullName = `${firstName} ${lastName}`;
  const avatarLetter = firstName?.charAt(0).toUpperCase();
  const hasPhoto = Boolean(photo);

  // Stable key for shade: id > email > name > default
  const userKey = userId || email || fullName || "default-user";

  // One color family, unique per user
  const colors = useMemo(() => getUserAvatarColors(userKey), [userKey]);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={fullName || "User"}
    >
      {hasPhoto ? (
        <Image
          src={photo!}
          alt={alt || fullName}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <div
          className={cn("grid h-full w-full place-items-center font-semibold")}
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
          }}
        >
          {avatarLetter}
        </div>
      )}
    </div>
  );
}
