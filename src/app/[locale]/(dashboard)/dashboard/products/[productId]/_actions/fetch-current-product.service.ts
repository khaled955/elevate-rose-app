export async function fetchCurrentProductService(productId: string) {
  const resp = await fetch(`/api/dashboard/product/${productId}`);
  const payload = await resp.json();
  return payload;
}
