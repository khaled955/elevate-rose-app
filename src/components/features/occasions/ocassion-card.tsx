import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";

type OcassionCardProps = {
    src:StaticImageData;
    text:string;
    badge:string
}
export default function OcassionCard({src,text,badge}:OcassionCardProps) {
  const locale = useLocale();
  return (
    <Link
      locale={locale}
      href="/products"
      className="relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t from-black/50 to-transparent after:rounded-xl"
    >
      <div className="img-card relative">
        <Image src={src} alt="occasion" className="rounded-xl" />
      </div>

      <div className="card-content absolute bottom-4 start-5 z-10">
        <Badge variant={"secondary"}>{badge}</Badge>
        <p className="font-semibold text-xl text-white">{text}</p>
      </div>
    </Link>
  );
}
