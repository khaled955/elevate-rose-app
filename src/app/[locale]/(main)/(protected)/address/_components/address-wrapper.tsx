"use client";

import { MapPin, Phone, Navigation, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

import { useAddress } from "@/hooks/address/use-address";

type Address = {
  _id?: string;
  street?: string;
  phone?: string;
  city?: string;
  lat?: number;
  long?: number;
};

export default function AddressWrapper() {
  // Translations
  const t = useTranslations("address-page");

  // Query
  const { data, isLoading } = useAddress();

  // Variables
  const addresses: Address[] =
    data?.addresses?.map((addr) => ({
      ...addr,
      lat: Number(addr.lat),
      long: Number(addr.long),
    })) ?? [];

  const isEmpty = !isLoading && addresses.length === 0;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {t("addresses")}
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("manage-your-addresses")}
          </p>
        </div>

        {/* Count */}
        <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium dark:border-zinc-800 dark:bg-zinc-950">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span className="text-zinc-500 dark:text-zinc-400">
                {t("total")}:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {addresses.length}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border-b py-5 last:border-0 dark:border-zinc-800"
            >
              <div className="h-5 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-3 h-4 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {isEmpty && (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <MapPin className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
          </div>

          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {t("no-addresses")}
          </h2>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {t("add-address-to-start")}
          </p>
        </div>
      )}

      {/* Address List */}
      {!isLoading && addresses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address, index) => (
            <article
              key={address._id ?? index}
              className={cn(
                "rounded-xl border border-zinc-200 bg-white p-5 shadow-sm",
                "dark:border-zinc-800 dark:bg-zinc-950",
                "transition hover:shadow-md",
              )}
            >
              {/* Street */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {address.street}
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {address.city}
                  </p>
                </div>

                <MapPin className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
              </div>

              {/* Phone */}
              <div className="mb-2 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <Phone className="h-4 w-4" />
                {address.phone}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <Navigation className="h-4 w-4" />
                {address.lat}, {address.long}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
