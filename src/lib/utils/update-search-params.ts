/**
 * Remove a query parameter from the URL and return the new href.
 *
 * @param pathname - Current pathname (without query string)
 * @param searchParams - Current search params (ReadonlyURLSearchParams or URLSearchParams)
 * @param queryName - Query key to delete (e.g. "category", "price", "rate")
 * @param resetPage - Whether to reset page to "1" (default: true)
 *
 * @returns A string URL to be used with router.push()
 */
export function removeQueryParam({
  pathname,
  searchParams,
  queryName,
  resetPage = true,
}: {
  pathname: string;
  searchParams: URLSearchParams | { toString(): string };
  queryName: string;
  resetPage?: boolean;
}) {
  const sp = new URLSearchParams(searchParams.toString());

  sp.delete(queryName);

  if (resetPage) {
    sp.set("page", "1");
  }

  const qs = sp.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
