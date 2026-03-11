import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth";
import Logo from "../features/header/logo";
import Address from "../features/header/address";
import SearchInput from "../features/header/search-input";
import NavLoginBtn from "../features/header/login-btn";
import { DropdownMenuDialog } from "../features/header/drop-down-dialog";
import ShopIcon from "../features/header/shop-icon";
import { LocalSwitch } from "../shared/local-switch";
import ThemeSwitch from "../shared/theme-switch";
import NavLinks from "../features/header/nav-link";
import NotificationsList from "../features/header/notifications/_components/notifications-list";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav className="md:fixed left-0 right-0 top-0 z-[54] bg-white dark:bg-zinc-800 pt-3">
        <header className="container  flex flex-wrap sm:flex-nowrap gap-5 py-2 justify-center sm:justify-between items-center px-10 md:px-0 bg-white dark:bg-zinc-800">
          <div className="logo hidden md:block">
            <Logo />
          </div>
          {session && (
            <div className="address">
              <Address />
            </div>
          )}
          <SearchInput />

          <div className="flex gap-1 md:gap-4 items-center -order-1 md:order-1">
            <div className="flex gap-1">
              <div>
                <NavLoginBtn />
              </div>

              <div>{session && <DropdownMenuDialog session={session} />}</div>
            </div>
            {/*Cart & Whishlist icons */}
            <ShopIcon />
            {/* Notifications */}
            {session && <NotificationsList />}
            {/* Language Change */}
            <LocalSwitch />
            <div className="switch-mode hidden md:block">
              {/* Theme Change */}
              <ThemeSwitch />
            </div>
          </div>
        </header>

        <footer className="bg-maroon-700 text-zinc-50 dark:bg-soft-pink-200 dark:text-maroon-800 hidden md:block">
          <NavLinks />
        </footer>
      </nav>
    </>
  );
}
