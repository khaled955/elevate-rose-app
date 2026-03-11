"use client"
import { useAddress } from "@/hooks/address/use-address";
import { Loader2, MapPinPen } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Address() {
  // Translations
  const t = useTranslations();

  // Queries
  const {data,isLoading,isFetching} = useAddress()

  const currentAddress = (!isLoading || !isFetching) && data?.addresses.length === 0 ?t("adress"):data?.addresses[0].city
  return (
    <div className="address">
      <p>{t("nav-deliver")}</p>
      <div className="flex mt-2 gap-2">
        <span>
          <MapPinPen />
        </span>
        <span className="text-zinc-400 dark:text-soft-pink-300">
          {(isLoading || isFetching) ? <Loader2 className="animate-spin"/> :currentAddress}
        </span>
      </div>
    </div>
  );
}
