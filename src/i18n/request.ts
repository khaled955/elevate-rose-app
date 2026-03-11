import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: {
      dateTime: {
        "date-base": {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
        "date-only": {
          year: "numeric",
          month: "long",
          day: "2-digit",
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
      },

      number: {
        "currancy-base": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
          currency: "EGP",
          style: "currency",
          maximumFractionDigits: 0,
        },
        "price-base": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
          style: "decimal",
          maximumFractionDigits: 0,
        },
        "currency-egp": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
          currency: "EGP",
          style: "currency",
          maximumFractionDigits: 0,
        },
        "currancy-format": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
          style: "decimal",
          maximumFractionDigits: 0,
        },
        "currancy-full": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
          currency: "EGP",
          style: "currency",
        },

        "number-base": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
        "number-validation": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
        "percentage-base": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
          style: "percent",
          maximumFractionDigits: 2,
        },
        "percentage-without-zero": {
          numberingSystem: locale === "ar" ? "arab" : "latn",
          style: "percent",
          maximumFractionDigits: 0,
          minimumFractionDigits:0,
        },
      },
    },
  };
});
