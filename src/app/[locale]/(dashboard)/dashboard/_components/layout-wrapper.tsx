"use client";

import { cn } from "@/lib/utils/cn";
import SideBar from "./side-bar";
import Breadcrumbs from "./bread-crumb";
import { useCallback, useEffect, useState } from "react";

type LayoutWrapperProps = {
  children: React.ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Functions
  const openMobileSidebar = useCallback(() => setIsMobileSidebarOpen(true), []);
  const closeMobileSidebar = useCallback(
    () => setIsMobileSidebarOpen(false),
    [],
  );

  //Effects
  // Lock body scroll while drawer is open (mobile)
  useEffect(() => {
    if (!isMobileSidebarOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileSidebarOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isMobileSidebarOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobileSidebar();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileSidebarOpen, closeMobileSidebar]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-600">
      {/*Sidebar (Desktop Fixed)  */}
      <SideBar
        variant="desktop"
        className="hidden md:flex"
        topOffsetClass="pt-16"
      />

      {/*Sidebar (Mobile Drawer)*/}
      <SideBar
        variant="mobile"
        className="md:hidden"
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
        topOffsetClass="pt-16"
      />

      {/* Breadcrumb*/}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40",
          "border-b border-black/10 bg-white/85 backdrop-blur",
          "dark:border-white/10 dark:bg-zinc-800/80",
          "p-3",
          "md:ps-[calc(theme(spacing.4)+theme(spacing.72))]",
        )}
      >
        <Breadcrumbs
          className="w-full"
          showToggle
          onToggleSidebar={openMobileSidebar}
        />
      </header>

      {/*Main Content*/}
      <main className="pt-16 md:ps-72">
        <div className="px-3">{children}</div>
      </main>
    </div>
  );
}
