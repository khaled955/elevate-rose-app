export async function fetchPopularProductsService(occasionId: string) {
  const res = await fetch(`/api/products?occasion=${occasionId}`);

  const payLoad = await res.json();

  return payLoad;
}
