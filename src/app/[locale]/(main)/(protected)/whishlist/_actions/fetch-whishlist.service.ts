export async function fetchWhishlistService() {
  const resp = await fetch(`/api/whishlist`, {
    cache: "no-store",
  });

  const payload = resp.json();
  return payload;
}
