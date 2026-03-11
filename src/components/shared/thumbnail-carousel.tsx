"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";

interface ThumbnailCarouselProps {
  images: string[];
  className?: string;
  title: string;
}

export function ThumbnailCarousel({
  images,
  className,
  title,
}: ThumbnailCarouselProps) {
  // Translation
  const locale = useLocale();

  // States
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Effects
  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // functions
  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      {/* Main Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails */}
      <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md transition-all duration-300 brightness-75 hover:brightness-100",

              current === index
                ? "border-2 border-maroon-600 brightness-100"
                : "",
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
          >
            <Image src={image} alt={title} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
