import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Pinyon_Script, Sarabun } from "next/font/google";

import Providers from "@/components/context/app";
import { Toaster } from "@/components/ui/sonner";
import { LayoutProps } from "@/lib/types/common";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";

// *=> meta-data
export const metadata: Metadata = {
  title: "Elevate|rose|app",
};

// Fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const zain = localFont({
  src: "../fonts/Zain-Regular.ttf",
  variable: "--font-zain",
});
const diwany = localFont({
  src: "../fonts/FS_Diwany.ttf",
  variable: "--font-diwany",
});
const edwardian = localFont({
  src: "../fonts/edwardianscriptitc.ttf",
  variable: "--font-edwardian",
});

// Sarabun font
const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sarabun",
});
// Pinyon_Script font
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-pinyon",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html dir={dir} lang={locale} suppressHydrationWarning>
      <body
        className={` ${locale === "ar" ? diwany.className : sarabun.className} ${geistSans.variable} ${diwany.variable} ${edwardian.variable} ${geistMono.variable} ${zain.variable} ${diwany.variable} ${pinyon.variable} ${sarabun.variable} antialiased dark:bg-zinc-800`}
      >
        <Providers>
          {/*//^^==> App */}
          <div className="bg-white dark:bg-zinc-800">{children}</div>

          {/*//??==> Sonner Toaster */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
