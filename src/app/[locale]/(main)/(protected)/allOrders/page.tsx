import { Suspense } from "react";
import OrdersList from "./_components/orders-list";
import { Loader } from "lucide-react";
import { RouteProps } from "@/lib/types/common";
import { useTranslations } from "next-intl";

export default function AllOrdersPage({ searchParams }: RouteProps) {
  // Translations
  const t = useTranslations();
  return (
    <section>
      <header>
        {/* title */}
        <h1 className="my-4 text-zinc-800 dark:text-zinc-50 font-bold text-5xl">
          {t("orders.order")}
        </h1>
      </header>
      <main>
        <Suspense fallback={<Loader className="animate-spin" />}>
          <OrdersList searchParams={searchParams} />
        </Suspense>
      </main>
    </section>
  );
}
