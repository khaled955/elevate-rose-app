import HomeSubtitle from "@/components/shared/home-subtitle";
import HomeTitle from "@/components/shared/home-title";
import { useTranslations } from "next-intl";

export default function TestimonialsHeader() {
    const t= useTranslations()
  return (
    <div className="flex flex-col gap-4 items-center py-7">
      <HomeTitle>TESTIMONIALS</HomeTitle>
      <HomeSubtitle>{t('real-words-from-happy-customers')}</HomeSubtitle>
    </div>
  );
}
