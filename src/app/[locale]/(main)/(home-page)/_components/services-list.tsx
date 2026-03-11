import ServiceCard from "@/components/features/services/service-card";
import { Headset, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { ReactNode, useMemo } from "react";

type ServiceProp = {
  icon: ReactNode;
  header: string;
  text: string;
};

export default function ServicesList() {
  const t = useTranslations();

  const servicesList: ServiceProp[] = useMemo(() => {
    return [
      {
        icon: <Truck size={35} />,
        header: t('free-delivery'),
        text: t('for-orders-above-egp-price-number-currancy-base',{price:120}),
      },
      {

        icon: <RefreshCcw size={35} />,
        header: t('get-refund'),
        text: t('refunds-within-days-number-number-base-days',{days:30}),
      },
      {

        icon: <ShieldCheck size={35} />,
        header: t('safe-payment'),
        text: t('percentage-number-percentage-base-secure-payment',{percentage:1}),
      },
      {
        icon: <Headset size={35} />,
        header: t('support-number-number-base-support',{hour:24,day:7}),
        text: t('contact-us-at-any-time'),
      },
    ];
  }, [t]);

  return (
    <div className="bg-maroon-50 mb-6 dark:bg-zinc-700 rounded-lg px-4 py-7 flex flex-col md:flex-row justify-between gap-4">
      {servicesList.map((service) => (
        <ServiceCard
          text={service.text}
          header={service.header}
          icon={service.icon}
          key={service.header}
        />
      ))}
    </div>
  );
}
