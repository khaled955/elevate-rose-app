import { TESTIMONIALS } from "@/lib/services/apis/public-apis/testimonials-apis.api";

export async function fetchTestimonialsService() {
  const resp = await fetch(`${process.env.BASE_URL}${TESTIMONIALS.GET}`);
  const payload = await resp.json();
  return payload;
}
