import Image from "next/image";
import photo from "../../../../../../public/assets/home-section-1-static.png";
import { MoveRight } from "lucide-react";

import ActionBtn from "@/components/shared/action-btn";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
export default function GiftCard() {
const t = useTranslations()


  return (
    <div className="relative col-span-12 md:col-span-3 ">
      <div className=" relative h-[26rem] rounded-md overflow-hidden">
        <Image
          fill
          src={photo}
          alt="gift-photo"
          className=" w-full rounded-[1.8rem]"
        />

        <footer className=" absolute start-6 bottom-5 flex flex-col">
          <Badge className="w-fit py-1" variant={"secondary"}>{t('start-price',{price:3000})}</Badge>
          <p className="text-2xl mb-3 text-white font-semibold">
{t('special-gifts')}          </p>
          {/* <Button className="w-fit p-6" variant={"secondary"}>
        </Button> */}
          <ActionBtn>
            {t('i-m-buying')} <MoveRight />
          </ActionBtn>
        </footer>
      </div>
    </div>
  );
}
