import FirstRowHomePage from "./first-row-home-page";
import SecondRowHomePage from "./second-row-home-page";
import ThirdRowHomePage from "./third-row-home-page";

export default function HomePageWrapper() {
  return (
    <div className="statistic-parent w-full space-y-4">
      {/* ===== first row ===== */}
      <FirstRowHomePage />
      {/* ===== second row ===== */}
      <SecondRowHomePage />
      {/* ===== third row ===== */}
      <ThirdRowHomePage />
    </div>
  );
}
