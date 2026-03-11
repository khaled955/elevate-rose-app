"use client";
import { ErrorProps } from "@/lib/types/common";

export default function DashBoardLayoutError({ error, reset }: ErrorProps) {
  return (
    <div>
      {error.message}
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
