import HomeTitle from "@/components/shared/home-title";
import photo1 from "../../../../../../public/assets/Images/about-1.png";
import photo2 from "../../../../../../public/assets/Images/about-2.png";
import photo3 from "../../../../../../public/assets/Images/about-3.png";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
export default function HomeAbout() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="my-10 flex flex-col md:flex-row gap-5 px-6">
      <div className=" hidden sm:flex photo-gallery relative w-full md:w-[50%] justify-center gap-7">
        <div className="imge relative border-4 border-e-0 border-maroon-600 dark:border-soft-pink-200 ps-4 rotate-6 rounded-s-[50px] rounded-se-[150px] rounded-ee-[150px]">
          <Image
            className="rounded-ss-[50px] rounded-se-[120px] rounded-b-[120px] -rotate-3"
            src={photo1}
            width={300}
            height={0}
            alt="flower"
          />
        </div>

        <div className="photos flex flex-col gap-4">
          <Image
            className=" h-48 w-48 rounded-full"
            src={photo3}
            alt="flower"
          />

          <Image
            className=" w-[250px] h-[150px] rounded-s-[50px] rounded-e-[100px]"
            src={photo2}
            alt="flower"
          />
        </div>
      </div>

      <div className="about-text w-full md:w-[50%]">
        <HomeTitle> {t("about-0")}</HomeTitle>
        <p className=" my-4 font-bold text-3xl text-maroon-600 dark:text-soft-pink-200">
          {t.rich("home-deliver", {
            span: (value) => (
              <span className="text-soft-pink-500 dark:text-maroon-400">
                {value}
              </span>
            ),
          })}
        </p>
        <p className=" mb-4 text-base font-normal text-zinc-500 dark:text-zinc-400">
          {t("make-every-moment-memorable")}
        </p>

        <Link
          className=" bg-maroon-600 text-white shadow hover:bg-maroon-700 dark:bg-soft-pink-300 dark:text-zinc-800 dark:hover:bg-soft-pink-400 rounded-lg flex items-center w-fit px-3 py-2 mb-4"
          locale={locale}
          href="/products"
        >
          {t("discover")} {locale === "ar" ? <ArrowLeft /> : <ArrowRight />}
        </Link>

        <ul className="flex flex-col items-start sm:flex-row sm:items-center flex-wrap space-y-4">
          <li className="text-zinc-800 dark:text-zinc-50 w-full sm:w-[50%] flex items-center gap-3">
            <Check className="text-maroon-700 dark:text-soft-pink-400" />
            {t("competitive-prices-and-easy-shopping")}
          </li>
          <li className="text-zinc-800 dark:text-zinc-50 w-full sm:w-[50%] flex items-center gap-3">
            <Check className="text-maroon-700 dark:text-soft-pink-400" />
            {t("premium-quality-and-elegant-packaging")}
          </li>
          <li className="text-zinc-800 dark:text-zinc-50 w-full sm:w-[50%] flex items-center gap-3">
            <Check className="text-maroon-700 dark:text-soft-pink-400" />
            {t("perfect-for-every-occasion")}
          </li>
          <li className="text-zinc-800 dark:text-zinc-50 w-full sm:w-[50%] flex items-center gap-3">
            <Check className="text-maroon-700 dark:text-soft-pink-400" /> Fast &
            {t("reliable-delivery")}
          </li>
        </ul>
      </div>
    </div>
  );
}
