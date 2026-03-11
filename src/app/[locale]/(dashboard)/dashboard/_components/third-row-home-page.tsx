import LowStockProductsStatistics from "./low-stock-products-statistics";
import TopSellingProductsStatistics from "./top-selling-products-statistics";

export default function ThirdRowHomePage() {
  return (
    <div className="third-row grid grid-cols-12 gap-3">
      <TopSellingProductsStatistics />
      <LowStockProductsStatistics />
    </div>
  );
}
