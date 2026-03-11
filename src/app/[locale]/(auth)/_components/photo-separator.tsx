import lightPhoto from "../../../../../public/assets/Images/separator.png";
import darkPhoto from "../../../../../public/assets/Images/dark-separator.png";
import Image from "next/image";
import { ReactNode } from "react";
type PhotoSeparatorProps = {
  children: ReactNode;
};

export default function PhotoSeparator({ children }: PhotoSeparatorProps) {
  return (
    <div className="flex flex-col gap-7 items-center px-4 pb-6">
      <div className="photo">
        <Image className=" block dark:hidden" src={lightPhoto} alt="photo" />
        <Image className="hidden dark:block" src={darkPhoto} alt="photo" />
      </div>
      <div className="auth-children w-full">{children}</div>
      <div className="photo">
        <Image
          className="rotate-180 dark:hidden"
          src={lightPhoto}
          alt="photo"
        />
        <Image
          className="rotate-180 hidden dark:block"
          src={darkPhoto}
          alt="photo"
        />
      </div>
    </div>
  );
}
