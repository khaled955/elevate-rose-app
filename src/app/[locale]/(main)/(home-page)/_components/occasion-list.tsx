import OcassionCard from "@/components/features/occasions/ocassion-card";

import photoOne from "../../../../../../public/assets/occasion-1.png";
import photoTwo from "../../../../../../public/assets/occasion-2.png";
import photoThree from "../../../../../../public/assets/occasion-3.png";
import { StaticImageData } from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

type OcassionProp = {
  src: StaticImageData;
  text: string;
  badge: string;
};

export default function OccasionList() {

const t = useTranslations()

  const OcassionsList: OcassionProp[] = useMemo(() => {
    return [
      {
        src: photoOne,
        badge: t('wedding'),
        text: t('celebrate-her-forever'),
      },
      {
        src: photoTwo,
        badge: t('engagment'),
        text: t('honor-the-beginning-of'),
      },
      {
        src: photoThree,
        badge: t('anniverasy'),
        text: t('mark-every-year'),
      },
    ];
  }, [t]);

  return (
    <div className="flex flex-col md:flex-row gap-4 my-5">
      {OcassionsList.map((ocaaaion: OcassionProp) => (
        <OcassionCard
          key={ocaaaion.text}
          text={ocaaaion.text}
          src={ocaaaion.src}
          badge={ocaaaion.badge}
        />
      ))}
    </div>
  );
}
