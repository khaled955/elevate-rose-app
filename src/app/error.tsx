"use client";
import { ErrorProps } from "@/lib/types/common";

export default function RootError({ error }: ErrorProps) {
  return (
    <html>
      <body className="flex justify-center items-center">
        <p className="text-red-500">{error.message}</p>
      </body>
    </html>
  );
}
