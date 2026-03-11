"use client";
import { AddressRadioList } from "@/components/shared/address-radio-list";
import EmptyAddresses from "@/components/shared/empty-address";
import { Button } from "@/components/ui/button";
import { useAddress } from "@/hooks/address/use-address";
import { useCart } from "@/hooks/cart/use-cart";
import { CheckOutAddress } from "@/lib/types/checkout";
import { Loader, MoveLeft, MoveRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type AddressStepProps = {
  handleIncreaseStep: () => void;
  handleToggleAddressModel: () => void;
  setCurrentAddress: (current: CheckOutAddress | null) => void;
};
export default function AddressStepOne({
  handleIncreaseStep,
  handleToggleAddressModel,
  setCurrentAddress,
}: AddressStepProps) {
  // Translations
  const locale = useLocale();
  const t = useTranslations();
  // State
  const [selectedId, setSelectedId] = useState<string | null>("");
  // Queryies
  const { data, isLoading, isFetching } = useAddress();
  const { data: cartList } = useCart();

  // Variables
  const addresses = useMemo(() => {
    if (!data?.addresses) return [];
    return [...data?.addresses].reverse();
  }, [data?.addresses]);
  const showNextButton = (cartList?.cart?.totalPrice ?? 0) > 0 && selectedId;

  // Effects
  // Auto-check last address after fetch / after adding new address
  useEffect(() => {
    if (!addresses.length) return;
    setSelectedId(addresses[0]._id);
    // set current address to make checkout  all values except usename  and id
    setCurrentAddress({
      city: addresses[0].city,
      lat: addresses[0].lat,
      long: addresses[0].long,
      phone: addresses[0].long,
      street: addresses[0].phone,
    });
  }, [addresses, setCurrentAddress]);

  return (
    <section>
      <header>
        {/* title */}
        <h1 className="my-5 font-semibold capitalize text-3xl ">
          {t("shipping-address")}
        </h1>
      </header>
      <main>
        {/* loading */}
        {(isLoading || isFetching) && <Loader className="animate-spin" />}
        {/* radio-list */}
        {addresses.length > 0 && !isLoading && !isFetching && (
          <AddressRadioList
            value={selectedId!}
            onValueChange={setSelectedId}
            addresses={addresses}
            onSetCurrentAddress={setCurrentAddress}
          />
        )}
        {/* empty-address */}
        {addresses.length === 0 && !isLoading && !isFetching && (
          <EmptyAddresses locale={locale} />
        )}
      </main>

      <footer className="my-4 flex flex-col items-center gap-4">
        <p className="relative w-full text-center text-zinc-500 font-semibold before:absolute before:start-0 before:w-[47%] before:bg-zinc-100 before:size-[0.0625rem] before:top-1/2 before:-translate-y-1/2 after:absolute after:end-0 after:w-[47%] after:bg-zinc-100 after:size-[0.0625rem] after:top-1/2 after:-translate-y-1/2">
          {t("or")}
        </p>
        {/* modal-button */}
        <Button
          onClick={handleToggleAddressModel}
          variant={"secondary"}
          className="w-full py-7"
        >
          {t("add-a-new-address")}
        </Button>

        {/* next-step-button */}
        {showNextButton && (
          <Button className="self-end" onClick={handleIncreaseStep}>
            <span>{t("next")}</span>
            {locale === "ar" ? <MoveLeft /> : <MoveRight />}
          </Button>
        )}
      </footer>
    </section>
  );
}
