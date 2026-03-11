export async function fetchWishlistStatusAction(productId: string) {
  const resp = await fetch(`/api/review?productId=${productId}`, {
    cache: "no-store",
  });

  const payload = resp.json();
  return payload;
}
