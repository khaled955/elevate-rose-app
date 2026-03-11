"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations();
  useEffect(() => setMounted(true), []);

  // To Prevent Hydration Error
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  function handleToggleThem() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <select
        value={mounted ? theme : "system"}
        onChange={(e) => setTheme(e.target.value)}
        className=" hidden md:block h-9 rounded-md border border-border bg-background px-2 text-foreground"
        aria-label="Theme"
        disabled={!mounted}
      >
        <option value="system">{t("system")}</option>
        <option value="dark">{t("dark")}</option>
        <option value="light">{t("light")}</option>
      </select>

      <button
        type="button"
        onClick={handleToggleThem}
        className="
        flex items-center justify-center
        w-9 h-9 rounded-md
        border border-border
        bg-background text-foreground
        hover:bg-accent transition md:hidden
      "
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </>
  );
}



