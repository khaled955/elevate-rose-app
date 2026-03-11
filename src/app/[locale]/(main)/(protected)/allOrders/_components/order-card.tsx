"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/types/orders";
import { Banknote, Check, CreditCard, Truck } from "lucide-react";
import OrderItemCard from "./order-item-card";
import { useFormatter, useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils/cn";

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  // Translations
  const formate = useFormatter();
  const t = useTranslations();

  // States
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    undefined,
  );

  // Variables
  const items = order.orderItems ?? [];
  const firstTwo = items.slice(0, 2);
  const rest = items.slice(2);
  const hasMoreThanTwo = rest.length > 0;

  const isOpen = accordionValue === "more";

  return (
    <li className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {/* title & created at */}
      <header className="flex items-center justify-between rounded-t-xl bg-maroon-600 p-3 text-white dark:bg-maroon-50 dark:text-black">
        <span className="flex items-center gap-2 text-lg font-semibold sm:text-2xl">
          <span>{t("order")}</span>
          <span>{order.orderNumber}</span>
        </span>

        <span className="text-xs text-zinc-100 sm:text-sm">
          {formate.dateTime(new Date(order.createdAt), "date-base")}
        </span>
      </header>

      <main className="p-4">
        {/* total-price & status */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p className="flex items-center gap-1 text-zinc-800 dark:text-zinc-50">
              {t.rich("total-0", {
                price: order.totalPrice,
                label: (chunks) => (
                  <span className="font-semibold capitalize">{chunks}</span>
                ),
                value: (chunks) => (
                  <span className="font-medium">{chunks}</span>
                ),
              })}
            </p>

            <Badge className="flex items-center gap-1 bg-emerald-500 text-white">
              <Check size={18} /> {t("paid")}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800 dark:text-zinc-50">
              {t("status")}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">:</span>
            <Badge variant={"progress"}>{order.state}</Badge>
          </div>
        </div>

        {/* payment method */}
        <p className="mt-3 flex items-center gap-1 text-zinc-800 dark:text-zinc-50">
          {t.rich("orders.paymentMethod", {
            method: t(`orders.methods.${order.paymentType}`),
            label: (chunks) => <span className="font-semibold">{chunks}</span>,
            value: (chunks) => (
              <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                {chunks}
              </span>
            ),
            icon: () =>
              order.paymentType === "cash" ? (
                <Banknote size={20} />
              ) : (
                <CreditCard size={20} />
              ),
          })}
        </p>

        {/* delivery status */}
        <p className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-zinc-800 dark:text-zinc-50">
            {t("delivery-status")}
          </span>
          <Truck size={18} className="text-yellow-500" />
          <span className="text-yellow-600 dark:text-yellow-400">
            {order.isDelivered ? t("delivered") : t("pending")}
          </span>
        </p>

        {/* order items */}
        <div className="mt-4">
          <p className="mb-2 font-medium text-zinc-900 dark:text-zinc-50">
            {t("order-items")}
          </p>

          {/* ✅ always show first 2 */}
          <div
            className={cn(
              "relative",
              hasMoreThanTwo &&
                "rounded-xl border border-zinc-200 dark:border-zinc-800",
            )}
          >
            <ul className="grid grid-cols-1 gap-4 p-3 lg:grid-cols-2">
              {firstTwo.map((item) => (
                <OrderItemCard
                  key={`${order._id}-${item.product?._id ?? item.price}-${item.quantity}`}
                  orderItem={item}
                />
              ))}
            </ul>

            {/* accordion */}
            {hasMoreThanTwo && (
              <Accordion
                type="single"
                collapsible
                value={accordionValue}
                onValueChange={setAccordionValue}
                className="group"
              >
                <AccordionItem value="more" className="border-0">
                  {/* trigger */}
                  <div className="px-3 pb-3">
                    <AccordionTrigger className="w-full justify-center rounded-lg border border-zinc-200 bg-zinc-50 py-2 text-sm font-medium text-maroon-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-maroon-300 dark:hover:bg-zinc-800 [&>svg]:text-maroon-700 dark:[&>svg]:text-maroon-300">
                      {isOpen ? t("show-less") : t("show-all")}
                      <span className="ms-2 text-zinc-500 dark:text-zinc-400">
                        (+{rest.length})
                      </span>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent className="px-3 pb-3">
                    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      {rest.map((item) => (
                        <OrderItemCard
                          key={`${order._id}-${item.product?._id ?? item.price}-${item.quantity}-rest`}
                          orderItem={item}
                        />
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>
      </main>
    </li>
  );
}
