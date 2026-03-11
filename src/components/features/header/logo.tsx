"use client";
import Image from "next/image";
import logo from "../../../../public/assets/Images/logo.png";
import { useRouter } from "next/navigation";

type LogoProps = {
  onClose?: () => void;
};

export default function Logo({ onClose }: LogoProps) {
  const router = useRouter();

  function handleNavigation() {
    router.push("/");
    onClose?.();
  }

  return (
    <button onClick={handleNavigation} className="logo relative">
      <Image
        width={60}
        height={40}
        sizes="(max-width: 640px) 80px, (max-width: 1024px) 50px, 50px"
        className="w-20 h-auto object-cover"
        priority
        src={logo}
        alt="rose-app-logo"
      />
    </button>
  );
}
