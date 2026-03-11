//  this is providers for all providers in my app

import { ReactNode } from "react";
import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/tanstack-query.provider";
import { ThemeProvider } from "next-themes";
import {
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
// import { GuestCartProvider } from "../cart/guest-cart.provider";
import { NetworkGateProvider } from "./components/net-work-gate-provider";
import dynamic from "next/dynamic";

// to prevent issue display in console 
const GuestCartProvider = dynamic(
  () =>
    import("../cart/guest-cart.provider").then((mod) => ({
      default: mod.GuestCartProvider,
    })),
  { ssr: false },
);

export default function Providers({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const messages = useMessages();
  const now = useNow();
  const timeZone = useTimeZone();

  return (
    <NetworkGateProvider>
      <NextAuthProvider>
        <ReactQueryProvider>
          <NextIntlClientProvider
            timeZone={timeZone}
            now={now}
            messages={messages}
            locale={locale}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {/* cart-provider */}
              <GuestCartProvider>{children}</GuestCartProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </NextAuthProvider>
    </NetworkGateProvider>
  );
}
