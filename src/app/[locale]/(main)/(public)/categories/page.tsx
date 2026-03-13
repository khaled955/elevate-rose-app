import { Suspense } from "react";
import CategoriesWrapper from "./_components/categories-wrapper";
import { RouteProps } from "@/lib/types/common";
import Spinner from "@/components/shared/spinner";
import { PageProps } from "../../../../../../.next/types/app/layout";
import { Metadata } from "next";

// meta data
export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "إيليفيت | روز — التصنيفات" : "Elevate | Rose — Categories",
    description: isAr
      ? "تصفح تصنيفات الورود الفاخرة — اعثر على الوردة المثالية لكل مناسبة"
      : "Browse our luxury rose categories — find the perfect flower for every occasion",
  };
}

export default function Categoriespage({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <CategoriesWrapper searchParams={searchParams} />
    </Suspense>
  );
}
