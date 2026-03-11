import { Suspense } from "react";
import HomePageWrapper from "./_components/home-page-wrapper";
import Spinner from "@/components/shared/spinner";

export default function DashboardPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomePageWrapper />
    </Suspense>
  );
}
