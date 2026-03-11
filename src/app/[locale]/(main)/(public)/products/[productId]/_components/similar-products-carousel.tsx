"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/shared/product-card";
import { SimilarProduct } from "@/lib/types/similar-products";
import { YouMayLikeProduct } from "@/lib/types/products-you-may-like.api";

type SimilarProductsCarouselProps = {
  similarProducts: SimilarProduct[] | YouMayLikeProduct[];
};

// Variables
const ImagePath = "https://flower.elevateegy.com/uploads/";

// functions
function buildImageSrc(path: string) {
  const imgePath = path.startsWith(ImagePath) ? path : ImagePath + path;
  return imgePath;
}

export default function SimilarProductsCarousel({
  similarProducts,
}: SimilarProductsCarouselProps) {
  // Translation
  const locale = useLocale();

  // embla-configuration
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        direction: locale === "ar" ? "rtl" : "ltr",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-1 mb-4">
        {similarProducts?.map((product) => (
          <CarouselItem
            key={product._id}
            className="ps-1 sm:basis-1/2 md:basis-1/5"
          >
            <ProductCard
              showWishListBtn={true}
              priceBeforeSale={product.price}
              productId={product._id}
              priceAfterSale={product.priceAfterDiscount!}
              rate={product.rateAvg}
              title={product.title}
              src={buildImageSrc(product.imgCover)}
              rateCount={product.rateCount}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-maroon-600  start-0 border-none" />
      <CarouselNext className="bg-maroon-600 end-0 border-none" />
    </Carousel>
  );
}
