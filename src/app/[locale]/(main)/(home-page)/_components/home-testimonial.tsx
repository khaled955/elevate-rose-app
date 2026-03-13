import { Testimonials } from "@/lib/types/testimonial";
import TestimonialsCarousel from "@/components/features/testimonials/testimonial-carousel";
import TestimonialsHeader from "@/components/features/testimonials/testimonials-header";
import { fetchTestimonialsService } from "../_actions/fetch-testimonials.service";

export default async function Testimonial() {
  const payload: APIResponse<PaginatedResponse<Testimonials>> =
    await fetchTestimonialsService();

  //check if it's an error
  if ("error" in payload || payload.message !== "success") {
    const errorMessage =
      payload.error || payload.message || "Failed to fetch products";
    throw new Error(errorMessage);
  }

  const { testimonials } = payload;
  return (
    <div>
      <TestimonialsHeader />
      <TestimonialsCarousel testimonials={testimonials} />
    </div>
  );
}
