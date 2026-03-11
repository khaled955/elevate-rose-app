"use client";

import * as React from "react";

type RoseLoadingProps = {
  text?: string;
  typingSpeedMs?: number;
  pauseAfterDoneMs?: number;
};

export default function RoseLoading({
  text = "Welcome To Rose App",
  typingSpeedMs = 75,
  pauseAfterDoneMs = 700,
}: RoseLoadingProps) {
  // State
  const [shown, setShown] = React.useState("");

  // Ref
  const rafRef = React.useRef<number | null>(null);
  const lastTickRef = React.useRef<number>(0);
  const indexRef = React.useRef<number>(0);
  const phaseRef = React.useRef<"typing" | "pause" | "reset">("typing");
  const pauseStartRef = React.useRef<number>(0);

  // Effects
  React.useEffect(() => {
    function loop(now: number) {
      if (!lastTickRef.current) lastTickRef.current = now;

      const elapsed = now - lastTickRef.current;

      // Typing
      if (phaseRef.current === "typing") {
        if (elapsed >= typingSpeedMs) {
          lastTickRef.current = now;

          const nextIndex = indexRef.current + 1;
          indexRef.current = nextIndex;

          setShown(text.slice(0, nextIndex));

          if (nextIndex >= text.length) {
            phaseRef.current = "pause";
            pauseStartRef.current = now;
          }
        }
      }

      // Pause
      if (phaseRef.current === "pause") {
        if (now - pauseStartRef.current >= pauseAfterDoneMs) {
          phaseRef.current = "reset";
        }
      }

      // Reset
      if (phaseRef.current === "reset") {
        indexRef.current = 0;
        setShown("");
        phaseRef.current = "typing";
        lastTickRef.current = now;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, typingSpeedMs, pauseAfterDoneMs]);

  return (
    <div
      className={[
        "min-h-[100dvh] w-full",
        "grid place-items-center",
        "bg-white text-zinc-900",
        "dark:bg-zinc-950 dark:text-zinc-50",
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        {/* Typing text */}
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="inline-flex items-center gap-1">
            <span>{shown}</span>

            {/* caret */}
            <span
              className="inline-block h-[1.15em] w-[2px] translate-y-[1px] animate-caret bg-zinc-900 dark:bg-zinc-50"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Spinner */}
        <div className="flex items-center gap-3">
          <span
            className={[
              "h-9 w-9 rounded-full border-2",
              "border-zinc-200 border-t-zinc-900",
              "dark:border-zinc-800 dark:border-t-zinc-50",
              "animate-spin",
            ].join(" ")}
            aria-hidden="true"
          />
          <p className="text-sm text-zinc-500 dark:text-zinc-300">Loading...</p>
        </div>
      </div>

      {/* local styles (no need to edit tailwind config) */}
      <style jsx global>{`
        @keyframes caret {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        .animate-caret {
          animation: caret 0.9s steps(1) infinite;
        }
      `}</style>
    </div>
  );
}
