export async function fetchCartService() {
  const resp = await fetch(`/api/cart`);
  const payload = resp.json();
  return payload;
}
