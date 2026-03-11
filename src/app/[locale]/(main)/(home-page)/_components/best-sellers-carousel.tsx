import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/shared/product-card";
import { useLocale } from "next-intl";
import { Products } from "@/lib/types/product";

export default function BestSellersCarousel({ products }: Products) {
  const locale = useLocale();

  return (
    <Carousel
      opts={{
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
      className="w-[90%] md:w-[70%]"
    >
      <CarouselContent className="-ml-1">
        {products?.map((product) => (
          <CarouselItem
            key={product._id}
            className="ps-1 sm:basis-1/2 md:basis-1/3"
          >
            <ProductCard
            productId={product._id}
              src={product.imgCover}
              priceBeforeSale={product.price}
              priceAfterSale={product.priceAfterDiscount!}
              rate={product.rateAvg}
              salesCount={product.sold}
              title={product.title}
              rateCount={product.rateCount}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
