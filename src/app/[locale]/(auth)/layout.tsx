import { LocalSwitch } from "@/components/shared/local-switch";
import ThemeSwitch from "@/components/shared/theme-switch";
import { LayoutProps } from "@/lib/types/common";
import PhotoSeparator from "./_components/photo-separator";
import photo from "../../../../public/assets/Images/Cover.png";
import Image from "next/image";
export default function AuthLayout({ children }: LayoutProps) {
  return (
    <>
      <div className="auth-layout flex flex-col md:flex-row overflow-x-hidden overflow-y-auto">
        <div className="auth-content bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 w-full md:w-[50%]">
          <div className="switcher flex gap-6 ms-5 md:ms-28 mb-7 mt-3">
            <LocalSwitch />
            <ThemeSwitch />
          </div>
          <div className="child">
            <PhotoSeparator>{children}</PhotoSeparator>
          </div>
        </div>
        <div className="auth-photo w-full md:w-[50%] relative min-h-screen">
          <Image fill className="object-cover" src={photo} alt="auth-thoto" />
        </div>
      </div>
    </>
  );
}
