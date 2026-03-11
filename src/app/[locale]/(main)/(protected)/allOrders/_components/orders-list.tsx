import catchError from "@/lib/utils/catch-error";
import { fetchAllOrders } from "../_actions/fetch-all-orders.action";
import { OrdersApiResponse } from "@/lib/types/orders";
import OrderCard from "./order-card";
import AppPagination from "@/components/shared/app-pagination";
import { getLocale } from "next-intl/server";
import { SearchParams } from "@/lib/types/common";
import EmptyOrders from "./empty-orders";

type OrdersListProps = {
  searchParams: SearchParams;
};

export default async function OrdersList({ searchParams }: OrdersListProps) {
  // Translations
  const locale = await getLocale();
  // fetch-all-orders

  const [payload, error] = await catchError<OrdersApiResponse>(() =>
    fetchAllOrders({ limit: "4", ...searchParams }),
  );
  // catch-errors

  if (payload && "error" in payload) {
    throw new Error(payload.message);
  }

  // Variables
  const allOrders = payload?.orders || [];
  const currentPage = payload?.metadata.currentPage ?? 1;
  const totalPages = payload?.metadata.totalPages ?? 1;
  const pathName = "allOrders";
  const showPagination = allOrders.length > 3;

  //   Error
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      {/* No- orders */}
      {allOrders.length === 0 && <EmptyOrders />}
      <ul>
        {/* oders-list */}
        {allOrders.length > 0 &&
          allOrders.map((order) => <OrderCard key={order._id} order={order} />)}
      </ul>

      {/* pagination */}
      {allOrders.length > 0 && (
        <AppPagination
          currentPage={currentPage}
          locale={locale}
          pathname={pathName}
          show={showPagination}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      )}
    </>
  );
}
