"use client";

import { Button } from "@/components/ui/button";
import { ErrorProps } from "@/lib/types/common";

export default function RootLayoutError({ error, reset }: ErrorProps) {
  return (
    <html>
      <body className="flex flex-col gap-3 items-center justify-center">
        <p className="text-red-500">{error.message}</p>
        <Button onClick={() => reset()}>Reset</Button>
      </body>
    </html>
  );
}
