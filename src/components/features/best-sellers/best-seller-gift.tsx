"use client";

import { Link } from "@/i18n/navigation";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function BestSellerGift() {
  const locale = useLocale();
  const t = useTranslations();



  return (
    <div>
      <h3 className="uppercase tracking-widest text-xl font-semibold mb-4 text-soft-pink-500 dark:text-maroon-400">
        {t("best-selling-0")}
      </h3>

      <p className="text-maroon-700 dark:text-soft-pink-200 text-3xl font-semibold mb-3">
        {t.rich("selling", {
          span: (value) => (
            <span className="text-soft-pink-500 font-semibold">{value}</span>
          ),
          br: () => <br />,
        })}
      </p>

      <p className="mb-3 text-zinc-500 dark:text-zinc-400">{t("seller-2")}</p>

      <Link
        locale={locale}
        href="/products"
        className=" w-fit p-2 rounded-md flex gap-2 bg-maroon-600 text-white shadow hover:bg-maroon-700 dark:bg-soft-pink-300 dark:text-zinc-800 dark:hover:bg-soft-pink-400 disabled:dark:bg-zinc-700 mx-auto lg:ms-0"
      >
        {t("explore-gifts")}{" "}
        <span>{locale === "en" ? <ArrowRight /> : <ArrowBigLeft />}</span>
      </Link>
    </div>
  );
}
