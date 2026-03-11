import { Suspense } from "react";
import CategoriesWrapper from "./_components/categories-wrapper";
import { RouteProps } from "@/lib/types/common";
import Spinner from "@/components/shared/spinner";

export default function Categoriespage({ searchParams }: RouteProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <CategoriesWrapper searchParams={searchParams} />
    </Suspense>
  );
}
