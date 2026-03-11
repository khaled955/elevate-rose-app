export async function fetchCartAction() {
  const resp = await fetch(`/api/cart`, {
    cache: "no-store",
  });

  const payload = resp.json();
  return payload;
}
