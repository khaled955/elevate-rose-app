"use client";
import { Loader } from "lucide-react";
import ProductCard from "@/components/shared/product-card";
import { TabButton } from "./tab-button";
import { Occasion } from "@/lib/types/occasion";
import { usePopularProducts } from "@/app/[locale]/(main)/(home-page)/_hooks/use-popular-products";
import HomeSubtitle from "@/components/shared/home-subtitle";
import { useTranslations } from "next-intl";

type Props = {
  occasions: Occasion[];
};

export default function MostPopularClient({ occasions }: Props) {
  const t = useTranslations();

  const { productResponse, isLoading, currentOccasion, handleSetOccasion } =
    usePopularProducts();

  return (
    <section>
      <div className="flex justify-between pe-6 my-6">
        <HomeSubtitle>{t("most-popular")}</HomeSubtitle>

        <TabButton
          occasions={occasions}
          currentOccasion={currentOccasion}
          onChange={handleSetOccasion}
        />
      </div>

      <div className="grid gap-6 my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
        {isLoading && (
          <div className="col-span-full flex justify-center py-10">
            <Loader className="animate-spin" />
          </div>
        )}

        {productResponse &&
          productResponse.products.length > 0 &&
          productResponse.products.map((product) => (
            <ProductCard
              key={product._id}
              className="h-full"
              title={product.title}
              src={product.imgCover}
              salesCount={product.sold}
              rate={product.rateAvg}
              rateCount={product.rateCount}
              priceAfterSale={product.priceAfterDiscount!}
              priceBeforeSale={product.price}
              productId={product._id}
            />
          ))}

        {productResponse && productResponse.products.length === 0 && (
          <p className="col-span-full text-center font-bold text-maroon-600 dark:text-soft-pink-200">
            {t("sorry-out-of-stock-now")}
          </p>
        )}
      </div>
    </section>
  );
}
