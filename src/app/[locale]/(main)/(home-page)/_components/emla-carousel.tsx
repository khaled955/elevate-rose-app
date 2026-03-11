import EmblaCarousel from "@/components/features/home-carousel";
import { EmblaOptionsType } from "embla-carousel";

import photo1 from "../../../../../../public/assets/carousel-section-1.png";
import photo2 from "../../../../../../public/assets/carousel-section-2.png";
import photo3 from "../../../../../../public/assets/carousel-section-3.png";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";


export default function EmlaCarouselComponent() {

  const t = useTranslations()
  const locale = useLocale();
  const isRTL = locale === "ar";
  const OPTIONS: EmblaOptionsType = {
    // loop: true,
    direction: isRTL ? "rtl" : "ltr",
  };


const SLIDES = useMemo(()=>{
  return  [
  {
    photo: photo1,
    header: t('where-emotions-bloom'),
    text: t('fresh-flowers'),
  },
  {
    photo: photo2,
    header: t('bloom-with-meaning'),
    text:t('carefully-crafted-flowers'),
  },
  {
    photo: photo3,
    header: t('moments-made-floral'),
    text: t('turn-every-occasion'),
  },
];

},[t])




  return (
    <div className=" col-span-12 md:col-span-9">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
