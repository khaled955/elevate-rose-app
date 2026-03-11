import HomeSubtitle from "@/components/shared/home-subtitle";
import HomeTitle from "@/components/shared/home-title";
import { useTranslations } from "next-intl";

import Image from "next/image";

export default function HomeGallery() {
  const t = useTranslations();

  return (
    <div>
      <header className="flex flex-col items-center gap-3">
        <HomeTitle>{t("gallery")}</HomeTitle>
        <HomeSubtitle>{t('check-out-our-wonderful-gallery-0')}</HomeSubtitle>
      </header>
      <div className=" pt-11">
        <div className="grid grid-cols-12 grid-rows-10 gap-3">
          {/* Top Left Column */}
          <div className="col-span-4 row-span-6">
            <Image
              src="/assets/Images/gallery-1.png"
              alt="Wedding and celebration gift boxes"
              width={1000}
              height={1}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Top Middle */}
          <div className="col-span-4 row-span-4">
            <Image
              src="/assets/Images/gallery-2.png"
              alt="Red gift boxes with ribbons"
              width={420}
              height={410}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Top Right */}
          <div className="col-span-4 row-span-4">
            <Image
              src="/assets/Images/gallery-3.png"
              alt="Engagement ring with white roses and daisies"
              width={420}
              height={410}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Bottom Left */}
          <div className="col-span-4 row-span-6">
            <Image
              src="/assets/Images/gallery-6.png"
              alt="Heart-shaped chocolate box with pink roses"
              width={420}
              height={620}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Bottom Middle */}
          <div className="col-span-4 row-span-6">
            <Image
              src="/assets/Images/gallery-5.png"
              alt="Engagement ring with yellow and white roses"
              width={420}
              height={620}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Bottom Right */}
          <div className="col-span-4 row-span-4">
            <Image
              src="/assets/Images/gallery-4.png"
              alt="Congratulations engagement card with ring"
              width={420}
              height={410}
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
