import { TESTIMONIALS } from "@/lib/services/apis/public-apis/testimonials-apis.api";

export async function fetchTestimonialsAction() {
  const resp = await fetch(`${process.env.BASE_URL}${TESTIMONIALS.GET}`, {
    cache: "no-store",
  });

  const payload = await resp.json();

  return payload;
}
