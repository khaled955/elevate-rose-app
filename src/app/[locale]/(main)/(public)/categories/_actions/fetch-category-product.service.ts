type ProductsQuery = Record<
  string,
  string | number | boolean | undefined | null
>;

export async function fetchCategoryProductsService(
  categoryId: string,
  query?: ProductsQuery,
) {
  const params = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") continue;
      params.set(key, String(value));
    }
  }

  const url = params.toString()
    ? `/api/category/${categoryId}/products?${params.toString()}`
    : `/api/category/${categoryId}/products`;

  const resp = await fetch(url);
  const payload = await resp.json();

  return payload;
}
