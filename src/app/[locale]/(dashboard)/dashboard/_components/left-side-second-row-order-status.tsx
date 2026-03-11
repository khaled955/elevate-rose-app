import { OrdersStatusChart } from "./order-status-chart";

export default function LeftSideSecondRowOrderStatus() {
  return (
    <div className="left-side-chart col-span-12 md:col-span-5 lg:col-span-4">
      <div className="w-full overflow-hidden">
        <OrdersStatusChart className="w-full" />
      </div>
    </div>
  );
}
