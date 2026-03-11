import LeftSideSecondRowOrderStatus from "./left-side-second-row-order-status";
import RightSideSecondRowRevenue from "./right-side-second-row-revenue";

export default function SecondRowHomePage() {
  return (
    <div className="second-row-parent grid grid-cols-12 gap-3">
        {/* left-side-chart */}
        <LeftSideSecondRowOrderStatus />
        {/* right-side-charts */}
        <RightSideSecondRowRevenue />
      </div>
  )
}
