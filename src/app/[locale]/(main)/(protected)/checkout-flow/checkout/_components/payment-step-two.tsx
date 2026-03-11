"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentValue = "cash" | "credit" | null;
type Locale = string;

type PaymentMethodProps = {
  value: PaymentValue;
  onChange: (value: PaymentValue) => void;
  handleResetSteps: () => void;
  cashImageSrc: string | StaticImageData;
  creditImageSrc: string | StaticImageData;
  locale?: Locale;
  onCheckout?: () => void;
  className?: string;
  title?: string;
  cashLabel?: string;
  creditLabel?: string;
  cashDesc?: string;
  creditDesc?: string;
  checkoutText?: string;
  isLoading: boolean;
};

export default function PaymentMethod({
  value,
  onChange,
  cashImageSrc,
  creditImageSrc,
  handleResetSteps,
  locale = "en",
  isLoading = false,

  onCheckout,
  className,

  cashLabel,
  creditLabel,
  cashDesc,
  creditDesc,
}: PaymentMethodProps) {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const i18n = {
    title: isAr ? "طريقة الدفع" : "Payment Method",
    cashLabel: isAr ? "الدفع عند الاستلام" : "Cash On Delivery",
    creditLabel: isAr ? "بطاقة ائتمان" : "Credit Card",
    cashDesc: isAr
      ? "ستدفع نقدًا عند استلام الطلب."
      : "You'll pay in cash when your order is delivered.",
    creditDesc: isAr
      ? "سيتم تحويلك بأمان إلى Stripe لإتمام عملية الدفع."
      : "You'll be securely redirected to Stripe to complete your payment.",
    checkoutText: isAr ? "إتمام الشراء" : "Checkout",
    close: isAr ? "إغلاق" : "Close",
    back: isAr ? "عودة" : "Back",
    loading: isAr ? "...جاري انشاء الطلب" : "ًWaiting....",
  };

  return (
    <section dir={dir} className={cn("w-full", className)}>
      <header className="flex items-center gap-2 my-5">
        {/* back-button */}
        <Button
          onClick={handleResetSteps}
          className="w-fit py-6"
          variant={"ghost"}
        >
          {locale === "ar" ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          <span className="text-zinc-800 dark:text-zinc-200 text-sm">
            {i18n.back}
          </span>
        </Button>

        <h1 className="my-2 font-semibold capitalize text-3xl">{i18n.title}</h1>
      </header>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PaymentOptionCard
          id="pm-cash"
          checked={value === "cash"}
          value="cash"
          onChange={onChange}
          imageSrc={cashImageSrc}
          label={cashLabel ?? i18n.cashLabel}
          desc={cashDesc ?? i18n.cashDesc}
          locale={locale}
        />

        <PaymentOptionCard
          id="pm-credit"
          checked={value === "credit"}
          value="credit"
          onChange={onChange}
          imageSrc={creditImageSrc}
          label={creditLabel ?? i18n.creditLabel}
          desc={creditDesc ?? i18n.creditDesc}
          accent="danger"
          locale={locale}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-end">
        <button
          type="button"
          onClick={onCheckout}
          disabled={!value || isLoading}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-md px-5 text-sm font-medium disabled:bg-red-300",
            "bg-maroon-700 text-white shadow-sm transition hover:bg-maroon-800",
            "focus:outline-none focus:ring-2 focus:ring-maroon-700/30",
            "dark:bg-maroon-600 dark:hover:bg-maroon-700 dark:focus:ring-maroon-500/30",
          )}
        >
          {isLoading ? i18n.loading : i18n.checkoutText}
          <span aria-hidden className={cn(isAr ? "rotate-180" : "")}>
            →
          </span>
        </button>
      </div>
    </section>
  );
}

function PaymentOptionCard({
  id,
  checked,
  value,
  onChange,
  imageSrc,
  label,
  desc,
  accent = "neutral",
  locale,
}: {
  id: string;
  checked: boolean;
  value: Exclude<PaymentValue, null>;
  onChange: (value: PaymentValue) => void;
  imageSrc: string | StaticImageData;
  label: string;
  desc: string;
  accent?: "neutral" | "danger";
  locale: Locale;
}) {
  const isAr = locale === "ar";

  return (
    <label
      htmlFor={id}
      className={cn(
        "group relative cursor-pointer rounded-xl border p-5 shadow-sm transition",
        "flex flex-col items-center justify-center text-center",
        // light
        "bg-white border-zinc-200 hover:shadow-md",
        // dark
        "dark:bg-zinc-600 dark:border-zinc-800",
        checked
          ? cn(
              "ring-2",
              "ring-zinc-200 border-zinc-300",
              "dark:ring-zinc-800 dark:border-zinc-700",
            )
          : "",
      )}
    >
      {/* accessible radio */}
      <input
        id={id}
        type="radio"
        name="payment-method"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />

      {/* image */}
      <div className="relative mb-4 h-28 w-full max-w-[240px]">
        <Image
          src={imageSrc}
          alt={label}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 240px, 260px"
        />
      </div>

      {/* label */}
      <div
        className={cn(
          "text-sm font-semibold transition",
          "text-zinc-900 dark:text-zinc-50",
          checked &&
            (accent === "danger"
              ? "text-red-600 dark:text-red-500"
              : "text-zinc-900 dark:text-zinc-50"),
        )}
      >
        {label}
      </div>

      {/* desc */}
      <p className="mt-2 max-w-[320px] text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        {desc}
      </p>

      {/* Active indicator */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl transition",
          checked
            ? accent === "danger"
              ? "ring-2 ring-red-500/30 dark:ring-red-500/25"
              : "ring-2 ring-zinc-300/60 dark:ring-zinc-700/50"
            : "ring-0",
        )}
      />

      <span
        aria-hidden
        className={cn(
          "absolute top-3",
          isAr ? "start-3" : "end-3",
          "grid size-5 place-items-center rounded-full border",
          "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-700",
          checked
            ? accent === "danger"
              ? "border-red-500"
              : "border-zinc-500 dark:border-zinc-400"
            : "",
        )}
      >
        <span
          className={cn(
            "block size-2.5 rounded-full transition",
            checked
              ? accent === "danger"
                ? "bg-red-600 dark:bg-red-500"
                : "bg-zinc-800 dark:bg-zinc-200"
              : "bg-transparent",
          )}
        />
      </span>
    </label>
  );
}
