import { useTranslations } from "next-intl";
import RevenueChart from "./revenue-chart";

export const FAKE_MONTHLY_REVENUE = [
  { _id: "2025-01", revenue: 4500, count: 216 },
  { _id: "2025-02", revenue: 3800, count: 190 },
  { _id: "2025-03", revenue: 4100, count: 205 },
  { _id: "2025-04", revenue: 3600, count: 178 },
  { _id: "2025-05", revenue: 3900, count: 184 },
  { _id: "2025-06", revenue: 4500, count: 216 },
  { _id: "2025-07", revenue: 3200, count: 140 },
  { _id: "2025-08", revenue: 3700, count: 165 },
  { _id: "2025-09", revenue: 4300, count: 200 },
  { _id: "2025-10", revenue: 3450, count: 150 },
  { _id: "2025-11", revenue: 3600, count: 160 },
  { _id: "2025-12", revenue: 3850, count: 175 },
] as const;

export const FAKE_DAILY_REVENUE = [
  { _id: "2025-06-10", revenue: 520, count: 19 },
  { _id: "2025-06-11", revenue: 610, count: 22 },
  { _id: "2025-06-12", revenue: 480, count: 16 },
  { _id: "2025-06-13", revenue: 740, count: 28 },
  { _id: "2025-06-14", revenue: 690, count: 25 },
  { _id: "2025-06-15", revenue: 810, count: 31 },
  { _id: "2025-06-16", revenue: 560, count: 20 },
] as const;



export default function RightSideSecondRowRevenue() {
    // Translations
    const t = useTranslations()
  return (
   <div className="right-side-charts col-span-12 md:col-span-7 lg:col-span-8">
             <div className="w-full overflow-hidden">
               <RevenueChart
                 monthlyRevenue={[...FAKE_MONTHLY_REVENUE]}
                 dailyRevenue={[...FAKE_DAILY_REVENUE]}
                 title={t('revenue')}
                 monthlyLabel={t('monthly')}
                 weeklyLabel={t('last-week')}
               />
             </div>
           </div>
  )
}
