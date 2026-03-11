"use client";
import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Logo from "../features/header/logo";
import ThemeSwitch from "../shared/theme-switch";
import NavLinks from "../features/header/nav-link";

export default function SideBar() {
  // Translations
  const t = useTranslations();

  // States
  const [showSideBar, setShowSideBar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Variables
  const { data: session } = useSession();
  // Functions
  function handleCloseSideBar() {
    setShowSideBar(false);
  }

  function handleShowSideBar() {
    setShowSideBar(true);
  }

  // ================= Click Outside =================
  // Effects
  useEffect(() => {
    if (!showSideBar) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowSideBar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideBar]);

  return (
    <>
      {!showSideBar && (
        <div className=" md:hidden open-side-bar fixed top-2 start-0 z-[55]">
          <button
            type="button"
            onClick={handleShowSideBar}
            aria-label="Open sidebar"
            className="
              group
              inline-flex items-center justify-center
              w-10 h-10 rounded-lg bg-white shadow-md
              
              hover:bg-zinc-100

              dark:bg-zinc-900/40
              dark:hover:bg-zinc-800/90
              
              

              transition
              focus:outline-none
              focus:ring-2 focus:ring-rose-500/70
            "
          >
            <Menu
              size={24}
              className="
                text-zinc-900
                dark:text-zinc-200
                

                group-hover:text-rose-600
                dark:group-hover:text-rose-400

                transition
              "
            />
          </button>
        </div>
      )}

      {showSideBar && (
        <div
          ref={sidebarRef}
          className=" flex flex-col gap-4 items-center pt-4 md:hidden bg-white shadow-md dark:bg-zinc-800 dark:shadow-white fixed top-0 bottom-0 w-44 z-30"
        >
          {/* Close Btn */}
          <div className="close-btn absolute top-3 end-0">
            <button
              onClick={handleCloseSideBar}
              aria-label="Close sidebar"
              className="
    group
    p-1
    rounded-full
    transition
    hover:bg-zinc-100
    dark:hover:bg-zinc-700
    focus:outline-none
    focus:ring-2
    focus:ring-rose-500
  "
            >
              <X
                size={28}
                className="
      text-zinc-700
      dark:text-zinc-200
      group-hover:text-rose-600
      dark:group-hover:text-rose-400
      transition
    "
              />
            </button>
          </div>

          {/* Logo */}
          <div className="logo">
            <Logo onClose={handleCloseSideBar} />
          </div>

          {/* switch moode */}
          <div className="switch-mode md:hidden">
            <ThemeSwitch />
          </div>
          <div className="nav-link">
            <NavLinks onClose={handleCloseSideBar} />
          </div>
          {/* Log out */}
          {session && (
            <div className="log-out-btn ">
              <button
                onClick={() => {
                  signOut();
                }}
                className="flex gap-1 justify-center items-center me-3"
              >
                <LogOut size={35} />
                <span>{t("log-out")}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
