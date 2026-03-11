import MainFooter from "@/components/layout/main-footer";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import { LayoutProps } from "@/lib/types/common";


export default function MainLayout({ children }:LayoutProps) {
  return (
    <>
      {/* Side Bar */}
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="flex flex-col">
        {/* NavBar */}
        <div className="header bg-white dark:bg-zinc-800">
          <NavBar />
        </div>
        {/* //^^==> Public & Protected */}
          <div className="md:mt-44 bg-white dark:bg-zinc-800 min-h-[25rem] overflow-x-hidden px-4">
            {children}
          </div>
        
      </div>


        {/* Footer */}
          <footer className="px-4">
            <MainFooter />
          </footer>
    </>
  );
}
