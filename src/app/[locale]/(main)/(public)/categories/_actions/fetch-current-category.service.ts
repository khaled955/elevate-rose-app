export async function fetchCurrentCategoryService(categoryId: string) {
  const resp = await fetch(`/api/category/${categoryId}`);

  const payload = await resp.json();
  return payload;
}
