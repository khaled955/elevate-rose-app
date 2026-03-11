"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";
import { Testimonials } from "@/lib/types/testimonial";
import TestimonialCard from "./testimonial-card";
import Autoplay from "embla-carousel-autoplay";

export default function TestimonialsCarousel({ testimonials }: Testimonials) {
  // Translation
  const locale = useLocale();

  //Embla-configuration
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      className=" bg-maroon-50 dark:bg-zinc-700"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        direction: locale === "ar" ? "rtl" : "ltr",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-1 py-16">
        {testimonials?.map((test) => (
          <CarouselItem
            key={test._id}
            className="ps-1 sm:basis-1/2 md:basis-1/3"
          >
            <TestimonialCard
              CreatedDate={test.createdAt}
              firstName={test.user.firstName}
              lastName={test.user.lastName}
              rateNumber={test.rating}
              reviewText={test.content}
              src={test.user.photo}
            />
          </CarouselItem>
        ))}
        {testimonials?.map((test) => (
          <CarouselItem
            key={test._id}
            className="ps-1 sm:basis-1/2 md:basis-1/3"
          >
            <TestimonialCard
              CreatedDate={test.createdAt}
              firstName={test.user.firstName}
              lastName={test.user.lastName}
              rateNumber={test.rating}
              reviewText={test.content}
              src={test.user.photo}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
